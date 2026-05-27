import { Bike, Check, ChefHat, ChevronRight, Clock, Headphones, Home, MapPin, Navigation, Package, Phone, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import hero from "@/assets/dish-burger.jpg";

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
      <section className="bg-[#0d0a08] pb-10 text-white md:-mb-24 md:pb-12">
        <div
          className="relative px-5 py-8 md:px-8 md:py-12"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(13,10,8,0.98), rgba(13,10,8,0.72), rgba(13,10,8,0.12)), url(${hero})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#f5a623]">
              Order #MO-58241
            </p>
            <h1 className="mt-4 max-w-2xl font-display text-4xl leading-[0.95] md:text-6xl">
              On its <span className="text-[#f52323]">way to you</span>
            </h1>
            <div className="mt-4 h-0.5 w-14 bg-[#f52323]" />
            <p className="mt-4 max-w-xl text-sm leading-6 text-white/70 md:text-lg md:leading-7">
              Estimated arrival in 18-24 minutes. We'll text you when your courier is close.
            </p>
          </div>
        </div>

        <div className="mx-auto -mt-6 max-w-7xl space-y-5 px-5 md:px-8">
          <div className="rounded-[22px] border border-white/10 bg-[#171210]/95 p-4 shadow-elegant md:rounded-[24px] md:p-6">
            <ol className="flex gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-4 md:gap-4 md:overflow-visible md:pb-0">
              {STEPS.map((s, i) => {
                const done = i <= step;
                const current = i === step;
                return (
                  <li key={s.label} className="relative flex min-w-[150px] items-center gap-3 md:min-w-0 md:flex-col md:text-center">
                    {i > 0 && (
                      <span className={`absolute hidden h-px w-full -translate-x-1/2 bg-white/15 md:left-0 md:top-8 md:block ${i <= step ? "bg-[#f52323]" : ""}`} />
                    )}
                    <motion.div
                      animate={current ? { scale: [1, 1.08, 1] } : {}}
                      transition={{ duration: 1.4, repeat: Infinity }}
                      className={`relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full border shadow-lg md:h-12 md:w-12 ${
                        done
                          ? "border-[#f5a623] bg-[#f5a623] text-[#171210] shadow-[0_0_28px_rgba(245,166,35,0.35)]"
                          : "border-white/15 bg-[#171210] text-white/70"
                      }`}
                    >
                      <s.icon className="h-5 w-5" />
                    </motion.div>
                    <div className="md:mt-3">
                      <div className="font-semibold text-sm md:text-base">{s.label}</div>
                      <div className="mt-1 text-sm text-white/58">{s.desc}</div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="grid gap-5 lg:grid-cols-[0.85fr_1fr]">
            <div className="space-y-5">
              <InfoCard
                iconImage
                eyebrow="Your courier"
                title="Tiago M."
                desc={<><span className="text-[#f5a623]">★</span> 4.95 · 1,246 deliveries</>}
                badge="Electric bike"
                actionIcon={Phone}
              />
              <InfoCard
                icon={MapPin}
                eyebrow="Delivering to"
                title="Rua das Flores 24"
                desc="Lisbon · 1200-194"
                actionIcon={Navigation}
              />
            </div>

            <div className="relative min-h-[260px] overflow-hidden rounded-[22px] border border-white/10 bg-[#171210] shadow-elegant md:min-h-[300px] md:rounded-[24px]">
              <div className="absolute inset-0 opacity-55 [background-image:linear-gradient(30deg,rgba(245,166,35,0.08)_1px,transparent_1px),linear-gradient(120deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:72px_72px,96px_96px]" />
              <div className="absolute inset-x-14 top-1/2 h-16 -translate-y-1/2 border-t-4 border-dashed border-[#f52323]" style={{ borderRadius: "50%" }} />
              <div className="absolute left-[12%] top-[45%] grid h-14 w-14 place-items-center rounded-full bg-[#f52323] shadow-[0_0_30px_rgba(245,35,35,0.45)]">
                <Bike className="h-6 w-6" />
              </div>
              <div className="absolute right-[12%] top-[36%] grid h-16 w-16 place-items-center rounded-full bg-[#922017] shadow-[0_0_34px_rgba(245,35,35,0.42)]">
                <Home className="h-7 w-7" />
              </div>
              <div className="absolute bottom-3 left-3 right-3 grid gap-3 rounded-[16px] border border-white/10 bg-[#171210]/90 p-3 backdrop-blur md:bottom-4 md:left-4 md:right-4 md:grid-cols-[160px_1fr] md:p-4">
                <div className="flex items-center gap-4 border-white/10 md:border-r">
                  <div className="grid h-12 w-12 place-items-center rounded-full border border-[#f52323]/45 bg-[#f52323]/15 text-[#f52323]">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/55">ETA</p>
                    <p className="font-display text-xl text-[#f52323] md:text-2xl">18-24 min</p>
                  </div>
                </div>
                <div>
                  <p className="font-bold">We're preparing your order</p>
                  <p className="mt-1 text-white/62">Fresh ingredients. Made with love. <span className="text-[#f52323]">♥</span></p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 rounded-[18px] border border-white/10 bg-[#171210] p-4 shadow-soft md:flex-row md:items-center md:justify-between md:rounded-[20px]">
            <div className="flex items-center gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-full border border-[#f52323]/35 bg-[#f52323]/10 text-[#f52323]">
                <Headphones className="h-6 w-6" />
              </div>
              <div>
                <p className="font-bold">Need help?</p>
                <p className="text-sm text-white/62">Our support team is here for you.</p>
              </div>
            </div>
            <button className="inline-flex items-center justify-center gap-3 rounded-full border border-[#f52323]/45 px-6 py-3 text-sm font-bold text-white hover:bg-[#f52323]/15">
              Contact support <ChevronRight className="h-4 w-4 text-[#f52323]" />
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
}

function InfoCard({
  icon: Icon,
  iconImage,
  eyebrow,
  title,
  desc,
  badge,
  actionIcon: ActionIcon,
}: {
  icon?: React.ElementType;
  iconImage?: boolean;
  eyebrow: string;
  title: string;
  desc: React.ReactNode;
  badge?: string;
  actionIcon: React.ElementType;
}) {
  return (
    <div className="flex items-center gap-3 rounded-[22px] border border-white/10 bg-[#171210] p-4 shadow-soft md:gap-5 md:rounded-[28px] md:p-6">
      {iconImage ? (
        <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#4a4a4a] to-[#171210] text-2xl md:h-24 md:w-24 md:text-4xl">
          <span>TM</span>
        </div>
      ) : (
        <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-[#f52323]/30 bg-[#f52323]/10 text-[#f52323] md:h-20 md:w-20">
          {Icon && <Icon className="h-6 w-6 md:h-9 md:w-9" />}
        </div>
      )}

      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#f5a623] md:text-xs md:tracking-[0.28em]">
          {eyebrow}
        </p>

        <h2 className="mt-1 font-display text-2xl leading-none md:mt-2 md:text-3xl">
          {title}
        </h2>

        <p className="mt-1 text-sm text-white/62 md:text-base">
          {desc}
        </p>

        {badge && (
          <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#3d5c1f] px-3 py-1 text-xs text-white/90 md:px-4 md:py-1.5 md:text-sm">
            <Bike className="h-3.5 w-3.5 md:h-4 md:w-4" />
            {badge}
          </div>
        )}
      </div>

      <button className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#3d5c1f] text-white md:h-14 md:w-14">
        <ActionIcon className="h-5 w-5 md:h-6 md:w-6" />
      </button>
    </div>
  );
}
