import {
  CalendarDays,
  Edit,
  Mail,
  Phone,
  Shield,
  Star,
  User,
  Users,
} from "lucide-react";

export function StaffProfilePage() {
  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-[30px] font-semibold leading-tight tracking-normal">View Profile</h1>
        <p className="mt-2 text-sm text-[#c6bbae]">Admin profile, role details, and recent activity.</p>
      </header>

      <section className="grid gap-5 xl:grid-cols-[360px_minmax(0,1fr)]">
        <aside className="profile-card p-5">
          <div className="text-center">
            <span className="mx-auto grid size-24 place-items-center rounded-full bg-[#d8c4aa] text-3xl font-bold text-[#17110a]">
              TM
            </span>
            <h2 className="mt-4 text-2xl font-semibold">Tiago M.</h2>
            <p className="mt-1 text-[#b9b0a4]">Administrator</p>
            <span className="mt-3 inline-flex rounded-full bg-[#253615] px-3 py-1 text-sm text-[#9fbe62]">
              Active
            </span>
          </div>

          <div className="mt-6 space-y-3 text-sm">
            <p className="flex items-center gap-3"><Mail size={16} />tiago@maisonolive.com</p>
            <p className="flex items-center gap-3"><Phone size={16} />+351 912 000 111</p>
            <p className="flex items-center gap-3"><CalendarDays size={16} />Joined Jan 12, 2023</p>
            <p className="flex items-center gap-3"><Shield size={16} />Full admin access</p>
          </div>

          <button className="admin-primary-button mt-6 w-full min-w-0"><Edit size={17} />Edit Profile</button>
        </aside>

        <div className="space-y-5">
          <section className="profile-card p-5">
            <h2 className="text-lg font-semibold">Role & Permissions</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {["Manage menu", "Manage orders", "Manage reservations", "Manage promotions", "View reports", "Manage settings"].map((item) => (
                <div key={item} className="profile-permission">
                  <Shield size={16} />
                  {item}
                </div>
              ))}
            </div>
          </section>

          <section className="profile-card p-5">
            <h2 className="text-lg font-semibold">Activity Summary</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              <ProfileMetric icon={<Users />} value="28" label="Orders handled today" />
              <ProfileMetric icon={<CalendarDays />} value="12" label="Reservations approved" />
              <ProfileMetric icon={<Star />} value="96%" label="Response quality" />
            </div>
          </section>

          <section className="profile-card p-5">
            <h2 className="text-lg font-semibold">Recent Activity</h2>
            <div className="mt-4 space-y-3 text-sm">
              {[
                "Approved reservation for John & Sarah.",
                "Updated Wagyu Smash Burger price.",
                "Accepted order #MO-58241.",
                "Exported weekly sales report.",
              ].map((activity) => (
                <div key={activity} className="profile-activity">
                  <span />
                  {activity}
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}

function ProfileMetric({ icon, value, label }: { icon: React.ReactElement; value: string; label: string }) {
  return (
    <div className="profile-metric">
      <span>{icon}</span>
      <strong>{value}</strong>
      <small>{label}</small>
    </div>
  );
}
