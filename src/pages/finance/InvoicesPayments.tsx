
import React from "react";
import { SubPageLayout } from "@/components/shared/SubPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

export default function InvoicesPayments() {
  const { t } = useLanguage();
  
  return (
    <SubPageLayout
      title="Invoices & Payments"
      subtitle="Manage billing and payment processing"
      parentLink="/finance"
      parentTitle="Finance & Reports"
    >
      <Card>
        <CardHeader>
          <CardTitle>{t("Invoices & Payments")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">{t("Invoices and payments content will be displayed here")}</p>
        </CardContent>
      </Card>
    </SubPageLayout>
  );
}
