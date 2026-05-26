import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Award, Clock, Leaf, Star, Sparkles } from "lucide-react";
import Layout from "@/components/site/Layout";
import DishCard from "@/components/site/DishCard";
import { dishes } from "@/lib/data";
import hero from "@/assets/hero-dish.jpg";
import interior from "@/assets/restaurant-interior.jpg";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [{ title: "Maison Olive — Order, Reserve, Indulge" }],
  }),
});

function Home() {
  return (
    <Layout>
      <section className="relative px-4 pt-10 md:px-8 md:pt-16">
        <div className="relative mx-auto grid max-w-7xl gap-8 overflow-hidden rounded-4xl bg-gradient-to-br from-secondary to-muted px-6 py-12 shadow-soft md:grid-cols-2 md:px-12 md:py-20 lg:gap-16">
          <div className="relative z-10 flex flex-col justify-center">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex w-fit items-center gap-2 rounded-full bg-card px-4 py-1.5 text-xs font-medium text-foreground shadow-soft"
            >
              <Sparkles className="h-3 w-3 text-accent" /> New autumn menu live
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-6 font-display text-5xl leading-[1.05] tracking-tight text-foreground md:text-7xl"
            >
              A modern table for the<br />
              <span className="italic text-primary">everyday gourmand.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 max-w-md text-base text-muted-foreground md:text-lg"
            >
              Slow-cooked flavor. Fast-casual ease. Order ahead, reserve a quiet corner,
              or earn rewards with every plate.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link
                to="/menu"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-float transition hover:scale-[1.02]"
              >
                Order now
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/reserve"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 text-sm font-medium text-foreground hover:bg-secondary"
              >
                Reserve a table
              </Link>
            </motion.div>

            <div className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-border pt-6">
              {[
                ["4.9★", "12k reviews"],
                ["18 min", "avg. delivery"],
                ["100%", "fresh daily"],
              ].map(([k, v]) => (
                <div key={v}>
                  <div className="font-display text-2xl text-primary">{k}</div>
                  <div className="mt-0.5 text-xs text-muted-foreground">{v}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8 }}
              className="relative aspect-square overflow-hidden rounded-[40%_60%_55%_45%/50%_45%_55%_50%] shadow-elegant"
            >
              <img src={hero} alt="Signature pasta dish" className="h-full w-full object-cover" width={1536} height={1536} />
            </motion.div>

            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="glass absolute -bottom-4 -left-6 flex items-center gap-3 rounded-2xl p-3 pr-5 shadow-float md:bottom-8 md:-left-8"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary text-primary-foreground">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Earned today</div>
                <div className="font-display text-lg leading-tight">+148 pts</div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="glass absolute -top-2 right-0 flex items-center gap-3 rounded-2xl p-3 pr-5 shadow-float md:right-4 md:top-8"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-accent text-accent-foreground">
                <Star className="h-5 w-5 fill-current" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Chef's pick</div>
                <div className="font-display text-lg leading-tight">Truffle Pasta</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-7xl px-6 md:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { icon: Leaf, title: "Sourced locally", desc: "From farms within 80 miles." },
            { icon: Clock, title: "Ready in 15 min", desc: "Fast doesn't mean rushed." },
            { icon: Award, title: "Rewards on every order", desc: "Earn points, unlock tiers." },
          ].map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-3xl bg-card p-6 shadow-soft"
            >
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-secondary text-primary">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-xl">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-7xl px-6 md:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">
              The Menu
            </span>
            <h2 className="mt-2 font-display text-4xl md:text-5xl">Signature dishes</h2>
          </div>
          <Link
            to="/menu"
            className="hidden items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm hover:bg-secondary md:inline-flex"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {dishes.slice(0, 6).map((d, i) => (
            <DishCard key={d.id} dish={d} index={i} />
          ))}
        </div>
      </section>

      <section className="mx-auto mt-28 max-w-7xl px-6 md:px-8">
        <div className="relative overflow-hidden rounded-4xl shadow-elegant">
          <img
            src={interior}
            alt="Restaurant interior"
            loading="lazy"
            className="h-[460px] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/40 to-transparent" />
          <div className="absolute inset-0 flex items-center p-8 md:p-16">
            <div className="max-w-lg text-primary-foreground">
              <h2 className="font-display text-4xl leading-tight md:text-5xl">
                A quiet corner, reserved for you.
              </h2>
              <p className="mt-4 text-primary-foreground/85">
                Book a table in seconds. Skip the queue, sip a glass, stay a while.
              </p>
              <Link
                to="/reserve"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-card px-6 py-3.5 text-sm font-medium text-foreground shadow-float hover:scale-[1.02]"
              >
                Reserve a table <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
