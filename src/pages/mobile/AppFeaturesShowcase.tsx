
import React from "react";
import { SubPageLayout } from "@/components/shared/SubPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AppFeaturesShowcase() {
  const { t } = useLanguage();
  
  return (
    <SubPageLayout
      title="App Features Showcase"
      subtitle="Overview of mobile application capabilities"
      parentLink="/mobile-app"
      parentTitle="Mobile App"
    >
      <Card>
        <CardHeader>
          <CardTitle>{t("App Features Showcase")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">{t("App features showcase content will be displayed here")}</p>
        </CardContent>
      </Card>
    </SubPageLayout>
  );
}
