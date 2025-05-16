
import React from "react";
import { SubPageLayout } from "@/components/shared/SubPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

export default function LowStockAlerts() {
  const { t } = useLanguage();
  
  return (
    <SubPageLayout
      title="Low Stock Alerts"
      subtitle="Monitor inventory levels and reorder points"
      parentLink="/inventory"
      parentTitle="Inventory"
    >
      <Card>
        <CardHeader>
          <CardTitle>{t("Low Stock Alerts")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">{t("Low stock alerts content will be displayed here")}</p>
        </CardContent>
      </Card>
    </SubPageLayout>
  );
}
