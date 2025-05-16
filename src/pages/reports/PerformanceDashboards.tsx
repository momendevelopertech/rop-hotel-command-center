
import React from "react";
import { SubPageLayout } from "@/components/shared/SubPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

export default function PerformanceDashboards() {
  const { t } = useLanguage();
  
  return (
    <SubPageLayout
      title="Performance Dashboards"
      subtitle="Interactive metrics and KPI visualizations"
      parentLink="/reports"
      parentTitle="Reports & Analytics"
    >
      <Card>
        <CardHeader>
          <CardTitle>{t("Performance Dashboards")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">{t("Performance dashboards content will be displayed here")}</p>
        </CardContent>
      </Card>
    </SubPageLayout>
  );
}
