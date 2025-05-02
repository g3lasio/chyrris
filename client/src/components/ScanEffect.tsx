import { motion } from "framer-motion";

export function ScanEffect() {
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <motion.div
        className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#4cc4ffcc] to-transparent opacity-60"
        animate={{ 
          top: ["0%", "100%"] 
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
}
