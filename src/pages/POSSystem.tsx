
import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Plus, Minus, Printer, CreditCard, Check } from "lucide-react";

interface MenuItem {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
}

interface OrderItem {
  id: number;
  menuItemId: number;
  name: string;
  price: number;
  quantity: number;
}

export default function POSSystem() {
  const { t, translate } = useLanguage();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("main");
  const [currentOrder, setCurrentOrder] = useState<OrderItem[]>([]);
  const [tableNumber, setTableNumber] = useState<string>("");
  
  // Sample menu items
  const menuItems: MenuItem[] = [
    { id: 1, name: "Grilled Chicken", category: "main", price: 8.5, image: "/placeholder.svg" },
    { id: 2, name: "Fish Curry", category: "main", price: 9.25, image: "/placeholder.svg" },
    { id: 3, name: "Lamb Biryani", category: "main", price: 10.5, image: "/placeholder.svg" },
    { id: 4, name: "Vegetable Pasta", category: "main", price: 7.5, image: "/placeholder.svg" },
    { id: 5, name: "Caesar Salad", category: "appetizer", price: 5.75, image: "/placeholder.svg" },
    { id: 6, name: "Seafood Platter", category: "appetizer", price: 12, image: "/placeholder.svg" },
    { id: 7, name: "Water", category: "beverages", price: 1.5, image: "/placeholder.svg" },
    { id: 8, name: "Soft Drink", category: "beverages", price: 2.5, image: "/placeholder.svg" },
    { id: 9, name: "Arabic Coffee", category: "beverages", price: 3.5, image: "/placeholder.svg" },
    { id: 10, name: "Tea", category: "beverages", price: 2.0, image: "/placeholder.svg" },
    { id: 11, name: "Fruit Salad", category: "dessert", price: 4.5, image: "/placeholder.svg" },
    { id: 12, name: "Chocolate Cake", category: "dessert", price: 5.5, image: "/placeholder.svg" },
  ];

  // Add item to order
  const addToOrder = (menuItem: MenuItem) => {
    const existingItem = currentOrder.find(item => item.menuItemId === menuItem.id);
    
    if (existingItem) {
      setCurrentOrder(currentOrder.map(item => 
        item.menuItemId === menuItem.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      ));
    } else {
      setCurrentOrder([
        ...currentOrder, 
        { 
          id: Date.now(), 
          menuItemId: menuItem.id, 
          name: menuItem.name, 
          price: menuItem.price, 
          quantity: 1 
        }
      ]);
    }
    
    toast({
      title: t("Item Added"),
      description: `${translate(menuItem.name, "meals")} ${t("added to order")}`,
    });
  };

  // Increase item quantity
  const increaseQuantity = (id: number) => {
    setCurrentOrder(currentOrder.map(item => 
      item.id === id 
        ? { ...item, quantity: item.quantity + 1 } 
        : item
    ));
  };

  // Decrease item quantity
  const decreaseQuantity = (id: number) => {
    setCurrentOrder(currentOrder.map(item => 
      item.id === id 
        ? { ...item, quantity: Math.max(1, item.quantity - 1) } 
        : item
    ).filter(item => item.quantity > 0));
  };

  // Remove item from order
  const removeFromOrder = (id: number) => {
    setCurrentOrder(currentOrder.filter(item => item.id !== id));
  };

  // Calculate total
  const calculateTotal = () => {
    return currentOrder.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
  };

  // Process order
  const processOrder = () => {
    if (currentOrder.length === 0) {
      toast({
        title: t("Error"),
        description: t("Please add items to your order"),
        variant: "destructive",
      });
      return;
    }
    
    if (!tableNumber) {
      toast({
        title: t("Error"),
        description: t("Please enter a table number"),
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: t("Order Placed"),
      description: t("Your order has been sent to the kitchen"),
    });
    
    // Reset order
    setCurrentOrder([]);
    setTableNumber("");
  };

  return (
    <AppLayout>
      <PageHeader 
        title={t("POS System")} 
        subtitle={t("Restaurant order management")}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Menu Section */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>{t("Menu")}</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="main">{t("Main Courses")}</TabsTrigger>
                  <TabsTrigger value="appetizer">{t("Appetizers")}</TabsTrigger>
                  <TabsTrigger value="beverages">{t("Beverages")}</TabsTrigger>
                  <TabsTrigger value="dessert">{t("Desserts")}</TabsTrigger>
                </TabsList>
                
                {["main", "appetizer", "beverages", "dessert"].map(category => (
                  <TabsContent value={category} key={category}>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {menuItems
                        .filter(item => item.category === category)
                        .map(item => (
                          <Card key={item.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => addToOrder(item)}>
                            <CardContent className="p-3">
                              <img src={item.image} alt={translate(item.name, "meals")} className="w-full h-24 object-cover rounded" />
                              <div className="mt-2">
                                <p className="font-medium">{translate(item.name, "meals")}</p>
                                <p className="text-sm text-gray-600">{item.price.toFixed(2)} OMR</p>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        {/* Order Section */}
        <div className="lg:col-span-1">
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle>{t("Current Order")}</CardTitle>
              <div className="flex items-center gap-2">
                <label className="text-sm">{t("Table")}:</label>
                <input 
                  type="text" 
                  value={tableNumber} 
                  onChange={(e) => setTableNumber(e.target.value)} 
                  className="border rounded px-2 py-1 w-16"
                  placeholder="#"
                />
              </div>
            </CardHeader>
            <CardContent className="flex-grow overflow-auto">
              {currentOrder.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  {t("No items in order")}
                </div>
              ) : (
                <div className="space-y-2">
                  {currentOrder.map(item => (
                    <div key={item.id} className="flex justify-between items-center border-b pb-2">
                      <div>
                        <p className="font-medium">{translate(item.name, "meals")}</p>
                        <p className="text-sm text-gray-600">{item.price.toFixed(2)} OMR</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => decreaseQuantity(item.id)}>
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span>{item.quantity}</span>
                        <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => increaseQuantity(item.id)}>
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
            <CardFooter className="flex-col border-t pt-4">
              <div className="w-full flex justify-between items-center mb-4 text-lg font-bold">
                <span>{t("Total")}:</span>
                <span>{calculateTotal()} OMR</span>
              </div>
              <div className="w-full grid grid-cols-3 gap-2">
                <Button variant="outline" className="flex items-center gap-1" disabled={currentOrder.length === 0}>
                  <Printer className="h-4 w-4" />
                  <span>{t("Print")}</span>
                </Button>
                <Button variant="secondary" className="flex items-center gap-1" disabled={currentOrder.length === 0}>
                  <CreditCard className="h-4 w-4" />
                  <span>{t("Pay")}</span>
                </Button>
                <Button variant="default" className="flex items-center gap-1" onClick={processOrder}>
                  <Check className="h-4 w-4" />
                  <span>{t("Place")}</span>
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
