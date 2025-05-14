
import React from 'react';
import { MobileInteraction } from '@/contexts/DataContext';
import { ChartCard } from './ChartCard';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  ResponsiveContainer, 
  Legend,
  Sector
} from 'recharts';
import { useLanguage } from '@/contexts/LanguageContext';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

interface MobileInteractionsChartProps {
  interactions: MobileInteraction[];
}

export function MobileInteractionsChart({ interactions }: MobileInteractionsChartProps) {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = React.useState(0);

  // Count interactions by action
  const interactionsByAction = interactions.reduce((acc, interaction) => {
    acc[interaction.action] = (acc[interaction.action] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Group interactions by device
  const interactionsByDevice = interactions.reduce((acc, interaction) => {
    acc[interaction.device] = (acc[interaction.device] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Prepare data for Recharts
  const chartData = Object.entries(interactionsByAction)
    .map(([name, value]) => ({
      name,
      value
    }));

  // Calculate interaction statistics
  const totalInteractions = interactions.length;
  const uniqueUsers = new Set(interactions.map(i => i.officer)).size;
  
  // Get most common actions (top 3)
  const actionCounts = interactions.reduce((acc, i) => {
    acc[i.action] = (acc[i.action] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const topActions = Object.entries(actionCounts)
    .sort(([, countA], [, countB]) => countB - countA)
    .slice(0, 3);
  
  // Calculate interactions by device type
  const deviceCounts = interactions.reduce((acc, i) => {
    acc[i.device] = (acc[i.device] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // Calculate interaction engagement rate
  const dailyActiveUsers = uniqueUsers / 30; // assuming 30 days period
  const engagementRate = Math.round((dailyActiveUsers / uniqueUsers) * 100);

  // Colors for the pie chart
  const COLORS = ['#1E3A8A', '#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE', '#DBEAFE'];

  // Chart config for proper styling
  const chartConfig = {
    interactions: {
      label: "Mobile Interactions",
      theme: {
        light: "#1E3A8A", // ROP blue
        dark: "#3B82F6"
      }
    }
  };

  // Custom tooltip component to resolve the type issue
  const CustomTooltip = (props: any) => {
    if (!props.active || !props.payload?.[0]) {
      return null;
    }

    const entry = props.payload[0];
    const value = entry.value;
    const percentage = Math.round((value / interactions.length) * 100);

    return (
      <div className="bg-white border border-gray-200 shadow-lg p-2 rounded">
        <p className="font-medium">{`${entry.name}: ${value}`}</p>
        <p className="text-sm text-gray-600">{`${percentage}% of total`}</p>
      </div>
    );
  };

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const renderActiveShape = (props: any) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    
    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
      </g>
    );
  };

  return (
    <ChartCard 
      title={t("Mobile App Usage")}
      actions={
        <Button variant="outline" size="sm" onClick={() => navigate('/mobile-app')}>
          {t("View Details")}
        </Button>
      }
    >
      <div className="mb-3 grid grid-cols-2 gap-2 text-xs">
        <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
          <span className="font-medium">{t("Total Interactions")}:</span> 
          <span className="text-blue-700">{totalInteractions}</span>
        </div>
        <div className="flex items-center justify-between p-2 bg-green-50 rounded">
          <span className="font-medium">{t("Unique Users")}:</span> 
          <span className="text-green-700">{uniqueUsers}</span>
        </div>
        <div className="flex items-center justify-between p-2 bg-purple-50 rounded">
          <span className="font-medium">{t("Top Device")}:</span> 
          <span className="text-purple-700">
            {Object.entries(deviceCounts).sort(([, a], [, b]) => b - a)[0]?.[0] || 'N/A'}
          </span>
        </div>
        <div className="flex items-center justify-between p-2 bg-indigo-50 rounded">
          <span className="font-medium">{t("Engagement Rate")}:</span> 
          <span className="text-indigo-700">{engagementRate}%</span>
        </div>
      </div>
      
      <div className="mb-3 flex justify-between text-xs">
        <div className="p-2 bg-gray-50 rounded">
          <span className="font-medium">{t("Top Actions")}:</span>
          <div className="mt-1 space-y-1">
            {topActions.map(([action, count], index) => (
              <div key={action} className="flex items-center">
                <div 
                  className="w-2 h-2 rounded-full mr-1" 
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></div>
                <span className="truncate max-w-[100px]">{t(action)}: {count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <AspectRatio ratio={16/9} className="mt-2">
        <ChartContainer config={chartConfig} className="w-full h-full">
          <PieChart>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
              onMouseEnter={onPieEnter}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              layout="vertical" 
              verticalAlign="middle" 
              align="right"
              wrapperStyle={{ paddingLeft: "20px" }}
            />
          </PieChart>
        </ChartContainer>
      </AspectRatio>
    </ChartCard>
  );
}
