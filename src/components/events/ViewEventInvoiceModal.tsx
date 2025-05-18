
import React from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { Printer, Download, Mail } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface EventInvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  discount?: number;
  subtotal: number;
  taxable: boolean;
}

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

interface ViewEventInvoiceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invoice: EventInvoice | null;
}

export function ViewEventInvoiceModal({ open, onOpenChange, invoice }: ViewEventInvoiceModalProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  
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
  
  // Calculate VAT (5%)
  const calculateVAT = (subtotal: number) => {
    return subtotal * 0.05;
  };
  
  // Calculate total with VAT
  const calculateTotal = (items: EventInvoiceItem[]) => {
    const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
    const vat = calculateVAT(subtotal);
    return subtotal + vat;
  };
  
  if (!invoice) return null;
  
  const subtotal = invoice.items.reduce((sum, item) => sum + item.subtotal, 0);
  const vat = calculateVAT(subtotal);
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("Event Invoice")} #{invoice.id}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Invoice Header */}
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold">
                {t("Military Officers Club")}
              </h3>
              <p className="text-gray-500">P.O. Box 123, Muscat</p>
              <p className="text-gray-500">Sultanate of Oman</p>
              <p className="text-gray-500">Tel: +968 2412 3456</p>
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end mb-2">
                <StatusBadge 
                  status={t(invoice.status)} 
                  type={getStatusType(invoice.status)}
                />
              </div>
              <p className="text-gray-500">
                {t("Invoice Date")}: {format(new Date(invoice.invoiceDate), "MMM dd, yyyy")}
              </p>
              <p className="text-gray-500">
                {t("Due Date")}: {format(new Date(invoice.dueDate), "MMM dd, yyyy")}
              </p>
              <p className="text-gray-500">{t("Invoice")} #{invoice.id}</p>
            </div>
          </div>
          
          <Separator />
          
          {/* Client & Event Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">{t("Bill To")}:</h4>
              <p className="font-semibold">{invoice.clientName}</p>
              <p className="text-gray-500">Muscat, Oman</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">{t("Event Details")}:</h4>
              <p className="font-semibold">{invoice.eventName}</p>
              <p className="text-gray-500">
                {t("Date")}: {format(new Date(invoice.eventDate), "MMMM dd, yyyy")}
              </p>
            </div>
          </div>
          
          {/* Invoice Items */}
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-medium">{t("Description")}</th>
                      <th className="px-4 py-2 text-right text-sm font-medium">{t("Qty")}</th>
                      <th className="px-4 py-2 text-right text-sm font-medium">{t("Unit Price")}</th>
                      <th className="px-4 py-2 text-right text-sm font-medium">{t("Subtotal")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice.items.map((item) => (
                      <tr key={item.id} className="border-t">
                        <td className="px-4 py-3 text-sm">{item.description}</td>
                        <td className="px-4 py-3 text-sm text-right">{item.quantity}</td>
                        <td className="px-4 py-3 text-sm text-right">{formatCurrency(item.unitPrice)}</td>
                        <td className="px-4 py-3 text-sm text-right">{formatCurrency(item.subtotal)}</td>
                      </tr>
                    ))}
                    
                    {/* Summary */}
                    <tr className="border-t">
                      <td colSpan={3} className="px-4 py-2 text-right font-medium">{t("Subtotal")}:</td>
                      <td className="px-4 py-2 text-right">{formatCurrency(subtotal)}</td>
                    </tr>
                    <tr>
                      <td colSpan={3} className="px-4 py-2 text-right font-medium">{t("VAT (5%)")}:</td>
                      <td className="px-4 py-2 text-right">{formatCurrency(vat)}</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td colSpan={3} className="px-4 py-2 text-right font-semibold">{t("Total")}:</td>
                      <td className="px-4 py-2 text-right font-semibold">{formatCurrency(invoice.totalAmount)}</td>
                    </tr>
                    <tr>
                      <td colSpan={3} className="px-4 py-2 text-right font-medium text-green-600">{t("Paid")}:</td>
                      <td className="px-4 py-2 text-right text-green-600">{formatCurrency(invoice.paidAmount)}</td>
                    </tr>
                    {invoice.balanceAmount > 0 && (
                      <tr>
                        <td colSpan={3} className="px-4 py-2 text-right font-semibold text-blue-600">{t("Balance Due")}:</td>
                        <td className="px-4 py-2 text-right font-semibold text-blue-600">{formatCurrency(invoice.balanceAmount)}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          
          {/* Notes */}
          <div>
            <h4 className="font-medium mb-2">{t("Payment Notes")}:</h4>
            <p className="text-gray-600 text-sm">
              {t("Please make payment to Military Officers Club, Bank Muscat, Account #: 0123456789")}
            </p>
            <p className="text-gray-600 text-sm mt-1">
              {t("Reference your invoice number when making payment")}
            </p>
          </div>
        </div>
        
        <DialogFooter className="sm:justify-between gap-4 flex-wrap">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => {
              toast({
                title: t("Invoice Printed"),
                description: t("Event invoice {{id}} sent to printer", { id: invoice.id })
              });
            }}>
              <Printer className="mr-2 h-4 w-4" />
              {t("Print")}
            </Button>
            <Button variant="outline" size="sm" onClick={() => {
              toast({
                title: t("Invoice Downloaded"),
                description: t("Event invoice {{id}} downloaded as PDF", { id: invoice.id })
              });
            }}>
              <Download className="mr-2 h-4 w-4" />
              {t("Download")}
            </Button>
            <Button variant="outline" size="sm" onClick={() => {
              toast({
                title: t("Email Sent"),
                description: t("Event invoice {{id}} has been emailed to the client", { id: invoice.id })
              });
            }}>
              <Mail className="mr-2 h-4 w-4" />
              {t("Email")}
            </Button>
          </div>
          <Button onClick={() => onOpenChange(false)}>
            {t("Close")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
