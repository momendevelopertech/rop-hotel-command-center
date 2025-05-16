
import React, { useState } from "react";
import { SubPageLayout } from "@/components/shared/SubPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable, Column } from "@/components/shared/DataTable";
import { useLanguage } from "@/contexts/LanguageContext";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StyledAddButton } from "@/components/shared/StyledAddButton";

// Define the inventory item interface
interface InventoryItem {
  id: number;
  name: string;
  category: string;
  quantity: number;
  reorderLevel: number;
  supplier: string;
  lastRestocked: string;
  location: string;
  status: string;
  unitPrice: number;
}

// Mock inventory data
const mockInventoryData: InventoryItem[] = [
  {
    id: 1,
    name: "Towels",
    category: "Linen",
    quantity: 120,
    reorderLevel: 50,
    supplier: "Oman Textiles",
    lastRestocked: "2025-05-01",
    location: "Main Storage",
    status: "In Stock",
    unitPrice: 5.50
  },
  {
    id: 2,
    name: "Bed sheets",
    category: "Linen",
    quantity: 85,
    reorderLevel: 40,
    supplier: "Oman Textiles",
    lastRestocked: "2025-05-03",
    location: "Main Storage",
    status: "In Stock",
    unitPrice: 12.75
  },
  {
    id: 3,
    name: "Pillows",
    category: "Linen",
    quantity: 42,
    reorderLevel: 30,
    supplier: "Gulf Hospitality Solutions",
    lastRestocked: "2025-04-28",
    location: "Main Storage",
    status: "Low Stock",
    unitPrice: 8.25
  },
  {
    id: 4,
    name: "Rice",
    category: "Food",
    quantity: 180,
    reorderLevel: 50,
    supplier: "Muscat Food Supplies",
    lastRestocked: "2025-05-10",
    location: "Kitchen Storage",
    status: "In Stock",
    unitPrice: 2.15
  },
  {
    id: 5,
    name: "Chicken",
    category: "Food",
    quantity: 45,
    reorderLevel: 30,
    supplier: "Muscat Food Supplies",
    lastRestocked: "2025-05-12",
    location: "Kitchen Storage",
    status: "In Stock",
    unitPrice: 6.75
  },
  {
    id: 6,
    name: "Water bottles",
    category: "Food",
    quantity: 28,
    reorderLevel: 50,
    supplier: "Nizwa Consumables",
    lastRestocked: "2025-05-08",
    location: "Beverage Storage",
    status: "Low Stock",
    unitPrice: 0.75
  },
  {
    id: 7,
    name: "Toilet paper",
    category: "Toiletries",
    quantity: 95,
    reorderLevel: 40,
    supplier: "Nizwa Consumables",
    lastRestocked: "2025-05-05",
    location: "Cleaning Storage",
    status: "In Stock",
    unitPrice: 1.25
  },
  {
    id: 8,
    name: "Soap",
    category: "Toiletries",
    quantity: 62,
    reorderLevel: 30,
    supplier: "Al Bahja Group",
    lastRestocked: "2025-05-02",
    location: "Cleaning Storage",
    status: "In Stock",
    unitPrice: 0.85
  },
  {
    id: 9,
    name: "Shampoo",
    category: "Toiletries",
    quantity: 15,
    reorderLevel: 25,
    supplier: "Al Bahja Group",
    lastRestocked: "2025-04-25",
    location: "Cleaning Storage",
    status: "Low Stock",
    unitPrice: 1.50
  },
  {
    id: 10,
    name: "Cleaning supplies",
    category: "Cleaning",
    quantity: 8,
    reorderLevel: 20,
    supplier: "Salalah Trading",
    lastRestocked: "2025-04-20",
    location: "Cleaning Storage",
    status: "Out of Stock",
    unitPrice: 4.25
  }
];

// Category summary interface
interface CategorySummary {
  category: string;
  totalItems: number;
  totalValue: number;
  lowStockItems: number;
}

export default function StockOverview() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>("all");
  
  // Prepare category summaries
  const categorySummaries: CategorySummary[] = Array.from(
    new Set(mockInventoryData.map(item => item.category))
  ).map(category => {
    const categoryItems = mockInventoryData.filter(item => item.category === category);
    return {
      category,
      totalItems: categoryItems.reduce((sum, item) => sum + item.quantity, 0),
      totalValue: categoryItems.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0),
      lowStockItems: categoryItems.filter(item => item.status === "Low Stock" || item.status === "Out of Stock").length
    };
  });

  // Define columns for the inventory table
  const columns: Column<InventoryItem>[] = [
    { header: "ID", accessor: "id" },
    { header: "Item Name", accessor: "name" },
    { header: "Category", accessor: "category" },
    { header: "Quantity", accessor: "quantity" },
    { header: "Reorder Level", accessor: "reorderLevel" },
    { header: "Supplier", accessor: "supplier" },
    { header: "Last Restocked", accessor: "lastRestocked" },
    { header: "Location", accessor: "location" },
    { 
      header: "Status", 
      accessor: "status",
      cell: (item: InventoryItem) => {
        const statusType = item.status === "In Stock" ? "success" : 
                          item.status === "Low Stock" ? "warning" : "danger";
        return <StatusBadge status={item.status} type={statusType} />;
      }
    },
    { 
      header: "Actions", 
      accessor: (item: InventoryItem) => item.id,
      cell: (item: InventoryItem) => (
        <div className="flex space-x-1">
          <Button variant="outline" size="sm" className="h-7 px-2 text-xs">
            {t("Restock")}
          </Button>
          <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
            {t("Details")}
          </Button>
        </div>
      )
    }
  ];

  // Filter items based on active tab
  const filteredItems = activeTab === "all" 
    ? mockInventoryData 
    : activeTab === "low" 
      ? mockInventoryData.filter(item => item.status === "Low Stock" || item.status === "Out of Stock")
      : mockInventoryData.filter(item => item.category === activeTab);

  return (
    <SubPageLayout
      title="Stock Overview"
      subtitle="Complete overview of current inventory"
      parentLink="/inventory"
      parentTitle="Inventory"
    >
      {/* Category summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {categorySummaries.map((summary, index) => (
          <Card key={index} className="bg-white">
            <CardContent className="p-4">
              <h3 className="font-medium text-lg mb-1">{t(summary.category)}</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-gray-500">{t("Items")}</p>
                  <p className="font-medium">{summary.totalItems}</p>
                </div>
                <div>
                  <p className="text-gray-500">{t("Value")}</p>
                  <p className="font-medium">{summary.totalValue.toFixed(2)} OMR</p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-500">{t("Low Stock")}</p>
                  <p className={`font-medium ${summary.lowStockItems > 0 ? "text-yellow-600" : "text-green-600"}`}>
                    {summary.lowStockItems}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main inventory table with tabs */}
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">{t("Inventory Items")}</h2>
        <StyledAddButton label="Add New Item" />
      </div>
      
      <Card>
        <CardHeader className="pb-0">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">{t("All Items")}</TabsTrigger>
              <TabsTrigger value="low">{t("Low Stock")}</TabsTrigger>
              {categorySummaries.map((summary, index) => (
                <TabsTrigger key={index} value={summary.category}>
                  {t(summary.category)}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <DataTable
            data={filteredItems}
            columns={columns}
            searchField="name"
            showHeader={false}
          />
        </CardContent>
      </Card>
    </SubPageLayout>
  );
}
