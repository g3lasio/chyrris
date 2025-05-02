import { motion } from "framer-motion";
import { ReactNode } from "react";

interface HolographicCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function HolographicCard({ children, className = "", delay = 0 }: HolographicCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className={`relative rounded-lg overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-[#4cc4ff10] to-[#35ffdd10] z-0 backdrop-blur-sm" />
      <div className="relative z-10 border border-[#4cc4ff40] rounded-lg bg-[#1a202ccc] backdrop-blur-md shadow-[0_0_15px_rgba(76,196,255,0.15)]">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div
            className="absolute top-0 left-[-100%] w-full h-1 bg-gradient-to-r from-transparent via-[#4cc4ff] to-transparent"
            style={{
              animation: "slide 3s linear infinite",
            }}
          />
        </div>
        <div className="relative z-10">{children}</div>
      </div>
    </motion.div>
  );
}
