
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
          }
        }
      }
    });

    return () => {
      chart.destroy();
    };
  }, [interactions]);

  return (
    <ChartCard 
      title="Mobile App Usage" 
      actions={
        <Button variant="outline" size="sm" onClick={() => navigate('/mobile-app')}>
          View Details
        </Button>
      }
    >
      <canvas ref={chartRef}></canvas>
    </ChartCard>
  );
}
