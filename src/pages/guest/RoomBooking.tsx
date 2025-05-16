import React, { useState, useEffect } from "react";
import { SubPageLayout } from "@/components/shared/SubPageLayout";
import { DataTable, Column } from "@/components/shared/DataTable";
import { useLanguage } from "@/contexts/LanguageContext";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { StyledAddButton } from "@/components/shared/StyledAddButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "lucide-react";

// Define the room booking type
interface RoomBooking {
  id: number;
  roomNumber: string;
  roomType: string;
  officerName: string;
  officerRank: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  status: string;
  specialRequests?: string;
}

// Mock data for room bookings
const mockRoomBookings: RoomBooking[] = [
  {
    id: 1001,
    roomNumber: "101",
    roomType: "Standard",
    officerName: "Ali Al-Balushi",
    officerRank: "Officer",
    checkIn: "2025-05-15",
    checkOut: "2025-05-17",
    nights: 2,
    status: "Confirmed",
    specialRequests: "Ground floor room"
  },
  {
    id: 1002,
    roomNumber: "205",
    roomType: "Premium",
    officerName: "Mohammed Al-Busaidi",
    officerRank: "Command",
    checkIn: "2025-05-16",
    checkOut: "2025-05-19",
    nights: 3,
    status: "Checked In"
  },
  {
    id: 1003,
    roomNumber: "310",
    roomType: "Suite",
    officerName: "Ahmed Al-Harthi",
    officerRank: "Command",
    checkIn: "2025-05-18",
    checkOut: "2025-05-22",
    nights: 4,
    status: "Pending"
  },
  {
    id: 1004,
    roomNumber: "402",
    roomType: "Executive Suite",
    officerName: "Fatma Al-Siyabi",
    officerRank: "Command",
    checkIn: "2025-05-20",
    checkOut: "2025-05-25",
    nights: 5,
    status: "Cancelled"
  },
  {
    id: 1005,
    roomNumber: "115",
    roomType: "Standard",
    officerName: "Saeed Al-Maskari",
    officerRank: "Officer",
    checkIn: "2025-05-17",
    checkOut: "2025-05-18",
    nights: 1,
    status: "Confirmed"
  },
  {
    id: 1006,
    roomNumber: "220",
    roomType: "Premium",
    officerName: "Khalid Al-Raisi",
    officerRank: "Officer",
    checkIn: "2025-05-19",
    checkOut: "2025-05-21",
    nights: 2,
    status: "Confirmed"
  },
  {
    id: 1007,
    roomNumber: "330",
    roomType: "Suite",
    officerName: "Omar Al-Farsi",
    officerRank: "Command",
    checkIn: "2025-05-22",
    checkOut: "2025-05-24",
    nights: 2,
    status: "Pending"
  },
  {
    id: 1008,
    roomNumber: "410",
    roomType: "Executive Suite",
    officerName: "Abdullah Al-Habsi",
    officerRank: "Command",
    checkIn: "2025-05-25",
    checkOut: "2025-05-30",
    nights: 5,
    status: "Confirmed",
    specialRequests: "Accessible room required"
  }
];

// Stats data
interface RoomStats {
  totalRooms: number;
  occupiedRooms: number;
  availableRooms: number;
  bookedForToday: number;
}

const roomStats: RoomStats = {
  totalRooms: 50,
  occupiedRooms: 32,
  availableRooms: 18,
  bookedForToday: 8
};

export default function RoomBooking() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>("upcoming");
  const [bookings, setBookings] = useState<RoomBooking[]>(mockRoomBookings);

  useEffect(() => {
    // Translate names, rank, room type when language changes
    // In a real app, this would connect to the API
  }, []);

  const columns: Column<RoomBooking>[] = [
    { header: "ID", accessor: "id" },
    { header: "Room", accessor: "roomNumber" },
    { header: "Room Type", accessor: "roomType" },
    { header: "Officer", accessor: "officerName" },
    { header: "Rank", accessor: "officerRank" },
    { header: "Check In", accessor: "checkIn" },
    { header: "Check Out", accessor: "checkOut" },
    { header: "Nights", accessor: "nights" },
    { 
      header: "Status", 
      accessor: "status",
      cell: (booking) => <StatusBadge status={booking.status} />
    },
    { 
      header: "Actions", 
      accessor: (booking) => booking.id,
      cell: (booking) => (
        <div className="space-x-2 flex">
          <button className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
            {t("View")}
          </button>
          <button className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200">
            {t("Edit")}
          </button>
        </div>
      )
    }
  ];

  return (
    <SubPageLayout
      title="Room Booking"
      subtitle="Manage room reservations for officers"
      parentLink="/guest-management"
      parentTitle="Guest Management"
    >
      {/* Room Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-white shadow-sm">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">{t("Total Rooms")}</p>
                <p className="text-2xl font-bold">{roomStats.totalRooms}</p>
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
                <p className="text-sm text-gray-500">{t("Occupied Rooms")}</p>
                <p className="text-2xl font-bold">{roomStats.occupiedRooms}</p>
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
                <p className="text-sm text-gray-500">{t("Available Rooms")}</p>
                <p className="text-2xl font-bold">{roomStats.availableRooms}</p>
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
                <p className="text-sm text-gray-500">{t("Booked For Today")}</p>
                <p className="text-2xl font-bold">{roomStats.bookedForToday}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <Calendar className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Room Booking List */}
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-bold">{t("Room Bookings")}</h2>
        <StyledAddButton label="Add New Booking" />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="upcoming">{t("Upcoming")}</TabsTrigger>
          <TabsTrigger value="current">{t("Current Stays")}</TabsTrigger>
          <TabsTrigger value="past">{t("Past Stays")}</TabsTrigger>
          <TabsTrigger value="cancelled">{t("Cancelled")}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming">
          <DataTable
            data={bookings.filter(b => b.status === "Confirmed" || b.status === "Pending")}
            columns={columns}
            searchField="officerName"
            showHeader={false}
          />
        </TabsContent>
        
        <TabsContent value="current">
          <DataTable
            data={bookings.filter(b => b.status === "Checked In")}
            columns={columns}
            searchField="officerName"
            showHeader={false}
          />
        </TabsContent>
        
        <TabsContent value="past">
          <DataTable
            data={bookings.filter(b => b.status === "Checked Out")}
            columns={columns}
            searchField="officerName"
            showHeader={false}
          />
        </TabsContent>
        
        <TabsContent value="cancelled">
          <DataTable
            data={bookings.filter(b => b.status === "Cancelled")}
            columns={columns}
            searchField="officerName"
            showHeader={false}
          />
        </TabsContent>
      </Tabs>

      {/* Room Availability Chart */}
      <Card>
        <CardHeader>
          <CardTitle>{t("Room Availability")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center">
            <p className="text-gray-500">{t("Room availability chart will be displayed here.")}</p>
          </div>
        </CardContent>
      </Card>
    </SubPageLayout>
  );
}
