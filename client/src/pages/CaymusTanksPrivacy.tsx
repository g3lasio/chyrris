import { motion } from "framer-motion";
import { Link } from "wouter";
import { useLanguage } from "../hooks/useLanguage";
import { ParticleBackground } from "../components/ParticleBackground";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { Footer } from "../sections/Footer";

export default function CaymusTanksPrivacy() {
  const { currentLanguage } = useLanguage();
  
  const content = {
    title: currentLanguage === 'en' ? 'Privacy Policy' : 'Política de Privacidad',
    subtitle: currentLanguage === 'en' ? 'Caymus Tank Calculator' : 'Caymus Tank Calculator',
    lastUpdated: currentLanguage === 'en' ? 'Last Updated' : 'Última Actualización',
    date: currentLanguage === 'en' ? 'January 17, 2026' : '17 de Enero, 2026',
    introduction: currentLanguage === 'en' 
      ? 'Caymus Tank Calculator ("we", "our application") is committed to protecting the privacy of our users. This Privacy Policy explains how we collect, use, store, and protect your information when you use our professional wine tank calculation application.\n\nBy using Caymus Tank Calculator, you accept the practices described in this policy. We recommend reading this complete document to understand our commitment to your privacy.'
      : 'Caymus Tank Calculator ("nosotros", "nuestra aplicación") se compromete a proteger la privacidad de nuestros usuarios. Esta Política de Privacidad explica cómo recopilamos, usamos, almacenamos y protegemos su información cuando utiliza nuestra aplicación profesional de cálculo de tanques de vino.\n\nAl utilizar Caymus Tank Calculator, usted acepta las prácticas descritas en esta política. Le recomendamos leer este documento completo para comprender nuestro compromiso con su privacidad.',
    sections: [
      {
        title: currentLanguage === 'en' ? '1. Introduction' : '1. Introducción',
        content: currentLanguage === 'en' 
          ? 'Caymus Tank Calculator is a professional tool designed for winemakers and wine industry professionals. This application helps calculate precise measurements, volumes, and conversions for wine production. We are committed to protecting your privacy while providing you with a powerful calculation tool.'
          : 'Caymus Tank Calculator es una herramienta profesional diseñada para enólogos y profesionales de la industria vinícola. Esta aplicación ayuda a calcular mediciones precisas, volúmenes y conversiones para la producción de vino. Estamos comprometidos a proteger su privacidad mientras le proporcionamos una poderosa herramienta de cálculo.'
      },
      {
        title: currentLanguage === 'en' ? '2. Information We Collect' : '2. Información que Recopilamos',
        content: currentLanguage === 'en' 
          ? '2.1 Account Information\nWhen you register, we collect:\n• Phone number (for authentication via OTP)\n• Name (for personalization)\n• Device identifier (for session management)\n\n2.2 Usage Data\nWe store locally on your device:\n• Calculation history\n• Application preferences and settings\n• Language preferences\n\n2.3 Subscription Information\nFor paid subscriptions:\n• Subscription status and expiration date\n• Payment processing is handled by Apple App Store (we do not store payment details)\n\n2.4 Technical Data\nWe may automatically collect:\n• Basic device information (model, operating system)\n• Anonymous error reports to improve stability\n• Aggregated usage statistics (without personal identification)'
          : '2.1 Información de Cuenta\nCuando se registra, recopilamos:\n• Número de teléfono (para autenticación vía OTP)\n• Nombre (para personalización)\n• Identificador de dispositivo (para gestión de sesión)\n\n2.2 Datos de Uso\nAlmacenamos localmente en su dispositivo:\n• Historial de cálculos\n• Preferencias y configuraciones de la aplicación\n• Preferencias de idioma\n\n2.3 Información de Suscripción\nPara suscripciones de pago:\n• Estado de suscripción y fecha de vencimiento\n• El procesamiento de pagos es manejado por Apple App Store (no almacenamos detalles de pago)\n\n2.4 Datos Técnicos\nPodemos recopilar automáticamente:\n• Información básica del dispositivo (modelo, sistema operativo)\n• Reportes de errores anónimos para mejorar la estabilidad\n• Estadísticas agregadas de uso (sin identificación personal)'
      },
      {
        title: currentLanguage === 'en' ? '3. Use of Information' : '3. Uso de la Información',
        content: currentLanguage === 'en'
          ? 'We use the collected information to:\n• Authenticate users and manage sessions securely\n• Provide personalized calculation services\n• Save your preferences and calculation history\n• Process and manage subscriptions\n• Diagnose technical problems and improve stability\n• Develop new features and improvements\n• Send important service notifications'
          : 'Utilizamos la información recopilada para:\n• Autenticar usuarios y gestionar sesiones de forma segura\n• Proporcionar servicios de cálculo personalizados\n• Guardar sus preferencias e historial de cálculos\n• Procesar y gestionar suscripciones\n• Diagnosticar problemas técnicos y mejorar la estabilidad\n• Desarrollar nuevas funcionalidades y mejoras\n• Enviar notificaciones importantes del servicio'
      },
      {
        title: currentLanguage === 'en' ? '4. Authentication and Security' : '4. Autenticación y Seguridad',
        content: currentLanguage === 'en'
          ? 'We use Twilio Verify for secure phone number authentication:\n• One-Time Passwords (OTP) are sent via SMS for verification\n• Your phone number is used solely for authentication purposes\n• We implement industry-standard security measures\n• Sessions are encrypted and time-limited for security\n• Each device is uniquely identified to prevent unauthorized access'
          : 'Utilizamos Twilio Verify para autenticación segura de número telefónico:\n• Se envían contraseñas de un solo uso (OTP) por SMS para verificación\n• Su número de teléfono se utiliza únicamente para propósitos de autenticación\n• Implementamos medidas de seguridad estándar de la industria\n• Las sesiones están cifradas y tienen tiempo limitado por seguridad\n• Cada dispositivo se identifica de forma única para prevenir acceso no autorizado'
      },
      {
        title: currentLanguage === 'en' ? '5. Sharing Information with Third Parties' : '5. Compartir Información con Terceros',
        content: currentLanguage === 'en'
          ? 'We share limited information with the following third parties:\n\nTwilio: Phone numbers are processed by Twilio for OTP verification. Twilio has its own privacy policy and security standards.\n\nApple App Store: Subscription payments are processed through Apple. Apple has its own privacy policy.\n\nWe do not sell, rent, or share your personal information with third parties for marketing purposes.'
          : 'Compartimos información limitada con los siguientes terceros:\n\nTwilio: Los números de teléfono son procesados por Twilio para verificación OTP. Twilio tiene su propia política de privacidad y estándares de seguridad.\n\nApple App Store: Los pagos de suscripción son procesados a través de Apple. Apple tiene su propia política de privacidad.\n\nNo vendemos, alquilamos ni compartimos su información personal con terceros para fines de marketing.'
      },
      {
        title: currentLanguage === 'en' ? '6. Storage and Security' : '6. Almacenamiento y Seguridad',
        content: currentLanguage === 'en'
          ? '• Local data is stored securely in your device\'s internal storage\n• We use encrypted connections (HTTPS) for all communications\n• Authentication tokens are securely stored and encrypted\n• We do not store payment card information\n• Regular security audits are conducted to ensure data protection\n• Session data expires after 30 days for security'
          : '• Los datos locales se almacenan de forma segura en el almacenamiento interno de su dispositivo\n• Utilizamos conexiones cifradas (HTTPS) para todas las comunicaciones\n• Los tokens de autenticación se almacenan y cifran de forma segura\n• No almacenamos información de tarjetas de pago\n• Se realizan auditorías de seguridad regulares para garantizar la protección de datos\n• Los datos de sesión expiran después de 30 días por seguridad'
      },
      {
        title: currentLanguage === 'en' ? '7. Data Retention' : '7. Retención de Datos',
        content: currentLanguage === 'en'
          ? '• Local data remains on your device until you uninstall the application or manually delete it\n• You can delete your calculation history from the Settings section\n• Account data is retained while your subscription is active\n• Upon account deletion, all associated data is permanently removed\n• Session tokens expire automatically after 30 days'
          : '• Los datos locales permanecen en su dispositivo hasta que desinstale la aplicación o los elimine manualmente\n• Puede eliminar su historial de cálculos desde la sección de Configuración\n• Los datos de cuenta se retienen mientras su suscripción esté activa\n• Al eliminar la cuenta, todos los datos asociados se eliminan permanentemente\n• Los tokens de sesión expiran automáticamente después de 30 días'
      },
      {
        title: currentLanguage === 'en' ? '8. Your Rights' : '8. Sus Derechos',
        content: currentLanguage === 'en'
          ? 'You have the right to:\n• Access the data stored locally on your device\n• Delete your calculation history and preferences\n• Request deletion of your account and associated data\n• Uninstall the application to delete all local data\n• Contact us to request information about your data\n• Cancel your subscription at any time (access ends immediately upon cancellation)'
          : 'Usted tiene derecho a:\n• Acceder a los datos almacenados localmente en su dispositivo\n• Eliminar su historial de cálculos y preferencias\n• Solicitar la eliminación de su cuenta y datos asociados\n• Desinstalar la aplicación para eliminar todos los datos locales\n• Contactarnos para solicitar información sobre sus datos\n• Cancelar su suscripción en cualquier momento (el acceso termina inmediatamente al cancelar)'
      },
      {
        title: currentLanguage === 'en' ? '9. Subscription Terms' : '9. Términos de Suscripción',
        content: currentLanguage === 'en'
          ? '• Monthly subscription: $5.99/month\n• Subscription provides full access to all calculator features\n• Payment is processed through Apple App Store\n• You can cancel anytime through your App Store settings\n• Upon cancellation, access to the application ends immediately\n• No refunds are provided for partial subscription periods'
          : '• Suscripción mensual: $5.99/mes\n• La suscripción proporciona acceso completo a todas las funciones de la calculadora\n• El pago se procesa a través de Apple App Store\n• Puede cancelar en cualquier momento a través de la configuración de App Store\n• Al cancelar, el acceso a la aplicación termina inmediatamente\n• No se proporcionan reembolsos por períodos de suscripción parciales'
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
          ? 'If you have questions about this Privacy Policy or about the handling of your data, you can contact us at:\n\nEmail: gelasio@chyrris.com\nWeb: https://chyrris.com\n\nChyrris Technologies\nSan Francisco, CA, USA\n\nYour privacy is our priority.'
          : 'Si tiene preguntas sobre esta Política de Privacidad o sobre el manejo de sus datos, puede contactarnos en:\n\nEmail: gelasio@chyrris.com\nWeb: https://chyrris.com\n\nChyrris Technologies\nSan Francisco, CA, USA\n\nSu privacidad es nuestra prioridad.'
      }
    ],
    backToApp: currentLanguage === 'en' ? 'Back to Caymus Tanks' : 'Volver a Caymus Tanks',
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
        className="fixed top-0 left-0 w-full z-50 py-4 bg-[#0a0d12]/80 backdrop-blur-xl border-b border-[#8b5cf6]/10"
      >
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            <Link href="/">
              <div className="flex items-center gap-2 text-[#8b5cf6] hover:text-[#a78bfa] cursor-pointer transition-colors">
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
            className="max-w-4xl mx-auto p-8 rounded-2xl bg-[#0f1419]/80 backdrop-blur-xl border border-[#8b5cf6]/10"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-[#8b5cf6]">{content.title}</h1>
              <h2 className="text-xl text-[#a78bfa] mt-2">{content.subtitle}</h2>
              <div className="flex items-center justify-center mt-4 text-sm text-gray-400">
                <span>{content.lastUpdated}:</span>
                <span className="ml-2">{content.date}</span>
              </div>
            </div>
            
            {/* Introduction */}
            <div className="border-b border-[#8b5cf6]/10 mb-8 pb-8">
              <p className="text-gray-300 font-rajdhani whitespace-pre-line leading-relaxed">
                {content.introduction}
              </p>
            </div>
            
            {/* Sections */}
            <div className="space-y-8">
              {content.sections.map((section, index) => (
                <div key={index} className="border-b border-[#8b5cf6]/10 pb-6 last:border-0">
                  <h3 className="text-[#8b5cf6] font-bold mb-4">{section.title}</h3>
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
