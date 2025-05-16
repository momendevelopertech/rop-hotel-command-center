
import React from "react";
import { SubPageLayout } from "@/components/shared/SubPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

export default function POSSettings() {
  const { t } = useLanguage();
  
  return (
    <SubPageLayout
      title="POS Settings"
      subtitle="Configure point of sale system preferences"
      parentLink="/pos"
      parentTitle="POS System"
    >
      <Card>
        <CardHeader>
          <CardTitle>{t("POS Settings")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">{t("POS settings content will be displayed here")}</p>
        </CardContent>
      </Card>
    </SubPageLayout>
  );
}
