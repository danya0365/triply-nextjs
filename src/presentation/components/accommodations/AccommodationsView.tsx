"use client";

import type { Accommodation } from "@/src/data/mock/accommodations.mock";
import type { AccommodationsViewModel } from "@/src/presentation/presenters/accommodations/AccommodationsPresenter";
import { useAccommodationsPresenter } from "@/src/presentation/presenters/accommodations/useAccommodationsPresenter";
import Link from "next/link";
import { useState } from "react";

interface AccommodationsViewProps {
  initialViewModel: AccommodationsViewModel;
}

export function AccommodationsView({
  initialViewModel,
}: AccommodationsViewProps) {
  const {
    viewModel,
    filters,
    isLoading,
    error,
    viewMode,
    updateFilters,
    clearFilters,
    handleSearch,
    handleSort,
    goToPage,
    nextPage,
    prevPage,
    toggleViewMode,
  } = useAccommodationsPresenter(initialViewModel);

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    handleSearch(searchQuery);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative py-20">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500 via-blue-400 to-indigo-500 dark:from-teal-600 dark:via-blue-500 dark:to-indigo-600">
          <div className="absolute inset-0 bg-black/30 dark:bg-black/40" />
          {/* Animated blobs */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-300/30 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
            ค้นหาที่พัก
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-orange-200">
              ที่พักมากกว่า {viewModel.totalCount} แห่ง
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            ค้นพบที่พักที่สมบูรณ์แบบสำหรับการเดินทางครั้งต่อไปของคุณ
          </p>

          {/* Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="max-w-3xl w-full mx-auto"
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
                placeholder="ค้นหาที่พัก เมือง หรือสถานที่ท่องเที่ยว..."
                className="w-full pl-12 pr-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
              />
              <button
                type="submit"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 px-5 py-2.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-medium rounded-lg flex items-center gap-2 transition-all duration-200 border border-white/20 hover:border-white/30"
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
            </div>
          </form>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  ตัวกรอง
                </h2>
                <button
                  onClick={clearFilters}
                  className="text-sm text-sky-600 dark:text-sky-400 hover:underline"
                >
                  ล้างทั้งหมด
                </button>
              </div>

              {/* Destination Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  จุดหมาย
                </label>
                <select
                  value={filters.destinationId || ""}
                  onChange={(e) =>
                    updateFilters({
                      destinationId: e.target.value || undefined,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-sky-300 dark:focus:ring-sky-500 focus:border-transparent"
                >
                  <option value="">ทุกจุดหมาย</option>
                  {viewModel.destinations.map((dest) => (
                    <option key={dest.id} value={dest.id}>
                      {dest.name} ({dest.count})
                    </option>
                  ))}
                </select>
              </div>

              {/* Type Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  ประเภทที่พัก
                </label>
                <select
                  value={filters.typeId || ""}
                  onChange={(e) =>
                    updateFilters({ typeId: e.target.value || undefined })
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-sky-300 dark:focus:ring-sky-500 focus:border-transparent"
                >
                  <option value="">ทุกประเภท</option>
                  {viewModel.types.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name} ({type.count})
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  ช่วงราคา (บาท/คืน)
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="ต่ำสุด"
                    value={filters.minPrice || ""}
                    onChange={(e) =>
                      updateFilters({
                        minPrice: e.target.value
                          ? parseInt(e.target.value)
                          : undefined,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-sky-300 dark:focus:ring-sky-500 focus:border-transparent"
                  />
                  <span className="flex items-center text-gray-600 dark:text-gray-400">
                    -
                  </span>
                  <input
                    type="number"
                    placeholder="สูงสุด"
                    value={filters.maxPrice || ""}
                    onChange={(e) =>
                      updateFilters({
                        maxPrice: e.target.value
                          ? parseInt(e.target.value)
                          : undefined,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-sky-300 dark:focus:ring-sky-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Rating Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  คะแนนขั้นต่ำ
                </label>
                <select
                  value={filters.minRating || ""}
                  onChange={(e) =>
                    updateFilters({
                      minRating: e.target.value
                        ? parseFloat(e.target.value)
                        : undefined,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-sky-300 dark:focus:ring-sky-500 focus:border-transparent"
                >
                  <option value="">ทุกคะแนน</option>
                  <option value="9">9.0+ ยอดเยี่ยม</option>
                  <option value="8">8.0+ ดีมาก</option>
                  <option value="7">7.0+ ดี</option>
                </select>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Toolbar */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  แสดง{" "}
                  {(viewModel.currentPage - 1) * viewModel.itemsPerPage + 1}-
                  {Math.min(
                    viewModel.currentPage * viewModel.itemsPerPage,
                    viewModel.totalCount
                  )}{" "}
                  จาก {viewModel.totalCount} ที่พัก
                </div>

                <div className="flex items-center gap-4">
                  {/* Sort */}
                  <select
                    value={filters.sortBy || ""}
                    onChange={(e) =>
                      handleSort(
                        e.target.value as
                          | "price-asc"
                          | "price-desc"
                          | "rating"
                          | "popular"
                      )
                    }
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-sky-300 dark:focus:ring-sky-500 focus:border-transparent"
                  >
                    <option value="">เรียงตาม: แนะนำ</option>
                    <option value="price-asc">ราคา: ต่ำ-สูง</option>
                    <option value="price-desc">ราคา: สูง-ต่ำ</option>
                    <option value="rating">คะแนนสูงสุด</option>
                    <option value="popular">ยอดนิยม</option>
                  </select>

                  {/* View Mode */}
                  <button
                    onClick={toggleViewMode}
                    className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
                    title={viewMode === "grid" ? "มุมมองรายการ" : "มุมมองตาราง"}
                  >
                    {viewMode === "grid" ? "☰" : "⊞"}
                  </button>
                </div>
              </div>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="flex justify-center items-center py-12">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 dark:border-sky-400 mx-auto mb-4"></div>
                  <p className="text-gray-600 dark:text-gray-400">
                    กำลังโหลด...
                  </p>
                </div>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
                <p className="text-red-600 dark:text-red-400">⚠️ {error}</p>
              </div>
            )}

            {/* Results Grid */}
            {!isLoading && !error && (
              <>
                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                      : "space-y-4"
                  }
                >
                  {viewModel.accommodations.map((acc) => (
                    <Link key={acc.id} href={`/accommodations/${acc.id}`}>
                      <AccommodationCard
                        accommodation={acc}
                        viewMode={viewMode}
                      />
                    </Link>
                  ))}
                </div>

                {/* Empty State */}
                {viewModel.accommodations.length === 0 && (
                  <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
                    <div className="text-6xl mb-4">🏨</div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                      ไม่พบที่พักที่ตรงกับเงื่อนไข
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      ลองปรับเปลี่ยนตัวกรองหรือค้นหาใหม่
                    </p>
                    <button
                      onClick={clearFilters}
                      className="px-6 py-2 bg-gradient-to-r from-sky-300 to-violet-300 dark:from-sky-400 dark:to-violet-400 text-white rounded-lg hover:shadow-lg transition-all"
                    >
                      ล้างตัวกรอง
                    </button>
                  </div>
                )}

                {/* Pagination */}
                {viewModel.totalPages > 1 && (
                  <div className="mt-8 flex justify-center items-center gap-2 flex-wrap">
                    <button
                      onClick={prevPage}
                      disabled={viewModel.currentPage === 1}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 dark:text-gray-300 transition-colors"
                    >
                      ← ก่อนหน้า
                    </button>

                    {Array.from(
                      { length: viewModel.totalPages },
                      (_, i) => i + 1
                    )
                      .filter(
                        (page) =>
                          page === 1 ||
                          page === viewModel.totalPages ||
                          Math.abs(page - viewModel.currentPage) <= 2
                      )
                      .map((page, index, array) => (
                        <div key={page} className="flex items-center">
                          {index > 0 && array[index - 1] !== page - 1 && (
                            <span className="px-2 text-gray-600 dark:text-gray-400">
                              ...
                            </span>
                          )}
                          <button
                            onClick={() => goToPage(page)}
                            className={`px-4 py-2 rounded-lg transition-colors ${
                              page === viewModel.currentPage
                                ? "bg-gradient-to-r from-sky-400 to-violet-400 text-white"
                                : "border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                            }`}
                          >
                            {page}
                          </button>
                        </div>
                      ))}

                    <button
                      onClick={nextPage}
                      disabled={viewModel.currentPage === viewModel.totalPages}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 dark:text-gray-300 transition-colors"
                    >
                      ถัดไป →
                    </button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

// Accommodation Card Component
function AccommodationCard({
  accommodation,
  viewMode,
}: {
  accommodation: Accommodation;
  viewMode: "grid" | "list";
}) {
  if (viewMode === "list") {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all flex">
        <div className="w-64 h-48 bg-gradient-to-br from-sky-200 to-violet-200 dark:from-sky-300/20 dark:to-violet-300/20 flex-shrink-0"></div>
        <div className="p-6 flex-1">
          <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
            {accommodation.name}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
            📍 {accommodation.address}
          </p>
          <div className="flex items-center gap-2 mb-4">
            <span className="px-2 py-1 bg-sky-400 dark:bg-sky-500 text-white text-sm font-bold rounded">
              {accommodation.averageRating.toFixed(1)}
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              ({accommodation.reviewCount.toLocaleString()} รีวิว)
            </span>
          </div>
          <div className="flex justify-between items-end">
            <div className="flex gap-2">
              {accommodation.amenityIds.slice(0, 3).map((id) => (
                <span
                  key={id}
                  className="text-sm text-gray-600 dark:text-gray-400"
                >
                  ✓
                </span>
              ))}
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-sky-600 dark:text-sky-400">
                ฿{accommodation.basePricePerNight.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                / คืน
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
      <div className="relative h-48 bg-gradient-to-br from-sky-200 to-violet-200 dark:from-sky-300/20 dark:to-violet-300/20"></div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 line-clamp-1 text-gray-900 dark:text-white">
          {accommodation.name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          📍 {accommodation.address.split(",")[0]}
        </p>
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2 py-1 bg-sky-400 dark:bg-sky-500 text-white text-xs font-bold rounded">
            {accommodation.averageRating.toFixed(1)}
          </span>
          <span className="text-xs text-gray-600 dark:text-gray-400">
            ({accommodation.reviewCount.toLocaleString()})
          </span>
        </div>
        <div className="flex justify-between items-end">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {accommodation.maxGuests} ท่าน • {accommodation.bedrooms} ห้องนอน
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-sky-600 dark:text-sky-400">
              ฿{accommodation.basePricePerNight.toLocaleString()}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              / คืน
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
