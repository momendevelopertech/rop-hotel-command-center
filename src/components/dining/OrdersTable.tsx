
import React from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { Eye, FileEdit, Clock } from "lucide-react";
import { format } from "date-fns";

// Sample order data
const orders = [
  {
    id: "ORD-2501",
    tableCustomer: "Table 5",
    customerAr: "طاولة 5",
    itemsCount: 4,
    total: 42.75,
    dateTime: new Date(2025, 4, 17, 12, 15),
    status: "In Progress",
    statusAr: "قيد التنفيذ",
    server: "Mohammed Al-Harthi",
    serverAr: "محمد الحارثي",
    notes: "No onions in salad",
    notesAr: "بدون بصل في السلطة",
    priority: "High",
    priorityAr: "عالية",
    mealType: "Lunch",
    mealTypeAr: "غداء"
  },
  {
    id: "ORD-2502",
    tableCustomer: "Table 12",
    customerAr: "طاولة 12",
    itemsCount: 2,
    total: 28.50,
    dateTime: new Date(2025, 4, 17, 12, 30),
    status: "Completed",
    statusAr: "مكتمل",
    server: "Sara Al-Balushi",
    serverAr: "سارة البلوشي",
    notes: "",
    notesAr: "",
    priority: "Normal",
    priorityAr: "عادية",
    mealType: "Lunch",
    mealTypeAr: "غداء"
  },
  {
    id: "ORD-2503",
    tableCustomer: "Ahmed Al-Farsi (Takeaway)",
    customerAr: "أحمد الفارسي (وجبات جاهزة)",
    itemsCount: 1,
    total: 15.00,
    dateTime: new Date(2025, 4, 17, 12, 45),
    status: "Ready for Pickup",
    statusAr: "جاهز للاستلام",
    server: "System",
    serverAr: "النظام",
    notes: "Extra napkins",
    notesAr: "مناديل إضافية",
    priority: "Normal",
    priorityAr: "عادية",
    mealType: "Lunch",
    mealTypeAr: "غداء"
  },
  {
    id: "ORD-2504",
    tableCustomer: "Capt. Khalid (Room Service)",
    customerAr: "النقيب خالد (خدمة الغرف)",
    itemsCount: 3,
    total: 35.25,
    dateTime: new Date(2025, 4, 17, 13, 0),
    status: "Delivered",
    statusAr: "تم التسليم",
    server: "Fatima Al-Zadjali",
    serverAr: "فاطمة الزدجالي",
    notes: "Room 204",
    notesAr: "غرفة 204",
    priority: "High",
    priorityAr: "عالية",
    mealType: "Lunch",
    mealTypeAr: "غداء"
  },
  {
    id: "ORD-2505",
    tableCustomer: "Table 8",
    customerAr: "طاولة 8",
    itemsCount: 6,
    total: 78.50,
    dateTime: new Date(2025, 4, 17, 18, 30),
    status: "In Progress",
    statusAr: "قيد التنفيذ",
    server: "Ali Al-Balushi",
    serverAr: "علي البلوشي",
    notes: "",
    notesAr: "",
    priority: "Normal",
    priorityAr: "عادية",
    mealType: "Dinner",
    mealTypeAr: "عشاء"
  },
  {
    id: "ORD-2506",
    tableCustomer: "Table 15",
    customerAr: "طاولة 15",
    itemsCount: 5,
    total: 65.75,
    dateTime: new Date(2025, 4, 17, 19, 0),
    status: "In Progress",
    statusAr: "قيد التنفيذ",
    server: "Hamad Al-Kindi",
    serverAr: "حمد الكندي",
    notes: "Allergy to shellfish",
    notesAr: "حساسية من المأكولات البحرية",
    priority: "High",
    priorityAr: "عالية",
    mealType: "Dinner",
    mealTypeAr: "عشاء"
  },
  {
    id: "ORD-2498",
    tableCustomer: "Table 3",
    customerAr: "طاولة 3",
    itemsCount: 2,
    total: 22.00,
    dateTime: new Date(2025, 4, 17, 8, 15),
    status: "Completed",
    statusAr: "مكتمل",
    server: "Salim Al-Zadjali",
    serverAr: "سالم الزدجالي",
    notes: "",
    notesAr: "",
    priority: "Normal",
    priorityAr: "عادية",
    mealType: "Breakfast",
    mealTypeAr: "إفطار"
  },
  {
    id: "ORD-2499",
    tableCustomer: "Table 7",
    customerAr: "طاولة 7",
    itemsCount: 3,
    total: 32.25,
    dateTime: new Date(2025, 4, 17, 8, 30),
    status: "Completed",
    statusAr: "مكتمل",
    server: "Maryam Al-Balushi",
    serverAr: "مريم البلوشي",
    notes: "Gluten free options",
    notesAr: "خيارات خالية من الغلوتين",
    priority: "Normal",
    priorityAr: "عادية",
    mealType: "Breakfast",
    mealTypeAr: "إفطار"
  }
];

export function OrdersTable() {
  const { t, language } = useLanguage();

  // Helper function to get badge color based on status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "In Progress":
        return <Badge className="bg-blue-100 text-blue-800">{language === "ar" ? "قيد التنفيذ" : "In Progress"}</Badge>;
      case "Completed":
        return <Badge className="bg-green-100 text-green-800">{language === "ar" ? "مكتمل" : "Completed"}</Badge>;
      case "Ready for Pickup":
        return <Badge className="bg-purple-100 text-purple-800">{language === "ar" ? "جاهز للاستلام" : "Ready for Pickup"}</Badge>;
      case "Delivered":
        return <Badge className="bg-amber-100 text-amber-800">{language === "ar" ? "تم التسليم" : "Delivered"}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  // Helper function to get priority badge
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "High":
        return <Badge variant="destructive">{language === "ar" ? "عالية" : "High"}</Badge>;
      case "Low":
        return <Badge variant="secondary">{language === "ar" ? "منخفضة" : "Low"}</Badge>;
      default:
        return <Badge variant="outline">{language === "ar" ? "عادية" : "Normal"}</Badge>;
    }
  };
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t("Order Number")}</TableHead>
          <TableHead>{t("Table/Customer")}</TableHead>
          <TableHead className="text-center">{t("Items Count")}</TableHead>
          <TableHead>{t("Status")}</TableHead>
          <TableHead>{t("Date/Time")}</TableHead>
          <TableHead>{t("Server")}</TableHead>
          <TableHead>{t("Priority")}</TableHead>
          <TableHead>{t("Meal Type")}</TableHead>
          <TableHead className="text-center">{t("Actions")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell>{order.id}</TableCell>
            <TableCell>{language === "ar" ? order.customerAr : order.tableCustomer}</TableCell>
            <TableCell className="text-center">{order.itemsCount}</TableCell>
            <TableCell>{getStatusBadge(order.status)}</TableCell>
            <TableCell>{format(order.dateTime, "p, MMM d")}</TableCell>
            <TableCell>{language === "ar" ? order.serverAr : order.server}</TableCell>
            <TableCell>{getPriorityBadge(order.priority)}</TableCell>
            <TableCell>{language === "ar" ? order.mealTypeAr : order.mealType}</TableCell>
            <TableCell>
              <div className="flex justify-center space-x-2">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Eye size={16} />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <FileEdit size={16} />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Clock size={16} />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
