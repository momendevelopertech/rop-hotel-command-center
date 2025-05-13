
import React, { useEffect, useRef } from 'react';
import { ChartJS } from '@/utils/chartUtils';
import { Booking } from '@/contexts/DataContext';
import { ChartCard } from './ChartCard';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface BookingChartProps {
  bookings: Booking[];
}

export function BookingChart({ bookings }: BookingChartProps) {
  const navigate = useNavigate();
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

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

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const data = months.map((_, idx) => bookingsByMonth[idx] || 0);

    const chart = new ChartJS(ctx, {
      type: 'bar',
      data: {
        labels: months,
        datasets: [{
          label: 'Bookings',
          data: data,
          backgroundColor: '#1E3A8A',
          borderColor: '#1E40AF',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `Bookings: ${context.raw}`;
              },
              footer: function() {
                return `Total Active Bookings: ${bookings.filter(b => 
                  b.status === "Confirmed" || b.status === "Checked In"
                ).length}`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Number of Bookings'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Month'
            }
          }
        }
      }
    });

    return () => {
      chart.destroy();
    };
  }, [bookings]);

  // Calculate detailed booking statistics
  const confirmedBookings = bookings.filter(b => b.status === "Confirmed").length;
  const checkedInBookings = bookings.filter(b => b.status === "Checked In").length;
  const pendingBookings = bookings.filter(b => b.status === "Pending").length;
  const cancelledBookings = bookings.filter(b => b.status === "Cancelled").length;
  
  // Calculate occupancy rate (assuming each booking is one room)
  const totalRooms = 100; // Example total room count
  const occupancyRate = Math.round((checkedInBookings / totalRooms) * 100);

  return (
    <ChartCard 
      title="Booking Trends" 
      actions={
        <Button variant="outline" size="sm" onClick={() => navigate('/guest-management')}>
          View Details
        </Button>
      }
    >
      <div className="mb-3 grid grid-cols-2 gap-2 text-xs">
        <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
          <span className="font-medium">Confirmed:</span> 
          <span className="text-blue-700">{confirmedBookings}</span>
        </div>
        <div className="flex items-center justify-between p-2 bg-green-50 rounded">
          <span className="font-medium">Checked In:</span> 
          <span className="text-green-700">{checkedInBookings}</span>
        </div>
        <div className="flex items-center justify-between p-2 bg-yellow-50 rounded">
          <span className="font-medium">Pending:</span> 
          <span className="text-yellow-700">{pendingBookings}</span>
        </div>
        <div className="flex items-center justify-between p-2 bg-red-50 rounded">
          <span className="font-medium">Cancelled:</span> 
          <span className="text-red-700">{cancelledBookings}</span>
        </div>
      </div>
      <div className="flex justify-end mb-1 text-xs">
        <div className="px-2 py-1 bg-gray-100 rounded">
          <span className="font-medium">Occupancy Rate:</span> 
          <span className={`ml-1 ${occupancyRate > 70 ? 'text-green-700' : occupancyRate > 40 ? 'text-yellow-700' : 'text-red-700'}`}>
            {occupancyRate}%
          </span>
        </div>
      </div>
      <canvas ref={chartRef}></canvas>
    </ChartCard>
  );
}
