"use client";

import type { DestinationsViewModel } from "@/src/presentation/presenters/destinations/DestinationsPresenter";
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
        
        {/* Explore More Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-sky-50 to-violet-50 dark:from-sky-900/30 dark:to-violet-900/30 rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              ยังไม่พบจุดหมายที่ใช่ใช่ไหม?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              มาค้นหาจุดหมายในฝันของคุณจากจุดหมายทั้งหมด {viewModel.totalCount} แห่ง
              พร้อมตัวกรองและค้นหาขั้นสูง
            </p>
            <a
              href="/destinations-explore"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-sky-500 to-violet-500 hover:from-sky-600 hover:to-violet-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <span>สำรวจจุดหมายทั้งหมด</span>
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
