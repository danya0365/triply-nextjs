"use client";

import { useTripsPresenter } from "@/src/presentation/presenters/trips/useTripsPresenter";
import type { TripsViewModel } from "@/src/presentation/presenters/trips/TripsPresenter";
import type { Trip } from "@/src/data/mock/trips.mock";
import Link from "next/link";

interface TripsViewProps {
  userId: string;
  initialViewModel: TripsViewModel;
}

export function TripsView({ userId, initialViewModel }: TripsViewProps) {
  const [state, actions] = useTripsPresenter(userId, initialViewModel);

  const viewModel = state.viewModel || initialViewModel;

  // Filter trips based on stage
  const filteredTrips =
    state.filterStage === "all"
      ? viewModel.trips
      : viewModel.trips.filter((t) => t.planningStage === state.filterStage);

  // Helper functions
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("th-TH", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

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


  // Loading state
  if (state.loading && !viewModel) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-sky-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">กำลังโหลดทริป...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              🗺️ ทริปของฉัน
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              ดูและจัดการทริปท่องเที่ยวทั้งหมดของคุณ
            </p>
          </div>
          <Link
            href="/trip-planner"
            className="px-6 py-3 bg-gradient-to-r from-sky-400 to-violet-400 text-white font-bold rounded-lg hover:shadow-lg transition-all"
          >
            + สร้างทริปใหม่
          </Link>
        </div>

        {/* Error Message */}
        {state.error && (
          <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 rounded-lg">
            {state.error}
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <div className="text-3xl mb-2">🗺️</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {viewModel.stats.totalTrips}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              ทั้งหมด
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <div className="text-3xl mb-2">📝</div>
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              {viewModel.stats.plannedTrips}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              กำลังวางแผน
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <div className="text-3xl mb-2">✈️</div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {viewModel.stats.ongoingTrips}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              จองแล้ว
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <div className="text-3xl mb-2">✅</div>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {viewModel.stats.completedTrips}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              เสร็จสิ้น
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <div className="text-3xl mb-2">📍</div>
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {viewModel.stats.totalDestinations}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              จุดหมาย
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {[
            { id: "all", label: "ทั้งหมด", count: viewModel.stats.totalTrips },
            { id: "planning", label: "กำลังวางแผน", count: viewModel.stats.plannedTrips },
            { id: "booked", label: "จองแล้ว", count: viewModel.stats.ongoingTrips },
            { id: "completed", label: "เสร็จสิ้น", count: viewModel.stats.completedTrips },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => actions.setFilterStage(tab.id as "all" | "planning" | "booked" | "completed")}
              className={`px-6 py-3 rounded-lg font-medium whitespace-nowrap transition-colors ${
                state.filterStage === tab.id
                  ? "bg-gradient-to-r from-sky-400 to-violet-400 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Trips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrips.length > 0 ? (
            filteredTrips.map((trip) => (
              <TripCard
                key={trip.id}
                trip={trip}
                onDelete={() => actions.openDeleteModal(trip.id)}
                formatDate={formatDate}
                getStageColor={getStageColor}
                getStageText={getStageText}
              />
            ))
          ) : (
            <div className="col-span-full bg-white dark:bg-gray-800 rounded-lg p-12 text-center shadow-md">
              <div className="text-6xl mb-4">🗺️</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                ไม่มีทริป
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {state.filterStage === "all"
                  ? "คุณยังไม่มีทริป"
                  : `ไม่มีทริปที่${getStageText(state.filterStage)}`}
              </p>
              <Link
                href="/trip-planner"
                className="inline-block px-6 py-3 bg-gradient-to-r from-sky-400 to-violet-400 text-white font-bold rounded-lg hover:shadow-lg transition-all"
              >
                สร้างทริปใหม่
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {state.isDeleteModalOpen && state.selectedTripId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
            <div className="text-center mb-4">
              <div className="text-6xl mb-4">⚠️</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                ยืนยันการลบ
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                คุณแน่ใจหรือไม่ที่จะลบทริปนี้?
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={actions.closeDeleteModal}
                disabled={state.loading}
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ยกเลิก
              </button>
              <button
                onClick={() => actions.deleteTrip(state.selectedTripId!)}
                disabled={state.loading}
                className="flex-1 px-4 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {state.loading ? "กำลังลบ..." : "ยืนยันลบ"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Trip Card Component
function TripCard({
  trip,
  onDelete,
  formatDate,
  getStageColor,
  getStageText,
}: {
  trip: Trip;
  onDelete: () => void;
  formatDate: (date: string) => string;
  getStageColor: (stage: string) => string;
  getStageText: (stage: string) => string;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      {/* Trip Header */}
      <div className="bg-gradient-to-r from-sky-300 to-violet-300 dark:from-sky-400 dark:to-violet-400 p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-2">{trip.name}</h3>
            <span className={`px-2 py-1 text-xs font-medium rounded ${getStageColor(trip.planningStage)}`}>
              {getStageText(trip.planningStage)}
            </span>
          </div>
          {trip.planningStage !== "completed" && (
            <button
              onClick={onDelete}
              className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
              title="ลบทริป"
            >
              🗑️
            </button>
          )}
        </div>
      </div>

      {/* Trip Content */}
      <div className="p-4">
        {/* Dates */}
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-3">
          <span>📅</span>
          <span>{formatDate(trip.startDate)} - {formatDate(trip.endDate)}</span>
        </div>

        {/* Destinations */}
        <div className="mb-3">
          <div className="text-xs font-semibold text-gray-500 dark:text-gray-500 mb-1">
            จุดหมาย ({trip.destinationIds.length})
          </div>
          <div className="flex flex-wrap gap-1">
            {trip.destinationIds.slice(0, 3).map((destId, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-sky-100 dark:bg-sky-900/20 text-sky-700 dark:text-sky-400 rounded text-xs"
              >
                📍 {destId}
              </span>
            ))}
            {trip.destinationIds.length > 3 && (
              <span className="px-2 py-1 text-xs text-gray-500 dark:text-gray-500">
                +{trip.destinationIds.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Budget & Travelers */}
        <div className="flex items-center justify-between text-sm mb-3">
          <div className="flex items-center gap-1">
            <span>💰</span>
            <span className="text-green-600 dark:text-green-400">
              ฿{trip.totalBudget.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span>👥</span>
            <span className="text-gray-600 dark:text-gray-400">{trip.numAdults + trip.numChildren} คน</span>
          </div>
        </div>

        {/* Theme & Duration */}
        <div className="mb-3">
          <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
            <span className="px-2 py-0.5 bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-400 rounded-full">
              🎨 {trip.themeId}
            </span>
            <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-full">
              ⏱️ {trip.durationDays} วัน
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-3 border-t border-gray-200 dark:border-gray-700 space-y-2">
          <Link
            href={`/trips/${trip.id}`}
            className="block text-center px-4 py-2 bg-gradient-to-r from-sky-400 to-violet-400 text-white font-medium rounded-lg hover:shadow-lg transition-all"
          >
            ดูรายละเอียด →
          </Link>
          {trip.planningStage !== "completed" && (
            <Link
              href={`/trip-planner?tripId=${trip.id}`}
              className="block text-center px-4 py-2 border-2 border-sky-400 text-sky-600 dark:text-sky-400 font-medium rounded-lg hover:bg-sky-50 dark:hover:bg-sky-900/20 transition-all"
            >
              แก้ไข
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
