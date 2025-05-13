
import React from "react";
import { useData } from "@/contexts/DataContext";
import { DataTable } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { Eye, Smartphone } from "lucide-react";

interface MobileInteractionsTableProps {
  onSelectScreen: (screen: string) => void;
}

export function MobileInteractionsTable({ onSelectScreen }: MobileInteractionsTableProps) {
  const { mobileInteractions } = useData();

  const columns = [
    { 
      header: "الضابط", 
      accessor: "officer" 
    },
    { 
      header: "الإجراء", 
      accessor: "action" 
    },
    { 
      header: "الوقت", 
      accessor: "timestamp" 
    },
    { 
      header: "الجهاز", 
      accessor: "device" 
    },
    { 
      header: "معاينة", 
      accessor: "action",
      cell: (item: any) => {
        // تحويل نوع الإجراء إلى اسم الشاشة المناسبة
        const getScreenName = (action: string) => {
          if (action.includes("book") || action.includes("room")) return "rooms";
          if (action.includes("food") || action.includes("order") || action.includes("menu")) return "dining";
          if (action.includes("event")) return "events";
          if (action.includes("profile")) return "profile";
          return "home";
        };
        
        const screenName = getScreenName(item.action.toLowerCase());
        
        return (
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onSelectScreen(screenName)}
          >
            <Eye className="mr-1 h-4 w-4" />
            معاينة
          </Button>
        );
      }
    }
  ];

  return (
    <DataTable
      title="تفاعلات المستخدمين"
      data={mobileInteractions}
      columns={columns}
      searchField="officer"
      actions={
        <Button size="sm" onClick={() => onSelectScreen("home")}>
          <Smartphone className="mr-2 h-4 w-4" /> عرض التطبيق
        </Button>
      }
    />
  );
}
