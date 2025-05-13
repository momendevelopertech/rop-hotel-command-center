
import React from "react";
import { useData } from "@/contexts/DataContext";
import { DataTable } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Eye, FileEdit, Trash2, Plus } from "lucide-react";

export function DiningOrdersTable() {
  const { diningOrders } = useData();

  const columns = [
    { 
      header: "رقم الطلب", 
      accessor: "id" 
    },
    { 
      header: "الضابط", 
      accessor: "name" 
    },
    { 
      header: "الوجبة", 
      accessor: "meal" 
    },
    { 
      header: "متطلبات غذائية", 
      accessor: "dietary" 
    },
    { 
      header: "الحالة", 
      accessor: "status",
      cell: (order: any) => {
        const variant = order.status === "completed" 
          ? "green" 
          : order.status === "pending" 
            ? "yellow" 
            : "blue";
        return <StatusBadge status={order.status} variant={variant} />;
      }
    },
    { 
      header: "وقت الطلب", 
      accessor: "timestamp" 
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
      title="طلبات الطعام"
      data={diningOrders}
      columns={columns}
      searchField="name"
      actions={
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" /> طلب جديد
        </Button>
      }
    />
  );
}
