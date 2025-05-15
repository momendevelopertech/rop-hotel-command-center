
import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { dir } = useLanguage();

  return (
    <div className="h-screen flex flex-col bg-rop-lightGray">
      <TopBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar open={sidebarOpen} />
        
        <main 
          className={cn(
            "flex-1 overflow-y-auto transition-all duration-300 ease-in-out p-4 md:p-6",
            sidebarOpen ? (dir === "rtl" ? "md:mr-64" : "md:ml-64") : (dir === "rtl" ? "md:mr-20" : "md:ml-20")
          )}
        >
          <div className="container mx-auto animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
