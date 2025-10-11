"use client";

import { useCallback, useEffect, useState } from "react";
import { LandingViewModel, LandingPresenterFactory } from "./LandingPresenter";

let presenterInstance: Awaited<ReturnType<typeof LandingPresenterFactory.createClient>> | null = null;

async function getPresenter() {
  if (!presenterInstance) {
    presenterInstance = await LandingPresenterFactory.createClient();
  }
  return presenterInstance;
}

export interface LandingPresenterState {
  viewModel: LandingViewModel | null;
  loading: boolean;
  error: string | null;
}

export interface LandingPresenterActions {
  refreshData: () => Promise<void>;
  setError: (error: string | null) => void;
}

/**
 * Custom hook for Landing presenter
 * Provides state management and actions for Landing page
 */
export function useLandingPresenter(
  initialViewModel: LandingViewModel | null = null
): [LandingPresenterState, LandingPresenterActions] {
  const [viewModel, setViewModel] = useState<LandingViewModel | null>(
    initialViewModel || null
  );
  const [loading, setLoading] = useState(!initialViewModel);
  const [error, setError] = useState<string | null>(null);

  /**
   * Load data from presenter
   */
  const refreshData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const presenter = await getPresenter();
      const newViewModel = await presenter.getViewModel();
      setViewModel(newViewModel);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      console.error("Error loading landing data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load data on mount if no initial view model
  useEffect(() => {
    if (!initialViewModel) {
      refreshData();
    }
  }, [initialViewModel, refreshData]);

  return [
    {
      viewModel,
      loading,
      error,
    },
    {
      refreshData,
      setError,
    },
  ];
}
