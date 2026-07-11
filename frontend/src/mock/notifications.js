// Mock data for Phase 12: Smart Notifications & Reminders

export const mockNotifications = [
  {
    id: "notif-1",
    type: "health",
    title: "Vaccination Due Soon",
    description: "Luna's annual Rabies & DHPP booster vaccinations are due in 1 day.",
    priority: "high",
    category: "health",
    timestamp: "2026-07-11T08:00:00Z",
    isRead: false,
    action: "/health/vaccinations",
    pet: { name: "Luna", avatar: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=150&auto=format&fit=crop&q=80" },
    icon: "HeartPulse"
  },
  {
    id: "notif-2",
    type: "ai",
    title: "AI Unusual Weight Trend",
    description: "Our AI analyzed Rocky's weight change: weight increased by 1.2 kg this month. Recommended: reduce raw beef portion by 10%.",
    priority: "medium",
    category: "ai",
    timestamp: "2026-07-10T14:20:00Z",
    isRead: false,
    action: "/ai/health-analysis",
    pet: { name: "Rocky", avatar: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=150&auto=format&fit=crop&q=80" },
    icon: "Bot"
  },
  {
    id: "notif-3",
    type: "order",
    title: "Order Shipped",
    description: "Your order #PV-98831 (Premium Salmon Oil + Chew Toys) has been shipped via Fedex. Tracking: FX-992384.",
    priority: "low",
    category: "shop",
    timestamp: "2026-07-10T10:00:00Z",
    isRead: true,
    action: "/shop/orders",
    icon: "ShoppingBag"
  },
  {
    id: "notif-4",
    type: "social",
    title: "New Comment on Post",
    description: "Dr. Sarah Wilson commented on your post: 'She was such a good girl during...'",
    priority: "low",
    category: "community",
    timestamp: "2026-07-10T12:05:00Z",
    isRead: false,
    action: "/community/post/post-1",
    icon: "MessageSquare"
  },
  {
    id: "notif-5",
    type: "adoption",
    title: "Adoption Request Update",
    description: "Hopeful Paws Sanctuary accepted your meet-and-greet inquiry for Max.",
    priority: "high",
    category: "adoption",
    timestamp: "2026-07-09T09:30:00Z",
    isRead: true,
    action: "/community/messages",
    icon: "Heart"
  }
];

export const mockReminders = [
  {
    id: "rem-1",
    pet: { id: "pet-1", name: "Luna", avatar: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=150&auto=format&fit=crop&q=80" },
    type: "Medication",
    title: "Ear Drops Application",
    description: "Apply 3 drops of Otomax to Luna's left ear.",
    date: "2026-07-11",
    time: "09:00 AM",
    repeat: "Daily",
    status: "Upcoming",
    priority: "high"
  },
  {
    id: "rem-2",
    pet: { id: "pet-2", name: "Milo", avatar: "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?w=150&auto=format&fit=crop&q=80" },
    type: "Feeding",
    title: "Lunch Canned Tuna",
    description: "Serve 1 can (85g) room-temperature tuna. Add water splash.",
    date: "2026-07-11",
    time: "01:00 PM",
    repeat: "Daily",
    status: "Upcoming",
    priority: "medium"
  },
  {
    id: "rem-3",
    pet: { id: "pet-1", name: "Luna", avatar: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=150&auto=format&fit=crop&q=80" },
    type: "Vaccination",
    title: "Annual Checkup Boosters",
    description: "Rabies & DHPP vaccine booster at Greenwood Clinic.",
    date: "2026-07-12",
    time: "10:30 AM",
    repeat: "Once",
    status: "Upcoming",
    priority: "high"
  },
  {
    id: "rem-4",
    pet: { id: "pet-3", name: "Rocky", avatar: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=150&auto=format&fit=crop&q=80" },
    type: "Medication",
    title: "Heartworm Pill",
    description: "Give 1 chewable Heartgard tablet with food.",
    date: "2026-07-10",
    time: "08:00 AM",
    repeat: "Monthly",
    status: "Completed",
    priority: "high"
  },
  {
    id: "rem-5",
    pet: { id: "pet-2", name: "Milo", avatar: "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?w=150&auto=format&fit=crop&q=80" },
    type: "Vaccination",
    title: "FVRCP Booster",
    description: "Overdue booster vaccination for Milo.",
    date: "2026-07-05",
    time: "04:00 PM",
    repeat: "Once",
    status: "Missed",
    priority: "high"
  }
];

export const defaultPreferences = {
  push: {
    enabled: true,
    aiAlerts: true,
    healthAlerts: true,
    orders: true,
    appointments: true,
    community: false
  },
  email: {
    enabled: true,
    aiAlerts: true,
    healthAlerts: true,
    orders: true,
    appointments: true,
    community: true
  },
  sms: {
    enabled: false,
    aiAlerts: false,
    healthAlerts: true,
    orders: true,
    appointments: true,
    community: false
  },
  whatsapp: {
    enabled: true,
    aiAlerts: false,
    healthAlerts: true,
    orders: false,
    appointments: true,
    community: false
  }
};

// Storage Helpers

export function getStoredNotifications() {
  if (typeof window === "undefined") return mockNotifications;
  const data = localStorage.getItem("petverse_notifications");
  if (!data) {
    localStorage.setItem("petverse_notifications", JSON.stringify(mockNotifications));
    return mockNotifications;
  }
  return JSON.parse(data);
}

export function saveStoredNotifications(notifs) {
  if (typeof window !== "undefined") {
    localStorage.setItem("petverse_notifications", JSON.stringify(notifs));
  }
}

export function getStoredReminders() {
  if (typeof window === "undefined") return mockReminders;
  const data = localStorage.getItem("petverse_reminders");
  if (!data) {
    localStorage.setItem("petverse_reminders", JSON.stringify(mockReminders));
    return mockReminders;
  }
  return JSON.parse(data);
}

export function saveStoredReminders(reminders) {
  if (typeof window !== "undefined") {
    localStorage.setItem("petverse_reminders", JSON.stringify(reminders));
  }
}

export function getStoredPreferences() {
  if (typeof window === "undefined") return defaultPreferences;
  const data = localStorage.getItem("petverse_notification_preferences");
  if (!data) {
    localStorage.setItem("petverse_notification_preferences", JSON.stringify(defaultPreferences));
    return defaultPreferences;
  }
  return JSON.parse(data);
}

export function saveStoredPreferences(prefs) {
  if (typeof window !== "undefined") {
    localStorage.setItem("petverse_notification_preferences", JSON.stringify(prefs));
  }
}
