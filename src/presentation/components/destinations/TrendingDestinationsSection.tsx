"use client";
import type { Destination } from "@/src/data/master/destinations.master";
import Image from "next/image";
import Link from "next/link";

interface TrendingDestinationsSectionProps {
  destinations: Destination[];
  title?: string;
  showAll?: boolean;
}
export function TrendingDestinationsSection({
  destinations,
  title = "🔥 จุดหมายยอดนิยมสัปดาห์นี้",
  showAll = false,
}: TrendingDestinationsSectionProps) {
  // Sort by popularity and get top 10
  const trendingDestinations = [...destinations]
    .sort((a, b) => b.popularityScore - a.popularityScore)
    .slice(0, showAll ? destinations.length : 10);

  return (
    <section className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          {title}
        </h2>
        {!showAll && (
          <Link
            href="/destinations-explore?filter=trending"
            className="text-sky-600 dark:text-sky-400 hover:underline font-medium"
          >
            ดูทั้งหมด →
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {trendingDestinations.map((destination, index) => (
          <DestinationTrendCard
            key={destination.id}
            destination={destination}
            rank={index + 1}
            trend={calculateTrend(destination.popularityScore)}
          />
        ))}
      </div>
    </section>
  );
}

// Destination Trend Card Component
interface DestinationTrendCardProps {
  destination: Destination;
  rank: number;
  trend: number;
}

function DestinationTrendCard({
  destination,
  rank,
  trend,
}: DestinationTrendCardProps) {
  const isTopThree = rank <= 3;

  return (
    <Link
      href={`/destinations/${destination.slug}`}
      className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden"
    >
      {/* Rank Badge */}
      <div
        className={`absolute top-3 left-3 z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-lg ${
          isTopThree
            ? "bg-gradient-to-br from-yellow-400 to-orange-500"
            : "bg-gray-700 dark:bg-gray-600"
        }`}
      >
        {rank}
      </div>

      {/* Trend Badge */}
      {trend > 0 && (
        <div className="absolute top-3 right-3 z-10 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
          <span>↑</span>
          <span>{trend}%</span>
        </div>
      )}

      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-[1]"></div>
        {destination.coverImage ? (
          <>
            <Image
              src={destination.coverImage}
              alt={destination.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-110 transition-transform duration-300"
              onError={(e) => {
                // Fallback to emoji if image fails to load
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                const fallback = document.createElement("div");
                fallback.className =
                  "w-full h-full bg-gradient-to-br from-sky-400 to-violet-400 flex items-center justify-center text-white text-4xl";
                fallback.innerHTML = getDestinationEmoji(destination.tags[0]);
                target.parentNode?.insertBefore(fallback, target.nextSibling);
              }}
              priority={false}
            />
            {/* Fallback for SSR/SSG */}
            <div className="w-full h-full bg-gradient-to-br from-sky-400 to-violet-400 flex items-center justify-center text-white text-4xl hidden">
              {getDestinationEmoji(destination.tags[0])}
            </div>
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-sky-400 to-violet-400 flex items-center justify-center text-white text-4xl">
            {getDestinationEmoji(destination.tags[0])}
          </div>
        )}

        {/* Destination Name Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 z-[2]">
          <h3 className="text-xl font-bold text-white mb-1">
            {destination.name}
          </h3>
          <p className="text-white/90 text-sm">{destination.region}</p>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {destination.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-400 text-xs rounded-full"
            >
              {getTagLabel(tag)}
            </span>
          ))}
        </div>

        {/* Budget */}
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <span>💰</span>
          <span>
            {destination.averageBudget.min.toLocaleString()}-
            {destination.averageBudget.max.toLocaleString()}{" "}
            {destination.averageBudget.currency}
          </span>
        </div>

        {/* Popularity Score */}
        <div className="mt-2 flex items-center gap-2">
          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-sky-400 to-violet-400 h-full rounded-full transition-all"
              style={{ width: `${destination.popularityScore}%` }}
            ></div>
          </div>
          <span className="text-xs font-bold text-gray-600 dark:text-gray-400">
            {destination.popularityScore}
          </span>
        </div>
      </div>
    </Link>
  );
}

// Helper Functions
function calculateTrend(popularityScore: number): number {
  // Simulate trend calculation (in real app, compare with last week's data)
  // For now, use popularity score to generate realistic trends
  if (popularityScore >= 90) return Math.floor(Math.random() * 10) + 15; // 15-25%
  if (popularityScore >= 80) return Math.floor(Math.random() * 10) + 10; // 10-20%
  if (popularityScore >= 70) return Math.floor(Math.random() * 8) + 5; // 5-13%
  return Math.floor(Math.random() * 5); // 0-5%
}

function getDestinationEmoji(tag: string): string {
  const emojiMap: Record<string, string> = {
    beach: "🏖️",
    island: "🏝️",
    mountain: "⛰️",
    city: "🏙️",
    culture: "🏛️",
    adventure: "🧗",
    spa: "🧖",
    diving: "🤿",
    temple: "⛩️",
    food: "🍜",
  };
  return emojiMap[tag] || "🗺️";
}

function getTagLabel(tag: string): string {
  const labelMap: Record<string, string> = {
    beach: "ชายหาด",
    island: "เกาะ",
    mountain: "ภูเขา",
    city: "เมือง",
    culture: "วัฒนธรรม",
    adventure: "ผจญภัย",
    luxury: "หรูหรา",
    spa: "สปา",
    romantic: "โรแมนติก",
    diving: "ดำน้ำ",
    temple: "วัด",
    food: "อาหาร",
    shopping: "ช้อปปิ้ง",
    golf: "กอล์ฟ",
    family: "ครอบครัว",
    weekend: "วีคเอนด์",
  };
  return labelMap[tag] || tag;
}
