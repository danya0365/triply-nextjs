import { UserDashboardPresenterFactory } from "@/src/presentation/presenters/user-dashboard/UserDashboardPresenter";
import { UserDashboardView } from "@/src/presentation/components/user-dashboard/UserDashboardView";

export default async function DashboardPage() {
  const presenter = await UserDashboardPresenterFactory.createServer();
  
  // TODO: Get actual userId from auth
  const userId = "user-001"; // Mock user ID
  
  const initialViewModel = await presenter.getViewModel(userId);

  return <UserDashboardView initialViewModel={initialViewModel} />;
}

// Generate metadata
export async function generateMetadata() {
  const presenter = await UserDashboardPresenterFactory.createServer();
  return presenter.generateMetadata();
}
