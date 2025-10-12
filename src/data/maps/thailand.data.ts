/**
 * Thailand Map Data
 * Simplified SVG paths for Thailand map rendering
 */

import type { LatLng } from "@/src/utils/map/coordinates";

/**
 * Simplified Thailand border path
 * Generated from simplified GeoJSON data
 */
export const THAILAND_BORDER_PATH =
  "M 300,100 L 320,80 L 340,90 L 350,110 L 360,130 L 370,150 L 375,180 L 380,210 L 385,240 L 390,270 L 390,300 L 385,330 L 380,360 L 370,390 L 360,420 L 350,450 L 340,480 L 330,510 L 320,540 L 310,570 L 300,600 L 290,630 L 280,660 L 270,680 L 260,690 L 250,695 L 240,690 L 230,680 L 220,660 L 215,640 L 210,620 L 205,600 L 200,580 L 195,560 L 190,540 L 185,520 L 180,500 L 175,480 L 170,460 L 165,440 L 160,420 L 155,400 L 150,380 L 145,360 L 140,340 L 135,320 L 130,300 L 130,280 L 135,260 L 140,240 L 150,220 L 160,200 L 170,180 L 180,160 L 190,145 L 200,135 L 210,128 L 220,123 L 230,120 L 240,118 L 250,115 L 260,112 L 270,108 L 280,105 L 290,102 Z";

/**
 * Major Thai cities with accurate coordinates
 */
export const THAILAND_CITIES: Record<string, LatLng> = {
  // Northern Thailand
  "chiangmai": { lat: 18.7883, lng: 98.9853 },
  "chiang-rai": { lat: 19.9105, lng: 99.8406 },
  "lampang": { lat: 18.2888, lng: 99.4921 },
  "phrae": { lat: 18.1447, lng: 100.1402 },
  "nan": { lat: 18.7838, lng: 100.7792 },

  // Northeastern Thailand (Isan)
  "khon-kaen": { lat: 16.4322, lng: 102.8236 },
  "udon-thani": { lat: 17.4138, lng: 102.7873 },
  "nakhon-ratchasima": { lat: 14.9799, lng: 102.0977 },
  "ubon-ratchathani": { lat: 15.2286, lng: 104.8561 },

  // Central Thailand
  "bangkok": { lat: 13.7563, lng: 100.5018 },
  "ayutthaya": { lat: 14.3532, lng: 100.5776 },
  "lopburi": { lat: 14.7995, lng: 100.6534 },
  "nakhon-pathom": { lat: 13.8199, lng: 100.0376 },

  // Eastern Thailand
  "pattaya": { lat: 12.9236, lng: 100.8825 },
  "rayong": { lat: 12.6814, lng: 101.2816 },
  "chanthaburi": { lat: 12.6111, lng: 102.1038 },
  "trat": { lat: 12.2428, lng: 102.5151 },

  // Western Thailand
  "kanchanaburi": { lat: 14.0227, lng: 99.5328 },
  "ratchaburi": { lat: 13.5282, lng: 99.8134 },

  // Southern Thailand
  "phuket": { lat: 7.8804, lng: 98.3923 },
  "krabi": { lat: 8.0863, lng: 98.9063 },
  "surat-thani": { lat: 9.1382, lng: 99.3338 },
  "samui": { lat: 9.5122, lng: 100.0158 },
  "phang-nga": { lat: 8.4503, lng: 98.5253 },
  "hat-yai": { lat: 7.0089, lng: 100.4743 },
  "songkhla": { lat: 7.1894, lng: 100.5951 },
  "hua-hin": { lat: 12.5708, lng: 99.9588 },
};

/**
 * Thailand provinces (simplified - major ones)
 */
export const THAILAND_PROVINCES = [
  { id: "bangkok", name: "กรุงเทพมหานคร", nameEn: "Bangkok", region: "central" },
  { id: "chiangmai", name: "เชียงใหม่", nameEn: "Chiang Mai", region: "north" },
  { id: "phuket", name: "ภูเก็ต", nameEn: "Phuket", region: "south" },
  { id: "pattaya", name: "พัทยา", nameEn: "Pattaya", region: "east" },
  { id: "krabi", name: "กระบี่", nameEn: "Krabi", region: "south" },
  { id: "samui", name: "เกาะสมุย", nameEn: "Koh Samui", region: "south" },
  { id: "hua-hin", name: "หัวหิน", nameEn: "Hua Hin", region: "central" },
  { id: "ayutthaya", name: "อยุธยา", nameEn: "Ayutthaya", region: "central" },
  { id: "chiang-rai", name: "เชียงราย", nameEn: "Chiang Rai", region: "north" },
  { id: "khon-kaen", name: "ขอนแก่น", nameEn: "Khon Kaen", region: "northeast" },
] as const;

/**
 * Thailand regions
 */
export const THAILAND_REGIONS = {
  north: {
    id: "north",
    name: "ภาคเหนือ",
    nameEn: "Northern Thailand",
    color: "#10b981",
  },
  northeast: {
    id: "northeast",
    name: "ภาคตะวันออกเฉียงเหนือ",
    nameEn: "Northeastern Thailand",
    color: "#f59e0b",
  },
  central: {
    id: "central",
    name: "ภาคกลาง",
    nameEn: "Central Thailand",
    color: "#3b82f6",
  },
  east: {
    id: "east",
    name: "ภาคตะวันออก",
    nameEn: "Eastern Thailand",
    color: "#8b5cf6",
  },
  west: {
    id: "west",
    name: "ภาคตะวันตก",
    nameEn: "Western Thailand",
    color: "#ef4444",
  },
  south: {
    id: "south",
    name: "ภาคใต้",
    nameEn: "Southern Thailand",
    color: "#06b6d4",
  },
} as const;

/**
 * Map colors for light/dark mode
 */
export const THAILAND_MAP_COLORS = {
  light: {
    land: "#f0fdf4",
    border: "#94a3b8",
    water: "#e0f2fe",
    hover: "#dcfce7",
  },
  dark: {
    land: "#1e293b",
    border: "#475569",
    water: "#0c4a6e",
    hover: "#334155",
  },
} as const;
