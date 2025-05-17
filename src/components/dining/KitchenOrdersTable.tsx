
import React from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { Eye, Play, Check, Zap } from "lucide-react";
import { format } from "date-fns";

// Sample order data
const kitchenOrders = [
  {
    id: "ORD-2501",
    dishes: [
      { name: "Grilled Chicken Platter", nameAr: "طبق دجاج مشوي" },
      { name: "Garden Salad", nameAr: "سلطة خضراء" },
      { name: "Mint Tea", nameAr: "شاي بالنعناع" }
    ],
    table: "Table 5",
    tableAr: "طاولة 5",
    status: "In Queue",
    statusAr: "في قائمة الانتظار",
    orderedAt: new Date(2025, 4, 17, 12, 10),
    timeIn: null,
    timeOut: null,
    chef: null,
    chefAr: null,
    specialInstructions: "No onions in salad",
    specialInstructionsAr: "بدون بصل في السلطة"
  },
  {
    id: "ORD-2502",
    dishes: [
      { name: "Beef Curry", nameAr: "كاري لحم" },
      { name: "Steamed Rice", nameAr: "أرز مطهو على البخار" }
    ],
    table: "Table 12",
    tableAr: "طاولة 12",
    status: "In Preparation",
    statusAr: "قيد التحضير",
    orderedAt: new Date(2025, 4, 17, 12, 5),
    timeIn: new Date(2025, 4, 17, 12, 10),
    timeOut: null,
    chef: "Ahmed Al-Farsi",
    chefAr: "أحمد الفارسي",
    specialInstructions: "",
    specialInstructionsAr: ""
  },
  {
    id: "ORD-2503",
    dishes: [
      { name: "Fish & Chips", nameAr: "سمك وبطاطا" }
    ],
    table: "Takeaway",
    tableAr: "وجبات جاهزة",
    status: "In Preparation",
    statusAr: "قيد التحضير",
    orderedAt: new Date(2025, 4, 17, 12, 0),
    timeIn: new Date(2025, 4, 17, 12, 5),
    timeOut: null,
    chef: "Mohammed Al-Harthi",
    chefAr: "محمد الحارثي",
    specialInstructions: "Extra tartar sauce",
    specialInstructionsAr: "صلصة تارتار إضافية"
  },
  {
    id: "ORD-2504",
    dishes: [
      { name: "Lamb Biryani", nameAr: "برياني لحم" },
      { name: "Raita", nameAr: "رايتا" },
      { name: "Naan Bread", nameAr: "خبز نان" }
    ],
    table: "Room Service - 204",
    tableAr: "خدمة الغرف - 204",
    status: "Ready to Serve",
    statusAr: "جاهز للتقديم",
    orderedAt: new Date(2025, 4, 17, 11, 45),
    timeIn: new Date(2025, 4, 17, 11, 50),
    timeOut: new Date(2025, 4, 17, 12, 15),
    chef: "Salim Al-Zadjali",
    chefAr: "سالم الزدجالي",
    specialInstructions: "Mild spice level",
    specialInstructionsAr: "مستوى توابل معتدل"
  },
  {
    id: "ORD-2505",
    dishes: [
      { name: "Arabic Mixed Grill", nameAr: "مشاوي عربية مشكلة" },
      { name: "Hummus", nameAr: "حمص" },
      { name: "Tabouleh", nameAr: "تبولة" },
      { name: "Pita Bread", nameAr: "خبز بيتا" }
    ],
    table: "Table 8",
    tableAr: "طاولة 8",
    status: "Ready to Serve",
    statusAr: "جاهز للتقديم",
    orderedAt: new Date(2025, 4, 17, 11, 30),
    timeIn: new Date(2025, 4, 17, 11, 35),
    timeOut: new Date(2025, 4, 17, 12, 5),
    chef: "Ali Al-Balushi",
    chefAr: "علي البلوشي",
    specialInstructions: "",
    specialInstructionsAr: ""
  },
  {
    id: "ORD-2506",
    dishes: [
      { name: "Seafood Platter", nameAr: "طبق مأكولات بحرية" },
      { name: "Grilled Vegetables", nameAr: "خضروات مشوية" }
    ],
    table: "Table 15",
    tableAr: "طاولة 15",
    status: "In Queue",
    statusAr: "في قائمة الانتظار",
    orderedAt: new Date(2025, 4, 17, 12, 15),
    timeIn: null,
    timeOut: null,
    chef: null,
    chefAr: null,
    specialInstructions: "Allergy to shellfish - only fish",
    specialInstructionsAr: "حساسية من المحار - فقط السمك"
  }
];

