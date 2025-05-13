
import React from "react";
import { useData } from "@/contexts/DataContext";
import { DataTable } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Plus, Eye, FileEdit, Trash2 } from "lucide-react";

export function EventsTable() {
  const { events } = useData();

  const columns = [
    { 
      header: "اسم الفعالية", 
      accessor: "name" 
    },
    { 
      header: "التاريخ", 
      accessor: "date" 
    },
    { 
      header: "الحضور", 
      accessor: "attendees" 
    },
    { 
      header: "المكان", 
      accessor: "location" 
    },
    { 
      header: "الحالة", 
      accessor: "status",
      cell: (event: any) => {
        const variant = event.status === "completed" 
          ? "green" 
          : event.status === "upcoming" 
            ? "blue" 
            : "yellow";
        return <StatusBadge status={event.status} variant={variant} />;
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
      title="الفعاليات القادمة"
      data={events}
      columns={columns}
      searchField="name"
      actions={
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" /> فعالية جديدة
        </Button>
      }
    />
  );
}
