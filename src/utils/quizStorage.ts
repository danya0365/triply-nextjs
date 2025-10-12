/**
 * Quiz Storage Utilities
 * Handle saving and retrieving quiz results from localStorage
 */

import type { QuizAnswers } from "@/src/data/quiz/tripQuiz";
import type { DestinationMatch } from "./quizMatcher";

export interface SavedQuizResult {
  id: string;
  timestamp: number;
  answers: QuizAnswers;
  results: DestinationMatch[];
  savedDestinations?: string[]; // Destination IDs
}

const STORAGE_KEY = "triply_quiz_results";
const MAX_SAVED_RESULTS = 10;

/**
 * Save quiz result to localStorage
 */
export function saveQuizResult(
  answers: QuizAnswers,
  results: DestinationMatch[]
): SavedQuizResult {
  const result: SavedQuizResult = {
    id: generateId(),
    timestamp: Date.now(),
    answers,
    results,
    savedDestinations: [],
  };

  const existing = getAllQuizResults();
  const updated = [result, ...existing].slice(0, MAX_SAVED_RESULTS);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error("Failed to save quiz result:", error);
  }

  return result;
}

/**
 * Get all saved quiz results
 */
export function getAllQuizResults(): SavedQuizResult[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Failed to load quiz results:", error);
    return [];
  }
}

/**
 * Get latest quiz result
 */
export function getLatestQuizResult(): SavedQuizResult | null {
  const results = getAllQuizResults();
  return results.length > 0 ? results[0] : null;
}

/**
 * Get quiz result by ID
 */
export function getQuizResultById(id: string): SavedQuizResult | null {
  const results = getAllQuizResults();
  return results.find((r) => r.id === id) || null;
}

/**
 * Delete quiz result
 */
export function deleteQuizResult(id: string): boolean {
  try {
    const results = getAllQuizResults();
    const filtered = results.filter((r) => r.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error("Failed to delete quiz result:", error);
    return false;
  }
}

/**
 * Clear all quiz results
 */
export function clearAllQuizResults(): boolean {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error("Failed to clear quiz results:", error);
    return false;
  }
}

/**
 * Toggle saved destination
 */
export function toggleSavedDestination(
  resultId: string,
  destinationId: string
): boolean {
  try {
    const results = getAllQuizResults();
    const result = results.find((r) => r.id === resultId);

    if (!result) return false;

    if (!result.savedDestinations) {
      result.savedDestinations = [];
    }

    const index = result.savedDestinations.indexOf(destinationId);
    if (index > -1) {
      result.savedDestinations.splice(index, 1);
    } else {
      result.savedDestinations.push(destinationId);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(results));
    return true;
  } catch (error) {
    console.error("Failed to toggle saved destination:", error);
    return false;
  }
}

/**
 * Check if destination is saved
 */
export function isDestinationSaved(
  resultId: string,
  destinationId: string
): boolean {
  const result = getQuizResultById(resultId);
  return result?.savedDestinations?.includes(destinationId) || false;
}

/**
 * Generate share URL
 */
export function generateShareUrl(resultId: string): string {
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
  return `${baseUrl}/destinations?quiz=true&result=${resultId}`;
}

/**
 * Generate share text
 */
export function generateShareText(result: SavedQuizResult): string {
  const topDestination = result.results[0]?.destination;
  if (!topDestination) return "ค้นพบจุดหมายในฝันของคุณกับ Triply!";

  return `ฉันทำแบบทดสอบและพบว่าจุดหมายที่เหมาะกับฉันคือ ${topDestination.name}! 
มาลองทำแบบทดสอบดูสิว่าจุดหมายไหนเหมาะกับคุณ 🧭✨`;
}

/**
 * Share to social media
 */
export function shareToSocial(
  platform: "facebook" | "twitter" | "line",
  resultId: string
): void {
  const result = getQuizResultById(resultId);
  if (!result) return;

  const url = generateShareUrl(resultId);
  const text = generateShareText(result);
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(text);

  let shareUrl = "";

  switch (platform) {
    case "facebook":
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
      break;
    case "twitter":
      shareUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
      break;
    case "line":
      shareUrl = `https://social-plugins.line.me/lineit/share?url=${encodedUrl}`;
      break;
  }

  if (shareUrl) {
    window.open(shareUrl, "_blank", "width=600,height=400");
  }
}

/**
 * Copy share link to clipboard
 */
export async function copyShareLink(resultId: string): Promise<boolean> {
  const url = generateShareUrl(resultId);

  try {
    await navigator.clipboard.writeText(url);
    return true;
  } catch (error) {
    console.error("Failed to copy to clipboard:", error);
    return false;
  }
}

/**
 * Generate unique ID
 */
function generateId(): string {
  return `quiz_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Format timestamp
 */
export function formatQuizTimestamp(timestamp: number): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  // Less than 1 hour
  if (diff < 3600000) {
    const minutes = Math.floor(diff / 60000);
    return minutes === 0 ? "เมื่อสักครู่" : `${minutes} นาทีที่แล้ว`;
  }

  // Less than 24 hours
  if (diff < 86400000) {
    const hours = Math.floor(diff / 3600000);
    return `${hours} ชั่วโมงที่แล้ว`;
  }

  // Less than 7 days
  if (diff < 604800000) {
    const days = Math.floor(diff / 86400000);
    return `${days} วันที่แล้ว`;
  }

  // Format as date
  return date.toLocaleDateString("th-TH", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
