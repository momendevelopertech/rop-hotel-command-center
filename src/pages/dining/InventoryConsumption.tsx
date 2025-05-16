
import React, { useState } from "react";
import { SubPageLayout } from "@/components/shared/SubPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable, Column } from "@/components/shared/DataTable";
import { useLanguage } from "@/contexts/LanguageContext";
import { Badge } from "@/components/ui/badge";
import { 
  Package, 
  CookingPot, 
  CalendarDays,
  Users,
  SearchIcon
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StyledAddButton } from "@/components/shared/StyledAddButton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Define the inventory consumption type
interface InventoryConsumptionItem {
  id: number;
  itemName: string;
  quantity: number;
  unit: string;
  date: string;
  department: string;
  usedBy: string;
  category: string;
}

// Sample inventory consumption data
const inventoryConsumptionData: InventoryConsumptionItem[] = [
  {
    id: 1,
    itemName: "Rice",
    quantity: 5,
    unit: "kg",
    date: "2025-05-15",
    department: "Kitchen",
    usedBy: "Chef Ali",
    category: "Food"
  },
  {
    id: 2,
    itemName: "Chicken",
    quantity: 3,
    unit: "kg",
    date: "2025-05-15",
    department: "Kitchen",
    usedBy: "Chef Mohammed",
    category: "Food"
  },
  {
    id: 3,
    itemName: "Olive Oil",
    quantity: 1.5,
    unit: "L",
    date: "2025-05-15",
    department: "Kitchen",
    usedBy: "Chef Fatima",
    category: "Food"
  },
  {
    id: 4,
    itemName: "Towels",
    quantity: 10,
    unit: "pcs",
    date: "2025-05-14",
    department: "Housekeeping",
    usedBy: "Sarah",
    category: "Linen"
  },
  {
    id: 5,
    itemName: "Cleaning Solution",
    quantity: 2,
    unit: "L",
    date: "2025-05-14",
    department: "Housekeeping",
    usedBy: "Abdullah",
    category: "Cleaning"
  },
  {
    id: 6,
    itemName: "Coffee Beans",
    quantity: 0.5,
    unit: "kg",
    date: "2025-05-15",
    department: "Cafeteria",
    usedBy: "Barista Ahmed",
    category: "Beverage"
  },
  {
    id: 7,
    itemName: "Sugar",
    quantity: 2,
    unit: "kg",
    date: "2025-05-15",
    department: "Kitchen",
    usedBy: "Chef Ali",
    category: "Food"
  },
  {
    id: 8,
    itemName: "Napkins",
    quantity: 100,
    unit: "pcs",
    date: "2025-05-16",
    department: "Dining",
    usedBy: "Service Staff",
    category: "Disposables"
  },
  {
    id: 9,
    itemName: "Printer Paper",
    quantity: 1,
    unit: "ream",
    date: "2025-05-16",
    department: "Administration",
    usedBy: "Office Manager",
    category: "Office Supply"
  }
];

// Stats data for inventory consumption
interface ConsumptionStats {
  totalItemsUsed: number;
  departmentsConsuming: number;
  topDepartment: string;
  topCategory: string;
}

const consumptionStats: ConsumptionStats = {
  totalItemsUsed: 125,
  departmentsConsuming: 5,
  topDepartment: "Kitchen",
  topCategory: "Food"
};

