import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/layout";
import { useMedicalRecords } from "@/hooks/useMedicalRecords";
import { Plus, Search, RefreshCw, Stethoscope, HeartPulse, FileText, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import MedicalRecordCard from "@/components/health/cards/MedicalRecordCard";
import MedicalRecordForm from "@/components/health/forms/MedicalRecordForm";
import DocumentPreview from "@/components/health/shared/DocumentPreview";
import HealthHeader from "@/components/health/shared/HealthHeader";
import StatisticCard from "@/components/health/shared/StatisticCard";
import AISummaryPlaceholder from "@/components/health/shared/AISummaryPlaceholder";

export default function MedicalRecordsView() {
  const {
    pets,
    selectedPet,
    selectedPetId,
    changeSelectedPet,
    records,
    filteredRecords,
    avgHealthScore,
    totalRecords,
    uniqueVets,
    searchTerm,
    setSearchTerm,
    filterVet,
    setFilterVet,
    clearSearch,
    addRecord,
    deleteRecord
  } = useMedicalRecords();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [activeDoc, setActiveDoc] = useState(null);

  if (!selectedPet) {
    return (
      <DashboardLayout pageTitle="Medical Records" pageDescription="Log clinical assessments.">
        <div className="flex h-64 items-center justify-center">
          <p className="font-bold text-slate-400">Loading profile data...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      pageTitle={`${selectedPet.name} — Medical Records`}
      pageDescription="Complete repository of checkup records, treatments, diagnostics, and clinical notes."
    >
      <div className="space-y-8">
        {/* Header */}
        <HealthHeader
          pets={pets}
          selectedPetId={selectedPetId}
          onChangePet={changeSelectedPet}
          accentColor="emerald"
          actionLabel="Add Clinical Log"
          onAction={() => setIsFormOpen(true)}
          actionIcon={Plus}
        />

        {/* Stats row */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <StatisticCard
            label="Total Records"
            value={totalRecords}
            icon={Stethoscope}
            iconColor="text-emerald-600"
            iconBg="bg-emerald-50"
          />
          <StatisticCard
            label="Avg Health Score"
            value={avgHealthScore}
            unit="%"
            icon={HeartPulse}
            iconColor="text-rose-500"
            iconBg="bg-rose-50"
          />
          <StatisticCard
            label="Vets Consulted"
            value={uniqueVets.length}
            icon={FileText}
            iconColor="text-cyan-600"
            iconBg="bg-cyan-50"
          />
          <StatisticCard
            label="Showing"
            value={filteredRecords.length}
            unit={`/ ${totalRecords}`}
            icon={Search}
            iconColor="text-slate-500"
            iconBg="bg-slate-100"
          />
        </div>

        {/* AI Risk Analysis Placeholder */}
        <AISummaryPlaceholder
          title="AI Risk Analysis"
          description={`PetVerse AI will scan ${selectedPet.name}'s clinical history to detect recurring diagnoses, flag treatment gaps, and surface actionable health risks before they escalate.`}
          variant="default"
          feature="risk-analysis"
        />

        {/* Filter Toolbar */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute top-3.5 left-4 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search by diagnosis, vet, or clinic..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 pl-10 pr-10 py-3 text-sm outline-none focus:border-emerald-400 bg-white transition"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm("")} className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600">
                <X size={15} />
              </button>
            )}
          </div>

          {uniqueVets.length > 0 && (
            <select
              value={filterVet}
              onChange={(e) => setFilterVet(e.target.value)}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 outline-none focus:border-emerald-400 transition"
            >
              <option value="all">All Veterinarians</option>
              {uniqueVets.map((vet) => (
                <option key={vet} value={vet}>{vet}</option>
              ))}
            </select>
          )}

          {(searchTerm || filterVet !== "all") && (
            <button
              onClick={clearSearch}
              className="flex items-center gap-1.5 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-500 transition hover:bg-slate-50"
            >
              <RefreshCw size={14} />
              Reset
            </button>
          )}
        </div>

        {/* Records Grid */}
        <AnimatePresence mode="popLayout">
          {filteredRecords.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-1">
              {filteredRecords.map((rec) => (
                <motion.div
                  key={rec.id}
                  layout
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                >
                  <MedicalRecordCard
                    record={rec}
                    onDelete={deleteRecord}
                    onSelectDocument={(file) => setActiveDoc(file)}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="rounded-3xl border border-dashed border-slate-200 p-16 text-center bg-white"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-100 mx-auto mb-4">
                <Stethoscope className="text-slate-300" size={28} />
              </div>
              <p className="text-slate-700 font-black text-lg">No records match your criteria</p>
              <p className="text-slate-400 font-semibold text-sm mt-1">
                {searchTerm || filterVet !== "all"
                  ? "Try adjusting your search or filters."
                  : `No medical records logged for ${selectedPet.name} yet.`
                }
              </p>
              {(searchTerm || filterVet !== "all") && (
                <button
                  onClick={clearSearch}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-emerald-600 hover:underline"
                >
                  <RefreshCw size={12} />
                  <span>Reset Filters</span>
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form Modal */}
        <MedicalRecordForm
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSubmit={addRecord}
        />

        {/* Attachment preview */}
        <DocumentPreview
          isOpen={!!activeDoc}
          onClose={() => setActiveDoc(null)}
          document={activeDoc}
        />
      </div>
    </DashboardLayout>
  );
}
