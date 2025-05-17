
import React, { createContext, useContext, useState } from "react";
import { translations, translationKeys } from "@/utils/translations";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface LanguageContextType {
  language: "en" | "ar";
  setLanguage: React.Dispatch<React.SetStateAction<"en" | "ar">>;
  t: (key: string, params?: Record<string, string | number>) => string;
  translate: (key: string, category?: string) => string;
  dir: "ltr" | "rtl";
}

const LanguageContext = createContext<LanguageContextType>({} as LanguageContextType);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useLocalStorage<"en" | "ar">("rop-language", "en");
  
  const dir = language === "ar" ? "rtl" : "ltr";
  
  // Translation function that can handle parameters
  const t = (key: string, params?: Record<string, string | number>): string => {
    if (!key) return "";
    
    // Get translated string from translations object
    let translated = translations[language][key];
    
    // If translation exists, return it, otherwise return the original key
    if (translated) {
      if (typeof translated === 'string') {
        // If we have parameters, replace placeholders with their values
        if (params) {
          Object.entries(params).forEach(([paramKey, paramValue]) => {
            const placeholder = `{{${paramKey}}}`;
            translated = translated.replace(placeholder, String(paramValue));
          });
        }
        return translated;
      }
      return key;
    }
    
    return key;
  };
  
  // Translation function that can handle categories
  const translate = (key: string, category?: string): string => {
    if (!key) return "";
    
    // If category is provided, look for translation in that category
    if (category && translationKeys[language][category]) {
      const categoryTranslations = translationKeys[language][category];
      const translated = categoryTranslations && categoryTranslations[key];
      if (translated && typeof translated === 'string') {
        return translated;
      }
    }
    
    // Fallback to general translations
    return t(key);
  };
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, translate, dir }}>
      <div dir={dir} lang={language}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
