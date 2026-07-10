import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/layout";
import { useHealth } from "@/hooks/useHealth";
import { Scale, Plus, Trash2, Calendar, LineChart, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button/Button";

// Charts & Components
import WeightChart from "@/components/health/charts/WeightChart";
import GrowthChart from "@/components/health/charts/GrowthChart";
import WeightCard from "@/components/health/cards/WeightCard";
import HealthHeader from "@/components/health/shared/HealthHeader";
import StatisticCard from "@/components/health/shared/StatisticCard";
import AISummaryPlaceholder from "@/components/health/shared/AISummaryPlaceholder";

export default function WeightTrackerView() {
  const {
    pets,
    selectedPet,
    selectedPetId,
    changeSelectedPet,
    records,
    addRecord,
    deleteRecord
  } = useHealth();

  const [weightInput, setWeightInput] = useState("");
  const [dateInput, setDateInput] = useState(new Date().toISOString().split("T")[0]);

  if (!selectedPet) {
    return (
      <DashboardLayout pageTitle="Weight Tracker" pageDescription="Log weights.">
        <div className="flex h-64 items-center justify-center">
          <p className="font-bold text-slate-400">Loading growth stats...</p>
        </div>
      </DashboardLayout>
    );
  }

  // Compile weight logs from health records
  const weightLogs = records
    .filter((r) => r.weight > 0)
    .map((r) => ({ id: r.id, date: r.visitDate, weight: r.weight }))
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const currentWeight = weightLogs[0]?.weight || parseFloat(selectedPet.weight) || 0;
  const previousWeight = weightLogs[1]?.weight || null;
  const weightDelta = previousWeight ? (currentWeight - previousWeight).toFixed(1) : null;

  const avgWeight = weightLogs.length > 0
    ? (weightLogs.reduce((s, l) => s + l.weight, 0) / weightLogs.length).toFixed(1)
    : currentWeight;

  const maxWeight = weightLogs.length > 0
    ? Math.max(...weightLogs.map((l) => l.weight))
    : currentWeight;

  const handleAddLog = (e) => {
    e.preventDefault();
    if (!weightInput || parseFloat(weightInput) <= 0) return;
    addRecord({
      visitDate: dateInput,
      veterinarian: "Self-logged",
      clinic: "At Home",
      healthScore: 90,
      weight: parseFloat(weightInput),
      height: 0,
      temperature: 0,
      heartRate: 0,
      respiratoryRate: 0,
      bodyCondition: 5,
      diagnosis: "Weight Check",
      treatment: `Home weight logging: ${weightInput} kg`,
      prescriptions: [],
      vaccinations: [],
      medications: [],
      allergies: [],
      labResults: [],
      attachments: [],
      notes: "Routine self-logged biometric monitoring",
      followUpDate: ""
    });
    setWeightInput("");
  };

  return (
    <DashboardLayout
      pageTitle={`${selectedPet.name} — Weight & Growth`}
      pageDescription="Log biometrics, check growth curves against breed averages, and monitor body composition trends."
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
            label="Current Weight"
            value={currentWeight}
            unit="kg"
            trend={weightDelta ? (parseFloat(weightDelta) > 0 ? "up" : "down") : null}
            trendValue={weightDelta ? `${weightDelta > 0 ? "+" : ""}${weightDelta} kg from prev` : undefined}
            icon={Scale}
            iconColor="text-emerald-600"
            iconBg="bg-emerald-50"
          />
          <StatisticCard
            label="Average Weight"
            value={avgWeight}
            unit="kg"
            icon={TrendingUp}
            iconColor="text-cyan-600"
            iconBg="bg-cyan-50"
          />
          <StatisticCard
            label="Peak Weight"
            value={maxWeight}
            unit="kg"
            icon={LineChart}
            iconColor="text-indigo-600"
            iconBg="bg-indigo-50"
          />
          <StatisticCard
            label="Log Entries"
            value={weightLogs.length}
            icon={Calendar}
            iconColor="text-slate-500"
            iconBg="bg-slate-100"
          />
        </div>

        {/* AI Growth Prediction Placeholder */}
        <AISummaryPlaceholder
          title="AI Growth Prediction"
          description={`PetVerse AI will model ${selectedPet.name}'s weight trajectory against breed standards and predict optimal target weight ranges, flag underweight or overweight trends early.`}
          variant="default"
          feature="growth-prediction"
        />

        {/* Main Grid */}
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Charts */}
          <div className="lg:col-span-8 space-y-6">
            <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm space-y-6">
              <h4 className="text-lg font-black text-slate-800 tracking-tight flex items-center gap-2">
                <LineChart size={18} className="text-emerald-500" />
                <span>Weight Trend Curve</span>
              </h4>
              <WeightChart data={weightLogs} />
            </div>

            <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm space-y-6">
              <h4 className="text-lg font-black text-slate-800 tracking-tight flex items-center gap-2">
                <Scale size={18} className="text-cyan-500" />
                <span>Breed Median Progression</span>
              </h4>
              <GrowthChart data={weightLogs} breed={selectedPet.breed} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Weight summary card */}
            <WeightCard
              weight={currentWeight}
              history={weightLogs}
              breed={selectedPet.breed}
              species={selectedPet.species}
            />

            {/* Log form */}
            <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm space-y-4">
              <h4 className="text-base font-black text-slate-800 tracking-tight">Log Biometric Entry</h4>
              <form onSubmit={handleAddLog} className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Date</label>
                  <input
                    required
                    type="date"
                    value={dateInput}
                    onChange={(e) => setDateInput(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs outline-none focus:border-emerald-400 transition"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Weight (kg)</label>
                  <div className="flex gap-2">
                    <input
                      required
                      type="number"
                      step="0.05"
                      min="0.1"
                      placeholder="e.g. 28.5"
                      value={weightInput}
                      onChange={(e) => setWeightInput(e.target.value)}
                      className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-xs outline-none focus:border-emerald-400 transition"
                    />
                    <Button type="submit" className="py-2.5 px-4 rounded-xl text-xs shrink-0 flex items-center gap-1">
                      <Plus size={13} />
                      <span>Log</span>
                    </Button>
                  </div>
                </div>
              </form>
            </div>

            {/* History log */}
            <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm space-y-4">
              <h4 className="text-base font-black text-slate-800 tracking-tight">History Log</h4>
              {weightLogs.length > 0 ? (
                <div className="max-h-[220px] overflow-y-auto pr-1 scrollbar-thin space-y-2">
                  {weightLogs.map((log) => (
                    <motion.div
                      key={log.id}
                      layout
                      className="flex items-center justify-between bg-slate-50/50 p-3 rounded-xl border border-slate-100/50 hover:bg-slate-50 transition"
                    >
                      <div className="flex items-center gap-2">
                        <Calendar size={13} className="text-slate-400" />
                        <span className="text-xs font-bold text-slate-700">
                          {new Date(log.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-black text-slate-800">{log.weight} kg</span>
                        <button
                          onClick={() => deleteRecord(log.id)}
                          className="text-slate-400 hover:text-rose-500 transition"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="bg-slate-50 border border-slate-100 p-4 text-center rounded-2xl">
                  <Scale className="mx-auto mb-2 text-slate-300" size={22} />
                  <p className="text-xs font-bold text-slate-400">No weight logs yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
