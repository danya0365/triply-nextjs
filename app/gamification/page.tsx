import { GamificationPresenterFactory } from "@/src/presentation/presenters/gamification/GamificationPresenter";
import { GamificationView } from "@/src/presentation/components/gamification/GamificationView";

export default async function GamificationPage() {
  const presenter = await GamificationPresenterFactory.createServer();
  
  // TODO: Get actual userId from auth
  const userId = "user-001"; // Mock user ID
  
  const initialViewModel = await presenter.getViewModel(userId);

  return <GamificationView initialViewModel={initialViewModel} />;
}

// Generate metadata
export async function generateMetadata() {
  const presenter = await GamificationPresenterFactory.createServer();
  return presenter.generateMetadata();
}
