
// Define the structure of our translations
export type TranslationCategory = {
  [key: string]: string | { [subKey: string]: string };
};

export type TranslationsType = {
  en: TranslationCategory;
  ar: TranslationCategory;
};

// Create our translations object
export const translations: TranslationsType = {
  en: {
    // General UI translations
    "Dashboard": "Dashboard",
    "Guest Management": "Guest Management",
    "Dining & Catering": "Dining & Catering",
    "Event Management": "Event Management",
    "Finance & Reports": "Finance & Reports",
    "Mobile App": "Mobile App",
    "Membership": "Membership",
    "Human Resources": "Human Resources",
    "Inventory": "Inventory",
    "Reports & Analytics": "Reports & Analytics",
    "POS": "POS System",

    // Guest Management
    "Room Booking": "Room Booking",
    "Check-in / Check-out": "Check-in / Check-out",
    "Guest Services": "Guest Services",
    "Maintenance Requests": "Maintenance Requests",
    "Billing & Payments": "Billing & Payments",
    
    // Dining & Catering
    "Menu Management": "Menu Management",
    "Table Reservations": "Table Reservations",
    "Order Management": "Order Management",
    "Kitchen Dispatch": "Kitchen Dispatch",
    "Inventory Consumption": "Inventory Consumption",
    
    // Event Management
    "Hall Booking": "Hall Booking",
    "Catering Orders": "Catering Orders",
    "Equipment Setup": "Equipment & Setup",
    "Guest List Management": "Guest List Management",
    "Event Billing": "Event Billing",
    
    // Finance & Reports
    "Invoices & Payments": "Invoices & Payments",
    "Expenses & Revenues": "Expenses & Revenues",
    "Profit & Loss Reports": "Profit & Loss Reports",
    "Tax Management": "Tax Management",
    "Financial Audit Logs": "Financial Audit Logs",
    
    // Mobile App
    "App Features": "App Features",
    "Booking via App": "Booking via App",
    "Order Tracking": "Order Tracking",
    "Push Notifications": "Push Notifications",
    
    // Membership
    "Member Registration": "Member Registration",
    "Link Military ID": "Link Military ID",
    "Card Printing": "Card Printing",
    "Membership Renewals": "Membership Renewals",
    "SMS Reminders": "SMS Reminders",
    
    // Human Resources
    "Employee Records": "Employee Records",
    "Attendance & Shifts": "Attendance & Shifts",
    "Leaves & Requests": "Leaves & Requests",
    "Payroll & Penalties": "Payroll & Penalties",
    "Advances & Loans": "Advances & Loans",
    
    // Inventory
    "Stock Overview": "Stock Overview",
    "Item Transfers": "Item Transfers",
    "Damaged/Returned Items": "Damaged/Returned Items",
    "Low Stock Alerts": "Low Stock Alerts",
    "Inventory Reports": "Inventory Reports",
    
    // Reports & Analytics
    "Daily Reports": "Daily Reports",
    "Monthly Summaries": "Monthly Summaries",
    "Performance Dashboards": "Performance Dashboards",
    "Custom Report Builder": "Custom Report Builder",
    
    // POS
    "Sales Interface": "Sales Interface",
    "Transaction History": "Transaction History",
    "Refunds & Cancellations": "Refunds & Cancellations",
    "Payment Methods": "Payment Methods",
    "POS Settings": "POS Settings",
    
    // Common phrases
    "Search...": "Search...",
    "No data available": "No data available",
    "Showing": "Showing",
    "of": "of",
    "entries": "entries",
    "Previous": "Previous",
    "Next": "Next",
    "Save": "Save",
    "Cancel": "Cancel",
    "Delete": "Delete",
    "Edit": "Edit",
    "View": "View",
    "Add New": "Add New",
    "Status": "Status",
    "Date": "Date",
    "Actions": "Actions",
    
    // Status values
    "Active": "Active",
    "Inactive": "Inactive",
    "Pending": "Pending",
    "Completed": "Completed",
    "Cancelled": "Cancelled",
    "Confirmed": "Confirmed",
    "In Progress": "In Progress",
    "Checked In": "Checked In",
    "Checked Out": "Checked Out",

    // Guest Management content will be displayed here
    "Guest services content will be displayed here": "Guest services content will be displayed here",
    "Hall booking content will be displayed here": "Hall booking content will be displayed here",
    "POS settings content will be displayed here": "POS settings content will be displayed here",

    // Data categories for translation
    dataTranslations: {
      names: {
        "Ali Al-Balushi": "Ali Al-Balushi",
        "Mohammed Al-Busaidi": "Mohammed Al-Busaidi",
        "Ahmed Al-Harthi": "Ahmed Al-Harthi",
        "Fatma Al-Siyabi": "Fatma Al-Siyabi",
        "Saeed Al-Maskari": "Saeed Al-Maskari"
      },
      rooms: {
        "Standard": "Standard",
        "Premium": "Premium",
        "Suite": "Suite",
        "Executive Suite": "Executive Suite"
      },
      status: {
        "Reserved": "Reserved",
        "Available": "Available",
        "Occupied": "Occupied",
        "Maintenance": "Maintenance",
        "Cleaning": "Cleaning"
      }
    }
  },
  ar: {
    // General UI translations
    "Dashboard": "لوحة القيادة",
    "Guest Management": "إدارة الضيوف",
    "Dining & Catering": "المطعم والضيافة",
    "Event Management": "إدارة الفعاليات",
    "Finance & Reports": "المالية والتقارير",
    "Mobile App": "تطبيق الهاتف",
    "Membership": "العضويات",
    "Human Resources": "الموارد البشرية",
    "Inventory": "المخزون",
    "Reports & Analytics": "التقارير والتحليلات",
    "POS": "نقاط البيع",

    // Guest Management
    "Room Booking": "حجز الغرف",
    "Check-in / Check-out": "تسجيل الدخول / الخروج",
    "Guest Services": "خدمات الضيوف",
    "Maintenance Requests": "طلبات الصيانة",
    "Billing & Payments": "الفواتير والمدفوعات",
    
    // Dining & Catering
    "Menu Management": "إدارة القوائم",
    "Table Reservations": "حجز الطاولات",
    "Order Management": "إدارة الطلبات",
    "Kitchen Dispatch": "إرسال الطلبات للمطبخ",
    "Inventory Consumption": "استهلاك المخزون",
    
    // Event Management
    "Hall Booking": "حجز القاعات",
    "Catering Orders": "طلبات التموين",
    "Equipment Setup": "المعدات والتجهيز",
    "Guest List Management": "إدارة قوائم الضيوف",
    "Event Billing": "فواتير الفعاليات",
    
    // Finance & Reports
    "Invoices & Payments": "الفواتير والمدفوعات",
    "Expenses & Revenues": "المصروفات والإيرادات",
    "Profit & Loss Reports": "تقارير الأرباح والخسائر",
    "Tax Management": "إدارة الضرائب",
    "Financial Audit Logs": "سجلات التدقيق المالي",
    
    // Mobile App
    "App Features": "ميزات التطبيق",
    "Booking via App": "الحجز عبر التطبيق",
    "Order Tracking": "تتبع الطلبات",
    "Push Notifications": "الإشعارات",
    
    // Membership
    "Member Registration": "تسجيل الأعضاء",
    "Link Military ID": "ربط الرقم العسكري",
    "Card Printing": "طباعة البطاقات",
    "Membership Renewals": "تجديد العضوية",
    "SMS Reminders": "تذكير عبر الرسائل النصية",
    
    // Human Resources
    "Employee Records": "ملفات الموظفين",
    "Attendance & Shifts": "الحضور والانصراف",
    "Leaves & Requests": "الإجازات والطلبات",
    "Payroll & Penalties": "الرواتب والجزاءات",
    "Advances & Loans": "السلف والقروض",
    
    // Inventory
    "Stock Overview": "نظرة عامة على المخزون",
    "Item Transfers": "تحويل الأصناف",
    "Damaged/Returned Items": "الأصناف التالفة أو المرتجعة",
    "Low Stock Alerts": "تنبيهات انخفاض الكمية",
    "Inventory Reports": "تقارير المخزون",
    
    // Reports & Analytics
    "Daily Reports": "التقارير اليومية",
    "Monthly Summaries": "ملخصات شهرية",
    "Performance Dashboards": "لوحات الأداء",
    "Custom Report Builder": "بناء تقارير مخصصة",
    
    // POS
    "Sales Interface": "واجهة المبيعات",
    "Transaction History": "سجل العمليات",
    "Refunds & Cancellations": "المرتجعات والإلغاءات",
    "Payment Methods": "طرق الدفع",
    "POS Settings": "إعدادات النظام",
    
    // Common phrases
    "Search...": "بحث...",
    "No data available": "لا توجد بيانات متاحة",
    "Showing": "عرض",
    "of": "من",
    "entries": "مدخلات",
    "Previous": "السابق",
    "Next": "التالي",
    "Save": "حفظ",
    "Cancel": "إلغاء",
    "Delete": "حذف",
    "Edit": "تعديل",
    "View": "عرض",
    "Add New": "إضافة جديد",
    "Status": "الحالة",
    "Date": "التاريخ",
    "Actions": "الإجراءات",
    
    // Status values
    "Active": "نشط",
    "Inactive": "غير نشط",
    "Pending": "قيد الانتظار",
    "Completed": "مكتمل",
    "Cancelled": "ملغى",
    "Confirmed": "مؤكد",
    "In Progress": "قيد التنفيذ",
    "Checked In": "تم تسجيل الدخول",
    "Checked Out": "تم تسجيل الخروج",

    // Guest Management content will be displayed here
    "Guest services content will be displayed here": "سيتم عرض محتوى خدمات الضيوف هنا",
    "Hall booking content will be displayed here": "سيتم عرض محتوى حجز القاعات هنا",
    "POS settings content will be displayed here": "سيتم عرض محتوى إعدادات نقاط البيع هنا",

    // Data categories for translation
    dataTranslations: {
      names: {
        "Ali Al-Balushi": "علي البلوشي",
        "Mohammed Al-Busaidi": "محمد البوسعيدي",
        "Ahmed Al-Harthi": "أحمد الحارثي",
        "Fatma Al-Siyabi": "فاطمة السيابي",
        "Saeed Al-Maskari": "سعيد المسكري"
      },
      rooms: {
        "Standard": "قياسية",
        "Premium": "مميزة",
        "Suite": "جناح",
        "Executive Suite": "جناح تنفيذي"
      },
      status: {
        "Reserved": "محجوز",
        "Available": "متاح",
        "Occupied": "مشغول",
        "Maintenance": "صيانة",
        "Cleaning": "تنظيف"
      }
    }
  }
};
