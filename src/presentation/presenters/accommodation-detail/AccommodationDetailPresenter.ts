/**
 * Accommodation Detail Presenter
 * Handles business logic for accommodation detail page
 */

import {
  getAccommodationById,
  ACCOMMODATIONS,
  type Accommodation,
} from "@/src/data/mock/accommodations.mock";
import { DESTINATIONS } from "@/src/data/master/destinations.master";
import { ACCOMMODATION_TYPES } from "@/src/data/master/accommodation-types.master";
import { AMENITIES } from "@/src/data/master/amenities.master";

export interface AccommodationDetailViewModel {
  accommodation: Accommodation | null;
  destination: { id: string; name: string; country: string } | null;
  type: { id: string; name: string; icon: string } | null;
  amenities: Array<{ id: string; name: string; icon: string; category: string }>;
  similarAccommodations: Accommodation[];
  reviews: Review[];
  host: Host;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

export interface Host {
  id: string;
  name: string;
  avatar: string;
  joinedDate: string;
  responseRate: number;
  responseTime: string;
  verified: boolean;
  properties: number;
  totalReviews: number;
  averageRating: number;
}

/**
 * Presenter for Accommodation Detail page
 */
export class AccommodationDetailPresenter {
  /**
   * Get view model for accommodation detail
   */
  async getViewModel(accommodationId: string): Promise<AccommodationDetailViewModel> {
    const accommodation = getAccommodationById(accommodationId);

    if (!accommodation) {
      return {
        accommodation: null,
        destination: null,
        type: null,
        amenities: [],
        similarAccommodations: [],
        reviews: [],
        host: this.getMockHost(),
      };
    }

    // Get destination
    const destination = DESTINATIONS.find((d) => d.id === accommodation.destinationId);

    // Get type
    const type = ACCOMMODATION_TYPES.find((t) => t.id === accommodation.typeId);

    // Get amenities with details
    const amenities = accommodation.amenityIds
      .map((id) => AMENITIES.find((a) => a.id === id))
      .filter((a) => a !== undefined)
      .map((a) => ({
        id: a!.id,
        name: a!.name,
        icon: a!.icon,
        category: a!.category,
      }));

    // Get similar accommodations (same destination, different property)
    const similarAccommodations = ACCOMMODATIONS.filter(
      (acc) =>
        acc.destinationId === accommodation.destinationId &&
        acc.id !== accommodation.id
    ).slice(0, 4);

    // Generate mock reviews
    const reviews = this.generateMockReviews(accommodation.reviewCount);

    // Mock host
    const host = this.getMockHost();

    return {
      accommodation,
      destination: destination
        ? { id: destination.id, name: destination.name, country: destination.country }
        : null,
      type: type ? { id: type.id, name: type.name, icon: type.icon } : null,
      amenities,
      similarAccommodations,
      reviews,
      host,
    };
  }

  /**
   * Generate mock reviews
   */
  private generateMockReviews(count: number): Review[] {
    const reviews: Review[] = [];
    const reviewTexts = [
      "ที่พักสะอาดมาก บริการดีเยี่ยม แนะนำเลยครับ",
      "ทำเลดีมาก ใกล้ทะเล วิวสวย อาหารเช้าอร่อย",
      "คุ้มค่ากับราคามาก เจ้าของใจดี ห้องกว้าง",
      "บรรยากาศดี เงียบสงบ เหมาะกับการพักผ่อน",
      "สิ่งอำนวยความสะดวกครบครัน สระว่ายน้ำสวย",
    ];

    const names = [
      "สมชาย",
      "วิไล",
      "ประยุทธ์",
      "สมหญิง",
      "นิรันดร์",
      "Sarah",
      "John",
      "Lisa",
    ];

    for (let i = 0; i < Math.min(count, 10); i++) {
      reviews.push({
        id: `review-${i + 1}`,
        userId: `user-${i + 1}`,
        userName: names[i % names.length],
        userAvatar: `/avatars/user-${i + 1}.jpg`,
        rating: 7 + Math.random() * 3, // 7.0 - 10.0
        comment: reviewTexts[i % reviewTexts.length],
        date: new Date(2025, 9, 11 - i).toISOString(),
        helpful: Math.floor(Math.random() * 20),
      });
    }

    return reviews;
  }

  /**
   * Get mock host data
   */
  private getMockHost(): Host {
    return {
      id: "host-001",
      name: "คุณสมชาย",
      avatar: "/avatars/host-001.jpg",
      joinedDate: "2022-03-15",
      responseRate: 98,
      responseTime: "ภายใน 1 ชั่วโมง",
      verified: true,
      properties: 5,
      totalReviews: 234,
      averageRating: 9.2,
    };
  }

  /**
   * Generate metadata
   */
  async generateMetadata(accommodationId: string) {
    const accommodation = getAccommodationById(accommodationId);

    if (!accommodation) {
      return {
        title: "ไม่พบที่พัก | Triply",
        description: "ไม่พบที่พักที่คุณกำลังค้นหา",
      };
    }

    const destination = DESTINATIONS.find((d) => d.id === accommodation.destinationId);

    return {
      title: `${accommodation.name} | Triply`,
      description: accommodation.description,
      keywords: [
        accommodation.name,
        destination?.name || "",
        "ที่พัก",
        "จองที่พัก",
        "โรงแรม",
      ],
    };
  }
}

/**
 * Factory for creating AccommodationDetailPresenter
 */
export class AccommodationDetailPresenterFactory {
  static async createServer(): Promise<AccommodationDetailPresenter> {
    return new AccommodationDetailPresenter();
  }

  static async createClient(): Promise<AccommodationDetailPresenter> {
    return new AccommodationDetailPresenter();
  }
}
