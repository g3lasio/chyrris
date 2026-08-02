/**
 * Todo el texto del sitio corporativo, en los dos idiomas.
 *
 * Tono: una compañía establecida que opera un portafolio. Sobrio, preciso, sin
 * adjetivos vacíos. Este sitio no vende LeadPrime — LeadPrime se vende solo, en
 * leadprimecrm.chyrris.com. Aquí sólo se establece que la compañía es real y
 * qué opera.
 */

import type { Locale } from "@shared/site/routes";

export interface Copy {
  nav: {
    company: string;
    portfolio: string;
    contact: string;
    leadprime: string;
    menu: string;
    close: string;
    skipToContent: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    lede: string;
    primaryCta: string;
    secondaryCta: string;
  };
  featured: {
    eyebrow: string;
    heading: string;
    body: string;
    agentNote: string;
    cta: string;
  };
  portfolio: {
    eyebrow: string;
    heading: string;
    lede: string;
    operatedBy: string;
    platformsLabel: string;
    noStoreLink: string;
  };
  companySection: {
    eyebrow: string;
    heading: string;
    lede: string;
    facts: {
      legalNameLabel: string;
      registrationLabel: string;
      locationLabel: string;
      foundedLabel: string;
      contactLabel: string;
    };
    cta: string;
  };
  companyPage: {
    heading: string;
    lede: string;
    whatWeDoHeading: string;
    whatWeDo: string[];
    structureHeading: string;
    structure: string[];
    verifyHeading: string;
    verifyBody: string;
  };
  contact: {
    heading: string;
    lede: string;
    responseCommitment: string;
    directHeading: string;
    generalLabel: string;
    supportLabel: string;
    locationHeading: string;
    form: {
      name: string;
      email: string;
      phone: string;
      company: string;
      inquiryType: string;
      inquiryOptions: { value: string; label: string }[];
      referral: string;
      referralOptions: { value: string; label: string }[];
      message: string;
      consent: string;
      consentLinkText: string;
      optional: string;
      required: string;
      submit: string;
      submitting: string;
      successTitle: string;
      successBody: string;
      errorTitle: string;
      errorBody: string;
      validationTitle: string;
      validationBody: string;
    };
  };
  footer: {
    tagline: string;
    productsHeading: string;
    companyHeading: string;
    legalHeading: string;
    rights: string;
    propertiesHeading: string;
  };
  notFound: {
    code: string;
    heading: string;
    body: string;
    cta: string;
  };
  common: {
    externalLink: string;
    lastUpdated: string;
    backHome: string;
    language: string;
  };
}

