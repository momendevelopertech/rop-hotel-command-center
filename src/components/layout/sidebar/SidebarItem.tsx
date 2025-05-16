
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { NavItem } from "./types";

interface SidebarItemProps {
  item: NavItem;
  isActive: boolean;
  isExpanded: boolean;
  dir: string;
  open: boolean;
}

export function SidebarItem({ item, isActive, isExpanded, dir, open }: SidebarItemProps) {
  const { language } = useLanguage();
  
  return (
    <li key={item.href} className="mb-1">
      <Link
        to={item.href}
        className={cn(
          "flex items-center rounded-md px-3 py-2 transition-all hover:bg-blue-800",
          isActive && "bg-blue-900 font-medium",
          dir === "rtl" ? "flex-row-reverse" : ""
        )}
      >
        <item.icon className="h-5 w-5 min-w-5" />
        {open && <span className={dir === "rtl" ? "me-3" : "ms-3"}>
          {language === "ar" ? item.titleAr : item.title}
        </span>}
      </Link>
      
      {/* Sub-items dropdown */}
      {open && item.subItems && isExpanded && (
        <ul className="mt-1 ml-7 space-y-1">
          {item.subItems.map((subItem) => (
            <li key={subItem.href}>
              <Link
                to={subItem.href}
                className={cn(
                  "block rounded-md px-3 py-1.5 text-sm transition-all hover:bg-blue-800",
                  location.pathname === subItem.href && "bg-blue-900 font-medium",
                  dir === "rtl" ? "text-right" : ""
                )}
              >
                {language === "ar" ? subItem.titleAr : subItem.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
