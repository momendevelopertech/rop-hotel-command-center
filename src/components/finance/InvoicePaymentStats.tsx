
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { FileText, CreditCard, Clock, AlertCircle } from "lucide-react";

export function InvoicePaymentStats() {
  const { t } = useLanguage();
  
  const stats = [
    {
      title: "Total Invoiced",
      value: "40,600.000 OMR",
      icon: <FileText className="h-6 w-6 text-blue-500" />,
      color: "bg-blue-50"
    },
    {
      title: "Paid",
      value: "19,900.000 OMR",
      icon: <CreditCard className="h-6 w-6 text-green-500" />,
      color: "bg-green-50"
    },
    {
      title: "Pending",
      value: "16,000.000 OMR",
      icon: <Clock className="h-6 w-6 text-amber-500" />,
      color: "bg-amber-50"
    },
    {
      title: "Overdue",
      value: "4,700.000 OMR",
      icon: <AlertCircle className="h-6 w-6 text-red-500" />,
      color: "bg-red-50"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="shadow-sm">
          <CardContent className="flex items-center p-6">
            <div className={`${stat.color} p-4 rounded-full mr-4 flex items-center justify-center`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-gray-500 text-sm">{t(stat.title)}</p>
              <p className="text-2xl font-bold mt-1">{stat.value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
