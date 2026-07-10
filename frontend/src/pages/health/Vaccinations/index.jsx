import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/layout";
import { useVaccinations } from "@/hooks/useVaccinations";
import { Plus, Shield, ShieldCheck, Activity, Award, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import VaccinationCard from "@/components/health/cards/VaccinationCard";
import VaccinationForm from "@/components/health/forms/VaccinationForm";
import VaccinationTimeline from "@/components/health/timeline/VaccinationTimeline";
import HealthHeader from "@/components/health/shared/HealthHeader";
import StatisticCard from "@/components/health/shared/StatisticCard";
import AISummaryPlaceholder from "@/components/health/shared/AISummaryPlaceholder";

const TABS = [
  { id: "all", label: "All Schedules", icon: Shield },
  { id: "completed", label: "Completed", icon: ShieldCheck },
  { id: "overdue", label: "Overdue / Due", icon: AlertTriangle },
  { id: "timeline", label: "Immunization Feed", icon: Award }
];

export default function VaccinationsView() {
  const {
    pets,
    selectedPet,
    selectedPetId,
    changeSelectedPet,
    vaccinations,
    completed,
    overdue,
    upcoming,
    complianceRate,
    nextDue,
    totalCount,
    overdueCount,
    addRecord
  } = useVaccinations();

  const [activeTab, setActiveTab] = useState("all");
  const [isFormOpen, setIsFormOpen] = useState(false);

  if (!selectedPet) {
    return (
      <DashboardLayout pageTitle="Vaccination Log" pageDescription="Immunization tracker.">
        <div className="flex h-64 items-center justify-center">
          <p className="font-bold text-slate-400">Loading central registries...</p>
        </div>
      </DashboardLayout>
    );
  }

  const displayedVax =
    activeTab === "completed" ? completed :
    activeTab === "overdue" ? [...overdue, ...upcoming] :
    vaccinations;

  return (
    <DashboardLayout
      pageTitle={`${selectedPet.name} — Vaccination Center`}
      pageDescription="Monitor booster schedules, review immunization certificates, and track overdue vaccines."
    >
      <div className="space-y-8">
        {/* Header */}
        <HealthHeader
          pets={pets}
          selectedPetId={selectedPetId}
          onChangePet={changeSelectedPet}
          accentColor="teal"
          actionLabel="Add Vaccination"
          onAction={() => setIsFormOpen(true)}
          actionIcon={Plus}
        />

        {/* Stats row */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <StatisticCard
            label="Total Vaccines"
            value={totalCount}
            icon={Shield}
            iconColor="text-teal-600"
            iconBg="bg-teal-50"
          />
          <StatisticCard
            label="Completed"
            value={completed.length}
            icon={ShieldCheck}
            iconColor="text-emerald-600"
            iconBg="bg-emerald-50"
          />
          <StatisticCard
            label="Overdue / Due"
            value={overdueCount + upcoming.length}
            trend={overdueCount > 0 ? "up" : "flat"}
            trendValue={overdueCount > 0 ? "Action needed" : "On schedule"}
            icon={AlertTriangle}
            iconColor={overdueCount > 0 ? "text-rose-600" : "text-amber-500"}
            iconBg={overdueCount > 0 ? "bg-rose-50" : "bg-amber-50"}
          />
          <StatisticCard
            label="Compliance"
            value={complianceRate}
            unit="%"
            trend={complianceRate >= 80 ? "up" : "down"}
            trendValue={complianceRate >= 80 ? "Good standing" : "Needs attention"}
            icon={Activity}
            iconColor={complianceRate >= 80 ? "text-emerald-600" : "text-rose-500"}
            iconBg={complianceRate >= 80 ? "bg-emerald-50" : "bg-rose-50"}
          />
        </div>

        {/* AI Reminder Placeholder */}
        <AISummaryPlaceholder
          title="AI Vaccination Reminder"
          description={`PetVerse AI will automatically schedule booster reminders for ${selectedPet.name}, predict optimal vaccination windows, and flag any immunization gaps based on breed and lifestyle.`}
          variant="compact"
          feature="reminder"
        />

        {/* Next due alert */}
        {nextDue && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-4"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
              <AlertTriangle size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-black text-amber-800">Vaccine Due Soon</p>
              <p className="text-xs font-semibold text-amber-600 truncate">
                {nextDue.name} — Due: {nextDue.dateDue ? new Date(nextDue.dateDue).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "—"}
              </p>
            </div>
          </motion.div>
        )}

        {/* Tab Controls */}
        <div className="flex gap-2 border-b border-slate-200 pb-2 overflow-x-auto scrollbar-none">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-bold transition-all shrink-0
                  ${isActive
                    ? "border-teal-500 text-teal-600 font-extrabold"
                    : "border-transparent text-slate-500 hover:text-slate-700"
                  }
                `}
              >
                <Icon size={15} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="mt-2">
          {activeTab === "timeline" ? (
            <VaccinationTimeline vaccinations={vaccinations} />
          ) : (
            <AnimatePresence mode="popLayout">
              {displayedVax.length > 0 ? (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {displayedVax.map((vax) => (
                    <motion.div
                      key={vax.id}
                      layout
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.2 }}
                    >
                      <VaccinationCard vaccination={vax} />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="rounded-3xl border border-dashed border-slate-200 p-16 text-center bg-white">
                  <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-100 mx-auto mb-4">
                    <Shield className="text-slate-300" size={28} />
                  </div>
                  <p className="font-black text-lg text-slate-700">No vaccinations in this category</p>
                  <p className="text-sm font-semibold text-slate-400 mt-1">
                    {activeTab === "completed"
                      ? "No completed vaccinations recorded yet."
                      : activeTab === "overdue"
                        ? "All immunizations are current — great job!"
                        : `No vaccination records found for ${selectedPet.name}.`
                    }
                  </p>
                </div>
              )}
            </AnimatePresence>
          )}
        </div>

        {/* Modal Form */}
        <VaccinationForm
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSubmit={addRecord}
        />
      </div>
    </DashboardLayout>
  );
}
