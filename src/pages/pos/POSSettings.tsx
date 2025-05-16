
import React, { useState } from "react";
import { SubPageLayout } from "@/components/shared/SubPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Terminal, Printer, Receipt, CreditCard } from "lucide-react";

export default function POSSettings() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("general");
  
  // Mock settings data
  const [settings, setSettings] = useState({
    general: {
      posName: "ROP Officers Club POS",
      currencySymbol: "OMR",
      taxRate: "5",
      receiptHeader: "Royal Oman Police Officers Club",
      receiptFooter: "Thank you for your visit!",
      automaticLogout: true,
      logoutTime: "30",
    },
    hardware: {
      printerName: "Epson TM-T88VI",
      printerEnabled: true,
      drawerEnabled: true,
      drawerOpenTime: "500",
      customerDisplayEnabled: false,
      barcodeEnabled: true,
    },
    payment: {
      cashEnabled: true,
      cardEnabled: true,
      membershipEnabled: true,
      invoiceEnabled: true,
      allowMultiple: true,
      requireApproval: false,
    },
    users: {
      requirePasscode: true,
      passcodeLength: "4",
      showSalesHistory: true,
      allowVoidItems: false,
      allowDiscounts: true,
      maxDiscountPercent: "10",
    }
  });
  
  // Handle setting changes
  const updateSetting = (section: keyof typeof settings, field: string, value: string | boolean) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };
  
  // Handle save
  const handleSave = () => {
    toast({
      title: t("Settings Saved"),
      description: t("Your POS settings have been updated successfully."),
    });
  };
  
  return (
    <SubPageLayout
      title="POS Settings"
      subtitle="Configure point of sale system preferences"
      parentLink="/pos"
      parentTitle="POS System"
    >
      {/* POS Settings Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-white shadow-sm">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">{t("Active Terminals")}</p>
                <p className="text-2xl font-bold">4</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Terminal className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-sm">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">{t("Connected Printers")}</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Printer className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-sm">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">{t("Receipt Templates")}</p>
                <p className="text-2xl font-bold">2</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Receipt className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-sm">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">{t("Payment Methods")}</p>
                <p className="text-2xl font-bold">5</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <CreditCard className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Settings Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>{t("System Settings")}</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="general">{t("General")}</TabsTrigger>
              <TabsTrigger value="hardware">{t("Hardware")}</TabsTrigger>
              <TabsTrigger value="payment">{t("Payment")}</TabsTrigger>
              <TabsTrigger value="users">{t("Users & Security")}</TabsTrigger>
            </TabsList>
            
            {/* General Settings */}
            <TabsContent value="general">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="posName">{t("POS System Name")}</Label>
                    <Input 
                      id="posName" 
                      value={settings.general.posName} 
                      onChange={(e) => updateSetting('general', 'posName', e.target.value)} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="currencySymbol">{t("Currency Symbol")}</Label>
                    <Input 
                      id="currencySymbol" 
                      value={settings.general.currencySymbol} 
                      onChange={(e) => updateSetting('general', 'currencySymbol', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="taxRate">{t("Tax Rate (%)")}</Label>
                    <Input 
                      id="taxRate" 
                      type="number" 
                      value={settings.general.taxRate} 
                      onChange={(e) => updateSetting('general', 'taxRate', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="logoutTime">{t("Automatic Logout Time (minutes)")}</Label>
                    <div className="flex space-x-4 items-center">
                      <Input 
                        id="logoutTime" 
                        type="number" 
                        value={settings.general.logoutTime} 
                        onChange={(e) => updateSetting('general', 'logoutTime', e.target.value)}
                        disabled={!settings.general.automaticLogout}
                      />
                      <div className="flex items-center space-x-2">
                        <Switch 
                          id="automaticLogout" 
                          checked={settings.general.automaticLogout} 
                          onCheckedChange={(value) => updateSetting('general', 'automaticLogout', value)}
                        />
                        <Label htmlFor="automaticLogout">{t("Enable")}</Label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="receiptHeader">{t("Receipt Header")}</Label>
                  <Input 
                    id="receiptHeader" 
                    value={settings.general.receiptHeader} 
                    onChange={(e) => updateSetting('general', 'receiptHeader', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="receiptFooter">{t("Receipt Footer")}</Label>
                  <Input 
                    id="receiptFooter" 
                    value={settings.general.receiptFooter} 
                    onChange={(e) => updateSetting('general', 'receiptFooter', e.target.value)}
                  />
                </div>
              </div>
            </TabsContent>
            
            {/* Hardware Settings */}
            <TabsContent value="hardware">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="printerName">{t("Receipt Printer")}</Label>
                    <div className="flex space-x-4 items-center">
                      <Input 
                        id="printerName" 
                        value={settings.hardware.printerName} 
                        onChange={(e) => updateSetting('hardware', 'printerName', e.target.value)}
                        disabled={!settings.hardware.printerEnabled}
                      />
                      <div className="flex items-center space-x-2">
                        <Switch 
                          id="printerEnabled" 
                          checked={settings.hardware.printerEnabled} 
                          onCheckedChange={(value) => updateSetting('hardware', 'printerEnabled', value)}
                        />
                        <Label htmlFor="printerEnabled">{t("Enable")}</Label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="drawerOpenTime">{t("Cash Drawer Open Time (ms)")}</Label>
                    <div className="flex space-x-4 items-center">
                      <Input 
                        id="drawerOpenTime" 
                        type="number" 
                        value={settings.hardware.drawerOpenTime} 
                        onChange={(e) => updateSetting('hardware', 'drawerOpenTime', e.target.value)}
                        disabled={!settings.hardware.drawerEnabled}
                      />
                      <div className="flex items-center space-x-2">
                        <Switch 
                          id="drawerEnabled" 
                          checked={settings.hardware.drawerEnabled} 
                          onCheckedChange={(value) => updateSetting('hardware', 'drawerEnabled', value)}
                        />
                        <Label htmlFor="drawerEnabled">{t("Enable")}</Label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="customerDisplayEnabled" 
                      checked={settings.hardware.customerDisplayEnabled} 
                      onCheckedChange={(value) => updateSetting('hardware', 'customerDisplayEnabled', value)}
                    />
                    <Label htmlFor="customerDisplayEnabled">{t("Enable Customer Display")}</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="barcodeEnabled" 
                      checked={settings.hardware.barcodeEnabled} 
                      onCheckedChange={(value) => updateSetting('hardware', 'barcodeEnabled', value)}
                    />
                    <Label htmlFor="barcodeEnabled">{t("Enable Barcode Scanner")}</Label>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Payment Settings */}
            <TabsContent value="payment">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="cashEnabled" 
                      checked={settings.payment.cashEnabled} 
                      onCheckedChange={(value) => updateSetting('payment', 'cashEnabled', value)}
                    />
                    <Label htmlFor="cashEnabled">{t("Accept Cash Payments")}</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="cardEnabled" 
                      checked={settings.payment.cardEnabled} 
                      onCheckedChange={(value) => updateSetting('payment', 'cardEnabled', value)}
                    />
                    <Label htmlFor="cardEnabled">{t("Accept Card Payments")}</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="membershipEnabled" 
                      checked={settings.payment.membershipEnabled} 
                      onCheckedChange={(value) => updateSetting('payment', 'membershipEnabled', value)}
                    />
                    <Label htmlFor="membershipEnabled">{t("Accept Membership Account Payments")}</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="invoiceEnabled" 
                      checked={settings.payment.invoiceEnabled} 
                      onCheckedChange={(value) => updateSetting('payment', 'invoiceEnabled', value)}
                    />
                    <Label htmlFor="invoiceEnabled">{t("Allow Invoice Payments")}</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="allowMultiple" 
                      checked={settings.payment.allowMultiple} 
                      onCheckedChange={(value) => updateSetting('payment', 'allowMultiple', value)}
                    />
                    <Label htmlFor="allowMultiple">{t("Allow Split Payments")}</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="requireApproval" 
                      checked={settings.payment.requireApproval} 
                      onCheckedChange={(value) => updateSetting('payment', 'requireApproval', value)}
                    />
                    <Label htmlFor="requireApproval">{t("Require Manager Approval for Refunds")}</Label>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Users & Security */}
            <TabsContent value="users">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="passcodeLength">{t("Passcode Length")}</Label>
                    <div className="flex space-x-4 items-center">
                      <Input 
                        id="passcodeLength" 
                        type="number" 
                        value={settings.users.passcodeLength} 
                        onChange={(e) => updateSetting('users', 'passcodeLength', e.target.value)}
                        disabled={!settings.users.requirePasscode}
                      />
                      <div className="flex items-center space-x-2">
                        <Switch 
                          id="requirePasscode" 
                          checked={settings.users.requirePasscode} 
                          onCheckedChange={(value) => updateSetting('users', 'requirePasscode', value)}
                        />
                        <Label htmlFor="requirePasscode">{t("Require Passcode")}</Label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="maxDiscountPercent">{t("Maximum Discount (%)")}</Label>
                    <div className="flex space-x-4 items-center">
                      <Input 
                        id="maxDiscountPercent" 
                        type="number" 
                        value={settings.users.maxDiscountPercent} 
                        onChange={(e) => updateSetting('users', 'maxDiscountPercent', e.target.value)}
                        disabled={!settings.users.allowDiscounts}
                      />
                      <div className="flex items-center space-x-2">
                        <Switch 
                          id="allowDiscounts" 
                          checked={settings.users.allowDiscounts} 
                          onCheckedChange={(value) => updateSetting('users', 'allowDiscounts', value)}
                        />
                        <Label htmlFor="allowDiscounts">{t("Allow Discounts")}</Label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="showSalesHistory" 
                      checked={settings.users.showSalesHistory} 
                      onCheckedChange={(value) => updateSetting('users', 'showSalesHistory', value)}
                    />
                    <Label htmlFor="showSalesHistory">{t("Allow Cashiers to View Sales History")}</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="allowVoidItems" 
                      checked={settings.users.allowVoidItems} 
                      onCheckedChange={(value) => updateSetting('users', 'allowVoidItems', value)}
                    />
                    <Label htmlFor="allowVoidItems">{t("Allow Cashiers to Void Items")}</Label>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-8 flex justify-end space-x-2">
            <Button variant="outline">{t("Reset to Defaults")}</Button>
            <Button variant="default" onClick={handleSave}>{t("Save Settings")}</Button>
          </div>
        </CardContent>
      </Card>
    </SubPageLayout>
  );
}
