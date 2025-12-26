import { motion } from "framer-motion";
import { Link } from "wouter";

interface AppCardProps {
  title: string;
  description: string;
  imageSrc: string;
  tags: string[];
  appNumber: number;
  tagline: string;
  tagColor: "red" | "gold" | "blue" | "teal";
  delay?: number;
  linkTo?: string;
}

export function AppCard({
  title,
  description,
  imageSrc,
  tags,
  appNumber,
  tagline,
  tagColor,
  delay = 0,
  linkTo,
}: AppCardProps) {
  const tagColors = {
    red: {
      accent: "#e62e2e",
      bg: "bg-[#e62e2e]/10",
      text: "text-[#e62e2e]",
    },
    gold: {
      accent: "#f5b308",
      bg: "bg-[#f5b308]/10",
      text: "text-[#f5b308]",
    },
    blue: {
      accent: "#4cc4ff",
      bg: "bg-[#4cc4ff]/10",
      text: "text-[#4cc4ff]",
    },
    teal: {
      accent: "#35ffdd",
      bg: "bg-[#35ffdd]/10",
      text: "text-[#35ffdd]",
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.5, delay }}
      className="group relative rounded-2xl overflow-hidden bg-[#0f1419]/80 backdrop-blur-xl border border-[#4cc4ff]/10 hover:border-[#4cc4ff]/30 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(76,196,255,0.1)]"
    >
      {/* Image */}
      <div className="w-full h-48 relative overflow-hidden">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1419] via-[#0f1419]/50 to-transparent"></div>
        
        {/* App number badge - cleaner */}
        <div 
          className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider"
          style={{ 
            backgroundColor: `${tagColors[tagColor].accent}20`,
            color: tagColors[tagColor].accent,
            border: `1px solid ${tagColors[tagColor].accent}40`
          }}
        >
          {appNumber.toString().padStart(2, '0')}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#4cc4ff] transition-colors">
          {title}
        </h3>
        <p className="text-gray-400 font-rajdhani mb-4 text-sm leading-relaxed">
          {description}
        </p>

        {/* Tagline */}
        <div className="flex items-center gap-2 mb-4">
          <div 
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ backgroundColor: tagColors[tagColor].accent }}
          ></div>
          <span className={`text-xs uppercase tracking-wider ${tagColors[tagColor].text}`}>
            {tagline}
          </span>
        </div>

        {/* Tags and Link */}
        <div className="flex justify-between items-center pt-4 border-t border-[#4cc4ff]/10">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span 
                key={index} 
                className="px-2.5 py-1 bg-[#4cc4ff]/5 text-[#4cc4ff]/70 rounded-lg text-xs border border-[#4cc4ff]/10"
              >
                {tag}
              </span>
            ))}
          </div>
          
          {linkTo ? (
            linkTo.startsWith('http') ? (
              <a 
                href={linkTo} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-[#4cc4ff]/10 hover:bg-[#4cc4ff]/20 flex items-center justify-center text-[#4cc4ff] transition-all group-hover:scale-110"
                data-testid={`link-app-${appNumber}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            ) : (
              <Link href={linkTo}>
                <div 
                  className="w-10 h-10 rounded-xl bg-[#4cc4ff]/10 hover:bg-[#4cc4ff]/20 flex items-center justify-center text-[#4cc4ff] transition-all cursor-pointer group-hover:scale-110" 
                  data-testid={`link-app-${appNumber}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </Link>
            )
          ) : (
            <div className="w-10 h-10 rounded-xl bg-[#4cc4ff]/5 flex items-center justify-center text-[#4cc4ff]/30">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
