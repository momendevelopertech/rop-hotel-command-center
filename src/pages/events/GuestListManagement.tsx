
import React from "react";
import { SubPageLayout } from "@/components/shared/SubPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

export default function GuestListManagement() {
  const { t } = useLanguage();
  
  return (
    <SubPageLayout
      title="Guest List Management"
      subtitle="Manage attendees and invitations for events"
      parentLink="/events"
      parentTitle="Event Management"
    >
      <Card>
        <CardHeader>
          <CardTitle>{t("Guest List Management")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">{t("Guest list management content will be displayed here")}</p>
        </CardContent>
      </Card>
    </SubPageLayout>
  );
}
