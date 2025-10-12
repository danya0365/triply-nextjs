/**
 * Destination Detail Presenter
 * Handles business logic for destination detail page
 */

import { DESTINATIONS, type Destination } from "@/src/data/master/destinations.master";
import { ACCOMMODATIONS } from "@/src/data/mock/accommodations.mock";

export interface DestinationDetailViewModel {
  destination: Destination;
  relatedDestinations: Destination[];
  nearbyAccommodations: Array<{
    id: string;
    name: string;
    pricePerNight: number;
    rating: number;
  }>;
}

/**
 * Presenter for Destination Detail page
 */
export class DestinationDetailPresenter {
  /**
   * Get view model for destination detail
   */
  async getViewModel(slug: string): Promise<DestinationDetailViewModel | null> {
    try {
      // Find destination by slug
      const destination = DESTINATIONS.find((d) => d.slug === slug);

      if (!destination) {
        return null;
      }

      // Get related destinations (same region or similar tags)
      const relatedDestinations = DESTINATIONS.filter(
        (d) =>
          d.id !== destination.id &&
          (d.region === destination.region ||
            d.tags.some((tag) => destination.tags.includes(tag)))
      )
        .sort((a, b) => b.popularityScore - a.popularityScore)
        .slice(0, 4);

      // Get nearby accommodations (filter by destinationId)
      const nearbyAccommodations = ACCOMMODATIONS.filter(
        (acc) => acc.destinationId === destination.id
      )
        .slice(0, 6)
        .map((acc) => ({
          id: acc.id,
          name: acc.name,
          pricePerNight: acc.basePricePerNight,
          rating: acc.averageRating,
        }));

      return {
        destination,
        relatedDestinations,
        nearbyAccommodations,
      };
    } catch (error) {
      console.error("Error in DestinationDetailPresenter.getViewModel:", error);
      throw error;
    }
  }

  /**
   * Generate metadata
   */
  async generateMetadata(slug: string) {
    const destination = DESTINATIONS.find((d) => d.slug === slug);

    if (!destination) {
      return {
        title: "Destination Not Found | Triply",
      };
    }

    return {
      title: `${destination.name} - ${destination.country} | Triply`,
      description: destination.description,
      keywords: [destination.name, destination.nameEn, ...destination.tags],
    };
  }
}

export class DestinationDetailPresenterFactory {
  static async createServer(): Promise<DestinationDetailPresenter> {
    return new DestinationDetailPresenter();
  }

  static async createClient(): Promise<DestinationDetailPresenter> {
    return new DestinationDetailPresenter();
  }
}
