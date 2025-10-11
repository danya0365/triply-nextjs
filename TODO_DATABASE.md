# Triply - Database Schema & Backend Architecture

รายละเอียด Database Schema, Backend Services และ API Structure

---

## 🗄️ Database Schema

### Core Tables

#### **profiles** (User Profiles)
```sql
- id (uuid, references auth.users)
- email (text, unique)
- display_name (text)
- avatar_url (text)
- bio (text)
- date_of_birth (date)
- gender (text)
- nationality (text)
- phone (text)
-
-- Gamification fields
- total_points (integer, default 0)
- current_tier (text, default 'explorer') -- explorer, adventurer, voyager, globetrotter
- level (integer, default 1)
- experience_points (integer, default 0)
- 
-- Stats
- total_bookings (integer, default 0)
- total_trips (integer, default 0)
- countries_visited (integer, default 0)
- badges (jsonb) -- array of badge ids
- 
-- Preferences
- travel_style (text[]) -- adventure, luxury, budget, culture
- interests (text[]) -- beach, mountain, city, food
- preferred_currency (text, default 'THB')
- preferred_language (text, default 'th')
- 
-- Settings
- notification_settings (jsonb)
- privacy_settings (jsonb)
- 
-- Timestamps
- created_at (timestamp with time zone)
- updated_at (timestamp with time zone)
- last_login (timestamp with time zone)
```

---

### Accommodation Tables

#### **destinations**
```sql
- id (uuid, primary key)
- name (text, not null)
- slug (text, unique)
- country (text)
- region (text) -- Southeast Asia, Europe, etc.
- description (text)
- highlights (text[])
- cover_image (text)
- images (text[])
- coordinates (point) -- PostGIS
- popularity_score (integer, default 0)
- average_budget (jsonb) -- {min, max, currency}
- best_season (text[]) -- month names
- timezone (text)
- currency (text)
- language (text[])
- tags (text[]) -- beach, mountain, city, culture
- is_featured (boolean, default false)
- created_at (timestamp)
- updated_at (timestamp)
```

#### **accommodations**
```sql
- id (uuid, primary key)
- slug (text, unique)
- host_id (uuid, references profiles)
- destination_id (uuid, references destinations)
- 
-- Basic Info
- name (text, not null)
- property_type (text) -- hotel, resort, villa, apartment, hostel
- description (text)
- highlights (text[])
- 
-- Location
- address (text)
- coordinates (point)
- distance_from_center (numeric) -- km
- 
-- Images
- cover_image (text)
- images (jsonb) -- [{url, caption, order, category}]
- 
-- Pricing
- base_price_per_night (numeric)
- currency (text, default 'THB')
- pricing_rules (jsonb) -- seasonal, weekend pricing
- cleaning_fee (numeric)
- service_fee_percentage (numeric)
- 
-- Capacity
- max_guests (integer)
- bedrooms (integer)
- beds (integer)
- bathrooms (numeric)
- 
-- Amenities
- amenities (text[]) -- array of amenity ids
- 
-- Policies
- check_in_time (time)
- check_out_time (time)
- minimum_nights (integer, default 1)
- maximum_nights (integer)
- cancellation_policy (text)
- house_rules (text[])
- 
-- Status & Features
- status (text, default 'active') -- draft, active, suspended, archived
- is_instant_book (boolean, default false)
- is_verified (boolean, default false)
- verified_date (timestamp)
- is_featured (boolean, default false)
- 
-- Stats
- total_bookings (integer, default 0)
- average_rating (numeric)
- review_count (integer, default 0)
- view_count (integer, default 0)
- favorite_count (integer, default 0)
- 
-- Timestamps
- created_at (timestamp)
- updated_at (timestamp)
- published_at (timestamp)
```

#### **accommodation_availability**
```sql
- id (uuid, primary key)
- accommodation_id (uuid, references accommodations)
- date (date, not null)
- is_available (boolean, default true)
- price_override (numeric) -- if different from base price
- minimum_nights_override (integer)
- notes (text)
- created_at (timestamp)
- updated_at (timestamp)
- 
UNIQUE (accommodation_id, date)
```

---

### Booking Tables

