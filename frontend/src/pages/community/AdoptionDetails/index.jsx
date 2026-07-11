import React, { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Sparkles, Heart, FileText, CheckCircle, ShieldAlert, Award } from "lucide-react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/dashboard/layout";
import GlassCard from "@/components/ui/GlassCard/GlassCard";
import { useAdoption } from "@/hooks/useAdoption";

export default function AdoptionDetailsPage() {
  const { id } = useParams();
  const { adoptablePets, calculateAICompatibility, submitAdoptionRequest } = useAdoption();
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  // Form states
  const [homeType, setHomeType] = useState("Apartment");
  const [hasKids, setHasKids] = useState("No");
  const [activityLevel, setActivityLevel] = useState("Moderate");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const pet = useMemo(() => {
    return adoptablePets.find((p) => p.id === id) || null;
  }, [adoptablePets, id]);

  const aiMatch = useMemo(() => {
    return pet ? calculateAICompatibility(pet) : null;
  }, [pet, calculateAICompatibility]);

  if (!pet) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <p className="text-slate-500 font-bold">Adoption listing not found.</p>
          <Link to="/adoption" className="text-emerald-500 font-bold mt-2 inline-block">
            Back to listings
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  const handleApplySubmit = (e) => {
    e.preventDefault();
    submitAdoptionRequest(pet.id, {
      homeType,
      hasKids,
      activityLevel,
      message
    });
    setSubmitted(true);
    setTimeout(() => {
      setIsApplyModalOpen(false);
      setSubmitted(false);
      setCurrentStep(1);
    }, 2000);
  };

  return (
    <DashboardLayout pageTitle={`Meet ${pet.petName}`} pageDescription={`Learn about ${pet.petName} and read their compatibility details.`}>
      <div className="space-y-6 text-left">
        {/* Back Link */}
        <Link
          to="/adoption"
          className="flex items-center gap-2 font-bold text-slate-800 text-sm hover:text-emerald-600 transition"
        >
          <ArrowLeft size={16} />
          Back to Listings
        </Link>

        {/* Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Gallery and Meta info (Span 2) */}
          <div className="lg:col-span-2 space-y-6">
            <GlassCard className="p-6 md:p-8" hover={false}>
              {/* Pet image gallery grid */}
              <div className="grid grid-cols-2 gap-4 h-[350px] overflow-hidden rounded-[24px]">
                <img
                  src={pet.gallery[0]}
                  alt={pet.petName}
                  className="w-full h-full object-cover"
                />
                {pet.gallery[1] ? (
                  <img
                    src={pet.gallery[1]}
                    alt={pet.petName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="bg-slate-100 flex items-center justify-center text-slate-400 font-bold text-sm">
                    No Additional Photos
                  </div>
                )}
              </div>

              {/* Title & Characteristics */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-3xl font-black text-slate-800">{pet.petName}</h3>
                  <p className="text-xs text-slate-400 font-bold mt-1">Sheltered by {pet.shelterName}</p>
                </div>

                <div className="flex gap-2">
                  <span className="text-xs font-black text-slate-500 bg-slate-100 px-3.5 py-1.5 rounded-xl">
                    {pet.breed}
                  </span>
                  <span className="text-xs font-black text-slate-500 bg-slate-100 px-3.5 py-1.5 rounded-xl">
                    {pet.age}
                  </span>
                  <span className="text-xs font-black text-rose-500 bg-rose-50 px-3.5 py-1.5 rounded-xl">
                    {pet.gender}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="mt-8 space-y-4">
                <h4 className="font-bold text-slate-800 text-lg">Story</h4>
                <p className="text-sm md:text-base text-slate-600 leading-relaxed font-medium">
                  {pet.description}
                </p>
              </div>

              {/* Health Details */}
              <div className="mt-8 border-t border-slate-100 pt-6">
                <h4 className="font-bold text-slate-800 text-lg flex items-center gap-2 mb-4">
                  <FileText size={18} className="text-emerald-500" />
                  Health & Vaccinations
                </h4>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <p className="text-xs text-slate-400 font-bold">Health Status</p>
                    <p className="text-sm font-semibold text-slate-800 mt-1">{pet.health}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <p className="text-xs text-slate-400 font-bold">Vaccinations Record</p>
                    <p className="text-sm font-semibold text-slate-800 mt-1">{pet.vaccinations}</p>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* AI Compatibility and Adoption Actions (Span 1) */}
          <div className="space-y-6">
            
            {/* AI Compatibility Report */}
            {aiMatch && (
              <GlassCard className="p-6 border border-emerald-100/50 bg-gradient-to-br from-emerald-500/5 to-teal-500/5" hover={false}>
                <div className="flex items-center gap-2 font-bold text-slate-800 mb-6">
                  <Sparkles size={18} className="text-yellow-500" />
                  <span>AI Compatibility Report</span>
                </div>

                {/* Meter */}
                <div className="flex flex-col items-center justify-center py-4 relative">
                  <div className="h-32 w-32 rounded-full border-[10px] border-emerald-100 flex items-center justify-center relative">
                    <span className="text-3xl font-black text-slate-800">{aiMatch.score}%</span>
                    <div className="absolute inset-0 rounded-full border-[10px] border-emerald-500 border-t-transparent border-l-transparent animate-spin-slow pointer-events-none" />
                  </div>
                  <p className="text-xs font-bold text-emerald-600 mt-4 uppercase tracking-widest">
                    High Compatibility Match
                  </p>
                </div>

                {/* Match factors */}
                <div className="mt-6 space-y-3 pt-4 border-t border-slate-100">
                  <p className="text-xs font-black text-slate-400 uppercase tracking-wide">Key Matching Factors</p>
                  {aiMatch.reasons.map((reason, idx) => (
                    <div key={idx} className="flex gap-2 text-xs font-semibold text-slate-600">
                      <CheckCircle size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span>{reason}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            )}

            {/* Application widget */}
            <GlassCard className="p-6" hover={false}>
              <h4 className="font-bold text-slate-800 text-base mb-4">Adoption Inquiry</h4>
              <p className="text-xs text-slate-400 font-semibold leading-relaxed mb-6">
                Submit an adoption application wizard to schedule a meeting with {pet.petName} and {pet.shelterName}.
              </p>

              {pet.status === "Pending" ? (
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center text-xs font-bold text-slate-500">
                  Adoption application is currently pending review.
                </div>
              ) : (
                <button
                  onClick={() => setIsApplyModalOpen(true)}
                  className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-sm py-3.5 shadow-lg shadow-emerald-100 hover:opacity-95 transition outline-none"
                >
                  Apply to Adopt {pet.petName}
                </button>
              )}
            </GlassCard>
          </div>
        </div>
      </div>

      {/* Multi-step Application Modal */}
      {isApplyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-[30px] p-8 max-w-md w-full border border-slate-100 shadow-2xl relative"
          >
            {submitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="h-16 w-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <CheckCircle size={30} />
                </div>
                <h4 className="text-lg font-bold text-slate-800">Application Submitted!</h4>
                <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                  A chat conversation thread has been opened with the shelter. You will be redirected shortly...
                </p>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="space-y-6">
                <div className="text-left border-b border-slate-100 pb-3 flex justify-between items-center">
                  <h4 className="font-bold text-slate-800 text-lg">Adoption Request Wizard</h4>
                  <span className="text-xs text-slate-400 font-bold">Step {currentStep} of 2</span>
                </div>

                {currentStep === 1 ? (
                  <div className="space-y-4 text-left">
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Living Environment</label>
                      <select
                        value={homeType}
                        onChange={(e) => setHomeType(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm mt-1.5 focus:border-emerald-400 focus:bg-white outline-none"
                      >
                        <option value="House with Yard">House with fenced yard</option>
                        <option value="Apartment">Apartment</option>
                        <option value="Townhouse">Townhouse</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Children in Household?</label>
                      <select
                        value={hasKids}
                        onChange={(e) => setHasKids(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm mt-1.5 focus:border-emerald-400 focus:bg-white outline-none"
                      >
                        <option value="No">No children under 12</option>
                        <option value="Yes">Yes, children under 12</option>
                      </select>
                    </div>

                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="w-full rounded-xl bg-slate-800 text-white font-bold text-xs py-3 mt-4 hover:bg-slate-700 transition"
                    >
                      Next Step
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4 text-left">
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Your Activity Level</label>
                      <select
                        value={activityLevel}
                        onChange={(e) => setActivityLevel(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm mt-1.5 focus:border-emerald-400 focus:bg-white outline-none"
                      >
                        <option value="High">High (Daily running/hiking)</option>
                        <option value="Moderate">Moderate (Daily walking/play)</option>
                        <option value="Low">Low (Short walks/cuddles)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Introduce Yourself</label>
                      <textarea
                        rows={3}
                        placeholder="Tell the shelter about your experience with pets..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm mt-1.5 focus:border-emerald-400 focus:bg-white outline-none resize-none"
                      />
                    </div>

                    <div className="flex gap-3 mt-4">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        className="flex-1 rounded-xl border border-slate-200 py-3 text-xs font-bold text-slate-500 hover:bg-slate-50 transition"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="flex-1 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-xs py-3 hover:opacity-95 transition"
                      >
                        Submit Request
                      </button>
                    </div>
                  </div>
                )}
              </form>
            )}
          </motion.div>
        </div>
      )}
    </DashboardLayout>
  );
}
