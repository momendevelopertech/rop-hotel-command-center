
import React from "react";

export interface StatusBadgeProps {
  status: string;
  type?: "success" | "danger" | "warning" | "info" | string;
}

export function StatusBadge({ status, type = "info" }: StatusBadgeProps) {
  const getColorClass = () => {
    switch (type) {
      case "success":
        return "bg-green-100 text-green-700";
      case "danger":
        return "bg-red-100 text-red-700";
      case "warning":
        return "bg-yellow-100 text-yellow-700";
      case "info":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getColorClass()}`}
    >
      {status}
    </span>
  );
}
