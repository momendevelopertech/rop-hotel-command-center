
import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { EventsTable } from "@/components/events/EventsTable";
import { EventStats } from "@/components/events/EventStats";
import { EventsCalendar } from "@/components/events/EventsCalendar";
import { PageHeader } from "@/components/shared/PageHeader";
import { useLanguage } from "@/contexts/LanguageContext";
import { useData } from "@/contexts/DataContext";

export default function EventManagement() {
  const { t } = useLanguage();
  const { events } = useData();
  
  // Transform events to match EventsTable expected format
  const formattedEvents = events.map((event) => ({
    id: event.id,
    title: event.name,
    type: Math.random() > 0.5 ? t("Official") : t("Private"),
    date: event.date,
    time: `${10 + (event.id % 10)}:00 ${event.id % 2 === 0 ? 'AM' : 'PM'}`,
    location: event.location,
    attendees: event.attendees,
    status: event.status,
    organizer: `Org-${event.id % 10}`
  }));
  
  return (
    <AppLayout>
      <PageHeader 
        title={t("Event Management")} 
        subtitle={t("Organize and manage base events and facilities")}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <EventStats />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <EventsTable data={formattedEvents} />
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <EventsCalendar />
      </div>
    </AppLayout>
  );
}
