import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { AppCard } from "@/components/AppCard";

export function Applications() {
  const { translations } = useLanguage();

  const apps = [
    {
      title: translations.applications.tzotzil.title,
      description: translations.applications.tzotzil.description,
      imageSrc: "https://images.unsplash.com/photo-1605153864431-a2795e7959fc",
      tags: [translations.applications.tzotzil.tag1, translations.applications.tzotzil.tag2],
      appNumber: 1,
      tagline: translations.applications.tzotzil.tagline,
      tagColor: "gold" as const,
      linkTo: "/tzotzil-bible"
    },
    {
      title: translations.applications.owlFenc.title,
      description: translations.applications.owlFenc.description,
      imageSrc: "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375",
      tags: [translations.applications.owlFenc.tag1, translations.applications.owlFenc.tag2],
      appNumber: 2,
      tagline: translations.applications.owlFenc.tagline,
      tagColor: "red" as const
    },
    {
      title: translations.applications.andyAi.title,
      description: translations.applications.andyAi.description,
      imageSrc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
      tags: [translations.applications.andyAi.tag1, translations.applications.andyAi.tag2],
      appNumber: 3,
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
        
        <div className="grid md:grid-cols-3 gap-8">
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
              delay={index * 0.2}
              linkTo={app.linkTo}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
