
import React from 'react';
import { ChartCard } from './ChartCard';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Booking } from '@/contexts/DataContext';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';
import { useLanguage } from '@/contexts/LanguageContext';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

interface BookingChartProps {
  bookings: Booking[];
}

export function BookingChart({ bookings }: BookingChartProps) {
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  // Group bookings by check-in month
  const bookingsByMonth = bookings.reduce((acc, booking) => {
    const month = new Date(booking.checkIn).getMonth();
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  // Group bookings by status for analysis
  const bookingsByStatus = bookings.reduce((acc, booking) => {
    acc[booking.status] = (acc[booking.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Prepare data for Recharts
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const chartData = months.map((name, idx) => ({
    name,
    bookings: bookingsByMonth[idx] || 0,
  }));

  // Calculate detailed booking statistics
  const confirmedBookings = bookings.filter(b => b.status === "Confirmed").length;
  const checkedInBookings = bookings.filter(b => b.status === "Checked In").length;
  const pendingBookings = bookings.filter(b => b.status === "Pending").length;
  const cancelledBookings = bookings.filter(b => b.status === "Cancelled").length;
  
  // Calculate occupancy rate (assuming each booking is one room)
  const totalRooms = 100; // Example total room count
  const occupancyRate = Math.round((checkedInBookings / totalRooms) * 100);

  // Chart config for proper styling
  const chartConfig = {
    bookings: {
      label: "Bookings",
      theme: {
        light: "#1E3A8A", // ROP blue
        dark: "#1EAEDB"
      }
    }
  };

  return (
    <ChartCard 
      title={t("Booking Trends")}
      actions={
        <Button variant="outline" size="sm" onClick={() => navigate('/guest-management')}>
          {t("View Details")}
        </Button>
      }
    >
      <div className="mb-3 grid grid-cols-2 gap-2 text-xs">
        <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
          <span className="font-medium">{t("Confirmed")}:</span> 
          <span className="text-blue-700">{confirmedBookings}</span>
        </div>
        <div className="flex items-center justify-between p-2 bg-green-50 rounded">
          <span className="font-medium">{t("Checked In")}:</span> 
          <span className="text-green-700">{checkedInBookings}</span>
        </div>
        <div className="flex items-center justify-between p-2 bg-yellow-50 rounded">
          <span className="font-medium">{t("Pending")}:</span> 
          <span className="text-yellow-700">{pendingBookings}</span>
        </div>
        <div className="flex items-center justify-between p-2 bg-red-50 rounded">
          <span className="font-medium">{t("Cancelled")}:</span> 
          <span className="text-red-700">{cancelledBookings}</span>
        </div>
      </div>
      <div className="flex justify-end mb-1 text-xs">
        <div className="px-2 py-1 bg-gray-100 rounded">
          <span className="font-medium">{t("Occupancy Rate")}:</span> 
          <span className={`ml-1 ${occupancyRate > 70 ? 'text-green-700' : occupancyRate > 40 ? 'text-yellow-700' : 'text-red-700'}`}>
            {occupancyRate}%
          </span>
        </div>
      </div>
      <AspectRatio ratio={16/9} className="mt-2">
        <ChartContainer config={chartConfig} className="w-full h-full">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip 
              content={(props) => (
                <ChartTooltipContent 
                  {...props} 
                  className="bg-white border border-gray-200 shadow-lg"
                />
              )} 
            />
            <Legend />
            <Bar dataKey="bookings" name={t("Bookings")} fill="var(--color-bookings, #1E3A8A)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </AspectRatio>
    </ChartCard>
  );
}
