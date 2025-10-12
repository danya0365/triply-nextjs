/**
 * User Dashboard Presenter Hook
 * Client-side hook for user dashboard page
 */

"use client";

import { useState, useCallback } from "react";
import type { UserDashboardViewModel } from "./UserDashboardPresenter";

export function useUserDashboardPresenter(initialViewModel: UserDashboardViewModel) {
  const [viewModel] = useState<UserDashboardViewModel>(initialViewModel);
  const [error, setError] = useState<string | null>(null);

  // Tab state
  const [activeTab, setActiveTab] = useState<
    "overview" | "bookings" | "trips" | "settings"
  >("overview");

  // Filter states
  const [bookingFilter, setBookingFilter] = useState<
    "all" | "upcoming" | "completed" | "cancelled"
  >("all");

  // Modal states
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Filter bookings
  const filteredBookings = viewModel.bookings.filter((booking) => {
    if (bookingFilter === "all") return true;
    return booking.status === bookingFilter;
  });

  // Actions
  const handleCancelBooking = useCallback(async (bookingId: string) => {
    try {
      // TODO: Call API to cancel booking
      console.log("Cancelling booking:", bookingId);
    } catch (err) {
      setError("ไม่สามารถยกเลิกการจองได้");
      console.error("Error cancelling booking:", err);
    }
  }, []);

  const handleUpdateProfile = useCallback(async (data: Record<string, unknown>) => {
    try {
      // TODO: Call API to update profile
      console.log("Updating profile:", data);
      setShowEditProfile(false);
    } catch (err) {
      setError("ไม่สามารถอัพเดทโปรไฟล์ได้");
      console.error("Error updating profile:", err);
    }
  }, []);

  return {
    // State
    viewModel,
    error,
    activeTab,
    bookingFilter,

    // Modal states
    showEditProfile,
    showNotifications,

    // Filtered data
    filteredBookings,

    // Actions
    setActiveTab,
    setBookingFilter,
    setShowEditProfile,
    setShowNotifications,
    handleCancelBooking,
    handleUpdateProfile,
  };
}
