
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/components/ui/use-toast";

interface AddMenuItemModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingItem?: any;
}

export function AddMenuItemModal({ open, onOpenChange, editingItem }: AddMenuItemModalProps) {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  
  const isEditing = !!editingItem;
  
  const [formData, setFormData] = useState({
    nameEn: editingItem?.nameEn || "",
    nameAr: editingItem?.nameAr || "",
    descriptionEn: editingItem?.descriptionEn || "",
    descriptionAr: editingItem?.descriptionAr || "",
    category: editingItem?.category || "",
    price: editingItem?.price || "",
    popular: editingItem?.popular || false,
    military: editingItem?.military || false,
    active: editingItem?.active !== undefined ? editingItem.active : true
  });
  
  const handleChange = (field: string, value: string | boolean) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, we would save the data to a database
    toast({
      title: isEditing ? t("Menu Item Updated") : t("Menu Item Added"),
      description: `${formData.nameEn} ${isEditing ? t("has been updated") : t("has been added to the menu")}.`
    });
    
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? t("Edit Menu Item") : t("Add Menu Item")}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nameEn">{t("Name (English)")}</Label>
              <Input
                id="nameEn"
                value={formData.nameEn}
                onChange={(e) => handleChange("nameEn", e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="nameAr">{t("Name (Arabic)")}</Label>
              <Input
                id="nameAr"
                value={formData.nameAr}
                onChange={(e) => handleChange("nameAr", e.target.value)}
                required
                dir="rtl"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">{t("Category")}</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleChange("category", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t("Select category")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Main Dishes">{language === "ar" ? "أطباق رئيسية" : "Main Dishes"}</SelectItem>
                  <SelectItem value="Appetizers">{language === "ar" ? "مقبلات" : "Appetizers"}</SelectItem>
                  <SelectItem value="Side Dishes">{language === "ar" ? "أطباق جانبية" : "Side Dishes"}</SelectItem>
                  <SelectItem value="Desserts">{language === "ar" ? "حلويات" : "Desserts"}</SelectItem>
                  <SelectItem value="Beverages">{language === "ar" ? "مشروبات" : "Beverages"}</SelectItem>
                  <SelectItem value="Officers Special">{language === "ar" ? "خاص بالضباط" : "Officers Special"}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="price">{t("Price (OMR)")}</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) => handleChange("price", e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="descriptionEn">{t("Description (English)")}</Label>
            <Textarea
              id="descriptionEn"
              value={formData.descriptionEn}
              onChange={(e) => handleChange("descriptionEn", e.target.value)}
              rows={2}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="descriptionAr">{t("Description (Arabic)")}</Label>
            <Textarea
              id="descriptionAr"
              value={formData.descriptionAr}
              onChange={(e) => handleChange("descriptionAr", e.target.value)}
              rows={2}
              dir="rtl"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="flex items-center space-x-2">
              <Switch
                id="active"
                checked={formData.active}
                onCheckedChange={(checked) => handleChange("active", checked)}
              />
              <Label htmlFor="active">{t("Active")}</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="popular"
                checked={formData.popular}
                onCheckedChange={(checked) => handleChange("popular", checked)}
              />
              <Label htmlFor="popular">{t("Popular")}</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="military"
                checked={formData.military}
                onCheckedChange={(checked) => handleChange("military", checked)}
              />
              <Label htmlFor="military">{t("Military Special")}</Label>
            </div>
          </div>
          
          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              {t("Cancel")}
            </Button>
            <Button type="submit">
              {isEditing ? t("Update Item") : t("Add Item")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
