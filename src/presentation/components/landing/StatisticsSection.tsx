"use client";

import { Statistics } from "../../presenters/landing/LandingPresenter";

interface StatisticsSectionProps {
  statistics: Statistics;
}

export function StatisticsSection({ statistics }: StatisticsSectionProps) {
  const stats = [
    { value: statistics.totalProperties.toLocaleString(), label: "ที่พักทั้งหมด", icon: "🏨", suffix: "+" },
    { value: statistics.destinations.toLocaleString(), label: "จุดหมายปลายทาง", icon: "🗺️", suffix: "+" },
    { value: statistics.happyTravelers.toLocaleString(), label: "นักเดินทางที่พึงพอใจ", icon: "😊", suffix: "+" },
    { value: statistics.averageRating.toFixed(1), label: "คะแนนเฉลี่ย", icon: "⭐", suffix: "/5" },
  ];

  return (
    <section className="py-16 px-4 bg-white dark:bg-gray-800">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            เชื่อถือได้โดยนักเดินทางนับพัน
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            ตัวเลขที่พูดแทนคุณภาพของเรา
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent mb-2">
                {stat.value}<span className="text-2xl">{stat.suffix}</span>
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
