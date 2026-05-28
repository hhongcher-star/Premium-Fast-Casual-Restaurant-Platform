import {
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Edit,
  Filter,
  Mail,
  MoreHorizontal,
  Phone,
  Plus,
  Search,
  Users,
  X,
} from "lucide-react";

import restaurantImage from "@/assets/restaurant-interior.jpg";

const stats = [
  { label: "Total Reservations", value: "32", note: "Today", tone: "blue" },
  { label: "Seated", value: "18", note: "56%", tone: "green" },
  { label: "Pending", value: "11", note: "34%", tone: "orange" },
  { label: "Cancelled", value: "3", note: "9%", tone: "red" },
];

const reservations = [
  ["6:30 PM", "John & Sarah", "+351 912 345 678", "4", "Table 12", "Window", "Confirmed", "Anniversary"],
  ["7:00 PM", "Michael Brown", "+351 918 234 567", "2", "Table 8", "Indoor", "Pending", "Birthday"],
  ["7:30 PM", "Olivia Davis", "+351 917 753 951", "3", "Table 5", "Outdoor", "Seated", "High chair"],
  ["8:00 PM", "David Wilson", "+351 918 456 789", "5", "Table 15", "Window", "Pending", "Near the bar"],
  ["8:30 PM", "Emma & James", "+351 919 654 321", "6", "Table 2", "Outdoor", "Confirmed", "Vegetarian"],
  ["9:00 PM", "Lucas Martin", "+351 914 852 369", "2", "Table 9", "Indoor", "Completed", "-"],
  ["9:30 PM", "Sophia Anderson", "+351 912 645 890", "4", "Table 7", "Indoor", "Cancelled", "Customer cancelled"],
  ["10:00 PM", "Walk-in", "-", "2", "Table 10", "Indoor", "Seated", "Walk-in"],
];

const tables = [
  [11, "green"], [12, "orange"], [13, "green"],
  [5, "blue"], [6, "blue"], [7, "blue"],
  [1, "green"], [2, "blue"], [3, "green"], [4, "green"],
  [8, "blue"], [9, "blue"], [10, "blue"],
];

