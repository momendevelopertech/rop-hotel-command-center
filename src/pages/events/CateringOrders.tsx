
import React from "react";
import { SubPageLayout } from "@/components/shared/SubPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

export default function CateringOrders() {
  const { t } = useLanguage();
  
  return (
    <SubPageLayout
      title="Catering Orders"
      subtitle="Manage food and beverage orders for events"
      parentLink="/events"
      parentTitle="Event Management"
    >
      <Card>
        <CardHeader>
          <CardTitle>{t("Catering Orders")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">{t("Catering orders content will be displayed here")}</p>
        </CardContent>
      </Card>
    </SubPageLayout>
  );
}
