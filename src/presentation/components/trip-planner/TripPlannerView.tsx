"use client";

import type { Trip } from "@/src/data/mock/trips.mock";
import type { TripPlannerViewModel } from "@/src/presentation/presenters/trip-planner/TripPlannerPresenter";
import { useTripPlannerPresenter } from "@/src/presentation/presenters/trip-planner/useTripPlannerPresenter";
import Link from "next/link";
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
    showCreateModal,
    setActiveTab,
    updateFilters,
    clearFilters,
    handleSearch,
    handleSort,
    toggleViewMode,
    openCreateModal,
    closeCreateModal,
    handleCreateTrip,
    handleCloneTrip,
  } = useTripPlannerPresenter(initialViewModel);

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  // Apply filters to trips
  let displayTrips =
    activeTab === "my-trips" ? viewModel.myTrips : viewModel.trips;

  // Filter by theme
  if (filters.themeId) {
    displayTrips = displayTrips.filter(
      (trip) => trip.themeId === filters.themeId
    );
  }

  // Filter by destination
  if (filters.destinationId) {
    displayTrips = displayTrips.filter((trip) =>
      trip.destinationIds.includes(filters.destinationId!)
    );
  }

  // Filter by search
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    displayTrips = displayTrips.filter(
      (trip) =>
        trip.name.toLowerCase().includes(searchLower) ||
        trip.description.toLowerCase().includes(searchLower)
    );
  }

  // Sort trips
  switch (filters.sortBy) {
    case "popular":
      displayTrips = [...displayTrips].sort(
        (a, b) => b.viewCount - a.viewCount
      );
      break;
    case "budget-asc":
      displayTrips = [...displayTrips].sort(
        (a, b) => a.totalBudget - b.totalBudget
      );
      break;
    case "budget-desc":
      displayTrips = [...displayTrips].sort(
        (a, b) => b.totalBudget - a.totalBudget
      );
      break;
    case "recent":
    default:
      displayTrips = [...displayTrips].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      break;
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Hero Section */}
        <div className="relative py-20">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500 via-sky-400 to-emerald-400 dark:from-violet-600 dark:via-sky-500 dark:to-emerald-500">
            <div className="absolute inset-0 bg-black/30 dark:bg-black/40" />
            {/* Animated blobs */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-300/30 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-300/30 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>

          <div className="relative z-10 container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
              วางแผนทริป
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-orange-300">
                สร้างประสบการณ์การเดินทางที่สมบูรณ์แบบ
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              สร้างและจัดการแพลนการเดินทางของคุณได้อย่างง่ายดาย
            </p>

            {/* Search Bar */}
            <form
              onSubmit={handleSearchSubmit}
              className="max-w-2xl w-full mx-auto"
            >
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-white/70"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ค้นหาทริป เมือง หรือจุดหมายปลายทาง..."
                  className="w-full pl-12 pr-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                />
                <button
                  type="submit"
                  className="absolute right-2.5 top-1.5 px-5 py-2.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-medium rounded-lg flex items-center gap-2 transition-all duration-200 border border-white/20 hover:border-white/30"
                >
                  <span>ค้นหา</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>

                {/* Popular searches */}
                <div className="flex flex-wrap justify-center gap-2 mt-3 text-sm text-white/80">
                  <span>ยอดนิยม:</span>
                  <button
                    type="button"
                    onClick={() => setSearchQuery("ทะเล")}
                    className="hover:text-white transition-colors"
                  >
                    ทะเล
                  </button>
                  <span>•</span>
                  <button
                    type="button"
                    onClick={() => setSearchQuery("ภูเขา")}
                    className="hover:text-white transition-colors"
                  >
                    ภูเขา
                  </button>
                  <span>•</span>
                  <button
                    type="button"
                    onClick={() => setSearchQuery("ธรรมชาติ")}
                    className="hover:text-white transition-colors"
                  >
                    ธรรมชาติ
                  </button>
                </div>
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
                    e.target.value as
                      | "recent"
                      | "popular"
                      | "budget-asc"
                      | "budget-desc"
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

      {/* Create Trip Modal */}
      {showCreateModal && (
        <CreateTripModal
          themes={viewModel.themes}
          destinations={viewModel.destinations}
          onClose={closeCreateModal}
          onCreate={handleCreateTrip}
        />
      )}
    </>
  );
}

