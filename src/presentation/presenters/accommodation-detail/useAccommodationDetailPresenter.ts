/**
 * Accommodation Detail Presenter Hook
 * Client-side hook for accommodation detail page
 */

"use client";

import { useState, useCallback } from "react";
import type { AccommodationDetailViewModel } from "./AccommodationDetailPresenter";

export function useAccommodationDetailPresenter(
  initialViewModel: AccommodationDetailViewModel
) {
  const [viewModel] = useState<AccommodationDetailViewModel>(initialViewModel);
  const [error, setError] = useState<string | null>(null);

  // Booking state
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Image gallery state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showGalleryModal, setShowGalleryModal] = useState(false);

  // Calculate nights and total price
  const calculateBooking = useCallback(() => {
    if (!checkIn || !checkOut || !viewModel.accommodation) {
      return { nights: 0, totalPrice: 0, cleaningFee: 0, serviceFee: 0, grandTotal: 0 };
    }

    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

    if (nights <= 0) {
      return { nights: 0, totalPrice: 0, cleaningFee: 0, serviceFee: 0, grandTotal: 0 };
    }

    const totalPrice = viewModel.accommodation.basePricePerNight * nights;
    const cleaningFee = viewModel.accommodation.cleaningFee;
    const serviceFee = totalPrice * (viewModel.accommodation.serviceFeePercentage / 100);
    const grandTotal = totalPrice + cleaningFee + serviceFee;

    return { nights, totalPrice, cleaningFee, serviceFee, grandTotal };
  }, [checkIn, checkOut, viewModel.accommodation]);

  // Handle booking
  const handleBooking = useCallback(() => {
    const booking = calculateBooking();

    if (booking.nights === 0) {
      setError("กรุณาเลือกวันที่เช็คอินและเช็คเอาท์");
      return;
    }

    if (!viewModel.accommodation) {
      setError("ไม่พบข้อมูลที่พัก");
      return;
    }

    if (guests > viewModel.accommodation.maxGuests) {
      setError(`จำนวนผู้เข้าพักสูงสุด ${viewModel.accommodation.maxGuests} ท่าน`);
      return;
    }

    setShowBookingModal(true);
    // TODO: Implement actual booking logic
  }, [calculateBooking, guests, viewModel.accommodation]);

  // Image gallery actions
  const openGallery = useCallback((index: number = 0) => {
    setCurrentImageIndex(index);
    setShowGalleryModal(true);
  }, []);

  const closeGallery = useCallback(() => {
    setShowGalleryModal(false);
  }, []);

  const nextImage = useCallback(() => {
    if (!viewModel.accommodation) return;
    const imagesLength = viewModel.accommodation.images.length;
    setCurrentImageIndex((prev) => (prev === imagesLength - 1 ? 0 : prev + 1));
  }, [viewModel.accommodation]);

  const prevImage = useCallback(() => {
    if (!viewModel.accommodation) return;
    const imagesLength = viewModel.accommodation.images.length;
    setCurrentImageIndex((prev) => (prev === 0 ? imagesLength - 1 : prev - 1));
  }, [viewModel.accommodation]);

  return {
    // State
    viewModel,
    error,

    // Booking state
    checkIn,
    checkOut,
    guests,
    showBookingModal,
    setCheckIn,
    setCheckOut,
    setGuests,
    setShowBookingModal,

    // Gallery state
    currentImageIndex,
    showGalleryModal,

    // Actions
    calculateBooking,
    handleBooking,
    openGallery,
    closeGallery,
    nextImage,
    prevImage,
  };
}
