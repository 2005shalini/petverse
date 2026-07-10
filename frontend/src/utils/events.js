// Unified Client-Side Event Bus linked to localStorage

const STORAGE_KEY = "petverse_event_log";
const LISTENERS = new Set();

export function getStoredEvents() {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveStoredEvents(events) {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  }
}

export function publishEvent(eventData) {
  const newEvent = {
    id: `evt-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date().toISOString(),
    isRead: false,
    priority: eventData.priority || "low",
    category: eventData.category || "system",
    ...eventData,
  };

  const currentEvents = getStoredEvents();
  // Keep event log at a healthy size limit (e.g., 200 events)
  const updatedEvents = [newEvent, ...currentEvents].slice(0, 200);
  saveStoredEvents(updatedEvents);

  // Notify internal React hook subscribers
  LISTENERS.forEach((callback) => {
    try {
      callback(newEvent, updatedEvents);
    } catch (e) {
      console.error("Error in event listener callback:", e);
    }
  });

  // Notify native browser elements (e.g. for dynamic notification toasts)
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("petverse-new-event", { detail: newEvent })
    );
  }

  return newEvent;
}

export function subscribeToEvents(callback) {
  LISTENERS.add(callback);
  return () => {
    LISTENERS.delete(callback);
  };
}

export function markEventAsRead(id) {
  const currentEvents = getStoredEvents();
  const updatedEvents = currentEvents.map((evt) =>
    evt.id === id ? { ...evt, isRead: true } : evt
  );
  saveStoredEvents(updatedEvents);
  LISTENERS.forEach((callback) => callback(null, updatedEvents));
}

export function markAllEventsAsRead() {
  const currentEvents = getStoredEvents();
  const updatedEvents = currentEvents.map((evt) => ({ ...evt, isRead: true }));
  saveStoredEvents(updatedEvents);
  LISTENERS.forEach((callback) => callback(null, updatedEvents));
}

export function deleteEvent(id) {
  const currentEvents = getStoredEvents();
  const updatedEvents = currentEvents.filter((evt) => evt.id !== id);
  saveStoredEvents(updatedEvents);
  LISTENERS.forEach((callback) => callback(null, updatedEvents));
}
