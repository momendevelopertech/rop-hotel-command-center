
import React from "react";
import { SubPageLayout } from "@/components/shared/SubPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

export default function PayrollPenalties() {
  const { t } = useLanguage();
  
  return (
    <SubPageLayout
      title="Payroll & Penalties"
      subtitle="Manage compensation and disciplinary actions"
      parentLink="/hr"
      parentTitle="Human Resources"
    >
      <Card>
        <CardHeader>
          <CardTitle>{t("Payroll & Penalties")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">{t("Payroll and penalties content will be displayed here")}</p>
        </CardContent>
      </Card>
    </SubPageLayout>
  );
}
