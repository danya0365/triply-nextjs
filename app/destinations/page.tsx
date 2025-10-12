import { DestinationsPresenterFactory } from "@/src/presentation/presenters/destinations/DestinationsPresenter";
import { DestinationsView } from "@/src/presentation/components/destinations/DestinationsView";

export async function generateMetadata() {
  const presenter = await DestinationsPresenterFactory.createServer();
  return presenter.generateMetadata();
}

export default async function DestinationsPage() {
  const presenter = await DestinationsPresenterFactory.createServer();
  const initialViewModel = await presenter.getViewModel();

  return <DestinationsView initialViewModel={initialViewModel} />;
}
