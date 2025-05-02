import { Card, CardContent } from "../components/ui/card";
import { AlertCircle } from "lucide-react";
import { Link } from "wouter";
import { useLanguage } from "../hooks/useLanguage";
import { motion } from "framer-motion";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { ParticleBackground } from "../components/ParticleBackground";

export default function NotFound() {
  const { currentLanguage } = useLanguage();
  
  // Bilingual content
  const content = {
    title: currentLanguage === 'en' ? '404 Page Not Found' : '404 Página No Encontrada',
    message: currentLanguage === 'en' 
      ? 'The page you are looking for does not exist.' 
      : 'La página que estás buscando no existe.',
    backToHome: currentLanguage === 'en' ? 'Back to Home' : 'Volver al Inicio'
  };

  return (
    <div className="hex-bg min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden">
      <ParticleBackground />
      
      {/* Navigation bar with language switcher */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 w-full z-50 py-2 bg-[#12172199] backdrop-blur-md"
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link href="/">
              <div className="flex items-center space-x-2 text-[#4cc4ff] hover:text-[#35ffdd] cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                <span>{content.backToHome}</span>
              </div>
            </Link>
            
            <div className="relative flex justify-center items-center">
              <LanguageSwitcher variant="minimal" />
            </div>
          </div>
        </div>
      </motion.nav>
      
      {/* 404 Card */}
      <Card className="bg-[#1a202c99] border border-[#4cc4ff40] backdrop-blur-md text-white w-full max-w-md mx-4 relative z-10">
        <CardContent className="pt-6">
          <div className="flex items-center mb-4 gap-3">
            <div className="h-10 w-10 rounded-full bg-[#e62e2e20] border border-[#e62e2e] flex items-center justify-center">
              <AlertCircle className="h-6 w-6 text-[#e62e2e]" />
            </div>
            <h1 className="text-2xl font-bold text-[#e62e2e]">{content.title}</h1>
          </div>

          <p className="mt-4 text-gray-300 mb-6">
            {content.message}
          </p>
          
          <Link href="/">
            <div className="inline-block px-4 py-2 bg-[#4cc4ff] hover:bg-[#35ffdd] text-white font-bold rounded transition-colors cursor-pointer">
              {content.backToHome}
            </div>
          </Link>
          
          {/* Tech decoration */}
          <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b border-r border-[#e62e2e] opacity-70"></div>
          <div className="absolute -top-2 -left-2 w-4 h-4 border-t border-l border-[#e62e2e] opacity-70"></div>
        </CardContent>
      </Card>
    </div>
  );
}
