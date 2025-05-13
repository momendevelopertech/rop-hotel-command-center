
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
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    return () => {
      chart.destroy();
    };
  }, [bookings]);

  return (
    <ChartCard 
      title="Booking Trends" 
      actions={
        <Button variant="outline" size="sm" onClick={() => navigate('/guest-management')}>
          View Details
        </Button>
      }
    >
      <canvas ref={chartRef}></canvas>
    </ChartCard>
  );
}
