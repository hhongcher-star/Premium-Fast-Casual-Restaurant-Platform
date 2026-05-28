import {
  Bell,
  KeyRound,
  Lock,
  Mail,
  Monitor,
  Save,
  Shield,
  Smartphone,
} from "lucide-react";

export function AccountSettingsPage() {
  return (
    <div className="space-y-5">
      <header className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <h1 className="text-[30px] font-semibold leading-tight tracking-normal">Account Settings</h1>
          <p className="mt-2 text-sm text-[#c6bbae]">Manage login security, account preferences, and notification channels.</p>
        </div>
        <button className="admin-primary-button"><Save size={17} />Save Account</button>
      </header>

      <section className="grid gap-5 2xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-5">
          <section className="settings-card">
            <h2 className="text-lg font-semibold">Login & Security</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <label className="settings-field"><span>Email</span><input defaultValue="tiago@maisonolive.com" /></label>
              <label className="settings-field"><span>Recovery Phone</span><input defaultValue="+351 912 000 111" /></label>
            </div>
            <div className="mt-4 space-y-2">
              <AccountToggle icon={<Shield />} title="Two-factor authentication" note="Require verification code when signing in." enabled />
              <AccountToggle icon={<KeyRound />} title="Password rotation reminder" note="Remind every 90 days." enabled />
              <AccountToggle icon={<Lock />} title="Restrict unknown devices" note="Ask for approval on new devices." />
            </div>
          </section>

          <section className="settings-card">
            <h2 className="text-lg font-semibold">Preferences</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              <button className="settings-select-tile"><span><Monitor size={18} /></span><span><strong>Theme</strong><small>Dark</small></span></button>
              <button className="settings-select-tile"><span><Mail size={18} /></span><span><strong>Email Digest</strong><small>Daily</small></span></button>
              <button className="settings-select-tile"><span><Bell size={18} /></span><span><strong>Priority Alerts</strong><small>Orders + bookings</small></span></button>
            </div>
          </section>

          <section className="settings-card">
            <h2 className="text-lg font-semibold">Notification Channels</h2>
            <div className="mt-4 space-y-2">
              <AccountToggle icon={<Mail />} title="Email notifications" note="Orders, bookings, reports, and account alerts." enabled />
              <AccountToggle icon={<Smartphone />} title="SMS notifications" note="Urgent order and reservation alerts." enabled />
              <AccountToggle icon={<Bell />} title="Browser push notifications" note="Realtime admin dashboard alerts." />
            </div>
          </section>
        </div>

        <aside className="profile-card p-5">
          <h2 className="text-lg font-semibold">Active Sessions</h2>
          <div className="mt-4 space-y-3 text-sm">
            <SessionCard device="Windows Desktop" location="Kuala Lumpur, Malaysia" current />
            <SessionCard device="Chrome Browser" location="Lisbon, Portugal" />
            <SessionCard device="iPhone" location="Lisbon, Portugal" />
          </div>
          <button className="order-danger-button mt-5 w-full">Sign out other sessions</button>
        </aside>
      </section>
    </div>
  );
}

function AccountToggle({ icon, title, note, enabled = false }: { icon: React.ReactElement; title: string; note: string; enabled?: boolean }) {
  return (
    <div className="account-toggle-row">
      <span className="account-toggle-icon">{icon}</span>
      <span className="min-w-0 flex-1"><strong>{title}</strong><small>{note}</small></span>
      <button className={enabled ? "settings-toggle enabled" : "settings-toggle"}><span /></button>
    </div>
  );
}

function SessionCard({ device, location, current = false }: { device: string; location: string; current?: boolean }) {
  return (
    <div className="session-card">
      <Monitor size={18} />
      <span><strong>{device}</strong><small>{location}</small></span>
      {current && <em>Current</em>}
    </div>
  );
}
