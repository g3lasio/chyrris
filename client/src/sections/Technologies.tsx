import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";

export function Technologies() {
  const { translations } = useLanguage();

  const technologies = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: translations.technologies.financial.title,
      description: translations.technologies.financial.description,
      items: translations.technologies.financial.items,
      gradient: "from-[#e62e2e] to-[#4cc4ff]",
      accentColor: "#e62e2e"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      title: translations.technologies.executive.title,
      description: translations.technologies.executive.description,
      items: translations.technologies.executive.items,
      gradient: "from-[#4cc4ff] to-[#35ffdd]",
      accentColor: "#4cc4ff"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: translations.technologies.secure.title,
      description: translations.technologies.secure.description,
      items: translations.technologies.secure.items,
      gradient: "from-[#f5b308] to-[#e62e2e]",
      accentColor: "#f5b308"
    }
  ];

  return (
    <section id="technologies" className="py-32 relative">
      {/* Clean gradient background */}
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
            {translations.technologies.coreTitle}
          </motion.span>
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mt-4 text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {translations.technologies.title}
          </motion.h2>
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-[#4cc4ff] to-[#35ffdd] mx-auto mt-6"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </div>
        
        {/* Premium glassmorphism cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {technologies.map((tech, index) => (
            <motion.div 
              key={index}
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              {/* Card */}
              <div className="relative h-full p-8 rounded-2xl bg-[#0f1419]/80 backdrop-blur-xl border border-[#4cc4ff]/10 hover:border-[#4cc4ff]/30 transition-all duration-500 hover:shadow-[0_0_40px_rgba(76,196,255,0.1)]">
                {/* Gradient line at top */}
                <div className={`absolute top-0 left-8 right-8 h-px bg-gradient-to-r ${tech.gradient} opacity-50`}></div>
                
                {/* Icon */}
                <div 
                  className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                  style={{ 
                    background: `linear-gradient(135deg, ${tech.accentColor}15, ${tech.accentColor}05)`,
                    color: tech.accentColor
                  }}
                >
                  {tech.icon}
                </div>
                
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-[#4cc4ff] transition-colors">
                  {tech.title}
                </h3>
                <p className="text-gray-400 font-rajdhani mb-6 leading-relaxed">
                  {tech.description}
                </p>
                
                {/* Feature list */}
                <ul className="space-y-3">
                  {tech.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-300 font-rajdhani">
                      <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: tech.accentColor }}></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Bottom indicator - cleaner version */}
        <motion.div 
          className="flex justify-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#4cc4ff]/5 border border-[#4cc4ff]/10">
            <div className="w-2 h-2 bg-[#35ffdd] rounded-full animate-pulse"></div>
            <span className="text-gray-400 text-sm tracking-wider">{translations.technologies.advancing}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
