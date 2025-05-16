
import React from "react";
import { SubPageLayout } from "@/components/shared/SubPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

export default function LinkMilitaryID() {
  const { t } = useLanguage();
  
  return (
    <SubPageLayout
      title="Link Military ID"
      subtitle="Connect membership accounts to military identification"
      parentLink="/membership"
      parentTitle="Membership"
    >
      <Card>
        <CardHeader>
          <CardTitle>{t("Link Military ID")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">{t("Link military ID content will be displayed here")}</p>
        </CardContent>
      </Card>
    </SubPageLayout>
  );
}
