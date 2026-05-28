import {
  Bell,
  Building2,
  CalendarDays,
  ChevronDown,
  Clock,
  CreditCard,
  DollarSign,
  Globe2,
  Lock,
  Save,
  Settings,
  Shield,
  Star,
  Store,
  Truck,
  Users,
} from "lucide-react";

const sections = [
  { label: "Restaurant Profile", icon: Store, active: true },
  { label: "Account & Staff", icon: Users },
  { label: "Order Settings", icon: Truck },
  { label: "Reservation Settings", icon: CalendarDays },
  { label: "Payment Settings", icon: CreditCard },
  { label: "Notification Settings", icon: Bell },
  { label: "Loyalty Settings", icon: Star },
  { label: "System Settings", icon: Settings },
];

export function SettingsPage() {
  return (
    <div id="settings" className="space-y-5">
      <header className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <h1 className="text-[30px] font-semibold leading-tight tracking-normal">Settings</h1>
          <p className="mt-2 text-sm text-[#c6bbae]">Configure restaurant operations, permissions, payments, and system rules.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="admin-toolbar-button">Reset Changes</button>
          <button className="admin-primary-button"><Save size={17} />Save Settings</button>
        </div>
      </header>

      <section className="grid gap-5 xl:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="settings-sidebar">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <button key={section.label} className={section.active ? "settings-nav active" : "settings-nav"}>
                <Icon size={17} />
                {section.label}
              </button>
            );
          })}
        </aside>

        <div className="space-y-5">
          <SettingsCard title="Restaurant Profile" description="Basic restaurant information shown across admin and customer channels.">
            <div className="settings-grid">
              <Field label="Restaurant Name" value="Maison Olive" />
              <Field label="Business Phone" value="+351 912 345 678" />
              <Field label="Email Address" value="hello@maisonolive.com" />
              <Field label="Tax ID" value="PT 512 884 219" />
              <Field label="Address" value="123 Olive Street, Lisbon, Portugal" wide />
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              <SelectTile icon={<Clock size={18} />} title="Opening Hours" value="10:00 AM - 11:00 PM" />
              <SelectTile icon={<Globe2 size={18} />} title="Timezone" value="Europe/Lisbon" />
              <SelectTile icon={<DollarSign size={18} />} title="Currency" value="EUR (€)" />
            </div>
          </SettingsCard>

          <div className="grid gap-5 2xl:grid-cols-2">
            <SettingsCard title="Account & Staff" description="Manage administrator access, staff roles, and security.">
              <ToggleRow title="Require two-factor login" note="Admins must verify sign-ins." enabled />
              <ToggleRow title="Manager can issue refunds" note="Allow manager role to refund paid orders." enabled />
              <ToggleRow title="Staff can edit menu items" note="Restrict menu editing to admins only." />
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <SelectTile icon={<Users size={18} />} title="Default Staff Role" value="Order Staff" />
                <SelectTile icon={<Shield size={18} />} title="Session Timeout" value="8 hours" />
              </div>
            </SettingsCard>

            <SettingsCard title="Order Settings" description="Control ordering channels, fees, and acceptance rules.">
              <ToggleRow title="Enable delivery orders" note="Customers can place delivery orders." enabled />
              <ToggleRow title="Enable takeaway orders" note="Customers can order ahead for pickup." enabled />
              <ToggleRow title="Auto-accept paid orders" note="Skip manual confirmation for online payments." />
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                <Field label="Minimum Order" value="€12.00" />
                <Field label="Delivery Fee" value="€3.50" />
                <Field label="Prep Buffer" value="15 min" />
              </div>
            </SettingsCard>
          </div>

          <div className="grid gap-5 2xl:grid-cols-2">
            <SettingsCard title="Reservation Settings" description="Configure tables, booking windows, and cancellation rules.">
              <ToggleRow title="Accept online reservations" note="Guests can reserve from the website." enabled />
              <ToggleRow title="Require confirmation" note="New reservations stay pending until approved." enabled />
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                <Field label="Max Party Size" value="8" />
                <Field label="Booking Interval" value="30 min" />
                <Field label="Cancel Cutoff" value="2 hours" />
              </div>
            </SettingsCard>

            <SettingsCard title="Payment Settings" description="Payment methods and provider configuration.">
              <ToggleRow title="Accept card payments" note="Enable online card checkout." enabled />
              <ToggleRow title="Accept cash on delivery" note="Allow cash payment for delivery." enabled />
              <ToggleRow title="Enable refunds from admin" note="Let authorized staff process refunds." />
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <SelectTile icon={<CreditCard size={18} />} title="Payment Provider" value="Stripe" />
                <SelectTile icon={<Lock size={18} />} title="Payout Account" value="Connected" />
              </div>
            </SettingsCard>
          </div>

          <div className="grid gap-5 2xl:grid-cols-2">
            <SettingsCard title="Notification Settings" description="Choose which alerts staff and customers receive.">
              <ToggleRow title="New order alerts" note="Notify staff when orders arrive." enabled />
              <ToggleRow title="Reservation reminders" note="Send reminders before booking time." enabled />
              <ToggleRow title="Low stock alerts" note="Alert managers when ingredients run low." enabled />
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                <SelectTile icon={<Bell size={18} />} title="Staff Channel" value="Email + SMS" />
                <SelectTile icon={<Bell size={18} />} title="Customer Channel" value="Email" />
                <SelectTile icon={<Bell size={18} />} title="Reminder Time" value="2 hours before" />
              </div>
            </SettingsCard>

            <SettingsCard title="Loyalty Settings" description="Points, tiers, reward redemption, and member benefits.">
              <ToggleRow title="Enable points earning" note="Customers earn points for paid orders." enabled />
              <ToggleRow title="Enable birthday rewards" note="Send annual birthday offers." enabled />
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                <Field label="Points per €1" value="10" />
                <Field label="Redeem Rate" value="100 pts = €1" />
                <Field label="Gold Tier" value="2,000 pts" />
              </div>
            </SettingsCard>
          </div>

          <SettingsCard title="System Settings" description="Localization, security, theme, and data preferences.">
            <div className="grid gap-3 md:grid-cols-4">
              <SelectTile icon={<Globe2 size={18} />} title="Language" value="English" />
              <SelectTile icon={<Clock size={18} />} title="Timezone" value="Asia/Kuala_Lumpur" />
              <SelectTile icon={<DollarSign size={18} />} title="Currency" value="MYR / EUR" />
              <SelectTile icon={<Building2 size={18} />} title="Theme" value="Dark" />
            </div>
          </SettingsCard>
        </div>
      </section>
    </div>
  );
}

function SettingsCard({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <section className="settings-card">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="mt-1 text-sm text-[#a79d91]">{description}</p>
      </div>
      {children}
    </section>
  );
}

function Field({ label, value, wide = false }: { label: string; value: string; wide?: boolean }) {
  return (
    <label className={wide ? "settings-field md:col-span-2" : "settings-field"}>
      <span>{label}</span>
      <input defaultValue={value} />
    </label>
  );
}

function SelectTile({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) {
  return (
    <button className="settings-select-tile">
      <span>{icon}</span>
      <span><strong>{title}</strong><small>{value}</small></span>
      <ChevronDown size={15} />
    </button>
  );
}

function ToggleRow({ title, note, enabled = false }: { title: string; note: string; enabled?: boolean }) {
  return (
    <div className="settings-toggle-row">
      <span>
        <strong>{title}</strong>
        <small>{note}</small>
      </span>
      <button className={enabled ? "settings-toggle enabled" : "settings-toggle"} aria-label={title}>
        <span />
      </button>
    </div>
  );
}
