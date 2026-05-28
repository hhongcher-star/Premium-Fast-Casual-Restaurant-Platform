import {
  Bike,
  CalendarDays,
  Check,
  ChefHat,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  CreditCard,
  Download,
  Filter,
  Gift,
  MapPin,
  MessageSquare,
  MoreHorizontal,
  PackageCheck,
  Phone,
  Search,
  ShoppingBag,
  Trash2,
  X,
} from "lucide-react";

import burgerImage from "@/assets/dish-burger.jpg";
import pastaImage from "@/assets/pizza.jpg";
import lemonadeImage from "@/assets/burger.jpg";

const stats = [
  { label: "All Orders", value: "128", note: "View all orders", icon: ClipboardList, tone: "orange" },
  { label: "New", value: "28", note: "Need to accept", icon: Gift, tone: "red" },
  { label: "Preparing", value: "45", note: "In progress", icon: ShoppingBag, tone: "orange" },
  { label: "Ready", value: "20", note: "Ready for pickup", icon: PackageCheck, tone: "green" },
  { label: "On the way", value: "18", note: "Out for delivery", icon: Bike, tone: "green" },
  { label: "Completed", value: "96", note: "Completed today", icon: Check, tone: "muted" },
];

const orders = [
  ["MO-58241", "Sofia Andersen", "+351 912 345 678", "Delivery", "New", "2:15 PM", "2 min ago", "$46.00", "Visa 4242"],
  ["MO-58240", "James Wilson", "+351 913 234 567", "Takeaway", "Preparing", "2:12 PM", "5 min ago", "$67.50", "Mastercard 5555"],
  ["MO-58239", "Maria Santos", "+351 914 123 456", "Delivery", "Ready", "2:08 PM", "9 min ago", "$24.00", "Visa 4242"],
  ["MO-58238", "David Lee", "+351 915 987 654", "Dine-in", "On the way", "2:05 PM", "12 min ago", "$89.00", "Cash"],
  ["MO-58237", "Emma Brown", "+351 916 852 369", "Delivery", "Completed", "1:55 PM", "22 min ago", "$36.50", "Visa 4242"],
  ["MO-58236", "Olivia Davis", "+351 917 753 951", "Takeaway", "Cancelled", "1:45 PM", "32 min ago", "$19.00", "Mastercard 5555"],
  ["MO-58235", "Daniel Wilson", "+351 918 456 789", "Dine-in", "Preparing", "1:35 PM", "42 min ago", "$52.00", "Visa 4242"],
  ["MO-58234", "Lucas Martin", "+351 919 654 321", "Delivery", "Completed", "1:25 PM", "52 min ago", "$33.00", "Cash"],
];

const detailItems = [
  ["Wagyu Smash Burger", "Regular", "$24.00", burgerImage],
  ["Truffle Pasta", "Regular", "$18.00", pastaImage],
  ["Fresh Lemonade", "", "$4.00", lemonadeImage],
];

