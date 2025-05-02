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
  
  // Bilingual content based on current language
  const content = {
    title: currentLanguage === 'en' ? 'Privacy Policy' : 'Política de Privacidad',
    subtitle: currentLanguage === 'en' ? 'Tzotzil Bible Application' : 'Aplicación Biblia Tzotzil',
    lastUpdated: currentLanguage === 'en' ? 'Last Updated' : 'Última Actualización',
    date: 'May 2, 2023',
    introduction: currentLanguage === 'en' 
      ? 'This Privacy Policy describes how Chyrris Technologies ("we," "us," or "our") collects, uses, and discloses your information when you use our Tzotzil Bible mobile application ("the App").'
      : 'Esta Política de Privacidad describe cómo Chyrris Technologies ("nosotros" o "nuestro") recopila, utiliza y divulga su información cuando usa nuestra aplicación móvil Biblia Tzotzil ("la Aplicación").',
    sections: [
      {
        title: currentLanguage === 'en' ? '1. Information We Collect' : '1. Información que Recopilamos',
        content: currentLanguage === 'en' 
          ? 'We collect the following types of information:\n\n• Information you provide: When you create an account, we collect your email address and chosen password. If you choose to create a profile, we may collect your name and preferences.\n\n• Usage Information: We collect information about how you use the App, including reading history, bookmarks, notes, and interactions with the Nevin AI feature.\n\n• Device Information: We collect information about your device, including device type, operating system, unique device identifiers, and mobile network information.'
          : 'Recopilamos los siguientes tipos de información:\n\n• Información que proporciona: Cuando crea una cuenta, recopilamos su dirección de correo electrónico y la contraseña elegida. Si decide crear un perfil, podemos recopilar su nombre y preferencias.\n\n• Información de uso: Recopilamos información sobre cómo utiliza la Aplicación, incluido el historial de lectura, marcadores, notas e interacciones con la función de IA Nevin.\n\n• Información del dispositivo: Recopilamos información sobre su dispositivo, incluido el tipo de dispositivo, sistema operativo, identificadores únicos de dispositivo e información de red móvil.'
      },
      {
        title: currentLanguage === 'en' ? '2. How We Use Your Information' : '2. Cómo Utilizamos su Información',
        content: currentLanguage === 'en'
          ? 'We use the information we collect to:\n\n• Provide, maintain, and improve the App functionality\n• Personalize your experience within the App\n• Train and improve the Nevin AI assistant to provide better responses\n• Understand how users interact with the App to improve its features\n• Communicate with you about updates, features, or support requests\n• Ensure the security and proper operation of the App'
          : 'Utilizamos la información que recopilamos para:\n\n• Proporcionar, mantener y mejorar las características y funcionalidad de la Aplicación\n• Personalizar su experiencia dentro de la Aplicación\n• Entrenar y mejorar el asistente de IA Nevin para proporcionar mejores respuestas\n• Comprender cómo los usuarios interactúan con la Aplicación para mejorar sus características\n• Comunicarnos con usted sobre actualizaciones, características o solicitudes de soporte\n• Garantizar la seguridad y el funcionamiento adecuado de la Aplicación'
      },
      {
        title: currentLanguage === 'en' ? '3. Sharing Your Information' : '3. Compartiendo su Información',
        content: currentLanguage === 'en'
          ? 'We may share your information with:\n\n• Service providers who help us operate the App\n• Legal authorities when required by law\n• Affiliated organizations that help with the development and improvement of biblical content\n\nWe do not sell your personal information to third parties.'
          : 'Podemos compartir su información con:\n\n• Proveedores de servicios que nos ayudan a operar la Aplicación\n• Autoridades legales cuando lo exija la ley\n• Organizaciones afiliadas que ayudan con el desarrollo y mejora del contenido bíblico\n\nNo vendemos su información personal a terceros.'
      },
      {
        title: currentLanguage === 'en' ? '4. Data Storage and Security' : '4. Almacenamiento y Seguridad de Datos',
        content: currentLanguage === 'en'
          ? 'We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure. The app stores some data locally on your device to enable offline functionality. Your conversations with Nevin AI may be stored and processed on our secure servers to improve the service.'
          : 'Implementamos medidas técnicas y organizativas apropiadas para proteger su información personal. Sin embargo, ningún método de transmisión por Internet o almacenamiento electrónico es 100% seguro. La aplicación almacena algunos datos localmente en su dispositivo para permitir la funcionalidad sin conexión. Sus conversaciones con Nevin AI pueden almacenarse y procesarse en nuestros servidores seguros para mejorar el servicio.'
      },
      {
        title: currentLanguage === 'en' ? '5. User Choices and Controls' : '5. Opciones y Controles del Usuario',
        content: currentLanguage === 'en'
          ? 'You can:\n\n• Update or delete your account information through the App settings\n• Opt out of certain data collection through your device settings\n• Request deletion of your data by contacting us\n• Choose to use the App without creating an account, though some features may be limited'
          : 'Usted puede:\n\n• Actualizar o eliminar la información de su cuenta a través de la configuración de la Aplicación\n• Optar por no participar en cierta recopilación de datos a través de la configuración de su dispositivo\n• Solicitar la eliminación de sus datos contactándonos\n• Elegir usar la Aplicación sin crear una cuenta, aunque algunas características pueden estar limitadas'
      },
      {
        title: currentLanguage === 'en' ? '6. Children\'s Privacy' : '6. Privacidad de los Niños',
        content: currentLanguage === 'en'
          ? 'The App is not directed to children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe we have collected information from your child, please contact us.'
          : 'La Aplicación no está dirigida a niños menores de 13 años. No recopilamos conscientemente información personal de niños menores de 13 años. Si usted es un padre o tutor y cree que hemos recopilado información de su hijo, contáctenos.'
      },
      {
        title: currentLanguage === 'en' ? '7. International Users' : '7. Usuarios Internacionales',
        content: currentLanguage === 'en'
          ? 'The App is operated from the United States. If you are located outside of the United States, please be aware that information we collect will be transferred to and processed in the United States. By using the App, you consent to this transfer and processing of your information.'
          : 'La Aplicación opera desde los Estados Unidos. Si se encuentra fuera de los Estados Unidos, tenga en cuenta que la información que recopilamos se transferirá y procesará en los Estados Unidos. Al usar la Aplicación, acepta esta transferencia y procesamiento de su información.'
      },
      {
        title: currentLanguage === 'en' ? '8. Changes to This Privacy Policy' : '8. Cambios a Esta Política de Privacidad',
        content: currentLanguage === 'en'
          ? 'We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.'
          : 'Podemos actualizar nuestra Política de Privacidad de vez en cuando. Le notificaremos sobre cualquier cambio publicando la nueva Política de Privacidad en esta página y actualizando la fecha de "Última Actualización". Se le recomienda revisar esta Política de Privacidad periódicamente para cualquier cambio.'
      },
      {
        title: currentLanguage === 'en' ? '9. Use of Nevin AI Assistant' : '9. Uso del Asistente de IA Nevin',
        content: currentLanguage === 'en'
          ? 'The Nevin AI assistant is designed to provide responses based on biblical texts. When you interact with Nevin:\n\n• Your questions and conversations may be stored and processed to improve the service\n• The AI responses are generated based on biblical content and are not personalized advice\n• We do not use your conversations for advertising purposes\n• You can delete your conversation history through the App settings'
          : 'El asistente de IA Nevin está diseñado para proporcionar respuestas basadas en textos bíblicos. Cuando interactúa con Nevin:\n\n• Sus preguntas y conversaciones pueden almacenarse y procesarse para mejorar el servicio\n• Las respuestas de IA se generan en función del contenido bíblico y no son consejos personalizados\n• No usamos sus conversaciones con fines publicitarios\n• Puede eliminar su historial de conversaciones a través de la configuración de la Aplicación'
      },
      {
        title: currentLanguage === 'en' ? '10. Contact Us' : '10. Contáctenos',
        content: currentLanguage === 'en'
          ? 'If you have any questions about this Privacy Policy, please contact us at:\n\nChyrris Technologies\nEmail: info@chyrris.com\nAddress: San Francisco, CA, USA'
          : 'Si tiene alguna pregunta sobre esta Política de Privacidad, contáctenos en:\n\nChyrris Technologies\nCorreo electrónico: info@chyrris.com\nDirección: San Francisco, CA, EE.UU.'
      }
    ],
    backToApp: currentLanguage === 'en' ? 'Back to Tzotzil Bible' : 'Volver a Biblia Tzotzil',
    backToHome: currentLanguage === 'en' ? 'Back to Home' : 'Volver al Inicio'
  };

  return (
    <main className="hex-bg min-h-screen relative overflow-x-hidden">
      <ParticleBackground />
      <ScanEffect />
      
      {/* Navigation bar */}
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
              
              <Link href="/tzotzil-bible">
                <div className="flex items-center space-x-2 text-[#f5b308] hover:text-[#35ffdd] cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>{content.backToApp}</span>
                </div>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <LanguageSwitcher variant="minimal" />
              <div className="relative rounded-lg flex justify-center items-center p-3 border border-[#4cc4ff40] bg-[#1a202c99] backdrop-blur-md">
                <img src="https://i.postimg.cc/Cx6ZzsQS/Logo-chyrris.png" alt="CHYRRIS" className="h-8" />
              </div>
            </div>
          </div>
        </div>
      </motion.nav>
      
      {/* Privacy Policy Content */}
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
              <p className="text-gray-300 font-rajdhani">
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