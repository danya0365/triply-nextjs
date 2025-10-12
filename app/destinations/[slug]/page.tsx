import { DestinationDetailPresenterFactory } from "@/src/presentation/presenters/destinations/DestinationDetailPresenter";
import { DestinationDetailView } from "@/src/presentation/components/destinations/DestinationDetailView";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const presenter = await DestinationDetailPresenterFactory.createServer();
  return presenter.generateMetadata(slug);
}

export default async function DestinationDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const presenter = await DestinationDetailPresenterFactory.createServer();
  const viewModel = await presenter.getViewModel(slug);

  if (!viewModel) {
    notFound();
  }

  return <DestinationDetailView viewModel={viewModel} />;
}
