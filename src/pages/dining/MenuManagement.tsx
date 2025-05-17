
import React, { useState } from "react";
import { SubPageLayout } from "@/components/shared/SubPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MenuItems } from "@/components/dining/MenuItems";
import { MenuCategories } from "@/components/dining/MenuCategories";
import { MenuStats } from "@/components/dining/MenuStats";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { StyledAddButton } from "@/components/shared/StyledAddButton";
import { Search, Filter, ChefHat } from "lucide-react";

export default function MenuManagement() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  
  return (
    <SubPageLayout
      title={t("Menu Management")}
      subtitle={t("Create and update menu items and categories")}
      parentLink="/dining"
      parentTitle={t("Dining & Catering")}
    >
      <div className="mb-6">
        <MenuStats />
      </div>
      
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            placeholder={t("Search menu items...")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Filter size={16} />
            {t("Filter")}
          </Button>
          
          <StyledAddButton label={t("Add Menu Item")} />
        </div>
      </div>
      
      <Tabs defaultValue="items" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="items" className="flex items-center gap-2">
            <ChefHat size={16} />
            {t("Menu Items")}
          </TabsTrigger>
          <TabsTrigger value="categories">
            {t("Categories")}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="items">
          <MenuItems />
        </TabsContent>
        
        <TabsContent value="categories">
          <MenuCategories />
        </TabsContent>
      </Tabs>
    </SubPageLayout>
  );
}
