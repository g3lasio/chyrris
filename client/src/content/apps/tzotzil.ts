/**
 * Contenido de la ficha de producto de Tzotzil Bible.
 *
 * Migrado de las cuatro páginas sueltas del sitio anterior
 * (TzotzilBible, TzotzilBibleAbout, TzotzilBibleSupport, TzotzilBiblePrivacy).
 *
 * Correcciones hechas al migrar:
 *  - La política traía una fecha de actualización de 2025; ahora es 2 de agosto de 2026.
 *  - Su sección 1 repetía literalmente el párrafo introductorio; se escribió una
 *    primera sección real (cómo está construida la aplicación).
 *  - El contacto legal era un correo personal; ahora es info@chyrris.com.
 *  - Los iconos emoji de las secciones se eliminaron.
 *  - "Sirve a más de 500,000 hablantes" era una cifra de población presentada como
 *    base de usuarios; ahora se declara como lo que es.
 *  - Un solo compromiso de respuesta: dos días hábiles, de lunes a viernes.
 *  - Se decía que Nevin era lo único que salía del dispositivo, y la misma
 *    política declaraba reportes de error y conteos agregados; la afirmación
 *    absoluta se acotó a lo que el usuario escribe.
 *
 * Esta app no tiene Términos de Servicio propios, así que la clave terms queda
 * fuera: no se anuncia una página que no existe.
 */

import type { AppContent } from "@/content/appDocs";

