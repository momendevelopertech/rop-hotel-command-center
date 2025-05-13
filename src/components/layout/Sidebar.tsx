
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Bed,
  Utensils,
  CalendarDays,
  FileBarChart,
  Smartphone,
  UserRound,
  Database,
  FileText
} from "lucide-react";

interface SidebarProps {
  open: boolean;
}

type NavItem = {
  title: string;
  href: string;
  icon: React.ElementType;
};

export function Sidebar({ open }: SidebarProps) {
  const location = useLocation();
  
  const navItems: NavItem[] = [
    { title: "Dashboard", href: "/", icon: LayoutDashboard },
    { title: "Guest Management", href: "/guest-management", icon: Bed },
    { title: "Dining & Catering", href: "/dining", icon: Utensils },
    { title: "Event Management", href: "/events", icon: CalendarDays },
    { title: "Finance & Reports", href: "/finance", icon: FileBarChart },
    { title: "Mobile App", href: "/mobile-app", icon: Smartphone },
    { title: "Membership", href: "/membership", icon: UserRound },
    { title: "Human Resources", href: "/hr", icon: Users },
    { title: "Inventory", href: "/inventory", icon: Database },
    { title: "Reports & Analytics", href: "/reports", icon: FileText },
  ];

  return (
    <aside
      className={cn(
        "fixed left-0 top-16 h-[calc(100%-4rem)] bg-rop-blue text-white transition-all duration-300 ease-in-out overflow-y-auto z-30",
        open ? "w-64" : "w-20"
      )}
    >
      <nav className="p-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                className={cn(
                  "flex items-center rounded-md px-3 py-2 transition-all hover:bg-blue-800",
                  location.pathname === item.href && "bg-blue-900 font-medium"
                )}
              >
                <item.icon className="h-5 w-5 min-w-5" />
                {open && <span className="ml-3">{item.title}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
