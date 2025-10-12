# 🗺️ Custom SVG Map Module - Development Plan

## 🎯 Project Overview

**Goal:** สร้าง Custom Interactive SVG Map Module สำหรับแสดงจุดหมายท่องเที่ยว
**Why:** ไม่ต้องพึ่ง Google Maps, Mapbox หรือ API แพงๆ
**Data Source:** ใช้ข้อมูลจาก Master Data ที่มีอยู่แล้ว

---

## 📋 Technical Requirements

### **Core Features:**
- ✅ SVG-based map (lightweight, scalable)
- ✅ Interactive markers with destinations
- ✅ Zoom & Pan functionality
- ✅ Tooltip/Modal on marker click
- ✅ Region filtering (Thailand, Southeast Asia, East Asia)
- ✅ Responsive design (mobile-first)
- ✅ Dark mode support
- ✅ Animation & smooth transitions

### **Performance:**
- 🎯 No external API calls
- 🎯 Bundle size < 100KB for map assets
- 🎯  60fps smooth animations
- 🎯 Lazy loading support

---

## 🏗️ Architecture Design

### **Module Structure:**
```
src/
├── presentation/
│   └── components/
│       └── map/
│           ├── InteractiveMap.tsx          # Main component
│           ├── MapCanvas.tsx               # SVG rendering
│           ├── MapMarker.tsx               # Marker component
│           ├── MapTooltip.tsx              # Tooltip/Modal
│           ├── MapControls.tsx             # Zoom/Pan controls
│           └── hooks/
│               ├── useMapState.ts          # State management
│               ├── useZoomPan.ts           # Zoom/Pan logic
│               └── useMapProjection.ts     # Coordinate conversion
├── data/
│   └── maps/
│       ├── thailand.svg.ts                 # Thailand SVG path
│       ├── southeast-asia.svg.ts           # SEA region SVG
│       ├── provinces.data.ts               # Province coordinates
│       └── regions.data.ts                 # Region boundaries
└── utils/
    └── map/
        ├── coordinates.ts                  # Lat/Lng conversion
        ├── projections.ts                  # Map projection math
        └── geometry.ts                     # SVG path helpers
```

---

## 🎨 Phase 1: Design & Architecture

### **1.1 Map Projection System**
```typescript
// Coordinate System Design
interface MapProjection {
  // Convert lat/lng to SVG x/y
  project(lat: number, lng: number): { x: number; y: number };
  
  // Convert SVG x/y back to lat/lng
  unproject(x: number, y: number): { lat: number; lng: number };
  
  // Get viewBox dimensions
  getViewBox(): { x: number; y: number; width: number; height: number };
}
```

**Projection Type:** Mercator (simplified)
- Thailand: 5°N - 21°N, 97°E - 106°E
- Southeast Asia: 10°S - 28°N, 92°E - 141°E

### **1.2 SVG Map Design**
```typescript
interface SVGMapLayer {
  id: string;
  name: string;
  type: 'country' | 'province' | 'region' | 'water';
  path: string;          // SVG path data
  fillColor: string;
  strokeColor: string;
  strokeWidth: number;
  interactive: boolean;
}
```

### **1.3 Marker System**
```typescript
interface MapMarker {
  id: string;
  destinationId: string;
  position: { lat: number; lng: number };
  type: 'city' | 'beach' | 'mountain' | 'cultural';
  size: 'small' | 'medium' | 'large';
  priority: number;      // For z-index
  icon?: string;
  color?: string;
}
```

---

## 🗺️ Phase 2: Thailand SVG Map

### **2.1 Simplified Thailand Map**
```svg
<svg viewBox="0 0 400 700" xmlns="http://www.w3.org/2000/svg">
  <!-- Simplified Thailand border (hand-crafted or traced) -->
  <path d="M200,50 L180,100 L170,150..." fill="#f0f9ff" stroke="#0ea5e9" />
  
  <!-- Major provinces (optional) -->
  <path id="bangkok" d="M..." />
  <path id="chiang-mai" d="M..." />
  <path id="phuket" d="M..." />
</svg>
```

