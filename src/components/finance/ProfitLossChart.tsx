
import React from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  ReferenceLine
} from "recharts";
import { useLanguage } from "@/contexts/LanguageContext";

interface ProfitLossChartProps {
  period: string;
  year: string;
  quarter?: string;
  month?: string;
}

export function ProfitLossChart({ period, year, quarter, month }: ProfitLossChartProps) {
  const { t } = useLanguage();
  
  // Format currency for tooltip and labels
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-OM', { 
      style: 'currency', 
      currency: 'OMR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };
  
  // Sample data for different report periods
  const annualData = [
    { name: '2021', income: 185000, expenses: 148000, profit: 37000 },
    { name: '2022', income: 212000, expenses: 165000, profit: 47000 },
    { name: '2023', income: 228000, expenses: 174000, profit: 54000 },
    { name: '2024', income: 236000, expenses: 181000, profit: 55000 },
    { name: '2025', income: 248000, expenses: 186000, profit: 62000 }
  ];
  
  const quarterlyData = [
    { name: 'Q1 2025', income: 58000, expenses: 42500, profit: 15500 },
    { name: 'Q2 2025', income: 67500, expenses: 48200, profit: 19300 },
    { name: 'Q3 2025', income: 61200, expenses: 46800, profit: 14400 },
    { name: 'Q4 2025', income: 61300, expenses: 48500, profit: 12800 }
  ];
  
  const monthlyData = [
    { name: t('Jan'), income: 19200, expenses: 14400, profit: 4800 },
    { name: t('Feb'), income: 18700, expenses: 13700, profit: 5000 },
    { name: t('Mar'), income: 20100, expenses: 14400, profit: 5700 },
    { name: t('Apr'), income: 21600, expenses: 15300, profit: 6300 },
    { name: t('May'), income: 21900, expenses: 15600, profit: 6300 },
    { name: t('Jun'), income: 24000, expenses: 17300, profit: 6700 }
  ];
  
  // Select data based on period
  let chartData;
  if (period === 'annual') {
    chartData = annualData;
  } else if (period === 'quarterly') {
    chartData = quarterlyData;
  } else {
    chartData = monthlyData;
  }
  
  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-3 bg-white shadow-md border rounded-md">
          <p className="font-medium mb-2">{label}</p>
          {payload.map((item: any, index: number) => (
            <div key={index} className="flex items-center text-sm" style={{ color: item.color }}>
              <div 
                className="w-3 h-3 mr-2 rounded-full" 
                style={{ backgroundColor: item.color }} 
              />
              <span className="mr-2">{t(item.name.charAt(0).toUpperCase() + item.name.slice(1))}:</span>
              <span className="font-medium">{formatCurrency(item.value)}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={chartData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis tickFormatter={(value) => formatCurrency(value)} />
        <Tooltip content={<CustomTooltip />} />
        <Legend formatter={(value) => t(value.charAt(0).toUpperCase() + value.slice(1))} />
        <ReferenceLine y={0} stroke="#000" />
        <Bar dataKey="income" name="income" fill="#9b87f5" radius={[4, 4, 0, 0]} />
        <Bar dataKey="expenses" name="expenses" fill="#ff7e7e" radius={[4, 4, 0, 0]} />
        <Bar dataKey="profit" name="profit" fill="#4ade80" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
