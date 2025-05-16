
import React from "react";
import { SubPageLayout } from "@/components/shared/SubPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

export default function DamagedReturnedItems() {
  const { t } = useLanguage();
  
  return (
    <SubPageLayout
      title="Damaged/Returned Items"
      subtitle="Process defective or returned inventory"
      parentLink="/inventory"
      parentTitle="Inventory"
    >
      <Card>
        <CardHeader>
          <CardTitle>{t("Damaged/Returned Items")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">{t("Damaged and returned items content will be displayed here")}</p>
        </CardContent>
      </Card>
    </SubPageLayout>
  );
}
