/**
 * Bookings Presenter Hook
 * Client-side hook for bookings page
 */

"use client";

import { useState, useCallback } from "react";
import type { BookingsViewModel } from "./BookingsPresenter";
import { BookingsPresenterFactory } from "./BookingsPresenter";

// State interface
export interface BookingsPresenterState {
  viewModel: BookingsViewModel | null;
  loading: boolean;
  error: string | null;
  filterStatus: "all" | "upcoming" | "completed" | "cancelled";
  isDeleteModalOpen: boolean;
  selectedBookingId: string | null;
}

// Actions interface
export interface BookingsPresenterActions {
  refreshData: () => Promise<void>;
  cancelBooking: (bookingId: string) => Promise<void>;
  setFilterStatus: (status: "all" | "upcoming" | "completed" | "cancelled") => void;
  openDeleteModal: (bookingId: string) => void;
  closeDeleteModal: () => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

/**
 * Custom hook for Bookings presenter
 * Returns [state, actions] tuple following the pattern
 */
export function useBookingsPresenter(
  userId: string,
  initialViewModel: BookingsViewModel | null = null
): [BookingsPresenterState, BookingsPresenterActions] {
  const [viewModel, setViewModel] = useState<BookingsViewModel | null>(
    initialViewModel
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<
    "all" | "upcoming" | "completed" | "cancelled"
  >("all");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);

  /**
   * Refresh data from presenter
   */
  const refreshData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const presenter = await BookingsPresenterFactory.createClient();
      const newViewModel = await presenter.getViewModel(userId);
      setViewModel(newViewModel);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      console.error("Error loading bookings data:", err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  /**
   * Cancel a booking
   */
  const cancelBooking = useCallback(
    async (bookingId: string) => {
      setLoading(true);
      setError(null);

      try {
        const presenter = await BookingsPresenterFactory.createClient();
        await presenter.cancelBooking(bookingId);

        setIsDeleteModalOpen(false);
        setSelectedBookingId(null);
        await refreshData(); // Refresh data after cancellation
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error";
        setError(errorMessage);
        console.error("Error cancelling booking:", err);
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
  const openDeleteModal = useCallback((bookingId: string) => {
    setSelectedBookingId(bookingId);
    setIsDeleteModalOpen(true);
    setError(null);
  }, []);

  /**
   * Close delete modal
   */
  const closeDeleteModal = useCallback(() => {
    setIsDeleteModalOpen(false);
    setSelectedBookingId(null);
    setError(null);
  }, []);

  /**
   * Reset all state
   */
  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setFilterStatus("all");
    setIsDeleteModalOpen(false);
    setSelectedBookingId(null);
  }, []);

  // Return [state, actions] tuple
  return [
    {
      viewModel,
      loading,
      error,
      filterStatus,
      isDeleteModalOpen,
      selectedBookingId,
    },
    {
      refreshData,
      cancelBooking,
      setFilterStatus,
      openDeleteModal,
      closeDeleteModal,
      setError,
      reset,
    },
  ];
}
