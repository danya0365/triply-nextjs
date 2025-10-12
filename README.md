# 🌍 Triply - Travel Planning Platform

A modern travel planning and booking platform built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, and **Clean Architecture** principles.

## ✨ Features

### 🏠 Core Features
- 🗺️ **Trip Planning** - Create and manage detailed trip itineraries
- 🏨 **Accommodation Booking** - Browse and book hotels, resorts, and unique stays
- 📍 **Destination Discovery** - Explore 50+ popular destinations in Thailand and Asia
- 📅 **Calendar View** - Visualize all bookings, trips, and missions in one place
- 🎮 **Gamification** - Earn points, badges, and level up through travel activities
- 👤 **User Dashboard** - Track your travel stats, bookings, and achievements

### 🔐 Authentication
- Login/Register with mock authentication
- 50+ test users available (all password: `password123`)
- Session persistence with Zustand + LocalStorage

### 📱 All Pages (16 Pages Total)

#### Public Pages (6)
- ✅ `/` - Landing page with featured destinations and accommodations
- ✅ `/accommodations` - Browse all accommodations with filters
- ✅ `/accommodations/[id]` - Accommodation detail page
- ✅ `/destinations` - Browse all destinations
- ✅ `/destinations/[slug]` - Destination detail page
- ✅ `/login` - Login page
- ✅ `/register` - Register page

#### Protected Pages (9)
- ✅ `/dashboard` - User dashboard with stats and quick actions
- ✅ `/profile` - User profile management
- ✅ `/bookings` - View and manage bookings
- ✅ `/calendar` - Calendar view of all events
- ✅ `/trips` - List of user's trips
- ✅ `/trips/[id]` - Trip detail page
- ✅ `/trip-planner` - Create and edit trips
- ✅ `/gamification` - Gamification dashboard with missions and badges

## 🏗️ Architecture

### Clean Architecture Pattern
```
📁 src/
├── 📁 presentation/
│   ├── 📁 presenters/     # Business logic layer
│   └── 📁 components/     # UI components (Atomic Design)
├── 📁 data/
│   ├── 📁 mock/          # Mock data (users, trips, bookings)
│   └── 📁 master/        # Master data (destinations, amenities)
└── 📁 store/             # State management (Zustand)
```

### Key Patterns
- **Presenter Pattern** - Separation of business logic and UI
- **[State, Actions] Tuple** - Consistent hook interface
- **Factory Pattern** - Server/Client presenter creation
- **Atomic Design** - Component organization

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- Yarn (recommended) or npm

### Installation

```bash
# Clone repository
git clone <your-repo-url>
cd triply-nextjs

# Install dependencies
yarn install

# Run development server
yarn dev

# Build for production
yarn build

# Start production server
yarn start
```

