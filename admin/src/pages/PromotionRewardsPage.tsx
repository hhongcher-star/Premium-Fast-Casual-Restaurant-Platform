import {
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Copy,
  Edit,
  Filter,
  Gift,
  MoreHorizontal,
  Plus,
  Search,
  Star,
  Tag,
} from "lucide-react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const tabs = ["Promo Codes", "Discount Rules", "Rewards & Points", "Membership Tiers", "Redemption", "Settings"];

const stats = [
  { label: "Total Promotions", value: "12", note: "Active promotions", tone: "blue", icon: Tag },
  { label: "Total Redemptions", value: "1,248", note: "↑ 18.6% vs last 27 days", tone: "green", icon: Gift },
  { label: "Discount Given", value: "$3,245.50", note: "↑ 22.4% vs last 27 days", tone: "purple", icon: Tag },
  { label: "Revenue Generated", value: "$18,732.40", note: "↑ 26.7% vs last 27 days", tone: "orange", icon: Gift },
];

const promoCodes = [
  ["WELCOME10", "Percentage", "10% OFF", "Max $20", "243 / 500", 49, "May 1 - May 31, 2024", "5 days left", "Active"],
  ["FLAT15", "Fixed Amount", "$15 OFF", "Min $40", "186 / 300", 62, "May 1 - May 31, 2024", "5 days left", "Active"],
  ["PIZZA20", "Percentage", "20% OFF", "Max $30", "98 / 200", 49, "Apr 15 - May 27, 2024", "Expired", "Expired"],
  ["FREESHIP", "Free Shipping", "Free Delivery", "Min $25", "352 / ∞", 95, "Apr 1 - Jun 30, 2024", "34 days left", "Active"],
  ["BIRTHDAY25", "Percentage", "25% OFF", "Max $40", "67 / 100", 67, "May 1 - Dec 31, 2024", "218 days left", "Active"],
  ["SUMMER30", "Percentage", "30% OFF", "Max $50", "0 / 500", 0, "Jun 1 - Jun 30, 2024", "35 days left", "Scheduled"],
  ["STUDENT15", "Percentage", "15% OFF", "Max $25", "76 / 300", 25, "Mar 1 - May 31, 2024", "5 days left", "Active"],
];

const topPromos = [
  ["FREESHIP", "Free Shipping", "352", "$6,542.20", "purple"],
  ["WELCOME10", "10% OFF", "243", "$4,321.15", "blue"],
  ["FLAT15", "$15 OFF", "186", "$2,976.80", "green"],
  ["PIZZA20", "20% OFF", "98", "$2,134.45", "blue"],
  ["BIRTHDAY25", "25% OFF", "67", "$1,245.30", "blue"],
];

const usageData = [
  { day: "May 1", value: 150 },
  { day: "May 4", value: 190 },
  { day: "May 8", value: 280 },
  { day: "May 11", value: 240 },
  { day: "May 15", value: 412 },
  { day: "May 18", value: 350 },
  { day: "May 22", value: 260 },
  { day: "May 25", value: 240 },
  { day: "May 27", value: 380 },
];

