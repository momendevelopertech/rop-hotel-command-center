
import React, { useEffect, useState } from "react";
import { useData } from "@/contexts/DataContext";
import { DataTable } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Eye, FileEdit, Trash2, Plus } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRopDataService } from "@/utils/ropDataService";

export function DiningOrdersTable() {
  const { diningOrders: originalOrders } = useData();
  const { t } = useLanguage();
  const { translateDiningOrder } = useRopDataService();
  const [translatedOrders, setTranslatedOrders] = useState(originalOrders);

  useEffect(() => {
    setTranslatedOrders(originalOrders.map(order => translateDiningOrder(order)));
  }, [originalOrders, translateDiningOrder]);

  const columns = [
    { 
      header: t("Order Number"), 
      accessor: "id" 
    },
    { 
      header: t("Officer"), 
      accessor: "name" 
    },
    { 
      header: t("Meal"), 
      accessor: "meal" 
    },
    { 
      header: t("Dietary Requirements"), 
      accessor: "dietary" 
    },
    { 
      header: t("Status"), 
      accessor: "status",
      cell: (order: any) => {
        const variant = order.status === t("Completed") 
          ? "green" 
          : order.status === t("Pending") 
            ? "yellow" 
            : "blue";
        return <StatusBadge status={order.status} variant={variant} />;
      }
    },
    { 
      header: t("Time Ordered"), 
      accessor: "timestamp" 
    },
    { 
      header: t("Actions"), 
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
      title={t("Dining Orders")}
      data={translatedOrders}
      columns={columns}
      searchField="name"
      actions={
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" /> {t("Add New")}
        </Button>
      }
    />
  );
}
