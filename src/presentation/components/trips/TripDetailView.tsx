"use client";

import type { TripDetailViewModel } from "@/src/presentation/presenters/trips/TripDetailPresenter";
import Link from "next/link";

interface TripDetailViewProps {
  viewModel: TripDetailViewModel;
}

export function TripDetailView({ viewModel }: TripDetailViewProps) {
  const { trip, creator, destinations } = viewModel;

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "planning":
        return "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400";
      case "booked":
        return "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400";
      case "completed":
        return "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400";
      default:
        return "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300";
    }
  };

  const getStageText = (stage: string) => {
    switch (stage) {
      case "planning":
        return "กำลังวางแผน";
      case "booked":
        return "จองแล้ว";
      case "completed":
        return "เสร็จสิ้น";
      default:
        return stage;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Link
          href="/trips"
          className="inline-flex items-center gap-2 mb-6 text-sky-600 dark:text-sky-400 hover:underline"
        >
          ← กลับไปทริปทั้งหมด
        </Link>

        {/* Header */}
        <div className="bg-gradient-to-r from-sky-400 to-violet-400 rounded-xl p-8 mb-8 text-white">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-3">{trip.name}</h1>
              <p className="text-xl opacity-90 mb-4">{trip.description}</p>
              <div className="flex items-center gap-4">
                <span
                  className={`px-4 py-2 rounded-lg font-medium ${getStageColor(
                    trip.planningStage
                  )}`}
                >
                  {getStageText(trip.planningStage)}
                </span>
                <span className="px-4 py-2 bg-white/20 rounded-lg">
                  {trip.durationDays} วัน
                </span>
                <span className="px-4 py-2 bg-white/20 rounded-lg">
                  {trip.numAdults + trip.numChildren} คน
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Dates */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                📅 ช่วงเวลา
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    วันเริ่มต้น
                  </div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    {formatDate(trip.startDate)}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    วันสิ้นสุด
                  </div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    {formatDate(trip.endDate)}
                  </div>
                </div>
              </div>
            </div>

            {/* Destinations */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                📍 จุดหมาย ({destinations.length} ที่)
              </h2>
              <div className="space-y-3">
                {destinations.map((dest) => (
                  <Link
                    key={dest.id}
                    href={`/destinations/${dest.slug}`}
                    className="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-sky-500 dark:hover:border-sky-500 transition-colors"
                  >
                    <div className="w-10 h-10 bg-sky-100 dark:bg-sky-900/20 rounded-full flex items-center justify-center text-sky-600 dark:text-sky-400 font-bold">
                      {dest.order}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 dark:text-white">
                        {dest.name}
                      </h3>
                    </div>
                    <span className="text-sky-600 dark:text-sky-400">→</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Budget Breakdown */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                💰 งบประมาณ
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">
                    🏨 ที่พัก
                  </span>
                  <span className="font-bold text-gray-900 dark:text-white">
                    ฿{trip.budgetBreakdown.accommodation.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">
                    🎢 กิจกรรม
                  </span>
                  <span className="font-bold text-gray-900 dark:text-white">
                    ฿{trip.budgetBreakdown.activities.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">
                    🍽️ อาหาร
                  </span>
                  <span className="font-bold text-gray-900 dark:text-white">
                    ฿{trip.budgetBreakdown.food.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">
                    🚗 การเดินทาง
                  </span>
                  <span className="font-bold text-gray-900 dark:text-white">
                    ฿{trip.budgetBreakdown.transport.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">
                    🛍️ ช้อปปิ้ง
                  </span>
                  <span className="font-bold text-gray-900 dark:text-white">
                    ฿{trip.budgetBreakdown.shopping.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">
                    📝 อื่นๆ
                  </span>
                  <span className="font-bold text-gray-900 dark:text-white">
                    ฿{trip.budgetBreakdown.misc.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-sky-100 to-violet-100 dark:from-sky-900/20 dark:to-violet-900/20 rounded-lg border-2 border-sky-400">
                  <span className="font-bold text-gray-900 dark:text-white">
                    รวมทั้งหมด
                  </span>
                  <span className="text-2xl font-bold text-sky-600 dark:text-sky-400">
                    ฿{trip.totalBudget.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                📊 สถิติ
              </h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-3xl font-bold text-sky-600 dark:text-sky-400">
                    {trip.viewCount.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    👁️ ครั้งที่ดู
                  </div>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-3xl font-bold text-pink-600 dark:text-pink-400">
                    {trip.likeCount.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    ❤️ ถูกใจ
                  </div>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-3xl font-bold text-violet-600 dark:text-violet-400">
                    {trip.cloneCount.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    📋 ถูกคัดลอก
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Creator Info */}
            {creator && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  👤 ผู้สร้างทริป
                </h3>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-sky-300 to-violet-300 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {creator.displayName[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {creator.displayName}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Info */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sticky top-20">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                ข้อมูลทริป
              </h3>

              <div className="space-y-4">
                <div className="pb-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    ธีม
                  </div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    🎨 {trip.themeId}
                  </div>
                </div>

                <div className="pb-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    ผู้เดินทาง
                  </div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    👨‍👩‍👧‍👦 ผู้ใหญ่ {trip.numAdults} คน
                    {trip.numChildren > 0 && `, เด็ก ${trip.numChildren} คน`}
                  </div>
                </div>

                <div className="pb-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    สกุลเงิน
                  </div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {trip.currency}
                  </div>
                </div>

                <div className="pb-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    ความสมบูรณ์
                  </div>
                  <div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                      <div
                        className="bg-gradient-to-r from-sky-400 to-violet-400 h-2 rounded-full"
                        style={{ width: `${trip.completionPercentage}%` }}
                      />
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                      {trip.completionPercentage}%
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    การเผยแพร่
                  </div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {trip.isPublic ? "🌍 สาธารณะ" : "🔒 ส่วนตัว"}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 space-y-3">
                  <Link
                    href={`/trips/${trip.id}/timeline`}
                    className="block w-full py-3 bg-gradient-to-r from-sky-400 to-violet-400 text-white font-bold text-center rounded-lg hover:shadow-lg transition-all"
                  >
                    📅 ดู Timeline
                  </Link>
                  <Link
                    href={`/trip-planner?tripId=${trip.id}`}
                    className="block w-full py-3 border-2 border-sky-400 text-sky-600 dark:text-sky-400 font-bold text-center rounded-lg hover:bg-sky-50 dark:hover:bg-sky-900/20 transition-all"
                  >
                    ✏️ แก้ไขทริป
                  </Link>
                  <Link
                    href="/accommodations"
                    className="block w-full py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-bold text-center rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                  >
                    🏨 ค้นหาที่พัก
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
