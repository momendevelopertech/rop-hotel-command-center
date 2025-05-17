
import React, { useState } from "react";
import { SubPageLayout } from "@/components/shared/SubPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { DataTable, Column } from "@/components/shared/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Download, Filter, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { ar, enUS } from "date-fns/locale";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Interface for damaged/returned item
interface DamagedItem {
  id: number;
  item: string;
  itemAr: string;
  reason: string;
  reasonAr: string;
  quantity: number;
  unit: string;
  unitAr: string;
  department: string;
  departmentAr: string;
  date: string;
  loggedBy: {
    name: string;
    nameAr: string;
    avatar?: string;
    initials: string;
  };
  status: "Damaged" | "Returned" | "Under Review" | "Written Off";
  statusAr: string;
  actionTaken: string;
  actionTakenAr: string;
}

export default function DamagedReturnedItems() {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
  
  // Sample data for damaged/returned items
  const damagedItemsData: DamagedItem[] = [
    {
      id: 5001,
      item: "Conference Chairs",
      itemAr: "كراسي المؤتمرات",
      reason: "Fabric Tear",
      reasonAr: "تمزق في القماش",
      quantity: 8,
      unit: "pcs",
      unitAr: "قطعة",
      department: "Events Hall",
      departmentAr: "قاعة المناسبات",
      date: "2025-05-14",
      loggedBy: {
        name: "Salim Al-Farsi",
        nameAr: "سالم الفارسي",
        avatar: "https://i.pravatar.cc/300?img=1",
        initials: "SF"
      },
      status: "Damaged",
      statusAr: "تالف",
      actionTaken: "Sent for repair",
      actionTakenAr: "أرسلت للإصلاح"
    },
    {
      id: 5002,
      item: "Table Lamps",
      itemAr: "مصابيح الطاولات",
      reason: "Electrical Fault",
      reasonAr: "عطل كهربائي",
      quantity: 12,
      unit: "pcs",
      unitAr: "قطعة",
      department: "Accommodation",
      departmentAr: "الإقامة",
      date: "2025-05-15",
      loggedBy: {
        name: "Aisha Al-Habsi",
        nameAr: "عائشة الحبسية",
        avatar: "https://i.pravatar.cc/300?img=5",
        initials: "AH"
      },
      status: "Written Off",
      statusAr: "مشطوب",
      actionTaken: "Disposed and replaced",
      actionTakenAr: "تم التخلص منها واستبدالها"
    },
    {
      id: 5003,
      item: "Fine Dining Plates",
      itemAr: "أطباق الطعام الفاخر",
      reason: "Chipped Edges",
      reasonAr: "حواف مكسورة",
      quantity: 20,
      unit: "pcs",
      unitAr: "قطعة",
      department: "Restaurant",
      departmentAr: "المطعم",
      date: "2025-05-15",
      loggedBy: {
        name: "Mohammed Al-Balushi",
        nameAr: "محمد البلوشي",
        avatar: "https://i.pravatar.cc/300?img=3",
        initials: "MB"
      },
      status: "Damaged",
      statusAr: "تالف",
      actionTaken: "Removed from inventory",
      actionTakenAr: "تمت إزالتها من المخزون"
    },
    {
      id: 5004,
      item: "Projector",
      itemAr: "جهاز عرض",
      reason: "Malfunctioning",
      reasonAr: "خلل وظيفي",
      quantity: 1,
      unit: "pc",
      unitAr: "قطعة",
      department: "Training Room",
      departmentAr: "قاعة التدريب",
      date: "2025-05-16",
      loggedBy: {
        name: "Fatima Al-Zadjali",
        nameAr: "فاطمة الزدجالية",
        avatar: "https://i.pravatar.cc/300?img=6",
        initials: "FZ"
      },
      status: "Under Review",
      statusAr: "قيد المراجعة",
      actionTaken: "Sent to IT for assessment",
      actionTakenAr: "أرسل إلى قسم تكنولوجيا المعلومات للتقييم"
    },
    {
      id: 5005,
      item: "Bedside Tables",
      itemAr: "طاولات جانبية للأسرة",
      reason: "Water Damage",
      reasonAr: "تلف بسبب الماء",
      quantity: 5,
      unit: "pcs",
      unitAr: "قطعة",
      department: "Accommodation",
      departmentAr: "الإقامة",
      date: "2025-05-16",
      loggedBy: {
        name: "Ahmed Al-Siyabi",
        nameAr: "أحمد السيابي",
        avatar: "https://i.pravatar.cc/300?img=8",
        initials: "AS"
      },
      status: "Written Off",
      statusAr: "مشطوب",
      actionTaken: "Replaced with new items",
      actionTakenAr: "تم استبدالها بعناصر جديدة"
    },
    {
      id: 5006,
      item: "Glass Tumblers",
      itemAr: "أكواب زجاجية",
      reason: "Cracked",
      reasonAr: "متصدع",
      quantity: 24,
      unit: "pcs",
      unitAr: "قطعة",
      department: "Restaurant",
      departmentAr: "المطعم",
      date: "2025-05-17",
      loggedBy: {
        name: "Khalid Al-Rawahi",
        nameAr: "خالد الرواحي",
        initials: "KR"
      },
      status: "Damaged",
      statusAr: "تالف",
      actionTaken: "Disposed",
      actionTakenAr: "تم التخلص منها"
    },
    {
      id: 5007,
      item: "Officer Uniform",
      itemAr: "زي الضباط",
      reason: "Wrong Size",
      reasonAr: "مقاس خاطئ",
      quantity: 3,
      unit: "sets",
      unitAr: "مجموعة",
      department: "Security",
      departmentAr: "الأمن",
      date: "2025-05-17",
      loggedBy: {
        name: "Saif Al-Maamari",
        nameAr: "سيف المعمري",
        avatar: "https://i.pravatar.cc/300?img=11",
        initials: "SM"
      },
      status: "Returned",
      statusAr: "مرتجع",
      actionTaken: "Returned to supplier for exchange",
      actionTakenAr: "أعيدت إلى المورد للتبديل"
    },
    {
      id: 5008,
      item: "Office Laptops",
      itemAr: "أجهزة لابتوب مكتبية",
      reason: "Performance Issues",
      reasonAr: "مشاكل في الأداء",
      quantity: 2,
      unit: "pcs",
      unitAr: "قطعة",
      department: "Administration",
      departmentAr: "الإدارة",
      date: "2025-05-17",
      loggedBy: {
        name: "Maryam Al-Balushi",
        nameAr: "مريم البلوشية",
        avatar: "https://i.pravatar.cc/300?img=10",
        initials: "MB"
      },
      status: "Returned",
      statusAr: "مرتجع",
      actionTaken: "Returned to vendor under warranty",
      actionTakenAr: "أعيدت إلى البائع ضمن الضمان"
    }
  ];
  
  // Departments list
  const departments = [
    "Accommodation",
    "Restaurant",
    "Events Hall",
    "Administration",
    "Security",
    "Training Room"
  ];
  
  // Damaged items statistics
  const itemStats = {
    total: damagedItemsData.length,
    damaged: damagedItemsData.filter(item => item.status === "Damaged").length,
    returned: damagedItemsData.filter(item => item.status === "Returned").length,
    underReview: damagedItemsData.filter(item => item.status === "Under Review").length,
    writtenOff: damagedItemsData.filter(item => item.status === "Written Off").length
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
      case "Damaged":
      case "تالف":
        return "bg-red-100 text-red-800";
      case "Returned":
      case "مرتجع":
        return "bg-blue-100 text-blue-800";
      case "Under Review":
      case "قيد المراجعة":
        return "bg-amber-100 text-amber-800";
      case "Written Off":
      case "مشطوب":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  // Translate department names
  const translateDepartment = (department: string): string => {
    const deptMap: {[key: string]: string} = {
      "Accommodation": "الإقامة",
      "Restaurant": "المطعم",
      "Events Hall": "قاعة المناسبات",
      "Administration": "الإدارة",
      "Security": "الأمن",
      "Training Room": "قاعة التدريب"
    };
    
    return deptMap[department] || department;
  };
  
  // Get localized item name and other details
  const getLocalizedItem = (item: DamagedItem): string => {
    return language === "ar" ? item.itemAr : item.item;
  };
  
  const getLocalizedReason = (item: DamagedItem): string => {
    return language === "ar" ? item.reasonAr : item.reason;
  };
  
  const getLocalizedDepartment = (item: DamagedItem): string => {
    return language === "ar" ? item.departmentAr : item.department;
  };
  
  const getLocalizedStatus = (item: DamagedItem): string => {
    return language === "ar" ? item.statusAr : item.status;
  };
  
  const getLocalizedAction = (item: DamagedItem): string => {
    return language === "ar" ? item.actionTakenAr : item.actionTaken;
  };
  
  const getLocalizedLoggedBy = (item: DamagedItem): string => {
    return language === "ar" ? item.loggedBy.nameAr : item.loggedBy.name;
  };
  
  const getLocalizedUnit = (item: DamagedItem): string => {
    return language === "ar" ? item.unitAr : item.unit;
  };
  
  // Table columns
  const columns: Column<DamagedItem>[] = [
    {
      header: "ID",
      accessor: "id"
    },
    {
      header: "Item",
      accessor: (item) => getLocalizedItem(item)
    },
    {
      header: "Reason",
      accessor: (item) => getLocalizedReason(item)
    },
    {
      header: "Quantity",
      accessor: (item) => `${item.quantity} ${getLocalizedUnit(item)}`
    },
    {
      header: "Department",
      accessor: (item) => getLocalizedDepartment(item)
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
      header: "Date",
      accessor: (item) => formatDate(item.date)
    },
    {
      header: "Logged By",
      accessor: (item) => getLocalizedLoggedBy(item),
      cell: (item) => (
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            {item.loggedBy.avatar && <AvatarImage src={item.loggedBy.avatar} alt={getLocalizedLoggedBy(item)} />}
            <AvatarFallback>{item.loggedBy.initials}</AvatarFallback>
          </Avatar>
          <span>{getLocalizedLoggedBy(item)}</span>
        </div>
      )
    },
    {
      header: "Action Taken",
      accessor: (item) => getLocalizedAction(item)
    }
  ];
  
  // Filter data based on active tab
  const getFilteredData = () => {
    // First apply tab filter
    let filteredData = damagedItemsData;
    if (activeTab !== "all") {
      filteredData = damagedItemsData.filter(item => 
        item.status.toLowerCase().replace(" ", "-") === activeTab
      );
    }
    
    // Then apply department filter
    if (selectedDepartment !== "all") {
      filteredData = filteredData.filter(item => item.department === selectedDepartment);
    }
    
    // Then apply search filter if there is a search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredData = filteredData.filter(item => 
        getLocalizedItem(item).toLowerCase().includes(query) ||
        getLocalizedReason(item).toLowerCase().includes(query) ||
        getLocalizedDepartment(item).toLowerCase().includes(query) ||
        getLocalizedLoggedBy(item).toLowerCase().includes(query) ||
        item.id.toString().includes(query)
      );
    }
    
    return filteredData;
  };

  return (
    <SubPageLayout
      title={t("Damaged/Returned Items")}
      subtitle={t("Process defective or returned inventory")}
      parentLink="/inventory"
      parentTitle={t("Inventory")}
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">{t("Total Items")}</p>
                <p className="text-2xl font-bold">{itemStats.total}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                  <path d="M20.91 8.84 8.56 2.23a1.93 1.93 0 0 0-1.81 0L3.1 4.13a1.93 1.93 0 0 0-.01 3.38l12.35 6.61c.57.31 1.23.31 1.8 0l3.65-1.9c1.05-.55 1.05-2.05.02-2.38Z"></path>
                  <path d="M3.09 8.84v7.68c0 .67.43 1.27 1.07 1.49l9.93 3.31c.51.17 1.07.17 1.58 0l9.94-3.31c.64-.22 1.07-.82 1.07-1.49V8.84"></path>
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">{t("Damaged")}</p>
                <p className="text-2xl font-bold">{itemStats.damaged}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-600">
                  <line x1="12" y1="2" x2="12" y2="6"></line>
                  <line x1="12" y1="18" x2="12" y2="22"></line>
                  <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                  <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                  <line x1="2" y1="12" x2="6" y2="12"></line>
                  <line x1="18" y1="12" x2="22" y2="12"></line>
                  <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                  <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">{t("Returned")}</p>
                <p className="text-2xl font-bold">{itemStats.returned}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                  <path d="M9 14 4 9l5-5"></path>
                  <path d="M4 9h13a4 4 0 0 1 4 4v3"></path>
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">{t("Under Review")}</p>
                <p className="text-2xl font-bold">{itemStats.underReview}</p>
              </div>
              <div className="p-3 bg-amber-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 16v-4"></path>
                  <path d="M12 8h.01"></path>
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">{t("Written Off")}</p>
                <p className="text-2xl font-bold">{itemStats.writtenOff}</p>
              </div>
              <div className="p-3 bg-gray-200 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
                  <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
                  <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2Z"></path>
                  <line x1="9" y1="9" x2="10" y2="9"></line>
                  <line x1="9" y1="13" x2="15" y2="13"></line>
                  <line x1="9" y1="17" x2="15" y2="17"></line>
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Damaged/Returned Items Table with Tabs */}
      <div className="mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{t("Damaged/Returned Items")}</CardTitle>
            <Button className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              {t("Log New Item")}
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
                <TabsTrigger value="all">{t("All Items")}</TabsTrigger>
                <TabsTrigger value="damaged">{t("Damaged")}</TabsTrigger>
                <TabsTrigger value="returned">{t("Returned")}</TabsTrigger>
                <TabsTrigger value="under-review">{t("Under Review")}</TabsTrigger>
                <TabsTrigger value="written-off">{t("Written Off")}</TabsTrigger>
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
