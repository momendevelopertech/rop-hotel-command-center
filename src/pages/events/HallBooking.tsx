
import React, { useState } from "react";
import { SubPageLayout } from "@/components/shared/SubPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { DataTable, Column } from "@/components/shared/DataTable";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Calendar, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StyledAddButton } from "@/components/shared/StyledAddButton";

interface HallBooking {
  id: number;
  hallName: string;
  eventType: string;
  organizer: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  attendees: number;
  status: string;
  notes?: string;
}

const mockHallBookings: HallBooking[] = [
  {
    id: 101,
    hallName: "Al-Khuwair Grand Hall",
    eventType: "Conference",
    organizer: "Colonel Ali Al-Balushi",
    startDate: "2025-05-20",
    endDate: "2025-05-20",
    startTime: "09:00",
    endTime: "17:00",
    attendees: 120,
    status: "Confirmed",
    notes: "Require projector and sound system"
  },
  {
    id: 102,
    hallName: "Seeb Meeting Room",
    eventType: "Training Session",
    organizer: "Major Mohammed Al-Busaidi",
    startDate: "2025-05-18",
    endDate: "2025-05-19",
    startTime: "10:00",
    endTime: "15:00",
    attendees: 30,
    status: "Pending",
    notes: "Laptops needed for all attendees"
  },
  {
    id: 103,
    hallName: "Muscat Ceremonial Hall",
    eventType: "Award Ceremony",
    organizer: "General Ahmed Al-Harthi",
    startDate: "2025-06-01",
    endDate: "2025-06-01",
    startTime: "18:00",
    endTime: "21:00",
    attendees: 200,
    status: "Confirmed",
    notes: "VIP seating arrangement required"
  },
  {
    id: 104,
    hallName: "Nizwa Conference Room",
    eventType: "Strategy Meeting",
    organizer: "Lt. Colonel Fatma Al-Siyabi",
    startDate: "2025-05-25",
    endDate: "2025-05-25",
    startTime: "09:30",
    endTime: "12:30",
    attendees: 20,
    status: "Confirmed"
  },
  {
    id: 105,
    hallName: "Al-Khuwair Hall B",
    eventType: "Workshop",
    organizer: "Captain Saeed Al-Maskari",
    startDate: "2025-05-22",
    endDate: "2025-05-22",
    startTime: "14:00",
    endTime: "17:00",
    attendees: 50,
    status: "Pending",
    notes: "Breakout rooms required"
  },
  {
    id: 106,
    hallName: "Sohar Hall",
    eventType: "Presentation",
    organizer: "Major Khalid Al-Raisi",
    startDate: "2025-05-16",
    endDate: "2025-05-16",
    startTime: "11:00",
    endTime: "13:00",
    attendees: 80,
    status: "Completed"
  },
  {
    id: 107,
    hallName: "Salalah Meeting Room",
    eventType: "Planning Session",
    organizer: "Captain Omar Al-Farsi",
    startDate: "2025-06-05",
    endDate: "2025-06-05",
    startTime: "10:00",
    endTime: "15:00",
    attendees: 15,
    status: "Confirmed"
  }
];

// Hall stats
const hallStats = {
  totalHalls: 7,
  bookedToday: 2,
  availableToday: 5,
  upcomingEvents: 5
};

export default function HallBooking() {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>("upcoming");
  
  // Helper function to get status type for badge
  const getStatusType = (status: string): string => {
    switch(status) {
      case "Confirmed": return "success";
      case "Pending": return "warning";
      case "Completed": return "info";
      case "Cancelled": return "danger";
      default: return "info";
    }
  };
  
  const columns: Column<HallBooking>[] = [
    { header: "ID", accessor: "id" },
    { header: "Hall", accessor: "hallName" },
    { header: "Event", accessor: "eventType" },
    { header: "Organizer", accessor: "organizer" },
    { header: "Date", accessor: "startDate" },
    { header: "Time", accessor: "startTime" },
    { header: "Attendees", accessor: "attendees" },
    { 
      header: "Status", 
      accessor: "status",
      cell: (booking) => <StatusBadge status={booking.status} type={getStatusType(booking.status)} />
    },
    { 
      header: "Actions", 
      accessor: (booking) => booking.id,
      cell: (booking) => (
        <div className="space-x-2">
          <Button size="sm" variant="outline">
            {t("View")}
          </Button>
          {booking.status !== "Completed" && (
            <Button size="sm" variant="outline" className="bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100">
              {t("Edit")}
            </Button>
          )}
        </div>
      )
    }
  ];
  
  return (
    <SubPageLayout
      title="Hall Booking"
      subtitle="Manage event venue reservations"
      parentLink="/events"
      parentTitle="Event Management"
    >
      {/* Hall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-white shadow-sm">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">{t("Total Event Venues")}</p>
                <p className="text-2xl font-bold">{hallStats.totalHalls}</p>
              </div>
              <div className="p-3 bg-gray-100 rounded-full">
                <Calendar className="h-6 w-6 text-gray-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-sm">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">{t("Booked Today")}</p>
                <p className="text-2xl font-bold">{hallStats.bookedToday}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <Calendar className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-sm">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">{t("Available Today")}</p>
                <p className="text-2xl font-bold">{hallStats.availableToday}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-sm">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">{t("Upcoming Events")}</p>
                <p className="text-2xl font-bold">{hallStats.upcomingEvents}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Hall Booking List */}
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-bold">{t("Hall Bookings")}</h2>
        <StyledAddButton label={t("Book New Hall")} />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="upcoming">{t("Upcoming")}</TabsTrigger>
          <TabsTrigger value="today">{t("Today")}</TabsTrigger>
          <TabsTrigger value="past">{t("Past Events")}</TabsTrigger>
          <TabsTrigger value="all">{t("All Bookings")}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming">
          <DataTable
            data={mockHallBookings.filter(b => 
              (b.status === "Confirmed" || b.status === "Pending") &&
              new Date(b.startDate) > new Date()
            )}
            columns={columns}
            searchField="hallName"
          />
        </TabsContent>
        
        <TabsContent value="today">
          <DataTable
            data={mockHallBookings.filter(b => b.startDate === "2025-05-16")}
            columns={columns}
            searchField="hallName"
          />
        </TabsContent>
        
        <TabsContent value="past">
          <DataTable
            data={mockHallBookings.filter(b => 
              b.status === "Completed" || new Date(b.endDate) < new Date()
            )}
            columns={columns}
            searchField="hallName"
          />
        </TabsContent>
        
        <TabsContent value="all">
          <DataTable
            data={mockHallBookings}
            columns={columns}
            searchField="hallName"
          />
        </TabsContent>
      </Tabs>

      {/* Hall Availability Calendar - Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>{t("Hall Availability")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center">
            <p className="text-gray-500">{t("Hall availability calendar will be displayed here.")}</p>
          </div>
        </CardContent>
      </Card>
    </SubPageLayout>
  );
}
