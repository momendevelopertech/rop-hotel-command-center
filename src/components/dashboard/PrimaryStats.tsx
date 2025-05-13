
import React from 'react';
import { StatCard } from './StatCard';
import { Bed, Utensils, CalendarDays, FileBarChart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <StatCard 
        title="Active Bookings" 
        value={activeBookings} 
        icon={<Bed className="h-6 w-6" />}
        trend={{ value: 12, isUpward: true }}
        onClick={() => navigate('/guest-management')}
        description="Military personnel currently accommodated"
      />
      <StatCard 
        title="Pending Orders" 
        value={pendingOrders} 
        icon={<Utensils className="h-6 w-6" />}
        trend={{ value: 5, isUpward: false }}
        onClick={() => navigate('/dining')}
        description="Mess hall and catering orders in process"
      />
      <StatCard 
        title="Upcoming Events" 
        value={upcomingEvents} 
        icon={<CalendarDays className="h-6 w-6" />}
        onClick={() => navigate('/events')}
        description="Scheduled events and trainings"
      />
      <StatCard 
        title="Monthly Revenue" 
        value={`${monthlyRevenue} OMR`} 
        icon={<FileBarChart className="h-6 w-6" />}
        trend={{ value: 8, isUpward: true }}
        onClick={() => navigate('/finance')}
        description="Total revenue from all departments"
      />
    </div>
  );
}
