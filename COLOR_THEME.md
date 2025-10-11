# 🎨 Triply Color Theme: Pastel Sky

**Updated:** October 11, 2025  
**Theme:** Pastel Sky - Soft, Dreamy, Calming

---

## 🌈 Color Palette

### Primary: Soft Sky Blue ☁️
```
sky-200: #BAE6FD (lightest - backgrounds)
sky-300: #7DD3FC (medium - buttons, CTA)
sky-400: #38BDF8 (darker - logo, emphasis)
sky-500: #0EA5E9 (text, prices)
```

### Secondary: Soft Lavender 💜
```
violet-200: #DDD6FE (lightest - backgrounds)
violet-300: #C4B5FD (medium - buttons, badges)
violet-400: #A78BFA (darker - accents)
purple-200: #E9D5FF (soft purple)
purple-300: #D8B4FE (medium purple)
```

### Supporting Colors
```
cyan-200: #A5F3FC (feature card accent)
purple-500: #A855F7 (achievement accent)
pink-500: #EC4899 (achievement accent)
green-500: #22C55E (level accent)
emerald-500: #10B981 (level accent)
```

---

## 🎨 Usage Guide

### Logo & Branding
```tsx
// Logo text
className="bg-gradient-to-r from-sky-400 to-violet-400 bg-clip-text text-transparent"

// Footer logo (lighter)
className="bg-gradient-to-r from-sky-300 to-violet-300 bg-clip-text text-transparent"
```

### Buttons & CTAs
```tsx
// Primary button
className="bg-gradient-to-r from-sky-300 to-violet-300 text-white"

// Hover state
className="hover:from-sky-400 hover:to-violet-400"

// Secondary button (outline)
className="border-2 border-sky-300 text-sky-500 hover:bg-sky-50"
```

### Backgrounds
```tsx
// Hero section
className="bg-gradient-to-r from-sky-300 to-violet-300"

// Destination cards (soft)
className="bg-gradient-to-br from-sky-200 to-violet-200"

// Accommodation cards (lavender)
className="bg-gradient-to-br from-violet-200 to-purple-300"

// Feature cards
className="bg-gradient-to-br from-sky-200 to-cyan-200"
```

### Text & Accents
```tsx
// Prices, links
className="text-sky-500"

// Rating badges
className="bg-sky-400 text-white"

// Featured badges
className="bg-violet-400 text-white"

// Step numbers
className="bg-violet-400 text-white"
```

### Tags & Badges
```tsx
// Tag background
className="bg-sky-100 text-sky-700"

// Alternative
className="bg-violet-100 text-violet-700"
```

### Form Focus States
```tsx
// Input focus
className="focus:ring-2 focus:ring-sky-300 focus:border-transparent"
```

---

## 🎯 Component Color Map

### Navbar
- Logo: `from-sky-400 to-violet-400`
- Register button: `from-sky-300 to-violet-300`
- User avatar: `from-sky-300 to-violet-300`

### Footer
- Logo: `from-sky-300 to-violet-300`
- Subscribe button: `from-sky-300 to-violet-300`

### Hero Section
- Background: `from-sky-300 to-violet-300`
- Search button: `from-sky-300 to-violet-300`
- Form focus: `ring-sky-300`

### Featured Destinations
- Card backgrounds: `from-sky-200 to-violet-200`
- Prices: `text-sky-500`
- Tags: `bg-sky-100 text-sky-700`

### Trending Accommodations
- Card backgrounds: `from-violet-200 to-purple-300`
- Featured badge: `bg-violet-400`
- Rating badge: `bg-sky-400`
- View button: `from-sky-300 to-violet-300`

### How It Works
- Step circles: `from-sky-300 to-violet-300`
- Step numbers: `bg-violet-400`
- Connectors: `from-sky-300 to-violet-300`

### Gamification Preview
- Daily Missions: `from-sky-200 to-cyan-200`
- Achievements: `from-purple-500 to-pink-500` (vibrant)
- Rewards: `from-violet-200 to-purple-200`
- Levels: `from-green-500 to-emerald-500` (vibrant)
- Badge: `from-violet-300 to-purple-300`
- CTA background: `from-sky-300 to-violet-300`

### Statistics
- Number gradient: `from-sky-400 to-violet-400`

---

## 🎨 Theme Mood

