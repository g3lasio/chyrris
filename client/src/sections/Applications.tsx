import { motion } from "framer-motion";
import { Link } from "wouter";
import { useLanguage } from "@/hooks/useLanguage";
import { AppCard } from "@/components/AppCard";
import tzotzilBanner from "@assets/Tzotzil_Bible_1766730387872.png";

export function Applications() {
  const { translations, currentLanguage } = useLanguage();

  const tzotzilContent = {
    openApp: currentLanguage === 'en' ? 'Open App' : 'Abrir App',
    privacyPolicy: currentLanguage === 'en' ? 'Privacy Policy' : 'Política de Privacidad'
  };

  const apps = [
    {
      title: translations.applications.mervinAi.title,
      description: translations.applications.mervinAi.description,
      imageSrc: "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375",
      tags: [translations.applications.mervinAi.tag1, translations.applications.mervinAi.tag2],
      appNumber: 2,
      tagline: translations.applications.mervinAi.tagline,
      tagColor: "red" as const,
      linkTo: "https://app.owlfenc.com"
    },
    {
      title: translations.applications.owlFenc.title,
      description: translations.applications.owlFenc.description,
      imageSrc: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122",
      tags: [translations.applications.owlFenc.tag1, translations.applications.owlFenc.tag2],
      appNumber: 3,
      tagline: translations.applications.owlFenc.tagline,
      tagColor: "teal" as const,
      linkTo: "https://owlfenc.com/"
    },
    {
      title: translations.applications.andyAi.title,
      description: translations.applications.andyAi.description,
      imageSrc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
      tags: [translations.applications.andyAi.tag1, translations.applications.andyAi.tag2],
      appNumber: 4,
      tagline: translations.applications.andyAi.tagline,
      tagColor: "blue" as const
    }
  ];

  return (
    <section id="applications" className="py-32 relative">
      {/* Clean gradient background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0a0d12] via-[#0f1419] to-[#0a0d12]"></div>
      
      <div className="container mx-auto px-6 z-10 relative">
        {/* Section header */}
        <div className="text-center mb-20">
          <motion.span 
            className="text-[#e62e2e] text-sm uppercase tracking-widest"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {translations.applications.ourTitle}
          </motion.span>
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mt-4 text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {translations.applications.title}
          </motion.h2>
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-[#f5b308] to-[#e62e2e] mx-auto mt-6"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          <motion.p 
            className="text-gray-400 font-rajdhani mt-6 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {translations.applications.description}
          </motion.p>
        </div>
        
        {/* App cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Tzotzil Bible - Featured App */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.5 }}
            className="group relative rounded-2xl overflow-hidden bg-[#0f1419]/80 backdrop-blur-xl border border-[#f5b308]/20 hover:border-[#f5b308]/40 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(245,179,8,0.1)]"
            data-testid="card-tzotzil-bible"
          >
            {/* Image */}
            <div className="w-full h-48 relative overflow-hidden">
              <img
                src={tzotzilBanner}
                alt={translations.applications.tzotzil.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f1419] via-[#0f1419]/50 to-transparent"></div>
              
              {/* Featured badge */}
              <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider bg-[#f5b308]/20 text-[#f5b308] border border-[#f5b308]/40">
                01
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-[#f5b308] mb-3 group-hover:text-[#f5b308] transition-colors">
                {translations.applications.tzotzil.title}
              </h3>
              <p className="text-gray-400 font-rajdhani mb-4 text-sm leading-relaxed">
                {translations.applications.tzotzil.description}
              </p>

              {/* Tagline */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1.5 h-1.5 rounded-full animate-pulse bg-[#f5b308]"></div>
                <span className="text-xs uppercase tracking-wider text-[#f5b308]">
                  {translations.applications.tzotzil.tagline}
                </span>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col gap-3 pt-4 border-t border-[#f5b308]/10">
                <a 
                  href="https://bible.chyrris.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 bg-gradient-to-r from-[#f5b308] to-[#e5a308] hover:opacity-90 text-[#0a0d12] text-center rounded-xl text-sm font-bold uppercase tracking-wider transition-opacity flex items-center justify-center gap-2"
                  data-testid="button-tzotzil-open-app"
                >
                  {tzotzilContent.openApp}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
                
                <Link href="/tzotzil-bible/privacy">
                  <div 
                    className="w-full py-3 px-4 border border-[#4cc4ff]/30 text-[#4cc4ff] hover:bg-[#4cc4ff]/5 text-center rounded-xl text-sm font-semibold uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2"
                    data-testid="button-tzotzil-privacy"
                  >
                    {tzotzilContent.privacyPolicy}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Other apps */}
          {apps.map((app, index) => (
            <AppCard
              key={index}
              title={app.title}
              description={app.description}
              imageSrc={app.imageSrc}
              tags={app.tags}
              appNumber={app.appNumber}
              tagline={app.tagline}
              tagColor={app.tagColor}
              delay={(index + 1) * 0.1}
              linkTo={app.linkTo}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
