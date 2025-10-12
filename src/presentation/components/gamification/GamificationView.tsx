"use client";

import { useGamificationPresenter } from "@/src/presentation/presenters/gamification/useGamificationPresenter";
import type { GamificationViewModel } from "@/src/presentation/presenters/gamification/GamificationPresenter";
import type { Mission, Achievement, Reward, LeaderboardEntry } from "@/src/data/mock/gamification.mock";

interface GamificationViewProps {
  initialViewModel: GamificationViewModel;
}

export function GamificationView({ initialViewModel }: GamificationViewProps) {
  const {
    viewModel,
    error,
    success,
    activeTab,
    achievementFilter,
    rewardFilter,
    filteredAchievements,
    filteredRewards,
    setActiveTab,
    setAchievementFilter,
    setRewardFilter,
    openRewardModal,
    handleRedeemReward,
    selectedReward,
    showRewardModal,
    closeRewardModal,
  } = useGamificationPresenter(initialViewModel);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Notifications */}
      {error && (
        <div className="fixed top-4 right-4 z-50 bg-red-100 dark:bg-red-900/50 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 px-6 py-3 rounded-lg shadow-lg">
          {error}
        </div>
      )}
      {success && (
        <div className="fixed top-4 right-4 z-50 bg-green-100 dark:bg-green-900/50 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-300 px-6 py-3 rounded-lg shadow-lg">
          {success}
        </div>
      )}

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-sky-300 to-violet-300 dark:from-sky-400 dark:to-violet-400 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white mb-4">🎮 Gamification</h1>
          <p className="text-white/90 text-lg">
            ทำภารกิจ รับคะแนน และแลกรางวัล
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* User Stats Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-gradient-to-br from-sky-300 to-violet-300 rounded-full flex items-center justify-center text-white text-3xl font-bold">
              {viewModel.user.displayName[0]}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {viewModel.user.displayName}
              </h2>
              <div className="flex items-center gap-4 mt-2">
                <span className="px-3 py-1 bg-gradient-to-r from-sky-400 to-violet-400 text-white rounded-lg font-bold">
                  Level {viewModel.user.level}
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  {viewModel.user.tier}
                </span>
                <span className="text-sky-600 dark:text-sky-400 font-bold">
                  {viewModel.user.totalPoints.toLocaleString()} คะแนน
                </span>
              </div>
              {/* Level Progress */}
              <div className="mt-3">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">
                    ความคืบหน้า
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    อีก {viewModel.user.pointsToNextLevel.toLocaleString()} คะแนน
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-sky-400 to-violet-400 h-3 rounded-full transition-all"
                    style={{ width: `${viewModel.user.levelProgress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
            <div className="text-3xl mb-2">🎯</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {viewModel.stats.activeMissions}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              ภารกิจที่ทำอยู่
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
            <div className="text-3xl mb-2">🏆</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {viewModel.stats.unlockedAchievements}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              ความสำเร็จ
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
            <div className="text-3xl mb-2">🎁</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {viewModel.rewards.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              รางวัล
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
            <div className="text-3xl mb-2">📊</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              #{viewModel.leaderboard.findIndex((l) => l.userId === viewModel.user.id) + 1 || "N/A"}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              อันดับ
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {[
            { id: "missions", label: "🎯 ภารกิจ", count: viewModel.stats.activeMissions },
            { id: "achievements", label: "🏆 ความสำเร็จ", count: viewModel.stats.unlockedAchievements },
            { id: "rewards", label: "🎁 รางวัล", count: viewModel.rewards.length },
            { id: "leaderboard", label: "📊 อันดับ", count: null },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as "missions" | "achievements" | "rewards" | "leaderboard")}
              className={`px-6 py-3 rounded-lg font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-sky-400 to-violet-400 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              {tab.label} {tab.count !== null && `(${tab.count})`}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "missions" && (
          <div className="space-y-4">
            {viewModel.missions.map((mission) => (
              <MissionCard key={mission.id} mission={mission} />
            ))}
          </div>
        )}

        {activeTab === "achievements" && (
          <div>
            {/* Filter */}
            <div className="mb-4 flex gap-2">
              {["all", "unlocked", "locked"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setAchievementFilter(filter as "all" | "unlocked" | "locked")}
                  className={`px-4 py-2 rounded-lg ${
                    achievementFilter === filter
                      ? "bg-sky-400 text-white"
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {filter === "all" && "ทั้งหมด"}
                  {filter === "unlocked" && "ปลดล็อคแล้ว"}
                  {filter === "locked" && "ยังล็อค"}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAchievements.map((achievement) => (
                <AchievementCard key={achievement.id} achievement={achievement} />
              ))}
            </div>
          </div>
        )}

        {activeTab === "rewards" && (
          <div>
            {/* Filter */}
            <div className="mb-4 flex gap-2">
              {["all", "affordable"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setRewardFilter(filter as "all" | "affordable")}
                  className={`px-4 py-2 rounded-lg ${
                    rewardFilter === filter
                      ? "bg-sky-400 text-white"
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {filter === "all" && "ทั้งหมด"}
                  {filter === "affordable" && "แลกได้"}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredRewards.map((reward) => (
                <RewardCard
                  key={reward.id}
                  reward={reward}
                  userPoints={viewModel.user.totalPoints}
                  onRedeem={() => openRewardModal(reward)}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === "leaderboard" && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                      อันดับ
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                      ผู้ใช้
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                      ระดับ
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                      คะแนน
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                      เหรียญ
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {viewModel.leaderboard.map((entry) => (
                    <LeaderboardRow
                      key={entry.userId}
                      entry={entry}
                      isCurrentUser={entry.userId === viewModel.user.id}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Reward Modal */}
      {showRewardModal && selectedReward && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
            <div className="text-center mb-4">
              <div className="text-6xl mb-4">{selectedReward.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {selectedReward.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {selectedReward.description}
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center mb-3">
                <span className="text-gray-600 dark:text-gray-400">ราคา:</span>
                <span className="text-2xl font-bold text-sky-600 dark:text-sky-400">
                  {selectedReward.pointsCost.toLocaleString()} คะแนน
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">คะแนนของคุณ:</span>
                <span className="font-bold text-gray-900 dark:text-white">
                  {viewModel.user.totalPoints.toLocaleString()} คะแนน
                </span>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">เงื่อนไข:</h4>
              <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                {selectedReward.terms.map((term, index) => (
                  <li key={index}>{term}</li>
                ))}
              </ul>
            </div>

            <div className="flex gap-3">
              <button
                onClick={closeRewardModal}
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                ยกเลิก
              </button>
              <button
                onClick={() => handleRedeemReward(selectedReward)}
                disabled={viewModel.user.totalPoints < selectedReward.pointsCost}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-sky-400 to-violet-400 text-white font-bold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                แลกเลย
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Mission Card Component
function MissionCard({ mission }: { mission: Mission }) {
  const progressPercent = (mission.progress / mission.target) * 100;
  const typeColors = {
    daily: "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400",
    weekly: "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400",
    special: "bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400",
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
      <div className="flex items-start gap-4">
        <div className="text-4xl">{mission.icon}</div>
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">
                {mission.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {mission.description}
              </p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${typeColors[mission.type]}`}>
              {mission.type === "daily" && "รายวัน"}
              {mission.type === "weekly" && "รายสัปดาห์"}
              {mission.type === "special" && "พิเศษ"}
            </span>
          </div>
          <div className="mb-3">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600 dark:text-gray-400">
                {mission.progress} / {mission.target}
              </span>
              <span className="font-bold text-sky-600 dark:text-sky-400">
                +{mission.points} คะแนน
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-sky-400 to-violet-400 h-2 rounded-full"
                style={{ width: `${Math.min(progressPercent, 100)}%` }}
              ></div>
            </div>
          </div>
          {mission.expiresAt && (
            <div className="text-xs text-gray-500 dark:text-gray-500">
              ⏱️ หมดอายุ: {new Date(mission.expiresAt).toLocaleDateString("th-TH")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Achievement Card Component
function AchievementCard({ achievement }: { achievement: Achievement }) {
  const tierColors = {
    bronze: "from-amber-600 to-amber-800",
    silver: "from-gray-400 to-gray-600",
    gold: "from-yellow-400 to-yellow-600",
    platinum: "from-cyan-400 to-blue-600",
  };

  return (
    <div
      className={`rounded-lg p-6 shadow-md ${
        achievement.unlocked
          ? "bg-white dark:bg-gray-800"
          : "bg-gray-100 dark:bg-gray-900 opacity-60"
      }`}
    >
      <div className="text-center">
        <div className={`text-6xl mb-3 ${!achievement.unlocked && "grayscale"}`}>
          {achievement.icon}
        </div>
        <div
          className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white mb-2 bg-gradient-to-r ${
            tierColors[achievement.tier]
          }`}
        >
          {achievement.tier.toUpperCase()}
        </div>
        <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
          {achievement.name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          {achievement.description}
        </p>
        {achievement.unlocked ? (
          <div className="text-green-600 dark:text-green-400 font-bold">
            ✓ ปลดล็อคแล้ว
          </div>
        ) : (
          <div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              {achievement.requirement}
            </div>
            {achievement.progress !== undefined && achievement.target !== undefined && (
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-sky-400 to-violet-400 h-2 rounded-full"
                  style={{
                    width: `${Math.min((achievement.progress / achievement.target) * 100, 100)}%`,
                  }}
                ></div>
              </div>
            )}
          </div>
        )}
        <div className="mt-3 text-sky-600 dark:text-sky-400 font-bold">
          +{achievement.points} คะแนน
        </div>
      </div>
    </div>
  );
}

// Reward Card Component
function RewardCard({
  reward,
  userPoints,
  onRedeem,
}: {
  reward: Reward;
  userPoints: number;
  onRedeem: () => void;
}) {
  const canAfford = userPoints >= reward.pointsCost;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="text-center mb-4">
          <div className="text-5xl mb-3">{reward.icon}</div>
          <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
            {reward.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {reward.description}
          </p>
        </div>
        <div className="text-center mb-4">
          <div className="text-3xl font-bold text-sky-600 dark:text-sky-400">
            {reward.pointsCost.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">คะแนน</div>
        </div>
        <button
          onClick={onRedeem}
          disabled={!canAfford}
          className={`w-full py-3 rounded-lg font-bold transition-all ${
            canAfford
              ? "bg-gradient-to-r from-sky-400 to-violet-400 text-white hover:shadow-lg"
              : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-500 cursor-not-allowed"
          }`}
        >
          {canAfford ? "แลกเลย" : "คะแนนไม่เพียงพอ"}
        </button>
        <div className="text-xs text-gray-500 dark:text-gray-500 text-center mt-2">
          เหลือ {reward.available} สิทธิ์
        </div>
      </div>
    </div>
  );
}

// Leaderboard Row Component
function LeaderboardRow({
  entry,
  isCurrentUser,
}: {
  entry: LeaderboardEntry;
  isCurrentUser: boolean;
}) {
  const getRankIcon = (rank: number) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return `#${rank}`;
  };

  return (
    <tr
      className={`${
        isCurrentUser
          ? "bg-sky-50 dark:bg-sky-900/20"
          : "hover:bg-gray-50 dark:hover:bg-gray-700"
      }`}
    >
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-2xl font-bold">{getRankIcon(entry.rank)}</span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-sky-300 to-violet-300 rounded-full flex items-center justify-center text-white font-bold">
            {entry.displayName[0]}
          </div>
          <div>
            <div className="font-medium text-gray-900 dark:text-white">
              {entry.displayName}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{entry.tier}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="px-3 py-1 bg-gradient-to-r from-sky-400 to-violet-400 text-white rounded-lg font-bold">
          Lv. {entry.level}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="font-bold text-gray-900 dark:text-white">
          {entry.totalPoints.toLocaleString()}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-gray-600 dark:text-gray-400">{entry.badgeCount} 🏅</span>
      </td>
    </tr>
  );
}
