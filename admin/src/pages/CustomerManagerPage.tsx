import {
  ChevronLeft,
  ChevronRight,
  Crown,
  Download,
  Edit,
  Filter,
  Mail,
  MessageSquare,
  MoreHorizontal,
  Phone,
  Plus,
  Search,
  Star,
  TrendingUp,
  User,
  Users,
  WalletCards,
} from "lucide-react";

import burgerImage from "@/assets/dish-burger.jpg";
import pizzaImage from "@/assets/dish-pizza.jpg";
import saladImage from "@/assets/dish-salad.jpg";

const stats = [
  { label: "Total Customers", value: "1,248", note: "↑ 12% vs last month", icon: Users, tone: "blue" },
  { label: "New Customers", value: "156", note: "↑ 18% vs last month", icon: Star, tone: "green" },
  { label: "Loyal Customers", value: "342", note: "↑ 8% vs last month", icon: Crown, tone: "purple" },
  { label: "Total Points Issued", value: "125,780", note: "↑ 15% vs last month", icon: WalletCards, tone: "orange" },
];

const customers = [
  ["Sofia Andersen", "sofia.andersen@email.com", "+351 912 345 678", "Gold", "2,450", "$1,248.50", "18", "May 27, 2024", "Active"],
  ["James Wilson", "james.wilson@email.com", "+351 913 234 567", "Silver", "1,780", "$892.30", "12", "May 26, 2024", "Active"],
  ["Maria Santos", "maria.santos@email.com", "+351 914 123 456", "Gold", "3,210", "$1,975.20", "25", "May 25, 2024", "Active"],
  ["David Lee", "david.lee@email.com", "+351 915 987 654", "Bronze", "620", "$245.80", "5", "May 22, 2024", "Active"],
  ["Emma Brown", "emma.brown@email.com", "+351 916 852 369", "Silver", "1,150", "$564.70", "8", "May 21, 2024", "Active"],
  ["Olivia Davis", "olivia.davis@email.com", "+351 917 753 951", "Gold", "2,980", "$1,532.60", "21", "May 20, 2024", "Inactive"],
  ["Lucas Martin", "lucas.martin@email.com", "+351 918 456 789", "Bronze", "340", "$128.40", "3", "May 18, 2024", "Active"],
  ["Sophia Johnson", "sophia.j@email.com", "+351 919 654 321", "Silver", "1,560", "$743.90", "10", "May 16, 2024", "Active"],
];

const recentOrders = [
  ["MO-58241", "May 27, 2024", "$46.00", burgerImage],
  ["MO-58233", "May 24, 2024", "$38.50", saladImage],
  ["MO-58199", "May 20, 2024", "$67.90", pizzaImage],
];

