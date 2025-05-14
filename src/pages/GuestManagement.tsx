
import React, { useState, useEffect } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { DataTable } from '@/components/shared/DataTable';
import { Booking } from '@/contexts/DataContext';
import { useData } from '@/contexts/DataContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRopDataService } from '@/utils/ropDataService';
import { PageHeader } from '@/components/shared/PageHeader';

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

  // Translate bookings whenever language changes
  useEffect(() => {
    const translated = originalBookings.map(booking => translateBooking(booking));
    setTranslatedBookings(translated);
  }, [originalBookings, translateBooking]);

  // Define columns with proper typing for the DataTable
  const columns: Column<Booking>[] = [
    { 
      header: t('ID'), 
      accessor: 'id' as keyof Booking 
    },
    { 
      header: t('Name'), 
      accessor: 'name' as keyof Booking 
    },
    { 
      header: t('Rank'), 
      accessor: 'rank' as keyof Booking 
    },
    { 
      header: t('Room'), 
      accessor: 'room' as keyof Booking 
    },
    { 
      header: t('Check In'), 
      accessor: 'checkIn' as keyof Booking 
    },
    { 
      header: t('Check Out'), 
      accessor: 'checkOut' as keyof Booking 
    },
    { 
      header: t('Status'), 
      accessor: 'status' as keyof Booking,
      cell: (booking: Booking) => (
        <span className={`badge ${booking.status === t('Confirmed') ? 'badge-success' : (booking.status === t('Checked In') ? 'badge-primary' : 'badge-warning')}`}>
          {booking.status}
        </span>
      ) 
    },
    { 
      header: t('Actions'), 
      accessor: (booking: Booking) => booking.id,
      cell: (booking: Booking) => (
        <div className="space-x-2">
          <button className="btn btn-sm btn-primary">{t('View')}</button>
          <button className="btn btn-sm btn-secondary">{t('Edit')}</button>
          <button className="btn btn-sm btn-danger">{t('Delete')}</button>
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

  const handleSaveBooking = (booking: Booking) => {
    if (modalMode === 'add') {
      const newId = Math.max(...originalBookings.map(b => b.id), 0) + 1;
      setBookings([...originalBookings, { ...booking, id: newId }]);
    } else {
      setBookings(originalBookings.map(b => b.id === booking.id ? booking : b));
    }
    setIsModalOpen(false);
  };

  return (
    <AppLayout>
      <PageHeader
        title={t("Guest Management")}
        subtitle={t("Military personnel currently accommodated")}
      />

      <div className="mb-4 flex justify-end">
        <button className="btn btn-primary">{t('Add New Booking')}</button>
      </div>
      
      <DataTable 
        data={translatedBookings}
        columns={columns}
        title={t("Guest Bookings")}
        searchField="name"
      />
      
      {/* Modal and other components would go here */}
    </AppLayout>
  );
};

export default GuestManagement;
