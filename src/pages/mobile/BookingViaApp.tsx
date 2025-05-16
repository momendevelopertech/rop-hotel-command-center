
import React from "react";
import { SubPageLayout } from "@/components/shared/SubPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { DataTable } from "@/components/shared/DataTable";
import { StatusBadge } from "@/components/shared/StatusBadge";

// Booking app activity interface
interface BookingActivity {
  id: number;
  officerName: string;
  officerRank: string;
  action: string;
  timestamp: string;
  device: string;
  details: string;
  status: string;
}

// Mock booking activities
const mockBookingActivities: BookingActivity[] = [
  {
    id: 1,
    officerName: "Omar Al-Farsi",
    officerRank: "Captain",
    action: "Room booking",
    timestamp: "2025-05-15 09:23",
    device: "iPhone",
    details: "Booked room 205 for 3 nights",
    status: "Confirmed"
  },
  {
    id: 2,
    officerName: "Ali Al-Balushi",
    officerRank: "Officer",
    action: "Room booking",
    timestamp: "2025-05-15 10:45",
    device: "Android Tablet",
    details: "Booked room 310 for 2 nights",
    status: "Pending"
  },
  {
    id: 3,
    officerName: "Mohammed Al-Busaidi",
    officerRank: "Command",
    action: "Room booking",
    timestamp: "2025-05-14 14:12",
    device: "Samsung Galaxy",
    details: "Booked room 401 for 1 night",
    status: "Confirmed"
  },
  {
    id: 4,
    officerName: "Saeed Al-Maskari",
    officerRank: "Officer",
    action: "Room booking",
    timestamp: "2025-05-14 16:38",
    device: "iPad",
    details: "Booked room 118 for 4 nights",
    status: "Cancelled"
  },
  {
    id: 5,
    officerName: "Ahmed Al-Harthi",
    officerRank: "Officer",
    action: "Room booking",
    timestamp: "2025-05-13 11:22",
    device: "iPhone",
    details: "Booked room 225 for 2 nights",
    status: "Checked In"
  },
];

// Mock app screens for different languages
const appScreens = {
  booking: {
    en: "https://placeholder.pics/svg/300x600/DEDEDE/555555-DEDEDE/Hotel%20Booking%20Screen%20(EN)",
    ar: "https://placeholder.pics/svg/300x600/DEDEDE/555555-DEDEDE/Hotel%20Booking%20Screen%20(AR)"
  },
  room: {
    en: "https://placeholder.pics/svg/300x600/DEDEDE/555555-DEDEDE/Room%20Selection%20Screen%20(EN)",
    ar: "https://placeholder.pics/svg/300x600/DEDEDE/555555-DEDEDE/Room%20Selection%20Screen%20(AR)"
  },
  confirmation: {
    en: "https://placeholder.pics/svg/300x600/DEDEDE/555555-DEDEDE/Booking%20Confirmation%20Screen%20(EN)",
    ar: "https://placeholder.pics/svg/300x600/DEDEDE/555555-DEDEDE/Booking%20Confirmation%20Screen%20(AR)"
  }
};

export default function BookingViaApp() {
  const { t, language } = useLanguage();
  const [activeScreen, setActiveScreen] = React.useState<string>("booking");
  
  // Table columns
  const columns = [
    { header: "ID", accessor: "id" },
    { header: "Officer", accessor: "officerName" },
    { header: "Rank", accessor: "officerRank" },
    { header: "Action", accessor: "action" },
    { header: "Timestamp", accessor: "timestamp" },
    { header: "Device", accessor: "device" },
    { header: "Details", accessor: "details" },
    { 
      header: "Status", 
      accessor: "status",
      cell: (activity: BookingActivity) => <StatusBadge status={activity.status} />
    }
  ];

  return (
    <SubPageLayout
      title="Booking via App"
      subtitle="Mobile app booking features and activity"
      parentLink="/mobile-app"
      parentTitle="Mobile App"
    >
      {/* App showcase section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* App screen preview */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-lg font-medium mb-4">{t("App Screen Preview")}</h2>
          <div className="flex justify-center">
            <div className="w-[300px] border-8 border-gray-800 rounded-3xl overflow-hidden shadow-lg">
              <AspectRatio ratio={9/16}>
                <img 
                  src={appScreens[activeScreen as keyof typeof appScreens][language]} 
                  alt="Mobile app screen"
                  className="w-full h-full object-cover"
                />
              </AspectRatio>
            </div>
          </div>
          
          <div className="mt-6">
            <Tabs value={activeScreen} onValueChange={setActiveScreen}>
              <TabsList className="w-full">
                <TabsTrigger value="booking" className="flex-1">{t("Booking")}</TabsTrigger>
                <TabsTrigger value="room" className="flex-1">{t("Room Selection")}</TabsTrigger>
                <TabsTrigger value="confirmation" className="flex-1">{t("Confirmation")}</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
        
        {/* Feature descriptions */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>{t("Mobile Booking Features")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-md">
                  <h3 className="font-medium text-lg mb-2">{t("Easy Room Search")}</h3>
                  <p className="text-gray-600">
                    {t("Officers can easily search for available rooms based on date, type, and special requirements.")}
                  </p>
                </div>
                
                <div className="p-4 border rounded-md">
                  <h3 className="font-medium text-lg mb-2">{t("Instant Booking")}</h3>
                  <p className="text-gray-600">
                    {t("Secure and immediate room booking with automatic confirmation.")}
                  </p>
                </div>
                
                <div className="p-4 border rounded-md">
                  <h3 className="font-medium text-lg mb-2">{t("Booking Management")}</h3>
                  <p className="text-gray-600">
                    {t("View, modify or cancel existing bookings with real-time updates.")}
                  </p>
                </div>
                
                <div className="p-4 border rounded-md">
                  <h3 className="font-medium text-lg mb-2">{t("Special Requests")}</h3>
                  <p className="text-gray-600">
                    {t("Officers can add special requests or requirements during the booking process.")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent booking activity */}
      <Card>
        <CardHeader>
          <CardTitle>{t("Recent Booking Activity")}</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={mockBookingActivities}
            columns={columns}
            searchField="officerName"
            showHeader={false}
          />
        </CardContent>
      </Card>
    </SubPageLayout>
  );
}
