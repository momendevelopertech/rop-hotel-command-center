
import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { EmployeesTable } from "@/components/hr/EmployeesTable";
import { HRStats } from "@/components/hr/HRStats";
import { DepartmentDistribution } from "@/components/hr/DepartmentDistribution";
import { PageHeader } from "@/components/shared/PageHeader";
import { useLanguage } from "@/contexts/LanguageContext";

export default function HumanResources() {
  const { t } = useLanguage();
  
  return (
    <AppLayout>
      <PageHeader 
        title={t("Human Resources")}
        subtitle={t("Staff across all hotel departments")}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <HRStats />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="md:col-span-1">
          <DepartmentDistribution />
        </div>
        <div className="md:col-span-2">
          <EmployeesTable />
        </div>
      </div>
    </AppLayout>
  );
}
