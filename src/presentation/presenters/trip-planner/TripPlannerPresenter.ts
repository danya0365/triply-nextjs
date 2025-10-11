/**
 * Trip Planner Presenter
 * Handles business logic for trip planning page
 */

import {
  getTripsByCreator,
  getPublicTrips,
  type Trip,
} from "@/src/data/mock/trips.mock";
import { DESTINATIONS } from "@/src/data/master/destinations.master";
import { TRIP_THEMES } from "@/src/data/master/trip-themes.master";

export interface TripPlannerFilters {
  search?: string;
  themeId?: string;
  destinationId?: string;
  status?: Trip["planningStage"] | "all";
  sortBy?: "recent" | "popular" | "budget-asc" | "budget-desc";
}

export interface TripPlannerViewModel {
  trips: Trip[];
  myTrips: Trip[];
  publicTrips: Trip[];
  totalTrips: number;
  themes: Array<{ id: string; name: string; icon: string }>;
  destinations: Array<{ id: string; name: string }>;
  stats: {
    totalTrips: number;
    completedTrips: number;
    upcomingTrips: number;
    totalBudget: number;
  };
}

/**
 * Presenter for Trip Planner page
 */
export class TripPlannerPresenter {
  /**
   * Get view model for trip planner
   */
  async getViewModel(
    filters: TripPlannerFilters = {},
    userId?: string
  ): Promise<TripPlannerViewModel> {
    // Get user's trips
    const myTrips = userId ? getTripsByCreator(userId) : [];

    // Get public trips
    const publicTrips = getPublicTrips();

    // Apply filters
    let filteredTrips = [...publicTrips];

    // Search filter
    if (filters.search) {
      const query = filters.search.toLowerCase();
      filteredTrips = filteredTrips.filter(
        (trip) =>
          trip.name.toLowerCase().includes(query) ||
          trip.description.toLowerCase().includes(query)
      );
    }

    // Theme filter
    if (filters.themeId) {
      filteredTrips = filteredTrips.filter((trip) => trip.themeId === filters.themeId);
    }

    // Destination filter
    if (filters.destinationId) {
      filteredTrips = filteredTrips.filter((trip) =>
        trip.destinationIds.includes(filters.destinationId!)
      );
    }

    // Status filter
    if (filters.status && filters.status !== "all") {
      filteredTrips = filteredTrips.filter((trip) => trip.planningStage === filters.status);
    }

    // Sort
    filteredTrips = this.sortTrips(filteredTrips, filters.sortBy);

    // Calculate stats
    const stats = {
      totalTrips: myTrips.length,
      completedTrips: myTrips.filter((t) => t.planningStage === "completed").length,
      upcomingTrips: myTrips.filter(
        (t) => t.planningStage === "ready" || t.planningStage === "booked"
      ).length,
      totalBudget: myTrips.reduce((sum, t) => sum + t.totalBudget, 0),
    };

    // Get filter options
    const themes = TRIP_THEMES.map((theme) => ({
      id: theme.id,
      name: theme.name,
      icon: theme.icon,
    }));

    const destinations = DESTINATIONS.map((dest) => ({
      id: dest.id,
      name: dest.name,
    }));

    return {
      trips: filteredTrips,
      myTrips,
      publicTrips,
      totalTrips: filteredTrips.length,
      themes,
      destinations,
      stats,
    };
  }

  /**
   * Sort trips
   */
  private sortTrips(trips: Trip[], sortBy?: string): Trip[] {
    const sorted = [...trips];

    switch (sortBy) {
      case "popular":
        return sorted.sort((a, b) => b.viewCount - a.viewCount);
      case "budget-asc":
        return sorted.sort((a, b) => a.totalBudget - b.totalBudget);
      case "budget-desc":
        return sorted.sort((a, b) => b.totalBudget - a.totalBudget);
      case "recent":
      default:
        return sorted.sort(
          (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
    }
  }

  /**
   * Create new trip
   */
  async createTrip(data: Partial<Trip>): Promise<Trip> {
    // TODO: Implement actual trip creation with API
    const newTrip: Trip = {
      id: `trip-${Date.now()}`,
      slug: `trip-${Date.now()}`,
      creatorId: data.creatorId || "current-user",
      name: data.name || "New Trip",
      description: data.description || "",
      coverImage: data.coverImage || "/images/trips/default-cover.jpg",
      startDate: data.startDate || new Date().toISOString(),
      endDate: data.endDate || new Date().toISOString(),
      durationDays: data.durationDays || 1,
      destinationIds: data.destinationIds || [],
      themeId: data.themeId || TRIP_THEMES[0].id,
      numAdults: data.numAdults || 2,
      numChildren: data.numChildren || 0,
      totalBudget: data.totalBudget || 0,
      currency: "THB",
      budgetBreakdown: data.budgetBreakdown || {
        accommodation: 0,
        activities: 0,
        food: 0,
        transport: 0,
        shopping: 0,
        misc: 0,
      },
      planningStage: "draft",
      completionPercentage: 0,
      isPublic: false,
      viewCount: 0,
      likeCount: 0,
      cloneCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return newTrip;
  }

  /**
   * Generate metadata
   */
  async generateMetadata() {
    return {
      title: "วางแผนทริป | Triply",
      description:
        "วางแผนการเดินทางของคุณ สร้างทริป จัดการงบประมาณ เพิ่มจุดหมายและที่พัก แชร์ทริปกับเพื่อน",
      keywords: ["วางแผนทริป", "trip planner", "ทริป", "ท่องเที่ยว", "งบประมาณ"],
    };
  }
}

/**
 * Factory for creating TripPlannerPresenter
 */
export class TripPlannerPresenterFactory {
  static async createServer(): Promise<TripPlannerPresenter> {
    return new TripPlannerPresenter();
  }

  static async createClient(): Promise<TripPlannerPresenter> {
    return new TripPlannerPresenter();
  }
}
