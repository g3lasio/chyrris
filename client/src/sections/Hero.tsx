import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { TechCircle } from "@/components/TechCircle";

export function Hero() {
  const { translations } = useLanguage();

  return (
    <section className="min-h-screen relative flex items-center py-24">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b" 
          alt="Futuristic technology interface" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#12172199] via-[#12172199] to-[#121721ee]"></div>
      </div>
      
      <div className="container mx-auto px-4 z-10 relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="inline-block tech-border px-3 py-1 rounded-full text-sm text-[#4cc4ff]"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <span className="mr-2">●</span>
              {translations.hero.tagline}
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-6xl font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <span className="text-white">{translations.hero.titlePart1}</span>
              <span className="text-[#f5b308] glow-text"> {translations.hero.titlePart2}</span>
            </motion.h1>
            
            <motion.p 
              className="text-gray-300 md:text-lg font-rajdhani"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              {translations.hero.description}
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <a 
                href="#technologies" 
                className="px-6 py-3 rounded bg-[#e62e2e] hover:bg-opacity-90 transition text-white uppercase tracking-wider text-sm flex items-center"
              >
                {translations.hero.exploreTech}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
              <a 
                href="#contact" 
                className="px-6 py-3 rounded border border-[#4cc4ff] hover:bg-[#4cc4ff10] transition text-[#4cc4ff] uppercase tracking-wider text-sm"
              >
                {translations.hero.getInTouch}
              </a>
            </motion.div>
          </motion.div>
          
          <div className="relative aspect-square max-w-md mx-auto">
            <TechCircle size="lg" className="mx-auto">
              <div className="absolute inset-0 rotate-45 opacity-20 animate-rotate-slow">
                <img 
                  src="https://images.unsplash.com/photo-1534224039826-c7a0eda0e6b3" 
                  alt="Holographic UI elements" 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div 
                className="absolute inset-8 -rotate-45 opacity-30" 
                style={{animation: "rotate 15s linear infinite reverse"}}
              >
                <img 
                  src="https://images.unsplash.com/photo-1506729623306-b5a934d88b53" 
                  alt="Futuristic tech interface" 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="absolute inset-16 opacity-50">
                <img 
                  src="https://images.unsplash.com/photo-1567095761054-7a02e69e5c43" 
                  alt="AI visualization" 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </TechCircle>
          </div>
        </div>
      </div>
    </section>
  );
}
