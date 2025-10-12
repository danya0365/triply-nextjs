"use client";

import { useState } from "react";
import Link from "next/link";
import type { Destination } from "@/src/data/master/destinations.master";

interface DestinationCollectionsProps {
  destinations: Destination[];
}

interface Collection {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  gradient: string;
  filter: (d: Destination) => boolean;
}

const COLLECTIONS: Collection[] = [
  {
    id: "beach-paradise",
    name: "🏖️ Beach Paradise",
    description: "จุดหมายชายหาดสวรรค์ พักผ่อนริมทะเล",
    icon: "🏖️",
    color: "from-sky-400 to-blue-500",
    gradient: "from-sky-50 to-blue-50 dark:from-sky-900/20 dark:to-blue-900/20",
    filter: (d) => d.tags.includes("beach") || d.tags.includes("island"),
  },
  {
    id: "mountain-escape",
    name: "⛰️ Mountain Escape",
    description: "หนีเมืองไปภูเขา อากาศเย็นสบาย",
    icon: "⛰️",
    color: "from-emerald-400 to-green-600",
    gradient: "from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20",
    filter: (d) => d.tags.includes("mountain") || d.tags.includes("nature"),
  },
  {
    id: "cultural-heritage",
    name: "🏛️ Cultural Heritage",
    description: "ชมวัฒนธรรม ประวัติศาสตร์ วิถีชีวิต",
    icon: "🏛️",
    color: "from-amber-400 to-orange-500",
    gradient: "from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20",
    filter: (d) => d.tags.includes("culture") || d.tags.includes("historical"),
  },
  {
    id: "urban-adventure",
    name: "🏙️ Urban Adventure",
    description: "ชีวิตเมือง ช้อปปิ้ง ไนท์ไลฟ์",
    icon: "🏙️",
    color: "from-purple-400 to-pink-500",
    gradient: "from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20",
    filter: (d) => d.tags.includes("city") || d.tags.includes("shopping"),
  },
  {
    id: "luxury-resort",
    name: "💎 Luxury Resort",
    description: "พักผ่อนหรูหรา สไตล์พรีเมียม",
    icon: "💎",
    color: "from-yellow-400 to-orange-400",
    gradient: "from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20",
    filter: (d) => d.averageBudget.min >= 15000,
  },
  {
    id: "family-friendly",
    name: "👨‍👩‍👧 Family Friendly",
    description: "เหมาะกับครอบครัว เด็กๆ ชอบ",
    icon: "👨‍👩‍👧",
    color: "from-pink-400 to-rose-500",
    gradient: "from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20",
    filter: (d) => d.bestFor.includes("family") || d.tags.includes("adventure"),
  },
  {
    id: "romantic-getaway",
    name: "💑 Romantic Getaway",
    description: "จุดหมายสำหรับคู่รัก บรรยากาศโรแมนติก",
    icon: "💑",
    color: "from-red-400 to-pink-500",
    gradient: "from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20",
    filter: (d) => d.bestFor.includes("honeymoon") || d.tags.includes("romantic"),
  },
  {
    id: "adventure-seeker",
    name: "🤿 Adventure Seeker",
    description: "กิจกรรมท้าทาย ผจญภัย ตื่นเต้น",
    icon: "🤿",
    color: "from-orange-400 to-red-500",
    gradient: "from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20",
    filter: (d) => d.tags.includes("adventure") || d.tags.includes("water-sports"),
  },
  {
    id: "food-paradise",
    name: "🍜 Food Paradise",
    description: "สวรรค์ของคนรักการกิน อาหารเด็ด",
    icon: "🍜",
    color: "from-lime-400 to-green-500",
    gradient: "from-lime-50 to-green-50 dark:from-lime-900/20 dark:to-green-900/20",
    filter: (d) => d.tags.includes("food") || d.tags.includes("street-food"),
  },
  {
    id: "budget-friendly",
    name: "💰 Budget Friendly",
    description: "ประหยัด คุ้มค่า งบน้อยก็เที่ยวได้",
    icon: "💰",
    color: "from-teal-400 to-cyan-500",
    gradient: "from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20",
    filter: (d) => d.averageBudget.min < 8000,
  },
];

export function DestinationCollections({
  destinations,
}: DestinationCollectionsProps) {
  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(
    null
  );

  // Calculate destinations count for each collection
  const collectionsWithCount = COLLECTIONS.map((collection) => ({
    ...collection,
    count: destinations.filter(collection.filter).length,
  }));

  return (
    <section className="mb-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          📚 คอลเลกชัน
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          จุดหมายที่คัดสรรตามธีม เลือกสไตล์ที่ใช่สำหรับคุณ
        </p>
      </div>

      {/* Collections Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
        {collectionsWithCount.map((collection) => (
          <button
            key={collection.id}
            onClick={() => setSelectedCollection(collection)}
            className={`group relative overflow-hidden rounded-2xl p-6 text-left transition-all hover:scale-105 hover:shadow-2xl bg-gradient-to-br ${collection.gradient} border-2 border-gray-200 dark:border-gray-700`}
          >
            {/* Icon */}
            <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform">
              {collection.icon}
            </div>

            {/* Name */}
            <h3 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">
              {collection.name}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
              {collection.description}
            </p>

            {/* Count Badge */}
            <div className={`inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r ${collection.color} text-white rounded-full text-sm font-bold`}>
              <span>{collection.count}</span>
              <span>จุดหมาย</span>
            </div>

            {/* Hover Arrow */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-2xl">→</span>
            </div>
          </button>
        ))}
      </div>

      {/* Collection Modal */}
      {selectedCollection && (
        <CollectionModal
          collection={selectedCollection}
          destinations={destinations.filter(selectedCollection.filter)}
          onClose={() => setSelectedCollection(null)}
        />
      )}
    </section>
  );
}

// Collection Modal Component
interface CollectionModalProps {
  collection: Collection;
  destinations: Destination[];
  onClose: () => void;
}

function CollectionModal({
  collection,
  destinations,
  onClose,
}: CollectionModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="absolute inset-0"
        onClick={onClose}
      />

      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className={`bg-gradient-to-r ${collection.color} p-8 text-white`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-full transition-colors"
          >
            <span className="text-2xl">×</span>
          </button>

          <div className="text-6xl mb-4">{collection.icon}</div>
          <h2 className="text-4xl font-bold mb-2">{collection.name}</h2>
          <p className="text-white/90 text-lg mb-4">{collection.description}</p>
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
            <span className="font-bold">{destinations.length}</span>
            <span>จุดหมาย</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-250px)]">
          {destinations.length === 0 ? (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <div className="text-6xl mb-4">🔍</div>
              <p className="font-medium">ไม่พบจุดหมายในคอลเลกชันนี้</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {destinations.map((destination) => (
                <Link
                  key={destination.id}
                  href={`/destinations/${destination.slug}`}
                  onClick={onClose}
                  className="group bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden hover:shadow-2xl transition-all"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-500"
                      style={{
                        backgroundImage: `url(${destination.coverImage})`,
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    {/* Tags */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                      {destination.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Popularity */}
                    <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded flex items-center gap-1 text-sm font-bold">
                      <span>⭐</span>
                      <span>{destination.popularityScore}</span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-sky-500 transition-colors">
                      {destination.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                      {destination.description}
                    </p>

                    {/* Meta */}
                    <div className="flex flex-wrap gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <span>📍</span>
                        <span>{destination.country}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <span>💰</span>
                        <span>฿{destination.averageBudget.min.toLocaleString()}</span>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
