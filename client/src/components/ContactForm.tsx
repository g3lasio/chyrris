import { useState } from "react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { currentLanguage, translations } = useLanguage();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: translations.contact.formError,
        description: translations.contact.fillAllFields,
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      const response = await apiRequest("POST", "/api/contact", formData);
      
      if (response.ok) {
        toast({
          title: translations.contact.success,
          description: translations.contact.messageSent,
        });
        
        // Reset form
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: ""
        });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      toast({
        title: translations.contact.error,
        description: translations.contact.tryAgain,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <motion.form 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
    >
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-[#f5b308] mb-1">
          {translations.contact.designation}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full bg-[#12172180] border border-[#4cc4ff30] rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#4cc4ff]"
        />
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-[#f5b308] mb-1">
          {translations.contact.communicationChannel}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full bg-[#12172180] border border-[#4cc4ff30] rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#4cc4ff]"
        />
      </div>
      
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-[#f5b308] mb-1">
          {translations.contact.transmissionSubject}
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className="w-full bg-[#12172180] border border-[#4cc4ff30] rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#4cc4ff]"
        />
      </div>
      
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-[#f5b308] mb-1">
          {translations.contact.messageContents}
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className="w-full bg-[#12172180] border border-[#4cc4ff30] rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#4cc4ff]"
        />
      </div>
      
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#e62e2e] hover:bg-opacity-90 text-white py-3 rounded-md uppercase tracking-wider text-sm flex items-center justify-center disabled:opacity-70"
        >
          <span>{translations.contact.transmitMessage}</span>
          {isSubmitting ? (
            <svg className="animate-spin ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
            </svg>
          )}
        </button>
      </div>
    </motion.form>
  );
}
