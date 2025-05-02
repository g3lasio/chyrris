import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// Interface for data display
interface DataMetric {
  id: number;
  label: string;
  value: number;
  maxValue: number;
  color: string;
  unit: string;
}

export function HolographicInterface() {
  const [metrics, setMetrics] = useState<DataMetric[]>([
    { id: 1, label: "SYSTEM", value: 87, maxValue: 100, color: "#4cc4ff", unit: "%" },
    { id: 2, label: "ENERGY", value: 62, maxValue: 100, color: "#f5b308", unit: "%" },
    { id: 3, label: "NETWORK", value: 93, maxValue: 100, color: "#35ffdd", unit: "%" },
    { id: 4, label: "SECURITY", value: 76, maxValue: 100, color: "#e62e2e", unit: "%" },
  ]);
  
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const [bootSequence, setBootSequence] = useState(true);
  const [statusText, setStatusText] = useState("INITIALIZING...");
  
  // Simulate changing data
  useEffect(() => {
    if (bootSequence) {
      // Simulate boot sequence
      const bootTimer = setTimeout(() => {
        setBootSequence(false);
        setStatusText("ONLINE");
      }, 2000);
      
      return () => clearTimeout(bootTimer);
    }
    
    const interval = setInterval(() => {
      setMetrics(prev => 
        prev.map(metric => ({
          ...metric,
          value: Math.min(metric.maxValue, Math.max(50, metric.value + (Math.random() * 10 - 5))),
        }))
      );
    }, 2000);
    
    return () => clearInterval(interval);
  }, [bootSequence]);

  return (
    <div className="relative z-10">
      <div className="relative p-4 border border-[#4cc4ff40] bg-[#12172180] backdrop-blur-sm rounded-lg overflow-hidden">
        {/* Scan line effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-[#4cc4ff80] animate-scan-y"></div>
        </div>
        
        {/* Header */}
        <div className="flex justify-between items-center mb-3 border-b border-[#4cc4ff30] pb-2">
          <div className="flex items-center">
            <div className="h-3 w-3 rounded-full bg-[#35ffdd] animate-pulse mr-2"></div>
            <h3 className="text-[#35ffdd] text-xs uppercase tracking-widest font-bold">System Status</h3>
          </div>
          <div className="text-[#4cc4ff] text-xs font-mono">{statusText}</div>
        </div>
        
        {/* Boot sequence display */}
        {bootSequence ? (
          <div className="flex flex-col space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.15 }}
                className="text-[#4cc4ff] text-xs font-mono"
              >
                {`> LOADING MODULE ${i + 1}... ${Math.random() > 0.8 ? "WARNING" : "OK"}`}
              </motion.div>
            ))}
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2 }}
              className="h-1 bg-[#35ffdd]"
            />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {metrics.map(metric => (
              <motion.div 
                key={metric.id}
                className="relative"
                onMouseEnter={() => setActiveSection(metric.id)}
                onMouseLeave={() => setActiveSection(null)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex justify-between mb-1">
                  <div className="text-[#ffffff] text-xs">{metric.label}</div>
                  <div className="text-[#ffffff] text-xs">{`${Math.round(metric.value)}${metric.unit}`}</div>
                </div>
                <div className="w-full h-1 bg-[#4cc4ff20] rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full rounded-full"
                    style={{ backgroundColor: metric.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${(metric.value / metric.maxValue) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                
                {/* Expanded data when hovered */}
                {activeSection === metric.id && (
                  <motion.div 
                    className="absolute top-0 left-full ml-2 w-32 p-2 bg-[#12172180] border border-[#4cc4ff40] rounded z-10"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="text-[#35ffdd] text-xs mb-1">{metric.label} DETAILS</div>
                    <div className="text-[#ffffff] text-xs flex justify-between">
                      <span>STATUS:</span>
                      <span className={metric.value > 70 ? "text-[#35ffdd]" : "text-[#e62e2e]"}>
                        {metric.value > 70 ? "OPTIMAL" : "ATTENTION"}
                      </span>
                    </div>
                    <div className="text-[#ffffff] text-xs flex justify-between">
                      <span>SIGNAL:</span>
                      <span>{Math.round(metric.value * 0.7 + Math.random() * 20)}hz</span>
                    </div>
                    <div className="text-[#ffffff] text-xs flex justify-between">
                      <span>UPTIME:</span>
                      <span>{Math.round(Math.random() * 100)}h</span>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        )}
        
        {/* Bottom diagnostic text */}
        <div className="mt-3 pt-2 border-t border-[#4cc4ff30] text-[#4cc4ff] text-[10px] font-mono overflow-hidden whitespace-nowrap">
          <motion.div
            animate={{ x: [0, -500] }}
            transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
          >
            SYS.DIAGNOSTIC: ALL SYSTEMS NOMINAL • QUANTUM PROCESSORS ONLINE • AI ASSISTANCE READY • BIOMETRIC IDENTIFICATION ACTIVE • NEURAL INTERFACE STABLE • GLOBAL NETWORK CONNECTED
          </motion.div>
        </div>
      </div>
    </div>
  );
}