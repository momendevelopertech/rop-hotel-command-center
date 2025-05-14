
import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { generateMockData } from "@/utils/mockData";
import { useRopDataService } from "@/utils/ropDataService";
import { useLanguage } from "@/contexts/LanguageContext";

// Define types for our data
export type OfficerRank = "Cadet" | "Officer" | "Command";

export interface Booking {
  id: number;
  name: string;
  rank: OfficerRank;
  room: string;
  checkIn: string;
  checkOut: string;
  status: string;
  emergencyFlag?: boolean;
  notes?: string;
}

export interface DiningOrder {
  id: number;
  name: string;
  meal: string;
  dietary: string;
  status: string;
  timestamp: string;
}

export interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
  supplier: string;
  category: string;
  reorderLevel: number;
}

export interface Event {
  id: number;
  name: string;
  date: string;
  attendees: number;
  status: string;
  location: string;
  equipmentNeeds?: string;
}

export interface Transaction {
  id: number;
  officer: string;
  amount: number;
  type: string;
  department: string;
  date: string;
}

export interface MobileInteraction {
  id: number;
  officer: string;
  action: string;
  timestamp: string;
  device: string;
}

export interface Membership {
  id: number;
  officer: string;
  rank: OfficerRank;
  status: string;
  renewal: string;
  memberSince: string;
}

export interface Employee {
  id: number;
  name: string;
  role: string;
  attendance: string;
  payroll: string;
  department: string;
  joinDate: string;
}

export interface Report {
  id: number;
  type: string;
  date: string;
  data: any;
  generatedBy: string;
}

export interface DataContextType {
  // Data collections
  bookings: Booking[];
  setBookings: React.Dispatch<React.SetStateAction<Booking[]>>;
  diningOrders: DiningOrder[];
  setDiningOrders: React.Dispatch<React.SetStateAction<DiningOrder[]>>;
  inventoryItems: InventoryItem[];
  setInventoryItems: React.Dispatch<React.SetStateAction<InventoryItem[]>>;
  events: Event[];
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  mobileInteractions: MobileInteraction[];
  setMobileInteractions: React.Dispatch<React.SetStateAction<MobileInteraction[]>>;
  memberships: Membership[];
  setMemberships: React.Dispatch<React.SetStateAction<Membership[]>>;
  employees: Employee[];
  setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>;
  reports: Report[];
  setReports: React.Dispatch<React.SetStateAction<Report[]>>;
  
  // Reset data function
  resetMockData: () => void;
}

// Create the context with a default value
const DataContext = createContext<DataContextType>({} as DataContextType);

// The DataProvider with language-aware translations
export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  // Use local storage to persist data
  const [bookings, setBookings] = useLocalStorage<Booking[]>("rop-bookings", []);
  const [diningOrders, setDiningOrders] = useLocalStorage<DiningOrder[]>("rop-dining-orders", []);
  const [inventoryItems, setInventoryItems] = useLocalStorage<InventoryItem[]>("rop-inventory-items", []);
  const [events, setEvents] = useLocalStorage<Event[]>("rop-events", []);
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>("rop-transactions", []);
  const [mobileInteractions, setMobileInteractions] = useLocalStorage<MobileInteraction[]>("rop-mobile-interactions", []);
  const [memberships, setMemberships] = useLocalStorage<Membership[]>("rop-memberships", []);
  const [employees, setEmployees] = useLocalStorage<Employee[]>("rop-employees", []);
  const [reports, setReports] = useLocalStorage<Report[]>("rop-reports", []);

  const { language } = useLanguage();

  // Generate mock data if none exists
  useEffect(() => {
    const mockData = generateMockData();
    
    if (bookings.length === 0) setBookings(mockData.bookings);
    if (diningOrders.length === 0) setDiningOrders(mockData.diningOrders);
    if (inventoryItems.length === 0) setInventoryItems(mockData.inventoryItems);
    if (events.length === 0) setEvents(mockData.events);
    if (transactions.length === 0) setTransactions(mockData.transactions);
    if (mobileInteractions.length === 0) setMobileInteractions(mockData.mobileInteractions);
    if (memberships.length === 0) setMemberships(mockData.memberships);
    if (employees.length === 0) setEmployees(mockData.employees);
    if (reports.length === 0) setReports(mockData.reports);
  }, []);

  // Function to reset all data to initial mock data
  const resetMockData = () => {
    const mockData = generateMockData();
    setBookings(mockData.bookings);
    setDiningOrders(mockData.diningOrders);
    setInventoryItems(mockData.inventoryItems);
    setEvents(mockData.events);
    setTransactions(mockData.transactions);
    setMobileInteractions(mockData.mobileInteractions);
    setMemberships(mockData.memberships);
    setEmployees(mockData.employees);
    setReports(mockData.reports);
  };

  return (
    <DataContext.Provider
      value={{
        bookings,
        setBookings,
        diningOrders,
        setDiningOrders,
        inventoryItems,
        setInventoryItems,
        events,
        setEvents,
        transactions,
        setTransactions,
        mobileInteractions,
        setMobileInteractions,
        memberships,
        setMemberships,
        employees,
        setEmployees,
        reports,
        setReports,
        resetMockData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

// Custom hook to use the context
export const useData = () => useContext(DataContext);
