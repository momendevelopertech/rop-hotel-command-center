
import React from "react";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChefHat, UtensilsCrossed, Star, CircleDollarSign } from "lucide-react";

export function MenuStats() {
  const { t } = useLanguage();
  
  const stats = [
    {
      title: "Total Menu Items",
      value: 56,
      icon: UtensilsCrossed,
      color: "bg-blue-100 text-blue-700"
    },
    {
      title: "Active Categories",
      value: 6,
      icon: ChefHat,
      color: "bg-purple-100 text-purple-700"
    },
    {
      title: "Popular Items",
      value: 14,
      icon: Star,
      color: "bg-amber-100 text-amber-700"
    },
    {
      title: "Military Special Items",
      value: 8,
      icon: CircleDollarSign,
      color: "bg-green-100 text-green-700"
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
