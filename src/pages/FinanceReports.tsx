
import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { TransactionsTable } from "@/components/finance/TransactionsTable";
import { FinanceStats } from "@/components/finance/FinanceStats";
import { RevenueAnalytics } from "@/components/finance/RevenueAnalytics";
import { PageHeader } from "@/components/shared/PageHeader";

export default function FinanceReports() {
  return (
    <AppLayout>
      <PageHeader 
        title="المالية والتقارير" 
        subtitle="إدارة العمليات المالية وتقارير الإيرادات"
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
