
import React, { useEffect, useRef } from 'react';
import { ChartJS } from '@/utils/chartUtils';
import { Membership } from '@/contexts/DataContext';
import { ChartCard } from './ChartCard';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface MembershipChartProps {
  memberships: Membership[];
}

export function MembershipChart({ memberships }: MembershipChartProps) {
  const navigate = useNavigate();
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    
    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    // Count memberships by status
    const membershipsByStatus = memberships.reduce((acc, member) => {
      acc[member.status] = (acc[member.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const statuses = Object.keys(membershipsByStatus);
    const data = statuses.map(status => membershipsByStatus[status]);
    const colors = ['#1E3A8A', '#3B82F6', '#93C5FD', '#BFDBFE'];

    const chart = new ChartJS(ctx, {
      type: 'doughnut',
      data: {
        labels: statuses,
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
  }, [memberships]);

  return (
    <ChartCard 
      title="Membership Status" 
      actions={
        <Button variant="outline" size="sm" onClick={() => navigate('/membership')}>
          View Details
        </Button>
      }
    >
      <canvas ref={chartRef}></canvas>
    </ChartCard>
  );
}
