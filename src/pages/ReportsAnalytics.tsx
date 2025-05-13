
import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { ReportsList } from "@/components/reports/ReportsList";
import { ReportGenerator } from "@/components/reports/ReportGenerator";
import { ReportStats } from "@/components/reports/ReportStats";
import { PageHeader } from "@/components/shared/PageHeader";

export default function ReportsAnalytics() {
  return (
    <AppLayout>
      <PageHeader 
        title="التقارير والتحليلات" 
        subtitle="إنشاء وعرض التقارير التحليلية"
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
