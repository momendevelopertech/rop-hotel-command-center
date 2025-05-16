
// Find where it uses StatusBadge and replace variant with type
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLanguage } from "@/contexts/LanguageContext";

interface Member {
  id: number;
  name: string;
  rank: string;
  department: string;
  joinDate: string;
  expiryDate: string;
  status: string;
  profileImage?: string;
}

interface MembersTableProps {
  data: Member[];
}

export function MembersTable({ data }: MembersTableProps) {
  const { t } = useLanguage();

  const getStatusType = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "success";
      case "expired":
        return "danger";
      case "pending":
        return "warning";
      case "suspended":
        return "danger";
      default:
        return "info";
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">{t("ID")}</TableHead>
            <TableHead>{t("Member")}</TableHead>
            <TableHead>{t("Department")}</TableHead>
            <TableHead>{t("Join Date")}</TableHead>
            <TableHead>{t("Expiry")}</TableHead>
            <TableHead>{t("Status")}</TableHead>
            <TableHead className="text-right">{t("Actions")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((member) => (
            <TableRow key={member.id}>
              <TableCell className="font-medium">{member.id}</TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={member.profileImage} alt={member.name} />
                    <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-gray-500">{member.rank}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>{member.department}</TableCell>
              <TableCell>{member.joinDate}</TableCell>
              <TableCell>{member.expiryDate}</TableCell>
              <TableCell>
                <StatusBadge status={member.status} type={getStatusType(member.status)} />
              </TableCell>
              <TableCell className="text-right">
                <Button size="sm" variant="outline">
                  {t("Profile")}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
