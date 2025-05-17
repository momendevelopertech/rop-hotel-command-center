
import React, { useState } from "react";
import { SubPageLayout } from "@/components/shared/SubPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { KitchenDispatchStats } from "@/components/dining/KitchenDispatchStats";
import { KitchenOrdersTable } from "@/components/dining/KitchenOrdersTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Clock, ChefHat, CheckCircle } from "lucide-react";

export default function KitchenDispatch() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  
  return (
    <SubPageLayout
      title={t("Kitchen Dispatch")}
      subtitle={t("Monitor order preparation and delivery")}
      parentLink="/dining"
      parentTitle={t("Dining & Catering")}
    >
      <div className="mb-6">
        <KitchenDispatchStats />
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
        </div>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">
            {t("Orders Queue")}
          </TabsTrigger>
          <TabsTrigger value="next" className="flex items-center gap-2">
            <Clock size={16} />
            {t("Next Up")}
          </TabsTrigger>
          <TabsTrigger value="preparing" className="flex items-center gap-2">
            <ChefHat size={16} />
            {t("In Preparation")}
          </TabsTrigger>
          <TabsTrigger value="ready" className="flex items-center gap-2">
            <CheckCircle size={16} />
            {t("Ready to Serve")}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{t("Orders by Status")}</CardTitle>
              <div className="flex items-center">
                <div className="flex items-center gap-2 mr-4">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm">{t("Ready")}: 6</span>
                </div>
                <div className="flex items-center gap-2 mr-4">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm">{t("Preparing")}: 8</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <span className="text-sm">{t("Pending")}: 14</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <KitchenOrdersTable />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="next">
          <Card>
            <CardHeader>
              <CardTitle>{t("Next Up")}</CardTitle>
            </CardHeader>
            <CardContent>
              <KitchenOrdersTable />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="preparing">
          <Card>
            <CardHeader>
              <CardTitle>{t("In Preparation")}</CardTitle>
              <div className="flex items-center text-gray-500 text-sm">
                {t("Average Prep Time")}: {t("{{count}} minutes", { count: 18 })}
              </div>
            </CardHeader>
            <CardContent>
              <KitchenOrdersTable />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="ready">
          <Card>
            <CardHeader>
              <CardTitle>{t("Ready to Serve")}</CardTitle>
            </CardHeader>
            <CardContent>
              <KitchenOrdersTable />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </SubPageLayout>
  );
}
