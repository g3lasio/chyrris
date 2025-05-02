import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "wouter";
import { useLanguage } from "../hooks/useLanguage";
import { ParticleBackground } from "../components/ParticleBackground";
import { ScanEffect } from "../components/ScanEffect";
import { HudPanel } from "../components/HudPanel";
import { TechCircle } from "../components/TechCircle";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { Footer } from "../sections/Footer";

export default function TzotzilBible() {
  const { translations, currentLanguage } = useLanguage();
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'nevin'>('overview');

  // Bilingual content based on current language
  const content = {
    title: currentLanguage === 'en' ? 'Tzotzil Bible' : 'Biblia Tzotzil',
    overview: currentLanguage === 'en' 
      ? 'The first bilingual Bible with Spanish and Tzotzil dialect translations featuring Nevin, an AI assistant powered by advanced technology to answer life\'s questions through sacred scripture.'
      : 'La primera Biblia bilingüe con traducciones en español y dialecto tzotzil que presenta a Nevin, un asistente de IA impulsado por tecnología avanzada para responder las preguntas de la vida a través de las sagradas escrituras.',
    description: currentLanguage === 'en'
      ? 'Tzotzil Bible is a revolutionary application that bridges traditional scripture with cutting-edge AI technology. This application not only offers a complete bilingual Bible in Spanish and Tzotzil dialect, making spiritual texts accessible to indigenous communities, but also introduces Nevin - an advanced AI assistant specifically designed to help users explore and understand biblical teachings.'
      : 'Biblia Tzotzil es una aplicación revolucionaria que conecta las escrituras tradicionales con tecnología de IA de vanguardia. Esta aplicación no solo ofrece una Biblia bilingüe completa en español y dialecto tzotzil, haciendo que los textos espirituales sean accesibles para las comunidades indígenas, sino que también presenta a Nevin - un asistente de IA avanzado específicamente diseñado para ayudar a los usuarios a explorar y comprender las enseñanzas bíblicas.',
    missionTitle: currentLanguage === 'en' ? 'Our Mission' : 'Nuestra Misión',
    mission: currentLanguage === 'en'
      ? 'To make sacred texts accessible to all communities while providing intelligent spiritual guidance through innovative technology.'
      : 'Hacer que los textos sagrados sean accesibles para todas las comunidades mientras se proporciona una guía espiritual inteligente a través de tecnología innovadora.',
    featuresTitle: currentLanguage === 'en' ? 'Key Features' : 'Características Principales',
    features: [
      {
        title: currentLanguage === 'en' ? 'Bilingual Translations' : 'Traducciones Bilingües',
        description: currentLanguage === 'en' 
          ? 'Complete scripture available in both Spanish and Tzotzil dialect, with easy switching between languages.'
          : 'Escrituras completas disponibles tanto en español como en dialecto tzotzil, con fácil cambio entre idiomas.'
      },
      {
        title: currentLanguage === 'en' ? 'AI Scripture Assistant' : 'Asistente de Escrituras con IA',
        description: currentLanguage === 'en'
          ? 'Nevin, our AI assistant, provides biblically-based answers to life\'s questions and spiritual inquiries.'
          : 'Nevin, nuestro asistente de IA, proporciona respuestas basadas en la Biblia a las preguntas de la vida y consultas espirituales.'
      },
      {
        title: currentLanguage === 'en' ? 'Cultural Preservation' : 'Preservación Cultural',
        description: currentLanguage === 'en'
          ? 'Supporting indigenous communities by preserving and promoting the Tzotzil language through scripture.'
          : 'Apoyando a las comunidades indígenas mediante la preservación y promoción del idioma tzotzil a través de las escrituras.'
      },
      {
        title: currentLanguage === 'en' ? 'User-Friendly Interface' : 'Interfaz Amigable',
        description: currentLanguage === 'en'
          ? 'Intuitive design with advanced search capabilities, bookmarking, and personalized study tools.'
          : 'Diseño intuitivo con capacidades de búsqueda avanzadas, marcadores y herramientas de estudio personalizadas.'
      }
    ],
    nevinTitle: currentLanguage === 'en' ? 'Meet Nevin' : 'Conoce a Nevin',
    nevin: currentLanguage === 'en'
      ? 'Nevin is the first AI assistant specifically designed to explore and explain biblical teachings. Using advanced artificial intelligence, Nevin can understand questions about life, faith, and scripture, providing thoughtful answers based entirely on biblical texts. Whether you\'re seeking spiritual guidance, exploring theological concepts, or simply curious about biblical interpretations, Nevin offers a new way to engage with sacred writings.'
      : 'Nevin es el primer asistente de IA específicamente diseñado para explorar y explicar las enseñanzas bíblicas. Utilizando inteligencia artificial avanzada, Nevin puede entender preguntas sobre la vida, la fe y las escrituras, proporcionando respuestas reflexivas basadas completamente en textos bíblicos. Ya sea que estés buscando guía espiritual, explorando conceptos teológicos o simplemente tengas curiosidad sobre interpretaciones bíblicas, Nevin ofrece una nueva forma de interactuar con los escritos sagrados.',
    nevinCapabilities: [
      currentLanguage === 'en' ? 'Answers questions based on scripture' : 'Responde preguntas basadas en las escrituras',
      currentLanguage === 'en' ? 'Provides relevant biblical passages' : 'Proporciona pasajes bíblicos relevantes',
      currentLanguage === 'en' ? 'Offers spiritual guidance' : 'Ofrece guía espiritual',
      currentLanguage === 'en' ? 'Available in both Spanish and Tzotzil' : 'Disponible tanto en español como en tzotzil'
    ],
    downloadTitle: currentLanguage === 'en' ? 'Download Now' : 'Descarga Ahora',
    privacyPolicyLink: currentLanguage === 'en' ? 'Privacy Policy' : 'Política de Privacidad',
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
            <Link href="/">
              <div className="flex items-center space-x-2 text-[#4cc4ff] hover:text-[#35ffdd] cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                <span>{content.backToHome}</span>
              </div>
            </Link>
            
            <div className="w-1/3 flex justify-center">
              <div className="relative rounded-lg flex justify-center items-center p-3 border border-[#4cc4ff40] bg-[#1a202c99] backdrop-blur-md">
                <img src="https://i.postimg.cc/Cx6ZzsQS/Logo-chyrris.png" alt="CHYRRIS" className="h-10" />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <LanguageSwitcher variant="minimal" />
              <Link href="/tzotzil-bible/privacy">
                <div className="text-[#4cc4ff] hover:text-[#35ffdd] text-sm uppercase cursor-pointer">
                  {content.privacyPolicyLink}
                </div>
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>
      
      {/* App Header Section */}
      <section className="min-h-[60vh] flex items-center pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div 
                className="inline-block tech-border px-3 py-1 rounded-full text-sm text-[#f5b308]"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <span className="mr-2">●</span>
                TZOTZIL BIBLE
              </motion.div>
              
              <motion.h1 
                className="text-4xl md:text-5xl font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <span className="text-[#f5b308] glow-text">{content.title}</span>
              </motion.h1>
              
              <motion.p 
                className="text-gray-300 md:text-lg font-rajdhani"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                {content.overview}
              </motion.p>
              
              <motion.div 
                className="flex flex-wrap gap-4 pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                <button 
                  className="px-6 py-3 rounded bg-[#f5b308] hover:bg-opacity-90 transition text-white uppercase tracking-wider text-sm flex items-center"
                >
                  {content.downloadTitle}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </motion.div>
            </motion.div>
            
            <div className="relative aspect-square max-w-md mx-auto">
              <TechCircle size="lg" color="gold" className="mx-auto">
                <div className="absolute inset-0 rotate-45 opacity-20 animate-rotate-slow">
                  <img 
                    src="https://images.unsplash.com/photo-1590595978583-3967cf17d2ea" 
                    alt="Bible background" 
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div 
                  className="absolute inset-8 -rotate-45 opacity-30" 
                  style={{animation: "rotate 15s linear infinite reverse"}}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1504052434569-70ad5836ab65" 
                    alt="Bible text" 
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="absolute inset-16 opacity-50">
                  <img 
                    src="https://images.unsplash.com/photo-1606044466411-207a9a49711f" 
                    alt="AI concept" 
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </TechCircle>
            </div>
          </div>
        </div>
      </section>
      
      {/* Tabs for different sections */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-center space-x-4 mb-8">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-full border ${activeTab === 'overview' ? 'bg-[#f5b308] text-white border-[#f5b308]' : 'border-[#4cc4ff40] text-[#4cc4ff] hover:bg-[#4cc4ff10]'}`}
            >
              {currentLanguage === 'en' ? 'Overview' : 'Resumen'}
            </button>
            <button 
              onClick={() => setActiveTab('features')}
              className={`px-4 py-2 rounded-full border ${activeTab === 'features' ? 'bg-[#f5b308] text-white border-[#f5b308]' : 'border-[#4cc4ff40] text-[#4cc4ff] hover:bg-[#4cc4ff10]'}`}
            >
              {currentLanguage === 'en' ? 'Features' : 'Características'}
            </button>
            <button 
              onClick={() => setActiveTab('nevin')}
              className={`px-4 py-2 rounded-full border ${activeTab === 'nevin' ? 'bg-[#f5b308] text-white border-[#f5b308]' : 'border-[#4cc4ff40] text-[#4cc4ff] hover:bg-[#4cc4ff10]'}`}
            >
              Nevin AI
            </button>
          </div>
          
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid md:grid-cols-2 gap-8">
                <HudPanel code="APP-DESC" title={content.title}>
                  <p className="text-gray-300 font-rajdhani mt-4">
                    {content.description}
                  </p>
                  
                  <div className="mt-6">
                    <h3 className="text-[#f5b308] text-lg font-bold mb-2">{content.missionTitle}</h3>
                    <p className="text-gray-300 font-rajdhani">
                      {content.mission}
                    </p>
                  </div>
                  
                  <div className="mt-8 flex justify-center">
                    <img 
                      src="https://images.unsplash.com/photo-1491841550275-ad7854e35ca6" 
                      alt="Bible study" 
                      className="rounded-lg w-full max-w-md object-cover h-48"
                    />
                  </div>
                </HudPanel>
                
                <div className="space-y-8">
                  <HudPanel code="APP-LANG" title={currentLanguage === 'en' ? 'Bilingual Support' : 'Soporte Bilingüe'}>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="bg-[#12172180] border border-[#4cc4ff30] rounded-md p-4">
                        <h4 className="text-[#4cc4ff] font-bold">Español</h4>
                        <p className="text-gray-300 font-rajdhani mt-2">
                          {currentLanguage === 'en' 
                            ? 'Complete Spanish translation of the Bible with modern language adaptations for clarity and understanding.'
                            : 'Traducción completa de la Biblia en español con adaptaciones de lenguaje moderno para mayor claridad y comprensión.'}
                        </p>
                      </div>
                      
                      <div className="bg-[#12172180] border border-[#4cc4ff30] rounded-md p-4">
                        <h4 className="text-[#f5b308] font-bold">Tzotzil</h4>
                        <p className="text-gray-300 font-rajdhani mt-2">
                          {currentLanguage === 'en'
                            ? 'Authentic Tzotzil dialect translation, preserving the indigenous language and making scripture accessible to native communities.'
                            : 'Traducción auténtica en dialecto tzotzil, preservando el idioma indígena y haciendo las escrituras accesibles a las comunidades nativas.'}
                        </p>
                      </div>
                    </div>
                  </HudPanel>
                  
                  <HudPanel code="APP-TECH" title={currentLanguage === 'en' ? 'Innovative Technology' : 'Tecnología Innovadora'}>
                    <div className="mt-4">
                      <div className="flex items-center mb-3">
                        <div className="h-3 w-3 bg-[#e62e2e] rounded-full animate-pulse mr-3"></div>
                        <p className="text-[#4cc4ff] text-sm uppercase tracking-wider">
                          {currentLanguage === 'en' ? 'AI-POWERED GUIDANCE' : 'GUÍA IMPULSADA POR IA'}
                        </p>
                      </div>
                      
                      <p className="text-gray-300 font-rajdhani">
                        {currentLanguage === 'en'
                          ? 'Leveraging advanced artificial intelligence to provide contextual understanding of biblical teachings. Nevin, our AI assistant, offers insights and answers based entirely on scripture.'
                          : 'Aprovechando la inteligencia artificial avanzada para proporcionar una comprensión contextual de las enseñanzas bíblicas. Nevin, nuestro asistente de IA, ofrece perspectivas y respuestas basadas completamente en las escrituras.'}
                      </p>
                    </div>
                  </HudPanel>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Features Tab */}
          {activeTab === 'features' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold inline-block relative">
                  <span className="text-[#f5b308] glow-text">{content.featuresTitle}</span>
                  <div className="h-1 w-full bg-[#f5b308] mt-2"></div>
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {content.features.map((feature, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-[#12172180] border border-[#4cc4ff30] rounded-lg p-6 hover:border-[#f5b308] transition-colors"
                  >
                    <div className="flex items-center mb-3">
                      <div className="h-8 w-8 rounded-full bg-[#f5b30820] border border-[#f5b308] flex items-center justify-center mr-3">
                        <span className="text-[#f5b308] font-bold">{index + 1}</span>
                      </div>
                      <h3 className="text-[#4cc4ff] font-bold">{feature.title}</h3>
                    </div>
                    
                    <p className="text-gray-300 font-rajdhani pl-11">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-12 p-6 border border-[#4cc4ff30] rounded-lg bg-[#12172180]">
                <div className="flex items-center mb-4">
                  <div className="h-3 w-3 bg-[#e62e2e] rounded-full animate-pulse mr-3"></div>
                  <h3 className="text-[#f5b308] text-lg font-bold">
                    {currentLanguage === 'en' ? 'Coming Soon' : 'Próximamente'}
                  </h3>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 border border-dashed border-[#4cc4ff30] rounded-md">
                    <h4 className="text-[#4cc4ff] text-sm font-bold mb-2">
                      {currentLanguage === 'en' ? 'Audio Bible' : 'Biblia en Audio'}
                    </h4>
                    <p className="text-gray-300 text-sm font-rajdhani">
                      {currentLanguage === 'en'
                        ? 'Listen to scripture in both Spanish and Tzotzil with high-quality audio recordings.'
                        : 'Escucha las escrituras tanto en español como en tzotzil con grabaciones de audio de alta calidad.'}
                    </p>
                  </div>
                  
                  <div className="p-4 border border-dashed border-[#4cc4ff30] rounded-md">
                    <h4 className="text-[#4cc4ff] text-sm font-bold mb-2">
                      {currentLanguage === 'en' ? 'Study Groups' : 'Grupos de Estudio'}
                    </h4>
                    <p className="text-gray-300 text-sm font-rajdhani">
                      {currentLanguage === 'en'
                        ? 'Create and join virtual study groups for communal learning and discussion.'
                        : 'Crea y únete a grupos de estudio virtuales para el aprendizaje y la discusión comunal.'}
                    </p>
                  </div>
                  
                  <div className="p-4 border border-dashed border-[#4cc4ff30] rounded-md">
                    <h4 className="text-[#4cc4ff] text-sm font-bold mb-2">
                      {currentLanguage === 'en' ? 'Advanced Nevin Features' : 'Características Avanzadas de Nevin'}
                    </h4>
                    <p className="text-gray-300 text-sm font-rajdhani">
                      {currentLanguage === 'en'
                        ? 'Enhanced AI capabilities with personalized spiritual guidance and deeper theological insights.'
                        : 'Capacidades de IA mejoradas con guía espiritual personalizada y perspectivas teológicas más profundas.'}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Nevin AI Tab */}
          {activeTab === 'nevin' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <HudPanel code="NEVIN-AI" title={content.nevinTitle}>
                    <p className="text-gray-300 font-rajdhani mt-4">
                      {content.nevin}
                    </p>
                    
                    <div className="mt-6">
                      <h3 className="text-[#f5b308] text-lg font-bold mb-2">
                        {currentLanguage === 'en' ? 'Capabilities' : 'Capacidades'}
                      </h3>
                      <ul className="space-y-2 pl-2">
                        {content.nevinCapabilities.map((capability, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-[#4cc4ff] mr-2 mt-1">●</span>
                            <span className="text-gray-300 font-rajdhani">{capability}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </HudPanel>
                  
                  <div className="mt-8 p-6 border border-[#4cc4ff30] rounded-lg bg-[#12172180]">
                    <div className="flex items-center mb-4">
                      <div className="h-3 w-3 bg-[#4cc4ff] rounded-full animate-pulse mr-3"></div>
                      <h3 className="text-[#f5b308] font-bold">
                        {currentLanguage === 'en' ? 'Sample Interactions' : 'Ejemplos de Interacciones'}
                      </h3>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="p-3 bg-[#4cc4ff10] rounded-lg">
                        <p className="text-white font-semibold">
                          {currentLanguage === 'en' 
                            ? 'Question: "What does the Bible say about forgiveness?"'
                            : 'Pregunta: "¿Qué dice la Biblia sobre el perdón?"'}
                        </p>
                        <p className="text-gray-300 font-rajdhani mt-2 pl-4 border-l-2 border-[#4cc4ff]">
                          {currentLanguage === 'en'
                            ? 'Nevin: "The Bible speaks extensively about forgiveness. In Matthew 6:14-15, Jesus teaches that if you forgive others, your heavenly Father will forgive you. Colossians 3:13 instructs us to bear with each other and forgive one another. Forgiveness is a central theme throughout scripture, reflecting God\'s mercy toward humanity..."'
                            : 'Nevin: "La Biblia habla extensamente sobre el perdón. En Mateo 6:14-15, Jesús enseña que si perdonas a otros, tu Padre celestial te perdonará. Colosenses 3:13 nos instruye a soportarnos unos a otros y perdonarnos mutuamente. El perdón es un tema central en toda la escritura, reflejando la misericordia de Dios hacia la humanidad..."'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-[#f5b30810] to-[#4cc4ff10] rounded-lg blur-xl opacity-70"></div>
                  <div className="relative z-10 bg-[#12172180] border border-[#4cc4ff30] rounded-lg overflow-hidden">
                    <div className="p-2 bg-[#1a202c] border-b border-[#4cc4ff30]">
                      <div className="flex items-center">
                        <div className="h-3 w-3 bg-[#e62e2e] rounded-full mr-2"></div>
                        <div className="h-3 w-3 bg-[#f5b308] rounded-full mr-2"></div>
                        <div className="h-3 w-3 bg-[#4cc4ff] rounded-full mr-2"></div>
                        <span className="text-[#4cc4ff] text-xs ml-2">NEVIN.AI</span>
                      </div>
                    </div>
                    
                    <div className="p-6 max-h-96 overflow-y-auto">
                      <div className="flex justify-end mb-4">
                        <div className="bg-[#4cc4ff20] text-white p-3 rounded-lg rounded-tr-none max-w-xs">
                          {currentLanguage === 'en'
                            ? 'Hello Nevin, what does the Bible teach about hope?'
                            : 'Hola Nevin, ¿qué enseña la Biblia sobre la esperanza?'}
                        </div>
                      </div>
                      
                      <div className="flex mb-4">
                        <div className="h-8 w-8 rounded-full bg-[#f5b30820] border border-[#f5b308] flex items-center justify-center mr-2">
                          <span className="text-[#f5b308] font-bold">N</span>
                        </div>
                        <div className="bg-[#12172180] border border-[#4cc4ff30] text-gray-300 p-3 rounded-lg rounded-tl-none max-w-xs">
                          {currentLanguage === 'en'
                            ? 'The Bible teaches that hope is a foundational aspect of faith. Romans 15:13 describes God as "the God of hope" who can fill you with joy and peace. In Hebrews 11:1, hope is connected to faith as "the assurance of things hoped for." Would you like me to share more specific passages about hope?'
                            : 'La Biblia enseña que la esperanza es un aspecto fundamental de la fe. Romanos 15:13 describe a Dios como "el Dios de esperanza" que puede llenarte de gozo y paz. En Hebreos 11:1, la esperanza está conectada con la fe como "la certeza de lo que se espera." ¿Te gustaría que compartiera más pasajes específicos sobre la esperanza?'}
                        </div>
                      </div>
                      
                      <div className="flex justify-end mb-4">
                        <div className="bg-[#4cc4ff20] text-white p-3 rounded-lg rounded-tr-none max-w-xs">
                          {currentLanguage === 'en'
                            ? 'Yes, please share a few more verses about hope during difficult times.'
                            : 'Sí, por favor comparte algunos versículos más sobre la esperanza durante tiempos difíciles.'}
                        </div>
                      </div>
                      
                      <div className="flex mb-4">
                        <div className="h-8 w-8 rounded-full bg-[#f5b30820] border border-[#f5b308] flex items-center justify-center mr-2">
                          <span className="text-[#f5b308] font-bold">N</span>
                        </div>
                        <div className="bg-[#12172180] border border-[#4cc4ff30] text-gray-300 p-3 rounded-lg rounded-tl-none max-w-xs">
                          {currentLanguage === 'en'
                            ? 'Here are some verses about hope during difficult times:\n\nPsalm 42:11 - "Why, my soul, are you downcast? Why so disturbed within me? Put your hope in God, for I will yet praise him, my Savior and my God."\n\nRomans 5:3-5 - "Not only so, but we also glory in our sufferings, because we know that suffering produces perseverance; perseverance, character; and character, hope."\n\nJeremiah 29:11 - "For I know the plans I have for you," declares the LORD, "plans to prosper you and not to harm you, plans to give you hope and a future."'
                            : 'Aquí hay algunos versículos sobre la esperanza durante tiempos difíciles:\n\nSalmo 42:11 - "¿Por qué te abates, oh alma mía, y por qué te turbas dentro de mí? Espera en Dios, porque aún he de alabarle, ¡Salvador mío y Dios mío!"\n\nRomanos 5:3-5 - "Y no sólo esto, sino que también nos gloriamos en las tribulaciones, sabiendo que la tribulación produce paciencia; y la paciencia, prueba; y la prueba, esperanza."\n\nJeremías 29:11 - "Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz, y no de mal, para daros el fin que esperáis."'}
                        </div>
                      </div>
                      
                      <div className="flex items-center mt-4">
                        <input 
                          type="text" 
                          className="flex-1 bg-[#12172180] border border-[#4cc4ff30] rounded-l-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#4cc4ff]"
                          placeholder={currentLanguage === 'en' ? "Ask Nevin a question..." : "Hazle una pregunta a Nevin..."}
                          disabled
                        />
                        <button 
                          className="bg-[#f5b308] px-4 py-2 rounded-r-md text-white disabled:opacity-50"
                          disabled
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-2 text-center">
                        {currentLanguage === 'en' 
                          ? 'Demo version - Download the app for full functionality'
                          : 'Versión demo - Descarga la aplicación para funcionalidad completa'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>
      
      {/* Download Section */}
      <section className="py-16 bg-[#12172199]">
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            className="text-3xl font-bold inline-block relative mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#f5b308] glow-text">
              {currentLanguage === 'en' ? 'Experience the Tzotzil Bible' : 'Experimenta la Biblia Tzotzil'}
            </span>
            <div className="h-1 w-full bg-[#f5b308] mt-2"></div>
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-md mx-auto"
          >
            <p className="text-gray-300 font-rajdhani mb-8">
              {currentLanguage === 'en'
                ? 'Download the Tzotzil Bible app today and explore scripture in a new way with the help of Nevin, your AI scripture assistant.'
                : 'Descarga la aplicación Biblia Tzotzil hoy y explora las escrituras de una nueva manera con la ayuda de Nevin, tu asistente de escrituras con IA.'}
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-[#f5b308] hover:bg-opacity-90 text-white py-3 px-6 rounded-md flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.9,17.39C17.64,16.59 16.89,16 16,16H15V13A1,1 0 0,0 14,12H8V10H10A1,1 0 0,0 11,9V7H13A2,2 0 0,0 15,5V4.59C17.93,5.77 20,8.64 20,12C20,14.08 19.2,15.97 17.9,17.39M11,19.93C7.05,19.44 4,16.08 4,12C4,11.38 4.08,10.78 4.21,10.21L9,15V16A2,2 0 0,0 11,18M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                </svg>
                Google Play
              </button>
              <button className="bg-[#4cc4ff] hover:bg-opacity-90 text-white py-3 px-6 rounded-md flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
                </svg>
                App Store
              </button>
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}