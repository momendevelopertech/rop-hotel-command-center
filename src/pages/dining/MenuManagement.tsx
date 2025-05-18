
import React, { useState, useMemo } from "react";
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
import { Search, Filter, ChefHat, UtensilsCrossed } from "lucide-react";
import { AddMenuItemModal } from "@/components/dining/AddMenuItemModal";
import { AddCategoryModal } from "@/components/dining/AddCategoryModal";
import { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu";

export default function MenuManagement() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("items");
  const [menuItemModalOpen, setMenuItemModalOpen] = useState(false);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  
  // Filter states
  const [filters, setFilters] = useState({
    showPopular: false,
    showMilitary: false,
    showActive: true,
    showInactive: false,
  });

  // Handle filter change
  const handleFilterChange = (key: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  
  const handleAddItem = () => {
    if (activeTab === "items") {
      setMenuItemModalOpen(true);
    } else {
      setCategoryModalOpen(true);
    }
  };
  
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter size={16} />
                {t("Filter")}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>{t("Filter Options")}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={filters.showPopular}
                onCheckedChange={() => handleFilterChange("showPopular")}
              >
                {t("Popular Items")}
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filters.showMilitary}
                onCheckedChange={() => handleFilterChange("showMilitary")}
              >
                {t("Military Special")}
              </DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>{t("Status")}</DropdownMenuLabel>
              <DropdownMenuCheckboxItem
                checked={filters.showActive}
                onCheckedChange={() => handleFilterChange("showActive")}
              >
                {t("Active")}
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filters.showInactive}
                onCheckedChange={() => handleFilterChange("showInactive")}
              >
                {t("Inactive")}
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <StyledAddButton 
            label={activeTab === "items" ? t("Add Menu Item") : t("Add Category")} 
            onClick={handleAddItem}
          />
        </div>
      </div>
      
      <Tabs 
        defaultValue="items" 
        className="w-full"
        onValueChange={(value) => setActiveTab(value)}
      >
        <TabsList className="mb-4">
          <TabsTrigger value="items" className="flex items-center gap-2">
            <UtensilsCrossed size={16} />
            {t("Menu Items")}
          </TabsTrigger>
          <TabsTrigger value="categories" className="flex items-center gap-2">
            <ChefHat size={16} />
            {t("Categories")}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="items">
          <MenuItems searchQuery={searchQuery} filters={filters} />
        </TabsContent>
        
        <TabsContent value="categories">
          <MenuCategories searchQuery={searchQuery} showInactive={filters.showInactive} />
        </TabsContent>
      </Tabs>
      
      {/* Modals */}
      <AddMenuItemModal open={menuItemModalOpen} onOpenChange={setMenuItemModalOpen} />
      <AddCategoryModal open={categoryModalOpen} onOpenChange={setCategoryModalOpen} />
    </SubPageLayout>
  );
}
