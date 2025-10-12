"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  getAllQuizResults,
  deleteQuizResult,
  formatQuizTimestamp,
  type SavedQuizResult,
} from "@/src/utils/quizStorage";

export function QuizHistory() {
  const [results, setResults] = useState<SavedQuizResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedResult, setSelectedResult] = useState<SavedQuizResult | null>(null);

  useEffect(() => {
    loadResults();
  }, []);

  const loadResults = () => {
    const saved = getAllQuizResults();
    setResults(saved);
  };

  const handleDelete = (id: string) => {
    if (confirm("ต้องการลบประวัติ Quiz นี้?")) {
      deleteQuizResult(id);
      loadResults();
      if (selectedResult?.id === id) {
        setSelectedResult(null);
      }
    }
  };

  const handleViewDetail = (result: SavedQuizResult) => {
    setSelectedResult(result);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-violet-500 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all"
      >
        <div className="flex items-center gap-2">
          <span className="text-2xl">📋</span>
          {results.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
              {results.length}
            </span>
          )}
        </div>
      </button>
    );
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(false)}
        className="fixed bottom-6 right-6 z-40 bg-gray-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all"
      >
        <span className="text-2xl">✕</span>
      </button>

      {/* History Panel */}
      <div className="fixed bottom-24 right-6 z-40 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-96 max-h-[600px] overflow-hidden animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-violet-500 to-purple-600 text-white p-6">
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <span>📋</span>
            <span>ประวัติ Quiz</span>
          </h3>
          <p className="text-white/80 text-sm mt-1">
            {results.length} ครั้งที่ทำแบบทดสอบ
          </p>
        </div>

        {/* List */}
        <div className="overflow-y-auto max-h-[500px]">
          {results.length === 0 ? (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              <div className="text-6xl mb-4">📝</div>
              <p className="font-medium">ยังไม่มีประวัติ</p>
              <p className="text-sm">ลองทำแบบทดสอบดูสิ!</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {results.map((result) => (
                <div
                  key={result.id}
                  className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <div className="font-bold text-gray-900 dark:text-white mb-1">
                        {result.results[0]?.destination.name || "ไม่มีผลลัพธ์"}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {formatQuizTimestamp(result.timestamp)}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-violet-600 dark:text-violet-400">
                        {result.results[0]?.matchPercentage || 0}%
                      </div>
                    </div>
                  </div>

                  {/* Quick Info */}
                  <div className="flex flex-wrap gap-2 mb-3 text-xs">
                    <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded">
                      💰 ฿{result.answers.budget?.toLocaleString()}
                    </span>
                    <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded">
                      📅 {result.answers.duration} วัน
                    </span>
                    <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-1 rounded">
                      🏆 {result.results.length} จุดหมาย
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleViewDetail(result)}
                      className="flex-1 bg-violet-500 text-white text-sm font-bold px-3 py-2 rounded-lg hover:bg-violet-600 transition-all"
                    >
                      ดูรายละเอียด
                    </button>
                    <button
                      onClick={() => handleDelete(result.id)}
                      className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm font-bold px-3 py-2 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-all"
                    >
                      ลบ
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedResult && (
        <QuizResultDetail
          result={selectedResult}
          onClose={() => setSelectedResult(null)}
        />
      )}
    </>
  );
}

// Quiz Result Detail Modal
interface QuizResultDetailProps {
  result: SavedQuizResult;
  onClose: () => void;
}

function QuizResultDetail({ result, onClose }: QuizResultDetailProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors"
        >
          <span className="text-2xl">×</span>
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-violet-500 to-purple-600 p-8 text-white rounded-t-2xl">
          <div className="text-sm mb-2 opacity-80">
            {formatQuizTimestamp(result.timestamp)}
          </div>
          <h2 className="text-3xl font-bold mb-2">ผลลัพธ์ Quiz</h2>
          <p className="text-white/90">
            เราหา {result.results.length} จุดหมายที่เหมาะกับคุณ
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Quiz Summary */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              📊 คำตอบของคุณ
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-gray-600 dark:text-gray-400 mb-1">งบประมาณ</div>
                <div className="font-bold text-gray-900 dark:text-white">
                  ฿{result.answers.budget?.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-gray-600 dark:text-gray-400 mb-1">ระยะเวลา</div>
                <div className="font-bold text-gray-900 dark:text-white">
                  {result.answers.duration} วัน
                </div>
              </div>
              <div>
                <div className="text-gray-600 dark:text-gray-400 mb-1">ไปกับ</div>
                <div className="font-bold text-gray-900 dark:text-white">
                  {result.answers.travelWith === "honeymoon" ? "คู่รัก" :
                   result.answers.travelWith === "family" ? "ครอบครัว" :
                   result.answers.travelWith === "friends" ? "เพื่อน" : "คนเดียว"}
                </div>
              </div>
              <div>
                <div className="text-gray-600 dark:text-gray-400 mb-1">ประเภท</div>
                <div className="font-bold text-gray-900 dark:text-white">
                  {result.answers.types?.length || 0} แบบ
                </div>
              </div>
            </div>
          </div>

          {/* Top Destinations */}
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            🏆 จุดหมายแนะนำ
          </h3>
          <div className="space-y-4">
            {result.results.map((match, index) => (
              <Link
                key={match.destination.id}
                href={`/destinations/${match.destination.slug}`}
                onClick={onClose}
                className="block bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 rounded-xl p-4 hover:shadow-lg transition-all border-2 border-violet-200 dark:border-violet-800"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl font-bold text-violet-600 dark:text-violet-400">
                      #{index + 1}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 dark:text-white">
                        {match.destination.name}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {match.destination.country}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-violet-600 dark:text-violet-400">
                      {match.matchPercentage}%
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      ความเหมาะสม
                    </div>
                  </div>
                </div>

                {/* Reasons */}
                <div className="flex flex-wrap gap-2">
                  {match.reasons.slice(0, 2).map((reason, i) => (
                    <span
                      key={i}
                      className="text-xs bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded"
                    >
                      ✓ {reason}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
