import { TripPlannerView } from "@/src/presentation/components/trip-planner/TripPlannerView";
import { TripPlannerPresenterFactory } from "@/src/presentation/presenters/trip-planner/TripPlannerPresenter";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

// Tell Next.js this is a dynamic page
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

type TripPlannerPageProps = Record<string, never>;

/**
 * Generate metadata for the page
 */
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Trip Planner | Triply",
    description: "Plan and manage your trips with Triply",
  };
}

/**
 * Trip Planner page - Server Component for SEO optimization
 * Uses presenter pattern following Clean Architecture
 */
export default async function TripPlannerPage({}: TripPlannerPageProps) {
  const presenter = await TripPlannerPresenterFactory.createServer();

  try {
    // Get view model from presenter
    const viewModel = await presenter.getViewModel({});

    return <TripPlannerView initialViewModel={viewModel} />;
  } catch (error) {
    console.error("Error fetching trip planner data:", error);

    // Handle authentication error
    if ((error as Error).message === "Unauthorized") {
      redirect("/login");
    }

    // Fallback UI
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            เกิดข้อผิดพลาด
          </h1>
          <p className="text-muted-foreground mb-4">
            ไม่สามารถโหลดข้อมูลทริปได้
          </p>
          <Link
            href="/"
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            กลับหน้าแรก
          </Link>
        </div>
      </div>
    );
  }
}
