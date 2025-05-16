
import React from "react";
import { SubPageLayout } from "@/components/shared/SubPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

export default function EmployeeRecords() {
  const { t } = useLanguage();
  
  return (
    <SubPageLayout
      title="Employee Records"
      subtitle="Manage staff profiles and information"
      parentLink="/hr"
      parentTitle="Human Resources"
    >
      <Card>
        <CardHeader>
          <CardTitle>{t("Employee Records")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">{t("Employee records content will be displayed here")}</p>
        </CardContent>
      </Card>
    </SubPageLayout>
  );
}
