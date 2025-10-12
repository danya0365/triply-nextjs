/**
 * Southeast Asia Map Data
 * Simplified SVG paths for regional map rendering
 */

import type { LatLng } from "@/src/utils/map/coordinates";

/**
 * Simplified country border paths
 * Note: These are simplified paths, actual borders would be more complex
 */
export const SOUTHEAST_ASIA_COUNTRIES = {
  thailand: {
    id: "thailand",
    name: "ประเทศไทย",
    nameEn: "Thailand",
    path: "M 450,350 L 460,320 L 470,300 L 480,280 L 485,260 L 490,240 L 490,220 L 485,200 L 475,185 L 465,175 L 455,170 L 445,170 L 435,175 L 425,185 L 420,200 L 420,220 L 425,240 L 430,260 L 435,280 L 438,300 L 440,320 L 443,340 L 445,360 L 445,380 L 443,400 L 440,420 L 438,440 L 435,460 L 432,480 L 430,500 L 428,520 L 425,540 L 422,560 L 420,575 L 415,585 L 410,590 L 405,592 L 400,590 L 395,585 L 390,575 L 388,560 L 387,545 L 387,530 L 390,515 L 395,500 L 400,485 L 405,470 L 410,455 L 415,440 L 420,425 L 425,410 L 430,395 L 435,380 L 440,365 Z",
    color: "#10b981",
  },
  vietnam: {
    id: "vietnam",
    name: "เวียดนาม",
    nameEn: "Vietnam",
    path: "M 550,250 L 555,230 L 560,210 L 565,190 L 568,170 L 568,150 L 565,135 L 560,125 L 555,120 L 550,118 L 545,120 L 540,128 L 538,140 L 538,155 L 540,170 L 543,190 L 545,210 L 546,230 L 547,250 L 547,270 L 546,290 L 545,310 L 544,330 L 543,350 L 542,370 L 541,390 L 540,410 L 539,430 L 538,450 L 537,470 L 536,490 L 535,510 L 534,530 L 533,550 L 532,565 L 530,575 L 527,583 L 523,588 L 518,590 L 513,588 L 509,583 L 506,575 L 505,565 L 505,550 L 507,535 L 510,520 L 513,505 L 516,490 L 520,475 L 523,460 L 526,445 L 530,430 L 533,415 L 536,400 L 538,385 L 540,370 L 542,355 L 544,340 L 545,325 L 546,310 L 547,295 L 548,280 L 549,265 Z",
    color: "#f59e0b",
  },
  singapore: {
    id: "singapore",
    name: "สิงคโปร์",
    nameEn: "Singapore",
    path: "M 470,630 L 473,628 L 476,628 L 479,630 L 480,633 L 479,636 L 476,638 L 473,638 Z",
    color: "#ef4444",
  },
  malaysia: {
    id: "malaysia",
    name: "มาเลเซีย",
    nameEn: "Malaysia",
    path: "M 420,600 L 430,590 L 440,585 L 450,582 L 460,580 L 470,580 L 480,582 L 490,585 L 500,590 L 508,595 L 514,600 L 518,608 L 520,616 L 520,625 L 518,633 L 514,640 L 508,645 L 500,648 L 490,650 L 480,650 L 470,648 L 460,645 L 450,640 L 440,633 L 432,625 L 426,616 L 422,608 Z",
    color: "#3b82f6",
  },
  indonesia: {
    id: "indonesia",
    name: "อินโดนีเซีย",
    nameEn: "Indonesia",
    path: "M 380,650 L 400,645 L 420,643 L 440,643 L 460,645 L 480,648 L 500,652 L 520,656 L 540,660 L 560,664 L 580,668 L 600,670 L 620,670 L 640,668 L 655,664 L 665,658 L 672,650 L 675,640 L 675,628 L 672,618 L 665,610 L 655,605 L 645,603 L 635,603 L 625,605 L 615,608 L 605,612 L 595,616 L 585,620 L 575,624 L 565,628 L 555,632 L 545,635 L 535,638 L 525,640 L 515,641 L 505,641 L 495,640 L 485,638 L 475,635 L 465,632 L 455,628 L 445,624 L 435,620 L 425,616 L 415,612 L 405,608 L 395,605 L 385,603 L 378,603 L 373,605 L 370,610 L 370,618 L 373,628 L 378,638 Z",
    color: "#8b5cf6",
  },
} as const;

/**
 * Major cities in Southeast Asia
 */
export const SOUTHEAST_ASIA_CITIES: Record<string, LatLng> = {
  // Thailand
  "bangkok": { lat: 13.7563, lng: 100.5018 },
  "chiangmai": { lat: 18.7883, lng: 98.9853 },
  "phuket": { lat: 7.8804, lng: 98.3923 },
  "pattaya": { lat: 12.9236, lng: 100.8825 },

  // Vietnam
  "ho-chi-minh": { lat: 10.8231, lng: 106.6297 },
  "hanoi": { lat: 21.0285, lng: 105.8542 },
  "da-nang": { lat: 16.0544, lng: 108.2022 },
  "nha-trang": { lat: 12.2388, lng: 109.1967 },

  // Singapore
  "singapore": { lat: 1.3521, lng: 103.8198 },

  // Malaysia
  "kuala-lumpur": { lat: 3.1390, lng: 101.6869 },
  "penang": { lat: 5.4141, lng: 100.3288 },
  "malacca": { lat: 2.1896, lng: 102.2501 },

  // Indonesia
  "jakarta": { lat: -6.2088, lng: 106.8456 },
  "bali": { lat: -8.4095, lng: 115.1889 },
  "yogyakarta": { lat: -7.7956, lng: 110.3695 },

  // Philippines
  "manila": { lat: 14.5995, lng: 120.9842 },
  "cebu": { lat: 10.3157, lng: 123.8854 },

  // Cambodia
  "phnom-penh": { lat: 11.5564, lng: 104.9282 },
  "siem-reap": { lat: 13.3671, lng: 103.8448 },

  // Laos
  "vientiane": { lat: 17.9757, lng: 102.6331 },
  "luang-prabang": { lat: 19.8845, lng: 102.1346 },
} as const;

/**
 * Map colors for Southeast Asia
 */
export const SOUTHEAST_ASIA_MAP_COLORS = {
  light: {
    land: "#fafaf9",
    water: "#e0f2fe",
    border: "#94a3b8",
  },
  dark: {
    land: "#18181b",
    water: "#0c4a6e",
    border: "#52525b",
  },
} as const;
