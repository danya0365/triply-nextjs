/**
 * Trip Timeline Presenter Hook
 * Custom hook for trip timeline state management
 */

"use client";

import { useState, useCallback } from "react";
import type { TripTimelineViewModel } from "./TripTimelinePresenter";

export interface TripTimelinePresenterHook {
  // State
  viewModel: TripTimelineViewModel;
  loading: boolean;
  error: string | null;
  
  // Filter state
  selectedDay: number | null;
  
  // Actions
  setSelectedDay: (day: number | null) => void;
  refreshData: () => Promise<void>;
}

/**
 * Custom hook for Trip Timeline presenter
 * Provides state management for timeline view
 */
export function useTripTimelinePresenter(
  initialViewModel: TripTimelineViewModel
): TripTimelinePresenterHook {
  const [viewModel] = useState<TripTimelineViewModel>(initialViewModel);
  const [loading] = useState(false);
  const [error] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  /**
   * Refresh timeline data
   */
  const refreshData = useCallback(async () => {
    // In a real app, this would reload data from API
    // For now, we're using static mock data
    console.log("Refreshing timeline data...");
  }, []);

  return {
    viewModel,
    loading,
    error,
    selectedDay,
    setSelectedDay,
    refreshData,
  };
}
