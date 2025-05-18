
import React, { useState } from "react";
import { SubPageLayout } from "@/components/shared/SubPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { DataTable } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { FinancialAuditStats } from "@/components/finance/FinancialAuditStats";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { 
  Search, 
  MoreHorizontal, 
  Calendar, 
  Filter, 
  User,
  FileText,
  Download
} from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { FinancialAuditModal } from "@/components/finance/FinancialAuditModal";

// Define a type for audit log entries
interface AuditLog {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  details: string;
  entity: string;
  entityId: string;
  type: "Create" | "Update" | "Delete" | "View" | "Export" | "Payment";
  ipAddress: string;
}

export default function FinancialAuditLogs() {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  // Modal states
  const [auditModalOpen, setAuditModalOpen] = useState(false);
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [userFilter, setUserFilter] = useState("");
  const [actionFilter, setActionFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  
  // Sample audit logs data
  const auditLogs: AuditLog[] = [
    {
      id: "LOG-0001",
      action: "Invoice Created",
      user: "Ahmed Al Harthi",
      timestamp: "2025-05-18T10:23:15",
      details: "Created new invoice INV-2025-007 for Air Force Division",
      entity: "Invoice",
      entityId: "INV-2025-007",
      type: "Create",
      ipAddress: "192.168.1.45"
    },
    {
      id: "LOG-0002",
      action: "Payment Processed",
      user: "Fatima Al Balushi",
      timestamp: "2025-05-18T09:47:22",
      details: "Payment of 5,600.000 OMR processed for invoice INV-2025-001",
      entity: "Payment",
      entityId: "PMT-2025-004",
      type: "Payment",
      ipAddress: "192.168.1.67"
    },
    {
      id: "LOG-0003",
      action: "Tax Rate Updated",
      user: "Khalid Al Zaabi",
      timestamp: "2025-05-17T14:12:08",
      details: "Updated Tourism Fee tax rate from 3% to 4%",
      entity: "TaxRate",
      entityId: "TAX-005",
      type: "Update",
      ipAddress: "192.168.1.23"
    },
    {
      id: "LOG-0004",
      action: "Invoice Exported",
      user: "Sara Al Farsi",
      timestamp: "2025-05-17T11:30:45",
      details: "Exported invoice INV-2025-002 to PDF",
      entity: "Invoice",
      entityId: "INV-2025-002",
      type: "Export",
      ipAddress: "192.168.1.89"
    },
    {
      id: "LOG-0005",
      action: "Monthly Report Generated",
      user: "Mohammed Al Amri",
      timestamp: "2025-05-16T16:05:33",
      details: "Generated P&L report for April 2025",
      entity: "Report",
      entityId: "RPT-2025-014",
      type: "Create",
      ipAddress: "192.168.1.12"
    },
    {
      id: "LOG-0006",
      action: "Transaction Deleted",
      user: "Khalid Al Zaabi",
      timestamp: "2025-05-16T13:22:59",
      details: "Deleted duplicate transaction TR-007",
      entity: "Transaction",
      entityId: "TR-007",
      type: "Delete",
      ipAddress: "192.168.1.23"
    },
    {
      id: "LOG-0007",
      action: "Invoice Viewed",
      user: "Ahmed Al Harthi",
      timestamp: "2025-05-15T09:14:27",
      details: "Viewed invoice INV-2025-004 details",
      entity: "Invoice",
      entityId: "INV-2025-004",
      type: "View",
      ipAddress: "192.168.1.45"
    },
    {
      id: "LOG-0008",
      action: "Config Updated",
      user: "Mohammed Al Amri",
      timestamp: "2025-05-14T15:42:10",
      details: "Updated tax calculation method to 'Prices include tax'",
      entity: "TaxConfig",
      entityId: "CONF-TAX",
      type: "Update",
      ipAddress: "192.168.1.12"
    }
  ];
  
  // Filtered data
  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.action.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.entity.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.entityId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesUser = userFilter ? log.user === userFilter : true;
    const matchesAction = actionFilter ? log.type === actionFilter : true;
    const matchesDate = dateFilter ? log.timestamp.startsWith(dateFilter) : true;
    
    return matchesSearch && matchesUser && matchesAction && matchesDate;
  });
  
  // Handler to view audit log details
  const handleViewDetails = (log: AuditLog) => {
    setSelectedLog(log);
    setAuditModalOpen(true);
  };
  
  // Get action badge color
  const getActionBadgeColor = (type: string) => {
    switch(type) {
      case "Create": return "bg-green-100 text-green-800";
      case "Update": return "bg-blue-100 text-blue-800";
      case "Delete": return "bg-red-100 text-red-800";
      case "View": return "bg-gray-100 text-gray-800";
      case "Export": return "bg-purple-100 text-purple-800";
      case "Payment": return "bg-amber-100 text-amber-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };
  
  // Table columns definition
  const columns = [
    { 
      header: "Date & Time", 
      accessor: "timestamp",
      cell: (log: AuditLog) => format(new Date(log.timestamp), "MMM dd, yyyy HH:mm:ss")
    },
    { 
      header: "Action", 
      accessor: "action",
      cell: (log: AuditLog) => (
        <div className="flex items-center">
          <span className={`px-2 py-1 rounded-full text-xs font-medium mr-2 ${getActionBadgeColor(log.type)}`}>
            {log.type}
          </span>
          {log.action}
        </div>
      )
    },
    { header: "User", accessor: "user" },
    { header: "Details", accessor: "details" },
    { 
      header: "ID", 
      accessor: "id",
      cell: (log: AuditLog) => <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">{log.id}</span>
    },
    { 
      header: "Actions", 
      cell: (log: AuditLog) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleViewDetails(log)}>
              <FileText className="mr-2 h-4 w-4" />
              {t("View Details")}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => {
              toast({
                title: t("Log Exported"),
                description: t("Audit log {{id}} exported to PDF", { id: log.id })
              });
            }}>
              <Download className="mr-2 h-4 w-4" />
              {t("Export Log")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  ];
  
  return (
    <SubPageLayout
      title={t("Financial Audit Logs")}
      subtitle={t("Track financial transactions and changes")}
      parentLink="/finance"
      parentTitle={t("Finance & Reports")}
    >
      <div className="mb-6">
        <FinancialAuditStats />
      </div>
      
      <Card>
        <CardHeader className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <CardTitle>{t("Audit Log")}</CardTitle>
          
          <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder={t("Search audit logs...")}
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <User size={16} />
                    {t("User")}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  {Array.from(new Set(auditLogs.map(log => log.user))).map((user) => (
                    <DropdownMenuItem key={user} onClick={() => setUserFilter(user)}>
                      {user}
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuItem onClick={() => setUserFilter("")}>
                    {t("All Users")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Filter size={16} />
                    {t("Action Type")}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  {["Create", "Update", "Delete", "View", "Export", "Payment"].map((action) => (
                    <DropdownMenuItem key={action} onClick={() => setActionFilter(action)}>
                      {t(action)}
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuItem onClick={() => setActionFilter("")}>
                    {t("All Actions")}
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
              
              <Button variant="outline" className="gap-2" onClick={() => {
                toast({
                  title: t("Logs Exported"),
                  description: t("All audit logs exported to Excel")
                });
              }}>
                <Download size={16} />
                {t("Export Logs")}
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <DataTable
            data={filteredLogs}
            columns={columns}
            className="mt-4"
          />
        </CardContent>
      </Card>
      
      {/* Modals */}
      <FinancialAuditModal 
        open={auditModalOpen} 
        onOpenChange={setAuditModalOpen} 
        log={selectedLog}
      />
    </SubPageLayout>
  );
}
