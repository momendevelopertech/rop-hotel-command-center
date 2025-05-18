
import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface MenuCategoriesProps {
  searchQuery?: string;
  showInactive?: boolean;
}

// Categories data
const categories = [
  {
    id: 1,
    name: "أطباق رئيسية",
    nameEn: "Main Dishes",
    description: "الأطباق الرئيسية التي تقدم كوجبة كاملة",
    descriptionEn: "Main dishes served as complete meals",
    itemCount: 12,
    displayOrder: 1,
    active: true
  },
  {
    id: 2,
    name: "مقبلات",
    nameEn: "Appetizers",
    description: "أطباق صغيرة تقدم قبل الطبق الرئيسي",
    descriptionEn: "Small dishes served before the main course",
    itemCount: 8,
    displayOrder: 2,
    active: true
  },
  {
    id: 3,
    name: "أطباق جانبية",
    nameEn: "Side Dishes",
    description: "أطباق تقدم مع الطبق الرئيسي",
    descriptionEn: "Dishes served alongside the main course",
    itemCount: 6,
    displayOrder: 3,
    active: true
  },
  {
    id: 4,
    name: "حلويات",
    nameEn: "Desserts",
    description: "أطباق حلوة تقدم بعد الوجبة الرئيسية",
    descriptionEn: "Sweet dishes served after the main meal",
    itemCount: 7,
    displayOrder: 4,
    active: true
  },
  {
    id: 5,
    name: "مشروبات",
    nameEn: "Beverages",
    description: "مشروبات باردة وساخنة",
    descriptionEn: "Hot and cold drinks",
    itemCount: 10,
    displayOrder: 5,
    active: true
  },
  {
    id: 6,
    name: "خاص بالضباط",
    nameEn: "Officers Special",
    description: "أطباق خاصة متاحة فقط للضباط",
    descriptionEn: "Special dishes available only to officers",
    itemCount: 4,
    displayOrder: 6,
    active: true
  },
  {
    id: 7,
    name: "قائمة الإفطار",
    nameEn: "Breakfast Menu",
    description: "أطباق تقدم خلال فترة الإفطار",
    descriptionEn: "Dishes served during breakfast hours",
    itemCount: 9,
    displayOrder: 7,
    active: false
  }
];

export function MenuCategories({ searchQuery = "", showInactive = false }: MenuCategoriesProps) {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  
  const filteredCategories = useMemo(() => {
    return categories.filter(category => {
      const matchesSearch = searchQuery 
        ? (language === "ar" 
            ? category.name.toLowerCase().includes(searchQuery.toLowerCase())
            : category.nameEn.toLowerCase().includes(searchQuery.toLowerCase())) 
        : true;
      
      const statusMatch = category.active || (!category.active && showInactive);
      
      return matchesSearch && statusMatch;
    });
  }, [searchQuery, showInactive, language]);

  const handleEdit = (id: number) => {
    toast({
      title: t("Edit Category"),
      description: `${t("Editing category")} #${id}`,
    });
  };
  
  const handleDelete = (id: number) => {
    toast({
      title: t("Delete Category"),
      description: `${t("Category")} #${id} ${t("has been deleted")}`,
      variant: "destructive",
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("Menu Categories")}</CardTitle>
      </CardHeader>
      <CardContent>
        {filteredCategories.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground">
            <p>{t("No categories found")}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("ID")}</TableHead>
                  <TableHead>{t("Category Name")}</TableHead>
                  <TableHead>{t("Description")}</TableHead>
                  <TableHead className="text-center">{t("Items")}</TableHead>
                  <TableHead className="text-center">{t("Order")}</TableHead>
                  <TableHead className="text-center">{t("Status")}</TableHead>
                  <TableHead className="text-center">{t("Actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCategories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell>{category.id}</TableCell>
                    <TableCell className="font-medium">
                      {language === "ar" ? category.name : category.nameEn}
                    </TableCell>
                    <TableCell className="max-w-[300px]">
                      {language === "ar" ? category.description : category.descriptionEn}
                    </TableCell>
                    <TableCell className="text-center">{category.itemCount}</TableCell>
                    <TableCell className="text-center">{category.displayOrder}</TableCell>
                    <TableCell className="text-center">
                      {category.active ? (
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">{t("Active")}</Badge>
                      ) : (
                        <Badge variant="secondary">{t("Inactive")}</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => handleEdit(category.id)}
                        >
                          <Edit size={16} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-red-500"
                          onClick={() => handleDelete(category.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
