import { useState, useEffect, useCallback } from "react";
import { getStoredNotifications, saveStoredNotifications } from "@/mock/notifications";
import { getStoredEvents, subscribeToEvents, markEventAsRead, markAllEventsAsRead, deleteEvent } from "@/utils/events";

export function useNotifications() {
  const [notifications, setNotifications] = useState([]);

  // Merge pre-loaded notifications and dynamic event log events
  const loadMergedNotifications = useCallback(() => {
    const defaultNotifs = getStoredNotifications();
    const eventBusNotifs = getStoredEvents().map((evt) => {
      // Map standard event bus items to notification visual layout
      return {
        id: evt.id,
        type: evt.type,
        title: evt.title,
        description: evt.description,
        priority: evt.priority,
        category: evt.category,
        timestamp: evt.timestamp,
        isRead: evt.isRead,
        action: evt.action,
        pet: evt.petId ? { name: "Pet" } : undefined, // Quick ref
        icon: getCategoryIcon(evt.category)
      };
    });

    // Deduplicate by ID
    const merged = [...eventBusNotifs, ...defaultNotifs];
    const unique = Array.from(new Map(merged.map((item) => [item.id, item])).values());
    
    // Sort by timestamp desc
    return unique.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }, []);

  useEffect(() => {
    setNotifications(loadMergedNotifications());

    // Subscribe to Event Bus to reactively update view when events publish
    const unsubscribe = subscribeToEvents(() => {
      setNotifications(loadMergedNotifications());
    });

    return () => unsubscribe();
  }, [loadMergedNotifications]);

  const markAsRead = useCallback((id) => {
    // If it's a dynamic event bus notification, update it there
    markEventAsRead(id);

    // Also update pre-loaded notifications
    const defaultNotifs = getStoredNotifications();
    const updated = defaultNotifs.map((n) =>
      n.id === id ? { ...n, isRead: true } : n
    );
    saveStoredNotifications(updated);

    setNotifications(loadMergedNotifications());
  }, [loadMergedNotifications]);

  const markAllRead = useCallback(() => {
    markAllEventsAsRead();

    const defaultNotifs = getStoredNotifications();
    const updated = defaultNotifs.map((n) => ({ ...n, isRead: true }));
    saveStoredNotifications(updated);

    setNotifications(loadMergedNotifications());
  }, [loadMergedNotifications]);

  const deleteNotification = useCallback((id) => {
    deleteEvent(id);

    const defaultNotifs = getStoredNotifications();
    const updated = defaultNotifs.filter((n) => n.id !== id);
    saveStoredNotifications(updated);

    setNotifications(loadMergedNotifications());
  }, [loadMergedNotifications]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllRead,
    deleteNotification
  };
}

// Utility mapper to match category types to Lucide Icons
function getCategoryIcon(category) {
  switch (category) {
    case "health":
      return "HeartPulse";
    case "ai":
      return "Bot";
    case "shop":
      return "ShoppingBag";
    case "community":
      return "MessageSquare";
    case "adoption":
      return "Heart";
    default:
      return "Bell";
  }
}

export default useNotifications;
