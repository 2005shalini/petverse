import { useState, useEffect, useCallback } from "react";
import { getStoredAdoptablePets, saveStoredAdoptablePets, getStoredShelters } from "@/mock/community";
import { getStoredPets } from "@/mock/pets";
import { publishEvent } from "@/utils/events";

export function useAdoption() {
  const [adoptablePets, setAdoptablePets] = useState([]);
  const [shelters, setShelters] = useState([]);
  const [activeUserPet, setActiveUserPet] = useState(null);

  useEffect(() => {
    setAdoptablePets(getStoredAdoptablePets());
    setShelters(getStoredShelters());

    // Retrieve user's selected active pet
    const allPets = getStoredPets();
    const savedActiveId = localStorage.getItem("petverse_selected_pet_id");
    if (savedActiveId) {
      const activePet = allPets.find((p) => p.id === savedActiveId);
      if (activePet) setActiveUserPet(activePet);
    } else if (allPets.length > 0) {
      setActiveUserPet(allPets[0]);
    }
  }, []);

  // AI Compatibility Matching Algorithm
  const calculateAICompatibility = useCallback((adoptablePet) => {
    if (!activeUserPet) {
      return {
        score: 85,
        reasons: [
          "Complete health records available",
          "Excellent temperament reported by shelter",
          "Select a pet profile to get custom matching scores!"
        ]
      };
    }

    let score = 90;
    const reasons = [];

    // Species matching logic
    if (activeUserPet.species === adoptablePet.breed.includes("Cat") ? "Cat" : "Dog") {
      score += 5;
      reasons.push(`Both are ${activeUserPet.species}s, sharing similar communication cues.`);
    } else {
      score -= 10;
      if (adoptablePet.description.toLowerCase().includes("great with cats") || adoptablePet.description.toLowerCase().includes("great with other species")) {
        score += 8;
        reasons.push(`${adoptablePet.petName} is noted by the shelter as friendly towards other species.`);
      } else {
        reasons.push("Different species (Dog & Cat interaction requires slow introduction).");
      }
    }

    // Energy & Breed temperament matching
    if (activeUserPet.breed.includes("Retriever") || activeUserPet.breed.includes("Shepherd")) {
      if (adoptablePet.breed.includes("Collie") || adoptablePet.breed.includes("Husky")) {
        score += 3;
        reasons.push("Energy level match: Both breeds require high physical and mental stimulation.");
      }
    }

    // Age matching
    if (adoptablePet.age.includes("months") || adoptablePet.age.includes("1 year")) {
      reasons.push("Playful companion match: Youthful age suits interactive play sessions.");
    } else {
      reasons.push("Mature match: Calmer presence makes for an easy home adjustment.");
    }

    // Health / Vaccination status checks
    if (adoptablePet.vaccinations.toLowerCase().includes("fully") || adoptablePet.vaccinations.toLowerCase().includes("current")) {
      score += 2;
      reasons.push("Health protection: Fully vaccinated status limits cross-contamination risks.");
    }

    // Bound limits [50, 100]
    const finalScore = Math.max(50, Math.min(100, score));

    return {
      score: finalScore,
      reasons: reasons.slice(0, 3)
    };
  }, [activeUserPet]);

  const submitAdoptionRequest = useCallback((petId, formData) => {
    const targetPet = adoptablePets.find((p) => p.id === petId);
    if (!targetPet) return false;

    // Update pet status to pending adoption request
    setAdoptablePets((prev) => {
      const updated = prev.map((p) =>
        p.id === petId ? { ...p, status: "Pending" } : p
      );
      saveStoredAdoptablePets(updated);
      return updated;
    });

    // 1. Log an event
    publishEvent({
      type: "ADOPTION_REQUEST",
      category: "adoption",
      title: "Adoption Request Sent",
      description: `Your application to adopt ${targetPet.petName} was submitted to ${targetPet.shelterName}.`,
      priority: "high",
      action: "/community/messages",
      metadata: { petId, ...formData }
    });

    // 2. Automatically set up a messaging conversation thread with that shelter!
    const conversations = JSON.parse(localStorage.getItem("petverse_conversations") || "[]");
    const existingIndex = conversations.findIndex((c) => c.participant.name === targetPet.shelterName);

    const newSystemMsg = {
      id: `m-adopt-${Date.now()}`,
      sender: "me",
      text: `[ADOPTION APPLICATION SUBMITTED]\nPet: ${targetPet.petName}\nBreed: ${targetPet.breed}\nApplicant Home: ${formData.homeType}\nActivity Level: ${formData.activityLevel}\nMessage: ${formData.message || "Looking forward to meeting Max!"}`,
      timestamp: new Date().toISOString(),
      status: "sent"
    };

    if (existingIndex > -1) {
      conversations[existingIndex].messages.push(newSystemMsg);
    } else {
      conversations.push({
        id: `conv-${Date.now()}`,
        participant: {
          name: targetPet.shelterName,
          avatar: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=150&auto=format&fit=crop&q=80",
          status: "online",
          role: "Verified Shelter"
        },
        messages: [newSystemMsg]
      });
    }
    localStorage.setItem("petverse_conversations", JSON.stringify(conversations));

    return true;
  }, [adoptablePets]);

  return {
    adoptablePets,
    shelters,
    activeUserPet,
    calculateAICompatibility,
    submitAdoptionRequest
  };
}
