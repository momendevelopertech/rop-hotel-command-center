
import React from "react";
import { SubPageLayout } from "@/components/shared/SubPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

export default function TableReservations() {
  const { t } = useLanguage();
  
  return (
    <SubPageLayout
      title="Table Reservations"
      subtitle="Manage dining area seating and reservations"
      parentLink="/dining"
      parentTitle="Dining & Catering"
    >
      <Card>
        <CardHeader>
          <CardTitle>{t("Table Reservations")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">{t("Table reservations content will be displayed here")}</p>
        </CardContent>
      </Card>
    </SubPageLayout>
  );
}
