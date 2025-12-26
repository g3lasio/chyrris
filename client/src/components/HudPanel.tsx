import { motion } from "framer-motion";
import { ReactNode } from "react";

interface HudPanelProps {
  children: ReactNode;
  className?: string;
  title?: string;
  delay?: number;
}

export function HudPanel({
  children,
  className = "",
  title,
  delay = 0,
}: HudPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className={`relative rounded-2xl p-8 ${className}`}
    >
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-[#0f1419]/80 backdrop-blur-xl border border-[#4cc4ff]/10 rounded-2xl z-0"></div>
      
      {/* Subtle gradient accent at top */}
      <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#4cc4ff]/30 to-transparent z-10"></div>
      
      {title && (
        <h3 className="text-lg font-semibold text-white mb-6 relative z-10">{title}</h3>
      )}
      
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
