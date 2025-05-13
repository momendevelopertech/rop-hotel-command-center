
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

    // Group transactions by department for analysis
    const revenueByDepartment = transactions.reduce((acc, transaction) => {
      acc[transaction.department] = (acc[transaction.department] || 0) + transaction.amount;
      return acc;
    }, {} as Record<string, number>);

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const data = months.map((_, idx) => revenueByMonth[idx] || 0);

    const chart = new ChartJS(ctx, {
      type: 'line',
      data: {
        labels: months,
        datasets: [{
          label: 'Revenue (OMR)',
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
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `Revenue: ${context.raw} OMR`;
              },
              footer: function() {
                return `Total Revenue: ${transactions.reduce((sum, t) => sum + t.amount, 0)} OMR`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Revenue (OMR)'
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
  }, [transactions]);

  // Calculate revenue statistics
  const totalRevenue = transactions.reduce((sum, t) => sum + t.amount, 0);
  
  // Calculate revenue by type
  const revenueByType = transactions.reduce((acc, t) => {
    acc[t.type] = (acc[t.type] || 0) + t.amount;
    return acc;
  }, {} as Record<string, number>);
  
  // Top revenue departments (get top 2)
  const departmentRevenue = transactions.reduce((acc, t) => {
    acc[t.department] = (acc[t.department] || 0) + t.amount;
    return acc;
  }, {} as Record<string, number>);
  
  const topDepartments = Object.entries(departmentRevenue)
    .sort(([, amountA], [, amountB]) => amountB - amountA)
    .slice(0, 2);

  return (
    <ChartCard 
      title="Revenue Trends" 
      actions={
        <Button variant="outline" size="sm" onClick={() => navigate('/finance')}>
          View Details
        </Button>
      }
    >
      <div className="mb-3 grid grid-cols-3 gap-2 text-xs">
        <div className="col-span-3 flex items-center justify-between p-2 bg-blue-50 rounded">
          <span className="font-medium">Total Revenue:</span> 
          <span className="text-blue-700 font-bold">{totalRevenue} OMR</span>
        </div>
        
        {Object.entries(revenueByType).slice(0, 2).map(([type, amount], index) => (
          <div key={type} className="flex flex-col p-2 bg-gray-50 rounded">
            <span className="font-medium text-gray-600 truncate">{type}:</span> 
            <span className="text-gray-800 font-semibold">{amount} OMR</span>
          </div>
        ))}
        
        {topDepartments.map(([dept, amount], index) => (
          <div key={dept} className="flex flex-col p-2 bg-gray-50 rounded">
            <span className="font-medium text-gray-600 truncate">{dept}:</span> 
            <span className="text-gray-800 font-semibold">{amount} OMR</span>
          </div>
        ))}
      </div>
      <canvas ref={chartRef}></canvas>
    </ChartCard>
  );
}
