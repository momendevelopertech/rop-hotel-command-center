
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/components/ui/use-toast";
import { Download, FileText } from "lucide-react";

interface TaxReportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TaxReportModal({ open, onOpenChange }: TaxReportModalProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  // Report settings
  const [reportType, setReportType] = useState("summary");
  const [period, setPeriod] = useState("month");
  const [year, setYear] = useState("2025");
  const [quarter, setQuarter] = useState("Q2");
  const [month, setMonth] = useState("5"); // May
  const [format, setFormat] = useState("pdf");
  
  // Generate year options
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 5 }, (_, i) => (currentYear - i).toString());
  
  // Generate report title based on current filters
  const getReportTitle = () => {
    let periodText = "";
    if (period === "year") {
      periodText = year;
    } else if (period === "quarter") {
      periodText = `${quarter} ${year}`;
    } else {
      const monthName = new Date(Number(year), Number(month) - 1, 1).toLocaleString('default', { month: 'long' });
      periodText = `${monthName} ${year}`;
    }
    
    return `${reportType === "summary" ? t("Tax Summary Report") : t("Tax Detail Report")} - ${periodText}`;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would generate and download the report
    toast({
      title: t("Report Generated"),
      description: t("{{title}} has been generated", { title: getReportTitle() })
    });
    
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{t("Generate Tax Report")}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>{t("Report Type")}</Label>
              <RadioGroup value={reportType} onValueChange={setReportType} className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="summary" id="summary" />
                  <Label htmlFor="summary">{t("Summary Report")}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="detailed" id="detailed" />
                  <Label htmlFor="detailed">{t("Detailed Report")}</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <Label>{t("Report Period")}</Label>
              <RadioGroup value={period} onValueChange={setPeriod} className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="month" id="month" />
                  <Label htmlFor="month">{t("Monthly")}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="quarter" id="quarter" />
                  <Label htmlFor="quarter">{t("Quarterly")}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="year" id="year" />
                  <Label htmlFor="year">{t("Yearly")}</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="year">{t("Year")}</Label>
                <Select value={year} onValueChange={setYear}>
                  <SelectTrigger id="year">
                    <SelectValue placeholder={t("Select Year")} />
                  </SelectTrigger>
                  <SelectContent>
                    {yearOptions.map((y) => (
                      <SelectItem key={y} value={y}>{y}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {period === "quarter" && (
                <div className="space-y-2">
                  <Label htmlFor="quarter">{t("Quarter")}</Label>
                  <Select value={quarter} onValueChange={setQuarter}>
                    <SelectTrigger id="quarter">
                      <SelectValue placeholder={t("Select Quarter")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Q1">{t("Q1 (Jan-Mar)")}</SelectItem>
                      <SelectItem value="Q2">{t("Q2 (Apr-Jun)")}</SelectItem>
                      <SelectItem value="Q3">{t("Q3 (Jul-Sep)")}</SelectItem>
                      <SelectItem value="Q4">{t("Q4 (Oct-Dec)")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              {period === "month" && (
                <div className="space-y-2">
                  <Label htmlFor="month">{t("Month")}</Label>
                  <Select value={month} onValueChange={setMonth}>
                    <SelectTrigger id="month">
                      <SelectValue placeholder={t("Select Month")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">{t("January")}</SelectItem>
                      <SelectItem value="2">{t("February")}</SelectItem>
                      <SelectItem value="3">{t("March")}</SelectItem>
                      <SelectItem value="4">{t("April")}</SelectItem>
                      <SelectItem value="5">{t("May")}</SelectItem>
                      <SelectItem value="6">{t("June")}</SelectItem>
                      <SelectItem value="7">{t("July")}</SelectItem>
                      <SelectItem value="8">{t("August")}</SelectItem>
                      <SelectItem value="9">{t("September")}</SelectItem>
                      <SelectItem value="10">{t("October")}</SelectItem>
                      <SelectItem value="11">{t("November")}</SelectItem>
                      <SelectItem value="12">{t("December")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label>{t("Report Format")}</Label>
              <RadioGroup value={format} onValueChange={setFormat} className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pdf" id="pdf" />
                  <Label htmlFor="pdf">PDF</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="excel" id="excel" />
                  <Label htmlFor="excel">Excel</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="csv" id="csv" />
                  <Label htmlFor="csv">CSV</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="pt-4">
              <div className="border rounded-md p-4 bg-gray-50">
                <h3 className="font-medium">{getReportTitle()}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  {reportType === "summary" 
                    ? t("This report will include summarized tax calculations grouped by tax type") 
                    : t("This report will include itemized transactions with tax calculations")}
                </p>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              {t("Cancel")}
            </Button>
            <Button type="submit" className="gap-2">
              <Download className="h-4 w-4" />
              {t("Generate Report")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
