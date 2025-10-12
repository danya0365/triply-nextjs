import { AccommodationDetailPresenterFactory } from "@/src/presentation/presenters/accommodation-detail/AccommodationDetailPresenter";
import { AccommodationDetailView } from "@/src/presentation/components/accommodation-detail/AccommodationDetailView";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const presenter = await AccommodationDetailPresenterFactory.createServer();
  return presenter.generateMetadata(id);
}

export default async function AccommodationDetailPage({ params }: PageProps) {
  const { id } = await params;
  const presenter = await AccommodationDetailPresenterFactory.createServer();
  const initialViewModel = await presenter.getViewModel(id);

  // If accommodation not found, show 404
  if (!initialViewModel.accommodation) {
    notFound();
  }

  return <AccommodationDetailView initialViewModel={initialViewModel} />;
}
