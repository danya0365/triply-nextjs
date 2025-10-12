/**
 * Trips Presenter
 * Handles business logic for trips page
 */

import { getTripsByCreator, type Trip } from "@/src/data/mock/trips.mock";

export interface TripStats {
  totalTrips: number;
  plannedTrips: number;
  ongoingTrips: number;
  completedTrips: number;
  totalDestinations: number;
}

export interface TripsViewModel {
  trips: Trip[];
  stats: TripStats;
}

/**
 * Presenter for Trips page
 * Follows Clean Architecture with proper separation of concerns
 */
export class TripsPresenter {
  /**
   * Get view model for the trips page
   */
  async getViewModel(userId: string): Promise<TripsViewModel> {
    try {
      // Get trips from mock data
      const trips = getTripsByCreator(userId);

      // Calculate stats
      const stats = this.calculateStats(trips);

      return {
        trips,
        stats,
      };
    } catch (error) {
      console.error("Error in TripsPresenter.getViewModel:", error);
      throw error;
    }
  }

  /**
   * Calculate trip statistics
   */
  private calculateStats(trips: Trip[]): TripStats {
    const planned = trips.filter((t) => t.planningStage === "planning");
    const ongoing = trips.filter((t) => t.planningStage === "booked");
    const completed = trips.filter((t) => t.planningStage === "completed");

    // Count unique destinations
    const uniqueDestinations = new Set(
      trips.flatMap((t) => t.destinationIds)
    );

    return {
      totalTrips: trips.length,
      plannedTrips: planned.length,
      ongoingTrips: ongoing.length,
      completedTrips: completed.length,
      totalDestinations: uniqueDestinations.size,
    };
  }

  /**
   * Delete a trip
   */
  async deleteTrip(tripId: string): Promise<boolean> {
    try {
      // TODO: In real app, this would call API to delete trip
      console.log("Deleting trip:", tripId);
      return true;
    } catch (error) {
      console.error("Error in TripsPresenter.deleteTrip:", error);
      throw error;
    }
  }

  /**
   * Generate metadata for the page
   */
  async generateMetadata() {
    return {
      title: "ทริปของฉัน | Triply",
      description: "ดูและจัดการทริปท่องเที่ยวทั้งหมดของคุณ",
      keywords: ["trips", "travel plans", "my trips"],
    };
  }
}

/**
 * Factory for creating TripsPresenter instances
 */
export class TripsPresenterFactory {
  static async createServer(): Promise<TripsPresenter> {
    return new TripsPresenter();
  }

  static async createClient(): Promise<TripsPresenter> {
    return new TripsPresenter();
  }
}
