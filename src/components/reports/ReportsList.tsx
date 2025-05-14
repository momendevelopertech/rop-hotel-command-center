
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const reports = [
  {
    id: "RPT-001",
    name: "تقرير الإيرادات الشهري",
    category: "مالية",
    date: "2025-05-01",
    status: "جاهز"
  },
  {
    id: "RPT-002",
    name: "تقرير الإشغال",
    category: "الغرف",
    date: "2025-05-01",
    status: "جاهز"
  },
  {
    id: "RPT-003",
    name: "تقرير مبيعات المطعم",
    category: "المطعم",
    date: "2025-05-01",
    status: "جاهز"
  },
  {
    id: "RPT-004",
    name: "تقرير الضيوف الجدد",
    category: "الضيوف",
    date: "2025-05-01",
    status: "قيد التجهيز"
  },
  {
    id: "RPT-005",
    name: "تقرير الأداء الشهري",
    category: "إدارة",
    date: "2025-04-30",
    status: "جاهز"
  }
];

export function ReportsList() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg font-medium">التقارير المتاحة</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>اسم التقرير</TableHead>
                <TableHead>التصنيف</TableHead>
                <TableHead>تاريخ الإنشاء</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead className="text-right">عرض</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-rop-blue" />
                    <div>
                      <div className="font-medium">{report.name}</div>
                      <div className="text-xs text-muted-foreground">{report.id}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {report.category}
                  </TableCell>
                  <TableCell>{report.date}</TableCell>
                  <TableCell>
                    <Badge variant={report.status === "جاهز" ? "success" : "secondary"}>
                      {report.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled={report.status !== "جاهز"}
                      className="h-8 w-8 p-0"
                    >
                      <Download className="h-4 w-4" />
                      <span className="sr-only">تنزيل</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
