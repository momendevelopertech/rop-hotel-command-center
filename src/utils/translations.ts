import { 
  Booking, 
  DiningOrder, 
  InventoryItem, 
  Event, 
  Transaction, 
  MobileInteraction, 
  Membership, 
  Employee, 
  Report 
} from "@/contexts/DataContext";

// Helper function to get random item from array
const getRandomItem = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

// Helper function to generate random date between startDate and endDate
const randomDate = (startDate: Date, endDate: Date): string => {
  const start = startDate.getTime();
  const end = endDate.getTime();
  const randomTimestamp = start + Math.random() * (end - start);
  return new Date(randomTimestamp).toISOString().split('T')[0];
};

// Helper to get random officer name
const getRandomOfficerName = (): string => {
  const firstNames = [
    "Ali", "Mohammed", "Ahmed", "Fatma", "Saeed", 
    "Khalid", "Omar", "Abdullah", "Hamad", "Salim",
    "Nasser", "Ibrahim", "Hamdan", "Rashid", "Maryam"
  ];
  
  const lastNames = [
    "Al-Balushi", "Al-Busaidi", "Al-Harthi", "Al-Siyabi", 
    "Al-Maskari", "Al-Raisi", "Al-Farsi", "Al-Habsi", 
    "Al-Kindi", "Al-Zadjali"
  ];
  
  return `${getRandomItem(firstNames)} ${getRandomItem(lastNames)}`;
};

