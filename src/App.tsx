
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DataProvider } from "@/contexts/DataContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import GuestManagement from "./pages/GuestManagement";
import DiningCatering from "./pages/DiningCatering";
import EventManagement from "./pages/EventManagement";
import FinanceReports from "./pages/FinanceReports";
import MobileApp from "./pages/MobileApp";
import Membership from "./pages/Membership";
import HumanResources from "./pages/HumanResources";
import Inventory from "./pages/Inventory";
import ReportsAnalytics from "./pages/ReportsAnalytics";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <DataProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/guest-management" element={<GuestManagement />} />
            <Route path="/dining" element={<DiningCatering />} />
            <Route path="/events" element={<EventManagement />} />
            <Route path="/finance" element={<FinanceReports />} />
            <Route path="/mobile-app" element={<MobileApp />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/hr" element={<HumanResources />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/reports" element={<ReportsAnalytics />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </DataProvider>
  </QueryClientProvider>
);

export default App;
