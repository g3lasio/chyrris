import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/**
 * Entrada suave al hacer scroll, sin poder ocultar nada nunca.
 *
 * El sitio anterior animaba la opacidad desde 0 y dejaba secciones enteras casi
 * transparentes: entrar directo a /#contact daba pantalla negra. Un primer
 * intento aquí repitió el fallo — con el HTML servido correcto, las secciones
 * por debajo del pliegue se quedaban invisibles si el IntersectionObserver no
 * llegaba a dispararse.
 *
 * Así que la opacidad no se toca. El elemento está a opacidad 1 en todo
 * momento: en el HTML del servidor, sin JavaScript, con el observer roto y en
 * una captura de pantalla. Lo único que se anima es un desplazamiento de unos
 * píxeles, que no puede esconder texto ni aunque se quede a medias.
 */
export function Reveal({
  children,
  as: Tag = "div",
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    // Ya visible al montar: se queda exactamente como está.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;

    el.style.transform = "translateY(10px)";
    el.style.transition = `transform 450ms ease-out ${delay}ms`;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).style.transform = "none";
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.02 },
    );
    io.observe(el);

    // Red de seguridad: si el observer no dispara por lo que sea, el
    // desplazamiento se deshace solo. Nunca queda un estado "a medias".
    const failsafe = setTimeout(() => {
      el.style.transform = "none";
    }, 4000);

    return () => {
      clearTimeout(failsafe);
      io.disconnect();
    };
  }, [delay]);

  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}
