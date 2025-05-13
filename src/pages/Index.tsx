
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bed, 
  Utensils, 
  CalendarDays, 
  FileBarChart, 
  UserRound,
  Users,
  Database,
  FileText,
  Smartphone
} from "lucide-react";
import { Card } from '@/components/ui/card';
import { StatCard } from '@/components/dashboard/StatCard';
import { ChartCard } from '@/components/dashboard/ChartCard';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { useData } from '@/contexts/DataContext';
import { Chart, registerables } from 'chart.js';

// Register Chart.js components
Chart.register(...registerables);

const Index = () => {
  const navigate = useNavigate();
  const { 
    bookings, 
    diningOrders, 
    events, 
    transactions, 
    memberships, 
    employees, 
    inventoryItems,
    mobileInteractions,
    reports
  } = useData();
  
  // References for charts
  const bookingChartRef = useRef<HTMLCanvasElement | null>(null);
  const revenueChartRef = useRef<HTMLCanvasElement | null>(null);
  const membershipChartRef = useRef<HTMLCanvasElement | null>(null);
  const interactionsChartRef = useRef<HTMLCanvasElement | null>(null);
  
  // Calculate stats
  const activeBookings = bookings.filter(b => b.status === "Confirmed" || b.status === "Checked In").length;
  const pendingOrders = diningOrders.filter(o => o.status === "Placed" || o.status === "Preparing").length;
  const upcomingEvents = events.filter(e => e.status === "Confirmed" || e.status === "Planned").length;
  const monthlyRevenue = transactions.reduce((sum, t) => sum + t.amount, 0);
  const pendingRenewals = memberships.filter(m => m.status === "Pending Renewal").length;
  const employeeCount = employees.length;
  const lowStockItems = inventoryItems.filter(i => i.quantity <= i.reorderLevel).length;
  const mobileAppUsers = new Set(mobileInteractions.map(i => i.officer)).size;

  // Initialize charts
  useEffect(() => {
    // Booking trends chart
    if (bookingChartRef.current) {
      const bookingsCtx = bookingChartRef.current.getContext('2d');
      
      if (bookingsCtx) {
        // Group bookings by check-in month
        const bookingsByMonth = bookings.reduce((acc, booking) => {
          const month = new Date(booking.checkIn).getMonth();
          acc[month] = (acc[month] || 0) + 1;
          return acc;
        }, {} as Record<number, number>);

        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const data = months.map((_, idx) => bookingsByMonth[idx] || 0);

        new Chart(bookingsCtx, {
          type: 'bar',
          data: {
            labels: months,
            datasets: [{
              label: 'Bookings',
              data: data,
              backgroundColor: '#1E3A8A',
              borderColor: '#1E40AF',
              borderWidth: 1
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
      }
    }
    
    // Revenue trends chart
    if (revenueChartRef.current) {
      const revenueCtx = revenueChartRef.current.getContext('2d');
      
      if (revenueCtx) {
        // Group transactions by month
        const revenueByMonth = transactions.reduce((acc, transaction) => {
          const month = new Date(transaction.date).getMonth();
          acc[month] = (acc[month] || 0) + transaction.amount;
          return acc;
        }, {} as Record<number, number>);

        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const data = months.map((_, idx) => revenueByMonth[idx] || 0);

        new Chart(revenueCtx, {
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
      }
    }
    
    // Membership chart
    if (membershipChartRef.current) {
      const membershipCtx = membershipChartRef.current.getContext('2d');
      
      if (membershipCtx) {
        // Count memberships by status
        const membershipsByStatus = memberships.reduce((acc, member) => {
          acc[member.status] = (acc[member.status] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        const statuses = Object.keys(membershipsByStatus);
        const data = statuses.map(status => membershipsByStatus[status]);
        const colors = ['#1E3A8A', '#3B82F6', '#93C5FD', '#BFDBFE'];

        new Chart(membershipCtx, {
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
      }
    }
    
    // Mobile app interactions chart
    if (interactionsChartRef.current) {
      const interactionsCtx = interactionsChartRef.current.getContext('2d');
      
      if (interactionsCtx) {
        // Count interactions by action
        const interactionsByAction = mobileInteractions.reduce((acc, interaction) => {
          acc[interaction.action] = (acc[interaction.action] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        const actions = Object.keys(interactionsByAction);
        const data = actions.map(action => interactionsByAction[action]);
        const colors = ['#1E3A8A', '#3B82F6', '#93C5FD', '#BFDBFE', '#60A5FA', '#2563EB'];

        new Chart(interactionsCtx, {
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
      }
    }
    
    return () => {
      // Cleanup charts
      Chart.helpers.each(Chart.instances, (instance) => {
        instance.destroy();
      });
    };
  }, [bookings, diningOrders, events, transactions, memberships, mobileInteractions]);

  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome to the Integrated Hotel Management System</p>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard 
          title="Active Bookings" 
          value={activeBookings} 
          icon={<Bed className="h-6 w-6" />}
          trend={{ value: 12, isUpward: true }}
          onClick={() => navigate('/guest-management')}
        />
        <StatCard 
          title="Pending Orders" 
          value={pendingOrders} 
          icon={<Utensils className="h-6 w-6" />}
          trend={{ value: 5, isUpward: false }}
          onClick={() => navigate('/dining')}
        />
        <StatCard 
          title="Upcoming Events" 
          value={upcomingEvents} 
          icon={<CalendarDays className="h-6 w-6" />}
          onClick={() => navigate('/events')}
        />
        <StatCard 
          title="Monthly Revenue" 
          value={`${monthlyRevenue} OMR`} 
          icon={<FileBarChart className="h-6 w-6" />}
          trend={{ value: 8, isUpward: true }}
          onClick={() => navigate('/finance')}
        />
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartCard 
          title="Booking Trends" 
          actions={
            <Button variant="outline" size="sm" onClick={() => navigate('/guest-management')}>
              View Details
            </Button>
          }
        >
          <canvas ref={bookingChartRef}></canvas>
        </ChartCard>
        
        <ChartCard 
          title="Revenue Trends" 
          actions={
            <Button variant="outline" size="sm" onClick={() => navigate('/finance')}>
              View Details
            </Button>
          }
        >
          <canvas ref={revenueChartRef}></canvas>
        </ChartCard>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartCard 
          title="Membership Status" 
          actions={
            <Button variant="outline" size="sm" onClick={() => navigate('/membership')}>
              View Details
            </Button>
          }
        >
          <canvas ref={membershipChartRef}></canvas>
        </ChartCard>
        
        <ChartCard 
          title="Mobile App Usage" 
          actions={
            <Button variant="outline" size="sm" onClick={() => navigate('/mobile-app')}>
              View Details
            </Button>
          }
        >
          <canvas ref={interactionsChartRef}></canvas>
        </ChartCard>
      </div>
      
      {/* Additional stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Pending Renewals" 
          value={pendingRenewals} 
          icon={<UserRound className="h-6 w-6" />}
          onClick={() => navigate('/membership')}
        />
        <StatCard 
          title="Employees" 
          value={employeeCount} 
          icon={<Users className="h-6 w-6" />}
          onClick={() => navigate('/hr')}
        />
        <StatCard 
          title="Low Stock Items" 
          value={lowStockItems} 
          icon={<Database className="h-6 w-6" />}
          trend={{ value: 3, isUpward: true }}
          onClick={() => navigate('/inventory')}
        />
        <StatCard 
          title="Mobile App Users" 
          value={mobileAppUsers} 
          icon={<Smartphone className="h-6 w-6" />}
          trend={{ value: 15, isUpward: true }}
          onClick={() => navigate('/mobile-app')}
        />
      </div>
      
      {/* Recent Reports */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Recent Reports</h2>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate('/reports')}
          >
            View All
          </Button>
        </div>
        <Card>
          <div className="overflow-x-auto">
            <table className="rop-table">
              <thead>
                <tr>
                  <th>Report Type</th>
                  <th>Date Generated</th>
                  <th>Generated By</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {reports.slice(0, 5).map((report) => (
                  <tr key={report.id}>
                    <td className="font-medium">{report.type}</td>
                    <td>{report.date}</td>
                    <td>{report.generatedBy}</td>
                    <td>
                      <Button variant="ghost" size="sm">View</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Index;
