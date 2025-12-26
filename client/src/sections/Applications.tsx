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
    <section id="applications" className="py-20 relative">
      <div className="container mx-auto px-4 z-10 relative">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl font-bold inline-block relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#e62e2e] glow-text">{translations.applications.ourTitle}</span> {translations.applications.title}
            <div className="h-1 w-full bg-[#f5b308] mt-2"></div>
          </motion.h2>
          <motion.p 
            className="text-gray-300 font-rajdhani mt-4 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {translations.applications.description}
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.6 }}
            className="hud-panel rounded-lg overflow-hidden relative group shadow-[0_10px_20px_rgba(53,255,221,0)] hover:shadow-[0_10px_20px_rgba(53,255,221,0.2)]"
            data-testid="card-tzotzil-bible"
          >
            <div className="w-full h-48 relative overflow-hidden">
              <img
                src={tzotzilBanner}
                alt={translations.applications.tzotzil.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121721] via-transparent to-transparent"></div>
            </div>

            <div className="p-6 relative">
              <div className="absolute top-0 right-0 translate-y-4 -translate-x-4 w-16 h-16 rounded-full bg-[#1a202c] border-2 border-[#f5b308] flex items-center justify-center">
                <span className="text-[#f5b308] text-xs">APP 01</span>
              </div>

              <h3 className="text-xl font-bold text-[#f5b308] mb-3">{translations.applications.tzotzil.title}</h3>
              <p className="text-gray-300 font-rajdhani mb-4 text-sm">
                {translations.applications.tzotzil.description}
              </p>

              <div className="flex items-center mb-4">
                <div className="h-2 w-2 rounded-full animate-pulse bg-[#f5b30820] border border-[#f5b308] mr-2"></div>
                <p className="text-[#f5b308] text-sm uppercase tracking-wider">{translations.applications.tzotzil.tagline}</p>
              </div>

              <div className="flex flex-col gap-2">
                <a 
                  href="https://bible.chyrris.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full py-2 px-4 bg-[#f5b308] hover:bg-[#e5a308] text-white text-center rounded text-sm font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                  data-testid="button-tzotzil-open-app"
                >
                  {tzotzilContent.openApp}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
                
                <Link href="/tzotzil-bible/privacy">
                  <div 
                    className="w-full py-2 px-4 border border-[#4cc4ff] text-[#4cc4ff] hover:bg-[#4cc4ff20] text-center rounded text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2"
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
              delay={(index + 1) * 0.2}
              linkTo={app.linkTo}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
