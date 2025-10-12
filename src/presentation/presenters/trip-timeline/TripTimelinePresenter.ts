/**
 * Trip Timeline Presenter
 * Handles business logic for trip timeline/calendar view
 */

import {
  getActivitiesByTripId,
  getActivitiesByDay,
  calculateActivityCosts,
  type TripActivity,
  type ActivityType,
  type TimeSlot,
} from "@/src/data/mock/activities.mock";
import { getTripById, type Trip } from "@/src/data/mock/trips.mock";

export interface DaySchedule {
  day: number;
  date: string; // YYYY-MM-DD
  dayName: string; // Monday, Tuesday, etc.
  activities: TripActivity[];
  totalCost: number;
  totalDuration: number; // minutes
}

export interface TimelineStats {
  totalActivities: number;
  totalCost: number;
  bookedActivities: number;
  costByType: Record<ActivityType, number>;
  activitiesByType: Record<ActivityType, number>;
}

export interface TripTimelineViewModel {
  trip: Trip;
  schedule: DaySchedule[];
  stats: TimelineStats;
  allActivities: TripActivity[];
}

/**
 * Presenter for Trip Timeline page
 */
export class TripTimelinePresenter {
  /**
   * Get view model for trip timeline
   */
  async getViewModel(tripId: string): Promise<TripTimelineViewModel | null> {
    try {
      const trip = getTripById(tripId);

      if (!trip) {
        return null;
      }

      // Get all activities for this trip
      const allActivities = getActivitiesByTripId(tripId);

      // Generate schedule for each day
      const schedule: DaySchedule[] = [];
      const startDate = new Date(trip.startDate);

      for (let day = 1; day <= trip.durationDays; day++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + (day - 1));

        const dayActivities = getActivitiesByDay(tripId, day);

        // Sort activities by start time
        dayActivities.sort((a, b) => {
          if (!a.startTime || !b.startTime) return 0;
          return a.startTime.localeCompare(b.startTime);
        });

        const totalCost = dayActivities.reduce((sum, act) => sum + act.cost, 0);
        const totalDuration = dayActivities.reduce(
          (sum, act) => sum + act.duration,
          0
        );

        schedule.push({
          day,
          date: currentDate.toISOString().split("T")[0],
          dayName: currentDate.toLocaleDateString("en-US", { weekday: "long" }),
          activities: dayActivities,
          totalCost,
          totalDuration,
        });
      }

      // Calculate stats
      const { total: totalCost, byType: costByType } =
        calculateActivityCosts(tripId);

      const activitiesByType: Record<ActivityType, number> = {
        accommodation: 0,
        transport: 0,
        food: 0,
        activity: 0,
        shopping: 0,
        other: 0,
      };

      allActivities.forEach((activity) => {
        activitiesByType[activity.type] += 1;
      });

      const stats: TimelineStats = {
        totalActivities: allActivities.length,
        totalCost,
        bookedActivities: allActivities.filter((a) => a.isBooked).length,
        costByType,
        activitiesByType,
      };

      return {
        trip,
        schedule,
        stats,
        allActivities,
      };
    } catch (error) {
      console.error("Error in TripTimelinePresenter.getViewModel:", error);
      throw error;
    }
  }

  /**
   * Get activity type color
   */
  getActivityTypeColor(type: ActivityType): string {
    const colors: Record<ActivityType, string> = {
      accommodation: "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-500",
      transport: "bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 border-purple-500",
      food: "bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 border-orange-500",
      activity: "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-500",
      shopping: "bg-pink-100 dark:bg-pink-900/20 text-pink-700 dark:text-pink-400 border-pink-500",
      other: "bg-gray-100 dark:bg-gray-900/20 text-gray-700 dark:text-gray-400 border-gray-500",
    };
    return colors[type];
  }

  /**
   * Get activity type icon
   */
  getActivityTypeIcon(type: ActivityType): string {
    const icons: Record<ActivityType, string> = {
      accommodation: "🏨",
      transport: "✈️",
      food: "🍽️",
      activity: "🎢",
      shopping: "🛍️",
      other: "📝",
    };
    return icons[type];
  }

  /**
   * Get activity type label
   */
  getActivityTypeLabel(type: ActivityType): string {
    const labels: Record<ActivityType, string> = {
      accommodation: "ที่พัก",
      transport: "การเดินทาง",
      food: "อาหาร",
      activity: "กิจกรรม",
      shopping: "ช้อปปิ้ง",
      other: "อื่นๆ",
    };
    return labels[type];
  }

  /**
   * Get time slot label
   */
  getTimeSlotLabel(slot: TimeSlot): string {
    const labels: Record<TimeSlot, string> = {
      morning: "เช้า",
      afternoon: "บ่าย",
      evening: "ค่ำ",
      night: "กลางคืน",
      "all-day": "ทั้งวัน",
    };
    return labels[slot];
  }

  /**
   * Format duration to readable string
   */
  formatDuration(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hours === 0) {
      return `${mins} นาที`;
    }

    if (mins === 0) {
      return `${hours} ชั่วโมง`;
    }

    return `${hours} ชม. ${mins} นาที`;
  }

  /**
   * Generate metadata
   */
  async generateMetadata(tripId: string) {
    const trip = getTripById(tripId);

    if (!trip) {
      return {
        title: "Trip Timeline Not Found | Triply",
      };
    }

    return {
      title: `${trip.name} - Timeline | Triply`,
      description: `Day-by-day timeline for ${trip.name}`,
      keywords: ["trip timeline", "itinerary", trip.name],
    };
  }
}

export class TripTimelinePresenterFactory {
  static async createServer(): Promise<TripTimelinePresenter> {
    return new TripTimelinePresenter();
  }

  static async createClient(): Promise<TripTimelinePresenter> {
    return new TripTimelinePresenter();
  }
}
