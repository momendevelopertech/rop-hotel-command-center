
import React from "react";
import { SubPageLayout } from "@/components/shared/SubPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

export default function MaintenanceRequests() {
  const { t } = useLanguage();
  
  return (
    <SubPageLayout
      title="Maintenance Requests"
      subtitle="Manage and track maintenance work orders"
      parentLink="/guest-management"
      parentTitle="Guest Management"
    >
      <Card>
        <CardHeader>
          <CardTitle>{t("Maintenance Requests")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">{t("Maintenance requests content will be displayed here")}</p>
        </CardContent>
      </Card>
    </SubPageLayout>
  );
}
