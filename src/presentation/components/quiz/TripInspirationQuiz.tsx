"use client";

import { useState, useEffect } from "react";
import { TRIP_QUIZ_QUESTIONS, type QuizAnswers } from "@/src/data/quiz/tripQuiz";
import { getTopMatches, type DestinationMatch } from "@/src/utils/quizMatcher";
import type { Destination } from "@/src/data/master/destinations.master";
import Link from "next/link";
import {
  saveQuizResult,
  shareToSocial,
  copyShareLink,
  toggleSavedDestination,
  type SavedQuizResult,
} from "@/src/utils/quizStorage";

interface TripInspirationQuizProps {
  destinations: Destination[];
}

export function TripInspirationQuiz({ destinations }: TripInspirationQuizProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>({
    types: [],
    activities: [],
  });
  const [results, setResults] = useState<DestinationMatch[] | null>(null);
  const [isStarted, setIsStarted] = useState(false);
  const [savedResult, setSavedResult] = useState<SavedQuizResult | null>(null);
  const [savedDestinations, setSavedDestinations] = useState<Set<string>>(new Set());
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const currentQuestion = TRIP_QUIZ_QUESTIONS[currentStep];
  const totalSteps = TRIP_QUIZ_QUESTIONS.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleStart = () => {
    setIsStarted(true);
    setCurrentStep(0);
    setAnswers({ types: [], activities: [] });
    setResults(null);
  };

  const handleAnswer = (questionId: string, value: string | number) => {
    const newAnswers = { ...answers };

    switch (questionId) {
      case "budget":
        newAnswers.budget = value as number;
        break;
      case "type":
        // Multiple select
        const currentTypes = newAnswers.types || [];
        const typeValue = value as string;
        if (currentTypes.includes(typeValue)) {
          newAnswers.types = currentTypes.filter((t) => t !== typeValue);
        } else {
          newAnswers.types = [...currentTypes, typeValue];
        }
        return setAnswers(newAnswers); // Don't auto-advance for multi-select
      case "companion":
        newAnswers.travelWith = value as string;
        break;
      case "activities":
        // Multiple select
        const currentActivities = newAnswers.activities || [];
        const activityValue = value as string;
        if (currentActivities.includes(activityValue)) {
          newAnswers.activities = currentActivities.filter((a) => a !== activityValue);
        } else {
          newAnswers.activities = [...currentActivities, activityValue];
        }
        return setAnswers(newAnswers); // Don't auto-advance for multi-select
      case "duration":
        newAnswers.duration = value as number;
        break;
    }

    setAnswers(newAnswers);

    // Auto-advance for single-select questions
    if (currentStep < totalSteps - 1) {
      setTimeout(() => setCurrentStep(currentStep + 1), 300);
    } else {
      // Last question - show results
      setTimeout(() => {
        const matches = getTopMatches(destinations, newAnswers as QuizAnswers, 5);
        setResults(matches);
        
        // Save result to localStorage
        const saved = saveQuizResult(newAnswers as QuizAnswers, matches);
        setSavedResult(saved);
      }, 300);
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate results
      const matches = getTopMatches(destinations, answers as QuizAnswers, 5);
      setResults(matches);
      
      // Save result to localStorage
      const saved = saveQuizResult(answers as QuizAnswers, matches);
      setSavedResult(saved);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRestart = () => {
    setIsStarted(false);
    setCurrentStep(0);
    setAnswers({ types: [], activities: [] });
    setResults(null);
    setSavedResult(null);
    setSavedDestinations(new Set());
    setShowShareMenu(false);
    setCopySuccess(false);
  };

  const handleToggleSave = (destinationId: string) => {
    if (!savedResult) return;

    toggleSavedDestination(savedResult.id, destinationId);
    
    setSavedDestinations(prev => {
      const newSet = new Set(prev);
      if (newSet.has(destinationId)) {
        newSet.delete(destinationId);
      } else {
        newSet.add(destinationId);
      }
      return newSet;
    });
  };

  const handleShare = async (platform: "facebook" | "twitter" | "line") => {
    if (!savedResult) return;
    shareToSocial(platform, savedResult.id);
    setShowShareMenu(false);
  };

  const handleCopyLink = async () => {
    if (!savedResult) return;
    const success = await copyShareLink(savedResult.id);
    if (success) {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  // Load saved destinations on mount
  useEffect(() => {
    if (savedResult) {
      const saved = new Set(savedResult.savedDestinations || []);
      setSavedDestinations(saved);
    }
  }, [savedResult]);

  const isMultiSelect = currentQuestion?.id === "type" || currentQuestion?.id === "activities";
  const canProceed = isMultiSelect
    ? (currentQuestion.id === "type" && (answers.types?.length || 0) > 0) ||
      (currentQuestion.id === "activities" && (answers.activities?.length || 0) > 0)
    : true;

  // Start Screen
  if (!isStarted) {
    return (
      <section className="mb-12">
        <div className="bg-gradient-to-br from-violet-50 via-sky-50 to-emerald-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-2xl p-8 md:p-12 shadow-xl">
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-6xl mb-6 animate-bounce">🧭</div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              ไม่รู้จะไปไหนดี?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              ตอบคำถามแค่ 5 ข้อ เราจะหาจุดหมายที่ใช่สำหรับคุณ
            </p>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
              {["💰", "🏖️", "👨‍👩‍👧", "🤿", "📅"].map((icon, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-700 rounded-xl p-4 shadow-md"
                >
                  <div className="text-3xl mb-2">{icon}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {["งบประมาณ", "บรรยากาศ", "ไปกับใคร", "กิจกรรม", "จำนวนวัน"][index]}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleStart}
              className="bg-gradient-to-r from-sky-400 to-violet-400 text-white text-xl font-bold px-12 py-4 rounded-xl hover:shadow-2xl hover:scale-105 transition-all"
            >
              เริ่มทำแบบทดสอบ →
            </button>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
              ใช้เวลาแค่ 1 นาที
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Results Screen
  if (results) {
    return (
      <section className="mb-12">
        <div className="bg-gradient-to-br from-violet-50 via-sky-50 to-emerald-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-2xl p-8 shadow-xl">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4 animate-bounce">🎉</div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              เราหาจุดหมายที่เหมาะกับคุณแล้ว!
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              จาก {destinations.length} จุดหมาย เราเลือกมาแล้ว {results.length} ที่ที่เหมาะสุด
            </p>
          </div>

          {/* Share & Action Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <div className="relative">
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="px-6 py-3 bg-gradient-to-r from-sky-400 to-violet-400 text-white font-bold rounded-xl hover:shadow-lg transition-all flex items-center gap-2"
              >
                <span>📤</span>
                <span>แชร์ผลลัพธ์</span>
              </button>

              {/* Share Menu Dropdown */}
              {showShareMenu && (
                <div className="absolute top-full mt-2 left-0 bg-white dark:bg-gray-700 rounded-xl shadow-2xl p-4 z-10 min-w-[200px]">
                  <div className="space-y-2">
                    <button
                      onClick={() => handleShare("facebook")}
                      className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all flex items-center gap-2"
                    >
                      <span>📘</span>
                      <span>Facebook</span>
                    </button>
                    <button
                      onClick={() => handleShare("twitter")}
                      className="w-full px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-all flex items-center gap-2"
                    >
                      <span>🐦</span>
                      <span>Twitter</span>
                    </button>
                    <button
                      onClick={() => handleShare("line")}
                      className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all flex items-center gap-2"
                    >
                      <span>💬</span>
                      <span>LINE</span>
                    </button>
                    <button
                      onClick={handleCopyLink}
                      className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all flex items-center gap-2"
                    >
                      <span>{copySuccess ? "✓" : "🔗"}</span>
                      <span>{copySuccess ? "คัดลอกแล้ว!" : "คัดลอกลิงก์"}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <Link
              href={`/trip-planner?destination=${results[0]?.destination.slug}`}
              className="px-6 py-3 bg-emerald-500 text-white font-bold rounded-xl hover:shadow-lg transition-all flex items-center gap-2"
            >
              <span>🗺️</span>
              <span>วางแผนทริปเลย</span>
            </Link>

            <button
              onClick={handleRestart}
              className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white font-bold rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
            >
              ทำใหม่อีกครั้ง
            </button>
          </div>

          <div className="space-y-6 mb-8">
            {results.map((match, index) => (
              <DestinationMatchCard
                key={match.destination.id}
                match={match}
                rank={index + 1}
                onToggleSave={handleToggleSave}
                isSaved={savedDestinations.has(match.destination.id)}
              />
            ))}
          </div>

          {/* Quiz Summary */}
          <div className="bg-white dark:bg-gray-700 rounded-xl p-6 border-2 border-sky-200 dark:border-sky-800">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              📊 สรุปคำตอบของคุณ
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
              <div>
                <div className="text-gray-600 dark:text-gray-400 mb-1">งบประมาณ</div>
                <div className="font-bold text-gray-900 dark:text-white">
                  ฿{answers.budget?.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-gray-600 dark:text-gray-400 mb-1">ประเภท</div>
                <div className="font-bold text-gray-900 dark:text-white">
                  {answers.types?.length || 0} แบบ
                </div>
              </div>
              <div>
                <div className="text-gray-600 dark:text-gray-400 mb-1">ไปกับ</div>
                <div className="font-bold text-gray-900 dark:text-white">
                  {answers.travelWith === "honeymoon" ? "คู่รัก" :
                   answers.travelWith === "family" ? "ครอบครัว" :
                   answers.travelWith === "friends" ? "เพื่อน" : "คนเดียว"}
                </div>
              </div>
              <div>
                <div className="text-gray-600 dark:text-gray-400 mb-1">กิจกรรม</div>
                <div className="font-bold text-gray-900 dark:text-white">
                  {answers.activities?.length || 0} แบบ
                </div>
              </div>
              <div>
                <div className="text-gray-600 dark:text-gray-400 mb-1">ระยะเวลา</div>
                <div className="font-bold text-gray-900 dark:text-white">
                  {answers.duration} วัน
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Quiz Screen
  return (
    <section className="mb-12">
      <div className="bg-gradient-to-br from-violet-50 via-sky-50 to-emerald-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-2xl p-8 shadow-xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              คำถามที่ {currentStep + 1} จาก {totalSteps}
            </span>
            <span className="text-sm font-medium text-sky-600 dark:text-sky-400">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-sky-400 to-violet-400 h-full rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <div className="mb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {currentQuestion.question}
          </h3>
          {isMultiSelect && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              (เลือกได้หลายข้อ)
            </p>
          )}
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {currentQuestion.options.map((option) => {
            const isSelected =
              currentQuestion.id === "type"
                ? answers.types?.includes(option.value as string)
                : currentQuestion.id === "activities"
                ? answers.activities?.includes(option.value as string)
                : answers[currentQuestion.id as keyof QuizAnswers] === option.value;

            return (
              <button
                key={option.id}
                onClick={() => handleAnswer(currentQuestion.id, option.value)}
                className={`p-6 rounded-xl border-2 text-left transition-all hover:scale-105 ${
                  isSelected
                    ? "border-sky-400 bg-sky-50 dark:bg-sky-900/30 shadow-lg"
                    : "border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 hover:border-sky-300"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{option.icon}</div>
                  <div className="flex-1">
                    <div className="font-bold text-lg text-gray-900 dark:text-white mb-1">
                      {option.label}
                    </div>
                    {option.description && (
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {option.description}
                      </div>
                    )}
                  </div>
                  {isSelected && (
                    <div className="text-sky-500 text-2xl">✓</div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="px-6 py-3 rounded-xl font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← ย้อนกลับ
          </button>

          {isMultiSelect && (
            <button
              onClick={handleNext}
              disabled={!canProceed}
              className="bg-gradient-to-r from-sky-400 to-violet-400 text-white font-bold px-8 py-3 rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentStep === totalSteps - 1 ? "ดูผลลัพธ์" : "ถัดไป"} →
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

// Destination Match Card Component
interface DestinationMatchCardProps {
  match: DestinationMatch;
  rank: number;
  onToggleSave?: (destinationId: string) => void;
  isSaved?: boolean;
}

function DestinationMatchCard({ match, rank, onToggleSave, isSaved }: DestinationMatchCardProps) {
  const { destination, matchPercentage, reasons, highlights } = match;
  const isTopMatch = rank === 1;

  return (
    <div
      className={`relative bg-white dark:bg-gray-700 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all ${
        isTopMatch ? "border-4 border-yellow-400" : "border-2 border-gray-200 dark:border-gray-600"
      }`}
    >
      {isTopMatch && (
        <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-center font-bold py-2 px-4 rounded-lg mb-4">
          🏆 แนะนำสำหรับคุณ!
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left: Rank & Match */}
        <div className="flex-shrink-0 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-sky-400 to-violet-400 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg mb-2">
            {rank}
          </div>
          <div className="text-3xl font-bold text-sky-600 dark:text-sky-400">
            {matchPercentage}%
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">เหมาะสม</div>
        </div>

        {/* Right: Destination Info */}
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {destination.name}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-3">
            {destination.description.slice(0, 150)}...
          </p>

          {/* Reasons */}
          <div className="flex flex-wrap gap-2 mb-3">
            {reasons.map((reason, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm rounded-full"
              >
                ✓ {reason}
              </span>
            ))}
          </div>

          {/* Highlights */}
          {highlights.length > 0 && (
            <div className="mb-3">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                กิจกรรมแนะนำ:
              </div>
              <div className="flex flex-wrap gap-2">
                {highlights.map((highlight, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm rounded-full"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Budget */}
          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <span>💰</span>
              <span>
                ฿{destination.averageBudget.min.toLocaleString()}-
                {destination.averageBudget.max.toLocaleString()}
              </span>
            </span>
            <span className="flex items-center gap-1">
              <span>⭐</span>
              <span>Popularity: {destination.popularityScore}</span>
            </span>
          </div>
        </div>

        {/* CTA */}
        <div className="flex-shrink-0 flex flex-col gap-2">
          <Link
            href={`/destinations/${destination.slug}`}
            className="bg-gradient-to-r from-sky-400 to-violet-400 text-white font-bold px-6 py-3 rounded-xl hover:shadow-lg transition-all text-center"
          >
            เริ่มวางแผน →
          </Link>

          {onToggleSave && (
            <button
              onClick={(e) => {
                e.preventDefault();
                onToggleSave(destination.id);
              }}
              className={`px-6 py-2 rounded-xl font-bold transition-all ${
                isSaved
                  ? "bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400"
                  : "bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-pink-50 dark:hover:bg-pink-900/20"
              }`}
            >
              {isSaved ? "❤️ บันทึกแล้ว" : "🤍 บันทึก"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
