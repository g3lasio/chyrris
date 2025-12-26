import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ParticleBackground } from "../components/ParticleBackground";
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
    <main className="min-h-screen relative overflow-x-hidden bg-[#0a0d12]">
      <ParticleBackground />

      {/* Premium Glassmorphism Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 w-full z-50 py-4 transition-all duration-500 ${
          scrollY > 10 
            ? "bg-[#0a0d12]/80 backdrop-blur-xl border-b border-[#4cc4ff]/10" 
            : ""
        }`}
      >
        <div className="container mx-auto px-6 relative">
          {/* Clean header layout */}
          <div className="flex justify-between items-center">
            {/* Desktop Navigation - Left */}
            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-white hover:text-[#4cc4ff] transition-colors text-sm uppercase tracking-wider relative group"
                  data-testid={`nav-${link.href.replace('#', '')}`}
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#4cc4ff] group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
            </div>
            
            {/* Clean Logo */}
            <div className="absolute left-1/2 transform -translate-x-1/2 md:relative md:left-auto md:transform-none">
              <img 
                src="https://i.postimg.cc/Cx6ZzsQS/Logo-chyrris.png" 
                alt="CHYRRIS" 
                className="h-10 w-auto object-contain"
                data-testid="logo"
              />
            </div>
            
            {/* Desktop Language Switcher - Right */}
            <div className="hidden md:flex items-center">
              <LanguageSwitcher variant="default" />
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-3">
              <LanguageSwitcher variant="minimal" />
              
              <button
                onClick={toggleMenu}
                className="text-[#4cc4ff] hover:text-[#35ffdd] transition-colors"
                data-testid="mobile-menu-button"
              >
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
              </button>
            </div>
          </div>

          {/* Clean Mobile menu */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden absolute top-full left-0 right-0 mt-2 mx-4 p-6 bg-[#0a0d12]/95 backdrop-blur-xl rounded-2xl border border-[#4cc4ff]/10 shadow-2xl"
            >
              <div className="flex flex-col space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-white/80 hover:text-[#4cc4ff] hover:bg-[#4cc4ff]/5 transition-all text-sm uppercase tracking-wider py-3 px-4 rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </motion.nav>

      {/* Main content sections - Reorganized for impact */}
      <Hero />
      <Technologies />
      <Applications />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}