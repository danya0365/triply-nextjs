/**
 * Calendar Presenter
 * Handles business logic for calendar page
 * Aggregates data from bookings, trips, and activities
 */

import { USERS } from "@/src/data/mock/users.mock";
import { ACCOMMODATIONS } from "@/src/data/mock/accommodations.mock";
import { getTripsByCreator } from "@/src/data/mock/trips.mock";
import { getActiveMissions } from "@/src/data/mock/gamification.mock";

export interface CalendarEvent {
  id: string;
  type: "booking" | "trip" | "mission" | "activity";
  title: string;
  description: string;
  date: string;
  startDate?: string;
  endDate?: string;
  status?: string;
  color: string;
  icon: string;
}

export interface DayEvents {
  date: string;
  events: CalendarEvent[];
  hasBooking: boolean;
  hasTrip: boolean;
  hasMission: boolean;
}

export interface CalendarViewModel {
  currentMonth: number;
  currentYear: number;
  events: CalendarEvent[];
  dayEvents: Map<string, DayEvents>;
}

/**
 * Presenter for Calendar page
 * Follows Clean Architecture with proper separation of concerns
 */
export class CalendarPresenter {
  /**
   * Get view model for the calendar page
   */
  async getViewModel(
    userId: string,
    month: number,
    year: number
  ): Promise<CalendarViewModel> {
    try {
      const user = USERS.find((u) => u.id === userId) || USERS[0];

      // Get all events
      const bookingEvents = this.generateBookingEvents(user.totalBookings);
      const tripEvents = this.generateTripEvents(userId);
      const missionEvents = this.generateMissionEvents();

      const allEvents = [...bookingEvents, ...tripEvents, ...missionEvents];

      // Group events by day
      const dayEvents = this.groupEventsByDay(allEvents, month, year);

      return {
        currentMonth: month,
        currentYear: year,
        events: allEvents,
        dayEvents,
      };
    } catch (error) {
      console.error("Error in CalendarPresenter.getViewModel:", error);
      throw error;
    }
  }

  /**
   * Generate booking events from mock data
   */
  private generateBookingEvents(totalBookings: number): CalendarEvent[] {
    const events: CalendarEvent[] = [];
    const count = Math.min(totalBookings, 10); // Limit to recent bookings

    for (let i = 0; i < count; i++) {
      const accommodation = ACCOMMODATIONS[i % ACCOMMODATIONS.length];
      
      // Generate check-in date (some past, some future)
      const checkInDate = new Date();
      if (i < 3) {
        // Future bookings
        checkInDate.setDate(checkInDate.getDate() + 5 + i * 7);
      } else {
        // Past bookings
        checkInDate.setDate(checkInDate.getDate() - (i - 3) * 10);
      }

      const nights = 2 + Math.floor(Math.random() * 4);
      const checkOutDate = new Date(checkInDate);
      checkOutDate.setDate(checkOutDate.getDate() + nights);

      // Check-in event
      events.push({
        id: `booking-checkin-${i}`,
        type: "booking",
        title: `เช็คอิน: ${accommodation.name}`,
        description: `${nights} คืน`,
        date: checkInDate.toISOString(),
        startDate: checkInDate.toISOString(),
        endDate: checkOutDate.toISOString(),
        status: i < 3 ? "upcoming" : "completed",
        color: "#3b82f6",
        icon: "🏨",
      });

      // Check-out event
      events.push({
        id: `booking-checkout-${i}`,
        type: "booking",
        title: `เช็คเอาท์: ${accommodation.name}`,
        description: `สิ้นสุดการเข้าพัก`,
        date: checkOutDate.toISOString(),
        startDate: checkInDate.toISOString(),
        endDate: checkOutDate.toISOString(),
        status: i < 3 ? "upcoming" : "completed",
        color: "#3b82f6",
        icon: "🚪",
      });
    }

    return events;
  }

  /**
   * Generate trip events from mock data
   */
  private generateTripEvents(userId: string): CalendarEvent[] {
    const events: CalendarEvent[] = [];
    const trips = getTripsByCreator(userId);

    trips.slice(0, 8).forEach((trip) => {
      // Trip start event
      events.push({
        id: `trip-start-${trip.id}`,
        type: "trip",
        title: `🗺️ เริ่มทริป: ${trip.name}`,
        description: trip.planningStage,
        date: trip.startDate,
        startDate: trip.startDate,
        endDate: trip.endDate,
        status: trip.planningStage,
        color: "#8b5cf6",
        icon: "🗺️",
      });

      // Trip end event
      events.push({
        id: `trip-end-${trip.id}`,
        type: "trip",
        title: `🏁 สิ้นสุดทริป: ${trip.name}`,
        description: trip.planningStage,
        date: trip.endDate,
        startDate: trip.startDate,
        endDate: trip.endDate,
        status: trip.planningStage,
        color: "#8b5cf6",
        icon: "🏁",
      });
    });

    return events;
  }

  /**
   * Generate mission events from gamification data
   */
  private generateMissionEvents(): CalendarEvent[] {
    const events: CalendarEvent[] = [];
    const missions = getActiveMissions();

    missions.forEach((mission) => {
      if (mission.expiresAt) {
        events.push({
          id: `mission-${mission.id}`,
          type: "mission",
          title: `🎯 ${mission.title}`,
          description: `หมดอายุ: ${mission.target - mission.progress} เหลือ`,
          date: mission.expiresAt,
          status: mission.status,
          color: "#f59e0b",
          icon: "🎯",
        });
      }
    });

    return events;
  }

  /**
   * Group events by day for the calendar
   */
  private groupEventsByDay(
    events: CalendarEvent[],
    month: number,
    year: number
  ): Map<string, DayEvents> {
    const dayEventsMap = new Map<string, DayEvents>();

    // Get all days in the month
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      dayEventsMap.set(dateStr, {
        date: dateStr,
        events: [],
        hasBooking: false,
        hasTrip: false,
        hasMission: false,
      });
    }

    // Add events to corresponding days
    events.forEach((event) => {
      const eventDate = new Date(event.date);
      const dateStr = `${eventDate.getFullYear()}-${String(eventDate.getMonth() + 1).padStart(2, "0")}-${String(eventDate.getDate()).padStart(2, "0")}`;

      if (dayEventsMap.has(dateStr)) {
        const dayEvent = dayEventsMap.get(dateStr)!;
        dayEvent.events.push(event);

        // Mark flags
        if (event.type === "booking") dayEvent.hasBooking = true;
        if (event.type === "trip") dayEvent.hasTrip = true;
        if (event.type === "mission") dayEvent.hasMission = true;
      }
    });

    return dayEventsMap;
  }

  /**
   * Generate metadata for the page
   */
  async generateMetadata() {
    return {
      title: "ปฏิทิน | Triply",
      description: "ดูการจอง ทริป และกิจกรรมทั้งหมดของคุณในปฏิทิน",
      keywords: ["calendar", "bookings", "trips", "schedule"],
    };
  }
}

/**
 * Factory for creating CalendarPresenter instances
 */
export class CalendarPresenterFactory {
  static async createServer(): Promise<CalendarPresenter> {
    return new CalendarPresenter();
  }

  static async createClient(): Promise<CalendarPresenter> {
    return new CalendarPresenter();
  }
}
