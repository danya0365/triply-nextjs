import { AccommodationsPresenterFactory } from "@/src/presentation/presenters/accommodations/AccommodationsPresenter";
import { AccommodationsView } from "@/src/presentation/components/accommodations/AccommodationsView";

export default async function AccommodationsPage() {
  const presenter = await AccommodationsPresenterFactory.createServer();
  const initialViewModel = await presenter.getViewModel();

  return <AccommodationsView initialViewModel={initialViewModel} />;
}

// Generate metadata
export async function generateMetadata() {
  const presenter = await AccommodationsPresenterFactory.createServer();
  return presenter.generateMetadata();
}
