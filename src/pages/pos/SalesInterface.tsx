
import React, { useState, useEffect } from "react";
import { SubPageLayout } from "@/components/shared/SubPageLayout";
import { useLanguage } from "@/contexts/LanguageContext";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Plus, Minus, CreditCard, Printer, Check, Search, Delete } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

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

interface Customer {
  id: number;
  name: string;
  rank: string;
  imageSrc?: string;
}

export default function SalesInterface() {
  const { t, translate } = useLanguage();
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState("food");
  const [currentOrder, setCurrentOrder] = useState<OrderItem[]>([]);
  const [tableNumber, setTableNumber] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  
  // List of meals with images
  const menuItems: MenuItem[] = [
    // Food items
    { id: 1, name: "Grilled Chicken", category: "food", price: 7.5, image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JpbGxlZCUyMGNoaWNrZW58ZW58MHx8MHx8fDA%3D" },
    { id: 2, name: "Fish Curry", category: "food", price: 8.5, image: "https://images.unsplash.com/photo-1626101858943-22b222ace1ba?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmlzaCUyMGN1cnJ5fGVufDB8fDB8fHww" },
    { id: 3, name: "Lamb Biryani", category: "food", price: 9.0, image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmlyeWFuaXxlbnwwfHwwfHx8MA%3D%3D" },
    { id: 4, name: "Vegetable Pasta", category: "food", price: 6.5, image: "https://images.unsplash.com/photo-1598866594230-a7c12756260f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmVnZXRhYmxlJTIwcGFzdGF8ZW58MHx8MHx8fDA%3D" },
    { id: 5, name: "Beef Burger", category: "food", price: 7.0, image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YnVyZ2VyfGVufDB8fDB8fHww" },
    { id: 6, name: "Caesar Salad", category: "food", price: 5.5, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2Flc2FyJTIwc2FsYWR8ZW58MHx8MHx8fDA%3D" },
    
    // Drinks
    { id: 7, name: "Water", category: "drinks", price: 1.0, image: "https://images.unsplash.com/photo-1564419320461-6870880221ad?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d2F0ZXIlMjBib3R0bGV8ZW58MHx8MHx8fDA%3D" },
    { id: 8, name: "Soft Drink", category: "drinks", price: 2.0, image: "https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNvZnQlMjBkcmlua3xlbnwwfHwwfHx8MA%3D%3D" },
    { id: 9, name: "Arabic Coffee", category: "drinks", price: 3.0, image: "https://images.unsplash.com/photo-1665881900361-2801eff90a68?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXJhYmljJTIwY29mZmVlfGVufDB8fDB8fHww" },
    { id: 10, name: "Tea", category: "drinks", price: 2.0, image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVhfGVufDB8fDB8fHww" },
    
    // Desserts
    { id: 11, name: "Fruit Salad", category: "desserts", price: 4.0, image: "https://images.unsplash.com/photo-1564093497595-593b96d80180?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZnJ1aXQlMjBzYWxhZHxlbnwwfHwwfHx8MA%3D%3D" },
    { id: 12, name: "Chocolate Cake", category: "desserts", price: 4.5, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hvY29sYXRlJTIwY2FrZXxlbnwwfHwwfHx8MA%3D%3D" },
    { id: 13, name: "Ice Cream", category: "desserts", price: 3.5, image: "https://images.unsplash.com/photo-1560008581-09826d1de69e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aWNlJTIwY3JlYW18ZW58MHx8MHx8fDA%3D" },
  ];
  
  const customers: Customer[] = [
    { id: 1, name: "Omar Al-Farsi", rank: "Captain", imageSrc: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=200&auto=format&fit=crop" },
    { id: 2, name: "Ali Al-Balushi", rank: "Officer" },
    { id: 3, name: "Mohammed Al-Busaidi", rank: "Command" },
    { id: 4, name: "Ahmed Al-Harthi", rank: "Officer" },
    { id: 5, name: "Fatma Al-Siyabi", rank: "Officer" },
    { id: 6, name: "Saeed Al-Maskari", rank: "Cadet" },
  ];
  
  // Filter menu items based on active tab and search query
  const filteredMenuItems = menuItems.filter(item => {
    const matchesCategory = activeTab === 'all' || item.category === activeTab;
    const matchesSearch = searchQuery === '' || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  // Decrease item quantity
  const decreaseQuantity = (id: number) => {
    setCurrentOrder(
      currentOrder.map(item => 
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
      ).filter(item => item.quantity > 0)
    );
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
    
    toast({
      title: t("Order Placed"),
      description: t("Your order has been sent to the kitchen"),
      variant: "default",
    });
    
    // Reset order
    setCurrentOrder([]);
    setTableNumber("");
    setSelectedCustomer(null);
  };
  
  // Select customer
  const handleSelectCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    toast({
      title: t("Customer Selected"),
      description: t("Selected") + ": " + translate(customer.name, "names"),
    });
  };

  return (
    <SubPageLayout
      title="Sales Interface"
      subtitle="Process orders and payments"
      parentLink="/pos"
      parentTitle="POS System"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Menu Section */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{t("Menu")}</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder={t("Search menu...")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
            </CardHeader>
            
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="all">{t("All Items")}</TabsTrigger>
                  <TabsTrigger value="food">{t("Food")}</TabsTrigger>
                  <TabsTrigger value="drinks">{t("Drinks")}</TabsTrigger>
                  <TabsTrigger value="desserts">{t("Desserts")}</TabsTrigger>
                </TabsList>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {filteredMenuItems.map(item => (
                    <Card key={item.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => addToOrder(item)}>
                      <CardContent className="p-3">
                        <div className="mb-2 overflow-hidden rounded-md">
                          <AspectRatio ratio={16 / 9}>
                            <img 
                              src={item.image} 
                              alt={translate(item.name, "meals")} 
                              className="w-full h-full object-cover rounded"
                            />
                          </AspectRatio>
                        </div>
                        <div className="mt-2">
                          <p className="font-medium">{translate(item.name, "meals")}</p>
                          <p className="text-sm text-gray-600">{item.price.toFixed(2)} OMR</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        {/* Order Section */}
        <div className="lg:col-span-1">
          <Card className="h-full flex flex-col">
            <CardHeader className="pb-0">
              <CardTitle>{t("Current Order")}</CardTitle>
              <div className="flex items-center gap-2 mt-2">
                <label className="text-sm">{t("Table")}:</label>
                <Input
                  type="text"
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  className="w-16 h-8"
                  placeholder="#"
                />
                
                {/* Selected customer */}
                {selectedCustomer && (
                  <div className="ml-auto flex items-center gap-2 bg-blue-50 px-2 py-1 rounded-full">
                    <Avatar className="h-6 w-6">
                      {selectedCustomer.imageSrc ? (
                        <AvatarImage src={selectedCustomer.imageSrc} alt={selectedCustomer.name} />
                      ) : (
                        <AvatarFallback>{selectedCustomer.name.charAt(0)}</AvatarFallback>
                      )}
                    </Avatar>
                    <span className="text-xs text-blue-800">
                      {translate(selectedCustomer.name, "names")}
                    </span>
                    <button 
                      onClick={() => setSelectedCustomer(null)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Delete className="h-3 w-3" />
                    </button>
                  </div>
                )}
              </div>
            </CardHeader>
            
            {!selectedCustomer && (
              <div className="px-4 py-2">
                <p className="text-sm font-medium mb-2">{t("Select Customer")}:</p>
                <div className="flex flex-wrap gap-2">
                  {customers.map(customer => (
                    <div 
                      key={customer.id}
                      onClick={() => handleSelectCustomer(customer)}
                      className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded-full cursor-pointer"
                    >
                      <Avatar className="h-5 w-5">
                        {customer.imageSrc ? (
                          <AvatarImage src={customer.imageSrc} alt={customer.name} />
                        ) : (
                          <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                        )}
                      </Avatar>
                      <span className="text-xs">{translate(customer.name, "names")}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <CardContent className="flex-grow overflow-auto pt-4">
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
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-red-500" onClick={() => removeFromOrder(item.id)}>
                          <Delete className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
            
            <div className="p-4 border-t">
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
            </div>
          </Card>
        </div>
      </div>
    </SubPageLayout>
  );
}
