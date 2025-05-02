import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { HudPanel } from "@/components/HudPanel";
import { TechCircle } from "@/components/TechCircle";

export function Technologies() {
  const { translations } = useLanguage();

  const technologies = [
    {
      id: "AI-001",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#e62e2e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: translations.technologies.financial.title,
      description: translations.technologies.financial.description,
      items: translations.technologies.financial.items,
      iconColor: "red",
      gradient: "from-[#e62e2e] to-[#4cc4ff]"
    },
    {
      id: "AI-002",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#4cc4ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      title: translations.technologies.executive.title,
      description: translations.technologies.executive.description,
      items: translations.technologies.executive.items,
      iconColor: "blue",
      gradient: "from-[#4cc4ff] to-[#35ffdd]"
    },
    {
      id: "AI-003",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#f5b308]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: translations.technologies.secure.title,
      description: translations.technologies.secure.description,
      items: translations.technologies.secure.items,
      iconColor: "gold",
      gradient: "from-[#f5b308] to-[#e62e2e]"
    }
  ];

  return (
    <section id="technologies" className="py-20 relative">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#121721] opacity-95"></div>
        <img 
          src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31" 
          alt="Tech background" 
          className="w-full h-full object-cover opacity-10"
        />
      </div>
      
      <div className="container mx-auto px-4 z-10 relative">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl font-bold inline-block relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#f5b308] glow-text">{translations.technologies.coreTitle}</span> {translations.technologies.title}
            <div className="h-1 w-full bg-[#4cc4ff] mt-2"></div>
          </motion.h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {technologies.map((tech, index) => (
            <HudPanel 
              key={tech.id} 
              code={tech.id} 
              className="group hover:border-[#35ffdd]"
              delay={index * 0.2}
            >
              <div className="mb-6">
                <TechCircle size="sm" color={tech.iconColor as any}>
                  {tech.icon}
                </TechCircle>
              </div>
              
              <h3 className="text-xl font-bold text-[#4cc4ff] mb-3">{tech.title}</h3>
              <p className="text-gray-300 font-rajdhani mb-4">
                {tech.description}
              </p>
              
              <div className={`w-full h-1 bg-gradient-to-r ${tech.gradient} my-4`}></div>
              
              <ul className="space-y-2 text-gray-300 font-rajdhani">
                {tech.items.map((item, idx) => (
                  <li key={idx} className="flex items-center">
                    <span className="text-[#4cc4ff] mr-2">●</span>
                    {item}
                  </li>
                ))}
              </ul>
            </HudPanel>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <motion.div 
            className="inline-block tech-border px-6 py-3 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center">
              <div className="h-3 w-3 bg-[#e62e2e] rounded-full animate-pulse mr-3"></div>
              <p className="text-[#4cc4ff] text-sm uppercase tracking-wider">{translations.technologies.advancing}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
