import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import type { Dish } from "@/lib/data";

export default function DishCard({ dish, index = 0 }: { dish: Dish; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="group relative overflow-hidden rounded-[22px] border border-[#f52323]/25 bg-[#171210] text-white shadow-soft transition-all hover:border-[#f52323]/55 hover:shadow-elegant sm:rounded-3xl"
    >
      <Link to="/menu/$id" params={{ id: dish.id }} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <img
            src={dish.image}
            alt={dish.name}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute left-2.5 top-2.5 flex gap-2 sm:left-4 sm:top-4">
            {dish.tags.slice(0, 1).map((t) => (
              <span
                key={t}
                className="rounded-full bg-[#f52323] px-2.5 py-1 text-[10px] font-bold text-white shadow-md sm:px-3 sm:text-xs"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-[10px] font-bold text-[#211c1a] shadow-md sm:bottom-4 sm:right-4 sm:px-2.5 sm:text-xs">
            <Star className="h-3 w-3 fill-gold text-gold" />
            {dish.rating}
          </div>
        </div>
        <div className="p-3 sm:p-5">
          <div className="flex items-start justify-between gap-2 sm:items-baseline sm:gap-3">
            <h3 className="font-display text-2xl leading-tight md:text-4xl">{dish.name}</h3>
            <span className="whitespace-nowrap font-display text-base text-[#f5a623] sm:text-xl">
              ${dish.price}
            </span>
          </div>
          <p className="mt-3 text-sm leading-6 text-white/65 md:text-base md:leading-7">{dish.description}</p>
        </div>
      </Link>
    </motion.div>
  );
}
