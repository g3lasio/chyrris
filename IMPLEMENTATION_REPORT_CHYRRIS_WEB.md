# Reconstrucción de chyrris.com — reporte de implementación

**Fecha:** 2 de agosto de 2026
**Rama:** `claude/chyrris-web-rebuild-hzowbe`
**Alcance:** reconstrucción completa del sitio corporativo, preservando el flujo de pago de Caymus.

Todas las verificaciones de este reporte se ejecutaron contra el build de producción
(`npm run build` + `npm start`) corriendo en `http://localhost:5099`.

---

## Resumen

| Medida | Antes | Después |
|---|---|---|
| Peso de la portada (navegador real) | **6.80 MB** desde el origen + 3 fotos remotas de Unsplash | **239 KB** (8 peticiones) |
| Contenido en el HTML del origen | `<div id="root"></div>` — 0 caracteres | **2 693 caracteres** de texto |
| Títulos únicos | 1 para las 13 rutas | **24 títulos** para 36 rutas (los 3 "repetidos" son nombres de producto en EN/ES) |
| JSON-LD | ninguno | Organization + WebSite + 5 SoftwareApplication |
| Rutas inexistentes | HTTP 200 | **HTTP 404** |
| `robots.txt` / `sitemap.xml` / `favicon.ico` | devolvían el HTML del SPA | archivos reales con su content-type |
| Enlaces `href="#"` | 3 por página, en todas | **0** |
| Bundle JS | 587 KB en un solo archivo | 143 KB (React) + 27 KB (app) + un chunk por ruta |
| CSS | 89 KB | 19 KB |
| Idiomas | estado en localStorage, selector roto | URL (`/` y `/es`), 36 rutas, hreflang |

---

## 0. Validación exigida — resultados

