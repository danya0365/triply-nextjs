"use client";

import { useTripPlannerPresenter } from "@/src/presentation/presenters/trip-planner/useTripPlannerPresenter";
import type { TripPlannerViewModel } from "@/src/presentation/presenters/trip-planner/TripPlannerPresenter";
import type { Trip } from "@/src/data/mock/trips.mock";
import { useState } from "react";

interface TripPlannerViewProps {
  initialViewModel: TripPlannerViewModel;
}

export function TripPlannerView({ initialViewModel }: TripPlannerViewProps) {
  const {
    viewModel,
    filters,
    viewMode,
    activeTab,
    setActiveTab,
    updateFilters,
    clearFilters,
    handleSearch,
    handleSort,
    toggleViewMode,
    openCreateModal,
    handleCloneTrip,
  } = useTripPlannerPresenter(initialViewModel);

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  const displayTrips = activeTab === "my-trips" ? viewModel.myTrips : viewModel.trips;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-sky-300 to-violet-300 dark:from-sky-400 dark:to-violet-400 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white mb-4">วางแผนทริป</h1>
          <p className="text-white/90 text-lg mb-6">
            สร้างและจัดการแพลนการเดินทางของคุณ
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="max-w-2xl">
            <div className="flex gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ค้นหาทริป..."
                className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-white dark:bg-gray-800 text-sky-600 dark:text-sky-400 font-semibold rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                🔍 ค้นหา
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        {viewModel.myTrips.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
              <div className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                ทริปทั้งหมด
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {viewModel.stats.totalTrips}
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
              <div className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                ทริปที่กำลังมาถึง
              </div>
              <div className="text-3xl font-bold text-sky-600 dark:text-sky-400">
                {viewModel.stats.upcomingTrips}
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
              <div className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                ทริปที่สำเร็จ
              </div>
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                {viewModel.stats.completedTrips}
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
              <div className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                งบประมาณรวม
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                ฿{viewModel.stats.totalBudget.toLocaleString()}
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("browse")}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                activeTab === "browse"
                  ? "bg-gradient-to-r from-sky-400 to-violet-400 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              🌍 ค้นหาทริป ({viewModel.publicTrips.length})
            </button>
            <button
              onClick={() => setActiveTab("my-trips")}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                activeTab === "my-trips"
                  ? "bg-gradient-to-r from-sky-400 to-violet-400 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              📝 ทริปของฉัน ({viewModel.myTrips.length})
            </button>
          </div>

          <button
            onClick={openCreateModal}
            className="px-6 py-3 bg-gradient-to-r from-sky-300 to-violet-300 dark:from-sky-400 dark:to-violet-400 text-white font-bold rounded-lg hover:shadow-lg transition-all"
          >
            + สร้างทริปใหม่
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Theme Filter */}
            <select
              value={filters.themeId || ""}
              onChange={(e) =>
                updateFilters({ themeId: e.target.value || undefined })
              }
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">ธีมทั้งหมด</option>
              {viewModel.themes.map((theme) => (
                <option key={theme.id} value={theme.id}>
                  {theme.icon} {theme.name}
                </option>
              ))}
            </select>

            {/* Destination Filter */}
            <select
              value={filters.destinationId || ""}
              onChange={(e) =>
                updateFilters({ destinationId: e.target.value || undefined })
              }
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">จุดหมายทั้งหมด</option>
              {viewModel.destinations.map((dest) => (
                <option key={dest.id} value={dest.id}>
                  {dest.name}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={filters.sortBy || "recent"}
              onChange={(e) =>
                handleSort(
                  e.target.value as "recent" | "popular" | "budget-asc" | "budget-desc"
                )
              }
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="recent">ล่าสุด</option>
              <option value="popular">ยอดนิยม</option>
              <option value="budget-asc">งบประมาณ: ต่ำ-สูง</option>
              <option value="budget-desc">งบประมาณ: สูง-ต่ำ</option>
            </select>

            {/* View Mode */}
            <button
              onClick={toggleViewMode}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              title={viewMode === "grid" ? "มุมมองรายการ" : "มุมมองตาราง"}
            >
              {viewMode === "grid" ? "☰" : "⊞"}
            </button>

            {/* Clear Filters */}
            {(filters.themeId || filters.destinationId || filters.search) && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-sky-600 dark:text-sky-400 hover:underline"
              >
                ล้างตัวกรอง
              </button>
            )}
          </div>
        </div>

        {/* Trips Grid */}
        {displayTrips.length > 0 ? (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-4"
            }
          >
            {displayTrips.map((trip) => (
              <TripCard
                key={trip.id}
                trip={trip}
                viewMode={viewMode}
                onClone={() => handleCloneTrip(trip)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-6xl mb-4">🗺️</div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
              {activeTab === "my-trips"
                ? "คุณยังไม่มีทริป"
                : "ไม่พบทริปที่ตรงกับเงื่อนไข"}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {activeTab === "my-trips"
                ? "เริ่มสร้างทริปแรกของคุณตอนนี้เลย"
                : "ลองปรับเปลี่ยนตัวกรองหรือค้นหาใหม่"}
            </p>
            {activeTab === "my-trips" && (
              <button
                onClick={openCreateModal}
                className="px-6 py-3 bg-gradient-to-r from-sky-300 to-violet-300 dark:from-sky-400 dark:to-violet-400 text-white font-bold rounded-lg hover:shadow-lg transition-all"
              >
                + สร้างทริปใหม่
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Trip Card Component
function TripCard({
  trip,
  viewMode,
  onClone,
}: {
  trip: Trip;
  viewMode: "grid" | "list";
  onClone: () => void;
}) {
  const getStatusColor = (status: Trip["planningStage"]) => {
    switch (status) {
      case "completed":
        return "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400";
      case "booked":
        return "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400";
      case "ready":
        return "bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400";
      case "planning":
        return "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400";
      default:
        return "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300";
    }
  };

  const getStatusText = (status: Trip["planningStage"]) => {
    switch (status) {
      case "completed":
        return "เสร็จสิ้น";
      case "booked":
        return "จองแล้ว";
      case "ready":
        return "พร้อม";
      case "planning":
        return "กำลังวางแผน";
      default:
        return "แบบร่าง";
    }
  };

  if (viewMode === "list") {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all flex">
        <div className="w-64 h-48 bg-gradient-to-br from-sky-200 to-violet-200 dark:from-sky-300/20 dark:to-violet-300/20 flex-shrink-0" />
        <div className="p-6 flex-1">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {trip.name}
              </h3>
              <span
                className={`px-2 py-1 text-xs font-medium rounded ${getStatusColor(
                  trip.planningStage
                )}`}
              >
                {getStatusText(trip.planningStage)}
              </span>
            </div>
            <button
              onClick={onClone}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              title="คัดลอกทริป"
            >
              📋
            </button>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
            {trip.description}
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              📅 {trip.durationDays} วัน
            </span>
            <span className="text-gray-600 dark:text-gray-400">
              👥 {trip.numAdults + trip.numChildren} คน
            </span>
            <span className="font-bold text-sky-600 dark:text-sky-400">
              ฿{trip.totalBudget.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
      <div className="relative h-48 bg-gradient-to-br from-sky-200 to-violet-200 dark:from-sky-300/20 dark:to-violet-300/20">
        <div className="absolute top-3 right-3">
          <button
            onClick={onClone}
            className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title="คัดลอกทริป"
          >
            📋
          </button>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <span
            className={`px-2 py-1 text-xs font-medium rounded ${getStatusColor(
              trip.planningStage
            )}`}
          >
            {getStatusText(trip.planningStage)}
          </span>
          <span className="text-xs text-gray-600 dark:text-gray-400">
            👁️ {trip.viewCount.toLocaleString()}
          </span>
        </div>
        <h3 className="font-bold text-lg mb-2 line-clamp-1 text-gray-900 dark:text-white">
          {trip.name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
          {trip.description}
        </p>
        <div className="flex items-center justify-between text-sm">
          <div className="flex gap-3">
            <span className="text-gray-600 dark:text-gray-400">
              📅 {trip.durationDays} วัน
            </span>
            <span className="text-gray-600 dark:text-gray-400">
              👥 {trip.numAdults + trip.numChildren}
            </span>
          </div>
          <div className="text-lg font-bold text-sky-600 dark:text-sky-400">
            ฿{trip.totalBudget.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}
