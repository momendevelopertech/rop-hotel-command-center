
import React from "react";
import { Button } from "@/components/ui/button";
import { OmanFlag } from "./OmanFlag";
import { useLanguage } from "@/contexts/LanguageContext";

export function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "ar" : "en";
    setLanguage(newLanguage);
    console.log("Language changed to:", newLanguage);
  };

  return (
    <Button 
      variant="outline" 
      size="sm" 
      className="flex items-center gap-2" 
      onClick={toggleLanguage}
    >
      <OmanFlag className="h-4 w-6" />
      {language === "en" ? t("Change to Arabic") : t("Change to English")}
    </Button>
  );
}
