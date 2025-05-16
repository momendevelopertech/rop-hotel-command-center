
import React from "react";
import { SubPageLayout } from "@/components/shared/SubPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ItemTransfers() {
  const { t } = useLanguage();
  
  return (
    <SubPageLayout
      title="Item Transfers"
      subtitle="Manage movement of inventory between locations"
      parentLink="/inventory"
      parentTitle="Inventory"
    >
      <Card>
        <CardHeader>
          <CardTitle>{t("Item Transfers")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">{t("Item transfers content will be displayed here")}</p>
        </CardContent>
      </Card>
    </SubPageLayout>
  );
}
