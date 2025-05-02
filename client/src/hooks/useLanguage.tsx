import React, { createContext, useContext, useState, ReactNode } from 'react';
import { enTranslations } from '../translations/en';
import { esTranslations } from '../translations/es';

interface LanguageContextType {
  currentLanguage: 'en' | 'es';
  setLanguage: (lang: 'en' | 'es') => void;
  translations: typeof enTranslations;
  isEnglish: boolean;
  isSpanish: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'es'>('en');
  
  const translations = currentLanguage === 'en' ? enTranslations : esTranslations;
  
  const setLanguage = (lang: 'en' | 'es') => {
    setCurrentLanguage(lang);
  };
  
  return (
    <LanguageContext.Provider 
      value={{ 
        currentLanguage, 
        setLanguage, 
        translations,
        isEnglish: currentLanguage === 'en',
        isSpanish: currentLanguage === 'es'
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  
  return context;
}
