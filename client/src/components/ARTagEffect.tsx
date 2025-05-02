import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ARTagProps {
  label: string;
  x: number;
  y: number;
  delay?: number;
  color?: 'blue' | 'gold' | 'red' | 'teal';
  pulseSize?: 'sm' | 'md' | 'lg';
  showData?: boolean;
}

export function ARTagEffect({
  label,
  x,
  y,
  delay = 0,
  color = 'blue',
  pulseSize = 'md',
  showData = true
}: ARTagProps) {
  const [isActive, setIsActive] = useState(false);
  const [data, setData] = useState<string[]>([]);
  
  // Colors
  const colors = {
    blue: 'rgba(76, 196, 255, ',
    gold: 'rgba(245, 179, 8, ',
    red: 'rgba(230, 46, 46, ',
    teal: 'rgba(53, 255, 221, '
  };
  
  const baseColor = colors[color];
  
  // Pulse size
  const sizes = {
    sm: { outer: 20, middle: 12, inner: 6 },
    md: { outer: 30, middle: 20, inner: 10 },
    lg: { outer: 50, middle: 35, inner: 16 }
  };
  
  const size = sizes[pulseSize];
  
  // Generate random data
  useEffect(() => {
    const generateData = () => {
      const metrics = [
        'ENERGY: ' + (Math.random() * 100).toFixed(1) + '%',
        'STRUCT: ' + (Math.random() * 100).toFixed(1) + '%',
        'X: ' + (Math.random() * 1000).toFixed(0),
        'Y: ' + (Math.random() * 1000).toFixed(0),
        'Z: ' + (Math.random() * 1000).toFixed(0),
      ];
      return metrics;
    };
    
    setData(generateData());
    
    const interval = setInterval(() => {
      if (isActive) {
        setData(generateData());
      }
    }, 2000);
    
    return () => clearInterval(interval);
  }, [isActive]);
  
  // Activate after delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsActive(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);
  
  if (!isActive) return null;
  
  return (
    <div 
      className="absolute pointer-events-none" 
      style={{ left: x, top: y }}
    >
      {/* Targeting circle */}
      <div className="relative">
        <motion.div 
          className="absolute rounded-full border-2"
          style={{ 
            borderColor: baseColor + '0.3)',
            width: size.outer, 
            height: size.outer,
            left: -size.outer / 2,
            top: -size.outer / 2
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
        
        <motion.div 
          className="absolute rounded-full border"
          style={{ 
            borderColor: baseColor + '0.5)',
            width: size.middle, 
            height: size.middle,
            left: -size.middle / 2,
            top: -size.middle / 2
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        />
        
        <motion.div 
          className="absolute rounded-full"
          style={{ 
            backgroundColor: baseColor + '0.8)',
            width: size.inner, 
            height: size.inner,
            left: -size.inner / 2,
            top: -size.inner / 2
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />

        {/* Cross lines */}
        <motion.div 
          className="absolute bg-gradient-to-r"
          style={{ 
            background: `linear-gradient(90deg, transparent, ${baseColor}0.8), transparent)`,
            height: 1, 
            width: size.outer * 1.5,
            left: -size.outer * 0.75,
            top: -0.5
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 0.5 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        />
        
        <motion.div 
          className="absolute bg-gradient-to-b"
          style={{ 
            background: `linear-gradient(180deg, transparent, ${baseColor}0.8), transparent)`,
            width: 1, 
            height: size.outer * 1.5,
            top: -size.outer * 0.75,
            left: -0.5
          }}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 0.5 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        />
        
        {/* Label */}
        <motion.div 
          className="absolute whitespace-nowrap"
          style={{ 
            color: baseColor + '1)',
            fontSize: '10px',
            fontFamily: 'monospace',
            top: -25,
            left: 10
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          {label}
        </motion.div>
        
        {/* Data lines */}
        {showData && (
          <motion.div 
            className="absolute left-[15px] top-[5px] flex flex-col"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            {data.map((line, i) => (
              <motion.div 
                key={i}
                className="text-[10px] font-mono whitespace-nowrap"
                style={{ color: baseColor + '0.9)' }}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 0.9, x: 0 }}
                transition={{ duration: 0.2, delay: 0.5 + (i * 0.1) }}
              >
                {line}
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}