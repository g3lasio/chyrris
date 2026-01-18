import { motion } from "framer-motion";
import { Link } from "wouter";
import { useLanguage } from "../hooks/useLanguage";
import { ParticleBackground } from "../components/ParticleBackground";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { Footer } from "../sections/Footer";

export default function PocimaSalvajePrivacy() {
  const { currentLanguage } = useLanguage();
  
  const content = {
    title: currentLanguage === 'en' ? 'Privacy Policy' : 'Política de Privacidad',
    subtitle: currentLanguage === 'en' ? 'Pócima Salvaje Application' : 'Aplicación Pócima Salvaje',
    lastUpdated: currentLanguage === 'en' ? 'Last Updated' : 'Última Actualización',
    date: currentLanguage === 'en' ? 'January 17, 2026' : '17 de Enero, 2026',
    introduction: currentLanguage === 'en' 
      ? 'Pócima Salvaje ("we", "our application") is committed to protecting the privacy of our users. This Privacy Policy explains how we collect, use, store, and protect your information when you use our natural medicine and medicinal plants application.\n\nBy using Pócima Salvaje, you accept the practices described in this policy. We recommend reading this complete document to understand our commitment to your privacy.'
      : 'Pócima Salvaje ("nosotros", "nuestra aplicación") se compromete a proteger la privacidad de nuestros usuarios. Esta Política de Privacidad explica cómo recopilamos, usamos, almacenamos y protegemos su información cuando utiliza nuestra aplicación de medicina natural y plantas medicinales.\n\nAl utilizar Pócima Salvaje, usted acepta las prácticas descritas en esta política. Le recomendamos leer este documento completo para comprender nuestro compromiso con su privacidad.',
    sections: [
      {
        title: currentLanguage === 'en' ? '1. Introduction' : '1. Introducción',
        content: currentLanguage === 'en' 
          ? 'Pócima Salvaje is a mobile application developed by Chyrris Technologies that provides information about medicinal plants, natural remedies, and health conditions. The app includes an AI-powered virtual doctor (MolDoctor) that can analyze images and provide educational information about natural medicine.'
          : 'Pócima Salvaje es una aplicación móvil desarrollada por Chyrris Technologies que proporciona información sobre plantas medicinales, remedios naturales y condiciones de salud. La aplicación incluye un doctor virtual impulsado por IA (MolDoctor) que puede analizar imágenes y proporcionar información educativa sobre medicina natural.'
      },
      {
        title: currentLanguage === 'en' ? '2. Information We Collect' : '2. Información que Recopilamos',
        content: currentLanguage === 'en' 
          ? '2.1 Local Usage Data\nWe store locally on your device:\n• Application preferences and settings\n• Conversation history with MolDoctor AI\n• Favorites (saved plants and conditions)\n• Search history\n\n2.2 Data Processed by AI\nWhen you use the MolDoctor AI assistant:\n• Your questions and images are sent to external artificial intelligence services (Anthropic Claude) to generate responses.\n• Images sent for analysis may include medical documents, symptoms, or health-related photos.\n• We do not permanently store your conversations or images on external servers.\n• Queries are processed in real-time and are not used to train AI models.\n\n2.3 Technical Data\nWe may automatically collect:\n• Basic device information (model, operating system)\n• Anonymous error reports to improve stability\n• Aggregated usage statistics (without personal identification)'
          : '2.1 Datos de Uso Local\nAlmacenamos localmente en su dispositivo:\n• Preferencias y configuraciones de la aplicación\n• Historial de conversaciones con MolDoctor AI\n• Favoritos (plantas y condiciones guardadas)\n• Historial de búsquedas\n\n2.2 Datos Procesados por IA\nCuando utiliza el asistente MolDoctor AI:\n• Sus preguntas e imágenes son enviadas a servicios externos de inteligencia artificial (Anthropic Claude) para generar respuestas.\n• Las imágenes enviadas para análisis pueden incluir documentos médicos, síntomas o fotos relacionadas con la salud.\n• No almacenamos sus conversaciones o imágenes en servidores externos de forma permanente.\n• Las consultas se procesan en tiempo real y no se utilizan para entrenar modelos de IA.\n\n2.3 Datos Técnicos\nPodemos recopilar automáticamente:\n• Información básica del dispositivo (modelo, sistema operativo)\n• Reportes de errores anónimos para mejorar la estabilidad\n• Estadísticas agregadas de uso (sin identificación personal)'
      },
      {
        title: currentLanguage === 'en' ? '3. Use of Information' : '3. Uso de la Información',
        content: currentLanguage === 'en'
          ? 'We use the collected information to:\n• Provide and improve application functionality\n• Generate personalized health and wellness responses through MolDoctor AI\n• Analyze images for OCR (text extraction from medical documents)\n• Provide visual analysis of symptoms and health conditions\n• Save your preferences, favorites, and search history\n• Diagnose technical problems and improve stability\n• Develop new features'
          : 'Utilizamos la información recopilada para:\n• Proporcionar y mejorar la funcionalidad de la aplicación\n• Generar respuestas personalizadas de salud y bienestar a través de MolDoctor AI\n• Analizar imágenes para OCR (extracción de texto de documentos médicos)\n• Proporcionar análisis visual de síntomas y condiciones de salud\n• Guardar sus preferencias, favoritos e historial de búsquedas\n• Diagnosticar problemas técnicos y mejorar la estabilidad\n• Desarrollar nuevas funcionalidades'
      },
      {
        title: currentLanguage === 'en' ? '4. Medical Disclaimer' : '4. Aviso Médico',
        content: currentLanguage === 'en'
          ? 'IMPORTANT: Pócima Salvaje is designed for educational and informational purposes only. The information provided by the application and MolDoctor AI:\n\n• Does NOT constitute medical advice, diagnosis, or treatment\n• Should NOT replace consultation with qualified healthcare professionals\n• Is based on traditional knowledge and general information about medicinal plants\n• May not be suitable for all individuals or conditions\n\nAlways consult a licensed healthcare provider before starting any treatment or if you have concerns about your health.'
          : 'IMPORTANTE: Pócima Salvaje está diseñada únicamente con fines educativos e informativos. La información proporcionada por la aplicación y MolDoctor AI:\n\n• NO constituye consejo médico, diagnóstico o tratamiento\n• NO debe reemplazar la consulta con profesionales de salud calificados\n• Se basa en conocimiento tradicional e información general sobre plantas medicinales\n• Puede no ser adecuada para todos los individuos o condiciones\n\nSiempre consulte a un proveedor de salud autorizado antes de comenzar cualquier tratamiento o si tiene preocupaciones sobre su salud.'
      },
      {
        title: currentLanguage === 'en' ? '5. Sharing Information with Third Parties' : '5. Compartir Información con Terceros',
        content: currentLanguage === 'en'
          ? 'We share limited information with the following third parties:\n\nAnthropic (Claude AI): Queries and images sent to MolDoctor AI are processed by the Anthropic Claude API. Anthropic has its own privacy policy and does not use API queries to train its models.\n\nWe do not sell, rent, or share your personal information with third parties for marketing purposes.'
          : 'Compartimos información limitada con los siguientes terceros:\n\nAnthropic (Claude AI): Las consultas e imágenes enviadas a MolDoctor AI son procesadas por la API de Anthropic Claude. Anthropic tiene su propia política de privacidad y no utiliza las consultas de API para entrenar sus modelos.\n\nNo vendemos, alquilamos ni compartimos su información personal con terceros para fines de marketing.'
      },
      {
        title: currentLanguage === 'en' ? '6. Storage and Security' : '6. Almacenamiento y Seguridad',
        content: currentLanguage === 'en'
          ? '• Local data is stored securely in your device\'s internal storage.\n• We use encrypted connections (HTTPS) for all communications with external servers.\n• Images sent for analysis are transmitted securely and not stored permanently.\n• We do not store passwords or financial information.\n• We implement industry-standard security measures to protect your data during transmission.'
          : '• Los datos locales se almacenan de forma segura en el almacenamiento interno de su dispositivo.\n• Utilizamos conexiones cifradas (HTTPS) para todas las comunicaciones con servidores externos.\n• Las imágenes enviadas para análisis se transmiten de forma segura y no se almacenan permanentemente.\n• No almacenamos contraseñas ni información financiera.\n• Implementamos medidas de seguridad estándar de la industria para proteger sus datos durante la transmisión.'
      },
      {
        title: currentLanguage === 'en' ? '7. Data Retention' : '7. Retención de Datos',
        content: currentLanguage === 'en'
          ? '• Local data remains on your device until you uninstall the application or manually delete it.\n• You can delete your conversation history with MolDoctor from the Settings section.\n• You can clear your favorites and search history at any time.\n• Session data with AI services is not retained beyond the active session.'
          : '• Los datos locales permanecen en su dispositivo hasta que desinstale la aplicación o los elimine manualmente.\n• Puede eliminar su historial de conversaciones con MolDoctor desde la sección de Configuración.\n• Puede borrar sus favoritos e historial de búsquedas en cualquier momento.\n• Los datos de sesión con servicios de IA no se retienen más allá de la sesión activa.'
      },
      {
        title: currentLanguage === 'en' ? '8. Your Rights' : '8. Sus Derechos',
        content: currentLanguage === 'en'
          ? 'You have the right to:\n• Access the data stored locally on your device\n• Delete your conversation history with MolDoctor\n• Clear your favorites and search history\n• Uninstall the application to delete all local data\n• Contact us to request information about your data\n• Use the application without the AI feature if you prefer'
          : 'Usted tiene derecho a:\n• Acceder a los datos almacenados localmente en su dispositivo\n• Eliminar su historial de conversaciones con MolDoctor\n• Borrar sus favoritos e historial de búsquedas\n• Desinstalar la aplicación para eliminar todos los datos locales\n• Contactarnos para solicitar información sobre sus datos\n• Usar la aplicación sin la función de IA si lo prefiere'
      },
      {
        title: currentLanguage === 'en' ? '9. Minors' : '9. Menores de Edad',
        content: currentLanguage === 'en'
          ? 'Pócima Salvaje is designed for general use. We do not intentionally collect personal information from children under 13 years of age. The application content is educational and promotes natural health awareness. Parental guidance is recommended for younger users.'
          : 'Pócima Salvaje está diseñada para uso general. No recopilamos intencionalmente información personal de menores de 13 años. El contenido de la aplicación es educativo y promueve la conciencia sobre la salud natural. Se recomienda la supervisión de los padres para usuarios más jóvenes.'
      },
      {
        title: currentLanguage === 'en' ? '10. Changes to This Policy' : '10. Cambios a esta Política',
        content: currentLanguage === 'en'
          ? 'We may update this policy occasionally. We will notify you of significant changes through the application. The "Last Updated" date at the beginning of this document indicates when the last modification was made.'
          : 'Podemos actualizar esta política ocasionalmente. Le notificaremos de cambios significativos a través de la aplicación. La fecha de "Última actualización" al inicio de este documento indica cuándo se realizó la última modificación.'
      },
      {
        title: currentLanguage === 'en' ? '11. Contact' : '11. Contacto',
        content: currentLanguage === 'en'
          ? 'If you have questions about this Privacy Policy or about the handling of your data, you can contact us at:\n\nEmail: info@chyrris.com\nWeb: https://chyrris.com\n\nDeveloped by Chyrris Technologies\nSan Francisco, CA, USA\n\nYour privacy is our priority.'
          : 'Si tiene preguntas sobre esta Política de Privacidad o sobre el manejo de sus datos, puede contactarnos en:\n\nEmail: info@chyrris.com\nWeb: https://chyrris.com\n\nDesarrollado por Chyrris Technologies\nSan Francisco, CA, EE.UU.\n\nSu privacidad es nuestra prioridad.'
      }
    ],
    backToHome: currentLanguage === 'en' ? 'Back to Home' : 'Volver al Inicio'
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
                src="https://i.postimg.cc/Cx6ZzsQS/Logo-chyrris.png" 
                alt="CHYRRIS" 
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto p-8 rounded-2xl bg-[#0f1419]/80 backdrop-blur-xl border border-[#35ffdd]/10"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-[#35ffdd]">{content.title}</h1>
              <h2 className="text-xl text-[#4cc4ff] mt-2">{content.subtitle}</h2>
              <div className="flex items-center justify-center mt-4 text-sm text-gray-400">
                <span>{content.lastUpdated}:</span>
                <span className="ml-2">{content.date}</span>
              </div>
            </div>
            
            {/* Introduction */}
            <div className="border-b border-[#35ffdd]/10 mb-8 pb-8">
              <p className="text-gray-300 font-rajdhani whitespace-pre-line leading-relaxed">
                {content.introduction}
              </p>
            </div>
            
            {/* Sections */}
            <div className="space-y-8">
              {content.sections.map((section, index) => (
                <div key={index} className="border-b border-[#35ffdd]/10 pb-6 last:border-0">
                  <h3 className="text-[#35ffdd] font-bold mb-4">{section.title}</h3>
                  <div className="text-gray-300 font-rajdhani whitespace-pre-line leading-relaxed">
                    {section.content}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
