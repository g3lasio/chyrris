import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ParticleBackground } from "../components/ParticleBackground";
import { ScanEffect } from "../components/ScanEffect";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { useLanguage } from "../hooks/useLanguage";
import { Hero } from "../sections/Hero";
import { About } from "../sections/About";
import { Technologies } from "../sections/Technologies";
import { Applications } from "../sections/Applications";
import { Contact } from "../sections/Contact";
import { Footer } from "../sections/Footer";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const { currentLanguage, setLanguage, translations, isEnglish, isSpanish } = useLanguage();

  // Track scroll position for nav effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { href: "#about", label: translations.navigation.about },
    { href: "#technologies", label: translations.navigation.technologies },
    { href: "#applications", label: translations.navigation.applications },
    { href: "#contact", label: translations.navigation.contact },
  ];

  return (
    <main className="hex-bg min-h-screen relative overflow-x-hidden">
      <ParticleBackground />
      <ScanEffect />

      {/* HUD-style Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 w-full z-50 py-2 ${
          scrollY > 10 ? "bg-[#12172199] backdrop-blur-md" : ""
        }`}
      >
        {/* Holographic Header Effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzRjYzRmZjIwIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
          
          {/* Scan lines */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#35ffdd] to-transparent animate-scanner-y"></div>
          <div className="absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-transparent via-[#35ffdd] to-transparent animate-scanner-x"></div>
          
          {/* Edge highlights */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#4cc4ff] to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#4cc4ff] to-transparent"></div>
          
          {/* Random data points */}
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="absolute h-1 w-1 rounded-full bg-[#4cc4ff]"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.2
              }}
            ></div>
          ))}
        </div>
        
        <div className="container mx-auto px-4 relative">
          {/* Logo centered */}
          <div className="flex justify-between items-center">
            <div className="w-1/3 md:flex justify-start hidden">
              {/* Left side navigation */}
              <div className="flex space-x-4">
                {navLinks.slice(0, 2).map((link, index) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="hover:text-[#35ffdd] transition-colors text-sm uppercase tracking-wider relative group"
                  >
                    <span className="relative z-10">{link.label}</span>
                    
                    {/* Hover effect for nav items */}
                    <span className="absolute left-0 top-0 h-full w-0 bg-[#4cc4ff10] group-hover:w-full transition-all duration-300 -z-10"></span>
                    
                    {/* Data lines on hover */}
                    <span className="absolute top-full left-0 w-full h-[1px] bg-[#4cc4ff30] scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                    <span className="absolute top-full left-0 w-[1px] h-8 bg-[#4cc4ff30] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"></span>
                    <span className="absolute top-full right-0 w-[1px] h-8 bg-[#4cc4ff30] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"></span>
                    
                    {/* Tech analysis label */}
                    <motion.div 
                      className="absolute left-0 top-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      initial={false}
                    >
                      <div className="text-[8px] text-[#4cc4ff] font-mono whitespace-nowrap">
                        SECTION ID: {(index + 1).toString().padStart(2, '0')}
                      </div>
                      <div className="text-[8px] text-[#35ffdd] font-mono whitespace-nowrap">
                        TARGET LOCKED
                      </div>
                    </motion.div>
                  </a>
                ))}
              </div>
            </div>
            
            {/* Logo */}
            <div className="w-1/3 flex justify-center relative">
              <div className="relative rounded-lg flex justify-center items-center p-3 border border-[#4cc4ff40] bg-[#1a202c99] backdrop-blur-md overflow-hidden group">
                {/* Logo scan line */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-[#35ffdd50] animate-scan-y"></div>
                <div className="absolute top-0 left-0 h-full w-[1px] bg-[#35ffdd50] animate-scan-x"></div>
                
                {/* Circular pulse behind logo */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full border border-[#4cc4ff30] animate-pulse-fast"></div>
                  <div className="absolute w-12 h-12 rounded-full border border-[#4cc4ff40] animate-pulse-med"></div>
                  <div className="absolute w-8 h-8 rounded-full border border-[#4cc4ff50] animate-pulse-slow"></div>
                </div>
                
                {/* Corner brackets */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#4cc4ff] opacity-70"></div>
                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#4cc4ff] opacity-70"></div>
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#4cc4ff] opacity-70"></div>
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#4cc4ff] opacity-70"></div>
                
                {/* Actual logo */}
                <img 
                  src="https://i.postimg.cc/Cx6ZzsQS/Logo-chyrris.png" 
                  alt="CHYRRIS" 
                  className="h-12 w-auto object-contain relative z-10"
                />
                
                {/* Diagnostic text on hover */}
                <div className="absolute -bottom-20 left-0 w-full text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:-bottom-6 text-[8px] text-[#4cc4ff] font-mono pointer-events-none">
                  <div>SYSTEM ACTIVE</div>
                  <div>POWER: 100%</div>
                </div>
              </div>
              
              {/* Targeting effect around logo */}
              <div className="absolute -top-3 -left-3 opacity-0 group-hover:opacity-100">
                <div className="h-2 w-2 border-t border-l border-[#e62e2e] opacity-70"></div>
              </div>
              <div className="absolute -top-3 -right-3 opacity-0 group-hover:opacity-100">
                <div className="h-2 w-2 border-t border-r border-[#e62e2e] opacity-70"></div>
              </div>
              <div className="absolute -bottom-3 -left-3 opacity-0 group-hover:opacity-100">
                <div className="h-2 w-2 border-b border-l border-[#e62e2e] opacity-70"></div>
              </div>
              <div className="absolute -bottom-3 -right-3 opacity-0 group-hover:opacity-100">
                <div className="h-2 w-2 border-b border-r border-[#e62e2e] opacity-70"></div>
              </div>
            </div>
            
            <div className="w-1/3 md:flex justify-end hidden">
              {/* Right side navigation */}
              <div className="flex space-x-4 items-center">
                {navLinks.slice(2, 4).map((link, index) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="hover:text-[#35ffdd] transition-colors text-sm uppercase tracking-wider relative group"
                  >
                    <span className="relative z-10">{link.label}</span>
                    
                    {/* Hover effect for nav items */}
                    <span className="absolute left-0 top-0 h-full w-0 bg-[#4cc4ff10] group-hover:w-full transition-all duration-300 -z-10"></span>
                    
                    {/* Data lines on hover */}
                    <span className="absolute top-full left-0 w-full h-[1px] bg-[#4cc4ff30] scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                    <span className="absolute top-full left-0 w-[1px] h-8 bg-[#4cc4ff30] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"></span>
                    <span className="absolute top-full right-0 w-[1px] h-8 bg-[#4cc4ff30] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"></span>
                    
                    {/* Tech analysis label */}
                    <motion.div 
                      className="absolute right-0 top-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      initial={false}
                    >
                      <div className="text-right text-[8px] text-[#4cc4ff] font-mono whitespace-nowrap">
                        SECTION ID: {(index + 3).toString().padStart(2, '0')}
                      </div>
                      <div className="text-right text-[8px] text-[#35ffdd] font-mono whitespace-nowrap">
                        TARGET LOCKED
                      </div>
                    </motion.div>
                  </a>
                ))}
                
                <LanguageSwitcher variant="full" className="ml-4" />
              </div>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              <LanguageSwitcher variant="minimal" className="mr-2" />
              
              <button
                onClick={toggleMenu}
                className="text-[#4cc4ff] hover:text-[#35ffdd] relative"
              >
                {/* Menu button with scanning effect */}
                <div className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                  {/* Scanning effect on button */}
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-[#35ffdd50] animate-scan-y"></div>
                </div>
                
                {/* Status indicator */}
                <div className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-[#e62e2e] animate-pulse"></div>
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden absolute top-full left-0 right-0 mt-2 mx-4 p-4 border border-[#4cc4ff40] bg-[#1a202cee] backdrop-blur-md rounded-lg z-50"
            >
              <div className="flex flex-col space-y-4">
                {/* Technical data readout */}
                <div className="text-[8px] text-[#4cc4ff] font-mono mb-2">
                  SYSTEM STATUS: ACTIVE<br />
                  MENU INTERFACE: ONLINE<br />
                  SECURITY: NOMINAL
                </div>
                
                {navLinks.map((link, index) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-white hover:text-[#35ffdd] transition-colors text-sm uppercase tracking-wider py-2 border-b border-[#4cc4ff20] relative"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {/* Navigation item with scanning effect */}
                    <div className="flex items-center">
                      <div className="mr-2 h-2 w-2 rounded-full bg-[#4cc4ff30]"></div>
                      {link.label}
                    </div>
                    
                    {/* Scanning line for each item */}
                    <div 
                      className="absolute bottom-0 left-0 w-full h-[1px] bg-[#35ffdd]"
                      style={{ 
                        animation: `scan-x 2s linear infinite`,
                        animationDelay: `${index * 0.2}s`
                      }}
                    ></div>
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </motion.nav>

      {/* Main content sections */}
      <Hero />
      <About />
      <Technologies />
      <Applications />
      <Contact />
      <Footer />
    </main>
  );
}