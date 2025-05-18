
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
  Building,
  User,
  FileText,
  Download,
  Calendar,
  Check,
  X,
  Wallet,
  BarChart3,
  CreditCard,
  Plus,
  CalendarDays,
  AlertCircle,
  DollarSign
} from "lucide-react";
import { format, addMonths, parse, differenceInDays } from "date-fns";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";

// Types
interface AdvanceLoan {
  id: string;
  employeeId: string;
  employeeName: string;
  rank: string;
  position: string;
  department: string;
  type: "Salary Advance" | "Short Term Loan" | "Long Term Loan" | "Housing Loan" | "Emergency Loan";
  amount: number;
  currency: string;
  requestDate: string;
  approvalDate?: string;
  approvedBy?: string;
  status: "Pending" | "Approved" | "Rejected" | "Cancelled" | "Closed";
  disbursementDate?: string;
  reason: string;
  repaymentPeriodMonths: number;
  repaymentStartDate?: string;
  repaymentEndDate?: string;
  repaymentAmount?: number;
  repaymentSchedule?: RepaymentItem[];
  comments?: string;
  photoUrl?: string;
}

interface RepaymentItem {
  id: string;
  dueDate: string;
  amount: number;
  status: "Pending" | "Paid" | "Overdue" | "Partial";
  paidAmount?: number;
  paidDate?: string;
}

