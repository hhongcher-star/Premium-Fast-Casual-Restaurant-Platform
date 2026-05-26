import { createFileRoute } from "@tanstack/react-router";
import { CheckoutPage } from "@/features/checkout/CheckoutPage";

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
  head: () => ({ meta: [{ title: "Checkout — Maison Olive" }] }),
});
