
import React from "react";
import { SubPageLayout } from "@/components/shared/SubPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

export default function HallBooking() {
  const { t } = useLanguage();
  
  return (
    <SubPageLayout
      title="Hall Booking"
      subtitle="Manage event venue reservations"
      parentLink="/events"
      parentTitle="Event Management"
    >
      <Card>
        <CardHeader>
          <CardTitle>{t("Hall Booking")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">{t("Hall booking content will be displayed here")}</p>
        </CardContent>
      </Card>
    </SubPageLayout>
  );
}
