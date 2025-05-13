
import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AppLayout } from "@/components/layout/AppLayout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <AppLayout>
      <div className="min-h-[calc(100vh-16rem)] flex flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-rop-blue mb-4">404</h1>
          <div className="w-24 h-1 bg-rop-gold mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 mb-8">Page not found</p>
          <p className="text-gray-500 mb-8 max-w-md">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <Button asChild>
            <a href="/">Return to Dashboard</a>
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default NotFound;
