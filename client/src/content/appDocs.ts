/**
 * Tipos para el contenido de las fichas de producto: resumen, soporte y
 * documentos legales de cada app.
 *
 * Todas las páginas de app se renderizan con estos tipos, de modo que las tres
 * familias (Tzotzil, Pócima, Caymus) comparten una sola presentación en vez de
 * traer cada una la suya.
 */

import type { Locale } from "@shared/site/routes";
import type { LegalDoc } from "@/content/legal";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface SupportDoc {
  title: string;
  intro: string;
  /** Correo de soporte de producto. Siempre support@chyrris.com. */
  contactHeading: string;
  faqHeading: string;
  faq: FaqItem[];
  requirementsHeading?: string;
  requirements?: string[];
  bugHeading?: string;
  bugIntro?: string;
  bugChecklist?: string[];
}

export interface AppOverview {
  /** Frase corta bajo el título. */
  tagline: string;
  /** Párrafos de la ficha. */
  body: string[];
  /** Puntos concretos de lo que hace. */
  highlightsHeading: string;
  highlights: string[];
}

export interface AppContent {
  overview: Record<Locale, AppOverview>;
  support: Record<Locale, SupportDoc>;
  privacy: Record<Locale, LegalDoc>;
  terms?: Record<Locale, LegalDoc>;
  /** Sección "acerca de", sólo la tiene Tzotzil. */
  about?: Record<Locale, AppOverview>;
}

export type { Locale, LegalDoc };
