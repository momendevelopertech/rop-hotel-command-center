
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUp, ArrowDown, DollarSign, CreditCard, Receipt } from "lucide-react";

export function FinanceStats() {
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">إجمالي الإيرادات (الشهر الحالي)</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">125,750 ريال</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-500 inline-flex items-center">
              <ArrowUp className="mr-1 h-3 w-3" />
              +15.3%
            </span>{" "}
            مقارنة بالشهر السابق
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">متوسط إيراد الغرفة</CardTitle>
          <Receipt className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">855 ريال</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-500 inline-flex items-center">
              <ArrowUp className="mr-1 h-3 w-3" />
              +2.5%
            </span>{" "}
            مقارنة بالشهر السابق
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">المصروفات (الشهر الحالي)</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">45,250 ريال</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-red-500 inline-flex items-center">
              <ArrowDown className="mr-1 h-3 w-3" />
              -3.2%
            </span>{" "}
            مقارنة بالشهر السابق
          </p>
        </CardContent>
      </Card>
    </>
  );
}
