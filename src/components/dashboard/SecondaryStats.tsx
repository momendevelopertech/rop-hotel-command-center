
import React from 'react';
import { StatCard } from './StatCard';
import { UserRound, Users, Database, Smartphone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SecondaryStatsProps {
  pendingRenewals: number;
  employeeCount: number;
  lowStockItems: number;
  mobileAppUsers: number;
}

export function SecondaryStats({ 
  pendingRenewals,
  employeeCount, 
  lowStockItems, 
  mobileAppUsers 
}: SecondaryStatsProps) {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard 
        title="Pending Renewals" 
        value={pendingRenewals} 
        icon={<UserRound className="h-6 w-6" />}
        onClick={() => navigate('/membership')}
        description="Officer memberships requiring renewal"
      />
      <StatCard 
        title="Employees" 
        value={employeeCount} 
        icon={<Users className="h-6 w-6" />}
        onClick={() => navigate('/hr')}
        description="Staff across all hotel departments"
      />
      <StatCard 
        title="Low Stock Items" 
        value={lowStockItems} 
        icon={<Database className="h-6 w-6" />}
        trend={{ value: 3, isUpward: true }}
        onClick={() => navigate('/inventory')}
        description="Inventory items requiring restock"
      />
      <StatCard 
        title="Mobile App Users" 
        value={mobileAppUsers} 
        icon={<Smartphone className="h-6 w-6" />}
        trend={{ value: 15, isUpward: true }}
        onClick={() => navigate('/mobile-app')}
        description="Active users on the ROP mobile platform"
      />
    </div>
  );
}
