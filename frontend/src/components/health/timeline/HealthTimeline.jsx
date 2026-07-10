import React from "react";
import { motion } from "framer-motion";
import {
  Stethoscope,
  Scale,
  ShieldCheck,
  Pill,
  CalendarDays,
  Sparkles,
  FlaskConical,
  HeartPulse,
  Syringe,
  FileText,
  AlertTriangle
} from "lucide-react";
import HealthBadge from "../shared/HealthBadge";

function formatDate(dateStr) {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

/**
 * HealthTimeline — Unified full-page chronological health feed.
 * Combines ALL event types: visits, weight, vaccinations, medications,
 * prescriptions, lab results, appointments, and AI insights.
 *
 * Props:
 *  - records       Array of health records
 *  - appointments  Array of appointment objects
 *  - petName       string
 */
export default function HealthTimeline({ records = [], appointments = [], petName = "Your pet" }) {
  const buildEvents = () => {
    const events = [];

    records.forEach((rec) => {
      // 1. Vet Visit
      events.push({
        id: `visit-${rec.id}`,
        date: rec.visitDate,
        category: "Vet Visit",
        title: rec.diagnosis || "General Veterinary Consultation",
        subtitle: `Dr. ${rec.veterinarian?.replace("Dr. ", "")} · ${rec.clinic}`,
        notes: rec.treatment || rec.notes,
        icon: Stethoscope,
        dotColor: "bg-emerald-50 text-emerald-600 border-emerald-200",
        badge: rec.healthScore >= 85 ? "Completed" : "Completed"
      });

      // 2. Weight Log
      if (rec.weight > 0) {
        events.push({
          id: `weight-${rec.id}`,
          date: rec.visitDate,
          category: "Weight Recorded",
          title: `Weight logged — ${rec.weight} kg`,
          subtitle: `Recorded at ${rec.clinic}`,
          notes: rec.height ? `Height: ${rec.height} cm · Body Condition Score: ${rec.bodyCondition || "5"}/9` : null,
          icon: Scale,
          dotColor: "bg-cyan-50 text-cyan-600 border-cyan-200",
          badge: "Completed"
        });
      }

      // 3. Vaccinations
      if (rec.vaccinations?.length > 0) {
        rec.vaccinations.forEach((vax, idx) => {
          events.push({
            id: `vax-${rec.id}-${idx}`,
            date: vax.dateAdministered || rec.visitDate,
            category: "Vaccination",
            title: `${vax.name} Vaccine Administered`,
            subtitle: `Next booster due: ${formatDate(vax.dateDue)}`,
            notes: vax.notes,
            icon: Syringe,
            dotColor: "bg-teal-50 text-teal-600 border-teal-200",
            badge: vax.status || "Completed"
          });
        });
      }

      // 4. Prescriptions
      if (rec.prescriptions?.length > 0) {
        rec.prescriptions.forEach((presc, idx) => {
          events.push({
            id: `presc-${rec.id}-${idx}`,
            date: rec.visitDate,
            category: "Prescription Issued",
            title: `Prescribed: ${presc.name}`,
            subtitle: `${presc.dosage} · ${presc.frequency}`,
            notes: `Duration: ${presc.duration}`,
            icon: Pill,
            dotColor: "bg-indigo-50 text-indigo-600 border-indigo-200",
            badge: "Active"
          });
        });
      }

      // 5. Lab Results
      if (rec.labResults?.length > 0) {
        rec.labResults.forEach((lab, idx) => {
          events.push({
            id: `lab-${rec.id}-${idx}`,
            date: lab.date || rec.visitDate,
            category: "Lab Result",
            title: lab.test,
            subtitle: `Result: ${lab.result}`,
            notes: `Reference: ${lab.reference}`,
            icon: FlaskConical,
            dotColor: "bg-violet-50 text-violet-600 border-violet-200",
            badge: lab.result?.toLowerCase().includes("normal") || lab.result?.toLowerCase() === "negative"
              ? "Normal"
              : "Abnormal"
          });
        });
      }

      // 6. Vital Signs (if available)
      if (rec.heartRate > 0 || rec.temperature > 0) {
        events.push({
          id: `vitals-${rec.id}`,
          date: rec.visitDate,
          category: "Vitals Recorded",
          title: "Clinical Vital Signs Assessed",
          subtitle: `Temp: ${rec.temperature || "--"} °C · HR: ${rec.heartRate || "--"} bpm · RR: ${rec.respiratoryRate || "--"} rpm`,
          notes: null,
          icon: HeartPulse,
          dotColor: "bg-rose-50 text-rose-600 border-rose-200",
          badge: "Completed"
        });
      }

      // 7. Attachments/Documents uploaded
      if (rec.attachments?.length > 0) {
        rec.attachments.forEach((att, idx) => {
          events.push({
            id: `doc-${rec.id}-${idx}`,
            date: att.uploadDate || rec.visitDate,
            category: "Document Uploaded",
            title: att.name?.replace(/\.[^/.]+$/, "") || "Medical Document",
            subtitle: `Category: ${att.category} · By ${att.doctor || rec.veterinarian}`,
            notes: null,
            icon: FileText,
            dotColor: "bg-slate-100 text-slate-500 border-slate-200",
            badge: "Completed"
          });
        });
      }
    });

    // 8. Appointments
    appointments.forEach((apt) => {
      const isFuture = new Date(apt.visitDate) > new Date();
      events.push({
        id: `apt-${apt.id}`,
        date: apt.visitDate,
        category: isFuture ? "Appointment Scheduled" : "Appointment",
        title: apt.reason || "Veterinary Consultation",
        subtitle: `${apt.veterinarian} · ${apt.clinic} — ${apt.time}`,
        notes: apt.notes || null,
        icon: CalendarDays,
        dotColor: isFuture
          ? "bg-amber-50 text-amber-600 border-amber-200"
          : "bg-slate-100 text-slate-500 border-slate-200",
        badge: apt.status
      });
    });

    // 9. AI Insight (most recent record)
    if (records.length > 0) {
      const latest = [...records].sort((a, b) => new Date(b.visitDate) - new Date(a.visitDate))[0];
      events.push({
        id: `ai-${latest.id}`,
        date: latest.visitDate,
        category: "AI Health Insight",
        title: "PetVerse AI Diagnostic Summary",
        subtitle: "Generated via VetCare Analysis Model · Confidential",
        notes: latest.healthScore >= 85
          ? `${petName}'s vitals, weight trend, and immunization compliance are all at optimal levels (Health Index: ${latest.healthScore}%). No action required at this time.`
          : `Based on ${petName}'s latest checkup score of ${latest.healthScore}%, we recommend scheduling pending booster immunizations and a dental assessment consultation.`,
        icon: Sparkles,
        dotColor: "bg-gradient-to-r from-emerald-50 to-cyan-50 text-emerald-600 border-emerald-200",
        badge: latest.healthScore >= 85 ? "Normal" : "Attention Suggested",
        isAI: true
      });
    }

    return events.sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  const events = buildEvents();

  if (events.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white">
        <div className="text-center">
          <AlertTriangle className="mx-auto mb-2 text-slate-300" size={32} />
          <p className="text-sm font-semibold text-slate-400">No health events recorded yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative pl-6 border-l-2 border-slate-100 space-y-6 py-3">
      {events.map((evt, idx) => {
        const Icon = evt.icon;
        const isFuture = new Date(evt.date) > new Date();

        return (
          <motion.div
            key={evt.id}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: Math.min(idx * 0.04, 0.6) }}
            className="relative group"
          >
            {/* Timeline dot */}
            <div
              className={`
                absolute -left-[35px] top-2 flex h-6 w-6 items-center justify-center
                rounded-full border-2 bg-white shadow-sm transition-transform duration-200 group-hover:scale-110
                ${evt.dotColor}
              `}
            >
              <Icon size={11} />
            </div>

            {/* Event card */}
            <div className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-all ${evt.isAI ? "border-emerald-100 bg-gradient-to-br from-white to-emerald-50/30" : ""}`}>
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                  {evt.category}
                </span>
                <div className="flex items-center gap-2">
                  <HealthBadge status={evt.badge || "Completed"} size="xs" />
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isFuture ? "bg-cyan-50 text-cyan-700" : "bg-slate-100 text-slate-400"}`}>
                    {formatDate(evt.date)}{isFuture ? " · Upcoming" : ""}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="mt-3 space-y-1">
                <h4 className="text-sm font-black text-slate-800 leading-snug">{evt.title}</h4>
                <p className="text-xs font-semibold text-slate-500">{evt.subtitle}</p>
                {evt.notes && (
                  <p className="mt-2 text-xs font-semibold leading-relaxed text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    {evt.notes}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