export function PromotionRewardsPage() {
  return (
    <div id="promotions" className="space-y-5">
      <header className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <h1 className="text-[30px] font-semibold leading-tight tracking-normal">Promotion / Rewards</h1>
          <p className="mt-2 text-sm text-[#c6bbae]">
            Create and manage promotions, coupons, and reward programs.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="admin-toolbar-button">
            <CalendarDays size={17} />
            May 1 - May 27, 2024
            <ChevronDown size={15} />
          </button>
          <button className="admin-primary-button">
            <Plus size={18} />
            New Promotion
          </button>
        </div>
      </header>

      <nav className="flex gap-8 overflow-x-auto border-b border-white/10">
        {tabs.map((tab, index) => (
          <button key={tab} className={index === 0 ? "menu-tab menu-tab-active" : "menu-tab"}>
            {tab}
          </button>
        ))}
      </nav>

      <section className="grid gap-5 2xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-5">
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <article key={stat.label} className={`promo-stat promo-stat-${stat.tone}`}>
                  <span className="promo-stat-icon"><Icon size={21} /></span>
                  <div>
                    <p className="text-sm text-[#cfc6ba]">{stat.label}</p>
                    <strong className="mt-2 block text-2xl font-semibold">{stat.value}</strong>
                    <p className="mt-3 text-xs text-[#a79d91]">{stat.note}</p>
                  </div>
                </article>
              );
            })}
          </div>

          <article className="menu-table-card">
            <div className="flex flex-col gap-3 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
              <h2 className="text-xl font-semibold">Promo Codes</h2>
              <div className="grid gap-2 sm:grid-cols-[200px_120px_120px_76px]">
                <label className="menu-search h-10"><Search size={17} /><input placeholder="Search promo codes..." /></label>
                <button className="menu-select-button h-10">All Status <ChevronDown size={15} /></button>
                <button className="menu-select-button h-10">All Types <ChevronDown size={15} /></button>
                <button className="menu-filter-button h-10"><Filter size={16} />Filter</button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[780px] text-left text-sm">
                <thead className="border-b border-white/8 text-xs text-[#c0b5a8]">
                  <tr>
                    {["Code", "Type", "Discount", "Usage", "Valid Period", "Status", "Actions"].map((head) => (
                      <th key={head} className="px-5 py-4 font-medium">{head}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/8">
                  {promoCodes.map((code) => (
                    <tr key={code[0]} className="hover:bg-white/[0.025]">
                      <td className="px-4 py-4 font-medium">{code[0]}</td>
                      <td className="px-4 py-4"><PromoType label={String(code[1])} /></td>
                      <td className="px-4 py-4"><span className="block font-medium">{code[2]}</span><span className="text-xs text-[#a79d91]">{code[3]}</span></td>
                      <td className="px-4 py-4">
                        <span className="block text-xs text-[#d8d0c4]">{code[4]}</span>
                        <span className="promo-progress"><span style={{ width: `${code[5]}%` }} /></span>
                      </td>
                      <td className="px-4 py-4"><span className="block">{code[6]}</span><span className="text-xs text-[#a79d91]">{code[7]}</span></td>
                      <td className="px-4 py-4"><PromoStatus label={String(code[8])} /></td>
                      <td className="px-4 py-4">
                        <div className="flex gap-2">
                          <button className="menu-icon-button"><Edit size={15} /></button>
                          <button className="menu-icon-button"><Copy size={15} /></button>
                          <button className="menu-icon-button"><MoreHorizontal size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <footer className="flex items-center justify-between border-t border-white/8 px-5 py-3 text-sm text-[#c4baae]">
              <span>Showing 1 to 7 of 12 promotions</span>
              <div className="flex items-center gap-2">
                <button className="pagination-button"><ChevronLeft size={16} /></button>
                <button className="pagination-button pagination-active">1</button>
                <button className="pagination-button">2</button>
                <button className="pagination-button"><ChevronRight size={16} /></button>
              </div>
            </footer>
          </article>
        </div>

        <aside className="space-y-5">
          <section className="promo-side-card">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Top Performing Promotions</h2>
              <button className="menu-select-button h-9 text-xs">Last 27 days <ChevronDown size={14} /></button>
            </div>
            <div className="mt-5 grid grid-cols-[1fr_70px_82px] gap-2 text-xs text-[#a79d91]">
              <span />
              <span>Redemptions</span>
              <span>Revenue</span>
            </div>
            <div className="mt-3 space-y-4">
              {topPromos.map(([code, label, redemptions, revenue, tone], index) => (
                <div key={code} className="grid grid-cols-[20px_1fr_70px_82px] items-center gap-2">
                  <span className="text-sm text-[#d8d0c4]">{index + 1}</span>
                  <span>
                    <span className={`promo-rank-code promo-rank-${tone}`}>{code}</span>
                    <span className="mt-1 block text-xs text-[#a79d91]">{label}</span>
                  </span>
                  <strong className="font-medium">{redemptions}</strong>
                  <strong className="font-medium">{revenue}</strong>
                </div>
              ))}
            </div>
            <a href="#" className="mt-5 inline-flex items-center gap-2 text-sm text-[#d0c1a8]">View all reports <ChevronRight size={15} /></a>
          </section>

          <section className="promo-side-card">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Discount Usage Over Time</h2>
              <button className="menu-select-button h-9 text-xs">Last 27 days <ChevronDown size={14} /></button>
            </div>
            <div className="mt-5 h-[190px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={usageData} margin={{ left: -24, right: 0, top: 8, bottom: 0 }}>
                  <defs>
                    <linearGradient id="promoUsage" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f2a51d" stopOpacity={0.44} />
                      <stop offset="100%" stopColor="#f2a51d" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: "#9e9487", fontSize: 11 }} />
                  <YAxis tickLine={false} axisLine={false} tick={{ fill: "#9e9487", fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: "#171411", border: "1px solid #3b3329", borderRadius: 8 }} />
                  <Area type="monotone" dataKey="value" stroke="#f2a51d" strokeWidth={2.5} fill="url(#promoUsage)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className="promo-side-card">
            <h2 className="text-lg font-semibold">Quick Actions</h2>
            <div className="mt-4 grid grid-cols-3 gap-2">
              <QuickAction icon={<Tag size={24} />} title="Create Promo Code" note="Add new coupon" />
              <QuickAction icon={<Gift size={24} />} title="Create Discount Rule" note="Set auto discounts" />
              <QuickAction icon={<Star size={24} />} title="Manage Rewards" note="Points & redemptions" />
            </div>
          </section>
        </aside>
      </section>
    </div>
  );
}

function PromoType({ label }: { label: string }) {
  const lower = label.toLowerCase().replace(/\s+/g, "-");
  return <span className={`promo-type promo-type-${lower}`}>{label}</span>;
}

function PromoStatus({ label }: { label: string }) {
  const lower = label.toLowerCase();
  return <span className={`promo-status promo-status-${lower}`}>{label}</span>;
}

function QuickAction({ icon, title, note }: { icon: React.ReactNode; title: string; note: string }) {
  return (
    <button className="promo-quick-action">
      {icon}
      <span className="mt-3 block text-xs font-medium text-white">{title}</span>
      <span className="mt-1 block text-[11px] text-[#a79d91]">{note}</span>
    </button>
  );
}
