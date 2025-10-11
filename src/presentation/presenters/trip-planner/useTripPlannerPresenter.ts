/**
 * Trip Planner Presenter Hook
 * Client-side hook for trip planner page
 */

"use client";

import { useState, useCallback } from "react";
import type {
  TripPlannerViewModel,
  TripPlannerFilters,
} from "./TripPlannerPresenter";
import type { Trip } from "@/src/data/mock/trips.mock";

export function useTripPlannerPresenter(initialViewModel: TripPlannerViewModel) {
  const [viewModel] = useState<TripPlannerViewModel>(initialViewModel);
  const [filters, setFilters] = useState<TripPlannerFilters>({});
  const [error, setError] = useState<string | null>(null);

  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // View mode
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeTab, setActiveTab] = useState<"browse" | "my-trips">("browse");

  // Filter actions
  const updateFilters = useCallback((newFilters: Partial<TripPlannerFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    // TODO: Reload data with new filters
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({});
    // TODO: Reload data
  }, []);

  // Search
  const handleSearch = useCallback(
    (query: string) => {
      updateFilters({ search: query });
    },
    [updateFilters]
  );

  // Sort
  const handleSort = useCallback(
    (sortBy: TripPlannerFilters["sortBy"]) => {
      updateFilters({ sortBy });
    },
    [updateFilters]
  );

  // Create trip
  const openCreateModal = useCallback(() => {
    setShowCreateModal(true);
  }, []);

  const closeCreateModal = useCallback(() => {
    setShowCreateModal(false);
  }, []);

  const handleCreateTrip = useCallback(async (data: Partial<Trip>) => {
    try {
      // TODO: Call API to create trip
      console.log("Creating trip:", data);
      setShowCreateModal(false);
      // TODO: Refresh trips list
    } catch (err) {
      setError("ไม่สามารถสร้างทริปได้");
      console.error("Error creating trip:", err);
    }
  }, []);

  // Trip detail
  const openTripDetail = useCallback((trip: Trip) => {
    setSelectedTrip(trip);
    setShowDetailModal(true);
  }, []);

  const closeTripDetail = useCallback(() => {
    setShowDetailModal(false);
    setSelectedTrip(null);
  }, []);

  // Clone trip
  const handleCloneTrip = useCallback(async (trip: Trip) => {
    try {
      // TODO: Call API to clone trip
      console.log("Cloning trip:", trip.id);
      // TODO: Refresh trips list
    } catch (err) {
      setError("ไม่สามารถคัดลอกทริปได้");
      console.error("Error cloning trip:", err);
    }
  }, []);

  // Delete trip
  const handleDeleteTrip = useCallback(async (tripId: string) => {
    try {
      // TODO: Call API to delete trip
      console.log("Deleting trip:", tripId);
      // TODO: Refresh trips list
    } catch (err) {
      setError("ไม่สามารถลบทริปได้");
      console.error("Error deleting trip:", err);
    }
  }, []);

  // Toggle view mode
  const toggleViewMode = useCallback(() => {
    setViewMode((prev) => (prev === "grid" ? "list" : "grid"));
  }, []);

  return {
    // State
    viewModel,
    filters,
    error,
    viewMode,
    activeTab,

    // Modal states
    showCreateModal,
    selectedTrip,
    showDetailModal,

    // Actions
    setActiveTab,
    updateFilters,
    clearFilters,
    handleSearch,
    handleSort,
    toggleViewMode,

    // Trip actions
    openCreateModal,
    closeCreateModal,
    handleCreateTrip,
    openTripDetail,
    closeTripDetail,
    handleCloneTrip,
    handleDeleteTrip,
  };
}
