import { motion } from "framer-motion";
import { Link } from "wouter";
import { useLanguage } from "../hooks/useLanguage";
import { ParticleBackground } from "../components/ParticleBackground";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { Footer } from "../sections/Footer";
import chyrrisBrandLogo from "@/assets/chyrris-brand-lockup.webp";

export default function TzotzilBibleSupport() {
  const { currentLanguage } = useLanguage();
  
  const content = {
    title: currentLanguage === 'en' ? 'Support & Help' : 'Soporte y Ayuda',
    subtitle: currentLanguage === 'en' ? 'Tzotzil Bible Application' : 'Aplicación Tzotzil Bible',
    introduction: currentLanguage === 'en' 
      ? 'Welcome to the Tzotzil Bible support center. Here you\'ll find answers to common questions and ways to get help with the app.'
      : 'Bienvenido al centro de soporte de Tzotzil Bible. Aquí encontrará respuestas a preguntas comunes y formas de obtener ayuda con la aplicación.',
    backToHome: currentLanguage === 'en' ? 'Back to Home' : 'Volver al Inicio',
    sections: [
      {
        title: currentLanguage === 'en' ? 'Frequently Asked Questions' : 'Preguntas Frecuentes',
        icon: '❓',
        items: [
          {
            question: currentLanguage === 'en' ? 'What is Tzotzil Bible?' : '¿Qué es Tzotzil Bible?',
            answer: currentLanguage === 'en'
              ? 'Tzotzil Bible is a mobile and web application that provides the complete Bible in Spanish and Tzotzil dialect. It includes multiple Spanish versions (RV1960, NVI, TLA, DHH), structured reading plans, and Nevin - an AI-powered spiritual assistant trained exclusively on biblical teachings and Ellen G. White\'s writings.'
              : 'Tzotzil Bible es una aplicación móvil y web que proporciona la Biblia completa en español y dialecto tzotzil. Incluye múltiples versiones en español (RV1960, NVI, TLA, DHH), planes de lectura estructurados y Nevin - un asistente espiritual impulsado por IA entrenado exclusivamente en enseñanzas bíblicas y los escritos de Ellen G. White.'
          },
          {
            question: currentLanguage === 'en' ? 'Is Tzotzil Bible free?' : '¿Tzotzil Bible es gratuita?',
            answer: currentLanguage === 'en'
              ? 'Yes, Tzotzil Bible is completely free to download and use. All features, including all Bible versions, reading plans, and the Nevin AI assistant, are available at no cost.'
              : 'Sí, Tzotzil Bible es completamente gratuita para descargar y usar. Todas las funciones, incluyendo todas las versiones de la Biblia, planes de lectura y el asistente Nevin AI, están disponibles sin costo.'
          },
          {
            question: currentLanguage === 'en' ? 'What is Nevin AI?' : '¿Qué es Nevin AI?',
            answer: currentLanguage === 'en'
              ? 'Nevin is an AI-powered spiritual companion trained exclusively on biblical teachings and Ellen G. White\'s writings. Nevin provides contextual answers to spiritual questions, references scripture passages, and offers guidance grounded in biblical principles. Nevin cannot and should not replace personal Bible study, prayer, or pastoral guidance.'
              : 'Nevin es un compañero espiritual impulsado por IA entrenado exclusivamente en enseñanzas bíblicas y los escritos de Ellen G. White. Nevin proporciona respuestas contextuales a preguntas espirituales, referencias de pasajes de las escrituras y ofrece orientación basada en principios bíblicos. Nevin no puede ni debe reemplazar el estudio personal de la Biblia, la oración o la orientación pastoral.'
          },
          {
            question: currentLanguage === 'en' ? 'Does the app work offline?' : '¿La aplicación funciona sin conexión?',
            answer: currentLanguage === 'en'
              ? 'Yes. The entire Bible in all available versions is stored locally on your device and works completely offline. However, the Nevin AI assistant requires an internet connection to function, as it processes queries through cloud-based AI services.'
              : 'Sí. La Biblia completa en todas las versiones disponibles se almacena localmente en su dispositivo y funciona completamente sin conexión. Sin embargo, el asistente Nevin AI requiere una conexión a internet para funcionar, ya que procesa consultas a través de servicios de IA en la nube.'
          },
          {
            question: currentLanguage === 'en' ? 'What are Reading Plans?' : '¿Qué son los Planes de Lectura?',
            answer: currentLanguage === 'en'
              ? 'Reading Plans are structured 1-year programs to help you read the entire Bible systematically. We offer three plans:\n\n• Canonical Plan: Read the Bible in traditional book order\n• Chronological Plan: Read events in the order they occurred historically\n• Historical Plan: Read books in the order they were written\n\nEach plan includes daily readings, progress tracking, and optional daily reminders.'
              : 'Los Planes de Lectura son programas estructurados de 1 año para ayudarte a leer toda la Biblia sistemáticamente. Ofrecemos tres planes:\n\n• Plan Canónico: Lee la Biblia en el orden tradicional de libros\n• Plan Cronológico: Lee los eventos en el orden en que ocurrieron históricamente\n• Plan Histórico: Lee los libros en el orden en que fueron escritos\n\nCada plan incluye lecturas diarias, seguimiento de progreso y recordatorios diarios opcionales.'
          },
          {
            question: currentLanguage === 'en' ? 'Is my data private and secure?' : '¿Mis datos son privados y seguros?',
            answer: currentLanguage === 'en'
              ? 'Yes. All your data (bookmarks, notes, reading progress, favorites) is stored locally on your device. When you use Nevin, your queries are sent securely (HTTPS) to AI services for processing, but we do not permanently store your conversations on external servers. See our Privacy Policy for complete details.'
              : 'Sí. Todos sus datos (marcadores, notas, progreso de lectura, favoritos) se almacenan localmente en su dispositivo. Cuando usa Nevin, sus consultas se envían de forma segura (HTTPS) a servicios de IA para procesamiento, pero no almacenamos permanentemente sus conversaciones en servidores externos. Consulte nuestra Política de Privacidad para detalles completos.'
          },
          {
            question: currentLanguage === 'en' ? 'How do I change Bible versions?' : '¿Cómo cambio las versiones de la Biblia?',
            answer: currentLanguage === 'en'
              ? 'You can switch between Bible versions at any time from the reading screen. Simply tap the version selector at the top of the screen and choose from:\n• Tzotzil (indigenous dialect)\n• RV1960 (Reina-Valera 1960)\n• NVI (Nueva Versión Internacional)\n• TLA (Traducción en Lenguaje Actual)\n• DHH (Dios Habla Hoy)\n\nYou can also compare versions side-by-side for deeper study.'
              : 'Puede cambiar entre versiones de la Biblia en cualquier momento desde la pantalla de lectura. Simplemente toque el selector de versión en la parte superior de la pantalla y elija entre:\n• Tzotzil (dialecto indígena)\n• RV1960 (Reina-Valera 1960)\n• NVI (Nueva Versión Internacional)\n• TLA (Traducción en Lenguaje Actual)\n• DHH (Dios Habla Hoy)\n\nTambién puede comparar versiones lado a lado para un estudio más profundo.'
          },
          {
            question: currentLanguage === 'en' ? 'Which platforms is the app available on?' : '¿En qué plataformas está disponible la aplicación?',
            answer: currentLanguage === 'en'
              ? 'Tzotzil Bible is available as:\n• Web app: https://bible.chyrris.com (works on any browser)\n• iOS app: Available on the App Store for iPhone and iPad\n• Android app: Available on Google Play Store\n\nAll versions sync your reading progress and preferences across devices when using the same account.'
              : 'Tzotzil Bible está disponible como:\n• Aplicación web: https://bible.chyrris.com (funciona en cualquier navegador)\n• Aplicación iOS: Disponible en App Store para iPhone y iPad\n• Aplicación Android: Disponible en Google Play Store\n\nTodas las versiones sincronizan su progreso de lectura y preferencias entre dispositivos cuando usa la misma cuenta.'
          }
        ]
      },
      {
        title: currentLanguage === 'en' ? 'Technical Support' : 'Soporte Técnico',
        icon: '🔧',
        items: [
          {
            question: currentLanguage === 'en' ? 'The app crashes or freezes' : 'La aplicación se cierra o se congela',
            answer: currentLanguage === 'en'
              ? 'Try these steps:\n1. Force close the app and restart it\n2. Restart your device\n3. Check for app updates in the App Store or Google Play\n4. Clear the app cache from Settings\n5. Ensure you have enough storage space (at least 500MB free)\n6. If the problem persists, contact us with details about your device model and operating system version.'
              : 'Pruebe estos pasos:\n1. Cierre forzosamente la aplicación y reiníciela\n2. Reinicie su dispositivo\n3. Busque actualizaciones de la aplicación en App Store o Google Play\n4. Limpie el caché de la aplicación desde Configuración\n5. Asegúrese de tener suficiente espacio de almacenamiento (al menos 500MB libres)\n6. Si el problema persiste, contáctenos con detalles sobre el modelo de su dispositivo y la versión del sistema operativo.'
          },
          {
            question: currentLanguage === 'en' ? 'Nevin is not responding' : 'Nevin no responde',
            answer: currentLanguage === 'en'
              ? 'Check the following:\n1. Ensure you have an active internet connection\n2. Try switching between Wi-Fi and mobile data\n3. Wait a few moments and try again (AI processing may take 10-30 seconds)\n4. Check if you\'ve reached the daily query limit (if applicable)\n5. If the issue continues, the AI service may be temporarily unavailable. Please try again later.'
              : 'Verifique lo siguiente:\n1. Asegúrese de tener una conexión a internet activa\n2. Intente cambiar entre Wi-Fi y datos móviles\n3. Espere unos momentos e intente nuevamente (el procesamiento de IA puede tomar 10-30 segundos)\n4. Verifique si ha alcanzado el límite diario de consultas (si aplica)\n5. Si el problema continúa, el servicio de IA puede estar temporalmente no disponible. Por favor intente más tarde.'
          },
          {
            question: currentLanguage === 'en' ? 'Search is not finding verses' : 'La búsqueda no encuentra versículos',
            answer: currentLanguage === 'en'
              ? 'Try these tips:\n1. Check your spelling\n2. Use keywords from the verse rather than exact phrases\n3. Try searching in different Bible versions\n4. Use the book/chapter/verse reference directly (e.g., "Juan 3:16")\n5. Browse by book and chapter if you know the approximate location\n6. Contact us if you believe a verse is missing or incorrectly indexed'
              : 'Pruebe estos consejos:\n1. Verifique su ortografía\n2. Use palabras clave del versículo en lugar de frases exactas\n3. Intente buscar en diferentes versiones de la Biblia\n4. Use la referencia libro/capítulo/versículo directamente (ej. "Juan 3:16")\n5. Navegue por libro y capítulo si conoce la ubicación aproximada\n6. Contáctenos si cree que falta un versículo o está indexado incorrectamente'
          },
          {
            question: currentLanguage === 'en' ? 'Reading plan progress is not saving' : 'El progreso del plan de lectura no se guarda',
            answer: currentLanguage === 'en'
              ? 'Ensure that:\n1. You have sufficient storage space on your device\n2. You\'re not using the app in "private" or "incognito" mode (web version)\n3. You\'re logged in to your account (if using sync features)\n4. The app has permission to store data locally\n5. Try manually marking readings as complete and check if they persist after restarting the app\n6. If the issue continues, try resetting your reading plan and starting fresh'
              : 'Asegúrese de que:\n1. Tiene suficiente espacio de almacenamiento en su dispositivo\n2. No está usando la aplicación en modo "privado" o "incógnito" (versión web)\n3. Ha iniciado sesión en su cuenta (si usa funciones de sincronización)\n4. La aplicación tiene permiso para almacenar datos localmente\n5. Intente marcar lecturas como completadas manualmente y verifique si persisten después de reiniciar la aplicación\n6. Si el problema continúa, intente restablecer su plan de lectura y comenzar de nuevo'
          },
          {
            question: currentLanguage === 'en' ? 'Daily reminders are not working' : 'Los recordatorios diarios no funcionan',
            answer: currentLanguage === 'en'
              ? 'Check these settings:\n1. Ensure notifications are enabled for Tzotzil Bible in your device settings\n2. Verify that "Do Not Disturb" mode is not blocking notifications\n3. Check that you\'ve enabled daily reminders in the app Settings\n4. Confirm the reminder time is set correctly\n5. On iOS, ensure the app has "Allow Notifications" permission\n6. On Android, check that battery optimization is not preventing background notifications\n7. Try disabling and re-enabling reminders in the app'
              : 'Verifique estas configuraciones:\n1. Asegúrese de que las notificaciones estén habilitadas para Tzotzil Bible en la configuración de su dispositivo\n2. Verifique que el modo "No Molestar" no esté bloqueando las notificaciones\n3. Confirme que ha habilitado los recordatorios diarios en la Configuración de la aplicación\n4. Confirme que la hora del recordatorio esté configurada correctamente\n5. En iOS, asegúrese de que la aplicación tenga el permiso "Permitir Notificaciones"\n6. En Android, verifique que la optimización de batería no esté impidiendo las notificaciones en segundo plano\n7. Intente deshabilitar y volver a habilitar los recordatorios en la aplicación'
          }
        ]
      },
      {
        title: currentLanguage === 'en' ? 'Contact Us' : 'Contáctenos',
        icon: '📧',
        items: [
          {
            question: currentLanguage === 'en' ? 'How can I contact support?' : '¿Cómo puedo contactar al soporte?',
            answer: currentLanguage === 'en'
              ? 'You can reach us through:\n\nEmail: info@chyrris.com\nWebsite: https://chyrris.com\n\nWe typically respond within 48 hours during business days (Monday-Friday).\n\nWhen contacting us, please include:\n• Your device model and operating system version\n• App version (found in Settings)\n• A description of the issue\n• Steps to reproduce the problem (if applicable)\n• Screenshots (if relevant)'
              : 'Puede contactarnos a través de:\n\nEmail: info@chyrris.com\nSitio web: https://chyrris.com\n\nGeneralmente respondemos dentro de 48 horas durante días hábiles (lunes a viernes).\n\nAl contactarnos, por favor incluya:\n• El modelo de su dispositivo y versión del sistema operativo\n• Versión de la aplicación (encontrada en Configuración)\n• Una descripción del problema\n• Pasos para reproducir el problema (si aplica)\n• Capturas de pantalla (si es relevante)'
          }
        ]
      },
      {
        title: currentLanguage === 'en' ? 'Feedback & Feature Requests' : 'Comentarios y Solicitudes de Funciones',
        icon: '💡',
        items: [
          {
            question: currentLanguage === 'en' ? 'How can I suggest new features?' : '¿Cómo puedo sugerir nuevas funciones?',
            answer: currentLanguage === 'en'
              ? 'We love hearing from our users! Send your feature requests and suggestions to info@chyrris.com. We review all feedback and consider it for future updates.\n\nSome ideas we\'re already considering:\n• Audio Bible narration\n• Study notes and commentaries\n• Cross-references and concordance\n• Social sharing of verses\n• Prayer journal\n• More indigenous language translations'
              : 'Nos encanta escuchar a nuestros usuarios. Envíe sus solicitudes de funciones y sugerencias a info@chyrris.com. Revisamos todos los comentarios y los consideramos para futuras actualizaciones.\n\nAlgunas ideas que ya estamos considerando:\n• Narración de audio de la Biblia\n• Notas de estudio y comentarios\n• Referencias cruzadas y concordancia\n• Compartir versículos en redes sociales\n• Diario de oración\n• Más traducciones en idiomas indígenas'
          },
          {
            question: currentLanguage === 'en' ? 'Can I contribute to translations?' : '¿Puedo contribuir con traducciones?',
            answer: currentLanguage === 'en'
              ? 'We welcome contributions from native Tzotzil speakers and biblical scholars. If you notice translation errors or have suggestions for improving the Tzotzil translation, please contact us at info@chyrris.com with:\n\n• The specific verse reference\n• The current translation\n• Your suggested improvement\n• Your qualifications or background\n\nAll contributions are reviewed by our translation team before implementation.'
              : 'Damos la bienvenida a contribuciones de hablantes nativos de tzotzil y eruditos bíblicos. Si nota errores de traducción o tiene sugerencias para mejorar la traducción al tzotzil, contáctenos en info@chyrris.com con:\n\n• La referencia específica del versículo\n• La traducción actual\n• Su mejora sugerida\n• Sus calificaciones o antecedentes\n\nTodas las contribuciones son revisadas por nuestro equipo de traducción antes de la implementación.'
          },
          {
            question: currentLanguage === 'en' ? 'How can I support the project?' : '¿Cómo puedo apoyar el proyecto?',
            answer: currentLanguage === 'en'
              ? 'There are several ways to support Tzotzil Bible:\n\n• Share the app with friends and family in Tzotzil-speaking communities\n• Leave a positive review on the App Store or Google Play\n• Provide feedback and suggestions for improvements\n• Report bugs or translation errors\n• Contribute to translations if you\'re a native speaker\n• Pray for the project and its impact on indigenous communities\n\nYour support helps us continue providing free access to scripture in indigenous languages!'
              : 'Hay varias formas de apoyar Tzotzil Bible:\n\n• Comparta la aplicación con amigos y familiares en comunidades de habla tzotzil\n• Deje una reseña positiva en App Store o Google Play\n• Proporcione comentarios y sugerencias de mejoras\n• Reporte errores o errores de traducción\n• Contribuya con traducciones si es hablante nativo\n• Ore por el proyecto y su impacto en las comunidades indígenas\n\n¡Su apoyo nos ayuda a continuar proporcionando acceso gratuito a las escrituras en idiomas indígenas!'
          }
        ]
      }
    ]
  };

  return (
    <main className="min-h-screen relative overflow-x-hidden bg-[#0a0d12]">
      <ParticleBackground />
      
      {/* Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 w-full z-50 py-4 bg-[#0a0d12]/80 backdrop-blur-xl border-b border-[#4cc4ff]/10"
      >
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            <Link href="/">
              <div className="flex items-center gap-2 text-[#4cc4ff] hover:text-[#35ffdd] cursor-pointer transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                <span className="hidden sm:inline">{content.backToHome}</span>
              </div>
            </Link>
            
            <div className="flex items-center gap-4">
              <LanguageSwitcher variant="minimal" />
              <img 
                src={chyrrisBrandLogo} 
                alt="CHYRRIS TECHNOLOGIES" 
                className="h-8" 
              />
            </div>
          </div>
        </div>
      </motion.nav>
      
      {/* Content */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-[#f5b308] mb-4">{content.title}</h1>
              <p className="text-[#4cc4ff] text-xl font-rajdhani mb-4">{content.subtitle}</p>
              <p className="text-gray-400 font-rajdhani">{content.introduction}</p>
            </div>
            
            {/* Support Sections */}
            <div className="space-y-12">
              {content.sections.map((section, sectionIndex) => (
                <motion.div 
                  key={sectionIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
                  className="p-8 rounded-2xl bg-[#0f1419]/80 backdrop-blur-xl border border-[#4cc4ff]/10"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-4xl">{section.icon}</span>
                    <h2 className="text-2xl font-bold text-[#f5b308]">{section.title}</h2>
                  </div>
                  
                  <div className="space-y-6">
                    {section.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="border-l-2 border-[#4cc4ff]/30 pl-6 py-2">
                        <h3 className="text-white font-bold mb-2 text-lg">{item.question}</h3>
                        <p className="text-gray-400 font-rajdhani leading-relaxed whitespace-pre-line">{item.answer}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* CTA */}
            <div className="mt-12 text-center">
              <a 
                href="https://bible.chyrris.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#f5b308] to-[#e5a308] hover:opacity-90 text-[#0a0d12] font-bold rounded-xl text-lg uppercase tracking-wider transition-opacity"
              >
                {currentLanguage === 'en' ? 'Open App' : 'Abrir Aplicación'}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
