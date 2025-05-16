
import React from "react";
import { SubPageLayout } from "@/components/shared/SubPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

export default function CardPrinting() {
  const { t } = useLanguage();
  
  return (
    <SubPageLayout
      title="Card Printing"
      subtitle="Print physical membership cards"
      parentLink="/membership"
      parentTitle="Membership"
    >
      <Card>
        <CardHeader>
          <CardTitle>{t("Card Printing")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">{t("Card printing content will be displayed here")}</p>
        </CardContent>
      </Card>
    </SubPageLayout>
  );
}
