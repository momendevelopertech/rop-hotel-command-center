
import { useLocation } from "react-router-dom";
import { NavItem } from "./types";

// Helper function to check if a path is active or a child path is active
export const usePathActiveChecks = (navItems: NavItem[]) => {
  const location = useLocation();
  
  const isPathActive = (path: string) => {
    if (location.pathname === path) return true;
    // Check if any sub-item path is active
    const item = navItems.find(item => item.href === path);
    if (item && item.subItems) {
      return item.subItems.some(subItem => location.pathname === subItem.href);
    }
    return false;
  };

  // Check if the path is the current location or a parent of the current path
  const isActiveOrParent = (path: string) => {
    if (location.pathname === path) return true;
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return { isPathActive, isActiveOrParent };
};