#### **bookings**
```sql
- id (uuid, primary key)
- booking_reference (text, unique) -- e.g., TRP-20250111-ABCD
- accommodation_id (uuid, references accommodations)
- user_id (uuid, references profiles)
- host_id (uuid, references profiles)
- 
-- Booking Details
- check_in_date (date, not null)
- check_out_date (date, not null)
- num_nights (integer)
- num_guests (integer)
- num_adults (integer)
- num_children (integer)
- 
-- Pricing
- base_price (numeric)
- cleaning_fee (numeric)
- service_fee (numeric)
- taxes (numeric)
- discount_amount (numeric)
- total_price (numeric, not null)
- currency (text)
- 
-- Payment
- payment_status (text) -- pending, paid, partially_refunded, refunded
- payment_method (text) -- card, bank_transfer, points
- payment_id (text) -- Stripe payment ID
- paid_at (timestamp)
- 
-- Status
- status (text, default 'pending') 
  -- pending, confirmed, checked_in, checked_out, cancelled, disputed
- confirmed_at (timestamp)
- cancelled_at (timestamp)
- cancellation_reason (text)
- refund_amount (numeric)
- refunded_at (timestamp)
- 
-- Gamification
- points_earned (integer, default 0)
- points_awarded (boolean, default false)
- 
-- Guest Info
- guest_name (text)
- guest_email (text)
- guest_phone (text)
- special_requests (text)
- 
-- Timestamps
- created_at (timestamp)
- updated_at (timestamp)
```

#### **reviews**
```sql
- id (uuid, primary key)
- booking_id (uuid, references bookings)
- accommodation_id (uuid, references accommodations)
- reviewer_id (uuid, references profiles)
- host_id (uuid, references profiles)
- 
-- Review Content
- overall_rating (integer) -- 1-10
- ratings (jsonb) -- {cleanliness, location, service, facilities, value, comfort}
- title (text)
- comment (text)
- photos (text[])
- 
-- Metadata
- is_verified_booking (boolean, default true)
- helpful_count (integer, default 0)
- report_count (integer, default 0)
- 
-- Host Response
- host_response (text)
- host_responded_at (timestamp)
- 
-- Gamification
- points_earned (integer, default 0)
- 
-- Timestamps
- created_at (timestamp)
- updated_at (timestamp)
```

---

### Trip Planning Tables

#### **trips**
```sql
- id (uuid, primary key)
- creator_id (uuid, references profiles, not null)
- slug (text, unique)
- 
-- Trip Info
- name (text, not null)
- description (text)
- cover_image (text)
- 
-- Travel Details
- start_date (date)
- end_date (date)
- duration_days (integer)
- destinations (text[]) -- array of destination ids
- 
-- Travelers
- num_adults (integer, default 1)
- num_children (integer, default 0)
- travelers (jsonb) -- [{user_id, name, role}]
- 
-- Budget
- total_budget (numeric)
- currency (text, default 'THB')
- budget_breakdown (jsonb) 
  -- {accommodation, activities, food, transport, shopping, misc}
- actual_spending (jsonb)
- 
-- Planning Status
- completion_percentage (integer, default 0)
- planning_stage (text) -- draft, planning, ready, booked, completed
- 
-- Settings
- is_public (boolean, default false)
- is_collaborative (boolean, default false)
- visibility (text, default 'private') -- private, friends, public
- 
-- Gamification
- points_earned (integer, default 0)
- 
-- Stats
- view_count (integer, default 0)
- like_count (integer, default 0)
- clone_count (integer, default 0)
- 
-- Timestamps
- created_at (timestamp)
- updated_at (timestamp)
- published_at (timestamp)
- completed_at (timestamp)
```

#### **trip_days**
```sql
- id (uuid, primary key)
- trip_id (uuid, references trips, on delete cascade)
- day_number (integer, not null)
- date (date)
- title (text)
- notes (text)
- budget (numeric)
- actual_spending (numeric)
- created_at (timestamp)
- updated_at (timestamp)
- 
UNIQUE (trip_id, day_number)
```

#### **trip_activities**
```sql
- id (uuid, primary key)
- trip_id (uuid, references trips)
- trip_day_id (uuid, references trip_days)
- 
-- Activity Details
- activity_type (text) -- accommodation, attraction, restaurant, transport
- title (text, not null)
- description (text)
- location (text)
- coordinates (point)
- 
-- Timing
- start_time (time)
- end_time (time)
- duration_minutes (integer)
- order_index (integer)
- 
-- Booking
- accommodation_id (uuid, references accommodations) -- if booked
- booking_id (uuid, references bookings) -- if booked
- is_booked (boolean, default false)
- 
-- Pricing
- estimated_cost (numeric)
- actual_cost (numeric)
- currency (text)
- 
-- Metadata
- url (text) -- external link
- photos (text[])
- tags (text[])
- is_must_do (boolean, default false)
- 
-- Timestamps
- created_at (timestamp)
- updated_at (timestamp)
```