const en: Copy = {
  nav: {
    company: "Company",
    portfolio: "Portfolio",
    contact: "Contact",
    leadprime: "LeadPrime",
    menu: "Menu",
    close: "Close menu",
    skipToContent: "Skip to content",
  },
  hero: {
    eyebrow: "Chyrris Technologies LLC · Fairfield, California",
    title: "We build and operate AI software.",
    lede: "Our principal product is LeadPrime, a business platform for contractors. Alongside it we run a portfolio of published applications and operating businesses.",
    primaryCta: "Go to LeadPrime",
    secondaryCta: "About the company",
  },
  featured: {
    eyebrow: "Principal product",
    heading: "LeadPrime",
    body: "A business platform and CRM built for contractors: leads, estimates, contracts, payments and client communication in one system.",
    agentNote:
      "KEEN, the LeadPrime AI agent, works the pipeline alongside the team — following up, segmenting audiences and running campaigns.",
    cta: "Open leadprimecrm.chyrris.com",
  },
  portfolio: {
    eyebrow: "Portfolio",
    heading: "What we operate",
    lede: "Every product listed here is published and in service. Nothing on this page is a plan.",
    operatedBy: "Operated by Chyrris Technologies LLC",
    platformsLabel: "Published on",
    noStoreLink: "In operation",
  },
  companySection: {
    eyebrow: "The company",
    heading: "Chyrris Technologies LLC",
    lede: "A California limited liability company that owns and operates the products above. LeadPrime sells; Chyrris owns.",
    facts: {
      legalNameLabel: "Legal name",
      registrationLabel: "Registration",
      locationLabel: "Location",
      foundedLabel: "Jurisdiction",
      contactLabel: "General contact",
    },
    cta: "Company details",
  },
  companyPage: {
    heading: "Company",
    lede: "Chyrris Technologies LLC is the parent company of the products and businesses listed in the portfolio. This page exists so that anyone doing due diligence can confirm what the company is and how to reach it.",
    whatWeDoHeading: "What the company does",
    whatWeDo: [
      "Builds and operates software with artificial intelligence. The principal product is LeadPrime, a business platform and CRM for contractors, sold and supported at leadprimecrm.chyrris.com.",
      "Publishes and maintains a portfolio of applications on the web, the App Store and Google Play, including Tzotzil Bible, Caymus Tank Calculator and Pócima Salvaje.",
      "Processes subscription payments for its own products and works with referral partners.",
    ],
    structureHeading: "Registration and structure",
    structure: [
      "Chyrris Technologies LLC is a limited liability company registered in the State of California under number B20260351587.",
      "The company operates from Fairfield, California.",
      "Correspondence, partnership and press enquiries go to info@chyrris.com. Product support goes to support@chyrris.com.",
    ],
    verifyHeading: "Verifying the company",
    verifyBody:
      "The registration number above can be checked against the California Secretary of State business search. For anything the public record does not answer, write to info@chyrris.com and we will respond within two business days.",
  },
  contact: {
    heading: "Contact",
    lede: "Product questions, partnerships, press, or anything else about Chyrris Technologies LLC.",
    responseCommitment: "We reply within two business days, Monday through Friday.",
    directHeading: "Direct",
    generalLabel: "General, partnerships and press",
    supportLabel: "Product support",
    locationHeading: "Location",
    form: {
      name: "Your name",
      email: "Email",
      phone: "Phone",
      company: "Company",
      inquiryType: "What is this about?",
      inquiryOptions: [
        { value: "product", label: "A product" },
        { value: "partnership", label: "A partnership" },
        { value: "press", label: "Press" },
        { value: "other", label: "Something else" },
      ],
      referral: "How did you find us?",
      referralOptions: [
        { value: "search", label: "Search engine" },
        { value: "referral", label: "Someone referred us" },
        { value: "social", label: "Social media" },
        { value: "leadprime", label: "Through LeadPrime" },
        { value: "other", label: "Another way" },
      ],
      message: "Message",
      consent:
        "I agree that Chyrris Technologies LLC may store and use this information to respond to me, as described in the",
      consentLinkText: "Privacy Policy",
      optional: "optional",
      required: "required",
      submit: "Send message",
      submitting: "Sending…",
      successTitle: "Message sent",
      successBody: "Thank you. We will reply within two business days.",
      errorTitle: "Message not sent",
      errorBody: "Something went wrong on our side. Please write to info@chyrris.com and we will pick it up there.",
      validationTitle: "Check the form",
      validationBody: "Please complete the required fields.",
    },
  },
  footer: {
    tagline: "Builds and operates AI software.",
    productsHeading: "Products",
    companyHeading: "Company",
    legalHeading: "Legal",
    propertiesHeading: "Properties",
    rights: "All rights reserved.",
  },
  notFound: {
    code: "404",
    heading: "This page does not exist",
    body: "The address you followed is not part of chyrris.com.",
    cta: "Go to the home page",
  },
  common: {
    externalLink: "opens in a new tab",
    lastUpdated: "Last updated",
    backHome: "Back to chyrris.com",
    language: "Language",
  },
};

