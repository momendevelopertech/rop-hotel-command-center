
import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { DataTable } from '@/components/shared/DataTable';
import { Booking } from '@/contexts/DataContext';
import { useData } from '@/contexts/DataContext';

// Define the column type for the DataTable
type Column<T> = {
  header: string;
  accessor: keyof T | ((item: T) => any);
  cell?: (item: T) => React.ReactNode;
};

const GuestManagement = () => {
  const { bookings, setBookings } = useData();
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');

  // Define columns with proper typing for the DataTable
  const columns: Column<Booking>[] = [
    { 
      header: 'ID', 
      accessor: 'id' as keyof Booking 
    },
    { 
      header: 'Name', 
      accessor: 'name' as keyof Booking 
    },
    { 
      header: 'Rank', 
      accessor: 'rank' as keyof Booking 
    },
    { 
      header: 'Room', 
      accessor: 'room' as keyof Booking 
    },
    { 
      header: 'Check In', 
      accessor: 'checkIn' as keyof Booking 
    },
    { 
      header: 'Check Out', 
      accessor: 'checkOut' as keyof Booking 
    },
    { 
      header: 'Status', 
      accessor: 'status' as keyof Booking,
      cell: (booking: Booking) => (
        <span className={`badge ${booking.status === 'Confirmed' ? 'badge-success' : (booking.status === 'Checked In' ? 'badge-primary' : 'badge-warning')}`}>
          {booking.status}
        </span>
      ) 
    },
    { 
      header: 'Actions', 
      accessor: (booking: Booking) => booking.id,
      cell: (booking: Booking) => (
        <div className="space-x-2">
          <button className="btn btn-sm btn-primary">View</button>
          <button className="btn btn-sm btn-secondary">Edit</button>
          <button className="btn btn-sm btn-danger">Delete</button>
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
    if (window.confirm('Are you sure you want to delete this booking?')) {
      setBookings(bookings.filter(booking => booking.id !== id));
    }
  };

  const handleSaveBooking = (booking: Booking) => {
    if (modalMode === 'add') {
      const newId = Math.max(...bookings.map(b => b.id), 0) + 1;
      setBookings([...bookings, { ...booking, id: newId }]);
    } else {
      setBookings(bookings.map(b => b.id === booking.id ? booking : b));
    }
    setIsModalOpen(false);
  };

  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Guest Management</h1>
        <p className="text-gray-600">Manage room bookings and guest information</p>
      </div>

      <div className="mb-4 flex justify-end">
        <button className="btn btn-primary">Add New Booking</button>
      </div>
      
      <DataTable 
        data={bookings}
        columns={columns}
        title="Guest Bookings"
        searchField="name"
      />
      
      {/* Modal and other components would go here */}
    </AppLayout>
  );
};

export default GuestManagement;
