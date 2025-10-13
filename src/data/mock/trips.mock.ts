/**
 * Mock Data: Trips
 * 30+ trip plans for testing
 */

import { DESTINATIONS } from "../master/destinations.master";
import { TRIP_THEMES } from "../master/trip-themes.master";
import { USERS } from "./users.mock";

export interface Trip {
  id: string;
  slug: string;
  creatorId: string;
  name: string;
  description: string;
  coverImage: string;
  
  // Travel details
  startDate: string;
  endDate: string;
  durationDays: number;
  destinationIds: string[];
  themeId: string;
  
  // Travelers
  numAdults: number;
  numChildren: number;
  
  // Budget
  totalBudget: number;
  currency: string;
  budgetBreakdown: {
    accommodation: number;
    activities: number;
    food: number;
    transport: number;
    shopping: number;
    misc: number;
  };
  
  // Status
  planningStage: "draft" | "planning" | "ready" | "booked" | "completed";
  completionPercentage: number;
  isPublic: boolean;
  
  // Stats
  viewCount: number;
  likeCount: number;
  cloneCount: number;
  
  createdAt: string;
  updatedAt: string;
}

export const TRIPS: Trip[] = [
  {
    id: "trip-001",
    slug: "phuket-honeymoon-paradise",
    creatorId: USERS[0].id,
    name: "ฮันนีมูนภูเก็ต - 7 วันแสนหวาน",
    description: "แพลนฮันนีมูนสุดโรแมนติกที่ภูเก็ต พักรีสอร์ทหรู เที่ยวเกาะพีพี อ่าวพังงา และชมพระอาทิตย์ตกที่พรอมเทพเคป",
    coverImage: "/images/trips/phuket-honeymoon/cover.jpg",
    startDate: "2025-11-15",
    endDate: "2025-11-22",
    durationDays: 7,
    destinationIds: [DESTINATIONS[0].id], // Phuket
    themeId: TRIP_THEMES[0].id, // Honeymoon
    numAdults: 2,
    numChildren: 0,
    totalBudget: 80000,
    currency: "THB",
    budgetBreakdown: {
      accommodation: 35000,
      activities: 20000,
      food: 15000,
      transport: 5000,
      shopping: 3000,
      misc: 2000,
    },
    planningStage: "ready",
    completionPercentage: 85,
    isPublic: true,
    viewCount: 1245,
    likeCount: 89,
    cloneCount: 34,
    createdAt: "2025-09-10T10:00:00Z",
    updatedAt: "2025-10-05T14:30:00Z",
  },
  {
    id: "trip-002",
    slug: "chiangmai-family-adventure",
    creatorId: USERS[1].id,
    name: "เชียงใหม่ ทริปครอบครัว 5 วัน",
    description: "พาครอบครัวเที่ยวเชียงใหม่ ไหว้พระดอยสุเทพ เที่ยวค่ายช้าง ถนนคนเดิน และชิมอาหารเหนือ",
    coverImage: "/images/trips/chiangmai-family/cover.jpg",
    startDate: "2025-12-25",
    endDate: "2025-12-30",
    durationDays: 5,
    destinationIds: [DESTINATIONS[1].id], // Chiang Mai
    themeId: TRIP_THEMES[1].id, // Family
    numAdults: 2,
    numChildren: 2,
    totalBudget: 45000,
    currency: "THB",
    budgetBreakdown: {
      accommodation: 15000,
      activities: 12000,
      food: 10000,
      transport: 5000,
      shopping: 2000,
      misc: 1000,
    },
    planningStage: "planning",
    completionPercentage: 60,
    isPublic: true,
    viewCount: 856,
    likeCount: 67,
    cloneCount: 28,
    createdAt: "2025-09-20T11:00:00Z",
    updatedAt: "2025-10-08T16:20:00Z",
  },
  {
    id: "trip-003",
    slug: "bangkok-solo-adventure",
    creatorId: USERS[0].id,
    name: "Bangkok Solo Trip - 3 Days",
    description: "เที่ยวกรุงเทพคนเดียว ชิมอาหารริมทาง เที่ยววัด ถนนข้าวสาร และเยาวราช",
    coverImage: "/images/trips/bangkok-solo/cover.jpg",
    startDate: "2025-11-01",
    endDate: "2025-11-04",
    durationDays: 3,
    destinationIds: [DESTINATIONS[2].id], // Bangkok
    themeId: TRIP_THEMES[2].id, // Solo
    numAdults: 1,
    numChildren: 0,
    totalBudget: 12000,
    currency: "THB",
    budgetBreakdown: {
      accommodation: 4000,
      activities: 2000,
      food: 3000,
      transport: 1500,
      shopping: 1000,
      misc: 500,
    },
    planningStage: "draft",
    completionPercentage: 35,
    isPublic: false,
    viewCount: 123,
    likeCount: 12,
    cloneCount: 3,
    createdAt: "2025-10-01T09:00:00Z",
    updatedAt: "2025-10-09T10:15:00Z",
  },
  {
    id: "trip-004",
    slug: "hatyai-food-shopping-weekend",
    creatorId: USERS[1].id,
    name: "หาดใหญ่ ทริปกินช้อป 3 วัน 2 คืน",
    description: "ทริปสุดคุ้มหาดใหญ่ ช้อปตลาดกิมหยง ชิมติ่มซำ ไก่ทอดหาดใหญ่ ตลาดสันติชล และของฝากมากมาย",
    coverImage: "/images/trips/hatyai-food/cover.jpg",
    startDate: "2025-12-15",
    endDate: "2025-12-18",
    durationDays: 3,
    destinationIds: [DESTINATIONS[7].id], // Hat Yai
    themeId: TRIP_THEMES[3].id, // Food Tour
    numAdults: 2,
    numChildren: 0,
    totalBudget: 8500,
    currency: "THB",
    budgetBreakdown: {
      accommodation: 2400,
      activities: 1000,
      food: 3000,
      transport: 1000,
      shopping: 800,
      misc: 300,
    },
    planningStage: "ready",
    completionPercentage: 90,
    isPublic: true,
    viewCount: 2456,
    likeCount: 178,
    cloneCount: 89,
    createdAt: "2025-09-25T08:30:00Z",
    updatedAt: "2025-10-12T11:45:00Z",
  },
  {
    id: "trip-005",
    slug: "hatyai-cultural-temple-tour",
    creatorId: USERS[2].id,
    name: "หาดใหญ่ ทัวร์วัดวาอาราม 2 วัน",
    description: "ไหว้พระพุทธมงคลนิมิตร (วัดหาดใหญ่ใน) เที่ยวสวนสาธารณะ ชมวัฒนธรรมไทย-จีน-มลายู และชิมอาหารท้องถิ่น",
    coverImage: "/images/trips/hatyai-temple/cover.jpg",
    startDate: "2026-01-10",
    endDate: "2026-01-12",
    durationDays: 2,
    destinationIds: [DESTINATIONS[7].id], // Hat Yai
    themeId: TRIP_THEMES[4].id, // Culture
    numAdults: 2,
    numChildren: 1,
    totalBudget: 6000,
    currency: "THB",
    budgetBreakdown: {
      accommodation: 1900,
      activities: 800,
      food: 2000,
      transport: 800,
      shopping: 300,
      misc: 200,
    },
    planningStage: "planning",
    completionPercentage: 55,
    isPublic: true,
    viewCount: 678,
    likeCount: 45,
    cloneCount: 23,
    createdAt: "2025-10-05T14:20:00Z",
    updatedAt: "2025-10-11T09:30:00Z",
  },
  {
    id: "trip-006",
    slug: "betong-sakura-season",
    creatorId: USERS[0].id,
    name: "เบตง ฤดูซากุระบาน 3 วัน 2 คืน",
    description: "ชมดอกซากุระบาน ทะเลหมอกภูเขาไอซ์แลนด์ น้ำตกโตนงาช้าง ตลาดโต้รุ่ง และอาหารท้องถิ่นรสเด็ด",
    coverImage: "/images/trips/betong-sakura/cover.jpg",
    startDate: "2026-01-15",
    endDate: "2026-01-18",
    durationDays: 3,
    destinationIds: [DESTINATIONS[8].id], // Betong
    themeId: TRIP_THEMES[8].id, // Nature
    numAdults: 2,
    numChildren: 0,
    totalBudget: 9500,
    currency: "THB",
    budgetBreakdown: {
      accommodation: 3000,
      activities: 2000,
      food: 2500,
      transport: 1500,
      shopping: 300,
      misc: 200,
    },
    planningStage: "ready",
    completionPercentage: 85,
    isPublic: true,
    viewCount: 1834,
    likeCount: 142,
    cloneCount: 67,
    createdAt: "2025-09-15T10:30:00Z",
    updatedAt: "2025-10-10T15:20:00Z",
  },
  {
    id: "trip-007",
    slug: "betong-photography-tour",
    creatorId: USERS[1].id,
    name: "เบตง ทริปถ่ายรูป 2 วัน",
    description: "ทริปถ่ายรูปทะเลหมอก ซากุระ น้ำตก และธรรมชาติสวยงาม เหมาะสำหรับนักถ่ายรูป",
    coverImage: "/images/trips/betong-photo/cover.jpg",
    startDate: "2026-02-01",
    endDate: "2026-02-03",
    durationDays: 2,
    destinationIds: [DESTINATIONS[8].id], // Betong
    themeId: TRIP_THEMES[8].id, // Nature
    numAdults: 1,
    numChildren: 0,
    totalBudget: 5500,
    currency: "THB",
    budgetBreakdown: {
      accommodation: 1200,
      activities: 1500,
      food: 1500,
      transport: 1000,
      shopping: 200,
      misc: 100,
    },
    planningStage: "planning",
    completionPercentage: 60,
    isPublic: true,
    viewCount: 892,
    likeCount: 56,
    cloneCount: 28,
    createdAt: "2025-10-08T09:15:00Z",
    updatedAt: "2025-10-12T14:40:00Z",
  },
  {
    id: "trip-008",
    slug: "yala-cave-adventure",
    creatorId: USERS[2].id,
    name: "ยะลา ผจญภัยถ้ำนาคา 2 วัน",
    description: "สำรวจถ้ำนาคา น้ำตกธารโตน วัดคูหาภิมุข และธรรมชาติอันงดงาม",
    coverImage: "/images/trips/yala-cave/cover.jpg",
    startDate: "2026-01-20",
    endDate: "2026-01-22",
    durationDays: 2,
    destinationIds: [DESTINATIONS[9].id], // Yala
    themeId: TRIP_THEMES[5].id, // Adventure
    numAdults: 2,
    numChildren: 0,
    totalBudget: 4500,
    currency: "THB",
    budgetBreakdown: {
      accommodation: 1800,
      activities: 1200,
      food: 1000,
      transport: 300,
      shopping: 150,
      misc: 50,
    },
    planningStage: "ready",
    completionPercentage: 80,
    isPublic: true,
    viewCount: 1234,
    likeCount: 98,
    cloneCount: 45,
    createdAt: "2025-09-28T11:20:00Z",
    updatedAt: "2025-10-11T16:30:00Z",
  },
  {
    id: "trip-009",
    slug: "yala-cultural-nature",
    creatorId: USERS[0].id,
    name: "ยะลา วัฒนธรรมและธรรมชาติ 3 วัน",
    description: "เที่ยวชมวัฒนธรรมพหุลักษณ์ ถ้ำสวยงาม น้ำตก และอาหารท้องถิ่น",
    coverImage: "/images/trips/yala-culture/cover.jpg",
    startDate: "2026-02-10",
    endDate: "2026-02-13",
    durationDays: 3,
    destinationIds: [DESTINATIONS[9].id], // Yala
    themeId: TRIP_THEMES[4].id, // Culture
    numAdults: 2,
    numChildren: 1,
    totalBudget: 6800,
    currency: "THB",
    budgetBreakdown: {
      accommodation: 2700,
      activities: 1500,
      food: 1800,
      transport: 500,
      shopping: 200,
      misc: 100,
    },
    planningStage: "planning",
    completionPercentage: 50,
    isPublic: true,
    viewCount: 567,
    likeCount: 34,
    cloneCount: 18,
    createdAt: "2025-10-09T13:45:00Z",
    updatedAt: "2025-10-12T10:20:00Z",
  },
  {
    id: "trip-010",
    slug: "pattani-beach-seafood",
    creatorId: USERS[1].id,
    name: "ปัตตานี ชายหาดและอาหารทะเล 3 วัน",
    description: "พักผ่อนริมชายหาด ชิมอาหารทะเลสด เที่ยวมัสยิดกลางเมือง และตลาดเก่า",
    coverImage: "/images/trips/pattani-beach/cover.jpg",
    startDate: "2026-01-25",
    endDate: "2026-01-28",
    durationDays: 3,
    destinationIds: [DESTINATIONS[10].id], // Pattani
    themeId: TRIP_THEMES[3].id, // Food Tour
    numAdults: 2,
    numChildren: 0,
    totalBudget: 9200,
    currency: "THB",
    budgetBreakdown: {
      accommodation: 3600,
      activities: 1500,
      food: 2800,
      transport: 800,
      shopping: 400,
      misc: 100,
    },
    planningStage: "ready",
    completionPercentage: 85,
    isPublic: true,
    viewCount: 1567,
    likeCount: 123,
    cloneCount: 56,
    createdAt: "2025-09-30T10:15:00Z",
    updatedAt: "2025-10-11T14:50:00Z",
  },
  {
    id: "trip-011",
    slug: "pattani-cultural-heritage",
    creatorId: USERS[2].id,
    name: "ปัตตานี มรดกวัฒนธรรม 2 วัน",
    description: "สำรวจมัสยิดกลางเมือง พิพิธภัณฑ์ ตลาดเก่า และวัฒนธรรมมลายูที่เป็นเอกลักษณ์",
    coverImage: "/images/trips/pattani-culture/cover.jpg",
    startDate: "2026-02-15",
    endDate: "2026-02-17",
    durationDays: 2,
    destinationIds: [DESTINATIONS[10].id], // Pattani
    themeId: TRIP_THEMES[4].id, // Culture
    numAdults: 2,
    numChildren: 1,
    totalBudget: 5800,
    currency: "THB",
    budgetBreakdown: {
      accommodation: 2200,
      activities: 1200,
      food: 1500,
      transport: 600,
      shopping: 200,
      misc: 100,
    },
    planningStage: "planning",
    completionPercentage: 65,
    isPublic: true,
    viewCount: 789,
    likeCount: 67,
    cloneCount: 32,
    createdAt: "2025-10-07T15:30:00Z",
    updatedAt: "2025-10-12T09:45:00Z",
  },
];

