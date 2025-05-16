
import React from "react";
import { SubPageLayout } from "@/components/shared/SubPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

export default function EquipmentSetup() {
  const { t } = useLanguage();
  
  return (
    <SubPageLayout
      title="Equipment & Setup"
      subtitle="Manage event equipment and room configurations"
      parentLink="/events"
      parentTitle="Event Management"
    >
      <Card>
        <CardHeader>
          <CardTitle>{t("Equipment & Setup")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">{t("Equipment setup content will be displayed here")}</p>
        </CardContent>
      </Card>
    </SubPageLayout>
  );
}
