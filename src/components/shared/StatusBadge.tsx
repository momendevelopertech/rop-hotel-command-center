
import React from "react";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  variant?: "green" | "red" | "yellow" | "blue" | "purple" | "gray";
}

export function StatusBadge({ status, variant = "gray" }: StatusBadgeProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case "green":
        return "bg-green-100 text-green-800 border-green-200";
      case "red":
        return "bg-red-100 text-red-800 border-red-200";
      case "yellow":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "blue":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "purple":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "gray":
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        getVariantClasses()
      )}
    >
      {status}
    </span>
  );
}
