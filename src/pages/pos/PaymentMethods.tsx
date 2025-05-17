
import React, { useState } from "react";
import { SubPageLayout } from "@/components/shared/SubPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { DataTable, Column } from "@/components/shared/DataTable";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Pencil, ToggleLeft, ToggleRight, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PaymentMethod {
  id: number;
  name: string;
  nameAr: string;
  type: "Cash" | "Credit" | "Debit" | "Voucher" | "Military" | "Bank Transfer";
  typeAr: string;
  isActive: boolean;
  processingFee: number;
  availableIn: string[];
}

export default function PaymentMethods() {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Sample payment methods data
  const paymentMethodsData: PaymentMethod[] = [
    {
      id: 1,
      name: "Cash",
      nameAr: "نقدي",
      type: "Cash",
      typeAr: "نقدي",
      isActive: true,
      processingFee: 0,
      availableIn: ["Restaurant", "Accommodation", "Events"]
    },
    {
      id: 2,
      name: "Visa Credit Card",
      nameAr: "بطاقة فيزا الائتمانية",
      type: "Credit",
      typeAr: "ائتمان",
      isActive: true,
      processingFee: 2.5,
      availableIn: ["Restaurant", "Accommodation", "Events", "Mobile App"]
    },
    {
      id: 3,
      name: "Mastercard",
      nameAr: "ماستركارد",
      type: "Credit",
      typeAr: "ائتمان",
      isActive: true,
      processingFee: 2.5,
      availableIn: ["Restaurant", "Accommodation", "Events", "Mobile App"]
    },
    {
      id: 4,
      name: "Military ID Payment",
      nameAr: "الدفع بالهوية العسكرية",
      type: "Military",
      typeAr: "عسكري",
      isActive: true,
      processingFee: 0,
      availableIn: ["Restaurant", "Accommodation", "Events"]
    },
    {
      id: 5,
      name: "Bank Transfer",
      nameAr: "تحويل بنكي",
      type: "Bank Transfer",
      typeAr: "تحويل بنكي",
      isActive: true,
      processingFee: 0,
      availableIn: ["Accommodation", "Events"]
    },
    {
      id: 6,
      name: "Gift Voucher",
      nameAr: "قسيمة هدايا",
      type: "Voucher",
      typeAr: "قسيمة",
      isActive: false,
      processingFee: 0,
      availableIn: ["Restaurant"]
    },
    {
      id: 7,
      name: "American Express",
      nameAr: "أمريكان إكسبرس",
      type: "Credit",
      typeAr: "ائتمان",
      isActive: false,
      processingFee: 3.2,
      availableIn: ["Accommodation", "Events"]
    },
    {
      id: 8,
      name: "Debit Card",
      nameAr: "بطاقة الخصم",
      type: "Debit",
      typeAr: "خصم",
      isActive: true,
      processingFee: 1.5,
      availableIn: ["Restaurant", "Accommodation", "Events", "Mobile App"]
    }
  ];
  
  // Payment method stats
  const paymentStats = {
    total: paymentMethodsData.length,
    active: paymentMethodsData.filter(method => method.isActive).length,
    cash: paymentMethodsData.filter(method => method.type === 'Cash').length,
    cards: paymentMethodsData.filter(method => method.type === 'Credit' || method.type === 'Debit').length
  };
  
  // Toggle payment method status
  const togglePaymentMethodStatus = (id: number) => {
    // In a real app, this would update the database
    toast({
      title: t("Status Updated"),
      description: t("Payment method status has been updated successfully."),
    });
  };
  
  // Get type badge color
  const getTypeColor = (type: string): string => {
    switch (type) {
      case "Cash":
      case "نقدي":
        return "bg-green-100 text-green-800";
      case "Credit":
      case "ائتمان":
        return "bg-blue-100 text-blue-800";
      case "Debit":
      case "خصم":
        return "bg-purple-100 text-purple-800";
      case "Voucher":
      case "قسيمة":
        return "bg-amber-100 text-amber-800";
      case "Military":
      case "عسكري":
        return "bg-red-100 text-red-800";
      case "Bank Transfer":
      case "تحويل بنكي":
        return "bg-cyan-100 text-cyan-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  // Format availability
  const formatAvailability = (availableIn: string[]): string => {
    return availableIn.join(", ");
  };
  
  // Get translated name and type
  const getLocalizedName = (method: PaymentMethod): string => {
    return language === "ar" ? method.nameAr : method.name;
  };
  
  const getLocalizedType = (method: PaymentMethod): string => {
    return language === "ar" ? method.typeAr : method.type;
  };
  
  // Filter data based on active tab
  const getTabData = (tabId: string) => {
    let filteredData = paymentMethodsData;
    
    switch (tabId) {
      case "active":
        filteredData = paymentMethodsData.filter(method => method.isActive);
        break;
      case "inactive":
        filteredData = paymentMethodsData.filter(method => !method.isActive);
        break;
      case "card":
        filteredData = paymentMethodsData.filter(method => 
          method.type === "Credit" || method.type === "Debit");
        break;
      case "other":
        filteredData = paymentMethodsData.filter(method => 
          method.type !== "Credit" && method.type !== "Debit" && method.type !== "Cash");
        break;
    }
    
    // Apply search if provided
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredData = filteredData.filter(method => 
        getLocalizedName(method).toLowerCase().includes(query) ||
        getLocalizedType(method).toLowerCase().includes(query)
      );
    }
    
    return filteredData;
  };
  
  // Table columns
  const columns: Column<PaymentMethod>[] = [
    { 
      header: "ID", 
      accessor: "id" 
    },
    { 
      header: "Name", 
      accessor: (method) => getLocalizedName(method)
    },
    { 
      header: "Type", 
      accessor: (method) => getLocalizedType(method),
      cell: (method) => (
        <Badge className={getTypeColor(getLocalizedType(method))}>
          {getLocalizedType(method)}
        </Badge>
      )
    },
    { 
      header: "Processing Fee", 
      accessor: (method) => `${method.processingFee}%`
    },
    { 
      header: "Available In", 
      accessor: (method) => formatAvailability(method.availableIn)
    },
    { 
      header: "Status", 
      accessor: "isActive",
      cell: (method) => (
        <div className="flex items-center">
          <Switch 
            checked={method.isActive}
            onCheckedChange={() => togglePaymentMethodStatus(method.id)}
          />
          <span className="ml-2">{method.isActive ? t("Active") : t("Inactive")}</span>
        </div>
      )
    },
    { 
      header: "Actions", 
      accessor: (method) => method.id,
      cell: (method) => (
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Pencil className="h-3 w-3" />
            {t("Edit")}
          </Button>
        </div>
      )
    }
  ];

  return (
    <SubPageLayout
      title={t("Payment Methods")}
      subtitle={t("Manage accepted payment types and processors")}
      parentLink="/pos"
      parentTitle={t("POS System")}
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">{t("Total Methods")}</p>
                <p className="text-2xl font-bold">{paymentStats.total}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <CreditCard className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">{t("Active Methods")}</p>
                <p className="text-2xl font-bold">{paymentStats.active}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <ToggleRight className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">{t("Card Payment Types")}</p>
                <p className="text-2xl font-bold">{paymentStats.cards}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <CreditCard className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">{t("Cash Options")}</p>
                <p className="text-2xl font-bold">{paymentStats.cash}</p>
              </div>
              <div className="p-3 bg-amber-100 rounded-full">
                <CreditCard className="h-5 w-5 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Payment Methods Table with Tabs */}
      <div className="mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{t("Payment Methods")}</CardTitle>
            <Button className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              {t("Add Method")}
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-4 justify-between">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder={t("Search payment methods...")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="all">{t("All")}</TabsTrigger>
                <TabsTrigger value="active">{t("Active")}</TabsTrigger>
                <TabsTrigger value="inactive">{t("Inactive")}</TabsTrigger>
                <TabsTrigger value="card">{t("Card Payments")}</TabsTrigger>
                <TabsTrigger value="other">{t("Other")}</TabsTrigger>
              </TabsList>
              
              <TabsContent value={activeTab}>
                <DataTable
                  data={getTabData(activeTab)}
                  columns={columns}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      
      {/* Payment Integration Card */}
      <Card>
        <CardHeader>
          <CardTitle>{t("Payment Gateway Integration")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-gray-600">{t("Connect your payment processor APIs to enable seamless transactions across all services.")}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border rounded-md p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <CreditCard className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Visa/Mastercard</h3>
                    <p className="text-xs text-gray-500">{t("Connected")}</p>
                  </div>
                </div>
                <Switch checked={true} />
              </div>
              
              <div className="border rounded-md p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                    <CreditCard className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Military ID System</h3>
                    <p className="text-xs text-gray-500">{t("Connected")}</p>
                  </div>
                </div>
                <Switch checked={true} />
              </div>
              
              <div className="border rounded-md p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mr-3">
                    <CreditCard className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Bank Transfer API</h3>
                    <p className="text-xs text-gray-500">{t("Connected")}</p>
                  </div>
                </div>
                <Switch checked={true} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </SubPageLayout>
  );
}
