
import React from "react";
import { SubPageLayout } from "@/components/shared/SubPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AdvancesLoans() {
  const { t } = useLanguage();
  
  return (
    <SubPageLayout
      title="Advances & Loans"
      subtitle="Manage employee financial assistance programs"
      parentLink="/hr"
      parentTitle="Human Resources"
    >
      <Card>
        <CardHeader>
          <CardTitle>{t("Advances & Loans")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">{t("Advances and loans content will be displayed here")}</p>
        </CardContent>
      </Card>
    </SubPageLayout>
  );
}
