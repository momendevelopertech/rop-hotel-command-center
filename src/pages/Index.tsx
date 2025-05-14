
import React, { useState, useEffect } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { useData } from '@/contexts/DataContext';
import { PrimaryStats } from '@/components/dashboard/PrimaryStats';
import { SecondaryStats } from '@/components/dashboard/SecondaryStats';
import { BookingChart } from '@/components/dashboard/BookingChart';
import { RevenueChart } from '@/components/dashboard/RevenueChart';
import { MembershipChart } from '@/components/dashboard/MembershipChart';
import { MobileInteractionsChart } from '@/components/dashboard/MobileInteractionsChart';
import { RecentReports } from '@/components/dashboard/RecentReports';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRopDataService } from '@/utils/ropDataService';

const Index = () => {
  const { 
    bookings: originalBookings, 
    diningOrders: originalDiningOrders, 
    events: originalEvents, 
    transactions: originalTransactions, 
    memberships: originalMemberships, 
    employees: originalEmployees, 
    inventoryItems: originalInventoryItems,
    mobileInteractions: originalMobileInteractions,
    reports: originalReports
  } = useData();
  
  const { t } = useLanguage();
  const {
    translateBooking,
    translateDiningOrder,
    translateEvent,
    translateTransaction,
    translateMembership,
    translateEmployee,
    translateInventoryItem,
    translateMobileInteraction,
    translateReport
  } = useRopDataService();
  
  const [translatedData, setTranslatedData] = useState({
    bookings: originalBookings,
    diningOrders: originalDiningOrders,
    events: originalEvents,
    transactions: originalTransactions,
    memberships: originalMemberships,
    employees: originalEmployees,
    inventoryItems: originalInventoryItems,
    mobileInteractions: originalMobileInteractions,
    reports: originalReports
  });
  
  // Translate data whenever language changes
  useEffect(() => {
    setTranslatedData({
      bookings: originalBookings.map(translateBooking),
      diningOrders: originalDiningOrders.map(translateDiningOrder),
      events: originalEvents.map(translateEvent),
      transactions: originalTransactions.map(translateTransaction),
      memberships: originalMemberships.map(translateMembership),
      employees: originalEmployees.map(translateEmployee),
      inventoryItems: originalInventoryItems.map(translateInventoryItem),
      mobileInteractions: originalMobileInteractions.map(translateMobileInteraction),
      reports: originalReports.map(translateReport)
    });
  }, [
    originalBookings, originalDiningOrders, originalEvents, 
    originalTransactions, originalMemberships, originalEmployees, 
    originalInventoryItems, originalMobileInteractions, originalReports,
    translateBooking, translateDiningOrder, translateEvent,
    translateTransaction, translateMembership, translateEmployee,
    translateInventoryItem, translateMobileInteraction, translateReport
  ]);
  
  // Calculate stats
  const activeBookings = translatedData.bookings.filter(b => 
    b.status === t("Confirmed") || b.status === t("Checked In")
  ).length;
  
  const pendingOrders = translatedData.diningOrders.filter(o => 
    o.status === t("Placed") || o.status === t("Preparing")
  ).length;
  
  const upcomingEvents = translatedData.events.filter(e => 
    e.status === t("Confirmed") || e.status === t("Planned")
  ).length;
  
  const monthlyRevenue = translatedData.transactions.reduce((sum, t) => sum + t.amount, 0);
  
  const pendingRenewals = translatedData.memberships.filter(m => 
    m.status === t("Pending Renewal")
  ).length;
  
  const employeeCount = translatedData.employees.length;
  
  const lowStockItems = translatedData.inventoryItems.filter(i => 
    i.quantity <= i.reorderLevel
  ).length;
  
  const mobileAppUsers = new Set(translatedData.mobileInteractions.map(i => i.officer)).size;

  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">{t("Dashboard")}</h1>
        <p className="text-gray-600">{t("Welcome to the Integrated Hotel Management System")}</p>
      </div>
      
      {/* Primary Stats */}
      <PrimaryStats
        activeBookings={activeBookings}
        pendingOrders={pendingOrders}
        upcomingEvents={upcomingEvents}
        monthlyRevenue={monthlyRevenue}
      />
      
      {/* Booking and Revenue Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <BookingChart bookings={translatedData.bookings} />
        <RevenueChart transactions={translatedData.transactions} />
      </div>
      
      {/* Membership and Mobile App Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <MembershipChart memberships={translatedData.memberships} />
        <MobileInteractionsChart interactions={translatedData.mobileInteractions} />
      </div>
      
      {/* Secondary Stats */}
      <SecondaryStats
        pendingRenewals={pendingRenewals}
        employeeCount={employeeCount}
        lowStockItems={lowStockItems}
        mobileAppUsers={mobileAppUsers}
      />
      
      {/* Recent Reports */}
      <RecentReports reports={translatedData.reports} />
    </AppLayout>
  );
};

export default Index;