**Data Points Required:**
- Northern: เชียงใหม่, เชียงราย
- Central: กรุงเทพฯ, พัทยา
- Eastern: เกาะช้าง
- Southern: ภูเก็ต, กระบี่, เกาะสมุย, หัวหิน

### **2.2 Coordinate Mapping**
```typescript
// Thailand bounding box
const THAILAND_BOUNDS = {
  north: 20.463194,
  south: 5.612851,
  east: 105.639389,
  west: 97.343396,
};

// Major cities
const THAILAND_CITIES = {
  bangkok: { lat: 13.7563, lng: 100.5018 },
  chiangmai: { lat: 18.7883, lng: 98.9853 },
  phuket: { lat: 7.8804, lng: 98.3923 },
  krabi: { lat: 8.0863, lng: 98.9063 },
  pattaya: { lat: 12.9236, lng: 100.8825 },
  // ... more from master data
};
```

---

## 🌏 Phase 3: Southeast Asia Map

### **3.1 Countries to Include**
- 🇹🇭 Thailand
- 🇸🇬 Singapore
- 🇲🇾 Malaysia
- 🇮🇩 Indonesia (Bali)
- 🇻🇳 Vietnam
- 🇰🇭 Cambodia
- 🇱🇦 Laos
- 🇵🇭 Philippines (Manila)

### **3.2 Simplified Border Approach**
```typescript
// Use simplified GeoJSON → SVG conversion
// Or hand-craft simplified borders
const SOUTHEAST_ASIA_PATHS = {
  thailand: "M200,300 L180,350...",
  singapore: "M350,550...",
  vietnam: "M400,250...",
  // ... etc
};
```

---

## 🎮 Phase 4: Interactive Map Component

### **4.1 Main Component API**
```typescript
interface InteractiveMapProps {
  destinations: Destination[];
  selectedDestinationId?: string;
  onDestinationClick?: (destination: Destination) => void;
  onMarkerHover?: (destination: Destination | null) => void;
  region?: 'thailand' | 'southeast-asia' | 'east-asia' | 'all';
  zoom?: number;
  center?: { lat: number; lng: number };
  height?: string;
  showControls?: boolean;
  showLegend?: boolean;
  interactive?: boolean;
}

export function InteractiveMap({ ... }: InteractiveMapProps) {
  // Implementation
}
```

### **4.2 State Management**
```typescript
interface MapState {
  zoom: number;              // 1-10
  center: { x: number; y: number };
  bounds: MapBounds;
  selectedMarkerId: string | null;
  hoveredMarkerId: string | null;
  isDragging: boolean;
  visibleMarkers: MapMarker[];
}
```

---

## 🔍 Phase 5: Zoom & Pan Features

### **5.1 Zoom Implementation**
```typescript
// Zoom levels
const ZOOM_LEVELS = {
  MIN: 1,    // Full view
  MAX: 10,   // Street level (if needed)
  DEFAULT: 2,
  STEP: 0.5,
};

// Zoom handlers
function handleZoomIn() {
  setZoom((z) => Math.min(z + ZOOM_LEVELS.STEP, ZOOM_LEVELS.MAX));
}

function handleZoomOut() {
  setZoom((z) => Math.max(z - ZOOM_LEVELS.STEP, ZOOM_LEVELS.MIN));
}

function handleWheel(e: WheelEvent) {
  e.preventDefault();
  const delta = e.deltaY > 0 ? -0.1 : 0.1;
  setZoom((z) => Math.max(ZOOM_LEVELS.MIN, Math.min(z + delta, ZOOM_LEVELS.MAX)));
}
```

### **5.2 Pan Implementation**
```typescript
function handleMouseDown(e: MouseEvent) {
  setIsDragging(true);
  setDragStart({ x: e.clientX, y: e.clientY });
}

function handleMouseMove(e: MouseEvent) {
  if (!isDragging) return;
  
  const dx = e.clientX - dragStart.x;
  const dy = e.clientY - dragStart.y;
  
  setCenter((prev) => ({
    x: prev.x + dx / zoom,
    y: prev.y + dy / zoom,
  }));
}
```

---

## 🎯 Phase 6: Master Data Integration

