/**
 * Caymus Tank Calculator: ficha, soporte y privacidad.
 *
 * Migrado de las tres páginas sueltas que la app tenía en el sitio anterior
 * (/caymus-tanks, /caymus-tanks/support y /caymus-tanks/privacy). Se conserva la
 * sustancia — los dos modos de cálculo, los galones de vino, el historial, y
 * sobre todo los datos de suscripción, que son de cobro real y no se tocan — y
 * se corrige lo que estaba mal: la razón social completa, la ubicación, los
 * correos de contacto y el compromiso único de respuesta.
 *
 * La página de soporte existía sólo en inglés; aquí se escribe también en
 * español. No hay términos de uso propios de la app: no se inventa una página
 * que no existe, y el soporte remite a chyrris.com/privacy y chyrris.com/terms.
 */

import type { AppContent } from "@/content/appDocs";

export const caymusContent: AppContent = {
  overview: {
    en: {
      tagline:
        "Tank volumes, space and unit conversions for the cellar, worked out on an iPhone or iPad.",
      body: [
        "Caymus Tank Calculator is a published iOS application for winemakers and cellar staff. It answers the two questions that come up constantly during harvest and blending: how much wine fits in the space available, and how much space a given volume of wine needs.",
        "The app works in two directions. Space to Gallons takes the measurements of the space you have and returns the wine gallons it holds. Gallons to Space takes the volume you need to move and returns the space it will occupy. You pick the tank model, enter the measurements, and read the figure.",
        "It carries a reference of common wine tank models, so the geometry of the tank is already accounted for rather than something you work out on paper. Results are given in the units a cellar actually uses, and every calculation is kept in a history you can look back through.",
        "The app is bilingual. English and Spanish are both complete, and you switch between them at any time, which matters on a floor where the crew and the paperwork are not always in the same language.",
        "Access is by subscription. The annual plan is $75.49 per year, 10% less than paying by the month; the monthly option is $6.99 per month. Payments are processed by Stripe, and the subscription is managed or cancelled from the subscription page at chyrris.com/caymus-tanks/subscribe.",
      ],
      highlightsHeading: "What it does",
      highlights: [
        "Space to Gallons: how many wine gallons fit in the space you measured.",
        "Gallons to Space: how much space a given volume of wine needs.",
        "A reference of common wine tank models, so tank geometry is handled for you.",
        "Conversions between wine gallons, standard gallons, liters, hectoliters and barrels.",
        "A history of every calculation, kept on the device for later reference.",
        "Complete in English and Spanish, switchable at any time.",
        "Sign-in by phone number with a code sent by SMS. No password to choose or lose.",
        "iPhone and iPad, on iOS 13.0 or later.",
      ],
    },
    es: {
      tagline:
        "Volúmenes de tanque, espacio y conversiones de unidades para la bodega, resueltos desde un iPhone o un iPad.",
      body: [
        "Caymus Tank Calculator es una aplicación publicada en iOS para enólogos y personal de bodega. Responde las dos preguntas que salen todo el tiempo durante la vendimia y los cortes: cuánto vino cabe en el espacio disponible y cuánto espacio ocupa un volumen determinado de vino.",
        "La aplicación trabaja en los dos sentidos. Espacio a galones toma las medidas del espacio que tienes y devuelve los galones de vino que caben. Galones a espacio toma el volumen que necesitas mover y devuelve el espacio que va a ocupar. Eliges el modelo de tanque, capturas las medidas y lees la cifra.",
        "Incluye una referencia de los modelos de tanque más usados en la industria, de modo que la geometría del tanque ya viene resuelta y no hay que sacarla en papel. Los resultados se dan en las unidades que se manejan en la bodega, y cada cálculo queda guardado en un historial que puedes volver a consultar.",
        "La aplicación es bilingüe. El inglés y el español están completos y se cambia de uno a otro cuando quieras, algo que pesa en una nave donde la cuadrilla y los papeles no siempre hablan el mismo idioma.",
        "El acceso es por suscripción. El plan anual cuesta $75.49 al año, 10% menos que pagar mes con mes; la opción mensual es de $6.99 al mes. Los pagos los procesa Stripe, y la suscripción se gestiona o se cancela desde la página de suscripción en chyrris.com/caymus-tanks/subscribe.",
      ],
      highlightsHeading: "Qué hace",
      highlights: [
        "Espacio a galones: cuántos galones de vino caben en el espacio que mediste.",
        "Galones a espacio: cuánto espacio necesita un volumen determinado de vino.",
        "Una referencia de los modelos de tanque más comunes, con la geometría ya resuelta.",
        "Conversiones entre galones de vino, galones estándar, litros, hectolitros y barricas.",
        "Historial de todos los cálculos, guardado en el dispositivo para consultarlo después.",
        "Completa en español y en inglés, con cambio de idioma en cualquier momento.",
        "Ingreso con número de teléfono y un código que llega por SMS. Sin contraseña que elegir ni que perder.",
        "iPhone y iPad, con iOS 13.0 o posterior.",
      ],
    },
  },

  support: {
    en: {
      title: "Caymus Tank Calculator support",
      intro:
        "This page answers the questions we are asked most about Caymus Tank Calculator, including how to manage or cancel a subscription. If yours is not here, write to support@chyrris.com. We reply within two business days, Monday through Friday.",
      contactHeading: "Contact",
      faqHeading: "Frequently asked questions",
      faq: [
        {
          question: "What is Caymus Tank Calculator?",
          answer:
            "An iOS application for winemakers and cellar staff. It calculates tank volumes, works out the space a volume of wine needs, and converts between the units used in wine production. It is available in English and Spanish.",
        },
        {
          question: "How do I calculate a tank volume?",
          answer:
            "The app has two modes. Space to Gallons tells you how many wine gallons fit in the space available. Gallons to Space tells you how much space a volume of wine will need. In either mode you select the tank model and enter the measurements the app asks for, and the result appears with the conversions alongside it.",
        },
        {
          question: "What is the difference between wine gallons and standard gallons?",
          answer:
            "Wine gallons are the measure the wine industry uses when it talks about tank and lot volumes; one wine gallon is 3.78541 liters. The app reports the result in wine gallons and in standard gallons together, so you can read the figure in whichever unit your cellar paperwork uses without converting it yourself.",
        },
        {
          question: "Which units does it convert between?",
          answer:
            "Wine gallons, standard gallons, liters, hectoliters and barrels, using the conversion factors standard in the industry.",
        },
        {
          question: "Are my calculations saved?",
          answer:
            "Yes. Every calculation goes into a history stored on the device, so you can look back at what a tank held or what a lot needed without redoing the work. You can clear the history from the app's settings.",
        },
        {
          question: "What does the subscription cost?",
          answer:
            "The annual plan is $75.49 per year, which is 10% less than paying by the month. The monthly option is $6.99 per month. Either one gives full access to the calculator. Payments are processed by Stripe.",
        },
        {
          question: "How do I manage or cancel my subscription?",
          answer:
            "Go to the subscription page at chyrris.com/caymus-tanks/subscribe. It opens the Stripe billing portal, where you can change the plan, update the card on file, download invoices or cancel. Cancelling there takes effect at the end of the period you have already paid for, and you keep access until then.",
        },
        {
          question: "What happens if a renewal payment fails?",
          answer:
            "Stripe retries the charge. If a renewal payment fails, access may remain for a 3-day grace period before being restricted, which gives you time to update the card. Update it from the subscription page at chyrris.com/caymus-tanks/subscribe, and access continues once the payment goes through.",
        },
        {
          question: "How do I sign in?",
          answer:
            "By phone number. You enter the number, we send a one-time password by SMS, and you type it back into the app. There is no password to choose. A session lasts 30 days, after which the app asks for a new code.",
        },
        {
          question: "The verification code did not arrive.",
          answer:
            "Check that the number you entered is complete, with the country code, and that the device has signal. SMS can take a minute. If it still does not arrive, request the code again, and if the problem persists write to support@chyrris.com with the number you are trying to use.",
        },
        {
          question: "Does the app need an internet connection?",
          answer:
            "Yes for signing in, for the verification code and for checking that the subscription is active. The calculations themselves run on the device.",
        },
        {
          question: "Can I add a tank model that is not in the app?",
          answer:
            "Not yourself. The app ships with a reference of common wine tank models. If the one you need is missing, write to support@chyrris.com with its specifications and we will consider adding it in an update.",
        },
        {
          question: "Are my calculations private?",
          answer:
            "Yes. Calculations run on the device and their results stay there. We do not collect the volumes, tank models or measurements you enter. What we hold is what is needed to sign you in and to know that your subscription is active. The privacy policy sets this out in full.",
        },
        {
          question: "How do I delete my account?",
          answer:
            "Write to support@chyrris.com from the account you want removed, or tell us the phone number it is registered to. Cancel the subscription first, from chyrris.com/caymus-tanks/subscribe, so it does not renew. Uninstalling the app removes everything it kept on the device.",
        },
        {
          question: "Where is the privacy policy?",
          answer:
            "The policy for the app is at chyrris.com/caymus-tanks/privacy. The policies covering the chyrris.com website itself are at chyrris.com/privacy and chyrris.com/terms.",
        },
      ],
      requirementsHeading: "Requirements",
      requirements: [
        "An iPhone or iPad running iOS 13.0 or later.",
        "A phone number that can receive SMS, for signing in.",
        "An internet connection for signing in and for checking the subscription. Calculations run on the device.",
        "An active subscription, annual or monthly, for full access to the calculator.",
      ],
      bugHeading: "Reporting a problem",
      bugIntro:
        "Write to support@chyrris.com and describe what happened. Including the following turns a report into something we can reproduce and fix.",
      bugChecklist: [
        "Your device model and the version of iOS it runs.",
        "The version of the app, shown in Settings.",
        "The calculation mode you were in, and the tank model and measurements you entered.",
        "What you expected the result to be and what the app returned.",
        "The steps that lead to the problem, so we can repeat them.",
        "A screenshot, when the problem is something visible.",
      ],
    },
    es: {
      title: "Soporte de Caymus Tank Calculator",
      intro:
        "Esta página responde las preguntas que más nos hacen sobre Caymus Tank Calculator, incluida la de cómo gestionar o cancelar la suscripción. Si la tuya no está aquí, escribe a support@chyrris.com. Respondemos en un plazo de dos días hábiles, de lunes a viernes.",
      contactHeading: "Contacto",
      faqHeading: "Preguntas frecuentes",
      faq: [
        {
          question: "¿Qué es Caymus Tank Calculator?",
          answer:
            "Una aplicación para iOS dirigida a enólogos y personal de bodega. Calcula volúmenes de tanque, saca el espacio que necesita un volumen de vino y convierte entre las unidades que se usan en la producción vinícola. Está disponible en español y en inglés.",
        },
        {
          question: "¿Cómo calculo el volumen de un tanque?",
          answer:
            "La aplicación tiene dos modos. Espacio a galones te dice cuántos galones de vino caben en el espacio disponible. Galones a espacio te dice cuánto espacio va a necesitar un volumen de vino. En cualquiera de los dos eliges el modelo de tanque, capturas las medidas que te pide la aplicación y el resultado aparece con sus conversiones al lado.",
        },
        {
          question: "¿Cuál es la diferencia entre galones de vino y galones estándar?",
          answer:
            "El galón de vino es la medida con la que la industria habla de volúmenes de tanque y de lote; un galón de vino equivale a 3.78541 litros. La aplicación entrega el resultado en galones de vino y en galones estándar al mismo tiempo, para que leas la cifra en la unidad en la que estén tus registros sin tener que convertirla.",
        },
        {
          question: "¿Entre qué unidades convierte?",
          answer:
            "Galones de vino, galones estándar, litros, hectolitros y barricas, con los factores de conversión estándar de la industria.",
        },
        {
          question: "¿Se guardan mis cálculos?",
          answer:
            "Sí. Cada cálculo entra a un historial guardado en el dispositivo, así que puedes revisar después qué contenía un tanque o cuánto pedía un lote sin repetir el trabajo. El historial se borra desde la configuración de la aplicación.",
        },
        {
          question: "¿Cuánto cuesta la suscripción?",
          answer:
            "El plan anual cuesta $75.49 al año, 10% menos que pagar mes con mes. La opción mensual es de $6.99 al mes. Cualquiera de los dos da acceso completo a la calculadora. Los pagos los procesa Stripe.",
        },
        {
          question: "¿Cómo gestiono o cancelo mi suscripción?",
          answer:
            "Entra a la página de suscripción en chyrris.com/caymus-tanks/subscribe. Ahí se abre el portal de facturación de Stripe, donde puedes cambiar de plan, actualizar la tarjeta registrada, descargar facturas o cancelar. La cancelación surte efecto al terminar el periodo que ya pagaste, y conservas el acceso hasta esa fecha.",
        },
        {
          question: "¿Qué pasa si falla el cobro de una renovación?",
          answer:
            "Stripe reintenta el cargo. Si falla el cobro de una renovación, el acceso puede mantenerse durante un periodo de gracia de 3 días antes de restringirse, lo que te da margen para actualizar la tarjeta. Actualízala desde la página de suscripción en chyrris.com/caymus-tanks/subscribe y el acceso continúa en cuanto el pago pase.",
        },
        {
          question: "¿Cómo entro a la aplicación?",
          answer:
            "Con tu número de teléfono. Capturas el número, te enviamos una contraseña de un solo uso por SMS y la escribes en la aplicación. No hay contraseña que elegir. La sesión dura 30 días; al vencer, la aplicación pide un código nuevo.",
        },
        {
          question: "No me llegó el código de verificación.",
          answer:
            "Revisa que el número esté completo, con la clave del país, y que el equipo tenga señal. El SMS puede tardar un minuto. Si aun así no llega, pide el código otra vez, y si el problema sigue escríbenos a support@chyrris.com indicando el número con el que estás intentando entrar.",
        },
        {
          question: "¿Necesita conexión a internet?",
          answer:
            "Sí para entrar, para recibir el código de verificación y para comprobar que la suscripción está activa. Los cálculos se hacen en el propio dispositivo.",
        },
        {
          question: "¿Puedo agregar un modelo de tanque que no viene en la aplicación?",
          answer:
            "Tú no, directamente. La aplicación trae una referencia de los modelos de tanque más usados. Si falta el que necesitas, escribe a support@chyrris.com con sus especificaciones y valoramos incluirlo en una actualización.",
        },
        {
          question: "¿Mis cálculos son privados?",
          answer:
            "Sí. Los cálculos se hacen en el dispositivo y sus resultados se quedan ahí. No recopilamos los volúmenes, los modelos de tanque ni las medidas que capturas. Lo que guardamos es lo necesario para dejarte entrar y para saber que tu suscripción está vigente. La política de privacidad lo explica a detalle.",
        },
        {
          question: "¿Cómo elimino mi cuenta?",
          answer:
            "Escribe a support@chyrris.com desde la cuenta que quieres dar de baja, o indícanos el número de teléfono con el que está registrada. Cancela primero la suscripción en chyrris.com/caymus-tanks/subscribe para que no se renueve. Al desinstalar la aplicación se borra todo lo que había guardado en el dispositivo.",
        },
        {
          question: "¿Dónde está la política de privacidad?",
          answer:
            "La política de la aplicación está en chyrris.com/caymus-tanks/privacy. Las políticas que cubren el sitio chyrris.com están en chyrris.com/privacy y chyrris.com/terms.",
        },
      ],
      requirementsHeading: "Requisitos",
      requirements: [
        "Un iPhone o un iPad con iOS 13.0 o posterior.",
        "Un número de teléfono que reciba SMS, para poder entrar.",
        "Conexión a internet para entrar y para comprobar la suscripción. Los cálculos se hacen en el dispositivo.",
        "Una suscripción vigente, anual o mensual, para el acceso completo a la calculadora.",
      ],
      bugHeading: "Reportar un problema",
      bugIntro:
        "Escribe a support@chyrris.com y describe qué pasó. Incluir lo siguiente convierte un reporte en algo que podemos reproducir y corregir.",
      bugChecklist: [
        "El modelo de tu dispositivo y la versión de iOS que tiene.",
        "La versión de la aplicación, que aparece en Configuración.",
        "El modo de cálculo en el que estabas, y el modelo de tanque y las medidas que capturaste.",
        "Qué resultado esperabas y cuál te devolvió la aplicación.",
        "Los pasos que llevan al problema, para poder repetirlos.",
        "Una captura de pantalla, cuando el problema es algo visible.",
      ],
    },
  },

  privacy: {
    en: {
      title: "Caymus Tank Calculator Privacy Policy",
      updated: "August 2, 2026",
      intro:
        "This policy explains what the Caymus Tank Calculator application does with your information. The app is published by Chyrris Technologies LLC (California LLC No. B20260351587), Fairfield, California. It covers the application; the policy for the chyrris.com website is at chyrris.com/privacy.",
      sections: [
        {
          heading: "Information you give us when you sign in",
          paragraphs: [
            "The app asks for little, and it asks for it once. What it needs is enough to know that the person opening the app is the person the subscription belongs to.",
          ],
          bullets: [
            "Your phone number. It is how you sign in and the identifier your account is tied to.",
            "Your name, used to address you inside the app.",
            "A device identifier, so that a session on this device is kept separate from a session on any other.",
          ],
        },
        {
          heading: "How signing in works",
          paragraphs: [
            "Authentication is by phone number with a one-time password. When you sign in we send an OTP by SMS, delivered through Twilio, and you enter it in the app. There is no password to choose and none to be stolen.",
            "A session expires after 30 days, after which the app asks for a new code. Session tokens are stored encrypted on the device, and every connection between the app and our servers uses HTTPS.",
            "Your phone number is used to sign you in and to reach you about the service. We do not use it for marketing.",
          ],
        },
        {
          heading: "What stays on your device",
          paragraphs: [
            "Your work does not leave the phone. Calculations run locally and their results are written to the device's own storage.",
            "We do not collect your operational figures. What a tank holds, how full it is and what you are moving is your business, and it stays with you.",
          ],
          bullets: [
            "Your calculation history.",
            "The tank models, measurements and volumes you entered.",
            "Your app settings and your language preference.",
          ],
        },
        {
          heading: "Your subscription and how it is billed",
          paragraphs: [
            "Access to the calculator is by subscription, and we keep the minimum needed to know whether yours is active.",
          ],
          bullets: [
            "The annual plan is $75.49 per year, a 10% discount versus monthly.",
            "The monthly option is $6.99 per month.",
            "Payments are processed by Stripe. Card details go to Stripe and are never stored on our servers.",
            "We record the status of your subscription, the billing interval, the renewal date and whether a grace period is running. That is what tells the app to unlock.",
            "If a renewal payment fails, access may remain for a 3-day grace period before being restricted.",
            "You manage or cancel the subscription yourself from the subscription page at chyrris.com/caymus-tanks/subscribe, which opens the Stripe billing portal.",
          ],
        },
        {
          heading: "Technical information",
          bullets: [
            "Basic device information, such as the model and the operating system version.",
            "Anonymous crash reports, which tell us where the app broke so we can fix it.",
            "Aggregated usage counts, which show which parts of the app are used. They do not identify anyone.",
          ],
        },
        {
          heading: "Third parties",
          paragraphs: [
            "Twilio delivers the SMS that carries your one-time password. Your phone number is processed for that purpose, under Twilio's own privacy terms.",
            "Stripe processes subscription payments and operates the billing portal where you manage the subscription. Stripe holds the card details under its own privacy and payment security terms; we do not see or store them.",
            "Apple distributes the application. What you calculate inside the app is not reported to us by name.",
          ],
        },
        {
          heading: "What we do not do",
          bullets: [
            "We do not sell personal information.",
            "We do not share it with advertisers, and there is no third-party advertising or tracking inside the app.",
            "We do not collect your location.",
            "We do not store card numbers.",
            "We do not use your phone number to build a marketing list.",
          ],
        },
        {
          heading: "How long information is kept",
          paragraphs: [
            "What is stored on your device stays there until you delete it or uninstall the app. The calculation history can be cleared from the app's settings.",
            "Account and subscription records are kept while the subscription is active, and afterwards only as long as we need them for accounting and legal purposes. Session tokens expire after 30 days on their own.",
            "When you ask us to delete your account, the data associated with it is removed. Billing records that Stripe is required to retain are held by Stripe under its own terms.",
          ],
        },
        {
          heading: "Your rights",
          bullets: [
            "You can see everything the app stored on your device, and clear the calculation history and preferences from its settings.",
            "You can ask us for a copy of the information we hold about you, ask us to correct it, or ask us to delete your account and its data.",
            "You can cancel the subscription at any time from chyrris.com/caymus-tanks/subscribe.",
            "Uninstalling the app removes everything it kept on the device.",
          ],
          paragraphs: [
            "California residents have these rights under the California Consumer Privacy Act, and we extend the same handling to everyone who writes to us regardless of where they live. Write to info@chyrris.com for privacy requests, or to support@chyrris.com for help with the app.",
          ],
        },
        {
          heading: "Children",
          paragraphs: [
            "Caymus Tank Calculator is a professional tool. It is not directed at children under 13 and we do not knowingly collect their personal information.",
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
            "Chyrris Technologies LLC (California LLC No. B20260351587), Fairfield, California. Privacy and legal correspondence: info@chyrris.com. Help with the app or the subscription: support@chyrris.com.",
          ],
        },
      ],
    },
    es: {
      title: "Política de Privacidad de Caymus Tank Calculator",
      updated: "2 de agosto de 2026",
      intro:
        "Esta política explica qué hace la aplicación Caymus Tank Calculator con tu información. La publica Chyrris Technologies LLC (California LLC No. B20260351587), Fairfield, California. Cubre la aplicación; la política del sitio chyrris.com está en chyrris.com/privacy.",
      sections: [
        {
          heading: "Lo que nos das al entrar",
          paragraphs: [
            "La aplicación pide poco, y lo pide una sola vez. Lo que necesita es lo justo para saber que quien abre la aplicación es la persona a la que pertenece la suscripción.",
          ],
          bullets: [
            "Tu número de teléfono. Es con lo que entras y el identificador al que queda ligada tu cuenta.",
            "Tu nombre, para dirigirnos a ti dentro de la aplicación.",
            "Un identificador del dispositivo, para que la sesión de este equipo no se mezcle con la de otro.",
          ],
        },
        {
          heading: "Cómo funciona el ingreso",
          paragraphs: [
            "La autenticación es por número de teléfono con una contraseña de un solo uso. Al entrar te enviamos un OTP por SMS, entregado a través de Twilio, y lo capturas en la aplicación. No hay contraseña que elegir ni que puedan robarte.",
            "La sesión caduca a los 30 días; después la aplicación pide un código nuevo. Los tokens de sesión se guardan cifrados en el dispositivo, y toda comunicación entre la aplicación y nuestros servidores va por HTTPS.",
            "Tu número de teléfono sirve para dejarte entrar y para contactarte por asuntos del servicio. No lo usamos con fines de marketing.",
          ],
        },
        {
          heading: "Lo que se queda en tu dispositivo",
          paragraphs: [
            "Tu trabajo no sale del teléfono. Los cálculos se hacen localmente y sus resultados se escriben en el almacenamiento del propio dispositivo.",
            "No recopilamos tus cifras de operación. Lo que contiene un tanque, qué tan lleno está y qué estás moviendo es asunto tuyo y se queda contigo.",
          ],
          bullets: [
            "Tu historial de cálculos.",
            "Los modelos de tanque, las medidas y los volúmenes que capturaste.",
            "Los ajustes de la aplicación y tu preferencia de idioma.",
          ],
        },
        {
          heading: "Tu suscripción y su cobro",
          paragraphs: [
            "El acceso a la calculadora es por suscripción, y guardamos lo mínimo necesario para saber si la tuya está vigente.",
          ],
          bullets: [
            "El plan anual cuesta $75.49 al año, con 10% de descuento frente al pago mensual.",
            "La opción mensual es de $6.99 al mes.",
            "Los pagos los procesa Stripe. Los datos de la tarjeta van a Stripe y nunca se guardan en nuestros servidores.",
            "Registramos el estado de tu suscripción, el intervalo de facturación, la fecha de renovación y si hay un periodo de gracia corriendo. Eso es lo que le indica a la aplicación que debe dar acceso.",
            "Si falla el cobro de una renovación, el acceso puede mantenerse durante un periodo de gracia de 3 días antes de restringirse.",
            "Tú mismo gestionas o cancelas la suscripción desde la página de suscripción en chyrris.com/caymus-tanks/subscribe, que abre el portal de facturación de Stripe.",
          ],
        },
        {
          heading: "Información técnica",
          bullets: [
            "Datos básicos del dispositivo, como el modelo y la versión del sistema operativo.",
            "Reportes de fallos anónimos, que nos dicen dónde se rompió la aplicación para poder corregirla.",
            "Conteos de uso agregados, que muestran qué partes de la aplicación se usan. No identifican a nadie.",
          ],
        },
        {
          heading: "Terceros que intervienen",
          paragraphs: [
            "Twilio entrega el SMS que lleva tu contraseña de un solo uso. Tu número de teléfono se procesa para eso, bajo los términos de privacidad de Twilio.",
            "Stripe procesa los pagos de la suscripción y opera el portal de facturación donde la gestionas. Stripe guarda los datos de la tarjeta bajo sus propios términos de privacidad y de seguridad de pagos; nosotros no los vemos ni los almacenamos.",
            "Apple distribuye la aplicación. Lo que calculas dentro de ella no se nos reporta con tu nombre.",
          ],
        },
        {
          heading: "Lo que no hacemos",
          bullets: [
            "No vendemos información personal.",
            "No la compartimos con anunciantes, y dentro de la aplicación no hay publicidad ni rastreo de terceros.",
            "No recopilamos tu ubicación.",
            "No almacenamos números de tarjeta.",
            "No usamos tu número de teléfono para armar una lista de marketing.",
          ],
        },
        {
          heading: "Cuánto tiempo se conserva",
          paragraphs: [
            "Lo que está guardado en tu dispositivo permanece ahí hasta que lo borras o desinstalas la aplicación. El historial de cálculos se borra desde la configuración de la aplicación.",
            "Los registros de cuenta y de suscripción se conservan mientras la suscripción esté vigente, y después sólo el tiempo que necesitemos por razones contables y legales. Los tokens de sesión caducan solos a los 30 días.",
            "Cuando nos pides eliminar tu cuenta, se borran los datos asociados a ella. Los registros de facturación que Stripe está obligado a conservar quedan en Stripe, bajo sus propios términos.",
          ],
        },
        {
          heading: "Tus derechos",
          bullets: [
            "Puedes ver todo lo que la aplicación guardó en tu dispositivo, y borrar el historial de cálculos y las preferencias desde su configuración.",
            "Puedes pedirnos una copia de la información que tenemos sobre ti, pedirnos que la corrijamos o pedirnos que eliminemos tu cuenta y sus datos.",
            "Puedes cancelar la suscripción cuando quieras desde chyrris.com/caymus-tanks/subscribe.",
            "Al desinstalar la aplicación se elimina todo lo que guardó en el dispositivo.",
          ],
          paragraphs: [
            "Los residentes de California tienen estos derechos bajo la California Consumer Privacy Act, y aplicamos el mismo trato a todas las personas que nos escriben, vivan donde vivan. Escribe a info@chyrris.com para solicitudes de privacidad, o a support@chyrris.com para ayuda con la aplicación.",
          ],
        },
        {
          heading: "Menores",
          paragraphs: [
            "Caymus Tank Calculator es una herramienta profesional. No está dirigida a menores de 13 años y no recopilamos su información personal a sabiendas.",
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
          paragraphs: [
            "Chyrris Technologies LLC (California LLC No. B20260351587), Fairfield, California. Correspondencia de privacidad y legal: info@chyrris.com. Ayuda con la aplicación o la suscripción: support@chyrris.com.",
          ],
        },
      ],
    },
  },
};
