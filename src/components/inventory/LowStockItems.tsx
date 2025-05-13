
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useData } from "@/contexts/DataContext";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LowStockItems() {
  const { inventoryItems } = useData();

  // فلترة المنتجات منخفضة المخزون
  const lowStockItems = inventoryItems
    .filter(item => item.quantity <= item.reorderLevel)
    .sort((a, b) => a.quantity - b.quantity);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium">المنتجات التي تحتاج طلب</CardTitle>
        <AlertTriangle className="h-4 w-4 text-yellow-500" />
      </CardHeader>
      <CardContent>
        {lowStockItems.length > 0 ? (
          <div className="space-y-4">
            {lowStockItems.slice(0, 5).map(item => (
              <div key={item.id} className="border p-3 rounded-lg">
                <div className="flex justify-between">
                  <h4 className="font-medium">{item.name}</h4>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    item.quantity === 0 ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {item.quantity === 0 ? "نفدت" : "منخفضة"}
                  </span>
                </div>
                
                <div className="flex justify-between items-center mt-2 text-sm">
                  <span className="text-gray-500">المتبقي: {item.quantity}</span>
                  <span className="text-gray-500">المطلوب: {item.reorderLevel}</span>
                </div>
                
                <div className="relative h-2 w-full rounded-full bg-gray-100 mt-2 overflow-hidden">
                  <div 
                    className={`absolute top-0 left-0 h-2 ${
                      item.quantity === 0 ? "bg-red-500" : "bg-yellow-500"
                    }`}
                    style={{ width: `${Math.min((item.quantity / item.reorderLevel) * 100, 100)}%` }}
                  />
                </div>
                
                <Button size="sm" className="w-full mt-3 text-xs">
                  طلب إعادة تعبئة
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center text-gray-500">
            <p>لا توجد منتجات منخفضة المخزون</p>
          </div>
        )}
        
        {lowStockItems.length > 5 && (
          <Button variant="link" className="w-full mt-2">
            عرض الكل ({lowStockItems.length})
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
