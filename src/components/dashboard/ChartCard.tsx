
import React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  actions?: React.ReactNode;
}

export function ChartCard({ title, children, className, actions }: ChartCardProps) {
  return (
    <Card className={cn("p-5", className)}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-gray-700">{title}</h3>
        {actions && <div>{actions}</div>}
      </div>
      <div className="w-full h-[240px]">
        {children}
      </div>
    </Card>
  );
}
