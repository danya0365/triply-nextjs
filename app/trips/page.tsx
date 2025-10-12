"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/src/store/authStore";
import { TripsPresenter } from "@/src/presentation/presenters/trips/TripsPresenter";
import { TripsView } from "@/src/presentation/components/trips/TripsView";
import type { TripsViewModel } from "@/src/presentation/presenters/trips/TripsPresenter";

export default function TripsPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const [viewModel, setViewModel] = useState<TripsViewModel | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication
    if (!isAuthenticated || !user) {
      router.push("/login");
      return;
    }

    // Load trips data
    const loadTrips = async () => {
      const presenter = new TripsPresenter();
      const data = await presenter.getViewModel(user.id);
      setViewModel(data);
      setIsLoading(false);
    };

    loadTrips();
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

  return <TripsView userId={user!.id} initialViewModel={viewModel} />;
}
