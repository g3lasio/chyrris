import { useEffect } from "react";
import { buildHead } from "@shared/site/seo";
import { useLocale } from "@/i18n/locale";

/**
 * Mantiene el <head> al día durante la navegación en el cliente.
 *
 * En la primera carga el head ya viene completo desde el servidor (lo inyecta
 * el prerender), que es lo que ven los crawlers. Esto sólo cubre la navegación
 * posterior sin recarga: título, description, canonical, Open Graph, Twitter,
 * hreflang y JSON-LD.
 */
export function PageHead({ path }: { path: string }) {
  const { locale } = useLocale();

  useEffect(() => {
    const head = buildHead(path, locale);

    document.title = head.title;
    document.documentElement.lang = head.lang;

    // Retiramos sólo lo que gestionamos nosotros, para no tocar lo que Vite
    // u otros scripts hayan puesto en el head.
    document
      .querySelectorAll("[data-page-head]")
      .forEach((el) => el.remove());

    const frag = document.createDocumentFragment();
    for (const t of head.tags) {
      const el = document.createElement(t.tag);
      for (const [k, v] of Object.entries(t.attrs)) el.setAttribute(k, v);
      el.setAttribute("data-page-head", "");
      frag.appendChild(el);
    }
    for (const block of head.jsonLd) {
      const el = document.createElement("script");
      el.type = "application/ld+json";
      el.textContent = JSON.stringify(block);
      el.setAttribute("data-page-head", "");
      frag.appendChild(el);
    }
    document.head.appendChild(frag);
  }, [path, locale]);

  return null;
}
