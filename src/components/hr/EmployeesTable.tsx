
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const employees = [
  {
    id: "EMP001",
    name: "محمد العامري",
    position: "مدير استقبال",
    department: "الاستقبال",
    status: "دوام كامل",
    joinDate: "2023-01-15"
  },
  {
    id: "EMP002",
    name: "فاطمة الزهراني",
    position: "شيف",
    department: "المطعم",
    status: "دوام كامل",
    joinDate: "2023-02-20"
  },
  {
    id: "EMP003",
    name: "أحمد القحطاني",
    position: "مساعد مدير",
    department: "إدارة",
    status: "دوام كامل",
    joinDate: "2022-11-05"
  },
  {
    id: "EMP004",
    name: "سارة البلوشي",
    position: "موظفة استقبال",
    department: "الاستقبال",
    status: "دوام جزئي",
    joinDate: "2023-03-10"
  },
  {
    id: "EMP005",
    name: "خالد الشهراني",
    position: "أمن",
    department: "الأمن",
    status: "دوام كامل",
    joinDate: "2022-09-15"
  }
];

export function EmployeesTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">قائمة الموظفين</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>الاسم</TableHead>
                <TableHead>المنصب</TableHead>
                <TableHead>القسم</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>تاريخ الانضمام</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell className="flex items-center gap-2">
                    <Avatar className="h-8 w-8 bg-rop-blue">
                      <AvatarFallback className="text-white">
                        {employee.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{employee.name}</div>
                      <div className="text-xs text-muted-foreground">{employee.id}</div>
                    </div>
                  </TableCell>
                  <TableCell>{employee.position}</TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>
                    <Badge variant={employee.status === "دوام كامل" ? "default" : "outline"}>
                      {employee.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{employee.joinDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