#### **trip_collaborators**
```sql
- id (uuid, primary key)
- trip_id (uuid, references trips)
- user_id (uuid, references profiles)
- role (text) -- owner, editor, viewer
- invited_by (uuid, references profiles)
- invitation_status (text) -- pending, accepted, declined
- joined_at (timestamp)
- created_at (timestamp)
- 
UNIQUE (trip_id, user_id)
```

---

### Gamification Tables

#### **user_points_transactions**
```sql
- id (uuid, primary key)
- user_id (uuid, references profiles, not null)
- 
-- Transaction Details
- points (integer, not null) -- positive or negative
- transaction_type (text, not null)
  -- earn, redeem, bonus, penalty, refund, transfer
- source_type (text)
  -- booking, review, mission, achievement, referral, daily_login
- source_id (uuid) -- reference to booking, mission, etc.
- 
-- Description
- title (text)
- description (text)
- 
-- Metadata
- balance_before (integer)
- balance_after (integer)
- multiplier (numeric, default 1.0) -- tier multiplier applied
- 
-- Timestamps
- created_at (timestamp)
```

#### **missions**
```sql
- id (uuid, primary key)
- 
-- Mission Info
- name (text, not null)
- slug (text, unique)
- description (text)
- icon (text)
- 
-- Requirements
- mission_type (text) -- daily, weekly, monthly, special, progressive
- category (text) -- booking, planning, social, exploration
- requirements (jsonb)
  -- {type: "complete_bookings", count: 3, filters: {...}}
- 
-- Rewards
- points_reward (integer)
- bonus_rewards (jsonb) -- badges, vouchers, etc.
- 
-- Availability
- is_active (boolean, default true)
- start_date (timestamp)
- end_date (timestamp)
- max_completions (integer) -- null for unlimited
- current_completions (integer, default 0)
- 
-- Difficulty
- difficulty_level (text) -- easy, medium, hard
- estimated_duration (integer) -- minutes
- 
-- Display
- is_featured (boolean, default false)
- display_order (integer)
- 
-- Timestamps
- created_at (timestamp)
- updated_at (timestamp)
```

#### **user_missions**
```sql
- id (uuid, primary key)
- user_id (uuid, references profiles)
- mission_id (uuid, references missions)
- 
-- Progress
- status (text, default 'active') -- active, completed, failed, expired
- progress (jsonb) -- current progress data
- progress_percentage (integer, default 0)
- 
-- Completion
- completed_at (timestamp)
- points_earned (integer)
- rewards_claimed (jsonb)
- 
-- Timestamps
- accepted_at (timestamp)
- expires_at (timestamp)
- created_at (timestamp)
- updated_at (timestamp)
- 
UNIQUE (user_id, mission_id)
```

#### **achievements**
```sql
- id (uuid, primary key)
- 
-- Achievement Info
- name (text, not null)
- slug (text, unique)
- description (text)
- icon (text)
- badge_image (text)
- 
-- Category
- category (text) -- traveler, planner, social, special
- rarity (text) -- common, uncommon, rare, epic, legendary, limited, hidden
- 
-- Requirements
- requirements (jsonb)
  -- {type: "visit_countries", count: 10}
- 
-- Rewards
- points_reward (integer)
- badge_id (text)
- 
-- Metadata
- is_active (boolean, default true)
- is_hidden (boolean, default false) -- hidden achievements
- unlock_count (integer, default 0)
- 
-- Display
- display_order (integer)
- 
-- Timestamps
- created_at (timestamp)
- updated_at (timestamp)
```

#### **user_achievements**
```sql
- id (uuid, primary key)
- user_id (uuid, references profiles)
- achievement_id (uuid, references achievements)
- 
-- Progress
- progress (jsonb)
- progress_percentage (integer, default 0)
- is_unlocked (boolean, default false)
- 
-- Completion
- unlocked_at (timestamp)
- points_earned (integer)
- 
-- Display
- is_showcased (boolean, default false) -- display on profile
- 
-- Timestamps
- created_at (timestamp)
- updated_at (timestamp)
- 
UNIQUE (user_id, achievement_id)
```

