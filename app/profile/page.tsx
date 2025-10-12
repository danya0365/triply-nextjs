"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/src/store/authStore";
import { ProfilePresenter } from "@/src/presentation/presenters/profile/ProfilePresenter";
import { ProfileView } from "@/src/presentation/components/profile/ProfileView";
import type { ProfileViewModel } from "@/src/presentation/presenters/profile/ProfilePresenter";

export default function ProfilePage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const [viewModel, setViewModel] = useState<ProfileViewModel | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication
    if (!isAuthenticated || !user) {
      router.push("/login");
      return;
    }

    // Load profile data
    const loadProfile = async () => {
      const presenter = new ProfilePresenter();
      const data = await presenter.getViewModel(user.id);
      setViewModel(data);
      setIsLoading(false);
    };

    loadProfile();
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

  return <ProfileView userId={user.id} initialViewModel={viewModel} />;
}
