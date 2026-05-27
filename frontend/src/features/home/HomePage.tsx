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
        <div className="relative mx-auto flex min-h-[430px] max-w-7xl items-center px-0 py-10 md:min-h-[620px] md:px-8 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, ease: "easeOut", delay: 0.08 }}
            className="z-10 max-w-xl px-6 md:px-0"
          >
            <h1 className="mt-6 max-w-lg font-display text-4xl font-black uppercase leading-[0.95] tracking-tight text-white md:text-7xl">
              <span className="text-[#f04b3f]">Fresh hot &</span>
              <br />
              <span className="text-white">made to love.</span>
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
        <section className="relative z-10 -mt-10 mx-auto max-w-7xl px-5 md:-mt-16 md:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden rounded-[28px] border border-[#f52323]/25 shadow-elegant"
            >
              <img
                src={promoLeft}
                alt="Fresh burger meal"
                loading="lazy"
                decoding="async"
                className="h-[180px] w-full object-cover object-center md:h-[220px]"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex min-h-[180px] items-center justify-between overflow-hidden rounded-[24px] border border-[#f52323]/35 bg-gradient-to-br from-[#3b1511] to-[#171210] p-6 text-white shadow-elegant md:min-h-[220px] md:rounded-[28px] md:p-8"
            >
              <div className="max-w-xs">
                <h3 className="font-display text-3xl font-black uppercase text-[#f04b3f]">
                  Dek floud
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/68">
                  Freshly baked comfort food, bold flavours and warm everyday bites.
                </p>
              </div>

              <img
                src={promoRight}
                alt="Pizza feature"
                loading="lazy"
                decoding="async"
                className="h-40 w-40 object-contain"
              />
            </motion.div>
          </div>
        </section>

          <section className="mx-auto mt-14 max-w-6xl px-5 md:mt-16 md:px-8">
        <div className="mb-9 text-center">
    <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#f04b3f]">
      Why Choose Us
    </p>

    <div className="mx-auto mt-4 flex w-40 items-center justify-center gap-3 text-[#f04b3f]">
      <span className="h-px flex-1 bg-[#f04b3f]" />
      <Leaf className="h-4 w-4" />
      <span className="h-px flex-1 bg-[#f04b3f]" />
    </div>

    <h2 className="mt-6 font-display text-3xl text-white md:text-5xl">
      Fresh, fast, and rewarding.
    </h2>

    <p className="mx-auto mt-4 max-w-xl text-base text-white/60">
      We make it easy to eat well every day.
    </p>
  </div>

  <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 md:gap-6">
    {[
      {
        icon: Leaf,
        title: "Sourced locally",
        desc: "From farms within 80 miles. Supporting local. Always fresh.",
      },
      {
        icon: Clock,
        title: "Ready in 15 min",
        desc: "Fast doesn't mean rushed. Chef-prepared and delivered quick.",
      },
      {
        icon: Award,
        title: "Rewards on every order",
        desc: "Earn points with every bite. Unlock perks and save more.",
      },
    ].map((f, i) => (
      <motion.div
        key={f.title}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: i * 0.12 }}
        className="group relative min-h-[190px] overflow-hidden rounded-[20px] border border-[#f52323]/20 bg-gradient-to-br from-[#2a1411] to-[#171210] p-4 text-white shadow-soft transition duration-300 hover:-translate-y-2 hover:border-[#f52323]/55 sm:min-h-[220px] sm:rounded-[24px] sm:p-6 md:min-h-[260px] md:rounded-[28px] md:p-8"
      >
        <div className="grid h-12 w-12 place-items-center rounded-full bg-[#f52323] text-white shadow-lg">
          <f.icon className="h-5 w-5" />
        </div>

        <h3 className="mt-6 font-display text-xl leading-tight sm:mt-8 sm:text-2xl">{f.title}</h3>

        <div className="mt-4 h-0.5 w-10 bg-[#f52323]" />

        <p className="mt-4 max-w-xs text-xs leading-5 text-white/60 sm:mt-5 sm:text-sm sm:leading-6">
          {f.desc}
        </p>

        <div className="absolute bottom-4 right-4 text-[#f52323]/8 transition group-hover:text-[#f52323]/14">
          <f.icon className="h-20 w-20 sm:h-24 sm:w-24" />
        </div>
      </motion.div>
    ))}
  </div>
