
import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { translations } from "@/utils/translations";

type LanguageContextType = {
  language: "en" | "ar";
  setLanguage: (lang: "en" | "ar") => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
  translate: (text: string, category?: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useLocalStorage<"en" | "ar">("language", "en");
  
  // Update document direction when language changes
  useEffect(() => {
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
    
    // Add RTL class to body for Tailwind RTL support
    if (language === "ar") {
      document.body.classList.add("rtl");
      document.querySelector('.layout-container')?.classList.add('rtl-layout');
    } else {
      document.body.classList.remove("rtl");
      document.querySelector('.layout-container')?.classList.remove('rtl-layout');
    }
    
    // Force re-render components when language changes
    window.dispatchEvent(new Event('language-changed'));
  }, [language]);
  
  // Simple translation function
  const t = (key: string): string => {
    if (!key) return "";
    
    const translatedText = translations[language]?.[key];
    return translatedText || key; // Fallback to key if translation not found
  };
  
  // Function to translate data text based on category
  const translate = (text: string, category = "general"): string => {
    if (!text) return "";
    
    // Try to find a direct match in the translations
    if (translations[language]?.[text]) {
      return translations[language][text];
    }
    
    // If no direct match, look in the dataTranslations section
    const categoryTranslations = translations[language]?.dataTranslations?.[category];
    if (categoryTranslations?.[text]) {
      return categoryTranslations[text];
    }
    
    // Fallback to original text if no translation found
    return text;
  };
  
  // Explicitly type the dir variable as "ltr" | "rtl"
  const dir: "ltr" | "rtl" = language === "ar" ? "rtl" : "ltr";
  
  const value: LanguageContextType = {
    language,
    setLanguage,
    t,
    dir,
    translate
  };
  
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
