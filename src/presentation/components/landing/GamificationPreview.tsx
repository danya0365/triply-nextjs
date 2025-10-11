"use client";

/**
 * Gamification Preview Component
 * Showcases the rewards and gamification system
 */
export function GamificationPreview() {
  const features = [
    {
      icon: "🎯",
      title: "ภารกิจรายวัน",
      description: "ทำภารกิจง่ายๆ ทุกวันเพื่อรับคะแนนสะสม",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: "🏆",
      title: "ความสำเร็จ",
      description: "ปลดล็อคความสำเร็จพิเศษและสะสมตราประทับ",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: "🎁",
      title: "รางวัลสุดพิเศษ",
      description: "แลกคะแนนเพื่อรับส่วนลดและสิทธิพิเศษ",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: "⭐",
      title: "เลเวลและตำแหน่ง",
      description: "เพิ่มเลเวลและปลดล็อคสิทธิพิเศษใหม่ๆ",
      color: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-6 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold rounded-full mb-4">
            ✨ รางวัลพิเศษ
          </div>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            รับรางวัลทุกการเดินทาง
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            ยิ่งใช้บ่อย ยิ่งได้มาก - สะสมคะแนนและปลดล็อคสิทธิพิเศษ
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Icon */}
              <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center text-3xl mb-4`}>
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-500 to-orange-500 rounded-2xl p-8 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">
            เริ่มสะสมคะแนนวันนี้!
          </h3>
          <p className="text-xl mb-6 opacity-90">
            สมัครสมาชิกและรับ 100 คะแนนฟรีทันที
          </p>
          <div className="flex gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
              สมัครสมาชิก
            </button>
            <button className="px-8 py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/30 transition-colors">
              เรียนรู้เพิ่มเติม
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
