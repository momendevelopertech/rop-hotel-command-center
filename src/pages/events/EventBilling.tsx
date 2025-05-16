
import React from "react";
import { SubPageLayout } from "@/components/shared/SubPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

export default function EventBilling() {
  const { t } = useLanguage();
  
  return (
    <SubPageLayout
      title="Event Billing"
      subtitle="Manage invoices and payments for events"
      parentLink="/events"
      parentTitle="Event Management"
    >
      <Card>
        <CardHeader>
          <CardTitle>{t("Event Billing")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">{t("Event billing content will be displayed here")}</p>
        </CardContent>
      </Card>
    </SubPageLayout>
  );
}
