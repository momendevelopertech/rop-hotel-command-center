
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const monthlyData = [
  { name: "يناير", الغرف: 42000, المطعم: 24000, الفعاليات: 18000 },
  { name: "فبراير", الغرف: 38000, المطعم: 28000, الفعاليات: 19000 },
  { name: "مارس", الغرف: 45000, المطعم: 32000, الفعاليات: 22000 },
  { name: "أبريل", الغرف: 50000, المطعم: 35000, الفعاليات: 24000 },
  { name: "مايو", الغرف: 55000, المطعم: 38000, الفعاليات: 28000 },
  { name: "يونيو", الغرف: 63000, المطعم: 42000, الفعاليات: 32000 }
];

const quarterlyData = [
  { name: "الربع الأول", الغرف: 125000, المطعم: 84000, الفعاليات: 59000 },
  { name: "الربع الثاني", الغرف: 168000, المطعم: 115000, الفعاليات: 84000 }
];

export function RevenueAnalytics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>تحليل الإيرادات</CardTitle>
        <CardDescription>توزيع الإيرادات حسب مصادر الدخل</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="monthly">
          <TabsList className="mb-4">
            <TabsTrigger value="monthly">شهري</TabsTrigger>
            <TabsTrigger value="quarterly">ربع سنوي</TabsTrigger>
          </TabsList>
          <TabsContent value="monthly" className="space-y-4">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart
                data={monthlyData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="الغرف" fill="#1E3A8A" />
                <Bar dataKey="المطعم" fill="#2563EB" />
                <Bar dataKey="الفعاليات" fill="#93C5FD" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="quarterly" className="space-y-4">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart
                data={quarterlyData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="الغرف" fill="#1E3A8A" />
                <Bar dataKey="المطعم" fill="#2563EB" />
                <Bar dataKey="الفعاليات" fill="#93C5FD" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
