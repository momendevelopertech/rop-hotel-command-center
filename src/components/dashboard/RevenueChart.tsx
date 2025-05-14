
import React from 'react';
import { Transaction } from '@/contexts/DataContext';
import { ChartCard } from './ChartCard';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend,
  Area
} from 'recharts';
import { useLanguage } from '@/contexts/LanguageContext';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

interface RevenueChartProps {
  transactions: Transaction[];
}

export function RevenueChart({ transactions }: RevenueChartProps) {
  const navigate = useNavigate();
  const { t } = useLanguage();

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

  // Prepare data for Recharts
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const chartData = months.map((name, idx) => ({
    name,
    revenue: revenueByMonth[idx] || 0,
  }));

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

  // Chart config for proper styling
  const chartConfig = {
    revenue: {
      label: "Revenue",
      theme: {
        light: "#1E3A8A", // ROP blue
        dark: "#3B82F6"
      }
    }
  };

  // Custom tooltip component to resolve the type issue
  const CustomTooltip = (props: any) => {
    if (!props.active || !props.payload) {
      return null;
    }
    return (
      <ChartTooltipContent 
        {...props} 
        className="bg-white border border-gray-200 shadow-lg"
      />
    );
  };

  return (
    <ChartCard 
      title={t("Revenue Trends")} 
      actions={
        <Button variant="outline" size="sm" onClick={() => navigate('/finance')}>
          {t("View Details")}
        </Button>
      }
    >
      <div className="mb-3 grid grid-cols-3 gap-2 text-xs">
        <div className="col-span-3 flex items-center justify-between p-2 bg-blue-50 rounded">
          <span className="font-medium">{t("Total Revenue")}:</span> 
          <span className="text-blue-700 font-bold">{totalRevenue} OMR</span>
        </div>
        
        {Object.entries(revenueByType).slice(0, 2).map(([type, amount], index) => (
          <div key={type} className="flex flex-col p-2 bg-gray-50 rounded">
            <span className="font-medium text-gray-600 truncate">{t(type)}:</span> 
            <span className="text-gray-800 font-semibold">{amount} OMR</span>
          </div>
        ))}
        
        {topDepartments.map(([dept, amount], index) => (
          <div key={dept} className="flex flex-col p-2 bg-gray-50 rounded">
            <span className="font-medium text-gray-600 truncate">{t(dept)}:</span> 
            <span className="text-gray-800 font-semibold">{amount} OMR</span>
          </div>
        ))}
      </div>

      <AspectRatio ratio={16/9} className="mt-2">
        <ChartContainer config={chartConfig} className="w-full h-full">
          <LineChart data={chartData}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1E3A8A" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#1E3A8A" stopOpacity={0.01}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              name={t("Revenue (OMR)")} 
              stroke="var(--color-revenue, #1E3A8A)" 
              fillOpacity={1} 
              fill="url(#revenueGradient)" 
            />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              name={t("Revenue (OMR)")} 
              stroke="var(--color-revenue, #1E3A8A)"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ChartContainer>
      </AspectRatio>
    </ChartCard>
  );
}
