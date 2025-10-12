"use client";

import { useState } from "react";
import Link from "next/link";

/**
 * Hero Section Component - Destination Discovery Focus
 * NEW: Quiz-first approach for destination discovery
 */
export function HeroSection() {
  const [showQuizModal, setShowQuizModal] = useState(false);

  return (
    <>
      <section className="relative min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500 via-sky-400 to-emerald-400 dark:from-violet-600 dark:via-sky-500 dark:to-emerald-500">
          <div className="absolute inset-0 bg-black/30 dark:bg-black/40" />
          {/* Animated blobs */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-300/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-300/30 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center py-20">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full mb-6 animate-bounce">
            <span className="text-2xl">✨</span>
            <span className="font-medium">ไม่รู้จะไปไหนดี? เราช่วยคุณหาได้!</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            ค้นพบจุดหมายในฝัน<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-orange-300">
              ที่ใช่สำหรับคุณ
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            ตอบคำถามง่ายๆ แค่ 5 ข้อ เราจะหาจุดหมายที่เหมาะกับคุณที่สุด
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 mb-10">
            <div className="text-center">
              <div className="text-4xl font-bold text-white">50+</div>
              <div className="text-white/80 text-sm">จุดหมายยอดนิยม</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white">1 นาที</div>
              <div className="text-white/80 text-sm">ตอบคำถาม</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white">100%</div>
              <div className="text-white/80 text-sm">ฟรี ไม่มีค่าใช้จ่าย</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-12">
            {/* Main CTA - Quiz Modal */}
            <button
              onClick={() => setShowQuizModal(true)}
              className="group relative px-12 py-5 bg-white text-gray-900 font-bold text-xl rounded-2xl hover:scale-105 transition-all shadow-2xl hover:shadow-3xl"
            >
              <span className="flex items-center gap-3">
                <span className="text-3xl group-hover:rotate-12 transition-transform">🧭</span>
                <span>เริ่มค้นหาจุดหมาย</span>
              </span>
            </button>

            {/* Secondary CTA */}
            <Link
              href="/destinations"
              className="px-10 py-5 bg-white/20 backdrop-blur-sm text-white font-bold text-lg rounded-2xl hover:bg-white/30 transition-all border-2 border-white/30"
            >
              🌍 สำรวจทั้งหมด
            </Link>
          </div>

          {/* Quick Preview */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <p className="text-white/90 text-sm mb-4">คำถามที่จะถาม:</p>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {[
                  { icon: "💰", label: "งบประมาณ" },
                  { icon: "🏖️", label: "บรรยากาศ" },
                  { icon: "👨‍👩‍👧", label: "ไปกับใคร" },
                  { icon: "🤿", label: "กิจกรรม" },
                  { icon: "📅", label: "จำนวนวัน" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center"
                  >
                    <div className="text-2xl mb-1">{item.icon}</div>
                    <div className="text-white text-xs font-medium">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 items-center text-white/60 text-sm">
            <div className="flex items-center gap-2">
              <span>⭐⭐⭐⭐⭐</span>
              <span>จากผู้ใช้มากกว่า 10,000+ คน</span>
            </div>
            <div className="flex items-center gap-2">
              <span>✓</span>
              <span>ใช้งานง่าย 100%</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🔒</span>
              <span>ข้อมูลปลอดภัย</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quiz Modal */}
      {showQuizModal && (
        <QuizModal onClose={() => setShowQuizModal(false)} />
      )}
    </>
  );
}

// Quiz Modal Component
interface QuizModalProps {
  onClose: () => void;
}

function QuizModal({ onClose }: QuizModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors"
        >
          <span className="text-2xl">×</span>
        </button>

        {/* Modal Header */}
        <div className="bg-gradient-to-r from-sky-400 to-violet-400 p-8 text-center text-white rounded-t-2xl">
          <div className="text-5xl mb-4 animate-bounce">🧭</div>
          <h2 className="text-3xl font-bold mb-2">ค้นหาจุดหมายในฝัน</h2>
          <p className="text-white/90">ตอบคำถาม 5 ข้อ เราจะหาให้คุณ!</p>
        </div>

        {/* Modal Body */}
        <div className="p-8">
          <div className="space-y-6">
            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-sky-50 dark:from-blue-900/20 dark:to-sky-900/20 p-4 rounded-xl border-2 border-blue-200 dark:border-blue-800">
                <div className="text-3xl mb-2">⚡</div>
                <div className="font-bold text-gray-900 dark:text-white">ง่ายและรวดเร็ว</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">ใช้เวลาแค่ 1 นาที</div>
              </div>
              <div className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 p-4 rounded-xl border-2 border-violet-200 dark:border-violet-800">
                <div className="text-3xl mb-2">🎯</div>
                <div className="font-bold text-gray-900 dark:text-white">ตรงใจ 100%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">AI matching algorithm</div>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 p-4 rounded-xl border-2 border-emerald-200 dark:border-emerald-800">
                <div className="text-3xl mb-2">💎</div>
                <div className="font-bold text-gray-900 dark:text-white">ฟรี 100%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">ไม่มีค่าใช้จ่าย</div>
              </div>
            </div>

            {/* CTA */}
            <Link
              href="/destinations?quiz=true"
              onClick={onClose}
              className="block w-full bg-gradient-to-r from-sky-400 to-violet-400 text-white text-center font-bold text-xl py-5 rounded-xl hover:shadow-2xl hover:scale-105 transition-all"
            >
              เริ่มทำแบบทดสอบ →
            </Link>

            {/* Or Divider */}
            <div className="flex items-center gap-4">
              <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
              <span className="text-gray-500 dark:text-gray-400 text-sm">หรือ</span>
              <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
            </div>

            {/* Alternative Actions */}
            <div className="grid grid-cols-2 gap-4">
              <Link
                href="/destinations"
                onClick={onClose}
                className="block text-center px-6 py-4 border-2 border-gray-300 dark:border-gray-600 rounded-xl hover:border-sky-400 dark:hover:border-sky-400 hover:bg-sky-50 dark:hover:bg-sky-900/20 transition-all"
              >
                <div className="text-2xl mb-2">🌍</div>
                <div className="font-bold text-gray-900 dark:text-white text-sm">สำรวจทั้งหมด</div>
              </Link>
              <Link
                href="/trip-planner"
                onClick={onClose}
                className="block text-center px-6 py-4 border-2 border-gray-300 dark:border-gray-600 rounded-xl hover:border-violet-400 dark:hover:border-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-all"
              >
                <div className="text-2xl mb-2">🗺️</div>
                <div className="font-bold text-gray-900 dark:text-white text-sm">วางแผนทริป</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
