
import React, { useState } from "react";
import { SubPageLayout } from "@/components/shared/SubPageLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ProfitLossChart } from "@/components/finance/ProfitLossChart";
import { ProfitLossTable } from "@/components/finance/ProfitLossTable";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Printer, Mail } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function ProfitLossReports() {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const [period, setPeriod] = useState("monthly");
  const [year, setYear] = useState("2025");
  const [quarter, setQuarter] = useState("Q2");
  const [month, setMonth] = useState("5"); // May
  
  // Generate year options (current year and 4 previous years)
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 5 }, (_, i) => (currentYear - i).toString());
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-OM', { 
      style: 'currency', 
      currency: 'OMR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  // Generate report title based on current filters
  const getReportTitle = () => {
    if (period === "annual") {
      return t("Annual Profit & Loss Report for {{year}}", { year });
    } else if (period === "quarterly") {
      return t("Quarterly Profit & Loss Report for {{quarter}} {{year}}", { quarter, year });
    } else {
      // Monthly
      const monthName = new Date(Number(year), Number(month) - 1, 1).toLocaleString('default', { month: 'long' });
      return t("Monthly Profit & Loss Report for {{month}} {{year}}", { month: monthName, year });
    }
  };
  
  // Sample summary data
  const annualSummary = {
    totalRevenue: 248000,
    totalExpenses: 186000,
    netProfit: 62000,
    profitMargin: 25.0
  };
  
  const quarterlySummary = {
    totalRevenue: 67500,
    totalExpenses: 48200,
    netProfit: 19300,
    profitMargin: 28.6
  };
  
  const monthlySummary = {
    totalRevenue: 21900,
    totalExpenses: 15600,
    netProfit: 6300,
    profitMargin: 28.8
  };
  
  // Get current summary based on period
  const getCurrentSummary = () => {
    if (period === "annual") return annualSummary;
    if (period === "quarterly") return quarterlySummary;
    return monthlySummary;
  };
  
  const summary = getCurrentSummary();
  
  // Handler for exporting the report
  const handleExport = (format: string) => {
    toast({
      title: t("Report Exported"),
      description: t("{{title}} has been exported as {{format}}", { 
        title: getReportTitle(), 
        format: format.toUpperCase() 
      })
    });
  };
  
  return (
    <SubPageLayout
      title={t("Profit & Loss Reports")}
      subtitle={t("Financial performance analysis")}
      parentLink="/finance"
      parentTitle={t("Finance & Reports")}
    >
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{t("Report Settings")}</CardTitle>
          <CardDescription>{t("Configure your profit and loss report parameters")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/4">
              <label className="block text-sm font-medium text-gray-700 mb-1">{t("Report Period")}</label>
              <Tabs defaultValue="monthly" value={period} onValueChange={setPeriod} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="monthly">{t("Monthly")}</TabsTrigger>
                  <TabsTrigger value="quarterly">{t("Quarterly")}</TabsTrigger>
                  <TabsTrigger value="annual">{t("Annual")}</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <div className="w-full md:w-1/4">
              <label className="block text-sm font-medium text-gray-700 mb-1">{t("Year")}</label>
              <Select value={year} onValueChange={setYear}>
                <SelectTrigger>
                  <SelectValue placeholder={t("Select Year")} />
                </SelectTrigger>
                <SelectContent>
                  {yearOptions.map((y) => (
                    <SelectItem key={y} value={y}>{y}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {period === "quarterly" && (
              <div className="w-full md:w-1/4">
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("Quarter")}</label>
                <Select value={quarter} onValueChange={setQuarter}>
                  <SelectTrigger>
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
            
            {period === "monthly" && (
              <div className="w-full md:w-1/4">
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("Month")}</label>
                <Select value={month} onValueChange={setMonth}>
                  <SelectTrigger>
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
            
            <div className="flex items-end gap-2 ml-auto">
              <Button variant="outline" className="gap-2" onClick={() => handleExport("pdf")}>
                <Download className="h-4 w-4" />
                {t("Export PDF")}
              </Button>
              <Button variant="outline" className="gap-2" onClick={() => handleExport("excel")}>
                <Download className="h-4 w-4" />
                {t("Export Excel")}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{getReportTitle()}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-gray-500">{t("Total Revenue")}</p>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(summary.totalRevenue)}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-gray-500">{t("Total Expenses")}</p>
                <p className="text-2xl font-bold text-red-600">{formatCurrency(summary.totalExpenses)}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-gray-500">{t("Net Profit")}</p>
                <p className="text-2xl font-bold text-blue-600">{formatCurrency(summary.netProfit)}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-gray-500">{t("Profit Margin")}</p>
                <p className="text-2xl font-bold">{summary.profitMargin}%</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-4">{t("Financial Performance")}</h3>
            <div className="h-[400px]">
              <ProfitLossChart period={period} year={year} quarter={quarter} month={month} />
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-4">{t("Income Statement")}</h3>
            <ProfitLossTable period={period} year={year} quarter={quarter} month={month} />
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-end gap-2">
        <Button variant="outline" className="gap-2">
          <Printer className="h-4 w-4" />
          {t("Print Report")}
        </Button>
        <Button variant="outline" className="gap-2">
          <Mail className="h-4 w-4" />
          {t("Email Report")}
        </Button>
      </div>
    </SubPageLayout>
  );
}
