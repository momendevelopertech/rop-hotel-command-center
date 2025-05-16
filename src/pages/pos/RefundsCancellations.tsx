
import React from "react";
import { SubPageLayout } from "@/components/shared/SubPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

export default function RefundsCancellations() {
  const { t } = useLanguage();
  
  return (
    <SubPageLayout
      title="Refunds & Cancellations"
      subtitle="Process returns and void transactions"
      parentLink="/pos"
      parentTitle="POS System"
    >
      <Card>
        <CardHeader>
          <CardTitle>{t("Refunds & Cancellations")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">{t("Refunds and cancellations content will be displayed here")}</p>
        </CardContent>
      </Card>
    </SubPageLayout>
  );
}