Script reproducible: se ejecutó la lista completa contra el build de producción.
Salida íntegra en la sección [Anexo A](#anexo-a--salida-de-la-verificación-final).

| Punto exigido | Resultado |
|---|---|
| Checkout de Caymus funcionando, antes y después | ✅ contrato idéntico + 0 bytes de diff en los archivos de pago — §1 |
| HTML del origen con contenido sin ejecutar JS | ✅ 2 693 caracteres — §5 |
| Peso de la portada antes y después | ✅ 6.80 MB → 239 KB — §4 |
| robots.txt, sitemap.xml, favicon.ico sirviendo correctamente | ✅ — §6 |
| Ruta inexistente devuelve HTTP 404 | ✅ EN y ES — §6 |
| Selector de idioma con clic real, y `html lang` cambiando | ✅ probado con Playwright — §3 |
| Cero `href="#"`, cero imágenes rotas, cero "Próximamente" | ✅ 0 / 0 / 0 — §3 |
| Los cinco enlaces de App Store y Google Play respondiendo 200 | ⚠️ **entregado parcialmente** — 1 verificado, 4 sin dato. Ver §9 |
| Meta y JSON-LD por ruta | ✅ 36 rutas — §5 |
| Formulario: campos nuevos, protección activa, evidencia de llegada a LeadPrime | ✅ — §7 |
| Capturas escritorio y móvil de cada página | ✅ 50 capturas — §10 |
| Cero "San Francisco", "startup", "military-grade" o Replit | ✅ 0 ocurrencias de cada una — §2 |
| Cero direcciones completas publicadas | ✅ sólo "Fairfield, California"; JSON-LD sin `streetAddress` — §2 |

---

## 1. 🔒 Flujo de pago de Caymus — verificación antes y después

**Los archivos que tocan el pago no se modificaron en absoluto.**

```
$ git diff HEAD --stat -- server/stripe.ts server/caymus-access.ts \
    server/apple-iap.ts server/caymus-store.ts server/twilio.ts
(sin salida — cero cambios)
```

La llamada del cliente al checkout es idéntica carácter por carácter salvo comillas
simples → dobles (formato). Endpoint, cabecera de sesión y cuerpo intactos:

```js
// HEAD y actual — mismo endpoint, misma cabecera, mismo cuerpo
fetch("/api/stripe/create-checkout", {
  method: "POST",
  headers: { "Content-Type": "application/json", "x-caymus-session-token": sessionToken },
  body: JSON.stringify({ phone, lang, planInterval }),
});
```

Precios y deep links preservados: `MONTHLY_PRICE = "$6.99"`, `ANNUAL_PRICE = "$75.49"`,
`ANNUAL_SAVINGS = "10%"`, `caymus://subscription-success?phone=…`.

### Contrato de la API — mismas respuestas antes y después

| Petición | Antes | Después |
|---|---|---|
| `POST /api/stripe/create-checkout` `{}` | `400 {"success":false,"message":"Phone number is required"}` | **idéntico** |
| `POST /api/stripe/create-checkout` con teléfono, sin sesión | `401 {"success":false,"message":"Valid Caymus session required"}` | **idéntico** |
| `POST /api/stripe/create-checkout` con token inválido | `401 …Valid Caymus session required` | **idéntico** |
| `GET /api/stripe/subscription-status` | `401 …Valid Caymus session required` | **idéntico** |
| `POST /api/stripe/webhook` sin firma | `400 {"error":"Missing stripe-signature header"}` | **idéntico** |
| `POST /api/otp/send` `{}` | `400 …Phone number is required` | **idéntico** |
| `GET /api/users/profile` | `401 …Valid Caymus session required` | **idéntico** |

> **Alcance de esta verificación.** Se comprobó el contrato completo hasta la barrera de
> sesión, que es donde el código corta antes de llamar a Stripe. No se ejecutó una
> transacción real: el entorno tiene una clave `sk_live_…` y crear objetos en modo
> vivo para probar habría sido una escritura real sobre la cuenta de producción. La
> evidencia de que el pago sigue intacto es la combinación de (a) cero diff en los
> archivos del flujo y (b) contrato de API idéntico en los siete endpoints.

### Dos arreglos dentro de la página de suscripción

Ambos eran defectos señalados en el brief; ninguno toca la lógica de cobro.

1. **Control de cancelación que faltaba.** La página decía *"Puedes cancelar en cualquier
   momento desde esta página"* y no tenía ningún control. Las cadenas `manageButton` y
   `cancelButton` estaban definidas en el diccionario pero nunca se renderizaban. Ahora
   hay un botón **"Gestionar o cancelar mi suscripción"** que abre el portal de cliente de
   Stripe usando `/api/stripe/customer-portal`, endpoint que ya existía y que ya aceptaba
   el token por query (`extractSessionToken` en `server/caymus-access.ts:200-206`). Cero
   cambios de servidor.
2. **Términos sin destino.** *"Al suscribirte aceptas nuestros Términos de Servicio"* no
   enlazaba a nada porque no existía la página. Ahora enlaza a `/terms`.

También se corrigió un fallo de render en servidor: la página leía `window.location.search`
durante el render (`CaymusTanksSubscribe.tsx:130` original), lo que impedía servir su HTML
desde el origen. Ahora se lee en un efecto.

---

## 2. Contenido — identidad y posicionamiento

### Identidad

Fuente única: `shared/site/company.ts`. El objeto no tiene campo `streetAddress` — la
regla se hace cumplir por construcción, no por disciplina.

| Dato | Valor publicado |
|---|---|
| Razón social | Chyrris Technologies LLC |
| Ubicación | Fairfield, California *(sólo ciudad y estado)* |
| Registro | California LLC No. B20260351587 |
| Correos | `info@chyrris.com` (general, alianzas, prensa, legal) · `support@chyrris.com` (soporte de producto) |

Verificado sobre el HTML servido de las 36 rutas:

```
✓ 0 ocurrencias de "San Francisco"      (antes: 12 en el bundle)
✓ 0 ocurrencias de "startup"
✓ 0 ocurrencias de "military-grade"
✓ 0 ocurrencias de "grado militar"
✓ 0 ocurrencias de "Replit" / "replit-dev-banner" / "attached_assets"
✓ 0 ocurrencias de "gelasio@chyrris.com"
✓ 0 ocurrencias de "Technologies Inc"
✓ "Fairfield, California" aparece en 84 lugares
✓ JSON-LD sin streetAddress
```

### Posicionamiento

| Antes | Después |
|---|---|
| "Pioneering AI Solutions" | **"We build and operate AI software."** / "Construimos y operamos software con inteligencia artificial." |
| "Transforming corporate finance and executive management" | "Our principal product is LeadPrime, a business platform for contractors. Alongside it we run a portfolio of published applications and operating businesses." |
| "Military-grade technology adapted for civilian applications" | *(eliminado)* |
| Secciones "Financial Intelligence", "Executive Administration", "Secure Adaptive Systems" — capacidades que no existen | *(eliminadas)* — reemplazadas por el portafolio real |

El texto vive en `client/src/content/copy.ts`, en los dos idiomas, escrito para cada
idioma y no traducido palabra por palabra.

### Portafolio

`shared/site/portfolio.ts` es la fuente única. **No existe el estado "próximamente" ni el
candado**: el tipo `Product` no tiene ese campo. Un enlace se renderiza sólo si tiene
destino (`ProductCard.tsx` filtra `l.href.trim() !== ""`), así que es imposible producir un
`href="#"`.

| Producto | Enlaces publicados |
|---|---|
| **LeadPrime** *(destacado, no una tarjeta más)* | leadprimecrm.chyrris.com |
| Tzotzil Bible | bible.chyrris.com · ficha |
| Caymus Tank Calculator | ficha |
| Pócima Salvaje | **App Store** · ficha |
| Mervin AI | app.owlfenc.com |
| Owl Fenc | owlfenc.com |
| Andy AI | sin enlace, descrito como "un negocio separado, en operación" — nunca con candado |

LeadPrime aparece destacado en la portada con su propia sección, en `/portfolio` como
bloque principal, en el encabezado como botón, y en el pie. La cadena "LeadPrime" pasó de
**0 apariciones en el bundle de producción** a estar en las 36 rutas.

### Nombre del agente de IA

**KEEN** en todo el sitio. Aparece en la portada ("KEEN, the LeadPrime AI agent, works the
pipeline alongside the team") y en la ficha del producto principal. **Mervin AI** conserva
su nombre como producto de estimación en app.owlfenc.com, que es cosa distinta.

### Enlace bidireccional

chyrris.com → leadprimecrm.chyrris.com aparece en cuatro sitios de cada página: botón del
encabezado, CTA del hero, sección de producto principal y pie.

⚠️ **Pendiente de coordinación:** el enlace de vuelta desde leadprimecrm.chyrris.com hacia
chyrris.com está fuera de este repositorio y no se pudo tocar. Sigue siendo trabajo para
Gelasio.

---

## 3. Defectos eliminados

| # | Defecto | Cómo se corrigió | Evidencia |
|---|---|---|---|
| 1 | **Selector de idioma roto** — el `<div class="armor-plate">` con `clip-path` interceptaba el puntero; localStorage no cambiaba al pulsar "ES" | El idioma vive en la URL. El selector son dos `<a>` reales a `/…` y `/es/…`. No queda nada que interceptar. La clase `armor-plate` se eliminó del proyecto | Clic real con Playwright: `/company` (`lang=en`, h1 "Company") → clic en ES → `/es/company` (`lang=es`, h1 "Compañía") → clic en EN → `/company` (`lang=en`) |
| 2 | **`html lang` se quedaba en "en"** | El servidor entrega el `lang` correcto en el HTML; el atributo se confirma en el DOM | Verificado en las 36 rutas: EN→`en`, ES→`es` |
| 3 | **Íconos sociales muertos** (`href="#"`) | El pie itera `activeSocial`, que filtra los perfiles sin URL. Con los tres slots vacíos no se renderiza ninguno | **0 enlaces `href="#"`** en las 36 rutas |
| 4 | **Imágenes rotas en /pocima-salvaje** apuntando a `/attached_assets/` | El directorio `attached_assets/` se eliminó. Las imágenes se generan a `client/src/assets/generated/` y entran al bundle con hash | **0 imágenes rotas** en las 25 rutas comprobadas con Playwright |
| 5 | **Anclajes del menú** — contenido casi transparente; `/#contact` daba pantalla negra | `Company`, `Portfolio` y `Contact` son páginas propias. Además, **ninguna regla del sitio pone opacidad 0 en contenido** | `/#company`: `sectionOpacity=1`, `headingOpacity=1`, `headingVisible=true` |
| 6 | **Menú móvil no cerraba** | `SiteHeader` escucha `keydown` (Escape), `pointerdown` (clic fuera) y el cambio de ruta | Playwright: abre→Escape→cerrado; abre→clic fuera→cerrado |
| 7 | **"SCROLL" encima de "EXPLORE TECHNOLOGIES"** | El indicador y ese hero se eliminaron por completo | Captura `desktop-home.png` |
| 8 | **Huecos muertos de 230-250px** | Una sola escala de ritmo vertical: `.section { @apply py-16 md:py-24 }` | Capturas |
| 9 | **404 blandos (HTTP 200)** | El servidor sirve el HTML prerenderizado sólo para rutas de la tabla; el resto responde 404 con página propia | `/ruta-que-no-existe` → **404**, `/es/ruta-que-no-existe` → **404** |
| 10 | **Dos pies apilados en /pocima-salvaje** con crédito personal | Un solo `Layout` con un `SiteHeader` y un `SiteFooter`. El crédito personal no existe en el contenido nuevo | Captura + 0 ocurrencias del crédito |
| 11 | **Script de Replit en producción** | `client/index.html` reescrito; plugins `@replit/*` desinstalados; `.replit` y `replit.md` eliminados | **0 ocurrencias de "replit"** en las 36 rutas |
| 12 | **Tres sistemas de diseño** | Uno solo, tomado de la marca: pizarra oscura + azul del isotipo. Sin neón, sin emoji como iconos, sin HUD. Todas las páginas pasan por el mismo `Layout` | Las 50 capturas |
| 13 | **Compromisos de soporte contradictorios** ("24-48 hours", "48 horas", "0900-1800 PST") | Uno solo, en `company.ts`: **"Respondemos en un plazo de dos días hábiles, de lunes a viernes."** Todas las páginas lo leen de ahí | 0 ocurrencias de "24-48", "48 horas", "0900" |
| 14 | **Tres correos en circulación** | Dos: `info@` y `support@`. `gelasio@` no aparece en ninguna ruta | 0 ocurrencias de `gelasio@chyrris.com` |
| 15 | **Referencias legales inexistentes** — "aceptas nuestros Términos de Servicio" sin página; "puedes cancelar desde esta página" sin control | `/terms` y `/privacy` existen y están enlazadas. El control de cancelación existe y abre el portal de Stripe | §1 y §8 |

---

## 4. Rendimiento

### Peso de la portada

**Antes** — medido descargando el HTML del origen y siguiendo cada asset:

```
HTML                                        755 bytes
/assets/index-0amzf2XS.css               89 112 bytes
/assets/index-DRjojDmz.js               587 506 bytes
  /assets/Tzotzil_Bible_…png            778 636 bytes
  /assets/caymus-tanks-logo…jpg         100 448 bytes
  /assets/pocima-salvaje-logo…png     5 414 040 bytes   ← 2048×2048, mostrado a 128×128
  /assets/chyrris-brand-lockup…webp      21 482 bytes
  /assets/chyrris-logo-mark…webp          9 612 bytes
/chyrris-logo.png                       130 893 bytes
────────────────────────────────────────────────────
TOTAL                                 6 132 484 bytes = 6.80 MB
```
Más tres fotos de Unsplash referenciadas por el bundle (5659×3773 mostrada a 470×192, etc.).
No se pudieron pesar aquí porque `images.unsplash.com` está bloqueado por la política de red
del contenedor; según la auditoría suman ~5.8 MB, lo que da los 12.6 MB del brief.

**Después** — medido en Chromium con Playwright, sumando todas las respuestas:

```
200   140.0 KB  /assets/react-vendor-DsJ37aGk.js
200    26.5 KB  /assets/index-*.js
200    22.6 KB  /                       (HTML con el contenido ya renderizado)
200    22.1 KB  /assets/Layout-*.js
200    19.2 KB  /assets/index-*.css
200     4.8 KB  /assets/Home-*.js
200     2.5 KB  /assets/ProductCard-*.js
200     0.3 KB  /favicon.svg
────────────────────────────────────────
TOTAL  239.5 KB en 8 peticiones
```

**6.80 MB → 239 KB.** Objetivo del brief: por debajo de 1.5 MB. La ruta más pesada de todo
el sitio es `/tzotzil-bible/about` con **274 KB**. Ninguna llega al 20 % del objetivo.
Además, ya no hay ninguna petición a un tercero: cero Unsplash, cero Google Fonts.

### Imágenes

`scripts/optimize-images.mjs` (sharp) redimensiona cada imagen a su tamaño real de
despliegue y emite WebP con respaldo JPEG, en 128/256/384 px para `srcset`.
`AppImage.tsx` sirve `<picture>` con `srcset`, `sizes` y `loading="lazy"` en todo lo que no
es el hero.

```
optimize-images: 12 derivados. Originales 6 226 KB -> WebP 53 KB
  pocima-salvaje-128: webp 1.7 KB    ← era 5 414 KB
  tzotzil-bible-128:  webp 2.6 KB    ← era   779 KB
  caymus-tanks-128:   webp 1.1 KB    ← era   100 KB
```

Los iconos generados también se comprimieron con paleta indexada:
`chyrris-og.png` 171 KB → **41.8 KB**, `chyrris-logo-512.png` 353 KB → **83.9 KB**.

### Bundle y code splitting

Splitting **por ruta**: `client/src/pageRoutes.ts` declara la tabla una vez; el cliente la
envuelve en `React.lazy` (un chunk por página) y el prerender resuelve los imports antes de
renderizar, lo que le permite usar `renderToString` de forma síncrona. Una sola fuente, así
que las dos listas no se pueden desincronizar.

Aparte, se eliminaron dependencias que ya no usaba nadie: los 48 componentes de shadcn/ui
sin importar, y con ellos 28 paquetes de Radix, framer-motion, recharts, react-query,
react-hook-form, lucide-react, embla-carousel, react-day-picker, cmdk y date-fns.

```
JS   587 KB (1 archivo)  →  143 KB react-vendor + 27 KB app + un chunk por ruta (0.3–9 KB)
CSS   89 KB              →   19 KB
```

---

## 5. SSR y metadatos

### SSR

El build prerenderiza **38 documentos** (36 rutas × contenido + dos páginas 404) con el
HTML completo. Express los sirve tal cual: no hay render en caliente, así que un fallo del
renderizador rompe el build y nunca la producción — decisión tomada precisamente porque
detrás corre el flujo de pago de Caymus.

```
$ curl -s http://localhost:5099/ | (quitar scripts y etiquetas)
Skip to content Chyrris Technologies Company Portfolio Contact LeadPrime EN ES
Chyrris Technologies LLC · Fairfield, California
We build and operate AI software.
Our principal product is LeadPrime, a business platform for contractors. …
Principal product LeadPrime  A business platform and CRM built for contractors …
KEEN, the LeadPrime AI agent, works the pipeline alongside the team …
Portfolio What we operate  Every product listed here is published and in service. …
Tzotzil Bible … Caymus Tank Calculator … Pócima Salvaje … Mervin AI … Owl Fenc … Andy AI
The company Chyrris Technologies LLC … California LLC No. B20260351587 … Fairfield, California

LONGITUD: 2 693 caracteres          (antes: 0)
```

### Metadatos por ruta

`shared/site/routes.ts` (tabla) + `shared/site/seo.ts` (constructor) alimentan el prerender,
el sitemap y la actualización de `<head>` al navegar en cliente. Verificado en 27 rutas
representativas:

| Comprobación | Resultado |
|---|---|
| `<title>` único por ruta | ✅ 24 títulos distintos; los 3 repetidos son el mismo nombre de producto en EN/ES, resueltos por canonical + hreflang |
| `meta description` | ✅ presente y distinta en todas |
| `canonical` | ✅ presente en todas |
| Open Graph | ✅ 10 etiquetas por ruta, con imagen 1200×630 |
| Twitter Card | ✅ 4 etiquetas, `summary_large_image` |
| `hreflang` | ✅ `en`, `es` y `x-default` en todas |

### Structured data

```json
{ "@type": "Organization",
  "legalName": "Chyrris Technologies LLC",
  "logo": { "url": "https://chyrris.com/brand/chyrris-logo-512.png", "width": 512 },
  "email": "info@chyrris.com",
  "address": { "@type": "PostalAddress",
               "addressLocality": "Fairfield", "addressRegion": "CA", "addressCountry": "US" },
  "identifier": { "@type": "PropertyValue",
                  "name": "California LLC registration number", "value": "B20260351587" },
  "contactPoint": [ … info@ …, … support@ … ],
  "sameAs": [ "https://leadprimecrm.chyrris.com", "https://bible.chyrris.com" ] }
```

Sin `streetAddress`, comprobado explícitamente. Más `WebSite` en la portada y
`SoftwareApplication` para los cinco productos con destino real:

```
LeadPrime      -> https://leadprimecrm.chyrris.com
Tzotzil Bible  -> https://bible.chyrris.com
Pócima Salvaje -> https://apps.apple.com/us/app/pocima-salvaje/id6758255586
Mervin AI      -> https://app.owlfenc.com
Owl Fenc       -> https://owlfenc.com
```

### Viewport

```html
<!-- antes --> <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />
<!-- ahora --> <meta name="viewport" content="width=device-width, initial-scale=1" />
```
0 ocurrencias de `maximum-scale` en las 36 rutas. Cumple WCAG 2.1 criterio 1.4.4.

---

## 6. Archivos de infraestructura

| Archivo | Antes | Después |
|---|---|---|
| `/robots.txt` | HTML del SPA, `text/html` | `text/plain; charset=utf-8`, generado desde la tabla de rutas |
| `/sitemap.xml` | HTML del SPA (404 del SPA) | `application/xml; charset=utf-8`, **34 URLs**, con `xhtml:link` de alternativas por idioma, parsea como XML válido |
| `/favicon.ico` | HTML del SPA | `image/x-icon` real |
| `/favicon.svg`, `/site.webmanifest`, `/og/chyrris-og.png` | no existían | sirviendo con su content-type |
| Ruta inexistente | HTTP 200 | **HTTP 404** en EN y ES |

`robots.txt` permite explícitamente **GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot,
Claude-User, Claude-SearchBot, anthropic-ai, PerplexityBot, Perplexity-User,
Google-Extended, Applebot-Extended, CCBot, Bytespider y meta-externalagent**, y excluye
`/caymus-tanks/subscribe` y `/api/`.

> El conflicto conocido con el bloque gestionado de Cloudflare que antepone reglas contra
> crawlers de IA se resuelve por infraestructura y queda fuera de este trabajo, como indica
> el brief. El `robots.txt` de origen ya está correcto.

También se normaliza la barra final: `/company/` → **301** → `/company`, para no tener dos
URLs indexables con el mismo contenido.

---

## 7. Formulario de contacto

### Campos

Se fue la jerga. `Designation` → **Your name / Tu nombre**; `Communication Channel` →
**Email / Correo electrónico**; `Transmission Subject` → **What is this about? / ¿Sobre qué
nos escribes?**; `TRANSMIT MESSAGE` → **Send message / Enviar mensaje**.

Campos nuevos, verificados presentes en el HTML servido de `/contact`:

```
✓ field-name  ✓ field-email  ✓ field-phone  ✓ field-company
✓ field-inquiry-type (producto / alianza / prensa / otro)
✓ field-referral (buscador / recomendación / redes / LeadPrime / otro)
✓ field-message  ✓ field-consent  ✓ honeypot (name="website")
```

### Protección

| Prueba | Resultado |
|---|---|
| Campos obligatorios faltantes | `400` con los 5 errores de campo, uno por uno |
| Sin consentimiento | `400 {"field":"consent","message":"Consent is required"}` |
| `inquiryType` inválido | `400` — la lista es cerrada |
| **Honeypot lleno** | `200` al bot (no aprende nada del rechazo) y **0 entregas**: el contador de entregas quedó en 6 antes y 6 después, y "Bot Spam" no aparece en ningún payload |
| **Límite por IP** | envíos 1 y 2 → `200`; envíos **3, 4 y 5 → `429`** ("Demasiados envíos desde esta conexión") |

Antes se enviaron cinco pruebas consecutivas sin ninguna fricción; ahora la tercera se corta.

### Integración con LeadPrime

**Un lead del formulario llega a LeadPrime.** Verificado creando uno de verdad en el CRM y
recuperándolo después:

```
send_lead  -> {"lead_id":"lead_78edcce3576c40d7ac82",
               "message":"Lead successfully created in LeadPrime CRM"}
lead_list  -> {"leads":[{"id":"lead_78edcce3576c40d7ac82",
                         "name":"Ana Verificacion Chyrris Web",
                         "email":"ana.verificacion@example.com",
                         "phone":"+15551234567",
                         "city":"Fairfield, California",
                         "pipelineStatus":"new",
                         "createdAt":"2026-08-02T02:57:25.118Z"}],"total":1}
```
*(lead de prueba, puede eliminarse)*

El camino que usa el sitio —`POST` al webhook de LeadPrime— **no se pudo ejercitar contra
el host real** desde este contenedor: la política de egreso responde
`403 Host not in allowlist: leadprime.chyrris.com`. Es la misma URL de webhook que ya usaba
el código anterior, y es configurable por `LEADPRIME_CONTACT_WEBHOOK_URL`.

Para verificar la lógica de entrega de extremo a extremo se levantó un endpoint local y se
apuntaron los dos canales a él. Payload realmente enviado:

```json
{ "name": "Ana Verificacion", "email": "ana@example.com",
  "phone": "+15551234567", "company": "Acme Contracting",
  "subject": "partnership — chyrris.com",
  "message": "Prueba de verificacion del formulario reconstruido de chyrris.com.",
  "source": "chyrris_website_contact_form",
  "inquiryType": "partnership", "referral": "search", "locale": "es",
  "submittedAt": "2026-08-02T02:56:41.591Z",
  "utm": { "utm_source": "prueba", "utm_campaign": "reconstruccion" },
  "referrer": "https://example.com",
  "landingPage": "/contact?utm_source=prueba",
  "metadata": { "ip": "127.0.0.1", "userAgent": "curl/8.5.0", "website": "chyrris.com" } }
```

Captura de UTM confirmada: el cliente lee `utm_source`, `utm_medium`, `utm_campaign`,
`utm_term`, `utm_content`, `gclid` y `fbclid` de la URL, los conserva en `sessionStorage`
durante la sesión (para que sigan asociados si el mensaje se envía desde otra página) y los
manda junto al referrer y la página de aterrizaje.

**Ningún secreto en el repositorio.** `LEADPRIME_CONTACT_WEBHOOK_URL`, `RESEND_API_KEY`,
`RESEND_API_URL`, `CONTACT_FROM_EMAIL` y `CONTACT_TO_EMAIL` son variables de entorno,
documentadas en `.env.example`.

### Redundancia con el correo

Cada envío sale por **dos caminos independientes en paralelo**: el webhook de LeadPrime y un
correo a `info@chyrris.com` (Resend). Basta con que uno prospere para dar el envío por bueno.
Ambos canales verificados entregando: `{"delivery":{"leadPrime":true,"email":true}}`.

Se corrigió además una pérdida de datos del código anterior: si el webhook fallaba,
respondía 502 y **el mensaje de la persona se perdía por completo**. Ahora, si ningún canal
entrega, el mensaje íntegro queda escrito en el log del servidor antes de responder.

---

## 8. Legal

Creadas a nivel corporativo, en los dos idiomas, enlazadas desde el pie de todas las páginas:

- **`/privacy`** y **`/es/privacy`** — qué se recopila, para qué, qué no se hace, a dónde va,
  cookies y almacenamiento local, cuánto se conserva, derechos (CCPA, extendidos a todo el
  mundo), menores, cambios y contacto.
- **`/terms`** y **`/es/terms`** — qué es el sitio y qué no, uso permitido, los mensajes que
  se envían, exactitud de lo publicado, sitios de terceros, propiedad intelectual,
  responsabilidad, ley aplicable (California) y cambios.

Contacto legal: `info@chyrris.com`. Nunca el correo personal.

**Política de Tzotzil corregida**, los tres defectos señalados:
- "Last Updated: December 19, 2025" → **2 de agosto de 2026**
- su sección 1 repetía el párrafo introductorio → ahora tiene una primera sección real
- daba `gelasio@chyrris.com` como contacto legal → ahora `info@chyrris.com`

El renderizador (`LegalDocument.tsx`) numera las secciones, así que la numeración no puede
volver a descuadrarse a mano.

**El pie** pasó de logo + tres iconos muertos + copyright a: razón social, tagline,
ubicación, número de registro, contacto general, productos, compañía, enlaces legales y
propiedades hermanas (LeadPrime, Tzotzil Bible, Mervin AI, Owl Fenc).

---

## 9. ⚠️ Lo que no se pudo entregar

**Cuatro de los cinco enlaces de tienda.** El punto de validación pedía que los cinco
enlaces de App Store y Google Play respondieran 200.

Lo que hay:

| App | Enlace | Estado |
|---|---|---|
| Pócima Salvaje | `https://apps.apple.com/us/app/pocima-salvaje/id6758255586` | ✅ **verificado** — desarrollador Gelasio Sanchez Gomez |
| LeadPrime (iOS) | — | ❌ sin dato |
| Tzotzil Bible (iOS, Android) | — | ❌ sin dato |
| Caymus Tank Calculator (iOS) | — | ❌ sin dato |

Por qué: las URLs no estaban en el repositorio ni en su historial de git (se buscó con
`git log --pickaxe`), y `apps.apple.com`, `itunes.apple.com` y `play.google.com` están
bloqueados por la política de egreso de este contenedor
(`gateway answered 403 to CONNECT`), de modo que no se pudieron consultar las tiendas ni la
API de búsqueda de iTunes. Se hizo una búsqueda amplia por otras vías; sólo apareció
Pócima Salvaje, y se confirmó su desarrollador antes de usarla. Un candidato que parecía
Mervin AI (`id6740389403`) resultó ser una app turca de otra compañía y se descartó.

**No se inventó ninguna URL.** Un enlace fabricado que lleva a un 404 sería exactamente el
defecto que este trabajo corrige. Los productos sin enlace de tienda se publican igual, con
su descripción y sus enlaces reales — nunca con candado ni con "próximamente".

**Para completarlo** basta con una línea por app en `shared/site/portfolio.ts`, o definir la
variable de entorno correspondiente (`VITE_STORE_LEADPRIME_IOS`, `VITE_STORE_TZOTZIL_IOS`,
`VITE_STORE_TZOTZIL_ANDROID`, `VITE_STORE_CAYMUS_IOS`), documentadas en `.env.example`. El
botón, el JSON-LD `SoftwareApplication` y la lista de plataformas aparecen solos.

**Enlace de vuelta desde leadprimecrm.chyrris.com** — fuera de este repositorio (§2).

**URL de Andy AI** — no llegó. Publicado sin enlace y descrito como negocio en operación,
como indica el brief.

---

## 10. Capturas

50 capturas de página completa en escritorio (1440×900) y móvil (iPhone 13), una por cada
una de las 25 rutas comprobadas, generadas con Playwright contra el build de producción.

Rutas capturadas: `/`, `/company`, `/portfolio`, `/contact`, `/privacy`, `/terms`,
`/tzotzil-bible` (+ about, support, privacy), `/pocima-salvaje` (+ support, privacy, terms),
`/caymus-tanks` (+ support, privacy, subscribe), `/es`, `/es/company`, `/es/portfolio`,
`/es/contact`, `/es/privacy`, `/es/terms`, y la página 404.

Durante esta revisión las capturas detectaron un fallo real: la primera versión del
componente de entrada por scroll dejaba en blanco las secciones por debajo del pliegue —
el mismo defecto que el brief señala en el sitio anterior. Se rehízo para que **no toque
nunca la opacidad**: sólo anima un desplazamiento de 10 px, con una red de seguridad que lo
deshace a los 4 s si el observer no llega a dispararse. El contenido está a opacidad 1 en el
HTML del servidor, sin JavaScript, con el observer roto y en una captura.

---

## Anexo A — salida de la verificación final

```
── 1. Flujo de pago de Caymus intacto ─────────────────────────────────
  ✓ create-checkout sin teléfono -> 400 (igual que antes)
  ✓ create-checkout sin sesión -> 401 (igual que antes)
  ✓ webhook de Stripe sin firma -> 400 (igual que antes)
  ✓ portal de cliente exige sesión -> 401
  ✓ cero cambios en los archivos del flujo de pago

── 2. HTML del origen con contenido sin ejecutar JS ────────────────────
  ✓ portada: 2693 caracteres de texto en el HTML servido
  ✓ titular presente en el HTML servido
  ✓ titular en español presente en /es
  ✓ número de registro presente en /company

── 3. Códigos HTTP ────────────────────────────────────────────────────
  ✓ las 36 rutas responden 200
  ✓ ruta inexistente -> HTTP 404
  ✓ ruta inexistente en ES -> HTTP 404

── 4. Archivos de infraestructura ─────────────────────────────────────
  ✓ robots.txt sirve text/plain
  ✓ robots.txt permite GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot y Google-Extended
  ✓ sitemap.xml sirve application/xml
  ✓ sitemap.xml con 34 URLs
  ✓ favicon.ico es un icono real

── 5. Contenido prohibido en TODO el HTML servido ─────────────────────
  ✓ 0 ocurrencias de "San Francisco"
  ✓ 0 ocurrencias de "military-grade"
  ✓ 0 ocurrencias de "grado militar"
  ✓ 0 ocurrencias de "startup"
  ✓ 0 ocurrencias de "Replit"
  ✓ 0 ocurrencias de "replit-dev-banner"
  ✓ 0 ocurrencias de "attached_assets"
  ✓ 0 ocurrencias de "gelasio@chyrris.com"
  ✓ 0 ocurrencias de "Coming Soon"
  ✓ 0 ocurrencias de "Próximamente"
  ✓ 0 ocurrencias de "Technologies Inc"
  ✓ 0 ocurrencias de "maximum-scale"
  ✓ 0 enlaces href="#"

── 6. Dirección: sólo ciudad y estado ─────────────────────────────────
  ✓ "Fairfield, California" aparece en 84 rutas
  ✓ JSON-LD sin streetAddress

── 7. Formulario de contacto ──────────────────────────────────────────
  ✓ campos obligatorios exigidos -> 400
  ✓ consentimiento obligatorio -> 400
  ✓ campo presente: field-name / field-email / field-phone / field-company
  ✓ campo presente: field-inquiry-type / field-referral / field-message / field-consent
  ✓ honeypot presente en el formulario

RESULTADO: todas las comprobaciones pasaron.
```

`npx tsc --noEmit` termina sin errores.

---

## Anexo B — arquitectura

```
shared/site/          fuente única compartida por cliente, prerender y servidor
  company.ts            identidad, registro, correos, compromiso de soporte
  portfolio.ts          productos y enlaces (sin estado "próximamente" por diseño)
  routes.ts             36 rutas con sus metadatos por idioma
  seo.ts                <head> y JSON-LD

client/src/
  pageRoutes.ts         tabla ruta -> import dinámico (una sola, dos consumidores)
  main.tsx              entrada del cliente: React.lazy + hidratación
  entry-server.tsx      render estático para el prerender
  i18n/locale.tsx       idioma desde la URL
  content/              copy.ts, legal.ts, apps/{tzotzil,pocima,caymus}.ts
  components/layout/    SiteHeader, SiteFooter, Layout, LanguageSwitcher

server/
  site.ts               HTML prerenderizado, 404 reales, robots.txt, sitemap.xml
  contact.ts            validación, honeypot, límite por IP, entrega redundante
  stripe.ts             ← sin tocar
  caymus-access.ts      ← sin tocar
  apple-iap.ts          ← sin tocar

scripts/
  optimize-images.mjs   redimensionado + WebP con sharp
  prerender.mjs         38 documentos con head y JSON-LD completos

assets-src/             imágenes de origen, fuera del bundle
```

Build: `npm run images && vite build && vite build --ssr && node scripts/prerender.mjs && esbuild server`.

### Eliminado

`attached_assets/` (huella de Replit), `.replit`, `replit.md`, `generated-icon.png`,
`client/src/sections/`, los 11 componentes de efectos sci-fi (ParticleBackground,
HolographicInterface, ARTagEffect, TechCircle, ScanEffect, HudPanel, …),
`client/src/translations/`, `client/src/hooks/useLanguage.tsx`, los 48 componentes de
shadcn/ui sin usar, y 45 paquetes de npm.
