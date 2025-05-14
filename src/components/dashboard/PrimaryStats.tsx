
import React from 'react';
import { StatCard } from './StatCard';
import { Bed, Utensils, CalendarDays, FileBarChart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

interface PrimaryStatsProps {
  activeBookings: number;
  pendingOrders: number;
  upcomingEvents: number;
  monthlyRevenue: number;
}

export function PrimaryStats({ 
  activeBookings,
  pendingOrders, 
  upcomingEvents, 
  monthlyRevenue 
}: PrimaryStatsProps) {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <StatCard 
        title={t("Active Bookings")}
        value={activeBookings} 
        icon={<Bed className="h-6 w-6" />}
        trend={{ value: 12, isUpward: true }}
        onClick={() => navigate('/guest-management')}
        description={t("Military personnel currently accommodated")}
      />
      <StatCard 
        title={t("Pending Orders")}
        value={pendingOrders} 
        icon={<Utensils className="h-6 w-6" />}
        trend={{ value: 5, isUpward: false }}
        onClick={() => navigate('/dining')}
        description={t("Mess hall and catering orders in process")}
      />
      <StatCard 
        title={t("Upcoming Events")}
        value={upcomingEvents} 
        icon={<CalendarDays className="h-6 w-6" />}
        onClick={() => navigate('/events')}
        description={t("Scheduled events and trainings")}
      />
      <StatCard 
        title={t("Monthly Revenue")}
        value={`${monthlyRevenue} OMR`} 
        icon={<FileBarChart className="h-6 w-6" />}
        trend={{ value: 8, isUpward: true }}
        onClick={() => navigate('/finance')}
        description={t("Total revenue from all departments")}
      />
    </div>
  );
}
