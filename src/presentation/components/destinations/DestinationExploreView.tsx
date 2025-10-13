"use client";

import type { Destination } from "@/src/data/master/destinations.master";
import type { DestinationsViewModel } from "@/src/presentation/presenters/destinations/DestinationsPresenter";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface DestinationExploreViewProps {
  initialViewModel: DestinationsViewModel;
}

export function DestinationExploreView({ initialViewModel }: DestinationExploreViewProps) {
  const [viewModel] = useState<DestinationsViewModel>(initialViewModel);
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const searchParams = useSearchParams();

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
        (d.nameEn && d.nameEn.toLowerCase().includes(searchLower)) ||
        d.country.toLowerCase().includes(searchLower)
    );
  }

  // Handle URL search param for initial filter
  useEffect(() => {
    const tag = searchParams.get('tag');
    const region = searchParams.get('region');
    
    if (tag) setSelectedTag(tag);
    if (region) setSelectedRegion(region);
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            🌍 สำรวจจุดหมายปลายทางทั้งหมด
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
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
              {viewModel.tags.map((tag) => (
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
          พบ {filtered.length} จาก {viewModel.totalCount} จุดหมาย
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {filtered.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Fallback component for when image fails to load
const ImageFallback = ({ name }: { name: string }) => (
  <div className="w-full h-full bg-gradient-to-br from-sky-100 to-violet-100 dark:from-sky-900/30 dark:to-violet-900/30 flex items-center justify-center">
    <span className="text-4xl" role="img" aria-label={name}>
      🌍
    </span>
  </div>
);

// Destination Card Component
function DestinationCard({ destination }: { destination: Destination }) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const imageUrl = destination.images[0];

  return (
    <Link href={`/destinations/${destination.slug}`} className="h-full">
      <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
        <div className="relative h-48 overflow-hidden">
          {!imageError && imageUrl ? (
            <>
              <Image
                src={imageUrl}
                alt={destination.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className={`object-cover transition-all duration-500 ${
                  isLoading ? 'opacity-0' : 'opacity-100 hover:scale-105'
                }`}
                onLoad={() => setIsLoading(false)}
                onError={() => setImageError(true)}
                priority={false}
              />
              {isLoading && (
                <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-10 h-10 border-4 border-t-sky-500 border-r-violet-500 border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <ImageFallback name={destination.name} />
          )}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
            <h3 className="text-white font-bold text-lg">{destination.name}</h3>
            <p className="text-gray-200 text-sm">{destination.country}</p>
          </div>
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <div className="flex-1">
            <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-3">
              {destination.description}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 mt-auto">
            {destination.tags.slice(0, 3).map((tag) => (
              <span 
                key={tag}
                className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
