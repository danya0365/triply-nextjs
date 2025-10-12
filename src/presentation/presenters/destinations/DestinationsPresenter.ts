/**
 * Destinations Presenter
 * Handles business logic for destinations list page
 */

import { DESTINATIONS, type Destination } from "@/src/data/master/destinations.master";

export interface DestinationsViewModel {
  destinations: Destination[];
  totalCount: number;
  regions: string[];
  tags: string[];
}

/**
 * Presenter for Destinations List page
 */
export class DestinationsPresenter {
  /**
   * Get view model for destinations list
   */
  async getViewModel(filters?: {
    region?: string;
    tag?: string;
    search?: string;
  }): Promise<DestinationsViewModel> {
    try {
      let filtered = [...DESTINATIONS];

      // Apply filters
      if (filters?.region) {
        filtered = filtered.filter((d) => d.region === filters.region);
      }

      if (filters?.tag && filters.tag.trim()) {
        filtered = filtered.filter((d) => d.tags.includes(filters.tag!));
      }

      if (filters?.search && filters.search.trim()) {
        const searchLower = filters.search.toLowerCase().trim();
        filtered = filtered.filter(
          (d) =>
            d.name.toLowerCase().includes(searchLower) ||
            d.nameEn.toLowerCase().includes(searchLower) ||
            d.country.toLowerCase().includes(searchLower)
        );
      }

      // Sort by popularity
      filtered.sort((a, b) => b.popularityScore - a.popularityScore);

      // Get unique regions and tags
      const regions = Array.from(new Set(DESTINATIONS.map((d) => d.region)));
      const tags = Array.from(
        new Set(DESTINATIONS.flatMap((d) => d.tags))
      ).sort();

      return {
        destinations: filtered,
        totalCount: filtered.length,
        regions,
        tags,
      };
    } catch (error) {
      console.error("Error in DestinationsPresenter.getViewModel:", error);
      throw error;
    }
  }

  /**
   * Generate metadata
   */
  async generateMetadata() {
    return {
      title: "Destinations | Triply",
      description: "Explore 50+ amazing travel destinations in Thailand and Asia",
      keywords: ["destinations", "travel", "thailand", "asia", "tourism"],
    };
  }
}

export class DestinationsPresenterFactory {
  static async createServer(): Promise<DestinationsPresenter> {
    return new DestinationsPresenter();
  }

  static async createClient(): Promise<DestinationsPresenter> {
    return new DestinationsPresenter();
  }
}
