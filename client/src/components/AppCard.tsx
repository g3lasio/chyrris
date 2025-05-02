import { motion } from "framer-motion";
import { ReactNode } from "react";
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
      bg: "bg-[#e62e2e20]",
      text: "text-[#e62e2e]",
      border: "border-[#e62e2e]",
    },
    gold: {
      bg: "bg-[#f5b30820]",
      text: "text-[#f5b308]",
      border: "border-[#f5b308]",
    },
    blue: {
      bg: "bg-[#4cc4ff20]",
      text: "text-[#4cc4ff]",
      border: "border-[#4cc4ff]",
    },
    teal: {
      bg: "bg-[#35ffdd20]",
      text: "text-[#35ffdd]",
      border: "border-[#35ffdd]",
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.6, delay }}
      className="hud-panel rounded-lg overflow-hidden relative group shadow-[0_10px_20px_rgba(53,255,221,0)] hover:shadow-[0_10px_20px_rgba(53,255,221,0.2)]"
    >
      <div className="w-full h-48 relative overflow-hidden">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121721] via-[#121721cc] to-transparent"></div>
      </div>

      <div className="p-6 relative">
        <div className="absolute top-0 right-0 translate-y-4 -translate-x-4 w-16 h-16 rounded-full bg-[#1a202c] border-2 border-[#f5b308] flex items-center justify-center">
          <span className="text-[#f5b308] text-xs">APP {appNumber.toString().padStart(2, '0')}</span>
        </div>

        <h3 className="text-xl font-bold text-[#4cc4ff] mb-3">{title}</h3>
        <p className="text-gray-300 font-rajdhani mb-4">
          {description}
        </p>

        <div className="flex items-center mt-4">
          <div className={`h-2 w-2 rounded-full animate-pulse ${tagColors[tagColor].bg} ${tagColors[tagColor].border} mr-2`}></div>
          <p className={`${tagColors[tagColor].text} text-sm uppercase tracking-wider`}>{tagline}</p>
        </div>

        <div className="mt-6 flex justify-between items-center">
          <div className="flex space-x-2">
            {tags.map((tag, index) => (
              <span key={index} className="px-2 py-1 bg-[#4cc4ff20] text-[#4cc4ff] rounded text-xs">
                {tag}
              </span>
            ))}
          </div>
          {linkTo ? (
            <Link href={linkTo} className="text-[#4cc4ff] hover:text-[#35ffdd] transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          ) : (
            <span className="text-[#4cc4ff] hover:text-[#35ffdd] transition cursor-default opacity-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}