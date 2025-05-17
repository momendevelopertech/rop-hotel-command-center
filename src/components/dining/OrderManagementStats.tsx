
import React from "react";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { ShoppingBag, Clock, DollarSign, AlertCircle } from "lucide-react";

export function OrderManagementStats() {
  const { t } = useLanguage();
  
  const stats = [
    {
      title: "Today's Orders",
      value: 42,
      icon: ShoppingBag,
      color: "bg-blue-100 text-blue-700"
    },
    {
      title: "Orders This Week",
      value: 187,
      icon: Clock,
      color: "bg-purple-100 text-purple-700"
    },
    {
      title: "Average Order Value",
      value: "34.5 OMR",
      icon: DollarSign,
      color: "bg-green-100 text-green-700"
    },
    {
      title: "Pending Orders",
      value: 8,
      icon: AlertCircle,
      color: "bg-amber-100 text-amber-700"
    }
  ];
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="p-5">
          <div className="flex items-center">
            <div className={`p-3 rounded-full ${stat.color} mr-4`}>
              <stat.icon size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">{t(stat.title)}</p>
              <h3 className="font-bold text-2xl">{stat.value}</h3>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
