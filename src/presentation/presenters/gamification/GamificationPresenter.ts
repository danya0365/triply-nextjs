/**
 * Gamification Presenter
 * Handles business logic for gamification dashboard
 */

import {
  ACHIEVEMENTS,
  LEADERBOARD,
  getActiveMissions,
  getAvailableRewards,
  type Mission,
  type Achievement,
  type Reward,
  type LeaderboardEntry,
} from "@/src/data/mock/gamification.mock";
import { USERS } from "@/src/data/mock/users.mock";

export interface GamificationViewModel {
  user: {
    id: string;
    displayName: string;
    avatarUrl: string;
    totalPoints: number;
    level: number;
    tier: string;
    pointsToNextLevel: number;
    levelProgress: number;
  };
  missions: Mission[];
  achievements: Achievement[];
  rewards: Reward[];
  leaderboard: LeaderboardEntry[];
  stats: {
    totalMissions: number;
    completedMissions: number;
    activeMissions: number;
    totalAchievements: number;
    unlockedAchievements: number;
    totalBadges: number;
  };
}

/**
 * Presenter for Gamification Dashboard
 */
export class GamificationPresenter {
  /**
   * Get view model for gamification dashboard
   */
  async getViewModel(userId: string): Promise<GamificationViewModel> {
    // Get user data
    const user = USERS.find((u) => u.id === userId) || USERS[0];

    // Calculate level progress
    const pointsForCurrentLevel = this.getPointsForLevel(user.level);
    const pointsForNextLevel = this.getPointsForLevel(user.level + 1);
    const pointsInCurrentLevel = user.totalPoints - pointsForCurrentLevel;
    const pointsNeeded = pointsForNextLevel - pointsForCurrentLevel;
    const levelProgress = Math.min((pointsInCurrentLevel / pointsNeeded) * 100, 100);

    // Get gamification data
    const missions = getActiveMissions();
    const achievements = ACHIEVEMENTS;
    const rewards = getAvailableRewards();
    const leaderboard = LEADERBOARD;

    // Calculate stats
    const completedMissions = missions.filter((m) => m.status === "completed").length;
    const activeMissions = missions.filter((m) => m.status === "active").length;
    const unlockedAchievements = achievements.filter((a) => a.unlocked).length;

    return {
      user: {
        id: user.id,
        displayName: user.displayName,
        avatarUrl: user.avatarUrl,
        totalPoints: user.totalPoints,
        level: user.level,
        tier: this.getTierName(user.currentTier),
        pointsToNextLevel: pointsForNextLevel - user.totalPoints,
        levelProgress,
      },
      missions,
      achievements,
      rewards,
      leaderboard,
      stats: {
        totalMissions: missions.length,
        completedMissions,
        activeMissions,
        totalAchievements: achievements.length,
        unlockedAchievements,
        totalBadges: user.badges.length,
      },
    };
  }

  /**
   * Get points required for a level
   */
  private getPointsForLevel(level: number): number {
    // Progressive points system: level^2 * 500
    return Math.floor(Math.pow(level, 2) * 500);
  }

  /**
   * Get tier name in Thai
   */
  private getTierName(tier: string): string {
    const tierNames: Record<string, string> = {
      explorer: "นักสำรวจ",
      adventurer: "นักผจญภัย",
      voyager: "นักเดินทาง",
      globetrotter: "นักท่องโลก",
    };
    return tierNames[tier] || tier;
  }

  /**
   * Redeem reward
   */
  async redeemReward(userId: string, rewardId: string): Promise<boolean> {
    // TODO: Implement actual reward redemption with API
    console.log(`User ${userId} redeeming reward ${rewardId}`);
    return true;
  }

  /**
   * Complete mission
   */
  async completeMission(userId: string, missionId: string): Promise<boolean> {
    // TODO: Implement actual mission completion with API
    console.log(`User ${userId} completing mission ${missionId}`);
    return true;
  }

  /**
   * Generate metadata
   */
  async generateMetadata() {
    return {
      title: "Gamification | Triply",
      description:
        "ระบบคะแนนและรางวัล ทำภารกิจ ปลดล็อคความสำเร็จ แลกรับรางวัล และแข่งขันกับเพื่อนๆ",
      keywords: ["gamification", "รางวัล", "ภารกิจ", "ความสำเร็จ", "คะแนน"],
    };
  }
}

/**
 * Factory for creating GamificationPresenter
 */
export class GamificationPresenterFactory {
  static async createServer(): Promise<GamificationPresenter> {
    return new GamificationPresenter();
  }

  static async createClient(): Promise<GamificationPresenter> {
    return new GamificationPresenter();
  }
}
