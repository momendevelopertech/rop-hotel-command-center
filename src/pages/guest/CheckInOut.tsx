import React, { useState } from "react";
import { SubPageLayout } from "@/components/shared/SubPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable, Column } from "@/components/shared/DataTable";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { useLanguage } from "@/contexts/LanguageContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Calendar, Clock, UserCheck, LogOut } from "lucide-react";

interface GuestCheckStatus {
  id: number;
  bookingId: number;
  officerName: string;
  officerRank: string;
  room: string;
  roomType: string;
  checkInDate: string;
  checkOutDate: string;
  status: string;
  notes?: string;
}

const mockGuestCheckStatus: GuestCheckStatus[] = [
  {
    id: 1,
    bookingId: 1001,
    officerName: "Ali Al-Balushi",
    officerRank: "Officer",
    room: "101",
    roomType: "Standard",
    checkInDate: "2025-05-15",
    checkOutDate: "2025-05-17",
    status: "Expected Today"
  },
  {
    id: 2,
    bookingId: 1002,
    officerName: "Mohammed Al-Busaidi",
    officerRank: "Command",
    room: "205",
    roomType: "Premium",
    checkInDate: "2025-05-15",
    checkOutDate: "2025-05-19",
    status: "Checked In",
    notes: "Extra pillow requested"
  },
  {
    id: 3,
    bookingId: 1003,
    officerName: "Ahmed Al-Harthi",
    officerRank: "Command",
    room: "310",
    roomType: "Suite",
    checkInDate: "2025-05-18",
    checkOutDate: "2025-05-22",
    status: "Expected"
  },
  {
    id: 4,
    bookingId: 1004,
    officerName: "Fatma Al-Siyabi",
    officerRank: "Command",
    room: "402",
    roomType: "Executive Suite",
    checkInDate: "2025-05-14",
    checkOutDate: "2025-05-17",
    status: "Checkout Today"
  },
  {
    id: 5,
    bookingId: 1005,
    officerName: "Saeed Al-Maskari",
    officerRank: "Officer",
    room: "115",
    roomType: "Standard",
    checkInDate: "2025-05-16",
    checkOutDate: "2025-05-18",
    status: "Expected"
  },
  {
    id: 6,
    bookingId: 1006,
    officerName: "Khalid Al-Raisi",
    officerRank: "Officer",
    room: "220",
    roomType: "Premium",
    checkInDate: "2025-05-13",
    checkOutDate: "2025-05-16",
    status: "Checked Out"
  },
  {
    id: 7,
    bookingId: 1007,
    officerName: "Omar Al-Farsi",
    officerRank: "Command",
    room: "330",
    roomType: "Suite",
    checkInDate: "2025-05-12",
    checkOutDate: "2025-05-15",
    status: "Checked Out"
  }
];

// Daily stats
const checkStats = {
  expectedArrivals: 3,
  expectedDepartures: 2,
  currentlyOccupied: 2,
  checkInsToday: 1,
  checkOutsToday: 1
};

