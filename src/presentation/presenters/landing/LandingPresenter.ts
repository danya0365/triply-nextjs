/**
 * Landing Page Presenter
 * Handles business logic for the landing page using Mock Data
 */

import { getPopularDestinations } from "@/src/data/master/destinations.master";
import { getFeaturedAccommodations, ACCOMMODATIONS } from "@/src/data/mock/accommodations.mock";
import { USERS } from "@/src/data/mock/users.mock";

// View Model Interfaces
interface Destination {
  id: string;
  name: string;
  country: string;
  propertiesCount: number;
  startingPrice: number;
  tags: string[];
}

interface Accommodation {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviewCount: number;
  pricePerNight: number;
  amenities: string[];
  isFeatured: boolean;
}

interface Statistics {
  totalProperties: number;
  destinations: number;
  happyTravelers: number;
  averageRating: number;
}

export interface LandingViewModel {
  destinations: Destination[];
  accommodations: Accommodation[];
  statistics: Statistics;
}

/**
 * Presenter for Landing page
 * Follows Clean Architecture with proper separation of concerns
 */
export class LandingPresenter {
  /**
   * Get view model for the landing page
   */
  async getViewModel(): Promise<LandingViewModel> {
    // Use real mock data
    const popularDests = getPopularDestinations(4);
    const featuredAccs = getFeaturedAccommodations(2);
    
    // Map destinations to view model format
    const destinations: Destination[] = popularDests.map(dest => {
      const destAccommodations = ACCOMMODATIONS.filter(acc => acc.destinationId === dest.id);
      const prices = destAccommodations.map(acc => acc.basePricePerNight);
      const minPrice = prices.length > 0 ? Math.min(...prices) : dest.averageBudget.min;
      
      return {
        id: dest.id,
        name: dest.name,
        country: dest.country,
        propertiesCount: destAccommodations.length,
        startingPrice: minPrice,
        tags: dest.tags.slice(0, 3),
      };
    });
    
    // Map accommodations to view model format
    const accommodations: Accommodation[] = featuredAccs.map(acc => {
      const destination = popularDests.find(d => d.id === acc.destinationId);
      
      return {
        id: acc.id,
        name: acc.name,
        location: destination ? `${destination.name}, ${destination.country}` : acc.address,
        rating: Math.round(acc.averageRating * 10) / 10,
        reviewCount: acc.reviewCount,
        pricePerNight: acc.basePricePerNight,
        amenities: acc.highlights.slice(0, 4),
        isFeatured: acc.isFeatured,
      };
    });
    
    // Calculate statistics from mock data
    const totalBookings = USERS.reduce((sum, user) => sum + user.totalBookings, 0);
    const avgRating = ACCOMMODATIONS.reduce((sum, acc) => sum + acc.averageRating, 0) / ACCOMMODATIONS.length;
    
    const statistics: Statistics = {
      totalProperties: ACCOMMODATIONS.length,
      destinations: popularDests.length,
      happyTravelers: totalBookings,
      averageRating: Math.round(avgRating * 10) / 10,
    };
    
    return {
      destinations,
      accommodations,
      statistics,
    };
  }

  /**
   * Generate metadata for the page
   */
  async generateMetadata() {
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
  }
}

/**
 * Factory for creating LandingPresenter instances
 */
export class LandingPresenterFactory {
  static async createServer(): Promise<LandingPresenter> {
    return new LandingPresenter();
  }

  static async createClient(): Promise<LandingPresenter> {
    return new LandingPresenter();
  }
}
