
import React from "react";
import { SubPageLayout } from "@/components/shared/SubPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

export default function CustomReportBuilder() {
  const { t } = useLanguage();
  
  return (
    <SubPageLayout
      title="Custom Report Builder"
      subtitle="Create personalized analytics reports"
      parentLink="/reports"
      parentTitle="Reports & Analytics"
    >
      <Card>
        <CardHeader>
          <CardTitle>{t("Custom Report Builder")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">{t("Custom report builder content will be displayed here")}</p>
        </CardContent>
      </Card>
    </SubPageLayout>
  );
}
