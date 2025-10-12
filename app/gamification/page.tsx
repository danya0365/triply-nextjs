"use client";

import { GamificationView } from "@/src/presentation/components/gamification/GamificationView";
import type { GamificationViewModel } from "@/src/presentation/presenters/gamification/GamificationPresenter";
import { GamificationPresenter } from "@/src/presentation/presenters/gamification/GamificationPresenter";
import { useAuthStore } from "@/src/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function GamificationPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const [viewModel, setViewModel] = useState<GamificationViewModel | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication
    if (!isAuthenticated || !user) {
      router.push("/login");
      return;
    }

    // Load gamification data
    const loadGamification = async () => {
      const presenter = new GamificationPresenter();
      const data = await presenter.getViewModel(user.id);
      setViewModel(data);
      setIsLoading(false);
    };

    loadGamification();
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

  return <GamificationView initialViewModel={viewModel} />;
}
