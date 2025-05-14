
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const departments = [
  { name: "الاستقبال", value: 15, color: "#1E3A8A" },
  { name: "المطعم", value: 22, color: "#2563EB" },
  { name: "الإدارة", value: 8, color: "#93C5FD" },
  { name: "الأمن", value: 12, color: "#3B82F6" },
  { name: "الخدمات", value: 11, color: "#60A5FA" }
];

export function DepartmentDistribution() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>توزيع الأقسام</CardTitle>
        <CardDescription>توزيع الموظفين حسب الأقسام</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={departments}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {departments.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" layout="horizontal" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
