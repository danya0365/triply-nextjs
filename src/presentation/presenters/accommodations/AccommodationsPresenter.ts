/**
 * Accommodations Page Presenter
 * Handles business logic for the accommodations browse page
 */

import {
  ACCOMMODATIONS,
  filterAccommodations,
  searchAccommodations,
  type Accommodation,
} from "@/src/data/mock/accommodations.mock";
import { DESTINATIONS } from "@/src/data/master/destinations.master";
import { ACCOMMODATION_TYPES } from "@/src/data/master/accommodation-types.master";
import { AMENITIES } from "@/src/data/master/amenities.master";

export interface AccommodationFilters {
  search?: string;
  destinationId?: string;
  typeId?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  amenityIds?: string[];
  sortBy?: "price-asc" | "price-desc" | "rating" | "popular";
}

export interface AccommodationsViewModel {
  accommodations: Accommodation[];
  totalCount: number;
  destinations: Array<{ id: string; name: string; count: number }>;
  types: Array<{ id: string; name: string; count: number }>;
  amenities: Array<{ id: string; name: string; icon: string }>;
  priceRange: { min: number; max: number };
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
}

/**
 * Presenter for Accommodations browse page
 */
export class AccommodationsPresenter {
  private readonly ITEMS_PER_PAGE = 12;

  /**
   * Get view model for accommodations page
   */
  async getViewModel(
    filters: AccommodationFilters = {},
    page: number = 1
  ): Promise<AccommodationsViewModel> {
    // Apply filters
    let filtered = ACCOMMODATIONS;

    // Search filter
    if (filters.search) {
      filtered = searchAccommodations(filters.search);
    }

    // Apply other filters
    filtered = filterAccommodations({
      destinationId: filters.destinationId,
      typeId: filters.typeId,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      minRating: filters.minRating,
      amenityIds: filters.amenityIds,
    });

    // Sort
    filtered = this.sortAccommodations(filtered, filters.sortBy);

    // Pagination
    const totalCount = filtered.length;
    const totalPages = Math.ceil(totalCount / this.ITEMS_PER_PAGE);
    const startIndex = (page - 1) * this.ITEMS_PER_PAGE;
    const paginatedResults = filtered.slice(
      startIndex,
      startIndex + this.ITEMS_PER_PAGE
    );

    // Get filter options
    const destinations = this.getDestinationOptions();
    const types = this.getTypeOptions();
    const amenities = this.getAmenityOptions();
    const priceRange = this.getPriceRange();

    return {
      accommodations: paginatedResults,
      totalCount,
      destinations,
      types,
      amenities,
      priceRange,
      currentPage: page,
      totalPages,
      itemsPerPage: this.ITEMS_PER_PAGE,
    };
  }

  /**
   * Sort accommodations
   */
  private sortAccommodations(
    accommodations: Accommodation[],
    sortBy?: string
  ): Accommodation[] {
    const sorted = [...accommodations];

    switch (sortBy) {
      case "price-asc":
        return sorted.sort((a, b) => a.basePricePerNight - b.basePricePerNight);
      case "price-desc":
        return sorted.sort((a, b) => b.basePricePerNight - a.basePricePerNight);
      case "rating":
        return sorted.sort((a, b) => b.averageRating - a.averageRating);
      case "popular":
        return sorted.sort((a, b) => b.totalBookings - a.totalBookings);
      default:
        return sorted;
    }
  }

  /**
   * Get destination filter options
   */
  private getDestinationOptions() {
    return DESTINATIONS.map((dest) => {
      const count = ACCOMMODATIONS.filter(
        (acc) => acc.destinationId === dest.id
      ).length;
      return {
        id: dest.id,
        name: dest.name,
        count,
      };
    }).filter((dest) => dest.count > 0);
  }

  /**
   * Get type filter options
   */
  private getTypeOptions() {
    return ACCOMMODATION_TYPES.map((type) => {
      const count = ACCOMMODATIONS.filter((acc) => acc.typeId === type.id)
        .length;
      return {
        id: type.id,
        name: type.name,
        count,
      };
    }).filter((type) => type.count > 0);
  }

  /**
   * Get amenity filter options
   */
  private getAmenityOptions() {
    // Get top 10 most common amenities
    const amenityCounts = new Map<string, number>();

    AMENITIES.forEach((amenity) => {
      const count = ACCOMMODATIONS.filter((acc) =>
        acc.amenityIds.includes(amenity.id)
      ).length;
      if (count > 0) {
        amenityCounts.set(amenity.id, count);
      }
    });

    return Array.from(amenityCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([id]) => {
        const amenity = AMENITIES.find((a) => a.id === id)!;
        return {
          id: amenity.id,
          name: amenity.name,
          icon: amenity.icon,
        };
      });
  }

  /**
   * Get price range
   */
  private getPriceRange() {
    const prices = ACCOMMODATIONS.map((acc) => acc.basePricePerNight);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    };
  }

  /**
   * Generate metadata
   */
  async generateMetadata() {
    return {
      title: "ค้นหาที่พัก | Triply",
      description:
        "ค้นหาและจองที่พักที่เหมาะกับคุณ โรงแรม รีสอร์ท วิลล่า และอื่นๆ มากกว่า 100 ที่พักทั่วประเทศไทยและเอเชีย",
      keywords: ["ที่พัก", "โรงแรม", "รีสอร์ท", "วิลล่า", "จองที่พัก"],
    };
  }
}

/**
 * Factory for creating AccommodationsPresenter
 */
export class AccommodationsPresenterFactory {
  static async createServer(): Promise<AccommodationsPresenter> {
    return new AccommodationsPresenter();
  }

  static async createClient(): Promise<AccommodationsPresenter> {
    return new AccommodationsPresenter();
  }
}
