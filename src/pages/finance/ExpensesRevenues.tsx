
import React from "react";
import { SubPageLayout } from "@/components/shared/SubPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ExpensesRevenues() {
  const { t } = useLanguage();
  
  return (
    <SubPageLayout
      title="Expenses & Revenues"
      subtitle="Track income and expenditure"
      parentLink="/finance"
      parentTitle="Finance & Reports"
    >
      <Card>
        <CardHeader>
          <CardTitle>{t("Expenses & Revenues")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">{t("Expenses and revenues content will be displayed here")}</p>
        </CardContent>
      </Card>
    </SubPageLayout>
  );
}
