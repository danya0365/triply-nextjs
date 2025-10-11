# Triply - Travel Planning & Accommodation Booking Platform TODO

## 📋 Project Overview
แพลตฟอร์มจองที่พักและวางแผนท่องเที่ยว ที่ผ้ม Goals, Missions, Rewards และ Achievements เพื่อสร้าง engagement และทำให้ผู้ใช้อยากกลับมาใช้บริการอย่างต่อเนื่อง

**Core Features:**
- 🏨 Accommodation Booking (จองที่พัก)
- 🗺️ Trip Planning (วางแผนการเดินทาง)
- 🎯 Goals & Missions (เป้าหมายและภารกิจ)
- 🏆 Rewards & Achievements (รางวัลและความสำเร็จ)
- 👥 Social Travel (แชร์ประสบการณ์การเดินทาง)

---

## 🎯 Phase Overview

### Phase 1: Foundation & Core Setup (Week 1-2) ⏳
- [x] Project initialization
- [ ] Clean Architecture folder structure
- [ ] Design system & component library
- [ ] Master data creation
- [ ] Mock data creation

### Phase 2: UI Development with Mock Data (Week 3-6) 📝
- [x] Landing page (Hero, Destinations, Accommodations, How It Works, Gamification, Stats)
- [x] Layout (Navbar, Footer, MainLayout)
- [x] Browse accommodations (Filters, Search, Sort, Pagination)
- [ ] Accommodation detail
- [ ] Trip planner
- [ ] Gamification dashboard
- [ ] User dashboard

### Phase 3: Database & Backend Integration (Week 7-8) 🗄️
- [ ] Supabase setup
- [ ] Database schema migration
- [ ] RLS policies
- [ ] Backend services
- [ ] Replace mock data with real API

### Phase 4: Advanced Features (Week 9-10) 🚀
- [ ] Payment integration
- [ ] Booking system
- [ ] Trip collaboration
- [ ] Social features
- [ ] AI recommendations

### Phase 5: Gamification System (Week 11-12) 🎮
- [ ] Goals & missions engine
- [ ] Rewards system
- [ ] Achievements tracking
- [ ] Leaderboards
- [ ] Challenges

### Phase 6: Testing & Launch (Week 13-14) ✅
- [ ] Testing
- [ ] Performance optimization
- [ ] SEO optimization
- [ ] Deployment
- [ ] Launch

---

## 📝 Technical Stack

**Frontend:**
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- Zustand (state management + persistence via localforage)
- React Hook Form + Zod (forms validation)
- Axios (HTTP client)

**Backend:**
- Supabase (PostgreSQL, Auth, Storage)
- Row Level Security
- Edge Functions
- Realtime subscriptions

**Additional Services:**
- Socket.io (real-time collaboration)
- Mapbox/Google Maps (maps integration)
- Stripe (payment processing)
- SendGrid/Resend (email notifications)

---

## 🎯 Phase 1: Foundation & Core Setup

### 1.1 Project Architecture ✅
- [x] Setup Next.js 15 with App Router
- [x] Setup TypeScript
- [x] Setup Tailwind CSS v4
- [x] Setup Zustand for state management
- [x] Setup localforage for persistence
- [x] Setup axios for HTTP client
- [x] Setup Supabase for backend
- [x] Create Clean Architecture folder structure
  - [x] `/src/domain` - Entities, Interfaces, Types, Enums
  - [x] `/src/application` - Use Cases, DTOs, Services
  - [x] `/src/infrastructure` - API clients, Repositories, Storage
  - [x] `/src/presentation` - Components, Presenters, Hooks, Stores

