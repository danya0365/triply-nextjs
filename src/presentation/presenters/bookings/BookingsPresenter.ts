/**
 * Bookings Presenter
 * Handles business logic for bookings page
 */

import { USERS } from "@/src/data/mock/users.mock";
import { ACCOMMODATIONS } from "@/src/data/mock/accommodations.mock";

export interface Booking {
  id: string;
  accommodationId: string;
  accommodationName: string;
  accommodationImage: string;
  accommodationType: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  nights: number;
  pricePerNight: number;
  totalPrice: number;
  status: "upcoming" | "completed" | "cancelled";
  bookingDate: string;
  confirmationCode: string;
}

export interface BookingsStats {
  totalBookings: number;
  upcomingBookings: number;
  completedBookings: number;
  cancelledBookings: number;
  totalSpent: number;
}

export interface BookingsViewModel {
  bookings: Booking[];
  stats: BookingsStats;
}

/**
 * Presenter for Bookings page
 * Follows Clean Architecture with proper separation of concerns
 */
export class BookingsPresenter {
  /**
   * Get view model for the bookings page
   */
  async getViewModel(userId: string): Promise<BookingsViewModel> {
    try {
      // Get user from mock data
      const user = USERS.find((u) => u.id === userId) || USERS[0];

      // Generate mock bookings based on user data
      const bookings = this.generateMockBookings(user.totalBookings);

      // Calculate stats
      const stats = this.calculateStats(bookings);

      return {
        bookings,
        stats,
      };
    } catch (error) {
      console.error("Error in BookingsPresenter.getViewModel:", error);
      throw error;
    }
  }

  /**
   * Generate mock bookings
   */
  private generateMockBookings(count: number): Booking[] {
    const bookings: Booking[] = [];
    const statuses: Array<"upcoming" | "completed" | "cancelled"> = [
      "upcoming",
      "upcoming",
      "upcoming",
      "completed",
      "completed",
      "completed",
      "completed",
      "completed",
      "cancelled",
    ];

    // Take limited accommodations to avoid going out of bounds
    const bookingCount = Math.min(count, 20);

    for (let i = 0; i < bookingCount; i++) {
      const accommodation = ACCOMMODATIONS[i % ACCOMMODATIONS.length];
      const status = statuses[i % statuses.length];
      
      // Calculate dates based on status
      let checkInDate: Date;
      if (status === "upcoming") {
        // Future dates
        checkInDate = new Date();
        checkInDate.setDate(checkInDate.getDate() + 10 + i * 15);
      } else {
        // Past dates
        checkInDate = new Date();
        checkInDate.setDate(checkInDate.getDate() - (i * 30 + 10));
      }

      const nights = 2 + Math.floor(Math.random() * 5);
      const checkOutDate = new Date(checkInDate);
      checkOutDate.setDate(checkOutDate.getDate() + nights);

      const bookingDate = new Date(checkInDate);
      bookingDate.setDate(bookingDate.getDate() - 14); // Booked 2 weeks before

      const totalPrice =
        accommodation.basePricePerNight * nights +
        (accommodation.cleaningFee || 0);

      bookings.push({
        id: `booking-${String(i + 1).padStart(3, "0")}`,
        accommodationId: accommodation.id,
        accommodationName: accommodation.name,
        accommodationImage: accommodation.images[0],
        accommodationType: accommodation.typeId,
        checkIn: checkInDate.toISOString(),
        checkOut: checkOutDate.toISOString(),
        guests: 2,
        nights,
        pricePerNight: accommodation.basePricePerNight,
        totalPrice,
        status,
        bookingDate: bookingDate.toISOString(),
        confirmationCode: `TRP${String(1000 + i).toUpperCase()}`,
      });
    }

    // Sort by check-in date (newest first)
    return bookings.sort(
      (a, b) => new Date(b.checkIn).getTime() - new Date(a.checkIn).getTime()
    );
  }

  /**
   * Calculate booking statistics
   */
  private calculateStats(bookings: Booking[]): BookingsStats {
    const upcoming = bookings.filter((b) => b.status === "upcoming");
    const completed = bookings.filter((b) => b.status === "completed");
    const cancelled = bookings.filter((b) => b.status === "cancelled");

    const totalSpent = completed.reduce((sum, b) => sum + b.totalPrice, 0);

    return {
      totalBookings: bookings.length,
      upcomingBookings: upcoming.length,
      completedBookings: completed.length,
      cancelledBookings: cancelled.length,
      totalSpent,
    };
  }

  /**
   * Cancel a booking
   */
  async cancelBooking(bookingId: string): Promise<boolean> {
    try {
      // TODO: In real app, this would call API to cancel booking
      console.log("Cancelling booking:", bookingId);
      return true;
    } catch (error) {
      console.error("Error in BookingsPresenter.cancelBooking:", error);
      throw error;
    }
  }

  /**
   * Generate metadata for the page
   */
  async generateMetadata() {
    return {
      title: "การจองของฉัน | Triply",
      description: "ดูและจัดการการจองที่พักทั้งหมดของคุณ",
      keywords: ["bookings", "reservations", "my bookings"],
    };
  }
}

/**
 * Factory for creating BookingsPresenter instances
 */
export class BookingsPresenterFactory {
  static async createServer(): Promise<BookingsPresenter> {
    return new BookingsPresenter();
  }

  static async createClient(): Promise<BookingsPresenter> {
    return new BookingsPresenter();
  }
}
