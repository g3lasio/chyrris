import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";

export function About() {
  const { translations } = useLanguage();

  return (
    <section id="about" className="py-32 relative">
      {/* Clean background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0a0d12] via-[#0f1419] to-[#0a0d12]"></div>
      
      <div className="container mx-auto px-6 z-10 relative">
        {/* Section header */}
        <div className="text-center mb-20">
          <motion.span 
            className="text-[#4cc4ff] text-sm uppercase tracking-widest"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {translations.about.titleHighlight}
          </motion.span>
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mt-4 text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {translations.about.title}
          </motion.h2>
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-[#e62e2e] to-[#4cc4ff] mx-auto mt-6"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          {/* Content side */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-gray-300 text-lg leading-relaxed font-rajdhani">
              {translations.about.companyDescription}
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {/* Headquarters */}
              <div className="p-6 rounded-xl bg-[#0f1419]/80 backdrop-blur-xl border border-[#4cc4ff]/10 hover:border-[#4cc4ff]/30 transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[#4cc4ff]/10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#4cc4ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-400 uppercase tracking-wider">{translations.about.headquarters}</span>
                </div>
                <p className="text-white font-semibold">{translations.about.sanFrancisco}</p>
              </div>
              
              {/* Contact */}
              <div className="p-6 rounded-xl bg-[#0f1419]/80 backdrop-blur-xl border border-[#4cc4ff]/10 hover:border-[#4cc4ff]/30 transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[#35ffdd]/10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#35ffdd]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-400 uppercase tracking-wider">{translations.about.contact}</span>
                </div>
                <p className="text-white font-semibold">info@chyrris.com</p>
              </div>
            </div>
            
            {/* Mission */}
            <div className="p-6 rounded-xl bg-gradient-to-r from-[#4cc4ff]/5 to-[#35ffdd]/5 border border-[#4cc4ff]/10">
              <h3 className="text-[#4cc4ff] text-sm uppercase tracking-wider mb-3">{translations.about.mission}</h3>
              <p className="text-white font-rajdhani leading-relaxed">
                {translations.about.missionStatement}
              </p>
            </div>
          </motion.div>
          
          {/* Visual side - clean gradient instead of stock image */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-[#4cc4ff]/10 via-[#0f1419] to-[#35ffdd]/10 p-8 relative overflow-hidden">
              {/* Decorative circles */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-[#4cc4ff]/20 rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-[#35ffdd]/20 rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-[#4cc4ff]/20 to-[#35ffdd]/20 rounded-full flex items-center justify-center">
                <span className="text-4xl font-bold text-white">CT</span>
              </div>
              
              {/* Corner accents */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#4cc4ff]/30 rounded-tl-lg"></div>
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[#4cc4ff]/30 rounded-tr-lg"></div>
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[#4cc4ff]/30 rounded-bl-lg"></div>
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#4cc4ff]/30 rounded-br-lg"></div>
            </div>
            
            {/* Bottom label */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-2 bg-[#0f1419] border border-[#4cc4ff]/20 rounded-full">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#35ffdd] rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-400">{translations.about.advancedAiSolutions}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
