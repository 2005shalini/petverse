import { useState, useEffect, useCallback } from "react";
import { getStoredReminders, saveStoredReminders } from "@/mock/notifications";
import { publishEvent } from "@/utils/events";

export function useReminder() {
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    setReminders(getStoredReminders());
  }, []);

  const addReminder = useCallback((reminderData) => {
    const newReminder = {
      id: `rem-${Date.now()}`,
      status: "Upcoming",
      priority: reminderData.priority || "medium",
      ...reminderData
    };

    setReminders((prev) => {
      const updated = [newReminder, ...prev];
      saveStoredReminders(updated);
      return updated;
    });

    publishEvent({
      type: "REMINDER_ADDED",
      category: "health",
      title: "Reminder Scheduled",
      description: `${newReminder.type} reminder: "${newReminder.title}" scheduled for ${newReminder.date} at ${newReminder.time}.`,
      priority: "low",
      action: "/notifications/history"
    });

    return newReminder;
  }, []);

  const completeReminder = useCallback((id) => {
    setReminders((prev) => {
      const updated = prev.map((rem) => {
        if (rem.id === id) {
          const nextStatus = rem.status === "Completed" ? "Upcoming" : "Completed";
          
          if (nextStatus === "Completed") {
            publishEvent({
              type: "REMINDER_COMPLETED",
              category: "health",
              title: "Reminder Completed",
              description: `Completed task: "${rem.title}" for ${rem.pet?.name || "your pet"}.`,
              priority: "low",
              action: "/notifications/history"
            });
          }

          return { ...rem, status: nextStatus };
        }
        return rem;
      });
      saveStoredReminders(updated);
      return updated;
    });
  }, []);

  const snoozeReminder = useCallback((id, minutes = 15) => {
    setReminders((prev) => {
      const updated = prev.map((rem) => {
        if (rem.id === id) {
          // Adjust time (simplistic visual representation for static UI)
          const [timePart, ampm] = rem.time.split(" ");
          let [hours, mins] = timePart.split(":").map(Number);
          mins += minutes;
          if (mins >= 60) {
            hours = (hours + 1) % 12 || 12;
            mins = mins % 60;
          }
          const formattedMins = mins.toString().padStart(2, "0");
          const nextTime = `${hours}:${formattedMins} ${ampm}`;

          publishEvent({
            type: "REMINDER_SNOOZED",
            category: "health",
            title: "Reminder Snoozed",
            description: `Snoozed: "${rem.title}" by ${minutes} minutes.`,
            priority: "low",
            action: "/notifications/history"
          });

          return { ...rem, time: nextTime, status: "Upcoming" };
        }
        return rem;
      });
      saveStoredReminders(updated);
      return updated;
    });
  }, []);

  const deleteReminder = useCallback((id) => {
    setReminders((prev) => {
      const updated = prev.filter((rem) => rem.id !== id);
      saveStoredReminders(updated);
      return updated;
    });
  }, []);

  return {
    reminders,
    addReminder,
    completeReminder,
    snoozeReminder,
    deleteReminder
  };
}

export default useReminder;
