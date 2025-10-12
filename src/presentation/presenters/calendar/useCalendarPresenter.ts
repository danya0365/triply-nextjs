/**
 * Calendar Presenter Hook
 * Client-side hook for calendar page
 */

"use client";

import { useState, useCallback } from "react";
import type { CalendarViewModel } from "./CalendarPresenter";
import { CalendarPresenterFactory } from "./CalendarPresenter";

// State interface
export interface CalendarPresenterState {
  viewModel: CalendarViewModel | null;
  loading: boolean;
  error: string | null;
  selectedDate: string | null;
  currentMonth: number;
  currentYear: number;
  isEventModalOpen: boolean;
}

// Actions interface
export interface CalendarPresenterActions {
  refreshData: () => Promise<void>;
  selectDate: (date: string | null) => void;
  changeMonth: (month: number, year: number) => Promise<void>;
  openEventModal: (date: string) => void;
  closeEventModal: () => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

/**
 * Custom hook for Calendar presenter
 * Returns [state, actions] tuple following the pattern
 */
export function useCalendarPresenter(
  userId: string,
  initialViewModel: CalendarViewModel | null = null
): [CalendarPresenterState, CalendarPresenterActions] {
  const now = new Date();
  const [viewModel, setViewModel] = useState<CalendarViewModel | null>(
    initialViewModel
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(
    initialViewModel?.currentMonth ?? now.getMonth()
  );
  const [currentYear, setCurrentYear] = useState(
    initialViewModel?.currentYear ?? now.getFullYear()
  );
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);

  /**
   * Refresh data from presenter
   */
  const refreshData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const presenter = await CalendarPresenterFactory.createClient();
      const newViewModel = await presenter.getViewModel(
        userId,
        currentMonth,
        currentYear
      );
      setViewModel(newViewModel);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      console.error("Error loading calendar data:", err);
    } finally {
      setLoading(false);
    }
  }, [userId, currentMonth, currentYear]);

  /**
   * Change month and load new data
   */
  const changeMonth = useCallback(
    async (month: number, year: number) => {
      setCurrentMonth(month);
      setCurrentYear(year);
      setLoading(true);
      setError(null);

      try {
        const presenter = await CalendarPresenterFactory.createClient();
        const newViewModel = await presenter.getViewModel(userId, month, year);
        setViewModel(newViewModel);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error";
        setError(errorMessage);
        console.error("Error changing month:", err);
      } finally {
        setLoading(false);
      }
    },
    [userId]
  );

  /**
   * Select a date
   */
  const selectDate = useCallback((date: string | null) => {
    setSelectedDate(date);
  }, []);

  /**
   * Open event modal
   */
  const openEventModal = useCallback((date: string) => {
    setSelectedDate(date);
    setIsEventModalOpen(true);
    setError(null);
  }, []);

  /**
   * Close event modal
   */
  const closeEventModal = useCallback(() => {
    setIsEventModalOpen(false);
    setSelectedDate(null);
    setError(null);
  }, []);

  /**
   * Reset all state
   */
  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setSelectedDate(null);
    setIsEventModalOpen(false);
    const now = new Date();
    setCurrentMonth(now.getMonth());
    setCurrentYear(now.getFullYear());
  }, []);

  // Return [state, actions] tuple
  return [
    {
      viewModel,
      loading,
      error,
      selectedDate,
      currentMonth,
      currentYear,
      isEventModalOpen,
    },
    {
      refreshData,
      selectDate,
      changeMonth,
      openEventModal,
      closeEventModal,
      setError,
      reset,
    },
  ];
}