export const generateMockData = () => {
  // Generate bookings
  const bookings: Booking[] = [];
  const ranks = ["Cadet", "Officer", "Command"];
  const roomTypes = ["Standard", "Premium", "Suite", "Executive Suite"];
  const statuses = ["Confirmed", "Checked In", "Checked Out", "Cancelled"];
  
  for (let i = 1; i <= 50; i++) {
    const rank = getRandomItem(ranks) as "Cadet" | "Officer" | "Command";
    const checkIn = randomDate(new Date("2025-05-01"), new Date("2025-08-01"));
    const checkOut = randomDate(new Date(checkIn), new Date("2025-09-01"));
    
    bookings.push({
      id: i,
      name: getRandomOfficerName(),
      rank: rank,
      room: getRandomItem(roomTypes),
      checkIn: checkIn,
      checkOut: checkOut,
      status: getRandomItem(statuses),
      emergencyFlag: Math.random() > 0.9,
      notes: Math.random() > 0.7 ? "Special accommodation required" : undefined
    });
  }
  
  // Generate dining orders
  const diningOrders: DiningOrder[] = [];
  const meals = [
    "Grilled Chicken", "Fish Curry", "Lamb Biryani", "Vegetable Pasta", 
    "Beef Burger", "Caesar Salad", "Seafood Platter", "Rice and Curry"
  ];
  const dietaryOptions = ["Halal", "No restrictions", "Vegetarian", "Kosher", "Low sodium"];
  const orderStatuses = ["Placed", "Preparing", "Ready", "Delivered", "Cancelled"];
  
  for (let i = 1; i <= 30; i++) {
    diningOrders.push({
      id: i,
      name: getRandomOfficerName(),
      meal: getRandomItem(meals),
      dietary: getRandomItem(dietaryOptions),
      status: getRandomItem(orderStatuses),
      timestamp: randomDate(new Date("2025-05-01"), new Date("2025-05-14"))
    });
  }
  
  // Generate inventory items
  const inventoryItems: InventoryItem[] = [];
  const items = [
    "Towels", "Bed sheets", "Pillows", "Rice", "Chicken", "Beef", "Fish",
    "Toilet paper", "Soap", "Shampoo", "Water bottles", "Coffee", "Tea",
    "Cleaning supplies", "Flour", "Sugar", "Salt", "Vegetables", "Fruits"
  ];
  const suppliers = [
    "Oman Textiles", "Muscat Food Supplies", "Al Bahja Group", 
    "Salalah Trading", "Gulf Hospitality Solutions", "Nizwa Consumables"
  ];
  const categories = ["Food", "Linen", "Toiletries", "Cleaning", "Kitchen", "Room amenities"];
  
  for (let i = 1; i <= 30; i++) {
    inventoryItems.push({
      id: i,
      name: getRandomItem(items),
      quantity: Math.floor(Math.random() * 200) + 10,
      supplier: getRandomItem(suppliers),
      category: getRandomItem(categories),
      reorderLevel: Math.floor(Math.random() * 50) + 10
    });
  }
  
  // Generate events
  const events: Event[] = [];
  const eventNames = [
    "Training Seminar", "Command Staff Meeting", "Annual Review", 
    "Security Briefing", "Officer Promotion Ceremony", "Tactical Training",
    "Police Academy Graduation", "International Security Conference", 
    "Community Outreach Program", "Executive Retreat"
  ];
  const eventStatuses = ["Planned", "Confirmed", "In Progress", "Completed", "Cancelled"];
  const locations = ["Main Hall", "Conference Room A", "Training Center", "Outdoor Court", "Executive Suite"];
  
  for (let i = 1; i <= 20; i++) {
    events.push({
      id: i,
      name: getRandomItem(eventNames),
      date: randomDate(new Date("2025-05-01"), new Date("2025-12-31")),
      attendees: Math.floor(Math.random() * 100) + 10,
      status: getRandomItem(eventStatuses),
      location: getRandomItem(locations),
      equipmentNeeds: Math.random() > 0.5 ? "Projector, Microphone, Secure Communication Devices" : undefined
    });
  }
  
  // Generate financial transactions
  const transactions: Transaction[] = [];
  const transactionTypes = [
    "Salary Deduction", "Direct Payment", "Department Billing", 
    "Training Fee", "Accommodation Charge", "Catering Service", "Facility Rental"
  ];
  const departments = [
    "Training", "Operations", "Administration", "Intelligence", 
    "Cybersecurity", "Community Policing", "Traffic", "Emergency Response"
  ];
  
  for (let i = 1; i <= 40; i++) {
    transactions.push({
      id: i,
      officer: getRandomOfficerName(),
      amount: Math.floor(Math.random() * 500) + 50,
      type: getRandomItem(transactionTypes),
      department: getRandomItem(departments),
      date: randomDate(new Date("2025-01-01"), new Date("2025-05-14"))
    });
  }
  
  // Generate mobile app interactions
  const mobileInteractions: MobileInteraction[] = [];
  const actions = [
    "Booked Room", "Ordered Meal", "Checked in", "Checked out", 
    "Updated Profile", "Viewed Statement", "Requested Assistance", 
    "Registered for Event", "Submitted Feedback", "Renewed Membership"
  ];
  const devices = ["iPhone", "Samsung Galaxy", "Huawei", "iPad", "Android Tablet"];
  
  for (let i = 1; i <= 30; i++) {
    mobileInteractions.push({
      id: i,
      officer: getRandomOfficerName(),
      action: getRandomItem(actions),
      timestamp: randomDate(new Date("2025-05-01"), new Date("2025-05-14")),
      device: getRandomItem(devices)
    });
  }
  
  // Generate memberships
  const memberships: Membership[] = [];
  const membershipStatuses = ["Active", "Pending Renewal", "Expired", "Suspended"];
  
  for (let i = 1; i <= 50; i++) {
    const rank = getRandomItem(ranks) as "Cadet" | "Officer" | "Command";
    const memberSince = randomDate(new Date("2020-01-01"), new Date("2025-01-01"));
    const renewal = randomDate(new Date("2025-06-01"), new Date("2026-06-01"));
    
    memberships.push({
      id: i,
      officer: getRandomOfficerName(),
      rank: rank,
      status: getRandomItem(membershipStatuses),
      renewal: renewal,
      memberSince: memberSince
    });
  }
  
  // Generate employees
  const employees: Employee[] = [];
  const roles = [
    "Receptionist", "Chef", "Room Attendant", "Maintenance", "Security Officer", 
    "Manager", "IT Support", "Administrative Assistant", "Event Coordinator"
  ];
  const departments1 = [
    "Front Desk", "Food & Beverage", "Housekeeping", "Maintenance", 
    "Security", "Administration", "IT", "Events", "Human Resources"
  ];
  const payrollStatuses = ["Paid", "Pending", "Processing", "Hold"];
  
  for (let i = 1; i <= 20; i++) {
    employees.push({
      id: i,
      name: getRandomOfficerName(),
      role: getRandomItem(roles),
      attendance: `${80 + Math.floor(Math.random() * 20)}%`,
      payroll: getRandomItem(payrollStatuses),
      department: getRandomItem(departments1),
      joinDate: randomDate(new Date("2020-01-01"), new Date("2025-01-01"))
    });
  }
  
  // Generate reports
  const reports: Report[] = [];
  const reportTypes = [
    "Booking Trends", "Financial Summary", "Inventory Status", 
    "Employee Performance", "Member Activity", "Event Summary", 
    "Facility Usage", "Dining Analysis", "Security Audit", "Revenue Forecast"
  ];
  
  for (let i = 1; i <= 10; i++) {
    reports.push({
      id: i,
      type: getRandomItem(reportTypes),
      date: randomDate(new Date("2025-04-01"), new Date("2025-05-14")),
      data: {
        total: Math.floor(Math.random() * 1000) + 100,
        trend: Math.random() > 0.5 ? "up" : "down",
        percentage: Math.floor(Math.random() * 100)
      },
      generatedBy: getRandomOfficerName()
    });
  }
  
  return {
    bookings,
    diningOrders,
    inventoryItems,
    events,
    transactions,
    mobileInteractions,
    memberships,
    employees,
    reports
  };
};

