import {
  Bell,
  Box,
  BriefcaseBusiness,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  Clock3,
  Download,
  DollarSign,
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

const revenueData = [
  { time: "12 AM", value: 0 },
  { time: "2 AM", value: 120 },
  { time: "4 AM", value: 180 },
  { time: "6 AM", value: 290 },
  { time: "8 AM", value: 380 },
  { time: "10 AM", value: 520 },
  { time: "12 PM", value: 680 },
  { time: "2 PM", value: 860 },
  { time: "4 PM", value: 982 },
  { time: "6 PM", value: 900 },
  { time: "8 PM", value: 940 },
  { time: "10 PM", value: 1040 },
  { time: "12 AM", value: 1100 },
];

const orderStatus = [
  { name: "New", value: 28, color: "#ef512f" },
  { name: "Preparing", value: 45, color: "#f5a623" },
  { name: "Ready", value: 32, color: "#83a94a" },
  { name: "On the way", value: 18, color: "#6d8f3e" },
  { name: "Completed", value: 5, color: "#777777" },
];

const metricCards = [
  { title: "Today's Orders", value: "128", note: "18% vs yesterday", tone: "orange", icon: BriefcaseBusiness },
  { title: "Today's Reservations", value: "32", note: "6% vs yesterday", tone: "green", icon: CalendarDays },
  { title: "Today's Revenue", value: "$4,982.45", note: "22% vs yesterday", tone: "yellow", icon: DollarSign },
  { title: "Avg. Prep Time", value: "18m 24s", note: "4m vs yesterday", tone: "red", icon: Clock3 },
  { title: "Low Stock Items", value: "7", note: "View details", tone: "crimson", icon: Box },
];

const topItems = [
  ["Wagyu Smash Burger", "58 sold", "$1,392.00", "🍔"],
  ["Truffle Pasta", "42 sold", "$882.00", "🍝"],
  ["Margherita Pizza", "38 sold", "$722.00", "🍕"],
  ["Quinoa Salad", "26 sold", "$468.00", "🥗"],
  ["Tiramisu", "24 sold", "$360.00", "🍰"],
];

const recentOrders = [
  ["MO-58241", "Sofia Andersen", "2 items", "Preparing", "2:15 PM", "$46.00"],
  ["MO-58240", "James Wilson", "3 items", "New", "2:12 PM", "$67.50"],
  ["MO-58239", "Maria Santos", "1 item", "On the way", "2:08 PM", "$24.00"],
  ["MO-58238", "David Lee", "4 items", "Ready", "2:05 PM", "$89.00"],
  ["MO-58237", "Emma Brown", "2 items", "Completed", "1:55 PM", "$36.50"],
];

const reservations = [
  ["6:00 PM", "John & Sarah", "4 people", "Confirmed"],
  ["6:30 PM", "Michael Brown", "2 people", "Confirmed"],
  ["7:00 PM", "Emma & James", "6 people", "Seated"],
  ["7:30 PM", "Olivia Davis", "3 people", "Confirmed"],
  ["8:00 PM", "Daniel Wilson", "5 people", "Pending"],
];

const lowStock = [
  ["🥩", "Wagyu Beef Patty", "3 left"],
  ["🥯", "Brioche Bun", "5 left"],
  ["🍾", "Truffle Oil", "2 left"],
  ["🧀", "Mozzarella Cheese", "4 left"],
  ["🌿", "Fresh Basil", "6 left"],
  ["🧀", "Parmesan Cheese", "3 left"],
  ["🍅", "Cherry Tomatoes", "4 left"],
];

export function DashboardPage() {
  return (
    <div id="dashboard" className="space-y-6">
      <header className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <h1 className="font-display text-[26px] font-semibold leading-tight tracking-normal text-white">
            Good morning, Tiago!
          </h1>
          <p className="mt-0.5 text-sm text-[#b9b0a4]">Here's what's happening at your restaurant today.</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="admin-toolbar-button min-w-[190px]">
            <CalendarDays size={18} />
            <span>May 27, 2024</span>
            <ChevronDown size={16} />
          </button>
          <button className="admin-icon-button relative">
            <Bell size={19} />
            <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-[#d53235] text-[11px] font-bold">
              3
            </span>
          </button>
          <button className="admin-toolbar-button">
            <Download size={18} />
            <span>Export Report</span>
          </button>
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {metricCards.map((card) => {
          const Icon = card.icon;

          return (
            <article key={card.title} className={`admin-card metric-card metric-${card.tone}`}>
              <div className="flex items-center gap-4">
                <span className="metric-icon">
                  <Icon size={20} />
                </span>
                <div>
                  <p className="text-xs text-[#c6beb1]">{card.title}</p>
                  <strong className="mt-1 block text-[25px] font-semibold leading-none text-white">{card.value}</strong>
                  <p className="mt-2 text-xs text-[#b9b0a4]">{card.note}</p>
                </div>
              </div>
              <div className="metric-sparkline" />
            </article>
          );
        })}
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.6fr_1fr_1.05fr]">
        <article className="admin-card p-5">
          <PanelTitle title="Revenue Overview" action="Today" />
          <div className="mt-4 flex items-end gap-3">
            <strong className="text-[28px] font-semibold text-[#d3cdc4]">$4,982.45</strong>
            <span className="text-sm text-[#87a94d]">↑ 22% vs yesterday</span>
          </div>
          <div className="mt-4 h-[215px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ left: -18, right: 0, top: 10, bottom: 0 }}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ef9b17" stopOpacity={0.48} />
                    <stop offset="100%" stopColor="#ef9b17" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" tickLine={false} axisLine={false} tick={{ fill: "#9e9487", fontSize: 12 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: "#9e9487", fontSize: 12 }} />
                <Tooltip contentStyle={{ background: "#171411", border: "1px solid #3b3329", borderRadius: 8 }} />
                <Area type="monotone" dataKey="value" stroke="#efa21a" strokeWidth={3} fill="url(#revenueGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className="admin-card p-5">
          <PanelTitle title="Orders by Status" action="Today" />
          <div className="mt-5 grid gap-4 sm:grid-cols-[165px_1fr] xl:grid-cols-1 2xl:grid-cols-[165px_1fr]">
            <div className="relative h-[165px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={orderStatus} dataKey="value" innerRadius={54} outerRadius={78} paddingAngle={0}>
                    {orderStatus.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 grid place-items-center text-center">
                <span>
                  <strong className="block text-[28px] font-semibold">128</strong>
                  <span className="text-sm text-[#b9b0a4]">Total</span>
                </span>
              </div>
            </div>
            <div className="space-y-3">
              {orderStatus.map((status) => (
                <div key={status.name} className="flex items-start gap-3 text-sm">
                  <span className="mt-1 size-3 rounded-full" style={{ background: status.color }} />
                  <div>
                    <p>{status.name}</p>
                    <p className="text-[#9f9588]">{status.value} ({Math.round((status.value / 128) * 100)}%)</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <TextLink label="View all orders" />
        </article>

        <article className="admin-card p-5">
          <PanelTitle title="Top Selling Items" action="Today" />
          <div className="mt-5 space-y-4">
            {topItems.map(([name, sold, amount, emoji], index) => (
              <div key={name} className="grid grid-cols-[18px_44px_1fr_auto] items-center gap-3">
                <span className="text-[#d7cdbf]">{index + 1}</span>
                <span className="grid size-10 place-items-center rounded-lg bg-white/10 text-xl">{emoji}</span>
                <span>
                  <span className="block text-sm font-medium">{name}</span>
                  <span className="block text-xs text-[#9f9588]">{sold}</span>
                </span>
                <strong className="text-sm font-medium">{amount}</strong>
              </div>
            ))}
          </div>
          <TextLink label="View full report" />
        </article>
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.6fr_1fr_1.05fr]">
        <TablePanel title="Recent Orders" action="View all" columns={["Order ID", "Customer", "Items", "Status", "Time", "Amount"]} rows={recentOrders} />
        <TablePanel title="Upcoming Reservations" action="View all" columns={["Time", "Name", "Party Size", "Status"]} rows={reservations} />
        <article className="admin-card p-5">
          <PanelTitle title="Low Stock Alerts" action="View all" compact />
          <div className="mt-5 space-y-4">
            {lowStock.map(([emoji, name, count]) => (
              <div key={name} className="flex items-center gap-4">
                <span className="text-2xl">{emoji}</span>
                <span className="flex-1 text-sm">{name}</span>
                <span className="text-sm font-medium text-[#ef514c]">{count}</span>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}

function PanelTitle({ title, action, compact = false }: { title: string; action: string; compact?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <h2 className={`${compact ? "text-base" : "text-lg"} font-semibold tracking-normal`}>{title}</h2>
      <button className="admin-panel-action">
        {action}
        {!compact && <ChevronDown size={14} />}
      </button>
    </div>
  );
}

function TextLink({ label }: { label: string }) {
  return (
    <a href="#" className="mt-6 inline-flex items-center gap-2 text-sm text-[#d0c1a8] hover:text-white">
      {label}
      <ChevronRight size={16} />
    </a>
  );
}

function TablePanel({ title, action, columns, rows }: { title: string; action: string; columns: string[]; rows: string[][] }) {
  return (
    <article className="admin-card overflow-hidden p-5">
      <PanelTitle title={title} action={action} compact />
      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="text-xs text-[#b8aa95]">
            <tr>
              {columns.map((column) => (
                <th key={column} className="pb-4 font-medium">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/7 text-[#d8d2c9]">
            {rows.map((row) => (
              <tr key={row.join("-")}>
                {row.map((cell, index) => (
                  <td key={`${cell}-${index}`} className="py-3">
                    {index === 3 ? <StatusBadge label={cell} /> : cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
}

function StatusBadge({ label }: { label: string }) {
  const isWarm = label === "Preparing" || label === "New" || label === "Pending" || label === "Seated";
  const isDone = label === "Completed";

  return (
    <span
      className={[
        "inline-flex rounded-md px-2.5 py-1 text-xs",
        isDone
          ? "bg-white/12 text-[#ddd6ca]"
          : isWarm
            ? "bg-[#5c330e] text-[#f0a328]"
            : "bg-[#253615] text-[#9fbe62]",
      ].join(" ")}
    >
      {label}
    </span>
  );
}
