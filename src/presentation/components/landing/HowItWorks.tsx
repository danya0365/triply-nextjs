"use client";

/**
 * How It Works Component
 * Explains the platform's process to users
 */
export function HowItWorks() {
  const steps = [
    {
      number: 1,
      icon: "🔍",
      title: "ค้นหาและสำรวจ",
      description: "ค้นหาที่พักและจุดหมายที่เหมาะสมกับคุณจากหลากหลายตัวเลือก",
    },
    {
      number: 2,
      icon: "📋",
      title: "วางแผนทริป",
      description: "สร้างแผนการเดินทางที่สมบูรณ์แบบพร้อมกิจกรรมและงบประมาณ",
    },
    {
      number: 3,
      icon: "💳",
      title: "จองและรับรางวัล",
      description: "จองที่พักและรับคะแนนสะสมสำหรับทุกการทำธุรกรรม",
    },
    {
      number: 4,
      icon: "✈️",
      title: "เดินทางและแชร์",
      description: "เดินทางและแบ่งปันประสบการณ์เพื่อรับรางวัลเพิ่มเติม",
    },
  ];

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            ใช้งานง่ายเพียง 4 ขั้นตอน
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            เริ่มต้นการเดินทางของคุณกับ Triply
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative text-center group"
            >
              {/* Connector Line (hidden on last item) */}
              {step.number < 4 && (
                <div className="hidden lg:block absolute top-16 left-1/2 w-full h-0.5 bg-gradient-to-r from-sky-300 to-violet-300 opacity-30" />
              )}

              {/* Icon Circle */}
              <div className="relative inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-sky-300 to-violet-300 rounded-full mb-6 group-hover:scale-110 transition-transform">
                <div className="flex items-center justify-center w-28 h-28 bg-white dark:bg-gray-800 rounded-full">
                  <span className="text-5xl">{step.icon}</span>
                </div>
                {/* Step Number */}
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-violet-400 text-white font-bold rounded-full flex items-center justify-center text-lg">
                  {step.number}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
