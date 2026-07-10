import React from "react";
import DashboardLayout from "@/components/dashboard/layout";
import AdoptionPageContent from "../community/Adoption/index";

export default function AdoptionPage() {
  return (
    <DashboardLayout pageTitle="Pet Adoption" pageDescription="Find your perfect companion and give them a forever home.">
      <AdoptionPageContent />
    </DashboardLayout>
  );
}
