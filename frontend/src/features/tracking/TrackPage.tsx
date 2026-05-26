import { Link } from "@tanstack/react-router";
import { Check, ChefHat, Package, Bike, MapPin, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";

const STEPS = [
  { icon: Check, label: "Confirmed", desc: "We received your order" },
  { icon: ChefHat, label: "Preparing", desc: "Chef is plating now" },
  { icon: Package, label: "Ready", desc: "Packed with care" },
  { icon: Bike, label: "On the way", desc: "Your courier is en route" },
];

export function TrackPage() {
  const [step, setStep] = useState(1);
  useEffect(() => {
    const t = setInterval(() => setStep((s) => (s < STEPS.length - 1 ? s + 1 : s)), 3500);
    return () => clearInterval(t);
  }, []);

  return (
    <Layout>
      <section className="mx-auto max-w-5xl px-6 pt-10 md:px-8">
        <span className="text-xs font-semibold uppercase tracking-widest text-accent">
          Order #MO-58241
        </span>
        <h1 className="mt-2 font-display text-5xl tracking-tight md:text-6xl">On its way to you</h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          Estimated arrival in 18–24 minutes. We'll text you when your courier is close.
        </p>

        <div className="mt-12 rounded-4xl bg-card p-6 shadow-soft md:p-10">
          <ol className="grid gap-8 md:grid-cols-4 md:gap-4">
            {STEPS.map((s, i) => {
              const done = i <= step;
              const current = i === step;
              return (
                <li
                  key={s.label}
                  className="flex items-start gap-4 md:flex-col md:items-center md:text-center"
                >
                  <div className="relative">
                    <motion.div
                      animate={current ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className={`relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full transition ${
                        done
                          ? "bg-primary text-primary-foreground shadow-float"
                          : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      <s.icon className="h-5 w-5" />
                    </motion.div>
                  </div>
                  <div className="md:mt-3">
                    <div className="font-display text-lg">{s.label}</div>
                    <div className="text-sm text-muted-foreground">{s.desc}</div>
                  </div>
                </li>
              );
            })}
          </ol>
          <div className="mt-6 hidden h-1.5 overflow-hidden rounded-full bg-secondary md:block">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
              transition={{ duration: 0.8 }}
              className="h-full rounded-full bg-primary"
            />
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="flex items-center gap-4 rounded-3xl bg-card p-5 shadow-soft">
            <div className="grid h-14 w-14 place-items-center rounded-full bg-secondary text-primary">
              <Bike className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">
                Your courier
              </div>
              <div className="font-display text-xl">Tiago M.</div>
              <div className="text-sm text-muted-foreground">★ 4.95 · Electric bike</div>
            </div>
            <button className="grid h-11 w-11 place-items-center rounded-full bg-primary text-primary-foreground">
              <Phone className="h-4 w-4" />
            </button>
          </div>
          <div className="flex items-center gap-4 rounded-3xl bg-card p-5 shadow-soft">
            <div className="grid h-14 w-14 place-items-center rounded-full bg-secondary text-primary">
              <MapPin className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">
                Delivering to
              </div>
              <div className="font-display text-xl">Rua das Flores 24</div>
              <div className="text-sm text-muted-foreground">Lisbon · 1200-194</div>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link to="/menu" className="text-sm text-primary underline">
            Order something else
          </Link>
        </div>
      </section>
    </Layout>
  );
}
