
import React from "react";
import { SubPageLayout } from "@/components/shared/SubPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

export default function MemberRegistration() {
  const { t } = useLanguage();
  
  return (
    <SubPageLayout
      title="Member Registration"
      subtitle="Register new members and profiles"
      parentLink="/membership"
      parentTitle="Membership"
    >
      <Card>
        <CardHeader>
          <CardTitle>{t("Member Registration")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">{t("Member registration content will be displayed here")}</p>
        </CardContent>
      </Card>
    </SubPageLayout>
  );
}
