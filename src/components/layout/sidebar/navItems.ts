
import {
  LayoutDashboard,
  Bed,
  Utensils,
  CalendarDays,
  FileBarChart,
  Smartphone,
  UserRound,
  Users,
  Database,
  FileText,
  ShoppingCart
} from "lucide-react";
import { NavItem } from "./types";

// Define all menu items with their sub-items
export const navItems: NavItem[] = [
  { 
    title: "Dashboard", 
    titleAr: "لوحة القيادة",
    href: "/", 
    icon: LayoutDashboard 
  },
  { 
    title: "Guest Management", 
    titleAr: "إدارة الضيوف",
    href: "/guest-management", 
    icon: Bed,
    subItems: [
      { title: "Room Booking", titleAr: "حجز الغرف", href: "/guest-management/room-booking" },
      { title: "Check-in / Check-out", titleAr: "تسجيل الدخول / الخروج", href: "/guest-management/check-in-out" },
      { title: "Guest Services", titleAr: "خدمات الضيوف", href: "/guest-management/guest-services" },
      { title: "Maintenance Requests", titleAr: "طلبات الصيانة", href: "/guest-management/maintenance-requests" },
      { title: "Billing & Payments", titleAr: "الفواتير والمدفوعات", href: "/guest-management/billing-payments" }
    ]
  },
  { 
    title: "Dining & Catering", 
    titleAr: "المطعم والضيافة",
    href: "/dining", 
    icon: Utensils,
    subItems: [
      { title: "Menu Management", titleAr: "إدارة القوائم", href: "/dining/menu-management" },
      { title: "Table Reservations", titleAr: "حجز الطاولات", href: "/dining/table-reservations" },
      { title: "Order Management", titleAr: "أوامر المطبخ", href: "/dining/order-management" },
      { title: "Kitchen Dispatch", titleAr: "إرسال الطلبات للمطبخ", href: "/dining/kitchen-dispatch" },
      { title: "Inventory Consumption", titleAr: "استهلاك المخزون", href: "/dining/inventory-consumption" }
    ]
  },
  { 
    title: "Event Management", 
    titleAr: "إدارة الفعاليات",
    href: "/events", 
    icon: CalendarDays,
    subItems: [
      { title: "Hall Booking", titleAr: "حجز القاعات", href: "/events/hall-booking" },
      { title: "Catering Orders", titleAr: "طلبات التموين", href: "/events/catering-orders" },
      { title: "Equipment Setup", titleAr: "المعدات والتجهيز", href: "/events/equipment-setup" },
      { title: "Guest List Management", titleAr: "إدارة قوائم الضيوف", href: "/events/guest-list" },
      { title: "Event Billing", titleAr: "فواتير الفعاليات", href: "/events/billing" }
    ]
  },
  { 
    title: "Finance & Reports", 
    titleAr: "المالية والتقارير",
    href: "/finance", 
    icon: FileBarChart,
    subItems: [
      { title: "Invoices & Payments", titleAr: "الفواتير والمدفوعات", href: "/finance/invoices-payments" },
      { title: "Expenses & Revenues", titleAr: "المصروفات والإيرادات", href: "/finance/expenses-revenues" },
      { title: "Profit & Loss Reports", titleAr: "تقارير الأرباح والخسائر", href: "/finance/profit-loss" },
      { title: "Tax Management", titleAr: "إدارة الضرائب", href: "/finance/tax-management" },
      { title: "Financial Audit Logs", titleAr: "سجلات التدقيق المالي", href: "/finance/audit-logs" }
    ]
  },
  { 
    title: "Mobile App", 
    titleAr: "تطبيق الهاتف",
    href: "/mobile-app", 
    icon: Smartphone,
    subItems: [
      { title: "App Features", titleAr: "ميزات التطبيق", href: "/mobile-app/features" },
      { title: "Booking via App", titleAr: "الحجز عبر التطبيق", href: "/mobile-app/booking" },
      { title: "Order Tracking", titleAr: "تتبع الطلبات", href: "/mobile-app/order-tracking" },
      { title: "Push Notifications", titleAr: "الإشعارات", href: "/mobile-app/notifications" }
    ]
  },
  { 
    title: "Membership", 
    titleAr: "العضويات",
    href: "/membership", 
    icon: UserRound,
    subItems: [
      { title: "Member Registration", titleAr: "تسجيل الأعضاء", href: "/membership/registration" },
      { title: "Link Military ID", titleAr: "ربط الرقم العسكري", href: "/membership/link-id" },
      { title: "Card Printing", titleAr: "طباعة البطاقات", href: "/membership/card-printing" },
      { title: "Membership Renewals", titleAr: "تجديد العضوية", href: "/membership/renewals" },
      { title: "SMS Reminders", titleAr: "تذكير عبر الرسائل النصية", href: "/membership/sms" }
    ]
  },
  { 
    title: "Human Resources", 
    titleAr: "الموارد البشرية",
    href: "/hr", 
    icon: Users,
    subItems: [
      { title: "Employee Records", titleAr: "ملفات الموظفين", href: "/hr/employee-records" },
      { title: "Attendance & Shifts", titleAr: "الحضور والانصراف", href: "/hr/attendance-shifts" },
      { title: "Leaves & Requests", titleAr: "الإجازات والطلبات", href: "/hr/leaves-requests" },
      { title: "Payroll & Penalties", titleAr: "الرواتب والجزاءات", href: "/hr/payroll-penalties" },
      { title: "Advances & Loans", titleAr: "السلف والقروض", href: "/hr/advances-loans" }
    ]
  },
  { 
    title: "Inventory", 
    titleAr: "المخزون",
    href: "/inventory", 
    icon: Database,
    subItems: [
      { title: "Stock Overview", titleAr: "نظرة عامة على المخزون", href: "/inventory/stock-overview" },
      { title: "Item Transfers", titleAr: "تحويل الأصناف", href: "/inventory/item-transfers" },
      { title: "Damaged/Returned Items", titleAr: "الأصناف التالفة أو المرتجعة", href: "/inventory/damaged-items" },
      { title: "Low Stock Alerts", titleAr: "تنبيهات انخفاض الكمية", href: "/inventory/low-stock" },
      { title: "Inventory Reports", titleAr: "تقارير المخزون", href: "/inventory/reports" }
    ]
  },
  { 
    title: "Reports & Analytics", 
    titleAr: "التقارير والتحليلات",
    href: "/reports", 
    icon: FileText,
    subItems: [
      { title: "Daily Reports", titleAr: "التقارير اليومية", href: "/reports/daily" },
      { title: "Monthly Summaries", titleAr: "ملخصات شهرية", href: "/reports/monthly" },
      { title: "Performance Dashboards", titleAr: "لوحات الأداء", href: "/reports/performance" },
      { title: "Custom Report Builder", titleAr: "بناء تقارير مخصصة", href: "/reports/custom" }
    ]
  },
  { 
    title: "POS", 
    titleAr: "نقاط البيع",
    href: "/pos", 
    icon: ShoppingCart,
    subItems: [
      { title: "Sales Interface", titleAr: "واجهة المبيعات", href: "/pos/sales" },
      { title: "Transaction History", titleAr: "سجل العمليات", href: "/pos/transactions" },
      { title: "Refunds & Cancellations", titleAr: "المرتجعات والإلغاءات", href: "/pos/refunds" },
      { title: "Payment Methods", titleAr: "طرق الدفع", href: "/pos/payment-methods" },
      { title: "POS Settings", titleAr: "إعدادات النظام", href: "/pos/settings" }
    ]
  }
];