#### **rewards_catalog**
```sql
- id (uuid, primary key)
- 
-- Reward Info
- name (text, not null)
- slug (text, unique)
- description (text)
- image (text)
- 
-- Type & Category
- reward_type (text) -- discount, upgrade, service, experience, partner
- category (text)
- 
-- Cost & Value
- points_cost (integer, not null)
- monetary_value (numeric) -- actual value in currency
- currency (text)
- 
-- Availability
- is_active (boolean, default true)
- stock_quantity (integer) -- null for unlimited
- available_quantity (integer)
- 
-- Terms
- terms_and_conditions (text)
- minimum_booking_value (numeric) -- for discount vouchers
- valid_days (integer) -- days valid after redemption
- blackout_dates (date[])
- applicable_properties (text[]) -- specific accommodations
- 
-- Display
- is_featured (boolean, default false)
- display_order (integer)
- 
-- Stats
- redemption_count (integer, default 0)
- 
-- Timestamps
- created_at (timestamp)
- updated_at (timestamp)
```

#### **user_rewards**
```sql
- id (uuid, primary key)
- user_id (uuid, references profiles)
- reward_id (uuid, references rewards_catalog)
- 
-- Redemption
- code (text, unique) -- voucher code
- points_spent (integer)
- redeemed_at (timestamp)
- 
-- Usage
- status (text, default 'active') -- active, used, expired
- used_at (timestamp)
- used_for_booking_id (uuid, references bookings)
- 
-- Validity
- valid_from (timestamp)
- valid_until (timestamp)
- 
-- Timestamps
- created_at (timestamp)
- updated_at (timestamp)
```

#### **challenges**
```sql
- id (uuid, primary key)
- 
-- Challenge Info
- name (text, not null)
- slug (text, unique)
- description (text)
- image (text)
- 
-- Type
- challenge_type (text) -- time_limited, competitive, community, seasonal
- 
-- Duration
- start_date (timestamp)
- end_date (timestamp)
- duration_hours (integer)
- 
-- Requirements
- requirements (jsonb)
- entry_fee_points (integer, default 0)
- max_participants (integer) -- null for unlimited
- 
-- Rewards
- rewards (jsonb) -- {1st: {...}, 2nd: {...}, participation: {...}}
- 
-- Stats
- participant_count (integer, default 0)
- completion_count (integer, default 0)
- 
-- Display
- is_featured (boolean, default true)
- 
-- Timestamps
- created_at (timestamp)
- updated_at (timestamp)
```

#### **user_challenges**
```sql
- id (uuid, primary key)
- user_id (uuid, references profiles)
- challenge_id (uuid, references challenges)
- 
-- Participation
- status (text, default 'active') -- active, completed, failed
- progress (jsonb)
- score (numeric)
- rank (integer)
- 
-- Rewards
- rewards_earned (jsonb)
- points_earned (integer)
- 
-- Timestamps
- joined_at (timestamp)
- completed_at (timestamp)
- created_at (timestamp)
- updated_at (timestamp)
- 
UNIQUE (user_id, challenge_id)
```

---

### Social Tables

#### **favorites** (Wishlists)
```sql
- id (uuid, primary key)
- user_id (uuid, references profiles)
- accommodation_id (uuid, references accommodations)
- notes (text)
- notify_price_drop (boolean, default false)
- target_price (numeric)
- created_at (timestamp)
- 
UNIQUE (user_id, accommodation_id)
```

#### **social_posts**
```sql
- id (uuid, primary key)
- user_id (uuid, references profiles)
- 
-- Content
- content_type (text) -- text, photo, trip_share, review_share
- text_content (text)
- images (text[])
- 
-- References
- trip_id (uuid, references trips)
- booking_id (uuid, references bookings)
- review_id (uuid, references reviews)
- 
-- Engagement
- like_count (integer, default 0)
- comment_count (integer, default 0)
- share_count (integer, default 0)
- 
-- Visibility
- visibility (text, default 'public') -- public, friends, private
- 
-- Timestamps
- created_at (timestamp)
- updated_at (timestamp)
```

#### **follows**
```sql
- id (uuid, primary key)
- follower_id (uuid, references profiles)
- following_id (uuid, references profiles)
- created_at (timestamp)
- 
UNIQUE (follower_id, following_id)
```

---

## 🔐 Row Level Security (RLS) Policies

### Public Read Access
```sql
-- Active accommodations
- SELECT on accommodations WHERE status = 'active'
- SELECT on destinations (all)
- SELECT on reviews (all verified)
- SELECT on public trips WHERE visibility = 'public'
```

