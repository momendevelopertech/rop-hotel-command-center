
import React from "react";
import { SubPageLayout } from "@/components/shared/SubPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

export default function InventoryReports() {
  const { t } = useLanguage();
  
  return (
    <SubPageLayout
      title="Inventory Reports"
      subtitle="Generate and view inventory analytics"
      parentLink="/inventory"
      parentTitle="Inventory"
    >
      <Card>
        <CardHeader>
          <CardTitle>{t("Inventory Reports")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">{t("Inventory reports content will be displayed here")}</p>
        </CardContent>
      </Card>
    </SubPageLayout>
  );
}
