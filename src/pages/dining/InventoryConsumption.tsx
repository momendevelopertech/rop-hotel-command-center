
import React from "react";
import { SubPageLayout } from "@/components/shared/SubPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

export default function InventoryConsumption() {
  const { t } = useLanguage();
  
  return (
    <SubPageLayout
      title="Inventory Consumption"
      subtitle="Track ingredient usage and stock levels"
      parentLink="/dining"
      parentTitle="Dining & Catering"
    >
      <Card>
        <CardHeader>
          <CardTitle>{t("Inventory Consumption")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">{t("Inventory consumption content will be displayed here")}</p>
        </CardContent>
      </Card>
    </SubPageLayout>
  );
}
