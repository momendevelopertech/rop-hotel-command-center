
// Find where it uses StatusBadge and replace variant with type
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface DiningOrder {
  id: number;
  tableNumber: string;
  server: string;
  items: number;
  total: number;
  time: string;
  status: string;
}

interface DiningOrdersTableProps {
  data: DiningOrder[];
}

export function DiningOrdersTable({ data }: DiningOrdersTableProps) {
  const { t } = useLanguage();
  const [orders, setOrders] = useState<DiningOrder[]>(data);

  const handleAction = (id: number, newStatus: string) => {
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  const getStatusType = (status: string) => {
    switch (status.toLowerCase()) {
      case "new":
        return "info";
      case "preparing":
        return "warning";
      case "ready":
        return "success";
      case "delivered":
        return "success";
      case "cancelled":
        return "danger";
      default:
        return "info";
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t("Order ID")}</TableHead>
            <TableHead>{t("Table")}</TableHead>
            <TableHead>{t("Server")}</TableHead>
            <TableHead>{t("Items")}</TableHead>
            <TableHead>{t("Total")}</TableHead>
            <TableHead>{t("Time")}</TableHead>
            <TableHead>{t("Status")}</TableHead>
            <TableHead className="text-right">{t("Actions")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell>{order.tableNumber}</TableCell>
              <TableCell>{order.server}</TableCell>
              <TableCell>{order.items}</TableCell>
              <TableCell>{order.total.toFixed(2)} OMR</TableCell>
              <TableCell>{order.time}</TableCell>
              <TableCell>
                <StatusBadge status={order.status} type={getStatusType(order.status)} />
              </TableCell>
              <TableCell className="text-right space-x-1">
                {order.status === "New" && (
                  <Button
                    size="sm"
                    onClick={() => handleAction(order.id, "Preparing")}
                  >
                    {t("Accept")}
                  </Button>
                )}
                {order.status === "Preparing" && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-green-50 text-green-600 border-green-200 hover:bg-green-100"
                    onClick={() => handleAction(order.id, "Ready")}
                  >
                    {t("Mark Ready")}
                  </Button>
                )}
                {order.status === "Ready" && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleAction(order.id, "Delivered")}
                  >
                    {t("Deliver")}
                  </Button>
                )}
                {(order.status === "New" || order.status === "Preparing") && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
                    onClick={() => handleAction(order.id, "Cancelled")}
                  >
                    {t("Cancel")}
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
