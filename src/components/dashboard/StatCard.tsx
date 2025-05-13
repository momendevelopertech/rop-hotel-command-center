
import React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isUpward: boolean;
  };
  description?: string;
  className?: string;
  onClick?: () => void;
}

export function StatCard({ 
  title, 
  value, 
  icon, 
  trend, 
  description,
  className, 
  onClick 
}: StatCardProps) {
  return (
    <Card 
      className={cn(
        "p-6 flex flex-col space-y-4 transition-all duration-300 hover:shadow-lg", 
        onClick ? "cursor-pointer" : "",
        className
      )}
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          
          {trend && (
            <div className="flex items-center mt-2">
              {trend.isUpward ? (
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              )}
              <span className={cn(
                "text-xs ml-1", 
                trend.isUpward ? "text-green-500" : "text-red-500"
              )}>
                {trend.value}%
              </span>
            </div>
          )}
          
          {description && (
            <p className="text-xs text-gray-500 mt-2 line-clamp-2">{description}</p>
          )}
        </div>
        
        <div className="p-3 rounded-full bg-rop-blue bg-opacity-10 text-rop-blue">
          {icon}
        </div>
      </div>
    </Card>
  );
}
