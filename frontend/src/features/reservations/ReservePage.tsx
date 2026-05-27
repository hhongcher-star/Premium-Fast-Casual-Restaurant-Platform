import { useState } from "react";
import { addDays, format, isSameDay, startOfToday } from "date-fns";
import {
  ArrowRight,
  Calendar as CalIcon,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Mail,
  MapPin,
  ShieldCheck,
  User,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import hero from "@/assets/restaurant.jpg";

const TIMES = ["12:00", "13:00", "13:30", "18:00", "19:00", "19:30", "20:00", "21:00"];
const PARTY_SIZES = [1, 2, 3, 4, 5, 6, 8, 10];

export function ReservePage() {
  const today = startOfToday();
  const days = Array.from({ length: 13 }, (_, i) => addDays(today, i));
  const [date, setDate] = useState(today);
  const [time, setTime] = useState("19:00");
  const [guests, setGuests] = useState(2);
  const [done, setDone] = useState(false);
  const [datePage, setDatePage] = useState(0);
  const visibleDays = days.slice(datePage, datePage + 7);

  return (
    <Layout>
      <section
        className="relative overflow-hidden bg-[#0f0b09] text-white"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(10,8,7,0.98) 0%, rgba(10,8,7,0.84) 38%, rgba(10,8,7,0.22) 100%), url(${hero})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f0b09]/15 to-[#0f0b09]" />
        <div className="relative mx-auto max-w-7xl px-5 py-5 md:px-8 md:py-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.38, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <div className="hidden items-center gap-4 sm:flex">
              <span className="text-xs font-bold uppercase tracking-[0.55em] text-[#f5c46b]">
                Reservations
              </span>
              <span className="hidden h-px w-16 bg-[#f04b3f] sm:block" />
            </div>

            <h1 className="mt-3 hidden font-display text-4xl leading-[0.95] tracking-tight sm:block md:text-6xl">
              Book <span className="text-[#f52323]">your table</span>
            </h1>
            <p className="mt-4 hidden max-w-xl text-sm leading-6 text-white/78 sm:block md:text-base">
              A few details and your seat is held. Free cancellation up to 2 hours before.
            </p>

            <div className="mt-4 grid gap-2 text-sm sm:grid-cols-3 md:mt-6 md:gap-3">
              <Perk icon={Clock} title="Quick booking" desc="Takes less than 1 min" />
              <Perk icon={CalIcon} title="Secure reservation" desc="Instant confirmation" />
              <Perk icon={ShieldCheck} title="Free cancellation" desc="Up to 2 hours before" />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#0f0b09] px-4 pb-12 text-white md:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 overflow-hidden lg:grid-cols-[minmax(0,1fr)_340px] xl:grid-cols-[minmax(0,1fr)_360px]">
          {done ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-[28px] border border-[#f5a623]/25 bg-[#1a120e]/90 p-10 text-center shadow-elegant lg:col-span-2"
            >
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#f52323] text-white shadow-[0_0_36px_rgba(245,35,35,0.38)]">
                <Check className="h-8 w-8" />
              </div>
              <h2 className="mt-6 font-display text-4xl">Table reserved</h2>
              <p className="mt-3 text-white/70">
                {format(date, "EEEE, MMM d")} at {time} for {guests} guests.
              </p>
              <p className="mt-2 text-sm text-[#f5c46b]">
                Confirmation #MO-{Math.floor(Math.random() * 90000 + 10000)}
              </p>
            </motion.div>
          ) : (
            <>
              <div>
                <div className="rounded-[24px] border border-[#f5a623]/20 bg-[#17100d]/88 p-4 shadow-elegant backdrop-blur sm:p-5 md:rounded-[28px] md:p-6">
                  <SectionTitle icon={CalIcon} label="Choose a date" />

                  <div className="mt-4 grid grid-cols-[36px_minmax(0,1fr)_36px] items-center gap-2 sm:grid-cols-[38px_minmax(0,1fr)_38px]">
                    <button
                      type="button"
                      onClick={() => setDatePage((page) => Math.max(0, page - 1))}
                      disabled={datePage === 0}
                      className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-white/[0.04] text-white transition hover:border-[#f5a623]/60 disabled:cursor-not-allowed disabled:opacity-35"
                      aria-label="Previous dates"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>

                    <div className="grid min-w-0 grid-cols-4 gap-2 sm:grid-cols-7">
                      {visibleDays.map((d, index) => {
                        const active = isSameDay(d, date);
                        return (
                          <button
                            key={d.toISOString()}
                            onClick={() => setDate(d)}
                            className={`min-w-0 rounded-[14px] border px-1 py-2.5 text-center transition ${
                              index > 3 ? "hidden sm:block" : ""
                            } ${
                              active
                                ? "border-[#f52323] bg-[#f52323] text-white shadow-[0_12px_30px_rgba(245,35,35,0.35)]"
                                : "border-white/15 bg-white/[0.04] text-white hover:border-[#f5a623]/60"
                            }`}
                          >
                            <div className="text-[9px] font-bold uppercase opacity-80">
                              {format(d, "EEE")}
                            </div>
                            <div className="mt-1 font-display text-xl leading-none md:text-2xl">
                              {format(d, "d")}
                            </div>
                            <div className="mt-1 text-[10px] opacity-75">{format(d, "MMM")}</div>
                          </button>
                        );
                      })}
                    </div>

                    <button
                      type="button"
                      onClick={() => setDatePage((page) => Math.min(days.length - 7, page + 1))}
                      disabled={datePage >= days.length - 7}
                      className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-white/[0.04] text-white transition hover:border-[#f5a623]/60 disabled:cursor-not-allowed disabled:opacity-35"
                      aria-label="Next dates"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mt-5">
                    <SectionTitle icon={Clock} label="Available times" />
                    <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                      {TIMES.map((t) => (
                        <ChoiceButton key={t} active={time === t} onClick={() => setTime(t)}>
                          {t}
                        </ChoiceButton>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5">
                    <SectionTitle icon={Users} label="Party size" />
                    <div className="mt-3 grid grid-cols-5 gap-2 sm:flex sm:flex-wrap sm:gap-2.5">
                      {PARTY_SIZES.map((n) => (
                        <button
                          key={n}
                          onClick={() => setGuests(n)}
                          className={`grid h-11 w-11 place-items-center rounded-full border text-sm transition sm:h-12 sm:w-12 ${
                            guests === n
                              ? "border-[#f52323] bg-[#f52323] text-white shadow-[0_12px_28px_rgba(245,35,35,0.35)]"
                              : "border-white/15 bg-white/[0.04] text-white hover:border-[#f5a623]/60"
                          }`}
                        >
                          {n === 10 ? "10+" : n}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <aside className="h-fit min-w-0 rounded-[24px] border border-[#f5a623]/20 bg-[#17100d]/92 p-4 shadow-elegant backdrop-blur sm:p-5 md:rounded-[28px] md:p-6">
                <h2 className="font-display text-2xl">Reservation summary</h2>
                <div className="mt-3 h-0.5 w-14 bg-[#f52323]" />

                <dl className="mt-5 space-y-3 text-sm">
                  <SummaryRow icon={CalIcon} k="Date" v={format(date, "EEEE, d MMM")} />
                  <SummaryRow icon={Clock} k="Time" v={time} />
                  <SummaryRow icon={Users} k="Guests" v={`${guests} ${guests === 1 ? "Guest" : "Guests"}`} />
                  <SummaryRow icon={MapPin} k="Location" v="Maison Olive" />
                </dl>

                <div className="mt-5 space-y-2.5">
                  <Input icon={User} placeholder="Full name" />
                  <Input icon={Mail} placeholder="Email address" />
                </div>

                <button
                  onClick={() => setDone(true)}
                  className="mt-4 inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#f52323] px-6 py-3.5 text-sm font-bold text-white shadow-[0_18px_38px_rgba(245,35,35,0.32)] transition hover:-translate-y-0.5 hover:bg-[#dd1717]"
                >
                  Confirm reservation
                  <ArrowRight className="h-5 w-5" />
                </button>

                <p className="mt-4 flex items-center justify-center gap-2 text-xs text-white/45">
                  <ShieldCheck className="h-4 w-4" />
                  Your information is safe and secure.
                </p>
              </aside>
            </>
          )}
        </div>
      </section>
    </Layout>
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
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#f52323]/35 bg-[#f52323]/10 text-[#f52323]">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <p className="font-bold text-white">{title}</p>
        <p className="mt-0.5 text-[11px] text-white/62">{desc}</p>
      </div>
    </div>
  );
}

function SectionTitle({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <div className="flex items-center gap-3 text-base font-bold">
      <Icon className="h-5 w-5 text-[#f52323]" />
      {label}
    </div>
  );
}

function ChoiceButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-[16px] border px-4 py-2.5 text-sm font-medium transition ${
        active
          ? "border-[#f52323] bg-[#f52323] text-white shadow-[0_12px_28px_rgba(245,35,35,0.32)]"
          : "border-white/15 bg-white/[0.04] text-white hover:border-[#f5a623]/60"
      }`}
    >
      {children}
    </button>
  );
}

function SummaryRow({
  icon: Icon,
  k,
  v,
}: {
  icon: React.ElementType;
  k: string;
  v: string;
}) {
  return (
    <div className="grid min-w-0 grid-cols-[24px_minmax(0,1fr)_minmax(0,1.2fr)] items-center gap-3 border-b border-[#f5a623]/15 pb-3">
      <Icon className="h-5 w-5 text-[#f52323]" />
      <dt className="min-w-0 text-white/60">{k}</dt>
      <dd className="min-w-0 truncate text-right font-bold text-white">{v}</dd>
    </div>
  );
}

function Input({ icon: Icon, placeholder }: { icon: React.ElementType; placeholder: string }) {
  return (
    <label className="relative block">
      <Icon className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/70" />
      <input
        placeholder={placeholder}
        className="w-full rounded-full border border-[#f5a623]/20 bg-white/[0.05] py-3 pl-11 pr-4 text-sm text-white placeholder:text-white/48 outline-none transition focus:border-[#f52323]"
      />
    </label>
  );
}
