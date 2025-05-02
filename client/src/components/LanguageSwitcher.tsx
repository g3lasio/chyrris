import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';

interface LanguageSwitcherProps {
  variant?: 'default' | 'minimal' | 'full';
  className?: string;
}

export function LanguageSwitcher({ variant = 'default', className = '' }: LanguageSwitcherProps) {
  const { currentLanguage, setLanguage, isEnglish, isSpanish, toggleLanguage } = useLanguage();
  
  // Minimal variant (just one toggle button)
  if (variant === 'minimal') {
    return (
      <button 
        onClick={toggleLanguage}
        className={`relative armor-plate p-1 px-2 py-1 text-xs rounded flex items-center space-x-1 ${className}`}
      >
        <span className={`transition-colors ${isEnglish ? 'text-[#4cc4ff] font-bold' : 'text-gray-400'}`}>EN</span>
        <span className="text-gray-500">/</span>
        <span className={`transition-colors ${isSpanish ? 'text-[#4cc4ff] font-bold' : 'text-gray-400'}`}>ES</span>
        
        {/* Active indicator */}
        <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#35ffdd] animate-pulse"></div>
        
        {/* Scan line effect */}
        <div className="absolute left-0 top-0 w-full h-[1px] bg-[#35ffdd30] animate-scan-y"></div>
      </button>
    );
  }
  
  // Full variant with animation and enhanced effects
  if (variant === 'full') {
    return (
      <div className={`flex space-x-2 relative armor-plate p-1 ${className}`}>
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-[#4cc4ff15] to-transparent"
          animate={{ 
            x: ['-100%', '100%'],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 2,
            ease: 'linear',
          }}
        />
        
        <button 
          onClick={() => setLanguage('en')}
          className={`px-2 py-1 text-xs rounded relative transition-all duration-300 
            ${isEnglish 
              ? 'bg-[#4cc4ff] text-white' 
              : 'text-[#4cc4ff] border border-[#4cc4ff40] hover:bg-[#4cc4ff20]'
            }`}
        >
          EN
          {isEnglish && (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#35ffdd] animate-pulse"
            />
          )}
        </button>
        
        <button 
          onClick={() => setLanguage('es')}
          className={`px-2 py-1 text-xs rounded relative transition-all duration-300
            ${isSpanish 
              ? 'bg-[#4cc4ff] text-white' 
              : 'text-[#4cc4ff] border border-[#4cc4ff40] hover:bg-[#4cc4ff20]'
            }`}
        >
          ES
          {isSpanish && (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#35ffdd] animate-pulse"
            />
          )}
        </button>
        
        {/* Corner indicators for active state */}
        <div className="absolute -top-1 -right-1 w-1 h-1 border-t border-r border-[#35ffdd60]"></div>
        <div className="absolute -bottom-1 -left-1 w-1 h-1 border-b border-l border-[#35ffdd60]"></div>
        
        {/* Diagnostic data */}
        <div className="absolute -bottom-5 left-0 w-full text-[8px] text-[#4cc4ff70] font-mono pointer-events-none text-center">
          {currentLanguage.toUpperCase()} ACTIVE
        </div>
      </div>
    );
  }
  
  // Default variant
  return (
    <div className={`flex space-x-2 relative armor-plate p-1 ${className}`}>
      <button 
        onClick={() => setLanguage('en')}
        className={`px-2 py-1 text-xs rounded relative ${isEnglish ? 'bg-[#4cc4ff] text-white' : 'text-[#4cc4ff] border border-[#4cc4ff40]'}`}
      >
        EN
        {isEnglish && (
          <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#35ffdd] animate-pulse"></div>
        )}
      </button>
      
      <button 
        onClick={() => setLanguage('es')}
        className={`px-2 py-1 text-xs rounded relative ${isSpanish ? 'bg-[#4cc4ff] text-white' : 'text-[#4cc4ff] border border-[#4cc4ff40]'}`}
      >
        ES
        {isSpanish && (
          <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#35ffdd] animate-pulse"></div>
        )}
      </button>
    </div>
  );
}