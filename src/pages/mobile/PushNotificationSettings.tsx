
import React from "react";
import { SubPageLayout } from "@/components/shared/SubPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

export default function PushNotificationSettings() {
  const { t } = useLanguage();
  
  return (
    <SubPageLayout
      title="Push Notification Settings"
      subtitle="Configure mobile app notifications"
      parentLink="/mobile-app"
      parentTitle="Mobile App"
    >
      <Card>
        <CardHeader>
          <CardTitle>{t("Push Notification Settings")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">{t("Push notification settings content will be displayed here")}</p>
        </CardContent>
      </Card>
    </SubPageLayout>
  );
}
