import { Link, useNavigate } from "@tanstack/react-router";
import {
  Star,
  Clock,
  Flame,
  ChevronLeft,
  Heart,
  Plus,
  Minus,
  ShieldCheck,
  Truck,
  Leaf,
  Check,
} from "lucide-react";
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
  const [selectedSize, setSelectedSize] = useState(0);

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

  const sizeOptions = dish.sizes ?? [];
  const hasSizeOptions = sizeOptions.length > 0;
  const chosenSize = sizeOptions[selectedSize];
  const unitPrice = hasSizeOptions ? sizeOptions[selectedSize]?.price ?? dish.price : dish.price;
  const related = dishes.filter((d) => d.id !== dish.id).slice(0, 4);

  const addToCart = () => {
    const cartDish = { ...dish, price: unitPrice };

    for (let i = 0; i < qty; i++) add(cartDish, chosenSize?.name);
    nav({ to: "/cart" });
  };

  return (
    <Layout>
      <section className="-mb-24 bg-[#0d0a08] px-5 pb-16 pt-7 text-white md:px-8 md:pt-10">
        <div className="mx-auto max-w-7xl">
          <Link
            to="/menu"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#f5a623] transition hover:text-[#f52323]"
          >
            <ChevronLeft className="h-4 w-4" /> Back to menu
          </Link>

          <div className="mt-5 grid gap-7 lg:grid-cols-[1fr_0.9fr] lg:gap-14">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative overflow-hidden rounded-[28px] border border-[#f52323]/25 bg-[#171210] shadow-elegant"
            >
              <div className="relative aspect-[4/3] md:aspect-square">
                <img
                  src={dish.image}
                  alt={dish.name}
                  loading="eager"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              </div>
              <button
                onClick={() => setFav((v) => !v)}
                className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full border border-[#f5a623]/50 bg-black/45 backdrop-blur transition hover:border-[#f52323]"
                aria-label="Favorite"
              >
                <Heart className={`h-5 w-5 ${fav ? "fill-[#f52323] text-[#f52323]" : "text-white"}`} />
              </button>
              <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 rounded-2xl border border-white/10 bg-black/55 px-3 py-3 text-xs backdrop-blur sm:text-sm">
                <span className="flex items-center justify-center gap-1.5">
                  <Flame className="h-4 w-4 text-[#f5a623]" /> {dish.calories} cal
                </span>
                <span className="flex items-center justify-center gap-1.5 border-x border-white/15">
                  <Clock className="h-4 w-4 text-[#f5a623]" /> {dish.prepTime}
                </span>
                <span className="flex items-center justify-center gap-1.5">
                  <Star className="h-4 w-4 fill-[#f5a623] text-[#f5a623]" /> {dish.rating}
                </span>
              </div>
            </motion.div>

            <div className="flex flex-col justify-center">
              <div className="flex flex-wrap gap-2">
                {dish.tags.map((t) => (
                  <span key={t} className="rounded-full bg-[#f52323] px-3 py-1 text-xs font-bold text-white">
                    {t}
                  </span>
                ))}
              </div>

              <h1 className="mt-4 font-display text-4xl leading-tight text-white sm:text-5xl md:text-6xl">
                {dish.name}
              </h1>
              <div className="mt-4 h-0.5 w-20 bg-[#f52323]" />
              <p className="mt-5 text-base leading-8 text-white/65 md:text-lg">{dish.description}</p>

              {hasSizeOptions ? (
                <div className="mt-7">
                  <h3 className="font-display text-lg text-white">Choose your size</h3>
                  <div className="mt-3 grid grid-cols-[repeat(3,minmax(112px,1fr))] gap-2 overflow-x-auto pb-1 sm:gap-3">
                    {sizeOptions.map((size, i) => (
                      <button
                        key={size.name}
                        onClick={() => setSelectedSize(i)}
                        className={`relative rounded-2xl border px-2 py-4 text-center transition sm:px-4 sm:py-5 ${
                          selectedSize === i
                            ? "border-[#f5a623] bg-[#2a1f13] shadow-[0_0_24px_rgba(245,166,35,0.18)]"
                            : "border-white/12 bg-[#171210] hover:border-[#f52323]/60"
                        }`}
                      >
                        <span className="block text-sm font-bold text-white sm:text-base">{size.name}</span>
                        <span className="mt-1 block text-xs font-semibold text-[#f5a623] sm:text-sm">
                          ${size.price.toFixed(2)}
                        </span>
                        {selectedSize === i ? (
                          <span className="absolute right-2 top-2 grid h-5 w-5 place-items-center rounded-full bg-[#f5a623] text-black">
                            <Check className="h-3 w-3" />
                          </span>
                        ) : null}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex w-full items-center justify-between rounded-full border border-white/12 bg-[#171210] p-1.5 sm:w-36">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="grid h-10 w-10 place-items-center rounded-full text-white transition hover:bg-white/10"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="text-lg font-bold">{qty}</span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="grid h-10 w-10 place-items-center rounded-full bg-[#f52323] text-white"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <button
                  onClick={addToCart}
                  className="flex flex-1 items-center justify-between rounded-full bg-[#f52323] px-6 py-4 text-white shadow-[0_18px_40px_rgba(245,35,35,0.28)] transition hover:bg-[#d81717]"
                >
                  <span className="text-sm font-bold">Add to cart</span>
                  <span className="font-display text-lg">${(unitPrice * qty).toFixed(2)}</span>
                </button>
              </div>

              <div className="mt-7 grid grid-cols-3 gap-3 text-xs text-white/70">
                <div className="rounded-2xl border border-white/10 bg-[#171210] p-3">
                  <Leaf className="mb-2 h-5 w-5 text-[#f5a623]" />
                  Freshly made
                </div>
                <div className="rounded-2xl border border-white/10 bg-[#171210] p-3">
                  <Truck className="mb-2 h-5 w-5 text-[#f52323]" />
                  Fast delivery
                </div>
                <div className="rounded-2xl border border-white/10 bg-[#171210] p-3">
                  <ShieldCheck className="mb-2 h-5 w-5 text-[#f5a623]" />
                  Secure checkout
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 md:mt-20">
            <h2 className="font-display text-3xl text-white">You might also love</h2>
            <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
              {related.map((d, i) => (
                <DishCard key={d.id} dish={d} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
