import type { ReactNode } from "react";

import type { AdminPage } from "@/App";
import { AdminSidebar } from "@/components/layout/AdminSidebar";

type AdminLayoutProps = {
  activePage: AdminPage;
  children: ReactNode;
  onNavigate: (page: AdminPage) => void;
};

export function AdminLayout({ activePage, children, onNavigate }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-[#080a09] text-white">
      <AdminSidebar activePage={activePage} onNavigate={onNavigate} />
      <main className="min-h-screen lg:pl-[215px]">
        <div className="mx-auto w-full max-w-[1440px] px-4 py-7 lg:px-6">{children}</div>
      </main>
    </div>
  );
}
