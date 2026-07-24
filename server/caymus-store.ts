/**
 * Espejo durable del almacenamiento de Caymus (usuarios y sesiones).
 *
 * Los archivos JSON en .data/ siguen siendo la fuente de trabajo (rápidos y
 * síncronos), pero viven en el filesystem efímero de Railway: cada deploy los
 * borra. Si DATABASE_URL está configurada, este módulo:
 *   1. Al arrancar, restaura los archivos desde Postgres si no existen.
 *   2. En cada escritura, replica el contenido a Postgres en segundo plano.
 *   3. Si Postgres no respondió al arrancar (p. ej. Neon suspendido), se
 *      rehabilita en caliente FUSIONANDO lo de la base con lo local, para no
 *      pisar datos buenos con el estado posterior al borrado del deploy.
 *
 * Sin DATABASE_URL es un no-op y el comportamiento actual no cambia.
 */
import fs from "fs";
import path from "path";
import pg from "pg";

const DATA_DIR = path.join(process.cwd(), ".data");
const FILES: Record<CaymusStoreKey, string> = {
  users: path.join(DATA_DIR, "caymus-users.json"),
  sessions: path.join(DATA_DIR, "caymus-sessions.json"),
};

export type CaymusStoreKey = "users" | "sessions";

const DATABASE_URL = process.env.DATABASE_URL || "";

let pool: pg.Pool | null = null;
let storeAvailable = false;
let hydrated = false;
let lastInitAttempt = 0;
const REINIT_MIN_INTERVAL_MS = 60 * 1000;
const writeQueue = new Map<CaymusStoreKey, Promise<void>>();

function needsSsl(url: string): boolean {
  if (/sslmode=disable/i.test(url)) return false;
  if (url.includes("railway.internal") || url.includes("localhost") || url.includes("127.0.0.1")) return false;
  return true;
}

function getPool(): pg.Pool | null {
  if (!DATABASE_URL) return null;
  if (!pool) {
    pool = new pg.Pool({
      connectionString: DATABASE_URL,
      ssl: needsSsl(DATABASE_URL) ? { rejectUnauthorized: false } : undefined,
      max: 3,
      // Neon suspende el compute tras inactividad; la primera conexión tras
      // la pausa puede tardar varios segundos en despertar.
      connectionTimeoutMillis: 10000,
      idleTimeoutMillis: 30000,
    });
    pool.on("error", (error) => {
      console.error("Caymus store: error en pool de Postgres:", error.message);
    });
  }
  return pool;
}

