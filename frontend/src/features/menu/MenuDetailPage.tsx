import { Link, useNavigate } from "@tanstack/react-router";
import { Star, Clock, Flame, ChevronLeft, Heart, Plus, Minus } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { dishes } from "@/lib/data";
import { useCart } from "@/lib/cart-store";
import DishCard from "@/components/common/DishCard";

export function MenuDetailPage({ id }: { id: string }) {
  const dish = dishes.find((d) => d.id === id);
  const nav = useNavigate();
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [fav, setFav] = useState(false);

  if (!dish) {
    return (
      <Layout>
        <div className="mx-auto max-w-2xl px-6 py-32 text-center">
          <h1 className="font-display text-4xl">Dish not found</h1>
          <Link to="/menu" className="mt-6 inline-block text-primary underline">
            Back to menu
          </Link>
        </div>
      </Layout>
    );
  }

  const related = dishes.filter((d) => d.id !== dish.id).slice(0, 3);

  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-6 pt-8 md:px-8">
        <Link
          to="/menu"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" /> Back to menu
        </Link>

        <div className="mt-6 grid gap-10 md:grid-cols-2 md:gap-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="relative aspect-square overflow-hidden rounded-[38%_62%_55%_45%/50%_45%_55%_50%] shadow-elegant">
              <img src={dish.image} alt={dish.name} className="h-full w-full object-cover" />
            </div>
            <button
              onClick={() => setFav((v) => !v)}
              className="glass absolute right-4 top-4 grid h-12 w-12 place-items-center rounded-full shadow-float"
              aria-label="Favorite"
            >
              <Heart
                className={`h-5 w-5 ${fav ? "fill-destructive text-destructive" : "text-foreground"}`}
              />
            </button>
          </motion.div>

          <div className="flex flex-col justify-center">
            <div className="flex flex-wrap gap-2">
              {dish.tags.map((t) => (
                <span key={t} className="rounded-full bg-secondary px-3 py-1 text-xs">
                  {t}
                </span>
              ))}
            </div>
            <h1 className="mt-4 font-display text-5xl leading-tight md:text-6xl">{dish.name}</h1>
            <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-gold text-gold" /> {dish.rating} ({dish.reviews})
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" /> {dish.prepTime}
              </span>
              <span className="flex items-center gap-1">
                <Flame className="h-4 w-4" /> {dish.calories} cal
              </span>
            </div>
            <p className="mt-6 text-lg text-muted-foreground">{dish.description}</p>

            <div className="mt-8 rounded-3xl bg-card p-5 shadow-soft">
              <h3 className="font-display text-lg">Choose your size</h3>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {["Regular", "Large", "Family"].map((s, i) => (
                  <button
                    key={s}
                    className={`rounded-2xl border px-4 py-3 text-sm transition ${
                      i === 0
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background hover:bg-secondary"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between gap-4">
              <div className="flex items-center gap-1 rounded-full bg-card p-1.5 shadow-soft">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="grid h-10 w-10 place-items-center rounded-full hover:bg-secondary"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center font-medium">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <button
                onClick={() => {
                  for (let i = 0; i < qty; i++) add(dish);
                  nav({ to: "/cart" });
                }}
                className="group flex flex-1 items-center justify-between rounded-full bg-primary px-6 py-4 text-primary-foreground shadow-float transition hover:scale-[1.01]"
              >
                <span className="text-sm font-medium">Add to cart</span>
                <span className="font-display text-lg">${(dish.price * qty).toFixed(2)}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-24">
          <h2 className="font-display text-3xl">You might also love</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((d, i) => (
              <DishCard key={d.id} dish={d} index={i} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
