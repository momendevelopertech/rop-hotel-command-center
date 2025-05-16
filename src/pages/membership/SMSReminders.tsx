
import React from "react";
import { SubPageLayout } from "@/components/shared/SubPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

export default function SMSReminders() {
  const { t } = useLanguage();
  
  return (
    <SubPageLayout
      title="SMS Reminders"
      subtitle="Configure automated text message notifications"
      parentLink="/membership"
      parentTitle="Membership"
    >
      <Card>
        <CardHeader>
          <CardTitle>{t("SMS Reminders")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">{t("SMS reminders content will be displayed here")}</p>
        </CardContent>
      </Card>
    </SubPageLayout>
  );
}
