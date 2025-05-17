
import React from "react";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { Calendar, Users, XCircle, CheckCircle } from "lucide-react";

export function TableReservationsStats() {
  const { t } = useLanguage();
  
  const stats = [
    {
      title: "Today's Reservations",
      value: 24,
      icon: Calendar,
      color: "bg-blue-100 text-blue-700"
    },
    {
      title: "Confirmed",
      value: 18,
      icon: CheckCircle,
      color: "bg-green-100 text-green-700"
    },
    {
      title: "Cancelled",
      value: 3,
      icon: XCircle,
      color: "bg-red-100 text-red-700"
    },
    {
      title: "No-shows",
      value: 2,
      icon: Users,
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
