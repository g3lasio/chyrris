import { motion } from "framer-motion";
import { ReactNode } from "react";

interface TechCircleProps {
  children?: ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
  color?: "red" | "blue" | "gold" | "teal";
}

export function TechCircle({ 
  children, 
  size = "md", 
  className = "", 
  color = "blue" 
}: TechCircleProps) {
  const sizeClasses = {
    sm: "h-12 w-12",
    md: "h-32 w-32",
    lg: "h-56 w-56",
  };
  
  const colorClasses = {
    red: "border-[#e62e2e]",
    blue: "border-[#4cc4ff]",
    gold: "border-[#f5b308]",
    teal: "border-[#35ffdd]",
  };
  
  const bgClasses = {
    red: "bg-[#e62e2e20]",
    blue: "bg-[#4cc4ff20]",
    gold: "bg-[#f5b30820]",
    teal: "bg-[#35ffdd20]",
  };
  
  return (
    <motion.div
      className={`relative rounded-full flex items-center justify-center 
        ${sizeClasses[size]} 
        ${bgClasses[color]} 
        ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className={`absolute inset-0 rounded-full border ${colorClasses[color]} animate-pulse-glow`} />
      <motion.div 
        className={`absolute inset-2 rounded-full border border-dashed ${colorClasses[color]}`}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