function readLocalFile(file: string): any[] | null {
  try {
    if (!fs.existsSync(file)) return null;
    const parsed = JSON.parse(fs.readFileSync(file, "utf-8"));
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function writeLocalFile(file: string, value: unknown): void {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  const tmp = `${file}.tmp-${process.pid}`;
  fs.writeFileSync(tmp, JSON.stringify(value, null, 2));
  fs.renameSync(tmp, file);
}

const RICH_STATUSES = new Set(["active", "past_due", "expired", "cancelled"]);

/**
 * Fusión DB + local cuando la hidratación no pudo correr al arrancar y ya se
 * recrearon archivos locales. Lo local (más nuevo) manda, pero se rescatan de
 * la base los usuarios ausentes y los campos de suscripción/cliente que el
 * borrado del deploy dejó vacíos. Exportada para poder probarla en frío.
 */
export function mergeCaymusData(key: CaymusStoreKey, dbValue: any[], localValue: any[]): any[] {
  if (key === "sessions") {
    const seen = new Set(localValue.map((s: any) => s?.tokenHash));
    return [...localValue, ...dbValue.filter((s: any) => s?.tokenHash && !seen.has(s.tokenHash))];
  }
  const phoneKey = (u: any) => String(u?.phone || "").replace(/\D/g, "");
  const byPhone = new Map<string, any>();
  for (const dbUser of dbValue) {
    const k = phoneKey(dbUser);
    if (k) byPhone.set(k, dbUser);
  }
  const merged: any[] = [];
  const consumed = new Set<string>();
  for (const localUser of localValue) {
    const k = phoneKey(localUser);
    const dbUser = k ? byPhone.get(k) : undefined;
    if (!dbUser) {
      merged.push(localUser);
      continue;
    }
    consumed.add(k);
    const localHasRichStatus = RICH_STATUSES.has(localUser?.subscriptionStatus);
    merged.push({
      ...dbUser,
      ...localUser,
      name: localUser?.name || dbUser?.name || "",
      customerId: localUser?.customerId || dbUser?.customerId,
      subscriptionId: localUser?.subscriptionId || dbUser?.subscriptionId,
      ...(localHasRichStatus
        ? {}
        : {
            subscriptionStatus: dbUser?.subscriptionStatus || localUser?.subscriptionStatus || "none",
            subscriptionExpiry: dbUser?.subscriptionExpiry,
            planInterval: dbUser?.planInterval,
            paymentPastDueAt: dbUser?.paymentPastDueAt,
            graceEndsAt: dbUser?.graceEndsAt,
          }),
    });
  }
  byPhone.forEach((dbUser, k) => {
    if (!consumed.has(k)) merged.push(dbUser);
  });
  return merged;
}

async function tryInitOnce(): Promise<void> {
  const client = getPool();
  if (!client) return;
  lastInitAttempt = Date.now();
  await client.query(`
    CREATE TABLE IF NOT EXISTS caymus_kv (
      key TEXT PRIMARY KEY,
      value JSONB NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `);

  if (!hydrated) {
    for (const key of Object.keys(FILES) as CaymusStoreKey[]) {
      const file = FILES[key];
      const result = await client.query("SELECT value FROM caymus_kv WHERE key = $1", [key]);
      const dbValue: any[] | null = result.rows.length && Array.isArray(result.rows[0].value) ? result.rows[0].value : null;
      if (!dbValue || !dbValue.length) continue;
      const localValue = readLocalFile(file);
      if (localValue === null) {
        // Deploy nuevo sin datos locales: restauración directa.
        writeLocalFile(file, dbValue);
        console.log(`Caymus store: '${key}' restaurado desde Postgres (${dbValue.length} registros).`);
      } else {
        // Hubo tráfico antes de conectar con Postgres: fusionar sin perder nada.
        const merged = mergeCaymusData(key, dbValue, localValue);
        writeLocalFile(file, merged);
        console.log(`Caymus store: '${key}' fusionado con Postgres (${localValue.length} locales + ${dbValue.length} en DB → ${merged.length}).`);
      }
    }
    hydrated = true;
  }
  storeAvailable = true;
}

// Reintento perezoso: si el arranque coincidió con Neon suspendido, el espejo
// se rehabilita solo en la siguiente escritura (a lo más 1 intento/minuto).
async function ensureStore(): Promise<boolean> {
  if (storeAvailable) return true;
  if (!DATABASE_URL) return false;
  if (Date.now() - lastInitAttempt < REINIT_MIN_INTERVAL_MS) return false;
  try {
    await tryInitOnce();
    if (storeAvailable) console.log("Caymus store: espejo en Postgres rehabilitado.");
  } catch (error) {
    console.error("Caymus store: reintento de conexión a Postgres falló:", error);
  }
  return storeAvailable;
}

/**
 * Inicializa el espejo al arranque. Presupuesto acotado (2 intentos, ~22s en
 * el peor caso) para no exceder el healthcheckTimeout de 30s de Railway; si no
 * se logra, el servidor arranca con archivos locales y ensureStore() rehabilita
 * el espejo en caliente. Nunca lanza.
 */
export async function initCaymusStore(): Promise<void> {
  if (!DATABASE_URL) {
    console.log("Caymus store: DATABASE_URL no configurada; usando solo archivos JSON locales.");
    return;
  }
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      await tryInitOnce();
      console.log("Caymus store: espejo en Postgres activo.");
      return;
    } catch (error) {
      console.error(`Caymus store: intento ${attempt}/2 de conexión a Postgres falló:`, error);
      if (attempt < 2) await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }
  console.error("Caymus store: sin conexión a Postgres al arrancar; se continúa con archivos locales y se reintentará en caliente.");
}

/**
 * Replica el contenido completo de una clave a Postgres en segundo plano.
 * Las escrituras por clave se encolan para preservar el orden; los errores se
 * registran y no afectan la petición en curso.
 */
export function mirrorCaymusData(key: CaymusStoreKey, value: unknown): void {
  if (!DATABASE_URL) return;
  const previous = writeQueue.get(key) || Promise.resolve();
  const next = previous
    .then(async () => {
      if (!(await ensureStore())) return;
      const client = getPool();
      if (!client) return;
      await client.query(
        `INSERT INTO caymus_kv (key, value, updated_at) VALUES ($1, $2::jsonb, now())
         ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now()`,
        [key, JSON.stringify(value)]
      );
    })
    .catch((error) => {
      console.error(`Caymus store: fallo replicando '${key}' a Postgres:`, error.message || error);
    });
  writeQueue.set(key, next);
}
