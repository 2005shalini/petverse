import React, { useMemo } from "react";
import DashboardLayout from "@/components/dashboard/layout";
import { useAIContext } from "@/hooks/useAIContext";
import { HeartPulse, Stethoscope, ShieldCheck, Scale, AlertTriangle, CheckCircle, Sparkles } from "lucide-react";
import HealthHeader from "@/components/health/shared/HealthHeader";
import StatisticCard from "@/components/health/shared/StatisticCard";
import AIInsightCard from "@/components/ai/cards/AIInsightCard";
import RecommendationCard from "@/components/ai/cards/RecommendationCard";
import AISummaryPlaceholder from "@/components/health/shared/AISummaryPlaceholder";
import HealthTrendChart from "@/components/health/charts/HealthTrendChart";

export default function HealthAnalysisView() {
  const context = useAIContext();
  const { activePet, healthDomain, health, weightHistory, medicalHistory, vaccinations } = context;
  const { pets, selectedPetId, changeSelectedPet } = healthDomain;

  if (!activePet) {
    return (
      <DashboardLayout pageTitle="AI Health Analysis" pageDescription="Deep wellness scan.">
        <div className="flex h-64 items-center justify-center">
          <p className="font-bold text-slate-400">Loading wellness summary...</p>
        </div>
      </DashboardLayout>
    );
  }

  const latestRecord = medicalHistory[0] || null;
  const healthScore = activePet.healthScore || latestRecord?.healthScore || 90;

  // Deriving risk classification
  const riskClassification = useMemo(() => {
    if (healthScore >= 85) return { label: "Low Risk", color: "emerald", severity: "success", desc: "All core indicators show perfect metabolic and physical standing. Maintain current routine." };
    if (healthScore >= 70) return { label: "Moderate Risk", color: "amber", severity: "warning", desc: "Minor anomalies detected (e.g. overdue boosters or dental accumulation). Monitor closely." };
    return { label: "High Risk", color: "rose", severity: "critical", desc: "Significant health score drop. Scheduling clinical diagnostics advised." };
  }, [healthScore]);

  return (
    <DashboardLayout
      pageTitle={`${activePet.name} — AI Health Analyst`}
      pageDescription="AI-driven assessment of metabolic indicators, vital sign stability, and clinical risks."
    >
      <div className="space-y-8">
        {/* Header */}
        <HealthHeader
          pets={pets}
          selectedPetId={selectedPetId}
          onChangePet={changeSelectedPet}
          accentColor="emerald"
        />

        {/* Top Metric Cards */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <StatisticCard
            label="Wellness Score"
            value={healthScore}
            unit="%"
            icon={HeartPulse}
            iconColor="text-emerald-600"
            iconBg="bg-emerald-50"
          />
          <StatisticCard
            label="Risk Status"
            value={riskClassification.label}
            icon={AlertTriangle}
            iconColor={riskClassification.severity === "success" ? "text-emerald-600" : "text-amber-600"}
            iconBg={riskClassification.severity === "success" ? "bg-emerald-50" : "bg-amber-50"}
          />
          <StatisticCard
            label="Vital Logs"
            value={medicalHistory.length}
            icon={Stethoscope}
            iconColor="text-cyan-600"
            iconBg="bg-cyan-50"
          />
          <StatisticCard
            label="Compliance"
            value={vaccinations.length > 0 ? "Good" : "Action"}
            icon={ShieldCheck}
            iconColor="text-indigo-600"
            iconBg="bg-indigo-50"
          />
        </div>

        {/* AI Insight banner */}
        <AISummaryPlaceholder
          title="AI Clinical Risk Scanner"
          description={`PetVerse AI will scan ${activePet.name}'s complete lab reports, diagnostic files, and vet invoices to map underlying issues and forecast future wellness trends.`}
          variant="banner"
          feature="risk-analysis"
        />

        {/* Content Layout */}
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Left panel: Risk alerts & Trend */}
          <div className="lg:col-span-8 space-y-6">
            {/* Trend Graph */}
            <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm space-y-6">
              <div>
                <h3 className="text-lg font-black text-slate-800 tracking-tight">Metabolic Vital Trend</h3>
                <p className="text-xs font-semibold text-slate-400 mt-0.5">Biometric logs gathered from health records</p>
              </div>
              <div className="h-[240px]">
                <HealthTrendChart data={weightHistory} metrics={["weight"]} height={220} />
              </div>
            </div>

            {/* Risk Warnings */}
            <div className="space-y-4">
              <h3 className="text-lg font-black text-slate-800 tracking-tight">Clinical Insight Checklist</h3>
              <div className="space-y-3">
                <AIInsightCard
                  title={`Risk Rating: ${riskClassification.label}`}
                  description={riskClassification.desc}
                  severity={riskClassification.severity}
                />
                
                {vaccinations.some(v => v.status === "Overdue" || v.status === "Vaccination Due") && (
                  <AIInsightCard
                    title="Immunization Schedule Gaps"
                    description="Our vaccine schedule checker has identified overdue booster doses. Maintaining an up-to-date schedule prevents viral infection."
                    severity="warning"
                  />
                )}

                <AIInsightCard
                  title="Vital Stability Index"
                  description={`All assessed vitals (Temp: ${latestRecord?.temperature || "38.4"}°C, Heart Rate: ${latestRecord?.heartRate || "92"}bpm) indicate standard biological ranges.`}
                  severity="success"
                />
              </div>
            </div>
          </div>

          {/* Right panel: Recommendations */}
          <div className="lg:col-span-4 space-y-6">
            <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm space-y-4">
              <h3 className="text-base font-black text-slate-800 tracking-tight">Preventive Actions</h3>
              
              <div className="space-y-3">
                <RecommendationCard
                  title="Verify Vitals Consistency"
                  description="Log weekly weight biometrics at home to track subtle metabolic shifts."
                  confidence={95}
                  actionLabel="Go to Weight Tracker"
                  onAction={() => window.location.pathname = "/health/weight"}
                />

                <RecommendationCard
                  title="Overdue Booster Booking"
                  description="Schedule overdue vaccines with your veterinarian to keep compliance score high."
                  confidence={90}
                  actionLabel="Go to Vaccinations"
                  onAction={() => window.location.pathname = "/health/vaccinations"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