export const translationKeys = {
  en: {
    names: {
      "Ali Al-Balushi": "Ali Al-Balushi",
      "Mohammed Al-Busaidi": "Mohammed Al-Busaidi",
      "Ahmed Al-Harthi": "Ahmed Al-Harthi",
      "Fatma Al-Siyabi": "Fatma Al-Siyabi",
      "Saeed Al-Maskari": "Saeed Al-Maskari",
      "Khalid Al-Raisi": "Khalid Al-Raisi",
      "Omar Al-Farsi": "Omar Al-Farsi",
      "Abdullah Al-Habsi": "Abdullah Al-Habsi",
      "Hamad Al-Kindi": "Hamad Al-Kindi",
      "Salim Al-Zadjali": "Salim Al-Zadjali"
    },
    rooms: {
      "Standard": "Standard",
      "Premium": "Premium",
      "Suite": "Suite",
      "Executive Suite": "Executive Suite"
    },
    roomStatus: {
      "Reserved": "Reserved",
      "Available": "Available",
      "Occupied": "Occupied",
      "Maintenance": "Maintenance",
      "Cleaning": "Cleaning"
    }
  },
  ar: {
    names: {
      "Ali Al-Balushi": "علي البلوشي",
      "Mohammed Al-Busaidi": "محمد البوسعيدي",
      "Ahmed Al-Harthi": "أحمد الحارثي",
      "Fatma Al-Siyabi": "فاطمة السيابي",
      "Saeed Al-Maskari": "سعيد المسكري",
      "Khalid Al-Raisi": "خالد الرايسي",
      "Omar Al-Farsi": "عمر الفارسي",
      "Abdullah Al-Habsi": "عبدالله الحبسي",
      "Hamad Al-Kindi": "حمد الكندي",
      "Salim Al-Zadjali": "سالم الزدجالي"
    },
    rooms: {
      "Standard": "قياسي",
      "Premium": "ممتاز",
      "Suite": "جناح",
      "Executive Suite": "جناح تنفيذي"
    },
    roomStatus: {
      "Reserved": "محجوز",
      "Available": "متاح",
      "Occupied": "مشغول",
      "Maintenance": "صيانة",
      "Cleaning": "تنظيف"
    }
  }
};

