
import React, { useEffect, useState } from "react";
import { useData } from "@/contexts/DataContext";
import { DataTable } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Plus, Eye, FileEdit, Trash2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRopDataService } from "@/utils/ropDataService";

export function MembersTable() {
  const { memberships: originalMemberships } = useData();
  const { t } = useLanguage();
  const { translateMembership } = useRopDataService();
  const [translatedMemberships, setTranslatedMemberships] = useState(originalMemberships);

  useEffect(() => {
    setTranslatedMemberships(originalMemberships.map(member => translateMembership(member)));
  }, [originalMemberships, translateMembership]);

  const columns = [
    { 
      header: t("Officer"), 
      accessor: "officer" 
    },
    { 
      header: t("Rank"), 
      accessor: "rank" 
    },
    { 
      header: t("Status"), 
      accessor: "status",
      cell: (member: any) => {
        const variant = member.status === t("Active") 
          ? "green" 
          : member.status === t("Pending Renewal") 
            ? "yellow" 
            : "red";
        return <StatusBadge status={member.status} variant={variant} />;
      }
    },
    { 
      header: t("Renewal Date"), 
      accessor: "renewal" 
    },
    { 
      header: t("Member Since"), 
      accessor: "memberSince" 
    },
    { 
      header: t("Actions"), 
      accessor: "id",
      cell: () => (
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <FileEdit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )
    }
  ];

  return (
    <DataTable
      title={t("Members")}
      data={translatedMemberships}
      columns={columns}
      searchField="officer"
      actions={
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" /> {t("Add New")}
        </Button>
      }
    />
  );
}
