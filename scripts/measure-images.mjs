/**
 * Mide el peso de imágenes y el peso total de una ruta en un navegador real.
 *
 * Existe porque un análisis estático del HTML no basta: srcset deja que el
 * navegador elija, y una imagen incrustada como data URI no aparece como
 * petición pero sí pesa. Aquí se cuentan las dos cosas.
 *
 * Uso: node scripts/measure-images.mjs [url] [--json]
 */
import { chromium } from "playwright";

const url = process.argv[2] || "http://localhost:5099/";
const asJson = process.argv.includes("--json");

const IMAGE_TYPES = /^image\//;

const browser = await chromium
  .launch({ executablePath: "/opt/pw-browsers/chromium" })
  .catch(() => chromium.launch());
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

let totalBytes = 0;
let imageBytes = 0;
const images = [];
const all = [];

page.on("response", async (res) => {
  const headers = res.headers();
  let size = Number(headers["content-length"] || 0);
  if (!size) {
    try {
      size = (await res.body()).length;
    } catch {
      size = 0;
    }
  }
  totalBytes += size;
  const type = headers["content-type"] || "";
  all.push({ url: res.url(), size, type, status: res.status() });
  if (IMAGE_TYPES.test(type)) {
    imageBytes += size;
    images.push({ url: res.url().replace(/^https?:\/\/[^/]+/, ""), size, type });
  }
});

await page.goto(url, { waitUntil: "networkidle", timeout: 45000 });
await page.waitForTimeout(400);

// Recorrer la página entera para disparar las imágenes en carga diferida. Sin
// esto sólo se mide lo que hay por encima del pliegue, y una imagen diferida
// que aún no cargó parece rota cuando simplemente no le ha tocado el turno.
await page.evaluate(async () => {
  const step = window.innerHeight * 0.8;
  for (let y = 0; y < document.body.scrollHeight; y += step) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 120));
  }
  window.scrollTo(0, 0);
});
await page.waitForLoadState("networkidle").catch(() => {});
await page.waitForTimeout(400);

// Imágenes incrustadas como data URI: no generan petición, pero sí pesan y
// cuentan como imágenes presentes en la página.
const inline = await page.evaluate(() =>
  Array.from(document.images)
    .filter((i) => (i.currentSrc || i.src).startsWith("data:"))
    .map((i) => ({ bytes: Math.floor(((i.currentSrc || i.src).length * 3) / 4), src: "data:" })),
);
const inlineBytes = inline.reduce((n, i) => n + i.bytes, 0);
imageBytes += inlineBytes;
totalBytes += inlineBytes;

// Imágenes que realmente se pintaron, para distinguir "sin imágenes" de
// "imágenes rotas".
//
// Rota = terminó de cargar y no tiene píxeles (complete && naturalWidth === 0).
// Una imagen con complete === false simplemente no ha cargado todavía; marcarla
// como rota daba un falso positivo en cada imagen diferida bajo el pliegue.
const rendered = await page.evaluate(() =>
  Array.from(document.images).map((i) => ({
    src: i.currentSrc || i.src,
    ok: i.naturalWidth > 0,
    pending: !i.complete,
    w: i.naturalWidth,
    h: i.naturalHeight,
  })),
);

await browser.close();

const result = {
  url,
  totalBytes,
  imageBytes,
  inlineImageBytes: inlineBytes,
  imageCount: rendered.length,
  brokenImages: rendered.filter((r) => !r.ok && !r.pending).map((r) => r.src),
  pendingImages: rendered.filter((r) => r.pending).length,
  requests: all.length,
  images,
};

if (asJson) {
  console.log(JSON.stringify(result, null, 2));
} else {
  console.log(`\n${url}`);
  console.log(`  peso total     ${(totalBytes / 1024).toFixed(1)} KB en ${all.length} peticiones`);
  console.log(`  peso imágenes  ${(imageBytes / 1024).toFixed(1)} KB en ${rendered.length} imágenes`);
  if (inlineBytes) console.log(`    (de las cuales ${(inlineBytes / 1024).toFixed(1)} KB incrustadas como data URI)`);
  if (result.brokenImages.length) console.log(`  ROTAS: ${result.brokenImages.join(", ")}`);
  console.log("\n  imágenes descargadas:");
  for (const i of images.sort((a, b) => b.size - a.size)) {
    console.log(`    ${(i.size / 1024).toFixed(1).padStart(8)} KB  ${i.url}`);
  }
  console.log("\n  10 recursos más pesados:");
  for (const r of all.sort((a, b) => b.size - a.size).slice(0, 10)) {
    console.log(`    ${(r.size / 1024).toFixed(1).padStart(8)} KB  ${r.url.replace(/^https?:\/\/[^/]+/, "")}`);
  }
}
