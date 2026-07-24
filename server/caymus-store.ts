/**
 * Espejo durable del almacenamiento de Caymus (usuarios y sesiones).
 *
 * Los archivos JSON en .data/ siguen siendo la fuente de trabajo (rápidos y
 * síncronos), pero viven en el filesystem efímero de Railway: cada deploy los
 * borra. Si DATABASE_URL está configurada, este módulo:
 *   1. Al arrancar, restaura los archivos desde Postgres si no existen.
 *   2. En cada escritura, replica el contenido a Postgres en segundo plano.
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
      connectionTimeoutMillis: 5000,
      idleTimeoutMillis: 30000,
    });
    pool.on("error", (error) => {
      console.error("Caymus store: error en pool de Postgres:", error.message);
    });
  }
  return pool;
}

/**
 * Inicializa el espejo: crea la tabla si falta y, si los archivos locales no
 * existen (deploy nuevo en filesystem efímero), los restaura desde Postgres.
 * Nunca lanza: si Postgres no responde, el servidor arranca igual y la
 * reconciliación con Stripe cubre las suscripciones.
 */
export async function initCaymusStore(): Promise<void> {
  const client = getPool();
  if (!client) {
    console.log("Caymus store: DATABASE_URL no configurada; usando solo archivos JSON locales.");
    return;
  }
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS caymus_kv (
        key TEXT PRIMARY KEY,
        value JSONB NOT NULL,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
      )
    `);
    storeAvailable = true;

    for (const key of Object.keys(FILES) as CaymusStoreKey[]) {
      const file = FILES[key];
      if (fs.existsSync(file)) continue; // el archivo local sobrevivió (hay volumen); es la fuente de verdad
      const result = await client.query("SELECT value FROM caymus_kv WHERE key = $1", [key]);
      if (!result.rows.length) continue;
      if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
      fs.writeFileSync(file, JSON.stringify(result.rows[0].value, null, 2));
      console.log(`Caymus store: '${key}' restaurado desde Postgres.`);
    }
    console.log("Caymus store: espejo en Postgres activo.");
  } catch (error) {
    storeAvailable = false;
    console.error("Caymus store: no se pudo inicializar Postgres; se continúa con archivos locales:", error);
  }
}

/**
 * Replica el contenido completo de una clave a Postgres en segundo plano.
 * Las escrituras por clave se encolan para preservar el orden; los errores se
 * registran y no afectan la petición en curso.
 */
export function mirrorCaymusData(key: CaymusStoreKey, value: unknown): void {
  if (!DATABASE_URL || !storeAvailable) return;
  const previous = writeQueue.get(key) || Promise.resolve();
  const next = previous
    .then(async () => {
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
