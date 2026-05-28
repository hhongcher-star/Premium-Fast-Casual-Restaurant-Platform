import {
  BarChart3,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  Clock,
  Download,
  Gift,
  Info,
  Settings,
  Users,
  Utensils,
  WalletCards,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import burgerImage from "@/assets/dish-burger.jpg";
import pizzaImage from "@/assets/dish-pizza.jpg";
import pastaImage from "@/assets/pizza.jpg";
import lemonadeImage from "@/assets/burger.jpg";

const metrics = [
  { label: "Total Revenue", value: "$18,750.80", note: "↑ 14.6% vs May 13 - May 19", icon: WalletCards, tone: "orange" },
  { label: "Total Orders", value: "482", note: "↑ 8.3% vs May 13 - May 19", icon: BarChart3, tone: "red" },
  { label: "Average Order Value", value: "$38.92", note: "↑ 6.7% vs May 13 - May 19", icon: WalletCards, tone: "purple" },
  { label: "Repeat Customer Rate", value: "34.2%", note: "↑ 5.1% vs May 13 - May 19", icon: Users, tone: "green" },
  { label: "Average Prep Time", value: "18m 24s", note: "↑ 1m 52s vs May 13 - May 19", icon: Clock, tone: "orange" },
];

const revenue = [
  { day: "May 20", value: 9000 },
  { day: "May 21", value: 11500 },
  { day: "May 22", value: 15800 },
  { day: "May 23", value: 12800 },
  { day: "May 24", value: 18100 },
  { day: "May 25", value: 21200 },
  { day: "May 26", value: 20700 },
  { day: "May 27", value: 13000 },
];

const categories = [
  { name: "Burgers", value: 6235.4, percent: "33.2%", color: "#ef3f32" },
  { name: "Pizzas", value: 4580.2, percent: "24.4%", color: "#f2a51d" },
  { name: "Pasta", value: 3225.1, percent: "17.2%", color: "#7da84a" },
  { name: "Drinks", value: 2152.4, percent: "11.5%", color: "#5f7d36" },
  { name: "Desserts", value: 1285.7, percent: "6.8%", color: "#8b4fc7" },
  { name: "Others", value: 1072.0, percent: "5.7%", color: "#9c9c9c" },
];

const menuItems = [
  ["Wagyu Smash Burger", "Burgers", "168", "$2,907.60", "15.5%", burgerImage, "#ef3f32"],
  ["Truffle Pizza", "Pizzas", "124", "$2,356.80", "12.6%", pizzaImage, "#f2a51d"],
  ["Carbonara Pasta", "Pasta", "98", "$1,568.20", "8.4%", pastaImage, "#7da84a"],
  ["Spicy Chicken Burger", "Burgers", "87", "$1,419.30", "7.6%", burgerImage, "#ef3f32"],
  ["Fresh Lemonade", "Drinks", "156", "$1,248.00", "6.7%", lemonadeImage, "#8b4fc7"],
];

const promotions = [
  ["WELCOME10", "245", "$2,450.00"],
  ["PIZZA20", "184", "$1,840.00"],
  ["FREEDESSERT", "132", "$1,056.00"],
  ["WEEKEND15", "98", "$735.00"],
  ["LOYAL5", "76", "$380.00"],
];

const heatmap = [
  [1, 1, 2, 2, 3, 4, 5, 4, 3, 2, 1],
  [1, 1, 2, 3, 4, 5, 6, 5, 4, 3, 2],
  [2, 2, 3, 4, 6, 7, 7, 6, 5, 3, 2],
  [2, 3, 4, 6, 8, 9, 9, 8, 7, 5, 4],
  [3, 4, 5, 7, 9, 10, 10, 9, 8, 7, 6],
  [2, 3, 4, 6, 8, 9, 9, 8, 7, 5, 4],
  [1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3],
];

export function ReportsAnalyticsPage() {
  return (
    <div id="reports" className="space-y-5">
      <header className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <h1 className="text-[30px] font-semibold leading-tight tracking-normal">Reports & Analytics</h1>
          <p className="mt-2 text-sm text-[#c6bbae]">Track performance and make data-driven decisions.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="admin-toolbar-button"><CalendarDays size={16} />May 20 - May 27, 2024 <ChevronDown size={14} /></button>
          <button className="admin-toolbar-button">Compare: Previous 7 Days <ChevronDown size={14} /></button>
          <button className="admin-toolbar-button"><Download size={16} />Export</button>
        </div>
      </header>

      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <article key={metric.label} className={`report-metric report-${metric.tone}`}>
              <span className="report-metric-icon"><Icon size={22} /></span>
              <div>
                <p className="text-xs text-[#cfc6ba]">{metric.label}</p>
                <strong className="mt-2 block text-2xl font-semibold">{metric.value}</strong>
                <p className="mt-2 text-xs text-[#8fcf4d]">{metric.note}</p>
              </div>
            </article>
          );
        })}
      </section>

      <section className="grid gap-5 2xl:grid-cols-[minmax(0,1fr)_425px]">
        <div className="space-y-5">
          <article className="report-card overflow-hidden">
            <nav className="flex gap-8 overflow-x-auto border-b border-white/10 px-4">
              {["Overview", "Sales", "Menu Performance", "Peak Hours", "Promotions", "Customers", "Reservations"].map((tab, index) => (
                <button key={tab} className={index === 0 ? "menu-tab menu-tab-active h-10" : "menu-tab h-10"}>{tab}</button>
              ))}
            </nav>
            <div className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="flex items-center gap-2 text-lg font-semibold">Revenue Overview <Info size={14} /></h2>
                  <p className="mt-3 text-2xl font-semibold">$18,750.80 <span className="ml-2 text-sm font-normal text-[#8fcf4d]">↑ 14.6% <span className="text-[#a79d91]">vs May 13 - May 19</span></span></p>
                </div>
                <button className="menu-select-button h-9 w-[86px] text-xs">Daily <ChevronDown size={14} /></button>
              </div>
              <div className="mt-4 h-[245px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenue} margin={{ left: -16, right: 4, top: 8, bottom: 0 }}>
                    <defs>
                      <linearGradient id="reportRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f2a51d" stopOpacity={0.42} />
                        <stop offset="100%" stopColor="#f2a51d" stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: "#9e9487", fontSize: 11 }} />
                    <YAxis tickFormatter={(v) => `$${Number(v) / 1000}K`} tickLine={false} axisLine={false} tick={{ fill: "#9e9487", fontSize: 11 }} />
                    <Tooltip contentStyle={{ background: "#171411", border: "1px solid #3b3329", borderRadius: 8 }} />
                    <Area type="monotone" dataKey="value" stroke="#f2a51d" strokeWidth={2.5} fill="url(#reportRevenue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </article>

          <div className="grid gap-5 xl:grid-cols-[1.15fr_0.9fr]">
            <article className="report-card p-4">
              <h2 className="text-lg font-semibold">Top Performing Menu Items</h2>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[560px] text-left text-xs">
                  <thead className="text-[#a79d91]">
                    <tr>
                      {["#", "Menu Item", "Category", "Quantity Sold", "Revenue", "% of Sales"].map((h) => <th key={h} className="py-3 font-medium">{h}</th>)}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/8">
                    {menuItems.map((item, index) => (
                      <tr key={item[0]}>
                        <td className="py-3">{index + 1}</td>
                        <td className="py-3">
                          <span className="flex items-center gap-2"><img src={item[5]} alt="" className="size-8 rounded-md object-cover" />{item[0]}</span>
                        </td>
                        <td>{item[1]}</td>
                        <td>{item[2]}</td>
                        <td>{item[3]}</td>
                        <td><span>{item[4]}</span><span className="report-bar"><span style={{ width: item[4], background: item[6] }} /></span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <ReportLink label="View all menu performance" />
            </article>

            <article className="report-card p-4">
              <h2 className="flex items-center gap-2 text-lg font-semibold">Sales Heatmap <span className="text-sm font-normal text-[#c6bbae]">(by Day & Hour)</span> <Info size={14} /></h2>
              <div className="mt-4 grid grid-cols-[34px_1fr] gap-3 text-xs">
                <div />
                <div className="grid grid-cols-6 text-[#d8d0c4]"><span>11 AM</span><span>1 PM</span><span>3 PM</span><span>5 PM</span><span>7 PM</span><span>9 PM</span></div>
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, row) => (
                  <div key={day} className="contents">
                    <span className="py-1">{day}</span>
                    <div className="grid grid-cols-11 gap-1">
                      {heatmap[row].map((level, col) => <span key={`${row}-${col}`} className={`heat heat-${level}`} />)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-[#c6bbae]"><span>Low Sales</span><span className="heat-scale" /><span>High Sales</span></div>
            </article>
          </div>

          <section className="report-card p-4">
            <h2 className="text-lg font-semibold">Quick Reports</h2>
            <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              <QuickReport icon={<BarChart3 />} title="Sales Summary" note="Overview of sales" tone="red" />
              <QuickReport icon={<Utensils />} title="Menu Report" note="Item performance" tone="orange" />
              <QuickReport icon={<Users />} title="Customer Report" note="Customer analytics" tone="green" />
              <QuickReport icon={<CalendarDays />} title="Reservation Report" note="Booking analytics" tone="purple" />
            </div>
          </section>
        </div>

        <aside className="space-y-4">
          <section className="report-card p-4">
            <h2 className="text-lg font-semibold">Sales by Category</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-[180px_1fr] 2xl:grid-cols-1">
              <div className="relative h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={categories} dataKey="value" innerRadius={58} outerRadius={84}>
                      {categories.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 grid place-items-center text-center">
                  <span><strong className="block text-lg">$18,750.80</strong><span className="text-xs text-[#c6bbae]">Total</span></span>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                {categories.map((cat) => (
                  <div key={cat.name} className="grid grid-cols-[1fr_auto_44px] gap-3">
                    <span className="flex items-center gap-2"><span className="size-3 rounded-full" style={{ background: cat.color }} />{cat.name}</span>
                    <span>${cat.value.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                    <span className="text-[#a79d91]">{cat.percent}</span>
                  </div>
                ))}
              </div>
            </div>
            <ReportLink label="View full breakdown" />
          </section>

          <section className="report-card p-4">
            <h2 className="text-lg font-semibold">Promotion Performance</h2>
            <table className="mt-4 w-full text-left text-xs">
              <thead className="text-[#a79d91]"><tr><th className="py-2 font-medium">Promotion</th><th className="font-medium">Redemptions</th><th className="text-right font-medium">Revenue Generated</th></tr></thead>
              <tbody className="divide-y divide-white/8">
                {promotions.map((row) => <tr key={row[0]}><td className="py-3">{row[0]}</td><td>{row[1]}</td><td className="text-right">{row[2]}</td></tr>)}
              </tbody>
            </table>
            <ReportLink label="View all promotions" />
          </section>

          <section className="report-card p-4">
            <h2 className="text-lg font-semibold">Insights</h2>
            <div className="mt-3 space-y-3 text-sm">
              <p>🟢 Revenue increased by <strong>14.6%</strong> compared to the previous 7 days.</p>
              <p>🟡 Friday was your highest revenue day ($3,245.60).</p>
              <p>🟣 Wagyu Smash Burger is your top performer this week.</p>
            </div>
            <ReportLink label="View full insights report" />
          </section>

          <section className="report-card p-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between 2xl:flex-col 2xl:items-stretch">
              <div>
                <h2 className="text-lg font-semibold">Custom Report Builder</h2>
                <p className="mt-2 text-sm text-[#c6bbae]">Build and export custom reports with the data that matters most to you.</p>
              </div>
              <button className="admin-primary-button min-w-0"><Settings size={17} />Create Custom Report</button>
            </div>
          </section>
        </aside>
      </section>
    </div>
  );
}

function ReportLink({ label }: { label: string }) {
  return <a href="#" className="mt-4 inline-flex items-center gap-2 text-sm text-[#f2a51d]">{label}<ChevronRight size={15} /></a>;
}

function QuickReport({ icon, title, note, tone }: { icon: React.ReactElement; title: string; note: string; tone: string }) {
  return (
    <button className={`quick-report quick-report-${tone}`}>
      <span>{icon}</span>
      <span><strong>{title}</strong><small>{note}</small></span>
    </button>
  );
}
