
import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { InventoryTable } from "@/components/inventory/InventoryTable";
import { InventoryStats } from "@/components/inventory/InventoryStats";
import { LowStockItems } from "@/components/inventory/LowStockItems";
import { PageHeader } from "@/components/shared/PageHeader";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Inventory() {
  const { t } = useLanguage();
  
  return (
    <AppLayout>
      <PageHeader 
        title={t("Inventory")}
        subtitle={t("Inventory items requiring restock")}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <InventoryStats />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="md:col-span-1">
          <LowStockItems />
        </div>
        <div className="md:col-span-2">
          <InventoryTable />
        </div>
      </div>
    </AppLayout>
  );
}
