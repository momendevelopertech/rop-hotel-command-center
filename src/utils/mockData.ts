
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
