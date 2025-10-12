"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/src/store/authStore";
import { UserDashboardPresenter } from "@/src/presentation/presenters/user-dashboard/UserDashboardPresenter";
import { UserDashboardView } from "@/src/presentation/components/user-dashboard/UserDashboardView";
import type { UserDashboardViewModel } from "@/src/presentation/presenters/user-dashboard/UserDashboardPresenter";

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const [viewModel, setViewModel] = useState<UserDashboardViewModel | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication
    if (!isAuthenticated || !user) {
      router.push("/login");
      return;
    }

    // Load dashboard data
    const loadDashboard = async () => {
      const presenter = new UserDashboardPresenter();
      const data = await presenter.getViewModel(user.id);
      setViewModel(data);
      setIsLoading(false);
    };

    loadDashboard();
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

  return <UserDashboardView initialViewModel={viewModel} />;
}
