
import React from "react";
import { SubPageLayout } from "@/components/shared/SubPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { DataTable, Column } from "@/components/shared/DataTable";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Badge } from "@/components/ui/badge";

interface Transaction {
  id: string;
  transId: string;
  type: string;
  amount: string;
  date: string;
  time: string;
  paymentMethod: string;
  status: string;
}

export default function TransactionHistory() {
  const { t, language } = useLanguage();
  
  const transactions: Transaction[] = [
    { 
      id: "1",
      transId: "T-0001",
      type: language === "ar" ? "دفع" : "Payment",
      amount: language === "ar" ? "25 ر.ع" : "25 OMR",
      date: "2025-05-15",
      time: "14:30",
      paymentMethod: language === "ar" ? "فيزا" : "Visa",
      status: language === "ar" ? "مكتمل" : "Completed"
    },
    { 
      id: "2",
      transId: "T-0002",
      type: language === "ar" ? "دفع" : "Payment",
      amount: language === "ar" ? "38 ر.ع" : "38 OMR",
      date: "2025-05-15",
      time: "15:45",
      paymentMethod: language === "ar" ? "نقدي" : "Cash",
      status: language === "ar" ? "مكتمل" : "Completed"
    },
    { 
      id: "3",
      transId: "T-0003",
      type: language === "ar" ? "استرداد" : "Refund",
      amount: language === "ar" ? "12 ر.ع" : "12 OMR",
      date: "2025-05-15",
      time: "16:20",
      paymentMethod: language === "ar" ? "فيزا" : "Visa",
      status: language === "ar" ? "مكتمل" : "Completed"
    },
    { 
      id: "4",
      transId: "T-0004",
      type: language === "ar" ? "دفع" : "Payment",
      amount: language === "ar" ? "15 ر.ع" : "15 OMR",
      date: "2025-05-16",
      time: "09:15",
      paymentMethod: language === "ar" ? "ماستركارد" : "MasterCard",
      status: language === "ar" ? "معلق" : "Pending"
    }
  ];
  
  const columns: Column<Transaction>[] = [
    { header: t("Trans ID"), accessor: "transId" },
    { 
      header: t("Type"), 
      accessor: "type",
      cell: (item) => (
        <Badge variant={item.type === "Payment" || item.type === "دفع" ? "default" : "destructive"}>
          {item.type}
        </Badge>
      )
    },
    { header: t("Amount"), accessor: "amount" },
    { 
      header: t("Date/Time"), 
      accessor: "date",
      cell: (item) => `${item.date} ${item.time}`
    },
    { header: t("Payment Method"), accessor: "paymentMethod" },
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
      title={t("Transaction History")}
      subtitle={t("View and manage payment records")}
      parentLink="/pos"
      parentTitle={t("POS")}
    >
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{t("Transaction Records")}</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={transactions}
            columns={columns}
            searchField="transId"
          />
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start">
              <div className="p-2 bg-green-100 rounded-lg">
                <div className="h-8 w-8 flex items-center justify-center text-green-600 font-bold">₹</div>
              </div>
              <div className="ms-3">
                <p className="text-sm font-medium text-muted-foreground">{t("Total Revenue")}</p>
                <h3 className="text-2xl font-bold">{language === "ar" ? "78 ر.ع" : "78 OMR"}</h3>
                <p className="text-xs text-muted-foreground">{t("Today")}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start">
              <div className="p-2 bg-blue-100 rounded-lg">
                <div className="h-8 w-8 flex items-center justify-center text-blue-600 font-bold">#</div>
              </div>
              <div className="ms-3">
                <p className="text-sm font-medium text-muted-foreground">{t("Transactions")}</p>
                <h3 className="text-2xl font-bold">4</h3>
                <p className="text-xs text-muted-foreground">{t("Today")}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start">
              <div className="p-2 bg-purple-100 rounded-lg">
                <div className="h-8 w-8 flex items-center justify-center text-purple-600 font-bold">⌀</div>
              </div>
              <div className="ms-3">
                <p className="text-sm font-medium text-muted-foreground">{t("Avg. Transaction")}</p>
                <h3 className="text-2xl font-bold">{language === "ar" ? "19.5 ر.ع" : "19.5 OMR"}</h3>
                <p className="text-xs text-muted-foreground">{t("Today")}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </SubPageLayout>
  );
}
