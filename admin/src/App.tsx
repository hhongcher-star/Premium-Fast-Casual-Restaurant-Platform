import { useState } from "react";

import { AdminLayout } from "@/components/layout/AdminLayout";
import { AccountSettingsPage } from "@/pages/AccountSettingsPage";
import { CustomerManagerPage } from "@/pages/CustomerManagerPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { MenuManagerPage } from "@/pages/MenuManagerPage";
import { OrderManagerPage } from "@/pages/OrderManagerPage";
import { PromotionRewardsPage } from "@/pages/PromotionRewardsPage";
import { ReportsAnalyticsPage } from "@/pages/ReportsAnalyticsPage";
import { ReservationManagerPage } from "@/pages/ReservationManagerPage";
import { SettingsPage } from "@/pages/SettingsPage";
import { StaffProfilePage } from "@/pages/StaffProfilePage";

export type AdminPage =
  | "dashboard"
  | "menu"
  | "orders"
  | "reservations"
  | "promotions"
  | "customers"
  | "reports"
  | "settings"
  | "profile"
  | "account";

export function App() {
  const [page, setPage] = useState<AdminPage>("menu");

  return (
    <AdminLayout activePage={page} onNavigate={setPage}>
      {page === "dashboard" && <DashboardPage />}
      {page === "menu" && <MenuManagerPage />}
      {page === "orders" && <OrderManagerPage />}
      {page === "reservations" && <ReservationManagerPage />}
      {page === "promotions" && <PromotionRewardsPage />}
      {page === "customers" && <CustomerManagerPage />}
      {page === "reports" && <ReportsAnalyticsPage />}
      {page === "settings" && <SettingsPage />}
      {page === "profile" && <StaffProfilePage />}
      {page === "account" && <AccountSettingsPage />}
    </AdminLayout>
  );
}
