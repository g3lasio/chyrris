/**
 * Política de Privacidad y Términos de Servicio a nivel corporativo.
 *
 * chyrris.com no tenía ninguna de las dos. El formulario decía "aceptas nuestros
 * Términos de Servicio" sin enlace y sin página que respaldara la frase.
 *
 * Contacto legal: info@chyrris.com. Nunca un correo personal.
 */

import type { Locale } from "@shared/site/routes";
import { company, locationLabel, registrationLabel } from "@shared/site/company";

export interface LegalSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface LegalDoc {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}

/** Fecha real de esta redacción. Se muestra tal cual en la página. */
export const LEGAL_UPDATED_ISO = "2026-08-02";

const updatedLabel: Record<Locale, string> = {
  en: "August 2, 2026",
  es: "2 de agosto de 2026",
};

const entity = `${company.legalName} (${registrationLabel}), ${locationLabel}`;

export const privacyPolicy: Record<Locale, LegalDoc> = {
  en: {
    title: "Privacy Policy",
    updated: updatedLabel.en,
    intro: `This policy explains what personal information ${entity} collects through chyrris.com, why we collect it, and what you can ask us to do with it. It covers this website. Each published application has its own policy, linked from that application's page.`,
    sections: [
      {
        heading: "Information we collect",
        paragraphs: [
          "We collect only what you give us and what a web server necessarily records.",
        ],
        bullets: [
          "Information you submit in the contact form: your name, email address, and — if you choose to provide them — your phone number and company. We also record the kind of enquiry you selected and how you told us you found us.",
          "The content of the message you write.",
          "Technical information that reaches our server with any web request: IP address, browser user agent, the page you submitted from, and the referring site.",
          "Campaign parameters present in the address you arrived with (for example utm_source or utm_campaign), so that we can tell which channel a message came from.",
        ],
      },
      {
        heading: "Why we use it",
        bullets: [
          "To reply to you. This is the only reason we ask for your contact details.",
          "To record your enquiry in our customer system so that it is not lost and so that whoever answers has the context.",
          "To understand which channels bring people to the company. We look at this in aggregate.",
          "To protect the form from automated abuse, which is why the server keeps a short-lived record of submission rates by IP address.",
        ],
      },
      {
        heading: "What we do not do",
        bullets: [
          "We do not sell personal information.",
          "We do not share it with advertisers.",
          "We do not use the contact form to build a marketing list. If we ever want to send you something you did not ask for, we will ask you first.",
        ],
      },
      {
        heading: "Where the information goes",
        paragraphs: [
          "A message submitted through the contact form is delivered to our own email and recorded in LeadPrime, the customer platform this company operates. Both are under our control.",
          "We use a transactional email provider to deliver the notification message. That provider processes the message solely to deliver it, on our instructions.",
          "We do not run third-party analytics, advertising pixels or session recording on chyrris.com.",
        ],
      },
      {
        heading: "Cookies and local storage",
        paragraphs: [
          "chyrris.com does not set advertising or analytics cookies.",
          "If you arrive with campaign parameters in the address, the site stores them in your browser's session storage so that they are still attached to your message if you send it from another page. Session storage is cleared when you close the tab. Nothing in it identifies you.",
        ],
      },
      {
        heading: "How long we keep it",
        paragraphs: [
          "We keep enquiry records for as long as the business relationship or the reason for the enquiry lasts, and after that only as long as we need to for legal and accounting purposes. Anti-abuse rate limit records are kept for minutes, not longer.",
        ],
      },
      {
        heading: "Your rights",
        paragraphs: [
          "You can ask us for a copy of the personal information we hold about you, ask us to correct it, or ask us to delete it. California residents have these rights under the California Consumer Privacy Act, and we extend the same handling to everyone who writes to us regardless of where they live.",
          `Write to ${company.email.general}. We respond within two business days.`,
        ],
      },
      {
        heading: "Children",
        paragraphs: [
          "This website is not directed at children under 13 and we do not knowingly collect their personal information.",
        ],
      },
      {
        heading: "Changes",
        paragraphs: [
          "If this policy changes we will update the date at the top of this page. Material changes will be described here rather than made silently.",
        ],
      },
      {
        heading: "Contact",
        paragraphs: [
          `${entity}. Privacy and legal correspondence: ${company.email.general}.`,
        ],
      },
    ],
  },
  es: {
    title: "Política de Privacidad",
    updated: updatedLabel.es,
    intro: `Esta política explica qué información personal recopila ${entity} a través de chyrris.com, por qué la recopila y qué puedes pedirnos que hagamos con ella. Cubre este sitio web. Cada aplicación publicada tiene su propia política, enlazada desde la página de esa aplicación.`,
    sections: [
      {
        heading: "Qué información recopilamos",
        paragraphs: ["Recopilamos únicamente lo que nos das y lo que un servidor web registra por necesidad."],
        bullets: [
          "Lo que envías en el formulario de contacto: tu nombre, tu correo electrónico y, si decides darlos, tu teléfono y tu empresa. También registramos el tipo de consulta que elegiste y cómo nos dijiste que nos encontraste.",
          "El contenido del mensaje que escribes.",
          "Información técnica que llega al servidor con cualquier petición web: dirección IP, identificador del navegador, la página desde la que enviaste y el sitio que te refirió.",
          "Los parámetros de campaña presentes en la dirección con la que llegaste (por ejemplo utm_source o utm_campaign), para saber por qué canal llegó un mensaje.",
        ],
      },
      {
        heading: "Para qué la usamos",
        bullets: [
          "Para responderte. Es la única razón por la que pedimos tus datos de contacto.",
          "Para registrar tu consulta en nuestro sistema de clientes, de modo que no se pierda y que quien conteste tenga el contexto.",
          "Para entender qué canales traen gente a la compañía. Eso lo miramos de forma agregada.",
          "Para proteger el formulario del abuso automatizado, por lo que el servidor guarda un registro breve de la frecuencia de envíos por dirección IP.",
        ],
      },
      {
        heading: "Qué no hacemos",
        bullets: [
          "No vendemos información personal.",
          "No la compartimos con anunciantes.",
          "No usamos el formulario de contacto para armar una lista de marketing. Si alguna vez queremos enviarte algo que no pediste, te lo preguntamos antes.",
        ],
      },
      {
        heading: "A dónde va la información",
        paragraphs: [
          "Un mensaje enviado por el formulario se entrega a nuestro propio correo y se registra en LeadPrime, la plataforma de clientes que opera esta compañía. Ambos están bajo nuestro control.",
          "Usamos un proveedor de correo transaccional para entregar la notificación. Ese proveedor procesa el mensaje únicamente para entregarlo, siguiendo nuestras instrucciones.",
          "No corremos analítica de terceros, píxeles publicitarios ni grabación de sesión en chyrris.com.",
        ],
      },
      {
        heading: "Cookies y almacenamiento local",
        paragraphs: [
          "chyrris.com no instala cookies de publicidad ni de analítica.",
          "Si llegas con parámetros de campaña en la dirección, el sitio los guarda en el almacenamiento de sesión de tu navegador para que sigan asociados a tu mensaje aunque lo envíes desde otra página. El almacenamiento de sesión se borra al cerrar la pestaña. Nada de lo que hay ahí te identifica.",
        ],
      },
      {
        heading: "Cuánto tiempo la conservamos",
        paragraphs: [
          "Conservamos los registros de consultas mientras dure la relación comercial o el motivo de la consulta, y después sólo el tiempo que necesitemos por razones legales y contables. Los registros del límite de frecuencia duran minutos, no más.",
        ],
      },
      {
        heading: "Tus derechos",
        paragraphs: [
          "Puedes pedirnos una copia de la información personal que tenemos sobre ti, pedirnos que la corrijamos o pedirnos que la borremos. Los residentes de California tienen estos derechos bajo la California Consumer Privacy Act, y aplicamos el mismo trato a todas las personas que nos escriben, vivan donde vivan.",
          `Escribe a ${company.email.general}. Respondemos en un plazo de dos días hábiles.`,
        ],
      },
      {
        heading: "Menores",
        paragraphs: [
          "Este sitio no está dirigido a menores de 13 años y no recopilamos su información personal a sabiendas.",
        ],
      },
      {
        heading: "Cambios",
        paragraphs: [
          "Si esta política cambia, actualizamos la fecha al inicio de esta página. Los cambios importantes se describen aquí, no se hacen en silencio.",
        ],
      },
      {
        heading: "Contacto",
        paragraphs: [`${entity}. Correspondencia de privacidad y legal: ${company.email.general}.`],
      },
    ],
  },
};

