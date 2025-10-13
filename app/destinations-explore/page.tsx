import { DestinationExploreView } from "@/src/presentation/components/destinations/DestinationExploreView";
import { ExploreDestinationsSkeleton } from "@/src/presentation/components/destinations/ExploreDestinationsSkeleton";
import { DestinationsPresenterFactory } from "@/src/presentation/presenters/destinations/DestinationsPresenter";
import { Suspense } from "react";

export async function generateMetadata() {
  return {
    title: "สำรวจจุดหมายปลายทางทั้งหมด | Triply",
    description: "ค้นหาและสำรวจจุดหมายปลายทางทั้งหมดที่คุณต้องการ",
  };
}

export default async function DestinationsExplorePage() {
  const presenter = await DestinationsPresenterFactory.createServer();
  const initialViewModel = await presenter.getViewModel();

  return (
    <Suspense fallback={<ExploreDestinationsSkeleton />}>
      <DestinationExploreView initialViewModel={initialViewModel} />
    </Suspense>
  );
}
