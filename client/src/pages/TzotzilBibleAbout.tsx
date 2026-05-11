import { motion } from "framer-motion";
import { Link } from "wouter";
import { useLanguage } from "../hooks/useLanguage";
import { ParticleBackground } from "../components/ParticleBackground";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { Footer } from "../sections/Footer";
import chyrrisBrandLogo from "@/assets/chyrris-brand-lockup.webp";

export default function TzotzilBibleAbout() {
  const { currentLanguage } = useLanguage();

  const content = {
    title: currentLanguage === 'en' ? 'About Tzotzil Bible' : 'Acerca de Tzotzil Bible',
    subtitle: currentLanguage === 'en' ? 'Preserving Culture Through Sacred Scripture' : 'Preservando la Cultura a Través de las Sagradas Escrituras',
    backToHome: currentLanguage === 'en' ? 'Back to Home' : 'Volver al Inicio',
    
    mission: {
      title: currentLanguage === 'en' ? 'Our Mission' : 'Nuestra Misión',
      content: currentLanguage === 'en'
        ? 'Tzotzil Bible is dedicated to making sacred scripture accessible to indigenous Tzotzil-speaking communities while preserving their cultural and linguistic heritage. We believe that everyone should have the opportunity to read and understand the Bible in their native language, fostering spiritual growth and cultural pride.'
        : 'Tzotzil Bible está dedicada a hacer que las sagradas escrituras sean accesibles para las comunidades indígenas de habla tzotzil, mientras preservamos su herencia cultural y lingüística. Creemos que todos deberían tener la oportunidad de leer y comprender la Biblia en su idioma nativo, fomentando el crecimiento espiritual y el orgullo cultural.'
    },
    
    features: [
      {
        icon: '📖',
        title: currentLanguage === 'en' ? 'Bilingual Scripture' : 'Escrituras Bilingües',
        desc: currentLanguage === 'en'
          ? 'Complete Bible available in Spanish and Tzotzil dialect, with side-by-side comparison for enhanced understanding and language learning.'
          : 'Biblia completa disponible en español y dialecto tzotzil, con comparación lado a lado para mejorar la comprensión y el aprendizaje del idioma.'
      },
      {
        icon: '🤖',
        title: currentLanguage === 'en' ? 'Nevin AI Assistant' : 'Asistente IA Nevin',
        desc: currentLanguage === 'en'
          ? 'An AI-powered spiritual companion trained exclusively on biblical teachings. Nevin provides contextual answers, references Ellen G. White\'s writings, and offers guidance grounded in scripture.'
          : 'Un compañero espiritual impulsado por IA entrenado exclusivamente en enseñanzas bíblicas. Nevin proporciona respuestas contextuales, referencias de los escritos de Ellen G. White y ofrece orientación basada en las escrituras.'
      },
      {
        icon: '📚',
        title: currentLanguage === 'en' ? 'Reading Plans' : 'Planes de Lectura',
        desc: currentLanguage === 'en'
          ? 'Structured reading plans including Canonical (1 year), Chronological (1 year), and Historical (1 year) paths. Track your progress with daily reminders and completion statistics.'
          : 'Planes de lectura estructurados que incluyen rutas Canónica (1 año), Cronológica (1 año) e Histórica (1 año). Rastrea tu progreso con recordatorios diarios y estadísticas de finalización.'
      },
      {
        icon: '🌍',
        title: currentLanguage === 'en' ? 'Cultural Preservation' : 'Preservación Cultural',
        desc: currentLanguage === 'en'
          ? 'Supporting indigenous Tzotzil communities by preserving their language in digital form, ensuring future generations can access scripture in their ancestral tongue.'
          : 'Apoyando a las comunidades indígenas tzotziles al preservar su idioma en forma digital, asegurando que las futuras generaciones puedan acceder a las escrituras en su lengua ancestral.'
      },
      {
        icon: '🔍',
        title: currentLanguage === 'en' ? 'Advanced Search' : 'Búsqueda Avanzada',
        desc: currentLanguage === 'en'
          ? 'Powerful search functionality across all Bible versions. Find verses by keyword, reference, or theme instantly in both Spanish and Tzotzil.'
          : 'Potente funcionalidad de búsqueda en todas las versiones de la Biblia. Encuentra versículos por palabra clave, referencia o tema instantáneamente en español y tzotzil.'
      },
      {
        icon: '📱',
        title: currentLanguage === 'en' ? 'Offline Access' : 'Acceso Sin Conexión',
        desc: currentLanguage === 'en'
          ? 'Full offline functionality ensures you can access scripture anywhere, anytime. Perfect for remote communities with limited internet connectivity.'
          : 'Funcionalidad completa sin conexión asegura que puedas acceder a las escrituras en cualquier lugar, en cualquier momento. Perfecto para comunidades remotas con conectividad limitada a internet.'
      }
    ],
    
    technology: {
      title: currentLanguage === 'en' ? 'Technology Stack' : 'Tecnología',
      content: currentLanguage === 'en'
        ? 'Built with modern technologies including React Native for cross-platform mobile development, SQLite for efficient offline data storage, and Claude AI (Anthropic) for the Nevin assistant. The app is optimized for performance on low-end devices, ensuring accessibility for all users.'
        : 'Construida con tecnologías modernas incluyendo React Native para desarrollo móvil multiplataforma, SQLite para almacenamiento eficiente de datos sin conexión, y Claude AI (Anthropic) para el asistente Nevin. La aplicación está optimizada para rendimiento en dispositivos de gama baja, asegurando accesibilidad para todos los usuarios.'
    },
    
    versions: {
      title: currentLanguage === 'en' ? 'Available Bible Versions' : 'Versiones Bíblicas Disponibles',
      list: [
        {
          name: 'Tzotzil',
          desc: currentLanguage === 'en' ? 'Indigenous Tzotzil dialect translation' : 'Traducción en dialecto tzotzil indígena'
        },
        {
          name: 'RV1960',
          desc: currentLanguage === 'en' ? 'Reina-Valera 1960 (Spanish)' : 'Reina-Valera 1960 (Español)'
        },
        {
          name: 'NVI',
          desc: currentLanguage === 'en' ? 'Nueva Versión Internacional (Spanish)' : 'Nueva Versión Internacional (Español)'
        },
        {
          name: 'TLA',
          desc: currentLanguage === 'en' ? 'Traducción en Lenguaje Actual (Spanish)' : 'Traducción en Lenguaje Actual (Español)'
        },
        {
          name: 'DHH',
          desc: currentLanguage === 'en' ? 'Dios Habla Hoy (Spanish)' : 'Dios Habla Hoy (Español)'
        }
      ]
    },
    
    impact: {
      title: currentLanguage === 'en' ? 'Community Impact' : 'Impacto Comunitario',
      content: currentLanguage === 'en'
        ? 'Tzotzil Bible serves over 500,000 Tzotzil speakers across Chiapas, Mexico, and diaspora communities worldwide. By providing scripture in their native language, we empower indigenous communities to engage with their faith while preserving their linguistic and cultural identity for future generations.'
        : 'Tzotzil Bible sirve a más de 500,000 hablantes de tzotzil en Chiapas, México, y comunidades de la diáspora en todo el mundo. Al proporcionar las escrituras en su idioma nativo, empoderamos a las comunidades indígenas para que se involucren con su fe mientras preservan su identidad lingüística y cultural para las futuras generaciones.'
    }
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
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-[#f5b308] mb-4">{content.title}</h1>
              <p className="text-[#4cc4ff] text-xl font-rajdhani">{content.subtitle}</p>
            </div>
            
            {/* Mission */}
            <div className="mb-16 p-8 rounded-2xl bg-[#0f1419]/80 backdrop-blur-xl border border-[#4cc4ff]/10">
              <h2 className="text-2xl font-bold text-[#f5b308] mb-4">{content.mission.title}</h2>
              <p className="text-gray-300 text-lg font-rajdhani leading-relaxed">{content.mission.content}</p>
            </div>
            
            {/* Features Grid */}
            <div className="mb-16">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {content.features.map((feature, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="p-6 rounded-2xl bg-[#0f1419]/80 backdrop-blur-xl border border-[#4cc4ff]/10 hover:border-[#f5b308]/30 transition-all group"
                  >
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{feature.icon}</div>
                    <h3 className="text-white font-bold mb-3 text-lg group-hover:text-[#f5b308] transition-colors">{feature.title}</h3>
                    <p className="text-gray-400 text-sm font-rajdhani leading-relaxed">{feature.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Bible Versions */}
            <div className="mb-16 p-8 rounded-2xl bg-[#0f1419]/80 backdrop-blur-xl border border-[#4cc4ff]/10">
              <h2 className="text-2xl font-bold text-[#f5b308] mb-6">{content.versions.title}</h2>
              <div className="space-y-4">
                {content.versions.list.map((version, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-[#4cc4ff]"></div>
                    <div>
                      <h3 className="text-white font-bold">{version.name}</h3>
                      <p className="text-gray-400 font-rajdhani">{version.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Technology */}
            <div className="mb-16 p-8 rounded-2xl bg-[#0f1419]/80 backdrop-blur-xl border border-[#4cc4ff]/10">
              <h2 className="text-2xl font-bold text-[#f5b308] mb-4">{content.technology.title}</h2>
              <p className="text-gray-300 text-lg font-rajdhani leading-relaxed">{content.technology.content}</p>
            </div>
            
            {/* Impact */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-[#f5b308]/10 to-[#4cc4ff]/10 backdrop-blur-xl border border-[#f5b308]/20">
              <h2 className="text-2xl font-bold text-[#f5b308] mb-4">{content.impact.title}</h2>
              <p className="text-gray-300 text-lg font-rajdhani leading-relaxed">{content.impact.content}</p>
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