export function OrderManagerPage() {
  return (
    <div id="orders" className="space-y-6">
      <header className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <h1 className="font-display text-[32px] font-semibold leading-tight tracking-normal">Order Manager</h1>
          <p className="mt-2 text-sm text-[#c6bbae]">View and manage all customer orders.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="admin-toolbar-button">
            <CalendarDays size={17} />
            <span>May 27, 2024</span>
            <ChevronDown size={15} />
          </button>
          <button className="admin-toolbar-button">
            <Filter size={17} />
            <span>Filter</span>
            <ChevronDown size={15} />
          </button>
          <button className="admin-primary-button">
            <Download size={17} />
            <span>Export Orders</span>
          </button>
        </div>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <article key={stat.label} className={`order-stat order-stat-${stat.tone}`}>
              <span className="order-stat-icon">
                <Icon size={18} />
              </span>
              <div>
                <p className="text-xs text-[#c8bfb3]">{stat.label}</p>
                <strong className="mt-2 block text-2xl font-semibold">{stat.value}</strong>
                <p className="mt-2 text-xs text-[#a79d91]">{stat.note}</p>
              </div>
            </article>
          );
        })}
      </section>

      <section className="grid gap-5 xl:grid-cols-[1fr_325px]">
        <article className="menu-table-card">
          <div className="flex flex-col gap-4 border-b border-white/10 px-4 py-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex gap-7">
              {["All Orders", "Dine-in", "Takeaway", "Delivery"].map((tab, index) => (
                <button key={tab} className={index === 0 ? "menu-tab menu-tab-active h-10" : "menu-tab h-10"}>
                  {tab}
                </button>
              ))}
            </div>
            <label className="menu-search h-11 w-full lg:max-w-[360px]">
              <Search size={18} />
              <input type="search" placeholder="Search by order ID, customer, phone..." />
            </label>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left text-sm">
              <thead className="border-b border-white/8 text-xs text-[#c0b5a8]">
                <tr>
                  <th className="w-10 px-5 py-4"><span className="order-checkbox" /></th>
                  <th className="px-3 py-4 font-medium">Order ID</th>
                  <th className="px-3 py-4 font-medium">Customer</th>
                  <th className="px-3 py-4 font-medium">Type</th>
                  <th className="px-3 py-4 font-medium">Status</th>
                  <th className="px-3 py-4 font-medium">Time</th>
                  <th className="px-3 py-4 font-medium">Total</th>
                  <th className="px-3 py-4 font-medium">Payment</th>
                  <th className="px-5 py-4 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/8">
                {orders.map((order, index) => (
                  <tr key={order[0]} className={index === 0 ? "selected-order-row" : "hover:bg-white/[0.025]"}>
                    <td className="px-5 py-3">
                      <span className={index === 0 ? "order-checkbox order-checkbox-active" : "order-checkbox"}>
                        {index === 0 && <Check size={13} />}
                      </span>
                    </td>
                    <td className="px-3 py-3">{order[0]}</td>
                    <td className="px-3 py-3">
                      <span className="block font-medium">{order[1]}</span>
                      <span className="text-xs text-[#a79d91]">{order[2]}</span>
                    </td>
                    <td className="px-3 py-3">
                      <span className="inline-flex items-center gap-2"><ShoppingBag size={15} />{order[3]}</span>
                    </td>
                    <td className="px-3 py-3"><OrderStatus label={order[4]} /></td>
                    <td className="px-3 py-3">
                      <span className="block">{order[5]}</span>
                      <span className="text-xs text-[#a79d91]">{order[6]}</span>
                    </td>
                    <td className="px-3 py-3 font-medium">{order[7]}</td>
                    <td className="px-3 py-3"><span className="inline-flex items-center gap-2"><CreditCard size={15} />{order[8]}</span></td>
                    <td className="px-5 py-3 text-right">
                      <button className="menu-icon-button"><MoreHorizontal size={17} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <footer className="flex items-center justify-between border-t border-white/8 px-5 py-3 text-sm text-[#c4baae]">
            <span>Showing 1 to 8 of 128 orders</span>
            <div className="flex items-center gap-2">
              <button className="pagination-button"><ChevronLeft size={16} /></button>
              <button className="pagination-button pagination-active">1</button>
              <button className="pagination-button">2</button>
              <button className="pagination-button">3</button>
              <button className="pagination-button">4</button>
              <span className="px-1">...</span>
              <button className="pagination-button">16</button>
              <button className="pagination-button"><ChevronRight size={16} /></button>
            </div>
          </footer>
        </article>

        <aside className="order-detail-card sticky top-6 max-h-[calc(100vh-120px)] overflow-y-auto">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold">Order #MO-58241</h2>
                <OrderStatus label="New" />
              </div>
              <p className="mt-1 text-sm text-[#a79d91]">May 27, 2024 at 2:15 PM</p>
            </div>
            <button><X size={18} /></button>
          </div>

          <div className="mt-5 flex items-center justify-between rounded-lg border border-white/8 bg-[#1b1b14] p-3">
            <span className="inline-flex items-center gap-3"><ShoppingBag size={17} className="text-[#f2a51d]" />Delivery</span>
            <span className="rounded-full bg-[#4b350d] px-3 py-1 text-xs font-medium text-[#f2a51d]">ETA 18-24 min</span>
          </div>

          <DetailBlock title="Customer">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Sofia Andersen</p>
                <p className="mt-1 text-sm text-[#b9b0a4]">+351 912 345 678</p>
              </div>
              <div className="flex gap-2">
                <button className="menu-icon-button"><Phone size={16} /></button>
                <button className="menu-icon-button"><MessageSquare size={16} /></button>
              </div>
            </div>
          </DetailBlock>

          <DetailBlock title="Delivery Address">
            <div className="grid grid-cols-[1fr_86px] gap-3">
              <div>
                <p className="font-medium">Rua das Flores 24</p>
                <p className="mt-1 text-sm text-[#b9b0a4]">Lisbon, 1200-194, Portugal</p>
              </div>
              <div className="grid h-[68px] place-items-center rounded-lg bg-[linear-gradient(135deg,#25211d,#111)]">
                <MapPin size={30} className="fill-[#d33435] text-[#d33435]" />
              </div>
            </div>
          </DetailBlock>

          <DetailBlock title="Order Items">
            <div className="space-y-3">
              {detailItems.map(([name, note, price, image]) => (
                <div key={name} className="grid grid-cols-[42px_1fr_auto] items-center gap-3">
                  <img src={image} alt={name} className="size-10 rounded-lg object-cover" />
                  <div>
                    <p className="text-sm font-medium">{name}</p>
                    {note && <p className="text-xs text-[#a79d91]">{note}</p>}
                  </div>
                  <span className="text-sm font-medium">{price}</span>
                </div>
              ))}
            </div>
          </DetailBlock>

          <div className="space-y-2 border-t border-white/8 py-4 text-sm">
            <LineItem label="Subtotal" value="$46.00" />
            <LineItem label="Delivery Fee" value="$3.50" />
            <LineItem label="Total" value="$49.50" highlight />
          </div>

          <div className="grid grid-cols-2 gap-2 pb-2">
            <button className="order-accept-button"><Check size={16} />Accept Order</button>
            <button className="order-secondary-button"><X size={16} />Reject Order</button>
            <button className="order-stage-button active"><ChefHat size={18} />Preparing</button>
            <button className="order-stage-button"><PackageCheck size={18} />Ready</button>
            <button className="order-stage-button"><Bike size={18} />On the way</button>
            <button className="order-stage-button"><Check size={18} />Delivered</button>
            <button className="order-danger-button"><Trash2 size={16} />Cancel Order</button>
            <button className="order-secondary-button">Refund</button>
          </div>
        </aside>
      </section>
    </div>
  );
}

function DetailBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-white/8 py-3">
      <h3 className="mb-2 text-xs text-[#8f857a]">{title}</h3>
      {children}
    </section>
  );
}

function LineItem({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between">
      <span className={highlight ? "font-semibold text-white" : "text-[#b9b0a4]"}>{label}</span>
      <span className={highlight ? "text-lg font-semibold text-[#f2a51d]" : "text-white"}>{value}</span>
    </div>
  );
}

function OrderStatus({ label }: { label: string }) {
  const map: Record<string, string> = {
    New: "order-status-new",
    Preparing: "order-status-preparing",
    Ready: "order-status-ready",
    "On the way": "order-status-ready",
    Completed: "order-status-completed",
    Cancelled: "order-status-completed",
  };

  return <span className={`order-status ${map[label] ?? ""}`}>{label}</span>;
}
