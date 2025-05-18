
import React, { useState } from "react";
import { SubPageLayout } from "@/components/shared/SubPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { DataTable, Column } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/shared/StatusBadge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
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
  Filter, 
  Calendar,
  Building,
  User,
  FileText,
  Download,
  Mail,
  Wallet,
  AlertCircle,
  Plus,
  Clock,
  CheckCircle,
  XCircle
} from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

// Types
interface PayrollRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  rank: string;
  position: string;
  department: string;
  month: string;
  year: number;
  basicSalary: number;
  allowances: Allowance[];
  deductions: Deduction[];
  penalties: Penalty[];
  bonuses: Bonus[];
  netSalary: number;
  status: "Pending" | "Processing" | "Completed" | "Cancelled" | "Paid";
  paymentDate?: string;
  paymentMethod?: string;
  bankAccount?: string;
  comments?: string;
  photoUrl?: string;
}

interface Allowance {
  id: string;
  type: string;
  amount: number;
  description?: string;
}

interface Deduction {
  id: string;
  type: string;
  amount: number;
  description?: string;
}

interface Penalty {
  id: string;
  type: string;
  amount: number;
  date: string;
  reason: string;
  approvedBy: string;
  status: "Pending" | "Approved" | "Rejected" | "Cancelled";
}

interface Bonus {
  id: string;
  type: string;
  amount: number;
  description: string;
}

