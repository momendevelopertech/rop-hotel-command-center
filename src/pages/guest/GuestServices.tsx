
import React, { useState } from "react";
import { SubPageLayout } from "@/components/shared/SubPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { DataTable, Column } from "@/components/shared/DataTable";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, ClipboardList, CheckCircle } from "lucide-react";

interface GuestService {
  id: number;
  roomNumber: string;
  guestName: string;
  serviceType: string;
  requestDate: string;
  requestTime: string;
  status: string;
  assignedStaff?: string;
  notes?: string;
  completionTime?: string;
}

const mockServices: GuestService[] = [
  {
    id: 1,
    roomNumber: "101",
    guestName: "Ali Al-Balushi",
    serviceType: "Room Cleaning",
    requestDate: "2025-05-15",
    requestTime: "09:30",
    status: "Completed",
    assignedStaff: "Fatima K.",
    notes: "Extra towels requested",
    completionTime: "10:45"
  },
  {
    id: 2,
    roomNumber: "205",
    guestName: "Mohammed Al-Busaidi",
    serviceType: "Room Service - Breakfast",
    requestDate: "2025-05-15",
    requestTime: "07:15",
    status: "In Progress",
    assignedStaff: "Ahmed R."
  },
  {
    id: 3,
    roomNumber: "310",
    guestName: "Ahmed Al-Harthi",
    serviceType: "Technical Support - TV",
    requestDate: "2025-05-15",
    requestTime: "14:00",
    status: "Pending",
    notes: "TV remote not working"
  },
  {
    id: 4,
    roomNumber: "402",
    guestName: "Fatma Al-Siyabi",
    serviceType: "Laundry Service",
    requestDate: "2025-05-14",
    requestTime: "16:45",
    status: "Completed",
    assignedStaff: "Khalid M.",
    completionTime: "09:30"
  },
  {
    id: 5,
    roomNumber: "115",
    guestName: "Saeed Al-Maskari",
    serviceType: "Extra Pillows",
    requestDate: "2025-05-15",
    requestTime: "20:30",
    status: "Pending"
  },
  {
    id: 6,
    roomNumber: "220",
    guestName: "Khalid Al-Raisi",
    serviceType: "Room Service - Dinner",
    requestDate: "2025-05-15",
    requestTime: "19:15",
    status: "In Progress",
    assignedStaff: "Laila S."
  },
  {
    id: 7,
    roomNumber: "330",
    guestName: "Omar Al-Farsi",
    serviceType: "Wake-up Call",
    requestDate: "2025-05-16",
    requestTime: "05:00",
    status: "Scheduled"
  }
];

// Service type categories
const serviceCategories = [
  { id: "all", name: "All Services", count: 7 },
  { id: "room", name: "Room Services", count: 3 },
  { id: "cleaning", name: "Cleaning", count: 1 },
  { id: "technical", name: "Technical Support", count: 1 },
  { id: "laundry", name: "Laundry", count: 1 },
  { id: "other", name: "Other", count: 1 }
];

