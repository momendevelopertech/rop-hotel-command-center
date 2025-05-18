
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface TaxModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tax: any | null;
}

export function TaxModal({ open, onOpenChange, tax }: TaxModalProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  const isEditing = !!tax;
  
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    type: "VAT",
    percentage: "",
    appliedTo: [] as string[],
    active: true,
    description: ""
  });
  
  const [newCategory, setNewCategory] = useState("");
  
  // Available tax types
  const taxTypes = ["VAT", "Service", "Municipal", "Custom"];
  
  // Available categories to apply tax to
  const availableCategories = [
    "All Products",
    "Services",
    "Accommodations",
    "Dining",
    "Room Service",
    "Event Services",
    "Retail Items",
    "Spa & Wellness",
    "Transport Services"
  ];
  
  // Update form data when tax changes
  useEffect(() => {
    if (tax) {
      setFormData({
        id: tax.id || "",
        name: tax.name || "",
        type: tax.type || "VAT",
        percentage: tax.percentage?.toString() || "",
        appliedTo: tax.appliedTo || [],
        active: tax.active !== undefined ? tax.active : true,
        description: tax.description || ""
      });
    } else {
      // Reset form for new tax
      setFormData({
        id: `TAX-${String(Math.floor(Math.random() * 900) + 100)}`,
        name: "",
        type: "VAT",
        percentage: "",
        appliedTo: [],
        active: true,
        description: ""
      });
    }
    setNewCategory("");
  }, [tax]);
  
  const handleChange = (field: string, value: string | boolean | string[]) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };
  
  const handleAddCategory = () => {
    if (newCategory && !formData.appliedTo.includes(newCategory)) {
      setFormData({
        ...formData,
        appliedTo: [...formData.appliedTo, newCategory]
      });
      setNewCategory("");
    }
  };
  
  const handleRemoveCategory = (category: string) => {
    setFormData({
      ...formData,
      appliedTo: formData.appliedTo.filter(c => c !== category)
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, we would save to the database
    toast({
      title: isEditing ? t("Tax Rate Updated") : t("Tax Rate Added"),
      description: isEditing 
        ? t("{{name}} has been updated", { name: formData.name }) 
        : t("{{name}} has been added", { name: formData.name }),
    });
    
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? t("Edit Tax Rate") : t("Add Tax Rate")}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="id">{t("Tax ID")}</Label>
              <Input
                id="id"
                value={formData.id}
                onChange={(e) => handleChange("id", e.target.value)}
                readOnly={isEditing}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="name">{t("Tax Name")}</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">{t("Tax Type")}</Label>
              <Select 
                value={formData.type} 
                onValueChange={(value) => handleChange("type", value)}
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder={t("Select Tax Type")} />
                </SelectTrigger>
                <SelectContent>
                  {taxTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {t(type)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="percentage">{t("Percentage")}</Label>
              <div className="relative">
                <Input
                  id="percentage"
                  type="number"
                  step="0.01"
                  value={formData.percentage}
                  onChange={(e) => handleChange("percentage", e.target.value)}
                  className="pr-8"
                  required
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  %
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {t("Use negative values for discounts")}
              </p>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>{t("Applied To")}</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.appliedTo.map((category) => (
                <Badge key={category} className="px-2 py-1 bg-gray-100 text-gray-800">
                  {category}
                  <X 
                    className="ml-1 h-3 w-3 cursor-pointer" 
                    onClick={() => handleRemoveCategory(category)}
                  />
                </Badge>
              ))}
              {formData.appliedTo.length === 0 && (
                <span className="text-sm text-gray-500">{t("No categories selected")}</span>
              )}
            </div>
            <div className="flex gap-2">
              <Select 
                value={newCategory} 
                onValueChange={setNewCategory}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t("Select Category")} />
                </SelectTrigger>
                <SelectContent>
                  {availableCategories
                    .filter(cat => !formData.appliedTo.includes(cat))
                    .map((category) => (
                      <SelectItem key={category} value={category}>
                        {t(category)}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <Button 
                type="button" 
                onClick={handleAddCategory}
                disabled={!newCategory}
              >
                {t("Add")}
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">{t("Description (Optional)")}</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder={t("Enter additional details about this tax rate")}
              rows={3}
            />
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
            <Button 
              type="submit"
              disabled={!formData.name || !formData.percentage || formData.appliedTo.length === 0}
            >
              {isEditing ? t("Update Tax Rate") : t("Add Tax Rate")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
