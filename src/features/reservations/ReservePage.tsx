import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { addDays, format, isSameDay, startOfToday } from "date-fns";
import { Users, Calendar as CalIcon, Check } from "lucide-react";
import { motion } from "framer-motion";
import Layout from "@/components/site/Layout";

export const Route = createFileRoute("/reserve")({
  component: Reserve,
  head: () => ({ meta: [{ title: "Reserve — Maison Olive" }] }),
});

const TIMES = ["12:00", "13:00", "13:30", "18:00", "19:00", "19:30", "20:00", "21:00"];

function Reserve() {
  const today = startOfToday();
  const days = Array.from({ length: 14 }, (_, i) => addDays(today, i));
  const [date, setDate] = useState(today);
  const [time, setTime] = useState("19:00");
  const [guests, setGuests] = useState(2);
  const [done, setDone] = useState(false);

  return (
    <Layout>
      <section className="mx-auto max-w-5xl px-6 pt-10 md:px-8">
        <span className="text-xs font-semibold uppercase tracking-widest text-accent">
          Reservations
        </span>
        <h1 className="mt-2 font-display text-5xl tracking-tight md:text-6xl">
          Book your table
        </h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          A few details and your seat is held. Free cancellation up to 2 hours before.
        </p>

        {done ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-12 overflow-hidden rounded-4xl bg-card p-12 text-center shadow-elegant"
          >
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary text-primary-foreground">
              <Check className="h-8 w-8" />
            </div>
            <h2 className="mt-6 font-display text-3xl">Table reserved</h2>
            <p className="mt-2 text-muted-foreground">
              {format(date, "EEEE, MMM d")} at {time} for {guests} guests.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Confirmation #MO-{Math.floor(Math.random() * 90000 + 10000)}
            </p>
          </motion.div>
        ) : (
          <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_360px]">
            <div className="rounded-3xl bg-card p-6 shadow-soft md:p-8">
              <div className="mb-2 flex items-center gap-2 text-sm font-medium">
                <CalIcon className="h-4 w-4 text-accent" /> Choose a date
              </div>
              <div className="-mx-2 flex gap-2 overflow-x-auto px-2 pb-2 pt-2">
                {days.map((d) => {
                  const active = isSameDay(d, date);
                  return (
                    <button
                      key={d.toISOString()}
                      onClick={() => setDate(d)}
                      className={`shrink-0 rounded-2xl border px-4 py-3 text-center transition ${
                        active
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-background hover:bg-secondary"
                      }`}
                    >
                      <div className="text-[10px] uppercase opacity-70">
                        {format(d, "EEE")}
                      </div>
                      <div className="mt-1 font-display text-2xl leading-none">
                        {format(d, "d")}
                      </div>
                      <div className="mt-1 text-[10px] opacity-70">{format(d, "MMM")}</div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 flex items-center gap-2 text-sm font-medium">
                Available times
              </div>
              <div className="mt-3 grid grid-cols-4 gap-2 md:grid-cols-8">
                {TIMES.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTime(t)}
                    className={`rounded-xl border px-2 py-2.5 text-sm transition ${
                      time === t
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background hover:bg-secondary"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <div className="mt-8 flex items-center gap-2 text-sm font-medium">
                <Users className="h-4 w-4 text-accent" /> Party size
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5, 6, 8].map((n) => (
                  <button
                    key={n}
                    onClick={() => setGuests(n)}
                    className={`grid h-12 w-12 place-items-center rounded-full border text-sm transition ${
                      guests === n
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background hover:bg-secondary"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>

            <aside className="h-fit rounded-3xl bg-primary p-8 text-primary-foreground shadow-elegant">
              <h3 className="font-display text-2xl">Reservation summary</h3>
              <dl className="mt-6 space-y-3 text-sm">
                <Row k="Date" v={format(date, "EEEE, MMM d")} />
                <Row k="Time" v={time} />
                <Row k="Guests" v={String(guests)} />
                <Row k="Location" v="Maison Olive · Lisbon" />
              </dl>
              <input
                placeholder="Full name"
                className="mt-6 w-full rounded-2xl border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-3 text-sm text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none"
              />
              <input
                placeholder="Email"
                className="mt-2 w-full rounded-2xl border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-3 text-sm text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none"
              />
              <button
                onClick={() => setDone(true)}
                className="mt-6 w-full rounded-full bg-card py-3.5 text-sm font-medium text-foreground shadow-float hover:scale-[1.01]"
              >
                Confirm reservation
              </button>
            </aside>
          </div>
        )}
      </section>
    </Layout>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between border-b border-primary-foreground/15 pb-3">
      <dt className="opacity-70">{k}</dt>
      <dd className="font-medium">{v}</dd>
    </div>
  );
}