// Generate more trips
for (let i = 10; i <= 30; i++) {
  const destIndex = i % DESTINATIONS.length;
  const themeIndex = i % TRIP_THEMES.length;
  const userIndex = i % USERS.length;
  
  const stages: Array<"draft" | "planning" | "ready" | "booked" | "completed"> = 
    ["draft", "planning", "ready", "booked", "completed"];
  
  TRIPS.push({
    id: `trip-${String(i).padStart(3, "0")}`,
    slug: `trip-${i}-${DESTINATIONS[destIndex].slug}`,
    creatorId: USERS[userIndex].id,
    name: `Trip to ${DESTINATIONS[destIndex].nameEn} #${i}`,
    description: `Amazing ${TRIP_THEMES[themeIndex].nameEn} trip to ${DESTINATIONS[destIndex].nameEn}`,
    coverImage: `/images/trips/trip-${i}/cover.jpg`,
    startDate: "2025-12-01",
    endDate: "2025-12-05",
    durationDays: Math.floor(3 + Math.random() * 10),
    destinationIds: [DESTINATIONS[destIndex].id],
    themeId: TRIP_THEMES[themeIndex].id,
    numAdults: Math.floor(1 + Math.random() * 4),
    numChildren: Math.floor(Math.random() * 3),
    totalBudget: Math.floor(10000 + Math.random() * 90000),
    currency: "THB",
    budgetBreakdown: {
      accommodation: Math.floor(Math.random() * 30000),
      activities: Math.floor(Math.random() * 20000),
      food: Math.floor(Math.random() * 15000),
      transport: Math.floor(Math.random() * 10000),
      shopping: Math.floor(Math.random() * 5000),
      misc: Math.floor(Math.random() * 3000),
    },
    planningStage: stages[Math.floor(Math.random() * stages.length)],
    completionPercentage: Math.floor(Math.random() * 100),
    isPublic: Math.random() > 0.3,
    viewCount: Math.floor(Math.random() * 2000),
    likeCount: Math.floor(Math.random() * 150),
    cloneCount: Math.floor(Math.random() * 50),
    createdAt: new Date(2025, 8, Math.floor(1 + Math.random() * 30)).toISOString(),
    updatedAt: new Date(2025, 9, Math.floor(1 + Math.random() * 11)).toISOString(),
  });
}

export default TRIPS;

export const getTripById = (id: string) => TRIPS.find(t => t.id === id);
export const getTripBySlug = (slug: string) => TRIPS.find(t => t.slug === slug);
export const getTripsByCreator = (creatorId: string) => TRIPS.filter(t => t.creatorId === creatorId);
export const getPublicTrips = () => TRIPS.filter(t => t.isPublic);
export const getTripsByDestination = (destinationId: string) => 
  TRIPS.filter(t => t.destinationIds.includes(destinationId));