export default function CheckInOut() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>("arrivals");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<GuestCheckStatus[]>([]);
  
  const handleSearch = () => {
    if (!searchQuery) return;
    
    const results = mockGuestCheckStatus.filter(guest => 
      guest.officerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guest.bookingId.toString().includes(searchQuery) ||
      guest.room.includes(searchQuery)
    );
    
    setSearchResults(results);
  };
  
  // Define columns for the tables
  const columns: Column<GuestCheckStatus>[] = [
    { header: "ID", accessor: "bookingId" },
    { header: "Officer", accessor: "officerName" },
    { header: "Rank", accessor: "officerRank" },
    { header: "Room", accessor: "room" },
    { header: "Room Type", accessor: "roomType" },
    { header: "Check-in Date", accessor: "checkInDate" },
    { header: "Check-out Date", accessor: "checkOutDate" },
    { 
      header: "Status", 
      accessor: "status",
      cell: (guest: GuestCheckStatus) => {
        const statusType = 
          guest.status === "Checked In" ? "success" : 
          guest.status === "Checked Out" ? "info" : 
          guest.status === "Expected Today" ? "warning" : 
          guest.status === "Checkout Today" ? "warning" : "info";
          
        return <StatusBadge status={guest.status} type={statusType} />;
      }
    },
    { 
      header: "Actions", 
      accessor: (guest: GuestCheckStatus) => guest.id,
      cell: (guest: GuestCheckStatus) => {
        if (guest.status === "Expected" || guest.status === "Expected Today") {
          return (
            <Button variant="default" size="sm" className="bg-green-600 hover:bg-green-700">
              <UserCheck className="mr-1 h-4 w-4" /> {t("Check In")}
            </Button>
          );
        } else if (guest.status === "Checked In" || guest.status === "Checkout Today") {
          return (
            <Button variant="default" size="sm" className="bg-blue-600 hover:bg-blue-700">
              <LogOut className="mr-1 h-4 w-4" /> {t("Check Out")}
            </Button>
          );
        } else {
          return (
            <Button variant="outline" size="sm">
              {t("View Details")}
            </Button>
          );
        }
      }
    }
  ];

  return (
    <SubPageLayout
      title="Check-in / Check-out"
      subtitle="Process guest arrivals and departures"
      parentLink="/guest-management"
      parentTitle="Guest Management"
    >
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        <Card className="bg-white">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">{t("Expected Arrivals")}</p>
                <p className="text-2xl font-bold">{checkStats.expectedArrivals}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <UserCheck className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">{t("Expected Departures")}</p>
                <p className="text-2xl font-bold">{checkStats.expectedDepartures}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <LogOut className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">{t("Currently Occupied")}</p>
                <p className="text-2xl font-bold">{checkStats.currentlyOccupied}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">{t("Check-ins Today")}</p>
                <p className="text-2xl font-bold">{checkStats.checkInsToday}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">{t("Check-outs Today")}</p>
                <p className="text-2xl font-bold">{checkStats.checkOutsToday}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Quick search */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{t("Quick Check-in / Check-out")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input 
                placeholder={t("Search by name, booking ID, or room number...")}
                className="pl-8" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <Button onClick={handleSearch}>{t("Search")}</Button>
          </div>
          
          {searchResults.length > 0 && (
            <div className="mt-4">
              <h3 className="font-medium mb-2">{t("Search Results")}:</h3>
              <DataTable
                data={searchResults}
                columns={columns}
                pageSize={5}
                showHeader={false}
              />
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Main tabs */}
      <Card>
        <CardHeader className="pb-0">
          <CardTitle>{t("Check-in / Check-out Management")}</CardTitle>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="arrivals">{t("Today's Arrivals")}</TabsTrigger>
              <TabsTrigger value="departures">{t("Today's Departures")}</TabsTrigger>
              <TabsTrigger value="stayed">{t("Currently Staying")}</TabsTrigger>
              <TabsTrigger value="history">{t("Recent History")}</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs value={activeTab}>
            <TabsContent value="arrivals">
              <DataTable
                data={mockGuestCheckStatus.filter(guest => 
                  guest.status === "Expected Today" || guest.checkInDate === "2025-05-15"
                )}
                columns={columns}
                showHeader={false}
              />
            </TabsContent>
            
            <TabsContent value="departures">
              <DataTable
                data={mockGuestCheckStatus.filter(guest => 
                  guest.status === "Checkout Today" || guest.checkOutDate === "2025-05-15"
                )}
                columns={columns}
                showHeader={false}
              />
            </TabsContent>
            
            <TabsContent value="stayed">
              <DataTable
                data={mockGuestCheckStatus.filter(guest => guest.status === "Checked In")}
                columns={columns}
                showHeader={false}
              />
            </TabsContent>
            
            <TabsContent value="history">
              <DataTable
                data={mockGuestCheckStatus.filter(guest => guest.status === "Checked Out")}
                columns={columns}
                showHeader={false}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </SubPageLayout>
  );
}
