
import React, { useState } from "react";
import { SubPageLayout } from "@/components/shared/SubPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { TableReservationsTable } from "@/components/dining/TableReservationsTable";
import { TableReservationsStats } from "@/components/dining/TableReservationsStats";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { StyledAddButton } from "@/components/shared/StyledAddButton";
import { Calendar, Search, Filter } from "lucide-react";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

export default function TableReservations() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [date, setDate] = useState<Date>(new Date());
  
  return (
    <SubPageLayout
      title={t("Table Reservations")}
      subtitle={t("Manage dining area bookings and reservations")}
      parentLink="/dining"
      parentTitle={t("Dining & Catering")}
    >
      <div className="mb-6">
        <TableReservationsStats />
      </div>
      
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              placeholder={t("Search reservations...")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full sm:w-[200px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>{t("Pick a date")}</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={(date) => date && setDate(date)}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Filter size={16} />
            {t("Filter")}
          </Button>
          
          <StyledAddButton label={t("Add Reservation")} />
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>{t("Reservations")}</CardTitle>
        </CardHeader>
        <CardContent>
          <TableReservationsTable />
        </CardContent>
      </Card>
    </SubPageLayout>
  );
}
