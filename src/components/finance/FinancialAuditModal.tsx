
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { format } from "date-fns";
import { Download, Printer } from "lucide-react";

interface FinancialAuditModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  log: any | null;
}

export function FinancialAuditModal({ open, onOpenChange, log }: FinancialAuditModalProps) {
  const { t } = useLanguage();
  
  if (!log) return null;
  
  // Get action badge color
  const getActionBadgeColor = (type: string) => {
    switch(type) {
      case "Create": return "bg-green-100 text-green-800";
      case "Update": return "bg-blue-100 text-blue-800";
      case "Delete": return "bg-red-100 text-red-800";
      case "View": return "bg-gray-100 text-gray-800";
      case "Export": return "bg-purple-100 text-purple-800";
      case "Payment": return "bg-amber-100 text-amber-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>{t("Audit Log Details")}</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <div className="border rounded-md p-4 mb-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getActionBadgeColor(log.type)}`}>
                  {log.type}
                </span>
                <h3 className="text-lg font-medium mt-2">{log.action}</h3>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">{t("Log ID")}</p>
                <p className="font-mono bg-gray-100 px-2 py-1 rounded text-xs">{log.id}</p>
              </div>
            </div>
            <p className="text-gray-600">{log.details}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">{t("User")}</p>
              <p className="text-gray-600">{log.user}</p>
            </div>
            <div>
              <p className="text-sm font-medium">{t("Timestamp")}</p>
              <p className="text-gray-600">{format(new Date(log.timestamp), "MMM dd, yyyy HH:mm:ss")}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <p className="text-sm font-medium">{t("Entity Type")}</p>
              <p className="text-gray-600">{log.entity}</p>
            </div>
            <div>
              <p className="text-sm font-medium">{t("Entity ID")}</p>
              <p className="text-gray-600 font-mono">{log.entityId}</p>
            </div>
          </div>
          
          <div className="mt-4">
            <p className="text-sm font-medium">{t("IP Address")}</p>
            <p className="text-gray-600 font-mono">{log.ipAddress}</p>
          </div>
          
          {/* Additional information for specific types */}
          {log.type === "Update" && (
            <div className="mt-4 border-t pt-4">
              <p className="text-sm font-medium">{t("Changes")}</p>
              <div className="bg-gray-50 p-3 rounded-md mt-2 text-sm">
                <p className="font-mono">{t("Before")}: Tourism Fee: 3%</p>
                <p className="font-mono">{t("After")}: Tourism Fee: 4%</p>
              </div>
            </div>
          )}
          
          {log.type === "Delete" && (
            <div className="mt-4 border-t pt-4">
              <p className="text-sm font-medium text-red-600">{t("Deletion Information")}</p>
              <p className="text-sm text-gray-600 mt-2">
                {t("Reason")}: {t("Duplicate Entry")}
              </p>
              <p className="text-sm text-gray-600">
                {t("Requires Approval")}: {t("No")}
              </p>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t("Close")}
          </Button>
          <Button variant="outline" className="gap-2">
            <Printer className="h-4 w-4" />
            {t("Print")}
          </Button>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            {t("Export")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
