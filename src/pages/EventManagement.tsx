
import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { EventsTable } from "@/components/events/EventsTable";
import { EventStats } from "@/components/events/EventStats";
import { EventsCalendar } from "@/components/events/EventsCalendar";
import { PageHeader } from "@/components/shared/PageHeader";
import { useLanguage } from "@/contexts/LanguageContext";
import { useData } from "@/contexts/DataContext";

export default function EventManagement() {
  const { t, language } = useLanguage();
  const { events } = useData();
  
  // Sample additional demo events based on the requested data
  const demoEvents = [
    {
      id: events.length + 1,
      name: language === "ar" ? "حفل زفاف" : "Wedding Ceremony",
      date: "2025-06-05",
      time: "5:00 PM",
      location: language === "ar" ? "القاعة أ" : "Hall A",
      attendees: 150,
      status: language === "ar" ? "مؤكد" : "Confirmed",
      organizer: language === "ar" ? "النقيب أحمد" : "Capt. Ahmed"
    },
    {
      id: events.length + 2,
      name: language === "ar" ? "جلسة تدريبية" : "Training Session",
      date: "2025-06-10",
      time: "10:00 AM",
      location: language === "ar" ? "غرفة الاجتماعات" : "Conference Rm",
      attendees: 30,
      status: language === "ar" ? "قيد الانتظار" : "Pending",
      organizer: language === "ar" ? "قسم الموارد البشرية" : "HR Department"
    }
  ];
  
  // Combine original events with demo events
  const combinedEvents = [...events, ...demoEvents];
  
  // Transform events to match EventsTable expected format
  const formattedEvents = combinedEvents.map((event) => ({
    id: event.id,
    title: event.name,
    type: Math.random() > 0.5 ? t("Official") : t("Private"),
    date: event.date,
    time: event.time || `${10 + (event.id % 10)}:00 ${event.id % 2 === 0 ? 'AM' : 'PM'}`,
    location: event.location,
    attendees: event.attendees,
    status: event.status,
    organizer: event.organizer || `Org-${event.id % 10}`
  }));
  
  return (
    <AppLayout>
      <PageHeader 
        title={t("Event Management")} 
        subtitle={t("Organize and manage base events and facilities")}
      />
      
      {/* Event statistics cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <EventStats />
      </div>
      
      {/* Events table - fixed to use full width */}
      <div className="grid grid-cols-1 gap-6 mb-6">
        <EventsTable data={formattedEvents} />
      </div>
      
      {/* Event calendar */}
      <div className="grid grid-cols-1 gap-6">
        <EventsCalendar />
      </div>
    </AppLayout>
  );
}
