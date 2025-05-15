
import React, { useEffect, useState } from "react";
import { useData } from "@/contexts/DataContext";
import { DataTable } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { Eye, Smartphone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRopDataService } from "@/utils/ropDataService";

interface MobileInteractionsTableProps {
  onSelectScreen: (screen: string) => void;
}

export function MobileInteractionsTable({ onSelectScreen }: MobileInteractionsTableProps) {
  const { mobileInteractions: originalInteractions } = useData();
  const { t } = useLanguage();
  const { translateMobileInteraction } = useRopDataService();
  const [translatedInteractions, setTranslatedInteractions] = useState(originalInteractions);

  useEffect(() => {
    setTranslatedInteractions(originalInteractions.map(interaction => translateMobileInteraction(interaction)));
  }, [originalInteractions, translateMobileInteraction]);

  const columns = [
    { 
      header: t("Officer"), 
      accessor: "officer" 
    },
    { 
      header: t("Action"), 
      accessor: "action" 
    },
    { 
      header: t("Time"), 
      accessor: "timestamp" 
    },
    { 
      header: t("Device"), 
      accessor: "device" 
    },
    { 
      header: t("Preview"), 
      accessor: "action",
      cell: (item: any) => {
        // Match action type to appropriate screen name
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
            {t("View")}
          </Button>
        );
      }
    }
  ];

  return (
    <DataTable
      title={t("User Interactions")}
      data={translatedInteractions}
      columns={columns}
      searchField="officer"
      actions={
        <Button size="sm" onClick={() => onSelectScreen("home")}>
          <Smartphone className="mr-2 h-4 w-4" /> {t("App Preview")}
        </Button>
      }
    />
  );
}
