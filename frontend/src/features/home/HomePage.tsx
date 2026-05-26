import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Award, Clock, Leaf } from "lucide-react";
import DishCard from "@/components/common/DishCard";
import Layout from "@/components/layout/Layout";
import { dishes } from "@/lib/data";
import hero from "@/assets/burger.jpg";
import interior from "@/assets/restaurant-interior.jpg";
import promoLeft from "@/assets/promo-left.jpg";
import promoRight from "@/assets/pizzaa.png";

export function HomePage() {
  return (
    <Layout>
      <section
        className="relative overflow-hidden"
        style={{
          backgroundColor: "#211c1a",
          backgroundImage: `linear-gradient(to right,
            rgba(0,0,0,0.88),
            rgba(0,0,0,0.45),
            rgba(0,0,0,0.2)),
            url(${hero})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="relative mx-auto flex min-h-[620px] max-w-7xl items-center px-6 py-20 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, ease: "easeOut", delay: 0.08 }}
            className="z-10 max-w-xl"
          >
            <h1 className="mt-6 max-w-lg font-display text-5xl font-black uppercase leading-[0.95] tracking-tight text-white md:text-7xl">
              <span className="text-[#f04b3f]">Fresh hot &</span>
              <br />
              <span className="text-[#f5a623]">made to love.</span>
            </h1>

            <p className="mt-5 max-w-md text-sm leading-6 text-white md:text-base">
              Taste the best handcrafted dishes made with premium ingredients,
              bold flavours and everyday comfort.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 rounded-full bg-[#f04b3f] px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-float transition hover:scale-[1.03]"
              >
                Order now
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="bg-[#14110f] pb-24">
        <section className="relative z-10 -mt-16 mx-auto max-w-7xl px-6 md:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden rounded-[28px] shadow-elegant"
            >
              <img
                src={promoLeft}
                alt="Fresh burger meal"
                className="h-[220px] w-full object-cover object-center"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex min-h-[220px] items-center justify-between overflow-hidden rounded-[28px] bg-[#f5a623] p-8 shadow-elegant"
            >
              <div className="max-w-xs">
                <h3 className="font-display text-3xl font-black uppercase text-[#211c1a]">
                  Dek floud
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#211c1a]/75">
                  Freshly baked comfort food, bold flavours and warm everyday bites.
                </p>
              </div>

              <img
                src={promoRight}
                alt="Pizza feature"
                className="h-40 w-40 object-contain"
              />
            </motion.div>
          </div>
        </section>

        <section className="mx-auto mt-16 max-w-7xl px-6 md:px-8">
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
                className="rounded-3xl bg-[#211c1a] p-6 text-white shadow-soft"
              >
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#f5a623] text-[#211c1a]">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-xl">{f.title}</h3>
                <p className="mt-1 text-sm text-white/60">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-24 max-w-7xl px-6 md:px-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#f5a623]">
                The Menu
              </span>
              <h2 className="mt-2 font-display text-4xl text-white md:text-5xl">
                Signature dishes
              </h2>
            </div>

            <Link
              to="/menu"
              className="hidden items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm text-white hover:bg-white/10 md:inline-flex"
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
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />
            <div className="absolute inset-0 flex items-center p-8 md:p-16">
              <div className="max-w-lg text-white">
                <h2 className="font-display text-4xl leading-tight md:text-5xl">
                  A quiet corner, reserved for you.
                </h2>
                <p className="mt-4 text-white/80">
                  Book a table in seconds. Skip the queue, sip a glass, stay a while.
                </p>
                <Link
                  to="/reserve"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#f5a623] px-6 py-3.5 text-sm font-medium text-[#211c1a] shadow-float hover:scale-[1.02]"
                >
                  Reserve a table <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}