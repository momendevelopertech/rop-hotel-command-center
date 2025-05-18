
import React, { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { useToast } from "@/components/ui/use-toast";

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
  items: any[];
}

interface AddEventPaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invoice: EventInvoice | null;
}

export function AddEventPaymentModal({ open, onOpenChange, invoice }: AddEventPaymentModalProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [paymentAmount, setPaymentAmount] = useState<string>("");
  const [paymentDate, setPaymentDate] = useState<string>(format(new Date(), "yyyy-MM-dd"));
  const [paymentMethod, setPaymentMethod] = useState<string>("bank_transfer");
  const [referenceNumber, setReferenceNumber] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-OM', { 
      style: 'currency', 
      currency: 'OMR',
      minimumFractionDigits: 3
    }).format(amount);
  };
  
  if (!invoice) return null;
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: t("Payment Recorded"),
        description: t("{{amount}} payment for invoice {{id}} has been recorded", { 
          amount: formatCurrency(Number(paymentAmount)),
          id: invoice.id
        })
      });
      setIsSubmitting(false);
      onOpenChange(false);
    }, 1000);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {t("Record Payment for Invoice")} #{invoice.id}
          </DialogTitle>
          <DialogDescription>
            {t("Event")}: {invoice.eventName} - {t("Balance Due")}: {formatCurrency(invoice.balanceAmount)}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="payment-amount">{t("Payment Amount")}</Label>
            <Input
              id="payment-amount"
              type="number"
              step="0.001"
              placeholder="0.000"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
              required
              min="0.001"
              max={invoice.balanceAmount.toString()}
            />
            {parseFloat(paymentAmount) > invoice.balanceAmount && (
              <p className="text-sm text-red-500">
                {t("Amount cannot exceed the balance due")}
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="payment-date">{t("Payment Date")}</Label>
            <Input
              id="payment-date"
              type="date"
              value={paymentDate}
              onChange={(e) => setPaymentDate(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="payment-method">{t("Payment Method")}</Label>
            <Select value={paymentMethod} onValueChange={setPaymentMethod} required>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t("Select payment method")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bank_transfer">{t("Bank Transfer")}</SelectItem>
                <SelectItem value="credit_card">{t("Credit Card")}</SelectItem>
                <SelectItem value="cash">{t("Cash")}</SelectItem>
                <SelectItem value="cheque">{t("Cheque")}</SelectItem>
                <SelectItem value="military_fund">{t("Military Fund")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="reference-number">{t("Reference Number")}</Label>
            <Input
              id="reference-number"
              type="text"
              placeholder={t("Transaction reference")}
              value={referenceNumber}
              onChange={(e) => setReferenceNumber(e.target.value)}
            />
          </div>
          
          <DialogFooter className="pt-4">
            <Button 
              variant="outline" 
              type="button" 
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              {t("Cancel")}
            </Button>
            <Button 
              type="submit" 
              disabled={
                isSubmitting || 
                !paymentAmount || 
                parseFloat(paymentAmount) <= 0 || 
                parseFloat(paymentAmount) > invoice.balanceAmount
              }
            >
              {isSubmitting ? t("Processing...") : t("Record Payment")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