### Authenticated User Access
```sql
-- Own profile
- SELECT, UPDATE on profiles WHERE id = auth.uid()

-- Own bookings
- SELECT, INSERT, UPDATE on bookings WHERE user_id = auth.uid()

-- Own trips
- CRUD on trips WHERE creator_id = auth.uid()
- SELECT on trips WHERE collaborator

-- Own gamification data
- SELECT on user_points_transactions WHERE user_id = auth.uid()
- SELECT, UPDATE on user_missions WHERE user_id = auth.uid()
- SELECT, UPDATE on user_achievements WHERE user_id = auth.uid()
- SELECT, INSERT on user_rewards WHERE user_id = auth.uid()

-- Reviews
- INSERT on reviews WHERE reviewer_id = auth.uid() AND has_booking
- UPDATE, DELETE on reviews WHERE reviewer_id = auth.uid()

-- Social
- INSERT on favorites WHERE user_id = auth.uid()
- INSERT, DELETE on follows WHERE follower_id = auth.uid()
```

### Host Access
```sql
-- Own accommodations
- CRUD on accommodations WHERE host_id = auth.uid()
- CRUD on accommodation_availability WHERE accommodation.host_id = auth.uid()

-- Bookings for own properties
- SELECT on bookings WHERE host_id = auth.uid()
- UPDATE status on bookings WHERE host_id = auth.uid()

-- Reviews for own properties
- SELECT, INSERT (response) on reviews WHERE host_id = auth.uid()
```

### Admin Access
```sql
-- Full access to all tables
- Full CRUD permissions
- Manage missions, achievements, rewards
- Verify accommodations
- Handle disputes
```

---

## 📡 Backend Services & APIs

### Use Cases Structure

#### Accommodation Service
```typescript
- getAllAccommodations(filters, pagination)
- getAccommodationById(id)
- searchAccommodations(query, filters)
- getFeaturedAccommodations()
- createAccommodation(data) // host only
- updateAccommodation(id, data) // host only
- deleteAccommodation(id) // host only
- checkAvailability(id, dates)
- getAvailableAccommodations(destination, dates)
```

#### Booking Service
```typescript
- createBooking(accommodationId, details)
- getBooking(id)
- getUserBookings(userId, filters)
- getHostBookings(hostId, filters)
- updateBookingStatus(id, status)
- cancelBooking(id, reason)
- processPayment(bookingId, paymentData)
- processRefund(bookingId, amount)
```

#### Trip Planning Service
```typescript
- createTrip(data)
- getTrip(id)
- getUserTrips(userId)
- updateTrip(id, data)
- deleteTrip(id)
- addTripDay(tripId, dayData)
- addActivity(tripDayId, activityData)
- inviteCollaborator(tripId, email, role)
- publishTrip(id)
- cloneTrip(id)
```

#### Gamification Service
```typescript
-- Points
- getUserPoints(userId)
- awardPoints(userId, amount, source)
- redeemPoints(userId, amount, rewardId)
- getPointsHistory(userId)

-- Missions
- getAvailableMissions(userId)
- getUserMissions(userId, status)
- acceptMission(userId, missionId)
- trackMissionProgress(userId, missionId, action)
- completeMission(userId, missionId)

-- Achievements
- getUserAchievements(userId)
- checkAchievementProgress(userId, achievementId)
- unlockAchievement(userId, achievementId)

-- Rewards
- getRewardsCatalog()
- redeemReward(userId, rewardId)
- getUserRewards(userId)
- applyReward(bookingId, rewardCode)

-- Challenges
- getActiveChallenges()
- joinChallenge(userId, challengeId)
- getChallengeLeaderboard(challengeId)
- updateChallengeProgress(userId, challengeId, progress)

-- Leaderboards
- getGlobalLeaderboard(timeframe)
- getCategoryLeaderboard(category)
- getFriendsLeaderboard(userId)
```

#### Review Service
```typescript
- createReview(bookingId, reviewData)
- getAccommodationReviews(accommodationId, filters)
- getUserReviews(userId)
- updateReview(id, data)
- deleteReview(id)
- addHostResponse(reviewId, response)
- markReviewHelpful(reviewId, userId)
```

#### User Service
```typescript
- getProfile(userId)
- updateProfile(userId, data)
- updatePreferences(userId, preferences)
- uploadAvatar(userId, file)
- getUserStats(userId)
- updateNotificationSettings(userId, settings)
```

---

## 🔄 Database Functions & Triggers

### Functions

