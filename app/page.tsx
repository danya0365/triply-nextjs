import { LandingPresenterFactory } from "@/src/presentation/presenters/landing/LandingPresenter";
import { LandingView } from "@/src/presentation/components/landing/LandingView";

export async function generateMetadata() {
  const presenter = await LandingPresenterFactory.createServer();
  return presenter.generateMetadata();
}

export default async function Home() {
  const presenter = await LandingPresenterFactory.createServer();
  const viewModel = await presenter.getViewModel();

  return <LandingView viewModel={viewModel} />;
}
