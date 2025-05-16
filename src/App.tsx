
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DataProvider } from "@/contexts/DataContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
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
import POSSystem from "./pages/POSSystem";

// Guest Management sub-pages
import RoomBooking from "./pages/guest/RoomBooking";
import CheckInOut from "./pages/guest/CheckInOut";
import GuestServices from "./pages/guest/GuestServices";
import MaintenanceRequests from "./pages/guest/MaintenanceRequests";
import BillingPayments from "./pages/guest/BillingPayments";

// Dining & Catering sub-pages
import MenuManagement from "./pages/dining/MenuManagement";
import TableReservations from "./pages/dining/TableReservations";
import OrderManagement from "./pages/dining/OrderManagement";
import KitchenDispatch from "./pages/dining/KitchenDispatch";
import InventoryConsumption from "./pages/dining/InventoryConsumption";

// Event Management sub-pages
import HallBooking from "./pages/events/HallBooking";
import CateringOrders from "./pages/events/CateringOrders";
import EquipmentSetup from "./pages/events/EquipmentSetup";
import GuestListManagement from "./pages/events/GuestListManagement";
import EventBilling from "./pages/events/EventBilling";

// Finance & Reports sub-pages
import InvoicesPayments from "./pages/finance/InvoicesPayments";
import ExpensesRevenues from "./pages/finance/ExpensesRevenues";
import ProfitLossReports from "./pages/finance/ProfitLossReports";
import TaxManagement from "./pages/finance/TaxManagement";
import FinancialAuditLogs from "./pages/finance/FinancialAuditLogs";

// Mobile App sub-pages
import AppFeaturesShowcase from "./pages/mobile/AppFeaturesShowcase";
import BookingViaApp from "./pages/mobile/BookingViaApp";
import OrderTracking from "./pages/mobile/OrderTracking";
import PushNotificationSettings from "./pages/mobile/PushNotificationSettings";

// Membership sub-pages
import MemberRegistration from "./pages/membership/MemberRegistration";
import LinkMilitaryID from "./pages/membership/LinkMilitaryID";
import CardPrinting from "./pages/membership/CardPrinting";
import MembershipRenewals from "./pages/membership/MembershipRenewals";
import SMSReminders from "./pages/membership/SMSReminders";

// Human Resources sub-pages
import EmployeeRecords from "./pages/hr/EmployeeRecords";
import AttendanceShifts from "./pages/hr/AttendanceShifts";
import LeavesRequests from "./pages/hr/LeavesRequests";
import PayrollPenalties from "./pages/hr/PayrollPenalties";
import AdvancesLoans from "./pages/hr/AdvancesLoans";

// Inventory sub-pages
import StockOverview from "./pages/inventory/StockOverview";
import ItemTransfers from "./pages/inventory/ItemTransfers";
import DamagedReturnedItems from "./pages/inventory/DamagedReturnedItems";
import LowStockAlerts from "./pages/inventory/LowStockAlerts";
import InventoryReports from "./pages/inventory/InventoryReports";

// Reports & Analytics sub-pages
import DailyReports from "./pages/reports/DailyReports";
import MonthlySummaries from "./pages/reports/MonthlySummaries";
import PerformanceDashboards from "./pages/reports/PerformanceDashboards";
import CustomReportBuilder from "./pages/reports/CustomReportBuilder";

