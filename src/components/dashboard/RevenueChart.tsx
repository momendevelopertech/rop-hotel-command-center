
import React, { useEffect, useRef } from 'react';
import { ChartJS } from '@/utils/chartUtils';
import { Transaction } from '@/contexts/DataContext';
import { ChartCard } from './ChartCard';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface RevenueChartProps {
  transactions: Transaction[];
}

export function RevenueChart({ transactions }: RevenueChartProps) {
  const navigate = useNavigate();
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    
    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    // Group transactions by month
    const revenueByMonth = transactions.reduce((acc, transaction) => {
      const month = new Date(transaction.date).getMonth();
      acc[month] = (acc[month] || 0) + transaction.amount;
      return acc;
    }, {} as Record<number, number>);

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const data = months.map((_, idx) => revenueByMonth[idx] || 0);

    const chart = new ChartJS(ctx, {
      type: 'line',
      data: {
        labels: months,
        datasets: [{
          label: 'Revenue',
          data: data,
          fill: true,
          backgroundColor: 'rgba(30, 58, 138, 0.1)',
          borderColor: '#1E3A8A',
          tension: 0.4
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
  }, [transactions]);

  return (
    <ChartCard 
      title="Revenue Trends" 
      actions={
        <Button variant="outline" size="sm" onClick={() => navigate('/finance')}>
          View Details
        </Button>
      }
    >
      <canvas ref={chartRef}></canvas>
    </ChartCard>
  );
}
