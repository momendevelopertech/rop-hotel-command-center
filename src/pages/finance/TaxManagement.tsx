
import React, { useState } from "react";
import { SubPageLayout } from "@/components/shared/SubPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { DataTable } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TaxModal } from "@/components/finance/TaxModal";
import { StyledAddButton } from "@/components/shared/StyledAddButton";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { 
  Search, 
  MoreHorizontal, 
  Filter,
  Percent,
  Clock,
  FileText,
  Settings
} from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/components/ui/use-toast";
import { TaxConfigModal } from "@/components/finance/TaxConfigModal";
import { TaxReportModal } from "@/components/finance/TaxReportModal";

// Define a type for tax rate data
interface TaxRate {
  id: string;
  name: string;
  type: "VAT" | "Service" | "Municipal" | "Custom";
  percentage: number;
  appliedTo: string[];
  active: boolean;
  lastUpdated: string;
  description?: string;
}

export default function TaxManagement() {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  // Modal states
  const [taxModalOpen, setTaxModalOpen] = useState(false);
  const [configModalOpen, setConfigModalOpen] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [selectedTax, setSelectedTax] = useState<TaxRate | null>(null);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  
  // Sample tax rates data
  const taxRates: TaxRate[] = [
    {
      id: "TAX-001",
      name: "Standard VAT",
      type: "VAT",
      percentage: 5,
      appliedTo: ["All Products", "Services"],
      active: true,
      lastUpdated: "2025-01-15",
      description: "Standard Value Added Tax as per Oman tax regulations"
    },
    {
      id: "TAX-002",
      name: "Service Charge",
      type: "Service",
      percentage: 10,
      appliedTo: ["Dining", "Room Service", "Event Services"],
      active: true,
      lastUpdated: "2025-02-20"
    },
    {
      id: "TAX-003",
      name: "Military Discount",
      type: "Custom",
      percentage: -15,
      appliedTo: ["All Products", "Services", "Accommodations"],
      active: true,
      lastUpdated: "2025-03-10",
      description: "Special discount rate for military personnel"
    },
    {
      id: "TAX-004",
      name: "Municipal Tax",
      type: "Municipal",
      percentage: 2,
      appliedTo: ["Accommodations"],
      active: true,
      lastUpdated: "2025-01-01"
    },
    {
      id: "TAX-005",
      name: "Tourism Fee",
      type: "Custom",
      percentage: 4,
      appliedTo: ["Accommodations"],
      active: false,
      lastUpdated: "2024-11-15",
      description: "Optional tourism development fee"
    }
  ];
  
  // Filtered data
  const filteredTaxes = taxRates.filter(tax => {
    const matchesSearch = tax.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         tax.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tax.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter ? tax.type === typeFilter : true;
    
    return matchesSearch && matchesType;
  });
  
  // Handler to add/edit tax
  const handleAddEditTax = (tax?: TaxRate) => {
    setSelectedTax(tax || null);
    setTaxModalOpen(true);
  };
  
  // Table columns definition
  const columns = [
    { header: "Tax ID", accessor: "id" },
    { header: "Name", accessor: "name" },
    { 
      header: "Type", 
      accessor: "type",
      cell: (tax: TaxRate) => {
        let color = "";
        switch (tax.type) {
          case "VAT": color = "bg-blue-100 text-blue-800"; break;
          case "Service": color = "bg-green-100 text-green-800"; break;
          case "Municipal": color = "bg-amber-100 text-amber-800"; break;
          case "Custom": color = "bg-purple-100 text-purple-800"; break;
        }
        return <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>{tax.type}</span>;
      }
    },
    { 
      header: "Percentage", 
      accessor: "percentage",
      cell: (tax: TaxRate) => {
        const isNegative = tax.percentage < 0;
        return (
          <span className={isNegative ? "text-green-600" : ""}>
            {isNegative && "-"}{Math.abs(tax.percentage)}%
          </span>
        );
      }
    },
    { 
      header: "Applied To", 
      accessor: "appliedTo",
      cell: (tax: TaxRate) => (
        <div className="flex flex-wrap gap-1">
          {tax.appliedTo.slice(0, 2).map((item, i) => (
            <Badge key={i} variant="outline" className="bg-gray-100">
              {item}
            </Badge>
          ))}
          {tax.appliedTo.length > 2 && (
            <Badge variant="outline" className="bg-gray-100">
              +{tax.appliedTo.length - 2}
            </Badge>
          )}
        </div>
      )
    },
    { 
      header: "Status", 
      accessor: "active",
      cell: (tax: TaxRate) => (
        <Badge variant={tax.active ? "success" : "outline"}>
          {tax.active ? t("Active") : t("Inactive")}
        </Badge>
      )
    },
    { 
      header: "Last Updated", 
      accessor: "lastUpdated",
      cell: (tax: TaxRate) => format(new Date(tax.lastUpdated), "MMM dd, yyyy")
    },
    { 
      header: "Actions", 
      cell: (tax: TaxRate) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleAddEditTax(tax)}>
              <Percent className="mr-2 h-4 w-4" />
              {t("Edit Tax Rate")}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => {
              toast({
                title: tax.active ? t("Tax Deactivated") : t("Tax Activated"),
                description: tax.active 
                  ? t("{{name}} has been deactivated", { name: tax.name })
                  : t("{{name}} has been activated", { name: tax.name })
              });
            }}>
              {tax.active ? (
                <>
                  <Clock className="mr-2 h-4 w-4" />
                  {t("Deactivate")}
                </>
              ) : (
                <>
                  <Clock className="mr-2 h-4 w-4" />
                  {t("Activate")}
                </>
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  ];
  
  return (
    <SubPageLayout
      title={t("Tax Management")}
      subtitle={t("Manage tax calculations and reporting")}
      parentLink="/finance"
      parentTitle={t("Finance & Reports")}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="bg-blue-50 p-4 rounded-full mr-4">
              <Percent className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">{t("Active Tax Rates")}</p>
              <p className="text-2xl font-bold mt-1">{taxRates.filter(tax => tax.active).length}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="font-medium">{t("Tax Configuration")}</p>
              <p className="text-sm text-gray-500 mt-1">{t("Manage system-wide tax settings and defaults")}</p>
            </div>
            <Button onClick={() => setConfigModalOpen(true)}>
              <Settings className="mr-2 h-4 w-4" />
              {t("Tax Settings")}
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mb-6">
        <CardHeader className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <CardTitle>{t("Tax Rates")}</CardTitle>
          
          <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder={t("Search tax rates...")}
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Filter size={16} />
                    {t("Type")}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={() => setTypeFilter("VAT")}>
                    {t("VAT")}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTypeFilter("Service")}>
                    {t("Service")}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTypeFilter("Municipal")}>
                    {t("Municipal")}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTypeFilter("Custom")}>
                    {t("Custom")}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTypeFilter("")}>
                    {t("All Types")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button variant="outline" className="gap-2" onClick={() => setReportModalOpen(true)}>
                <FileText size={16} />
                {t("Tax Report")}
              </Button>
              
              <StyledAddButton 
                label={t("Add Tax Rate")} 
                onClick={() => handleAddEditTax()}
              />
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <DataTable
            data={filteredTaxes}
            columns={columns}
            className="mt-4"
          />
        </CardContent>
      </Card>
      
      {/* Modals */}
      <TaxModal 
        open={taxModalOpen} 
        onOpenChange={setTaxModalOpen} 
        tax={selectedTax}
      />
      
      <TaxConfigModal
        open={configModalOpen}
        onOpenChange={setConfigModalOpen}
      />
      
      <TaxReportModal
        open={reportModalOpen}
        onOpenChange={setReportModalOpen}
      />
    </SubPageLayout>
  );
}
