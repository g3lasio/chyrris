import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function HolographicHeader() {
  const [scanLines, setScanLines] = useState<{ id: number; position: number; opacity: number; width: number }[]>([]);
  const [dataPoints, setDataPoints] = useState<{ id: number; x: number; y: number; size: number; opacity: number }[]>([]);
  const [activePulse, setActivePulse] = useState(false);

  // Generate horizontal scan lines
  useEffect(() => {
    const lines = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      position: Math.random() * 100,
      opacity: Math.random() * 0.5 + 0.25,
      width: Math.random() * 50 + 50,
    }));
    setScanLines(lines);

    const interval = setInterval(() => {
      setScanLines(prev => 
        prev.map(line => ({
          ...line,
          position: (line.position + 0.5) % 100,
          opacity: Math.random() * 0.5 + 0.25,
          width: Math.random() * 50 + 50,
        }))
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Generate data points for holographic analysis effect
  useEffect(() => {
    const points = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 5 + 1,
      opacity: Math.random() * 0.8 + 0.2,
    }));
    setDataPoints(points);

    const interval = setInterval(() => {
      setDataPoints(prev => 
        prev.map(point => ({
          ...point,
          x: (point.x + (Math.random() * 2 - 1)) % 100,
          y: (point.y + (Math.random() * 2 - 1)) % 100,
          opacity: Math.max(0.2, Math.min(1, point.opacity + (Math.random() * 0.2 - 0.1))),
        }))
      );
    }, 200);

    return () => clearInterval(interval);
  }, []);

  // Create pulse effect
  useEffect(() => {
    const interval = setInterval(() => {
      setActivePulse(true);
      setTimeout(() => setActivePulse(false), 1000);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Horizontal scan lines */}
      {scanLines.map(line => (
        <div 
          key={line.id}
          className="absolute h-[1px] bg-[#4cc4ff]"
          style={{
            top: `${line.position}%`,
            width: `${line.width}%`,
            opacity: line.opacity,
            left: `${Math.random() * (100 - line.width)}%`,
          }}
        />
      ))}

      {/* Data points */}
      {dataPoints.map(point => (
        <div 
          key={point.id}
          className="absolute rounded-full bg-[#4cc4ff]"
          style={{
            top: `${point.y}%`,
            left: `${point.x}%`,
            width: `${point.size}px`,
            height: `${point.size}px`,
            opacity: point.opacity,
          }}
        />
      ))}

      {/* Circular pulse effect */}
      <div 
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#35ffdd] transition-all duration-1000 ${
          activePulse ? 'opacity-0 w-[200%] h-[200%]' : 'opacity-100 w-[0%] h-[0%]'
        }`}
      />

      {/* Radar scan effect */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#35ffdd] to-transparent animate-scanner-y" />
        <div className="absolute top-0 left-0 h-full w-[2px] bg-gradient-to-b from-transparent via-[#35ffdd] to-transparent animate-scanner-x" />
      </div>

      {/* Holographic grid overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzRjYzRmZjIwIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" />

      {/* Edge highlights */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#4cc4ff] to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#4cc4ff] to-transparent" />
      <div className="absolute top-0 left-0 h-full w-[1px] bg-gradient-to-b from-transparent via-[#4cc4ff] to-transparent" />
      <div className="absolute top-0 right-0 h-full w-[1px] bg-gradient-to-b from-transparent via-[#4cc4ff] to-transparent" />
    </div>
  );
}