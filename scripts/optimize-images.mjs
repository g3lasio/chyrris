/**
 * Redimensiona cada imagen al tamaño en que realmente se muestra y genera WebP.
 *
 * El caso extremo del sitio anterior: pocima-salvaje-logo.png pesaba 5.3 MB a
 * 2048×2048 y se mostraba a 128×128. El navegador descargaba cinco megabytes
 * para pintar un cuadrado de dos centímetros.
 *
 * Las fuentes viven en assets-src/ y NO se empaquetan. Este script escribe los
 * derivados en client/src/assets/generated/ (los importa el bundle, con hash y
 * caché larga) y los iconos/OG en client/public/.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(root, "assets-src");
const GEN = path.join(root, "client", "src", "assets", "generated");
const PUB = path.join(root, "client", "public");

await fs.mkdir(GEN, { recursive: true });
await fs.mkdir(path.join(PUB, "brand"), { recursive: true });
await fs.mkdir(path.join(PUB, "og"), { recursive: true });

const report = [];

async function bytes(file) {
  try {
    return (await fs.stat(file)).size;
  } catch {
    return 0;
  }
}

/**
 * @param {string} source        archivo de origen en assets-src/
 * @param {string} name          nombre base de salida
 * @param {number[]} widths      anchos a generar (para srcset)
 * @param {'contain'|'cover'} fit
 */
async function derive(source, name, widths, fit = "cover", height = null) {
  const input = path.join(SRC, source);
  const before = await bytes(input);
  if (!before) {
    console.warn(`optimize-images: falta ${source}, se omite`);
    return;
  }
  for (const width of widths) {
    const pipeline = sharp(input).resize({
      width,
      height: height ? Math.round((height / widths[widths.length - 1]) * width) : undefined,
      fit,
      background: { r: 12, g: 15, b: 20, alpha: 0 },
      withoutEnlargement: true,
    });
    const webp = path.join(GEN, `${name}-${width}.webp`);
    await pipeline.clone().webp({ quality: 78, effort: 5 }).toFile(webp);
    // Respaldo para navegadores sin WebP.
    const jpg = path.join(GEN, `${name}-${width}.jpg`);
    await pipeline
      .clone()
      .flatten({ background: "#0c0f14" })
      .jpeg({ quality: 80, progressive: true, mozjpeg: true })
      .toFile(jpg);
    report.push({ name: `${name}-${width}`, before, webp: await bytes(webp), jpg: await bytes(jpg) });
  }
}

// ── Imágenes de producto, a su tamaño real de despliegue ────────────────────
// Las tarjetas muestran los logos a 96px, y las cabeceras de ficha a 160px.
// Se generan 1x y 2x de cada uno.
await derive("pocima-salvaje-logo.png", "pocima-salvaje", [128, 256, 384], "contain");
await derive("tzotzil-bible.png", "tzotzil-bible", [128, 256, 384], "contain");
await derive("caymus-tanks-logo.jpg", "caymus-tanks", [128, 256, 384], "contain");

// ── Marca ───────────────────────────────────────────────────────────────────
await derive("chyrris-logo-mark.png", "chyrris-mark", [32, 64, 128], "cover");

// Lockup oficial (isotipo + "CHYRRIS TECHNOLOGIES"), recuperado del historial.
// Se recorta al contenido para quitar el margen muerto del render original y se
// emite a los anchos en que se muestra: 200px en el encabezado, 260px en el pie.
{
  const src = path.join(SRC, "chyrris-logo-official.jpg");
  if (await bytes(src)) {
    const trimmed = await sharp(src).trim({ threshold: 18 }).toBuffer();
    for (const width of [200, 260, 400, 520]) {
      const pipeline = sharp(trimmed).resize({ width, withoutEnlargement: true });
      const webp = path.join(GEN, `chyrris-lockup-${width}.webp`);
      await pipeline.clone().webp({ quality: 82, effort: 5 }).toFile(webp);
      const png = path.join(GEN, `chyrris-lockup-${width}.png`);
      await pipeline.clone().png({ compressionLevel: 9, palette: true, quality: 90 }).toFile(png);
      report.push({
        name: `chyrris-lockup-${width}`,
        before: await bytes(src),
        webp: await bytes(webp),
        jpg: await bytes(png),
      });
    }
  } else {
    console.warn("optimize-images: falta chyrris-logo-official.jpg, se omite el lockup");
  }
}

// ── Iconos y favicon ────────────────────────────────────────────────────────
const markSource = path.join(SRC, "chyrris-logo-mark.png");
if (await bytes(markSource)) {
  for (const size of [180, 192, 512]) {
    await sharp(markSource)
      .resize(size, size, { fit: "cover" })
      // Paleta indexada: un isotipo plano no necesita 24 bits y el archivo baja
      // de cientos de kilobytes a decenas.
      .png({ compressionLevel: 9, palette: true, quality: 90 })
      .toFile(path.join(PUB, "brand", `chyrris-logo-${size}.png`));
  }
  // favicon.ico: un PNG de 32×32 servido como .ico. Los navegadores lo aceptan
  // y evita depender de un codificador ICO. Antes /favicon.ico devolvía el HTML
  // del SPA.
  await sharp(markSource)
    .resize(32, 32, { fit: "cover" })
    .png({ compressionLevel: 9 })
    .toFile(path.join(PUB, "favicon.ico"));

  // Imagen de Open Graph, 1200×630. Usa el lockup oficial de marca —el que
  // lleva el wordmark— en vez de un isotipo suelto sobre un fondo plano: es lo
  // que se ve al compartir el sitio y en las vistas previas de los buscadores
  // con IA.
  const lockupSource = path.join(SRC, "chyrris-logo-official.jpg");
  if (await bytes(lockupSource)) {
    await sharp(lockupSource)
      .resize(1200, 630, { fit: "cover", position: "centre" })
      .png({ compressionLevel: 9, palette: true, quality: 90 })
      .toFile(path.join(PUB, "og", "chyrris-og.png"));
  } else {
    const mark = await sharp(markSource).resize(300, 300, { fit: "cover" }).png().toBuffer();
    await sharp({ create: { width: 1200, height: 630, channels: 4, background: "#0c0f14" } })
      .composite([{ input: mark, gravity: "center" }])
      .png({ compressionLevel: 9, palette: true, quality: 90 })
      .toFile(path.join(PUB, "og", "chyrris-og.png"));
  }
}

const totalBefore = [...new Set(report.map((r) => `${r.name.split("-").slice(0, -1).join("-")}:${r.before}`))]
  .reduce((n, s) => n + Number(s.split(":").pop()), 0);
const totalAfter = report.reduce((n, r) => n + r.webp, 0);
console.log(
  `optimize-images: ${report.length} derivados. ` +
    `Originales ${(totalBefore / 1024).toFixed(0)} KB -> WebP ${(totalAfter / 1024).toFixed(0)} KB`,
);
for (const r of report) {
  console.log(`  ${r.name}: webp ${(r.webp / 1024).toFixed(1)} KB · jpg ${(r.jpg / 1024).toFixed(1)} KB`);
}
