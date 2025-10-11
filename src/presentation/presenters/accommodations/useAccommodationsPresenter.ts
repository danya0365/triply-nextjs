/**
 * Accommodations Presenter Hook
 * Client-side hook for accommodations page
 */

"use client";

import { useState, useCallback } from "react";
import {
  AccommodationsPresenter,
  type AccommodationFilters,
  type AccommodationsViewModel,
} from "./AccommodationsPresenter";

export function useAccommodationsPresenter(
  initialViewModel: AccommodationsViewModel
) {
  const [presenter] = useState<AccommodationsPresenter>(
    () => new AccommodationsPresenter()
  );

  // State
  const [viewModel, setViewModel] =
    useState<AccommodationsViewModel>(initialViewModel);
  const [filters, setFilters] = useState<AccommodationFilters>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // View mode
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Load accommodations
  const loadAccommodations = useCallback(
    async (newFilters?: AccommodationFilters, page?: number) => {
      setIsLoading(true);
      setError(null);

      try {
        const updatedFilters = newFilters || filters;
        const updatedPage = page || currentPage;

        const newViewModel = await presenter.getViewModel(
          updatedFilters,
          updatedPage
        );

        setViewModel(newViewModel);
        setFilters(updatedFilters);
        setCurrentPage(updatedPage);
      } catch (err) {
        setError("ไม่สามารถโหลดข้อมูลที่พักได้");
        console.error("Error loading accommodations:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [presenter, filters, currentPage]
  );

  // Filter actions
  const updateFilters = useCallback(
    (newFilters: Partial<AccommodationFilters>) => {
      const updated = { ...filters, ...newFilters };
      loadAccommodations(updated, 1); // Reset to page 1 when filtering
    },
    [filters, loadAccommodations]
  );

  const clearFilters = useCallback(() => {
    setFilters({});
    loadAccommodations({}, 1);
  }, [loadAccommodations]);

  // Search
  const handleSearch = useCallback(
    (query: string) => {
      updateFilters({ search: query });
    },
    [updateFilters]
  );

  // Sort
  const handleSort = useCallback(
    (sortBy: AccommodationFilters["sortBy"]) => {
      updateFilters({ sortBy });
    },
    [updateFilters]
  );

  // Pagination
  const goToPage = useCallback(
    (page: number) => {
      loadAccommodations(filters, page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [filters, loadAccommodations]
  );

  const nextPage = useCallback(() => {
    if (currentPage < viewModel.totalPages) {
      goToPage(currentPage + 1);
    }
  }, [currentPage, viewModel.totalPages, goToPage]);

  const prevPage = useCallback(() => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  }, [currentPage, goToPage]);

  // View mode toggle
  const toggleViewMode = useCallback(() => {
    setViewMode((prev) => (prev === "grid" ? "list" : "grid"));
  }, []);

  return {
    // State
    viewModel,
    filters,
    currentPage,
    isLoading,
    error,
    viewMode,

    // Actions
    updateFilters,
    clearFilters,
    handleSearch,
    handleSort,
    goToPage,
    nextPage,
    prevPage,
    toggleViewMode,
  };
}
