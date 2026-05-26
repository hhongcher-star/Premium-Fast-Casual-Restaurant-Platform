import { Link } from "@tanstack/react-router";
import { Star, Plus } from "lucide-react";
import { motion } from "framer-motion";
import type { Dish } from "@/lib/data";
import { useCart } from "@/lib/cart-store";

export default function DishCard({ dish, index = 0 }: { dish: Dish; index?: number }) {
  const { add } = useCart();
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="group relative overflow-hidden rounded-3xl bg-card shadow-soft transition-all hover:shadow-elegant"
    >
      <Link to="/menu/$id" params={{ id: dish.id }} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <img
            src={dish.image}
            alt={dish.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute left-4 top-4 flex gap-2">
            {dish.tags.slice(0, 1).map((t) => (
              <span
                key={t}
                className="glass rounded-full px-3 py-1 text-xs font-medium text-foreground"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="glass absolute bottom-4 right-4 flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium">
            <Star className="h-3 w-3 fill-gold text-gold" />
            {dish.rating}
          </div>
        </div>
        <div className="p-5">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="font-display text-xl leading-tight text-foreground">{dish.name}</h3>
            <span className="whitespace-nowrap font-display text-xl text-primary">
              ${dish.price}
            </span>
          </div>
          <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">{dish.description}</p>
        </div>
      </Link>
      <button
        onClick={() => add(dish)}
        className="absolute bottom-5 right-5 grid h-11 w-11 translate-y-2 place-items-center rounded-full bg-primary text-primary-foreground opacity-0 shadow-float transition-all group-hover:translate-y-0 group-hover:opacity-100 hover:scale-110"
        aria-label="Add to cart"
      >
        <Plus className="h-5 w-5" />
      </button>
    </motion.div>
  );
}
