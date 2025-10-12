/**
 * Quiz Matching Algorithm
 * Matches user quiz answers with destinations based on multiple factors
 */

import type { Destination } from "@/src/data/master/destinations.master";
import type { QuizAnswers } from "@/src/data/quiz/tripQuiz";

export interface DestinationMatch {
  destination: Destination;
  score: number; // 0-100
  matchPercentage: number;
  reasons: string[]; // Why this destination matches
  highlights: string[]; // Recommended activities
}

/**
 * Calculate match score between quiz answers and a destination
 */
export function calculateMatchScore(
  destination: Destination,
  answers: QuizAnswers
): DestinationMatch {
  let totalScore = 0;
  const maxScore = 100;
  const reasons: string[] = [];
  const highlights: string[] = [];

  // 1. Budget Match (30 points)
  const budgetScore = calculateBudgetScore(destination, answers.budget);
  totalScore += budgetScore;
  if (budgetScore >= 25) {
    reasons.push("งบประมาณเหมาะสม");
  } else if (budgetScore >= 15) {
    reasons.push("งบพอดี");
  }

  // 2. Type Match (25 points)
  const typeScore = calculateTypeScore(destination, answers.types);
  totalScore += typeScore;
  if (typeScore >= 20) {
    const matchedTypes = answers.types.filter((type) =>
      destination.tags.includes(type)
    );
    if (matchedTypes.length > 0) {
      reasons.push(`เหมาะกับคนชอบ${getTypeLabel(matchedTypes[0])}`);
    }
  }

  // 3. Activity Match (25 points)
  const activityScore = calculateActivityScore(destination, answers.activities);
  totalScore += activityScore;
  if (activityScore >= 15) {
    // Add recommended activities
    destination.highlights.slice(0, 3).forEach((h) => highlights.push(h));
  }

  // 4. Travel Companion Match (10 points)
  const companionScore = calculateCompanionScore(
    destination,
    answers.travelWith
  );
  totalScore += companionScore;
  if (companionScore >= 8) {
    reasons.push(getCompanionReason(answers.travelWith));
  }

  // 5. Duration Match (10 points)
  const durationScore = calculateDurationScore(destination, answers.duration);
  totalScore += durationScore;

  // Bonus: High popularity (up to 5 points)
  if (destination.popularityScore >= 90) {
    totalScore += 5;
    reasons.push("จุดหมายยอดนิยม");
  } else if (destination.popularityScore >= 80) {
    totalScore += 3;
  }

  const matchPercentage = Math.min(Math.round((totalScore / maxScore) * 100), 100);

  return {
    destination,
    score: totalScore,
    matchPercentage,
    reasons,
    highlights,
  };
}

/**
 * Budget Match Score (0-30 points)
 */
function calculateBudgetScore(destination: Destination, budget: number): number {
  const avgCost = (destination.averageBudget.min + destination.averageBudget.max) / 2;
  const diff = Math.abs(budget - avgCost);
  const percentDiff = diff / budget;

  if (avgCost <= budget) {
    // Within budget
    if (percentDiff <= 0.1) return 30; // Perfect match
    if (percentDiff <= 0.2) return 25;
    if (percentDiff <= 0.3) return 20;
    if (percentDiff <= 0.5) return 15;
    return 10;
  } else {
    // Over budget
    if (percentDiff <= 0.1) return 20; // Slightly over
    if (percentDiff <= 0.2) return 10;
    return 5;
  }
}

/**
 * Type Match Score (0-25 points)
 */
function calculateTypeScore(destination: Destination, types: string[]): number {
  let score = 0;
  const matchCount = types.filter((type) => destination.tags.includes(type)).length;

  if (matchCount >= 3) score = 25;
  else if (matchCount === 2) score = 20;
  else if (matchCount === 1) score = 10;

  return score;
}

/**
 * Activity Match Score (0-25 points)
 */
function calculateActivityScore(
  destination: Destination,
  activities: string[]
): number {
  let score = 0;

  activities.forEach((activity) => {
    switch (activity) {
      case "relax":
        if (
          destination.tags.includes("spa") ||
          destination.tags.includes("beach") ||
          destination.tags.includes("luxury")
        ) {
          score += 8;
        }
        break;
      case "adventure":
        if (
          destination.tags.includes("adventure") ||
          destination.tags.includes("diving") ||
          destination.tags.includes("mountain")
        ) {
          score += 8;
        }
        break;
      case "food":
        if (
          destination.tags.includes("food") ||
          destination.tags.includes("city")
        ) {
          score += 8;
        }
        break;
      case "photo":
        if (
          destination.tags.includes("scenic") ||
          destination.tags.includes("culture") ||
          destination.tags.includes("temple")
        ) {
          score += 8;
        }
        break;
    }
  });

  return Math.min(score, 25);
}

/**
 * Companion Match Score (0-10 points)
 */
function calculateCompanionScore(
  destination: Destination,
  companion: string
): number {
  const bestFor = destination.bestFor || [];
  
  if (bestFor.includes(companion)) return 10;
  
  switch (companion) {
    case "honeymoon":
      if (destination.tags.includes("romantic") || destination.tags.includes("luxury")) {
        return 7;
      }
      break;
    case "family":
      if (destination.tags.includes("family") || destination.tags.includes("safe")) {
        return 7;
      }
      break;
    case "friends":
      if (destination.tags.includes("adventure") || destination.tags.includes("nightlife")) {
        return 7;
      }
      break;
    case "solo":
      if (destination.tags.includes("safe") || destination.tags.includes("culture")) {
        return 7;
      }
      break;
  }
  
  return 3;
}

/**
 * Duration Match Score (0-10 points)
 */
function calculateDurationScore(destination: Destination, duration: number): number {
  // Longer trips = better for international destinations
  // Shorter trips = better for domestic destinations
  
  if (destination.country !== "ประเทศไทย") {
    // International
    if (duration >= 5) return 10;
    if (duration >= 3) return 7;
    return 4;
  } else {
    // Domestic Thailand
    if (duration <= 4) return 10;
    if (duration <= 7) return 8;
    return 6;
  }
}

/**
 * Get top matching destinations
 */
export function getTopMatches(
  destinations: Destination[],
  answers: QuizAnswers,
  limit: number = 5
): DestinationMatch[] {
  const matches = destinations
    .map((dest) => calculateMatchScore(dest, answers))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return matches;
}

/**
 * Helper: Get type label in Thai
 */
function getTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    beach: "ทะเล",
    mountain: "ภูเขา",
    city: "เมือง",
    culture: "วัฒนธรรม",
  };
  return labels[type] || type;
}

/**
 * Helper: Get companion reason in Thai
 */
function getCompanionReason(companion: string): string {
  const reasons: Record<string, string> = {
    honeymoon: "เหมาะกับคู่รัก โรแมนติก",
    family: "เหมาะกับครอบครัว ปลอดภัย",
    friends: "เหมาะไปกับเพื่อนๆ สนุกสนาน",
    solo: "เหมาะเดินทางคนเดียว",
  };
  return reasons[companion] || "";
}