export default function GuestServices() {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>("pending");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  // Helper function to get status type for badge
  const getStatusType = (status: string): string => {
    switch(status) {
      case "Completed": return "success";
      case "In Progress": return "warning";
      case "Pending": return "info";
      case "Scheduled": return "info";
      default: return "info";
    }
  };
  
  const columns: Column<GuestService>[] = [
    { header: "ID", accessor: "id" },
    { header: "Room", accessor: "roomNumber" },
    { header: "Guest", accessor: "guestName" },
    { header: "Service", accessor: "serviceType" },
    { header: "Date", accessor: "requestDate" },
    { header: "Time", accessor: "requestTime" },
    { 
      header: "Status", 
      accessor: "status",
      cell: (service) => <StatusBadge status={service.status} type={getStatusType(service.status)} />
    },
    { header: "Staff", accessor: "assignedStaff" },
    { 
      header: "Actions", 
      accessor: (service) => service.id,
      cell: (service) => {
        if (service.status === "Pending") {
          return (
            <div className="flex space-x-2">
              <Button size="sm" variant="default">
                {t("Assign")}
              </Button>
            </div>
          );
        } else if (service.status === "In Progress") {
          return (
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" className="bg-green-50 text-green-600 border-green-200 hover:bg-green-100">
                <CheckCircle className="mr-1 h-4 w-4" /> {t("Mark Complete")}
              </Button>
            </div>
          );
        } else {
          return (
            <Button size="sm" variant="ghost">
              {t("View Details")}
            </Button>
          );
        }
      }
    }
  ];
  
  // Filter services based on active tab
  const filteredServices = mockServices.filter(service => {
    if (activeTab === "pending") return service.status === "Pending";
    if (activeTab === "in-progress") return service.status === "In Progress";
    if (activeTab === "completed") return service.status === "Completed";
    if (activeTab === "scheduled") return service.status === "Scheduled";
    return true;
  }).filter(service => {
    if (selectedCategory === "all") return true;
    if (selectedCategory === "room") return service.serviceType.includes("Room Service");
    if (selectedCategory === "cleaning") return service.serviceType.includes("Cleaning");
    if (selectedCategory === "technical") return service.serviceType.includes("Technical");
    if (selectedCategory === "laundry") return service.serviceType.includes("Laundry");
    return selectedCategory === "other";
  });
  
  return (
    <SubPageLayout
      title="Guest Services"
      subtitle="Manage guest service requests and amenities"
      parentLink="/guest-management"
      parentTitle="Guest Management"
    >
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{t("Pending Requests")}</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Bell className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{t("In Progress")}</p>
                <p className="text-2xl font-bold">2</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <ClipboardList className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{t("Completed Today")}</p>
                <p className="text-2xl font-bold">2</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Service Categories */}
      <div className="flex flex-wrap gap-2 mb-6">
        {serviceCategories.map(category => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category.id)}
            className={selectedCategory === category.id ? "" : "bg-white"}
          >
            {t(category.name)} ({category.count})
          </Button>
        ))}
      </div>
      
      {/* Main Content */}
      <Card>
        <CardHeader className="pb-0">
          <CardTitle>{t("Service Requests")}</CardTitle>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
            <TabsList>
              <TabsTrigger value="all">{t("All")}</TabsTrigger>
              <TabsTrigger value="pending">{t("Pending")}</TabsTrigger>
              <TabsTrigger value="in-progress">{t("In Progress")}</TabsTrigger>
              <TabsTrigger value="scheduled">{t("Scheduled")}</TabsTrigger>
              <TabsTrigger value="completed">{t("Completed")}</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent className="pt-6">
          {/* Wrap all TabsContent elements in a Tabs component with the same value as the parent Tabs */}
          <Tabs value={activeTab}>
            <TabsContent value="all" className="mt-0">
              <DataTable
                data={filteredServices}
                columns={columns}
                searchField="guestName"
                actions={
                  <Button variant="default">{t("New Service Request")}</Button>
                }
              />
            </TabsContent>
            
            <TabsContent value="pending" className="mt-0">
              <DataTable
                data={filteredServices}
                columns={columns}
                searchField="guestName"
                actions={
                  <Button variant="default">{t("New Service Request")}</Button>
                }
              />
            </TabsContent>
            
            <TabsContent value="in-progress" className="mt-0">
              <DataTable
                data={filteredServices}
                columns={columns}
                searchField="guestName"
              />
            </TabsContent>
            
            <TabsContent value="scheduled" className="mt-0">
              <DataTable
                data={filteredServices}
                columns={columns}
                searchField="guestName"
              />
            </TabsContent>
            
            <TabsContent value="completed" className="mt-0">
              <DataTable
                data={filteredServices}
                columns={columns}
                searchField="guestName"
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </SubPageLayout>
  );
}
