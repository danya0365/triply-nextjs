"use client";

import { useState } from "react";
import Link from "next/link";
import type { Destination } from "@/src/data/master/destinations.master";

interface DestinationGalleryProps {
  destinations: Destination[];
}

export function DestinationGallery({ destinations }: DestinationGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"masonry" | "grid">("masonry");

  // Get unique categories
  const categories = ["all", ...new Set(destinations.flatMap((d) => d.tags))];

  // Filter destinations
  const filtered =
    selectedCategory === "all"
      ? destinations
      : destinations.filter((d) => d.tags.includes(selectedCategory));

  return (
    <section className="mb-12">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              📸 แกลเลอรี่จุดหมาย
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              สำรวจจุดหมายในมุมมองที่สวยงาม
            </p>
          </div>

          {/* View Mode Toggle */}
          <div className="flex gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
            <button
              onClick={() => setViewMode("masonry")}
              className={`px-4 py-2 rounded-md font-medium transition-all ${
                viewMode === "masonry"
                  ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              🎨 Masonry
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`px-4 py-2 rounded-md font-medium transition-all ${
                viewMode === "grid"
                  ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              🔲 Grid
            </button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mt-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-sky-400 to-violet-400 text-white shadow-lg"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {category === "all" ? "🌍 ทั้งหมด" : `#${category}`}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      {viewMode === "masonry" ? (
        <MasonryGallery destinations={filtered} />
      ) : (
        <RegularGrid destinations={filtered} />
      )}
    </section>
  );
}

// Masonry Grid Layout
function MasonryGallery({ destinations }: { destinations: Destination[] }) {
  const [selectedImage, setSelectedImage] = useState<{
    destination: Destination;
    index: number;
  } | null>(null);

  // Distribute destinations into 3 columns
  const columns = [
    destinations.filter((_, i) => i % 3 === 0),
    destinations.filter((_, i) => i % 3 === 1),
    destinations.filter((_, i) => i % 3 === 2),
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {columns.map((column, colIndex) => (
          <div key={colIndex} className="flex flex-col gap-4">
            {column.map((destination, index) => (
              <GalleryCard
                key={destination.id}
                destination={destination}
                onClick={() =>
                  setSelectedImage({
                    destination,
                    index: colIndex * Math.ceil(destinations.length / 3) + index,
                  })
                }
              />
            ))}
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <Lightbox
          destination={selectedImage.destination}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </>
  );
}

// Regular Grid Layout
function RegularGrid({ destinations }: { destinations: Destination[] }) {
  const [selectedImage, setSelectedImage] = useState<Destination | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {destinations.map((destination) => (
          <GalleryCard
            key={destination.id}
            destination={destination}
            onClick={() => setSelectedImage(destination)}
            isSquare
          />
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <Lightbox destination={selectedImage} onClose={() => setSelectedImage(null)} />
      )}
    </>
  );
}

// Gallery Card Component
interface GalleryCardProps {
  destination: Destination;
  onClick: () => void;
  isSquare?: boolean;
}

function GalleryCard({ destination, onClick, isSquare }: GalleryCardProps) {
  // Random height for masonry effect (only if not square)
  const heights = ["300px", "400px", "350px", "450px"];
  const randomHeight = heights[Math.floor(Math.random() * heights.length)];

  return (
    <div
      onClick={onClick}
      className="group relative overflow-hidden rounded-xl cursor-pointer shadow-lg hover:shadow-2xl transition-all"
      style={{ height: isSquare ? "300px" : randomHeight }}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
        style={{
          backgroundImage: `url(${destination.coverImage})`,
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity">
          {destination.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-white mb-2 transform transition-transform group-hover:translate-y-[-4px]">
          {destination.name}
        </h3>

        {/* Info */}
        <div className="flex items-center justify-between text-white/90 text-sm">
          <span className="flex items-center gap-1">
            <span>📍</span>
            <span>{destination.country}</span>
          </span>
          <span className="flex items-center gap-1">
            <span>⭐</span>
            <span>{destination.popularityScore}</span>
          </span>
        </div>

        {/* Hover Icon */}
        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all">
          <span className="text-white text-xl">🔍</span>
        </div>
      </div>
    </div>
  );
}

// Lightbox Component
interface LightboxProps {
  destination: Destination;
  onClose: () => void;
}

function Lightbox({ destination, onClose }: LightboxProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white text-4xl hover:scale-110 transition-transform"
        >
          ×
        </button>

        {/* Image */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          <div
            className="w-full h-[70vh] bg-cover bg-center"
            style={{
              backgroundImage: `url(${destination.coverImage})`,
            }}
          />

          {/* Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-8">
            <div className="flex items-center gap-2 mb-2">
              {destination.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-white/20 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <h2 className="text-4xl font-bold text-white mb-3">
              {destination.name}
            </h2>

            <p className="text-white/90 text-lg mb-4 line-clamp-2">
              {destination.description}
            </p>

            <div className="flex flex-wrap gap-4 text-white/80 text-sm mb-6">
              <span className="flex items-center gap-2">
                <span>📍</span>
                <span>{destination.country}</span>
              </span>
              <span className="flex items-center gap-2">
                <span>💰</span>
                <span>
                  ฿{destination.averageBudget.min.toLocaleString()}-
                  {destination.averageBudget.max.toLocaleString()}
                </span>
              </span>
              <span className="flex items-center gap-2">
                <span>⭐</span>
                <span>Popularity: {destination.popularityScore}</span>
              </span>
            </div>

            {/* CTA */}
            <Link
              href={`/destinations/${destination.slug}`}
              className="inline-block bg-gradient-to-r from-sky-400 to-violet-400 text-white font-bold px-8 py-3 rounded-xl hover:shadow-2xl transition-all"
            >
              ดูรายละเอียด →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
