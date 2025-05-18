import React, { useState } from "react";
import { SubPageLayout } from "@/components/shared/SubPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { DataTable, Column } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { InvoicePaymentStats } from "@/components/finance/InvoicePaymentStats";
import { ViewInvoiceModal } from "@/components/finance/ViewInvoiceModal";
import { AddPaymentModal } from "@/components/finance/AddPaymentModal";
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
  Mail
} from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/components/ui/use-toast";

// Define a type for invoice data
interface Invoice {
  id: string;
  client: string;
  event?: string;
  total: number;
  paid: number;
  due: number;
  dueDate: string;
  status: "Paid" | "Partial" | "Unpaid" | "Overdue" | "Cancelled";
  createdAt: string;
}

export default function InvoicesPayments() {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  // Modal states
  const [viewInvoiceModalOpen, setViewInvoiceModalOpen] = useState(false);
  const [addPaymentModalOpen, setAddPaymentModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [clientFilter, setClientFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  
  // Sample invoice data
  const invoices: Invoice[] = [
    {
      id: "INV-2025-001",
      client: "Defense Ministry",
      event: "Military Award Ceremony",
      total: 5600,
      paid: 5600,
      due: 0,
      dueDate: "2025-06-15",
      status: "Paid",
      createdAt: "2025-05-15"
    },
    {
      id: "INV-2025-002",
      client: "Officers Association",
      event: "Officers Family Day",
      total: 8200,
      paid: 4100,
      due: 4100,
      dueDate: "2025-06-25",
      status: "Partial",
      createdAt: "2025-05-20"
    },
    {
      id: "INV-2025-003",
      client: "Joint Command",
      event: "Strategic Meeting",
      total: 3500,
      paid: 0,
      due: 3500,
      dueDate: "2025-06-30",
      status: "Unpaid",
      createdAt: "2025-05-22"
    },
    {
      id: "INV-2025-004",
      client: "Officer Training Institute",
      event: "Leadership Workshop",
      total: 4800,
      paid: 0,
      due: 4800,
      dueDate: "2025-05-10",
      status: "Overdue",
      createdAt: "2025-04-25"
    },
    {
      id: "INV-2025-005",
      client: "Military Personnel Department",
      event: "Military Promotion Ceremony",
      total: 6200,
      paid: 6200,
      due: 0,
      dueDate: "2025-06-05",
      status: "Paid",
      createdAt: "2025-05-28"
    },
    {
      id: "INV-2025-006",
      client: "Navy Command",
      event: "Naval Officers Dinner",
      total: 4500,
      paid: 0,
      due: 0,
      dueDate: "2025-05-20",
      status: "Cancelled",
      createdAt: "2025-05-01"
    },
    {
      id: "INV-2025-007",
      client: "Air Force Division",
      event: "Aviation Day Celebration",
      total: 7800,
      paid: 3900,
      due: 3900,
      dueDate: "2025-06-18",
      status: "Partial",
      createdAt: "2025-05-30"
    }
  ];
  
  // Filtered data
  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         invoice.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (invoice.event && invoice.event.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesClient = clientFilter ? invoice.client === clientFilter : true;
    const matchesStatus = statusFilter ? invoice.status === statusFilter : true;
    const matchesDate = dateFilter ? invoice.createdAt === dateFilter || invoice.dueDate === dateFilter : true;
    
    return matchesSearch && matchesClient && matchesStatus && matchesDate;
  });
  
  // Handler to view invoice details
  const handleViewInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setViewInvoiceModalOpen(true);
  };
  
  // Handler to add payment
  const handleAddPayment = (invoice: Invoice) => {
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
  const columns: Column<Invoice>[] = [
    { header: "Invoice ID", accessor: "id" },
    { header: "Client", accessor: "client" },
    { header: "Event", accessor: (invoice) => invoice.event || "" },
    { 
      header: "Total", 
      accessor: "total",
      cell: (invoice: Invoice) => formatCurrency(invoice.total)
    },
    { 
      header: "Paid", 
      accessor: "paid",
      cell: (invoice: Invoice) => formatCurrency(invoice.paid)
    },
    { 
      header: "Due", 
      accessor: "due",
      cell: (invoice: Invoice) => formatCurrency(invoice.due)
    },
    { 
      header: "Due Date", 
      accessor: "dueDate",
      cell: (invoice: Invoice) => format(new Date(invoice.dueDate), "MMM dd, yyyy")
    },
    { 
      header: "Status", 
      accessor: "status",
      cell: (invoice: Invoice) => (
        <StatusBadge 
          status={t(invoice.status)}
          type={getStatusType(invoice.status)}
        />
      )
    },
    { 
      header: "Actions", 
      accessor: (invoice) => invoice.id,
      cell: (invoice: Invoice) => (
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
                description: t("Invoice {{id}} sent to printer", { id: invoice.id })
              });
            }}>
              <Printer className="mr-2 h-4 w-4" />
              {t("Print")}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => {
              toast({
                title: t("Email Sent"),
                description: t("Invoice {{id}} has been emailed to the client", { id: invoice.id })
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
      title={t("Invoices & Payments")}
      subtitle={t("Manage billing and payment processing")}
      parentLink="/finance"
      parentTitle={t("Finance & Reports")}
    >
      <div className="mb-6">
        <InvoicePaymentStats />
      </div>
      
      <Card>
        <CardHeader className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <CardTitle>{t("All Invoices")}</CardTitle>
          
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
                    <Calendar size={16} />
                    {t("Client")}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  {Array.from(new Set(invoices.map(invoice => invoice.client))).map((client) => (
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
                    title: t("Create Invoice"),
                    description: t("Creating a new invoice")
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
      <ViewInvoiceModal 
        open={viewInvoiceModalOpen} 
        onOpenChange={setViewInvoiceModalOpen} 
        invoice={selectedInvoice}
      />
      
      <AddPaymentModal 
        open={addPaymentModalOpen} 
        onOpenChange={setAddPaymentModalOpen} 
        invoice={selectedInvoice}
      />
    </SubPageLayout>
  );
}