// POS sub-pages
import SalesInterface from "./pages/pos/SalesInterface";
import TransactionHistory from "./pages/pos/TransactionHistory";
import RefundsCancellations from "./pages/pos/RefundsCancellations";
import PaymentMethods from "./pages/pos/PaymentMethods";
import POSSettings from "./pages/pos/POSSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <DataProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              
              {/* Guest Management */}
              <Route path="/guest-management" element={<GuestManagement />} />
              <Route path="/guest-management/room-booking" element={<RoomBooking />} />
              <Route path="/guest-management/check-in-out" element={<CheckInOut />} />
              <Route path="/guest-management/guest-services" element={<GuestServices />} />
              <Route path="/guest-management/maintenance-requests" element={<MaintenanceRequests />} />
              <Route path="/guest-management/billing-payments" element={<BillingPayments />} />
              
              {/* Dining & Catering */}
              <Route path="/dining" element={<DiningCatering />} />
              <Route path="/dining/menu-management" element={<MenuManagement />} />
              <Route path="/dining/table-reservations" element={<TableReservations />} />
              <Route path="/dining/order-management" element={<OrderManagement />} />
              <Route path="/dining/kitchen-dispatch" element={<KitchenDispatch />} />
              <Route path="/dining/inventory-consumption" element={<InventoryConsumption />} />
              
              {/* Events Management */}
              <Route path="/events" element={<EventManagement />} />
              <Route path="/events/hall-booking" element={<HallBooking />} />
              <Route path="/events/catering-orders" element={<CateringOrders />} />
              <Route path="/events/equipment-setup" element={<EquipmentSetup />} />
              <Route path="/events/guest-list" element={<GuestListManagement />} />
              <Route path="/events/billing" element={<EventBilling />} />
              
              {/* Finance & Reports */}
              <Route path="/finance" element={<FinanceReports />} />
              <Route path="/finance/invoices-payments" element={<InvoicesPayments />} />
              <Route path="/finance/expenses-revenues" element={<ExpensesRevenues />} />
              <Route path="/finance/profit-loss" element={<ProfitLossReports />} />
              <Route path="/finance/tax-management" element={<TaxManagement />} />
              <Route path="/finance/audit-logs" element={<FinancialAuditLogs />} />
              
              {/* Mobile App */}
              <Route path="/mobile-app" element={<MobileApp />} />
              <Route path="/mobile-app/features" element={<AppFeaturesShowcase />} />
              <Route path="/mobile-app/booking" element={<BookingViaApp />} />
              <Route path="/mobile-app/order-tracking" element={<OrderTracking />} />
              <Route path="/mobile-app/notifications" element={<PushNotificationSettings />} />
              
              {/* Membership */}
              <Route path="/membership" element={<Membership />} />
              <Route path="/membership/registration" element={<MemberRegistration />} />
              <Route path="/membership/link-id" element={<LinkMilitaryID />} />
              <Route path="/membership/card-printing" element={<CardPrinting />} />
              <Route path="/membership/renewals" element={<MembershipRenewals />} />
              <Route path="/membership/sms" element={<SMSReminders />} />
              
              {/* Human Resources */}
              <Route path="/hr" element={<HumanResources />} />
              <Route path="/hr/employee-records" element={<EmployeeRecords />} />
              <Route path="/hr/attendance-shifts" element={<AttendanceShifts />} />
              <Route path="/hr/leaves-requests" element={<LeavesRequests />} />
              <Route path="/hr/payroll-penalties" element={<PayrollPenalties />} />
              <Route path="/hr/advances-loans" element={<AdvancesLoans />} />
              
              {/* Inventory */}
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/inventory/stock-overview" element={<StockOverview />} />
              <Route path="/inventory/item-transfers" element={<ItemTransfers />} />
              <Route path="/inventory/damaged-items" element={<DamagedReturnedItems />} />
              <Route path="/inventory/low-stock" element={<LowStockAlerts />} />
              <Route path="/inventory/reports" element={<InventoryReports />} />
              
              {/* Reports & Analytics */}
              <Route path="/reports" element={<ReportsAnalytics />} />
              <Route path="/reports/daily" element={<DailyReports />} />
              <Route path="/reports/monthly" element={<MonthlySummaries />} />
              <Route path="/reports/performance" element={<PerformanceDashboards />} />
              <Route path="/reports/custom" element={<CustomReportBuilder />} />
              
              {/* POS System */}
              <Route path="/pos" element={<POSSystem />} />
              <Route path="/pos/sales" element={<SalesInterface />} />
              <Route path="/pos/transactions" element={<TransactionHistory />} />
              <Route path="/pos/refunds" element={<RefundsCancellations />} />
              <Route path="/pos/payment-methods" element={<PaymentMethods />} />
              <Route path="/pos/settings" element={<POSSettings />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </DataProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