export const tzotzilContent: AppContent = {
  overview: {
    en: {
      tagline: "The Bible in Tzotzil and Spanish, on the web, iOS and Android.",
      body: [
        "Tzotzil Bible puts the complete Bible in Tzotzil, a Mayan language of Chiapas, Mexico, alongside four Spanish translations. You can read either language on its own or set both side by side, verse against verse.",
        "The text lives on the device, so reading, search, bookmarks, notes and reading plans work with no connection at all. The application is free, and it does not ask you to create an account.",
        "It also includes Nevin, an assistant that answers questions from biblical teaching and the writings of Ellen G. White. Nevin needs an internet connection, and it is the one part of the application that sends anything you write off the device.",
      ],
      highlightsHeading: "What it does",
      highlights: [
        "The complete Bible in Tzotzil, plus Reina-Valera 1960, Nueva Versión Internacional, Traducción en Lenguaje Actual and Dios Habla Hoy in Spanish.",
        "Side-by-side comparison of any two versions, which is what makes the application useful for learning as well as for reading.",
        "Search across every version by word, by theme or by reference such as Juan 3:16.",
        "Three one-year reading plans: canonical, chronological and historical, with progress tracking and optional daily reminders.",
        "Bookmarks, notes and favorites, all kept on the device.",
        "Full offline reading. Only Nevin requires a connection.",
        "Published on the web at https://bible.chyrris.com and as applications for iOS and Android.",
      ],
    },
    es: {
      tagline: "La Biblia en tzotzil y en español, en web, iOS y Android.",
      body: [
        "Tzotzil Bible reúne la Biblia completa en tzotzil, una lengua maya de Chiapas, México, junto a cuatro traducciones al español. Se puede leer en un solo idioma o poner los dos en paralelo, versículo contra versículo.",
        "El texto vive en el dispositivo: la lectura, la búsqueda, los marcadores, las notas y los planes de lectura funcionan sin conexión. La aplicación es gratuita y no pide crear una cuenta.",
        "Incluye además a Nevin, un asistente que responde a partir de la enseñanza bíblica y de los escritos de Elena G. de White. Nevin sí necesita conexión a internet, y es la única parte de la aplicación que envía fuera del dispositivo algo de lo que usted escribe.",
      ],
      highlightsHeading: "Qué hace",
      highlights: [
        "La Biblia completa en tzotzil, más Reina-Valera 1960, Nueva Versión Internacional, Traducción en Lenguaje Actual y Dios Habla Hoy en español.",
        "Comparación en paralelo de dos versiones cualesquiera, que es lo que vuelve útil la aplicación tanto para aprender el idioma como para leer.",
        "Búsqueda en todas las versiones por palabra, por tema o por referencia, como Juan 3:16.",
        "Tres planes de lectura de un año: canónico, cronológico e histórico, con seguimiento de avance y recordatorios diarios opcionales.",
        "Marcadores, notas y favoritos, todo guardado en el dispositivo.",
        "Lectura completa sin conexión. Sólo Nevin necesita internet.",
        "Publicada en la web en https://bible.chyrris.com y como aplicación para iOS y Android.",
      ],
    },
  },

  about: {
    en: {
      tagline: "What the application is, who it is for, and how it was built.",
      body: [
        "Tzotzil is a Mayan language spoken by roughly half a million people, most of them in the highlands of Chiapas, in southern Mexico. For a large part of that community it is the language of the house, the market and the church, while Spanish is a second language learned at school. Bible software has been written for Spanish for decades. It had not been written for Tzotzil.",
        "Tzotzil Bible exists to close that gap. The purpose is plain: give a Tzotzil speaker the same thing a Spanish speaker already has, which is scripture in the language they think in, on a phone they already own, without paying for it.",
        "The bilingual layout is the centre of the design. Placing the Tzotzil text next to Reina-Valera or Dios Habla Hoy lets a reader move between the two, check one against the other, and use the pairing to strengthen literacy in both. Teachers, lay preachers and families use it in that second way as much as the first.",
        "Working offline is not a convenience feature here. Coverage in the highlands is uneven and data is an expense. The whole Bible, in every version the application ships with, is stored on the device in a local database, so the application is fully usable in a community with no signal and stays usable when the signal comes and goes.",
        "Nevin, the assistant, answers questions about scripture from biblical teaching and the writings of Ellen G. White. It is a study aid and nothing more. It does not replace personal study, prayer, or the guidance of a pastor, and the application says so where the assistant is used. Nevin is the only feature that requires a connection, and the only one that sends anything you write off the device.",
        "On the engineering side, the mobile applications are built with React Native, the offline text is held in SQLite, and Nevin runs on Anthropic's Claude models. The application is deliberately kept light so that it performs on inexpensive and older devices, which are the devices most of its readers actually have.",
        "The Tzotzil text is a living translation. Native speakers and scholars who find an error can write to support@chyrris.com with the reference, the current wording and the proposed correction. Every suggestion is reviewed before anything in the application changes.",
      ],
      highlightsHeading: "Bible versions included",
      highlights: [
        "Tzotzil, the translation into the Tzotzil of the Chiapas highlands.",
        "RV1960, Reina-Valera 1960, in Spanish.",
        "NVI, Nueva Versión Internacional, in Spanish.",
        "TLA, Traducción en Lenguaje Actual, in Spanish.",
        "DHH, Dios Habla Hoy, in Spanish.",
      ],
    },
    es: {
      tagline: "Qué es la aplicación, para quién es y cómo se construyó.",
      body: [
        "El tzotzil es una lengua maya que hablan alrededor de medio millón de personas, la mayoría en los Altos de Chiapas, en el sur de México. Para buena parte de esa comunidad es la lengua de la casa, del mercado y de la iglesia, mientras que el español es una segunda lengua aprendida en la escuela. Software bíblico en español hay desde hace décadas. En tzotzil no lo había.",
        "Tzotzil Bible existe para cerrar esa brecha. El objetivo es sencillo: que quien habla tzotzil tenga lo mismo que ya tiene quien habla español, es decir, las Escrituras en la lengua en la que piensa, en el teléfono que ya trae en la mano y sin pagar por ello.",
        "La lectura bilingüe es el centro del diseño. Poner el texto en tzotzil junto a la Reina-Valera o a Dios Habla Hoy permite ir de una a otra, contrastarlas y usar el par para afianzar la lectura en los dos idiomas. Maestros, predicadores laicos y familias la usan tanto para eso como para leer.",
        "Funcionar sin conexión no es aquí una comodidad. La cobertura en los Altos es irregular y los datos cuestan. Toda la Biblia, en todas las versiones que trae la aplicación, se guarda en el dispositivo en una base de datos local, de modo que la aplicación sirve completa en una comunidad sin señal y sigue sirviendo cuando la señal va y viene.",
        "Nevin, el asistente, responde preguntas sobre las Escrituras a partir de la enseñanza bíblica y de los escritos de Elena G. de White. Es una ayuda de estudio y nada más. No sustituye el estudio personal, la oración ni el acompañamiento pastoral, y la aplicación lo advierte donde se usa el asistente. Nevin es la única función que necesita conexión y la única que envía fuera del dispositivo algo de lo que usted escribe.",
        "En lo técnico, las aplicaciones móviles están hechas con React Native, el texto sin conexión se guarda en SQLite y Nevin funciona sobre los modelos Claude de Anthropic. La aplicación se mantiene ligera a propósito, para que responda bien en equipos económicos y de años anteriores, que son los que de verdad tienen sus lectores.",
        "La traducción al tzotzil es un trabajo vivo. Quien hable la lengua o estudie el texto y encuentre un error puede escribir a support@chyrris.com con la referencia, la redacción actual y la corrección que propone. Cada sugerencia se revisa antes de que cambie nada en la aplicación.",
      ],
      highlightsHeading: "Versiones bíblicas incluidas",
      highlights: [
        "Tzotzil, la traducción al tzotzil de los Altos de Chiapas.",
        "RV1960, Reina-Valera 1960, en español.",
        "NVI, Nueva Versión Internacional, en español.",
        "TLA, Traducción en Lenguaje Actual, en español.",
        "DHH, Dios Habla Hoy, en español.",
      ],
    },
  },

  support: {
    en: {
      title: "Tzotzil Bible support",
      intro:
        "This page answers the questions we are asked most often about Tzotzil Bible and tells you what to send us when something is not working. Support is by email, in Spanish or English.",
      contactHeading: "Contact support",
      faqHeading: "Frequent questions",
      faq: [
        {
          question: "What is Tzotzil Bible?",
          answer:
            "It is a free Bible application for the web, iOS and Android that carries the complete Bible in Tzotzil and in four Spanish translations, three one-year reading plans, search across every version, and Nevin, an assistant that answers questions from biblical teaching and the writings of Ellen G. White.",
        },
        {
          question: "Which versions are included?",
          answer:
            "Tzotzil, and in Spanish RV1960 (Reina-Valera 1960), NVI (Nueva Versión Internacional), TLA (Traducción en Lenguaje Actual) and DHH (Dios Habla Hoy). Any two of them can be shown side by side.",
        },
        {
          question: "How much does it cost?",
          answer:
            "Nothing. Every version, every reading plan and Nevin itself are free. There is no purchase, no subscription and no trial period.",
        },
        {
          question: "Do I need an account?",
          answer:
            "No. The application does not ask you to register, and there is no password to remember. Your bookmarks, notes and reading progress are kept on the device you are using, which also means they do not follow you to a second device.",
        },
        {
          question: "Does it work without an internet connection?",
          answer:
            "Reading, search, bookmarks, notes and reading plans work entirely offline, because the full text of every version is stored on the device. Nevin is the exception: it sends your question to a server, so it needs a connection.",
        },
        {
          question: "What is Nevin, and what are its limits?",
          answer:
            "Nevin is a study assistant that answers questions about scripture, citing passages and drawing on the writings of Ellen G. White. It is a tool for study. It does not replace reading the Bible yourself, prayer, or the guidance of a pastor, and it can be wrong. Check what it tells you against the text.",
        },
        {
          question: "How do the reading plans work?",
          answer:
            "There are three, each covering the whole Bible in a year. The canonical plan follows the traditional order of the books, the chronological plan follows the order in which events happened, and the historical plan follows the order in which the books were written. Each one gives you a daily portion, tracks how far you have come and can send an optional daily reminder.",
        },
        {
          question: "How do I change versions or compare two of them?",
          answer:
            "Open the version selector at the top of the reading screen and choose the version you want. To compare, turn on the side-by-side view and pick the second version. Verses stay aligned as you scroll.",
        },
        {
          question: "The application closes or freezes.",
          answer:
            "Close it completely and open it again, then restart the device. Check that an update is not waiting in the App Store or Google Play, and that the device has free storage, since the offline text needs room. If it still happens, write to us with the device model, the operating system version and what you were doing at the time.",
        },
        {
          question: "Nevin is not answering.",
          answer:
            "Nevin needs a connection, so first confirm that you have one and try switching between mobile data and Wi-Fi. An answer can take several seconds to come back. If nothing arrives after that, the assistant service may be temporarily unavailable; the rest of the application keeps working offline in the meantime.",
        },
        {
          question: "Search is not finding a verse.",
          answer:
            "Check the spelling, and search for a distinctive word rather than a whole phrase, since wording differs between versions. You can also type the reference directly, for example Juan 3:16. If you search in Tzotzil, remember that the same passage may be worded differently in the Spanish versions. If you believe a verse is genuinely missing, tell us the reference and the version.",
        },
        {
          question: "My reading plan progress is not being saved.",
          answer:
            "Progress is written to the device, so it needs storage space and permission to store data locally. In the web version, a private or incognito window discards that storage when you close it, so use a normal window. If progress still disappears after you restart the application, write to us before resetting the plan and tell us which plan it is.",
        },
        {
          question: "The daily reminders are not arriving.",
          answer:
            "Check that reminders are turned on in the application settings and that the time is the one you wanted. Then check the device: notifications must be allowed for Tzotzil Bible, Do Not Disturb must not be silencing them, and on Android battery optimisation can stop them from arriving. Turning the reminder off and on again after those changes usually settles it.",
        },
        {
          question: "Is my information private?",
          answer:
            "Your bookmarks, notes, favorites, reading progress and conversation history stay on your device. The questions you put to Nevin are sent over an encrypted connection to be answered and are not kept by us afterwards. The privacy policy for this application sets out the detail.",
        },
        {
          question: "I found an error in the Tzotzil translation. Can I report it?",
          answer:
            "Yes, and we would rather hear about it than not. Write to support@chyrris.com with the exact reference, the wording that appears now, the wording you propose and a line about your background in the language. Suggestions are reviewed before anything changes in the application.",
        },
        {
          question: "How do I contact support?",
          answer:
            "Write to support@chyrris.com. We reply within two business days, Monday through Friday. Questions about privacy or any other legal matter go to info@chyrris.com.",
        },
      ],
      requirementsHeading: "Where it runs and what it needs",
      requirements: [
        "Web: any current browser at https://bible.chyrris.com. Nothing to install.",
        "iOS: iPhone and iPad, installed from the App Store.",
        "Android: phones and tablets, installed from Google Play.",
        "Storage: keep a few hundred megabytes free, since the complete text of every version is held on the device.",
        "Connection: needed only for Nevin and for updates. Everything else works offline.",
      ],
      bugHeading: "Reporting a problem",
      bugIntro:
        "Write to support@chyrris.com. A report we can reproduce is fixed far sooner than one we cannot, so please include:",
      bugChecklist: [
        "Which edition you were using: web, iOS or Android.",
        "The device model and the operating system version.",
        "The application version, shown in Settings.",
        "The Bible version and the passage where it happened.",
        "What you did, what you expected, and what happened instead.",
        "A screenshot, if the problem is something you can see.",
      ],
    },
    es: {
      title: "Soporte de Tzotzil Bible",
      intro:
        "Esta página responde lo que más nos preguntan sobre Tzotzil Bible y explica qué mandarnos cuando algo no funciona. La atención es por correo, en español o en inglés.",
      contactHeading: "Contactar con soporte",
      faqHeading: "Preguntas frecuentes",
      faq: [
        {
          question: "¿Qué es Tzotzil Bible?",
          answer:
            "Es una aplicación bíblica gratuita para web, iOS y Android que trae la Biblia completa en tzotzil y en cuatro traducciones al español, tres planes de lectura de un año, búsqueda en todas las versiones y a Nevin, un asistente que responde a partir de la enseñanza bíblica y de los escritos de Elena G. de White.",
        },
        {
          question: "¿Qué versiones incluye?",
          answer:
            "Tzotzil y, en español, RV1960 (Reina-Valera 1960), NVI (Nueva Versión Internacional), TLA (Traducción en Lenguaje Actual) y DHH (Dios Habla Hoy). Dos de ellas se pueden ver en paralelo.",
        },
        {
          question: "¿Cuánto cuesta?",
          answer:
            "Nada. Todas las versiones, todos los planes de lectura y el propio Nevin son gratuitos. No hay compra, ni suscripción, ni periodo de prueba.",
        },
        {
          question: "¿Necesito una cuenta?",
          answer:
            "No. La aplicación no pide registro y no hay contraseña que recordar. Sus marcadores, notas y avance de lectura quedan en el dispositivo que está usando, lo que también significa que no lo acompañan a un segundo aparato.",
        },
        {
          question: "¿Funciona sin internet?",
          answer:
            "La lectura, la búsqueda, los marcadores, las notas y los planes funcionan sin conexión, porque el texto completo de cada versión está guardado en el dispositivo. Nevin es la excepción: manda la pregunta a un servidor, así que necesita conexión.",
        },
        {
          question: "¿Qué es Nevin y hasta dónde llega?",
          answer:
            "Nevin es un asistente de estudio que responde preguntas sobre las Escrituras, cita pasajes y se apoya en los escritos de Elena G. de White. Es una herramienta de estudio. No sustituye la lectura personal de la Biblia, la oración ni el acompañamiento pastoral, y puede equivocarse. Conviene contrastar lo que dice con el texto.",
        },
        {
          question: "¿Cómo funcionan los planes de lectura?",
          answer:
            "Son tres, y cada uno recorre toda la Biblia en un año. El plan canónico sigue el orden tradicional de los libros, el cronológico sigue el orden en que ocurrieron los hechos y el histórico sigue el orden en que se escribieron los libros. Cada plan le da una porción diaria, lleva la cuenta de lo avanzado y puede enviarle un recordatorio diario si lo activa.",
        },
        {
          question: "¿Cómo cambio de versión o comparo dos?",
          answer:
            "Abra el selector de versión en la parte superior de la pantalla de lectura y elija la que quiera. Para comparar, active la vista en paralelo y escoja la segunda versión. Los versículos se mantienen alineados al desplazarse.",
        },
        {
          question: "La aplicación se cierra o se traba.",
          answer:
            "Ciérrela por completo y vuelva a abrirla; luego reinicie el dispositivo. Revise que no haya una actualización pendiente en la App Store o en Google Play y que quede espacio libre, porque el texto sin conexión ocupa lugar. Si sigue pasando, escríbanos con el modelo del equipo, la versión del sistema y qué estaba haciendo cuando ocurrió.",
        },
        {
          question: "Nevin no responde.",
          answer:
            "Nevin necesita conexión, así que confirme que la tiene y pruebe a cambiar entre datos móviles y Wi-Fi. Una respuesta puede tardar varios segundos en llegar. Si después de eso no llega nada, el servicio del asistente puede estar caído por un rato; mientras tanto, el resto de la aplicación sigue funcionando sin conexión.",
        },
        {
          question: "La búsqueda no encuentra un versículo.",
          answer:
            "Revise la ortografía y busque una palabra distintiva en lugar de una frase completa, porque la redacción cambia de una versión a otra. También puede escribir la referencia directamente, por ejemplo Juan 3:16. Si busca en tzotzil, tenga en cuenta que el mismo pasaje puede estar redactado de otro modo en las versiones en español. Si de verdad cree que falta un versículo, díganos la referencia y la versión.",
        },
        {
          question: "No se guarda mi avance en el plan de lectura.",
          answer:
            "El avance se escribe en el dispositivo, así que hace falta espacio y permiso para guardar datos localmente. En la versión web, una ventana privada o de incógnito borra ese almacenamiento al cerrarse; use una ventana normal. Si el avance sigue desapareciendo después de reiniciar la aplicación, escríbanos antes de reiniciar el plan y díganos cuál es.",
        },
        {
          question: "No llegan los recordatorios diarios.",
          answer:
            "Revise que los recordatorios estén activados en los ajustes de la aplicación y que la hora sea la que quería. Después revise el dispositivo: las notificaciones deben estar permitidas para Tzotzil Bible, el modo No molestar no debe estar silenciándolas y en Android el ahorro de batería puede impedir que lleguen. Apagar y volver a encender el recordatorio después de esos cambios suele bastar.",
        },
        {
          question: "¿Mi información es privada?",
          answer:
            "Sus marcadores, notas, favoritos, avance de lectura e historial de conversación se quedan en su dispositivo. Las preguntas que le hace a Nevin viajan cifradas para ser respondidas y no las conservamos después. La política de privacidad de esta aplicación explica el detalle.",
        },
        {
          question: "Encontré un error en la traducción al tzotzil. ¿Puedo reportarlo?",
          answer:
            "Sí, y preferimos enterarnos. Escriba a support@chyrris.com con la referencia exacta, la redacción que aparece hoy, la que propone y una línea sobre su relación con la lengua. Las sugerencias se revisan antes de que cambie nada en la aplicación.",
        },
        {
          question: "¿Cómo contacto con soporte?",
          answer:
            "Escriba a support@chyrris.com. Respondemos en un plazo de dos días hábiles, de lunes a viernes. Las preguntas de privacidad o de cualquier otro asunto legal van a info@chyrris.com.",
        },
      ],
      requirementsHeading: "Dónde funciona y qué necesita",
      requirements: [
        "Web: cualquier navegador actual, en https://bible.chyrris.com. No hay nada que instalar.",
        "iOS: iPhone y iPad, desde la App Store.",
        "Android: teléfonos y tabletas, desde Google Play.",
        "Almacenamiento: conviene dejar algunos cientos de megabytes libres, porque el texto completo de cada versión se guarda en el dispositivo.",
        "Conexión: sólo hace falta para Nevin y para las actualizaciones. Todo lo demás funciona sin internet.",
      ],
      bugHeading: "Cómo reportar un problema",
      bugIntro:
        "Escriba a support@chyrris.com. Un reporte que podemos reproducir se arregla mucho antes que uno que no, así que incluya:",
      bugChecklist: [
        "Qué versión usaba: web, iOS o Android.",
        "El modelo del dispositivo y la versión del sistema operativo.",
        "La versión de la aplicación, que aparece en Ajustes.",
        "La versión bíblica y el pasaje donde ocurrió.",
        "Qué hizo, qué esperaba y qué pasó en su lugar.",
        "Una captura de pantalla, si el problema se ve.",
      ],
    },
  },

  privacy: {
    en: {
      title: "Privacy Policy",
      updated: "August 2, 2026",
      intro:
        "This policy explains what the Tzotzil Bible application collects, why it collects it, and what you can ask us to do with it. It covers the web application at https://bible.chyrris.com and the iOS and Android editions. The application is published by Chyrris Technologies LLC (California LLC No. B20260351587), Fairfield, California. The policy for the chyrris.com website is separate and is at chyrris.com/privacy.",
      sections: [
        {
          heading: "How the application is built",
          paragraphs: [
            "Tzotzil Bible keeps your material on your device. The complete text of every Bible version it ships with is stored locally, and so is everything you produce while reading: bookmarks, notes, favorites, reading plan progress and your settings. None of that is uploaded to us.",
            "One feature works differently. Nevin, the assistant, needs a server in order to answer, so the question you type leaves the device and the answer comes back. Nevin is the only feature that sends anything you write off the device. Apart from it, the application sends anonymous crash reports and aggregate counts of which features are used, both described below; neither identifies you.",
            "The application has no accounts. It does not ask you to register, we do not store passwords, and the application takes no payments.",
          ],
        },
        {
          heading: "Information we collect",
          paragraphs: [
            "There is little to collect, and most of what the application records never leaves the device.",
          ],
          bullets: [
            "Held on your device only: your preferences such as font size and preferred version, your bookmarks, notes and favorites, your reading plan progress, and your conversation history with Nevin.",
            "Sent when you use Nevin: the question you write, together with enough of the current exchange for the answer to follow on sensibly.",
            "Technical information: device model, operating system version, application version, and anonymous reports produced when the application crashes.",
            "Aggregate counts of which features are used. They are not attached to a person and cannot be traced back to one.",
            "Whatever you choose to put in an email if you write to us for support.",
          ],
        },
        {
          heading: "Why we use it",
          bullets: [
            "To show the text you asked for and to return you to your place, your notes and your plan progress the next time you open the application.",
            "To answer the questions you put to Nevin.",
            "To find and fix crashes and errors, which is the only purpose of the crash reports.",
            "To decide what to build next, which is the only purpose of the aggregate counts.",
            "To reply to you when you write to support.",
          ],
        },
        {
          heading: "What we do not do",
          bullets: [
            "We do not sell or rent personal information.",
            "We do not show advertising in the application and we do not share anything with advertisers.",
            "We do not ask for your name, your address, your contacts, your photographs or your location.",
            "We do not use your questions to Nevin to train artificial intelligence models, and the provider that processes them does not use them for training either.",
            "We do not keep your conversations with Nevin on our servers once the answer has been returned.",
          ],
        },
        {
          heading: "Where the information goes",
          paragraphs: [
            "A question put to Nevin travels over an encrypted connection (HTTPS) to Anthropic, whose Claude models produce the answer. Anthropic processes the question on our instructions in order to reply and does not use it to train its models. Anthropic publishes its own terms for that service.",
            "The web edition is served by our hosting provider, which keeps ordinary web server logs, including IP address and browser user agent. Those logs exist to keep the service running and to limit abuse.",
            "The iOS and Android editions are distributed through the App Store and Google Play. Installation, updates and any store account are handled by Apple and Google under their own policies. We receive no information from them that identifies you.",
            "We do not run third-party analytics, advertising software or session recording inside the application.",
          ],
        },
        {
          heading: "Storage and security",
          bullets: [
            "What the application keeps on your device is held in the protected application storage the operating system provides.",
            "All traffic between the application and our servers uses encrypted connections.",
            "We store no passwords and no financial information, because there are no accounts and no payments.",
            "We apply the security practices that are standard for an application of this kind. No system is beyond failure, and we do not claim otherwise.",
          ],
        },
        {
          heading: "How long we keep it",
          bullets: [
            "Data on your device stays there until you delete it or uninstall the application. Uninstalling removes all of it.",
            "You can clear your Nevin conversation history at any time from the application settings.",
            "A question sent to Nevin is processed for the length of that exchange and is not retained by us afterwards.",
            "Crash reports and aggregate counts are kept only while they are useful for diagnosing a fault or planning work.",
          ],
        },
        {
          heading: "Your rights",
          paragraphs: [
            "Because your reading data sits on your own device, you can read it, change it and delete it yourself at any moment, without asking us for anything.",
            "You can also write to us to ask what we hold, to have it corrected, or to have it deleted. California residents have these rights under the California Consumer Privacy Act, and we handle every request the same way, wherever the person writing lives.",
            "Write to info@chyrris.com. We reply within two business days, Monday through Friday.",
            "You can use the whole application without Nevin. If you never open the assistant, nothing you write leaves your device.",
          ],
        },
        {
          heading: "Children",
          paragraphs: [
            "Tzotzil Bible is made for general and family use, and its content is suitable for any age. We do not knowingly collect personal information from children under 13. Since the application asks no one for personal information, there is very little a child could disclose; if you believe a child has sent us something by email, write to info@chyrris.com and we will delete it.",
          ],
        },
        {
          heading: "Changes",
          paragraphs: [
            "If this policy changes we update the date at the top of this page and describe what changed. Significant changes are also shown inside the application rather than made quietly.",
          ],
        },
        {
          heading: "Contact",
          paragraphs: [
            "Chyrris Technologies LLC (California LLC No. B20260351587), Fairfield, California.",
            "Privacy and legal correspondence: info@chyrris.com. Questions about using the application: support@chyrris.com.",
          ],
        },
      ],
    },
    es: {
      title: "Política de Privacidad",
      updated: "2 de agosto de 2026",
      intro:
        "Esta política explica qué recopila la aplicación Tzotzil Bible, para qué lo recopila y qué puede pedirnos que hagamos con ello. Cubre la aplicación web en https://bible.chyrris.com y las versiones para iOS y Android. La publica Chyrris Technologies LLC (California LLC No. B20260351587), Fairfield, California. La política del sitio chyrris.com es aparte y está en chyrris.com/privacy.",
      sections: [
        {
          heading: "Cómo está construida la aplicación",
          paragraphs: [
            "Tzotzil Bible guarda su material en su dispositivo. El texto completo de cada versión bíblica que trae se almacena localmente, y también todo lo que usted produce al leer: marcadores, notas, favoritos, avance en los planes de lectura y preferencias. Nada de eso se sube a nosotros.",
            "Una función se comporta distinto. Nevin, el asistente, necesita un servidor para responder, así que la pregunta que usted escribe sale del dispositivo y la respuesta regresa. Nevin es lo único que manda fuera del dispositivo algo de lo que usted escribe. Además de él, la aplicación envía reportes de error anónimos y conteos agregados de qué funciones se usan, ambos descritos más abajo; ninguno lo identifica.",
            "La aplicación no tiene cuentas. No pide registro, no guardamos contraseñas y no se cobra nada dentro de ella.",
          ],
        },
        {
          heading: "Qué información recopilamos",
          paragraphs: [
            "Hay poco que recopilar, y casi todo lo que la aplicación registra nunca sale del dispositivo.",
          ],
          bullets: [
            "Sólo en su dispositivo: sus preferencias, como el tamaño de letra y la versión que prefiere, sus marcadores, notas y favoritos, su avance en los planes de lectura y su historial de conversación con Nevin.",
            "Lo que se envía al usar Nevin: la pregunta que escribe y la parte del intercambio en curso que hace falta para que la respuesta tenga sentido.",
            "Información técnica: modelo del dispositivo, versión del sistema operativo, versión de la aplicación y reportes anónimos que se generan cuando la aplicación falla.",
            "Conteos agregados de qué funciones se usan. No están asociados a una persona ni permiten llegar a ella.",
            "Lo que usted decida escribir en un correo si nos contacta para pedir ayuda.",
          ],
        },
        {
          heading: "Para qué la usamos",
          bullets: [
            "Para mostrarle el texto que pidió y devolverle su lugar, sus notas y su avance la próxima vez que abra la aplicación.",
            "Para responder las preguntas que le hace a Nevin.",
            "Para detectar y corregir fallas, que es lo único para lo que sirven los reportes de error.",
            "Para decidir qué construir después, que es lo único para lo que sirven los conteos agregados.",
            "Para contestarle cuando escribe a soporte.",
          ],
        },
        {
          heading: "Qué no hacemos",
          bullets: [
            "No vendemos ni alquilamos información personal.",
            "No mostramos publicidad en la aplicación ni compartimos nada con anunciantes.",
            "No pedimos su nombre, su domicilio, sus contactos, sus fotos ni su ubicación.",
            "No usamos sus preguntas a Nevin para entrenar modelos de inteligencia artificial, y el proveedor que las procesa tampoco las usa para entrenar.",
            "No conservamos sus conversaciones con Nevin en nuestros servidores una vez entregada la respuesta.",
          ],
        },
        {
          heading: "A dónde va la información",
          paragraphs: [
            "Una pregunta dirigida a Nevin viaja por una conexión cifrada (HTTPS) hasta Anthropic, cuyos modelos Claude generan la respuesta. Anthropic procesa la pregunta siguiendo nuestras instrucciones, sólo para responder, y no la usa para entrenar sus modelos. Anthropic publica sus propios términos para ese servicio.",
            "La versión web se sirve desde nuestro proveedor de alojamiento, que conserva registros de servidor corrientes, con dirección IP e identificador del navegador. Esos registros existen para mantener el servicio en pie y para contener el abuso.",
            "Las versiones para iOS y Android se distribuyen por la App Store y Google Play. La instalación, las actualizaciones y cualquier cuenta de tienda corren por cuenta de Apple y Google, bajo sus propias políticas. De ellos no recibimos información que lo identifique.",
            "No usamos analítica de terceros, software publicitario ni grabación de sesión dentro de la aplicación.",
          ],
        },
        {
          heading: "Almacenamiento y seguridad",
          bullets: [
            "Lo que la aplicación guarda en su dispositivo queda en el almacenamiento protegido que el sistema operativo reserva para cada aplicación.",
            "Todo el tráfico entre la aplicación y nuestros servidores va por conexiones cifradas.",
            "No guardamos contraseñas ni información financiera, porque no hay cuentas ni cobros.",
            "Aplicamos las prácticas de seguridad habituales en una aplicación de este tipo. Ningún sistema está libre de fallar, y no afirmamos lo contrario.",
          ],
        },
        {
          heading: "Cuánto tiempo la conservamos",
          bullets: [
            "Los datos de su dispositivo se quedan ahí hasta que usted los borre o desinstale la aplicación. Al desinstalarla se eliminan todos.",
            "Puede borrar su historial de conversación con Nevin cuando quiera, desde los ajustes de la aplicación.",
            "Una pregunta enviada a Nevin se procesa durante ese intercambio y después no la conservamos.",
            "Los reportes de error y los conteos agregados se guardan sólo mientras sirven para diagnosticar una falla o planear el trabajo.",
          ],
        },
        {
          heading: "Sus derechos",
          paragraphs: [
            "Como sus datos de lectura están en su propio dispositivo, puede consultarlos, cambiarlos y borrarlos usted mismo en cualquier momento, sin pedirnos nada.",
            "También puede escribirnos para preguntar qué tenemos, pedir una corrección o pedir que lo borremos. Los residentes de California tienen estos derechos bajo la California Consumer Privacy Act, y atendemos todas las solicitudes igual, viva donde viva quien escribe.",
            "Escriba a info@chyrris.com. Respondemos en un plazo de dos días hábiles, de lunes a viernes.",
            "Puede usar toda la aplicación sin Nevin. Si nunca abre el asistente, nada de lo que usted escribe sale de su dispositivo.",
          ],
        },
        {
          heading: "Menores",
          paragraphs: [
            "Tzotzil Bible está pensada para uso general y familiar, y su contenido es apropiado para cualquier edad. No recopilamos a sabiendas información personal de menores de 13 años. Como la aplicación no le pide datos personales a nadie, hay muy poco que un menor pudiera revelar; si cree que un menor nos envió algo por correo, escriba a info@chyrris.com y lo borramos.",
          ],
        },
        {
          heading: "Cambios",
          paragraphs: [
            "Si esta política cambia, actualizamos la fecha al inicio de la página y describimos qué cambió. Los cambios importantes también se avisan dentro de la aplicación, no se hacen en silencio.",
          ],
        },
        {
          heading: "Contacto",
          paragraphs: [
            "Chyrris Technologies LLC (California LLC No. B20260351587), Fairfield, California.",
            "Correspondencia de privacidad y legal: info@chyrris.com. Dudas sobre el uso de la aplicación: support@chyrris.com.",
          ],
        },
      ],
    },
  },
};