```sql
-- Update accommodation average rating
CREATE FUNCTION update_accommodation_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE accommodations
  SET 
    average_rating = (
      SELECT AVG(overall_rating) 
      FROM reviews 
      WHERE accommodation_id = NEW.accommodation_id
    ),
    review_count = (
      SELECT COUNT(*) 
      FROM reviews 
      WHERE accommodation_id = NEW.accommodation_id
    )
  WHERE id = NEW.accommodation_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Award points for booking
CREATE FUNCTION award_booking_points()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'confirmed' AND NOT NEW.points_awarded THEN
    INSERT INTO user_points_transactions (
      user_id, points, transaction_type, source_type, source_id,
      title, description
    ) VALUES (
      NEW.user_id, 
      FLOOR(NEW.total_price * 0.1), -- 10% of booking value as points
      'earn', 
      'booking', 
      NEW.id,
      'Booking Points',
      'Earned from booking #' || NEW.booking_reference
    );
    
    UPDATE bookings 
    SET points_awarded = true, points_earned = FLOOR(NEW.total_price * 0.1)
    WHERE id = NEW.id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Track mission progress
CREATE FUNCTION track_mission_progress()
RETURNS TRIGGER AS $$
-- Logic to update user_missions progress based on actions
$$ LANGUAGE plpgsql;
```

### Triggers

```sql
-- Update ratings on review insert/update
CREATE TRIGGER update_rating_trigger
AFTER INSERT OR UPDATE ON reviews
FOR EACH ROW
EXECUTE FUNCTION update_accommodation_rating();

-- Award points on booking confirmation
CREATE TRIGGER award_points_trigger
AFTER UPDATE ON bookings
FOR EACH ROW
WHEN (NEW.status = 'confirmed')
EXECUTE FUNCTION award_booking_points();

-- Track mission progress on various actions
CREATE TRIGGER track_missions_on_booking
AFTER INSERT ON bookings
FOR EACH ROW
EXECUTE FUNCTION track_mission_progress();
```

---

## 📊 Indexes for Performance

```sql
-- Accommodations
CREATE INDEX idx_accommodations_destination ON accommodations(destination_id);
CREATE INDEX idx_accommodations_status ON accommodations(status);
CREATE INDEX idx_accommodations_featured ON accommodations(is_featured);
CREATE INDEX idx_accommodations_coordinates ON accommodations USING GIST(coordinates);

-- Bookings
CREATE INDEX idx_bookings_user ON bookings(user_id);
CREATE INDEX idx_bookings_accommodation ON bookings(accommodation_id);
CREATE INDEX idx_bookings_dates ON bookings(check_in_date, check_out_date);
CREATE INDEX idx_bookings_status ON bookings(status);

-- Reviews
CREATE INDEX idx_reviews_accommodation ON reviews(accommodation_id);
CREATE INDEX idx_reviews_user ON reviews(reviewer_id);

-- Trips
CREATE INDEX idx_trips_creator ON trips(creator_id);
CREATE INDEX idx_trips_dates ON trips(start_date, end_date);
CREATE INDEX idx_trips_visibility ON trips(visibility);

-- Gamification
CREATE INDEX idx_points_user ON user_points_transactions(user_id);
CREATE INDEX idx_missions_user ON user_missions(user_id);
CREATE INDEX idx_achievements_user ON user_achievements(user_id);
```

---

## 🚀 Implementation Priority

### Phase 1: Core Schema (Week 7)
1. ✅ profiles, destinations, accommodations
2. ✅ bookings, reviews
3. ✅ Basic RLS policies

### Phase 2: Trip Planning (Week 7)
1. ✅ trips, trip_days, trip_activities
2. ✅ trip_collaborators
3. ✅ RLS policies for trips

### Phase 3: Gamification (Week 8)
1. ✅ user_points_transactions
2. ✅ missions, user_missions
3. ✅ achievements, user_achievements
4. ✅ rewards_catalog, user_rewards
5. ✅ challenges, user_challenges
6. ✅ Functions and triggers

### Phase 4: Social (Week 8)
1. ✅ favorites, follows
2. ✅ social_posts
3. ✅ RLS policies for social

---

## 📝 Notes

- All UUIDs use `gen_random_uuid()`
- Timestamps use `now()` for default
- Use PostGIS extension for geospatial data
- Enable pg_trgm for full-text search
- Consider partitioning large tables (bookings, points_transactions)
- Implement soft deletes where needed
- Use materialized views for complex analytics