### Development Server
Open [http://localhost:3001](http://localhost:3001) (or 3000 if available)

## 🧪 Testing

### Test Accounts
All users use password: `password123`

**Main Users:**
- `somchai@example.com` - Thai user with stats
- `sarah.johnson@example.com` - International traveler

**Other Users:**
- `user3@example.com` to `user50@example.com` - 48 additional test users

### Mock Data
- **50+ Users** with stats and badges
- **30+ Trips** with various planning stages
- **20+ Accommodations** across Thailand
- **50+ Destinations** in Thailand and Asia
- **20+ Missions** for gamification
- **15+ Badges** to collect

## 📁 Project Structure

```
triply-nextjs/
├── app/                          # Next.js App Router
│   ├── page.tsx                 # Landing page
│   ├── accommodations/          # Accommodation pages
│   ├── destinations/            # Destination pages
│   ├── trips/                   # Trip pages
│   ├── bookings/                # Booking pages
│   ├── calendar/                # Calendar page
│   ├── dashboard/               # Dashboard page
│   ├── profile/                 # Profile page
│   ├── gamification/            # Gamification page
│   ├── trip-planner/            # Trip planner page
│   ├── login/                   # Login page
│   └── register/                # Register page
├── src/
│   ├── presentation/
│   │   ├── presenters/         # Business logic
│   │   │   ├── landing/
│   │   │   ├── accommodations/
│   │   │   ├── destinations/
│   │   │   ├── trips/
│   │   │   ├── bookings/
│   │   │   ├── calendar/
│   │   │   ├── user-dashboard/
│   │   │   ├── profile/
│   │   │   ├── gamification/
│   │   │   └── trip-planner/
│   │   └── components/         # UI components
│   │       ├── landing/
│   │       ├── accommodations/
│   │       ├── destinations/
│   │       ├── trips/
│   │       ├── bookings/
│   │       ├── calendar/
│   │       ├── user-dashboard/
│   │       ├── profile/
│   │       ├── gamification/
│   │       ├── trip-planner/
│   │       ├── layout/         # Navbar, Footer
│   │       └── common/         # Shared components
│   ├── data/
│   │   ├── mock/              # Mock data
│   │   │   ├── users.mock.ts
│   │   │   ├── trips.mock.ts
│   │   │   ├── accommodations.mock.ts
│   │   │   ├── bookings.mock.ts
│   │   │   └── gamification.mock.ts
│   │   └── master/            # Master data
│   │       ├── destinations.master.ts
│   │       ├── amenities.master.ts
│   │       ├── accommodation-types.master.ts
│   │       └── trip-themes.master.ts
│   └── store/
│       └── authStore.ts       # Zustand auth store
├── docs/                      # Documentation
│   ├── CREATE_PAGE_PATTERN.md
│   └── ARCHITECTURE.md
└── public/                    # Static assets
```

## 🛠️ Tech Stack

### Core
- **Next.js 15.5.4** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **Turbopack** - Fast bundler

### State Management
- **Zustand** - Lightweight state management
- **zustand/middleware** - Persistence

### Development
- **ESLint** - Code linting
- **eslint-config-next** - Next.js specific rules

## 📝 Key Conventions

### File Naming
- Pages: `page.tsx`
- Presenters: `[Name]Presenter.ts`
- Hooks: `use[Name]Presenter.ts`
- Views: `[Name]View.tsx`
- Components: PascalCase

### Code Style
- Clean Architecture with SOLID principles
- Atomic Design for components
- [State, Actions] tuple pattern for hooks
- Mock data consistency across all pages

## 🎯 Features Roadmap

### Completed ✅
- [x] Landing page with featured content
- [x] Accommodations list and detail
- [x] Destinations list and detail
- [x] Trip planning and management
- [x] Trip detail view
- [x] Booking management
- [x] Calendar view
- [x] User dashboard
- [x] Profile management
- [x] Gamification system
- [x] Authentication (mock)
- [x] Dark mode support
- [x] Responsive design

### Future Enhancements 🚀
- [ ] Real API integration
- [ ] Payment processing
- [ ] Real-time chat
- [ ] Reviews and ratings
- [ ] Social features
- [ ] Mobile app (React Native)
- [ ] Push notifications
- [ ] Email notifications
- [ ] Multi-language support
- [ ] Currency conversion

## 📖 Documentation

- [CREATE_PAGE_PATTERN.md](/docs/CREATE_PAGE_PATTERN.md) - Guide for creating new pages
- [ARCHITECTURE.md](/docs/ARCHITECTURE.md) - System architecture details

## 🤝 Contributing

1. Follow the CREATE_PAGE_PATTERN.md for new pages
2. Maintain Clean Architecture principles
3. Use TypeScript strictly
4. Follow existing code conventions
5. Test with multiple mock users

## 📄 License

This project is for educational purposes.

## 👨‍💻 Developer

Created by **Marosdee Uma** (@danya0365)

---

**🎉 Happy Coding! Let's build amazing travel experiences!**
