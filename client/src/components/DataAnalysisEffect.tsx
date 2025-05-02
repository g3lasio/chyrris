import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface DataAnalysisEffectProps {
  active: boolean;
  x: number;
  y: number;
  label?: string;
}

export function DataAnalysisEffect({ active, x, y, label }: DataAnalysisEffectProps) {
  const [dataPoints, setDataPoints] = useState<string[]>([]);
  
  // Generate random data points when activated
  useEffect(() => {
    if (active) {
      const hexChars = "0123456789ABCDEF";
      const getRandomHex = (length: number) => 
        Array.from({ length }, () => hexChars[Math.floor(Math.random() * hexChars.length)]).join('');
      
      const newDataPoints = Array.from({ length: 5 }, () => getRandomHex(16));
      setDataPoints(newDataPoints);
    } else {
      setDataPoints([]);
    }
  }, [active]);
  
  if (!active) return null;
  
  return (
    <motion.div 
      className="fixed z-50 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      style={{
        top: y,
        left: x,
      }}
    >
      {/* Target circle */}
      <div className="relative">
        <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2">
          <div className="w-24 h-24 rounded-full border border-[#4cc4ff] opacity-30 animate-pulse-fast"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-[#4cc4ff] opacity-50 animate-pulse-med"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-[#4cc4ff] opacity-70 animate-pulse-slow"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#4cc4ff]"></div>
          
          {/* Target lines */}
          <div className="absolute top-1/2 left-0 w-24 h-[1px] bg-[#4cc4ff30]"></div>
          <div className="absolute top-0 left-1/2 h-24 w-[1px] bg-[#4cc4ff30]"></div>
          
          {/* Data analysis lines and points */}
          <motion.div 
            className="absolute top-1/2 left-full ml-2 flex flex-col items-start"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {label && (
              <div className="text-[#35ffdd] text-xs uppercase mb-1 font-bold tracking-wider">{label}</div>
            )}
            {dataPoints.map((point, index) => (
              <motion.div 
                key={index}
                className="text-[#4cc4ff] text-[10px] font-mono"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ duration: 0.2, delay: 0.1 * index }}
              >
                {`0x${point}`}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}