
import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { MobileUsageStats } from "@/components/mobile/MobileUsageStats";
import { MobileInteractionsTable } from "@/components/mobile/MobileInteractionsTable";
import { MobileAppPreview } from "@/components/mobile/MobileAppPreview";
import { PageHeader } from "@/components/shared/PageHeader";

export default function MobileApp() {
  const [selectedScreen, setSelectedScreen] = useState<string>("home");

  return (
    <AppLayout>
      <PageHeader 
        title="تطبيق الهاتف" 
        subtitle="إدارة وتحليل استخدام تطبيق الهاتف المحمول"
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <MobileUsageStats />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="md:col-span-1">
          <MobileAppPreview screen={selectedScreen} setScreen={setSelectedScreen} />
        </div>
        <div className="md:col-span-2">
          <MobileInteractionsTable onSelectScreen={(screen) => setSelectedScreen(screen)} />
        </div>
      </div>
    </AppLayout>
  );
}
