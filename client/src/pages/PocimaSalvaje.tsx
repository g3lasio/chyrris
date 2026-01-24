import { motion } from "framer-motion";
import { Link } from "wouter";
import { useLanguage } from "../hooks/useLanguage";
import { ParticleBackground } from "../components/ParticleBackground";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { Footer } from "../sections/Footer";

export default function PocimaSalvaje() {
  const { currentLanguage } = useLanguage();
  
  const content = {
    title: currentLanguage === 'en' ? 'Pócima Salvaje' : 'Pócima Salvaje',
    subtitle: currentLanguage === 'en' ? 'Natural Medicine & Medicinal Plants' : 'Medicina Natural y Plantas Medicinales',
    tagline: currentLanguage === 'en' ? 'Your AI-powered guide to natural healing' : 'Tu guía impulsada por IA para la sanación natural',
    description: currentLanguage === 'en'
      ? 'Pócima Salvaje is a comprehensive mobile application that combines traditional knowledge of medicinal plants with cutting-edge AI technology. Discover natural remedies, consult with our AI doctor MolDoctor, and explore the healing power of plants.'
      : 'Pócima Salvaje es una aplicación móvil completa que combina el conocimiento tradicional de plantas medicinales con tecnología de IA de vanguardia. Descubre remedios naturales, consulta con nuestro doctor IA MolDoctor y explora el poder curativo de las plantas.',
    
    features: {
      title: currentLanguage === 'en' ? 'Key Features' : 'Características Principales',
      items: [
        {
          icon: '🌿',
          title: currentLanguage === 'en' ? 'Comprehensive Database' : 'Base de Datos Completa',
          description: currentLanguage === 'en'
            ? '693 medicinal plants with detailed information including properties, preparation methods, dosage, and contraindications.'
            : '693 plantas medicinales con información detallada incluyendo propiedades, métodos de preparación, dosis y contraindicaciones.'
        },
        {
          icon: '🏥',
          title: currentLanguage === 'en' ? 'Health Conditions Library' : 'Biblioteca de Condiciones de Salud',
          description: currentLanguage === 'en'
            ? '482 health conditions with natural treatment recommendations organized by body system.'
            : '482 condiciones de salud con recomendaciones de tratamiento natural organizadas por sistema corporal.'
        },
        {
          icon: '🤖',
          title: currentLanguage === 'en' ? 'MolDoctor AI Assistant' : 'Asistente IA MolDoctor',
          description: currentLanguage === 'en'
            ? 'AI-powered virtual doctor that provides educational health consultations and personalized plant recommendations.'
            : 'Doctor virtual impulsado por IA que proporciona consultas educativas de salud y recomendaciones personalizadas de plantas.'
        },
        {
          icon: '📸',
          title: currentLanguage === 'en' ? 'Image Analysis' : 'Análisis de Imágenes',
          description: currentLanguage === 'en'
            ? 'Upload photos of symptoms or medical documents for AI-powered analysis and OCR text extraction.'
            : 'Sube fotos de síntomas o documentos médicos para análisis con IA y extracción de texto OCR.'
        },
        {
          icon: '🔍',
          title: currentLanguage === 'en' ? 'Smart Search' : 'Búsqueda Inteligente',
          description: currentLanguage === 'en'
            ? 'Search by plant name, health condition, or body system. Save favorites for quick access.'
            : 'Busca por nombre de planta, condición de salud o sistema corporal. Guarda favoritos para acceso rápido.'
        },
        {
          icon: '🎨',
          title: currentLanguage === 'en' ? 'Beautiful Interface' : 'Interfaz Hermosa',
          description: currentLanguage === 'en'
            ? 'Futuristic holographic design inspired by JARVIS technology for an immersive experience.'
            : 'Diseño holográfico futurista inspirado en la tecnología JARVIS para una experiencia inmersiva.'
        }
      ]
    },
    
    moldoctor: {
      title: currentLanguage === 'en' ? 'Meet MolDoctor' : 'Conoce a MolDoctor',
      subtitle: currentLanguage === 'en' ? 'Your AI Medical Assistant' : 'Tu Asistente Médico IA',
      description: currentLanguage === 'en'
        ? 'MolDoctor is an AI-powered virtual doctor specialized in natural medicine and medicinal plants. With advanced vision capabilities, MolDoctor can analyze images, extract text from medical documents, and provide educational health consultations with a touch of humor.'
        : 'MolDoctor es un doctor virtual impulsado por IA especializado en medicina natural y plantas medicinales. Con capacidades avanzadas de visión, MolDoctor puede analizar imágenes, extraer texto de documentos médicos y proporcionar consultas educativas de salud con un toque de humor.',
      capabilities: [
        currentLanguage === 'en' ? 'Educational health consultations' : 'Consultas educativas de salud',
        currentLanguage === 'en' ? 'Symptom analysis and guidance' : 'Análisis de síntomas y orientación',
        currentLanguage === 'en' ? 'Medical document OCR and interpretation' : 'OCR e interpretación de documentos médicos',
        currentLanguage === 'en' ? 'Personalized plant recommendations' : 'Recomendaciones personalizadas de plantas',
        currentLanguage === 'en' ? 'Voice input and output' : 'Entrada y salida por voz'
      ]
    },
    
    disclaimer: {
      title: currentLanguage === 'en' ? 'Important Medical Disclaimer' : 'Aviso Médico Importante',
      content: currentLanguage === 'en'
        ? 'Pócima Salvaje is designed for educational and informational purposes only. The information provided does NOT constitute medical advice, diagnosis, or treatment. Always consult a qualified healthcare professional before using any natural remedy or making health decisions.'
        : 'Pócima Salvaje está diseñada únicamente con fines educativos e informativos. La información proporcionada NO constituye consejo médico, diagnóstico o tratamiento. Siempre consulte a un profesional de salud calificado antes de usar cualquier remedio natural o tomar decisiones de salud.'
    },
    
    availability: {
      title: currentLanguage === 'en' ? 'Coming Soon' : 'Próximamente',
      description: currentLanguage === 'en'
        ? 'Pócima Salvaje will be available soon on iOS and Android. Stay tuned for the launch!'
        : 'Pócima Salvaje estará disponible pronto en iOS y Android. ¡Mantente atento al lanzamiento!',
      platforms: [
        {
          name: 'App Store',
          icon: '🍎',
          status: currentLanguage === 'en' ? 'Coming Soon' : 'Próximamente'
        },
        {
          name: 'Google Play',
          icon: '🤖',
          status: currentLanguage === 'en' ? 'Coming Soon' : 'Próximamente'
        }
      ]
    },
    
    links: {
      privacy: currentLanguage === 'en' ? 'Privacy Policy' : 'Política de Privacidad',
      terms: currentLanguage === 'en' ? 'Terms of Service' : 'Términos de Servicio',
      support: currentLanguage === 'en' ? 'Support & Help' : 'Soporte y Ayuda',
      contact: currentLanguage === 'en' ? 'Contact Us' : 'Contáctanos'
    },
    
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

      {/* Hero Section */}
      <div className="container mx-auto px-6 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto text-center"
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <img 
              src="/attached_assets/pocima-salvaje-logo.png" 
              alt="Pócima Salvaje" 
              className="h-32 w-32 mx-auto rounded-2xl shadow-2xl"
            />
          </motion.div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-bold text-[#4cc4ff] mb-4">
            {content.title}
          </h1>
          <p className="text-2xl md:text-3xl text-[#35ffdd] mb-6">{content.subtitle}</p>
          <p className="text-xl text-gray-400 mb-8">{content.tagline}</p>
          
          {/* Description */}
          <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto mb-12">
            {content.description}
          </p>

          {/* Availability */}
          <div className="bg-[#0f1419]/60 backdrop-blur-sm border border-[#35ffdd]/20 rounded-2xl p-8 mb-12">
            <h2 className="text-3xl font-bold text-[#35ffdd] mb-4">{content.availability.title}</h2>
            <p className="text-gray-300 mb-6">{content.availability.description}</p>
            <div className="flex justify-center gap-6">
              {content.availability.platforms.map((platform, index) => (
                <div key={index} className="flex items-center gap-3 bg-[#0a0d12]/60 px-6 py-3 rounded-lg border border-[#4cc4ff]/20">
                  <span className="text-3xl">{platform.icon}</span>
                  <div className="text-left">
                    <div className="text-white font-semibold">{platform.name}</div>
                    <div className="text-sm text-[#35ffdd]">{platform.status}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-6xl mx-auto mb-20"
        >
          <h2 className="text-4xl font-bold text-[#4cc4ff] text-center mb-12">
            {content.features.title}
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.features.items.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="bg-[#0f1419]/60 backdrop-blur-sm border border-[#4cc4ff]/20 rounded-2xl p-6 hover:border-[#4cc4ff]/40 transition-colors"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-[#35ffdd] mb-3">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* MolDoctor Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="max-w-4xl mx-auto mb-20"
        >
          <div className="bg-gradient-to-r from-[#4cc4ff]/20 to-[#35ffdd]/20 border border-[#4cc4ff]/40 rounded-2xl p-8">
            <div className="text-center mb-6">
              <span className="text-6xl mb-4 block">🤖🩺</span>
              <h2 className="text-3xl font-bold text-[#4cc4ff] mb-2">{content.moldoctor.title}</h2>
              <p className="text-xl text-[#35ffdd]">{content.moldoctor.subtitle}</p>
            </div>
            
            <p className="text-gray-300 leading-relaxed mb-6">
              {content.moldoctor.description}
            </p>
            
            <div className="space-y-3">
              {content.moldoctor.capabilities.map((capability, index) => (
                <div key={index} className="flex items-center gap-3">
                  <svg className="h-5 w-5 text-[#35ffdd]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300">{capability}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="max-w-4xl mx-auto mb-20"
        >
          <div className="bg-[#e62e2e]/10 border border-[#e62e2e]/30 rounded-2xl p-8">
            <div className="flex items-start gap-4">
              <svg className="h-8 w-8 text-[#e62e2e] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="text-xl font-bold text-[#e62e2e] mb-3">{content.disclaimer.title}</h3>
                <p className="text-gray-300 leading-relaxed">{content.disclaimer.content}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Links Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/pocima-salvaje/privacy">
              <div className="bg-[#0f1419]/60 backdrop-blur-sm border border-[#4cc4ff]/20 rounded-xl p-6 hover:border-[#4cc4ff]/40 transition-colors cursor-pointer text-center">
                <svg className="h-8 w-8 text-[#4cc4ff] mx-auto mb-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <h4 className="text-white font-semibold">{content.links.privacy}</h4>
              </div>
            </Link>

            <Link href="/pocima-salvaje/terms">
              <div className="bg-[#0f1419]/60 backdrop-blur-sm border border-[#4cc4ff]/20 rounded-xl p-6 hover:border-[#4cc4ff]/40 transition-colors cursor-pointer text-center">
                <svg className="h-8 w-8 text-[#4cc4ff] mx-auto mb-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                </svg>
                <h4 className="text-white font-semibold">{content.links.terms}</h4>
              </div>
            </Link>

            <Link href="/pocima-salvaje/support">
              <div className="bg-[#0f1419]/60 backdrop-blur-sm border border-[#4cc4ff]/20 rounded-xl p-6 hover:border-[#4cc4ff]/40 transition-colors cursor-pointer text-center">
                <svg className="h-8 w-8 text-[#4cc4ff] mx-auto mb-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z" clipRule="evenodd" />
                </svg>
                <h4 className="text-white font-semibold">{content.links.support}</h4>
              </div>
            </Link>
          </div>

          {/* Contact */}
          <div className="text-center mt-12">
            <p className="text-gray-400 mb-2">{content.links.contact}</p>
            <a href="mailto:info@chyrris.com" className="text-[#4cc4ff] hover:text-[#35ffdd] transition-colors font-semibold">
              info@chyrris.com
            </a>
          </div>
        </motion.div>

        {/* Footer note */}
        <div className="text-center mt-20 text-gray-400">
          <p>© 2026 Chyrris Technologies. All rights reserved.</p>
          <p className="mt-2 text-sm">Developed by Gelasio Sanchez Gomez</p>
        </div>
      </div>

      <Footer />
    </main>
  );
}
