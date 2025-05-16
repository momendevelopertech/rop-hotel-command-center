
import React from "react";
import { SubPageLayout } from "@/components/shared/SubPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

export default function MembershipRenewals() {
  const { t } = useLanguage();
  
  return (
    <SubPageLayout
      title="Membership Renewals"
      subtitle="Process membership extensions and renewals"
      parentLink="/membership"
      parentTitle="Membership"
    >
      <Card>
        <CardHeader>
          <CardTitle>{t("Membership Renewals")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">{t("Membership renewals content will be displayed here")}</p>
        </CardContent>
      </Card>
    </SubPageLayout>
  );
}
