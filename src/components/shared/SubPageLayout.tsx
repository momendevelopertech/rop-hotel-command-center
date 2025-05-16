
import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SubPageLayoutProps {
  title: string;
  subtitle?: string;
  parentLink: string;
  parentTitle: string;
  children: React.ReactNode;
}

export function SubPageLayout({ 
  title, 
  subtitle, 
  parentLink,
  parentTitle,
  children 
}: SubPageLayoutProps) {
  const { t, dir } = useLanguage();

  return (
    <AppLayout>
      <div className="mb-6">
        <Link to={parentLink} className={`flex items-center text-rop-blue mb-2 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
          <ChevronLeft className={`h-4 w-4 ${dir === "rtl" ? "rotate-180 ml-1" : "mr-1"}`} />
          <span>{t(parentTitle)}</span>
        </Link>
        <PageHeader 
          title={t(title)} 
          subtitle={subtitle ? t(subtitle) : undefined} 
        />
      </div>
      {children}
    </AppLayout>
  );
}
