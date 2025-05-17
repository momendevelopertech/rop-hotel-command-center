
import React, { useState } from "react";
import { SubPageLayout } from "@/components/shared/SubPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { DataTable, Column } from "@/components/shared/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Download, Filter, Plus, Search, ShoppingCart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Interface for inventory item
interface InventoryItem {
  id: number;
  sku: string;
  item: string;
  itemAr: string;
  category: string;
  categoryAr: string;
  currentQty: number;
  reorderLevel: number;
  unit: string;
  unitAr: string;
  supplier: string;
  supplierAr: string;
  leadTime: number; // in days
  lastOrderDate: string;
  status: "Critical" | "Low" | "Reorder Soon" | "Optimal";
  statusAr: string;
}

export default function LowStockAlerts() {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  // Sample data for inventory items
  const inventoryItemsData: InventoryItem[] = [
    {
      id: 3001,
      sku: "BED-SHT-K",
      item: "Bed Sheets (King Size)",
      itemAr: "ملاءات سرير (مقاس كبير)",
      category: "Bedding",
      categoryAr: "مفروشات السرير",
      currentQty: 12,
      reorderLevel: 30,
      unit: "sets",
      unitAr: "مجموعة",
      supplier: "Oman Textile Co.",
      supplierAr: "شركة عُمان للمنسوجات",
      leadTime: 5,
      lastOrderDate: "2025-04-28",
      status: "Critical",
      statusAr: "حرج"
    },
    {
      id: 3002,
      sku: "TOW-LRG",
      item: "Towels (Large)",
      itemAr: "مناشف (كبيرة)",
      category: "Bathroom",
      categoryAr: "حمام",
      currentQty: 45,
      reorderLevel: 75,
      unit: "pcs",
      unitAr: "قطعة",
      supplier: "Gulf Supplies Ltd.",
      supplierAr: "شركة الخليج للتوريدات",
      leadTime: 3,
      lastOrderDate: "2025-05-05",
      status: "Low",
      statusAr: "منخفض"
    },
    {
      id: 3003,
      sku: "UTN-DINE",
      item: "Dining Utensils",
      itemAr: "أدوات المائدة",
      category: "Dining",
      categoryAr: "تناول الطعام",
      currentQty: 120,
      reorderLevel: 150,
      unit: "sets",
      unitAr: "مجموعة",
      supplier: "Muscat Restaurant Supplies",
      supplierAr: "توريدات مطاعم مسقط",
      leadTime: 7,
      lastOrderDate: "2025-05-01",
      status: "Reorder Soon",
      statusAr: "إعادة الطلب قريبًا"
    },
    {
      id: 3004,
      sku: "CLE-SUP",
      item: "Cleaning Supplies",
      itemAr: "مستلزمات التنظيف",
      category: "Housekeeping",
      categoryAr: "تدبير منزلي",
      currentQty: 10,
      reorderLevel: 25,
      unit: "boxes",
      unitAr: "صندوق",
      supplier: "Oman Cleaning Solutions",
      supplierAr: "حلول التنظيف العُمانية",
      leadTime: 2,
      lastOrderDate: "2025-05-10",
      status: "Critical",
      statusAr: "حرج"
    },
    {
      id: 3005,
      sku: "TISS-BOX",
      item: "Tissue Boxes",
      itemAr: "علب مناديل",
      category: "Bathroom",
      categoryAr: "حمام",
      currentQty: 60,
      reorderLevel: 100,
      unit: "boxes",
      unitAr: "صندوق",
      supplier: "Gulf Supplies Ltd.",
      supplierAr: "شركة الخليج للتوريدات",
      leadTime: 2,
      lastOrderDate: "2025-05-08",
      status: "Low",
      statusAr: "منخفض"
    },
    {
      id: 3006,
      sku: "LAMP-DESK",
      item: "Desk Lamps",
      itemAr: "مصابيح مكتب",
      category: "Electronics",
      categoryAr: "إلكترونيات",
      currentQty: 8,
      reorderLevel: 15,
      unit: "pcs",
      unitAr: "قطعة",
      supplier: "Oman Electronics Ltd.",
      supplierAr: "شركة عُمان للإلكترونيات",
      leadTime: 10,
      lastOrderDate: "2025-04-20",
      status: "Critical",
      statusAr: "حرج"
    },
    {
      id: 3007,
      sku: "SOAP-BAR",
      item: "Bar Soap",
      itemAr: "صابون قالب",
      category: "Bathroom",
      categoryAr: "حمام",
      currentQty: 200,
      reorderLevel: 250,
      unit: "pcs",
      unitAr: "قطعة",
      supplier: "Oman Cleaning Solutions",
      supplierAr: "حلول التنظيف العُمانية",
      leadTime: 3,
      lastOrderDate: "2025-05-05",
      status: "Reorder Soon",
      statusAr: "إعادة الطلب قريبًا"
    },
    {
      id: 3008,
      sku: "PILLOW-STD",
      item: "Standard Pillows",
      itemAr: "وسائد قياسية",
      category: "Bedding",
      categoryAr: "مفروشات السرير",
      currentQty: 25,
      reorderLevel: 40,
      unit: "pcs",
      unitAr: "قطعة",
      supplier: "Oman Textile Co.",
      supplierAr: "شركة عُمان للمنسوجات",
      leadTime: 5,
      lastOrderDate: "2025-04-30",
      status: "Low",
      statusAr: "منخفض"
    },
    {
      id: 3009,
      sku: "COFFEE-ARAB",
      item: "Arabic Coffee Beans",
      itemAr: "حبوب القهوة العربية",
      category: "Food & Beverage",
      categoryAr: "أغذية ومشروبات",
      currentQty: 5,
      reorderLevel: 15,
      unit: "kg",
      unitAr: "كجم",
      supplier: "Muscat Food Trading",
      supplierAr: "تجارة الأغذية مسقط",
      leadTime: 4,
      lastOrderDate: "2025-05-12",
      status: "Critical",
      statusAr: "حرج"
    },
    {
      id: 3010,
      sku: "PAPER-A4",
      item: "A4 Paper",
      itemAr: "ورق مقاس A4",
      category: "Office Supplies",
      categoryAr: "لوازم مكتبية",
      currentQty: 30,
      reorderLevel: 50,
      unit: "reams",
      unitAr: "رزمة",
      supplier: "Oman Office Supplies",
      supplierAr: "لوازم المكاتب العُمانية",
      leadTime: 2,
      lastOrderDate: "2025-05-09",
      status: "Low",
      statusAr: "منخفض"
    },
    {
      id: 3011,
      sku: "BATT-AA",
      item: "AA Batteries",
      itemAr: "بطاريات AA",
      category: "Electronics",
      categoryAr: "إلكترونيات",
      currentQty: 48,
      reorderLevel: 60,
      unit: "packs",
      unitAr: "علبة",
      supplier: "Oman Electronics Ltd.",
      supplierAr: "شركة عُمان للإلكترونيات",
      leadTime: 3,
      lastOrderDate: "2025-05-07",
      status: "Reorder Soon",
      statusAr: "إعادة الطلب قريبًا"
    },
    {
      id: 3012,
      sku: "WATER-BTL",
      item: "Bottled Water",
      itemAr: "مياه معبأة",
      category: "Food & Beverage",
      categoryAr: "أغذية ومشروبات",
      currentQty: 120,
      reorderLevel: 200,
      unit: "boxes",
      unitAr: "صندوق",
      supplier: "Oman Water Company",
      supplierAr: "شركة مياه عُمان",
      leadTime: 1,
      lastOrderDate: "2025-05-14",
      status: "Low",
      statusAr: "منخفض"
    }
  ];
  
  // Categories list
  const categories = [
    "Bedding",
    "Bathroom",
    "Dining",
    "Housekeeping",
    "Electronics",
    "Food & Beverage",
    "Office Supplies"
  ];
  
  // Inventory statistics
  const inventoryStats = {
    total: inventoryItemsData.length,
    critical: inventoryItemsData.filter(item => item.status === "Critical").length,
    low: inventoryItemsData.filter(item => item.status === "Low").length,
    reorderSoon: inventoryItemsData.filter(item => item.status === "Reorder Soon").length,
    pendingOrders: 4 // Hardcoded for demonstration
  };
  
  // Translate category names
  const translateCategory = (category: string): string => {
    const categoryMap: {[key: string]: string} = {
      "Bedding": "مفروشات السرير",
      "Bathroom": "حمام",
      "Dining": "تناول الطعام",
      "Housekeeping": "تدبير منزلي",
      "Electronics": "إلكترونيات",
      "Food & Beverage": "أغذية ومشروبات",
      "Office Supplies": "لوازم مكتبية"
    };
    
    return categoryMap[category] || category;
  };
  
  // Get status badge color
  const getStatusColor = (status: string): string => {
    switch (status) {
      case "Critical":
      case "حرج":
        return "bg-red-100 text-red-800";
      case "Low":
      case "منخفض":
        return "bg-amber-100 text-amber-800";
      case "Reorder Soon":
      case "إعادة الطلب قريبًا":
        return "bg-blue-100 text-blue-800";
      case "Optimal":
      case "أمثل":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  // Calculate stock percentage
  const calculateStockPercentage = (current: number, reorder: number): number => {
    // If current quantity is 0, return 0%
    if (current === 0) return 0;
    
    // If current quantity is at or above the reorder level, cap at 100%
    if (current >= reorder) return 100;
    
    // Otherwise calculate the percentage
    return Math.round((current / reorder) * 100);
  };
  
  // Get color for progress bar based on percentage
  const getProgressColor = (percentage: number): string => {
    if (percentage < 25) return "bg-red-500";
    if (percentage < 50) return "bg-amber-500";
    if (percentage < 75) return "bg-blue-500";
    return "bg-green-500";
  };
  
  // Get localized item name and other details
  const getLocalizedItem = (item: InventoryItem): string => {
    return language === "ar" ? item.itemAr : item.item;
  };
  
  const getLocalizedCategory = (item: InventoryItem): string => {
    return language === "ar" ? item.categoryAr : item.category;
  };
  
  const getLocalizedSupplier = (item: InventoryItem): string => {
    return language === "ar" ? item.supplierAr : item.supplier;
  };
  
  const getLocalizedStatus = (item: InventoryItem): string => {
    return language === "ar" ? item.statusAr : item.status;
  };
  
  const getLocalizedUnit = (item: InventoryItem): string => {
    return language === "ar" ? item.unitAr : item.unit;
  };
  
  // Table columns
  const columns: Column<InventoryItem>[] = [
    {
      header: t("SKU"),
      accessor: "sku"
    },
    {
      header: t("Item"),
      accessor: (item) => getLocalizedItem(item)
    },
    {
      header: t("Category"),
      accessor: (item) => getLocalizedCategory(item)
    },
    {
      header: t("Current Qty"),
      accessor: (item) => `${item.currentQty} ${getLocalizedUnit(item)}`
    },
    {
      header: t("Reorder Level"),
      accessor: (item) => `${item.reorderLevel} ${getLocalizedUnit(item)}`
    },
    {
      header: t("Stock Level"),
      accessor: (item) => `${calculateStockPercentage(item.currentQty, item.reorderLevel)}%`,
      cell: (item) => {
        const percentage = calculateStockPercentage(item.currentQty, item.reorderLevel);
        return (
          <div className="w-full">
            <div className="flex justify-between mb-1 text-xs">
              <span>{percentage}%</span>
              <span>{item.currentQty}/{item.reorderLevel}</span>
            </div>
            <Progress
              value={percentage}
              className={getProgressColor(percentage)}
            />
          </div>
        );
      }
    },
    {
      header: t("Status"),
      accessor: (item) => getLocalizedStatus(item),
      cell: (item) => (
        <Badge className={getStatusColor(getLocalizedStatus(item))}>
          {getLocalizedStatus(item)}
        </Badge>
      )
    },
    {
      header: t("Supplier"),
      accessor: (item) => getLocalizedSupplier(item)
    },
    {
      header: t("Lead Time"),
      accessor: (item) => {
        // Fix: Use the object parameter format for translation with variables
        return t("{{days}} days", { days: item.leadTime });
      }
    },
    {
      header: t("Actions"),
      accessor: (item) => item.id,
      cell: (item) => (
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <ShoppingCart className="h-3 w-3" />
            {t("Order")}
          </Button>
        </div>
      )
    }
  ];
  
  // Filter data based on active tab
  const getFilteredData = () => {
    // First apply tab filter
    let filteredData = inventoryItemsData;
    if (activeTab !== "all") {
      filteredData = inventoryItemsData.filter(item => 
        item.status.toLowerCase().replace(" ", "-") === activeTab
      );
    }
    
    // Then apply category filter
    if (selectedCategory !== "all") {
      filteredData = filteredData.filter(item => item.category === selectedCategory);
    }
    
    // Then apply search filter if there is a search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredData = filteredData.filter(item => 
        getLocalizedItem(item).toLowerCase().includes(query) ||
        getLocalizedCategory(item).toLowerCase().includes(query) ||
        getLocalizedSupplier(item).toLowerCase().includes(query) ||
        item.sku.toLowerCase().includes(query)
      );
    }
    
    return filteredData;
  };

  return (
    <SubPageLayout
      title={t("Low Stock Alerts")}
      subtitle={t("Monitor inventory levels and reorder points")}
      parentLink="/inventory"
      parentTitle={t("Inventory")}
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">{t("Monitored Items")}</p>
                <p className="text-2xl font-bold">{inventoryStats.total}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                  <path d="M3 3v18h18"></path>
                  <path d="m19 9-5 5-4-4-3 3"></path>
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">{t("Critical")}</p>
                <p className="text-2xl font-bold">{inventoryStats.critical}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">{t("Low")}</p>
                <p className="text-2xl font-bold">{inventoryStats.low}</p>
              </div>
              <div className="p-3 bg-amber-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600">
                  <path d="M6 8.32a7.43 7.43 0 0 1 0 7.36"></path>
                  <path d="M9.46 6.21a11.76 11.76 0 0 1 0 11.58"></path>
                  <path d="M12.91 4.96a15.52 15.52 0 0 1 0 14.08"></path>
                  <path d="M16.37 3.8a19.98 19.98 0 0 1 0 16.4"></path>
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">{t("Reorder Soon")}</p>
                <p className="text-2xl font-bold">{inventoryStats.reorderSoon}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <ShoppingCart className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">{t("Pending Orders")}</p>
                <p className="text-2xl font-bold">{inventoryStats.pendingOrders}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                  <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                  <path d="M7 15h0"></path>
                  <path d="M2 9.5h20"></path>
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Status Legend */}
      <div className="mb-6">
        <Card>
          <CardHeader>
            <CardTitle>{t("Stock Level Legend")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Badge className="bg-red-100 text-red-800">{t("Critical")}</Badge>
                <span className="text-sm text-gray-600">{t("Less than 25% of reorder level")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-amber-100 text-amber-800">{t("Low")}</Badge>
                <span className="text-sm text-gray-600">{t("Between 25-50% of reorder level")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-blue-100 text-blue-800">{t("Reorder Soon")}</Badge>
                <span className="text-sm text-gray-600">{t("Between 50-75% of reorder level")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-100 text-green-800">{t("Optimal")}</Badge>
                <span className="text-sm text-gray-600">{t("Above 75% of reorder level")}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Low Stock Items Table with Tabs */}
      <div className="mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{t("Low Stock Items")}</CardTitle>
            <div className="flex gap-2">
              <Button className="flex items-center gap-1" variant="outline">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                  <path d="M12 5v14"></path>
                  <path d="m19 12-7 7-7-7"></path>
                </svg>
                {t("Update Levels")}
              </Button>
              <Button className="flex items-center gap-1">
                <Plus className="h-4 w-4" />
                {t("Bulk Order")}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-4 justify-between">
              <div className="flex flex-1 gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder={t("Search items, SKU...")}
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
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {language === "ar" ? translateCategory(category) : category}
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
                <Button variant="outline" className="flex items-center gap-1">
                  <Download className="h-4 w-4" />
                  <span>{t("Export")}</span>
                </Button>
              </div>
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="all">{t("All Items")}</TabsTrigger>
                <TabsTrigger value="critical">{t("Critical")}</TabsTrigger>
                <TabsTrigger value="low">{t("Low")}</TabsTrigger>
                <TabsTrigger value="reorder-soon">{t("Reorder Soon")}</TabsTrigger>
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
