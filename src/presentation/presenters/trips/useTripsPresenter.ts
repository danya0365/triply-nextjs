/**
 * Trips Presenter Hook
 * Client-side hook for trips page
 */

"use client";

import { useState, useCallback } from "react";
import type { TripsViewModel } from "./TripsPresenter";
import { TripsPresenterFactory } from "./TripsPresenter";

// State interface
export interface TripsPresenterState {
  viewModel: TripsViewModel | null;
  loading: boolean;
  error: string | null;
  filterStage: "all" | "planning" | "booked" | "completed";
  isDeleteModalOpen: boolean;
  selectedTripId: string | null;
}

// Actions interface
export interface TripsPresenterActions {
  refreshData: () => Promise<void>;
  deleteTrip: (tripId: string) => Promise<void>;
  setFilterStage: (stage: "all" | "planning" | "booked" | "completed") => void;
  openDeleteModal: (tripId: string) => void;
  closeDeleteModal: () => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

/**
 * Custom hook for Trips presenter
 * Returns [state, actions] tuple following the pattern
 */
export function useTripsPresenter(
  userId: string,
  initialViewModel: TripsViewModel | null = null
): [TripsPresenterState, TripsPresenterActions] {
  const [viewModel, setViewModel] = useState<TripsViewModel | null>(
    initialViewModel
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filterStage, setFilterStage] = useState<
    "all" | "planning" | "booked" | "completed"
  >("all");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTripId, setSelectedTripId] = useState<string | null>(null);

  /**
   * Refresh data from presenter
   */
  const refreshData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const presenter = await TripsPresenterFactory.createClient();
      const newViewModel = await presenter.getViewModel(userId);
      setViewModel(newViewModel);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      console.error("Error loading trips data:", err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  /**
   * Delete a trip
   */
  const deleteTrip = useCallback(
    async (tripId: string) => {
      setLoading(true);
      setError(null);

      try {
        const presenter = await TripsPresenterFactory.createClient();
        await presenter.deleteTrip(tripId);

        setIsDeleteModalOpen(false);
        setSelectedTripId(null);
        await refreshData(); // Refresh data after deletion
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error";
        setError(errorMessage);
        console.error("Error deleting trip:", err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [refreshData]
  );

  /**
   * Open delete modal
   */
  const openDeleteModal = useCallback((tripId: string) => {
    setSelectedTripId(tripId);
    setIsDeleteModalOpen(true);
    setError(null);
  }, []);

  /**
   * Close delete modal
   */
  const closeDeleteModal = useCallback(() => {
    setIsDeleteModalOpen(false);
    setSelectedTripId(null);
    setError(null);
  }, []);

  /**
   * Reset all state
   */
  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setFilterStage("all");
    setIsDeleteModalOpen(false);
    setSelectedTripId(null);
  }, []);

  // Return [state, actions] tuple
  return [
    {
      viewModel,
      loading,
      error,
      filterStage,
      isDeleteModalOpen,
      selectedTripId,
    },
    {
      refreshData,
      deleteTrip,
      setFilterStage,
      openDeleteModal,
      closeDeleteModal,
      setError,
      reset,
    },
  ];
}
