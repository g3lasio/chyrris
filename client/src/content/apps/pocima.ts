/**
 * Pócima Salvaje: ficha, soporte, privacidad y términos.
 *
 * Migrado de las cuatro páginas sueltas que tenía la app en el sitio anterior.
 * Se conserva la sustancia (la referencia de plantas y padecimientos, el
 * asistente, qué datos se manejan) y se corrige lo que estaba mal: la razón
 * social completa, la ubicación, los correos de contacto, el compromiso único
 * de respuesta, y la línea de crédito personal, que no va en un documento de
 * compañía.
 *
 * La app informa sobre remedios tradicionales: los términos llevan un pasaje
 * claro de que no es consejo médico, y la ficha una sola línea equivalente.
 */

import type { AppContent } from "@/content/appDocs";

export const pocimaContent: AppContent = {
  overview: {
    en: {
      tagline:
        "Medicinal plants and traditional remedies, with an assistant that answers what a plant is used for and how the remedy is prepared.",
      body: [
        "Pócima Salvaje is a published iOS application about medicinal plants and the traditional remedies made from them. It is written in Spanish and built to be consulted in the moment: in the kitchen, in the yard, or in front of a market stall, when someone wants to know what a plant is for and how it is prepared.",
        "The app carries a reference of 693 medicinal plants and 482 health conditions. Each plant entry gives its properties, how the remedy is prepared, the amounts of traditional use, and its contraindications. Conditions are grouped by body system, for the person who recognizes the discomfort but does not know which plant to look for.",
        "MolDoctor, the assistant built into the app, answers questions about preparation and properties in plain language, and can read a photograph of a label or a document when typing it out would be tedious. It is an aid for searching and understanding, not a physician.",
        "Pócima Salvaje is informational. It is not medical advice and it does not replace a consultation with a qualified health professional.",
        "The plant and condition reference works without a connection; the assistant needs one. The app is free to download and use.",
      ],
      highlightsHeading: "What it does",
      highlights: [
        "693 medicinal plants with properties, preparation, amounts of traditional use and contraindications.",
        "482 health conditions, grouped by body system.",
        "MolDoctor, an assistant that answers questions about preparation and properties in plain language.",
        "Photograph reading: the assistant extracts the text of a label or a document and works from it.",
        "Voice input and spoken replies, for consulting with your hands busy.",
        "Search by plant, condition or body system, with favorites to come back quickly.",
        "The reference is stored on the device and can be consulted offline.",
        "Entirely in Spanish, on iPhone and iPad.",
      ],
    },
    es: {
      tagline:
        "Plantas medicinales y remedios tradicionales, con un asistente que responde para qué sirve cada planta y cómo se prepara.",
      body: [
        "Pócima Salvaje es una aplicación publicada en iOS sobre plantas medicinales y los remedios tradicionales que se hacen con ellas. Está en español y pensada para consultarse en el momento: en la cocina, en el patio o frente al puesto del mercado, cuando alguien quiere saber para qué sirve una planta y cómo se prepara.",
        "La aplicación trae una referencia de 693 plantas medicinales y 482 padecimientos. Cada planta indica sus propiedades, la forma de preparación, las cantidades de uso tradicional y sus contraindicaciones. Los padecimientos están agrupados por sistema del cuerpo, para quien reconoce el malestar pero no sabe qué planta buscar.",
        "MolDoctor, el asistente integrado, responde en lenguaje llano preguntas sobre preparación y propiedades, y puede leer la fotografía de una etiqueta o de un documento cuando escribirlo sería tardado. Es una ayuda para buscar y entender, no un médico.",
        "Pócima Salvaje es informativa. No es consejo médico ni sustituye la consulta con un profesional de la salud calificado.",
        "La referencia de plantas y padecimientos funciona sin conexión; el asistente la necesita. La aplicación se descarga y se usa sin costo.",
      ],
      highlightsHeading: "Qué hace",
      highlights: [
        "693 plantas medicinales con propiedades, preparación, cantidades de uso tradicional y contraindicaciones.",
        "482 padecimientos, agrupados por sistema del cuerpo.",
        "MolDoctor, un asistente que responde en lenguaje llano preguntas sobre preparación y propiedades.",
        "Lectura de fotografías: el asistente extrae el texto de una etiqueta o un documento y trabaja a partir de él.",
        "Dictado por voz y respuesta hablada, para consultar con las manos ocupadas.",
        "Búsqueda por planta, padecimiento o sistema del cuerpo, y favoritos para volver rápido.",
        "La referencia queda guardada en el dispositivo y se consulta sin conexión.",
        "Todo en español, en iPhone y iPad.",
      ],
    },
  },

  support: {
    en: {
      title: "Pócima Salvaje support",
      intro:
        "This page answers the questions we are asked most about Pócima Salvaje. If yours is not here, write to support@chyrris.com. We reply within two business days, Monday through Friday.",
      contactHeading: "Contact",
      faqHeading: "Frequently asked questions",
      faq: [
        {
          question: "What is Pócima Salvaje?",
          answer:
            "An iOS application about medicinal plants and traditional remedies. It carries a reference of 693 plants and 482 health conditions, and MolDoctor, an assistant that answers what a plant is used for and how the remedy is prepared. The app is in Spanish.",
        },
        {
          question: "Does it cost anything?",
          answer:
            "No. The app is free to download and use, and every feature, the assistant included, works at no cost. There is no subscription and nothing to buy inside the app.",
        },
        {
          question: "Can MolDoctor diagnose an illness or prescribe a treatment?",
          answer:
            "No, and it should not be used that way. MolDoctor explains traditional uses, preparation and properties. It cannot examine you, it does not know your medical history, and its answers are not a diagnosis or a prescription. For anything concerning your health, consult a qualified health professional.",
        },
        {
          question: "Does the app work without an internet connection?",
          answer:
            "In part. The plant and condition reference is stored on the device and can be consulted with no connection at all. MolDoctor does need one, because the answer is produced by a service outside the phone.",
        },
        {
          question: "What happens to what I ask the assistant?",
          answer:
            "Your question, and any image you attach, travel over an encrypted connection to the AI service that produces the answer. We do not keep your conversations or your images on our servers, and they are not used to train models. The conversation history you see in the app is stored on your device, and you can erase it there. The privacy policy sets this out in full.",
        },
        {
          question: "How do I delete my data?",
          answer:
            "Open Settings inside the app and clear the conversation history, the favorites and the search history. Uninstalling the app removes everything it had stored on the device.",
        },
        {
          question: "Can children use it?",
          answer:
            "The content is educational and suitable for a general audience, but the app is not designed for children and an adult should read it with them. Consult a pediatrician before giving any remedy to a child.",
        },
        {
          question: "The assistant does not answer.",
          answer:
            "Check that the device has a working connection and try switching between Wi-Fi and mobile data. An answer can take a few seconds. If it still does not arrive, the AI service may be briefly unavailable; try again later, and write to us if it continues.",
        },
        {
          question: "Reading a photograph fails.",
          answer:
            "The app needs permission for the camera or the photo library; grant it in the iOS settings. Beyond that, a sharp, well-lit image of a moderate size gives the best result, and the reading step needs a connection.",
        },
        {
          question: "The search returns nothing.",
          answer:
            "Check the spelling and try a shorter or more general term. Many plants have regional names, so try another one you know, or browse by condition or body system instead. The reference is large but not complete: if what you looked for is missing, tell us and we will consider adding it.",
        },
        {
          question: "Can I suggest a plant or a feature?",
          answer:
            "Yes. Write to support@chyrris.com. If you are proposing a plant, the name you know it by, the region and the use are what help most.",
        },
        {
          question: "Where are the privacy policy and the terms?",
          answer:
            "The policy for the app is at chyrris.com/pocima-salvaje/privacy and the terms of use at chyrris.com/pocima-salvaje/terms. The policies covering the website itself are at chyrris.com/privacy and chyrris.com/terms.",
        },
      ],
      requirementsHeading: "Requirements",
      requirements: [
        "An iPhone or iPad running a current version of iOS.",
        "An internet connection for MolDoctor. The plant and condition reference works without one.",
        "Permission for the camera or the photo library, only if you want the assistant to read a photograph.",
      ],
      bugHeading: "Reporting a problem",
      bugIntro:
        "Write to support@chyrris.com and describe what happened. Including the following turns a report into something we can reproduce and fix.",
      bugChecklist: [
        "Your device model and the version of iOS it runs.",
        "The version of the app, if you know it.",
        "The screen you were on and what you did just before the problem.",
        "The plant, condition or question involved, if it was one in particular.",
        "A screenshot, when the problem is something visible.",
      ],
    },
    es: {
      title: "Soporte de Pócima Salvaje",
      intro:
        "Esta página responde las preguntas que más nos hacen sobre Pócima Salvaje. Si la tuya no está aquí, escribe a support@chyrris.com. Respondemos en un plazo de dos días hábiles, de lunes a viernes.",
      contactHeading: "Contacto",
      faqHeading: "Preguntas frecuentes",
      faq: [
        {
          question: "¿Qué es Pócima Salvaje?",
          answer:
            "Una aplicación para iOS sobre plantas medicinales y remedios tradicionales. Incluye una referencia de 693 plantas y 482 padecimientos, y a MolDoctor, un asistente que responde para qué se usa una planta y cómo se prepara el remedio. La aplicación está en español.",
        },
        {
          question: "¿Tiene costo?",
          answer:
            "No. La aplicación se descarga y se usa sin costo, y todas las funciones, incluido el asistente, están disponibles gratis. No hay suscripción ni compras dentro de la aplicación.",
        },
        {
          question: "¿MolDoctor puede diagnosticar o recetar?",
          answer:
            "No, y no debe usarse para eso. MolDoctor explica usos tradicionales, preparación y propiedades. No puede examinarte, no conoce tu historial y sus respuestas no son un diagnóstico ni una receta. Para cualquier asunto de salud, consulta a un profesional calificado.",
        },
        {
          question: "¿Funciona sin conexión a internet?",
          answer:
            "En parte. La referencia de plantas y padecimientos está guardada en el dispositivo y se consulta sin conexión. MolDoctor sí la necesita, porque la respuesta la genera un servicio fuera del teléfono.",
        },
        {
          question: "¿Qué pasa con lo que le pregunto al asistente?",
          answer:
            "Tu pregunta, y la imagen que adjuntes, viajan por una conexión cifrada al servicio de inteligencia artificial que genera la respuesta. No guardamos tus conversaciones ni tus imágenes en nuestros servidores, y no se usan para entrenar modelos. El historial que ves en la aplicación está en tu dispositivo y desde ahí puedes borrarlo. La política de privacidad lo explica completo.",
        },
        {
          question: "¿Cómo borro mis datos?",
          answer:
            "Entra a Configuración dentro de la aplicación y borra el historial de conversaciones, los favoritos y el historial de búsquedas. Si desinstalas la aplicación, se elimina todo lo que había guardado en el dispositivo.",
        },
        {
          question: "¿Pueden usarla los niños?",
          answer:
            "El contenido es educativo y apto para público general, pero la aplicación no está diseñada para niños y conviene que un adulto la consulte con ellos. Antes de dar cualquier remedio a un niño, consulta a un pediatra.",
        },
        {
          question: "El asistente no responde.",
          answer:
            "Revisa que el dispositivo tenga conexión e intenta cambiar entre Wi-Fi y datos móviles. Una respuesta puede tardar unos segundos. Si aun así no llega, es posible que el servicio de inteligencia artificial esté momentáneamente fuera de servicio; vuelve a intentarlo más tarde y escríbenos si sigue igual.",
        },
        {
          question: "Falla la lectura de una fotografía.",
          answer:
            "La aplicación necesita permiso para la cámara o para la fototeca; concédelo en los ajustes de iOS. Fuera de eso, una imagen nítida, bien iluminada y de tamaño moderado da el mejor resultado, y la lectura requiere conexión.",
        },
        {
          question: "La búsqueda no encuentra nada.",
          answer:
            "Revisa la ortografía y prueba con un término más corto o más general. Muchas plantas tienen nombres regionales: intenta con otro que conozcas, o navega por padecimiento o por sistema del cuerpo. La referencia es amplia pero no está completa: si falta lo que buscabas, dinos y lo consideramos para agregarlo.",
        },
        {
          question: "¿Puedo sugerir una planta o una función?",
          answer:
            "Sí. Escribe a support@chyrris.com. Si propones una planta, lo que más ayuda es el nombre con el que la conoces, la región y el uso que se le da.",
        },
        {
          question: "¿Dónde están la política de privacidad y los términos?",
          answer:
            "La política de la aplicación está en chyrris.com/pocima-salvaje/privacy y los términos de uso en chyrris.com/pocima-salvaje/terms. Las políticas que cubren el sitio web están en chyrris.com/privacy y chyrris.com/terms.",
        },
      ],
      requirementsHeading: "Requisitos",
      requirements: [
        "Un iPhone o un iPad con una versión reciente de iOS.",
        "Conexión a internet para MolDoctor. La referencia de plantas y padecimientos funciona sin ella.",
        "Permiso de cámara o de fototeca, sólo si quieres que el asistente lea una fotografía.",
      ],
      bugHeading: "Cómo reportar un problema",
      bugIntro:
        "Escribe a support@chyrris.com y describe qué pasó. Incluir lo siguiente convierte el reporte en algo que podemos reproducir y corregir.",
      bugChecklist: [
        "El modelo de tu dispositivo y la versión de iOS que tiene.",
        "La versión de la aplicación, si la sabes.",
        "La pantalla en la que estabas y qué hiciste justo antes del problema.",
        "La planta, el padecimiento o la pregunta involucrada, si fue una en particular.",
        "Una captura de pantalla, cuando el problema se ve.",
      ],
    },
  },

  privacy: {
    en: {
      title: "Pócima Salvaje Privacy Policy",
      updated: "August 2, 2026",
      intro:
        "This policy explains what the Pócima Salvaje application does with your information. The app is published by Chyrris Technologies LLC (California LLC No. B20260351587), Fairfield, California. It covers the application; the policy for the chyrris.com website is at chyrris.com/privacy.",
      sections: [
        {
          heading: "What stays on your device",
          paragraphs: [
            "Most of what the app holds never leaves the phone. It is written to the device's own storage and it is yours to erase.",
          ],
          bullets: [
            "Your preferences and settings.",
            "The history of your conversations with MolDoctor.",
            "Your favorites: the plants and conditions you saved.",
            "Your search history.",
          ],
        },
        {
          heading: "What leaves your device",
          paragraphs: [
            "When you ask MolDoctor something, your question, and any image you attached, are sent over an encrypted connection to the Claude API operated by Anthropic, which produces the answer. We do not store those conversations or images on our servers, and they are not used to train models.",
            "An image you send for reading may be a label, a document or a photograph related to your health. Send only what you are comfortable sending, and avoid including data that identifies you or another person.",
            "Consulting the plant and condition reference sends nothing anywhere. It is already on the device.",
          ],
        },
        {
          heading: "Technical information",
          bullets: [
            "Basic device information, such as the model and the operating system version.",
            "Anonymous crash reports, which tell us where the app broke and let us fix it.",
            "Aggregated usage counts, which show which parts of the app are used. They do not identify anyone.",
          ],
        },
        {
          heading: "What we do not collect",
          bullets: [
            "The app does not ask you to create an account or give us your name, email address or telephone number.",
            "We do not store passwords or payment information, because there is nothing to pay for.",
            "We do not collect your location.",
            "We do not run advertising networks or third-party tracking inside the app.",
            "We do not sell personal information and we do not share it for marketing.",
          ],
        },
        {
          heading: "Third parties",
          paragraphs: [
            "Anthropic processes the questions and images sent to MolDoctor through its Claude API, solely to generate the answer you asked for. Anthropic has its own privacy terms and does not use API traffic to train its models.",
            "Apple distributes the application. What you do inside the app is not reported to us by name.",
          ],
        },
        {
          heading: "How long information is kept",
          paragraphs: [
            "What is stored on your device stays there until you delete it or uninstall the app. Conversation history, favorites and search history can each be cleared from Settings inside the app.",
            "An exchange with the assistant is processed to answer it and is not retained by us afterwards.",
          ],
        },
        {
          heading: "Your choices and your rights",
          bullets: [
            "You can use the whole plant and condition reference without ever using the assistant.",
            "You can erase the conversation history, the favorites and the search history at any time.",
            "Uninstalling the app removes all the data it kept on the device.",
            "You can write to us to ask what information we hold about you, to correct it or to have it deleted.",
          ],
          paragraphs: [
            "California residents have these rights under the California Consumer Privacy Act, and we extend the same handling to everyone who writes to us regardless of where they live. Write to info@chyrris.com.",
          ],
        },
        {
          heading: "Information about your health",
          paragraphs: [
            "What you type to the assistant may describe how you feel. It is treated as part of the question: processed to produce an answer and not kept by us. We do not build a health profile of you, and the app has no access to medical records of any kind.",
          ],
        },
        {
          heading: "Children",
          paragraphs: [
            "Pócima Salvaje is not directed at children under 13 and we do not knowingly collect their personal information. Where a younger person uses the app, an adult should be reading it with them.",
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
            "Chyrris Technologies LLC (California LLC No. B20260351587), Fairfield, California. Privacy and legal correspondence: info@chyrris.com. Help with the app: support@chyrris.com.",
          ],
        },
      ],
    },
    es: {
      title: "Política de Privacidad de Pócima Salvaje",
      updated: "2 de agosto de 2026",
      intro:
        "Esta política explica qué hace la aplicación Pócima Salvaje con tu información. La publica Chyrris Technologies LLC (California LLC No. B20260351587), Fairfield, California. Cubre la aplicación; la política del sitio chyrris.com está en chyrris.com/privacy.",
      sections: [
        {
          heading: "Lo que se queda en tu dispositivo",
          paragraphs: [
            "Casi todo lo que guarda la aplicación nunca sale del teléfono. Se escribe en el almacenamiento del propio dispositivo y eres tú quien lo borra.",
          ],
          bullets: [
            "Tus preferencias y ajustes.",
            "El historial de tus conversaciones con MolDoctor.",
            "Tus favoritos: las plantas y los padecimientos que guardaste.",
            "Tu historial de búsquedas.",
          ],
        },
        {
          heading: "Lo que sale de tu dispositivo",
          paragraphs: [
            "Cuando le preguntas algo a MolDoctor, tu pregunta y la imagen que hayas adjuntado se envían por una conexión cifrada a la API de Claude, operada por Anthropic, que es la que genera la respuesta. No guardamos esas conversaciones ni esas imágenes en nuestros servidores, y no se usan para entrenar modelos.",
            "Una imagen que mandas a leer puede ser una etiqueta, un documento o una fotografía relacionada con tu salud. Envía sólo lo que estés dispuesto a enviar y evita incluir datos que te identifiquen a ti o a otra persona.",
            "Consultar la referencia de plantas y padecimientos no envía nada a ningún lado: ya está en el dispositivo.",
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
          heading: "Lo que no recopilamos",
          bullets: [
            "La aplicación no te pide crear una cuenta ni darnos tu nombre, tu correo o tu teléfono.",
            "No guardamos contraseñas ni datos de pago, porque no hay nada que pagar.",
            "No recopilamos tu ubicación.",
            "No corremos redes de publicidad ni rastreo de terceros dentro de la aplicación.",
            "No vendemos información personal ni la compartimos con fines de marketing.",
          ],
        },
        {
          heading: "Terceros que intervienen",
          paragraphs: [
            "Anthropic procesa las preguntas e imágenes que se envían a MolDoctor a través de su API de Claude, únicamente para generar la respuesta que pediste. Anthropic tiene sus propios términos de privacidad y no usa el tráfico de la API para entrenar sus modelos.",
            "Apple distribuye la aplicación. Lo que haces dentro de ella no se nos reporta con tu nombre.",
          ],
        },
        {
          heading: "Cuánto tiempo se conserva",
          paragraphs: [
            "Lo que se guarda en tu dispositivo permanece ahí hasta que lo borras o desinstalas la aplicación. El historial de conversaciones, los favoritos y el historial de búsquedas se borran desde Configuración, dentro de la aplicación.",
            "Un intercambio con el asistente se procesa para responderlo y después no lo conservamos.",
          ],
        },
        {
          heading: "Tus opciones y tus derechos",
          bullets: [
            "Puedes usar toda la referencia de plantas y padecimientos sin tocar nunca el asistente.",
            "Puedes borrar el historial de conversaciones, los favoritos y el historial de búsquedas cuando quieras.",
            "Al desinstalar la aplicación se elimina todo lo que guardó en el dispositivo.",
            "Puedes escribirnos para preguntar qué información tenemos sobre ti, pedir que la corrijamos o pedir que la borremos.",
          ],
          paragraphs: [
            "Los residentes de California tienen estos derechos bajo la California Consumer Privacy Act, y aplicamos el mismo trato a todas las personas que nos escriben, vivan donde vivan. Escribe a info@chyrris.com.",
          ],
        },
        {
          heading: "Información sobre tu salud",
          paragraphs: [
            "Lo que le escribes al asistente puede describir cómo te sientes. Se trata como parte de la pregunta: se procesa para dar una respuesta y no lo conservamos. No armamos un perfil de salud tuyo, y la aplicación no tiene acceso a expedientes médicos de ningún tipo.",
          ],
        },
        {
          heading: "Menores",
          paragraphs: [
            "Pócima Salvaje no está dirigida a menores de 13 años y no recopilamos su información personal a sabiendas. Si la usa alguien más joven, conviene que un adulto la consulte con él.",
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
            "Chyrris Technologies LLC (California LLC No. B20260351587), Fairfield, California. Correspondencia de privacidad y legal: info@chyrris.com. Ayuda con la aplicación: support@chyrris.com.",
          ],
        },
      ],
    },
  },

  terms: {
    en: {
      title: "Pócima Salvaje Terms of Use",
      updated: "August 2, 2026",
      intro:
        "These terms govern your use of the Pócima Salvaje application, published by Chyrris Technologies LLC (California LLC No. B20260351587), Fairfield, California. By installing or using the app you accept them. If you do not accept them, do not use the app.",
      sections: [
        {
          heading: "What the app is",
          paragraphs: [
            "Pócima Salvaje is a reference of medicinal plants and traditional remedies for iPhone and iPad, together with MolDoctor, an assistant that answers questions about preparation and properties. It describes what tradition holds about these plants: their properties, how the remedy is prepared, the amounts customarily used, and the contraindications recorded for them.",
          ],
        },
        {
          heading: "Information, not medical advice",
          paragraphs: [
            "Pócima Salvaje is informational. Nothing in it is medical advice, a diagnosis or a prescription, and the same applies to every answer MolDoctor gives.",
            "Consult a qualified health professional before using a remedy, and especially if you are under treatment, take medication, are pregnant or breastfeeding, or are considering a remedy for a child. Medicinal plants contain active compounds: they have contraindications and they can interact with medicines. In an emergency, call your local emergency number instead of the app.",
            "You decide what to do with what you read here, and that decision is yours.",
          ],
        },
        {
          heading: "The assistant",
          bullets: [
            "MolDoctor generates its answers with artificial intelligence, using the Claude API operated by Anthropic.",
            "Its answers come from general knowledge and can be incomplete or wrong. Check anything that matters against the plant entry itself and against a professional.",
            "It has no access to your medical history and cannot examine you, diagnose you or prescribe anything.",
            "It requires an internet connection, and it may be unavailable when the service it depends on is.",
            "Treat it as a starting point for reading, not as a basis for a health decision.",
          ],
        },
        {
          heading: "How you may use the app",
          bullets: [
            "You are granted a limited, non-exclusive, non-transferable license to use the app for personal, non-commercial purposes.",
            "You may not copy, redistribute or resell the plant and condition database, or build a derivative work from it.",
            "You may not decompile the app or attempt to extract its source code.",
            "You may not present its content to other people as professional medical advice, or use it to offer diagnosis or treatment.",
            "Please report bugs and security problems to support@chyrris.com rather than publishing them.",
          ],
        },
        {
          heading: "Cost",
          paragraphs: [
            "The app is free to download and use. Every feature, the assistant included, is available at no cost, and there is no subscription or in-app purchase. If that ever changes, it will be stated in the app before anything is charged.",
          ],
        },
        {
          heading: "Ownership",
          paragraphs: [
            "The application, its text, its design and the compiled database belong to Chyrris Technologies LLC and are protected by copyright and trademark law.",
            "The traditional knowledge the app describes is not ours and is not claimed as ours. What belongs to us is the compilation, the wording and the software.",
          ],
        },
        {
          heading: "Privacy",
          paragraphs: [
            "What the app does with your information is set out in its privacy policy at chyrris.com/pocima-salvaje/privacy, which forms part of these terms.",
          ],
        },
        {
          heading: "Availability and changes",
          paragraphs: [
            "We may change, suspend or discontinue the app or any part of it, and an update may be required to keep using it. We may also update these terms; the date at the top of this page shows when they last changed, and significant changes will be announced in the app.",
            "Continuing to use the app after a change means you accept the updated terms. If you do not accept them, stop using the app and uninstall it.",
          ],
        },
        {
          heading: "Ending use",
          paragraphs: [
            "You can stop using the app at any time by uninstalling it. We may end your access if you breach these terms or use the app in a way that harms other people. Provisions that by their nature should survive the end of use remain in effect.",
          ],
        },
        {
          heading: "Liability",
          paragraphs: [
            "The app is provided as it is. We do not warrant that it will be uninterrupted or free of errors, and we do not guarantee the accuracy or completeness of the traditional information it compiles or of the answers the assistant generates.",
            "To the extent the law allows, Chyrris Technologies LLC is not liable for indirect or consequential loss arising from use of the app, including decisions about your health taken on the strength of what you read in it, nor for the availability of the third-party services the assistant depends on. Nothing in these terms limits liability that cannot lawfully be limited.",
          ],
        },
        {
          heading: "Governing law",
          paragraphs: [
            "These terms are governed by the laws of the State of California, United States, without regard to conflict of law rules. Disputes about the app are subject to the courts of that state.",
          ],
        },
        {
          heading: "Contact",
          paragraphs: [
            "Questions about these terms: info@chyrris.com. Help with the app: support@chyrris.com. We reply within two business days, Monday through Friday.",
          ],
        },
      ],
    },
    es: {
      title: "Términos de Uso de Pócima Salvaje",
      updated: "2 de agosto de 2026",
      intro:
        "Estos términos rigen el uso de la aplicación Pócima Salvaje, publicada por Chyrris Technologies LLC (California LLC No. B20260351587), Fairfield, California. Al instalarla o usarla los aceptas. Si no los aceptas, no uses la aplicación.",
      sections: [
        {
          heading: "Qué es la aplicación",
          paragraphs: [
            "Pócima Salvaje es una referencia de plantas medicinales y remedios tradicionales para iPhone y iPad, junto con MolDoctor, un asistente que responde preguntas sobre preparación y propiedades. Describe lo que la tradición sostiene sobre esas plantas: sus propiedades, cómo se prepara el remedio, las cantidades de uso acostumbrado y las contraindicaciones registradas.",
          ],
        },
        {
          heading: "Información, no consejo médico",
          paragraphs: [
            "Pócima Salvaje es informativa. Nada de lo que contiene es consejo médico, diagnóstico ni receta, y lo mismo vale para cada respuesta que da MolDoctor.",
            "Consulta a un profesional de la salud calificado antes de usar un remedio, y con mayor razón si estás en tratamiento, tomas medicamentos, estás embarazada o amamantando, o piensas dar un remedio a un niño. Las plantas medicinales contienen principios activos: tienen contraindicaciones y pueden interactuar con medicamentos. Ante una emergencia, llama al número de emergencias de tu localidad en lugar de abrir la aplicación.",
            "Tú decides qué hacer con lo que lees aquí, y esa decisión es tuya.",
          ],
        },
        {
          heading: "El asistente",
          bullets: [
            "MolDoctor genera sus respuestas con inteligencia artificial, mediante la API de Claude operada por Anthropic.",
            "Sus respuestas provienen de conocimiento general y pueden ser incompletas o equivocadas. Lo que importe, verifícalo en la ficha de la planta y con un profesional.",
            "No tiene acceso a tu historial médico y no puede examinarte, diagnosticarte ni recetarte nada.",
            "Necesita conexión a internet y puede quedar fuera de servicio cuando lo esté el servicio del que depende.",
            "Tómalo como un punto de partida para leer, no como base para una decisión de salud.",
          ],
        },
        {
          heading: "Cómo puedes usar la aplicación",
          bullets: [
            "Se te otorga una licencia limitada, no exclusiva e intransferible para usar la aplicación con fines personales y no comerciales.",
            "No puedes copiar, redistribuir ni revender la base de plantas y padecimientos, ni construir una obra derivada a partir de ella.",
            "No puedes descompilar la aplicación ni intentar extraer su código fuente.",
            "No puedes presentar su contenido a otras personas como consejo médico profesional, ni usarlo para ofrecer diagnósticos o tratamientos.",
            "Los errores y los problemas de seguridad repórtalos a support@chyrris.com en lugar de publicarlos.",
          ],
        },
        {
          heading: "Costo",
          paragraphs: [
            "La aplicación se descarga y se usa sin costo. Todas las funciones, incluido el asistente, están disponibles gratis, y no hay suscripción ni compras dentro de la aplicación. Si algún día eso cambia, se dirá en la aplicación antes de cobrar nada.",
          ],
        },
        {
          heading: "Propiedad",
          paragraphs: [
            "La aplicación, su texto, su diseño y la base de datos compilada pertenecen a Chyrris Technologies LLC y están protegidos por las leyes de derechos de autor y de marcas.",
            "El conocimiento tradicional que la aplicación describe no es nuestro ni lo reclamamos como propio. Lo que nos pertenece es la compilación, la redacción y el software.",
          ],
        },
        {
          heading: "Privacidad",
          paragraphs: [
            "Lo que la aplicación hace con tu información está descrito en su política de privacidad, en chyrris.com/pocima-salvaje/privacy, que forma parte de estos términos.",
          ],
        },
        {
          heading: "Disponibilidad y cambios",
          paragraphs: [
            "Podemos cambiar, suspender o descontinuar la aplicación o alguna de sus partes, y puede ser necesaria una actualización para seguir usándola. También podemos actualizar estos términos; la fecha al inicio de esta página indica cuándo cambiaron por última vez, y los cambios importantes se avisan en la aplicación.",
            "Seguir usando la aplicación después de un cambio significa que aceptas los términos actualizados. Si no los aceptas, deja de usarla y desinstálala.",
          ],
        },
        {
          heading: "Fin del uso",
          paragraphs: [
            "Puedes dejar de usar la aplicación en cualquier momento desinstalándola. Podemos dar por terminado tu acceso si incumples estos términos o si usas la aplicación de una forma que perjudique a otras personas. Las disposiciones que por su naturaleza deban sobrevivir al fin del uso siguen vigentes.",
          ],
        },
        {
          heading: "Responsabilidad",
          paragraphs: [
            "La aplicación se ofrece tal como está. No garantizamos que funcione sin interrupciones ni sin errores, y no garantizamos la exactitud ni la integridad de la información tradicional que compila ni de las respuestas que genera el asistente.",
            "En la medida en que la ley lo permita, Chyrris Technologies LLC no responde por daños indirectos o consecuentes derivados del uso de la aplicación, incluidas las decisiones sobre tu salud que tomes con base en lo que leas en ella, ni por la disponibilidad de los servicios de terceros de los que depende el asistente. Nada en estos términos limita una responsabilidad que legalmente no pueda limitarse.",
          ],
        },
        {
          heading: "Ley aplicable",
          paragraphs: [
            "Estos términos se rigen por las leyes del Estado de California, Estados Unidos, sin atender a normas de conflicto de leyes. Las controversias sobre la aplicación se someten a los tribunales de ese estado.",
          ],
        },
        {
          heading: "Contacto",
          paragraphs: [
            "Preguntas sobre estos términos: info@chyrris.com. Ayuda con la aplicación: support@chyrris.com. Respondemos en un plazo de dos días hábiles, de lunes a viernes.",
          ],
        },
      ],
    },
  },
};
