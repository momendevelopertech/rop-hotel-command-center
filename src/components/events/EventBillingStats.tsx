
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { FileText, CreditCard, AlertCircle, CheckCircle2 } from "lucide-react";

export function EventBillingStats() {
  const { t } = useLanguage();
  
  // Stats data - in a real app, this would come from an API
  const stats = [
    {
      title: t("Total Invoices"),
      value: "56",
      change: "+4",
      icon: <FileText className="h-5 w-5 text-blue-500" />,
      bgColor: "bg-blue-50"
    },
    {
      title: t("Payments Received"),
      value: "43,210.500 OMR",
      change: "+12.3%",
      icon: <CreditCard className="h-5 w-5 text-green-500" />,
      bgColor: "bg-green-50"
    },
    {
      title: t("Overdue Invoices"),
      value: "4",
      change: "-2",
      icon: <AlertCircle className="h-5 w-5 text-red-500" />,
      bgColor: "bg-red-50"
    },
    {
      title: t("Paid Invoices"),
      value: "38",
      change: "+6",
      icon: <CheckCircle2 className="h-5 w-5 text-purple-500" />,
      bgColor: "bg-purple-50"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardContent className="p-6 flex items-center">
            <div className={`rounded-full p-3 mr-4 ${stat.bgColor}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.title}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-green-600 mt-1">{stat.change}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
