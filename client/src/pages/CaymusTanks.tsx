import { motion } from "framer-motion";
import { Link } from "wouter";
import { useLanguage } from "../hooks/useLanguage";
import { ParticleBackground } from "../components/ParticleBackground";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { Footer } from "../sections/Footer";
import caymusTanksLogo from "@assets/caymus-tanks-logo.jpg";

export default function CaymusTanks() {
  const { currentLanguage } = useLanguage();
  
  const content = {
    title: 'Caymus Tank Calculator',
    tagline: currentLanguage === 'en' ? 'Professional Wine Tank Calculator' : 'Calculadora Profesional de Tanques de Vino',
    description: currentLanguage === 'en' 
      ? 'The ultimate tool for winemakers and wine industry professionals. Calculate precise measurements, volumes, and conversions for wine production with ease and accuracy.'
      : 'La herramienta definitiva para enólogos y profesionales de la industria vinícola. Calcula mediciones precisas, volúmenes y conversiones para la producción de vino con facilidad y precisión.',
    
    featuresTitle: currentLanguage === 'en' ? 'Key Features' : 'Características Principales',
    features: [
      {
        icon: '🍷',
        title: currentLanguage === 'en' ? 'Wine Volume Calculator' : 'Calculadora de Volumen de Vino',
        description: currentLanguage === 'en' 
          ? 'Calculate wine volumes in gallons, liters, and barrels with precision. Perfect for production planning and inventory management.'
          : 'Calcula volúmenes de vino en galones, litros y barriles con precisión. Perfecto para planificación de producción y gestión de inventario.'
      },
      {
        icon: '📏',
        title: currentLanguage === 'en' ? 'Tank Measurements' : 'Mediciones de Tanques',
        description: currentLanguage === 'en' 
          ? 'Input tank dimensions and get accurate capacity calculations. Supports various tank shapes and configurations.'
          : 'Ingresa las dimensiones del tanque y obtén cálculos de capacidad precisos. Soporta varias formas y configuraciones de tanques.'
      },
      {
        icon: '🔄',
        title: currentLanguage === 'en' ? 'Unit Conversions' : 'Conversiones de Unidades',
        description: currentLanguage === 'en' 
          ? 'Seamlessly convert between gallons, liters, hectoliters, and wine barrels. Industry-standard conversion rates.'
          : 'Convierte sin problemas entre galones, litros, hectolitros y barriles de vino. Tasas de conversión estándar de la industria.'
      },
      {
        icon: '📊',
        title: currentLanguage === 'en' ? 'Space Calculations' : 'Cálculos de Espacio',
        description: currentLanguage === 'en' 
          ? 'Determine how much space you need for a specific wine volume, or calculate how much wine fits in available space.'
          : 'Determina cuánto espacio necesitas para un volumen específico de vino, o calcula cuánto vino cabe en el espacio disponible.'
      },
      {
        icon: '📋',
        title: currentLanguage === 'en' ? 'Calculation History' : 'Historial de Cálculos',
        description: currentLanguage === 'en' 
          ? 'Keep track of all your calculations with a comprehensive history feature. Review and reference past calculations anytime.'
          : 'Mantén un registro de todos tus cálculos con una función de historial completa. Revisa y consulta cálculos anteriores en cualquier momento.'
      },
      {
        icon: '🌐',
        title: currentLanguage === 'en' ? 'Bilingual Support' : 'Soporte Bilingüe',
        description: currentLanguage === 'en' 
          ? 'Full support for English and Spanish languages. Switch between languages anytime with a simple toggle.'
          : 'Soporte completo para idiomas inglés y español. Cambia entre idiomas en cualquier momento con un simple interruptor.'
      }
    ],
    
    pricingTitle: currentLanguage === 'en' ? 'Simple Pricing' : 'Precio Simple',
    pricingSubtitle: currentLanguage === 'en' ? 'One plan, full access' : 'Un plan, acceso completo',
    price: '$5.99',
    priceUnit: currentLanguage === 'en' ? '/month' : '/mes',
    pricingFeatures: currentLanguage === 'en' 
      ? [
          'Full access to all calculator features',
          'Unlimited calculations',
          'Calculation history',
          'Bilingual support (EN/ES)',
          'Regular updates and improvements',
          'Cancel anytime'
        ]
      : [
          'Acceso completo a todas las funciones de la calculadora',
          'Cálculos ilimitados',
          'Historial de cálculos',
          'Soporte bilingüe (EN/ES)',
          'Actualizaciones y mejoras regulares',
          'Cancela cuando quieras'
        ],
    
    ctaTitle: currentLanguage === 'en' ? 'Ready to Get Started?' : '¿Listo para Comenzar?',
    ctaDescription: currentLanguage === 'en' 
      ? 'Download Caymus Tank Calculator from the App Store and streamline your wine production calculations today.'
      : 'Descarga Caymus Tank Calculator desde la App Store y optimiza tus cálculos de producción de vino hoy.',
    ctaButton: currentLanguage === 'en' ? 'Coming Soon to App Store' : 'Próximamente en App Store',
    
    privacyLink: currentLanguage === 'en' ? 'Privacy Policy' : 'Política de Privacidad',
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
      
      {/* Hero Section */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Logo/Image */}
            <div className="w-32 h-32 mx-auto mb-8 rounded-2xl overflow-hidden border-2 border-[#8b5cf6]/30 shadow-[0_0_30px_rgba(139,92,246,0.3)]">
              <img 
                src={caymusTanksLogo} 
                alt="Caymus Tank Calculator" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {content.title}
            </h1>
            <p className="text-xl text-[#8b5cf6] mb-6">
              {content.tagline}
            </p>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
              {content.description}
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white">{content.featuresTitle}</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#8b5cf6] to-[#a78bfa] mx-auto mt-4"></div>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-[#0f1419]/80 backdrop-blur-xl border border-[#8b5cf6]/10 hover:border-[#8b5cf6]/30 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold text-[#8b5cf6] mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white">{content.pricingTitle}</h2>
            <p className="text-gray-400 mt-2">{content.pricingSubtitle}</p>
            <div className="w-20 h-1 bg-gradient-to-r from-[#8b5cf6] to-[#a78bfa] mx-auto mt-4"></div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-md mx-auto p-8 rounded-2xl bg-gradient-to-br from-[#8b5cf6]/20 to-[#0f1419] backdrop-blur-xl border border-[#8b5cf6]/30 shadow-[0_0_40px_rgba(139,92,246,0.2)]"
          >
            <div className="text-center mb-6">
              <span className="text-5xl font-bold text-white">{content.price}</span>
              <span className="text-gray-400 text-xl">{content.priceUnit}</span>
            </div>
            
            <ul className="space-y-3 mb-8">
              {content.pricingFeatures.map((feature, index) => (
                <li key={index} className="flex items-center gap-3 text-gray-300">
                  <svg className="w-5 h-5 text-[#8b5cf6] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <div className="text-center">
              <div className="py-3 px-6 bg-[#8b5cf6]/20 text-[#8b5cf6] rounded-lg font-semibold">
                {content.ctaButton}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-white mb-4">{content.ctaTitle}</h2>
            <p className="text-gray-400 mb-8">{content.ctaDescription}</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/caymus-tanks/privacy">
                <div className="py-3 px-6 border border-[#8b5cf6]/30 text-[#8b5cf6] hover:bg-[#8b5cf6]/10 rounded-lg font-semibold transition-colors cursor-pointer flex items-center justify-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {content.privacyLink}
                </div>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
