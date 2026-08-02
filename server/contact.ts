import type { Request, Response } from "express";
import { z } from "zod";
import { company } from "../shared/site/company";

/**
 * Recepción del formulario de contacto de chyrris.com.
 *
 * Lo que había antes: un POST a un webhook de LeadPrime, sin campos
 * obligatorios más allá de tres, sin honeypot, sin límite por IP, sin captura de
 * UTM y sin consentimiento. Y si el webhook fallaba, la respuesta era 502 y el
 * mensaje de la persona se perdía por completo.
 *
 * Lo que hace ahora:
 *  - Valida en el servidor, no sólo en el navegador.
 *  - Descarta el envío si el honeypot viene lleno, respondiendo como si hubiera
 *    salido bien (un bot no aprende nada del rechazo).
 *  - Limita por IP.
 *  - Exige consentimiento explícito.
 *  - Entrega por DOS caminos independientes: el webhook de LeadPrime y un correo
 *    a info@chyrris.com. Basta con que uno prospere para dar el envío por bueno,
 *    y el mensaje completo queda además en el log del servidor. La redundancia
 *    es intencional mientras se valida la integración.
 */

// ── Configuración por entorno. Ningún secreto vive en el repositorio. ────────

const LEADPRIME_CONTACT_WEBHOOK_URL =
  process.env.LEADPRIME_CONTACT_WEBHOOK_URL ||
  "https://leadprime.chyrris.com/api/leads/webhook/wh_15c5d9cb3cc145972a773c43e70edc8d5939376bb84080cc";

/** Clave del proveedor de correo transaccional. Sin ella el envío se omite. */
const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
/** Configurable para poder apuntar a un stub en pruebas. */
const RESEND_API_URL = process.env.RESEND_API_URL || "https://api.resend.com/emails";
const CONTACT_FROM = process.env.CONTACT_FROM_EMAIL || "Chyrris Website <website@chyrris.com>";
const CONTACT_TO = process.env.CONTACT_TO_EMAIL || company.email.general;

const DELIVERY_TIMEOUT_MS = 10_000;

// ── Validación ──────────────────────────────────────────────────────────────

const INQUIRY_TYPES = ["product", "partnership", "press", "other"] as const;
const REFERRALS = ["search", "referral", "social", "leadprime", "other", ""] as const;

const utmSchema = z.record(z.string().max(200)).optional().default({});

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(120),
  email: z.string().trim().email("Valid email is required").max(200),
  phone: z.string().trim().max(40).optional().default(""),
  company: z.string().trim().max(160).optional().default(""),
  inquiryType: z.enum(INQUIRY_TYPES, { errorMap: () => ({ message: "Select what this is about" }) }),
  referral: z.enum(REFERRALS).optional().default(""),
  message: z.string().trim().min(10, "Message is required").max(5000),
  consent: z.literal(true, { errorMap: () => ({ message: "Consent is required" }) }),
  // Honeypot: debe llegar vacío.
  website: z.string().max(200).optional().default(""),
  locale: z.enum(["en", "es"]).optional().default("en"),
  utm: utmSchema,
  referrer: z.string().max(500).optional().default(""),
  landingPage: z.string().max(500).optional().default(""),
});

export type ContactSubmission = z.infer<typeof contactSchema>;

// ── Límite por IP ───────────────────────────────────────────────────────────

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 3;
const hits = new Map<string, number[]>();

function clientIp(req: Request): string {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.length) return forwarded.split(",")[0]!.trim();
  if (Array.isArray(forwarded) && forwarded.length) return forwarded[0]!.split(",")[0]!.trim();
  return req.ip || req.socket.remoteAddress || "unknown";
}

export function rateLimited(ip: string, now = Date.now()): boolean {
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);

  // Poda perezosa para que el mapa no crezca sin límite.
  if (hits.size > 5000) {
    hits.forEach((times: number[], key: string) => {
      if (!times.some((t: number) => now - t < WINDOW_MS)) hits.delete(key);
    });
  }
  return false;
}

/** Sólo para pruebas: reinicia el contador por IP. */
export function resetRateLimit(): void {
  hits.clear();
}

// ── Entrega ─────────────────────────────────────────────────────────────────

function withTimeout(ms: number): AbortSignal {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), ms).unref?.();
  return controller.signal;
}

async function deliverToLeadPrime(payload: unknown): Promise<{ ok: boolean; detail: string }> {
  try {
    const res = await fetch(LEADPRIME_CONTACT_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "User-Agent": "Chyrris-Website/2.0" },
      body: JSON.stringify(payload),
      signal: withTimeout(DELIVERY_TIMEOUT_MS),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      return { ok: false, detail: `HTTP ${res.status} ${body.slice(0, 300)}` };
    }
    return { ok: true, detail: `HTTP ${res.status}` };
  } catch (error) {
    return { ok: false, detail: error instanceof Error ? error.message : String(error) };
  }
}

