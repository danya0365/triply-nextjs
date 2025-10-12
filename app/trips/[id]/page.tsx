import { TripDetailPresenterFactory } from "@/src/presentation/presenters/trips/TripDetailPresenter";
import { TripDetailView } from "@/src/presentation/components/trips/TripDetailView";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const presenter = await TripDetailPresenterFactory.createServer();
  return presenter.generateMetadata(id);
}

export default async function TripDetailPage({ params }: PageProps) {
  const { id } = await params;
  const presenter = await TripDetailPresenterFactory.createServer();
  const viewModel = await presenter.getViewModel(id);

  if (!viewModel) {
    notFound();
  }

  return <TripDetailView viewModel={viewModel} />;
}
