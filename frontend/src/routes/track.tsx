import { createFileRoute } from "@tanstack/react-router";
import { TrackPage } from "@/features/tracking/TrackPage";

export const Route = createFileRoute("/track")({
  component: TrackPage,
  head: () => ({ meta: [{ title: "Track Order — Maison Olive" }] }),
});
