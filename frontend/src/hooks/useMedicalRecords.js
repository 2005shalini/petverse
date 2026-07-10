import { useMemo, useState, useCallback } from "react";
import { useHealth } from "./useHealth";

/**
 * useMedicalRecords — Domain-specific hook for the Medical Records page.
 * Wraps useHealth() and adds search, filtering, and computed stats.
 * Swap the data source for API later without touching UI components.
 */
export function useMedicalRecords() {
  const {
    pets,
    selectedPetId,
    selectedPet,
    changeSelectedPet,
    records,
    addRecord,
    updateRecord,
    deleteRecord
  } = useHealth();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterVet, setFilterVet] = useState("all");

  const uniqueVets = useMemo(() => {
    const vets = new Set(records.map((r) => r.veterinarian).filter(Boolean));
    return Array.from(vets);
  }, [records]);

  const filteredRecords = useMemo(() => {
    let result = [...records];

    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      result = result.filter(
        (r) =>
          r.diagnosis?.toLowerCase().includes(lower) ||
          r.veterinarian?.toLowerCase().includes(lower) ||
          r.clinic?.toLowerCase().includes(lower) ||
          r.treatment?.toLowerCase().includes(lower)
      );
    }

    if (filterVet !== "all") {
      result = result.filter((r) => r.veterinarian === filterVet);
    }

    return result.sort(
      (a, b) => new Date(b.visitDate) - new Date(a.visitDate)
    );
  }, [records, searchTerm, filterVet]);

  const latestRecord = useMemo(
    () =>
      [...records].sort(
        (a, b) => new Date(b.visitDate) - new Date(a.visitDate)
      )[0] || null,
    [records]
  );

  const avgHealthScore = useMemo(() => {
    if (records.length === 0) return 0;
    const sum = records.reduce((acc, r) => acc + (r.healthScore || 0), 0);
    return Math.round(sum / records.length);
  }, [records]);

  const allAttachments = useMemo(() => {
    const docs = [];
    records.forEach((r) => {
      if (r.attachments?.length > 0) {
        r.attachments.forEach((a) => docs.push({ ...a, recordId: r.id }));
      }
    });
    return docs;
  }, [records]);

  const clearSearch = useCallback(() => {
    setSearchTerm("");
    setFilterVet("all");
  }, []);

  return {
    pets,
    selectedPetId,
    selectedPet,
    changeSelectedPet,
    records,
    filteredRecords,
    latestRecord,
    avgHealthScore,
    allAttachments,
    totalRecords: records.length,
    uniqueVets,
    searchTerm,
    setSearchTerm,
    filterVet,
    setFilterVet,
    clearSearch,
    addRecord,
    updateRecord,
    deleteRecord
  };
}
