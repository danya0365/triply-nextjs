/**
 * Mock Data: Gamification
 * Missions, Achievements, Rewards for gamification system
 */

export interface Mission {
  id: string;
  title: string;
  description: string;
  icon: string;
  type: "daily" | "weekly" | "special";
  points: number;
  progress: number;
  target: number;
  expiresAt?: string;
  status: "active" | "completed" | "expired";
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: "travel" | "social" | "booking" | "special";
  tier: "bronze" | "silver" | "gold" | "platinum";
  points: number;
  unlocked: boolean;
  unlockedAt?: string;
  requirement: string;
  progress?: number;
  target?: number;
}

export interface Reward {
  id: string;
  name: string;
  description: string;
  icon: string;
  type: "discount" | "upgrade" | "voucher" | "special";
  value: number;
  pointsCost: number;
  available: number;
  expiresAt?: string;
  terms: string[];
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  displayName: string;
  avatarUrl: string;
  totalPoints: number;
  level: number;
  tier: string;
  badgeCount: number;
}

// Missions
export const MISSIONS: Mission[] = [
  {
    id: "mission-001",
    title: "จองที่พัก 3 คืนติดต่อกัน",
    description: "จองที่พักสำหรับการเดินทาง 3 คืนขึ้นไปในทริปเดียว",
    icon: "🏨",
    type: "daily",
    points: 500,
    progress: 0,
    target: 1,
    status: "active",
  },
  {
    id: "mission-002",
    title: "เขียนรีวิว 2 ที่พัก",
    description: "แชร์ประสบการณ์การเข้าพักของคุณ",
    icon: "⭐",
    type: "daily",
    points: 300,
    progress: 1,
    target: 2,
    status: "active",
  },
  {
    id: "mission-003",
    title: "สร้างทริปใหม่",
    description: "วางแผนทริปการเดินทางครั้งใหม่",
    icon: "🗺️",
    type: "daily",
    points: 200,
    progress: 0,
    target: 1,
    status: "active",
  },
  {
    id: "mission-004",
    title: "แชร์ทริปให้เพื่อน 5 คน",
    description: "แชร์แพลนการเดินทางของคุณให้เพื่อนๆ",
    icon: "📤",
    type: "weekly",
    points: 800,
    progress: 2,
    target: 5,
    expiresAt: "2025-10-18T23:59:59Z",
    status: "active",
  },
  {
    id: "mission-005",
    title: "ท่องเที่ยว 3 จังหวัด",
    description: "สำรวจสถานที่ท่องเที่ยวใน 3 จังหวัดต่างกัน",
    icon: "🌏",
    type: "weekly",
    points: 1500,
    progress: 1,
    target: 3,
    expiresAt: "2025-10-18T23:59:59Z",
    status: "active",
  },
  {
    id: "mission-006",
    title: "ปลดล็อคทุกธีมทริป",
    description: "ลองวางแผนทริปทุกธีมที่มี (10 ธีม)",
    icon: "🎯",
    type: "special",
    points: 3000,
    progress: 6,
    target: 10,
    status: "active",
  },
];

