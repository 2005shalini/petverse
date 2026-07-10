import { useMemo } from "react";
import { useHealth } from "./useHealth";

/**
 * useVaccinations — Domain-specific hook for the Vaccination Center.
 * Wraps useHealth() and surfaces vaccination-specific computed data.
 * Swap the data source for API later without touching UI components.
 */
export function useVaccinations() {
  const {
    pets,
    selectedPetId,
    selectedPet,
    changeSelectedPet,
    records,
    addRecord
  } = useHealth();

  const vaccinations = useMemo(() => {
    const all = [];
    records.forEach((rec) => {
      if (rec.vaccinations?.length > 0) {
        rec.vaccinations.forEach((vax, idx) => {
          all.push({
            ...vax,
            id: `${rec.id}-vax-${idx}`,
            recordId: rec.id,
            veterinarian: rec.veterinarian,
            clinic: rec.clinic,
            visitDate: rec.visitDate
          });
        });
      }
    });
    return all.sort((a, b) =>
      new Date(b.dateAdministered || b.visitDate) - new Date(a.dateAdministered || a.visitDate)
    );
  }, [records]);

  const completed = useMemo(
    () => vaccinations.filter((v) => v.status === "Completed"),
    [vaccinations]
  );

  const overdue = useMemo(
    () => vaccinations.filter((v) => v.status === "Overdue"),
    [vaccinations]
  );

  const upcoming = useMemo(
    () =>
      vaccinations.filter(
        (v) => v.status === "Upcoming" || v.status === "Vaccination Due"
      ),
    [vaccinations]
  );

  const complianceRate = useMemo(() => {
    if (vaccinations.length === 0) return 100;
    return Math.round((completed.length / vaccinations.length) * 100);
  }, [vaccinations, completed]);

  const nextDue = useMemo(() => {
    const sorted = [...upcoming, ...overdue].sort(
      (a, b) => new Date(a.dateDue) - new Date(b.dateDue)
    );
    return sorted[0] || null;
  }, [upcoming, overdue]);

  return {
    pets,
    selectedPetId,
    selectedPet,
    changeSelectedPet,
    vaccinations,
    completed,
    overdue,
    upcoming,
    complianceRate,
    nextDue,
    totalCount: vaccinations.length,
    overdueCount: overdue.length,
    addRecord
  };
}
