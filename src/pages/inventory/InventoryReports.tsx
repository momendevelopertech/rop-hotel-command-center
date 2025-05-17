
import React, { useState } from "react";
import { SubPageLayout } from "@/components/shared/SubPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { DataTable, Column } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Download, FileText, Filter, BarChart, PieChart, LayoutGrid, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { ar, enUS } from "date-fns/locale";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

// Interface for inventory report
interface InventoryReport {
  id: string;
  title: string;
  titleAr: string;
  category: string;
  categoryAr: string;
  date: string;
  format: "PDF" | "Excel" | "CSV";
  status: "Generated" | "Scheduled" | "Archived";
  statusAr: string;
  size: string;
  createdBy: string;
  createdByAr: string;
  description: string;
  descriptionAr: string;
}

export default function InventoryReports() {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDateRange, setSelectedDateRange] = useState<string>("all");
  
  // Sample data for inventory reports
  const inventoryReportsData: InventoryReport[] = [
    {
      id: "INV-RPT-001",
      title: "Monthly Inventory Summary - May 2025",
      titleAr: "ملخص المخزون الشهري - مايو 2025",
      category: "Summary",
      categoryAr: "ملخص",
      date: "2025-05-15",
      format: "PDF",
      status: "Generated",
      statusAr: "تم إنشاؤه",
      size: "2.4 MB",
      createdBy: "Ahmed Al-Balushi",
      createdByAr: "أحمد البلوشي",
      description: "Monthly summary of all inventory items, movements, and value",
      descriptionAr: "ملخص شهري لجميع عناصر المخزون وحركاتها وقيمتها"
    },
    {
      id: "INV-RPT-002",
      title: "Stock Valuation Report",
      titleAr: "تقرير تقييم المخزون",
      category: "Financial",
      categoryAr: "مالي",
      date: "2025-05-14",
      format: "Excel",
      status: "Generated",
      statusAr: "تم إنشاؤه",
      size: "1.8 MB",
      createdBy: "Fatima Al-Zadjali",
      createdByAr: "فاطمة الزدجالية",
      description: "Financial valuation of current inventory holdings",
      descriptionAr: "التقييم المالي لحيازات المخزون الحالية"
    },
    {
      id: "INV-RPT-003",
      title: "Inventory Turnover Analysis Q2 2025",
      titleAr: "تحليل دوران المخزون - الربع الثاني 2025",
      category: "Analytics",
      categoryAr: "تحليلات",
      date: "2025-05-10",
      format: "PDF",
      status: "Generated",
      statusAr: "تم إنشاؤه",
      size: "3.2 MB",
      createdBy: "Mohammed Al-Hosni",
      createdByAr: "محمد الحسني",
      description: "Quarterly analysis of inventory turnover rates by department",
      descriptionAr: "تحليل ربع سنوي لمعدلات دوران المخزون حسب القسم"
    },
    {
      id: "INV-RPT-004",
      title: "Stock Movement Report - April 2025",
      titleAr: "تقرير حركة المخزون - أبريل 2025",
      category: "Movement",
      categoryAr: "حركة",
      date: "2025-05-01",
      format: "CSV",
      status: "Archived",
      statusAr: "مؤرشف",
      size: "4.1 MB",
      createdBy: "Saif Al-Maamari",
      createdByAr: "سيف المعمري",
      description: "Detailed report of all stock movements during April 2025",
      descriptionAr: "تقرير مفصل عن جميع حركات المخزون خلال أبريل 2025"
    },
    {
      id: "INV-RPT-005",
      title: "Low Stock Alert Summary",
      titleAr: "ملخص تنبيهات انخفاض المخزون",
      category: "Alerts",
      categoryAr: "تنبيهات",
      date: "2025-05-16",
      format: "PDF",
      status: "Generated",
      statusAr: "تم إنشاؤه",
      size: "1.2 MB",
      createdBy: "Aisha Al-Habsi",
      createdByAr: "عائشة الحبسية",
      description: "Summary of all items below reorder levels",
      descriptionAr: "ملخص لجميع العناصر دون مستويات إعادة الطلب"
    },
    {
      id: "INV-RPT-006",
      title: "Department Consumption Report",
      titleAr: "تقرير استهلاك الأقسام",
      category: "Consumption",
      categoryAr: "استهلاك",
      date: "2025-05-12",
      format: "Excel",
      status: "Generated",
      statusAr: "تم إنشاؤه",
      size: "2.7 MB",
      createdBy: "Khalid Al-Rawahi",
      createdByAr: "خالد الرواحي",
      description: "Analysis of inventory consumption by department",
      descriptionAr: "تحليل استهلاك المخزون حسب القسم"
    },
    {
      id: "INV-RPT-007",
      title: "Supplier Performance Analysis",
      titleAr: "تحليل أداء الموردين",
      category: "Suppliers",
      categoryAr: "موردين",
      date: "2025-05-08",
      format: "PDF",
      status: "Archived",
      statusAr: "مؤرشف",
      size: "2.9 MB",
      createdBy: "Abdullah Al-Siyabi",
      createdByAr: "عبدالله السيابي",
      description: "Analysis of supplier performance, delivery times, and quality",
      descriptionAr: "تحليل أداء المورد وأوقات التسليم والجودة"
    },
    {
      id: "INV-RPT-008",
      title: "Monthly Inventory Audit - June 2025",
      titleAr: "تدقيق المخزون الشهري - يونيو 2025",
      category: "Audit",
      categoryAr: "تدقيق",
      date: "2025-06-01",
      format: "PDF",
      status: "Scheduled",
      statusAr: "مجدول",
      size: "N/A",
      createdBy: "System",
      createdByAr: "النظام",
      description: "Scheduled monthly inventory audit report",
      descriptionAr: "تقرير تدقيق المخزون الشهري المجدول"
    },
    {
      id: "INV-RPT-009",
      title: "Damaged/Returned Items Q2 2025",
      titleAr: "العناصر التالفة/المرتجعة - الربع الثاني 2025",
      category: "Damaged",
      categoryAr: "تالف",
      date: "2025-05-15",
      format: "Excel",
      status: "Generated",
      statusAr: "تم إنشاؤه",
      size: "1.5 MB",
      createdBy: "Maryam Al-Balushi",
      createdByAr: "مريم البلوشية",
      description: "Quarterly report of all damaged and returned inventory items",
      descriptionAr: "تقرير ربع سنوي عن جميع عناصر المخزون التالفة والمرتجعة"
    },
    {
      id: "INV-RPT-010",
      title: "Inventory Forecasting Report - Q3 2025",
      titleAr: "تقرير توقعات المخزون - الربع الثالث 2025",
      category: "Forecasting",
      categoryAr: "توقعات",
      date: "2025-05-20",
      format: "PDF",
      status: "Scheduled",
      statusAr: "مجدول",
      size: "N/A",
      createdBy: "System",
      createdByAr: "النظام",
      description: "Forecasting report for inventory needs in Q3 2025",
      descriptionAr: "تقرير التنبؤ لاحتياجات المخزون في الربع الثالث 2025"
    }
  ];
  
  // Report categories
  const reportCategories = [
    "Summary",
    "Financial",
    "Analytics",
    "Movement",
    "Alerts",
    "Consumption",
    "Suppliers",
    "Audit",
    "Damaged",
    "Forecasting"
  ];
  
  // Date ranges
  const dateRanges = [
    "all",
    "today",
    "this-week",
    "this-month",
    "last-month",
    "last-quarter"
  ];
  
  // Report statistics
  const reportStats = {
    total: inventoryReportsData.length,
    generated: inventoryReportsData.filter(report => report.status === "Generated").length,
    scheduled: inventoryReportsData.filter(report => report.status === "Scheduled").length,
    archived: inventoryReportsData.filter(report => report.status === "Archived").length
  };
  
  // Format date based on selected language
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, "PPP", {
        locale: language === "ar" ? ar : enUS
      });
    } catch (error) {
      return dateString;
    }
  };
  
  // Get status badge color
  const getStatusColor = (status: string): string => {
    switch (status) {
      case "Generated":
      case "تم إنشاؤه":
        return "bg-green-100 text-green-800";
      case "Scheduled":
      case "مجدول":
        return "bg-blue-100 text-blue-800";
      case "Archived":
      case "مؤرشف":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  // Get format badge color
  const getFormatColor = (format: string): string => {
    switch (format) {
      case "PDF":
        return "bg-red-100 text-red-800";
      case "Excel":
        return "bg-green-100 text-green-800";
      case "CSV":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  // Translate category names
  const translateCategory = (category: string): string => {
    const categoryMap: {[key: string]: string} = {
      "Summary": "ملخص",
      "Financial": "مالي",
      "Analytics": "تحليلات",
      "Movement": "حركة",
      "Alerts": "تنبيهات",
      "Consumption": "استهلاك",
      "Suppliers": "موردين",
      "Audit": "تدقيق",
      "Damaged": "تالف",
      "Forecasting": "توقعات"
    };
    
    return categoryMap[category] || category;
  };
  
  // Translate date range
  const getDateRangeLabel = (range: string): string => {
    const rangeMap: {[key: string]: string} = {
      "all": t("All Time"),
      "today": t("Today"),
      "this-week": t("This Week"),
      "this-month": t("This Month"),
      "last-month": t("Last Month"),
      "last-quarter": t("Last Quarter")
    };
    
    return rangeMap[range] || range;
  };
  
  // Get localized report details
  const getLocalizedTitle = (report: InventoryReport): string => {
    return language === "ar" ? report.titleAr : report.title;
  };
  
  const getLocalizedCategory = (report: InventoryReport): string => {
    return language === "ar" ? report.categoryAr : report.category;
  };
  
  const getLocalizedStatus = (report: InventoryReport): string => {
    return language === "ar" ? report.statusAr : report.status;
  };
  
  const getLocalizedCreatedBy = (report: InventoryReport): string => {
    return language === "ar" ? report.createdByAr : report.createdBy;
  };
  
  const getLocalizedDescription = (report: InventoryReport): string => {
    return language === "ar" ? report.descriptionAr : report.description;
  };
  
  // Table columns
  const columns: Column<InventoryReport>[] = [
    {
      header: "ID",
      accessor: "id"
    },
    {
      header: "Title",
      accessor: (report) => getLocalizedTitle(report)
    },
    {
      header: "Category",
      accessor: (report) => getLocalizedCategory(report),
      cell: (report) => (
        <Badge variant="outline">
          {getLocalizedCategory(report)}
        </Badge>
      )
    },
    {
      header: "Date",
      accessor: (report) => formatDate(report.date)
    },
    {
      header: "Format",
      accessor: "format",
      cell: (report) => (
        <Badge className={getFormatColor(report.format)}>
          {report.format}
        </Badge>
      )
    },
    {
      header: "Status",
      accessor: (report) => getLocalizedStatus(report),
      cell: (report) => (
        <Badge className={getStatusColor(getLocalizedStatus(report))}>
          {getLocalizedStatus(report)}
        </Badge>
      )
    },
    {
      header: "Size",
      accessor: "size"
    },
    {
      header: "Created By",
      accessor: (report) => getLocalizedCreatedBy(report)
    },
    {
      header: "Actions",
      accessor: (report) => report.id,
      cell: (report) => (
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" disabled={report.status === "Scheduled"} className="flex items-center gap-1">
            <Download className="h-3 w-3" />
            {t("Download")}
          </Button>
        </div>
      )
    }
  ];
  
  // Filter data based on active tab, category, and date range
  const getFilteredData = () => {
    // First apply tab filter
    let filteredData = inventoryReportsData;
    if (activeTab !== "all") {
      filteredData = inventoryReportsData.filter(report => 
        report.status.toLowerCase() === activeTab
      );
    }
    
    // Then apply category filter
    if (selectedCategory !== "all") {
      filteredData = filteredData.filter(report => report.category === selectedCategory);
    }
    
    // Apply date range filter
    if (selectedDateRange !== "all") {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      
      switch (selectedDateRange) {
        case "today":
          filteredData = filteredData.filter(report => {
            const reportDate = new Date(report.date);
            return (
              reportDate.getDate() === today.getDate() &&
              reportDate.getMonth() === today.getMonth() &&
              reportDate.getFullYear() === today.getFullYear()
            );
          });
          break;
        case "this-week":
          const startOfWeek = new Date(today);
          startOfWeek.setDate(today.getDate() - today.getDay());
          filteredData = filteredData.filter(report => {
            const reportDate = new Date(report.date);
            return reportDate >= startOfWeek;
          });
          break;
        case "this-month":
          const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
          filteredData = filteredData.filter(report => {
            const reportDate = new Date(report.date);
            return reportDate >= startOfMonth;
          });
          break;
        case "last-month":
          const startOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
          const endOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
          filteredData = filteredData.filter(report => {
            const reportDate = new Date(report.date);
            return reportDate >= startOfLastMonth && reportDate <= endOfLastMonth;
          });
          break;
        case "last-quarter":
          const currentQuarter = Math.floor(today.getMonth() / 3);
          const startOfLastQuarter = new Date(today.getFullYear(), (currentQuarter - 1) * 3, 1);
          const endOfLastQuarter = new Date(today.getFullYear(), currentQuarter * 3, 0);
          filteredData = filteredData.filter(report => {
            const reportDate = new Date(report.date);
            return reportDate >= startOfLastQuarter && reportDate <= endOfLastQuarter;
          });
          break;
      }
    }
    
    // Then apply search filter if there is a search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredData = filteredData.filter(report => 
        getLocalizedTitle(report).toLowerCase().includes(query) ||
        getLocalizedCategory(report).toLowerCase().includes(query) ||
        getLocalizedCreatedBy(report).toLowerCase().includes(query) ||
        getLocalizedDescription(report).toLowerCase().includes(query) ||
        report.id.toLowerCase().includes(query)
      );
    }
    
    return filteredData;
  };

  return (
    <SubPageLayout
      title={t("Inventory Reports")}
      subtitle={t("Generate and view inventory analytics")}
      parentLink="/inventory"
      parentTitle={t("Inventory")}
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">{t("Total Reports")}</p>
                <p className="text-2xl font-bold">{reportStats.total}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">{t("Generated")}</p>
                <p className="text-2xl font-bold">{reportStats.generated}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                  <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
                  <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2Z"></path>
                  <path d="M9 9h1"></path>
                  <path d="M9 13h6"></path>
                  <path d="M9 17h6"></path>
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">{t("Scheduled")}</p>
                <p className="text-2xl font-bold">{reportStats.scheduled}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <CalendarIcon className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">{t("Archived")}</p>
                <p className="text-2xl font-bold">{reportStats.archived}</p>
              </div>
              <div className="p-3 bg-gray-200 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
                  <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Report Generation Actions */}
      <div className="mb-6">
        <Card>
          <CardHeader>
            <CardTitle>{t("Generate New Report")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
                <BarChart className="h-8 w-8 text-blue-600" />
                <span>{t("Inventory Movement Report")}</span>
              </Button>
              <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
                <PieChart className="h-8 w-8 text-green-600" />
                <span>{t("Stock Valuation Report")}</span>
              </Button>
              <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
                <LayoutGrid className="h-8 w-8 text-amber-600" />
                <span>{t("Custom Inventory Report")}</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Reports Table with Tabs */}
      <div className="mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{t("Inventory Reports")}</CardTitle>
            <Button className="flex items-center gap-1">
              <Download className="h-4 w-4" />
              {t("Batch Download")}
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-4 justify-between">
              <div className="flex flex-1 gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder={t("Search reports...")}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={t("All Categories")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("All Categories")}</SelectItem>
                    {reportCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {language === "ar" ? translateCategory(category) : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedDateRange} onValueChange={setSelectedDateRange}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder={t("Date Range")} />
                  </SelectTrigger>
                  <SelectContent>
                    {dateRanges.map((range) => (
                      <SelectItem key={range} value={range}>
                        {getDateRangeLabel(range)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex items-center gap-1">
                  <Filter className="h-4 w-4" />
                  <span>{t("Filter")}</span>
                </Button>
              </div>
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="all">{t("All Reports")}</TabsTrigger>
                <TabsTrigger value="generated">{t("Generated")}</TabsTrigger>
                <TabsTrigger value="scheduled">{t("Scheduled")}</TabsTrigger>
                <TabsTrigger value="archived">{t("Archived")}</TabsTrigger>
              </TabsList>
              
              <TabsContent value={activeTab}>
                <DataTable
                  data={getFilteredData()}
                  columns={columns}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </SubPageLayout>
  );
}
