import { Award, Coffee, Crown, Gift, Pizza, Sparkles, Star, UserPlus } from "lucide-react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import hero from "@/assets/restaurant.jpg";
import espresso from "@/assets/restaurant-interior.jpg";
import dessert from "@/assets/dish-dessert.jpg";
import pizza from "@/assets/dish-pizza.jpg";
import tasting from "@/assets/hero-dish.jpg";

const TIERS = [
  {
    name: "Silver",
    min: 0,
    benefits: ["5% back on every order", "Birthday treat", "-"],
  },
  {
    name: "Gold",
    min: 1500,
    current: true,
    benefits: ["10% back on every order", "Priority seating", "Free monthly drink"],
  },
  {
    name: "Platinum",
    min: 5000,
    benefits: ["15% back on every order", "Chef's table access", "Curated gift box"],
  },
];

const REWARDS = [
  { icon: Coffee, name: "Espresso on us", pts: 200, image: espresso },
  { icon: Gift, name: "Free dessert", pts: 600, image: dessert },
  { icon: Pizza, name: "Free signature pizza", pts: 1200, image: pizza },
  { icon: Award, name: "Chef's tasting menu", pts: 3000, image: tasting },
];

const EARN = [
  { icon: Gift, title: "More ways to earn", desc: "Complete three actions this week" },
  { icon: Coffee, title: "Follow us on Instagram", desc: "+100 pts" },
  { icon: Star, title: "Leave a review", desc: "+150 pts" },
  { icon: UserPlus, title: "Refer a friend", desc: "+200 pts" },
];

export function RewardsPage() {
  const points = 2840;
  const next = 5000;
  const progress = (points / next) * 100;

  return (
    <Layout>
      <section className="-mb-24 bg-[#0d0a08] pb-8 text-white">
        <div
          className="relative overflow-hidden px-4 py-9 md:px-8 md:py-14"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(13,10,8,0.98) 0%, rgba(13,10,8,0.76) 42%, rgba(13,10,8,0.26) 100%), url(${hero})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.36, ease: "easeOut" }}
            className="relative mx-auto max-w-6xl"
          >
            <div className="max-w-md">
              <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#c79b45]">
                Maison Rewards
              </p>
              <h1 className="mt-3 font-display text-4xl leading-[0.92] md:text-6xl">
                Every plate,
                <br />
                <span className="text-[#f52323]">a reward.</span>
              </h1>
              <p className="mt-4 max-w-sm text-sm leading-6 text-white/65">
                Earn points with every order and unlock exclusive perks just for you.
              </p>
            </div>
          </motion.div>
        </div>

        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, ease: "easeOut", delay: 0.06 }}
            className="mt-5 overflow-hidden rounded-[20px] bg-[#374f24] p-5 shadow-elegant md:p-7"
          >
            <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-end">
              <div>
                <div className="flex items-center gap-2 text-xs text-[#f6d08a]">
                  <Crown className="h-4 w-4" />
                  Gold member · Sofia
                </div>
                <div className="mt-2 font-display text-5xl leading-none md:text-6xl">
                  {points.toLocaleString()} <span className="text-lg text-white/72">pts</span>
                </div>
                <div className="mt-5 max-w-md">
                  <div className="flex justify-between text-[11px] text-white/70">
                    <span>Gold</span>
                    <span>{(next - points).toLocaleString()} pts to Platinum</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/18">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-[#f5a623] to-[#f52323]"
                    />
                  </div>
                </div>
              </div>
              <div className="inline-flex w-fit items-center gap-3 rounded-full border border-[#f6d08a]/35 bg-black/10 px-5 py-3">
                <Sparkles className="h-5 w-5 text-[#f6d08a]" />
                <div>
                  <div className="text-[10px] text-white/60">This month</div>
                  <div className="font-display text-2xl">+420 pts</div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {TIERS.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-[18px] border p-5 ${
                  tier.current
                    ? "border-[#c79b45]/70 bg-[#2a2113]"
                    : "border-white/10 bg-[#171210]"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span
                    className={`rounded-full px-3 py-1 text-[10px] font-bold ${
                      tier.current ? "bg-[#f5a623] text-[#211c1a]" : "bg-white text-[#211c1a]"
                    }`}
                  >
                    {tier.name}
                  </span>
                  {tier.current && <span className="text-[10px] text-white/55">Current</span>}
                </div>
                <div className="mt-3 font-display text-3xl">
                  {tier.min.toLocaleString()}+ <span className="text-sm text-white/55">pts</span>
                </div>
                <ul className="mt-4 space-y-1.5 text-xs leading-5 text-white/70">
                  {tier.benefits.map((benefit) => (
                    <li key={benefit}>· {benefit}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-7 flex items-center justify-between gap-4">
            <h2 className="font-display text-2xl text-[#f5a623]">Redeem your points</h2>
            <button className="text-xs font-bold text-[#f52323]">View all rewards →</button>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {REWARDS.map((reward, index) => {
              const canRedeem = points >= reward.pts;
              return (
                <motion.div
                  key={reward.name}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="overflow-hidden rounded-[18px] border border-white/10 bg-[#171210] p-3 shadow-soft"
                >
                  <div className="relative overflow-hidden rounded-[14px]">
                    <img
                      src={reward.image}
                      alt={reward.name}
                      loading="lazy"
                      decoding="async"
                      className="h-24 w-full object-cover transition duration-500 hover:scale-105 md:h-28"
                    />
                    <div className="absolute left-2 top-2 grid h-9 w-9 place-items-center rounded-full bg-[#bb8527] text-white">
                      <reward.icon className="h-4 w-4" />
                    </div>
                  </div>
                  <h3 className="mt-3 font-display text-base leading-tight">{reward.name}</h3>
                  <p className="mt-1 text-xs text-white/58">{reward.pts} pts</p>
                  <button
                    disabled={!canRedeem}
                    className={`mt-3 w-full rounded-full py-2 text-xs font-bold transition ${
                      canRedeem
                        ? "bg-[#f52323] text-white hover:bg-[#dd1717]"
                        : "bg-white/15 text-white/55"
                    }`}
                  >
                    {canRedeem ? "Redeem" : "Keep earning"}
                  </button>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-5 grid gap-1.5 rounded-[18px] border border-white/10 bg-[#171210] p-3 md:grid-cols-4 md:gap-2">
            {EARN.map((item) => (
              <div key={item.title} className="flex items-center gap-3 rounded-[14px] p-1.5 md:p-2">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#bb8527] text-white">
                  <item.icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">{item.title}</p>
                  <p className="mt-0.5 text-[11px] text-white/50">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
