
import { ReactNode } from "react";

export type NavItem = {
  title: string;
  titleAr: string;
  href: string;
  icon: React.ElementType;
  subItems?: Array<{
    title: string;
    titleAr: string;
    href: string;
  }>;
};

export interface SidebarProps {
  open: boolean;
}
