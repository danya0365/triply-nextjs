import { createServerSupabaseClient } from "@/src/infrastructure/config/supabase-server-client";
import { createClientSupabaseClient } from "@/src/infrastructure/config/supabase-client-client";
import type { SupabaseClient } from "@supabase/supabase-js";

// Mock data imports (will be replaced with real data later)
const FEATURED_DESTINATIONS = [
  {
    id: "1",
    name: "ภูเก็ต",
    country: "ประเทศไทย",
    image: "/images/destinations/phuket.jpg",
    propertiesCount: 1250,
    startingPrice: 800,
    tags: ["beach", "tropical", "luxury"],
  },
  {
    id: "2",
    name: "เชียงใหม่",
    country: "ประเทศไทย",
    image: "/images/destinations/chiangmai.jpg",
    propertiesCount: 850,
    startingPrice: 500,
    tags: ["mountain", "culture", "nature"],
  },
  {
    id: "3",
    name: "กรุงเทพฯ",
    country: "ประเทศไทย",
    image: "/images/destinations/bangkok.jpg",
    propertiesCount: 2100,
    startingPrice: 600,
    tags: ["city", "shopping", "food"],
  },
  {
    id: "4",
    name: "บาหลี",
    country: "อินโดนีเซีย",
    image: "/images/destinations/bali.jpg",
    propertiesCount: 1500,
    startingPrice: 1200,
    tags: ["beach", "culture", "relaxation"],
  },
];

const TRENDING_ACCOMMODATIONS = [
  {
    id: "1",
    name: "Luxury Beach Resort & Spa",
    location: "ภูเก็ต, ประเทศไทย",
    image: "/images/accommodations/resort-1.jpg",
    rating: 9.2,
    reviewCount: 1234,
    pricePerNight: 3500,
    amenities: ["pool", "spa", "beach", "wifi"],
    isFeatured: true,
  },
  {
    id: "2",
    name: "Mountain View Villa",
    location: "เชียงใหม่, ประเทศไทย",
    image: "/images/accommodations/villa-1.jpg",
    rating: 9.5,
    reviewCount: 856,
    pricePerNight: 2800,
    amenities: ["pool", "mountain-view", "wifi", "parking"],
    isFeatured: true,
  },
];

const STATISTICS = {
  totalProperties: 5200,
  destinations: 150,
  happyTravelers: 45000,
  averageRating: 4.8,
};

export interface Destination {
  id: string;
  name: string;
  country: string;
  image: string;
  propertiesCount: number;
  startingPrice: number;
  tags: string[];
}

export interface Accommodation {
  id: string;
  name: string;
  location: string;
  image: string;
  rating: number;
  reviewCount: number;
  pricePerNight: number;
  amenities: string[];
  isFeatured: boolean;
}

export interface Statistics {
  totalProperties: number;
  destinations: number;
  happyTravelers: number;
  averageRating: number;
}

export interface LandingViewModel {
  featuredDestinations: Destination[];
  trendingAccommodations: Accommodation[];
  statistics: Statistics;
}

/**
 * Presenter for Landing page
 * Follows Clean Architecture with proper separation of concerns
 */
export class LandingPresenter {
  constructor(private readonly supabase: SupabaseClient) {}

  /**
   * Get view model for the landing page
   */
  async getViewModel(): Promise<LandingViewModel> {
    try {
      // TODO: Replace with real data from Supabase
      // For now, return mock data
      return {
        featuredDestinations: FEATURED_DESTINATIONS,
        trendingAccommodations: TRENDING_ACCOMMODATIONS,
        statistics: STATISTICS,
      };
    } catch (error) {
      console.error("Error fetching landing data:", error);
      throw error;
    }
  }

  /**
   * Generate metadata for the page
   */
  async generateMetadata() {
    try {
      return {
        title: "Triply | แพลตฟอร์มจองที่พักและวางแผนการเดินทาง",
        description:
          "วางแผนการเดินทางที่สมบูรณ์แบบกับ Triply จองที่พัก วางแผนทริป และรับรางวัลทุกการเดินทาง พร้อมระบบ Goals, Missions และ Achievements",
        keywords: [
          "จองที่พัก",
          "วางแผนเที่ยว",
          "ท่องเที่ยว",
          "โรงแรม",
          "รีสอร์ท",
          "Triply",
          "travel planning",
          "accommodation booking",
        ],
      };
    } catch (error) {
      console.error("Error generating metadata:", error);
      throw error;
    }
  }
}

/**
 * Factory for creating LandingPresenter instances
 */
export class LandingPresenterFactory {
  static async createServer(): Promise<LandingPresenter> {
    const supabase = createServerSupabaseClient();
    return new LandingPresenter(supabase);
  }

  static async createClient(): Promise<LandingPresenter> {
    const supabase = createClientSupabaseClient();
    return new LandingPresenter(supabase);
  }
}
