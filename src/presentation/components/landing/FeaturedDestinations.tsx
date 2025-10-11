"use client";

import { Destination } from "../../presenters/landing/LandingPresenter";

interface FeaturedDestinationsProps {
  destinations: Destination[];
}

/**
 * Featured Destinations Component
 * Displays popular travel destinations
 */
export function FeaturedDestinations({ destinations }: FeaturedDestinationsProps) {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            จุดหมายยอดนิยม
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            สำรวจสถานที่ท่องเที่ยวที่ได้รับความนิยมมากที่สุด
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((destination) => (
            <div
              key={destination.id}
              className="group cursor-pointer rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative h-64 bg-gradient-to-br from-sky-200 to-violet-200 overflow-hidden">
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center text-white text-6xl">
                  📍
                </div>
              </div>

              {/* Content */}
              <div className="bg-white dark:bg-gray-800 p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {destination.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {destination.country}
                </p>

                {/* Info */}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {destination.propertiesCount.toLocaleString()} ที่พัก
                  </span>
                  <span className="text-lg font-semibold text-sky-500">
                    เริ่มต้น ฿{destination.startingPrice.toLocaleString()}
                  </span>
                </div>

                {/* Tags */}
                <div className="flex gap-2 mt-4">
                  {destination.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-sky-100 text-sky-700 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
