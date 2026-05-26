import { Gift, Sparkles, Crown, Coffee, Cookie, Pizza } from "lucide-react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";

const TIERS = [
  { name: "Silver", min: 0, color: "bg-secondary text-foreground" },
  { name: "Gold", min: 1500, color: "bg-gold text-foreground" },
  { name: "Platinum", min: 5000, color: "bg-primary text-primary-foreground" },
];

const REWARDS = [
  { icon: Coffee, name: "Espresso on us", pts: 200 },
  { icon: Cookie, name: "Free dessert", pts: 600 },
  { icon: Pizza, name: "Free signature pizza", pts: 1200 },
  { icon: Gift, name: "Chef's tasting menu", pts: 3000 },
];

export function RewardsPage() {
  const points = 2840;
  const next = 5000;
  const progress = (points / next) * 100;

  return (
    <Layout>
      <section className="mx-auto max-w-6xl px-6 pt-10 md:px-8">
        <span className="text-xs font-semibold uppercase tracking-widest text-accent">
          Maison Rewards
        </span>
        <h1 className="mt-2 font-display text-5xl tracking-tight md:text-6xl">
          Every plate, a reward.
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mt-10 overflow-hidden rounded-4xl bg-primary p-8 text-primary-foreground shadow-elegant md:p-12"
        >
          <div className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-accent/40 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 h-72 w-72 rounded-full bg-gold/30 blur-3xl" />
          <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <div className="flex items-center gap-2 text-sm opacity-80">
                <Crown className="h-4 w-4" /> Gold member · Sofia
              </div>
              <div className="mt-2 font-display text-6xl md:text-7xl">
                {points.toLocaleString()} <span className="text-2xl opacity-70">pts</span>
              </div>
              <div className="mt-6 max-w-md">
                <div className="flex justify-between text-xs opacity-80">
                  <span>Gold</span>
                  <span>{(next - points).toLocaleString()} pts to Platinum</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-primary-foreground/15">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-gold to-accent"
                  />
                </div>
              </div>
            </div>
            <div className="glass-dark inline-flex items-center gap-3 rounded-2xl p-4">
              <Sparkles className="h-5 w-5 text-gold" />
              <div>
                <div className="text-xs opacity-80">This month</div>
                <div className="font-display text-2xl">+420 pts</div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {TIERS.map((t, i) => (
            <div key={t.name} className="rounded-3xl bg-card p-6 shadow-soft">
              <div className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${t.color}`}>
                {t.name}
              </div>
              <div className="mt-3 font-display text-3xl">
                {t.min.toLocaleString()}+ <span className="text-base opacity-60">pts</span>
              </div>
              <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
                <li>· {["5%", "10%", "15%"][i]} back on every order</li>
                <li>· {["Birthday treat", "Priority seating", "Chef's table access"][i]}</li>
                <li>· {["—", "Free monthly drink", "Curated gift box"][i]}</li>
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <h2 className="font-display text-3xl">Redeem your points</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {REWARDS.map((r, i) => {
              const canRedeem = points >= r.pts;
              return (
                <motion.div
                  key={r.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="group flex flex-col rounded-3xl bg-card p-6 shadow-soft transition hover:shadow-elegant"
                >
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-secondary text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                    <r.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-display text-xl">{r.name}</h3>
                  <div className="mt-1 text-sm text-muted-foreground">{r.pts} pts</div>
                  <button
                    disabled={!canRedeem}
                    className="mt-4 rounded-full bg-primary py-2.5 text-sm font-medium text-primary-foreground disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {canRedeem ? "Redeem" : "Keep earning"}
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
}
