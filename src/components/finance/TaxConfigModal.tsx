
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/components/ui/use-toast";

interface TaxConfigModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TaxConfigModal({ open, onOpenChange }: TaxConfigModalProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState("general");
  
  // General settings
  const [taxIncluded, setTaxIncluded] = useState("included");
  const [roundingMethod, setRoundingMethod] = useState("nearest");
  const [decimalPlaces, setDecimalPlaces] = useState("3");
  
  // Display settings
  const [showTaxSummary, setShowTaxSummary] = useState(true);
  const [showTaxBreakdown, setShowTaxBreakdown] = useState(true);
  const [displayCurrency, setDisplayCurrency] = useState("OMR");
  
  // Automatic tax application
  const [autoApplyVAT, setAutoApplyVAT] = useState(true);
  const [autoApplyService, setAutoApplyService] = useState(true);
  const [vatThreshold, setVatThreshold] = useState("100");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would update the database
    toast({
      title: t("Tax Settings Updated"),
      description: t("Your tax configuration has been saved"),
    });
    
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{t("Tax Configuration Settings")}</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general">{t("General")}</TabsTrigger>
            <TabsTrigger value="display">{t("Display")}</TabsTrigger>
            <TabsTrigger value="automation">{t("Automation")}</TabsTrigger>
          </TabsList>
          
          <form onSubmit={handleSubmit}>
            <TabsContent value="general" className="space-y-4 py-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>{t("Tax Calculation Method")}</Label>
                  <RadioGroup value={taxIncluded} onValueChange={setTaxIncluded}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="included" id="included" />
                      <Label htmlFor="included">{t("Prices include tax")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="excluded" id="excluded" />
                      <Label htmlFor="excluded">{t("Prices exclude tax")}</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="roundingMethod">{t("Rounding Method")}</Label>
                    <Select value={roundingMethod} onValueChange={setRoundingMethod}>
                      <SelectTrigger id="roundingMethod">
                        <SelectValue placeholder={t("Select method")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nearest">{t("Nearest")}</SelectItem>
                        <SelectItem value="up">{t("Round Up")}</SelectItem>
                        <SelectItem value="down">{t("Round Down")}</SelectItem>
                        <SelectItem value="none">{t("No Rounding")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="decimalPlaces">{t("Decimal Places")}</Label>
                    <Select value={decimalPlaces} onValueChange={setDecimalPlaces}>
                      <SelectTrigger id="decimalPlaces">
                        <SelectValue placeholder={t("Select decimal places")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">{t("0 (No decimals)")}</SelectItem>
                        <SelectItem value="2">{t("2 (0.00)")}</SelectItem>
                        <SelectItem value="3">{t("3 (0.000)")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="taxYear">{t("Tax Year End Date")}</Label>
                  <Input
                    id="taxYear"
                    type="date"
                    defaultValue="2025-12-31"
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="display" className="space-y-4 py-4">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="showTaxSummary" 
                    checked={showTaxSummary}
                    onCheckedChange={(checked) => setShowTaxSummary(!!checked)}
                  />
                  <Label htmlFor="showTaxSummary">
                    {t("Show tax summary on invoices and receipts")}
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="showTaxBreakdown" 
                    checked={showTaxBreakdown}
                    onCheckedChange={(checked) => setShowTaxBreakdown(!!checked)}
                  />
                  <Label htmlFor="showTaxBreakdown">
                    {t("Show detailed tax breakdown")}
                  </Label>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="displayCurrency">{t("Display Currency")}</Label>
                  <Select value={displayCurrency} onValueChange={setDisplayCurrency}>
                    <SelectTrigger id="displayCurrency">
                      <SelectValue placeholder={t("Select currency")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="OMR">{t("Omani Rial (OMR)")}</SelectItem>
                      <SelectItem value="USD">{t("US Dollar (USD)")}</SelectItem>
                      <SelectItem value="EUR">{t("Euro (EUR)")}</SelectItem>
                      <SelectItem value="GBP">{t("British Pound (GBP)")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="taxLabel">{t("Default Tax Label")}</Label>
                  <Input
                    id="taxLabel"
                    defaultValue="VAT"
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="automation" className="space-y-4 py-4">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="autoApplyVAT" 
                    checked={autoApplyVAT}
                    onCheckedChange={(checked) => setAutoApplyVAT(!!checked)}
                  />
                  <Label htmlFor="autoApplyVAT">
                    {t("Automatically apply VAT to eligible items")}
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="autoApplyService" 
                    checked={autoApplyService}
                    onCheckedChange={(checked) => setAutoApplyService(!!checked)}
                  />
                  <Label htmlFor="autoApplyService">
                    {t("Automatically apply service charge")}
                  </Label>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="vatThreshold">
                    {t("VAT Registration Threshold (OMR)")}
                  </Label>
                  <Input
                    id="vatThreshold"
                    type="number"
                    value={vatThreshold}
                    onChange={(e) => setVatThreshold(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    {t("Annual revenue threshold for mandatory VAT registration")}
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                {t("Cancel")}
              </Button>
              <Button type="submit">
                {t("Save Tax Settings")}
              </Button>
            </DialogFooter>
          </form>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
