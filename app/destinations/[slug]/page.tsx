import { DestinationDetailPresenterFactory } from "@/src/presentation/presenters/destinations/DestinationDetailPresenter";
import { DestinationDetailView } from "@/src/presentation/components/destinations/DestinationDetailView";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps) {
  const presenter = await DestinationDetailPresenterFactory.createServer();
  return presenter.generateMetadata(params.slug);
}

export default async function DestinationDetailPage({ params }: PageProps) {
  const presenter = await DestinationDetailPresenterFactory.createServer();
  const viewModel = await presenter.getViewModel(params.slug);

  if (!viewModel) {
    notFound();
  }

  return <DestinationDetailView viewModel={viewModel} />;
}
