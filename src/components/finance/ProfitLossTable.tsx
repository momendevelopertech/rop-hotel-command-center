
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useLanguage } from "@/contexts/LanguageContext";

interface ProfitLossTableProps {
  period: string;
  year: string;
  quarter?: string;
  month?: string;
}

export function ProfitLossTable({ period, year, quarter, month }: ProfitLossTableProps) {
  const { t } = useLanguage();
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-OM', { 
      style: 'currency', 
      currency: 'OMR',
      minimumFractionDigits: 3
    }).format(amount);
  };
  
  // Sample income data
  const incomeData = [
    { category: "Event Revenue", amount: 12500 },
    { category: "Catering Services", amount: 5800 },
    { category: "Room Bookings", amount: 2400 },
    { category: "Membership Fees", amount: 950 },
    { category: "Venue Rental", amount: 250 }
  ];
  
  // Calculate total income
  const totalIncome = incomeData.reduce((sum, item) => sum + item.amount, 0);
  
  // Sample expense data
  const expenseData = [
    { category: "Salaries", amount: 7200 },
    { category: "Food & Beverage", amount: 3800 },
    { category: "Utilities", amount: 1200 },
    { category: "Maintenance", amount: 850 },
    { category: "Administrative", amount: 650 },
    { category: "Marketing", amount: 450 },
    { category: "Insurance", amount: 350 },
    { category: "Depreciation", amount: 1100 }
  ];
  
  // Calculate total expenses
  const totalExpenses = expenseData.reduce((sum, item) => sum + item.amount, 0);
  
  // Calculate net profit
  const netProfit = totalIncome - totalExpenses;
  
  // Calculate profit margin
  const profitMargin = (netProfit / totalIncome * 100).toFixed(2);
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-1/2">{t("Category")}</TableHead>
          <TableHead className="text-right">{t("Amount (OMR)")}</TableHead>
          <TableHead className="text-right">{t("% of Total")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {/* Income Section */}
        <TableRow className="bg-gray-50">
          <TableCell colSpan={3} className="font-bold">{t("Income")}</TableCell>
        </TableRow>
        {incomeData.map((item, index) => (
          <TableRow key={`income-${index}`}>
            <TableCell className="pl-8">{t(item.category)}</TableCell>
            <TableCell className="text-right">{formatCurrency(item.amount)}</TableCell>
            <TableCell className="text-right">
              {((item.amount / totalIncome) * 100).toFixed(1)}%
            </TableCell>
          </TableRow>
        ))}
        <TableRow className="font-medium">
          <TableCell>{t("Total Income")}</TableCell>
          <TableCell className="text-right text-green-600">{formatCurrency(totalIncome)}</TableCell>
          <TableCell className="text-right">100%</TableCell>
        </TableRow>
        
        {/* Expenses Section */}
        <TableRow className="bg-gray-50">
          <TableCell colSpan={3} className="font-bold">{t("Expenses")}</TableCell>
        </TableRow>
        {expenseData.map((item, index) => (
          <TableRow key={`expense-${index}`}>
            <TableCell className="pl-8">{t(item.category)}</TableCell>
            <TableCell className="text-right">{formatCurrency(item.amount)}</TableCell>
            <TableCell className="text-right">
              {((item.amount / totalExpenses) * 100).toFixed(1)}%
            </TableCell>
          </TableRow>
        ))}
        <TableRow className="font-medium">
          <TableCell>{t("Total Expenses")}</TableCell>
          <TableCell className="text-right text-red-600">{formatCurrency(totalExpenses)}</TableCell>
          <TableCell className="text-right">
            {((totalExpenses / totalIncome) * 100).toFixed(1)}%
          </TableCell>
        </TableRow>
        
        {/* Net Profit */}
        <TableRow className="font-bold border-t-2">
          <TableCell>{t("Net Profit")}</TableCell>
          <TableCell className="text-right text-blue-600">{formatCurrency(netProfit)}</TableCell>
          <TableCell className="text-right">{profitMargin}%</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
