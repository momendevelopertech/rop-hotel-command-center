
import React, { useState } from "react";
import { SubPageLayout } from "@/components/shared/SubPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { OrderManagementStats } from "@/components/dining/OrderManagementStats";
import { OrdersTable } from "@/components/dining/OrdersTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { StyledAddButton } from "@/components/shared/StyledAddButton";
import { Search, Filter, Coffee, Utensils, Wine } from "lucide-react";

export default function OrderManagement() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  
  return (
    <SubPageLayout
      title={t("Order Management")}
      subtitle={t("Track and manage food and beverage orders")}
      parentLink="/dining"
      parentTitle={t("Dining & Catering")}
    >
      <div className="mb-6">
        <OrderManagementStats />
      </div>
      
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            placeholder={t("Search orders...")}
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
          
          <StyledAddButton label={t("Add Order")} />
        </div>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all" className="px-4">
            {t("All Orders")}
          </TabsTrigger>
          <TabsTrigger value="breakfast" className="flex items-center gap-2">
            <Coffee size={16} />
            {t("Breakfast")}
          </TabsTrigger>
          <TabsTrigger value="lunch" className="flex items-center gap-2">
            <Utensils size={16} />
            {t("Lunch")}
          </TabsTrigger>
          <TabsTrigger value="dinner" className="flex items-center gap-2">
            <Wine size={16} />
            {t("Dinner")}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>{t("All Orders")}</CardTitle>
            </CardHeader>
            <CardContent>
              <OrdersTable />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="breakfast">
          <Card>
            <CardHeader>
              <CardTitle>{t("Breakfast")}</CardTitle>
            </CardHeader>
            <CardContent>
              <OrdersTable />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="lunch">
          <Card>
            <CardHeader>
              <CardTitle>{t("Lunch")}</CardTitle>
            </CardHeader>
            <CardContent>
              <OrdersTable />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="dinner">
          <Card>
            <CardHeader>
              <CardTitle>{t("Dinner")}</CardTitle>
            </CardHeader>
            <CardContent>
              <OrdersTable />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </SubPageLayout>
  );
}
