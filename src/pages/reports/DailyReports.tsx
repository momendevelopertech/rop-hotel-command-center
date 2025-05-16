
import React from "react";
import { SubPageLayout } from "@/components/shared/SubPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

export default function DailyReports() {
  const { t } = useLanguage();
  
  return (
    <SubPageLayout
      title="Daily Reports"
      subtitle="View day-to-day operational metrics"
      parentLink="/reports"
      parentTitle="Reports & Analytics"
    >
      <Card>
        <CardHeader>
          <CardTitle>{t("Daily Reports")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">{t("Daily reports content will be displayed here")}</p>
        </CardContent>
      </Card>
    </SubPageLayout>
  );
}