### **6.1 Map Destination Data**
```typescript
// Extend Destination interface
interface DestinationWithMapData extends Destination {
  mapMarker: {
    icon: string;
    color: string;
    size: 'small' | 'medium' | 'large';
    priority: number;
  };
}

// Auto-generate from master data
function destinationsToMapMarkers(destinations: Destination[]): MapMarker[] {
  return destinations.map((dest) => ({
    id: dest.id,
    destinationId: dest.id,
    position: dest.coordinates,
    type: getMarkerType(dest.tags),
    size: getMarkerSize(dest.popularityScore),
    priority: dest.popularityScore,
    icon: getMarkerIcon(dest.tags[0]),
    color: getMarkerColor(dest.region),
  }));
}
```

### **6.2 Data Validation**
```typescript
// Validate coordinates
function validateCoordinates(coords: { lat: number; lng: number }) {
  return (
    coords.lat >= -90 && coords.lat <= 90 &&
    coords.lng >= -180 && coords.lng <= 180
  );
}

// Filter destinations by bounds
function filterByBounds(destinations: Destination[], bounds: MapBounds) {
  return destinations.filter((dest) => 
    isInBounds(dest.coordinates, bounds)
  );
}
```

---

## ✨ Phase 7: Animations & Tooltips

### **7.1 Marker Animations**
```css
/* Pulse animation for selected marker */
@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.8; }
}

/* Bounce animation for new markers */
@keyframes bounce-in {
  0% { transform: translateY(-20px); opacity: 0; }
  50% { transform: translateY(5px); }
  100% { transform: translateY(0); opacity: 1; }
}

/* Hover effect */
.map-marker:hover {
  transform: scale(1.15);
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
}
```

### **7.2 Tooltip System**
```typescript
interface MapTooltip {
  visible: boolean;
  position: { x: number; y: number };
  content: {
    title: string;
    description: string;
    image?: string;
    tags: string[];
  };
}

// Smart positioning
function calculateTooltipPosition(
  markerPos: Point,
  tooltipSize: Size,
  viewportSize: Size
): Point {
  // Avoid edges, center when possible
}
```

---

## 📱 Phase 8: Mobile Optimization

### **8.1 Touch Gestures**
```typescript
// Pinch to zoom
function handleTouchMove(e: TouchEvent) {
  if (e.touches.length === 2) {
    const touch1 = e.touches[0];
    const touch2 = e.touches[1];
    const distance = getDistance(touch1, touch2);
    
    const scale = distance / initialDistance;
    setZoom((z) => z * scale);
  }
}

// Swipe to pan
function handleSwipe(e: TouchEvent) {
  // Similar to mouse drag
}
```

### **8.2 Responsive Design**
```typescript
const BREAKPOINTS = {
  mobile: { width: 320, height: 400, zoom: 1.2 },
  tablet: { width: 768, height: 600, zoom: 1.5 },
  desktop: { width: 1200, height: 700, zoom: 2 },
};

function getResponsiveConfig(screenWidth: number) {
  if (screenWidth < 768) return BREAKPOINTS.mobile;
  if (screenWidth < 1200) return BREAKPOINTS.tablet;
  return BREAKPOINTS.desktop;
}
```

---

## 🎨 Design Specifications

### **Color Scheme**
```typescript
const MAP_COLORS = {
  // Light mode
  light: {
    water: '#e0f2fe',      // Light blue
    land: '#f0fdf4',       // Light green
    border: '#94a3b8',     // Gray
    marker: {
      beach: '#06b6d4',    // Cyan
      mountain: '#10b981', // Green
      city: '#8b5cf6',     // Purple
      culture: '#f59e0b',  // Amber
    },
  },
  // Dark mode
  dark: {
    water: '#0c4a6e',
    land: '#1e293b',
    border: '#475569',
    marker: {
      beach: '#22d3ee',
      mountain: '#34d399',
      city: '#a78bfa',
      culture: '#fbbf24',
    },
  },
};
```

### **Typography**
```typescript
const MAP_TYPOGRAPHY = {
  label: {
    small: '10px',
    medium: '12px',
    large: '14px',
  },
  weight: {
    normal: 400,
    bold: 600,
  },
};
```

---

## 🔧 Technical Implementation Notes

