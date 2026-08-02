import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import { useLocale } from "@/i18n/locale";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import logoMark from "@/assets/generated/chyrris-mark-64.webp";
import logoMark2x from "@/assets/generated/chyrris-mark-128.webp";

const NAV = [
  { path: "/company", key: "company" as const },
  { path: "/portfolio", key: "portfolio" as const },
  { path: "/contact", key: "contact" as const },
];

export function SiteHeader() {
  const { t, path } = useLocale();
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  // El menú móvil anterior no respondía ni a Escape ni a un clic fuera: una vez
  // abierto, la única salida era tocar un enlace.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (panelRef.current?.contains(target)) return;
      if (buttonRef.current?.contains(target)) return;
      setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  // Cerrar también al cambiar de ruta.
  useEffect(() => setOpen(false), [location]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/90 backdrop-blur-md">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded focus:bg-accent focus:px-3 focus:py-2 focus:text-sm focus:text-white"
      >
        {t.nav.skipToContent}
      </a>

      <div className="container-site flex h-16 items-center justify-between gap-4">
        {/*
          El isotipo va como imagen y el wordmark como texto vivo.
          Se probó el lockup completo aquí: trae su propio fondo degradado
          horneado, así que a 36 px de alto se ve como una caja oscura con
          letras ilegibles sobre el encabezado. El lockup se usa donde funciona
          —la imagen de Open Graph, que es una tarjeta independiente— y el
          encabezado se queda con marca + texto, que es nítido a cualquier
          tamaño y además es seleccionable y traducible.
        */}
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded"
          aria-label="Chyrris Technologies"
          data-testid="logo-home"
        >
          <img
            src={logoMark}
            srcSet={`${logoMark} 1x, ${logoMark2x} 2x`}
            alt=""
            width={32}
            height={32}
            fetchPriority="high"
            className="h-8 w-8 rounded object-cover"
          />
          <span className="text-[15px] font-semibold tracking-tight text-text">
            Chyrris <span className="font-normal text-text-muted">Technologies</span>
          </span>
        </Link>

        <nav aria-label={t.nav.menu} className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => {
            const active = path === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`rounded px-3 py-2 text-sm transition-colors ${
                  active ? "text-text" : "text-text-muted hover:text-text"
                }`}
                aria-current={active ? "page" : undefined}
                data-testid={`nav-${item.key}`}
              >
                {t.nav[item.key]}
              </Link>
            );
          })}
          <a
            href="https://leadprimecrm.chyrris.com"
            className="ml-2 rounded bg-accent px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
            data-testid="nav-leadprime"
          >
            {t.nav.leadprime}
          </a>
          <span className="ml-2">
            <LanguageSwitcher />
          </span>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher />
          <button
            ref={buttonRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t.nav.close : t.nav.menu}
            className="rounded p-2 text-text-muted transition-colors hover:text-text"
            data-testid="mobile-menu-button"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-nav"
          ref={panelRef}
          className="border-t border-line bg-ink md:hidden"
          data-testid="mobile-nav"
        >
          <nav aria-label={t.nav.menu} className="container-site flex flex-col py-3">
            {NAV.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="rounded px-1 py-3 text-[15px] text-text-muted transition-colors hover:text-text"
                onClick={() => setOpen(false)}
              >
                {t.nav[item.key]}
              </Link>
            ))}
            <a
              href="https://leadprimecrm.chyrris.com"
              className="mt-2 rounded bg-accent px-4 py-3 text-center text-[15px] font-medium text-white"
            >
              {t.nav.leadprime}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

export { NAV as HEADER_NAV };
