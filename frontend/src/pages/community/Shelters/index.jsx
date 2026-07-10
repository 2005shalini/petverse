import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Star, MapPin, Award, CheckCircle, ShieldCheck } from "lucide-react";
import DashboardLayout from "@/components/dashboard/layout";
import GlassCard from "@/components/ui/GlassCard/GlassCard";
import { useAdoption } from "@/hooks/useAdoption";

export default function ShelterProfilePage() {
  const { id } = useParams();
  const { shelters } = useAdoption();
  const [volunteerName, setVolunteerName] = useState("");
  const [volunteerEmail, setVolunteerEmail] = useState("");
  const [volunteerOption, setVolunteerOption] = useState("Dog Walker");
  const [submitted, setSubmitted] = useState(false);

  const shelter = shelters.find((s) => s.id === id) || shelters[0];

  const handleVolunteerSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setVolunteerName("");
      setVolunteerEmail("");
    }, 2500);
  };

  if (!shelter) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <p className="text-slate-500 font-bold">Shelter profile not found.</p>
          <Link to="/adoption" className="text-emerald-500 font-bold mt-2 inline-block">
            Back to Adoption
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout pageTitle={shelter.name} pageDescription="Verified rescue shelter profile and volunteer network directory.">
      <div className="space-y-6 text-left">
        {/* Navigation */}
        <Link
          to="/adoption"
          className="flex items-center gap-2 font-bold text-slate-800 text-sm hover:text-emerald-600 transition"
        >
          <ArrowLeft size={16} />
          Back to Adoption
        </Link>

        {/* Shelter Profile Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main info (Span 2) */}
          <div className="lg:col-span-2 space-y-6">
            <GlassCard className="p-0 overflow-hidden" hover={false}>
              {/* Cover Banner */}
              <div className="h-[250px] relative overflow-hidden bg-slate-100">
                <img
                  src={shelter.banner}
                  alt={shelter.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Title Header */}
              <div className="p-6 md:p-8 space-y-4">
                <div className="flex gap-4">
                  <img
                    src={shelter.image}
                    alt={shelter.name}
                    className="h-16 w-16 rounded-2xl object-cover border border-slate-200 shadow-md"
                  />
                  <div>
                    <h3 className="text-2xl font-black text-slate-800 flex items-center gap-2">
                      {shelter.name}
                      <Award className="text-emerald-500" />
                    </h3>
                    <p className="text-xs text-slate-400 font-bold mt-1 flex items-center gap-1">
                      <MapPin size={12} />
                      {shelter.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 font-bold text-sm text-slate-700 pt-4">
                  <Star size={16} fill="#eab308" className="text-yellow-500" />
                  <span>{shelter.rating} ({shelter.reviewsCount} reviews)</span>
                </div>
              </div>
            </GlassCard>

            {/* Opportunities */}
            <GlassCard className="p-6 text-left" hover={false}>
              <h4 className="font-bold text-slate-800 text-lg mb-4">Open Volunteering Opportunities</h4>
              <div className="space-y-4">
                {shelter.volunteerOpportunities.map((op) => (
                  <div key={op.id} className="p-4 rounded-xl border border-slate-200/60 bg-slate-50 flex justify-between items-center">
                    <div>
                      <p className="font-bold text-slate-800 text-sm">{op.title}</p>
                      <p className="text-xs text-slate-400 font-semibold mt-1">Schedule: {op.timing}</p>
                    </div>
                    <span className="text-[10px] uppercase font-black tracking-widest text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">
                      Active
                    </span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>

          {/* Volunteer Sign up network panel (Span 1) */}
          <div className="space-y-6">
            <GlassCard className="p-6 border border-emerald-100/50 bg-gradient-to-br from-emerald-500/5 to-teal-500/5" hover={false}>
              <div className="flex items-center gap-2 font-bold text-slate-800 mb-4">
                <ShieldCheck size={18} className="text-emerald-500" />
                <span>Volunteer Network</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-semibold mb-6">
                Join our volunteer network and help shelter animals thrive. Select an active role to apply.
              </p>

              {submitted ? (
                <div className="p-6 text-center space-y-3 bg-white rounded-2xl border border-emerald-100">
                  <CheckCircle size={24} className="text-emerald-500 mx-auto" />
                  <p className="font-bold text-slate-800 text-sm">Application Sent!</p>
                  <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">
                    Thanks for applying! We will contact you at your email address to schedule training.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleVolunteerSubmit} className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Full Name</label>
                    <input
                      type="text"
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold mt-1.5 focus:border-emerald-400 outline-none"
                      value={volunteerName}
                      onChange={(e) => setVolunteerName(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Email Address</label>
                    <input
                      type="email"
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold mt-1.5 focus:border-emerald-400 outline-none"
                      value={volunteerEmail}
                      onChange={(e) => setVolunteerEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Select Role</label>
                    <select
                      value={volunteerOption}
                      onChange={(e) => setVolunteerOption(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold mt-1.5 focus:border-emerald-400 outline-none"
                    >
                      <option value="Dog Walker">Dog Walker</option>
                      <option value="Cat Socializer">Cat Socializer</option>
                      <option value="Event Helper">Event Coordinator</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-xs py-3 mt-4 hover:opacity-95 shadow-lg shadow-emerald-100 transition outline-none"
                  >
                    Submit Volunteer Application
                  </button>
                </form>
              )}
            </GlassCard>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
