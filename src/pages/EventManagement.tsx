
import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { EventsCalendar } from "@/components/events/EventsCalendar";
import { EventsTable } from "@/components/events/EventsTable";
import { EventStats } from "@/components/events/EventStats";
import { PageHeader } from "@/components/shared/PageHeader";
import { useLanguage } from "@/contexts/LanguageContext";

export default function EventManagement() {
  const { t } = useLanguage();
  
  return (
    <AppLayout>
      <PageHeader 
        title={t("Event Management")}
        subtitle={t("Scheduled events and trainings")}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <EventStats />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <EventsCalendar />
        <EventsTable />
      </div>
    </AppLayout>
  );
}
