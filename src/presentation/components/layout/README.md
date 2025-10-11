# Layout Components

Layout components สำหรับ Triply ที่ใช้ร่วมกันทุกหน้า

## 📁 Components

### 1. **MainLayout** (Template)
Main layout wrapper ที่รวม Navbar + Content + Footer

**Usage:**
```tsx
// app/layout.tsx
import { MainLayout } from "@/src/presentation/components/layout";

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
```

### 2. **Navbar** (Organism)
Navigation bar ด้านบนพร้อม links และ user actions

**Features:**
- 🏠 Logo + Brand (Triply with ✈️)
- 🔗 Navigation Links:
  - หน้าแรก (/)
  - ค้นหาที่พัก (/accommodations)
  - วางแผนทริป (/trip-planner)
  - รางวัล (/rewards)
  - เกี่ยวกับเรา (/about)
- 👤 User Menu:
  - Dashboard (🏆)
  - โปรไฟล์ (👤)
  - การจองของฉัน (📋)
  - ทริปของฉัน (🗺️)
  - ออกจากระบบ (🚪)
- 🔔 Notifications (with badge)
- 📱 Mobile Responsive (hamburger menu)
- 🌙 Dark Mode Support
- ✅ Sticky Position

**States:**
- `isAuthenticated` - แสดง user menu หรือ login/register buttons
- `isMobileMenuOpen` - เปิด/ปิด mobile menu
- `isUserMenuOpen` - เปิด/ปิด user dropdown

### 3. **Footer** (Organism)
Footer ด้านล่างพร้อม links, info, และ social media

**Sections:**
1. **Brand Section**
   - Triply logo
   - Description
   - App download badges (App Store, Google Play)

2. **Link Sections** (4 columns)
   - บริษัท: เกี่ยวกับเรา, ร่วมงาน, ข่าวสาร, บล็อก
   - ช่วยเหลือ: ศูนย์ช่วยเหลือ, FAQ, ติดต่อเรา, ความปลอดภัย
   - บริการ: ค้นหาที่พัก, วางแผนทริป, รางวัล, ลงทะเบียนที่พัก
   - กฎหมาย: ข้อกำหนด, Privacy, Cookies, การยกเลิก

3. **Newsletter Subscription**
   - Email input
   - Subscribe button
   - 100 bonus points offer

4. **Bottom Bar**
   - Copyright notice
   - Social media links (Facebook, Instagram, Twitter, YouTube, LinkedIn)
   - Language selector (🌐 ไทย)
   - Currency selector (💰 THB)

## 🎨 Design System

