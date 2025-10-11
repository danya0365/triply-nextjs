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
];

// Generate more trips
for (let i = 4; i <= 30; i++) {
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