// Achievements
export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "badge-001",
    name: "นักเดินทางมือใหม่",
    description: "จองที่พักครั้งแรก",
    icon: "🎒",
    category: "travel",
    tier: "bronze",
    points: 100,
    unlocked: true,
    unlockedAt: "2025-01-15T10:00:00Z",
    requirement: "จองที่พัก 1 ครั้ง",
    progress: 1,
    target: 1,
  },
  {
    id: "badge-002",
    name: "นักเดินทางตัวยง",
    description: "จองที่พักครบ 10 ครั้ง",
    icon: "🧳",
    category: "travel",
    tier: "silver",
    points: 500,
    unlocked: true,
    unlockedAt: "2025-03-20T14:30:00Z",
    requirement: "จองที่พัก 10 ครั้ง",
    progress: 10,
    target: 10,
  },
  {
    id: "badge-003",
    name: "Globetrotter",
    description: "เดินทางไป 20 ประเทศ",
    icon: "✈️",
    category: "travel",
    tier: "gold",
    points: 2000,
    unlocked: false,
    requirement: "เดินทางไป 20 ประเทศ",
    progress: 12,
    target: 20,
  },
  {
    id: "badge-004",
    name: "World Explorer",
    description: "เดินทางครบทุกทวีป",
    icon: "🌍",
    category: "travel",
    tier: "platinum",
    points: 5000,
    unlocked: false,
    requirement: "เดินทางครบ 7 ทวีป",
    progress: 2,
    target: 7,
  },
  {
    id: "badge-005",
    name: "นักวางแผน",
    description: "สร้างทริป 5 ทริป",
    icon: "📋",
    category: "booking",
    tier: "bronze",
    points: 200,
    unlocked: true,
    unlockedAt: "2025-05-10T11:00:00Z",
    requirement: "สร้างทริป 5 ทริป",
    progress: 5,
    target: 5,
  },
  {
    id: "badge-006",
    name: "Master Planner",
    description: "สร้างทริป 20 ทริป",
    icon: "🎯",
    category: "booking",
    tier: "gold",
    points: 1000,
    unlocked: false,
    requirement: "สร้างทริป 20 ทริป",
    progress: 12,
    target: 20,
  },
  {
    id: "badge-007",
    name: "นักรีวิว",
    description: "เขียนรีวิว 10 ที่พัก",
    icon: "✍️",
    category: "social",
    tier: "silver",
    points: 300,
    unlocked: false,
    requirement: "เขียนรีวิว 10 ที่พัก",
    progress: 6,
    target: 10,
  },
  {
    id: "badge-008",
    name: "Early Bird",
    description: "จองล่วงหน้า 3 เดือน",
    icon: "🐦",
    category: "special",
    tier: "silver",
    points: 400,
    unlocked: true,
    unlockedAt: "2025-07-05T09:00:00Z",
    requirement: "จองล่วงหน้าอย่างน้อย 3 เดือน",
    progress: 1,
    target: 1,
  },
  {
    id: "badge-009",
    name: "Social Butterfly",
    description: "แชร์ทริป 50 ครั้ง",
    icon: "🦋",
    category: "social",
    tier: "gold",
    points: 800,
    unlocked: false,
    requirement: "แชร์ทริป 50 ครั้ง",
    progress: 28,
    target: 50,
  },
  {
    id: "badge-010",
    name: "Weekend Warrior",
    description: "จองวันหยุดสุดสัปดาห์ 10 ครั้ง",
    icon: "🏖️",
    category: "special",
    tier: "bronze",
    points: 250,
    unlocked: true,
    unlockedAt: "2025-08-15T16:00:00Z",
    requirement: "จองวันหยุดสุดสัปดาห์ 10 ครั้ง",
    progress: 10,
    target: 10,
  },
];

// Rewards
export const REWARDS: Reward[] = [
  {
    id: "reward-001",
    name: "ส่วนลด 10% ค่าที่พัก",
    description: "รับส่วนลด 10% สำหรับการจองที่พักครั้งถัดไป",
    icon: "🎟️",
    type: "discount",
    value: 10,
    pointsCost: 1000,
    available: 50,
    expiresAt: "2025-12-31T23:59:59Z",
    terms: [
      "ใช้ได้กับที่พักทุกแห่ง",
      "จองขั้นต่ำ 2,000 บาท",
      "ไม่สามารถใช้ร่วมกับโปรโมชั่นอื่นได้",
      "มีอายุ 30 วัน",
    ],
  },
  {
    id: "reward-002",
    name: "ส่วนลด 500 บาท",
    description: "คูปองส่วนลด 500 บาท สำหรับที่พักทุกประเภท",
    icon: "💰",
    type: "voucher",
    value: 500,
    pointsCost: 2500,
    available: 30,
    expiresAt: "2025-12-31T23:59:59Z",
    terms: [
      "ใช้ได้กับที่พักทุกแห่ง",
      "จองขั้นต่ำ 3,000 บาท",
      "มีอายุ 60 วัน",
    ],
  },
  {
    id: "reward-003",
    name: "อัพเกรดห้องพัก",
    description: "อัพเกรดห้องพักฟรี 1 ระดับ (ตามความพร้อม)",
    icon: "⭐",
    type: "upgrade",
    value: 0,
    pointsCost: 3000,
    available: 20,
    terms: [
      "อัพเกรดตามความพร้อมของที่พัก",
      "ต้องแจ้งล่วงหน้าอย่างน้อย 7 วัน",
      "ใช้ได้กับโรงแรมที่เข้าร่วม",
      "มีอายุ 90 วัน",
    ],
  },
  {
    id: "reward-004",
    name: "Early Check-in / Late Check-out",
    description: "เช็คอินก่อนหรือเช็คเอาท์สายฟรี",
    icon: "🕐",
    type: "special",
    value: 0,
    pointsCost: 1500,
    available: 40,
    terms: [
      "ขึ้นอยู่กับความพร้อมของที่พัก",
      "ต้องแจ้งล่วงหน้าอย่างน้อย 3 วัน",
      "มีอายุ 60 วัน",
    ],
  },
  {
    id: "reward-005",
    name: "ส่วนลด 25% ค่าที่พัก",
    description: "รับส่วนลด 25% สูงสุด 2,000 บาท",
    icon: "🎁",
    type: "discount",
    value: 25,
    pointsCost: 5000,
    available: 10,
    expiresAt: "2025-12-31T23:59:59Z",
    terms: [
      "ใช้ได้กับที่พักที่ร่วมรายการ",
      "ส่วนลดสูงสุด 2,000 บาท",
      "จองขั้นต่ำ 5,000 บาท",
      "มีอายุ 30 วัน",
    ],
  },
  {
    id: "reward-006",
    name: "Free Breakfast",
    description: "อาหารเช้าฟรี 2 ท่าน",
    icon: "🍳",
    type: "special",
    value: 0,
    pointsCost: 800,
    available: 60,
    terms: [
      "ใช้ได้กับที่พักที่มีบริการอาหารเช้า",
      "สำหรับ 2 ท่าน",
      "มีอายุ 45 วัน",
    ],
  },
];

