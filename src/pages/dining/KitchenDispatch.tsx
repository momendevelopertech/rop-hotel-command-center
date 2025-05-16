
import React from "react";
import { SubPageLayout } from "@/components/shared/SubPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

export default function KitchenDispatch() {
  const { t } = useLanguage();
  
  return (
    <SubPageLayout
      title="Kitchen Dispatch"
      subtitle="Monitor order preparation and delivery"
      parentLink="/dining"
      parentTitle="Dining & Catering"
    >
      <Card>
        <CardHeader>
          <CardTitle>{t("Kitchen Dispatch")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">{t("Kitchen dispatch content will be displayed here")}</p>
        </CardContent>
      </Card>
    </SubPageLayout>
  );
}
