/**
 * User Dashboard Presenter
 * Handles business logic for user dashboard page
 */

import { USERS, type User } from "@/src/data/mock/users.mock";
import { getTripsByCreator } from "@/src/data/mock/trips.mock";
import { ACCOMMODATIONS } from "@/src/data/mock/accommodations.mock";

export interface BookingItem {
  id: string;
  accommodationId: string;
  accommodationName: string;
  accommodationImage: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: "upcoming" | "completed" | "cancelled";
  bookingDate: string;
}

export interface ActivityItem {
  id: string;
  type: "booking" | "review" | "trip" | "achievement";
  icon: string;
  title: string;
  description: string;
  timestamp: string;
}

export interface UserDashboardViewModel {
  user: User;
  stats: {
    totalBookings: number;
    upcomingBookings: number;
    completedBookings: number;
    totalTrips: number;
    totalPoints: number;
    level: number;
    achievementsUnlocked: number;
  };
  bookings: BookingItem[];
  recentTrips: Array<{
    id: string;
    name: string;
    startDate: string;
    endDate: string;
    destinations: string[];
    status: string;
  }>;
  recentActivities: ActivityItem[];
}

/**
 * Presenter for User Dashboard
 */
export class UserDashboardPresenter {
  /**
   * Get view model for user dashboard
   */
  async getViewModel(userId: string): Promise<UserDashboardViewModel> {
    // Get user
    const user = USERS.find((u) => u.id === userId) || USERS[0];

    // Get user's trips
    const trips = getTripsByCreator(userId);
    const recentTrips = trips.slice(0, 5).map((trip) => ({
      id: trip.id,
      name: trip.name,
      startDate: trip.startDate,
      endDate: trip.endDate,
      destinations: trip.destinationIds,
      status: trip.planningStage,
    }));

    // Generate mock bookings
    const bookings = this.generateMockBookings();

    // Generate recent activities
    const recentActivities = this.generateMockActivities();

    // Calculate stats
    const upcomingBookings = bookings.filter((b) => b.status === "upcoming").length;
    const completedBookings = bookings.filter((b) => b.status === "completed").length;

    return {
      user,
      stats: {
        totalBookings: user.totalBookings,
        upcomingBookings,
        completedBookings,
        totalTrips: user.totalTrips,
        totalPoints: user.totalPoints,
        level: user.level,
        achievementsUnlocked: user.badges.length,
      },
      bookings,
      recentTrips,
      recentActivities,
    };
  }

  /**
   * Generate mock bookings
   */
  private generateMockBookings(): BookingItem[] {
    const bookings: BookingItem[] = [];
    const statuses: Array<"upcoming" | "completed" | "cancelled"> = [
      "upcoming",
      "upcoming",
      "upcoming",
      "completed",
      "completed",
      "completed",
      "completed",
      "cancelled",
    ];

    for (let i = 0; i < 8; i++) {
      const accommodation = ACCOMMODATIONS[i % ACCOMMODATIONS.length];
      const daysAhead = i < 3 ? 10 + i * 15 : -(i * 30);
      const checkIn = new Date();
      checkIn.setDate(checkIn.getDate() + daysAhead);
      const checkOut = new Date(checkIn);
      checkOut.setDate(checkOut.getDate() + 3);

      bookings.push({
        id: `booking-${String(i + 1).padStart(3, "0")}`,
        accommodationId: accommodation.id,
        accommodationName: accommodation.name,
        accommodationImage: accommodation.images[0],
        checkIn: checkIn.toISOString(),
        checkOut: checkOut.toISOString(),
        guests: 2,
        totalPrice: accommodation.basePricePerNight * 3 + (accommodation.cleaningFee || 0),
        status: statuses[i],
        bookingDate: new Date(Date.now() - i * 86400000 * 10).toISOString(),
      });
    }

    return bookings.sort(
      (a, b) => new Date(b.checkIn).getTime() - new Date(a.checkIn).getTime()
    );
  }

  /**
   * Generate mock activities
   */
  private generateMockActivities(): ActivityItem[] {
    return [
      {
        id: "activity-001",
        type: "achievement",
        icon: "🏆",
        title: "ปลดล็อคความสำเร็จใหม่",
        description: 'คุณได้รับ "นักเดินทางตัวยง"',
        timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
      },
      {
        id: "activity-002",
        type: "booking",
        icon: "🏨",
        title: "จองที่พักสำเร็จ",
        description: "Luxury Beach Resort Phuket - 3 คืน",
        timestamp: new Date(Date.now() - 86400000 * 1).toISOString(),
      },
      {
        id: "activity-003",
        type: "trip",
        icon: "🗺️",
        title: "สร้างทริปใหม่",
        description: "ฮันนีมูนภูเก็ต - 7 วันแสนหวาน",
        timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
      },
      {
        id: "activity-004",
        type: "review",
        icon: "⭐",
        title: "เขียนรีวิว",
        description: "Mountain View Hotel Chiang Mai - 5 ดาว",
        timestamp: new Date(Date.now() - 86400000 * 3).toISOString(),
      },
      {
        id: "activity-005",
        type: "achievement",
        icon: "🎯",
        title: "ทำภารกิจสำเร็จ",
        description: "จองที่พัก 3 คืนติดต่อกัน +500 คะแนน",
        timestamp: new Date(Date.now() - 86400000 * 5).toISOString(),
      },
    ];
  }

  /**
   * Generate metadata
   */
  async generateMetadata() {
    return {
      title: "แดชบอร์ด | Triply",
      description:
        "จัดการโปรไฟล์ ดูการจอง ทริป และกิจกรรมของคุณ",
      keywords: ["dashboard", "profile", "bookings", "trips"],
    };
  }
}

/**
 * Factory for creating UserDashboardPresenter
 */
export class UserDashboardPresenterFactory {
  static async createServer(): Promise<UserDashboardPresenter> {
    return new UserDashboardPresenter();
  }

  static async createClient(): Promise<UserDashboardPresenter> {
    return new UserDashboardPresenter();
  }
}
