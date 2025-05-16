
// Find where it uses StatusBadge and replace variant with type
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { useLanguage } from "@/contexts/LanguageContext";

interface Event {
  id: number;
  title: string;
  type: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  status: string;
  organizer: string;
}

interface EventsTableProps {
  data: Event[];
}

export function EventsTable({ data }: EventsTableProps) {
  const { t } = useLanguage();

  const getStatusType = (status: string) => {
    switch (status.toLowerCase()) {
      case "upcoming":
        return "info";
      case "in progress":
        return "warning";
      case "completed":
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
            <TableHead className="w-[80px]">{t("ID")}</TableHead>
            <TableHead>{t("Event")}</TableHead>
            <TableHead>{t("Date")}</TableHead>
            <TableHead>{t("Location")}</TableHead>
            <TableHead>{t("Status")}</TableHead>
            <TableHead className="text-right">{t("Actions")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((event) => (
            <TableRow key={event.id}>
              <TableCell className="font-medium">{event.id}</TableCell>
              <TableCell>
                <div>
                  <p className="font-medium">{event.title}</p>
                  <p className="text-sm text-gray-500">{event.type}</p>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <p>{event.date}</p>
                  <p className="text-sm text-gray-500">{event.time}</p>
                </div>
              </TableCell>
              <TableCell>{event.location}</TableCell>
              <TableCell>
                <StatusBadge status={event.status} type={getStatusType(event.status)} />
              </TableCell>
              <TableCell className="text-right">
                <Button size="sm" variant="outline">
                  {t("Details")}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
