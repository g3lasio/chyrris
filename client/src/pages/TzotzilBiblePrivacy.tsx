import { motion } from "framer-motion";
import { Link } from "wouter";
import { useLanguage } from "../hooks/useLanguage";
import { ParticleBackground } from "../components/ParticleBackground";
import { ScanEffect } from "../components/ScanEffect";
import { HudPanel } from "../components/HudPanel";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { Footer } from "../sections/Footer";

export default function TzotzilBiblePrivacy() {
  const { currentLanguage } = useLanguage();
  
  const content = {
    title: currentLanguage === 'en' ? 'Privacy Policy' : 'Política de Privacidad',
    subtitle: currentLanguage === 'en' ? 'Tzotzil Bible Application' : 'Aplicación Biblia Tzotzil',
    lastUpdated: currentLanguage === 'en' ? 'Last Updated' : 'Última Actualización',
    date: currentLanguage === 'en' ? 'December 19, 2025' : '19 de Diciembre, 2025',
    introduction: currentLanguage === 'en' 
      ? 'Tzotzil Bible ("we", "our application") is committed to protecting the privacy of our users. This Privacy Policy explains how we collect, use, store, and protect your information when you use our Bible study application.\n\nBy using Tzotzil Bible, you accept the practices described in this policy. We recommend reading this complete document to understand our commitment to your privacy.'
      : 'Tzotzil Bible ("nosotros", "nuestra aplicación") se compromete a proteger la privacidad de nuestros usuarios. Esta Política de Privacidad explica cómo recopilamos, usamos, almacenamos y protegemos su información cuando utiliza nuestra aplicación de estudio bíblico.\n\nAl utilizar Tzotzil Bible, usted acepta las prácticas descritas en esta política. Le recomendamos leer este documento completo para comprender nuestro compromiso con su privacidad.',
    sections: [
      {
        title: currentLanguage === 'en' ? '1. Introduction' : '1. Introducción',
        content: currentLanguage === 'en' 
          ? 'Tzotzil Bible ("we", "our application") is committed to protecting the privacy of our users. This Privacy Policy explains how we collect, use, store, and protect your information when you use our Bible study application.'
          : 'Tzotzil Bible ("nosotros", "nuestra aplicación") se compromete a proteger la privacidad de nuestros usuarios. Esta Política de Privacidad explica cómo recopilamos, usamos, almacenamos y protegemos su información cuando utiliza nuestra aplicación de estudio bíblico.'
      },
      {
        title: currentLanguage === 'en' ? '2. Information We Collect' : '2. Información que Recopilamos',
        content: currentLanguage === 'en' 
          ? '2.1 Local Usage Data\nWe store locally on your device:\n• Application preferences (font size, settings)\n• Conversation history with Nevin AI\n• Personal bookmarks and notes\n• Bible reading progress\n\n2.2 Data Processed by AI\nWhen you use the Nevin AI assistant:\n• Your questions and theological queries are sent to external artificial intelligence services (Anthropic Claude) to generate responses.\n• We do not permanently store your conversations on external servers.\n• Queries are processed in real-time and are not used to train AI models.\n\n2.3 Technical Data\nWe may automatically collect:\n• Basic device information (model, operating system)\n• Anonymous error reports to improve stability\n• Aggregated usage statistics (without personal identification)'
          : '2.1 Datos de Uso Local\nAlmacenamos localmente en su dispositivo:\n• Preferencias de la aplicación (tamaño de fuente, configuraciones)\n• Historial de conversaciones con Nevin AI\n• Marcadores y notas personales\n• Progreso de lectura bíblica\n\n2.2 Datos Procesados por IA\nCuando utiliza el asistente Nevin AI:\n• Sus preguntas y consultas teológicas son enviadas a servicios externos de inteligencia artificial (Anthropic Claude) para generar respuestas.\n• No almacenamos sus conversaciones en servidores externos de forma permanente.\n• Las consultas se procesan en tiempo real y no se utilizan para entrenar modelos de IA.\n\n2.3 Datos Técnicos\nPodemos recopilar automáticamente:\n• Información básica del dispositivo (modelo, sistema operativo)\n• Reportes de errores anónimos para mejorar la estabilidad\n• Estadísticas agregadas de uso (sin identificación personal)'
      },
      {
        title: currentLanguage === 'en' ? '3. Use of Information' : '3. Uso de la Información',
        content: currentLanguage === 'en'
          ? 'We use the collected information to:\n• Provide and improve application functionality\n• Generate personalized theological responses through Nevin AI\n• Save your preferences and settings\n• Diagnose technical problems and improve stability\n• Develop new features'
          : 'Utilizamos la información recopilada para:\n• Proporcionar y mejorar la funcionalidad de la aplicación\n• Generar respuestas teológicas personalizadas a través de Nevin AI\n• Guardar sus preferencias y configuraciones\n• Diagnosticar problemas técnicos y mejorar la estabilidad\n• Desarrollar nuevas funcionalidades'
      },
      {
        title: currentLanguage === 'en' ? '4. Sharing Information with Third Parties' : '4. Compartir Información con Terceros',
        content: currentLanguage === 'en'
          ? 'We share limited information with the following third parties:\n\nAnthropic (Claude AI): Queries made to Nevin AI are processed by the Anthropic Claude API. Anthropic has its own privacy policy and does not use API queries to train its models.\n\nWe do not sell, rent, or share your personal information with third parties for marketing purposes.'
          : 'Compartimos información limitada con los siguientes terceros:\n\nAnthropic (Claude AI): Las consultas realizadas a Nevin AI son procesadas por la API de Anthropic Claude. Anthropic tiene su propia política de privacidad y no utiliza las consultas de API para entrenar sus modelos.\n\nNo vendemos, alquilamos ni compartimos su información personal con terceros para fines de marketing.'
      },
      {
        title: currentLanguage === 'en' ? '5. Storage and Security' : '5. Almacenamiento y Seguridad',
        content: currentLanguage === 'en'
          ? '• Local data is stored securely in your device\'s internal storage.\n• We use encrypted connections (HTTPS) for all communications with external servers.\n• We do not store passwords or financial information.\n• We implement industry-standard security measures to protect your data during transmission.'
          : '• Los datos locales se almacenan de forma segura en el almacenamiento interno de su dispositivo.\n• Utilizamos conexiones cifradas (HTTPS) para todas las comunicaciones con servidores externos.\n• No almacenamos contraseñas ni información financiera.\n• Implementamos medidas de seguridad estándar de la industria para proteger sus datos durante la transmisión.'
      },
      {
        title: currentLanguage === 'en' ? '6. Data Retention' : '6. Retención de Datos',
        content: currentLanguage === 'en'
          ? '• Local data remains on your device until you uninstall the application or manually delete it.\n• You can delete your conversation history with Nevin from the Settings section.\n• Session data with AI services is not retained beyond the active session.'
          : '• Los datos locales permanecen en su dispositivo hasta que desinstale la aplicación o los elimine manualmente.\n• Puede eliminar su historial de conversaciones con Nevin desde la sección de Ajustes.\n• Los datos de sesión con servicios de IA no se retienen más allá de la sesión activa.'
      },
      {
        title: currentLanguage === 'en' ? '7. Your Rights' : '7. Sus Derechos',
        content: currentLanguage === 'en'
          ? 'You have the right to:\n• Access the data stored locally on your device\n• Delete your conversation history with Nevin\n• Uninstall the application to delete all local data\n• Contact us to request information about your data\n• Use the application without the AI feature if you prefer'
          : 'Usted tiene derecho a:\n• Acceder a los datos almacenados localmente en su dispositivo\n• Eliminar su historial de conversaciones con Nevin\n• Desinstalar la aplicación para eliminar todos los datos locales\n• Contactarnos para solicitar información sobre sus datos\n• Usar la aplicación sin la función de IA si lo prefiere'
      },
      {
        title: currentLanguage === 'en' ? '8. Minors' : '8. Menores de Edad',
        content: currentLanguage === 'en'
          ? 'Tzotzil Bible is designed for general and family use. We do not intentionally collect personal information from children under 13 years of age. The application content is appropriate for all ages and promotes positive spiritual values.'
          : 'Tzotzil Bible está diseñada para uso general y familiar. No recopilamos intencionalmente información personal de menores de 13 años. El contenido de la aplicación es apropiado para todas las edades y promueve valores espirituales positivos.'
      },
      {
        title: currentLanguage === 'en' ? '9. Changes to This Policy' : '9. Cambios a esta Política',
        content: currentLanguage === 'en'
          ? 'We may update this policy occasionally. We will notify you of significant changes through the application. The "Last Updated" date at the beginning of this document indicates when the last modification was made.'
          : 'Podemos actualizar esta política ocasionalmente. Le notificaremos de cambios significativos a través de la aplicación. La fecha de "Última actualización" al inicio de este documento indica cuándo se realizó la última modificación.'
      },
      {
        title: currentLanguage === 'en' ? '10. Contact' : '10. Contacto',
        content: currentLanguage === 'en'
          ? 'If you have questions about this Privacy Policy or about the handling of your data, you can contact us at:\n\nEmail: gelasio@chyrris.com\nWeb: https://bible.chyrris.com\n\nYour privacy is our priority.'
          : 'Si tiene preguntas sobre esta Política de Privacidad o sobre el manejo de sus datos, puede contactarnos en:\n\nEmail: gelasio@chyrris.com\nWeb: https://bible.chyrris.com\n\nSu privacidad es nuestra prioridad.'
      }
    ],
    backToApp: currentLanguage === 'en' ? 'Back to Tzotzil Bible' : 'Volver a Biblia Tzotzil',
    backToHome: currentLanguage === 'en' ? 'Back to Home' : 'Volver al Inicio'
  };

  return (
    <main className="hex-bg min-h-screen relative overflow-x-hidden">
      <ParticleBackground />
      <ScanEffect />
      
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 w-full z-50 py-2 bg-[#12172199] backdrop-blur-md"
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              <Link href="/">
                <div className="flex items-center space-x-2 text-[#4cc4ff] hover:text-[#35ffdd] cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                  <span>{content.backToHome}</span>
                </div>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <LanguageSwitcher variant="minimal" />
              <div className="relative rounded-lg flex justify-center items-center p-2 border border-[#4cc4ff40] bg-[#1a202c99] backdrop-blur-md">
                <img src="https://i.postimg.cc/Cx6ZzsQS/Logo-chyrris.png" alt="CHYRRIS" className="h-8" />
              </div>
            </div>
          </div>
        </div>
      </motion.nav>
      
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <HudPanel code="PRIVACY-POLICY" className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-[#f5b308]">{content.title}</h1>
              <h2 className="text-xl text-[#4cc4ff] mt-2">{content.subtitle}</h2>
              <div className="flex items-center justify-center mt-4 text-sm text-gray-400">
                <span>{content.lastUpdated}:</span>
                <span className="ml-2">{content.date}</span>
              </div>
            </div>
            
            <div className="border-b border-[#4cc4ff30] mb-6 pb-6">
              <p className="text-gray-300 font-rajdhani whitespace-pre-line">
                {content.introduction}
              </p>
            </div>
            
            <div className="space-y-8">
              {content.sections.map((section, index) => (
                <div key={index} className="border-b border-[#4cc4ff20] pb-6 last:border-0">
                  <h3 className="text-[#4cc4ff] font-bold mb-3">{section.title}</h3>
                  <div className="text-gray-300 font-rajdhani whitespace-pre-line">
                    {section.content}
                  </div>
                </div>
              ))}
            </div>
          </HudPanel>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
