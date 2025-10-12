"use client";

import { useState } from "react";
import Link from "next/link";
import type { Destination } from "@/src/data/master/destinations.master";

interface DestinationMapProps {
  destinations: Destination[];
}

// Simplified coordinate mapping (for demo - in production use actual lat/lng)
const COORDINATE_MAP: Record<string, { x: number; y: number }> = {
  // Thailand
  bangkok: { x: 50, y: 60 },
  phuket: { x: 45, y: 75 },
  chiangmai: { x: 48, y: 35 },
  krabi: { x: 46, y: 72 },
  pattaya: { x: 52, y: 62 },
  huahin: { x: 49, y: 65 },
  samui: { x: 52, y: 68 },
  
  // Asia
  singapore: { x: 52, y: 85 },
  tokyo: { x: 85, y: 25 },
  osaka: { x: 83, y: 28 },
  kyoto: { x: 84, y: 27 },
  bali: { x: 60, y: 80 },
  vietnam: { x: 55, y: 45 },
  seoul: { x: 80, y: 20 },
  taipei: { x: 75, y: 40 },
};

export function DestinationMap({ destinations }: DestinationMapProps) {
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(
    null
  );
  const [hoveredDestination, setHoveredDestination] = useState<Destination | null>(
    null
  );
  const [filterRegion, setFilterRegion] = useState<string>("all");

  // Filter destinations
  const filtered =
    filterRegion === "all"
      ? destinations
      : destinations.filter((d) => d.region === filterRegion);

  // Get unique regions
  const regions = ["all", ...new Set(destinations.map((d) => d.region))];

  return (
    <section className="mb-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          🗺️ แผนที่จุดหมาย
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          สำรวจจุดหมายบนแผนที่ แตะเพื่อดูรายละเอียด
        </p>
      </div>

      {/* Region Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {regions.map((region) => (
          <button
            key={region}
            onClick={() => setFilterRegion(region)}
            className={`px-4 py-2 rounded-full font-medium transition-all ${
              filterRegion === region
                ? "bg-gradient-to-r from-sky-400 to-violet-400 text-white shadow-lg"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            {region === "all" ? "🌍 ทั้งหมด" : region}
          </button>
        ))}
      </div>

      {/* Map Container */}
      <div className="bg-gradient-to-br from-sky-50 via-blue-50 to-emerald-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-2xl p-8 shadow-xl">
        <div className="relative w-full" style={{ paddingBottom: "60%" }}>
          {/* Map Background */}
          <div className="absolute inset-0 rounded-xl overflow-hidden bg-gradient-to-br from-sky-100 to-blue-100 dark:from-gray-700 dark:to-gray-600">
            {/* Decorative Map Grid */}
            <svg
              className="absolute inset-0 w-full h-full opacity-20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern
                  id="grid"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 40 0 L 0 0 0 40"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.5"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* Destination Markers */}
            {filtered.map((destination) => {
              const coords = COORDINATE_MAP[destination.slug] || { x: 50, y: 50 };
              const isHovered = hoveredDestination?.id === destination.id;
              const isSelected = selectedDestination?.id === destination.id;

              return (
                <div
                  key={destination.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all cursor-pointer"
                  style={{
                    left: `${coords.x}%`,
                    top: `${coords.y}%`,
                    zIndex: isSelected ? 20 : isHovered ? 15 : 10,
                  }}
                  onMouseEnter={() => setHoveredDestination(destination)}
                  onMouseLeave={() => setHoveredDestination(null)}
                  onClick={() => setSelectedDestination(destination)}
                >
                  {/* Marker Pin */}
                  <div
                    className={`relative transition-all duration-300 ${
                      isSelected || isHovered ? "scale-125" : "scale-100"
                    }`}
                  >
                    {/* Pulse Animation */}
                    {(isSelected || isHovered) && (
                      <div className="absolute inset-0 bg-sky-400 rounded-full animate-ping opacity-75" />
                    )}

                    {/* Pin */}
                    <div
                      className={`relative w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-lg transition-colors ${
                        isSelected
                          ? "bg-gradient-to-r from-sky-500 to-violet-500 text-white scale-110"
                          : isHovered
                          ? "bg-gradient-to-r from-sky-400 to-violet-400 text-white"
                          : "bg-white dark:bg-gray-700 text-gray-700 dark:text-white"
                      }`}
                    >
                      📍
                    </div>

                    {/* Popularity Badge */}
                    <div className="absolute -top-1 -right-1 bg-yellow-400 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow">
                      {destination.popularityScore}
                    </div>
                  </div>

                  {/* Hover Tooltip */}
                  {isHovered && !isSelected && (
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white dark:bg-gray-700 rounded-lg shadow-2xl p-3 min-w-[200px] animate-in fade-in zoom-in duration-200">
                      <div className="font-bold text-gray-900 dark:text-white mb-1">
                        {destination.name}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {destination.country}
                      </div>
                      <div className="text-xs text-sky-500 mt-2">
                        คลิกเพื่อดูรายละเอียด →
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap gap-4 justify-center text-sm">
          <div className="flex items-center gap-2 bg-white dark:bg-gray-700 px-4 py-2 rounded-lg">
            <div className="w-4 h-4 bg-gradient-to-r from-sky-500 to-violet-500 rounded-full"></div>
            <span className="text-gray-700 dark:text-gray-300">เลือกแล้ว</span>
          </div>
          <div className="flex items-center gap-2 bg-white dark:bg-gray-700 px-4 py-2 rounded-lg">
            <div className="w-4 h-4 bg-white dark:bg-gray-600 border-2 border-gray-300 dark:border-gray-500 rounded-full"></div>
            <span className="text-gray-700 dark:text-gray-300">จุดหมาย</span>
          </div>
          <div className="flex items-center gap-2 bg-white dark:bg-gray-700 px-4 py-2 rounded-lg">
            <div className="bg-yellow-400 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              9
            </div>
            <span className="text-gray-700 dark:text-gray-300">ความนิยม</span>
          </div>
        </div>
      </div>

      {/* Destinations List */}
      <div className="mt-8">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          📋 รายการจุดหมาย ({filtered.length})
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filtered.map((destination) => (
            <button
              key={destination.id}
              onClick={() => setSelectedDestination(destination)}
              className={`text-left p-4 rounded-xl transition-all ${
                selectedDestination?.id === destination.id
                  ? "bg-gradient-to-r from-sky-400 to-violet-400 text-white shadow-lg scale-105"
                  : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:shadow-lg hover:scale-105"
              }`}
            >
              <div className="font-bold mb-1 line-clamp-1">{destination.name}</div>
              <div
                className={`text-sm flex items-center gap-1 ${
                  selectedDestination?.id === destination.id
                    ? "text-white/90"
                    : "text-gray-600 dark:text-gray-400"
                }`}
              >
                <span>📍</span>
                <span className="line-clamp-1">{destination.country}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Destination Modal */}
      {selectedDestination && (
        <DestinationModal
          destination={selectedDestination}
          onClose={() => setSelectedDestination(null)}
        />
      )}
    </section>
  );
}

// Destination Modal Component
interface DestinationModalProps {
  destination: Destination;
  onClose: () => void;
}

function DestinationModal({ destination, onClose }: DestinationModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden animate-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button - Top Right */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-gray-900/50 hover:bg-gray-900/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-2xl transition-colors shadow-lg"
        >
          ×
        </button>

        <div className="overflow-y-auto max-h-[90vh]">
          <div className="md:flex">
            {/* Image Section */}
            <div className="md:w-2/5 relative h-64 md:h-auto">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${destination.coverImage})`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

              {/* Tags */}
              <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                {destination.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="bg-white/20 backdrop-blur-md text-white text-xs font-medium px-3 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Popularity Badge */}
              <div className="absolute top-4 left-4 bg-gradient-to-r from-sky-400 to-violet-400 text-white px-4 py-2 rounded-xl font-bold shadow-lg flex items-center gap-2">
                <span>⭐</span>
                <span>{destination.popularityScore}</span>
              </div>
            </div>

            {/* Content Section */}
            <div className="md:w-3/5 p-6 md:p-8">
              {/* Header */}
              <div className="mb-4">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                  {destination.name}
                </h3>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <span>📍</span>
                  <span className="font-medium">{destination.country}</span>
                  <span>•</span>
                  <span>{destination.region}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                {destination.description}
              </p>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    💰 งบประมาณ
                  </div>
                  <div className="font-bold text-gray-900 dark:text-white">
                    ฿{destination.averageBudget.min.toLocaleString()}-
                    {destination.averageBudget.max.toLocaleString()}
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    🌤️ ฤดูกาลที่ดี
                  </div>
                  <div className="font-bold text-gray-900 dark:text-white">
                    {destination.seasonality.best.join(", ")}
                  </div>
                </div>
              </div>

              {/* Highlights */}
              <div className="mb-6">
                <div className="text-sm font-bold text-gray-900 dark:text-white mb-3">
                  ✨ ไฮไลท์ท่องเที่ยว
                </div>
                <div className="flex flex-wrap gap-2">
                  {destination.highlights.slice(0, 6).map((highlight) => (
                    <span
                      key={highlight}
                      className="bg-gradient-to-r from-sky-50 to-violet-50 dark:from-sky-900/20 dark:to-violet-900/20 text-gray-700 dark:text-gray-300 text-sm px-3 py-2 rounded-lg border border-sky-200 dark:border-sky-800"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="flex gap-3">
                <Link
                  href={`/destinations/${destination.slug}`}
                  className="flex-1 text-center bg-gradient-to-r from-sky-400 to-violet-400 text-white font-bold px-6 py-3 rounded-xl hover:shadow-2xl hover:scale-105 transition-all"
                >
                  ดูรายละเอียดเต็ม →
                </Link>
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  ปิด
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
