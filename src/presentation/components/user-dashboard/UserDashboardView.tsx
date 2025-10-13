"use client";

import { useUserDashboardPresenter } from "@/src/presentation/presenters/user-dashboard/useUserDashboardPresenter";
import type { UserDashboardViewModel } from "@/src/presentation/presenters/user-dashboard/UserDashboardPresenter";
import type { BookingItem, ActivityItem } from "@/src/presentation/presenters/user-dashboard/UserDashboardPresenter";
import Link from "next/link";

interface UserDashboardViewProps {
  initialViewModel: UserDashboardViewModel;
}

export function UserDashboardView({ initialViewModel }: UserDashboardViewProps) {
  const {
    viewModel,
    error,
    activeTab,
    bookingFilter,
    filteredBookings,
    setActiveTab,
    setBookingFilter,
    setShowEditProfile,
    handleCancelBooking,
  } = useUserDashboardPresenter(initialViewModel);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Error Notification */}
      {error && (
        <div className="fixed top-4 right-4 z-50 bg-red-100 dark:bg-red-900/50 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 px-6 py-3 rounded-lg shadow-lg">
          {error}
        </div>
      )}

      {/* Hero Section */}
      <div className="relative py-20">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500 via-blue-400 to-indigo-500 dark:from-teal-600 dark:via-blue-500 dark:to-indigo-600">
          <div className="absolute inset-0 bg-black/30 dark:bg-black/40" />
          {/* Animated blobs */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-300/30 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center text-4xl font-bold text-sky-600 dark:text-sky-400 shadow-lg">
              {viewModel.user.displayName[0]}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white mb-2">
                {viewModel.user.displayName}
              </h1>
              <p className="text-white/90 mb-3">{viewModel.user.bio}</p>
              <div className="flex gap-3">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-lg text-sm">
                  Level {viewModel.user.level}
                </span>
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-lg text-sm">
                  {viewModel.user.totalPoints.toLocaleString()} คะแนน
                </span>
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-lg text-sm">
                  🏆 {viewModel.user.badges.length} เหรียญ
                </span>
              </div>
            </div>
            <button
              onClick={() => setShowEditProfile(true)}
              className="px-6 py-3 bg-white dark:bg-gray-800 text-sky-600 dark:text-sky-400 font-semibold rounded-lg hover:shadow-lg transition-all"
            >
              แก้ไขโปรไฟล์
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <div className="text-3xl mb-2">🏨</div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {viewModel.stats.totalBookings}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              การจองทั้งหมด
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <div className="text-3xl mb-2">📅</div>
            <div className="text-3xl font-bold text-sky-600 dark:text-sky-400">
              {viewModel.stats.upcomingBookings}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              กำลังมาถึง
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <div className="text-3xl mb-2">🗺️</div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {viewModel.stats.totalTrips}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              ทริปทั้งหมด
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <div className="text-3xl mb-2">🌍</div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {viewModel.user.countriesVisited}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              ประเทศที่เยี่ยมชม
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {[
            { id: "overview", label: "📊 ภาพรวม" },
            { id: "bookings", label: "🏨 การจอง" },
            { id: "trips", label: "🗺️ ทริป" },
            { id: "settings", label: "⚙️ ตั้งค่า" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as "overview" | "bookings" | "trips" | "settings")}
              className={`px-6 py-3 rounded-lg font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-sky-400 to-violet-400 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Activities */}
            <div className="lg:col-span-2">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                กิจกรรมล่าสุด
              </h2>
              <div className="space-y-3">
                {viewModel.recentActivities.map((activity) => (
                  <ActivityCard key={activity.id} activity={activity} />
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                ลิงก์ด่วน
              </h2>
              <div className="space-y-3">
                <Link
                  href="/trip-planner"
                  className="block p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">🗺️</div>
                    <div>
                      <div className="font-bold text-gray-900 dark:text-white">
                        วางแผนทริปใหม่
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        สร้างทริปการเดินทาง
                      </div>
                    </div>
                  </div>
                </Link>
                <Link
                  href="/accommodations"
                  className="block p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">🏨</div>
                    <div>
                      <div className="font-bold text-gray-900 dark:text-white">
                        ค้นหาที่พัก
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        เรียกดูที่พักทั้งหมด
                      </div>
                    </div>
                  </div>
                </Link>
                <Link
                  href="/gamification"
                  className="block p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">🎮</div>
                    <div>
                      <div className="font-bold text-gray-900 dark:text-white">
                        Gamification
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        ภารกิจและรางวัล
                      </div>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Recent Trips */}
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 mt-6">
                ทริปล่าสุด
              </h2>
              <div className="space-y-3">
                {viewModel.recentTrips.slice(0, 3).map((trip) => (
                  <div
                    key={trip.id}
                    className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md"
                  >
                    <div className="font-bold text-gray-900 dark:text-white mb-1">
                      {trip.name}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {new Date(trip.startDate).toLocaleDateString("th-TH")} -{" "}
                      {new Date(trip.endDate).toLocaleDateString("th-TH")}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "bookings" && (
          <div>
            {/* Filter */}
            <div className="mb-4 flex gap-2">
              {["all", "upcoming", "completed", "cancelled"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setBookingFilter(filter as "all" | "upcoming" | "completed" | "cancelled")}
                  className={`px-4 py-2 rounded-lg ${
                    bookingFilter === filter
                      ? "bg-sky-400 text-white"
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {filter === "all" && "ทั้งหมด"}
                  {filter === "upcoming" && "กำลังมาถึง"}
                  {filter === "completed" && "เสร็จสิ้น"}
                  {filter === "cancelled" && "ยกเลิก"}
                </button>
              ))}
            </div>

            {/* Bookings List */}
            <div className="space-y-4">
              {filteredBookings.length > 0 ? (
                filteredBookings.map((booking) => (
                  <BookingCard
                    key={booking.id}
                    booking={booking}
                    onCancel={() => handleCancelBooking(booking.id)}
                  />
                ))
              ) : (
                <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
                  <div className="text-6xl mb-4">🏨</div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                    ไม่มีการจอง
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    ลองค้นหาที่พักและจองเลย
                  </p>
                  <Link
                    href="/accommodations"
                    className="inline-block px-6 py-3 bg-gradient-to-r from-sky-400 to-violet-400 text-white font-bold rounded-lg hover:shadow-lg transition-all"
                  >
                    ค้นหาที่พัก
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "trips" && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {viewModel.recentTrips.map((trip) => (
                <div
                  key={trip.id}
                  className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-all"
                >
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                    {trip.name}
                  </h3>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    📅 {new Date(trip.startDate).toLocaleDateString("th-TH")} -{" "}
                    {new Date(trip.endDate).toLocaleDateString("th-TH")}
                  </div>
                  <div className="text-sm">
                    <span className="px-2 py-1 bg-sky-100 dark:bg-sky-900/20 text-sky-700 dark:text-sky-400 rounded">
                      {trip.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            {viewModel.recentTrips.length === 0 && (
              <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
                <div className="text-6xl mb-4">🗺️</div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                  ยังไม่มีทริป
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  เริ่มวางแผนทริปแรกของคุณเลย
                </p>
                <Link
                  href="/trip-planner"
                  className="inline-block px-6 py-3 bg-gradient-to-r from-sky-400 to-violet-400 text-white font-bold rounded-lg hover:shadow-lg transition-all"
                >
                  สร้างทริป
                </Link>
              </div>
            )}
          </div>
        )}

        {activeTab === "settings" && (
          <div className="max-w-2xl">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md space-y-6">
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">
                  ข้อมูลส่วนตัว
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-600 dark:text-gray-400">
                      ชื่อ-นามสกุล
                    </label>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {viewModel.user.displayName}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 dark:text-gray-400">
                      อีเมล
                    </label>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {viewModel.user.email}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 dark:text-gray-400">
                      สัญชาติ
                    </label>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {viewModel.user.nationality}
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">
                  ความสนใจ
                </h3>
                <div className="flex flex-wrap gap-2">
                  {viewModel.user.interests.map((interest, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-sky-100 dark:bg-sky-900/20 text-sky-700 dark:text-sky-400 rounded-full text-sm"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">
                  ภาษา
                </h3>
                <div className="flex flex-wrap gap-2">
                  {viewModel.user.languages.map((language, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-400 rounded-full text-sm"
                    >
                      {language}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Activity Card Component
function ActivityCard({ activity }: { activity: ActivityItem }) {
  const timeAgo = getTimeAgo(activity.timestamp);

  return (
    <div className="flex items-start gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="text-3xl">{activity.icon}</div>
      <div className="flex-1">
        <div className="font-bold text-gray-900 dark:text-white mb-1">
          {activity.title}
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          {activity.description}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-500">{timeAgo}</div>
      </div>
    </div>
  );
}

// Booking Card Component
function BookingCard({
  booking,
  onCancel,
}: {
  booking: BookingItem;
  onCancel: () => void;
}) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400";
      case "completed":
        return "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400";
      case "cancelled":
        return "bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400";
      default:
        return "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "upcoming":
        return "กำลังมาถึง";
      case "completed":
        return "เสร็จสิ้น";
      case "cancelled":
        return "ยกเลิกแล้ว";
      default:
        return status;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-64 h-48 bg-gradient-to-br from-sky-200 to-violet-200 dark:from-sky-300/20 dark:to-violet-300/20 flex-shrink-0" />
        <div className="p-6 flex-1">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {booking.accommodationName}
              </h3>
              <span
                className={`px-2 py-1 text-xs font-medium rounded ${getStatusColor(
                  booking.status
                )}`}
              >
                {getStatusText(booking.status)}
              </span>
            </div>
            {booking.status === "upcoming" && (
              <button
                onClick={onCancel}
                className="text-sm text-red-600 dark:text-red-400 hover:underline"
              >
                ยกเลิกการจอง
              </button>
            )}
          </div>
          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex gap-4">
              <div>
                <div className="text-xs mb-1">เช็คอิน</div>
                <div className="font-medium text-gray-900 dark:text-white">
                  {new Date(booking.checkIn).toLocaleDateString("th-TH")}
                </div>
              </div>
              <div>
                <div className="text-xs mb-1">เช็คเอาท์</div>
                <div className="font-medium text-gray-900 dark:text-white">
                  {new Date(booking.checkOut).toLocaleDateString("th-TH")}
                </div>
              </div>
            </div>
            <div>
              👥 {booking.guests} คน
            </div>
            <div className="text-xl font-bold text-sky-600 dark:text-sky-400 mt-3">
              ฿{booking.totalPrice.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function
function getTimeAgo(timestamp: string): string {
  const now = new Date();
  const time = new Date(timestamp);
  const diff = now.getTime() - time.getTime();
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (hours < 1) return "เมื่อสักครู่";
  if (hours < 24) return `${hours} ชั่วโมงที่แล้ว`;
  if (days < 7) return `${days} วันที่แล้ว`;
  return time.toLocaleDateString("th-TH");
}