export default function InventoryConsumption() {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [department, setDepartment] = useState<string>("");
  
  // Add Arabic translations for the department and category names
  const translateDepartment = (dept: string) => {
    if (language === "ar") {
      const translations: Record<string, string> = {
        "Kitchen": "المطبخ",
        "Housekeeping": "التدبير المنزلي",
        "Dining": "قاعة الطعام",
        "Cafeteria": "الكافتيريا",
        "Administration": "الإدارة"
      };
      return translations[dept] || dept;
    }
    return dept;
  };
  
  const translateCategory = (cat: string) => {
    if (language === "ar") {
      const translations: Record<string, string> = {
        "Food": "طعام",
        "Beverage": "مشروبات",
        "Cleaning": "تنظيف",
        "Linen": "مفروشات",
        "Disposables": "مواد استهلاكية",
        "Office Supply": "مستلزمات مكتبية"
      };
      return translations[cat] || cat;
    }
    return cat;
  };
  
  // Format the quantity with unit
  const formatQuantity = (quantity: number, unit: string) => {
    return `${quantity} ${unit}`;
  };
  
  const columns: Column<InventoryConsumptionItem>[] = [
    { header: "ID", accessor: "id" },
    { 
      header: "Item Name", 
      accessor: "itemName",
      cell: (item) => language === "ar" 
        ? translateItemName(item.itemName) 
        : item.itemName
    },
    { 
      header: "Quantity", 
      accessor: (item) => formatQuantity(item.quantity, item.unit)
    },
    { header: "Date", accessor: "date" },
    { 
      header: "Department", 
      accessor: "department",
      cell: (item) => translateDepartment(item.department)
    },
    { 
      header: "Used By", 
      accessor: "usedBy",
      cell: (item) => language === "ar" 
        ? arabicName(item.usedBy) 
        : item.usedBy
    },
    { 
      header: "Category", 
      accessor: "category",
      cell: (item) => translateCategory(item.category)
    },
    { 
      header: "Actions", 
      accessor: (item) => item.id,
      cell: () => (
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            {t("View")}
          </Button>
          <Button variant="outline" size="sm">
            {t("Edit")}
          </Button>
        </div>
      )
    }
  ];
  
  // Helper function to translate item names to Arabic
  const translateItemName = (name: string) => {
    const itemTranslations: Record<string, string> = {
      "Rice": "أرز",
      "Chicken": "دجاج",
      "Olive Oil": "زيت زيتون",
      "Towels": "مناشف",
      "Cleaning Solution": "محلول تنظيف",
      "Coffee Beans": "حبوب القهوة",
      "Sugar": "سكر",
      "Napkins": "مناديل",
      "Printer Paper": "ورق طابعة"
    };
    
    return itemTranslations[name] || name;
  };
  
  // Helper function to translate names to Arabic
  const arabicName = (name: string) => {
    const nameTranslations: Record<string, string> = {
      "Chef Ali": "الشيف علي",
      "Chef Mohammed": "الشيف محمد",
      "Chef Fatima": "الشيف فاطمة",
      "Sarah": "سارة",
      "Abdullah": "عبدالله",
      "Barista Ahmed": "باريستا أحمد",
      "Service Staff": "طاقم الخدمة",
      "Office Manager": "مدير المكتب"
    };
    
    return nameTranslations[name] || name;
  };
  
  // Filter data based on search term and department
  const filteredData = inventoryConsumptionData.filter(item => {
    const matchesSearch = searchTerm === "" || 
      item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = department === "" || item.department === department;
    
    return matchesSearch && matchesDepartment;
  });
  
  // Filter by date for different tabs
  const getTabData = (tabId: string) => {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    
    switch (tabId) {
      case "today":
        return filteredData.filter(item => item.date === today);
      case "yesterday":
        return filteredData.filter(item => item.date === yesterdayStr);
      case "thisWeek":
        // Get date from a week ago
        const weekAgo = new Date(now);
        weekAgo.setDate(weekAgo.getDate() - 7);
        return filteredData.filter(item => new Date(item.date) >= weekAgo);
      default:
        return filteredData;
    }
  };
  
  // Get unique department values for the filter
  const departments = [...new Set(inventoryConsumptionData.map(item => item.department))];
  
  return (
    <SubPageLayout
      title={t("Inventory Consumption")}
      subtitle={t("Track ingredient usage and stock levels")}
      parentLink="/dining"
      parentTitle={t("Dining & Catering")}
    >
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">{t("Total Items Used")}</p>
                <p className="text-2xl font-bold">{consumptionStats.totalItemsUsed}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Package className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">{t("Departments")}</p>
                <p className="text-2xl font-bold">{consumptionStats.departmentsConsuming}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Users className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">{t("Top Department")}</p>
                <p className="text-2xl font-bold">
                  {language === "ar" ? translateDepartment(consumptionStats.topDepartment) : consumptionStats.topDepartment}
                </p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <CookingPot className="h-5 w-5 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">{t("Top Category")}</p>
                <p className="text-2xl font-bold">
                  {language === "ar" ? translateCategory(consumptionStats.topCategory) : consumptionStats.topCategory}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <CalendarDays className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Search and Filter Section */}
      <div className="mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="relative w-full md:w-64">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder={t("Search items...")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="w-full md:w-48">
                <Select value={department} onValueChange={setDepartment}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("All Departments")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">{t("All Departments")}</SelectItem>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {language === "ar" ? translateDepartment(dept) : dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <StyledAddButton label={t("Log Consumption")} />
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Consumption Data Table */}
      <div className="mb-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>{t("Inventory Usage Log")}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="all">{t("All")}</TabsTrigger>
                <TabsTrigger value="today">{t("Today")}</TabsTrigger>
                <TabsTrigger value="yesterday">{t("Yesterday")}</TabsTrigger>
                <TabsTrigger value="thisWeek">{t("This Week")}</TabsTrigger>
              </TabsList>
              
              <TabsContent value={activeTab}>
                <DataTable
                  data={getTabData(activeTab)}
                  columns={columns}
                  searchField="itemName"
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      
      {/* Consumption Analysis - Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>{t("Consumption Analysis")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center border-2 border-dashed border-gray-200 rounded-md">
            <p className="text-gray-500">{t("Consumption trends chart will be displayed here")}</p>
          </div>
        </CardContent>
      </Card>
    </SubPageLayout>
  );
}
