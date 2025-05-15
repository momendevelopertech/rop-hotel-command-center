
import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { ReportsList } from "@/components/reports/ReportsList";
import { ReportGenerator } from "@/components/reports/ReportGenerator";
import { ReportStats } from "@/components/reports/ReportStats";
import { PageHeader } from "@/components/shared/PageHeader";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ReportsAnalytics() {
  const { t } = useLanguage();
  
  return (
    <AppLayout>
      <PageHeader 
        title={t("Reports & Analytics")}
        subtitle={t("Create and view analytical reports")}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <ReportStats />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="md:col-span-1">
          <ReportGenerator />
        </div>
        <div className="md:col-span-2">
          <ReportsList />
        </div>
      </div>
    </AppLayout>
  );
}
