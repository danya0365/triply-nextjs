"use client";

import type {
  ActivityType,
  TripActivity,
} from "@/src/data/mock/activities.mock";
import type { TripTimelineViewModel } from "@/src/presentation/presenters/trip-timeline/TripTimelinePresenter";
import { useTripTimelinePresenter } from "@/src/presentation/presenters/trip-timeline/useTripTimelinePresenter";
import Link from "next/link";

interface TripTimelineViewProps {
  tripId: string;
  initialViewModel: TripTimelineViewModel;
}

// Helper functions for activity type colors/icons/labels
function getActivityTypeColor(type: ActivityType): string {
  const colors: Record<ActivityType, string> = {
    accommodation: "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-500",
    transport: "bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 border-purple-500",
    food: "bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 border-orange-500",
    activity: "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-500",
    shopping: "bg-pink-100 dark:bg-pink-900/20 text-pink-700 dark:text-pink-400 border-pink-500",
    other: "bg-gray-100 dark:bg-gray-900/20 text-gray-700 dark:text-gray-400 border-gray-500",
  };
  return colors[type];
}

function getActivityTypeIcon(type: ActivityType): string {
  const icons: Record<ActivityType, string> = {
    accommodation: "🏨",
    transport: "✈️",
    food: "🍽️",
    activity: "🎢",
    shopping: "🛍️",
    other: "📝",
  };
  return icons[type];
}

function getActivityTypeLabel(type: ActivityType): string {
  const labels: Record<ActivityType, string> = {
    accommodation: "ที่พัก",
    transport: "การเดินทาง",
    food: "อาหาร",
    activity: "กิจกรรม",
    shopping: "ช้อปปิ้ง",
    other: "อื่นๆ",
  };
  return labels[type];
}

function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours === 0) {
    return `${mins} นาที`;
  }

  if (mins === 0) {
    return `${hours} ชั่วโมง`;
  }

  return `${hours} ชม. ${mins} นาที`;
}

