
import { useLanguage } from "@/contexts/LanguageContext";

/**
 * Hook to consistently translate content based on the current language
 */
export function useTranslation() {
  const { language, t, translate } = useLanguage();
  
  /**
   * Translate a collection of objects with specific fields
   * @param items Array of objects to translate
   * @param fields Object mapping field names to translation categories
   */
  const translateCollection = <T extends Record<string, any>>(
    items: T[], 
    fields: Record<string, string>
  ): T[] => {
    return items.map(item => {
      const translatedItem = { ...item };
      
      // Translate each specified field using the appropriate category
      Object.entries(fields).forEach(([field, category]) => {
        const fieldName = field as keyof T;
        if (item[fieldName]) {
          // Use type assertion to handle the generic indexing
          translatedItem[fieldName] = translate(String(item[fieldName]), category) as any;
        }
      });
      
      return translatedItem;
    });
  };
  
  return {
    t,
    translate,
    translateCollection,
    language
  };
}

/**
 * Utility function to determine text direction based on language
 */
export function getTextDirection(language: string): "ltr" | "rtl" {
  return language === "ar" ? "rtl" : "ltr";
}