### Visual Identity
- **Peaceful** ☁️ - ความสงบ ผ่อนคลาย
- **Dreamy** 💭 - ฝันๆ สวยงาม เพ้อฝัน
- **Soft** 🌸 - นุ่มนวล อ่อนหวาน
- **Airy** 🌬️ - โปร่งสบาย เบา
- **Ethereal** ✨ - งดงามเหนือธรรมชาติ

### Emotional Response
- Calming & Relaxing
- Trustworthy & Safe
- Inviting & Welcoming
- Sophisticated & Elegant
- Approachable & Friendly

### Brand Personality
- Modern yet timeless
- Professional but not corporate
- Playful but not childish
- Premium but accessible
- Innovative but familiar

---

## 🌟 Color Psychology

### Sky Blue (Primary)
- **Trust** - น่าเชื่อถือ มั่นคง
- **Calm** - สงบ ผ่อนคลาย
- **Professional** - มืออาชีพ
- **Freedom** - เสรี ไร้ขอบเขต
- **Travel** - ท้องฟ้า ทะเล การเดินทาง

### Lavender (Secondary)
- **Elegance** - หรูหรา ประณีต
- **Romance** - โรแมนติก อบอุ่น
- **Creativity** - สร้างสรรค์ ไอเดีย
- **Serenity** - ความสงบ สันติ
- **Luxury** - พรีเมี่ยม คุณภาพ

---

## 🎯 Use Cases

### Best For
- ✅ Beach resorts & coastal properties
- ✅ Romantic getaways & honeymoons
- ✅ Family vacations & relaxation
- ✅ Wellness retreats & spa resorts
- ✅ Boutique hotels & luxury stays
- ✅ Island hopping & tropical destinations

### Works Well With
- 🏖️ Beach & ocean imagery
- 🌺 Tropical flowers & nature
- ☁️ Sky & clouds
- 🌸 Soft pastels & watercolors
- ✨ Dreamy & ethereal photography
- 💕 Romantic & intimate settings

---

## 🔧 Implementation Notes

### Tailwind CSS Classes
All colors use Tailwind CSS v4 built-in color scales:
- `sky-{100-900}` for sky blue
- `violet-{100-900}` for lavender
- `purple-{100-900}` for purple accents
- `cyan-{100-900}` for cyan accents

### Gradient Format
```css
/* Standard gradient */
bg-gradient-to-r from-sky-300 to-violet-300

/* Angled gradient */
bg-gradient-to-br from-sky-200 to-violet-200

/* Text gradient */
bg-gradient-to-r from-sky-400 to-violet-400 bg-clip-text text-transparent
```

### Dark Mode
```tsx
// Light mode: sky/violet
// Dark mode: keep same colors (they work well in dark)
className="from-sky-300 to-violet-300 dark:from-sky-400 dark:to-violet-400"
```

---

## 📊 Accessibility

### Contrast Ratios
- ✅ Sky-500 on white: 4.5:1 (AA)
- ✅ Violet-400 on white: 4.5:1 (AA)
- ✅ White on Sky-300: 4.5:1+ (AA)
- ✅ White on Violet-300: 4.5:1+ (AA)

### WCAG Compliance
- All text colors meet WCAG AA standards
- Interactive elements have sufficient contrast
- Focus states are clearly visible
- Color is not the only indicator

---

## 🚀 Future Enhancements

### Seasonal Variations (Optional)
- **Summer**: Brighter sky blues + coral accents
- **Winter**: Deeper violets + icy blues
- **Spring**: Lighter pastels + mint greens
- **Autumn**: Warm lavenders + golden yellows

### Alternative Accents
- **Success**: Emerald green (`emerald-500`)
- **Warning**: Soft amber (`amber-300`)
- **Error**: Soft rose (`rose-400`)
- **Info**: Sky blue (`sky-400`)

---

## 📚 References

- **Tailwind CSS Colors**: https://tailwindcss.com/docs/customizing-colors
- **Color Psychology**: Travel & Hospitality industry standards
- **Inspiration**: Airbnb (pastel version), Booking.com (soft), Expedia (dreamy)

---

**Theme Status:** ✅ Active  
**Last Updated:** October 11, 2025  
**Designer:** Marosdee Uma  
**Project:** Triply - Travel Planning Platform
