import React from "react";
import DashboardLayout from "@/components/dashboard/layout";
import { motion } from "framer-motion";
import { ShoppingBag, Sparkles, ArrowUpRight, Star, Package, Tag, Truck, Shield } from "lucide-react";

const CATEGORIES = [
  { icon: Package, label: "Food & Nutrition", count: "240+ items", color: "text-emerald-600 bg-emerald-50" },
  { icon: Tag, label: "Toys & Accessories", count: "180+ items", color: "text-cyan-600 bg-cyan-50" },
  { icon: Shield, label: "Health & Wellness", count: "120+ items", color: "text-violet-600 bg-violet-50" },
  { icon: Truck, label: "Grooming", count: "95+ items", color: "text-amber-600 bg-amber-50" },
];

export default function PetShopPage() {
  return (
    <DashboardLayout pageTitle="Pet Shop" pageDescription="Everything your pet needs, delivered to your door.">
      <div className="space-y-8">
        {/* Coming soon hero */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-[30px] bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-10 text-white shadow-2xl text-center"
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -left-8 -bottom-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
          <div className="relative">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white/20 backdrop-blur mx-auto mb-4 shadow-lg">
              <ShoppingBag size={30} />
            </div>
            <span className="rounded-full bg-white/20 px-3 py-1 text-[10px] font-black uppercase tracking-widest border border-white/30">
              Coming Soon
            </span>
            <h2 className="mt-4 text-3xl font-black tracking-tight">PetVerse Shop</h2>
            <p className="mt-2 max-w-md mx-auto text-white/80 font-semibold">
              A curated marketplace for premium pet food, accessories, health products, and grooming essentials — all recommended by our AI based on your pet's profile.
            </p>
            <button className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-white/20 border border-white/30 px-6 py-3 text-sm font-bold transition hover:bg-white/30">
              <Star size={14} />
              Join the Waitlist
              <ArrowUpRight size={14} />
            </button>
          </div>
        </motion.div>

        {/* Categories preview */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm text-center cursor-default"
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${cat.color} mx-auto mb-3`}>
                  <Icon size={22} />
                </div>
                <p className="font-black text-slate-800">{cat.label}</p>
                <p className="text-xs font-semibold text-slate-400 mt-1">{cat.count}</p>
              </motion.div>
            );
          })}
        </div>

        {/* AI personalization teaser */}
        <div className="rounded-[30px] border border-slate-200 bg-white p-8 flex flex-col sm:flex-row items-center gap-6 shadow-sm">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg">
            <Sparkles size={24} />
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-black text-slate-800">AI-Personalized Recommendations</h4>
            <p className="text-sm font-semibold text-slate-500 mt-1 leading-relaxed">
              Our AI will analyze your pet's breed, age, weight, and health records to recommend the exact products they need — no more guessing.
            </p>
          </div>
          <span className="rounded-2xl bg-slate-100 px-4 py-2 text-xs font-black text-slate-500 uppercase tracking-widest shrink-0">
            Coming Soon
          </span>
        </div>
      </div>
    </DashboardLayout>
  );
}
