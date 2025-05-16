
import React from "react";
import { SubPageLayout } from "@/components/shared/SubPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { DataTable, Column } from "@/components/shared/DataTable";
import { StatusBadge } from "@/components/shared/StatusBadge";

interface RefundEntry {
  id: string;
  orderId: string;
  type: string;
  amount: string;
  reason: string;
  date: string;
  status: string;
}

export default function RefundsCancellations() {
  const { t, language } = useLanguage();
  
  const refundData: RefundEntry[] = [
    { 
      id: "1", 
      orderId: "ORD-050", 
      type: language === "ar" ? "ملغي" : "Cancelled", 
      amount: language === "ar" ? "8 ر.ع" : "8 OMR", 
      reason: language === "ar" ? "غادر الضيف" : "Guest Left", 
      date: "2025-05-15",
      status: language === "ar" ? "مكتمل" : "Completed"
    },
    { 
      id: "2", 
      orderId: "ORD-062", 
      type: language === "ar" ? "استرداد" : "Refund", 
      amount: language === "ar" ? "12 ر.ع" : "12 OMR", 
      reason: language === "ar" ? "طلب غير صحيح" : "Wrong Order", 
      date: "2025-05-16",
      status: language === "ar" ? "مكتمل" : "Completed"
    },
    { 
      id: "3", 
      orderId: "ORD-075", 
      type: language === "ar" ? "استرداد جزئي" : "Partial Refund", 
      amount: language === "ar" ? "5 ر.ع" : "5 OMR", 
      reason: language === "ar" ? "عنصر مفقود" : "Missing Item", 
      date: "2025-05-16",
      status: language === "ar" ? "معلق" : "Pending"
    }
  ];
  
  const columns: Column<RefundEntry>[] = [
    { header: t("Order #"), accessor: "orderId" },
    { header: t("Type"), accessor: "type" },
    { header: t("Amount"), accessor: "amount" },
    { header: t("Reason"), accessor: "reason" },
    { header: t("Date"), accessor: "date" },
    { 
      header: t("Status"), 
      accessor: "status",
      cell: (item) => (
        <StatusBadge 
          status={item.status} 
          type={item.status === "Pending" || item.status === "معلق" ? "warning" : "success"} 
        />
      )
    }
  ];
  
  return (
    <SubPageLayout
      title={t("Refunds & Cancellations")}
      subtitle={t("Manage order returns and cancellations")}
      parentLink="/pos"
      parentTitle={t("POS")}
    >
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{t("Refunds & Cancellations")}</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={refundData}
            columns={columns}
            searchField="orderId"
          />
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start">
              <div className="p-2 bg-red-100 rounded-lg">
                <div className="h-8 w-8 flex items-center justify-center text-red-600 font-bold">₹</div>
              </div>
              <div className="ms-3">
                <p className="text-sm font-medium text-muted-foreground">{t("Total Refunds")}</p>
                <h3 className="text-2xl font-bold">{language === "ar" ? "25 ر.ع" : "25 OMR"}</h3>
                <p className="text-xs text-muted-foreground">{t("This Month")}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start">
              <div className="p-2 bg-amber-100 rounded-lg">
                <div className="h-8 w-8 flex items-center justify-center text-amber-600 font-bold">⤺</div>
              </div>
              <div className="ms-3">
                <p className="text-sm font-medium text-muted-foreground">{t("Cancelled Orders")}</p>
                <h3 className="text-2xl font-bold">3</h3>
                <p className="text-xs text-muted-foreground">{t("This Month")}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start">
              <div className="p-2 bg-blue-100 rounded-lg">
                <div className="h-8 w-8 flex items-center justify-center text-blue-600 font-bold">%</div>
              </div>
              <div className="ms-3">
                <p className="text-sm font-medium text-muted-foreground">{t("Refund Rate")}</p>
                <h3 className="text-2xl font-bold">2.4%</h3>
                <p className="text-xs text-muted-foreground">{t("Of Total Orders")}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </SubPageLayout>
  );
}
