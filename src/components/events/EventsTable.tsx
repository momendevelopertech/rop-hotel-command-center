
import React from "react";
import { useData } from "@/contexts/DataContext";
import { DataTable } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Plus, Eye, FileEdit, Trash2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRopDataService } from "@/utils/ropDataService";
import { useEffect, useState } from "react";

export function EventsTable() {
  const { events: originalEvents } = useData();
  const { t } = useLanguage();
  const { translateEvent } = useRopDataService();
  const [translatedEvents, setTranslatedEvents] = useState(originalEvents);

  useEffect(() => {
    setTranslatedEvents(originalEvents.map(event => translateEvent(event)));
  }, [originalEvents, translateEvent]);

  const columns = [
    { 
      header: t("Event Name"), 
      accessor: "name" 
    },
    { 
      header: t("Date"), 
      accessor: "date" 
    },
    { 
      header: t("Attendees"), 
      accessor: "attendees" 
    },
    { 
      header: t("Location"), 
      accessor: "location" 
    },
    { 
      header: t("Status"), 
      accessor: "status",
      cell: (event: any) => {
        const variant = event.status === t("Completed") 
          ? "green" 
          : event.status === t("Upcoming") 
            ? "blue" 
            : "yellow";
        return <StatusBadge status={event.status} variant={variant} />;
      }
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
      title={t("Upcoming Events")}
      data={translatedEvents}
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
