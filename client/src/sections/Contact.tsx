import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { HudPanel } from "@/components/HudPanel";
import { TechCircle } from "@/components/TechCircle";
import { ContactForm } from "@/components/ContactForm";

export function Contact() {
  const { translations } = useLanguage();

  return (
    <section id="contact" className="py-20 relative">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1483478550801-ceba5fe50e8e" 
          alt="Tech background" 
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121721] via-[#121721ee] to-[#121721cc]"></div>
      </div>
      
      <div className="container mx-auto px-4 z-10 relative">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl font-bold inline-block relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#35ffdd] glow-text">{translations.contact.establishTitle}</span> {translations.contact.title}
            <div className="h-1 w-full bg-[#4cc4ff] mt-2"></div>
          </motion.h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <HudPanel code="CONTACT-001" title={translations.contact.sendTransmission}>
            <ContactForm />
          </HudPanel>
          
          <div className="flex flex-col space-y-6">
            <HudPanel code="LOCATION-001" title={translations.contact.headquarters}>
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000" 
                  alt="San Francisco" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[#12172199]"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <TechCircle color="blue" size="md" className="h-24 w-24 animate-pulse">
                    <div 
                      className="h-16 w-16 border-2 border-dashed border-[#f5b308] rounded-full" 
                      style={{animation: "rotate 20s linear infinite"}}
                    ></div>
                  </TechCircle>
                  <p className="text-[#4cc4ff] font-bold mt-2">{translations.contact.sanFrancisco}</p>
                </div>
              </div>
              
              <div className="mt-4 text-gray-300 font-rajdhani">
                <p>{translations.contact.locationDescription}</p>
              </div>
            </HudPanel>
            
            <HudPanel code="CONNECT-001" title={translations.contact.directCommunications} className="flex-1">
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-[#e62e2e20] border border-[#e62e2e] flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#e62e2e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[#f5b308] text-sm">{translations.contact.emailChannel}</p>
                    <p className="text-white font-rajdhani">info@chyrris.com</p>
                  </div>
                </div>
                
                <div className="w-full h-1 bg-gradient-to-r from-[#e62e2e] to-[#4cc4ff] my-4"></div>
                
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-[#4cc4ff20] border border-[#4cc4ff] flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#4cc4ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[#f5b308] text-sm">{translations.contact.operatingHours}</p>
                    <p className="text-white font-rajdhani">{translations.contact.operatingTimes}</p>
                  </div>
                </div>
              </div>
            </HudPanel>
          </div>
        </div>
      </div>
    </section>
  );
}
