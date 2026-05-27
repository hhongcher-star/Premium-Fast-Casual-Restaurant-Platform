import { createFileRoute } from "@tanstack/react-router";
import { TrackPage } from "@/features/tracking/TrackPage";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/track")({
  component: TrackPage,
  head: () =>
    seo({
      title: "Track Order",
      description: "Track your Maison Olive order status from preparation to delivery.",
      path: "/track",
      robots: "noindex,follow",
    }),
});
