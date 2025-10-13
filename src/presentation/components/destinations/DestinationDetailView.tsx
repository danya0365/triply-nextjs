"use client";

import Link from "next/link";
import type { DestinationDetailViewModel } from "@/src/presentation/presenters/destinations/DestinationDetailPresenter";

interface DestinationDetailViewProps {
  viewModel: DestinationDetailViewModel;
}

export function DestinationDetailView({ viewModel }: DestinationDetailViewProps) {
  const { destination, relatedDestinations, nearbyAccommodations } = viewModel;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative py-32">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-400 to-rose-400 dark:from-purple-600 dark:via-pink-500 dark:to-rose-500">
          <div className="absolute inset-0 bg-black/30 dark:bg-black/40" />
          {/* Animated blobs */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-300/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-300/30 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full mb-6">
            <span className="text-xl">📍</span>
            <span className="font-medium">{destination.country}</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
            {destination.name}
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-orange-200">
              {destination.nameEn}
            </span>
          </h1>
          
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {destination.tags?.map((tag, index) => (
              <span 
                key={index}
                className="px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm font-medium border border-white/20 hover:bg-white/20 transition-colors cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                เกี่ยวกับ {destination.name}
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {destination.description}
              </p>
            </div>

            {/* Highlights */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                ✨ ไฮไลท์
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {destination.highlights.map((highlight, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-4 bg-sky-50 dark:bg-sky-900/20 rounded-lg"
                  >
                    <span className="text-2xl">⭐</span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Nearby Accommodations */}
            {nearbyAccommodations.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    🏨 ที่พักใกล้เคียง
                  </h2>
                  <Link
                    href="/accommodations"
                    className="text-sky-600 dark:text-sky-400 hover:underline"
                  >
                    ดูทั้งหมด →
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {nearbyAccommodations.map((acc) => (
                    <Link
                      key={acc.id}
                      href={`/accommodations/${acc.id}`}
                      className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-sky-500 dark:hover:border-sky-500 transition-colors"
                    >
                      <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                        {acc.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 bg-sky-500 text-white text-sm font-bold rounded">
                            {acc.rating}
                          </span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            ยอดเยี่ยม
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-gray-900 dark:text-white">
                            ฿{acc.pricePerNight.toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-500">/ คืน</div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Related Destinations */}
            {relatedDestinations.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  🌍 จุดหมายที่เกี่ยวข้อง
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {relatedDestinations.map((dest) => (
                    <Link
                      key={dest.id}
                      href={`/destinations/${dest.slug}`}
                      className="group p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-sky-500 dark:hover:border-sky-500 transition-colors"
                    >
                      <h3 className="font-bold text-gray-900 dark:text-white mb-1 group-hover:text-sky-600 dark:group-hover:text-sky-400">
                        {dest.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {dest.country}
                      </p>
                      <div className="flex gap-2">
                        {dest.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sticky top-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                ข้อมูลด่วน
              </h3>

              {/* Region */}
              <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  ภูมิภาค
                </div>
                <div className="font-semibold text-gray-900 dark:text-white">
                  {destination.region}
                </div>
              </div>

              {/* Climate */}
              <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  สภาพอากาศ
                </div>
                <div className="font-semibold text-gray-900 dark:text-white capitalize">
                  {destination.climate}
                </div>
              </div>

              {/* Languages */}
              <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  ภาษา
                </div>
                <div className="font-semibold text-gray-900 dark:text-white">
                  {destination.language.join(", ")}
                </div>
              </div>

              {/* Budget */}
              <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  งบประมาณเฉลี่ย (ต่อวัน)
                </div>
                <div className="font-bold text-lg text-gray-900 dark:text-white">
                  ฿{destination.averageBudget.min.toLocaleString()} - ฿
                  {destination.averageBudget.max.toLocaleString()}
                </div>
              </div>

              {/* Best Season */}
              <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  ช่วงเวลาที่เหมาะสม
                </div>
                <div className="flex flex-wrap gap-2">
                  {destination.seasonality.best.map((month) => (
                    <span
                      key={month}
                      className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs rounded-full"
                    >
                      {month}
                    </span>
                  ))}
                </div>
              </div>

              {/* Best For */}
              <div className="mb-6">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  เหมาะสำหรับ
                </div>
                <div className="flex flex-wrap gap-2">
                  {destination.bestFor.map((type) => (
                    <span
                      key={type}
                      className="px-3 py-1 bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-400 text-sm rounded-full"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3">
                <Link
                  href="/trip-planner"
                  className="block w-full py-3 bg-gradient-to-r from-sky-400 to-violet-400 text-white font-bold text-center rounded-lg hover:shadow-lg transition-all"
                >
                  วางแผนทริป
                </Link>
                <Link
                  href="/accommodations"
                  className="block w-full py-3 border-2 border-sky-400 text-sky-600 dark:text-sky-400 font-bold text-center rounded-lg hover:bg-sky-50 dark:hover:bg-sky-900/20 transition-all"
                >
                  ค้นหาที่พัก
                </Link>
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                แท็ก
              </h3>
              <div className="flex flex-wrap gap-2">
                {destination.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
