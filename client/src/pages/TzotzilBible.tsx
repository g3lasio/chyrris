import { motion } from "framer-motion";
import { Link } from "wouter";
import { useLanguage } from "../hooks/useLanguage";
import { ParticleBackground } from "../components/ParticleBackground";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { Footer } from "../sections/Footer";
import bannerImage from "@assets/Tzotzil_Bible_1766730387872.png";

export default function TzotzilBible() {
  const { currentLanguage } = useLanguage();

  const content = {
    title: 'Tzotzil Bible',
    subtitle: currentLanguage === 'en' ? 'By Chyrris Technologies' : 'Por Chyrris Technologies',
    description: currentLanguage === 'en' 
      ? 'The first bilingual Bible application featuring Spanish and Tzotzil dialect translations. Experience sacred scripture in your native language with Nevin, an AI-powered assistant that provides spiritual guidance based entirely on biblical teachings.'
      : 'La primera aplicación bíblica bilingüe con traducciones en español y dialecto tzotzil. Experimenta las sagradas escrituras en tu idioma nativo con Nevin, un asistente impulsado por IA que proporciona guía espiritual basada completamente en las enseñanzas bíblicas.',
    features: [
      {
        icon: '📖',
        title: currentLanguage === 'en' ? 'Bilingual Scripture' : 'Escrituras Bilingües',
        desc: currentLanguage === 'en' 
          ? 'Complete Bible in Spanish and Tzotzil dialect'
          : 'Biblia completa en español y dialecto tzotzil'
      },
      {
        icon: '🤖',
        title: currentLanguage === 'en' ? 'Nevin AI Assistant' : 'Asistente IA Nevin',
        desc: currentLanguage === 'en'
          ? 'Get answers to spiritual questions based on scripture'
          : 'Obtén respuestas a preguntas espirituales basadas en las escrituras'
      },
      {
        icon: '🌍',
        title: currentLanguage === 'en' ? 'Cultural Preservation' : 'Preservación Cultural',
        desc: currentLanguage === 'en'
          ? 'Supporting indigenous communities through language preservation'
          : 'Apoyando a las comunidades indígenas a través de la preservación del idioma'
      },
      {
        icon: '📱',
        title: currentLanguage === 'en' ? 'User-Friendly' : 'Fácil de Usar',
        desc: currentLanguage === 'en'
          ? 'Intuitive design with bookmarks, notes, and search'
          : 'Diseño intuitivo con marcadores, notas y búsqueda'
      }
    ],
    openApp: currentLanguage === 'en' ? 'Open App' : 'Abrir Aplicación',
    privacyPolicy: currentLanguage === 'en' ? 'Privacy Policy' : 'Política de Privacidad',
    backToHome: currentLanguage === 'en' ? 'Back to Home' : 'Volver al Inicio'
  };

  return (
    <main className="hex-bg min-h-screen relative overflow-x-hidden">
      <ParticleBackground />
      
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 w-full z-50 py-2 bg-[#12172199] backdrop-blur-md"
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link href="/">
              <div className="flex items-center space-x-2 text-[#4cc4ff] hover:text-[#35ffdd] cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                <span className="hidden sm:inline">{content.backToHome}</span>
              </div>
            </Link>
            
            <div className="flex items-center space-x-4">
              <LanguageSwitcher variant="minimal" />
              <div className="relative rounded-lg flex justify-center items-center p-2 border border-[#4cc4ff40] bg-[#1a202c99] backdrop-blur-md">
                <img src="https://i.postimg.cc/Cx6ZzsQS/Logo-chyrris.png" alt="CHYRRIS" className="h-8" />
              </div>
            </div>
          </div>
        </div>
      </motion.nav>
      
      <section className="pt-20">
        <motion.div 
          className="w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img 
            src={bannerImage} 
            alt="Tzotzil Bible" 
            className="w-full h-auto max-h-[400px] object-cover object-center"
          />
        </motion.div>
        
        <div className="container mx-auto px-4 py-12">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-[#f5b308] mb-2">{content.title}</h1>
            <p className="text-[#4cc4ff] text-lg mb-6">{content.subtitle}</p>
            
            <p className="text-gray-300 text-lg font-rajdhani mb-8 max-w-2xl mx-auto">
              {content.description}
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <a 
                href="https://bible.chyrris.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-8 py-4 bg-[#f5b308] hover:bg-[#e5a308] text-white font-bold rounded-lg text-lg uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                data-testid="button-open-app"
              >
                {content.openApp}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
              
              <Link href="/tzotzil-bible/privacy">
                <div 
                  className="px-8 py-4 border-2 border-[#4cc4ff] text-[#4cc4ff] hover:bg-[#4cc4ff20] font-bold rounded-lg text-lg uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2"
                  data-testid="button-privacy-policy"
                >
                  {content.privacyPolicy}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {content.features.map((feature, index) => (
              <div 
                key={index}
                className="bg-[#1a202c99] border border-[#4cc4ff30] rounded-lg p-6 text-center hover:border-[#f5b308] transition-colors"
              >
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="text-[#4cc4ff] font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm font-rajdhani">{feature.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
