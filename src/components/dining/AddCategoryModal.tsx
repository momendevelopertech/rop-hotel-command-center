
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/components/ui/use-toast";

interface AddCategoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingCategory?: any;
}

export function AddCategoryModal({ open, onOpenChange, editingCategory }: AddCategoryModalProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const isEditing = !!editingCategory;
  
  const [formData, setFormData] = useState({
    nameEn: editingCategory?.nameEn || "",
    nameAr: editingCategory?.name || "",
    descriptionEn: editingCategory?.descriptionEn || "",
    descriptionAr: editingCategory?.description || "",
    displayOrder: editingCategory?.displayOrder || "",
    active: editingCategory?.active !== undefined ? editingCategory.active : true
  });
  
  const handleChange = (field: string, value: string | boolean | number) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, we would save the data to a database
    toast({
      title: isEditing ? t("Category Updated") : t("Category Added"),
      description: `${formData.nameEn} ${isEditing ? t("has been updated") : t("has been added to the menu")}.`
    });
    
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? t("Edit Category") : t("Add Category")}</DialogTitle>
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
          
          <div className="space-y-2">
            <Label htmlFor="displayOrder">{t("Display Order")}</Label>
            <Input
              id="displayOrder"
              type="number"
              min="1"
              value={formData.displayOrder}
              onChange={(e) => handleChange("displayOrder", e.target.value)}
              required
            />
            <p className="text-xs text-muted-foreground">{t("Lower numbers appear first")}</p>
          </div>
          
          <div className="flex items-center space-x-2 pt-2">
            <Switch
              id="active"
              checked={formData.active}
              onCheckedChange={(checked) => handleChange("active", checked)}
            />
            <Label htmlFor="active">{t("Active")}</Label>
          </div>
          
          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              {t("Cancel")}
            </Button>
            <Button type="submit">
              {isEditing ? t("Update Category") : t("Add Category")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
