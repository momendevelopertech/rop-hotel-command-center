
import React from "react";
import { SubPageLayout } from "@/components/shared/SubPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

export default function MenuManagement() {
  const { t } = useLanguage();
  
  return (
    <SubPageLayout
      title="Menu Management"
      subtitle="Create and update menu items and categories"
      parentLink="/dining"
      parentTitle="Dining & Catering"
    >
      <Card>
        <CardHeader>
          <CardTitle>{t("Menu Management")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">{t("Menu management content will be displayed here")}</p>
        </CardContent>
      </Card>
    </SubPageLayout>
  );
}
