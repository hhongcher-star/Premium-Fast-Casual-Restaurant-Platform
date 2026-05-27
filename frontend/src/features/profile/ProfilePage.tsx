import { Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Award,
  Bell,
  ChevronRight,
  CreditCard,
  Gift,
  Heart,
  Home,
  LogOut,
  MapPin,
  Package,
  Settings,
  ShoppingBag,
  Star,
  Ticket,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import pasta from "@/assets/hero-dish.jpg";
import bowl from "@/assets/dish-salad.jpg";
import pizza from "@/assets/dish-pizza.jpg";
import burger from "@/assets/dish-burger.jpg";
import steak from "@/assets/restaurant.jpg";

const ORDERS = [
  {
    id: "MO-58241",
    date: "Today, May 27",
    items: "Truffle Pasta + Lava Cake",
    total: 46,
    status: "Out for delivery",
    image: pasta,
  },
  {
    id: "MO-57993",
    date: "Mar 12, 2024",
    items: "Harvest Bowl + Salmon",
    total: 46,
    status: "Delivered",
    image: bowl,
  },
  {
    id: "MO-57801",
    date: "Mar 5, 2024",
    items: "Wood-Fired Margherita",
    total: 21,
    status: "Delivered",
    image: pizza,
  },
  {
    id: "MO-57102",
    date: "Feb 24, 2024",
    items: "Wagyu Burger x2",
    total: 48,
    status: "Delivered",
    image: burger,
  },
];

const STATS = [
  { icon: ShoppingBag, value: "48", label: "Orders", desc: "Total orders", tone: "red" },
  { icon: Star, value: "2,840", label: "Points", desc: "Available points", tone: "gold" },
  { icon: Heart, value: "12", label: "Favorites", desc: "Saved items", tone: "green" },
  { icon: Gift, value: "4", label: "Rewards", desc: "Redeemed", tone: "orange" },
];

const NAV = [
  { icon: Home, label: "Overview" },
  { icon: Heart, label: "Favorites" },
  { icon: MapPin, label: "Addresses" },
  { icon: CreditCard, label: "Payment methods" },
  { icon: Bell, label: "Notifications" },
  { icon: Settings, label: "Account settings" },
  { icon: LogOut, label: "Sign out" },
];

export function ProfilePage() {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <Layout>
      <section className="-mb-24 bg-[#0d0a08] px-4 pb-10 pt-6 text-white md:px-8 md:pt-8">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[330px_minmax(0,1fr)]">
          <aside className="space-y-4 lg:sticky lg:top-28 lg:h-fit">
            <div className="overflow-hidden rounded-[24px] border border-white/10 bg-[#171210] p-5 text-center shadow-elegant md:p-7">
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `linear-gradient(rgba(13,10,8,0.6), rgba(13,10,8,0.95)), url(${steak})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div className="relative">
                <div className="mx-auto grid h-24 w-24 place-items-center rounded-full border border-[#f5a623] bg-gradient-to-br from-[#6a7a28] to-[#16130f] font-display text-5xl text-white shadow-[0_18px_45px_rgba(0,0,0,0.35)]">
                  S
                </div>
                <h1 className="mt-5 font-display text-3xl">Sofia Andersen</h1>
                <p className="mt-1 text-sm text-white/72">sofia@email.com</p>
                <Link
                  to="/rewards"
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#3d5c1f] py-3 text-sm font-bold text-[#f5a623]"
                >
                  <Award className="h-4 w-4" />
                  Gold Member
                </Link>
                <div className="mt-4 rounded-[18px] border border-white/10 bg-white/[0.04] p-4 text-left">
                  <div className="font-display text-2xl">2,840 pts</div>
                  <p className="mt-1 text-sm text-white/65">Available points</p>
                </div>
              </div>
            </div>

            <nav className="overflow-hidden rounded-[24px] border border-white/10 bg-[#171210] p-2 shadow-soft">
              {NAV.map((item) => (
                <button
                  key={item.label}
                  onClick={() => setActiveTab(item.label)}
                  className={`relative flex w-full items-center gap-3 rounded-[16px] px-4 py-3 text-sm transition ${
                    activeTab === item.label ? "text-[#f52323]" : "text-white/78 hover:bg-white/[0.05]"
                  }`}
                >
                  {activeTab === item.label && (
                    <span className="absolute -left-2 top-0 h-full w-1 rounded-full bg-[#f52323]" />
                  )}
                  <item.icon className="h-5 w-5" />
                  <span className="flex-1 text-left">{item.label}</span>
                  <ChevronRight className="h-4 w-4 text-white/65" />
                </button>
              ))}
            </nav>
          </aside>

          <div className="min-w-0 space-y-5">
            {activeTab === "Overview" ? (
              <>
                <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
                  {STATS.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-[22px] border border-white/10 bg-[#171210] p-4 shadow-soft md:p-6"
                    >
                      <div className="flex items-center gap-3">
                        <StatIcon tone={stat.tone}>
                          <stat.icon className="h-6 w-6" />
                        </StatIcon>
                        <div>
                          <div className="font-display text-3xl leading-none md:text-4xl">
                            {stat.value}
                          </div>
                          <p className="mt-1 text-sm text-white/85">{stat.label}</p>
                        </div>
                      </div>
                      <p className="mt-4 text-xs text-white/55">{stat.desc}</p>
                    </div>
                  ))}
                </div>

            <div className="rounded-[24px] border border-white/10 bg-[#171210] p-4 shadow-elegant md:p-7">
              <div className="mb-5 flex items-center justify-between gap-4">
                <h2 className="font-display text-2xl md:text-3xl">Recent order history</h2>
                <button className="hidden items-center gap-2 text-sm font-bold text-[#f52323] sm:inline-flex">
                  View all orders
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              <div className="divide-y divide-white/10">
                {ORDERS.map((order) => (
                  <div
                    key={order.id}
                    className="grid grid-cols-[74px_minmax(0,1fr)_auto] items-center gap-3 py-3 md:grid-cols-[92px_minmax(0,1fr)_150px_90px_auto] md:gap-5 md:py-4"
                  >
                    <img
                      src={order.image}
                      alt={order.items}
                      loading="lazy"
                      decoding="async"
                      className="h-16 w-[74px] rounded-[12px] object-cover md:h-18 md:w-[92px]"
                    />
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-white">{order.id}</span>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                            order.status === "Delivered"
                              ? "bg-[#3d5c1f] text-white"
                              : "bg-[#eadfba] text-[#211c1a]"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <p className="mt-1 truncate text-sm text-white/62">{order.items}</p>
                      <p className="mt-1 text-xs text-white/45 md:hidden">{order.date}</p>
                    </div>
                    <div className="hidden text-sm text-white/48 md:block">{order.date}</div>
                    <div className="font-bold text-white">${order.total.toFixed(2)}</div>
                    <ChevronRight className="hidden h-5 w-5 text-[#f52323] md:block" />
                  </div>
                ))}
              </div>
            </div>

            <div
              className="relative overflow-hidden rounded-[24px] border border-[#f52323]/35 bg-[#2a0f0c] p-5 shadow-elegant md:p-7"
              style={{
                backgroundImage: `linear-gradient(90deg, rgba(74,18,14,0.98), rgba(74,18,14,0.72), rgba(74,18,14,0.18)), url(${steak})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            >
              <div className="relative grid gap-5 md:grid-cols-[1fr_1.7fr] md:items-center">
                <div>
                  <h2 className="font-display text-3xl">Love rewards?</h2>
                  <p className="mt-2 max-w-sm text-sm leading-6 text-white/72">
                    Earn more points with every order and unlock exclusive perks.
                  </p>
                  <Link
                    to="/rewards"
                    className="mt-5 inline-flex items-center gap-3 rounded-[10px] bg-[#f52323] px-6 py-3 text-sm font-bold text-white"
                  >
                    Explore rewards
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  <Perk icon={ShoppingBag} title="Earn points" desc="$1 spent = 10 pts" />
                  <Perk icon={Ticket} title="Exclusive perks" desc="Unlock special offers" />
                  <Perk icon={Gift} title="More benefits" desc="The more you dine" />
                </div>
              </div>
            </div>
              </>
            ) : (
              <ProfilePanel tab={activeTab} />
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}

function ProfilePanel({ tab }: { tab: string }) {
  const content: Record<string, { title: string; rows: string[] }> = {
    Favorites: {
      title: "Favorite dishes",
      rows: ["Black Truffle Tagliolini", "Wagyu Smash Burger", "Molten Valrhona Cake"],
    },
    Addresses: {
      title: "Saved addresses",
      rows: ["Home · 123 Olive Street, Kuala Lumpur", "Office · KL City Centre"],
    },
    "Payment methods": {
      title: "Payment methods",
      rows: ["Visa ending 4242", "Touch 'n Go eWallet", "Add a new payment method"],
    },
    Notifications: {
      title: "Notifications",
      rows: ["Order status updates enabled", "Rewards reminders enabled", "Promotions disabled"],
    },
    "Account settings": {
      title: "Account settings",
      rows: ["Name: Sofia Andersen", "Email: sofia@email.com", "Password updated recently"],
    },
    "Sign out": {
      title: "Sign out",
      rows: ["You are currently signed in as Sofia Andersen.", "Use this section to end your session."],
    },
  };
  const panel = content[tab];

  return (
    <div className="rounded-[24px] border border-white/10 bg-[#171210] p-5 shadow-elegant md:p-7">
      <h2 className="font-display text-3xl">{panel.title}</h2>
      <div className="mt-5 divide-y divide-white/10">
        {panel.rows.map((row) => (
          <div key={row} className="flex items-center justify-between gap-4 py-4">
            <span className="text-white/78">{row}</span>
            <ChevronRight className="h-4 w-4 text-[#f52323]" />
          </div>
        ))}
      </div>
    </div>
  );
}

function StatIcon({ tone, children }: { tone: string; children: React.ReactNode }) {
  const tones: Record<string, string> = {
    red: "border-[#f52323]/45 bg-[#f52323]/18 text-white",
    gold: "border-[#f5a623]/55 bg-[#f5a623]/20 text-white",
    green: "border-[#6d932b]/55 bg-[#6d932b]/22 text-white",
    orange: "border-[#c55b12]/55 bg-[#c55b12]/22 text-white",
  };

  return (
    <div className={`grid h-14 w-14 shrink-0 place-items-center rounded-full border ${tones[tone]}`}>
      {children}
    </div>
  );
}

function Perk({
  icon: Icon,
  title,
  desc,
}: {
  icon: React.ElementType;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#f52323]/45 bg-[#f52323]/18 text-[#f5a623]">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <p className="text-sm font-bold text-white">{title}</p>
        <p className="text-xs text-white/62">{desc}</p>
      </div>
    </div>
  );
}
