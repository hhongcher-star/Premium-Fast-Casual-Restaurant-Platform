import { Link } from "@tanstack/react-router";
import { Heart, MapPin, CreditCard, Bell, LogOut, ChevronRight, Award } from "lucide-react";
import Layout from "@/components/layout/Layout";
import DishCard from "@/components/common/DishCard";
import { dishes } from "@/lib/data";

const ORDERS = [
  {
    id: "MO-58241",
    date: "Today",
    items: "Truffle Pasta + Lava Cake",
    total: 46,
    status: "Out for delivery",
  },
  {
    id: "MO-57993",
    date: "Mar 12",
    items: "Harvest Bowl + Salmon",
    total: 46,
    status: "Delivered",
  },
  { id: "MO-57801", date: "Mar 5", items: "Wood-Fired Margherita", total: 21, status: "Delivered" },
  { id: "MO-57102", date: "Feb 24", items: "Wagyu Burger ×2", total: 48, status: "Delivered" },
];

export function ProfilePage() {
  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-6 pt-10 md:px-8">
        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
          <aside className="h-fit space-y-4">
            <div className="rounded-3xl bg-card p-6 text-center shadow-soft">
              <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-accent to-primary font-display text-3xl text-primary-foreground">
                S
              </div>
              <h2 className="mt-4 font-display text-2xl">Sofia Andersen</h2>
              <p className="text-sm text-muted-foreground">sofia@email.com</p>
              <Link
                to="/rewards"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary py-2.5 text-sm font-medium text-primary-foreground"
              >
                <Award className="h-4 w-4" /> Gold · 2,840 pts
              </Link>
            </div>
            <nav className="rounded-3xl bg-card p-2 shadow-soft">
              {[
                { icon: Heart, label: "Favorites" },
                { icon: MapPin, label: "Addresses" },
                { icon: CreditCard, label: "Payment methods" },
                { icon: Bell, label: "Notifications" },
                { icon: LogOut, label: "Sign out" },
              ].map((i) => (
                <button
                  key={i.label}
                  className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm hover:bg-secondary"
                >
                  <i.icon className="h-4 w-4 text-muted-foreground" />
                  <span className="flex-1 text-left">{i.label}</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </button>
              ))}
            </nav>
          </aside>

          <div className="space-y-8">
            <div className="grid gap-4 md:grid-cols-3">
              {[
                ["48", "Orders"],
                ["2,840", "Points"],
                ["12", "Favorites"],
              ].map(([k, v]) => (
                <div key={v} className="rounded-3xl bg-card p-6 shadow-soft">
                  <div className="font-display text-4xl text-primary">{k}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{v}</div>
                </div>
              ))}
            </div>

            <div className="rounded-3xl bg-card p-6 shadow-soft md:p-8">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="font-display text-2xl">Order history</h3>
                <button className="text-sm text-primary">See all</button>
              </div>
              <div className="space-y-2">
                {ORDERS.map((o) => (
                  <div
                    key={o.id}
                    className="flex items-center justify-between gap-3 rounded-2xl px-4 py-3 hover:bg-secondary"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{o.id}</span>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] ${
                            o.status === "Delivered"
                              ? "bg-secondary text-muted-foreground"
                              : "bg-primary/10 text-primary"
                          }`}
                        >
                          {o.status}
                        </span>
                      </div>
                      <div className="truncate text-sm text-muted-foreground">
                        {o.date} · {o.items}
                      </div>
                    </div>
                    <div className="font-display text-lg">${o.total}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-display text-2xl">Favorite dishes</h3>
              <div className="mt-5 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {dishes.slice(0, 3).map((d, i) => (
                  <DishCard key={d.id} dish={d} index={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
