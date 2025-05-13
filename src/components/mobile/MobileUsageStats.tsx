
import React from "react";
import { useData } from "@/contexts/DataContext";
import { Card, CardContent } from "@/components/ui/card";
import { Smartphone, UserCheck, ArrowUpRight, Clock } from "lucide-react";

export function MobileUsageStats() {
  const { mobileInteractions } = useData();

  // حساب إحصائيات استخدام التطبيق
  const totalInteractions = mobileInteractions.length;
  const uniqueUsers = new Set(mobileInteractions.map(i => i.officer)).size;
  
  // حساب متوسط وقت الاستخدام (افتراضي)
  const avgSessionTime = "4:25 دقيقة";

  return (
    <>
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Smartphone className="h-6 w-6 text-blue-700" />
            </div>
            <div className="ms-3">
              <p className="text-sm font-medium text-muted-foreground">إجمالي التفاعلات</p>
              <h3 className="text-2xl font-bold">{totalInteractions}</h3>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start">
            <div className="p-2 bg-green-100 rounded-lg">
              <UserCheck className="h-6 w-6 text-green-700" />
            </div>
            <div className="ms-3">
              <p className="text-sm font-medium text-muted-foreground">المستخدمين النشطين</p>
              <h3 className="text-2xl font-bold">{uniqueUsers}</h3>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Clock className="h-6 w-6 text-purple-700" />
            </div>
            <div className="ms-3">
              <p className="text-sm font-medium text-muted-foreground">متوسط مدة الجلسة</p>
              <h3 className="text-2xl font-bold">{avgSessionTime}</h3>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
