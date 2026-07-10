import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, AlertCircle, PlusCircle, Calendar, MapPin, Phone, Star } from "lucide-react";
import DashboardLayout from "@/components/dashboard/layout";
import GlassCard from "@/components/ui/GlassCard/GlassCard";
import LostPetCard from "@/components/community/cards/LostPetCard";
import { useCommunity } from "@/hooks/useCommunity";

export default function LostFoundPage() {
  const { lostPets, reportLostPet, toggleLostPetStatus } = useCommunity();
  const [filter, setFilter] = useState("All"); // All, Lost, Found
  const [isReportFormOpen, setIsReportFormOpen] = useState(false);

  // Form State
  const [petName, setPetName] = useState("");
  const [breed, setBreed] = useState("");
  const [color, setColor] = useState("");
  const [reward, setReward] = useState("");
  const [location, setLocation] = useState("");
  const [contact, setContact] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&auto=format&fit=crop&q=80");

  const filteredPets = lostPets.filter((pet) => {
    if (filter === "All") return true;
    return pet.status === filter;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!petName || !breed || !location || !contact) return;

    reportLostPet({
      petName,
      species: "Dog", // Default
      breed,
      color,
      reward: reward ? `$${reward}` : "No Reward",
      lastSeenDate: new Date().toISOString().split("T")[0],
      lastSeenTime: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      location,
      contact,
      description,
      photo
    });

    // Reset Form
    setPetName("");
    setBreed("");
    setColor("");
    setReward("");
    setLocation("");
    setContact("");
    setDescription("");
    setIsReportFormOpen(false);
  };

  return (
    <DashboardLayout pageTitle="Lost & Found Pets" pageDescription="Report a lost/found pet, or browse active emergency search alerts in your area.">
      <div className="space-y-6">
        
        {/* Back and CTA Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-left">
          <Link
            to="/community"
            className="flex items-center gap-2 font-bold text-slate-800 text-sm hover:text-emerald-600 transition"
          >
            <ArrowLeft size={16} />
            Back to Feed
          </Link>
          
          <button
            onClick={() => setIsReportFormOpen(true)}
            className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-rose-100 hover:opacity-95 transition outline-none"
          >
            <PlusCircle size={16} />
            Report Lost / Found Pet
          </button>
        </div>

        {/* Filter Bar */}
        <div className="flex gap-2">
          {["All", "Lost", "Found"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`
                rounded-xl
                px-4
                py-2
                text-xs
                font-bold
                transition
                border
                outline-none
                ${
                  filter === status
                    ? "bg-slate-800 text-white border-slate-800 shadow-sm"
                    : "bg-white hover:bg-slate-50 text-slate-600 border-slate-200"
                }
              `}
            >
              {status} Listings
            </button>
          ))}
        </div>

        {/* Report form dialog overlay */}
        {isReportFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-[30px] p-8 max-w-lg w-full border border-slate-100 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              <h3 className="text-xl font-bold text-slate-800 mb-6 text-left flex items-center gap-2">
                <AlertCircle size={20} className="text-rose-500" />
                Report Lost / Found Pet
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Pet Name</label>
                    <input
                      type="text"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm mt-1.5 focus:border-rose-400 focus:bg-white outline-none"
                      value={petName}
                      onChange={(e) => setPetName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Breed</label>
                    <input
                      type="text"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm mt-1.5 focus:border-rose-400 focus:bg-white outline-none"
                      value={breed}
                      onChange={(e) => setBreed(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Color</label>
                    <input
                      type="text"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm mt-1.5 focus:border-rose-400 focus:bg-white outline-none"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Reward Amount ($)</label>
                    <input
                      type="number"
                      placeholder="e.g. 500"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm mt-1.5 focus:border-rose-400 focus:bg-white outline-none"
                      value={reward}
                      onChange={(e) => setReward(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Last Seen Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Greenwood Park, Brooklyn"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm mt-1.5 focus:border-rose-400 focus:bg-white outline-none"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Contact Phone/Email</label>
                  <input
                    type="text"
                    placeholder="e.g. (555) 019-2342"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm mt-1.5 focus:border-rose-400 focus:bg-white outline-none"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Description</label>
                  <textarea
                    rows={3}
                    placeholder="Provide details: collar color, microchip ID, behavior..."
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm mt-1.5 focus:border-rose-400 focus:bg-white outline-none resize-none"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                {/* Stock photo picker */}
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Select Photo Preset</label>
                  <div className="flex gap-3 mt-2">
                    {[
                      "https://images.unsplash.com/photo-1612536057832-2ff7ead58194?w=150&auto=format&fit=crop&q=80",
                      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=150&auto=format&fit=crop&q=80",
                      "https://images.unsplash.com/photo-1529429617329-84d1004b5747?w=150&auto=format&fit=crop&q=80"
                    ].map((url, index) => (
                      <button
                        type="button"
                        key={index}
                        onClick={() => setPhoto(url)}
                        className={`h-12 w-12 rounded-xl overflow-hidden border-2 transition ${
                          photo === url ? "border-rose-500 scale-95" : "border-transparent"
                        }`}
                      >
                        <img src={url} alt="preset" className="h-full w-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsReportFormOpen(false)}
                    className="rounded-xl border border-slate-200 px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg transition"
                  >
                    Publish Alert
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {/* Listings Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPets.map((pet) => (
            <LostPetCard
              key={pet.id}
              pet={pet}
              onStatusToggle={toggleLostPetStatus}
            />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