export default function AdvancesLoans() {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  // State
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [viewLoanDialog, setViewLoanDialog] = useState(false);
  const [newLoanDialog, setNewLoanDialog] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState<AdvanceLoan | null>(null);
  const [activeTab, setActiveTab] = useState<"active" | "pending" | "closed">("active");
  
  // Sample loans and advances data
  const advancesLoans: AdvanceLoan[] = [
    {
      id: "LOAN-2025-001",
      employeeId: "10001",
      employeeName: "Ahmed Al Balushi",
      rank: "Senior",
      position: "Security Manager",
      department: "Security",
      type: "Salary Advance",
      amount: 950,
      currency: "OMR",
      requestDate: "2025-04-10",
      approvalDate: "2025-04-15",
      approvedBy: "Lt. Col. Mohammed Al Habsi",
      status: "Approved",
      disbursementDate: "2025-04-20",
      reason: "Medical emergency",
      repaymentPeriodMonths: 3,
      repaymentStartDate: "2025-05-01",
      repaymentEndDate: "2025-07-31",
      repaymentAmount: 316.67,
      repaymentSchedule: [
        { id: "REP-001-1", dueDate: "2025-05-31", amount: 316.67, status: "Paid", paidAmount: 316.67, paidDate: "2025-05-28" },
        { id: "REP-001-2", dueDate: "2025-06-30", amount: 316.67, status: "Pending" },
        { id: "REP-001-3", dueDate: "2025-07-31", amount: 316.66, status: "Pending" }
      ],
      photoUrl: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=200&h=200&fit=crop"
    },
    {
      id: "LOAN-2025-002",
      employeeId: "10002",
      employeeName: "Fatima Al Lawati",
      rank: "Mid",
      position: "HR Specialist",
      department: "Human Resources",
      type: "Short Term Loan",
      amount: 2500,
      currency: "OMR",
      requestDate: "2025-03-05",
      approvalDate: "2025-03-10",
      approvedBy: "Aisha Al Maqbali",
      status: "Approved",
      disbursementDate: "2025-03-15",
      reason: "Education expenses for children",
      repaymentPeriodMonths: 12,
      repaymentStartDate: "2025-04-01",
      repaymentEndDate: "2026-03-31",
      repaymentAmount: 208.33,
      repaymentSchedule: [
        { id: "REP-002-1", dueDate: "2025-04-30", amount: 208.33, status: "Paid", paidAmount: 208.33, paidDate: "2025-04-25" },
        { id: "REP-002-2", dueDate: "2025-05-31", amount: 208.33, status: "Paid", paidAmount: 208.33, paidDate: "2025-05-28" },
        { id: "REP-002-3", dueDate: "2025-06-30", amount: 208.33, status: "Pending" },
        // Remaining months would be listed here
      ],
      photoUrl: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=200&h=200&fit=crop"
    },
    {
      id: "LOAN-2025-003",
      employeeId: "10003",
      employeeName: "Salim Al Habsi",
      rank: "Mid",
      position: "IT Administrator",
      department: "IT",
      type: "Long Term Loan",
      amount: 5000,
      currency: "OMR",
      requestDate: "2025-02-15",
      approvalDate: "2025-02-25",
      approvedBy: "Nasser Al Busaidi",
      status: "Approved",
      disbursementDate: "2025-03-01",
      reason: "Home renovation",
      repaymentPeriodMonths: 24,
      repaymentStartDate: "2025-04-01",
      repaymentEndDate: "2027-03-31",
      repaymentAmount: 208.33,
      repaymentSchedule: [
        { id: "REP-003-1", dueDate: "2025-04-30", amount: 208.33, status: "Paid", paidAmount: 208.33, paidDate: "2025-04-27" },
        { id: "REP-003-2", dueDate: "2025-05-31", amount: 208.33, status: "Paid", paidAmount: 208.33, paidDate: "2025-05-29" },
        { id: "REP-003-3", dueDate: "2025-06-30", amount: 208.33, status: "Pending" },
        // Remaining months would be listed here
      ],
      photoUrl: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=200&h=200&fit=crop"
    },
    {
      id: "LOAN-2025-004",
      employeeId: "10004",
      employeeName: "Abdullah Al Shehi",
      rank: "Senior",
      position: "Facilities Manager",
      department: "Facilities",
      type: "Salary Advance",
      amount: 850,
      currency: "OMR",
      requestDate: "2025-05-05",
      approvalDate: "2025-05-10",
      approvedBy: "Ahmed Al Farsi",
      status: "Approved",
      disbursementDate: "2025-05-15",
      reason: "Family emergency",
      repaymentPeriodMonths: 2,
      repaymentStartDate: "2025-06-01",
      repaymentEndDate: "2025-07-31",
      repaymentAmount: 425,
      repaymentSchedule: [
        { id: "REP-004-1", dueDate: "2025-06-30", amount: 425, status: "Pending" },
        { id: "REP-004-2", dueDate: "2025-07-31", amount: 425, status: "Pending" }
      ],
      photoUrl: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=200&h=200&fit=crop"
    },
    {
      id: "LOAN-2025-005",
      employeeId: "10006",
      employeeName: "Hassan Al Raisi",
      rank: "Mid",
      position: "Training Coordinator",
      department: "Training",
      type: "Emergency Loan",
      amount: 1200,
      currency: "OMR",
      requestDate: "2025-05-12",
      status: "Pending",
      reason: "Medical emergency for family member",
      repaymentPeriodMonths: 6,
      photoUrl: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=200&h=200&fit=crop"
    },
    {
      id: "LOAN-2025-006",
      employeeId: "10007",
      employeeName: "Aisha Al Maqbali",
      rank: "Senior",
      position: "HR Director",
      department: "Human Resources",
      type: "Housing Loan",
      amount: 15000,
      currency: "OMR",
      requestDate: "2024-11-10",
      approvalDate: "2024-11-20",
      approvedBy: "CEO Office",
      status: "Closed",
      disbursementDate: "2024-12-01",
      reason: "House purchase down payment",
      repaymentPeriodMonths: 36,
      repaymentStartDate: "2025-01-01",
      repaymentEndDate: "2027-12-31",
      repaymentAmount: 416.67,
      comments: "Loan closed early due to full payment on 2025-04-30",
      photoUrl: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=200&h=200&fit=crop"
    },
    {
      id: "LOAN-2025-007",
      employeeId: "10008",
      employeeName: "Mohammed Al Zadjali",
      rank: "Junior",
      position: "Security Officer",
      department: "Security",
      type: "Short Term Loan",
      amount: 1000,
      currency: "OMR",
      requestDate: "2025-05-08",
      status: "Rejected",
      reason: "Car repairs",
      repaymentPeriodMonths: 4,
      comments: "Application declined due to existing loan obligations. Can reapply after July 2025.",
      photoUrl: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=200&h=200&fit=crop"
    }
  ];
  
  // Filtered loans by tab
  const activeLoans = advancesLoans.filter(loan => loan.status === "Approved");
  const pendingLoans = advancesLoans.filter(loan => loan.status === "Pending");
  const closedLoans = advancesLoans.filter(loan => 
    loan.status === "Closed" || loan.status === "Rejected" || loan.status === "Cancelled"
  );
  
  // Get current tab loans
  const getCurrentTabLoans = () => {
    switch(activeTab) {
      case "active": return activeLoans;
      case "pending": return pendingLoans;
      case "closed": return closedLoans;
      default: return activeLoans;
    }
  };
  
  // Filtered loans by search and filters
  const filteredLoans = getCurrentTabLoans().filter(loan => {
    const matchesSearch = loan.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         loan.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         loan.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter ? loan.type === typeFilter : true;
    const matchesDepartment = departmentFilter ? loan.department === departmentFilter : true;
    
    return matchesSearch && matchesType && matchesDepartment;
  });
  
  // Handle view loan/advance details
  const handleViewLoan = (loan: AdvanceLoan) => {
    setSelectedLoan(loan);
    setViewLoanDialog(true);
  };
  
  // Handle approve loan
  const handleApproveLoan = (loan: AdvanceLoan) => {
    toast({
      title: t("Loan Approved"),
      description: t("Loan request for {{name}} has been approved", { name: loan.employeeName })
    });
  };
  
  // Handle reject loan
  const handleRejectLoan = (loan: AdvanceLoan) => {
    toast({
      title: t("Loan Rejected"),
      description: t("Loan request for {{name}} has been rejected", { name: loan.employeeName })
    });
  };
  
  // Handle download loan document
  const handleDownloadDocument = (loan: AdvanceLoan) => {
    toast({
      title: t("Document Downloaded"),
      description: t("Loan document for {{id}} has been downloaded", { id: loan.id })
    });
  };
  
  // Status badge type mapping
  const getStatusType = (status: string) => {
    switch(status) {
      case "Approved": return "success";
      case "Rejected": return "danger";
      case "Pending": return "warning";
      case "Cancelled": return "danger";
      case "Closed": return "info";
      case "Paid": return "success";
      case "Overdue": return "danger";
      case "Partial": return "warning";
      default: return "info";
    }
  };
  
  // Format currency
  const formatCurrency = (amount: number, currency: string = "OMR") => {
    return new Intl.NumberFormat('en-OM', { 
      style: 'currency', 
      currency: currency,
      minimumFractionDigits: 3
    }).format(amount);
  };
  
  // Get all loan types for filter
  const getAllLoanTypes = () => {
    const types = new Set(advancesLoans.map(loan => loan.type));
    return Array.from(types);
  };
  
  // Get all departments for filter
  const getAllDepartments = () => {
    const departments = new Set(advancesLoans.map(loan => loan.department));
    return Array.from(departments);
  };
  
  // Calculate loan statistics
  const calculateLoanStats = () => {
    const totalActiveAmount = activeLoans.reduce((sum, loan) => sum + loan.amount, 0);
    const totalPendingAmount = pendingLoans.reduce((sum, loan) => sum + loan.amount, 0);
    const averageLoanAmount = activeLoans.length > 0 ? totalActiveAmount / activeLoans.length : 0;
    
    let totalRepaid = 0;
    let totalOutstanding = 0;
    
    activeLoans.forEach(loan => {
      if (loan.repaymentSchedule) {
        const repaidItems = loan.repaymentSchedule.filter(item => item.status === "Paid");
        const repaidAmount = repaidItems.reduce((sum, item) => sum + (item.paidAmount || 0), 0);
        totalRepaid += repaidAmount;
        totalOutstanding += loan.amount - repaidAmount;
      } else {
        totalOutstanding += loan.amount;
      }
    });
    
    return { 
      totalActive: activeLoans.length,
      totalPending: pendingLoans.length,
      totalClosed: closedLoans.length,
      totalActiveAmount,
      totalPendingAmount,
      averageLoanAmount,
      totalRepaid,
      totalOutstanding
    };
  };
  
  const loanStats = calculateLoanStats();
  
  // Calculate repayment progress
  const calculateRepaymentProgress = (loan: AdvanceLoan) => {
    if (!loan.repaymentSchedule) return 0;
    
    const paidItems = loan.repaymentSchedule.filter(item => item.status === "Paid");
    const paidAmount = paidItems.reduce((sum, item) => sum + (item.paidAmount || 0), 0);
    return (paidAmount / loan.amount) * 100;
  };
  
  // Loan columns
  const loanColumns: Column<AdvanceLoan>[] = [
    { 
      header: "Employee",
      accessor: "employeeName",
      cell: (loan) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-muted flex items-center justify-center">
            {loan.photoUrl ? (
              <img src={loan.photoUrl} alt={loan.employeeName} className="w-full h-full object-cover" />
            ) : (
              <User className="h-5 w-5 text-muted-foreground" />
            )}
          </div>
          <div>
            <p className="font-medium">{loan.employeeName}</p>
            <p className="text-xs text-gray-500">{loan.department}</p>
          </div>
        </div>
      )
    },
    { 
      header: "Loan Type",
      accessor: "type",
      cell: (loan) => (
        <div>
          <p>{t(loan.type)}</p>
          <p className="text-xs text-gray-500">
            {loan.approvalDate ? format(new Date(loan.approvalDate), "MMM dd, yyyy") : "-"}
          </p>
        </div>
      )
    },
    { 
      header: "Amount",
      accessor: "amount",
      cell: (loan) => formatCurrency(loan.amount, loan.currency)
    },
    { 
      header: "Repayment",
      accessor: (loan) => loan.repaymentPeriodMonths,
      cell: (loan) => (
        <div>
          <p>{loan.repaymentPeriodMonths} {t("months")}</p>
          {loan.repaymentAmount && (
            <p className="text-xs text-gray-500">
              {formatCurrency(loan.repaymentAmount, loan.currency)}/{t("month")}
            </p>
          )}
        </div>
      )
    },
    { 
      header: "Progress",
      accessor: (loan) => calculateRepaymentProgress(loan),
      cell: (loan) => {
        if (activeTab !== "active" || !loan.repaymentSchedule) {
          return <p className="text-muted-foreground italic">-</p>;
        }
        
        const progress = calculateRepaymentProgress(loan);
        return (
          <div className="w-28">
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-right mt-1">{Math.round(progress)}%</p>
          </div>
        );
      }
    },
    { 
      header: "Status",
      accessor: "status",
      cell: (loan) => (
        <StatusBadge 
          status={t(loan.status)}
          type={getStatusType(loan.status)}
        />
      )
    },
    { 
      header: "Actions", 
      accessor: "id",
      cell: (loan) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleViewLoan(loan)}>
              <FileText className="mr-2 h-4 w-4" />
              {t("View Details")}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDownloadDocument(loan)}>
              <Download className="mr-2 h-4 w-4" />
              {t("Download Agreement")}
            </DropdownMenuItem>
            
            {loan.status === "Pending" && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleApproveLoan(loan)}>
                  <Check className="mr-2 h-4 w-4" />
                  {t("Approve")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleRejectLoan(loan)}>
                  <X className="mr-2 h-4 w-4" />
                  {t("Reject")}
                </DropdownMenuItem>
              </>
            )}
            
            {loan.status === "Approved" && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => {
                  toast({
                    title: t("Record Payment"),
                    description: t("Recording payment for {{name}}'s loan", { name: loan.employeeName })
                  });
                }}>
                  <Wallet className="mr-2 h-4 w-4" />
                  {t("Record Payment")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => {
                  toast({
                    title: t("Close Loan"),
                    description: t("Marking loan as fully paid")
                  });
                }}>
                  <Check className="mr-2 h-4 w-4" />
                  {t("Close Loan")}
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
      title={t("Advances & Loans")}
      subtitle={t("Manage employee financial assistance programs")}
      parentLink="/hr"
      parentTitle={t("Human Resources")}
    >
      {/* Loan Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center gap-1">
              <Wallet className="h-4 w-4 text-blue-600" />
              {t("Active Loans")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loanStats.totalActive}</div>
            <p className="text-sm text-muted-foreground">
              {formatCurrency(loanStats.totalActiveAmount)}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center gap-1">
              <BarChart3 className="h-4 w-4 text-amber-600" />
              {t("Outstanding Balance")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">
              {formatCurrency(loanStats.totalOutstanding)}
            </div>
            <p className="text-sm text-muted-foreground">
              {t("Still to be repaid")}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center gap-1">
              <AlertCircle className="h-4 w-4 text-amber-600" />
              {t("Pending Requests")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loanStats.totalPending}
            </div>
            <p className="text-sm text-muted-foreground">
              {formatCurrency(loanStats.totalPendingAmount)}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center gap-1">
              <CreditCard className="h-4 w-4 text-green-600" />
              {t("Average Loan")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(loanStats.averageLoanAmount)}
            </div>
            <p className="text-sm text-muted-foreground">
              {t("Per employee")}
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Loans & Advances Table */}
      <Card>
        <CardHeader className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle>{t("Advances & Loans")}</CardTitle>
            
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
                      {t("Type")}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    {getAllLoanTypes().map(type => (
                      <DropdownMenuItem key={type} onClick={() => setTypeFilter(type)}>
                        {t(type)}
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setTypeFilter("")}>
                      {t("All Types")}
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
                
                <Button className="gap-2" onClick={() => setNewLoanDialog(true)}>
                  <Plus size={16} />
                  {t("New Request")}
                </Button>
              </div>
            </div>
          </div>
          
          <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val as any)}>
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="active">
                {t("Active")} ({activeLoans.length})
              </TabsTrigger>
              <TabsTrigger value="pending">
                {t("Pending")} ({pendingLoans.length})
              </TabsTrigger>
              <TabsTrigger value="closed">
                {t("Closed")} ({closedLoans.length})
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        
        <CardContent>
          {filteredLoans.length > 0 ? (
            <DataTable
              data={filteredLoans}
              columns={loanColumns}
            />
          ) : (
            <div className="text-center py-10">
              <Wallet className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
              <p className="text-muted-foreground">{t("No loans or advances found")}</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* View Loan Details Dialog */}
      <Dialog open={viewLoanDialog} onOpenChange={setViewLoanDialog}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t("Loan Details")}</DialogTitle>
            <DialogDescription>
              {selectedLoan?.id} • {selectedLoan?.employeeName}
            </DialogDescription>
          </DialogHeader>
          
          {selectedLoan && (
            <div className="space-y-4 py-2">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-muted flex items-center justify-center">
                    {selectedLoan.photoUrl ? (
                      <img src={selectedLoan.photoUrl} alt={selectedLoan.employeeName} className="w-full h-full object-cover" />
                    ) : (
                      <User className="h-8 w-8 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{selectedLoan.employeeName}</h3>
                    <p className="text-muted-foreground">
                      {selectedLoan.position} • {selectedLoan.department}
                    </p>
                  </div>
                </div>
                
                <div className="mt-4 md:mt-0">
                  <StatusBadge 
                    status={t(selectedLoan.status)}
                    type={getStatusType(selectedLoan.status)}
                  />
                </div>
              </div>
              
              {/* Loan Information */}
              <div className="bg-muted/40 rounded-lg p-4">
                <h4 className="font-medium mb-3">{t("Loan Information")}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">{t("Loan Type")}</p>
                    <p className="font-medium">{t(selectedLoan.type)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t("Loan Amount")}</p>
                    <p className="font-medium">{formatCurrency(selectedLoan.amount, selectedLoan.currency)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t("Request Date")}</p>
                    <p className="font-medium">{format(new Date(selectedLoan.requestDate), "MMMM dd, yyyy")}</p>
                  </div>
                  {selectedLoan.approvalDate && (
                    <div>
                      <p className="text-sm text-muted-foreground">{t("Approval Date")}</p>
                      <p className="font-medium">{format(new Date(selectedLoan.approvalDate), "MMMM dd, yyyy")}</p>
                    </div>
                  )}
                  {selectedLoan.disbursementDate && (
                    <div>
                      <p className="text-sm text-muted-foreground">{t("Disbursement Date")}</p>
                      <p className="font-medium">{format(new Date(selectedLoan.disbursementDate), "MMMM dd, yyyy")}</p>
                    </div>
                  )}
                  {selectedLoan.approvedBy && (
                    <div>
                      <p className="text-sm text-muted-foreground">{t("Approved By")}</p>
                      <p className="font-medium">{selectedLoan.approvedBy}</p>
                    </div>
                  )}
                </div>
                
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground">{t("Reason")}</p>
                  <p className="mt-1">{selectedLoan.reason}</p>
                </div>
              </div>
              
              {/* Repayment Information */}
              <div className="bg-muted/40 rounded-lg p-4">
                <h4 className="font-medium mb-3">{t("Repayment Information")}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">{t("Repayment Period")}</p>
                    <p className="font-medium">{selectedLoan.repaymentPeriodMonths} {t("months")}</p>
                  </div>
                  {selectedLoan.repaymentAmount && (
                    <div>
                      <p className="text-sm text-muted-foreground">{t("Monthly Installment")}</p>
                      <p className="font-medium">{formatCurrency(selectedLoan.repaymentAmount, selectedLoan.currency)}</p>
                    </div>
                  )}
                  {selectedLoan.repaymentStartDate && (
                    <div>
                      <p className="text-sm text-muted-foreground">{t("Start Date")}</p>
                      <p className="font-medium">{format(new Date(selectedLoan.repaymentStartDate), "MMMM dd, yyyy")}</p>
                    </div>
                  )}
                  {selectedLoan.repaymentEndDate && (
                    <div>
                      <p className="text-sm text-muted-foreground">{t("End Date")}</p>
                      <p className="font-medium">{format(new Date(selectedLoan.repaymentEndDate), "MMMM dd, yyyy")}</p>
                    </div>
                  )}
                </div>
                
                {selectedLoan.repaymentSchedule && selectedLoan.repaymentSchedule.length > 0 && (
                  <div className="mt-6">
                    <h5 className="font-medium mb-3">{t("Repayment Schedule")}</h5>
                    <div className="border rounded-md overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-muted/50">
                          <tr>
                            <th className="px-4 py-2 text-left">{t("Due Date")}</th>
                            <th className="px-4 py-2 text-right">{t("Amount")}</th>
                            <th className="px-4 py-2 text-center">{t("Status")}</th>
                            <th className="px-4 py-2 text-left">{t("Payment Date")}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {selectedLoan.repaymentSchedule.map((item) => (
                            <tr key={item.id}>
                              <td className="px-4 py-3">
                                {format(new Date(item.dueDate), "MMM dd, yyyy")}
                              </td>
                              <td className="px-4 py-3 text-right">
                                {formatCurrency(item.amount, selectedLoan.currency)}
                              </td>
                              <td className="px-4 py-3 text-center">
                                <StatusBadge 
                                  status={t(item.status)}
                                  type={getStatusType(item.status)}
                                />
                              </td>
                              <td className="px-4 py-3">
                                {item.paidDate ? format(new Date(item.paidDate), "MMM dd, yyyy") : "-"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                
                {/* Repayment Progress */}
                {selectedLoan.status === "Approved" && selectedLoan.repaymentSchedule && (
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <p>{t("Repayment Progress")}</p>
                      <p>{Math.round(calculateRepaymentProgress(selectedLoan))}%</p>
                    </div>
                    <Progress value={calculateRepaymentProgress(selectedLoan)} className="h-2" />
                  </div>
                )}
              </div>
              
              {/* Comments */}
              {selectedLoan.comments && (
                <div className="bg-muted/40 rounded-lg p-4">
                  <h4 className="font-medium mb-2">{t("Comments")}</h4>
                  <p>{selectedLoan.comments}</p>
                </div>
              )}
              
              {/* Actions */}
              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => handleDownloadDocument(selectedLoan)}>
                  <Download className="mr-2 h-4 w-4" />
                  {t("Download Agreement")}
                </Button>
                
                <div className="flex gap-2">
                  {selectedLoan.status === "Pending" && (
                    <>
                      <Button variant="destructive" onClick={() => handleRejectLoan(selectedLoan)}>
                        <X className="mr-2 h-4 w-4" />
                        {t("Reject")}
                      </Button>
                      <Button onClick={() => handleApproveLoan(selectedLoan)}>
                        <Check className="mr-2 h-4 w-4" />
                        {t("Approve")}
                      </Button>
                    </>
                  )}
                  
                  {selectedLoan.status === "Approved" && (
                    <Button onClick={() => {
                      toast({
                        title: t("Record Payment"),
                        description: t("Recording payment for {{name}}'s loan", { name: selectedLoan.employeeName })
                      });
                    }}>
                      <DollarSign className="mr-2 h-4 w-4" />
                      {t("Record Payment")}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* New Loan Request Dialog */}
      <Dialog open={newLoanDialog} onOpenChange={setNewLoanDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("New Loan Request")}</DialogTitle>
            <DialogDescription>
              {t("Create a new loan or salary advance request")}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div>
              <Label htmlFor="employeeSelect">{t("Employee")}</Label>
              <select id="employeeSelect" className="w-full p-2 border rounded-md mt-1">
                <option value="">{t("Select Employee")}</option>
                {advancesLoans.map(loan => (
                  <option key={loan.employeeId} value={loan.employeeId}>
                    {loan.employeeName} ({loan.employeeId})
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <Label htmlFor="loanType">{t("Loan Type")}</Label>
              <select id="loanType" className="w-full p-2 border rounded-md mt-1">
                <option value="Salary Advance">{t("Salary Advance")}</option>
                <option value="Short Term Loan">{t("Short Term Loan")}</option>
                <option value="Emergency Loan">{t("Emergency Loan")}</option>
                <option value="Long Term Loan">{t("Long Term Loan")}</option>
                <option value="Housing Loan">{t("Housing Loan")}</option>
              </select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="amount">{t("Loan Amount")}</Label>
                <Input id="amount" type="number" min="0" step="0.001" placeholder="0.000" />
              </div>
              <div>
                <Label htmlFor="repaymentPeriod">{t("Repayment Period (months)")}</Label>
                <Input id="repaymentPeriod" type="number" min="1" max="60" defaultValue="12" />
              </div>
            </div>
            
            <div>
              <Label htmlFor="requestDate">{t("Request Date")}</Label>
              <Input id="requestDate" type="date" defaultValue={format(new Date(), "yyyy-MM-dd")} />
            </div>
            
            <div>
              <Label htmlFor="reason">{t("Reason")}</Label>
              <textarea 
                id="reason" 
                className="w-full min-h-[80px] p-2 border rounded-md"
                placeholder={t("Enter reason for loan request...")}
              ></textarea>
            </div>
            
            <div>
              <Label htmlFor="comments">{t("Additional Comments")}</Label>
              <textarea 
                id="comments" 
                className="w-full min-h-[60px] p-2 border rounded-md"
                placeholder={t("Any additional comments...")}
              ></textarea>
            </div>
          </div>
          
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setNewLoanDialog(false)}>
              {t("Cancel")}
            </Button>
            <Button onClick={() => {
              toast({
                title: t("Loan Request Submitted"),
                description: t("Loan request has been submitted for approval")
              });
              setNewLoanDialog(false);
            }}>
              {t("Submit Request")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SubPageLayout>
  );
}
