"use client";

import type { Destination } from "@/src/data/master/destinations.master";
import type { DestinationsViewModel } from "@/src/presentation/presenters/destinations/DestinationsPresenter";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { QuizHistory } from "../quiz/QuizHistory";
import { TripInspirationQuiz } from "../quiz/TripInspirationQuiz";
import { BudgetDestinationFinder } from "./BudgetDestinationFinder";
import { DestinationCollections } from "./DestinationCollections";
import { DestinationGallery } from "./DestinationGallery";
import { SeasonalGuide } from "./SeasonalGuide";
import { TrendingDestinationsSection } from "./TrendingDestinationsSection";

interface DestinationsViewProps {
  initialViewModel: DestinationsViewModel;
}

// Component that uses useSearchParams - must be wrapped in Suspense
function QuizScrollHandler() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const quizParam = searchParams.get("quiz");
    if (quizParam === "true") {
      // Scroll to quiz section
      setTimeout(() => {
        const quizElement = document.getElementById("quiz-section");
        quizElement?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [searchParams]);

  return null;
}

export function DestinationsView({ initialViewModel }: DestinationsViewProps) {
  const [viewModel] = useState<DestinationsViewModel>(initialViewModel);
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter destinations
  let filtered = viewModel.destinations;

  if (selectedRegion !== "all") {
    filtered = filtered.filter((d) => d.region === selectedRegion);
  }

  if (selectedTag !== "all") {
    filtered = filtered.filter((d) => d.tags.includes(selectedTag));
  }

  if (searchQuery) {
    const searchLower = searchQuery.toLowerCase();
    filtered = filtered.filter(
      (d) =>
        d.name.toLowerCase().includes(searchLower) ||
        d.nameEn.toLowerCase().includes(searchLower) ||
        d.country.toLowerCase().includes(searchLower)
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      {/* Quiz scroll handler with Suspense */}
      <Suspense fallback={null}>
        <QuizScrollHandler />
      </Suspense>

      {/* Quiz History Floating Button */}
      <QuizHistory />

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            🌍 สำรวจจุดหมายปลายทาง
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            ค้นพบ {viewModel.totalCount} จุดหมายยอดนิยมในไทยและเอเชีย
          </p>
        </div>

        {/* NEW: Trip Inspiration Quiz - MAIN FEATURE! */}
        <div id="quiz-section">
          <TripInspirationQuiz destinations={viewModel.destinations} />
        </div>

        {/* NEW: Trending Destinations */}
        <TrendingDestinationsSection destinations={viewModel.destinations} />

        {/* NEW: Budget Destination Finder */}
        <BudgetDestinationFinder destinations={viewModel.destinations} />

        {/* NEW: Seasonal Guide */}
        <SeasonalGuide destinations={viewModel.destinations} />

        {/* NEW: Destination Collections */}
        <DestinationCollections destinations={viewModel.destinations} />

        {/* NEW: Destination Gallery */}
        <DestinationGallery destinations={viewModel.destinations} />

        {/* Divider */}
        <div className="my-12 border-t-2 border-gray-200 dark:border-gray-700"></div>

        {/* Explore All Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            🔍 สำรวจทั้งหมด
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            ค้นหาและกรองจุดหมายตามที่คุณต้องการ
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="🔍 ค้นหาจุดหมาย..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-6 py-4 text-lg border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-sky-500 dark:bg-gray-800 dark:text-white"
          />
        </div>

        {/* Filters */}
        <div className="mb-8 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          {/* Region Filter */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              ภูมิภาค
            </h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedRegion("all")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedRegion === "all"
                    ? "bg-gradient-to-r from-sky-400 to-violet-400 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                ทั้งหมด
              </button>
              {viewModel.regions.map((region) => (
                <button
                  key={region}
                  onClick={() => setSelectedRegion(region)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedRegion === region
                      ? "bg-gradient-to-r from-sky-400 to-violet-400 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>
          </div>

          {/* Tag Filter */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              ประเภท
            </h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTag("all")}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedTag === "all"
                    ? "bg-gradient-to-r from-sky-400 to-violet-400 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                ทั้งหมด
              </button>
              {viewModel.tags.slice(0, 15).map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedTag === tag
                      ? "bg-gradient-to-r from-sky-400 to-violet-400 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 text-gray-600 dark:text-gray-400">
          แสดง {filtered.length} จาก {viewModel.totalCount} จุดหมาย
        </div>

        {/* Destinations Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-12 text-center shadow-md">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              ไม่พบจุดหมาย
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              ลองเปลี่ยนตัวกรองหรือคำค้นหา
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Destination Card Component
function DestinationCard({ destination }: { destination: Destination }) {
  return (
    <Link
      href={`/destinations/${destination.slug}`}
      className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
    >
      {/* Image */}
      <div className="relative h-48 bg-gradient-to-br from-sky-200 to-violet-200 overflow-hidden">
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
        <div className="absolute inset-0 flex items-center justify-center text-white text-6xl">
          📍
        </div>
        {/* Popularity Badge */}
        {destination.popularityScore >= 90 && (
          <div className="absolute top-3 right-3 px-3 py-1 bg-violet-500 text-white text-xs font-bold rounded-full">
            🔥 Hot
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
          {destination.name}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
          {destination.country}
        </p>

        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          {destination.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {destination.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-sky-100 dark:bg-sky-900/20 text-sky-700 dark:text-sky-400 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Budget */}
        <div className="flex justify-between items-center pt-3 border-t border-gray-200 dark:border-gray-700">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            งบประมาณ
          </span>
          <span className="font-bold text-gray-900 dark:text-white">
            ฿{destination.averageBudget.min.toLocaleString()} - ฿
            {destination.averageBudget.max.toLocaleString()}
          </span>
        </div>
      </div>
    </Link>
  );
}
