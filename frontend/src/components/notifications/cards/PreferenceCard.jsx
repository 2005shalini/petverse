import React from "react";
import GlassCard from "@/components/ui/GlassCard/GlassCard";

export default function PreferenceCard({ channel, preferences, onChange }) {
  const channelNames = {
    push: "In-App Push Notifications",
    email: "Email Notifications",
    sms: "SMS Alerts",
    whatsapp: "WhatsApp Messages (UI Only)"
  };

  const handleCheckboxChange = (key) => {
    onChange(channel, {
      ...preferences,
      [key]: !preferences[key]
    });
  };

  return (
    <GlassCard className="p-6 text-left" hover={false}>
      <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
        <h4 className="font-bold text-slate-800 text-sm capitalize">{channelNames[channel]}</h4>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={preferences.enabled}
            onChange={() => handleCheckboxChange("enabled")}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500" />
        </label>
      </div>

      <div className={`space-y-3 transition-opacity ${!preferences.enabled ? "opacity-50 pointer-events-none" : ""}`}>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-wide">Notify Me For:</p>
        
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { key: "aiAlerts", label: "AI Recommendations" },
            { key: "healthAlerts", label: "Vaccine & Med Warnings" },
            { key: "orders", label: "Shop Order Status Updates" },
            { key: "appointments", label: "Vet Appointment Reminders" },
            { key: "community", label: "Likes & Comments" }
          ].map((item) => (
            <label key={item.key} className="flex items-center gap-3 text-xs font-semibold text-slate-600 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={preferences[item.key] || false}
                onChange={() => handleCheckboxChange(item.key)}
                className="h-4 w-4 rounded-md border-slate-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span>{item.label}</span>
            </label>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}
