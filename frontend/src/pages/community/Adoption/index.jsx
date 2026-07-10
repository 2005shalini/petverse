import React, { useState } from "react";
import { Sparkles, Search, MapPin, Heart, ShieldCheck, Star } from "lucide-react";
import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard/GlassCard";
import AdoptionCard from "@/components/community/cards/AdoptionCard";
import ShelterCard from "@/components/community/cards/ShelterCard";
import { useAdoption } from "@/hooks/useAdoption";

export default function AdoptionPageContent() {
  const { adoptablePets, shelters, activeUserPet, calculateAICompatibility } = useAdoption();
  const [activeTab, setActiveTab] = useState("pets"); // pets, shelters
  const [searchQuery, setSearchQuery] = useState("");
  const [genderFilter, setGenderFilter] = useState("All");
  const [ageFilter, setAgeFilter] = useState("All");

  const filteredPets = adoptablePets.filter((pet) => {
    const matchesSearch = pet.petName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pet.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pet.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesGender = genderFilter === "All" || pet.gender === genderFilter;
    
    const matchesAge = ageFilter === "All" ||
      (ageFilter === "Puppy" && (pet.age.includes("months") || pet.age.includes("8 months"))) ||
      (ageFilter === "Adult" && !pet.age.includes("months") && !pet.age.includes("Senior"));

    return matchesSearch && matchesGender && matchesAge;
  });

  const filteredShelters = shelters.filter((shelter) =>
    shelter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    shelter.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-[30px] bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-10 text-white shadow-2xl text-left"
      >
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-8 -bottom-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
        <div className="relative max-w-2xl">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur mb-4 shadow-lg">
            <Heart size={24} fill="currentColor" />
          </div>
          <span className="rounded-full bg-white/20 px-3 py-1 text-[9px] font-black uppercase tracking-widest border border-white/35">
            Phase 11: Adoption & Shelters
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-black tracking-tight">Adoption Matching</h2>
          <p className="mt-2 text-white/80 font-semibold leading-relaxed text-sm md:text-base">
            Browse adoptable pets from shelters. Our AI assesses temperament, living conditions, and active pet profiles to guide compatible companionships.
          </p>

          {activeUserPet && (
            <div className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white/20 border border-white/30 px-4 py-2 text-xs font-bold backdrop-blur-sm">
              <Sparkles size={13} className="text-yellow-300" />
              <span>Matching against your active pet profile: {activeUserPet.name} ({activeUserPet.breed})</span>
            </div>
          )}
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-6">
        <button
          onClick={() => setActiveTab("pets")}
          className={`pb-4 text-sm font-bold transition outline-none relative ${
            activeTab === "pets" ? "text-slate-800" : "text-slate-400 hover:text-slate-600"
          }`}
        >
          Find Companions
          {activeTab === "pets" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-800" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("shelters")}
          className={`pb-4 text-sm font-bold transition outline-none relative ${
            activeTab === "shelters" ? "text-slate-800" : "text-slate-400 hover:text-slate-600"
          }`}
        >
          Verified Shelters
          {activeTab === "shelters" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-800" />
          )}
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full max-w-md">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder={activeTab === "pets" ? "Search breed, location, name..." : "Search shelters..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="
              w-full
              rounded-2xl
              border
              border-slate-200
              bg-white
              py-3
              pl-11
              pr-4
              text-sm
              outline-none
              transition
              focus:border-emerald-400
              focus:ring-4
              focus:ring-emerald-100
            "
          />
        </div>

        {/* Action filter dropdowns */}
        {activeTab === "pets" && (
          <div className="flex gap-3">
            <select
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 outline-none"
            >
              <option value="All">All Genders</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <select
              value={ageFilter}
              onChange={(e) => setAgeFilter(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 outline-none"
            >
              <option value="All">All Ages</option>
              <option value="Puppy">Puppy (&lt; 1 yr)</option>
              <option value="Adult">Adult (1+ yrs)</option>
            </select>
          </div>
        )}
      </div>

      {/* Grid rendering */}
      {activeTab === "pets" ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPets.length > 0 ? (
            filteredPets.map((pet) => (
              <AdoptionCard
                key={pet.id}
                pet={pet}
                calculateAICompatibility={calculateAICompatibility}
              />
            ))
          ) : (
            <div className="col-span-full rounded-[24px] border border-slate-200 bg-white p-12 text-center text-slate-400 font-semibold">
              No adoptable pet profiles found matching your search.
            </div>
          )}
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {filteredShelters.length > 0 ? (
            filteredShelters.map((shelter) => (
              <ShelterCard
                key={shelter.id}
                shelter={shelter}
                onVolunteerClick={() => alert(`Sign up form requested for ${shelter.name}`)}
              />
            ))
          ) : (
            <div className="col-span-full rounded-[24px] border border-slate-200 bg-white p-12 text-center text-slate-400 font-semibold">
              No shelters found matching your search.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
