
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { PlusCircle } from "lucide-react";
import { DataTable } from "@/components/shared/DataTable";
import { FormModal } from "@/components/shared/FormModal";
import { ConfirmationDialog } from "@/components/shared/ConfirmationDialog";
import { useData, Booking, OfficerRank } from "@/contexts/DataContext";
import { useToast } from "@/hooks/use-toast";

const GuestManagement = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { bookings, setBookings } = useData();
  
  // State for modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [currentBooking, setCurrentBooking] = useState<Booking | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState<Partial<Booking>>({
    name: "",
    rank: "Officer",
    room: "",
    checkIn: "",
    checkOut: "",
    status: "Confirmed",
    emergencyFlag: false,
    notes: ""
  });
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };
  
  // Handle switch changes
  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData({ ...formData, [name]: checked });
  };
  
  // Handle form submission for adding a booking
  const handleAddBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const newBooking: Booking = {
        id: bookings.length > 0 ? Math.max(...bookings.map(b => b.id)) + 1 : 1,
        name: formData.name || "",
        rank: formData.rank as OfficerRank,
        room: formData.room || "",
        checkIn: formData.checkIn || "",
        checkOut: formData.checkOut || "",
        status: formData.status || "Confirmed",
        emergencyFlag: formData.emergencyFlag || false,
        notes: formData.notes
      };
      
      setBookings([...bookings, newBooking]);
      setIsSubmitting(false);
      setIsAddModalOpen(false);
      resetForm();
      
      toast({
        title: "Booking Added",
        description: `Booking for ${newBooking.name} has been added successfully.`
      });
    }, 1000);
  };
  
  // Handle form submission for editing a booking
  const handleEditBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      if (currentBooking) {
        const updatedBookings = bookings.map(booking => 
          booking.id === currentBooking.id 
            ? { ...booking, ...formData } 
            : booking
        );
        
        setBookings(updatedBookings);
        setIsSubmitting(false);
        setIsEditModalOpen(false);
        resetForm();
        
        toast({
          title: "Booking Updated",
          description: `Booking for ${formData.name} has been updated successfully.`
        });
      }
    }, 1000);
  };
  
  // Handle delete booking
  const handleDeleteBooking = () => {
    if (currentBooking) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        const updatedBookings = bookings.filter(
          booking => booking.id !== currentBooking.id
        );
        
        setBookings(updatedBookings);
        setIsSubmitting(false);
        setIsDeleteModalOpen(false);
        
        toast({
          title: "Booking Deleted",
          description: `Booking for ${currentBooking.name} has been deleted successfully.`,
          variant: "destructive"
        });
      }, 1000);
    }
  };
  
  // Open edit modal
  const openEditModal = (booking: Booking) => {
    setCurrentBooking(booking);
    setFormData(booking);
    setIsEditModalOpen(true);
  };
  
  // Open delete modal
  const openDeleteModal = (booking: Booking) => {
    setCurrentBooking(booking);
    setIsDeleteModalOpen(true);
  };
  
  // Open QR code modal
  const openQRModal = (booking: Booking) => {
    setCurrentBooking(booking);
    setIsQRModalOpen(true);
  };
  
  // Reset form
  const resetForm = () => {
    setFormData({
      name: "",
      rank: "Officer",
      room: "",
      checkIn: "",
      checkOut: "",
      status: "Confirmed",
      emergencyFlag: false,
      notes: ""
    });
    setCurrentBooking(null);
  };
  
  // Table columns
  const columns = [
    {
      header: "ID",
      accessor: "id",
    },
    {
      header: "Officer Name",
      accessor: "name",
    },
    {
      header: "Rank",
      accessor: "rank",
      cell: (booking: Booking) => {
        const badgeClass = booking.rank === "Command" 
          ? "rop-badge rop-badge-purple"
          : booking.rank === "Officer"
            ? "rop-badge rop-badge-blue"
            : "rop-badge rop-badge-green";
            
        return <span className={badgeClass}>{booking.rank}</span>;
      },
    },
    {
      header: "Room Type",
      accessor: "room",
    },
    {
      header: "Check-In",
      accessor: "checkIn",
    },
    {
      header: "Check-Out",
      accessor: "checkOut",
    },
    {
      header: "Status",
      accessor: "status",
      cell: (booking: Booking) => {
        const statusClass = 
          booking.status === "Confirmed"
            ? "rop-badge rop-badge-blue"
            : booking.status === "Checked In"
            ? "rop-badge rop-badge-green"
            : booking.status === "Checked Out"
            ? "rop-badge rop-badge-purple"
            : "rop-badge rop-badge-red";
            
        return <span className={statusClass}>{booking.status}</span>;
      },
    },
    {
      header: "Actions",
      accessor: (booking: Booking) => booking.id,
      cell: (booking: Booking) => (
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm" onClick={() => openQRModal(booking)}>
            QR
          </Button>
          <Button variant="ghost" size="sm" onClick={() => openEditModal(booking)}>
            Edit
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-red-500 hover:text-red-700" 
            onClick={() => openDeleteModal(booking)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <AppLayout>
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">Military-Smart Guest Management</h1>
            <p className="text-gray-600">Manage bookings for officers and cadets</p>
          </div>
          <Button 
            onClick={() => setIsAddModalOpen(true)}
            className="mt-4 md:mt-0"
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Booking
          </Button>
        </div>
        
        {/* Booking stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
          <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <div className="text-sm font-medium text-gray-500">Total Bookings</div>
            <div className="text-2xl font-bold">{bookings.length}</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <div className="text-sm font-medium text-gray-500">Checked In</div>
            <div className="text-2xl font-bold">
              {bookings.filter(b => b.status === "Checked In").length}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <div className="text-sm font-medium text-gray-500">Confirmed</div>
            <div className="text-2xl font-bold">
              {bookings.filter(b => b.status === "Confirmed").length}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <div className="text-sm font-medium text-gray-500">Emergency Flag</div>
            <div className="text-2xl font-bold">
              {bookings.filter(b => b.emergencyFlag).length}
            </div>
          </div>
        </div>
        
        {/* Bookings table */}
        <DataTable
          data={bookings}
          columns={columns}
          title="Bookings"
          searchField="name"
        />
      </div>
      
      {/* Add Booking Modal */}
      <FormModal
        title="Add New Booking"
        description="Create a new booking for an officer or cadet"
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          resetForm();
        }}
        onSubmit={handleAddBooking}
        isSubmitting={isSubmitting}
      >
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Officer Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name || ""}
              onChange={handleInputChange}
              placeholder="Enter officer name"
              required
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="rank">Rank</Label>
            <Select
              value={formData.rank}
              onValueChange={(value) => handleSelectChange("rank", value)}
            >
              <SelectTrigger id="rank">
                <SelectValue placeholder="Select rank" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Cadet">Cadet</SelectItem>
                <SelectItem value="Officer">Officer</SelectItem>
                <SelectItem value="Command">Command</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="room">Room Type</Label>
            <Select
              value={formData.room}
              onValueChange={(value) => handleSelectChange("room", value)}
            >
              <SelectTrigger id="room">
                <SelectValue placeholder="Select room type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Standard">Standard</SelectItem>
                <SelectItem value="Premium">Premium</SelectItem>
                <SelectItem value="Suite">Suite</SelectItem>
                <SelectItem value="Executive Suite">Executive Suite</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="checkIn">Check-In Date</Label>
              <Input
                id="checkIn"
                name="checkIn"
                type="date"
                value={formData.checkIn || ""}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="checkOut">Check-Out Date</Label>
              <Input
                id="checkOut"
                name="checkOut"
                type="date"
                value={formData.checkOut || ""}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => handleSelectChange("status", value)}
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Confirmed">Confirmed</SelectItem>
                <SelectItem value="Checked In">Checked In</SelectItem>
                <SelectItem value="Checked Out">Checked Out</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="emergencyFlag"
              checked={formData.emergencyFlag || false}
              onCheckedChange={(checked) => handleSwitchChange("emergencyFlag", checked)}
            />
            <Label htmlFor="emergencyFlag">Emergency Flag</Label>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Input
              id="notes"
              name="notes"
              value={formData.notes || ""}
              onChange={handleInputChange}
              placeholder="Enter any additional notes"
            />
          </div>
        </div>
      </FormModal>
      
      {/* Edit Booking Modal */}
      <FormModal
        title="Edit Booking"
        description="Update booking details"
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          resetForm();
        }}
        onSubmit={handleEditBooking}
        isSubmitting={isSubmitting}
      >
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Officer Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name || ""}
              onChange={handleInputChange}
              placeholder="Enter officer name"
              required
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="rank">Rank</Label>
            <Select
              value={formData.rank}
              onValueChange={(value) => handleSelectChange("rank", value)}
            >
              <SelectTrigger id="rank">
                <SelectValue placeholder="Select rank" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Cadet">Cadet</SelectItem>
                <SelectItem value="Officer">Officer</SelectItem>
                <SelectItem value="Command">Command</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="room">Room Type</Label>
            <Select
              value={formData.room}
              onValueChange={(value) => handleSelectChange("room", value)}
            >
              <SelectTrigger id="room">
                <SelectValue placeholder="Select room type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Standard">Standard</SelectItem>
                <SelectItem value="Premium">Premium</SelectItem>
                <SelectItem value="Suite">Suite</SelectItem>
                <SelectItem value="Executive Suite">Executive Suite</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="checkIn">Check-In Date</Label>
              <Input
                id="checkIn"
                name="checkIn"
                type="date"
                value={formData.checkIn || ""}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="checkOut">Check-Out Date</Label>
              <Input
                id="checkOut"
                name="checkOut"
                type="date"
                value={formData.checkOut || ""}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => handleSelectChange("status", value)}
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Confirmed">Confirmed</SelectItem>
                <SelectItem value="Checked In">Checked In</SelectItem>
                <SelectItem value="Checked Out">Checked Out</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="emergencyFlag"
              checked={formData.emergencyFlag || false}
              onCheckedChange={(checked) => handleSwitchChange("emergencyFlag", checked)}
            />
            <Label htmlFor="emergencyFlag">Emergency Flag</Label>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Input
              id="notes"
              name="notes"
              value={formData.notes || ""}
              onChange={handleInputChange}
              placeholder="Enter any additional notes"
            />
          </div>
        </div>
      </FormModal>
      
      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteBooking}
        title="Delete Booking"
        description="Are you sure you want to delete this booking? This action cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        variant="destructive"
      />
      
      {/* QR Code Modal */}
      <FormModal
        title="Contactless Check-In QR Code"
        description="Scan with ROP Mobile App to check in"
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
        onSubmit={(e) => {
          e.preventDefault();
          setIsQRModalOpen(false);
        }}
      >
        <div className="flex flex-col items-center justify-center gap-4 py-4">
          <div className="w-48 h-48 border-2 border-gray-300 rounded-md flex items-center justify-center">
            <img 
              src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=ROP_BOOKING_${currentBooking?.id}`}
              alt="QR Code for Check-In"
              className="w-40 h-40"
            />
          </div>
          <div className="text-center text-sm text-gray-500 mt-4">
            <p>Booking ID: {currentBooking?.id}</p>
            <p>Officer: {currentBooking?.name}</p>
            <p>Room: {currentBooking?.room}</p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => {
              toast({
                title: "QR Code Sent",
                description: "QR code has been sent to the officer's mobile device."
              });
            }}
          >
            Send to Officer
          </Button>
        </div>
      </FormModal>
    </AppLayout>
  );
};

export default GuestManagement;