function emailBody(data: ContactSubmission, meta: Record<string, unknown>): string {
  const rows: Array<[string, string]> = [
    ["Name", data.name],
    ["Email", data.email],
    ["Phone", data.phone || "—"],
    ["Company", data.company || "—"],
    ["About", data.inquiryType],
    ["Found us via", data.referral || "—"],
    ["Language", data.locale],
    ["Referrer", data.referrer || "—"],
    ["Landing page", data.landingPage || "—"],
    ["Campaign", Object.keys(data.utm).length ? JSON.stringify(data.utm) : "—"],
    ["Submitted", String(meta.submittedAt)],
    ["IP", String(meta.ip)],
  ];
  return [
    "New message from the chyrris.com contact form.",
    "",
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    "Message:",
    data.message,
  ].join("\n");
}

async function deliverByEmail(
  data: ContactSubmission,
  meta: Record<string, unknown>,
): Promise<{ ok: boolean; detail: string }> {
  if (!RESEND_API_KEY) {
    return { ok: false, detail: "RESEND_API_KEY no configurada; envío de correo omitido" };
  }
  try {
    const res = await fetch(RESEND_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: CONTACT_FROM,
        to: [CONTACT_TO],
        reply_to: data.email,
        subject: `chyrris.com — ${data.inquiryType} — ${data.name}`,
        text: emailBody(data, meta),
      }),
      signal: withTimeout(DELIVERY_TIMEOUT_MS),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      return { ok: false, detail: `HTTP ${res.status} ${body.slice(0, 300)}` };
    }
    return { ok: true, detail: `HTTP ${res.status}` };
  } catch (error) {
    return { ok: false, detail: error instanceof Error ? error.message : String(error) };
  }
}

// ── Handler ─────────────────────────────────────────────────────────────────

export async function handleContact(req: Request, res: Response): Promise<Response> {
  const ip = clientIp(req);

  let data: ContactSubmission;
  try {
    data = contactSchema.parse(req.body);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.errors.map((e) => ({ field: e.path.join("."), message: e.message })),
      });
    }
    throw error;
  }

  // Honeypot lleno: un humano nunca ve ese campo. Se responde 200 para que el
  // bot no descubra por qué falló, pero no se entrega nada.
  if (data.website.trim() !== "") {
    console.warn(`[contact] honeypot activado desde ${ip}`);
    return res.status(200).json({ success: true, message: "Message received" });
  }

  if (rateLimited(ip)) {
    return res.status(429).json({
      success: false,
      message:
        data.locale === "es"
          ? "Demasiados envíos desde esta conexión. Inténtalo de nuevo en unos minutos."
          : "Too many submissions from this connection. Please try again in a few minutes.",
    });
  }

  const submittedAt = new Date().toISOString();
  const meta = {
    submittedAt,
    ip,
    userAgent: req.get("user-agent") || null,
    website: "chyrris.com",
  };

  const leadPayload = {
    name: data.name,
    email: data.email,
    phone: data.phone || undefined,
    company: data.company || undefined,
    // El endpoint anterior mandaba `subject`; se conserva el campo para que
    // cualquier automatización aguas abajo que lo lea siga funcionando.
    subject: `${data.inquiryType} — chyrris.com`,
    message: data.message,
    source: "chyrris_website_contact_form",
    inquiryType: data.inquiryType,
    referral: data.referral || undefined,
    locale: data.locale,
    submittedAt,
    utm: data.utm,
    referrer: data.referrer || undefined,
    landingPage: data.landingPage || undefined,
    metadata: meta,
  };

  const [leadPrime, email] = await Promise.all([
    deliverToLeadPrime(leadPayload),
    deliverByEmail(data, meta),
  ]);

  // Pase lo que pase con los canales externos, el mensaje queda registrado.
  console.log(
    `[contact] ${submittedAt} ${data.email} (${data.inquiryType}) ` +
      `leadprime=${leadPrime.ok ? "ok" : `fail:${leadPrime.detail}`} ` +
      `email=${email.ok ? "ok" : `fail:${email.detail}`}`,
  );
  if (!leadPrime.ok && !email.ok) {
    console.error("[contact] NINGÚN canal entregó. Mensaje completo:", JSON.stringify(leadPayload));
    return res.status(502).json({
      success: false,
      message:
        data.locale === "es"
          ? "No pudimos entregar tu mensaje. Escríbenos a info@chyrris.com."
          : "We could not deliver your message. Please write to info@chyrris.com.",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Message received",
    delivery: { leadPrime: leadPrime.ok, email: email.ok },
  });
}