// Leaderboard (Top 10)
export const LEADERBOARD: LeaderboardEntry[] = [
  {
    rank: 1,
    userId: "user-002",
    displayName: "Sarah Johnson",
    avatarUrl: "/avatars/user-002.jpg",
    totalPoints: 28750,
    level: 12,
    tier: "Globetrotter",
    badgeCount: 24,
  },
  {
    rank: 2,
    userId: "user-005",
    displayName: "ประยุทธ์ ท่องเที่ยว",
    avatarUrl: "/avatars/user-005.jpg",
    totalPoints: 25340,
    level: 11,
    tier: "Globetrotter",
    badgeCount: 22,
  },
  {
    rank: 3,
    userId: "user-012",
    displayName: "Emma Wilson",
    avatarUrl: "/avatars/user-012.jpg",
    totalPoints: 22890,
    level: 10,
    tier: "Voyager",
    badgeCount: 20,
  },
  {
    rank: 4,
    userId: "user-008",
    displayName: "สมหญิง ชอบเที่ยว",
    avatarUrl: "/avatars/user-008.jpg",
    totalPoints: 20450,
    level: 10,
    tier: "Voyager",
    badgeCount: 18,
  },
  {
    rank: 5,
    userId: "user-001",
    displayName: "สมชาย ใจดี",
    avatarUrl: "/avatars/user-001.jpg",
    totalPoints: 15420,
    level: 8,
    tier: "Voyager",
    badgeCount: 15,
  },
  {
    rank: 6,
    userId: "user-015",
    displayName: "Michael Chen",
    avatarUrl: "/avatars/user-015.jpg",
    totalPoints: 14280,
    level: 8,
    tier: "Adventurer",
    badgeCount: 14,
  },
  {
    rank: 7,
    userId: "user-020",
    displayName: "นิรันดร์ พาเที่ยว",
    avatarUrl: "/avatars/user-020.jpg",
    totalPoints: 12650,
    level: 7,
    tier: "Adventurer",
    badgeCount: 12,
  },
  {
    rank: 8,
    userId: "user-018",
    displayName: "Lisa Anderson",
    avatarUrl: "/avatars/user-018.jpg",
    totalPoints: 11340,
    level: 7,
    tier: "Adventurer",
    badgeCount: 11,
  },
  {
    rank: 9,
    userId: "user-025",
    displayName: "วิไล รักเที่ยว",
    avatarUrl: "/avatars/user-025.jpg",
    totalPoints: 9870,
    level: 6,
    tier: "Adventurer",
    badgeCount: 10,
  },
  {
    rank: 10,
    userId: "user-030",
    displayName: "David Kim",
    avatarUrl: "/avatars/user-030.jpg",
    totalPoints: 8950,
    level: 6,
    tier: "Explorer",
    badgeCount: 9,
  },
];

export const getMissionById = (id: string) => MISSIONS.find((m) => m.id === id);
export const getAchievementById = (id: string) => ACHIEVEMENTS.find((a) => a.id === id);
export const getRewardById = (id: string) => REWARDS.find((r) => r.id === id);
export const getActiveMissions = () => MISSIONS.filter((m) => m.status === "active");
export const getUnlockedAchievements = () => ACHIEVEMENTS.filter((a) => a.unlocked);
export const getAvailableRewards = () => REWARDS.filter((r) => r.available > 0);
