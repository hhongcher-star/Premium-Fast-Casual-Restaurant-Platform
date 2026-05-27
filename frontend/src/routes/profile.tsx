import { createFileRoute } from "@tanstack/react-router";
import { ProfilePage } from "@/features/profile/ProfilePage";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
  head: () =>
    seo({
      title: "Profile",
      description: "Manage your Maison Olive profile, saved details, preferences, and recent dining activity.",
      path: "/profile",
      robots: "noindex,follow",
    }),
});