</section>

        <section className="mx-auto mt-20 max-w-6xl px-6 md:px-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#f04b3f]">
                The Menu
              </span>
              <h2 className="mt-2 font-display text-3xl text-white md:text-5xl">
                Signature dishes
              </h2>
            </div>

            <Link
              to="/menu"
              className="hidden items-center gap-2 rounded-full border border-[#f52323]/35 px-5 py-2.5 text-sm text-white hover:bg-[#f52323]/15 md:inline-flex"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
            {dishes.slice(0, 6).map((d, i) => (
              <DishCard key={d.id} dish={d} index={i} />
            ))}
          </div>
        </section>

        <section className="mx-auto mt-20 max-w-7xl px-5 md:mt-28 md:px-8">
          <div className="relative overflow-hidden rounded-4xl shadow-elegant">
            <img
              src={interior}
              alt="Restaurant interior"
              loading="lazy"
              decoding="async"
              className="h-[520px] w-full object-cover md:h-[460px]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />
            <div className="absolute inset-0 flex items-center p-6 md:p-16">
              <div className="max-w-lg text-white">
                <h2 className="font-display text-3xl leading-tight md:text-5xl">
                  A quiet corner, reserved for you.
                </h2>
                <p className="mt-4 text-white/80">
                  Book a table in seconds. Skip the queue, sip a glass, stay a while.
                </p>
                <Link
                  to="/reserve"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#f04b3f] px-6 py-3.5 text-sm font-medium text-white shadow-float transition hover:scale-[1.02] hover:bg-[#d93f35]"
                >
                  Reserve a table <ArrowRight className="h-4 w-4" />
                </Link>
                
              </div>
            </div>
          </div>
        </section>
        <section className="mx-auto mt-20 max-w-6xl px-6 md:px-8">
  <div className="flex items-center gap-4 border-t border-[#f52323]/30 pt-10 text-[#f04b3f]">
    <span className="h-px flex-1 bg-[#f52323]/30" />
    <Leaf className="h-5 w-5" />
    <span className="h-px flex-1 bg-[#f52323]/30" />
  </div>

  <div className="mt-10">
    <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#f04b3f]">
      Find Us
    </p>

    <h2 className="mt-3 font-display text-3xl text-white md:text-5xl">
      Location & Opening Hours
    </h2>

    <p className="mt-3 text-base text-white/60">
      We'd love to welcome you. Here's how to find us.
    </p>
  </div>

  <div className="mt-8 grid gap-6 md:grid-cols-[0.9fr_1.3fr]">
    <div className="rounded-[24px] border border-[#f52323]/20 bg-gradient-to-br from-[#261411] to-[#171210] p-6 shadow-soft md:rounded-[28px] md:p-8">
      <div className="mb-6 flex items-center gap-4">
        <div className="grid h-14 w-14 place-items-center rounded-full bg-[#f04b3f] text-white">
          <Leaf className="h-7 w-7" />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#f04b3f]">
            Maison Olive
          </p>
          <p className="mt-1 text-sm text-white/60">Kuala Lumpur, Malaysia</p>
        </div>
      </div>

      <div className="space-y-6 text-white/80">
        <div className="border-t border-white/10 pt-5">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#f04b3f]">
            Address
          </p>
          <p className="mt-2 text-base">123 Olive Street, Kuala Lumpur, Malaysia</p>
        </div>

        <div className="border-t border-white/10 pt-5">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#f04b3f]">
            Opening Hours
          </p>
          <p className="mt-2 text-base">Mon - Sun · 11:00 AM - 10:00 PM</p>
        </div>

        <div className="border-t border-white/10 pt-5">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#f04b3f]">
            Contact
          </p>
          <p className="mt-2 text-base">+60 12-345 6789</p>
        </div>
      </div>
    </div>

    <div className="relative min-h-[300px] overflow-hidden rounded-[24px] border border-white/10 bg-[#211c1a] shadow-soft md:min-h-[360px] md:rounded-[28px]">
      <iframe
        title="Maison Olive location"
        src="https://www.google.com/maps?q=Kuala%20Lumpur&output=embed"
        className="h-full min-h-[300px] w-full opacity-80 grayscale invert md:min-h-[360px]"
        loading="lazy"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />

      <a
        href="https://www.google.com/maps/search/?api=1&query=Kuala%20Lumpur"
        target="_blank"
        rel="noreferrer"
        className="absolute bottom-6 left-6 rounded-full bg-black/70 px-5 py-3 text-sm font-medium text-white backdrop-blur-md transition hover:bg-[#f04b3f]"
      >
        Open in Google Maps ↗
      </a>
    </div>
  </div>
</section>
      </div>
    </Layout>
  );
}
