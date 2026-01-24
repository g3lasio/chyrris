import { motion } from "framer-motion";
import { Link } from "wouter";
import { useLanguage } from "../hooks/useLanguage";
import { ParticleBackground } from "../components/ParticleBackground";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { Footer } from "../sections/Footer";

export default function PocimaSalvajeTerms() {
  const { currentLanguage } = useLanguage();
  
  const content = {
    title: currentLanguage === 'en' ? 'Terms of Service' : 'Términos de Servicio',
    subtitle: currentLanguage === 'en' ? 'Pócima Salvaje Application' : 'Aplicación Pócima Salvaje',
    lastUpdated: currentLanguage === 'en' ? 'Last Updated' : 'Última Actualización',
    date: currentLanguage === 'en' ? 'January 24, 2026' : '24 de Enero, 2026',
    introduction: currentLanguage === 'en' 
      ? 'Welcome to Pócima Salvaje. These Terms of Service ("Terms") govern your use of the Pócima Salvaje mobile application ("App") developed by Chyrris Technologies. By downloading, accessing, or using the App, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use the App.'
      : 'Bienvenido a Pócima Salvaje. Estos Términos de Servicio ("Términos") rigen su uso de la aplicación móvil Pócima Salvaje ("Aplicación") desarrollada por Chyrris Technologies. Al descargar, acceder o usar la Aplicación, usted acepta estar sujeto a estos Términos. Si no está de acuerdo con estos Términos, por favor no use la Aplicación.',
    sections: [
      {
        title: currentLanguage === 'en' ? '1. Acceptance of Terms' : '1. Aceptación de los Términos',
        content: currentLanguage === 'en' 
          ? 'By using Pócima Salvaje, you confirm that:\n• You are at least 13 years of age (or the minimum age required in your jurisdiction)\n• You have the legal capacity to enter into these Terms\n• You will use the App in compliance with these Terms and all applicable laws\n• You understand that the App is for educational and informational purposes only'
          : 'Al usar Pócima Salvaje, usted confirma que:\n• Tiene al menos 13 años de edad (o la edad mínima requerida en su jurisdicción)\n• Tiene la capacidad legal para aceptar estos Términos\n• Usará la Aplicación en cumplimiento con estos Términos y todas las leyes aplicables\n• Entiende que la Aplicación es solo para fines educativos e informativos'
      },
      {
        title: currentLanguage === 'en' ? '2. Description of Service' : '2. Descripción del Servicio',
        content: currentLanguage === 'en' 
          ? 'Pócima Salvaje is a mobile application that provides:\n• Information about medicinal plants and natural remedies\n• A database of health conditions and their traditional treatments\n• An AI-powered virtual assistant (MolDoctor) for educational health consultations\n• Image analysis capabilities for medical documents and symptoms\n• Educational content about natural medicine and wellness\n\nThe App is designed to educate and inform users about traditional and natural medicine practices. It is NOT intended to replace professional medical advice, diagnosis, or treatment.'
          : 'Pócima Salvaje es una aplicación móvil que proporciona:\n• Información sobre plantas medicinales y remedios naturales\n• Una base de datos de condiciones de salud y sus tratamientos tradicionales\n• Un asistente virtual impulsado por IA (MolDoctor) para consultas educativas de salud\n• Capacidades de análisis de imágenes para documentos médicos y síntomas\n• Contenido educativo sobre medicina natural y bienestar\n\nLa Aplicación está diseñada para educar e informar a los usuarios sobre prácticas de medicina tradicional y natural. NO está destinada a reemplazar el consejo, diagnóstico o tratamiento médico profesional.'
      },
      {
        title: currentLanguage === 'en' ? '3. Medical Disclaimer and Limitations' : '3. Aviso Médico y Limitaciones',
        content: currentLanguage === 'en'
          ? 'IMPORTANT MEDICAL DISCLAIMER:\n\n• The information provided by Pócima Salvaje is for EDUCATIONAL PURPOSES ONLY\n• The App does NOT provide medical advice, diagnosis, or treatment\n• MolDoctor AI responses are based on general knowledge and should NOT be considered professional medical advice\n• Always consult a qualified healthcare professional before starting any treatment, changing your medication, or making health decisions\n• Do not disregard professional medical advice or delay seeking it because of information obtained from this App\n• In case of medical emergency, call your local emergency services immediately\n• The App is not a substitute for professional medical care\n• Individual results may vary, and not all remedies are suitable for everyone\n• Some medicinal plants may have contraindications or interact with medications\n\nBy using this App, you acknowledge and accept these limitations.'
          : 'AVISO MÉDICO IMPORTANTE:\n\n• La información proporcionada por Pócima Salvaje es SOLO PARA FINES EDUCATIVOS\n• La Aplicación NO proporciona consejo, diagnóstico o tratamiento médico\n• Las respuestas de MolDoctor AI se basan en conocimiento general y NO deben considerarse consejo médico profesional\n• Siempre consulte a un profesional de salud calificado antes de comenzar cualquier tratamiento, cambiar su medicación o tomar decisiones de salud\n• No ignore el consejo médico profesional ni retrase su búsqueda debido a información obtenida de esta Aplicación\n• En caso de emergencia médica, llame a sus servicios de emergencia locales inmediatamente\n• La Aplicación no es un sustituto del cuidado médico profesional\n• Los resultados individuales pueden variar, y no todos los remedios son adecuados para todos\n• Algunas plantas medicinales pueden tener contraindicaciones o interactuar con medicamentos\n\nAl usar esta Aplicación, usted reconoce y acepta estas limitaciones.'
      },
      {
        title: currentLanguage === 'en' ? '4. User Responsibilities' : '4. Responsabilidades del Usuario',
        content: currentLanguage === 'en'
          ? 'As a user of Pócima Salvaje, you agree to:\n• Use the App only for lawful and educational purposes\n• Not use the App as a substitute for professional medical care\n• Verify information with qualified healthcare professionals before taking action\n• Not share sensitive personal health information through the App that could identify you\n• Not attempt to reverse engineer, decompile, or extract source code from the App\n• Not use the App to provide medical advice to others\n• Not misrepresent the capabilities or purpose of the App\n• Report any bugs, errors, or security vulnerabilities to us promptly\n• Use the AI features responsibly and understand their limitations'
          : 'Como usuario de Pócima Salvaje, usted acepta:\n• Usar la Aplicación solo para fines legales y educativos\n• No usar la Aplicación como sustituto del cuidado médico profesional\n• Verificar la información con profesionales de salud calificados antes de tomar acción\n• No compartir información personal de salud sensible a través de la Aplicación que pueda identificarlo\n• No intentar hacer ingeniería inversa, descompilar o extraer código fuente de la Aplicación\n• No usar la Aplicación para proporcionar consejo médico a otros\n• No tergiversar las capacidades o el propósito de la Aplicación\n• Reportar cualquier error, fallo o vulnerabilidad de seguridad de inmediato\n• Usar las funciones de IA de manera responsable y entender sus limitaciones'
      },
      {
        title: currentLanguage === 'en' ? '5. Intellectual Property' : '5. Propiedad Intelectual',
        content: currentLanguage === 'en'
          ? 'All content, features, and functionality of Pócima Salvaje, including but not limited to:\n• Text, graphics, logos, icons, and images\n• Software code and architecture\n• Database of medicinal plants and health conditions\n• AI algorithms and responses\n• User interface and design\n\nare owned by Chyrris Technologies and are protected by international copyright, trademark, and other intellectual property laws.\n\nYou are granted a limited, non-exclusive, non-transferable license to use the App for personal, non-commercial purposes. You may not:\n• Copy, modify, or distribute the App or its content\n• Create derivative works based on the App\n• Use the App\'s content for commercial purposes without written permission\n• Remove or alter any copyright, trademark, or proprietary notices'
          : 'Todo el contenido, características y funcionalidad de Pócima Salvaje, incluyendo pero no limitado a:\n• Texto, gráficos, logos, iconos e imágenes\n• Código de software y arquitectura\n• Base de datos de plantas medicinales y condiciones de salud\n• Algoritmos de IA y respuestas\n• Interfaz de usuario y diseño\n\nson propiedad de Chyrris Technologies y están protegidos por leyes internacionales de derechos de autor, marcas registradas y otras leyes de propiedad intelectual.\n\nSe le otorga una licencia limitada, no exclusiva e intransferible para usar la Aplicación con fines personales y no comerciales. No puede:\n• Copiar, modificar o distribuir la Aplicación o su contenido\n• Crear obras derivadas basadas en la Aplicación\n• Usar el contenido de la Aplicación con fines comerciales sin permiso por escrito\n• Eliminar o alterar avisos de derechos de autor, marcas registradas o propietarios'
      },
      {
        title: currentLanguage === 'en' ? '6. AI-Powered Features (MolDoctor)' : '6. Funciones Impulsadas por IA (MolDoctor)',
        content: currentLanguage === 'en'
          ? 'Pócima Salvaje includes an AI-powered virtual assistant called MolDoctor. By using this feature:\n\n• You understand that MolDoctor uses artificial intelligence (Anthropic Claude) to generate responses\n• Responses are generated based on patterns in training data and may not always be accurate\n• MolDoctor does not have access to your medical history or personal health records\n• Images you upload for analysis are processed securely and not stored permanently\n• The AI cannot diagnose medical conditions or prescribe treatments\n• You should not rely solely on AI responses for health decisions\n• We are not responsible for actions taken based on AI-generated information\n• AI technology has limitations and may occasionally produce incorrect or incomplete information\n\nMolDoctor is a tool for education and exploration, not for medical decision-making.'
          : 'Pócima Salvaje incluye un asistente virtual impulsado por IA llamado MolDoctor. Al usar esta función:\n\n• Usted entiende que MolDoctor usa inteligencia artificial (Anthropic Claude) para generar respuestas\n• Las respuestas se generan basándose en patrones en datos de entrenamiento y pueden no ser siempre precisas\n• MolDoctor no tiene acceso a su historial médico o registros de salud personal\n• Las imágenes que carga para análisis se procesan de forma segura y no se almacenan permanentemente\n• La IA no puede diagnosticar condiciones médicas ni prescribir tratamientos\n• No debe confiar únicamente en las respuestas de IA para decisiones de salud\n• No somos responsables de acciones tomadas basándose en información generada por IA\n• La tecnología de IA tiene limitaciones y ocasionalmente puede producir información incorrecta o incompleta\n\nMolDoctor es una herramienta para educación y exploración, no para toma de decisiones médicas.'
      },
      {
        title: currentLanguage === 'en' ? '7. Privacy and Data Protection' : '7. Privacidad y Protección de Datos',
        content: currentLanguage === 'en'
          ? 'Your privacy is important to us. Our collection and use of your information is governed by our Privacy Policy, which is incorporated into these Terms by reference.\n\nKey points:\n• Most data is stored locally on your device\n• AI queries are processed by third-party services (Anthropic)\n• We do not sell your personal information\n• You can delete your data at any time\n• We use encryption for data transmission\n\nPlease review our complete Privacy Policy at: https://chyrris.com/pocima-salvaje/privacy'
          : 'Su privacidad es importante para nosotros. Nuestra recopilación y uso de su información se rige por nuestra Política de Privacidad, que se incorpora a estos Términos por referencia.\n\nPuntos clave:\n• La mayoría de los datos se almacenan localmente en su dispositivo\n• Las consultas de IA son procesadas por servicios de terceros (Anthropic)\n• No vendemos su información personal\n• Puede eliminar sus datos en cualquier momento\n• Usamos cifrado para la transmisión de datos\n\nPor favor revise nuestra Política de Privacidad completa en: https://chyrris.com/pocima-salvaje/privacy'
      },
      {
        title: currentLanguage === 'en' ? '8. Disclaimers and Limitation of Liability' : '8. Renuncias y Limitación de Responsabilidad',
        content: currentLanguage === 'en'
          ? 'THE APP IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.\n\nTo the fullest extent permitted by law:\n\n• We do not warrant that the App will be error-free, uninterrupted, or secure\n• We do not guarantee the accuracy, completeness, or reliability of any content\n• We are not responsible for any health outcomes resulting from use of the App\n• We are not liable for any damages arising from your use of the App, including but not limited to direct, indirect, incidental, consequential, or punitive damages\n• Our total liability to you for any claims arising from use of the App shall not exceed the amount you paid for the App (if any)\n• We are not responsible for third-party services (such as AI providers) or their availability\n\nSome jurisdictions do not allow the exclusion of certain warranties or limitations of liability, so some of the above limitations may not apply to you.'
          : 'LA APLICACIÓN SE PROPORCIONA "TAL CUAL" Y "SEGÚN DISPONIBILIDAD" SIN GARANTÍAS DE NINGÚN TIPO, YA SEAN EXPRESAS O IMPLÍCITAS.\n\nEn la medida máxima permitida por la ley:\n\n• No garantizamos que la Aplicación estará libre de errores, ininterrumpida o segura\n• No garantizamos la precisión, integridad o confiabilidad de ningún contenido\n• No somos responsables de ningún resultado de salud resultante del uso de la Aplicación\n• No somos responsables de ningún daño que surja de su uso de la Aplicación, incluyendo pero no limitado a daños directos, indirectos, incidentales, consecuentes o punitivos\n• Nuestra responsabilidad total hacia usted por cualquier reclamo que surja del uso de la Aplicación no excederá la cantidad que pagó por la Aplicación (si corresponde)\n• No somos responsables de servicios de terceros (como proveedores de IA) o su disponibilidad\n\nAlgunas jurisdicciones no permiten la exclusión de ciertas garantías o limitaciones de responsabilidad, por lo que algunas de las limitaciones anteriores pueden no aplicarse a usted.'
      },
      {
        title: currentLanguage === 'en' ? '9. Modifications to the App and Terms' : '9. Modificaciones a la Aplicación y Términos',
        content: currentLanguage === 'en'
          ? 'We reserve the right to:\n• Modify, suspend, or discontinue the App (or any part of it) at any time\n• Update these Terms at our discretion\n• Change features, functionality, or content of the App\n• Require updates to continue using the App\n\nWe will notify you of significant changes through the App or via email (if provided). Your continued use of the App after changes constitutes acceptance of the modified Terms.\n\nIf you do not agree with any changes, you should stop using the App and uninstall it from your device.'
          : 'Nos reservamos el derecho de:\n• Modificar, suspender o discontinuar la Aplicación (o cualquier parte de ella) en cualquier momento\n• Actualizar estos Términos a nuestra discreción\n• Cambiar características, funcionalidad o contenido de la Aplicación\n• Requerir actualizaciones para continuar usando la Aplicación\n\nLe notificaremos de cambios significativos a través de la Aplicación o por correo electrónico (si se proporciona). Su uso continuado de la Aplicación después de los cambios constituye la aceptación de los Términos modificados.\n\nSi no está de acuerdo con algún cambio, debe dejar de usar la Aplicación y desinstalarla de su dispositivo.'
      },
      {
        title: currentLanguage === 'en' ? '10. Termination' : '10. Terminación',
        content: currentLanguage === 'en'
          ? 'You may stop using the App at any time by uninstalling it from your device.\n\nWe may terminate or suspend your access to the App immediately, without prior notice, if:\n• You violate these Terms\n• You use the App in a way that could harm us or other users\n• We are required to do so by law\n• We decide to discontinue the App\n\nUpon termination:\n• Your right to use the App will cease immediately\n• You must delete the App from all your devices\n• Provisions of these Terms that by their nature should survive termination will remain in effect'
          : 'Puede dejar de usar la Aplicación en cualquier momento desinstalándola de su dispositivo.\n\nPodemos terminar o suspender su acceso a la Aplicación inmediatamente, sin previo aviso, si:\n• Viola estos Términos\n• Usa la Aplicación de una manera que podría perjudicarnos a nosotros o a otros usuarios\n• Estamos obligados a hacerlo por ley\n• Decidimos discontinuar la Aplicación\n\nAl terminar:\n• Su derecho a usar la Aplicación cesará inmediatamente\n• Debe eliminar la Aplicación de todos sus dispositivos\n• Las disposiciones de estos Términos que por su naturaleza deban sobrevivir a la terminación permanecerán en efecto'
      },
      {
        title: currentLanguage === 'en' ? '11. Governing Law and Disputes' : '11. Ley Aplicable y Disputas',
        content: currentLanguage === 'en'
          ? 'These Terms shall be governed by and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law provisions.\n\nAny disputes arising from these Terms or your use of the App shall be resolved through:\n1. Good faith negotiation between the parties\n2. If negotiation fails, binding arbitration in San Francisco, California\n3. Arbitration shall be conducted in accordance with the rules of the American Arbitration Association\n\nYou agree to waive any right to a jury trial or to participate in a class action lawsuit.'
          : 'Estos Términos se regirán e interpretarán de acuerdo con las leyes del Estado de California, Estados Unidos, sin tener en cuenta sus disposiciones sobre conflictos de leyes.\n\nCualquier disputa que surja de estos Términos o de su uso de la Aplicación se resolverá mediante:\n1. Negociación de buena fe entre las partes\n2. Si la negociación falla, arbitraje vinculante en San Francisco, California\n3. El arbitraje se llevará a cabo de acuerdo con las reglas de la Asociación Americana de Arbitraje\n\nUsted acepta renunciar a cualquier derecho a un juicio por jurado o a participar en una demanda colectiva.'
      },
      {
        title: currentLanguage === 'en' ? '12. Contact Information' : '12. Información de Contacto',
        content: currentLanguage === 'en'
          ? 'If you have any questions, concerns, or feedback about these Terms or the App, please contact us:\n\nChyrris Technologies\nEmail: info@chyrris.com\nWebsite: https://chyrris.com\nSupport: https://chyrris.com/pocima-salvaje/support\n\nWe strive to respond to all inquiries within 48 hours during business days.'
          : 'Si tiene alguna pregunta, inquietud o comentario sobre estos Términos o la Aplicación, por favor contáctenos:\n\nChyrris Technologies\nEmail: info@chyrris.com\nSitio web: https://chyrris.com\nSoporte: https://chyrris.com/pocima-salvaje/support\n\nNos esforzamos por responder a todas las consultas dentro de 48 horas durante días hábiles.'
      },
      {
        title: currentLanguage === 'en' ? '13. Entire Agreement' : '13. Acuerdo Completo',
        content: currentLanguage === 'en'
          ? 'These Terms, together with our Privacy Policy, constitute the entire agreement between you and Chyrris Technologies regarding your use of Pócima Salvaje.\n\nThese Terms supersede any prior agreements or understandings, whether written or oral, regarding the subject matter herein.\n\nIf any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.'
          : 'Estos Términos, junto con nuestra Política de Privacidad, constituyen el acuerdo completo entre usted y Chyrris Technologies con respecto a su uso de Pócima Salvaje.\n\nEstos Términos reemplazan cualquier acuerdo o entendimiento previo, ya sea escrito u oral, con respecto al tema aquí tratado.\n\nSi alguna disposición de estos Términos se considera inválida o inaplicable, las disposiciones restantes permanecerán en pleno vigor y efecto.'
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
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[#4cc4ff] mb-4">
              {content.title}
            </h1>
            <p className="text-xl text-[#35ffdd] mb-4">{content.subtitle}</p>
            <p className="text-sm text-gray-400">
              {content.lastUpdated}: {content.date}
            </p>
          </div>

          {/* Introduction */}
          <div className="bg-[#0f1419]/60 backdrop-blur-sm border border-[#4cc4ff]/20 rounded-2xl p-8 mb-8">
            <p className="text-gray-300 leading-relaxed whitespace-pre-line">
              {content.introduction}
            </p>
          </div>

          {/* Sections */}
          {content.sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-[#0f1419]/40 backdrop-blur-sm border border-[#4cc4ff]/10 rounded-2xl p-8 mb-6"
            >
              <h2 className="text-2xl font-bold text-[#4cc4ff] mb-4">
                {section.title}
              </h2>
              <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                {section.content}
              </div>
            </motion.div>
          ))}

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
