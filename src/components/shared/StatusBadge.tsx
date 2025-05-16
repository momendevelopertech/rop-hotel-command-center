
import React from "react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

type StatusType = 'success' | 'warning' | 'danger' | 'info' | 'pending';

interface StatusBadgeProps {
  status: string;
  type?: StatusType;
  className?: string;
}

export function StatusBadge({ status, type, className }: StatusBadgeProps) {
  const { t } = useLanguage();
  
  const getStatusType = (): StatusType => {
    if (type) return type;
    
    const statusLower = status.toLowerCase();
    
    if (
      statusLower.includes('confirmed') || 
      statusLower.includes('completed') || 
      statusLower.includes('active') ||
      statusLower.includes('paid') ||
      statusLower.includes('delivered') ||
      statusLower.includes('approved')
    ) {
      return 'success';
    }
    
    if (
      statusLower.includes('pending') || 
      statusLower.includes('waiting') || 
      statusLower.includes('processing') ||
      statusLower.includes('placed')
    ) {
      return 'pending';
    }
    
    if (
      statusLower.includes('warning') || 
      statusLower.includes('preparing') || 
      statusLower.includes('low') ||
      statusLower.includes('renewal')
    ) {
      return 'warning';
    }
    
    if (
      statusLower.includes('cancelled') || 
      statusLower.includes('expired') || 
      statusLower.includes('error') ||
      statusLower.includes('rejected') ||
      statusLower.includes('failed')
    ) {
      return 'danger';
    }
    
    return 'info';
  };
  
  const statusType = getStatusType();
  
  const statusClasses = {
    success: "bg-green-100 text-green-800 border-green-200",
    warning: "bg-yellow-100 text-yellow-800 border-yellow-200",
    danger: "bg-red-100 text-red-800 border-red-200",
    info: "bg-blue-100 text-blue-800 border-blue-200",
    pending: "bg-purple-100 text-purple-800 border-purple-200"
  };

  return (
    <span className={cn(
      "px-2.5 py-0.5 text-xs font-medium rounded-full border",
      statusClasses[statusType],
      className
    )}>
      {t(status)}
    </span>
  );
}
