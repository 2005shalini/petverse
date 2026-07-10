import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { CheckCheck, Trash2, Search, Bell, Settings, CalendarRange } from "lucide-react";
import DashboardLayout from "@/components/dashboard/layout";
import GlassCard from "@/components/ui/GlassCard/GlassCard";
import NotificationCard from "@/components/notifications/cards/NotificationCard";
import EmptyNotification from "@/components/notifications/shared/EmptyNotification";
import { useNotifications } from "@/hooks/useNotifications";

export default function NotificationCenterPage() {
  const { notifications, unreadCount, markAsRead, markAllRead, deleteNotification } = useNotifications();
  const [activeCategory, setActiveCategory] = useState("All"); // All, Unread, Health, AI, Social, Shop, Adoption
  const [searchQuery, setSearchQuery] = useState("");

  // Category & search filtering
  const filteredNotifications = useMemo(() => {
    return notifications.filter((notif) => {
      const matchesSearch = notif.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notif.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        activeCategory === "All" ||
        (activeCategory === "Unread" && !notif.isRead) ||
        (activeCategory === "Health" && notif.category === "health") ||
        (activeCategory === "AI" && notif.category === "ai") ||
        (activeCategory === "Social" && notif.category === "community") ||
        (activeCategory === "Shop" && notif.category === "shop") ||
        (activeCategory === "Adoption" && notif.category === "adoption");

      return matchesSearch && matchesCategory;
    });
  }, [notifications, activeCategory, searchQuery]);

  // Group notifications chronologically
  const groupedNotifications = useMemo(() => {
    const today = [];
    const yesterday = [];
    const thisWeek = [];
    const earlier = [];

    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const startOfYesterday = startOfToday - 24 * 60 * 60 * 1000;
    const startOfThisWeek = startOfToday - 7 * 24 * 60 * 60 * 1000;

    filteredNotifications.forEach((notif) => {
      const time = new Date(notif.timestamp).getTime();
      if (time >= startOfToday) {
        today.push(notif);
      } else if (time >= startOfYesterday) {
        yesterday.push(notif);
      } else if (time >= startOfThisWeek) {
        thisWeek.push(notif);
      } else {
        earlier.push(notif);
      }
    });

    return { today, yesterday, thisWeek, earlier };
  }, [filteredNotifications]);

  const hasGroups =
    groupedNotifications.today.length > 0 ||
    groupedNotifications.yesterday.length > 0 ||
    groupedNotifications.thisWeek.length > 0 ||
    groupedNotifications.earlier.length > 0;

  return (
    <DashboardLayout pageTitle="Notification Center" pageDescription="Review alert history logs, notifications, and AI analysis reports.">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Side Navigation Links */}
        <div className="space-y-6 text-left">
          <GlassCard className="p-6" hover={false}>
            <h4 className="font-bold text-slate-800 mb-4">Notification Engine</h4>
            <nav className="space-y-1">
              <Link to="/notifications" className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-emerald-50 text-emerald-600 font-bold text-sm">
                <Bell size={16} />
                Notification Logs
              </Link>
              <Link to="/notifications/history" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 font-bold text-sm transition">
                <CalendarRange size={16} />
                Reminders Tracker
              </Link>
              <Link to="/notifications/preferences" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 font-bold text-sm transition">
                <Settings size={16} />
                Preferences
              </Link>
            </nav>
          </GlassCard>
        </div>

        {/* Middle Main list (Span 3) */}
        <div className="lg:col-span-3 space-y-6">
          {/* Header Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Search */}
            <div className="relative w-full max-w-xs text-left">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search alerts log..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-10 pr-4 text-xs font-semibold outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 transition"
              />
            </div>

            {/* Read All */}
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="flex items-center gap-1.5 rounded-xl bg-slate-100 hover:bg-emerald-50 hover:text-emerald-600 py-2.5 px-4 text-xs font-bold text-slate-600 transition outline-none"
              >
                <CheckCheck size={14} />
                Mark all read ({unreadCount})
              </button>
            )}
          </div>

          {/* Categories Tab Selector */}
          <div className="flex flex-wrap gap-2">
            {["All", "Unread", "Health", "AI", "Social", "Shop", "Adoption"].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`
                  rounded-xl
                  px-4
                  py-2
                  text-xs
                  font-bold
                  transition
                  border
                  outline-none
                  ${
                    activeCategory === cat
                      ? "bg-slate-800 text-white border-slate-800 shadow-sm"
                      : "bg-white hover:bg-slate-50 text-slate-600 border-slate-200"
                  }
                `}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grouped Logs list */}
          <div className="space-y-6">
            {hasGroups ? (
              <>
                {groupedNotifications.today.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest text-left">Today</h4>
                    {groupedNotifications.today.map((n) => (
                      <NotificationCard
                        key={n.id}
                        notification={n}
                        onRead={markAsRead}
                        onDelete={deleteNotification}
                      />
                    ))}
                  </div>
                )}

                {groupedNotifications.yesterday.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest text-left">Yesterday</h4>
                    {groupedNotifications.yesterday.map((n) => (
                      <NotificationCard
                        key={n.id}
                        notification={n}
                        onRead={markAsRead}
                        onDelete={deleteNotification}
                      />
                    ))}
                  </div>
                )}

                {groupedNotifications.thisWeek.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest text-left">This Week</h4>
                    {groupedNotifications.thisWeek.map((n) => (
                      <NotificationCard
                        key={n.id}
                        notification={n}
                        onRead={markAsRead}
                        onDelete={deleteNotification}
                      />
                    ))}
                  </div>
                )}

                {groupedNotifications.earlier.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest text-left">Earlier</h4>
                    {groupedNotifications.earlier.map((n) => (
                      <NotificationCard
                        key={n.id}
                        notification={n}
                        onRead={markAsRead}
                        onDelete={deleteNotification}
                      />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <EmptyNotification />
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
