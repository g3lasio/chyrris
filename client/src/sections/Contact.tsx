import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { ContactForm } from "@/components/ContactForm";

export function Contact() {
  const { translations } = useLanguage();

  return (
    <section id="contact" className="py-32 relative">
      {/* Clean gradient background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0d12] via-[#0f1419] to-[#0a0d12]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(76,196,255,0.05)_0%,_transparent_50%)]"></div>
      </div>
      
      <div className="container mx-auto px-6 z-10 relative">
        {/* Section header */}
        <div className="text-center mb-20">
          <motion.span 
            className="text-[#35ffdd] text-sm uppercase tracking-widest"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {translations.contact.establishTitle}
          </motion.span>
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mt-4 text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {translations.contact.title}
          </motion.h2>
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-[#35ffdd] to-[#4cc4ff] mx-auto mt-6"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="p-8 rounded-2xl bg-[#0f1419]/80 backdrop-blur-xl border border-[#4cc4ff]/10"
          >
            <h3 className="text-lg font-semibold text-white mb-6">{translations.contact.sendTransmission}</h3>
            <ContactForm />
          </motion.div>
          
          {/* Contact Info */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Location Card */}
            <div className="p-8 rounded-2xl bg-[#0f1419]/80 backdrop-blur-xl border border-[#4cc4ff]/10">
              <h3 className="text-lg font-semibold text-white mb-6">{translations.contact.headquarters}</h3>
              
              <div className="aspect-video rounded-xl bg-gradient-to-br from-[#4cc4ff]/10 to-[#35ffdd]/5 flex items-center justify-center mb-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(76,196,255,0.1)_0%,_transparent_70%)]"></div>
                <div className="text-center relative z-10">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#4cc4ff]/10 border border-[#4cc4ff]/30 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#4cc4ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <p className="text-[#4cc4ff] font-bold text-lg">{translations.contact.sanFrancisco}</p>
                </div>
              </div>
              
              <p className="text-gray-400 font-rajdhani">{translations.contact.locationDescription}</p>
            </div>
            
            {/* Direct Communications */}
            <div className="p-8 rounded-2xl bg-[#0f1419]/80 backdrop-blur-xl border border-[#4cc4ff]/10">
              <h3 className="text-lg font-semibold text-white mb-6">{translations.contact.directCommunications}</h3>
              
              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#e62e2e]/10 flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#e62e2e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">{translations.contact.emailChannel}</p>
                    <p className="text-white font-semibold">info@chyrris.com</p>
                  </div>
                </div>
                
                <div className="h-px bg-gradient-to-r from-transparent via-[#4cc4ff]/20 to-transparent"></div>
                
                {/* Hours */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#4cc4ff]/10 flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#4cc4ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">{translations.contact.operatingHours}</p>
                    <p className="text-white font-semibold">{translations.contact.operatingTimes}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
