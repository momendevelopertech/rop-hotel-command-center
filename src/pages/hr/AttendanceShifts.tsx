
import React from "react";
import { SubPageLayout } from "@/components/shared/SubPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AttendanceShifts() {
  const { t } = useLanguage();
  
  return (
    <SubPageLayout
      title="Attendance & Shifts"
      subtitle="Track employee work hours and schedules"
      parentLink="/hr"
      parentTitle="Human Resources"
    >
      <Card>
        <CardHeader>
          <CardTitle>{t("Attendance & Shifts")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">{t("Attendance and shifts content will be displayed here")}</p>
        </CardContent>
      </Card>
    </SubPageLayout>
  );
}
