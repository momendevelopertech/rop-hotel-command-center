
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useData } from "@/contexts/DataContext";

export function RankDistribution() {
  const { memberships } = useData();

  // حساب توزيع الرتب
  const rankCounts = memberships.reduce((acc, member) => {
    acc[member.rank] = (acc[member.rank] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // تحويل البيانات لتنسيق مناسب للعرض
  const rankData = Object.entries(rankCounts).map(([rank, count]) => ({
    rank,
    count,
    percentage: Math.round((count / memberships.length) * 100)
  }));

  // ترتيب البيانات حسب العدد تنازليًا
  rankData.sort((a, b) => b.count - a.count);

  return (
    <Card>
      <CardHeader>
        <CardTitle>توزيع الرتب</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {rankData.map(({ rank, count, percentage }) => (
            <div key={rank}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">{rank}</span>
                <span className="text-sm text-muted-foreground">{count}</span>
              </div>
              <div className="relative h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-2 bg-blue-500" 
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">{percentage}%</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