export function TripTimelineView({
  tripId,
  initialViewModel,
}: TripTimelineViewProps) {
  // Use custom hook for state management
  const {
    viewModel,
    loading,
    error,
    selectedDay,
    setSelectedDay,
  } = useTripTimelinePresenter(initialViewModel);

  const { trip, schedule, stats } = viewModel;

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-sky-600 dark:border-sky-400 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">กำลังโหลด Timeline...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            เกิดข้อผิดพลาด
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
          <Link
            href={`/trips/${tripId}`}
            className="inline-block bg-gradient-to-r from-sky-400 to-violet-400 text-white px-6 py-3 rounded-lg font-bold hover:shadow-lg transition-all"
          >
            กลับไปหน้าทริป
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link
            href={`/trips/${trip.id}`}
            className="inline-flex items-center gap-2 mb-4 text-sky-600 dark:text-sky-400 hover:underline"
          >
            ← กลับไปหน้าทริป
          </Link>

          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            📅 {trip.name}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {trip.durationDays} วัน - Timeline View
          </p>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <div className="text-gray-600 dark:text-gray-400 text-sm mb-2">
              กิจกรรมทั้งหมด
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {stats.totalActivities}
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <div className="text-gray-600 dark:text-gray-400 text-sm mb-2">
              จองแล้ว
            </div>
            <div className="text-3xl font-bold text-sky-600 dark:text-sky-400">
              {stats.bookedActivities}
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <div className="text-gray-600 dark:text-gray-400 text-sm mb-2">
              ยังไม่จอง
            </div>
            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
              {stats.totalActivities - stats.bookedActivities}
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <div className="text-gray-600 dark:text-gray-400 text-sm mb-2">
              ค่าใช้จ่ายรวม
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              ฿{stats.totalCost.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Cost Breakdown */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            ค่าใช้จ่ายแยกตามประเภท
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {(Object.keys(stats.costByType) as ActivityType[]).map((type) => (
              <div
                key={type}
                className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg"
              >
                <div className="text-2xl mb-2">
                  {getActivityTypeIcon(type)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  {getActivityTypeLabel(type)}
                </div>
                <div className="font-bold text-gray-900 dark:text-white">
                  ฿{stats.costByType[type].toLocaleString()}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-500">
                  {stats.activitiesByType[type]} รายการ
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Day Selector */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedDay(null)}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              selectedDay === null
                ? "bg-gradient-to-r from-sky-400 to-violet-400 text-white"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            }`}
          >
            ทั้งหมด
          </button>
          {schedule.map((day) => (
            <button
              key={day.day}
              onClick={() => setSelectedDay(day.day)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                selectedDay === day.day
                  ? "bg-gradient-to-r from-sky-400 to-violet-400 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              วันที่ {day.day}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="space-y-6">
          {schedule
            .filter((day) => selectedDay === null || day.day === selectedDay)
            .map((day) => (
              <DayScheduleCard key={day.day} day={day} />
            ))}
        </div>
      </div>
    </div>
  );
}

// Day Schedule Card Component
function DayScheduleCard({
  day,
}: {
  day: {
    day: number;
    date: string;
    dayName: string;
    activities: TripActivity[];
    totalCost: number;
    totalDuration: number;
  };
}) {
  const dayDate = new Date(day.date);
  const formattedDate = dayDate.toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      {/* Day Header */}
      <div className="bg-gradient-to-r from-sky-400 to-violet-400 p-6 text-white">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold mb-1">วันที่ {day.day}</h2>
            <p className="text-white/90">{formattedDate}</p>
            <p className="text-sm text-white/80">{day.dayName}</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-white/80 mb-1">
              {day.activities.length} กิจกรรม
            </div>
            <div className="text-2xl font-bold">
              ฿{day.totalCost.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Activities Timeline */}
      <div className="p-6">
        {day.activities.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            ยังไม่มีกิจกรรมในวันนี้
          </div>
        ) : (
          <div className="space-y-4">
            {day.activities.map((activity: TripActivity, index: number) => (
              <div key={activity.id}>
                <ActivitySlot activity={activity} />
                {index < day.activities.length - 1 && (
                  <div className="flex items-center justify-center my-2">
                    <div className="w-1 h-6 bg-gray-300 dark:bg-gray-600"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Activity Slot Component
function ActivitySlot({
  activity,
}: {
  activity: TripActivity;
}) {
  const colorClass = getActivityTypeColor(activity.type);
  const icon = getActivityTypeIcon(activity.type);

  return (
    <div
      className={`flex gap-4 p-4 rounded-lg border-2 ${colorClass} transition-all hover:shadow-md`}
    >
      {/* Icon & Type */}
      <div className="flex-shrink-0">
        <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center text-2xl shadow-sm">
          {icon}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4 mb-2">
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-1">{activity.name}</h3>
            {activity.description && (
              <p className="text-sm opacity-90 mb-2">{activity.description}</p>
            )}
          </div>
          {activity.isBooked && (
            <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full whitespace-nowrap">
              ✓ จองแล้ว
            </span>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-wrap gap-4 text-sm">
          {activity.startTime && (
            <div className="flex items-center gap-1">
              <span>🕐</span>
              <span>
                {activity.startTime}
                {activity.endTime && ` - ${activity.endTime}`}
              </span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <span>⏱️</span>
            <span>{formatDuration(activity.duration)}</span>
          </div>
          {activity.location && (
            <div className="flex items-center gap-1">
              <span>📍</span>
              <span>{activity.location}</span>
            </div>
          )}
          <div className="flex items-center gap-1 font-bold">
            <span>💰</span>
            <span>฿{activity.cost.toLocaleString()}</span>
          </div>
        </div>

        {/* Booking Link */}
        {activity.bookingUrl && !activity.isBooked && (
          <div className="mt-3">
            <a
              href={activity.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-white dark:bg-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            >
              จองเลย →
            </a>
          </div>
        )}

        {/* Notes */}
        {activity.notes && (
          <div className="mt-2 p-2 bg-white/50 dark:bg-gray-700/50 rounded text-sm">
            <span className="font-semibold">หมายเหตุ:</span> {activity.notes}
          </div>
        )}
      </div>
    </div>
  );
}
