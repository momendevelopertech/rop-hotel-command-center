
import React from "react";
import { SubPageLayout } from "@/components/shared/SubPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ProfitLossReports() {
  const { t } = useLanguage();
  
  return (
    <SubPageLayout
      title="Profit & Loss Reports"
      subtitle="Financial performance analysis"
      parentLink="/finance"
      parentTitle="Finance & Reports"
    >
      <Card>
        <CardHeader>
          <CardTitle>{t("Profit & Loss Reports")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">{t("Profit and loss reports content will be displayed here")}</p>
        </CardContent>
      </Card>
    </SubPageLayout>
  );
}
