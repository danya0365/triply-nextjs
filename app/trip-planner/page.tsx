"use client";

import { TripPlannerView } from "@/src/presentation/components/trip-planner/TripPlannerView";
import type { TripPlannerViewModel } from "@/src/presentation/presenters/trip-planner/TripPlannerPresenter";
import { TripPlannerPresenter } from "@/src/presentation/presenters/trip-planner/TripPlannerPresenter";
import { useAuthStore } from "@/src/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TripPlannerPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const [viewModel, setViewModel] = useState<TripPlannerViewModel | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication - trip planner requires login
    if (!isAuthenticated || !user) {
      router.push("/login");
      return;
    }

    // Load trip planner data
    const loadTripPlanner = async () => {
      const presenter = new TripPlannerPresenter();
      const data = await presenter.getViewModel({}, user.id);
      setViewModel(data);
      setIsLoading(false);
    };

    loadTripPlanner();
  }, [isAuthenticated, user, router]);

  if (isLoading || !viewModel) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-sky-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">กำลังโหลด...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <TripPlannerView initialViewModel={viewModel} />;
}
