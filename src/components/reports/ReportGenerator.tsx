
import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { FilePlus } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const reportTypes = [
  { id: "financials", name: "تقرير مالي" },
  { id: "occupancy", name: "معدل الإشغال" },
  { id: "revenue", name: "تقرير الإيرادات" },
  { id: "guests", name: "تقرير الضيوف" },
  { id: "restaurant", name: "مبيعات المطعم" },
  { id: "events", name: "فعاليات" }
];

const periodOptions = [
  { id: "daily", name: "يومي" },
  { id: "weekly", name: "أسبوعي" },
  { id: "monthly", name: "شهري" },
  { id: "quarterly", name: "ربع سنوي" },
  { id: "yearly", name: "سنوي" }
];

const formatOptions = [
  { id: "pdf", name: "PDF" },
  { id: "excel", name: "Excel" },
  { id: "csv", name: "CSV" }
];

export function ReportGenerator() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FilePlus className="h-5 w-5" />
          <span>إنشاء تقرير جديد</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="report-type">نوع التقرير</Label>
          <Select>
            <SelectTrigger id="report-type">
              <SelectValue placeholder="اختر نوع التقرير" />
            </SelectTrigger>
            <SelectContent>
              {reportTypes.map(type => (
                <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="period">الفترة الزمنية</Label>
          <Select>
            <SelectTrigger id="period">
              <SelectValue placeholder="اختر الفترة" />
            </SelectTrigger>
            <SelectContent>
              {periodOptions.map(option => (
                <SelectItem key={option.id} value={option.id}>{option.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="format">صيغة الملف</Label>
          <Select>
            <SelectTrigger id="format">
              <SelectValue placeholder="اختر الصيغة" />
            </SelectTrigger>
            <SelectContent>
              {formatOptions.map(format => (
                <SelectItem key={format.id} value={format.id}>{format.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Separator className="my-4" />
        
        <div className="flex items-center">
          <Label className="flex items-center" htmlFor="include-charts">
            <input type="checkbox" id="include-charts" className="mr-2" />
            تضمين الرسوم البيانية
          </Label>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">إنشاء التقرير</Button>
      </CardFooter>
    </Card>
  );
}
