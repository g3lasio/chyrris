/**
 * Imagen de producto servida al tamaño en que se muestra.
 *
 * Cada logo existe en 128/256/384 px, en WebP y en JPEG. El navegador elige con
 * srcset + sizes, y todo lo que no sea el hero se carga en diferido.
 */

// Vite resuelve estos imports a URLs con hash y caché indefinida.
import pocima128 from "@/assets/generated/pocima-salvaje-128.webp";
import pocima256 from "@/assets/generated/pocima-salvaje-256.webp";
import pocima384 from "@/assets/generated/pocima-salvaje-384.webp";
import pocimaJpg from "@/assets/generated/pocima-salvaje-256.jpg";

import tzotzil128 from "@/assets/generated/tzotzil-bible-128.webp";
import tzotzil256 from "@/assets/generated/tzotzil-bible-256.webp";
import tzotzil384 from "@/assets/generated/tzotzil-bible-384.webp";
import tzotzilJpg from "@/assets/generated/tzotzil-bible-256.jpg";

import caymus128 from "@/assets/generated/caymus-tanks-128.webp";
import caymus256 from "@/assets/generated/caymus-tanks-256.webp";
import caymus384 from "@/assets/generated/caymus-tanks-384.webp";
import caymusJpg from "@/assets/generated/caymus-tanks-256.jpg";

interface ImageSet {
  webp: Array<[string, number]>;
  fallback: string;
}

export const productImages: Record<string, ImageSet> = {
  "pocima-salvaje": {
    webp: [
      [pocima128, 128],
      [pocima256, 256],
      [pocima384, 384],
    ],
    fallback: pocimaJpg,
  },
  "tzotzil-bible": {
    webp: [
      [tzotzil128, 128],
      [tzotzil256, 256],
      [tzotzil384, 384],
    ],
    fallback: tzotzilJpg,
  },
  "caymus-tanks": {
    webp: [
      [caymus128, 128],
      [caymus256, 256],
      [caymus384, 384],
    ],
    fallback: caymusJpg,
  },
};

export function AppImage({
  productKey,
  alt,
  displaySize = 96,
  className = "",
  priority = false,
}: {
  productKey: string;
  alt: string;
  displaySize?: number;
  className?: string;
  priority?: boolean;
}) {
  const set = productImages[productKey];
  if (!set) return null;

  return (
    <picture>
      <source
        type="image/webp"
        srcSet={set.webp.map(([src, w]) => `${src} ${w}w`).join(", ")}
        sizes={`${displaySize}px`}
      />
      <img
        src={set.fallback}
        alt={alt}
        width={displaySize}
        height={displaySize}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={className}
      />
    </picture>
  );
}
