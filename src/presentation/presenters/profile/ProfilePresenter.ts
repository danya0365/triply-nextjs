/**
 * Profile Presenter
 * Handles business logic for user profile page
 */

import { USERS, type User } from "@/src/data/mock/users.mock";

export interface ProfileData {
  displayName: string;
  email: string;
  bio: string;
  nationality: string;
  languages: string[];
  interests: string[];
  travelStyle: string[];
}

export interface UpdateProfileData {
  displayName?: string;
  bio?: string;
  nationality?: string;
  languages?: string[];
  interests?: string[];
  travelStyle?: string[];
}

export interface ProfileStats {
  totalPoints: number;
  level: number;
  totalBookings: number;
  totalTrips: number;
  countriesVisited: number;
  badges: number;
}

export interface ProfileViewModel {
  user: User;
  profile: ProfileData;
  stats: ProfileStats;
}

/**
 * Presenter for Profile page
 * Follows Clean Architecture with proper separation of concerns
 */
export class ProfilePresenter {
  /**
   * Get view model for the profile page
   */
  async getViewModel(userId: string): Promise<ProfileViewModel> {
    try {
      // Get user from mock data
      const user = USERS.find((u) => u.id === userId) || USERS[0];

      // Map user data to profile data
      const profile: ProfileData = {
        displayName: user.displayName,
        email: user.email,
        bio: user.bio,
        nationality: user.nationality,
        languages: user.languages,
        interests: user.interests,
        travelStyle: user.travelStyle,
      };

      // Map user data to stats
      const stats: ProfileStats = {
        totalPoints: user.totalPoints,
        level: user.level,
        totalBookings: user.totalBookings,
        totalTrips: user.totalTrips,
        countriesVisited: user.countriesVisited,
        badges: user.badges.length,
      };

      return {
        user,
        profile,
        stats,
      };
    } catch (error) {
      console.error("Error in ProfilePresenter.getViewModel:", error);
      throw error;
    }
  }

  /**
   * Update profile data
   */
  async updateProfile(userId: string, data: UpdateProfileData): Promise<ProfileData> {
    try {
      // TODO: In real app, this would update the database
      // For now, we just simulate the update
      
      const user = USERS.find((u) => u.id === userId);
      if (!user) {
        throw new Error("User not found");
      }

      // Simulate update
      if (data.displayName) user.displayName = data.displayName;
      if (data.bio) user.bio = data.bio;
      if (data.nationality) user.nationality = data.nationality;
      if (data.languages) user.languages = data.languages;
      if (data.interests) user.interests = data.interests;
      if (data.travelStyle) user.travelStyle = data.travelStyle;

      return {
        displayName: user.displayName,
        email: user.email,
        bio: user.bio,
        nationality: user.nationality,
        languages: user.languages,
        interests: user.interests,
        travelStyle: user.travelStyle,
      };
    } catch (error) {
      console.error("Error in ProfilePresenter.updateProfile:", error);
      throw error;
    }
  }

  /**
   * Generate metadata for the page
   */
  async generateMetadata() {
    return {
      title: "โปรไฟล์ | Triply",
      description: "จัดการข้อมูลโปรไฟล์และการตั้งค่าของคุณ",
      keywords: ["profile", "settings", "account"],
    };
  }
}

/**
 * Factory for creating ProfilePresenter instances
 */
export class ProfilePresenterFactory {
  static async createServer(): Promise<ProfilePresenter> {
    return new ProfilePresenter();
  }

  static async createClient(): Promise<ProfilePresenter> {
    return new ProfilePresenter();
  }
}
