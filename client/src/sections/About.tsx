import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { HudPanel } from "@/components/HudPanel";

export function About() {
  const { translations } = useLanguage();

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-4 z-10 relative">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl font-bold inline-block relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#4cc4ff] glow-text">{translations.about.titleHighlight}</span> {translations.about.title}
            <div className="h-1 w-full bg-[#e62e2e] mt-2"></div>
          </motion.h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <HudPanel code="COMPANY-PROFILE" title={translations.about.companyProfile}>
            <div className="space-y-6 mt-6">
              <p className="text-gray-300 font-rajdhani">
                {translations.about.companyDescription}
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="tech-border p-4 rounded-lg">
                  <h3 className="text-[#f5b308] text-sm mb-2 uppercase tracking-wider">{translations.about.headquarters}</h3>
                  <p className="text-white font-rajdhani flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-[#4cc4ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {translations.about.sanFrancisco}
                  </p>
                </div>
                
                <div className="tech-border p-4 rounded-lg">
                  <h3 className="text-[#f5b308] text-sm mb-2 uppercase tracking-wider">{translations.about.contact}</h3>
                  <p className="text-white font-rajdhani flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-[#4cc4ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    info@chyrris.com
                  </p>
                </div>
              </div>
              
              <div className="tech-border p-4 rounded-lg">
                <h3 className="text-[#f5b308] text-sm mb-2 uppercase tracking-wider">{translations.about.mission}</h3>
                <p className="text-white font-rajdhani">
                  {translations.about.missionStatement}
                </p>
              </div>
            </div>
          </HudPanel>
          
          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-[#4cc4ff10] to-[#e62e2e10] rounded-lg blur-xl opacity-70"></div>
            <img src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678" alt="Tony Stark style tech interface" className="rounded-lg relative z-10 w-full h-auto shadow-2xl" />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#121721] via-[#121721cc] to-transparent">
              <div className="flex items-center">
                <div className="h-2 w-2 bg-[#e62e2e] rounded-full animate-pulse mr-2"></div>
                <p className="text-[#4cc4ff] text-sm uppercase tracking-wider font-bold">{translations.about.advancedAiSolutions}</p>
              </div>
              <p className="text-white font-rajdhani mt-2">
                {translations.about.bridgingGap}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
