import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ParticleBackground } from "@/components/ParticleBackground";
import { ScanEffect } from "@/components/ScanEffect";
import { useLanguage } from "@/hooks/useLanguage";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Technologies } from "@/sections/Technologies";
import { Applications } from "@/sections/Applications";
import { Contact } from "@/sections/Contact";
import { Footer } from "@/sections/Footer";

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
        <div className="container mx-auto px-4">
          <div className="relative rounded-lg flex justify-center items-center p-3 border border-[#4cc4ff40] bg-[#1a202c99] backdrop-blur-md">
            <img src="/chyrris-logo.png" alt="CHYRRIS" className="h-12" />
          </div>
          <div className="container mx-auto px-4">
            <div className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="hover:text-[#35ffdd] transition-colors text-sm uppercase tracking-wider"
                >
                  {link.label}
                </a>
              ))}
              
              <div className="flex space-x-2 ml-4">
                <button 
                  onClick={() => setLanguage('en')}
                  className={`px-2 py-1 text-xs rounded ${isEnglish ? 'bg-[#4cc4ff] text-white' : 'text-[#4cc4ff] border border-[#4cc4ff40]'}`}
                >
                  EN
                </button>
                <button 
                  onClick={() => setLanguage('es')}
                  className={`px-2 py-1 text-xs rounded ${isSpanish ? 'bg-[#4cc4ff] text-white' : 'text-[#4cc4ff] border border-[#4cc4ff40]'}`}
                >
                  ES
                </button>
              </div>
            </div>

            <div className="md:hidden flex items-center space-x-2">
              <div className="flex space-x-1 mr-2">
                <button 
                  onClick={() => setLanguage('en')}
                  className={`px-2 py-0.5 text-xs rounded ${isEnglish ? 'bg-[#4cc4ff] text-white' : 'text-[#4cc4ff] border border-[#4cc4ff40]'}`}
                >
                  EN
                </button>
                <button 
                  onClick={() => setLanguage('es')}
                  className={`px-2 py-0.5 text-xs rounded ${isSpanish ? 'bg-[#4cc4ff] text-white' : 'text-[#4cc4ff] border border-[#4cc4ff40]'}`}
                >
                  ES
                </button>
              </div>
              
              <button
                onClick={toggleMenu}
                className="text-[#4cc4ff] hover:text-[#35ffdd]"
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

          {/* Mobile menu */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden absolute top-full left-0 right-0 mt-2 mx-4 p-4 border border-[#4cc4ff40] bg-[#1a202cee] backdrop-blur-md rounded-lg z-50"
            >
              <div className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-white hover:text-[#35ffdd] transition-colors text-sm uppercase tracking-wider py-2 border-b border-[#4cc4ff20]"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
          </div>
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
