import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/layout";
import { motion } from "framer-motion";
import {
  Settings,
  User,
  Bell,
  Shield,
  Palette,
  CreditCard,
  ChevronRight,
  Check
} from "lucide-react";

const SECTIONS = [
  { icon: User, label: "Account & Profile", desc: "Manage your name, email, and profile photo." },
  { icon: Bell, label: "Notifications", desc: "Control reminders, alerts, and email frequency." },
  { icon: Shield, label: "Privacy & Security", desc: "Password, two-factor auth, and data settings." },
  { icon: Palette, label: "Appearance", desc: "Theme, color scheme, and display preferences." },
  { icon: CreditCard, label: "Subscription & Billing", desc: "Manage your PetVerse plan and payment methods." },
];

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <DashboardLayout pageTitle="Settings" pageDescription="Manage your PetVerse account and preferences.">
      <div className="max-w-3xl space-y-6">
        {/* Profile card */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div className="flex items-center gap-5">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80"
                alt="Profile"
                className="h-16 w-16 rounded-2xl object-cover border-2 border-slate-200"
              />
              <button className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-white text-[10px] border-2 border-white hover:bg-slate-700 transition">
                ✎
              </button>
            </div>
            <div className="flex-1">
              <p className="text-lg font-black text-slate-800">Shreyash Sharma</p>
              <p className="text-sm font-semibold text-slate-500">shreyash@petverse.app</p>
              <span className="mt-1 inline-block rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700">
                Free Plan · 3 Pets
              </span>
            </div>
            <button
              onClick={handleSave}
              className={`flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-bold transition-all ${
                saved
                  ? "bg-emerald-500 text-white"
                  : "bg-slate-900 text-white hover:bg-slate-800"
              }`}
            >
              {saved ? <Check size={15} /> : <Settings size={15} />}
              {saved ? "Saved!" : "Save Changes"}
            </button>
          </div>

          {/* Quick form */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              { label: "First Name", value: "Shreyash" },
              { label: "Last Name", value: "Sharma" },
              { label: "Email", value: "shreyash@petverse.app" },
              { label: "Phone", value: "+91 98765 43210" },
            ].map((field) => (
              <div key={field.label}>
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-1">
                  {field.label}
                </label>
                <input
                  type="text"
                  defaultValue={field.value}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-semibold text-slate-700 outline-none focus:border-emerald-400 focus:bg-white transition"
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Settings sections */}
        <div className="space-y-3">
          {SECTIONS.map((sec, i) => {
            const Icon = sec.icon;
            return (
              <motion.button
                key={sec.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ x: 4 }}
                className="w-full flex items-center gap-4 rounded-[24px] border border-slate-200 bg-white px-6 py-4 shadow-sm text-left transition-all hover:border-slate-300 hover:shadow-md"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                  <Icon size={18} />
                </div>
                <div className="flex-1">
                  <p className="font-black text-slate-800 text-sm">{sec.label}</p>
                  <p className="text-xs font-semibold text-slate-400 mt-0.5">{sec.desc}</p>
                </div>
                <ChevronRight size={16} className="text-slate-400 shrink-0" />
              </motion.button>
            );
          })}
        </div>

        {/* Danger zone */}
        <div className="rounded-[24px] border border-rose-200 bg-rose-50 p-5">
          <h4 className="text-sm font-black text-rose-800 mb-1">Danger Zone</h4>
          <p className="text-xs font-semibold text-rose-600 mb-3">These actions are permanent and cannot be undone.</p>
          <div className="flex flex-wrap gap-3">
            <button className="rounded-xl border border-rose-200 bg-white px-4 py-2 text-xs font-bold text-rose-600 transition hover:bg-rose-100">
              Delete All Pet Data
            </button>
            <button className="rounded-xl border border-rose-300 bg-rose-100 px-4 py-2 text-xs font-bold text-rose-700 transition hover:bg-rose-200">
              Close Account
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
