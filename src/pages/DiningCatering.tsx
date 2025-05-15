
import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { DiningOrdersTable } from "@/components/dining/DiningOrdersTable";
import { DiningStats } from "@/components/dining/DiningStats";
import { MenuItems } from "@/components/dining/MenuItems";
import { PageHeader } from "@/components/shared/PageHeader";
import { useLanguage } from "@/contexts/LanguageContext";

export default function DiningCatering() {
  const { t } = useLanguage();
  
  return (
    <AppLayout>
      <PageHeader 
        title={t("Dining & Catering")} 
        subtitle={t("Mess hall and catering orders in process")}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <DiningStats />
      </div>
      
      <div className="grid grid-cols-1 gap-6 mb-6">
        <DiningOrdersTable />
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <MenuItems />
      </div>
    </AppLayout>
  );
}
