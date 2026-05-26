import { createFileRoute } from "@tanstack/react-router";
import { ReservePage } from "@/features/reservations/ReservePage";

export const Route = createFileRoute("/reserve")({
  component: ReservePage,
  head: () => ({ meta: [{ title: "Reserve — Maison Olive" }] }),
});
