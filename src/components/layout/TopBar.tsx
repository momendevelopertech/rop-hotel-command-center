
import React from "react";
import { Menu, Bell, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TopBarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export function TopBar({ sidebarOpen, setSidebarOpen }: TopBarProps) {
  return (
    <header className="sticky top-0 z-40 h-16 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between h-full px-4">
        <div className="flex items-center">
          <button
            type="button"
            className="p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="ml-4 flex items-center">
            <img
              src="https://placeholder.pics/svg/200x60/1E3A8A/FFFFFF-1E3A8A/ROP%20HOTEL%20SYSTEM"
              alt="ROP Logo"
              className="h-8"
            />
            <h1 className="ml-3 text-xl font-bold text-rop-blue hidden md:block">
              Integrated Hotel Management System
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button className="p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center">
              <Avatar className="h-8 w-8 border-2 border-rop-gold">
                <span className="font-medium text-xs">CO</span>
              </Avatar>
              <div className="ml-2 hidden md:block text-left">
                <p className="text-sm font-medium">Captain Omar</p>
                <p className="text-xs text-gray-500">Officer</p>
              </div>
              <ChevronDown className="ml-2 h-4 w-4 text-gray-500" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-500">Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