### **SVG Optimization**
- Use `viewBox` for responsiveness
- Minimize path points (simplify)
- Group related elements with `<g>`
- Use `<defs>` for reusable markers
- Compress SVG with SVGO

### **Performance Tips**
```typescript
// Throttle zoom/pan events
import { throttle } from 'lodash';

const handleZoomThrottled = throttle(handleZoom, 16); // 60fps

// Use React.memo for markers
const MapMarker = React.memo(({ ... }) => { ... });

// Virtual rendering for 100+ markers
function getVisibleMarkers(markers: MapMarker[], bounds: MapBounds) {
  return markers.filter((m) => isInViewport(m.position, bounds));
}
```

### **Accessibility**
```typescript
// ARIA labels
<svg role="img" aria-label="Interactive travel destination map">
  <title>Triply Destination Map</title>
  <desc>Click markers to see destination details</desc>
  
  {markers.map((marker) => (
    <g 
      role="button"
      aria-label={`${marker.name} - Click to view details`}
      tabIndex={0}
      onKeyPress={handleKeyPress}
    >
      {/* Marker content */}
    </g>
  ))}
</svg>
```

---

## 📦 Deliverables Checklist

### **Phase 1-2: Foundation** (Day 1-2)
- [ ] Architecture design document
- [ ] Coordinate projection utilities
- [ ] Thailand SVG map (simplified)
- [ ] Basic map rendering component

### **Phase 3-4: Expansion** (Day 3-4)
- [ ] Southeast Asia SVG map
- [ ] Interactive marker system
- [ ] Click/hover handlers
- [ ] Modal integration

### **Phase 5-6: Features** (Day 5-6)
- [ ] Zoom controls
- [ ] Pan functionality
- [ ] Master data integration
- [ ] Region filtering

### **Phase 7-8: Polish** (Day 7)
- [ ] Animations & transitions
- [ ] Mobile touch gestures
- [ ] Responsive optimization
- [ ] Performance tuning

---

## 🎯 Success Metrics

### **Performance:**
- ✅ First render < 100ms
- ✅ Zoom/Pan 60fps
- ✅ Works offline
- ✅ Bundle < 100KB

### **UX:**
- ✅ Smooth interactions
- ✅ Clear visual feedback
- ✅ Mobile-friendly
- ✅ Accessible (WCAG 2.1 AA)

### **Functionality:**
- ✅ Show all destinations from master data
- ✅ Accurate coordinate mapping
- ✅ Region filtering works
- ✅ Integrates with existing components

---

## 🚀 Future Enhancements (Optional)

### **Phase 9+: Advanced Features**
- [ ] Route drawing between destinations
- [ ] Clustering for dense areas
- [ ] Heat map visualization
- [ ] Time-based animations (seasonal)
- [ ] 3D elevation view (optional)
- [ ] Mini-map navigator
- [ ] Export map as image
- [ ] Share specific map view URL

---

## 💰 Cost Comparison

### **External Services (Annual):**
- Google Maps API: ~$2,000 - $10,000/year
- Mapbox: ~$1,000 - $5,000/year
- Leaflet + Tiles: ~$500 - $2,000/year

### **Our Solution:**
- Development: One-time cost
- Hosting: $0 (static assets)
- Maintenance: Minimal
- **Total: ~95% cost savings! 🎉**

---

## 📚 Resources & References

### **SVG Map Creation:**
- Natural Earth (free map data)
- geojson.io (GeoJSON editor)
- Mapshaper (simplify borders)
- SVGO (optimize SVG)

### **Projection Libraries:**
- D3-geo (for reference, not dependency)
- Custom Mercator implementation

### **Inspiration:**
- Airbnb map style
- Booking.com destination maps
- Custom travel blog maps

---

## ✅ Ready to Start!

**พร้อมเริ่มทำได้เลยครับ!** 

คุณต้องการให้เริ่มจาก Phase ไหนก่อน?
1. **Phase 1-2:** สร้าง Foundation + Thailand Map
2. **Phase 3-4:** Expand to Southeast Asia + Interactive
3. **All at once:** แบบ aggressive 😄

**แนะนำ:** เริ่มจาก Phase 1-2 เพื่อทดสอบ concept ก่อน!
