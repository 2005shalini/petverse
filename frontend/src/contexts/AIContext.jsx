import React, { createContext, useContext, useMemo } from "react";
import { useHealth } from "@/hooks/useHealth";

const AIContext = createContext(null);

export function AIContextProvider({ children }) {
  const healthDomain = useHealth();
  const { selectedPet, records, appointments } = healthDomain;

  const aiContext = useMemo(() => {
    if (!selectedPet) {
      return {
        activePet: null,
        owner: "Shreyash Sharma",
        health: "Unknown",
        vaccinations: [],
        medications: [],
        appointments: [],
        feeding: null,
        weightHistory: [],
        medicalHistory: [],
        documents: [],
        recentActivities: [],
        shoppingHistory: [],
        preferences: null
      };
    }

    // Extract records and sub-arrays
    const petRecords = records.filter(r => r.petId === selectedPet.id);
    const petAppointments = appointments.filter(a => a.petId === selectedPet.id);

    // Vitals and general health status
    const latestRecord = petRecords[0] || null;
    const healthScore = selectedPet.healthScore || latestRecord?.healthScore || 90;
    const healthStatus = healthScore >= 85 ? "Healthy" : healthScore >= 70 ? "Stable" : "Needs Review";

    // Vaccinations compiled
    const vaccinations = [];
    petRecords.forEach(r => {
      if (r.vaccinations && r.vaccinations.length > 0) {
        r.vaccinations.forEach(v => {
          vaccinations.push({
            ...v,
            visitDate: r.visitDate,
            veterinarian: r.veterinarian
          });
        });
      }
    });

    // Medications compiled
    const medications = [];
    petRecords.forEach(r => {
      if (r.medications && r.medications.length > 0) {
        r.medications.forEach(m => {
          medications.push({
            ...m,
            visitDate: r.visitDate
          });
        });
      }
    });

    // Weight History compiled
    const weightHistory = petRecords
      .filter(r => r.weight > 0)
      .map(r => ({ date: r.visitDate, weight: r.weight }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    // If no weightHistory from records, fallback to selectedPet.weightHistory
    const weightHistoryFinal = weightHistory.length > 0 ? weightHistory : (selectedPet.weightHistory || []);

    // Medical History compiled
    const medicalHistory = petRecords.map(r => ({
      id: r.id,
      date: r.visitDate,
      diagnosis: r.diagnosis || "Routine Checkup",
      treatment: r.treatment || r.notes,
      veterinarian: r.veterinarian,
      clinic: r.clinic,
      healthScore: r.healthScore
    }));

    // Documents compiled
    const documents = [];
    petRecords.forEach(r => {
      if (r.attachments && r.attachments.length > 0) {
        r.attachments.forEach(a => {
          documents.push({
            ...a,
            visitDate: r.visitDate,
            veterinarian: r.veterinarian
          });
        });
      }
    });

    // Feeding preferences
    const feeding = selectedPet.feedingPreferences || {
      foodType: "Dry Kibble",
      frequency: "2 times daily",
      portionSize: "2 cups",
      allergies: "None",
      notes: "Serve morning and evening"
    };

    // Shopping history (simulated for Shop integration)
    const shoppingHistory = [
      { id: "shop-1", date: "2026-06-10", item: "Premium Salmon Kibble", category: "Food & Nutrition", price: 45.99 },
      { id: "shop-2", date: "2026-05-15", item: "Joint Support Soft Chews", category: "Health & Wellness", price: 29.99 },
      { id: "shop-3", date: "2026-04-20", item: "Ortho Memory Foam Bed", category: "Accessories", price: 89.99 }
    ];

    // Preferences
    const preferences = {
      allergies: feeding.allergies || "None",
      activityLevel: selectedPet.species === "Cat" ? "Low-Medium" : "High",
      dietType: feeding.foodType || "Dry Kibble"
    };

    // Recent Activities compiled (simulated activity logs)
    const recentActivities = [
      { id: "act-1", date: "Today", type: "Exercise", value: selectedPet.species === "Cat" ? "20m play" : "4.5 km walk", status: "Completed" },
      { id: "act-2", date: "Yesterday", type: "Feeding", value: feeding.portionSize + " feeding", status: "Completed" },
      { id: "act-3", date: "2 days ago", type: "Sleep", value: "8.5 hours rest", status: "Normal" }
    ];

    return {
      activePet: selectedPet,
      owner: "Shreyash Sharma",
      health: healthStatus,
      vaccinations,
      medications,
      appointments: petAppointments,
      feeding,
      weightHistory: weightHistoryFinal,
      medicalHistory,
      documents,
      recentActivities,
      shoppingHistory,
      preferences
    };
  }, [selectedPet, records, appointments]);

  return (
    <AIContext.Provider value={{ aiContext, healthDomain }}>
      {children}
    </AIContext.Provider>
  );
}

export function useAIContext() {
  const context = useContext(AIContext);
  if (!context) {
    throw new Error("useAIContext must be used within an AIContextProvider");
  }
  return context;
}
