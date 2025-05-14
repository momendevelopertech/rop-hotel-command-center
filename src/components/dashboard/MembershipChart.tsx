
import React from 'react';
import { Membership } from '@/contexts/DataContext';
import { ChartCard } from './ChartCard';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';
import { useLanguage } from '@/contexts/LanguageContext';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

interface MembershipChartProps {
  memberships: Membership[];
}

export function MembershipChart({ memberships }: MembershipChartProps) {
  const navigate = useNavigate();
  const { t } = useLanguage();

  // Count memberships by status
  const membershipsByStatus = memberships.reduce((acc, member) => {
    acc[member.status] = (acc[member.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Count memberships by rank
  const membershipsByRank = memberships.reduce((acc, member) => {
    acc[member.rank] = (acc[member.rank] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Prepare data for Recharts
  const chartData = Object.entries(membershipsByStatus).map(([name, value]) => ({
    name,
    value
  }));

  // Calculate membership statistics
  const activeMembers = memberships.filter(m => m.status === "Active").length;
  const pendingRenewals = memberships.filter(m => m.status === "Pending Renewal").length;
  const expiredMembers = memberships.filter(m => m.status === "Expired").length;
  
  // Calculate memberships by rank
  const cadetMembers = memberships.filter(m => m.rank === "Cadet").length;
  const officerMembers = memberships.filter(m => m.rank === "Officer").length;
  const commandMembers = memberships.filter(m => m.rank === "Command").length;
  
  // Calculate renewal rate
  const renewalRate = Math.round((activeMembers / memberships.length) * 100);

  // Colors for the pie chart
  const COLORS = ['#1E3A8A', '#3B82F6', '#93C5FD', '#BFDBFE'];

  // Chart config for proper styling
  const chartConfig = {
    memberships: {
      label: "Memberships",
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
    const percentage = Math.round((value / memberships.length) * 100);

    return (
      <div className="bg-white border border-gray-200 shadow-lg p-2 rounded">
        <p className="font-medium">{`${entry.name}: ${value}`}</p>
        <p className="text-sm text-gray-600">{`${percentage}% of total`}</p>
      </div>
    );
  };

  return (
    <ChartCard 
      title={t("Membership Status")} 
      actions={
        <Button variant="outline" size="sm" onClick={() => navigate('/membership')}>
          {t("View Details")}
        </Button>
      }
    >
      <div className="mb-3 grid grid-cols-2 gap-2 text-xs">
        <div className="flex items-center justify-between p-2 bg-green-50 rounded">
          <span className="font-medium">{t("Active")}:</span> 
          <span className="text-green-700">{activeMembers}</span>
        </div>
        <div className="flex items-center justify-between p-2 bg-yellow-50 rounded">
          <span className="font-medium">{t("Pending Renewal")}:</span> 
          <span className="text-yellow-700">{pendingRenewals}</span>
        </div>
        <div className="flex items-center justify-between p-2 bg-red-50 rounded">
          <span className="font-medium">{t("Expired")}:</span> 
          <span className="text-red-700">{expiredMembers}</span>
        </div>
        <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
          <span className="font-medium">{t("Renewal Rate")}:</span> 
          <span className="text-blue-700">{renewalRate}%</span>
        </div>
      </div>
      
      <div className="mb-3 flex justify-end text-xs">
        <div className="flex space-x-3 p-2 bg-gray-50 rounded">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-blue-900 rounded-full mr-1"></div>
            <span>{t("Cadet")}: {cadetMembers}</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-blue-600 rounded-full mr-1"></div>
            <span>{t("Officer")}: {officerMembers}</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-blue-300 rounded-full mr-1"></div>
            <span>{t("Command")}: {commandMembers}</span>
          </div>
        </div>
      </div>
      
      <AspectRatio ratio={16/9} className="mt-2">
        <ChartContainer config={chartConfig} className="w-full h-full">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
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