export function ReservationManagerPage() {
  return (
    <div id="reservations" className="space-y-6">
      <header className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <h1 className="text-[30px] font-semibold leading-tight tracking-normal">Reservation Manager</h1>
          <p className="mt-2 text-sm text-[#c6bbae]">Manage table reservations and seating.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="admin-toolbar-button"><CalendarDays size={17} />May 27, 2024 <ChevronDown size={15} /></button>
          <button className="admin-toolbar-button">Today</button>
          <button className="admin-toolbar-button"><Clock size={17} />Block Time</button>
          <button className="admin-primary-button"><Plus size={18} />New Reservation</button>
        </div>
      </header>

      <section className="grid gap-4 2xl:grid-cols-[minmax(0,1fr)_315px]">
        <div className="space-y-5">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <article key={stat.label} className={`reservation-stat reservation-stat-${stat.tone}`}>
                <span className="reservation-stat-icon"><CalendarDays size={20} /></span>
                <div>
                  <p className="text-sm text-[#d6cec2]">{stat.label}</p>
                  <strong className="mt-1 block text-3xl font-semibold">{stat.value}</strong>
                  <p className="mt-2 text-sm text-[#d6cec2]">{stat.note}</p>
                </div>
                <span className="reservation-spark" />
              </article>
            ))}
          </div>

          <article className="menu-table-card">
            <div className="flex flex-col gap-3 border-b border-white/10 px-4 py-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap gap-5">
                {["All", "Pending", "Confirmed", "Seated", "Completed", "Cancelled", "No-show"].map((tab, index) => (
                  <button key={tab} className={index === 0 ? "menu-tab menu-tab-active h-10" : "menu-tab h-10"}>{tab}</button>
                ))}
              </div>
              <div className="flex gap-2">
                <label className="menu-search h-10 w-[250px]"><Search size={17} /><input placeholder="Search name, phone, email..." /></label>
                <button className="menu-filter-button h-10"><Filter size={16} />Filter</button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[780px] text-left text-sm">
                <thead className="border-b border-white/8 text-xs text-[#c0b5a8]">
                  <tr>
                    {["Time", "Customer", "Party Size", "Table", "Status", "Notes", "Actions"].map((h) => (
                      <th key={h} className="px-4 py-4 font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/8">
                  {reservations.map((row, index) => (
                    <tr key={`${row[0]}-${row[1]}`} className={index === 0 ? "selected-order-row" : "hover:bg-white/[0.025]"}>
                      <td className="px-4 py-3 font-medium">{row[0]}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <span className="grid size-10 place-items-center rounded-full bg-[#d8c4aa] text-[#15120e]"><Users size={18} /></span>
                          <span><span className="block font-medium">{row[1]}</span><span className="text-xs text-[#a79d91]">{row[2]}</span></span>
                        </div>
                      </td>
                      <td className="px-4 py-3"><span className="inline-flex items-center gap-2 rounded-lg bg-white/[0.06] px-3 py-2"><Users size={15} />{row[3]}</span></td>
                      <td className="px-4 py-3"><span className="block font-medium">{row[4]}</span><span className="text-xs text-[#a79d91]">{row[5]}</span></td>
                      <td className="px-4 py-3"><ReservationStatus label={row[6]} /></td>
                      <td className="px-4 py-3 text-[#d8d0c4]">{row[7]}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button className="reservation-action approve"><Check size={16} /></button>
                          {(row[6] === "Pending" || row[6] === "Confirmed") && <button className="reservation-action reject"><X size={16} /></button>}
                          <button className="menu-icon-button"><MoreHorizontal size={17} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <footer className="flex items-center justify-between border-t border-white/8 px-5 py-3 text-sm text-[#c4baae]">
              <span>Showing 1 to 8 of 32 reservations</span>
              <div className="flex items-center gap-2">
                <button className="pagination-button"><ChevronLeft size={16} /></button>
                <button className="pagination-button pagination-active">1</button>
                <button className="pagination-button">2</button>
                <button className="pagination-button">3</button>
                <button className="pagination-button">4</button>
                <button className="pagination-button"><ChevronRight size={16} /></button>
              </div>
            </footer>
          </article>
        </div>

        <aside className="sticky top-6 max-h-[calc(100vh-110px)] space-y-4 overflow-y-auto pr-1">
          <section className="reservation-side-card">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Restaurant Floor Plan</h2>
              <button className="menu-filter-button h-9">Switch View</button>
            </div>
            <div className="mt-4 flex flex-wrap gap-3 text-xs text-[#c8bfb3]">
              {["All", "Indoor", "Outdoor", "Bar", "Unavailable"].map((item) => <span key={item}>• {item}</span>)}
            </div>
            <div className="floor-plan mt-4">
              {tables.map(([num, tone]) => <button key={num} className={`floor-table floor-table-${tone}`}>{num}</button>)}
              <div className="bar-tables"><span>B1</span><span>B2</span></div>
            </div>
          </section>

          <section className="reservation-side-card p-4">
            <div className="flex items-start gap-3">
              <span className="grid size-14 place-items-center rounded-full bg-[#d8c4aa] text-[#15120e]"><Users size={24} /></span>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-lg font-semibold">John & Sarah</h2>
                  <ReservationStatus label="Confirmed" />
                </div>
                <p className="mt-2 text-sm text-[#c4baae]">May 27, 2024 • 6:30 PM</p>
              </div>
            </div>

            <div className="mt-5 space-y-3 text-sm">
              <p className="flex items-center gap-3"><CalendarDays size={16} />Party Size: 4 people</p>
              <p className="flex items-center gap-3"><Phone size={16} />+351 912 345 678</p>
              <p className="flex items-center gap-3"><Mail size={16} />john.doe@email.com</p>
              <p className="flex items-center gap-3"><CalendarDays size={16} />Anniversary dinner - window seat preferred</p>
            </div>

            <div className="mt-4 grid grid-cols-[1fr_92px] gap-3 border-t border-white/8 pt-4">
              <div>
                <h3 className="font-semibold">Table 12 <span className="text-[#c4baae]">(Window)</span></h3>
                <p className="mt-2 text-sm">4 seats</p>
                <p className="mt-2 text-sm text-[#c4baae]">Location: Near the windows</p>
              </div>
              <img
                src={restaurantImage}
                alt="Table preview"
                className="h-[78px] w-full rounded-lg object-cover"
              />
            </div>

            <div className="reservation-detail-actions mt-4 grid grid-cols-3 gap-2">
              <button className="order-accept-button"><Users size={16} />Seat Now</button>
              <button className="admin-primary-button min-w-0"><Edit size={16} />Edit</button>
              <button className="order-danger-button"><X size={16} />Cancel</button>
            </div>
          </section>
        </aside>
      </section>
    </div>
  );
}

function ReservationStatus({ label }: { label: string }) {
  const className = {
    Confirmed: "reservation-status-confirmed",
    Pending: "reservation-status-pending",
    Seated: "reservation-status-seated",
    Completed: "reservation-status-completed",
    Cancelled: "reservation-status-cancelled",
  }[label] ?? "";

  return <span className={`reservation-status ${className}`}>● {label}</span>;
}
