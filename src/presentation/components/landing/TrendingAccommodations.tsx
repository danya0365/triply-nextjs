"use client";

import { Accommodation } from "../../presenters/landing/LandingPresenter";

interface TrendingAccommodationsProps {
  accommodations: Accommodation[];
}

/**
 * Trending Accommodations Component
 * Displays popular and featured properties
 */
export function TrendingAccommodations({ accommodations }: TrendingAccommodationsProps) {
  return (
    <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            ที่พักยอดนิยม
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            ที่พักคุณภาพสูงที่ได้รับคะแนนดีเยี่ยม
          </p>
        </div>

        {/* Accommodations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {accommodations.map((accommodation) => (
            <div
              key={accommodation.id}
              className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="md:flex">
                {/* Image */}
                <div className="md:w-2/5 relative h-64 md:h-auto bg-gradient-to-br from-violet-200 to-purple-300">
                  <div className="absolute inset-0 flex items-center justify-center text-white text-6xl">
                    🏨
                  </div>
                  {accommodation.isFeatured && (
                    <div className="absolute top-4 left-4 px-3 py-1 bg-violet-400 text-white text-sm font-semibold rounded-full">
                      Featured
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="md:w-3/5 p-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {accommodation.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    📍 {accommodation.location}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="px-3 py-1 bg-sky-400 text-white font-bold rounded-lg">
                      {accommodation.rating}
                    </div>
                    <span className="text-gray-600 dark:text-gray-400">
                      ยอดเยี่ยม ({accommodation.reviewCount.toLocaleString()} รีวิว)
                    </span>
                  </div>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {accommodation.amenities.map((amenity) => (
                      <span
                        key={amenity}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>

                  {/* Price */}
                  <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div>
                      <span className="text-3xl font-bold text-gray-900 dark:text-white">
                        ฿{accommodation.pricePerNight.toLocaleString()}
                      </span>
                      <span className="text-gray-600 dark:text-gray-400 ml-2">
                        / คืน
                      </span>
                    </div>
                    <button className="px-6 py-2 bg-gradient-to-r from-sky-300 to-violet-300 text-white font-semibold rounded-lg hover:shadow-lg transition-all">
                      ดูรายละเอียด
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-8">
          <button className="px-8 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-600 font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            ดูที่พักทั้งหมด
          </button>
        </div>
      </div>
    </section>
  );
}
