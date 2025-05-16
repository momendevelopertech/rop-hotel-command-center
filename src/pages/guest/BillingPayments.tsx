
import React from "react";
import { SubPageLayout } from "@/components/shared/SubPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

export default function BillingPayments() {
  const { t } = useLanguage();
  
  return (
    <SubPageLayout
      title="Billing & Payments"
      subtitle="Manage guest invoices and payment processing"
      parentLink="/guest-management"
      parentTitle="Guest Management"
    >
      <Card>
        <CardHeader>
          <CardTitle>{t("Billing & Payments")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">{t("Billing and payments content will be displayed here")}</p>
        </CardContent>
      </Card>
    </SubPageLayout>
  );
}
