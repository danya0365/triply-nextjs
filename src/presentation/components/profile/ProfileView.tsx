"use client";

import { useProfilePresenter } from "@/src/presentation/presenters/profile/useProfilePresenter";
import type { ProfileViewModel, UpdateProfileData } from "@/src/presentation/presenters/profile/ProfilePresenter";
import { useState } from "react";

interface ProfileViewProps {
  userId: string;
  initialViewModel: ProfileViewModel;
}

export function ProfileView({ userId, initialViewModel }: ProfileViewProps) {
  const [state, actions] = useProfilePresenter(userId, initialViewModel);
  const [isEditing, setIsEditing] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState<UpdateProfileData>({
    displayName: initialViewModel.profile.displayName,
    bio: initialViewModel.profile.bio,
    nationality: initialViewModel.profile.nationality,
    languages: initialViewModel.profile.languages,
    interests: initialViewModel.profile.interests,
    travelStyle: initialViewModel.profile.travelStyle,
  });

  const viewModel = state.viewModel || initialViewModel;

  const handleSave = async () => {
    try {
      await actions.updateProfile(formData);
      setIsEditing(false);
    } catch {
      // Error is handled in the hook
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      displayName: viewModel.profile.displayName,
      bio: viewModel.profile.bio,
      nationality: viewModel.profile.nationality,
      languages: viewModel.profile.languages,
      interests: viewModel.profile.interests,
      travelStyle: viewModel.profile.travelStyle,
    });
  };

  // Loading state
  if (state.loading && !viewModel) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-sky-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">กำลังโหลดโปรไฟล์...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            โปรไฟล์ของฉัน
          </h1>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="px-6 py-2 bg-gradient-to-r from-sky-400 to-violet-400 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
            >
              แก้ไขโปรไฟล์
            </button>
          )}
        </div>

        {/* Error Message */}
        {state.error && (
          <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 rounded-lg">
            {state.error}
          </div>
        )}

        {/* Profile Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-6">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-sky-300 to-violet-300 dark:from-sky-400 dark:to-violet-400 p-8">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center text-4xl font-bold text-sky-600 dark:text-sky-400 shadow-lg">
                {viewModel.user.displayName[0]}
              </div>
              <div className="text-white">
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.displayName}
                    onChange={(e) =>
                      setFormData({ ...formData, displayName: e.target.value })
                    }
                    className="text-2xl font-bold bg-white/20 backdrop-blur-sm px-3 py-1 rounded border-0 focus:ring-2 focus:ring-white"
                  />
                ) : (
                  <h2 className="text-2xl font-bold">{viewModel.profile.displayName}</h2>
                )}
                <p className="text-white/90">{viewModel.profile.email}</p>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <div className="text-2xl font-bold text-sky-600 dark:text-sky-400">
                {viewModel.stats.totalPoints.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">คะแนน</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-violet-600 dark:text-violet-400">
                Level {viewModel.stats.level}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">ระดับ</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {viewModel.stats.totalTrips}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">ทริป</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {viewModel.stats.totalBookings}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">การจอง</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {viewModel.stats.countriesVisited}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">ประเทศ</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                {viewModel.stats.badges}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">เหรียญ</div>
            </div>
          </div>

          {/* Profile Information */}
          <div className="p-6 space-y-6">
            {/* Bio */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                เกี่ยวกับฉัน
              </label>
              {isEditing ? (
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 dark:bg-gray-700 dark:text-white"
                />
              ) : (
                <p className="text-gray-600 dark:text-gray-400">{viewModel.profile.bio}</p>
              )}
            </div>

            {/* Nationality */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                สัญชาติ
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.nationality}
                  onChange={(e) =>
                    setFormData({ ...formData, nationality: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 dark:bg-gray-700 dark:text-white"
                />
              ) : (
                <p className="text-gray-600 dark:text-gray-400">{viewModel.profile.nationality}</p>
              )}
            </div>

            {/* Languages */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                ภาษา
              </label>
              <div className="flex flex-wrap gap-2">
                {viewModel.profile.languages.map((lang, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-400 rounded-full text-sm"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            {/* Interests */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                ความสนใจ
              </label>
              <div className="flex flex-wrap gap-2">
                {viewModel.profile.interests.map((interest, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-sky-100 dark:bg-sky-900/20 text-sky-700 dark:text-sky-400 rounded-full text-sm"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Travel Style */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                สไตล์การเดินทาง
              </label>
              <div className="flex flex-wrap gap-2">
                {viewModel.profile.travelStyle.map((style, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-full text-sm"
                  >
                    {style}
                  </span>
                ))}
              </div>
            </div>

            {/* Edit Actions */}
            {isEditing && (
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSave}
                  disabled={state.loading}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-sky-400 to-violet-400 text-white font-bold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {state.loading ? "กำลังบันทึก..." : "บันทึกการเปลี่ยนแปลง"}
                </button>
                <button
                  onClick={handleCancel}
                  disabled={state.loading}
                  className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ยกเลิก
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
