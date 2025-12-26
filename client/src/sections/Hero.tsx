import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";

export function Hero() {
  const { translations } = useLanguage();

  return (
    <section className="min-h-screen relative flex items-center pt-20 pb-32">
      {/* Premium gradient background instead of stock image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0d12] via-[#0f1419] to-[#0a0d12]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(76,196,255,0.08)_0%,_transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(53,255,221,0.05)_0%,_transparent_50%)]"></div>
      </div>
      
      <div className="container mx-auto px-6 z-10 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            {/* Subtle tagline */}
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#4cc4ff]/5 border border-[#4cc4ff]/20 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <span className="w-2 h-2 rounded-full bg-[#4cc4ff] animate-pulse"></span>
              <span className="text-[#4cc4ff] text-sm tracking-wider uppercase">
                {translations.hero.tagline}
              </span>
            </motion.div>
            
            {/* Large impactful headline */}
            <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <span className="text-white">{translations.hero.titlePart1}</span>
              <br />
              <span className="bg-gradient-to-r from-[#4cc4ff] via-[#35ffdd] to-[#4cc4ff] bg-clip-text text-transparent">
                {translations.hero.titlePart2}
              </span>
            </motion.h1>
            
            {/* Refined description */}
            <motion.p 
              className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-rajdhani"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              {translations.hero.description}
            </motion.p>
            
            {/* Premium CTAs */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <a 
                href="#technologies" 
                className="group px-8 py-4 rounded-xl bg-gradient-to-r from-[#4cc4ff] to-[#35ffdd] text-[#0a0d12] font-semibold uppercase tracking-wider text-sm flex items-center justify-center gap-2 transition-all hover:shadow-[0_0_30px_rgba(76,196,255,0.4)] hover:scale-105"
                data-testid="button-explore-tech"
              >
                {translations.hero.exploreTech}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
              <a 
                href="#contact" 
                className="px-8 py-4 rounded-xl border border-[#4cc4ff]/30 hover:border-[#4cc4ff] hover:bg-[#4cc4ff]/5 transition-all text-white uppercase tracking-wider text-sm backdrop-blur-sm"
                data-testid="button-get-in-touch"
              >
                {translations.hero.getInTouch}
              </a>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Subtle decorative element */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <div className="flex flex-col items-center gap-2 text-[#4cc4ff]/40">
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <motion.div 
              className="w-px h-8 bg-gradient-to-b from-[#4cc4ff]/40 to-transparent"
              animate={{ scaleY: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
