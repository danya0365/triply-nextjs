"use client";

import Link from "next/link";
import type { Destination } from "@/src/data/master/destinations.master";

interface SeasonalGuideProps {
  destinations: Destination[];
  currentMonth?: string;
}

export function SeasonalGuide({
  destinations,
  currentMonth = getCurrentMonth(),
}: SeasonalGuideProps) {
  // Filter destinations good for current month
  const goodDestinations = destinations.filter((dest) =>
    dest.seasonality.best.some((month) =>
      month.toLowerCase().includes(currentMonth.toLowerCase())
    )
  );

  // Filter destinations to avoid
  const avoidDestinations = destinations.filter((dest) =>
    dest.seasonality.avoid.some((month) =>
      month.toLowerCase().includes(currentMonth.toLowerCase())
    )
  );

  // Sort by popularity
  const topGood = [...goodDestinations]
    .sort((a, b) => b.popularityScore - a.popularityScore)
    .slice(0, 8);

  const topAvoid = [...avoidDestinations].slice(0, 4);

  return (
    <section className="mb-12">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          📅 {getMonthNameThai(currentMonth)} นี้ ไปไหนดี?
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          แนะนำจุดหมายที่เหมาะสมกับช่วงเวลานี้
        </p>
      </div>

      {/* Good Destinations */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-4 py-2 rounded-full font-bold">
            ✅ เหมาะสุดๆ ({topGood.length} จุดหมาย)
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {topGood.map((destination) => (
            <Link
              key={destination.id}
              href={`/destinations/${destination.slug}`}
              className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden border-2 border-transparent hover:border-green-400"
            >
              {/* Image */}
              <div className="relative h-40 overflow-hidden">
                <div className="absolute top-2 right-2 z-10 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
                  ช่วงนี้ดี!
                </div>
                {destination.coverImage ? (
                  <img
                    src={destination.coverImage}
                    alt={destination.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white text-4xl">
                    {getDestinationEmoji(destination.tags[0])}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="font-bold text-gray-900 dark:text-white mb-1 group-hover:text-green-600 dark:group-hover:text-green-400">
                  {destination.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {getWhyGood(destination, currentMonth)}
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
                  <span>💰</span>
                  <span>
                    {destination.averageBudget.min.toLocaleString()}-
                    {destination.averageBudget.max.toLocaleString()}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Avoid Destinations */}
      {topAvoid.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 px-4 py-2 rounded-full font-bold">
              ⚠️ ควรหลีกเลี่ยง ({topAvoid.length} จุดหมาย)
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {topAvoid.map((destination) => (
              <div
                key={destination.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 opacity-60"
              >
                <div className="flex items-start gap-3 mb-2">
                  <div className="text-2xl">
                    {getDestinationEmoji(destination.tags[0])}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                      {destination.name}
                    </h3>
                    <p className="text-sm text-orange-600 dark:text-orange-400">
                      {getWhyAvoid(destination, currentMonth)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
            💡 <strong>คำแนะนำ:</strong> จุดหมายเหล่านี้อาจมีฝนตก
            อากาศร้อนเกินไป หรือเป็นช่วง off-season ควรหลีกเลี่ยงหรือเตรียมตัวให้ดี
          </div>
        </div>
      )}
    </section>
  );
}

// Helper Functions
function getCurrentMonth(): string {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const now = new Date();
  return months[now.getMonth()];
}

function getMonthNameThai(month: string): string {
  const monthMap: Record<string, string> = {
    January: "มกราคม",
    February: "กุมภาพันธ์",
    March: "มีนาคม",
    April: "เมษายน",
    May: "พฤษภาคม",
    June: "มิถุนายน",
    July: "กรกฎาคม",
    August: "สิงหาคม",
    September: "กันยายน",
    October: "ตุลาคม",
    November: "พฤศจิกายน",
    December: "ธันวาคม",
  };
  return monthMap[month] || month;
}

function getWhyGood(destination: Destination, month: string): string {
  const reasons: Record<string, string[]> = {
    beach: ["ทะเลสวย น้ำใส", "อากาศดี เหมาะเล่นน้ำ"],
    mountain: ["อากาศเย็นสบาย", "วิวหมอกสวย"],
    city: ["สภาพอากาศดี", "เหมาะเดิน ช้อป"],
    island: ["ทะเลสวยที่สุด", "เหมาะดำน้ำ"],
  };

  const tag = destination.tags[0];
  const tagReasons = reasons[tag] || ["ช่วงเวลาที่ดีที่สุด"];
  return tagReasons[Math.floor(Math.random() * tagReasons.length)];
}

function getWhyAvoid(destination: Destination, month: string): string {
  const reasons = [
    "ฝนตกบ่อย",
    "อากาศร้อนมาก",
    "ทะเลไม่สวย",
    "ลมแรง คลื่นสูง",
    "นักท่องเที่ยวน้อย ร้านปิดเยอะ",
  ];
  return reasons[Math.floor(Math.random() * reasons.length)];
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
