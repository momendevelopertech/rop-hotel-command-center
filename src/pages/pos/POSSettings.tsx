
import React from "react";
import { SubPageLayout } from "@/components/shared/SubPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { DataTable, Column } from "@/components/shared/DataTable";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface PaymentMethod {
  id: string;
  method: string;
  enabled: boolean;
  notes?: string;
}

export default function POSSettings() {
  const { t, language } = useLanguage();
  
  const paymentMethods: PaymentMethod[] = [
    { 
      id: "1", 
      method: language === "ar" ? "فيزا" : "Visa", 
      enabled: true 
    },
    { 
      id: "2", 
      method: language === "ar" ? "ماستر كارد" : "MasterCard", 
      enabled: true 
    },
    { 
      id: "3", 
      method: language === "ar" ? "الدفع نقدًا" : "Cash", 
      enabled: true 
    },
    { 
      id: "4", 
      method: language === "ar" ? "خصم الراتب" : "Payroll", 
      enabled: true,
      notes: language === "ar" ? "للضباط فقط" : "For officers only" 
    },
  ];
  
  const columns: Column<PaymentMethod>[] = [
    { 
      header: t("Method"), 
      accessor: "method"
    },
    { 
      header: t("Enabled"), 
      accessor: "enabled",
      cell: (item) => (
        <Switch checked={item.enabled} disabled />
      )
    },
    { 
      header: t("Notes"), 
      accessor: "notes",
      cell: (item) => item.notes || "-"
    }
  ];
  
  return (
    <SubPageLayout
      title={t("POS Settings")}
      subtitle={t("Configure point of sale system settings")}
      parentLink="/pos"
      parentTitle={t("POS")}
    >
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t("Payment Methods")}</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              data={paymentMethods}
              columns={columns}
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>{t("POS Configuration")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="receipt-printing">{t("Auto Print Receipt")}</Label>
                  <Switch id="receipt-printing" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-receipt">{t("Email Receipt")}</Label>
                  <Switch id="email-receipt" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="inventory-sync">{t("Auto Inventory Sync")}</Label>
                  <Switch id="inventory-sync" defaultChecked />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="daily-closing">{t("Auto Daily Closing")}</Label>
                  <Switch id="daily-closing" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="offline-mode">{t("Offline Mode")}</Label>
                  <Switch id="offline-mode" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="staff-tips">{t("Allow Staff Tips")}</Label>
                  <Switch id="staff-tips" defaultChecked />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </SubPageLayout>
  );
}
