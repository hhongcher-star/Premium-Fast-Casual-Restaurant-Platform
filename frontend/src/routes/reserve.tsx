import { createFileRoute } from "@tanstack/react-router";
import { ReservePage } from "@/features/reservations/ReservePage";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/reserve")({
  component: ReservePage,
  head: () =>
    seo({
      title: "Reserve",
      description:
        "Book a table at Maison Olive for dinner, celebrations, and seasonal chef-led fast-casual dining.",
      path: "/reserve",
    }),
});
