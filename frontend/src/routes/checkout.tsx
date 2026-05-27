import { createFileRoute } from "@tanstack/react-router";
import { CheckoutPage } from "@/features/checkout/CheckoutPage";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
  head: () =>
    seo({
      title: "Checkout",
      description: "Complete your Maison Olive order with secure checkout and delivery details.",
      path: "/checkout",
      robots: "noindex,nofollow",
    }),
});
