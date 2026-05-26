import { createFileRoute } from "@tanstack/react-router";
import { MenuDetailPage } from "@/features/menu/MenuDetailPage";

export const Route = createFileRoute("/menu/$id")({
  component: MenuDetailRoute,
});

function MenuDetailRoute() {
  const { id } = Route.useParams();

  return <MenuDetailPage id={id} />;
}
