import { TripTimelineView } from "@/src/presentation/components/trip-timeline/TripTimelineView";
import { TripTimelinePresenterFactory } from "@/src/presentation/presenters/trip-timeline/TripTimelinePresenter";
import type { Metadata } from "next";
import Link from "next/link";

// Tell Next.js this is a dynamic page
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

interface TripTimelinePageProps {
  params: Promise<{ id: string }>;
}

/**
 * Generate metadata for the timeline page
 */
export async function generateMetadata({
  params,
}: TripTimelinePageProps): Promise<Metadata> {
  const { id } = await params;
  const presenter = await TripTimelinePresenterFactory.createServer();

  try {
    return presenter.generateMetadata(id);
  } catch (error) {
    console.error("Error generating metadata:", error);

    // Fallback metadata
    return {
      title: "Trip Timeline | Triply",
      description: "View your trip timeline and activities",
    };
  }
}

/**
 * Trip Timeline page - Server Component for SEO optimization
 * Uses presenter pattern following Clean Architecture
 */
export default async function TripTimelinePage({ params }: TripTimelinePageProps) {
  const { id } = await params;
  const presenter = await TripTimelinePresenterFactory.createServer();

  try {
    // Get view model from presenter
    const viewModel = await presenter.getViewModel(id);

    if (!viewModel) {
      // Trip not found - show 404 page
      return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">🗺️</div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              ไม่พบทริปนี้
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              ทริปที่คุณค้นหาอาจถูกลบหรือไม่มีอยู่ในระบบ
            </p>
            <Link
              href="/trips"
              className="inline-block bg-gradient-to-r from-sky-400 to-violet-400 text-white px-6 py-3 rounded-lg font-bold hover:shadow-lg transition-all"
            >
              กลับไปหน้าทริป
            </Link>
          </div>
        </div>
      );
    }

    return <TripTimelineView tripId={id} initialViewModel={viewModel} />;
  } catch (error) {
    console.error("Error fetching timeline data:", error);

    // Fallback UI for errors
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            เกิดข้อผิดพลาด
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            ไม่สามารถโหลดข้อมูล Timeline ได้
          </p>
          <div className="space-x-4">
            <Link
              href={`/trips/${id}`}
              className="inline-block border-2 border-sky-400 text-sky-600 dark:text-sky-400 px-6 py-3 rounded-lg font-bold hover:bg-sky-50 dark:hover:bg-sky-900/20 transition-all"
            >
              กลับไปหน้าทริป
            </Link>
            <Link
              href="/trips"
              className="inline-block bg-gradient-to-r from-sky-400 to-violet-400 text-white px-6 py-3 rounded-lg font-bold hover:shadow-lg transition-all"
            >
              ดูทริปอื่น
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
