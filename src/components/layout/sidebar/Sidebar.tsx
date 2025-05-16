
import React from "react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { SidebarItem } from "./SidebarItem";
import { navItems } from "./navItems";
import { SidebarProps } from "./types";
import { usePathActiveChecks } from "./sidebarUtils";

export function Sidebar({ open }: SidebarProps) {
  const location = useLocation();
  const { dir, language } = useLanguage();
  const { isPathActive, isActiveOrParent } = usePathActiveChecks(navItems);

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
            <SidebarItem
              key={item.href}
              item={item}
              isActive={isPathActive(item.href)}
              isExpanded={isActiveOrParent(item.href)}
              dir={dir}
              open={open}
            />
          ))}
        </ul>
      </nav>
    </aside>
  );
}
