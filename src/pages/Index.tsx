
import React from 'react';
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

const Index = () => {
  const { 
    bookings, 
    diningOrders, 
    events, 
    transactions, 
    memberships, 
    employees, 
    inventoryItems,
    mobileInteractions,
    reports
  } = useData();
  
  const { t } = useLanguage();
  
  // Calculate stats
  const activeBookings = bookings.filter(b => b.status === "Confirmed" || b.status === "Checked In").length;
  const pendingOrders = diningOrders.filter(o => o.status === "Placed" || o.status === "Preparing").length;
  const upcomingEvents = events.filter(e => e.status === "Confirmed" || e.status === "Planned").length;
  const monthlyRevenue = transactions.reduce((sum, t) => sum + t.amount, 0);
  const pendingRenewals = memberships.filter(m => m.status === "Pending Renewal").length;
  const employeeCount = employees.length;
  const lowStockItems = inventoryItems.filter(i => i.quantity <= i.reorderLevel).length;
  const mobileAppUsers = new Set(mobileInteractions.map(i => i.officer)).size;

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
        <BookingChart bookings={bookings} />
        <RevenueChart transactions={transactions} />
      </div>
      
      {/* Membership and Mobile App Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <MembershipChart memberships={memberships} />
        <MobileInteractionsChart interactions={mobileInteractions} />
      </div>
      
      {/* Secondary Stats */}
      <SecondaryStats
        pendingRenewals={pendingRenewals}
        employeeCount={employeeCount}
        lowStockItems={lowStockItems}
        mobileAppUsers={mobileAppUsers}
      />
      
      {/* Recent Reports */}
      <RecentReports reports={reports} />
    </AppLayout>
  );
};

export default Index;