export function CustomerManagerPage() {
  return (
    <div id="customers" className="space-y-5">
      <header className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <h1 className="text-[30px] font-semibold leading-tight tracking-normal">Customer Manager</h1>
          <p className="mt-2 text-sm text-[#c6bbae]">
            View and manage customer information and loyalty details.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="admin-toolbar-button"><Download size={17} />Export Customers</button>
          <button className="admin-toolbar-button"><Filter size={17} />Filter</button>
          <button className="admin-primary-button"><Plus size={18} />Add Customer</button>
        </div>
      </header>

      <section className="grid gap-5 2xl:grid-cols-[minmax(0,1fr)_370px]">
        <div className="space-y-5">
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <article key={stat.label} className={`customer-stat customer-stat-${stat.tone}`}>
                  <span className="customer-stat-icon"><Icon size={20} /></span>
                  <div>
                    <p className="text-sm text-[#d0c7bb]">{stat.label}</p>
                    <strong className="mt-1 block text-2xl font-semibold">{stat.value}</strong>
                    <p className="mt-2 text-xs text-[#8fcf4d]">{stat.note}</p>
                  </div>
                </article>
              );
            })}
          </div>

          <article className="menu-table-card">
            <div className="grid gap-3 border-b border-white/10 p-4 lg:grid-cols-[minmax(260px,1fr)_160px_160px_130px]">
              <label className="menu-search h-10">
                <Search size={17} />
                <input placeholder="Search by name, email, or phone..." />
                <Search size={16} />
              </label>
              <button className="menu-select-button h-10">All Loyalty Tiers</button>
              <button className="menu-select-button h-10">All Status</button>
              <button className="menu-filter-button h-10"><Filter size={16} />More Filters</button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[880px] text-left text-sm">
                <thead className="border-b border-white/8 text-xs text-[#c0b5a8]">
                  <tr>
                    {["Customer", "Contacts", "Loyalty Tier", "Points", "Total Spent", "Orders", "Last Order", "Status", "Actions"].map((head) => (
                      <th key={head} className="px-4 py-4 font-medium">{head}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/8">
                  {customers.map((customer, index) => (
                    <tr key={customer[0]} className={index === 0 ? "selected-order-row" : "hover:bg-white/[0.025]"}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <span className="grid size-10 place-items-center rounded-full bg-[#d8c4aa] text-[#15120e]">
                            <User size={18} />
                          </span>
                          <span className="font-medium">{customer[0]}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="block text-xs">{customer[1]}</span>
                        <span className="text-xs text-[#a79d91]">{customer[2]}</span>
                      </td>
                      <td className="px-4 py-3"><TierBadge tier={customer[3]} /></td>
                      <td className="px-4 py-3 font-medium">{customer[4]}</td>
                      <td className="px-4 py-3 font-medium">{customer[5]}</td>
                      <td className="px-4 py-3">{customer[6]}</td>
                      <td className="px-4 py-3">{customer[7]}</td>
                      <td className="px-4 py-3"><CustomerStatus label={customer[8]} /></td>
                      <td className="px-4 py-3"><button className="menu-icon-button"><MoreHorizontal size={16} /></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <footer className="flex flex-col gap-3 border-t border-white/8 px-5 py-3 text-sm text-[#c4baae] sm:flex-row sm:items-center sm:justify-between">
              <span>Showing 1 to 8 of 1,248 customers</span>
              <div className="flex items-center gap-2">
                <button className="pagination-button"><ChevronLeft size={16} /></button>
                <button className="pagination-button pagination-active">1</button>
                <button className="pagination-button">2</button>
                <button className="pagination-button">3</button>
                <span className="px-1">...</span>
                <button className="pagination-button">156</button>
                <button className="pagination-button"><ChevronRight size={16} /></button>
              </div>
            </footer>
          </article>
        </div>

        <aside className="customer-detail-card">
          <div className="flex justify-between gap-3">
            <div className="flex gap-4">
              <span className="grid size-16 place-items-center rounded-full bg-[#d8c4aa] text-[#15120e]">
                <User size={28} />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold">Sofia Andersen</h2>
                  <CustomerStatus label="Active" />
                </div>
                <p className="mt-1 text-sm text-[#f2a51d]">★ Gold Member</p>
                <p className="mt-1 text-sm text-[#a79d91]">Since Jan 12, 2023</p>
              </div>
            </div>
            <button className="menu-icon-button"><MoreHorizontal size={16} /></button>
          </div>

          <div className="mt-5 space-y-3 text-sm text-[#d8d0c4]">
            <p className="flex items-center gap-3"><Mail size={15} />sofia.andersen@email.com</p>
            <p className="flex items-center gap-3"><Phone size={15} />+351 912 345 678</p>
            <div className="flex gap-2 pt-1">
              <button className="menu-icon-button"><MessageSquare size={15} /></button>
              <button className="menu-icon-button"><Mail size={15} /></button>
              <button className="menu-icon-button"><Phone size={15} /></button>
              <button className="menu-icon-button"><Edit size={15} /></button>
            </div>
          </div>

          <div className="customer-mini-grid">
            <MiniMetric icon={<Star size={18} />} value="2,450" label="Points Balance" tone="orange" />
            <MiniMetric icon={<WalletCards size={18} />} value="18" label="Total Orders" tone="orange" />
            <MiniMetric icon={<WalletCards size={18} />} value="$1,248.50" label="Total Spent" tone="blue" />
            <MiniMetric icon={<TrendingUp size={18} />} value="$69.36" label="Avg. Order Value" tone="green" />
          </div>

          <section className="border-t border-white/8 pt-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Recent Orders</h3>
              <a href="#" className="text-sm text-[#4b96ff]">View all</a>
            </div>
            <div className="mt-4 space-y-3">
              {recentOrders.map(([id, date, total, image]) => (
                <div key={id} className="grid grid-cols-[42px_1fr_auto_auto] items-center gap-3">
                  <img src={image} alt={id} className="size-10 rounded-lg object-cover" />
                  <span><span className="block text-sm">{id}</span><span className="text-xs text-[#a79d91]">{date}</span></span>
                  <span className="text-sm font-medium">{total}</span>
                  <span className="rounded-md bg-[#0e2c4d] px-2 py-1 text-xs text-[#4b96ff]">Delivered</span>
                </div>
              ))}
            </div>
          </section>

          <section className="border-t border-white/8 pt-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Support Orders</h3>
              <a href="#" className="text-sm text-[#f2a51d]">View all</a>
            </div>
            <div className="mt-3 rounded-lg border border-[#8a5a13]/30 bg-[#2a2112]/55 p-3 text-sm">
              <p>Prefers contactless delivery.</p>
              <p>Allergic to nuts.</p>
              <p>Loves truffle pasta!</p>
              <p className="mt-4 text-xs text-[#a79d91]">Added by Tiago M. on Apr 12, 2024</p>
            </div>
          </section>

          <section className="border-t border-white/8 pt-4">
            <h3 className="font-semibold">Customer Actions</h3>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button className="order-accept-button"><Plus size={16} />Add Points</button>
              <button className="order-secondary-button"><MessageSquare size={16} />Send Message</button>
              <button className="customer-danger-button">Deactivate Customer</button>
            </div>
          </section>
        </aside>
      </section>
    </div>
  );
}

function TierBadge({ tier }: { tier: string }) {
  const lower = tier.toLowerCase();
  return <span className={`tier-badge tier-${lower}`}>★ {tier}</span>;
}

function CustomerStatus({ label }: { label: string }) {
  return <span className={label === "Active" ? "customer-status active" : "customer-status"}>● {label}</span>;
}

function MiniMetric({ icon, value, label, tone }: { icon: React.ReactNode; value: string; label: string; tone: string }) {
  return (
    <div className="customer-mini-metric">
      <span className={`customer-mini-icon ${tone}`}>{icon}</span>
      <span><strong>{value}</strong><span>{label}</span></span>
    </div>
  );
}
