
import React from "react";
import { Button } from "@/components/ui/button";
import { OmanFlag } from "./OmanFlag";

export function LanguageToggle() {
  const [language, setLanguage] = React.useState("en");

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en");
    // In a real application, this would trigger a language change throughout the app
    console.log("Language changed to:", language === "en" ? "ar" : "en");
  };

  return (
    <Button 
      variant="outline" 
      size="sm" 
      className="flex items-center gap-2" 
      onClick={toggleLanguage}
    >
      <OmanFlag className="h-4 w-6" />
      {language === "en" ? "Change to Arabic" : "Change to English"}
    </Button>
  );
}
