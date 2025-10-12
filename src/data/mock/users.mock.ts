/**
 * Mock Data: Users
 * 50+ user profiles for testing
 */

export interface User {
  id: string;
  email: string;
  displayName: string;
  avatarUrl: string;
  bio: string;
  
  // Gamification
  totalPoints: number;
  currentTier: "explorer" | "adventurer" | "voyager" | "globetrotter";
  level: number;
  
  // Stats
  totalBookings: number;
  totalTrips: number;
  countriesVisited: number;
  badges: string[];
  
  // Profile
  nationality: string;
  languages: string[];
  interests: string[];
  travelStyle: string[];
  
  createdAt: string;
  lastLogin: string;
}

export const USERS: User[] = [
  {
    id: "user-001",
    email: "somchai@example.com",
    displayName: "สมชาย ใจดี",
    avatarUrl: "/avatars/user-001.jpg",
    bio: "รักการเดินทาง ชอบค้นหาอาหารอร่อยและถ่ายรูป",
    totalPoints: 15420,
    currentTier: "voyager",
    level: 8,
    totalBookings: 24,
    totalTrips: 18,
    countriesVisited: 12,
    badges: ["badge-001", "badge-005", "badge-010"],
    nationality: "Thai",
    languages: ["Thai", "English"],
    interests: ["food", "photography", "culture", "beach"],
    travelStyle: ["adventure", "culture", "food"],
    createdAt: "2023-01-15T10:30:00Z",
    lastLogin: "2025-10-10T15:45:00Z",
  },
  {
    id: "user-002",
    email: "sarah.johnson@example.com",
    displayName: "Sarah Johnson",
    avatarUrl: "/avatars/user-002.jpg",
    bio: "Digital nomad exploring Southeast Asia 🌏 Love beaches and yoga",
    totalPoints: 28750,
    currentTier: "globetrotter",
    level: 12,
    totalBookings: 45,
    totalTrips: 32,
    countriesVisited: 25,
    badges: ["badge-001", "badge-002", "badge-005", "badge-008", "badge-015"],
    nationality: "USA",
    languages: ["English", "Spanish"],
    interests: ["yoga", "beach", "digital-nomad", "wellness", "nature"],
    travelStyle: ["relaxation", "wellness", "budget"],
    createdAt: "2022-06-20T08:15:00Z",
    lastLogin: "2025-10-11T09:20:00Z",
  },
  // Generate more users...
];

// Generate remaining users programmatically
for (let i = 3; i <= 50; i++) {
  const tiers: Array<"explorer" | "adventurer" | "voyager" | "globetrotter"> = 
    ["explorer", "adventurer", "voyager", "globetrotter"];
  const nationalities = ["Thai", "USA", "UK", "Japan", "Korea", "China", "Singapore"];
  const interests = ["beach", "mountain", "city", "food", "culture", "adventure", "photography"];
  
  USERS.push({
    id: `user-${String(i).padStart(3, "0")}`,
    email: `user${i}@example.com`,
    displayName: `User ${i}`,
    avatarUrl: `/avatars/user-${String(i).padStart(3, "0")}.jpg`,
    bio: `Travel enthusiast exploring the world`,
    totalPoints: Math.floor(Math.random() * 30000),
    currentTier: tiers[Math.floor(Math.random() * tiers.length)],
    level: Math.floor(1 + Math.random() * 15),
    totalBookings: Math.floor(Math.random() * 50),
    totalTrips: Math.floor(Math.random() * 40),
    countriesVisited: Math.floor(Math.random() * 30),
    badges: [],
    nationality: nationalities[Math.floor(Math.random() * nationalities.length)],
    languages: ["English"],
    interests: interests.slice(0, Math.floor(2 + Math.random() * 4)),
    travelStyle: ["adventure", "culture"],
    createdAt: new Date(2022, Math.floor(Math.random() * 12), Math.floor(1 + Math.random() * 28)).toISOString(),
    lastLogin: new Date(2025, 9, Math.floor(1 + Math.random() * 11)).toISOString(),
  });
}

export default USERS;

export const getUserById = (id: string) => USERS.find(u => u.id === id);
export const getUserByEmail = (email: string) => USERS.find(u => u.email === email);

/**
 * Mock passwords for testing
 * In production, passwords would be hashed and stored securely
 */
export const MOCK_PASSWORDS: Record<string, string> = {
  'somchai@example.com': 'password123',
  'sarah.johnson@example.com': 'password123',
};

// Generate passwords for all other users (all use "password123" for testing)
for (let i = 3; i <= 50; i++) {
  MOCK_PASSWORDS[`user${i}@example.com`] = 'password123';
}
