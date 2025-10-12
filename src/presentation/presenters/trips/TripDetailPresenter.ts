/**
 * Trip Detail Presenter
 * Handles business logic for trip detail page
 */

import { getTripById, type Trip } from "@/src/data/mock/trips.mock";
import { getUserById } from "@/src/data/mock/users.mock";
import { DESTINATIONS } from "@/src/data/master/destinations.master";

export interface TripDetailViewModel {
  trip: Trip;
  creator: {
    id: string;
    displayName: string;
    avatarUrl: string;
  } | null;
  destinations: Array<{
    id: string;
    name: string;
    slug: string;
    order: number;
  }>;
}

/**
 * Presenter for Trip Detail page
 */
export class TripDetailPresenter {
  /**
   * Get view model for trip detail
   */
  async getViewModel(tripId: string): Promise<TripDetailViewModel | null> {
    try {
      const trip = getTripById(tripId);

      if (!trip) {
        return null;
      }

      // Get creator info
      const creator = getUserById(trip.creatorId);

      // Get destination details
      const destinations = trip.destinationIds
        .map((destId, index) => {
          const dest = DESTINATIONS.find((d) => d.id === destId);
          return dest
            ? {
                id: dest.id,
                name: dest.name,
                slug: dest.slug,
                order: index + 1,
              }
            : null;
        })
        .filter((d) => d !== null) as Array<{
        id: string;
        name: string;
        slug: string;
        order: number;
      }>;

      return {
        trip,
        creator: creator
          ? {
              id: creator.id,
              displayName: creator.displayName,
              avatarUrl: creator.avatarUrl,
            }
          : null,
        destinations,
      };
    } catch (error) {
      console.error("Error in TripDetailPresenter.getViewModel:", error);
      throw error;
    }
  }

  /**
   * Generate metadata
   */
  async generateMetadata(tripId: string) {
    const trip = getTripById(tripId);

    if (!trip) {
      return {
        title: "Trip Not Found | Triply",
      };
    }

    return {
      title: `${trip.name} | Triply`,
      description: trip.description,
      keywords: ["trip", trip.name, ...trip.destinationIds],
    };
  }
}

export class TripDetailPresenterFactory {
  static async createServer(): Promise<TripDetailPresenter> {
    return new TripDetailPresenter();
  }

  static async createClient(): Promise<TripDetailPresenter> {
    return new TripDetailPresenter();
  }
}
