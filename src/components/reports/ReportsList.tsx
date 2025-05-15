
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const reports = [
  {
    id: "RPT-001",
    name: "Monthly Revenue Report",
    category: "Finance",
    date: "2025-05-01",
    status: "Ready"
  },
  {
    id: "RPT-002",
    name: "Occupancy Report",
    category: "Rooms",
    date: "2025-05-01",
    status: "Ready"
  },
  {
    id: "RPT-003",
    name: "Restaurant Sales Report",
    category: "Restaurant",
    date: "2025-05-01",
    status: "Ready"
  },
  {
    id: "RPT-004",
    name: "New Guests Report",
    category: "Guests",
    date: "2025-05-01",
    status: "Processing"
  },
  {
    id: "RPT-005",
    name: "Monthly Performance Report",
    category: "Management",
    date: "2025-04-30",
    status: "Ready"
  }
];

export function ReportsList() {
  const { t, translate } = useLanguage();
  
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg font-medium">{t("Available Reports")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("Report Name")}</TableHead>
                <TableHead>{t("Category")}</TableHead>
                <TableHead>{t("Date Generated")}</TableHead>
                <TableHead>{t("Status")}</TableHead>
                <TableHead className="text-right">{t("Actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-rop-blue" />
                    <div>
                      <div className="font-medium">{translate(report.name, "reportTypes")}</div>
                      <div className="text-xs text-muted-foreground">{report.id}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {translate(report.category, "departments")}
                  </TableCell>
                  <TableCell>{report.date}</TableCell>
                  <TableCell>
                    <Badge variant={translate(report.status, "status") === translate("Ready", "status") ? "success" : "secondary"}>
                      {translate(report.status, "status")}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled={translate(report.status, "status") !== translate("Ready", "status")}
                      className="h-8 w-8 p-0"
                    >
                      <Download className="h-4 w-4" />
                      <span className="sr-only">{t("Download")}</span>
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
