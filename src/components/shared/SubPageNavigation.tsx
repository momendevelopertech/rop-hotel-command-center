
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

interface SubPageLink {
  title: string;
  href: string;
  description?: string;
}

interface SubPageNavigationProps {
  links: SubPageLink[];
  baseUrl: string;
}

export function SubPageNavigation({ links, baseUrl }: SubPageNavigationProps) {
  const { t, dir } = useLanguage();
  const location = useLocation();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      {links.map((link) => {
        const isActive = location.pathname === `${baseUrl}/${link.href}`;
        return (
          <Link to={`${baseUrl}/${link.href}`} key={link.href}>
            <Card className={`h-full hover:shadow-md transition-shadow ${isActive ? 'border-primary border-2' : ''}`}>
              <CardContent className={`p-4 ${dir === 'rtl' ? 'text-right' : ''}`}>
                <h3 className="text-lg font-medium mb-1">{t(link.title)}</h3>
                {link.description && <p className="text-sm text-gray-500">{t(link.description)}</p>}
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
