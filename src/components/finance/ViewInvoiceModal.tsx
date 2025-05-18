
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useLanguage } from "@/contexts/LanguageContext";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Printer, Download, Mail } from "lucide-react";
import { format } from "date-fns";

interface ViewInvoiceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invoice: any | null;
}

export function ViewInvoiceModal({ open, onOpenChange, invoice }: ViewInvoiceModalProps) {
  const { t, dir } = useLanguage();
  
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
  
  // Sample invoice line items
  const invoiceItems = [
    { description: "Venue Rental", quantity: 1, unitPrice: 2200, total: 2200 },
    { description: "Catering Services (per person)", quantity: 45, unitPrice: 25, total: 1125 },
    { description: "Audio/Visual Equipment", quantity: 1, unitPrice: 950, total: 950 },
    { description: "Decoration Services", quantity: 1, unitPrice: 750, total: 750 },
    { description: "Additional Staff", quantity: 4, unitPrice: 75, total: 300 }
  ];
  
  // Sample payment history
  const paymentHistory = [
    { date: "2025-05-20", method: "Bank Transfer", reference: "TR-78452", amount: 2800 },
    { date: "2025-05-27", method: "Credit Card", reference: "CC-12345", amount: 2800 }
  ];
  
  if (!invoice) return null;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("Invoice")} {invoice.id}</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          {/* Invoice Header */}
          <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
            <div className={dir === "rtl" ? "text-right" : ""}>
              <h3 className="font-bold text-lg">{t("Royal Oman Police")}</h3>
              <p className="text-gray-500">{t("Officers Club")}</p>
              <p className="text-gray-500">{t("P.O Box 123, Muscat, Oman")}</p>
              <p className="text-gray-500">{t("Tel")}: +968 2456 7890</p>
            </div>
            <div className={dir === "rtl" ? "text-left" : "text-right"}>
              <h3 className="font-bold">{t("Invoice")} #{invoice.id}</h3>
              <p className="text-gray-500">
                {t("Issue Date")}: {format(new Date(invoice.createdAt), "MMM dd, yyyy")}
              </p>
              <p className="text-gray-500">
                {t("Due Date")}: {format(new Date(invoice.dueDate), "MMM dd, yyyy")}
              </p>
              <div className="mt-2">
                <StatusBadge 
                  status={t(invoice.status)}
                  type={getStatusType(invoice.status)}
                />
              </div>
            </div>
          </div>
          
          {/* Bill To */}
          <div className="mb-6">
            <h4 className="font-semibold mb-2">{t("Bill To")}</h4>
            <p>{invoice.client}</p>
            {invoice.event && <p className="text-gray-500">{t("Event")}: {invoice.event}</p>}
            <p className="text-gray-500">{t("Account")} #: CL-{invoice.id.split('-')[2]}</p>
          </div>
          
          {/* Invoice Items */}
          <div className="mb-6">
            <h4 className="font-semibold mb-2">{t("Invoice Items")}</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("Description")}</TableHead>
                  <TableHead className="text-right">{t("Quantity")}</TableHead>
                  <TableHead className="text-right">{t("Unit Price")}</TableHead>
                  <TableHead className="text-right">{t("Total")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoiceItems.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{t(item.description)}</TableCell>
                    <TableCell className="text-right">{item.quantity}</TableCell>
                    <TableCell className="text-right">{formatCurrency(item.unitPrice)}</TableCell>
                    <TableCell className="text-right">{formatCurrency(item.total)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {/* Totals */}
          <div className="flex justify-end mb-6">
            <div className="w-1/2">
              <div className="flex justify-between py-2 border-t">
                <span>{t("Subtotal")}</span>
                <span>{formatCurrency(5325)}</span>
              </div>
              <div className="flex justify-between py-2">
                <span>{t("Tax (5%)")}</span>
                <span>{formatCurrency(266.25)}</span>
              </div>
              <div className="flex justify-between py-2 font-bold border-t">
                <span>{t("Total")}</span>
                <span>{formatCurrency(invoice.total)}</span>
              </div>
              <div className="flex justify-between py-2 text-green-600">
                <span>{t("Paid")}</span>
                <span>{formatCurrency(invoice.paid)}</span>
              </div>
              <div className="flex justify-between py-2 font-bold border-t">
                <span>{t("Balance Due")}</span>
                <span>{formatCurrency(invoice.due)}</span>
              </div>
            </div>
          </div>
          
          {/* Payment History */}
          {invoice.paid > 0 && (
            <div className="mb-6">
              <h4 className="font-semibold mb-2">{t("Payment History")}</h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("Date")}</TableHead>
                    <TableHead>{t("Method")}</TableHead>
                    <TableHead>{t("Reference")}</TableHead>
                    <TableHead className="text-right">{t("Amount")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paymentHistory.map((payment, index) => (
                    <TableRow key={index}>
                      <TableCell>{format(new Date(payment.date), "MMM dd, yyyy")}</TableCell>
                      <TableCell>{t(payment.method)}</TableCell>
                      <TableCell>{payment.reference}</TableCell>
                      <TableCell className="text-right">{formatCurrency(payment.amount)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
          
          {/* Payment Instructions */}
          <div className="mb-6">
            <h4 className="font-semibold mb-2">{t("Payment Instructions")}</h4>
            <p className="text-gray-500">
              {t("Bank Name")}: Bank Muscat
            </p>
            <p className="text-gray-500">
              {t("Account Name")}: Royal Oman Police Officers Club
            </p>
            <p className="text-gray-500">
              {t("Account Number")}: XXXX-XXXX-XXXX-1234
            </p>
            <p className="text-gray-500">
              {t("IBAN")}: OM94MUSA12345678901234
            </p>
            <p className="text-gray-500 mt-2">
              {t("Please include invoice number in payment reference")}
            </p>
          </div>
          
          {/* Terms */}
          <div className="mb-4 text-gray-500 text-sm">
            <h4 className="font-semibold mb-2">{t("Terms & Conditions")}</h4>
            <p>{t("Payment is due within 30 days of invoice date.")}</p>
            <p>{t("Late payments are subject to a 2% monthly charge.")}</p>
            <p>{t("For questions regarding this invoice, please contact finance@rop-officersclub.om")}</p>
          </div>
        </div>
        
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t("Close")}
          </Button>
          <Button variant="outline" className="gap-2">
            <Printer className="h-4 w-4" />
            {t("Print")}
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            {t("Download PDF")}
          </Button>
          <Button className="gap-2">
            <Mail className="h-4 w-4" />
            {t("Email Invoice")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
