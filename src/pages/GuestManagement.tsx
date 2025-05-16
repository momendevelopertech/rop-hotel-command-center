
import React, { useState, useEffect } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { DataTable } from '@/components/shared/DataTable';
import { Booking } from '@/contexts/DataContext';
import { useData } from '@/contexts/DataContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRopDataService } from '@/utils/ropDataService';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { SubPageNavigation } from '@/components/shared/SubPageNavigation';
import { StyledAddButton } from '@/components/shared/StyledAddButton';

// Define the column type for the DataTable
type Column<T> = {
  header: string;
  accessor: keyof T | ((item: T) => any);
  cell?: (item: T) => React.ReactNode;
};

const GuestManagement = () => {
  const { bookings: originalBookings, setBookings } = useData();
  const { t } = useLanguage();
  const { translateBooking } = useRopDataService();
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [translatedBookings, setTranslatedBookings] = useState<Booking[]>([]);

  // Sub-page links for navigation
  const subPageLinks = [
    { title: "Room Booking", href: "room-booking", description: "Manage room reservations for officers" },
    { title: "Check-in / Check-out", href: "check-in-out", description: "Process guest arrivals and departures" },
    { title: "Guest Services", href: "guest-services", description: "Manage guest services and requests" },
    { title: "Maintenance Requests", href: "maintenance-requests", description: "Track and assign maintenance tasks" },
    { title: "Billing & Payments", href: "billing-payments", description: "Process payment transactions" },
  ];

  // Translate bookings whenever language changes
  useEffect(() => {
    const translated = originalBookings.map(booking => translateBooking(booking));
    setTranslatedBookings(translated);
  }, [originalBookings, translateBooking]);

  // Define columns with proper typing for the DataTable
  const columns: Column<Booking>[] = [
    { header: "ID", accessor: "id" },
    { header: "Name", accessor: "name" },
    { header: "Rank", accessor: "rank" },
    { header: "Room", accessor: "room" },
    { header: "Check In", accessor: "checkIn" },
    { header: "Check Out", accessor: "checkOut" },
    { 
      header: "Status", 
      accessor: "status",
      cell: (booking: Booking) => <StatusBadge status={booking.status} />
    },
    { 
      header: "Actions", 
      accessor: (booking: Booking) => booking.id,
      cell: (booking: Booking) => (
        <div className="space-x-2">
          <button className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200">{t("View")}</button>
          <button className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200">{t("Edit")}</button>
          <button className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200">{t("Delete")}</button>
        </div>
      ) 
    }
  ];

  const handleAddBooking = () => {
    setModalMode('add');
    setSelectedBooking(null);
    setIsModalOpen(true);
  };

  const handleEditBooking = (booking: Booking) => {
    setModalMode('edit');
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const handleDeleteBooking = (id: number) => {
    if (window.confirm(t('Are you sure you want to delete this booking?'))) {
      setBookings(originalBookings.filter(booking => booking.id !== id));
    }
  };

  return (
    <AppLayout>
      <PageHeader
        title={t("Guest Management")}
        subtitle={t("Military personnel currently accommodated")}
      />

      {/* Sub-page navigation */}
      <SubPageNavigation links={subPageLinks} baseUrl="/guest-management" />

      <div className="mb-4 flex justify-end">
        <StyledAddButton label="Add New Booking" />
      </div>
      
      <DataTable 
        data={translatedBookings}
        columns={columns}
        title={t("Guest Bookings")}
        searchField="name"
      />
    </AppLayout>
  );
};

export default GuestManagement;
