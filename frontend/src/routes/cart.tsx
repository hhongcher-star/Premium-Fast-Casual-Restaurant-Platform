import { createFileRoute } from "@tanstack/react-router";
import { CartPage } from "@/features/cart/CartPage";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/cart")({
  component: CartPage,
  head: () =>
    seo({
      title: "Cart",
      description: "Review your Maison Olive order, adjust quantities, apply promo codes, and continue to checkout.",
      path: "/cart",
      robots: "noindex,follow",
    }),
});
