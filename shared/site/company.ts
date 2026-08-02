/**
 * Fuente única de verdad sobre la identidad de la compañía.
 *
 * Reglas que este archivo hace cumplir por construcción:
 *  - Sólo ciudad y estado. NUNCA la dirección completa (un sitio corporativo no
 *    publica su domicilio). No agregar streetAddress aquí.
 *  - Los correos en circulación son exactamente dos: info@ y support@. El correo
 *    personal nunca aparece en contexto legal ni de contacto.
 *  - Un solo compromiso de soporte, reusado en todas las páginas.
 */

export const SITE_ORIGIN = "https://chyrris.com";

export const company = {
  legalName: "Chyrris Technologies LLC",
  shortName: "Chyrris",
  /** Registro de California. Es el dato que un socio en due diligence busca. */
  registration: {
    jurisdiction: "California",
    entityType: "LLC",
    number: "B20260351587",
  },
  /** Ciudad y estado únicamente. Ver nota de arriba. */
  location: {
    city: "Fairfield",
    stateCode: "CA",
    state: "California",
    country: "United States",
    countryCode: "US",
  },
  email: {
    /** Consultas generales, alianzas, prensa y asuntos legales. */
    general: "info@chyrris.com",
    /** Soporte de producto para las apps publicadas. */
    support: "support@chyrris.com",
  },
  /**
   * Un único compromiso de respuesta, en días hábiles. El sitio anterior tenía
   * tres promesas contradictorias ("24-48 hours", "48 horas", "0900-1800 PST");
   * todas las páginas ahora leen de aquí.
   */
  supportCommitment: {
    businessDays: 2,
    days: { en: "Monday through Friday", es: "de lunes a viernes" },
  },
  /**
   * Perfiles sociales. Se renderizan SÓLO los que tengan url definida: un slot
   * vacío no produce un icono muerto con href="#". Cuando exista el perfil real
   * basta con poner la URL aquí y el icono aparece en todo el sitio.
   */
  social: [
    { key: "linkedin", label: "LinkedIn", url: "" },
    { key: "x", label: "X", url: "" },
    { key: "github", label: "GitHub", url: "" },
  ] as ReadonlyArray<{ key: string; label: string; url: string }>,
} as const;

/** Los perfiles sociales que efectivamente tienen destino. */
export const activeSocial = company.social.filter((s) => s.url.trim() !== "");

/** "Fairfield, California" — la única forma en que se publica la ubicación. */
export const locationLabel = `${company.location.city}, ${company.location.state}`;

/** "California LLC No. B20260351587" */
export const registrationLabel = `${company.registration.jurisdiction} ${company.registration.entityType} No. ${company.registration.number}`;
