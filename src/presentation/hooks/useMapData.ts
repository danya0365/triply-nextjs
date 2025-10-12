/**
 * useMapData Hook
 * Business logic for loading and managing map data
 * Integrates with Master Data
 */

import { useEffect, useCallback } from "react";
import { useMapStore } from "@/src/store/mapStore";
import type { Destination } from "@/src/data/master/destinations.master";
import { THAILAND_BOUNDS, SOUTHEAST_ASIA_BOUNDS } from "@/src/utils/map/coordinates";

export interface UseMapDataOptions {
  destinations: Destination[];
  region?: "thailand" | "southeast-asia" | "all";
  autoLoad?: boolean;
}

export function useMapData(options: UseMapDataOptions) {
  const { destinations, region = "thailand", autoLoad = true } = options;

  const {
    setRegion,
    setBounds,
    loadDestinations,
    setLoading,
    markers,
    visibleMarkers,
    selectedMarkerId,
    hoveredMarkerId,
  } = useMapStore();

  /**
   * Load destinations into map
   */
  const loadData = useCallback(() => {
    setLoading(true);

    try {
      // Filter destinations by region
      let filteredDestinations = destinations;

      if (region === "thailand") {
        filteredDestinations = destinations.filter(
          (d) => d.country === "ประเทศไทย" || d.country === "Thailand"
        );
      } else if (region === "southeast-asia") {
        filteredDestinations = destinations.filter((d) =>
          d.region.includes("Southeast Asia")
        );
      }

      // Load into store
      loadDestinations(filteredDestinations);

      // Update bounds
      if (region === "thailand") {
        setBounds(THAILAND_BOUNDS);
      } else if (region === "southeast-asia") {
        setBounds(SOUTHEAST_ASIA_BOUNDS);
      }

      setRegion(region);
    } catch (error) {
      console.error("Error loading map data:", error);
    } finally {
      setLoading(false);
    }
  }, [destinations, region, loadDestinations, setBounds, setRegion, setLoading]);

  /**
   * Auto-load on mount
   */
  useEffect(() => {
    if (autoLoad) {
      loadData();
    }
  }, [autoLoad, loadData]);

  /**
   * Get selected destination
   */
  const getSelectedDestination = useCallback((): Destination | null => {
    if (!selectedMarkerId) return null;

    const marker = markers.find((m) => m.id === selectedMarkerId);
    if (!marker) return null;

    return destinations.find((d) => d.id === marker.destinationId) || null;
  }, [selectedMarkerId, markers, destinations]);

  /**
   * Get hovered destination
   */
  const getHoveredDestination = useCallback((): Destination | null => {
    if (!hoveredMarkerId) return null;

    const marker = markers.find((m) => m.id === hoveredMarkerId);
    if (!marker) return null;

    return destinations.find((d) => d.id === marker.destinationId) || null;
  }, [hoveredMarkerId, markers, destinations]);

  /**
   * Filter destinations by type
   */
  const filterByType = useCallback(
    (types: string[]) => {
      const filtered = destinations.filter((d) =>
        types.some((type) => d.tags.includes(type))
      );

      loadDestinations(filtered);
    },
    [destinations, loadDestinations]
  );

  /**
   * Filter destinations by budget
   */
  const filterByBudget = useCallback(
    (minBudget: number, maxBudget: number) => {
      const filtered = destinations.filter(
        (d) =>
          d.averageBudget.min >= minBudget && d.averageBudget.max <= maxBudget
      );

      loadDestinations(filtered);
    },
    [destinations, loadDestinations]
  );

  /**
   * Search destinations
   */
  const searchDestinations = useCallback(
    (query: string) => {
      const lowerQuery = query.toLowerCase();
      const filtered = destinations.filter(
        (d) =>
          d.name.toLowerCase().includes(lowerQuery) ||
          d.nameEn.toLowerCase().includes(lowerQuery) ||
          d.description.toLowerCase().includes(lowerQuery) ||
          d.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
      );

      loadDestinations(filtered);
    },
    [destinations, loadDestinations]
  );

  /**
   * Reset filters
   */
  const resetFilters = useCallback(() => {
    loadDestinations(destinations);
  }, [destinations, loadDestinations]);

  return {
    loadData,
    getSelectedDestination,
    getHoveredDestination,
    filterByType,
    filterByBudget,
    searchDestinations,
    resetFilters,
    markers,
    visibleMarkers,
    totalDestinations: destinations.length,
    visibleDestinationsCount: visibleMarkers.length,
  };
}
