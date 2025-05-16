
import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { InventoryTable } from "@/components/inventory/InventoryTable";
import { InventoryStats } from "@/components/inventory/InventoryStats";
import { LowStockItems } from "@/components/inventory/LowStockItems";
import { PageHeader } from "@/components/shared/PageHeader";
import { useLanguage } from "@/contexts/LanguageContext";
import { SubPageNavigation } from "@/components/shared/SubPageNavigation";

export default function Inventory() {
  const { t } = useLanguage();
  
  const subPageLinks = [
    { title: "Stock Overview", href: "stock-overview", description: "Complete overview of current inventory" },
    { title: "Item Transfers", href: "item-transfers", description: "Manage movement of items between locations" },
    { title: "Damaged/Returned Items", href: "damaged-items", description: "Process damaged or returned inventory" },
    { title: "Low Stock Alerts", href: "low-stock", description: "Monitor items requiring reorder" },
    { title: "Inventory Reports", href: "reports", description: "Generate inventory reports and analysis" },
  ];
  
  return (
    <AppLayout>
      <PageHeader 
        title={t("Inventory")}
        subtitle={t("Inventory items requiring restock")}
      />
      
      {/* Sub-page navigation */}
      <SubPageNavigation links={subPageLinks} baseUrl="/inventory" />
      
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
