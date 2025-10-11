"use client";

import { LandingViewModel } from "../../presenters/landing/LandingPresenter";
import { HeroSection } from "./HeroSection";
import { FeaturedDestinations } from "./FeaturedDestinations";
import { TrendingAccommodations } from "./TrendingAccommodations";
import { StatisticsSection } from "./StatisticsSection";
import { HowItWorks } from "./HowItWorks";
import { GamificationPreview } from "./GamificationPreview";

interface LandingViewProps {
  viewModel: LandingViewModel;
}

/**
 * Landing View Component
 * Main view for the landing page following Atomic Design
 */
export function LandingView({ viewModel }: LandingViewProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Destinations */}
      <FeaturedDestinations destinations={viewModel.featuredDestinations} />

      {/* Trending Accommodations */}
      <TrendingAccommodations accommodations={viewModel.trendingAccommodations} />

      {/* How It Works */}
      <HowItWorks />

      {/* Gamification Preview */}
      <GamificationPreview />

      {/* Statistics */}
      <StatisticsSection statistics={viewModel.statistics} />
    </div>
  );
}
