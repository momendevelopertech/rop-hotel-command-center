
import React from "react";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  variant?: "default" | "blue" | "green" | "red" | "yellow" | "purple";
  className?: string;
}

export function StatusBadge({ 
  status, 
  variant = "default",
  className 
}: StatusBadgeProps) {
  const variantClasses = {
    default: "bg-gray-100 text-gray-800",
    blue: "bg-blue-100 text-blue-800",
    green: "bg-green-100 text-green-800",
    red: "bg-red-100 text-red-800",
    yellow: "bg-yellow-100 text-yellow-800",
    purple: "bg-purple-100 text-purple-800",
  };
  
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        variantClasses[variant],
        className
      )}
    >
      {status}
    </span>
  );
}
