import {
  BarChart3,
  CalendarDays,
  ChevronDown,
  ClipboardList,
  Gift,
  LayoutDashboard,
  LogOut,
  Settings,
  User,
  Users,
  Utensils,
} from "lucide-react";
import { useState } from "react";

import type { AdminPage } from "@/App";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, page: "dashboard" },
  { label: "Menu Manager", icon: ClipboardList, page: "menu" },
  { label: "Order Manager", icon: CalendarDays, page: "orders" },
  { label: "Reservation Manager", icon: CalendarDays, page: "reservations" },
  { label: "Promotion / Rewards", icon: Gift, page: "promotions" },
  { label: "Customer Manager", icon: User, page: "customers" },
  { label: "Reports", icon: BarChart3, page: "reports" },
  { label: "Settings", icon: Settings, page: "settings" },
];

type AdminSidebarProps = {
  activePage: AdminPage;
  onNavigate: (page: AdminPage) => void;
};

export function AdminSidebar({ activePage, onNavigate }: AdminSidebarProps) {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-[215px] border-r border-white/10 bg-[#070908]/96 px-3 py-7 lg:flex lg:flex-col">
      <a href="#dashboard" className="flex items-center gap-2.5 px-2">
        <span className="flex size-9 items-center justify-center rounded-full bg-[#bd272e] text-white shadow-[0_0_24px_rgba(189,39,46,0.28)]">
          <Utensils size={17} />
        </span>
        <span className="font-display text-[21px] font-semibold leading-none tracking-normal">
          <span className="text-[#d64a52]">Maison</span>{" "}
          <span className="text-[#8bac59]">Olive</span>
        </span>
      </a>

      <nav className="mt-11 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.page && item.page === activePage;

          return (
            <button
              key={item.label}
              type="button"
              onClick={() => item.page && onNavigate(item.page as AdminPage)}
              className={[
                "flex h-[45px] w-full items-center gap-3 rounded-lg px-3 text-left text-sm transition",
                isActive
                  ? "border-l-2 border-[#e59b18] bg-[#2a2112] text-[#f2a51d]"
                  : "text-[#ddd7cc] hover:bg-white/[0.055] hover:text-white",
              ].join(" ")}
            >
              <Icon size={16} strokeWidth={1.8} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto space-y-2">
        {profileOpen && (
          <div className="rounded-lg border border-white/10 bg-[#111310] p-2 shadow-[0_18px_50px_rgba(0,0,0,0.35)]">
            <button className="sidebar-profile-menu-item" onClick={() => onNavigate("profile")}>
              <User size={15} />
              View Profile
            </button>
            <button className="sidebar-profile-menu-item" onClick={() => onNavigate("account")}>
              <Settings size={15} />
              Account Settings
            </button>
            <button className="sidebar-profile-menu-item text-[#ef514c]">
              <LogOut size={15} />
              Sign Out
            </button>
          </div>
        )}

        <button
          type="button"
          onClick={() => setProfileOpen((open) => !open)}
          className="flex w-full items-center gap-2.5 rounded-lg border border-white/10 bg-white/[0.045] p-2.5 text-left"
        >
          <span className="relative grid size-10 place-items-center rounded-full bg-[#d8c4aa] text-sm font-bold text-[#1b1712]">
            TM
            <span className="absolute bottom-0 right-0 size-2.5 rounded-full border border-[#111310] bg-[#72d150]" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-semibold">Tiago M.</span>
            <span className="block text-xs text-[#b9b0a4]">Administrator</span>
          </span>
          <ChevronDown
            size={15}
            className={["text-[#b9b0a4] transition", profileOpen ? "rotate-180" : ""].join(" ")}
          />
        </button>
      </div>
    </aside>
  );
}
