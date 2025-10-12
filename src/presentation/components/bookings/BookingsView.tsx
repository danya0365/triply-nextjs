"use client";

import { useBookingsPresenter } from "@/src/presentation/presenters/bookings/useBookingsPresenter";
import type { BookingsViewModel, Booking } from "@/src/presentation/presenters/bookings/BookingsPresenter";
import Link from "next/link";

interface BookingsViewProps {
  userId: string;
  initialViewModel: BookingsViewModel;
}

export function BookingsView({ userId, initialViewModel }: BookingsViewProps) {
  const [state, actions] = useBookingsPresenter(userId, initialViewModel);

  const viewModel = state.viewModel || initialViewModel;

  // Filter bookings based on status
  const filteredBookings =
    state.filterStatus === "all"
      ? viewModel.bookings
      : viewModel.bookings.filter((b) => b.status === state.filterStatus);

  // Helper functions
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("th-TH", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400";
      case "completed":
        return "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400";
      case "cancelled":
        return "bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400";
      default:
        return "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "upcoming":
        return "กำลังมาถึง";
      case "completed":
        return "เสร็จสิ้น";
      case "cancelled":
        return "ยกเลิกแล้ว";
      default:
        return status;
    }
  };

  // Loading state
  if (state.loading && !viewModel) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-sky-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">กำลังโหลดการจอง...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            การจองของฉัน
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            ดูและจัดการการจองที่พักทั้งหมดของคุณ
          </p>
        </div>

        {/* Error Message */}
        {state.error && (
          <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 rounded-lg">
            {state.error}
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <div className="text-3xl mb-2">📊</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {viewModel.stats.totalBookings}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              ทั้งหมด
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <div className="text-3xl mb-2">📅</div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {viewModel.stats.upcomingBookings}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              กำลังมาถึง
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <div className="text-3xl mb-2">✅</div>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {viewModel.stats.completedBookings}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              เสร็จสิ้น
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <div className="text-3xl mb-2">💰</div>
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              ฿{viewModel.stats.totalSpent.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              ใช้จ่ายทั้งหมด
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {[
            { id: "all", label: "ทั้งหมด", count: viewModel.stats.totalBookings },
            { id: "upcoming", label: "กำลังมาถึง", count: viewModel.stats.upcomingBookings },
            { id: "completed", label: "เสร็จสิ้น", count: viewModel.stats.completedBookings },
            { id: "cancelled", label: "ยกเลิก", count: viewModel.stats.cancelledBookings },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => actions.setFilterStatus(tab.id as "all" | "upcoming" | "completed" | "cancelled")}
              className={`px-6 py-3 rounded-lg font-medium whitespace-nowrap transition-colors ${
                state.filterStatus === tab.id
                  ? "bg-gradient-to-r from-sky-400 to-violet-400 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                onCancel={() => actions.openDeleteModal(booking.id)}
                formatDate={formatDate}
                getStatusColor={getStatusColor}
                getStatusText={getStatusText}
              />
            ))
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg p-12 text-center shadow-md">
              <div className="text-6xl mb-4">🏨</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                ไม่มีการจอง
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {state.filterStatus === "all"
                  ? "คุณยังไม่มีการจองที่พัก"
                  : `ไม่มีการจองที่${getStatusText(state.filterStatus)}`}
              </p>
              <Link
                href="/accommodations"
                className="inline-block px-6 py-3 bg-gradient-to-r from-sky-400 to-violet-400 text-white font-bold rounded-lg hover:shadow-lg transition-all"
              >
                ค้นหาที่พัก
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Cancel Confirmation Modal */}
      {state.isDeleteModalOpen && state.selectedBookingId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
            <div className="text-center mb-4">
              <div className="text-6xl mb-4">⚠️</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                ยืนยันการยกเลิก
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                คุณแน่ใจหรือไม่ที่จะยกเลิกการจองนี้?
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={actions.closeDeleteModal}
                disabled={state.loading}
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ยกเลิก
              </button>
              <button
                onClick={() => actions.cancelBooking(state.selectedBookingId!)}
                disabled={state.loading}
                className="flex-1 px-4 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {state.loading ? "กำลังยกเลิก..." : "ยืนยันยกเลิก"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Booking Card Component
function BookingCard({
  booking,
  onCancel,
  formatDate,
  getStatusColor,
  getStatusText,
}: {
  booking: Booking;
  onCancel: () => void;
  formatDate: (date: string) => string;
  getStatusColor: (status: string) => string;
  getStatusText: (status: string) => string;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* Image */}
        <div className="w-full md:w-64 h-48 bg-gradient-to-br from-sky-200 to-violet-200 dark:from-sky-300/20 dark:to-violet-300/20 flex-shrink-0" />

        {/* Content */}
        <div className="p-6 flex-1">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {booking.accommodationName}
              </h3>
              <span className={`px-2 py-1 text-xs font-medium rounded ${getStatusColor(booking.status)}`}>
                {getStatusText(booking.status)}
              </span>
            </div>
            {booking.status === "upcoming" && (
              <button
                onClick={onCancel}
                className="text-sm text-red-600 dark:text-red-400 hover:underline"
              >
                ยกเลิกการจอง
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
            <div>
              <div className="text-xs mb-1">เช็คอิน</div>
              <div className="font-medium text-gray-900 dark:text-white">
                {formatDate(booking.checkIn)}
              </div>
            </div>
            <div>
              <div className="text-xs mb-1">เช็คเอาท์</div>
              <div className="font-medium text-gray-900 dark:text-white">
                {formatDate(booking.checkOut)}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <div>👥 {booking.guests} คน • 🌙 {booking.nights} คืน</div>
              <div className="mt-1">📋 รหัสการจอง: {booking.confirmationCode}</div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-sky-600 dark:text-sky-400">
                ฿{booking.totalPrice.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-500">
                ฿{booking.pricePerNight.toLocaleString()}/คืน
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Link
              href={`/accommodations/${booking.accommodationId}`}
              className="text-sky-600 dark:text-sky-400 hover:underline text-sm font-medium"
            >
              ดูรายละเอียดที่พัก →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