### 1.2 Design System & Brand Identity
- [ ] **Color Palette - Travel & Adventure Theme**
  - [ ] Primary: Ocean Blue (#0EA5E9), Sunset Orange (#F97316)
  - [ ] Secondary: Forest Green (#10B981), Sand Beige (#F59E0B)
  - [ ] Accent: Purple (#8B5CF6), Pink (#EC4899)
  - [ ] Status colors (success, warning, error, info)
  
- [ ] **Typography**
  - [ ] Primary font: Poppins (headings)
  - [ ] Secondary font: Inter (body)
  - [ ] Thai font: Noto Sans Thai
  
- [ ] **Component Library (Atomic Design)**
  - [ ] **Atoms** - Button, Input, Badge, Icon, Avatar, Rating, Chip
  - [ ] **Molecules** - Card, Form Field, Search Bar, Date Picker, Price Range
  - [ ] **Organisms** - Navbar, Footer, Hero, Filter Sidebar, Map Viewer

- [ ] **Dark Mode Implementation**
  - [ ] Setup next-themes
  - [ ] Create dark theme palette
  - [ ] Toggle component

### 1.3 Master Data Creation
สร้างที่ `/src/data/master/`

- [ ] **destinations.master.ts** (50+ destinations)
  ```typescript
  - id, name, slug, country, region
  - description, highlights[]
  - images[], coverImage
  - popularityScore, seasonality
  - averageBudget, currency
  - coordinates: { lat, lng }
  - tags[] (beach, mountain, city, culture, adventure)
  ```

- [ ] **accommodation-types.master.ts**
  ```typescript
  - id, name, slug, icon
  - description, features[]
  - priceRange (budget, mid-range, luxury, ultra-luxury)
  ```

- [ ] **amenities.master.ts**
  ```typescript
  - id, name, category, icon
  - categories: essentials, comfort, safety, entertainment
  ```

- [ ] **activity-categories.master.ts**
  ```typescript
  - id, name, slug, icon, color
  - categories: adventure, culture, food, shopping, relaxation
  ```

- [ ] **trip-themes.master.ts**
  ```typescript
  - id, name, slug, icon, description
  - themes: honeymoon, family, solo, adventure, luxury, budget
  ```

### 1.4 Mock Data Creation
สร้างที่ `/src/data/mock/`

- [ ] **accommodations.mock.ts** (100+ properties)
- [ ] **trips.mock.ts** (30+ sample trips)
- [ ] **users.mock.ts** (50+ users)
- [ ] **reviews.mock.ts** (200+ reviews)
- [ ] **bookings.mock.ts** (50+ bookings)
- [ ] **missions.mock.ts** (30+ missions)
- [ ] **achievements.mock.ts** (50+ achievements)

---

## 📚 Documentation Links

- **[TODO_FEATURES.md](./TODO_FEATURES.md)** - รายละเอียดฟีเจอร์ทั้งหมดของ Triply
- **[TODO_GAMIFICATION.md](./TODO_GAMIFICATION.md)** - ระบบ Goals, Missions, Rewards, Achievements
- **[TODO_DATABASE.md](./TODO_DATABASE.md)** - Database schema และ backend architecture

---

## 📋 Critical Development Rules

### ⚠️ **MUST FOLLOW RULES**

#### 1. **CREATE_PAGE_PATTERN.md is MANDATORY**
ทุกหน้าต้องสร้าง 4 ไฟล์ตาม pattern:
```
app/[path]/page.tsx                                    (Server Component)
src/presentation/presenters/[name]/[Name]Presenter.ts  (Business Logic)
src/presentation/presenters/[name]/use[Name]Presenter.ts (Hook)
src/presentation/components/[name]/[Name]View.tsx      (UI Component)
```

#### 2. **Clean Architecture Layers**
```
/src/domain         - Entities, Types, Enums, Interfaces (ไม่มี dependencies อื่น)
/src/application    - Use Cases, DTOs, Services (depend on domain only)
/src/infrastructure - Repositories, API clients, Supabase (implement interfaces from domain)
/src/presentation   - Presenters, Hooks, Components (UI layer)
```

#### 3. **Data Organization**
```
/src/data/master/   - Master Data (ข้อมูลคงที่: destinations, amenities, themes)
/src/data/mock/     - Mock Data (ข้อมูล dynamic: accommodations, trips, users)
```

---

## 🎯 Current Sprint Goals

**Sprint 1: Foundation & Data (Week 1-2)**
- [ ] Clean Architecture folder structure
- [ ] Design system complete
- [ ] Component library (Atoms, Molecules, Organisms)
- [ ] Master Data creation (destinations, amenities, themes)
- [ ] Mock Data creation (100+ accommodations, 30+ trips)

**Sprint 2: Core Pages (Week 3-4)**
- [x] Landing Page with hero and featured destinations ✅
- [x] Layout Components (Navbar + Footer) ✅
- [ ] Browse Accommodations with filters
- [ ] Accommodation Detail Page
- [ ] Trip Planner interface

**Sprint 3: Gamification UI (Week 5-6)**
- [ ] Gamification Dashboard
- [ ] Missions & Goals interface
- [ ] Rewards & Achievements showcase
- [ ] User Profile with stats

**Sprint 4: Backend Integration (Week 7-8)**
- [ ] Supabase setup and schema
- [ ] Authentication system
- [ ] Replace mock data with real API
- [ ] Booking system backend

**Sprint 5: Advanced Features (Week 9-10)**
- [ ] Payment integration
- [ ] Trip collaboration
- [ ] Social features
- [ ] AI recommendations

**Sprint 6: Gamification Engine (Week 11-12)**
- [ ] Goals & missions tracking
- [ ] Rewards distribution
- [ ] Achievements unlocking
- [ ] Leaderboards

**Sprint 7: Launch Preparation (Week 13-14)**
- [ ] Testing (Unit, Integration, E2E)
- [ ] Performance optimization
- [ ] SEO optimization
- [ ] Deployment & Launch

---

## 📊 Project Status

**Current Phase:** Phase 2 - UI Development with Mock Data
**Progress:** 60%
**Next Milestone:** Accommodation Detail Page
**Target Launch:** Week 14
**Design System:** ✅ Pastel Sky Theme (Sky Blue + Lavender)
**Data:** ✅ Master Data (4 types) + Mock Data (180+ items)
**Pages:** ✅ Landing + Browse Accommodations

---

## 🔗 Quick Links

- [Features Documentation](./TODO_FEATURES.md)
- [Gamification System](./TODO_GAMIFICATION.md)
- [Database Schema](./TODO_DATABASE.md)
- [CREATE_PAGE_PATTERN.md](./prompt/CREATE_PAGE_PATTERN.md)
