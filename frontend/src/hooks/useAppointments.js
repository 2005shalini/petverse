import { useMemo } from "react";
import { useHealth } from "./useHealth";

/**
 * useAppointments — Domain-specific hook for the Vet Appointments page.
 * Wraps useHealth() and surfaces appointment-specific computed data.
 * Swap the data source for API later without touching UI components.
 */
export function useAppointments() {
  const {
    pets,
    selectedPetId,
    selectedPet,
    changeSelectedPet,
    appointments,
    addAppointment,
    updateAppointment,
    deleteAppointment
  } = useHealth();

  const upcoming = useMemo(
    () =>
      appointments.filter(
        (a) => a.status === "Upcoming" || a.status === "Scheduled"
      ).sort((a, b) => new Date(a.visitDate) - new Date(b.visitDate)),
    [appointments]
  );

  const completed = useMemo(
    () =>
      appointments.filter(
        (a) => a.status === "Completed" || a.status === "Past"
      ).sort((a, b) => new Date(b.visitDate) - new Date(a.visitDate)),
    [appointments]
  );

  const cancelled = useMemo(
    () =>
      appointments.filter((a) => a.status === "Cancelled"),
    [appointments]
  );

  const nextAppointment = useMemo(() => upcoming[0] || null, [upcoming]);

  const cancelAppointment = (id) => updateAppointment(id, { status: "Cancelled" });

  const completeAppointment = (id) => updateAppointment(id, { status: "Completed" });

  const rescheduleAppointment = (id, newDate, newTime) =>
    updateAppointment(id, { visitDate: newDate, time: newTime });

  return {
    pets,
    selectedPetId,
    selectedPet,
    changeSelectedPet,
    appointments,
    upcoming,
    completed,
    cancelled,
    nextAppointment,
    totalCount: appointments.length,
    upcomingCount: upcoming.length,
    addAppointment,
    updateAppointment,
    deleteAppointment,
    cancelAppointment,
    completeAppointment,
    rescheduleAppointment
  };
}
