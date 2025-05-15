
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
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
  FileText,
  ShoppingCart
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
  const { t, dir } = useLanguage();
  
  const navItems: NavItem[] = [
    { title: t("Dashboard"), href: "/", icon: LayoutDashboard },
    { title: t("Guest Management"), href: "/guest-management", icon: Bed },
    { title: t("Dining & Catering"), href: "/dining", icon: Utensils },
    { title: t("Event Management"), href: "/events", icon: CalendarDays },
    { title: t("Finance & Reports"), href: "/finance", icon: FileBarChart },
    { title: t("Mobile App"), href: "/mobile-app", icon: Smartphone },
    { title: t("Membership"), href: "/membership", icon: UserRound },
    { title: t("Human Resources"), href: "/hr", icon: Users },
    { title: t("Inventory"), href: "/inventory", icon: Database },
    { title: t("Reports & Analytics"), href: "/reports", icon: FileText },
    { title: t("POS"), href: "/pos", icon: ShoppingCart },
  ];

  return (
    <aside
      className={cn(
        "fixed top-16 h-[calc(100%-4rem)] bg-rop-blue text-white transition-all duration-300 ease-in-out overflow-y-auto z-30",
        open ? "w-64" : "w-20",
        dir === "rtl" ? "right-0" : "left-0" // Position based on language direction
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
                  location.pathname === item.href && "bg-blue-900 font-medium",
                  dir === "rtl" ? "flex-row-reverse" : ""  // Reverse item layout in RTL
                )}
              >
                <item.icon className="h-5 w-5 min-w-5" />
                {open && <span className={dir === "rtl" ? "me-3" : "ms-3"}>{item.title}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
