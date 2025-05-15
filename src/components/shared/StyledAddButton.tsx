
import React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface StyledAddButtonProps extends ButtonProps {
  label?: string;
}

export const StyledAddButton = ({ 
  label = "Add New Booking", 
  className, 
  ...props 
}: StyledAddButtonProps) => {
  const { t } = useLanguage();
  
  return (
    <Button
      className={`bg-[#9b87f5] hover:bg-[#7E69AB] text-white font-medium px-4 py-2 rounded-md shadow-md transition-all transform hover:translate-y-[-2px] ${className}`}
      {...props}
    >
      <Plus className="mr-1 h-4 w-4" />
      {t(label)}
    </Button>
  );
};
