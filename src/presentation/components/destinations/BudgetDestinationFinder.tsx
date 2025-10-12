"use client";

import { useState } from "react";
import Link from "next/link";
import type { Destination } from "@/src/data/master/destinations.master";

interface BudgetDestinationFinderProps {
  destinations: Destination[];
}

export function BudgetDestinationFinder({
  destinations,
}: BudgetDestinationFinderProps) {
  const [budget, setBudget] = useState<number>(10000);
  const [days, setDays] = useState<number>(3);
  const [showResults, setShowResults] = useState(false);

  // Filter destinations based on budget
  const affordableDestinations = destinations.filter((dest) => {
    const estimatedCost = (dest.averageBudget.min + dest.averageBudget.max) / 2;
    const totalCost = estimatedCost * days;
    return totalCost <= budget;
  });

  // Sort by value (lower average cost = better value)
  const sortedByValue = [...affordableDestinations].sort((a, b) => {
    const avgA = (a.averageBudget.min + a.averageBudget.max) / 2;
    const avgB = (b.averageBudget.min + b.averageBudget.max) / 2;
    return avgA - avgB;
  });

  const handleSearch = () => {
    setShowResults(true);
  };

  return (
    <section className="mb-12">
      <div className="bg-gradient-to-br from-sky-50 to-violet-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          💰 งบฉันพอไปไหนได้บ้าง?
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          ใส่งบประมาณและจำนวนวัน เราจะหาจุดหมายที่เหมาะสมให้คุณ
        </p>

        {/* Input Form */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Budget Input */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              งบประมาณ (บาท)
            </label>
            <input
              type="range"
              min="1000"
              max="50000"
              step="1000"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-sky-500"
            />
            <div className="mt-2 text-2xl font-bold text-sky-600 dark:text-sky-400">
              ฿{budget.toLocaleString()}
            </div>
          </div>

          {/* Days Input */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              จำนวนวัน
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5, 7].map((day) => (
                <button
                  key={day}
                  onClick={() => setDays(day)}
                  className={`flex-1 px-3 py-2 rounded-lg font-medium transition-all ${
                    days === day
                      ? "bg-gradient-to-r from-sky-400 to-violet-400 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
            <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              เลือก: {days} วัน
            </div>
          </div>

          {/* Search Button */}
          <div className="flex items-end">
            <button
              onClick={handleSearch}
              className="w-full bg-gradient-to-r from-sky-400 to-violet-400 text-white font-bold py-4 rounded-xl hover:shadow-lg transition-all"
            >
              🔍 ค้นหาเลย!
            </button>
          </div>
        </div>

        {/* Results */}
        {showResults && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                พบ {sortedByValue.length} จุดหมายที่เหมาะสม
              </h3>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                งบ ฿{budget.toLocaleString()} | {days} วัน
              </div>
            </div>

            {sortedByValue.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">😢</div>
                <p className="text-gray-600 dark:text-gray-400">
                  ไม่พบจุดหมายที่เข้ากับงบ ลองเพิ่มงบประมาณหรือลดจำนวนวัน
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {sortedByValue.slice(0, 8).map((destination) => {
                  const avgCost =
                    (destination.averageBudget.min +
                      destination.averageBudget.max) /
                    2;
                  const totalCost = avgCost * days;
                  const savings = budget - totalCost;

                  return (
                    <Link
                      key={destination.id}
                      href={`/destinations/${destination.slug}`}
                      className="group bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:border-sky-400 dark:hover:border-sky-400 hover:shadow-lg transition-all"
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div className="text-3xl">
                          {getDestinationEmoji(destination.tags[0])}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-gray-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 truncate">
                            {destination.name}
                          </h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {destination.region}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">
                            ค่าใช้จ่าย:
                          </span>
                          <span className="font-bold text-gray-900 dark:text-white">
                            ฿{totalCost.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">
                            เหลือ:
                          </span>
                          <span className="font-bold text-green-600 dark:text-green-400">
                            ฿{savings.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {/* Value Badge */}
                      {savings > budget * 0.3 && (
                        <div className="mt-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold px-2 py-1 rounded-full text-center">
                          💎 คุ้มค่ามาก!
                        </div>
                      )}
                    </Link>
                  );
                })}
              </div>
            )}

            {sortedByValue.length > 8 && (
              <div className="text-center mt-6">
                <Link
                  href={`/destinations?budget=${budget}&days=${days}`}
                  className="inline-block text-sky-600 dark:text-sky-400 hover:underline font-medium"
                >
                  ดูทั้งหมด {sortedByValue.length} จุดหมาย →
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
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
