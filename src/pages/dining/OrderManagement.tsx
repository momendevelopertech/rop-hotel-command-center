
import React from "react";
import { SubPageLayout } from "@/components/shared/SubPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

export default function OrderManagement() {
  const { t } = useLanguage();
  
  return (
    <SubPageLayout
      title="Order Management"
      subtitle="Track and manage food and beverage orders"
      parentLink="/dining"
      parentTitle="Dining & Catering"
    >
      <Card>
        <CardHeader>
          <CardTitle>{t("Order Management")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">{t("Order management content will be displayed here")}</p>
        </CardContent>
      </Card>
    </SubPageLayout>
  );
}
