
import React from "react";
import { useData } from "@/contexts/DataContext";
import { DataTable } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { Plus, Eye, FileEdit, Trash2 } from "lucide-react";

export function InventoryTable() {
  const { inventoryItems } = useData();

  const columns = [
    { 
      header: "اسم المنتج", 
      accessor: "name" 
    },
    { 
      header: "الكمية", 
      accessor: "quantity" 
    },
    { 
      header: "المورد", 
      accessor: "supplier" 
    },
    { 
      header: "الفئة", 
      accessor: "category" 
    },
    { 
      header: "الحالة", 
      accessor: (item: any) => {
        return item.quantity > item.reorderLevel 
          ? "كافية" 
          : item.quantity === 0 
            ? "نفدت" 
            : "منخفضة";
      },
      cell: (item: any) => {
        const status = item.quantity > item.reorderLevel 
          ? "كافية" 
          : item.quantity === 0 
            ? "نفدت" 
            : "منخفضة";
        
        const variant = item.quantity > item.reorderLevel 
          ? "green" 
          : item.quantity === 0 
            ? "red" 
            : "yellow";
        
        return (
          <div className={`px-2 py-1 rounded text-xs font-medium text-center ${
            variant === "green" ? "bg-green-100 text-green-800" : 
            variant === "yellow" ? "bg-yellow-100 text-yellow-800" : 
            "bg-red-100 text-red-800"
          }`}>
            {status}
          </div>
        );
      }
    },
    { 
      header: "إجراءات", 
      accessor: "id",
      cell: () => (
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <FileEdit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )
    }
  ];

  return (
    <DataTable
      title="المخزون"
      data={inventoryItems}
      columns={columns}
      searchField="name"
      actions={
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" /> منتج جديد
        </Button>
      }
    />
  );
}
