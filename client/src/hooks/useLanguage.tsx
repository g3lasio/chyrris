import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { enTranslations } from '../translations/en';
import { esTranslations } from '../translations/es';

interface LanguageContextType {
  currentLanguage: 'en' | 'es';
  setLanguage: (lang: 'en' | 'es') => void;
  translations: typeof enTranslations;
  isEnglish: boolean;
  isSpanish: boolean;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Storage key for saving language preference
const LANGUAGE_STORAGE_KEY = 'chyrris_language_preference';

// Helper function to get saved language
const getSavedLanguage = (): 'en' | 'es' => {
  if (typeof window === 'undefined') return 'en';
  
  try {
    const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (savedLanguage === 'en' || savedLanguage === 'es') return savedLanguage;
    
    // Try to detect browser language
    const browserLang = navigator.language.split('-')[0].toLowerCase();
    if (browserLang === 'es') return 'es';
  } catch (error) {
    console.error('Error accessing localStorage:', error);
  }
  
  // Default to English
  return 'en';
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'es'>(getSavedLanguage);
  const [isChanging, setIsChanging] = useState(false);
  
  // Save language preference when it changes
  useEffect(() => {
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, currentLanguage);
      
      // Set html lang attribute for accessibility
      document.documentElement.lang = currentLanguage;
      
      // Apply a transition effect when changing languages
      if (isChanging) {
        const timer = setTimeout(() => {
          setIsChanging(false);
        }, 300);
        return () => clearTimeout(timer);
      }
    } catch (error) {
      console.error('Error saving language preference:', error);
    }
  }, [currentLanguage, isChanging]);
  
  const translations = currentLanguage === 'en' ? enTranslations : esTranslations;
  
  const setLanguage = (lang: 'en' | 'es') => {
    if (lang !== currentLanguage) {
      setIsChanging(true);
      setCurrentLanguage(lang);
    }
  };
  
  // Toggle between languages
  const toggleLanguage = () => {
    setLanguage(currentLanguage === 'en' ? 'es' : 'en');
  };
  
  const value = {
    currentLanguage, 
    setLanguage, 
    translations,
    isEnglish: currentLanguage === 'en',
    isSpanish: currentLanguage === 'es',
    toggleLanguage
  };
  
  return (
    <LanguageContext.Provider value={value}>
      <div className={isChanging ? 'opacity-50 transition-opacity duration-300' : 'transition-opacity duration-300'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  
  return context;
};