export const termsOfService: Record<Locale, LegalDoc> = {
  en: {
    title: "Terms of Service",
    updated: updatedLabel.en,
    intro: `These terms govern your use of chyrris.com, the corporate website of ${entity}. By using this site you accept them. If you do not accept them, do not use the site.`,
    sections: [
      {
        heading: "What this site is",
        paragraphs: [
          "chyrris.com is an informational website about the company and the products it operates. It describes what the company is and what it builds.",
          "It is not where our products are sold. LeadPrime is sold and supported at leadprimecrm.chyrris.com under its own terms. Each published application has its own terms, linked from that application's page. Where those terms and these terms differ, the application's own terms govern that application.",
        ],
      },
      {
        heading: "Using the site",
        bullets: [
          "You may read, link to and quote this site.",
          "You may not attempt to gain unauthorised access to the site or to any system connected to it.",
          "You may not use the contact form to send unsolicited commercial messages, or submit it automatically or at a volume intended to disrupt it. We rate-limit submissions and may block addresses that abuse the form.",
          "You may not misrepresent yourself as the company or as a person authorised to act for it.",
        ],
      },
      {
        heading: "Messages you send us",
        paragraphs: [
          "When you submit the contact form you confirm that the information you give is accurate and that you are entitled to give it. We handle it as described in the Privacy Policy.",
          "Do not send us confidential information, trade secrets or anything you consider proprietary through the contact form. A message sent through this site does not create a confidentiality obligation and does not by itself create a business relationship.",
        ],
      },
      {
        heading: "Accuracy of what is published here",
        paragraphs: [
          "We keep this site accurate and correct it when it is not. Company registration details, product descriptions and links are stated as they are at the date at the top of this page.",
          "Descriptions of our products on this site are general. They are not a warranty of any particular feature, result or level of availability. Product commitments are made in the terms of the product concerned.",
        ],
      },
      {
        heading: "Other companies' sites",
        paragraphs: [
          "This site links to properties we operate and to businesses that are separate from Chyrris Technologies LLC, including owlfenc.com and app.owlfenc.com. We are not responsible for the content of any site we do not operate.",
        ],
      },
      {
        heading: "Intellectual property",
        paragraphs: [
          "The name Chyrris, the Chyrris logo, the product names on this site and the text and design of this site belong to Chyrris Technologies LLC. Quoting the site with attribution is fine. Reproducing it as your own, or using our marks in a way that suggests we endorse you, is not.",
        ],
      },
      {
        heading: "Liability",
        paragraphs: [
          "This site is provided as it is. To the extent the law allows, Chyrris Technologies LLC is not liable for indirect or consequential loss arising from use of this site. Nothing in these terms limits liability that cannot lawfully be limited.",
        ],
      },
      {
        heading: "Governing law",
        paragraphs: [
          "These terms are governed by the laws of the State of California, United States, without regard to conflict of law rules. Disputes about this site are subject to the courts of that state.",
        ],
      },
      {
        heading: "Changes",
        paragraphs: [
          "We may update these terms. The date at the top of this page shows when they last changed. Continuing to use the site after a change means you accept the updated terms.",
        ],
      },
      {
        heading: "Contact",
        paragraphs: [`Questions about these terms: ${company.email.general}.`],
      },
    ],
  },
  es: {
    title: "Términos de Servicio",
    updated: updatedLabel.es,
    intro: `Estos términos rigen el uso de chyrris.com, el sitio corporativo de ${entity}. Al usar el sitio los aceptas. Si no los aceptas, no uses el sitio.`,
    sections: [
      {
        heading: "Qué es este sitio",
        paragraphs: [
          "chyrris.com es un sitio informativo sobre la compañía y los productos que opera. Describe qué es la compañía y qué construye.",
          "No es donde se venden nuestros productos. LeadPrime se vende y se atiende en leadprimecrm.chyrris.com bajo sus propios términos. Cada aplicación publicada tiene sus propios términos, enlazados desde la página de esa aplicación. Donde esos términos y estos difieran, mandan los términos propios de la aplicación.",
        ],
      },
      {
        heading: "Uso del sitio",
        bullets: [
          "Puedes leer, enlazar y citar este sitio.",
          "No puedes intentar acceder sin autorización al sitio ni a ningún sistema conectado a él.",
          "No puedes usar el formulario de contacto para enviar mensajes comerciales no solicitados, ni enviarlo de forma automatizada o en un volumen destinado a saturarlo. Limitamos la frecuencia de envíos y podemos bloquear direcciones que abusen del formulario.",
          "No puedes presentarte como la compañía ni como una persona autorizada para actuar en su nombre.",
        ],
      },
      {
        heading: "Los mensajes que nos envías",
        paragraphs: [
          "Al enviar el formulario de contacto confirmas que la información que das es correcta y que tienes derecho a darla. La tratamos como se describe en la Política de Privacidad.",
          "No nos envíes información confidencial, secretos comerciales ni nada que consideres propietario a través del formulario. Un mensaje enviado por este sitio no crea una obligación de confidencialidad ni establece por sí solo una relación comercial.",
        ],
      },
      {
        heading: "Exactitud de lo publicado aquí",
        paragraphs: [
          "Mantenemos este sitio exacto y lo corregimos cuando no lo está. Los datos de registro de la compañía, las descripciones de producto y los enlaces se declaran tal como están a la fecha que aparece al inicio de esta página.",
          "Las descripciones de nuestros productos en este sitio son generales. No constituyen garantía de una funcionalidad, un resultado ni un nivel de disponibilidad concretos. Los compromisos de producto se asumen en los términos del producto correspondiente.",
        ],
      },
      {
        heading: "Sitios de otras compañías",
        paragraphs: [
          "Este sitio enlaza a propiedades que operamos y a negocios separados de Chyrris Technologies LLC, entre ellos owlfenc.com y app.owlfenc.com. No somos responsables del contenido de ningún sitio que no operemos.",
        ],
      },
      {
        heading: "Propiedad intelectual",
        paragraphs: [
          "El nombre Chyrris, el logotipo de Chyrris, los nombres de producto de este sitio y el texto y el diseño del sitio pertenecen a Chyrris Technologies LLC. Citar el sitio con atribución está bien. Reproducirlo como propio, o usar nuestras marcas de forma que sugiera que te respaldamos, no.",
        ],
      },
      {
        heading: "Responsabilidad",
        paragraphs: [
          "Este sitio se ofrece tal como está. En la medida en que la ley lo permita, Chyrris Technologies LLC no responde por daños indirectos o consecuentes derivados del uso de este sitio. Nada en estos términos limita una responsabilidad que legalmente no pueda limitarse.",
        ],
      },
      {
        heading: "Ley aplicable",
        paragraphs: [
          "Estos términos se rigen por las leyes del Estado de California, Estados Unidos, sin atender a normas de conflicto de leyes. Las controversias sobre este sitio se someten a los tribunales de ese estado.",
        ],
      },
      {
        heading: "Cambios",
        paragraphs: [
          "Podemos actualizar estos términos. La fecha al inicio de esta página indica cuándo cambiaron por última vez. Seguir usando el sitio después de un cambio significa que aceptas los términos actualizados.",
        ],
      },
      {
        heading: "Contacto",
        paragraphs: [`Preguntas sobre estos términos: ${company.email.general}.`],
      },
    ],
  },
};
