
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";

// قائمة الطعام
const menuItems = [
  {
    id: 1,
    name: "لحم مشوي مع الخضروات",
    category: "أطباق رئيسية",
    description: "لحم مشوي مع تشكيلة من الخضروات الموسمية",
    price: "85",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
    popular: true,
    military: true
  },
  {
    id: 2,
    name: "سمك مشوي",
    category: "أطباق رئيسية",
    description: "سمك طازج مشوي مع صوص الليمون",
    price: "75",
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
    popular: false,
    military: true
  },
  {
    id: 3,
    name: "سلطة موسمية",
    category: "مقبلات",
    description: "سلطة طازجة مع خضروات موسمية",
    price: "25",
    image: "https://images.unsplash.com/photo-1572357176061-7c96fd2af22f",
    popular: false,
    military: false
  },
  {
    id: 4,
    name: "أرز بالبخاري",
    category: "أطباق جانبية",
    description: "أرز بالبخاري بالمكسرات والزبيب",
    price: "30",
    image: "https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2",
    popular: true,
    military: false
  }
];

export function MenuItems() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>قائمة الطعام</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {menuItems.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="w-full h-48 overflow-hidden">
                <AspectRatio ratio={16 / 9}>
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="object-cover w-full h-full"
                  />
                </AspectRatio>
              </div>
              <CardContent className="pt-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <span className="font-bold text-blue-600">{item.price} ج.م</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-2">
                  <Badge variant="outline">{item.category}</Badge>
                  {item.popular && <Badge className="bg-amber-500">شائع</Badge>}
                  {item.military && <Badge className="bg-green-600">خاص بالضباط</Badge>}
                </div>
                <p className="text-sm text-gray-500">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
