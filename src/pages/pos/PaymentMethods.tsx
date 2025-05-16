
import React from "react";
import { SubPageLayout } from "@/components/shared/SubPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

export default function PaymentMethods() {
  const { t } = useLanguage();
  
  return (
    <SubPageLayout
      title="Payment Methods"
      subtitle="Manage accepted payment types and processors"
      parentLink="/pos"
      parentTitle="POS System"
    >
      <Card>
        <CardHeader>
          <CardTitle>{t("Payment Methods")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">{t("Payment methods content will be displayed here")}</p>
        </CardContent>
      </Card>
    </SubPageLayout>
  );
}
