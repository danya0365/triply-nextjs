/**
 * Profile Presenter Hook
 * Client-side hook for profile page
 */

"use client";

import { useState, useCallback } from "react";
import type {
  ProfileViewModel,
  UpdateProfileData,
} from "./ProfilePresenter";
import { ProfilePresenterFactory } from "./ProfilePresenter";

// State interface
export interface ProfilePresenterState {
  viewModel: ProfileViewModel | null;
  loading: boolean;
  error: string | null;
  isEditModalOpen: boolean;
}

// Actions interface
export interface ProfilePresenterActions {
  refreshData: () => Promise<void>;
  updateProfile: (data: UpdateProfileData) => Promise<void>;
  openEditModal: () => void;
  closeEditModal: () => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

/**
 * Custom hook for Profile presenter
 * Returns [state, actions] tuple following the pattern
 */
export function useProfilePresenter(
  userId: string,
  initialViewModel: ProfileViewModel | null = null
): [ProfilePresenterState, ProfilePresenterActions] {
  const [viewModel, setViewModel] = useState<ProfileViewModel | null>(
    initialViewModel
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  /**
   * Refresh data from presenter
   */
  const refreshData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const presenter = await ProfilePresenterFactory.createClient();
      const newViewModel = await presenter.getViewModel(userId);
      setViewModel(newViewModel);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      console.error("Error loading profile data:", err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  /**
   * Update profile data
   */
  const updateProfile = useCallback(
    async (data: UpdateProfileData) => {
      setLoading(true);
      setError(null);

      try {
        const presenter = await ProfilePresenterFactory.createClient();
        await presenter.updateProfile(userId, data);

        setIsEditModalOpen(false);
        await refreshData(); // Refresh data after update
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error";
        setError(errorMessage);
        console.error("Error updating profile:", err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [userId, refreshData]
  );

  /**
   * Open edit modal
   */
  const openEditModal = useCallback(() => {
    setIsEditModalOpen(true);
    setError(null);
  }, []);

  /**
   * Close edit modal
   */
  const closeEditModal = useCallback(() => {
    setIsEditModalOpen(false);
    setError(null);
  }, []);

  /**
   * Reset all state
   */
  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setIsEditModalOpen(false);
  }, []);

  // Return [state, actions] tuple
  return [
    {
      viewModel,
      loading,
      error,
      isEditModalOpen,
    },
    {
      refreshData,
      updateProfile,
      openEditModal,
      closeEditModal,
      setError,
      reset,
    },
  ];
}
