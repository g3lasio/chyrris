import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { useLocale } from "@/i18n/locale";

/**
 * Formulario de contacto.
 *
 * Cambios frente al anterior:
 *  - Lenguaje llano en los dos idiomas. Se fue "Designation", "Communication
 *    Channel", "Transmission Subject" y "TRANSMIT MESSAGE".
 *  - Campos nuevos: teléfono, empresa, tipo de consulta y cómo nos encontró.
 *  - Campos obligatorios reales, casilla de consentimiento y honeypot. El límite
 *    por IP vive en el servidor, que es donde no se puede eludir.
 *  - Captura de UTM y referrer para que el lead llegue a LeadPrime con
 *    atribución.
 */

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
] as const;

type Status = "idle" | "sending" | "sent" | "error" | "invalid";

function readAttribution() {
  if (typeof window === "undefined") return { utm: {}, referrer: "", landingPage: "" };
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) utm[key] = value.slice(0, 200);
  }
  // Si la visita llegó con UTM en otra página, se conserva durante la sesión.
  try {
    if (Object.keys(utm).length > 0) {
      sessionStorage.setItem("chyrris_attribution", JSON.stringify(utm));
    } else {
      const stored = sessionStorage.getItem("chyrris_attribution");
      if (stored) Object.assign(utm, JSON.parse(stored));
    }
  } catch {
    /* sessionStorage puede estar bloqueado; la atribución es best-effort. */
  }
  return {
    utm,
    referrer: document.referrer || "",
    landingPage: window.location.pathname + window.location.search,
  };
}

const labelClass = "block text-sm font-medium text-text";
const fieldClass =
  "mt-1.5 w-full rounded border border-line-strong bg-ink px-3 py-2.5 text-[15px] text-text placeholder:text-text-faint focus:border-accent";
const hintClass = "ml-1.5 text-xs font-normal text-text-faint";

export function ContactForm() {
  const { t, locale } = useLocale();
  const f = t.contact.form;
  const [status, setStatus] = useState<Status>("idle");
  const [errorDetail, setErrorDetail] = useState<string>("");
  const attribution = useRef<ReturnType<typeof readAttribution>>({
    utm: {},
    referrer: "",
    landingPage: "",
  });

  useEffect(() => {
    attribution.current = readAttribution();
  }, []);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      company: String(data.get("company") || "").trim(),
      inquiryType: String(data.get("inquiryType") || "").trim(),
      referral: String(data.get("referral") || "").trim(),
      message: String(data.get("message") || "").trim(),
      consent: data.get("consent") === "on",
      // Honeypot: invisible para una persona, irresistible para un bot.
      website: String(data.get("website") || ""),
      locale,
      ...attribution.current,
    };

    if (
      !payload.name ||
      !payload.email ||
      !payload.message ||
      !payload.inquiryType ||
      !payload.consent
    ) {
      setStatus("invalid");
      return;
    }

    setStatus("sending");
    setErrorDetail("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = await res.json().catch(() => ({}) as Record<string, unknown>);
      if (res.ok && (body as { success?: boolean }).success) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
        const msg = (body as { message?: unknown }).message;
        setErrorDetail(typeof msg === "string" ? msg : "");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="card p-8" role="status" data-testid="contact-success">
        <h3 className="text-lg font-semibold text-text">{f.successTitle}</h3>
        <p className="mt-2 text-sm leading-relaxed text-text-muted">{f.successBody}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="card p-6 md:p-8" data-testid="contact-form">
      {/* Honeypot. Fuera del flujo visual y del orden de tabulación. */}
      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden opacity-0">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="name">
            {f.name}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className={fieldClass}
            data-testid="field-name"
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="email">
            {f.email}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={fieldClass}
            data-testid="field-email"
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="phone">
            {f.phone}
            <span className={hintClass}>({f.optional})</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={fieldClass}
            data-testid="field-phone"
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="company">
            {f.company}
            <span className={hintClass}>({f.optional})</span>
          </label>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            className={fieldClass}
            data-testid="field-company"
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="inquiryType">
            {f.inquiryType}
          </label>
          <select
            id="inquiryType"
            name="inquiryType"
            required
            defaultValue=""
            className={fieldClass}
            data-testid="field-inquiry-type"
          >
            <option value="" disabled>
              —
            </option>
            {f.inquiryOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass} htmlFor="referral">
            {f.referral}
            <span className={hintClass}>({f.optional})</span>
          </label>
          <select
            id="referral"
            name="referral"
            defaultValue=""
            className={fieldClass}
            data-testid="field-referral"
          >
            <option value="">—</option>
            {f.referralOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="message">
            {f.message}
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            className={fieldClass}
            data-testid="field-message"
          />
        </div>
      </div>

      <div className="mt-6 flex items-start gap-3">
        <input
          id="consent"
          name="consent"
          type="checkbox"
          required
          className="mt-1 h-4 w-4 shrink-0 rounded border-line-strong bg-ink"
          style={{ accentColor: "hsl(var(--accent))" }}
          data-testid="field-consent"
        />
        <label htmlFor="consent" className="text-sm leading-relaxed text-text-muted">
          {f.consent}{" "}
          <Link href="/privacy" className="link-underline">
            {f.consentLinkText}
          </Link>
          .
        </label>
      </div>

      <div aria-live="polite" className="mt-4">
        {status === "invalid" && (
          <p className="text-sm text-red-400" data-testid="contact-invalid">
            {f.validationTitle}: {f.validationBody}
          </p>
        )}
        {status === "error" && (
          <p className="text-sm text-red-400" data-testid="contact-error">
            {f.errorTitle}: {errorDetail || f.errorBody}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-5 rounded bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
        data-testid="contact-submit"
      >
        {status === "sending" ? f.submitting : f.submit}
      </button>

      <p className="mt-4 text-xs text-text-faint">{t.contact.responseCommitment}</p>
    </form>
  );
}