### Colors
- **Navbar**: White/Dark Gray background
- **Footer**: Dark Gray (bg-gray-900)
- **Gradient Brand**: Blue (#0EA5E9) → Orange (#F97316)

### Typography
- **Logo**: 2xl font-bold with gradient
- **Nav Links**: Regular text with hover states
- **Footer Headings**: Semibold white text
- **Footer Links**: Gray-300 text with white hover

### Spacing
- **Navbar**: h-16 (64px)
- **Footer**: py-12 (48px top/bottom)
- **Container**: mx-auto px-4 (responsive)

### Responsive Breakpoints
- **Mobile**: < 768px (hamburger menu)
- **Desktop**: ≥ 768px (full navigation)

## 🔗 Navigation Links

### Main Navigation
```typescript
const navLinks = [
  { href: "/", label: "หน้าแรก", icon: "🏠" },
  { href: "/accommodations", label: "ค้นหาที่พัก", icon: "🏨" },
  { href: "/trip-planner", label: "วางแผนทริป", icon: "🗺️" },
  { href: "/rewards", label: "รางวัล", icon: "🎁" },
  { href: "/about", label: "เกี่ยวกับเรา", icon: "ℹ️" },
];
```

### User Menu Links (Authenticated)
- `/dashboard` - Dashboard
- `/profile` - โปรไฟล์
- `/bookings` - การจองของฉัน
- `/trips` - ทริปของฉัน
- Logout action

### Footer Links (60+ links organized in 4 categories)
See component code for complete list

## 🚀 Features

### Navbar Features
- ✅ Sticky positioning (stays at top on scroll)
- ✅ Logo with hover animation
- ✅ Dropdown user menu
- ✅ Notification badge
- ✅ Mobile hamburger menu
- ✅ Smooth transitions
- ✅ Dark mode support
- ✅ Click outside to close menus (TODO)

### Footer Features
- ✅ 5-column responsive grid
- ✅ App download badges
- ✅ Newsletter subscription form
- ✅ Social media links
- ✅ Language/Currency selectors
- ✅ Comprehensive link organization
- ✅ Brand presence
- ✅ Copyright info

## 🎯 Usage Examples

### Basic Layout
```tsx
// Already implemented in app/layout.tsx
<MainLayout>
  <YourPageContent />
</MainLayout>
```

### Custom Layout (without Navbar/Footer)
```tsx
// For pages that need custom layout
export default function CustomPage() {
  return (
    <div>
      {/* No navbar/footer */}
      <YourContent />
    </div>
  );
}
```

### Conditional Navbar Items
```tsx
// TODO: Implement based on user role
{isHost && (
  <Link href="/host/dashboard">Host Dashboard</Link>
)}
```

## 🔧 Customization

### Adding New Nav Link
```tsx
// In Navbar.tsx, add to navLinks array
{ href: "/new-page", label: "New Page", icon: "🆕" }
```

### Adding Footer Section
```tsx
// In Footer.tsx, add to footerSections object
newSection: {
  title: "New Section",
  links: [
    { href: "/link1", label: "Link 1" },
    { href: "/link2", label: "Link 2" },
  ],
}
```

## 🎨 Theming

### Light Mode (Default)
- Navbar: `bg-white`
- Text: `text-gray-700`
- Hover: `hover:bg-gray-100`

### Dark Mode
- Navbar: `dark:bg-gray-900`
- Text: `dark:text-gray-300`
- Hover: `dark:hover:bg-gray-800`

## 📱 Mobile Responsiveness

### Navbar Mobile Menu
- Hamburger icon with animation
- Full-width dropdown menu
- All links accessible
- Login/Register buttons

### Footer Mobile Layout
- Stacks to single column on mobile
- App badges stack vertically
- Social icons remain horizontal
- Newsletter form full width

## 🔄 State Management

### Current Implementation
- Local state with `useState`
- Menu toggles handled in component

### Future Integration (TODO)
- [ ] Integrate Supabase auth for `isAuthenticated`
- [ ] Connect user profile data
- [ ] Implement notification system
- [ ] Add search functionality in navbar
- [ ] Theme toggle (light/dark mode)

## ✅ Accessibility

### Implemented
- ✅ Semantic HTML (`<nav>`, `<footer>`)
- ✅ Keyboard navigable links
- ✅ ARIA labels (TODO: improve)
- ✅ Proper heading hierarchy
- ✅ Alt text for images (when added)

### TODO
- [ ] Focus trap in mobile menu
- [ ] Escape key to close menus
- [ ] Screen reader announcements
- [ ] ARIA labels for icon buttons
- [ ] Skip to content link

## 🚀 Performance

- ✅ Client components only where needed
- ✅ Next.js Link for client-side navigation
- ✅ No heavy libraries
- ✅ Minimal JavaScript
- ✅ CSS transitions (GPU accelerated)

## 📝 Notes

### Authentication
Currently uses mock `isAuthenticated = false`. Replace with:
```tsx
// TODO: Replace with Supabase auth
import { useAuth } from "@/hooks/useAuth";
const { user, isAuthenticated } = useAuth();
```

### Notifications
Currently shows static badge. Implement real-time:
```tsx
// TODO: Connect to notification system
const { notifications, unreadCount } = useNotifications();
```

### Language & Currency
Currently static. Implement i18n:
```tsx
// TODO: Implement i18n
import { useTranslation } from "next-i18n";
const { t, locale, setLocale } = useTranslation();
```

## 🔗 Related Files

- **[app/layout.tsx](../../../../app/layout.tsx)** - Root layout implementation
- **[TODO.md](../../../../TODO.md)** - Project roadmap
- **[LANDING_PAGE_COMPLETE.md](../../../../LANDING_PAGE_COMPLETE.md)** - Landing page docs

---

**Created:** October 11, 2025  
**Status:** ✅ Complete and Ready to Use  
**Next:** Integrate with authentication system
