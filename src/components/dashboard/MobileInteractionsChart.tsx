
import React, { useEffect, useRef } from 'react';
import { ChartJS } from '@/utils/chartUtils';
import { MobileInteraction } from '@/contexts/DataContext';
import { ChartCard } from './ChartCard';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface MobileInteractionsChartProps {
  interactions: MobileInteraction[];
}

export function MobileInteractionsChart({ interactions }: MobileInteractionsChartProps) {
  const navigate = useNavigate();
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    
    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

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

    const actions = Object.keys(interactionsByAction);
    const data = actions.map(action => interactionsByAction[action]);
    const colors = ['#1E3A8A', '#3B82F6', '#93C5FD', '#BFDBFE', '#60A5FA', '#2563EB'];

    const chart = new ChartJS(ctx, {
      type: 'pie',
      data: {
        labels: actions,
        datasets: [{
          data: data,
          backgroundColor: colors,
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
            labels: {
              boxWidth: 12
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const label = context.label || '';
                const value = context.raw as number;
                const percentage = Math.round((value / interactions.length) * 100);
                return `${label}: ${value} (${percentage}%)`;
              }
            }
          }
        }
      }
    });

    return () => {
      chart.destroy();
    };
  }, [interactions]);

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

  return (
    <ChartCard 
      title="Mobile App Usage" 
      actions={
        <Button variant="outline" size="sm" onClick={() => navigate('/mobile-app')}>
          View Details
        </Button>
      }
    >
      <div className="mb-3 grid grid-cols-2 gap-2 text-xs">
        <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
          <span className="font-medium">Total Interactions:</span> 
          <span className="text-blue-700">{totalInteractions}</span>
        </div>
        <div className="flex items-center justify-between p-2 bg-green-50 rounded">
          <span className="font-medium">Unique Users:</span> 
          <span className="text-green-700">{uniqueUsers}</span>
        </div>
        <div className="flex items-center justify-between p-2 bg-purple-50 rounded">
          <span className="font-medium">Top Device:</span> 
          <span className="text-purple-700">
            {Object.entries(deviceCounts).sort(([, a], [, b]) => b - a)[0]?.[0] || 'N/A'}
          </span>
        </div>
        <div className="flex items-center justify-between p-2 bg-indigo-50 rounded">
          <span className="font-medium">Engagement Rate:</span> 
          <span className="text-indigo-700">{engagementRate}%</span>
        </div>
      </div>
      
      <div className="mb-3 flex justify-between text-xs">
        <div className="p-2 bg-gray-50 rounded">
          <span className="font-medium">Top Actions:</span>
          <div className="mt-1 space-y-1">
            {topActions.map(([action, count], index) => (
              <div key={action} className="flex items-center">
                <div className={`w-2 h-2 rounded-full mr-1 bg-blue-${900 - index * 300}`}></div>
                <span className="truncate max-w-[100px]">{action}: {count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <canvas ref={chartRef}></canvas>
    </ChartCard>
  );
}
