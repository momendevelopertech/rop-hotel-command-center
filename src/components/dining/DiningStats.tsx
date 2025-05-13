
import React from "react";
import { useData } from "@/contexts/DataContext";
import { Card, CardContent } from "@/components/ui/card";
import { Utensils, Users, Clock, TrendingUp } from "lucide-react";

export function DiningStats() {
  const { diningOrders } = useData();

  // حساب إحصائيات الطلبات
  const totalOrders = diningOrders.length;
  const pendingOrders = diningOrders.filter(order => order.status === "pending").length;
  const completedOrders = diningOrders.filter(order => order.status === "completed").length;
  
  // متوسط وقت الانتظار (افتراضي)
  const avgWaitTime = "18 دقيقة";

  return (
    <>
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Utensils className="h-6 w-6 text-blue-700" />
            </div>
            <div className="ms-3">
              <p className="text-sm font-medium text-muted-foreground">إجمالي الطلبات</p>
              <h3 className="text-2xl font-bold">{totalOrders}</h3>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-700" />
            </div>
            <div className="ms-3">
              <p className="text-sm font-medium text-muted-foreground">طلبات قيد الانتظار</p>
              <h3 className="text-2xl font-bold">{pendingOrders}</h3>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-700" />
            </div>
            <div className="ms-3">
              <p className="text-sm font-medium text-muted-foreground">متوسط وقت الانتظار</p>
              <h3 className="text-2xl font-bold">{avgWaitTime}</h3>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
