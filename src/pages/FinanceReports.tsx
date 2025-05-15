
import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { TransactionsTable } from "@/components/finance/TransactionsTable";
import { FinanceStats } from "@/components/finance/FinanceStats";
import { RevenueAnalytics } from "@/components/finance/RevenueAnalytics";
import { PageHeader } from "@/components/shared/PageHeader";
import { useLanguage } from "@/contexts/LanguageContext";

export default function FinanceReports() {
  const { t } = useLanguage();
  
  return (
    <AppLayout>
      <PageHeader 
        title={t("Finance & Reports")}
        subtitle={t("Total revenue from all departments")}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <FinanceStats />
      </div>
      
      <div className="grid grid-cols-1 gap-6 mb-6">
        <RevenueAnalytics />
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <TransactionsTable />
      </div>
    </AppLayout>
  );
}
