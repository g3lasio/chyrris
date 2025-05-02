import { motion } from "framer-motion";
import { ReactNode } from "react";

interface HudPanelProps {
  children: ReactNode;
  className?: string;
  title?: string;
  code?: string;
  delay?: number;
}

export function HudPanel({
  children,
  className = "",
  title,
  code,
  delay = 0,
}: HudPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className={`relative rounded-lg p-6 hud-panel ${className}`}
    >
      <div className="absolute inset-0 bg-[#1a202ccc] border border-[#4cc4ff40] rounded-lg shadow-[0_0_15px_rgba(76,196,255,0.1)] backdrop-blur-md z-0"></div>
      
      {code && (
        <div className="absolute top-0 right-0 p-2 text-xs text-[#4cc4ff] border-l border-b border-[#4cc4ff30] bg-[#1a202c] z-10">
          {code}
        </div>
      )}
      
      {title && (
        <h3 className="text-xl font-bold text-[#4cc4ff] mb-4 relative z-10">{title}</h3>
      )}
      
      <div className="relative z-10">{children}</div>
      
      <div 
        className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#4cc4ff00] via-[#4cc4ff10] to-[#4cc4ff00] z-0"
        style={{
          transform: "translateX(-100%)",
          animation: "scan 3s ease-in-out infinite"
        }}
      ></div>
    </motion.div>
  );
}