const es: Copy = {
  nav: {
    company: "Compañía",
    portfolio: "Portafolio",
    contact: "Contacto",
    leadprime: "LeadPrime",
    menu: "Menú",
    close: "Cerrar menú",
    skipToContent: "Saltar al contenido",
  },
  hero: {
    eyebrow: "Chyrris Technologies LLC · Fairfield, California",
    title: "Construimos y operamos software con inteligencia artificial.",
    lede: "Nuestro producto principal es LeadPrime, una plataforma de negocio para contratistas. Junto a él operamos un portafolio de aplicaciones publicadas y negocios en marcha.",
    primaryCta: "Ir a LeadPrime",
    secondaryCta: "Sobre la compañía",
  },
  featured: {
    eyebrow: "Producto principal",
    heading: "LeadPrime",
    body: "Una plataforma de negocio y CRM para contratistas: prospectos, estimados, contratos, pagos y comunicación con clientes en un solo sistema.",
    agentNote:
      "KEEN, el agente de IA de LeadPrime, opera el pipeline junto al equipo: da seguimiento, segmenta audiencias y ejecuta campañas.",
    cta: "Abrir leadprimecrm.chyrris.com",
  },
  portfolio: {
    eyebrow: "Portafolio",
    heading: "Lo que operamos",
    lede: "Cada producto de esta lista está publicado y en servicio. Nada en esta página es un plan.",
    operatedBy: "Operado por Chyrris Technologies LLC",
    platformsLabel: "Publicado en",
    noStoreLink: "En operación",
  },
  companySection: {
    eyebrow: "La compañía",
    heading: "Chyrris Technologies LLC",
    lede: "Una compañía de responsabilidad limitada de California que posee y opera los productos de arriba. LeadPrime vende; Chyrris posee.",
    facts: {
      legalNameLabel: "Razón social",
      registrationLabel: "Registro",
      locationLabel: "Ubicación",
      foundedLabel: "Jurisdicción",
      contactLabel: "Contacto general",
    },
    cta: "Datos de la compañía",
  },
  companyPage: {
    heading: "Compañía",
    lede: "Chyrris Technologies LLC es la compañía madre de los productos y negocios del portafolio. Esta página existe para que cualquiera que haga due diligence pueda confirmar qué es la compañía y cómo contactarla.",
    whatWeDoHeading: "Qué hace la compañía",
    whatWeDo: [
      "Construye y opera software con inteligencia artificial. El producto principal es LeadPrime, una plataforma de negocio y CRM para contratistas, que se vende y se atiende en leadprimecrm.chyrris.com.",
      "Publica y mantiene un portafolio de aplicaciones en web, App Store y Google Play, entre ellas Tzotzil Bible, Caymus Tank Calculator y Pócima Salvaje.",
      "Procesa pagos de suscripción de sus propios productos y trabaja con socios de referidos.",
    ],
    structureHeading: "Registro y estructura",
    structure: [
      "Chyrris Technologies LLC es una compañía de responsabilidad limitada registrada en el Estado de California bajo el número B20260351587.",
      "La compañía opera desde Fairfield, California.",
      "La correspondencia, las consultas de alianzas y las de prensa se dirigen a info@chyrris.com. El soporte de producto se atiende en support@chyrris.com.",
    ],
    verifyHeading: "Verificar la compañía",
    verifyBody:
      "El número de registro de arriba se puede consultar en la búsqueda de empresas del Secretario de Estado de California. Para lo que el registro público no responda, escribe a info@chyrris.com y contestamos en un plazo de dos días hábiles.",
  },
  contact: {
    heading: "Contacto",
    lede: "Preguntas sobre productos, alianzas, prensa o cualquier otro asunto sobre Chyrris Technologies LLC.",
    responseCommitment: "Respondemos en un plazo de dos días hábiles, de lunes a viernes.",
    directHeading: "Directo",
    generalLabel: "General, alianzas y prensa",
    supportLabel: "Soporte de producto",
    locationHeading: "Ubicación",
    form: {
      name: "Tu nombre",
      email: "Correo electrónico",
      phone: "Teléfono",
      company: "Empresa",
      inquiryType: "¿Sobre qué nos escribes?",
      inquiryOptions: [
        { value: "product", label: "Un producto" },
        { value: "partnership", label: "Una alianza" },
        { value: "press", label: "Prensa" },
        { value: "other", label: "Otro asunto" },
      ],
      referral: "¿Cómo nos encontraste?",
      referralOptions: [
        { value: "search", label: "Buscador" },
        { value: "referral", label: "Alguien nos recomendó" },
        { value: "social", label: "Redes sociales" },
        { value: "leadprime", label: "A través de LeadPrime" },
        { value: "other", label: "De otra forma" },
      ],
      message: "Mensaje",
      consent:
        "Acepto que Chyrris Technologies LLC guarde y use esta información para responderme, según lo descrito en la",
      consentLinkText: "Política de Privacidad",
      optional: "opcional",
      required: "obligatorio",
      submit: "Enviar mensaje",
      submitting: "Enviando…",
      successTitle: "Mensaje enviado",
      successBody: "Gracias. Respondemos en un plazo de dos días hábiles.",
      errorTitle: "No se pudo enviar",
      errorBody: "Algo falló de nuestro lado. Escribe a info@chyrris.com y lo retomamos por ahí.",
      validationTitle: "Revisa el formulario",
      validationBody: "Completa los campos obligatorios.",
    },
  },
  footer: {
    tagline: "Construye y opera software con inteligencia artificial.",
    productsHeading: "Productos",
    companyHeading: "Compañía",
    legalHeading: "Legal",
    propertiesHeading: "Propiedades",
    rights: "Todos los derechos reservados.",
  },
  notFound: {
    code: "404",
    heading: "Esta página no existe",
    body: "La dirección que seguiste no forma parte de chyrris.com.",
    cta: "Ir a la página principal",
  },
  common: {
    externalLink: "abre en una pestaña nueva",
    lastUpdated: "Última actualización",
    backHome: "Volver a chyrris.com",
    language: "Idioma",
  },
};

export const copy: Record<Locale, Copy> = { en, es };
