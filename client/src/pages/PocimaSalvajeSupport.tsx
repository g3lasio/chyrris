import { motion } from "framer-motion";
import { Link } from "wouter";
import { useLanguage } from "../hooks/useLanguage";
import { ParticleBackground } from "../components/ParticleBackground";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { Footer } from "../sections/Footer";

export default function PocimaSalvajeSupport() {
  const { currentLanguage } = useLanguage();
  
  const content = {
    title: currentLanguage === 'en' ? 'Support & Help' : 'Soporte y Ayuda',
    subtitle: currentLanguage === 'en' ? 'Pócima Salvaje Application' : 'Aplicación Pócima Salvaje',
    introduction: currentLanguage === 'en' 
      ? 'Welcome to the Pócima Salvaje support center. Here you\'ll find answers to common questions and ways to get help with the app.'
      : 'Bienvenido al centro de soporte de Pócima Salvaje. Aquí encontrará respuestas a preguntas comunes y formas de obtener ayuda con la aplicación.',
    sections: [
      {
        title: currentLanguage === 'en' ? 'Frequently Asked Questions' : 'Preguntas Frecuentes',
        icon: '❓',
        items: [
          {
            question: currentLanguage === 'en' ? 'What is Pócima Salvaje?' : '¿Qué es Pócima Salvaje?',
            answer: currentLanguage === 'en'
              ? 'Pócima Salvaje is a mobile application that provides educational information about medicinal plants, natural remedies, and health conditions. It includes a comprehensive database of 693 medicinal plants and 482 health conditions, along with an AI-powered virtual assistant (MolDoctor) for educational health consultations.'
              : 'Pócima Salvaje es una aplicación móvil que proporciona información educativa sobre plantas medicinales, remedios naturales y condiciones de salud. Incluye una base de datos completa de 693 plantas medicinales y 482 condiciones de salud, junto con un asistente virtual impulsado por IA (MolDoctor) para consultas educativas de salud.'
          },
          {
            question: currentLanguage === 'en' ? 'Is Pócima Salvaje free?' : '¿Pócima Salvaje es gratuita?',
            answer: currentLanguage === 'en'
              ? 'Yes, Pócima Salvaje is free to download and use. All features, including the medicinal plants database and MolDoctor AI assistant, are available at no cost.'
              : 'Sí, Pócima Salvaje es gratuita para descargar y usar. Todas las funciones, incluyendo la base de datos de plantas medicinales y el asistente MolDoctor AI, están disponibles sin costo.'
          },
          {
            question: currentLanguage === 'en' ? 'Can MolDoctor diagnose medical conditions?' : '¿Puede MolDoctor diagnosticar condiciones médicas?',
            answer: currentLanguage === 'en'
              ? 'No. MolDoctor is an AI-powered educational tool designed to provide general information about health and natural medicine. It cannot and should not be used to diagnose medical conditions, prescribe treatments, or replace professional medical advice. Always consult a qualified healthcare professional for medical concerns.'
              : 'No. MolDoctor es una herramienta educativa impulsada por IA diseñada para proporcionar información general sobre salud y medicina natural. No puede y no debe usarse para diagnosticar condiciones médicas, prescribir tratamientos o reemplazar el consejo médico profesional. Siempre consulte a un profesional de salud calificado para preocupaciones médicas.'
          },
          {
            question: currentLanguage === 'en' ? 'Does the app work offline?' : '¿La aplicación funciona sin conexión?',
            answer: currentLanguage === 'en'
              ? 'Partially. The medicinal plants database and health conditions information are stored locally on your device and work offline. However, the MolDoctor AI assistant requires an internet connection to function, as it processes queries through cloud-based AI services.'
              : 'Parcialmente. La base de datos de plantas medicinales y la información de condiciones de salud se almacenan localmente en su dispositivo y funcionan sin conexión. Sin embargo, el asistente MolDoctor AI requiere una conexión a internet para funcionar, ya que procesa consultas a través de servicios de IA en la nube.'
          },
          {
            question: currentLanguage === 'en' ? 'Is my data private and secure?' : '¿Mis datos son privados y seguros?',
            answer: currentLanguage === 'en'
              ? 'Yes. Most of your data (favorites, search history, conversation history) is stored locally on your device. When you use MolDoctor, your queries are sent securely (HTTPS) to AI services for processing, but we do not permanently store your conversations or images on external servers. See our Privacy Policy for complete details.'
              : 'Sí. La mayoría de sus datos (favoritos, historial de búsqueda, historial de conversaciones) se almacenan localmente en su dispositivo. Cuando usa MolDoctor, sus consultas se envían de forma segura (HTTPS) a servicios de IA para procesamiento, pero no almacenamos permanentemente sus conversaciones o imágenes en servidores externos. Consulte nuestra Política de Privacidad para detalles completos.'
          },
          {
            question: currentLanguage === 'en' ? 'Can I use the app for children?' : '¿Puedo usar la aplicación para niños?',
            answer: currentLanguage === 'en'
              ? 'The app is designed for general educational use and contains information suitable for all ages. However, parental guidance is recommended for younger users. Always consult a pediatrician before using any natural remedies on children.'
              : 'La aplicación está diseñada para uso educativo general y contiene información adecuada para todas las edades. Sin embargo, se recomienda la supervisión de los padres para usuarios más jóvenes. Siempre consulte a un pediatra antes de usar cualquier remedio natural en niños.'
          },
          {
            question: currentLanguage === 'en' ? 'How do I delete my data?' : '¿Cómo elimino mis datos?',
            answer: currentLanguage === 'en'
              ? 'You can delete your conversation history, favorites, and search history from the Settings section within the app. To completely remove all data, simply uninstall the app from your device.'
              : 'Puede eliminar su historial de conversaciones, favoritos e historial de búsquedas desde la sección de Configuración dentro de la aplicación. Para eliminar completamente todos los datos, simplemente desinstale la aplicación de su dispositivo.'
          },
          {
            question: currentLanguage === 'en' ? 'Which platforms is the app available on?' : '¿En qué plataformas está disponible la aplicación?',
            answer: currentLanguage === 'en'
              ? 'Pócima Salvaje is available for iOS (iPhone and iPad) on the App Store and for Android devices on Google Play Store.'
              : 'Pócima Salvaje está disponible para iOS (iPhone y iPad) en el App Store y para dispositivos Android en Google Play Store.'
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
              ? 'Try these steps:\n1. Force close the app and restart it\n2. Restart your device\n3. Check for app updates in the App Store or Google Play\n4. Ensure you have enough storage space on your device\n5. If the problem persists, contact us with details about your device model and operating system version.'
              : 'Pruebe estos pasos:\n1. Cierre forzosamente la aplicación y reiníciela\n2. Reinicie su dispositivo\n3. Busque actualizaciones de la aplicación en App Store o Google Play\n4. Asegúrese de tener suficiente espacio de almacenamiento en su dispositivo\n5. Si el problema persiste, contáctenos con detalles sobre el modelo de su dispositivo y la versión del sistema operativo.'
          },
          {
            question: currentLanguage === 'en' ? 'MolDoctor is not responding' : 'MolDoctor no responde',
            answer: currentLanguage === 'en'
              ? 'Check the following:\n1. Ensure you have an active internet connection\n2. Try switching between Wi-Fi and mobile data\n3. Wait a few moments and try again (AI processing may take time)\n4. If the issue continues, the AI service may be temporarily unavailable. Please try again later.'
              : 'Verifique lo siguiente:\n1. Asegúrese de tener una conexión a internet activa\n2. Intente cambiar entre Wi-Fi y datos móviles\n3. Espere unos momentos e intente nuevamente (el procesamiento de IA puede tomar tiempo)\n4. Si el problema continúa, el servicio de IA puede estar temporalmente no disponible. Por favor intente más tarde.'
          },
          {
            question: currentLanguage === 'en' ? 'Image analysis is not working' : 'El análisis de imágenes no funciona',
            answer: currentLanguage === 'en'
              ? 'Ensure that:\n1. You have granted camera and photo library permissions to the app\n2. The image is clear and well-lit\n3. You have an active internet connection\n4. The image file size is not too large (max 10MB recommended)\n5. Try taking a new photo or selecting a different image'
              : 'Asegúrese de que:\n1. Ha otorgado permisos de cámara y biblioteca de fotos a la aplicación\n2. La imagen es clara y está bien iluminada\n3. Tiene una conexión a internet activa\n4. El tamaño del archivo de imagen no es demasiado grande (máximo 10MB recomendado)\n5. Intente tomar una nueva foto o seleccionar una imagen diferente'
          },
          {
            question: currentLanguage === 'en' ? 'Search is not finding results' : 'La búsqueda no encuentra resultados',
            answer: currentLanguage === 'en'
              ? 'Try these tips:\n1. Check your spelling\n2. Use simpler or more general search terms\n3. Try alternative names for plants (many have regional variations)\n4. Browse by category instead of searching\n5. The app includes 693 plants and 482 conditions - if you can\'t find something, it may not be in our database yet'
              : 'Pruebe estos consejos:\n1. Verifique su ortografía\n2. Use términos de búsqueda más simples o generales\n3. Intente nombres alternativos para plantas (muchas tienen variaciones regionales)\n4. Navegue por categoría en lugar de buscar\n5. La aplicación incluye 693 plantas y 482 condiciones - si no puede encontrar algo, puede que aún no esté en nuestra base de datos'
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
              ? 'You can reach us through:\n\nEmail: info@chyrris.com\nWebsite: https://chyrris.com\n\nWe typically respond within 48 hours during business days (Monday-Friday).\n\nWhen contacting us, please include:\n• Your device model and operating system version\n• A description of the issue\n• Steps to reproduce the problem (if applicable)\n• Screenshots (if relevant)'
              : 'Puede contactarnos a través de:\n\nEmail: info@chyrris.com\nSitio web: https://chyrris.com\n\nGeneralmente respondemos dentro de 48 horas durante días hábiles (lunes a viernes).\n\nAl contactarnos, por favor incluya:\n• El modelo de su dispositivo y versión del sistema operativo\n• Una descripción del problema\n• Pasos para reproducir el problema (si aplica)\n• Capturas de pantalla (si es relevante)'
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
              ? 'We love hearing from our users! Send your feature requests and suggestions to info@chyrris.com. We review all feedback and consider it for future updates.\n\nSome ideas we\'re already considering:\n• User health profiles\n• Symptom tracking\n• Remedy preparation videos\n• Community features\n• More languages'
              : 'Nos encanta escuchar a nuestros usuarios. Envíe sus solicitudes de funciones y sugerencias a info@chyrris.com. Revisamos todos los comentarios y los consideramos para futuras actualizaciones.\n\nAlgunas ideas que ya estamos considerando:\n• Perfiles de salud del usuario\n• Seguimiento de síntomas\n• Videos de preparación de remedios\n• Funciones de comunidad\n• Más idiomas'
          },
          {
            question: currentLanguage === 'en' ? 'Can I contribute plant information?' : '¿Puedo contribuir con información de plantas?',
            answer: currentLanguage === 'en'
              ? 'We appreciate your interest in contributing! If you have expertise in herbal medicine or traditional remedies and would like to help improve our database, please contact us at info@chyrris.com with your credentials and area of expertise.'
              : 'Apreciamos su interés en contribuir. Si tiene experiencia en medicina herbal o remedios tradicionales y le gustaría ayudar a mejorar nuestra base de datos, por favor contáctenos en info@chyrris.com con sus credenciales y área de experiencia.'
          }
        ]
      },
      {
        title: currentLanguage === 'en' ? 'Legal & Privacy' : 'Legal y Privacidad',
        icon: '📄',
        items: [
          {
            question: currentLanguage === 'en' ? 'Where can I find legal information?' : '¿Dónde puedo encontrar información legal?',
            answer: currentLanguage === 'en'
              ? 'You can review our legal documents at:\n\n• Privacy Policy: https://chyrris.com/pocima-salvaje/privacy\n• Terms of Service: https://chyrris.com/pocima-salvaje/terms\n\nThese documents explain how we collect, use, and protect your data, as well as your rights and responsibilities when using the app.'
              : 'Puede revisar nuestros documentos legales en:\n\n• Política de Privacidad: https://chyrris.com/pocima-salvaje/privacy\n• Términos de Servicio: https://chyrris.com/pocima-salvaje/terms\n\nEstos documentos explican cómo recopilamos, usamos y protegemos sus datos, así como sus derechos y responsabilidades al usar la aplicación.'
          }
        ]
      }
    ],
    backToHome: currentLanguage === 'en' ? 'Back to Home' : 'Volver al Inicio',
    needMoreHelp: currentLanguage === 'en' ? 'Need more help?' : '¿Necesita más ayuda?',
    contactMessage: currentLanguage === 'en' 
      ? 'If you couldn\'t find the answer you were looking for, please don\'t hesitate to contact us at info@chyrris.com. We\'re here to help!'
      : 'Si no pudo encontrar la respuesta que buscaba, no dude en contactarnos en info@chyrris.com. ¡Estamos aquí para ayudar!'
  };

  return (
    <main className="min-h-screen relative overflow-x-hidden bg-[#0a0d12]">
      <ParticleBackground />
      
      {/* Clean navbar */}
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
                <span>{content.backToHome}</span>
              </div>
            </Link>
            
            <div className="flex items-center gap-4">
              <LanguageSwitcher variant="minimal" />
              <img 
                src="/attached_assets/pocima-salvaje-logo.png" 
                alt="Pócima Salvaje" 
                className="h-10 w-10 rounded-lg"
              />
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Content */}
      <div className="container mx-auto px-6 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[#4cc4ff] mb-4">
              {content.title}
            </h1>
            <p className="text-xl text-[#35ffdd]">{content.subtitle}</p>
            <p className="text-gray-400 mt-4">{content.introduction}</p>
          </div>

          {/* Sections */}
          {content.sections.map((section, sectionIndex) => (
            <motion.div
              key={sectionIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl">{section.icon}</span>
                <h2 className="text-3xl font-bold text-[#4cc4ff]">
                  {section.title}
                </h2>
              </div>

              <div className="space-y-4">
                {section.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="bg-[#0f1419]/60 backdrop-blur-sm border border-[#4cc4ff]/20 rounded-2xl p-6 hover:border-[#4cc4ff]/40 transition-colors"
                  >
                    <h3 className="text-xl font-semibold text-[#35ffdd] mb-3">
                      {item.question}
                    </h3>
                    <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-gradient-to-r from-[#4cc4ff]/20 to-[#35ffdd]/20 border border-[#4cc4ff]/40 rounded-2xl p-8 text-center"
          >
            <h3 className="text-2xl font-bold text-[#4cc4ff] mb-4">
              {content.needMoreHelp}
            </h3>
            <p className="text-gray-300 mb-6">
              {content.contactMessage}
            </p>
            <a
              href="mailto:info@chyrris.com"
              className="inline-block bg-[#4cc4ff] text-[#0a0d12] px-8 py-3 rounded-lg font-semibold hover:bg-[#35ffdd] transition-colors"
            >
              info@chyrris.com
            </a>
          </motion.div>

          {/* Footer note */}
          <div className="text-center mt-12 text-gray-400">
            <p>© 2026 Chyrris Technologies. All rights reserved.</p>
          </div>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
