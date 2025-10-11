"use client";

import { useState } from "react";

/**
 * Hero Section Component
 * Main hero banner with search functionality
 */
export function HeroSection() {
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);

  const handleSearch = () => {
    // TODO: Implement search functionality
    console.log("Search:", { destination, checkIn, checkOut, guests });
  };

  return (
    <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-sky-300 to-violet-300">
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Heading */}
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
          Plan Your Dream Trip
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-8">
          Earn Rewards Along the Way
        </p>

        {/* Search Bar */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Destination */}
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                ปลายทาง
              </label>
              <input
                type="text"
                placeholder="ค้นหาจุดหมาย..."
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-300 focus:border-transparent"
              />
            </div>

            {/* Check-in */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                วันเช็คอิน
              </label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-300 focus:border-transparent"
              />
            </div>

            {/* Check-out */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                วันเช็คเอาท์
              </label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-300 focus:border-transparent"
              />
            </div>

            {/* Guests */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                จำนวนผู้เข้าพัก
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-300 focus:border-transparent"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <option key={num} value={num}>
                    {num} ท่าน
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="mt-4 w-full md:w-auto px-8 py-3 bg-gradient-to-r from-sky-300 to-violet-300 text-white font-semibold rounded-lg hover:from-sky-400 hover:to-violet-400 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            ค้นหาที่พัก
          </button>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 flex gap-4 justify-center">
          <button className="px-6 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors">
            วางแผนทริป
          </button>
          <button className="px-6 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors">
            ดูภารกิจ
          </button>
        </div>
      </div>
    </section>
  );
}
