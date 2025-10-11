import { AccommodationDetailPresenterFactory } from "@/src/presentation/presenters/accommodation-detail/AccommodationDetailPresenter";
import { AccommodationDetailView } from "@/src/presentation/components/accommodation-detail/AccommodationDetailView";
import { notFound } from "next/navigation";

interface AccommodationDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function AccommodationDetailPage({
  params,
}: AccommodationDetailPageProps) {
  const { id } = await params;
  const presenter = await AccommodationDetailPresenterFactory.createServer();
  const initialViewModel = await presenter.getViewModel(id);

  // If accommodation not found, show 404
  if (!initialViewModel.accommodation) {
    notFound();
  }

  return <AccommodationDetailView initialViewModel={initialViewModel} />;
}

// Generate metadata
export async function generateMetadata({ params }: AccommodationDetailPageProps) {
  const { id } = await params;
  const presenter = await AccommodationDetailPresenterFactory.createServer();
  return presenter.generateMetadata(id);
}
