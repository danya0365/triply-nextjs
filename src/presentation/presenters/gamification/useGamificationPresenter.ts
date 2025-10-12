/**
 * Gamification Presenter Hook
 * Client-side hook for gamification dashboard
 */

"use client";

import { useState, useCallback } from "react";
import type { GamificationViewModel } from "./GamificationPresenter";
import type { Reward } from "@/src/data/mock/gamification.mock";

export function useGamificationPresenter(initialViewModel: GamificationViewModel) {
  const [viewModel] = useState<GamificationViewModel>(initialViewModel);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Tab state
  const [activeTab, setActiveTab] = useState<
    "missions" | "achievements" | "rewards" | "leaderboard"
  >("missions");

  // Filter states
  const [achievementFilter, setAchievementFilter] = useState<
    "all" | "unlocked" | "locked"
  >("all");
  const [rewardFilter, setRewardFilter] = useState<"all" | "affordable">("all");

  // Modal states
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [showRewardModal, setShowRewardModal] = useState(false);

  // Redeem reward
  const handleRedeemReward = useCallback(
    async (reward: Reward) => {
      if (viewModel.user.totalPoints < reward.pointsCost) {
        setError("คะแนนของคุณไม่เพียงพอ");
        setTimeout(() => setError(null), 3000);
        return;
      }

      try {
        // TODO: Call API to redeem reward
        console.log("Redeeming reward:", reward.id);
        setSuccess(`แลกรางวัล "${reward.name}" สำเร็จ!`);
        setTimeout(() => setSuccess(null), 3000);
        setShowRewardModal(false);
        setSelectedReward(null);
      } catch (err) {
        setError("ไม่สามารถแลกรางวัลได้");
        console.error("Error redeeming reward:", err);
      }
    },
    [viewModel.user.totalPoints]
  );

  // Open reward modal
  const openRewardModal = useCallback((reward: Reward) => {
    setSelectedReward(reward);
    setShowRewardModal(true);
  }, []);

  // Close reward modal
  const closeRewardModal = useCallback(() => {
    setShowRewardModal(false);
    setSelectedReward(null);
  }, []);

  // Filter achievements
  const filteredAchievements = viewModel.achievements.filter((achievement) => {
    if (achievementFilter === "unlocked") return achievement.unlocked;
    if (achievementFilter === "locked") return !achievement.unlocked;
    return true;
  });

  // Filter rewards
  const filteredRewards = viewModel.rewards.filter((reward) => {
    if (rewardFilter === "affordable") {
      return reward.pointsCost <= viewModel.user.totalPoints;
    }
    return true;
  });

  return {
    // State
    viewModel,
    error,
    success,
    activeTab,
    achievementFilter,
    rewardFilter,

    // Modal state
    selectedReward,
    showRewardModal,

    // Filtered data
    filteredAchievements,
    filteredRewards,

    // Actions
    setActiveTab,
    setAchievementFilter,
    setRewardFilter,
    handleRedeemReward,
    openRewardModal,
    closeRewardModal,
  };
}
