
import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { MembersTable } from "@/components/membership/MembersTable";
import { MembershipStats } from "@/components/membership/MembershipStats";
import { RankDistribution } from "@/components/membership/RankDistribution";
import { PageHeader } from "@/components/shared/PageHeader";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Membership() {
  const { t } = useLanguage();
  
  return (
    <AppLayout>
      <PageHeader 
        title={t("Membership")}
        subtitle={t("Officer memberships requiring renewal")}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <MembershipStats />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="md:col-span-1">
          <RankDistribution />
        </div>
        <div className="md:col-span-2">
          <MembersTable />
        </div>
      </div>
    </AppLayout>
  );
}
