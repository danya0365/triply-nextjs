/**
 * Mock Data: Trip Activities
 * Activities and events for trip timeline
 */

export type ActivityType =
  | "accommodation"
  | "transport"
  | "food"
  | "activity"
  | "shopping"
  | "other";

export type TimeSlot = "morning" | "afternoon" | "evening" | "night" | "all-day";

export interface TripActivity {
  id: string;
  tripId: string;
  day: number; // Day 1, Day 2, etc.
  name: string;
  description: string;
  type: ActivityType;
  timeSlot: TimeSlot;
  startTime?: string; // HH:mm format
  endTime?: string; // HH:mm format
  duration: number; // minutes
  location?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  cost: number;
  currency: string;
  bookingUrl?: string;
  notes?: string;
  isBooked: boolean;
  createdAt: string;
  updatedAt: string;
}

// Helper function to generate activity ID
const generateActivityId = (index: number) => `activity-${String(index).padStart(3, "0")}`;

/**
 * Mock Activities for Trip trip-001 (ทริปภูเก็ต 5 วัน 4 คืน)
 */
export const TRIP_ACTIVITIES: TripActivity[] = [
  // Day 1: Arrival
  {
    id: generateActivityId(1),
    tripId: "trip-001",
    day: 1,
    name: "เที่ยวบินกรุงเทพ-ภูเก็ต",
    description: "Thai Airways TG201 ออก 08:00 ถึง 09:25",
    type: "transport",
    timeSlot: "morning",
    startTime: "08:00",
    endTime: "09:25",
    duration: 85,
    location: "สนามบินภูเก็ต",
    coordinates: { lat: 8.1132, lng: 98.3169 },
    cost: 2500,
    currency: "THB",
    isBooked: true,
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
  },
  {
    id: generateActivityId(2),
    tripId: "trip-001",
    day: 1,
    name: "Check-in โรงแรม",
    description: "Patong Beach Hotel - Superior Room",
    type: "accommodation",
    timeSlot: "afternoon",
    startTime: "14:00",
    endTime: "15:00",
    duration: 60,
    location: "Patong Beach Hotel",
    cost: 2500,
    currency: "THB",
    isBooked: true,
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
  },
  {
    id: generateActivityId(3),
    tripId: "trip-001",
    day: 1,
    name: "เดินเล่นชายหาดป่าตอง",
    description: "เดินเล่น เล่นน้ำ ถ่ายรูป",
    type: "activity",
    timeSlot: "afternoon",
    startTime: "15:30",
    endTime: "18:00",
    duration: 150,
    location: "ชายหาดป่าตอง",
    coordinates: { lat: 7.8967, lng: 98.2967 },
    cost: 0,
    currency: "THB",
    isBooked: false,
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
  },
  {
    id: generateActivityId(4),
    tripId: "trip-001",
    day: 1,
    name: "ทานอาหารเย็นที่ ร้านบ้านริมเล",
    description: "ซีฟู้ดสด ทะเลสวย",
    type: "food",
    timeSlot: "evening",
    startTime: "19:00",
    endTime: "21:00",
    duration: 120,
    location: "ร้านบ้านริมเล",
    cost: 1200,
    currency: "THB",
    isBooked: false,
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
  },

  // Day 2: Island Tour
  {
    id: generateActivityId(5),
    tripId: "trip-001",
    day: 2,
    name: "ทัวร์เกาะพีพี",
    description: "One day tour เกาะพีพี - อ่าวมาหยา - เกาะไข่",
    type: "activity",
    timeSlot: "all-day",
    startTime: "08:00",
    endTime: "17:00",
    duration: 540,
    location: "เกาะพีพี",
    coordinates: { lat: 7.7407, lng: 98.7784 },
    cost: 1800,
    currency: "THB",
    bookingUrl: "https://example.com/phi-phi-tour",
    isBooked: true,
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
  },
  {
    id: generateActivityId(6),
    tripId: "trip-001",
    day: 2,
    name: "เดินถนนคนเดินป่าตอง",
    description: "ช้อปปิ้ง กินขนม ของฝาก",
    type: "shopping",
    timeSlot: "evening",
    startTime: "19:00",
    endTime: "22:00",
    duration: 180,
    location: "ถนนคนเดินป่าตอง",
    cost: 800,
    currency: "THB",
    isBooked: false,
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
  },

  // Day 3: Culture & Relax
  {
    id: generateActivityId(7),
    tripId: "trip-001",
    day: 3,
    name: "เช้า - เที่ยววัดฉลอง",
    description: "วัดที่ใหญ่ที่สุดในภูเก็ต",
    type: "activity",
    timeSlot: "morning",
    startTime: "09:00",
    endTime: "11:00",
    duration: 120,
    location: "วัดฉลอง",
    coordinates: { lat: 7.8911, lng: 98.3831 },
    cost: 0,
    currency: "THB",
    isBooked: false,
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
  },
  {
    id: generateActivityId(8),
    tripId: "trip-001",
    day: 3,
    name: "เที่ยววิวพอยต์ Big Buddha",
    description: "พระใหญ่ ชมวิว 360 องศา",
    type: "activity",
    timeSlot: "morning",
    startTime: "11:30",
    endTime: "13:00",
    duration: 90,
    location: "Big Buddha Phuket",
    coordinates: { lat: 7.8889, lng: 98.3069 },
    cost: 0,
    currency: "THB",
    isBooked: false,
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
  },
  {
    id: generateActivityId(9),
    tripId: "trip-001",
    day: 3,
    name: "สปา & นวด",
    description: "Thai massage 2 hours",
    type: "activity",
    timeSlot: "afternoon",
    startTime: "15:00",
    endTime: "17:00",
    duration: 120,
    location: "Let's Relax Spa",
    cost: 1500,
    currency: "THB",
    isBooked: false,
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
  },
  {
    id: generateActivityId(10),
    tripId: "trip-001",
    day: 3,
    name: "ดินเนอร์ที่ร้าน Baan Rim Pa",
    description: "Fine dining Thai cuisine",
    type: "food",
    timeSlot: "evening",
    startTime: "19:30",
    endTime: "21:30",
    duration: 120,
    location: "Baan Rim Pa",
    cost: 2000,
    currency: "THB",
    bookingUrl: "https://example.com/baan-rim-pa",
    isBooked: true,
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
  },

  // Day 4: Beach & Adventure
  {
    id: generateActivityId(11),
    tripId: "trip-001",
    day: 4,
    name: "ดำน้ำดูปะการังที่เกาะราชา",
    description: "Scuba diving course + equipment",
    type: "activity",
    timeSlot: "all-day",
    startTime: "08:30",
    endTime: "16:00",
    duration: 450,
    location: "เกาะราชา",
    cost: 3500,
    currency: "THB",
    bookingUrl: "https://example.com/diving",
    isBooked: true,
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
  },
  {
    id: generateActivityId(12),
    tripId: "trip-001",
    day: 4,
    name: "ดูโชว์ Phuket Fantasea",
    description: "Cultural theme park show",
    type: "activity",
    timeSlot: "evening",
    startTime: "18:00",
    endTime: "21:30",
    duration: 210,
    location: "Phuket Fantasea",
    cost: 1800,
    currency: "THB",
    bookingUrl: "https://example.com/fantasea",
    isBooked: true,
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
  },

  // Day 5: Departure
  {
    id: generateActivityId(13),
    tripId: "trip-001",
    day: 5,
    name: "Check-out โรงแรม",
    description: "เก็บของ และ check-out",
    type: "accommodation",
    timeSlot: "morning",
    startTime: "10:00",
    endTime: "11:00",
    duration: 60,
    location: "Patong Beach Hotel",
    cost: 0,
    currency: "THB",
    isBooked: false,
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
  },
  {
    id: generateActivityId(14),
    tripId: "trip-001",
    day: 5,
    name: "ช้อปปิ้งของฝากที่ Central Phuket",
    description: "ซื้อของฝาก ขนมเมือง",
    type: "shopping",
    timeSlot: "morning",
    startTime: "11:30",
    endTime: "13:00",
    duration: 90,
    location: "Central Phuket",
    cost: 1500,
    currency: "THB",
    isBooked: false,
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
  },
  {
    id: generateActivityId(15),
    tripId: "trip-001",
    day: 5,
    name: "เที่ยวบินภูเก็ต-กรุงเทพ",
    description: "Thai Airways TG210 ออก 15:30 ถึง 17:00",
    type: "transport",
    timeSlot: "afternoon",
    startTime: "15:30",
    endTime: "17:00",
    duration: 90,
    location: "สนามบินภูเก็ต",
    coordinates: { lat: 8.1132, lng: 98.3169 },
    cost: 2500,
    currency: "THB",
    isBooked: true,
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
  },
];

/**
 * Get activities for a specific trip
 */
export function getActivitiesByTripId(tripId: string): TripActivity[] {
  return TRIP_ACTIVITIES.filter((activity) => activity.tripId === tripId);
}

/**
 * Get activities for a specific day
 */
export function getActivitiesByDay(tripId: string, day: number): TripActivity[] {
  return TRIP_ACTIVITIES.filter(
    (activity) => activity.tripId === tripId && activity.day === day
  );
}

/**
 * Get activity by ID
 */
export function getActivityById(activityId: string): TripActivity | undefined {
  return TRIP_ACTIVITIES.find((activity) => activity.id === activityId);
}

/**
 * Calculate total cost of activities
 */
export function calculateActivityCosts(tripId: string): {
  total: number;
  byType: Record<ActivityType, number>;
} {
  const activities = getActivitiesByTripId(tripId);
  
  const byType: Record<ActivityType, number> = {
    accommodation: 0,
    transport: 0,
    food: 0,
    activity: 0,
    shopping: 0,
    other: 0,
  };

  activities.forEach((activity) => {
    byType[activity.type] += activity.cost;
  });

  const total = Object.values(byType).reduce((sum, cost) => sum + cost, 0);

  return { total, byType };
}
