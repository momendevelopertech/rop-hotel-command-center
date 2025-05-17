
import React, { useState } from "react";
import { SubPageLayout } from "@/components/shared/SubPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { DataTable, Column } from "@/components/shared/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Download, Filter, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { ar, enUS } from "date-fns/locale";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Interface for item transfer
interface ItemTransfer {
  id: number;
  item: string;
  itemAr: string;
  fromDepartment: string;
  fromDepartmentAr: string;
  toDepartment: string;
  toDepartmentAr: string;
  quantity: number;
  unit: string;
  unitAr: string;
  date: string;
  status: "Pending" | "In Transit" | "Completed" | "Cancelled";
  statusAr: string;
  requestedBy: string;
  requestedByAr: string;
}

export default function ItemTransfers() {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
  
  // Sample data for item transfers
  const itemTransfersData: ItemTransfer[] = [
    {
      id: 1001,
      item: "Bed Sheets (King Size)",
      itemAr: "ملاءات سرير (مقاس كبير)",
      fromDepartment: "Main Storage",
      fromDepartmentAr: "المخزن الرئيسي",
      toDepartment: "Accommodation",
      toDepartmentAr: "الإقامة",
      quantity: 50,
      unit: "pcs",
      unitAr: "قطعة",
      date: "2025-05-15",
      status: "Completed",
      statusAr: "مكتمل",
      requestedBy: "Ahmed Al-Balushi",
      requestedByAr: "أحمد البلوشي"
    },
    {
      id: 1002,
      item: "Dining Chairs",
      itemAr: "كراسي طعام",
      fromDepartment: "Main Storage",
      fromDepartmentAr: "المخزن الرئيسي",
      toDepartment: "Restaurant",
      toDepartmentAr: "المطعم",
      quantity: 12,
      unit: "pcs",
      unitAr: "قطعة",
      date: "2025-05-15",
      status: "Completed",
      statusAr: "مكتمل",
      requestedBy: "Mohammed Al-Hosni",
      requestedByAr: "محمد الحسني"
    },
    {
      id: 1003,
      item: "Kitchen Utensils Set",
      itemAr: "مجموعة أدوات المطبخ",
      fromDepartment: "Restaurant",
      fromDepartmentAr: "المطعم",
      toDepartment: "Events Hall",
      toDepartmentAr: "قاعة المناسبات",
      quantity: 5,
      unit: "sets",
      unitAr: "مجموعة",
      date: "2025-05-16",
      status: "In Transit",
      statusAr: "قيد النقل",
      requestedBy: "Fatima Al-Zadjali",
      requestedByAr: "فاطمة الزدجالي"
    },
    {
      id: 1004,
      item: "Cleaning Supplies",
      itemAr: "مستلزمات التنظيف",
      fromDepartment: "Main Storage",
      fromDepartmentAr: "المخزن الرئيسي",
      toDepartment: "Accommodation",
      toDepartmentAr: "الإقامة",
      quantity: 30,
      unit: "sets",
      unitAr: "مجموعة",
      date: "2025-05-16",
      status: "In Transit",
      statusAr: "قيد النقل",
      requestedBy: "Khalid Al-Rawahi",
      requestedByAr: "خالد الرواحي"
    },
    {
      id: 1005,
      item: "Towels (Large)",
      itemAr: "مناشف (كبيرة)",
      fromDepartment: "Accommodation",
      fromDepartmentAr: "الإقامة",
      toDepartment: "Laundry",
      toDepartmentAr: "المغسلة",
      quantity: 100,
      unit: "pcs",
      unitAr: "قطعة",
      date: "2025-05-17",
      status: "Pending",
      statusAr: "قيد الانتظار",
      requestedBy: "Saif Al-Maamari",
      requestedByAr: "سيف المعمري"
    },
    {
      id: 1006,
      item: "Projectors",
      itemAr: "أجهزة عرض",
      fromDepartment: "IT Department",
      fromDepartmentAr: "قسم تكنولوجيا المعلومات",
      toDepartment: "Training Room",
      toDepartmentAr: "قاعة التدريب",
      quantity: 2,
      unit: "pcs",
      unitAr: "قطعة",
      date: "2025-05-17",
      status: "Pending",
      statusAr: "قيد الانتظار",
      requestedBy: "Abdullah Al-Siyabi",
      requestedByAr: "عبدالله السيابي"
    },
    {
      id: 1007,
      item: "Office Chairs",
      itemAr: "كراسي مكتبية",
      fromDepartment: "Main Storage",
      fromDepartmentAr: "المخزن الرئيسي",
      toDepartment: "Administration",
      toDepartmentAr: "الإدارة",
      quantity: 8,
      unit: "pcs",
      unitAr: "قطعة",
      date: "2025-05-14",
      status: "Completed",
      statusAr: "مكتمل",
      requestedBy: "Maryam Al-Balushi",
      requestedByAr: "مريم البلوشية"
    },
    {
      id: 1008,
      item: "Disposable Dining Kits",
      itemAr: "أطقم طعام للاستخدام مرة واحدة",
      fromDepartment: "Main Storage",
      fromDepartmentAr: "المخزن الرئيسي",
      toDepartment: "Events Hall",
      toDepartmentAr: "قاعة المناسبات",
      quantity: 300,
      unit: "sets",
      unitAr: "مجموعة",
      date: "2025-05-16",
      status: "Cancelled",
      statusAr: "ملغى",
      requestedBy: "Hassan Al-Farsi",
      requestedByAr: "حسن الفارسي"
    }
  ];
  
  // Departments list
  const departments = [
    "Main Storage",
    "Accommodation",
    "Restaurant",
    "Events Hall",
    "Administration",
    "IT Department",
    "Training Room",
    "Laundry"
  ];
  
  // Transfer statistics
  const transferStats = {
    total: itemTransfersData.length,
    pending: itemTransfersData.filter(item => item.status === "Pending").length,
    inTransit: itemTransfersData.filter(item => item.status === "In Transit").length,
    completed: itemTransfersData.filter(item => item.status === "Completed").length,
    cancelled: itemTransfersData.filter(item => item.status === "Cancelled").length
  };
  
  // Format date based on selected language
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "PPP", {
      locale: language === "ar" ? ar : enUS
    });
  };
  
  // Get status badge color
  const getStatusColor = (status: string): string => {
    switch (status) {
      case "Completed":
      case "مكتمل":
        return "bg-green-100 text-green-800";
      case "In Transit":
      case "قيد النقل":
        return "bg-blue-100 text-blue-800";
      case "Pending":
      case "قيد الانتظار":
        return "bg-amber-100 text-amber-800";
      case "Cancelled":
      case "ملغى":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  // Translate department names
  const translateDepartment = (department: string): string => {
    const deptMap: {[key: string]: string} = {
      "Main Storage": "المخزن الرئيسي",
      "Accommodation": "الإقامة",
      "Restaurant": "المطعم",
      "Events Hall": "قاعة المناسبات",
      "Administration": "الإدارة",
      "IT Department": "قسم تكنولوجيا المعلومات",
      "Training Room": "قاعة التدريب",
      "Laundry": "المغسلة"
    };
    
    return deptMap[department] || department;
  };
  
  // Get localized item name and other details
  const getLocalizedItem = (item: ItemTransfer): string => {
    return language === "ar" ? item.itemAr : item.item;
  };
  
  const getLocalizedFromDept = (item: ItemTransfer): string => {
    return language === "ar" ? item.fromDepartmentAr : item.fromDepartment;
  };
  
  const getLocalizedToDept = (item: ItemTransfer): string => {
    return language === "ar" ? item.toDepartmentAr : item.toDepartment;
  };
  
  const getLocalizedStatus = (item: ItemTransfer): string => {
    return language === "ar" ? item.statusAr : item.status;
  };
  
  const getLocalizedUnit = (item: ItemTransfer): string => {
    return language === "ar" ? item.unitAr : item.unit;
  };
  
  const getLocalizedRequestedBy = (item: ItemTransfer): string => {
    return language === "ar" ? item.requestedByAr : item.requestedBy;
  };
  
  // Table columns
  const columns: Column<ItemTransfer>[] = [
    {
      header: "ID",
      accessor: "id"
    },
    {
      header: "Item",
      accessor: (item) => getLocalizedItem(item)
    },
    {
      header: "From",
      accessor: (item) => getLocalizedFromDept(item)
    },
    {
      header: "To",
      accessor: (item) => getLocalizedToDept(item)
    },
    {
      header: "Quantity",
      accessor: (item) => `${item.quantity} ${getLocalizedUnit(item)}`
    },
    {
      header: "Date",
      accessor: (item) => formatDate(item.date)
    },
    {
      header: "Status",
      accessor: (item) => getLocalizedStatus(item),
      cell: (item) => (
        <Badge className={getStatusColor(getLocalizedStatus(item))}>
          {getLocalizedStatus(item)}
        </Badge>
      )
    },
    {
      header: "Requested By",
      accessor: (item) => getLocalizedRequestedBy(item)
    }
  ];
  
  // Filter data based on active tab
  const getFilteredData = () => {
    // First apply tab filter
    let filteredData = activeTab === "all" 
      ? itemTransfersData 
      : itemTransfersData.filter(item => item.status.toLowerCase() === activeTab);
    
    // Then apply department filter
    if (selectedDepartment !== "all") {
      filteredData = filteredData.filter(item => 
        item.fromDepartment === selectedDepartment || item.toDepartment === selectedDepartment
      );
    }
    
    // Then apply search filter if there is a search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredData = filteredData.filter(item => 
        getLocalizedItem(item).toLowerCase().includes(query) ||
        getLocalizedFromDept(item).toLowerCase().includes(query) ||
        getLocalizedToDept(item).toLowerCase().includes(query) ||
        getLocalizedRequestedBy(item).toLowerCase().includes(query) ||
        item.id.toString().includes(query)
      );
    }
    
    return filteredData;
  };

  return (
    <SubPageLayout
      title={t("Item Transfers")}
      subtitle={t("Manage movement of inventory between locations")}
      parentLink="/inventory"
      parentTitle={t("Inventory")}
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">{t("Total Transfers")}</p>
                <p className="text-2xl font-bold">{transferStats.total}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                  <path d="M18 8L22 12L18 16"></path>
                  <path d="M2 12H22"></path>
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">{t("Pending")}</p>
                <p className="text-2xl font-bold">{transferStats.pending}</p>
              </div>
              <div className="p-3 bg-amber-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">{t("In Transit")}</p>
                <p className="text-2xl font-bold">{transferStats.inTransit}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                  <rect x="1" y="3" width="15" height="13"></rect>
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                  <circle cx="5.5" cy="18.5" r="2.5"></circle>
                  <circle cx="18.5" cy="18.5" r="2.5"></circle>
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">{t("Completed")}</p>
                <p className="text-2xl font-bold">{transferStats.completed}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">{t("Cancelled")}</p>
                <p className="text-2xl font-bold">{transferStats.cancelled}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-600">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Item Transfers Table with Tabs */}
      <div className="mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{t("Item Transfers")}</CardTitle>
            <Button className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              {t("New Transfer")}
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-4 justify-between">
              <div className="flex flex-1 gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder={t("Search items, departments...")}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8"
                  />
                </div>
                <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={t("All Departments")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("All Departments")}</SelectItem>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {language === "ar" ? translateDepartment(dept) : dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline" className="flex items-center gap-1">
                  <CalendarIcon className="h-4 w-4" />
                  <span>{t("Date Range")}</span>
                </Button>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex items-center gap-1">
                  <Filter className="h-4 w-4" />
                  <span>{t("Filter")}</span>
                </Button>
                <Button variant="outline" className="flex items-center gap-1">
                  <Download className="h-4 w-4" />
                  <span>{t("Export")}</span>
                </Button>
              </div>
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="all">{t("All Transfers")}</TabsTrigger>
                <TabsTrigger value="pending">{t("Pending")}</TabsTrigger>
                <TabsTrigger value="in transit">{t("In Transit")}</TabsTrigger>
                <TabsTrigger value="completed">{t("Completed")}</TabsTrigger>
                <TabsTrigger value="cancelled">{t("Cancelled")}</TabsTrigger>
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