// Create Trip Modal Component
function CreateTripModal({
  themes,
  destinations,
  onClose,
  onCreate,
}: {
  themes: Array<{ id: string; name: string; icon: string }>;
  destinations: Array<{ id: string; name: string }>;
  onClose: () => void;
  onCreate: (data: Partial<Trip>) => void;
}) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    themeId: themes[0]?.id || "",
    destinationIds: [] as string[],
    startDate: "",
    endDate: "",
    numAdults: 2,
    numChildren: 0,
    totalBudget: 10000,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Calculate duration
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const durationDays =
      Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    const newTrip: Partial<Trip> = {
      name: formData.name,
      description: formData.description,
      themeId: formData.themeId,
      destinationIds: formData.destinationIds,
      startDate: formData.startDate,
      endDate: formData.endDate,
      durationDays,
      numAdults: formData.numAdults,
      numChildren: formData.numChildren,
      totalBudget: formData.totalBudget,
      planningStage: "planning",
      isPublic: false,
      currency: "THB",
      completionPercentage: 10,
    };

    onCreate(newTrip);
  };

  const toggleDestination = (destId: string) => {
    setFormData((prev) => ({
      ...prev,
      destinationIds: prev.destinationIds.includes(destId)
        ? prev.destinationIds.filter((id) => id !== destId)
        : [...prev.destinationIds, destId],
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            🗺️ สร้างทริปใหม่
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Trip Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              ชื่อทริป *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="เช่น ทริปเที่ยวภูเก็ต 5 วัน 4 คืน"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              รายละเอียด
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="อธิบายทริปของคุณ..."
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Theme */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              ธีม *
            </label>
            <select
              required
              value={formData.themeId}
              onChange={(e) =>
                setFormData({ ...formData, themeId: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 dark:bg-gray-700 dark:text-white"
            >
              {themes.map((theme) => (
                <option key={theme.id} value={theme.id}>
                  {theme.icon} {theme.name}
                </option>
              ))}
            </select>
          </div>

          {/* Destinations */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              จุดหมาย * (เลือกอย่างน้อย 1 ที่)
            </label>
            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto p-2 border border-gray-300 dark:border-gray-600 rounded-lg">
              {destinations.slice(0, 20).map((dest) => (
                <label
                  key={dest.id}
                  className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors ${
                    formData.destinationIds.includes(dest.id)
                      ? "bg-sky-100 dark:bg-sky-900/20 border-2 border-sky-500"
                      : "bg-gray-50 dark:bg-gray-700 border-2 border-transparent hover:bg-gray-100 dark:hover:bg-gray-600"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.destinationIds.includes(dest.id)}
                    onChange={() => toggleDestination(dest.id)}
                    className="rounded"
                  />
                  <span className="text-sm text-gray-900 dark:text-white">
                    {dest.name}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                วันเริ่มต้น *
              </label>
              <input
                type="date"
                required
                value={formData.startDate}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                วันสิ้นสุด *
              </label>
              <input
                type="date"
                required
                value={formData.endDate}
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
                min={formData.startDate}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          {/* Travelers */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                ผู้ใหญ่ *
              </label>
              <input
                type="number"
                required
                min="1"
                value={formData.numAdults}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    numAdults: parseInt(e.target.value),
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                เด็ก
              </label>
              <input
                type="number"
                min="0"
                value={formData.numChildren}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    numChildren: parseInt(e.target.value),
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          {/* Budget */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              งบประมาณรวม (บาท) *
            </label>
            <input
              type="number"
              required
              min="0"
              step="100"
              value={formData.totalBudget}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  totalBudget: parseInt(e.target.value),
                })
              }
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              disabled={formData.destinationIds.length === 0}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-sky-400 to-violet-400 text-white font-bold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              สร้างทริป
            </button>
          </div>
        </form>
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
        <Link
          href={`/trips/${trip.id}`}
          className="w-64 h-48 bg-gradient-to-br from-sky-200 to-violet-200 dark:from-sky-300/20 dark:to-violet-300/20 flex-shrink-0"
        />
        <div className="p-6 flex-1">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <Link href={`/trips/${trip.id}`}>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
                  {trip.name}
                </h3>
              </Link>
              <span
                className={`px-2 py-1 text-xs font-medium rounded ${getStatusColor(
                  trip.planningStage
                )}`}
              >
                {getStatusText(trip.planningStage)}
              </span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClone();
              }}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              title="คัดลอกทริป"
            >
              📋
            </button>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
            {trip.description}
          </p>
          <div className="flex flex-wrap gap-4 text-sm mb-4">
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
          <div className="flex gap-2">
            <Link
              href={`/trips/${trip.id}`}
              className="px-4 py-2 bg-gradient-to-r from-sky-400 to-violet-400 text-white font-medium rounded-lg hover:shadow-lg transition-all"
            >
              ดูรายละเอียด
            </Link>
            <Link
              href={`/trip-planner?tripId=${trip.id}`}
              className="px-4 py-2 border-2 border-sky-400 text-sky-600 dark:text-sky-400 font-medium rounded-lg hover:bg-sky-50 dark:hover:bg-sky-900/20 transition-all"
            >
              แก้ไข
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
      <Link
        href={`/trips/${trip.id}`}
        className="relative block h-48 bg-gradient-to-br from-sky-200 to-violet-200 dark:from-sky-300/20 dark:to-violet-300/20"
      >
        <div className="absolute top-3 right-3">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClone();
            }}
            className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title="คัดลอกทริป"
          >
            📋
          </button>
        </div>
      </Link>
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
        <Link href={`/trips/${trip.id}`}>
          <h3 className="font-bold text-lg mb-2 line-clamp-1 text-gray-900 dark:text-white hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
            {trip.name}
          </h3>
        </Link>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
          {trip.description}
        </p>
        <div className="flex items-center justify-between text-sm mb-3">
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
        {/* Action Buttons */}
        <div className="pt-3 border-t border-gray-200 dark:border-gray-700 space-y-2">
          <Link
            href={`/trips/${trip.id}`}
            className="block text-center px-4 py-2 bg-gradient-to-r from-sky-400 to-violet-400 text-white font-medium rounded-lg hover:shadow-lg transition-all"
          >
            ดูรายละเอียด
          </Link>
          <Link
            href={`/trip-planner?tripId=${trip.id}`}
            className="block text-center px-4 py-2 border-2 border-sky-400 text-sky-600 dark:text-sky-400 font-medium rounded-lg hover:bg-sky-50 dark:hover:bg-sky-900/20 transition-all"
          >
            แก้ไข
          </Link>
        </div>
      </div>
    </div>
  );
}
