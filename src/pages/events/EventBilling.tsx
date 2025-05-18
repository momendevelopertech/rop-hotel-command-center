
import React, { useState } from "react";
import { SubPageLayout } from "@/components/shared/SubPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { DataTable, Column } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { EventBillingStats } from "@/components/events/EventBillingStats";
import { ViewEventInvoiceModal } from "@/components/events/ViewEventInvoiceModal";
import { AddEventPaymentModal } from "@/components/events/AddEventPaymentModal";
import { StyledAddButton } from "@/components/shared/StyledAddButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { 
  Search, 
  MoreHorizontal, 
  Calendar, 
  Filter, 
  FileText, 
  CreditCard,
  Printer,
  Mail,
  Party,
  Users
} from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/components/ui/use-toast";

// Define a type for event invoice data
interface EventInvoice {
  id: string;
  eventName: string;
  clientName: string;
  eventDate: string;
  totalAmount: number;
  paidAmount: number;
  balanceAmount: number;
  dueDate: string;
  status: "Paid" | "Partial" | "Unpaid" | "Overdue" | "Cancelled";
  invoiceDate: string;
  items: EventInvoiceItem[];
}

interface EventInvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  discount?: number;
  subtotal: number;
  taxable: boolean;
}

export default function EventBilling() {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  // Modal states
  const [viewInvoiceModalOpen, setViewInvoiceModalOpen] = useState(false);
  const [addPaymentModalOpen, setAddPaymentModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<EventInvoice | null>(null);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [clientFilter, setClientFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  
  // Sample event invoice data
  const eventInvoices: EventInvoice[] = [
    {
      id: "EV-INV-2025-001",
      eventName: "Military Awards Ceremony",
      clientName: "Defense Ministry",
      eventDate: "2025-06-15",
      totalAmount: 8500,
      paidAmount: 8500,
      balanceAmount: 0,
      dueDate: "2025-06-01",
      status: "Paid",
      invoiceDate: "2025-05-01",
      items: [
        { id: "ITEM-001", description: "Hall Rental (Grand Ballroom)", quantity: 1, unitPrice: 3000, subtotal: 3000, taxable: true },
        { id: "ITEM-002", description: "Catering - Full Service (150 persons)", quantity: 150, unitPrice: 25, subtotal: 3750, taxable: true },
        { id: "ITEM-003", description: "Stage Setup", quantity: 1, unitPrice: 800, subtotal: 800, taxable: true },
        { id: "ITEM-004", description: "Audio/Visual Equipment", quantity: 1, unitPrice: 950, subtotal: 950, taxable: true }
      ]
    },
    {
      id: "EV-INV-2025-002",
      eventName: "Officers Family Day",
      clientName: "Officers Association",
      eventDate: "2025-06-25",
      totalAmount: 12200,
      paidAmount: 6100,
      balanceAmount: 6100,
      dueDate: "2025-06-10",
      status: "Partial",
      invoiceDate: "2025-05-15",
      items: [
        { id: "ITEM-001", description: "Venue Rental (Gardens)", quantity: 1, unitPrice: 4500, subtotal: 4500, taxable: true },
        { id: "ITEM-002", description: "Catering - BBQ Buffet (200 persons)", quantity: 200, unitPrice: 30, subtotal: 6000, taxable: true },
        { id: "ITEM-003", description: "Kids Entertainment", quantity: 1, unitPrice: 1200, subtotal: 1200, taxable: true },
        { id: "ITEM-004", description: "Photography Service", quantity: 1, unitPrice: 500, subtotal: 500, taxable: true }
      ]
    },
    {
      id: "EV-INV-2025-003",
      eventName: "Strategic Planning Conference",
      clientName: "Joint Command",
      eventDate: "2025-06-30",
      totalAmount: 5700,
      paidAmount: 0,
      balanceAmount: 5700,
      dueDate: "2025-06-20",
      status: "Unpaid",
      invoiceDate: "2025-05-20",
      items: [
        { id: "ITEM-001", description: "Conference Room Rental", quantity: 1, unitPrice: 2200, subtotal: 2200, taxable: true },
        { id: "ITEM-002", description: "Coffee Breaks & Refreshments (30 persons x 2 days)", quantity: 60, unitPrice: 15, subtotal: 900, taxable: true },
        { id: "ITEM-003", description: "Lunch Service (30 persons x 2 days)", quantity: 60, unitPrice: 28, subtotal: 1680, taxable: true },
        { id: "ITEM-004", description: "Conference Equipment", quantity: 1, unitPrice: 920, subtotal: 920, taxable: true }
      ]
    },
    {
      id: "EV-INV-2025-004",
      eventName: "Leadership Workshop",
      clientName: "Officer Training Institute",
      eventDate: "2025-05-10",
      totalAmount: 3800,
      paidAmount: 0,
      balanceAmount: 3800,
      dueDate: "2025-04-25",
      status: "Overdue",
      invoiceDate: "2025-04-01",
      items: [
        { id: "ITEM-001", description: "Training Room Rental", quantity: 1, unitPrice: 1500, subtotal: 1500, taxable: true },
        { id: "ITEM-002", description: "Catering - Lunch & Refreshments (40 persons)", quantity: 40, unitPrice: 35, subtotal: 1400, taxable: true },
        { id: "ITEM-003", description: "Workshop Materials", quantity: 40, unitPrice: 15, subtotal: 600, taxable: true },
        { id: "ITEM-004", description: "Projector & Equipment", quantity: 1, unitPrice: 300, subtotal: 300, taxable: true }
      ]
    },
    {
      id: "EV-INV-2025-005",
      eventName: "Military Promotion Ceremony",
      clientName: "Military Personnel Department",
      eventDate: "2025-06-05",
      totalAmount: 6500,
      paidAmount: 6500,
      balanceAmount: 0,
      dueDate: "2025-05-20",
      status: "Paid",
      invoiceDate: "2025-05-01",
      items: [
        { id: "ITEM-001", description: "Ceremony Hall Rental", quantity: 1, unitPrice: 2500, subtotal: 2500, taxable: true },
        { id: "ITEM-002", description: "Catering - Coffee & Dessert (100 persons)", quantity: 100, unitPrice: 20, subtotal: 2000, taxable: true },
        { id: "ITEM-003", description: "Decoration & Stage Setup", quantity: 1, unitPrice: 1200, subtotal: 1200, taxable: true },
        { id: "ITEM-004", description: "Audio/Visual Services", quantity: 1, unitPrice: 800, subtotal: 800, taxable: true }
      ]
    },
    {
      id: "EV-INV-2025-006",
      eventName: "Naval Officers Dinner",
      clientName: "Navy Command",
      eventDate: "2025-05-20",
      totalAmount: 7800,
      paidAmount: 0,
      balanceAmount: 0,
      dueDate: "2025-05-10",
      status: "Cancelled",
      invoiceDate: "2025-04-15",
      items: [
        { id: "ITEM-001", description: "Private Dining Room", quantity: 1, unitPrice: 1800, subtotal: 1800, taxable: true },
        { id: "ITEM-002", description: "Fine Dining Menu (60 persons)", quantity: 60, unitPrice: 75, subtotal: 4500, taxable: true },
        { id: "ITEM-003", description: "Premium Beverage Package", quantity: 60, unitPrice: 20, subtotal: 1200, taxable: true },
        { id: "ITEM-004", description: "Special Decoration", quantity: 1, unitPrice: 300, subtotal: 300, taxable: true }
      ]
    },
    {
      id: "EV-INV-2025-007",
      eventName: "Aviation Day Celebration",
      clientName: "Air Force Division",
      eventDate: "2025-06-18",
      totalAmount: 15200,
      paidAmount: 7600,
      balanceAmount: 7600,
      dueDate: "2025-06-05",
      status: "Partial",
      invoiceDate: "2025-05-12",
      items: [
        { id: "ITEM-001", description: "Outdoor Venue & Tent Setup", quantity: 1, unitPrice: 5500, subtotal: 5500, taxable: true },
        { id: "ITEM-002", description: "Catering - Full Day Service (250 persons)", quantity: 250, unitPrice: 32, subtotal: 8000, taxable: true },
        { id: "ITEM-003", description: "Sound System", quantity: 1, unitPrice: 1200, subtotal: 1200, taxable: true },
        { id: "ITEM-004", description: "Event Staff (4 persons)", quantity: 4, unitPrice: 125, subtotal: 500, taxable: true }
      ]
    }
  ];
  
  // Filtered data
  const filteredInvoices = eventInvoices.filter(invoice => {
    const matchesSearch = invoice.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          invoice.eventName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          invoice.clientName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClient = clientFilter ? invoice.clientName === clientFilter : true;
    const matchesStatus = statusFilter ? invoice.status === statusFilter : true;
    const matchesDate = dateFilter ? invoice.eventDate === dateFilter || invoice.invoiceDate === dateFilter : true;
    
    return matchesSearch && matchesClient && matchesStatus && matchesDate;
  });
  
  // Handler to view invoice details
  const handleViewInvoice = (invoice: EventInvoice) => {
    setSelectedInvoice(invoice);
    setViewInvoiceModalOpen(true);
  };
  
  // Handler to add payment
  const handleAddPayment = (invoice: EventInvoice) => {
    setSelectedInvoice(invoice);
    setAddPaymentModalOpen(true);
  };
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-OM', { 
      style: 'currency', 
      currency: 'OMR',
      minimumFractionDigits: 3
    }).format(amount);
  };
  
  // Status badge color mapping
  const getStatusType = (status: string) => {
    switch(status) {
      case "Paid": return "success";
      case "Partial": return "warning";
      case "Unpaid": return "info";
      case "Overdue": return "danger";
      case "Cancelled": return "danger";
      default: return "info";
    }
  };
  
  // Table columns definition
  const columns: Column<EventInvoice>[] = [
    { header: "Invoice ID", accessor: "id" },
    { 
      header: "Event", 
      accessor: "eventName",
      cell: (invoice: EventInvoice) => (
        <div>
          <p className="font-medium">{invoice.eventName}</p>
          <p className="text-xs text-gray-500">{format(new Date(invoice.eventDate), "MMM dd, yyyy")}</p>
        </div>
      )
    },
    { header: "Client", accessor: "clientName" },
    { 
      header: "Total", 
      accessor: "totalAmount",
      cell: (invoice: EventInvoice) => formatCurrency(invoice.totalAmount)
    },
    { 
      header: "Paid", 
      accessor: "paidAmount",
      cell: (invoice: EventInvoice) => formatCurrency(invoice.paidAmount)
    },
    { 
      header: "Balance", 
      accessor: "balanceAmount",
      cell: (invoice: EventInvoice) => formatCurrency(invoice.balanceAmount)
    },
    { 
      header: "Due Date", 
      accessor: "dueDate",
      cell: (invoice: EventInvoice) => format(new Date(invoice.dueDate), "MMM dd, yyyy")
    },
    { 
      header: "Status", 
      accessor: "status",
      cell: (invoice: EventInvoice) => (
        <StatusBadge 
          status={t(invoice.status)}
          type={getStatusType(invoice.status)}
        />
      )
    },
    { 
      header: "Actions", 
      accessor: (invoice) => invoice.id,
      cell: (invoice: EventInvoice) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleViewInvoice(invoice)}>
              <FileText className="mr-2 h-4 w-4" />
              {t("View Invoice")}
            </DropdownMenuItem>
            {(invoice.status === "Partial" || invoice.status === "Unpaid" || invoice.status === "Overdue") && (
              <DropdownMenuItem onClick={() => handleAddPayment(invoice)}>
                <CreditCard className="mr-2 h-4 w-4" />
                {t("Add Payment")}
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => {
              toast({
                title: t("Invoice Printed"),
                description: t("Event invoice {{id}} sent to printer", { id: invoice.id })
              });
            }}>
              <Printer className="mr-2 h-4 w-4" />
              {t("Print")}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => {
              toast({
                title: t("Email Sent"),
                description: t("Event invoice {{id}} has been emailed to the client", { id: invoice.id })
              });
            }}>
              <Mail className="mr-2 h-4 w-4" />
              {t("Email Invoice")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  ];
  
  return (
    <SubPageLayout
      title={t("Event Billing")}
      subtitle={t("Manage invoices and payments for events")}
      parentLink="/events"
      parentTitle={t("Event Management")}
    >
      <div className="mb-6">
        <EventBillingStats />
      </div>
      
      <Card>
        <CardHeader className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <CardTitle>{t("Event Invoices")}</CardTitle>
          
          <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder={t("Search invoices...")}
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Users size={16} />
                    {t("Client")}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  {Array.from(new Set(eventInvoices.map(invoice => invoice.clientName))).map((client) => (
                    <DropdownMenuItem key={client} onClick={() => setClientFilter(client)}>
                      {client}
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setClientFilter("")}>
                    {t("All Clients")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Filter size={16} />
                    {t("Status")}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={() => setStatusFilter("Paid")}>
                    {t("Paid")}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("Partial")}>
                    {t("Partial")}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("Unpaid")}>
                    {t("Unpaid")}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("Overdue")}>
                    {t("Overdue")}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("Cancelled")}>
                    {t("Cancelled")}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setStatusFilter("")}>
                    {t("All Statuses")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Calendar size={16} />
                    {t("Date")}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="p-2">
                    <Input
                      type="date"
                      value={dateFilter}
                      onChange={(e) => setDateFilter(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  {dateFilter && (
                    <DropdownMenuItem onClick={() => setDateFilter("")}>
                      {t("Clear Date Filter")}
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
              
              <StyledAddButton 
                label={t("Create Invoice")} 
                onClick={() => {
                  toast({
                    title: t("Create Event Invoice"),
                    description: t("Creating a new event invoice")
                  });
                  // In a real app, we would open a modal to create a new invoice
                }}
              />
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <DataTable
            data={filteredInvoices}
            columns={columns}
            className="mt-4"
          />
        </CardContent>
      </Card>
      
      {/* Modals */}
      <ViewEventInvoiceModal 
        open={viewInvoiceModalOpen} 
        onOpenChange={setViewInvoiceModalOpen} 
        invoice={selectedInvoice}
      />
      
      <AddEventPaymentModal 
        open={addPaymentModalOpen} 
        onOpenChange={setAddPaymentModalOpen} 
        invoice={selectedInvoice}
      />
    </SubPageLayout>
  );
}
