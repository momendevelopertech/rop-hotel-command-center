
import React from "react";
import { useData } from "@/contexts/DataContext";
import { Card, CardContent } from "@/components/ui/card";
import { Database, AlertTriangle, Check } from "lucide-react";

export function InventoryStats() {
  const { inventoryItems } = useData();

  // حساب إحصائيات المخزون
  const totalItems = inventoryItems.length;
  const lowStockItems = inventoryItems.filter(item => item.quantity <= item.reorderLevel && item.quantity > 0).length;
  const outOfStockItems = inventoryItems.filter(item => item.quantity === 0).length;

  return (
    <>
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Database className="h-6 w-6 text-blue-700" />
            </div>
            <div className="ms-3">
              <p className="text-sm font-medium text-muted-foreground">إجمالي المنتجات</p>
              <h3 className="text-2xl font-bold">{totalItems}</h3>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-yellow-700" />
            </div>
            <div className="ms-3">
              <p className="text-sm font-medium text-muted-foreground">منتجات منخفضة المخزون</p>
              <h3 className="text-2xl font-bold">{lowStockItems}</h3>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start">
            <div className="p-2 bg-red-100 rounded-lg">
              <Check className="h-6 w-6 text-red-700" />
            </div>
            <div className="ms-3">
              <p className="text-sm font-medium text-muted-foreground">منتجات نفدت</p>
              <h3 className="text-2xl font-bold">{outOfStockItems}</h3>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
