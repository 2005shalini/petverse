import React, { useState, useMemo } from "react";
import DashboardLayout from "@/components/dashboard/layout";
import { useHealth } from "@/hooks/useHealth";
import { motion } from "framer-motion";
import {
  GitBranch,
  Stethoscope,
  Scale,
  ShieldCheck,
  Pill,
  CalendarDays,
  Sparkles,
  FlaskConical,
  HeartPulse,
  FileText,
  Filter,
  ChevronDown
} from "lucide-react";

import HealthHeader from "@/components/health/shared/HealthHeader";
import StatisticCard from "@/components/health/shared/StatisticCard";
import HealthTimeline from "@/components/health/timeline/HealthTimeline";
import AISummaryPlaceholder from "@/components/health/shared/AISummaryPlaceholder";

const EVENT_FILTERS = [
  { id: "all", label: "All Events", icon: GitBranch },
  { id: "visits", label: "Vet Visits", icon: Stethoscope },
  { id: "vaccinations", label: "Vaccinations", icon: ShieldCheck },
  { id: "medications", label: "Medications", icon: Pill },
  { id: "weight", label: "Weight", icon: Scale },
  { id: "labs", label: "Lab Results", icon: FlaskConical },
  { id: "appointments", label: "Appointments", icon: CalendarDays }
];

export default function TimelineView() {
  const {
    pets,
    selectedPet,
    selectedPetId,
    changeSelectedPet,
    records,
    appointments
  } = useHealth();

  const [activeFilter, setActiveFilter] = useState("all");

  // Compute stats
  const totalVisits = records.length;
  const totalVaccinations = useMemo(() => {
    let count = 0;
    records.forEach((r) => { count += r.vaccinations?.length || 0; });
    return count;
  }, [records]);
  const totalMedications = useMemo(() => {
    let count = 0;
    records.forEach((r) => { count += r.medications?.length || 0; });
    return count;
  }, [records]);
  const totalDocs = useMemo(() => {
    let count = 0;
    records.forEach((r) => { count += r.attachments?.length || 0; });
    return count;
  }, [records]);

  // Compute total event count
  const eventCount = useMemo(() => {
    // visits + weight logs + vaccinations + prescriptions + labs + attachments + appointments + 1 AI
    let count = records.length; // visits
    records.forEach((r) => {
      if (r.weight > 0) count++;
      count += r.vaccinations?.length || 0;
      count += r.prescriptions?.length || 0;
      count += r.labResults?.length || 0;
      count += r.attachments?.length || 0;
      if (r.heartRate > 0 || r.temperature > 0) count++;
    });
    count += appointments.length;
    if (records.length > 0) count++; // AI insight
    return count;
  }, [records, appointments]);

  if (!selectedPet) {
    return (
      <DashboardLayout pageTitle="Health Timeline" pageDescription="Chronological health feed.">
        <div className="flex h-64 items-center justify-center rounded-[30px] border border-dashed border-slate-200 bg-white">
          <p className="font-bold text-slate-400">Loading health timeline...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      pageTitle={`${selectedPet.name} — Health Timeline`}
      pageDescription="Complete chronological feed of every clinical event, vaccination, prescription, lab result, and appointment."
    >
      <div className="space-y-8">
        {/* Header */}
        <HealthHeader
          pets={pets}
          selectedPetId={selectedPetId}
          onChangePet={changeSelectedPet}
          accentColor="emerald"
        />

        {/* Stats row */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <StatisticCard
            label="Total Events"
            value={eventCount}
            icon={GitBranch}
            iconColor="text-emerald-600"
            iconBg="bg-emerald-50"
          />
          <StatisticCard
            label="Vet Visits"
            value={totalVisits}
            icon={Stethoscope}
            iconColor="text-cyan-600"
            iconBg="bg-cyan-50"
          />
          <StatisticCard
            label="Vaccinations"
            value={totalVaccinations}
            icon={ShieldCheck}
            iconColor="text-teal-600"
            iconBg="bg-teal-50"
          />
          <StatisticCard
            label="Documents"
            value={totalDocs}
            icon={FileText}
            iconColor="text-violet-600"
            iconBg="bg-violet-50"
          />
        </div>

        {/* AI Insight placeholder */}
        <AISummaryPlaceholder
          title="AI Timeline Intelligence"
          description={`Let PetVerse AI analyze ${selectedPet.name}'s full health history to surface patterns, flag anomalies, and predict upcoming care needs.`}
          variant="banner"
          feature="health-summary"
        />

        {/* Main content: Filter sidebar + Timeline feed */}
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Left: Filter sidebar */}
          <div className="lg:col-span-3 space-y-4">
            <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm space-y-2">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <Filter size={14} className="text-slate-400" />
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-500">
                  Filter Events
                </h4>
              </div>
              <div className="space-y-1">
                {EVENT_FILTERS.map((f) => {
                  const Icon = f.icon;
                  const isActive = activeFilter === f.id;
                  return (
                    <motion.button
                      key={f.id}
                      whileHover={{ x: 2 }}
                      onClick={() => setActiveFilter(f.id)}
                      className={`
                        w-full flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-xs font-bold text-left transition-all
                        ${isActive
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                        }
                      `}
                    >
                      <Icon size={13} className={isActive ? "text-emerald-600" : "text-slate-400"} />
                      <span>{f.label}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Pet quick stats */}
            <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm space-y-3">
              <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 pb-2 border-b border-slate-100">
                Pet Profile
              </h4>
              <div className="flex items-center gap-3">
                <img
                  src={selectedPet.profileImage || selectedPet.image}
                  alt={selectedPet.name}
                  className="h-12 w-12 rounded-2xl object-cover border border-slate-200"
                />
                <div>
                  <p className="font-black text-slate-800 text-sm">{selectedPet.name}</p>
                  <p className="text-[11px] font-semibold text-slate-500">{selectedPet.breed}</p>
                  <span className={`inline-block mt-1 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide ${
                    (selectedPet.healthScore || 90) >= 85
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-amber-100 text-amber-700"
                  }`}>
                    Score: {selectedPet.healthScore || 90}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Timeline feed */}
          <div className="lg:col-span-9">
            <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between pb-5 border-b border-slate-100">
                <div>
                  <h3 className="text-lg font-black text-slate-800 tracking-tight">
                    Clinical Event Feed
                  </h3>
                  <p className="text-xs font-semibold text-slate-400 mt-0.5">
                    {eventCount} events recorded · Sorted newest first
                  </p>
                </div>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-emerald-700 border border-emerald-200">
                  Live Feed
                </span>
              </div>

              <div className="mt-6 max-h-[760px] overflow-y-auto pr-1 scrollbar-thin">
                <HealthTimeline
                  records={records}
                  appointments={appointments}
                  petName={selectedPet.name}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
