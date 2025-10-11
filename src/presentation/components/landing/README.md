# Landing Page Components

Landing Page สำหรับ Triply ออกแบบตาม **Clean Architecture** และ **Atomic Design**

## 📁 โครงสร้างไฟล์

```
app/page.tsx                          # Server Component (Entry Point)
src/
├── presentation/
│   ├── presenters/landing/
│   │   ├── LandingPresenter.ts       # Business Logic Layer
│   │   ├── useLandingPresenter.ts    # Client Hook
│   │   └── index.ts
│   └── components/landing/
│       ├── LandingView.tsx           # Main View Component
│       ├── HeroSection.tsx           # Hero with Search
│       ├── FeaturedDestinations.tsx  # Popular Destinations Grid
│       ├── TrendingAccommodations.tsx # Featured Properties
│       ├── HowItWorks.tsx            # 4-Step Process
│       ├── GamificationPreview.tsx   # Rewards System Preview
│       ├── StatisticsSection.tsx     # Platform Stats
│       └── index.ts
└── infrastructure/
    └── config/
        ├── supabase-server-client.ts # Server-side Supabase
        └── supabase-client-client.ts # Client-side Supabase
```

## 🎨 Components Overview

### 1. **LandingView** (Main Container)
- Orchestrates all section components
- Receives `viewModel` from presenter
- Full-page layout with sections

### 2. **HeroSection**
- Full-width hero banner with gradient background
- Search form (destination, dates, guests)
- Quick action buttons
- **Interactive**: Search functionality ready for implementation

### 3. **FeaturedDestinations**
- Grid layout (responsive: 1-2-4 columns)
- Displays 4 popular destinations
- Shows: Image, name, country, property count, starting price, tags
- **Props**: `destinations: Destination[]`

### 4. **TrendingAccommodations**
- Featured properties showcase
- Horizontal card layout
- Displays: Image, name, location, rating, amenities, price
- **Props**: `accommodations: Accommodation[]`

### 5. **HowItWorks**
- 4-step process visualization
- Icons with connecting lines
- Steps: Search → Plan → Book → Travel

### 6. **GamificationPreview**
- Showcases rewards system
- 4 features grid (Missions, Achievements, Rewards, Levels)
- CTA for signup with bonus points

### 7. **StatisticsSection**
- Platform metrics display
- Shows: Total properties, destinations, travelers, rating
- Trust badges (verified, secure payment, 24/7 support)
- **Props**: `statistics: Statistics`

## 🔄 Data Flow (Clean Architecture)

```
[app/page.tsx] Server Component
     ↓
[LandingPresenterFactory.createServer()]
     ↓
[LandingPresenter.getViewModel()]
     ↓ (fetches data from Supabase/mock)
[LandingViewModel] { destinations, accommodations, statistics }
     ↓
[LandingView] receives viewModel
     ↓
[Individual Components] render with data
```

## 🎯 Presenter Pattern

### Server-Side (SSR)
```typescript
// app/page.tsx
const presenter = await LandingPresenterFactory.createServer();
const viewModel = await presenter.getViewModel();
return <LandingView viewModel={viewModel} />;
```

### Client-Side (for interactions)
```typescript
// In a client component
const [state, actions] = useLandingPresenter(initialViewModel);
// state: { viewModel, loading, error }
// actions: { refreshData, setError }
```

## 📊 Data Types

### LandingViewModel
```typescript
interface LandingViewModel {
  featuredDestinations: Destination[];
  trendingAccommodations: Accommodation[];
  statistics: Statistics;
}
```

### Destination
```typescript
interface Destination {
  id: string;
  name: string;
  country: string;
  image: string;
  propertiesCount: number;
  startingPrice: number;
  tags: string[];
}
```

### Accommodation
```typescript
interface Accommodation {
  id: string;
  name: string;
  location: string;
  image: string;
  rating: number;
  reviewCount: number;
  pricePerNight: number;
  amenities: string[];
  isFeatured: boolean;
}
```

### Statistics
```typescript
interface Statistics {
  totalProperties: number;
  destinations: number;
  happyTravelers: number;
  averageRating: number;
}
```

## 🎨 Design System

### Colors (Tailwind Classes)
- **Primary Blue**: `from-blue-500 to-cyan-500`
- **Primary Orange**: `from-orange-500 to-red-500`
- **Gradient**: `from-blue-500 to-orange-500`
- **Purple**: `from-purple-500 to-pink-500`
- **Green**: `from-green-500 to-emerald-500`

### Typography
- Heading: `text-4xl font-bold`
- Subheading: `text-xl text-gray-600`
- Body: `text-gray-700 dark:text-gray-300`

### Spacing
- Section: `py-16 px-4`
- Container: `container mx-auto`
- Card Gap: `gap-6` or `gap-8`

## ✅ Current Status

**Phase 1 - Complete:**
- ✅ Clean Architecture folder structure
- ✅ Presenter + Hook pattern
- ✅ 7 UI components (responsive)
- ✅ Mock data integration
- ✅ Dark mode support
- ✅ Tailwind CSS styling

**Mock Data Currently Used:**
- 4 Featured Destinations (Phuket, Chiang Mai, Bangkok, Bali)
- 2 Trending Accommodations
- Platform statistics

## 🚀 Next Steps

### Immediate (Phase 2)
1. **Replace Mock Data**
   - Create master data files in `/src/data/master/`
   - Create mock data files in `/src/data/mock/`
   - Update `LandingPresenter` to use real data

2. **Add Interactions**
   - Implement search functionality
   - Add click handlers for cards
   - Navigate to detail pages

3. **Add Navigation**
   - Create Navbar component
   - Create Footer component
   - Add to `LandingView`

4. **Add Images**
   - Replace emoji placeholders with real images
   - Use Next.js Image component
   - Optimize for performance

### Future Enhancements
- Loading states
- Error boundaries
- Skeleton loaders
- Image lazy loading
- SEO optimization
- Analytics tracking
- A/B testing ready

## 📝 Development Guidelines

### Adding New Sections
1. Create component in `components/landing/[SectionName].tsx`
2. Export from `components/landing/index.ts`
3. Import and use in `LandingView.tsx`
4. Update presenter if data needed

### Modifying Data
1. Update types in `LandingPresenter.ts`
2. Update mock data constants
3. Update component props if needed
4. Re-test all components

### Styling
- Follow Tailwind CSS conventions
- Use gradient classes for visual appeal
- Maintain responsive design (mobile-first)
- Support dark mode with `dark:` prefix

## 🧪 Testing

Run the dev server:
```bash
npm run dev
```

Visit: `http://localhost:3000`

### What to Check:
- [ ] All sections render correctly
- [ ] Responsive layout (mobile, tablet, desktop)
- [ ] Dark mode works
- [ ] Search form inputs work
- [ ] Hover effects on cards
- [ ] No console errors
- [ ] Data displays correctly

## 📚 References

- [CREATE_PAGE_PATTERN.md](../../../prompt/CREATE_PAGE_PATTERN.md) - Page creation pattern
- [TODO_FEATURES.md](../../../TODO_FEATURES.md) - Feature requirements
- [TODO.md](../../../TODO.md) - Project roadmap
