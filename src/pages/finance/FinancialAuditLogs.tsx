
import React from "react";
import { SubPageLayout } from "@/components/shared/SubPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

export default function FinancialAuditLogs() {
  const { t } = useLanguage();
  
  return (
    <SubPageLayout
      title="Financial Audit Logs"
      subtitle="Track financial transactions and changes"
      parentLink="/finance"
      parentTitle="Finance & Reports"
    >
      <Card>
        <CardHeader>
          <CardTitle>{t("Financial Audit Logs")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">{t("Financial audit logs content will be displayed here")}</p>
        </CardContent>
      </Card>
    </SubPageLayout>
  );
}
