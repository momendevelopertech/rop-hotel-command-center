
import { generateMockData } from './mockData';
import { useLanguage } from '@/contexts/LanguageContext';

export function useRopDataService() {
  const { language, translate } = useLanguage();
  const initialData = generateMockData();
  
  // Function to translate a single booking based on current language
  const translateBooking = (booking) => {
    return {
      ...booking,
      name: translate(booking.name, 'names'),
      rank: translate(booking.rank, 'ranks'),
      room: translate(booking.room, 'rooms'),
      status: translate(booking.status, 'status')
    };
  };
  
  // Function to translate a single dining order based on current language
  const translateDiningOrder = (order) => {
    return {
      ...order,
      name: translate(order.name, 'names'),
      meal: translate(order.meal, 'meals'),
      dietary: translate(order.dietary, 'dietary'),
      status: translate(order.status, 'status')
    };
  };
  
  // Function to translate a single event based on current language
  const translateEvent = (event) => {
    return {
      ...event,
      name: translate(event.name, 'events'),
      location: translate(event.location, 'locations'),
      status: translate(event.status, 'status')
    };
  };
  
  // Function to translate a single inventory item
  const translateInventoryItem = (item) => {
    return {
      ...item,
      name: translate(item.name, 'items'),
      supplier: translate(item.supplier, 'suppliers'),
      category: translate(item.category, 'categories')
    };
  };
  
  // Function to translate a single transaction
  const translateTransaction = (transaction) => {
    return {
      ...transaction,
      officer: translate(transaction.officer, 'names'),
      type: translate(transaction.type, 'transactionTypes'),
      department: translate(transaction.department, 'departments')
    };
  };
  
  // Function to translate a single mobile interaction
  const translateMobileInteraction = (interaction) => {
    return {
      ...interaction,
      officer: translate(interaction.officer, 'names'),
      action: translate(interaction.action, 'actions'),
      device: translate(interaction.device, 'devices')
    };
  };
  
  // Function to translate a single membership
  const translateMembership = (membership) => {
    return {
      ...membership,
      officer: translate(membership.officer, 'names'),
      rank: translate(membership.rank, 'ranks'),
      status: translate(membership.status, 'status')
    };
  };
  
  // Function to translate a single employee
  const translateEmployee = (employee) => {
    return {
      ...employee,
      name: translate(employee.name, 'names'),
      role: translate(employee.role, 'roles'),
      payroll: translate(employee.payroll, 'payrollStatuses'),
      department: translate(employee.department, 'departments')
    };
  };
  
  // Function to translate a single report
  const translateReport = (report) => {
    return {
      ...report,
      type: translate(report.type, 'reportTypes'),
      generatedBy: translate(report.generatedBy, 'names')
    };
  };
  
  // Get translated data based on current language
  const getTranslatedData = () => {
    return {
      bookings: initialData.bookings.map(translateBooking),
      diningOrders: initialData.diningOrders.map(translateDiningOrder),
      events: initialData.events.map(translateEvent),
      inventoryItems: initialData.inventoryItems.map(translateInventoryItem),
      transactions: initialData.transactions.map(translateTransaction),
      mobileInteractions: initialData.mobileInteractions.map(translateMobileInteraction),
      memberships: initialData.memberships.map(translateMembership),
      employees: initialData.employees.map(translateEmployee),
      reports: initialData.reports.map(translateReport)
    };
  };
  
  // Export the translation helpers
  return {
    translateBooking,
    translateDiningOrder,
    translateEvent,
    translateInventoryItem,
    translateTransaction,
    translateMobileInteraction,
    translateMembership,
    translateEmployee,
    translateReport,
    getTranslatedData
  };
}
