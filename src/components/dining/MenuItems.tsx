
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// Menu items with translations
const menuItems = [
  {
    id: 1,
    nameAr: "لحم مشوي مع الخضروات",
    nameEn: "Grilled Meat with Vegetables",
    category: "أطباق رئيسية",
    categoryEn: "Main Dishes",
    descriptionAr: "لحم مشوي مع تشكيلة من الخضروات الموسمية",
    descriptionEn: "Grilled meat with a selection of seasonal vegetables",
    price: "85",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
    popular: true,
    military: true
  },
  {
    id: 2,
    nameAr: "سمك مشوي",
    nameEn: "Grilled Fish",
    category: "أطباق رئيسية",
    categoryEn: "Main Dishes",
    descriptionAr: "سمك طازج مشوي مع صوص الليمون",
    descriptionEn: "Fresh grilled fish with lemon sauce",
    price: "75",
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
    popular: false,
    military: true
  },
  {
    id: 3,
    nameAr: "سلطة موسمية",
    nameEn: "Seasonal Salad",
    category: "مقبلات",
    categoryEn: "Appetizers",
    descriptionAr: "سلطة طازجة مع خضروات موسمية",
    descriptionEn: "Fresh salad with seasonal vegetables",
    price: "25",
    image: "https://images.unsplash.com/photo-1572357176061-7c96fd2af22f",
    popular: false,
    military: false
  },
  {
    id: 4,
    nameAr: "أرز بالبخاري",
    nameEn: "Bukhari Rice",
    category: "أطباق جانبية",
    categoryEn: "Side Dishes",
    descriptionAr: "أرز بالبخاري بالمكسرات والزبيب",
    descriptionEn: "Bukhari rice with nuts and raisins",
    price: "30",
    image: "https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2",
    popular: true,
    military: false
  },
  {
    id: 5,
    nameAr: "كنافة بالجبن",
    nameEn: "Cheese Kunafa",
    category: "حلويات",
    categoryEn: "Desserts",
    descriptionAr: "حلوى شرقية تقليدية مع الجبن والقطر",
    descriptionEn: "Traditional Middle Eastern dessert with cheese and syrup",
    price: "40",
    image: "https://images.unsplash.com/photo-1566454825481-9c31accb97ae",
    popular: true,
    military: false
  },
  {
    id: 6,
    nameAr: "شاي بالنعناع",
    nameEn: "Mint Tea",
    category: "مشروبات",
    categoryEn: "Beverages",
    descriptionAr: "شاي مع أوراق النعناع الطازجة",
    descriptionEn: "Tea with fresh mint leaves",
    price: "15",
    image: "https://images.unsplash.com/photo-1583577612013-4fecf7bf8f13",
    popular: false,
    military: false
  },
  {
    id: 7,
    nameAr: "لحم عجل مع صلصة خاصة",
    nameEn: "Veal with Special Sauce",
    category: "خاص بالضباط",
    categoryEn: "Officers Special",
    descriptionAr: "لحم عجل فاخر مع صلصة خاصة",
    descriptionEn: "Premium veal with a special sauce",
    price: "110",
    image: "https://images.unsplash.com/photo-1535245407539-d2acf4e305b3",
    popular: true,
    military: true
  },
  {
    id: 8,
    nameAr: "فطور عربي",
    nameEn: "Arabic Breakfast",
    category: "قائمة الإفطار",
    categoryEn: "Breakfast Menu",
    descriptionAr: "فول، حمص، زيتون، جبنة، وشاي",
    descriptionEn: "Beans, hummus, olives, cheese, and tea",
    price: "55",
    image: "https://images.unsplash.com/photo-1470324161839-ce2bb6fa6bc3",
    popular: true,
    military: false
  }
];

export function MenuItems() {
  const { t, language } = useLanguage();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("Menu Items")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {menuItems.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="w-full h-48 overflow-hidden">
                <AspectRatio ratio={16 / 9}>
                  <img 
                    src={item.image} 
                    alt={language === "ar" ? item.nameAr : item.nameEn}
                    className="object-cover w-full h-full"
                  />
                </AspectRatio>
              </div>
              <CardContent className="pt-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg">
                    {language === "ar" ? item.nameAr : item.nameEn}
                  </h3>
                  <span className="font-bold text-blue-600">
                    {t("{{price}} OMR", { price: item.price })}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mb-2">
                  <Badge variant="outline">
                    {language === "ar" ? item.category : item.categoryEn}
                  </Badge>
                  {item.popular && (
                    <Badge className="bg-amber-500 flex items-center gap-1">
                      <Star size={12} />
                      {t("Popular")}
                    </Badge>
                  )}
                  {item.military && (
                    <Badge className="bg-green-600">
                      {t("Military Special")}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {language === "ar" ? item.descriptionAr : item.descriptionEn}
                </p>
                <div className="mt-3 flex justify-end gap-2">
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <Edit size={16} className="mr-1" />
                    {t("Edit")}
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 px-2 text-red-500">
                    <Trash2 size={16} className="mr-1" />
                    {t("Delete")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