export function KitchenOrdersTable() {
  const { t, language } = useLanguage();

  // Helper function to get badge color based on status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "In Queue":
        return <Badge className="bg-amber-100 text-amber-800">{language === "ar" ? "في قائمة الانتظار" : "In Queue"}</Badge>;
      case "In Preparation":
        return <Badge className="bg-blue-100 text-blue-800">{language === "ar" ? "قيد التحضير" : "In Preparation"}</Badge>;
      case "Ready to Serve":
        return <Badge className="bg-green-100 text-green-800">{language === "ar" ? "جاهز للتقديم" : "Ready to Serve"}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  // Helper function to calculate prep time
  const getPrepTime = (timeIn: Date | null, timeOut: Date | null) => {
    if (!timeIn) return "-";
    if (!timeOut) {
      const now = new Date();
      const diffInMinutes = Math.floor((now.getTime() - timeIn.getTime()) / (1000 * 60));
      return t("{{minutes}} min", { minutes: diffInMinutes });
    }
    
    const diffInMinutes = Math.floor((timeOut.getTime() - timeIn.getTime()) / (1000 * 60));
    return t("{{minutes}} min", { minutes: diffInMinutes });
  };
  
  // Helper function to format dishes
  const formatDishes = (dishes: Array<{ name: string, nameAr: string }>) => {
    return dishes.map(dish => language === "ar" ? dish.nameAr : dish.name).join(", ");
  };
  
  // Generate action buttons based on status
  const getActionButtons = (order: any) => {
    switch (order.status) {
      case "In Queue":
        return (
          <Button size="sm" className="gap-1">
            <Play size={14} />
            {t("Start Cooking")}
          </Button>
        );
      case "In Preparation":
        return (
          <Button size="sm" className="gap-1">
            <Check size={14} />
            {t("Mark Ready")}
          </Button>
        );
      case "Ready to Serve":
        return (
          <Button variant="ghost" size="sm">
            {t("Expedite")}
          </Button>
        );
      default:
        return null;
    }
  };
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t("Order #")}</TableHead>
          <TableHead>{t("Table/Customer")}</TableHead>
          <TableHead>{t("Order Items")}</TableHead>
          <TableHead>{t("Status")}</TableHead>
          <TableHead>{t("Time In")}</TableHead>
          <TableHead>{t("Time Out")}</TableHead>
          <TableHead>{t("Prep Time")}</TableHead>
          <TableHead>{t("Assigned Chef")}</TableHead>
          <TableHead className="text-center">{t("Actions")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {kitchenOrders.map((order) => (
          <TableRow key={order.id}>
            <TableCell>{order.id}</TableCell>
            <TableCell>{language === "ar" ? order.tableAr : order.table}</TableCell>
            <TableCell className="max-w-[200px] truncate">
              <span title={formatDishes(order.dishes)}>
                {formatDishes(order.dishes)}
              </span>
            </TableCell>
            <TableCell>{getStatusBadge(order.status)}</TableCell>
            <TableCell>{order.timeIn ? format(order.timeIn, "HH:mm") : "-"}</TableCell>
            <TableCell>{order.timeOut ? format(order.timeOut, "HH:mm") : "-"}</TableCell>
            <TableCell>{getPrepTime(order.timeIn, order.timeOut)}</TableCell>
            <TableCell>
              {order.chef ? (language === "ar" ? order.chefAr : order.chef) : "-"}
            </TableCell>
            <TableCell>
              <div className="flex items-center justify-center gap-2">
                {getActionButtons(order)}
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Eye size={16} />
                </Button>
                {order.status === "In Preparation" && (
                  <Button variant="outline" size="icon" className="h-8 w-8 text-amber-600">
                    <Zap size={16} />
                  </Button>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
