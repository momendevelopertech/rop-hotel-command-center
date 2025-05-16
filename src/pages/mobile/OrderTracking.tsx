
import React from "react";
import { SubPageLayout } from "@/components/shared/SubPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

export default function OrderTracking() {
  const { t } = useLanguage();
  
  return (
    <SubPageLayout
      title="Order Tracking"
      subtitle="Monitor meal and service orders through the app"
      parentLink="/mobile-app"
      parentTitle="Mobile App"
    >
      <Card>
        <CardHeader>
          <CardTitle>{t("Order Tracking")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">{t("Order tracking content will be displayed here")}</p>
        </CardContent>
      </Card>
    </SubPageLayout>
  );
}
