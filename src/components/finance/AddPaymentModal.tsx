
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/components/ui/use-toast";

interface AddPaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invoice: any | null;
}

export function AddPaymentModal({ open, onOpenChange, invoice }: AddPaymentModalProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Bank Transfer");
  const [reference, setReference] = useState("");
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!invoice) return;
    
    // In a real app, this would update the database
    toast({
      title: t("Payment Added"),
      description: t("Payment of {{amount}} OMR has been applied to invoice {{id}}", { 
        amount, 
        id: invoice.id 
      }),
    });
    
    onOpenChange(false);
  };
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-OM', { 
      style: 'currency', 
      currency: 'OMR',
      minimumFractionDigits: 3
    }).format(amount);
  };
  
  // Reset form when modal opens
  React.useEffect(() => {
    if (open) {
      setAmount(invoice?.due?.toString() || "");
      setPaymentMethod("Bank Transfer");
      setReference("");
      setPaymentDate(new Date().toISOString().split('T')[0]);
      setNotes("");
    }
  }, [open, invoice]);
  
  if (!invoice) return null;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{t("Add Payment")}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>{t("Invoice Details")}</Label>
            <div className="p-3 bg-gray-50 rounded-md">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-xs text-gray-500">{t("Invoice ID")}</p>
                  <p className="font-medium">{invoice.id}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">{t("Client")}</p>
                  <p className="font-medium">{invoice.client}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">{t("Total Amount")}</p>
                  <p className="font-medium">{formatCurrency(invoice.total)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">{t("Balance Due")}</p>
                  <p className="font-medium text-red-600">{formatCurrency(invoice.due)}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="amount">{t("Payment Amount")}</Label>
            <Input
              id="amount"
              type="number"
              step="0.001"
              min="0.001"
              max={invoice.due}
              placeholder="0.000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
            <p className="text-xs text-gray-500">
              {t("Maximum payment: {{amount}}", { amount: formatCurrency(invoice.due) })}
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="paymentMethod">{t("Payment Method")}</Label>
            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
              <SelectTrigger id="paymentMethod">
                <SelectValue placeholder={t("Select payment method")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Bank Transfer">{t("Bank Transfer")}</SelectItem>
                <SelectItem value="Credit Card">{t("Credit Card")}</SelectItem>
                <SelectItem value="Cash">{t("Cash")}</SelectItem>
                <SelectItem value="Check">{t("Check")}</SelectItem>
                <SelectItem value="Other">{t("Other")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="reference">{t("Reference Number")}</Label>
            <Input
              id="reference"
              placeholder={t("Transaction ID or receipt number")}
              value={reference}
              onChange={(e) => setReference(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="paymentDate">{t("Payment Date")}</Label>
            <Input
              id="paymentDate"
              type="date"
              value={paymentDate}
              onChange={(e) => setPaymentDate(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">{t("Notes")}</Label>
            <Textarea
              id="notes"
              placeholder={t("Additional payment details")}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
            />
          </div>
          
          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              {t("Cancel")}
            </Button>
            <Button 
              type="submit" 
              disabled={!amount || Number(amount) <= 0 || Number(amount) > invoice.due}
            >
              {t("Record Payment")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
