
import React from "react";
import { useData } from "@/contexts/DataContext";
import { Card, CardContent } from "@/components/ui/card";
import { UserRound, CalendarDays, TrendingUp } from "lucide-react";

export function MembershipStats() {
  const { memberships } = useData();

  // حساب إحصائيات العضويات
  const totalMembers = memberships.length;
  const activeMembers = memberships.filter(member => member.status === "active").length;
  const renewalRate = Math.round((activeMembers / totalMembers) * 100);

  return (
    <>
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start">
            <div className="p-2 bg-blue-100 rounded-lg">
              <UserRound className="h-6 w-6 text-blue-700" />
            </div>
            <div className="ms-3">
              <p className="text-sm font-medium text-muted-foreground">إجمالي الأعضاء</p>
              <h3 className="text-2xl font-bold">{totalMembers}</h3>
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
              <p className="text-sm font-medium text-muted-foreground">الأعضاء النشطين</p>
              <h3 className="text-2xl font-bold">{activeMembers}</h3>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <CalendarDays className="h-6 w-6 text-yellow-700" />
            </div>
            <div className="ms-3">
              <p className="text-sm font-medium text-muted-foreground">معدل التجديد</p>
              <h3 className="text-2xl font-bold">{renewalRate}%</h3>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
