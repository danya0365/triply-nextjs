import { TripPlannerPresenterFactory } from "@/src/presentation/presenters/trip-planner/TripPlannerPresenter";
import { TripPlannerView } from "@/src/presentation/components/trip-planner/TripPlannerView";

export default async function TripPlannerPage() {
  const presenter = await TripPlannerPresenterFactory.createServer();
  
  // TODO: Get actual userId from auth
  const userId = "user-001"; // Mock user ID
  
  const initialViewModel = await presenter.getViewModel({}, userId);

  return <TripPlannerView initialViewModel={initialViewModel} />;
}

// Generate metadata
export async function generateMetadata() {
  const presenter = await TripPlannerPresenterFactory.createServer();
  return presenter.generateMetadata();
}