export const translations = {
  en: {
    "Dining & Catering": "Dining & Catering",
    "Mess hall and catering orders in process": "Mess hall and catering orders in process",
    "Order ID": "Order ID",
    "Table": "Table",
    "Server": "Server",
    "Items": "Items",
    "Total": "Total",
    "Time": "Time",
    "Status": "Status",
    "Actions": "Actions",
    "Accept": "Accept",
    "Mark Ready": "Mark Ready",
    "Deliver": "Deliver",
    "Cancel": "Cancel",
    "No orders found": "No orders found",
    "Event Management": "Event Management",
    "Organize and manage base events and facilities": "Organize and manage base events and facilities",
    "Membership": "Membership",
    "Manage memberships and access privileges": "Manage memberships and access privileges",
    "Profile": "Profile",
    "Details": "Details",
    "No data found": "No data found",
    
    // Dining & Menu Management
    "Menu Management": "Menu Management",
    "Create and update menu items and categories": "Create and update menu items and categories",
    "Menu Items": "Menu Items",
    "Categories": "Categories",
    "Menu Categories": "Menu Categories",
    "Search menu items...": "Search menu items...",
    "Add Menu Item": "Add Menu Item",
    "Filter": "Filter",
    "ID": "ID",
    "Category Name": "Category Name",
    "Description": "Description",
    "Items": "Items",
    "Order": "Order",
    "Status": "Status",
    "Actions": "Actions",
    "Active": "Active",
    "Inactive": "Inactive",
    "Edit": "Edit",
    "Delete": "Delete",
    "Popular": "Popular",
    "Military Special": "Military Special",
    "{{price}} OMR": "{{price}} OMR",
    "Total Menu Items": "Total Menu Items",
    "Active Categories": "Active Categories",
    "Popular Items": "Popular Items",
    "Military Special Items": "Military Special Items",
    // Table Reservations
    "Table Reservations": "Table Reservations",
    "Manage dining area bookings and reservations": "Manage dining area bookings and reservations",
    "Today's Reservations": "Today's Reservations",
    "Confirmed": "Confirmed",
    "Cancelled": "Cancelled",
    "No-shows": "No-shows",
    "Search reservations...": "Search reservations...",
    "Reservations": "Reservations",
    "Add Reservation": "Add Reservation",
    "Pick a date": "Pick a date",
    "Reservation ID": "Reservation ID",
    "Guest": "Guest",
    "Table #": "Table #", 
    "Party Size": "Party Size",
    "Time": "Time",
    "Special Request": "Special Request",
    "None": "None",
    "Seated": "Seated",
    "Waiting": "Waiting"
  },
  ar: {
    "Dining & Catering": "تناول الطعام والتموين",
    "Mess hall and catering orders in process": "طلبات قاعة الطعام والتموين قيد المعالجة",
    "Order ID": "معرف الطلب",
    "Table": "طاولة",
    "Server": "الخادم",
    "Items": "العناصر",
    "Total": "الإجمالي",
    "Time": "الوقت",
    "Status": "الحالة",
    "Actions": "الإجراءات",
    "Accept": "قبول",
    "Mark Ready": "تحديد جاهز",
    "Deliver": "تسليم",
    "Cancel": "إلغاء",
    "No orders found": "لم يتم العثور على طلبات",
    "Event Management": "إدارة الفعاليات",
    "Organize and manage base events and facilities": "تنظيم وإدارة الفعاليات والمرافق الأساسية",
    "Membership": "العضوية",
    "Manage memberships and access privileges": "إدارة العضويات وامتيازات الوصول",
    "Profile": "الملف الشخصي",
    "Details": "التفاصيل",
    "No data found": "لا توجد بيانات",
    
    // Dining & Menu Management
    "Menu Management": "إدارة القائمة",
    "Create and update menu items and categories": "إنشاء وتحديث عناصر وفئات القائمة",
    "Menu Items": "عناصر القائمة",
    "Categories": "الفئات",
    "Menu Categories": "فئات القائمة",
    "Search menu items...": "البحث في عناصر القائمة...",
    "Add Menu Item": "إضافة عنصر جديد",
    "Filter": "تصفية",
    "ID": "المعرف",
    "Category Name": "اسم الفئة",
    "Description": "الوصف",
    "Items": "العناصر",
    "Order": "الترتيب",
    "Status": "الحالة",
    "Actions": "الإجراءات",
    "Active": "نشط",
    "Inactive": "غير نشط",
    "Edit": "تعديل",
    "Delete": "حذف",
    "Popular": "شائع",
    "Military Special": "خاص بالعسكريين",
    "{{price}} OMR": "{{price}} ر.ع",
    "Total Menu Items": "إجمالي عناصر القائمة",
    "Active Categories": "الفئات النشطة",
    "Popular Items": "العناصر الشائعة",
    "Military Special Items": "عناصر خاصة بالعسكريين",
    // Table Reservations
    "Table Reservations": "حجوزات الطاولات",
    "Manage dining area bookings and reservations": "إدارة حجوزات منطقة تناول الطعام",
    "Today's Reservations": "حجوزات اليوم",
    "Confirmed": "مؤكد",
    "Cancelled": "ملغي",
    "No-shows": "لم يحضر",
    "Search reservations...": "البحث في الحجوزات...",
    "Reservations": "الحجوزات",
    "Add Reservation": "إضافة حجز",
    "Pick a date": "اختر تاريخ",
    "Reservation ID": "رقم الحجز",
    "Guest": "الضيف",
    "Table #": "رقم الطاولة", 
    "Party Size": "عدد الأشخاص",
    "Time": "الوقت",
    "Special Request": "طلب خاص",
    "None": "لا يوجد",
    "Seated": "جالس",
    "Waiting": "في الانتظار"
  }
};
