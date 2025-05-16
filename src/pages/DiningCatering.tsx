
import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { DiningOrdersTable } from "@/components/dining/DiningOrdersTable";
import { DiningStats } from "@/components/dining/DiningStats";
import { MenuItems } from "@/components/dining/MenuItems";
import { PageHeader } from "@/components/shared/PageHeader";
import { useLanguage } from "@/contexts/LanguageContext";
import { useData } from "@/contexts/DataContext";

export default function DiningCatering() {
  const { t, language } = useLanguage();
  const { diningOrders } = useData();
  
  // Sample additional order based on requested data
  const demoOrder = {
    id: "1001",
    name: language === "ar" ? "منضدة 5" : "Table 5",
    timestamp: new Date().toISOString(),
    status: language === "ar" ? "مكتمل" : "Completed",
    items: [
      { name: language === "ar" ? "طبق رئيسي" : "Main Dish", quantity: 3 }
    ]
  };
  
  // Combine original orders with demo order
  const allOrders = [...diningOrders, demoOrder];
  
  // Transform diningOrders to match DiningOrdersTable expected format
  const formattedOrders = allOrders.map((order) => {
    // Parse the order.id to ensure it's a number
    const orderId = typeof order.id === 'string' ? parseInt(order.id, 10) || 0 : Number(order.id);
    
    return {
      id: orderId,
      tableNumber: order.name.includes("Table") || order.name.includes("منضدة") 
        ? order.name 
        : `${language === "ar" ? "منضدة" : "Table"} ${orderId % 20 + 1}`,
      server: order.name,
      items: order.items ? order.items.length : Math.floor(Math.random() * 5) + 1,
      total: parseFloat((Math.random() * 25 + 5).toFixed(2)),
      time: order.timestamp,
      status: order.status
    };
  });
  
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
        <DiningOrdersTable data={formattedOrders} />
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <MenuItems />
      </div>
    </AppLayout>
  );
}
