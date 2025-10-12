"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/src/store/authStore";
import { CalendarPresenter } from "@/src/presentation/presenters/calendar/CalendarPresenter";
import { CalendarView } from "@/src/presentation/components/calendar/CalendarView";
import type { CalendarViewModel } from "@/src/presentation/presenters/calendar/CalendarPresenter";

export default function CalendarPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const [viewModel, setViewModel] = useState<CalendarViewModel | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication
    if (!isAuthenticated || !user) {
      router.push("/login");
      return;
    }

    // Load calendar data
    const loadCalendar = async () => {
      const presenter = new CalendarPresenter();
      const now = new Date();
      const data = await presenter.getViewModel(user.id, now.getMonth(), now.getFullYear());
      setViewModel(data);
      setIsLoading(false);
    };

    loadCalendar();
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

  return <CalendarView userId={user!.id} initialViewModel={viewModel} />;
}
