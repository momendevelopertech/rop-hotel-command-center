
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const transactions = [
  {
    id: "TX-1234",
    date: "2025-05-10",
    guest: "محمد علي",
    amount: 750.00,
    type: "دفع",
    status: "مكتمل"
  },
  {
    id: "TX-1235",
    date: "2025-05-11",
    guest: "أحمد حسن",
    amount: 1200.00,
    type: "دفع",
    status: "مكتمل"
  },
  {
    id: "TX-1236",
    date: "2025-05-11",
    guest: "سارة محمد",
    amount: 450.00,
    type: "رد",
    status: "قيد المعالجة"
  },
  {
    id: "TX-1237",
    date: "2025-05-12",
    guest: "عمر خالد",
    amount: 900.00,
    type: "دفع",
    status: "مكتمل"
  },
  {
    id: "TX-1238",
    date: "2025-05-13",
    guest: "ليلى أحمد",
    amount: 1500.00,
    type: "دفع",
    status: "مكتمل"
  }
];

export function TransactionsTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">سجل المعاملات المالية</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>رقم العملية</TableHead>
                <TableHead>التاريخ</TableHead>
                <TableHead>الضيف</TableHead>
                <TableHead className="text-right">المبلغ (ريال)</TableHead>
                <TableHead>نوع العملية</TableHead>
                <TableHead>الحالة</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">{transaction.id}</TableCell>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.guest}</TableCell>
                  <TableCell className="text-right">{transaction.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant={transaction.type === "دفع" ? "default" : "secondary"}>
                      {transaction.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={transaction.status === "مكتمل" ? "success" : "outline"}>
                      {transaction.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
