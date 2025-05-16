
import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { MembersTable } from "@/components/membership/MembersTable";
import { MembershipStats } from "@/components/membership/MembershipStats";
import { RankDistribution } from "@/components/membership/RankDistribution";
import { PageHeader } from "@/components/shared/PageHeader";
import { useLanguage } from "@/contexts/LanguageContext";
import { useData } from "@/contexts/DataContext";

export default function Membership() {
  const { t } = useLanguage();
  const { memberships } = useData();
  
  // Transform memberships to match MembersTable expected format
  const formattedMembers = memberships.map((member) => ({
    id: member.id,
    name: member.officer,
    rank: member.rank,
    department: ["Operations", "Intelligence", "Training", "Administration"][member.id % 4],
    joinDate: member.memberSince,
    expiryDate: member.renewal,
    status: member.status
  }));
  
  return (
    <AppLayout>
      <PageHeader 
        title={t("Membership")} 
        subtitle={t("Manage memberships and access privileges")}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <MembershipStats />
      </div>
      
      <div className="grid grid-cols-1 gap-6 mb-6">
        <div className="col-span-2">
          <MembersTable data={formattedMembers} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <RankDistribution />
      </div>
    </AppLayout>
  );
}
