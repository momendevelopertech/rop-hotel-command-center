
import React from "react";
import { SubPageLayout } from "@/components/shared/SubPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SalesInterface() {
  const { t, language } = useLanguage();
  
  // Sample categories and items
  const categories = [
    language === "ar" ? "المقبلات" : "Starters",
    language === "ar" ? "الأطباق الرئيسية" : "Main Dishes",
    language === "ar" ? "الحلويات" : "Desserts",
    language === "ar" ? "المشروبات" : "Drinks"
  ];
  
  const items = [
    { name: language === "ar" ? "سلطة" : "Salad", price: "2.5", category: "Starters" },
    { name: language === "ar" ? "حساء" : "Soup", price: "3.0", category: "Starters" },
    { name: language === "ar" ? "دجاج مشوي" : "Chicken BBQ", price: "5.5", category: "Main Dishes" },
    { name: language === "ar" ? "سمك مشوي" : "Grilled Fish", price: "7.5", category: "Main Dishes" },
    { name: language === "ar" ? "أرز" : "Rice", price: "1.5", category: "Main Dishes" },
    { name: language === "ar" ? "كيك" : "Cake", price: "3.0", category: "Desserts" },
    { name: language === "ar" ? "آيس كريم" : "Ice Cream", price: "2.0", category: "Desserts" },
    { name: language === "ar" ? "شاي" : "Tea", price: "1.0", category: "Drinks" },
    { name: language === "ar" ? "قهوة" : "Coffee", price: "1.5", category: "Drinks" },
    { name: language === "ar" ? "عصير" : "Juice", price: "2.0", category: "Drinks" }
  ];
  
  // Sample order items
  const orderItems = [
    { name: language === "ar" ? "دجاج مشوي" : "Chicken BBQ", quantity: 1, price: "5.5" },
    { name: language === "ar" ? "أرز" : "Rice", quantity: 2, price: "3.0" },
    { name: language === "ar" ? "عصير" : "Juice", quantity: 1, price: "2.0" }
  ];
  
  // Calculate total
  const subtotal = orderItems.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0);
  const tax = subtotal * 0.05;
  const total = subtotal + tax;
  
  return (
    <SubPageLayout
      title={t("Sales Interface")}
      subtitle={t("Process orders and transactions")}
      parentLink="/pos"
      parentTitle={t("POS")}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Menu Items Section */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>{t("Menu Items")}</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="Starters">
                <TabsList className="mb-4">
                  {categories.map((category) => (
                    <TabsTrigger key={category} value={category.includes("Main") || category.includes("الأطباق") ? "Main Dishes" : category}>
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {categories.map((category) => (
                  <TabsContent 
                    key={category} 
                    value={category.includes("Main") || category.includes("الأطباق") ? "Main Dishes" : category}
                  >
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {items
                        .filter(item => (
                          (category.includes("Main") || category.includes("الأطباق")) 
                            ? item.category === "Main Dishes" 
                            : item.category === category || 
                              (category === "Starters" && item.category === "Starters") ||
                              (category === "Desserts" && item.category === "Desserts") ||
                              (category === "Drinks" && item.category === "Drinks")
                        ))
                        .map((item, idx) => (
                          <Button 
                            key={idx} 
                            variant="outline" 
                            className="h-20 flex flex-col items-center justify-center"
                          >
                            <span>{item.name}</span>
                            <span className="text-muted-foreground text-sm">
                              {language === "ar" ? `${item.price} ر.ع` : `${item.price} OMR`}
                            </span>
                          </Button>
                        ))
                      }
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        {/* Order Summary Section */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>{t("Current Order")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-md p-4">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-medium">{t("Table")} 5</span>
                    <span className="text-sm text-muted-foreground">ORD-001</span>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    {orderItems.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center">
                        <div>
                          <span className="font-medium">{item.quantity}x </span>
                          <span>{item.name}</span>
                        </div>
                        <span>
                          {language === "ar" 
                            ? `${(parseFloat(item.price) * item.quantity).toFixed(2)} ر.ع` 
                            : `${(parseFloat(item.price) * item.quantity).toFixed(2)} OMR`}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t pt-2">
                    <div className="flex justify-between">
                      <span>{t("Subtotal")}</span>
                      <span>{language === "ar" ? `${subtotal.toFixed(2)} ر.ع` : `${subtotal.toFixed(2)} OMR`}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t("Tax")} (5%)</span>
                      <span>{language === "ar" ? `${tax.toFixed(2)} ر.ع` : `${tax.toFixed(2)} OMR`}</span>
                    </div>
                    <div className="flex justify-between font-bold mt-2">
                      <span>{t("Total")}</span>
                      <span>{language === "ar" ? `${total.toFixed(2)} ر.ع` : `${total.toFixed(2)} OMR`}</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline">{t("Cancel")}</Button>
                  <Button>{t("Pay")}</Button>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <Button variant="outline">{t("Print Receipt")}</Button>
                  <Button variant="outline">{t("Save Order")}</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SubPageLayout>
  );
}
