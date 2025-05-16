
import React from "react";
import { SubPageLayout } from "@/components/shared/SubPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

export default function TransactionHistory() {
  const { t } = useLanguage();
  
  return (
    <SubPageLayout
      title="Transaction History"
      subtitle="View past sales and payment records"
      parentLink="/pos"
      parentTitle="POS System"
    >
      <Card>
        <CardHeader>
          <CardTitle>{t("Transaction History")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">{t("Transaction history content will be displayed here")}</p>
        </CardContent>
      </Card>
    </SubPageLayout>
  );
}
