
import React from "react";
import { useData } from "@/contexts/DataContext";
import { DataTable } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Plus, Eye, FileEdit, Trash2 } from "lucide-react";

export function MembersTable() {
  const { memberships } = useData();

  const columns = [
    { 
      header: "الضابط", 
      accessor: "officer" 
    },
    { 
      header: "الرتبة", 
      accessor: "rank" 
    },
    { 
      header: "الحالة", 
      accessor: "status",
      cell: (member: any) => {
        const variant = member.status === "active" 
          ? "green" 
          : member.status === "pending" 
            ? "yellow" 
            : "red";
        return <StatusBadge status={member.status} variant={variant} />;
      }
    },
    { 
      header: "تاريخ التجديد", 
      accessor: "renewal" 
    },
    { 
      header: "عضو منذ", 
      accessor: "memberSince" 
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
      title="الأعضاء"
      data={memberships}
      columns={columns}
      searchField="officer"
      actions={
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" /> عضو جديد
        </Button>
      }
    />
  );
}