export default function PayrollPenalties() {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  // State
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [monthFilter, setMonthFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [activeTab, setActiveTab] = useState<"payroll" | "penalties">("payroll");
  const [viewPayrollDialog, setViewPayrollDialog] = useState(false);
  const [addPenaltyDialog, setAddPenaltyDialog] = useState(false);
  const [selectedPayroll, setSelectedPayroll] = useState<PayrollRecord | null>(null);
  
  // Sample payroll data
  const payrollRecords: PayrollRecord[] = [
    {
      id: "PAY-2025-05-001",
      employeeId: "10001",
      employeeName: "Ahmed Al Balushi",
      rank: "Senior",
      position: "Security Manager",
      department: "Security",
      month: "May",
      year: 2025,
      basicSalary: 1850,
      allowances: [
        { id: "ALW-001", type: "Housing", amount: 450, description: "Standard housing allowance" },
        { id: "ALW-002", type: "Transport", amount: 200, description: "Standard transport allowance" }
      ],
      deductions: [
        { id: "DED-001", type: "Income Tax", amount: 75, description: "Standard income tax" }
      ],
      penalties: [],
      bonuses: [
        { id: "BON-001", type: "Performance", amount: 200, description: "Quarterly performance bonus" }
      ],
      netSalary: 2625,
      status: "Completed",
      paymentDate: "2025-05-28",
      paymentMethod: "Bank Transfer",
      bankAccount: "XXXX-XXXX-7890",
      photoUrl: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=200&h=200&fit=crop"
    },
    {
      id: "PAY-2025-05-002",
      employeeId: "10002",
      employeeName: "Fatima Al Lawati",
      rank: "Mid",
      position: "HR Specialist",
      department: "Human Resources",
      month: "May",
      year: 2025,
      basicSalary: 1600,
      allowances: [
        { id: "ALW-101", type: "Transport", amount: 150, description: "Standard transport allowance" }
      ],
      deductions: [
        { id: "DED-101", type: "Income Tax", amount: 65, description: "Standard income tax" }
      ],
      penalties: [
        { id: "PEN-001", type: "Late Arrival", amount: 25, date: "2025-05-15", reason: "Late arrival - 3 instances", approvedBy: "Aisha Al Maqbali", status: "Approved" }
      ],
      bonuses: [],
      netSalary: 1660,
      status: "Completed",
      paymentDate: "2025-05-28",
      paymentMethod: "Bank Transfer",
      bankAccount: "XXXX-XXXX-4567",
      photoUrl: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=200&h=200&fit=crop"
    },
    {
      id: "PAY-2025-05-003",
      employeeId: "10003",
      employeeName: "Salim Al Habsi",
      rank: "Mid",
      position: "IT Administrator",
      department: "IT",
      month: "May",
      year: 2025,
      basicSalary: 1750,
      allowances: [
        { id: "ALW-201", type: "Housing", amount: 400, description: "Standard housing allowance" },
        { id: "ALW-202", type: "Transport", amount: 180, description: "Standard transport allowance" },
        { id: "ALW-203", type: "Internet", amount: 50, description: "IT staff internet allowance" }
      ],
      deductions: [
        { id: "DED-201", type: "Income Tax", amount: 70, description: "Standard income tax" }
      ],
      penalties: [],
      bonuses: [
        { id: "BON-101", type: "Project Completion", amount: 150, description: "Network upgrade project completion bonus" }
      ],
      netSalary: 2460,
      status: "Completed",
      paymentDate: "2025-05-28",
      paymentMethod: "Bank Transfer",
      bankAccount: "XXXX-XXXX-2345",
      photoUrl: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=200&h=200&fit=crop"
    },
    {
      id: "PAY-2025-05-004",
      employeeId: "10004",
      employeeName: "Abdullah Al Shehi",
      rank: "Senior",
      position: "Facilities Manager",
      department: "Facilities",
      month: "May",
      year: 2025,
      basicSalary: 1700,
      allowances: [
        { id: "ALW-301", type: "Housing", amount: 400, description: "Standard housing allowance" },
        { id: "ALW-302", type: "Transport", amount: 180, description: "Standard transport allowance" }
      ],
      deductions: [
        { id: "DED-301", type: "Income Tax", amount: 68, description: "Standard income tax" }
      ],
      penalties: [],
      bonuses: [],
      netSalary: 2212,
      status: "Completed",
      paymentDate: "2025-05-28",
      paymentMethod: "Bank Transfer",
      bankAccount: "XXXX-XXXX-8901",
      photoUrl: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=200&h=200&fit=crop"
    },
    {
      id: "PAY-2025-05-006",
      employeeId: "10006",
      employeeName: "Hassan Al Raisi",
      rank: "Mid",
      position: "Training Coordinator",
      department: "Training",
      month: "May",
      year: 2025,
      basicSalary: 1600,
      allowances: [
        { id: "ALW-501", type: "Housing", amount: 350, description: "Standard housing allowance" },
        { id: "ALW-502", type: "Transport", amount: 150, description: "Standard transport allowance" }
      ],
      deductions: [
        { id: "DED-501", type: "Income Tax", amount: 65, description: "Standard income tax" }
      ],
      penalties: [
        { id: "PEN-002", type: "Absent Without Leave", amount: 80, date: "2025-05-08", reason: "Absence without prior notice", approvedBy: "Saif Al Hashmi", status: "Approved" }
      ],
      bonuses: [],
      netSalary: 1955,
      status: "Completed",
      paymentDate: "2025-05-28",
      paymentMethod: "Bank Transfer",
      bankAccount: "XXXX-XXXX-3456",
      photoUrl: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=200&h=200&fit=crop"
    },
    {
      id: "PAY-2025-05-007",
      employeeId: "10007",
      employeeName: "Aisha Al Maqbali",
      rank: "Senior",
      position: "HR Director",
      department: "Human Resources",
      month: "May",
      year: 2025,
      basicSalary: 2800,
      allowances: [
        { id: "ALW-601", type: "Housing", amount: 650, description: "Senior management housing allowance" },
        { id: "ALW-602", type: "Transport", amount: 300, description: "Senior management transport allowance" },
        { id: "ALW-603", type: "Leadership", amount: 400, description: "Leadership position allowance" }
      ],
      deductions: [
        { id: "DED-601", type: "Income Tax", amount: 112, description: "Standard income tax" }
      ],
      penalties: [],
      bonuses: [
        { id: "BON-201", type: "Performance", amount: 300, description: "Quarterly performance bonus" },
        { id: "BON-202", type: "Department Achievement", amount: 200, description: "Department efficiency improvement" }
      ],
      netSalary: 4538,
      status: "Completed",
      paymentDate: "2025-05-28",
      paymentMethod: "Bank Transfer",
      bankAccount: "XXXX-XXXX-7890",
      photoUrl: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=200&h=200&fit=crop"
    },
    {
      id: "PAY-2025-06-001",
      employeeId: "10001",
      employeeName: "Ahmed Al Balushi",
      rank: "Senior",
      position: "Security Manager",
      department: "Security",
      month: "June",
      year: 2025,
      basicSalary: 1850,
      allowances: [
        { id: "ALW-701", type: "Housing", amount: 450, description: "Standard housing allowance" },
        { id: "ALW-702", type: "Transport", amount: 200, description: "Standard transport allowance" }
      ],
      deductions: [
        { id: "DED-701", type: "Income Tax", amount: 75, description: "Standard income tax" }
      ],
      penalties: [],
      bonuses: [],
      netSalary: 2425,
      status: "Pending",
      photoUrl: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=200&h=200&fit=crop"
    }
  ];
  
  // Filtered payroll records
  const filteredPayroll = payrollRecords.filter(record => {
    const matchesSearch = record.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         record.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         record.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter ? record.status === statusFilter : true;
    const matchesMonth = monthFilter ? record.month === monthFilter : true;
    const matchesDepartment = departmentFilter ? record.department === departmentFilter : true;
    
    return matchesSearch && matchesStatus && matchesMonth && matchesDepartment;
  });
  
  // Get all penalties from payroll records
  const getAllPenalties = () => {
    const penalties: { employee: PayrollRecord, penalty: Penalty }[] = [];
    
    payrollRecords.forEach(record => {
      record.penalties.forEach(penalty => {
        penalties.push({ employee: record, penalty });
      });
    });
    
    return penalties;
  };
  
  const penalties = getAllPenalties();
  
  const filteredPenalties = penalties.filter(({ employee, penalty }) => {
    const matchesSearch = employee.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         employee.employeeId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter ? penalty.status === statusFilter : true;
    const matchesDepartment = departmentFilter ? employee.department === departmentFilter : true;
    
    return matchesSearch && matchesStatus && matchesDepartment;
  });
  
  // Handle view payroll details
  const handleViewPayroll = (payroll: PayrollRecord) => {
    setSelectedPayroll(payroll);
    setViewPayrollDialog(true);
  };
  
  // Handle downloading payslip
  const handleDownloadPayslip = (payroll: PayrollRecord) => {
    toast({
      title: t("Payslip Downloaded"),
      description: t("Payslip for {{name}} has been downloaded", { name: payroll.employeeName })
    });
  };
  
  // Handle emailing payslip
  const handleEmailPayslip = (payroll: PayrollRecord) => {
    toast({
      title: t("Payslip Emailed"),
      description: t("Payslip for {{name}} has been emailed", { name: payroll.employeeName })
    });
  };
  
  // Status badge type mapping
  const getStatusType = (status: string) => {
    switch(status) {
      case "Completed": return "success";
      case "Paid": return "success";
      case "Processing": return "warning";
      case "Pending": return "warning";
      case "Cancelled": return "danger";
      case "Approved": return "success";
      case "Rejected": return "danger";
      default: return "info";
    }
  };
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-OM', { 
      style: 'currency', 
      currency: 'OMR',
      minimumFractionDigits: 3
    }).format(amount);
  };
  
  // Get all months for filter
  const getAllMonths = () => {
    const months = new Set(payrollRecords.map(record => record.month));
    return Array.from(months);
  };
  
  // Get all departments for filter
  const getAllDepartments = () => {
    const departments = new Set(payrollRecords.map(record => record.department));
    return Array.from(departments);
  };
  
  // Calculate salary statistics
  const calculateSalaryStats = () => {
    // Get unique employees from the current month
    const currentMonth = "May";
    const currentYear = 2025;
    const currentMonthRecords = payrollRecords.filter(
      r => r.month === currentMonth && r.year === currentYear
    );
    
    if (currentMonthRecords.length === 0) {
      return { average: 0, highest: 0, lowest: 0, total: 0 };
    }
    
    const salaries = currentMonthRecords.map(r => r.netSalary);
    const total = salaries.reduce((acc, salary) => acc + salary, 0);
    const average = total / salaries.length;
    const highest = Math.max(...salaries);
    const lowest = Math.min(...salaries);
    
    return { average, highest, lowest, total };
  };
  
  const salaryStats = calculateSalaryStats();
  
  // Table columns for payroll
  const payrollColumns: Column<PayrollRecord>[] = [
    { 
      header: "Employee",
      accessor: "employeeName",
      cell: (record) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-muted flex items-center justify-center">
            {record.photoUrl ? (
              <img src={record.photoUrl} alt={record.employeeName} className="w-full h-full object-cover" />
            ) : (
              <User className="h-5 w-5 text-muted-foreground" />
            )}
          </div>
          <div>
            <p className="font-medium">{record.employeeName}</p>
            <p className="text-xs text-gray-500">{record.position}</p>
          </div>
        </div>
      )
    },
    { 
      header: "Period",
      accessor: "month",
      cell: (record) => (
        <div>
          <p className="font-medium">{record.month} {record.year}</p>
          <p className="text-xs text-gray-500">{record.department}</p>
        </div>
      )
    },
    { 
      header: "Basic Salary",
      accessor: "basicSalary",
      cell: (record) => formatCurrency(record.basicSalary)
    },
    { 
      header: "Allowances",
      accessor: (record) => record.allowances.reduce((sum, a) => sum + a.amount, 0),
      cell: (record) => {
        const total = record.allowances.reduce((sum, a) => sum + a.amount, 0);
        return (
          <div>
            <p className="font-medium">{formatCurrency(total)}</p>
            <p className="text-xs text-gray-500">
              {record.allowances.length} {t("items")}
            </p>
          </div>
        );
      }
    },
    { 
      header: "Deductions",
      accessor: (record) => record.deductions.reduce((sum, d) => sum + d.amount, 0) + 
                          record.penalties.reduce((sum, p) => sum + p.amount, 0),
      cell: (record) => {
        const deductions = record.deductions.reduce((sum, d) => sum + d.amount, 0);
        const penalties = record.penalties.reduce((sum, p) => sum + p.amount, 0);
        const total = deductions + penalties;
        return (
          <div>
            <p className="font-medium text-red-600">-{formatCurrency(total)}</p>
            {penalties > 0 && (
              <p className="text-xs text-red-600">
                {t("Includes")} {formatCurrency(penalties)} {t("penalties")}
              </p>
            )}
          </div>
        );
      }
    },
    { 
      header: "Net Salary",
      accessor: "netSalary",
      cell: (record) => (
        <p className="font-medium">{formatCurrency(record.netSalary)}</p>
      )
    },
    { 
      header: "Status",
      accessor: "status",
      cell: (record) => (
        <StatusBadge 
          status={t(record.status)}
          type={getStatusType(record.status)}
        />
      )
    },
    { 
      header: "Actions", 
      accessor: (record) => record.id,
      cell: (record) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleViewPayroll(record)}>
              <FileText className="mr-2 h-4 w-4" />
              {t("View Payslip")}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleDownloadPayslip(record)}>
              <Download className="mr-2 h-4 w-4" />
              {t("Download")}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleEmailPayslip(record)}>
              <Mail className="mr-2 h-4 w-4" />
              {t("Email")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  ];
  
  // Table columns for penalties
  const penaltyColumns: Column<{ employee: PayrollRecord, penalty: Penalty }>[] = [
    { 
      header: "Employee",
      accessor: (item) => item.employee.employeeName,
      cell: (item) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-muted flex items-center justify-center">
            {item.employee.photoUrl ? (
              <img src={item.employee.photoUrl} alt={item.employee.employeeName} className="w-full h-full object-cover" />
            ) : (
              <User className="h-5 w-5 text-muted-foreground" />
            )}
          </div>
          <div>
            <p className="font-medium">{item.employee.employeeName}</p>
            <p className="text-xs text-gray-500">{item.employee.position}</p>
          </div>
        </div>
      )
    },
    { 
      header: "Penalty Type",
      accessor: (item) => item.penalty.type,
      cell: (item) => (
        <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
          {t(item.penalty.type)}
        </Badge>
      )
    },
    { 
      header: "Date",
      accessor: (item) => item.penalty.date,
      cell: (item) => format(new Date(item.penalty.date), "MMM dd, yyyy")
    },
    { 
      header: "Amount",
      accessor: (item) => item.penalty.amount,
      cell: (item) => (
        <p className="text-red-600">{formatCurrency(item.penalty.amount)}</p>
      )
    },
    { 
      header: "Reason",
      accessor: (item) => item.penalty.reason,
      cell: (item) => (
        <p className="max-w-[200px] truncate" title={item.penalty.reason}>
          {item.penalty.reason}
        </p>
      )
    },
    { 
      header: "Approved By",
      accessor: (item) => item.penalty.approvedBy,
      cell: (item) => item.penalty.approvedBy
    },
    { 
      header: "Status",
      accessor: (item) => item.penalty.status,
      cell: (item) => (
        <StatusBadge 
          status={t(item.penalty.status)}
          type={getStatusType(item.penalty.status)}
        />
      )
    },
    { 
      header: "Actions", 
      accessor: (item) => item.penalty.id,
      cell: (item) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleViewPayroll(item.employee)}>
              <FileText className="mr-2 h-4 w-4" />
              {t("View Payslip")}
            </DropdownMenuItem>
            {item.penalty.status === "Pending" && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => {
                  toast({
                    title: t("Penalty Approved"),
                    description: t("Penalty for {{name}} has been approved", { name: item.employee.employeeName })
                  });
                }}>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  {t("Approve")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => {
                  toast({
                    title: t("Penalty Rejected"),
                    description: t("Penalty for {{name}} has been rejected", { name: item.employee.employeeName })
                  });
                }}>
                  <XCircle className="mr-2 h-4 w-4" />
                  {t("Reject")}
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  ];
  
  return (
    <SubPageLayout
      title={t("Payroll & Penalties")}
      subtitle={t("Manage compensation and disciplinary actions")}
      parentLink="/hr"
      parentTitle={t("Human Resources")}
    >
      <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val as any)} className="mb-6">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="payroll">{t("Payroll")}</TabsTrigger>
          <TabsTrigger value="penalties">{t("Penalties")}</TabsTrigger>
        </TabsList>
      </Tabs>
      
      {activeTab === "payroll" && (
        <>
          {/* Payroll Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium flex items-center gap-1">
                  <Wallet className="h-4 w-4 text-green-600" />
                  {t("Average Salary")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(salaryStats.average)}
                </div>
                <p className="text-sm text-muted-foreground">
                  {t("May 2025")}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium flex items-center gap-1">
                  <Wallet className="h-4 w-4 text-blue-600" />
                  {t("Total Payroll")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(salaryStats.total)}
                </div>
                <p className="text-sm text-muted-foreground">
                  {t("May 2025")}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium flex items-center gap-1">
                  <Wallet className="h-4 w-4 text-amber-600" />
                  {t("Highest Salary")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(salaryStats.highest)}
                </div>
                <p className="text-sm text-muted-foreground">
                  {t("May 2025")}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium flex items-center gap-1">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  {t("Total Penalties")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {formatCurrency(penalties.reduce((sum, { penalty }) => sum + penalty.amount, 0))}
                </div>
                <p className="text-sm text-muted-foreground">
                  {penalties.length} {t("instances")}
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Payroll Table */}
          <Card>
            <CardHeader className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <CardTitle>{t("Payroll Records")}</CardTitle>
              
              <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    placeholder={t("Search employees...")}
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
                        {t("Status")}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuItem onClick={() => setStatusFilter("Completed")}>
                        {t("Completed")}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setStatusFilter("Pending")}>
                        {t("Pending")}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setStatusFilter("Processing")}>
                        {t("Processing")}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setStatusFilter("Paid")}>
                        {t("Paid")}
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
                        {t("Month")}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      {getAllMonths().map(month => (
                        <DropdownMenuItem key={month} onClick={() => setMonthFilter(month)}>
                          {t(month)}
                        </DropdownMenuItem>
                      ))}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => setMonthFilter("")}>
                        {t("All Months")}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="gap-2">
                        <Building size={16} />
                        {t("Department")}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      {getAllDepartments().map(dept => (
                        <DropdownMenuItem key={dept} onClick={() => setDepartmentFilter(dept)}>
                          {t(dept)}
                        </DropdownMenuItem>
                      ))}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => setDepartmentFilter("")}>
                        {t("All Departments")}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <DataTable
                data={filteredPayroll}
                columns={payrollColumns}
              />
            </CardContent>
          </Card>
        </>
      )}
      
      {activeTab === "penalties" && (
        <>
          {/* Penalties Table */}
          <Card>
            <CardHeader className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <CardTitle>{t("Penalties & Disciplinary Actions")}</CardTitle>
              
              <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    placeholder={t("Search employees...")}
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
                        {t("Status")}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuItem onClick={() => setStatusFilter("Approved")}>
                        {t("Approved")}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setStatusFilter("Pending")}>
                        {t("Pending")}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setStatusFilter("Rejected")}>
                        {t("Rejected")}
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
                        <Building size={16} />
                        {t("Department")}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      {getAllDepartments().map(dept => (
                        <DropdownMenuItem key={dept} onClick={() => setDepartmentFilter(dept)}>
                          {t(dept)}
                        </DropdownMenuItem>
                      ))}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => setDepartmentFilter("")}>
                        {t("All Departments")}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  
                  <Button className="gap-2" onClick={() => setAddPenaltyDialog(true)}>
                    <Plus size={16} />
                    {t("Add Penalty")}
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              {filteredPenalties.length > 0 ? (
                <DataTable
                  data={filteredPenalties}
                  columns={penaltyColumns}
                />
              ) : (
                <div className="text-center py-10">
                  <AlertCircle className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
                  <p className="text-muted-foreground">{t("No penalties found")}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
      
      {/* View Payroll Dialog */}
      <Dialog open={viewPayrollDialog} onOpenChange={setViewPayrollDialog}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t("Payslip Details")}</DialogTitle>
            <DialogDescription>
              {selectedPayroll?.employeeName} • {selectedPayroll?.month} {selectedPayroll?.year}
            </DialogDescription>
          </DialogHeader>
          
          {selectedPayroll && (
            <div className="space-y-4 py-2">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-muted flex items-center justify-center">
                    {selectedPayroll.photoUrl ? (
                      <img src={selectedPayroll.photoUrl} alt={selectedPayroll.employeeName} className="w-full h-full object-cover" />
                    ) : (
                      <User className="h-8 w-8 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{selectedPayroll.employeeName}</h3>
                    <p className="text-muted-foreground">
                      {selectedPayroll.position} • {selectedPayroll.rank} • {selectedPayroll.department}
                    </p>
                  </div>
                </div>
                
                <div className="mt-4 md:mt-0">
                  <StatusBadge 
                    status={t(selectedPayroll.status)}
                    type={getStatusType(selectedPayroll.status)}
                  />
                  {selectedPayroll.paymentDate && (
                    <p className="text-xs text-gray-500 mt-1 text-right">
                      {t("Paid")}: {format(new Date(selectedPayroll.paymentDate), "MMM dd, yyyy")}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="bg-muted/40 rounded-lg p-4 space-y-2">
                <div className="flex justify-between border-b pb-2">
                  <p className="font-medium">{t("Payroll ID")}</p>
                  <p>{selectedPayroll.id}</p>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <p className="font-medium">{t("Employee ID")}</p>
                  <p>{selectedPayroll.employeeId}</p>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <p className="font-medium">{t("Payment Period")}</p>
                  <p>{selectedPayroll.month} {selectedPayroll.year}</p>
                </div>
                {selectedPayroll.paymentMethod && (
                  <div className="flex justify-between border-b pb-2">
                    <p className="font-medium">{t("Payment Method")}</p>
                    <p>{selectedPayroll.paymentMethod}</p>
                  </div>
                )}
                {selectedPayroll.bankAccount && (
                  <div className="flex justify-between">
                    <p className="font-medium">{t("Bank Account")}</p>
                    <p>{selectedPayroll.bankAccount}</p>
                  </div>
                )}
              </div>
              
              {/* Salary Breakdown */}
              <div className="bg-muted/40 rounded-lg p-4">
                <h4 className="font-medium mb-3">{t("Salary Breakdown")}</h4>
                
                <div className="space-y-3">
                  <div className="flex justify-between border-b pb-2">
                    <p>{t("Basic Salary")}</p>
                    <p>{formatCurrency(selectedPayroll.basicSalary)}</p>
                  </div>
                  
                  {/* Allowances */}
                  {selectedPayroll.allowances.length > 0 && (
                    <div className="space-y-2">
                      <p className="font-medium">{t("Allowances")}</p>
                      {selectedPayroll.allowances.map(allowance => (
                        <div key={allowance.id} className="flex justify-between pl-4 text-sm">
                          <p>{t(allowance.type)}</p>
                          <p>{formatCurrency(allowance.amount)}</p>
                        </div>
                      ))}
                      <div className="flex justify-between border-b pb-2 pt-1">
                        <p className="font-medium">{t("Total Allowances")}</p>
                        <p>{formatCurrency(selectedPayroll.allowances.reduce((sum, a) => sum + a.amount, 0))}</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Deductions */}
                  {(selectedPayroll.deductions.length > 0 || selectedPayroll.penalties.length > 0) && (
                    <div className="space-y-2">
                      <p className="font-medium">{t("Deductions")}</p>
                      {selectedPayroll.deductions.map(deduction => (
                        <div key={deduction.id} className="flex justify-between pl-4 text-sm">
                          <p>{t(deduction.type)}</p>
                          <p className="text-red-600">-{formatCurrency(deduction.amount)}</p>
                        </div>
                      ))}
                      {selectedPayroll.penalties.map(penalty => (
                        <div key={penalty.id} className="flex justify-between pl-4 text-sm">
                          <p>{t("Penalty")}: {t(penalty.type)}</p>
                          <p className="text-red-600">-{formatCurrency(penalty.amount)}</p>
                        </div>
                      ))}
                      <div className="flex justify-between border-b pb-2 pt-1">
                        <p className="font-medium">{t("Total Deductions")}</p>
                        <p className="text-red-600">-{formatCurrency(
                          selectedPayroll.deductions.reduce((sum, d) => sum + d.amount, 0) +
                          selectedPayroll.penalties.reduce((sum, p) => sum + p.amount, 0)
                        )}</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Bonuses */}
                  {selectedPayroll.bonuses.length > 0 && (
                    <div className="space-y-2">
                      <p className="font-medium">{t("Bonuses")}</p>
                      {selectedPayroll.bonuses.map(bonus => (
                        <div key={bonus.id} className="flex justify-between pl-4 text-sm">
                          <p>{t(bonus.type)}</p>
                          <p className="text-green-600">{formatCurrency(bonus.amount)}</p>
                        </div>
                      ))}
                      <div className="flex justify-between border-b pb-2 pt-1">
                        <p className="font-medium">{t("Total Bonuses")}</p>
                        <p className="text-green-600">{formatCurrency(
                          selectedPayroll.bonuses.reduce((sum, b) => sum + b.amount, 0)
                        )}</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Net Salary */}
                  <div className="flex justify-between pt-2 font-semibold">
                    <p className="text-lg">{t("Net Salary")}</p>
                    <p className="text-lg">{formatCurrency(selectedPayroll.netSalary)}</p>
                  </div>
                </div>
              </div>
              
              {selectedPayroll.comments && (
                <div className="bg-muted/40 rounded-lg p-4">
                  <h4 className="font-medium mb-2">{t("Comments")}</h4>
                  <p>{selectedPayroll.comments}</p>
                </div>
              )}
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" className="gap-2" onClick={() => handleEmailPayslip(selectedPayroll)}>
                  <Mail className="h-4 w-4" />
                  {t("Email Payslip")}
                </Button>
                <Button className="gap-2" onClick={() => handleDownloadPayslip(selectedPayroll)}>
                  <Download className="h-4 w-4" />
                  {t("Download Payslip")}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Add Penalty Dialog */}
      <Dialog open={addPenaltyDialog} onOpenChange={setAddPenaltyDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("Add Penalty")}</DialogTitle>
            <DialogDescription>
              {t("Add a new penalty or disciplinary action")}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div>
              <Label htmlFor="penaltyEmployee">{t("Select Employee")}</Label>
              <select id="penaltyEmployee" className="w-full p-2 border rounded-md mt-1">
                {payrollRecords.map(employee => (
                  <option key={employee.employeeId} value={employee.employeeId}>
                    {employee.employeeName} ({employee.employeeId})
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <Label htmlFor="penaltyType">{t("Penalty Type")}</Label>
              <select id="penaltyType" className="w-full p-2 border rounded-md mt-1">
                <option value="Late Arrival">{t("Late Arrival")}</option>
                <option value="Absent Without Leave">{t("Absent Without Leave")}</option>
                <option value="Policy Violation">{t("Policy Violation")}</option>
                <option value="Performance Issue">{t("Performance Issue")}</option>
                <option value="Misconduct">{t("Misconduct")}</option>
                <option value="Other">{t("Other")}</option>
              </select>
            </div>
            
            <div>
              <Label htmlFor="penaltyAmount">{t("Amount (OMR)")}</Label>
              <Input 
                id="penaltyAmount" 
                type="number" 
                min="0" 
                step="0.001" 
                placeholder="0.000" 
                className="mt-1" 
              />
            </div>
            
            <div>
              <Label htmlFor="penaltyDate">{t("Date")}</Label>
              <Input id="penaltyDate" type="date" className="mt-1" />
            </div>
            
            <div>
              <Label htmlFor="penaltyReason">{t("Reason")}</Label>
              <textarea 
                id="penaltyReason" 
                className="w-full min-h-[80px] p-2 border rounded-md mt-1" 
                placeholder={t("Enter reason for penalty...")}
              ></textarea>
            </div>
            
            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={() => setAddPenaltyDialog(false)}>
                {t("Cancel")}
              </Button>
              <Button onClick={() => {
                toast({
                  title: t("Penalty Added"),
                  description: t("Penalty has been added successfully")
                });
                setAddPenaltyDialog(false);
              }}>
                {t("Add Penalty")}
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </SubPageLayout>
  );
}
