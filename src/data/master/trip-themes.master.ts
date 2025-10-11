/**
 * Master Data: Trip Themes
 * Pre-defined trip themes for trip planning
 */

export interface TripTheme {
  id: string;
  name: string;
  nameEn: string;
  slug: string;
  icon: string;
  color: string;
  description: string;
  suggestedDuration: { min: number; max: number };
  budgetLevel: "budget" | "mid-range" | "luxury" | "ultra-luxury";
  activities: string[];
  destinations: string[];
  bestFor: string[];
}

export const TRIP_THEMES: TripTheme[] = [
  {
    id: "theme-001",
    name: "ฮันนีมูน",
    nameEn: "Honeymoon",
    slug: "honeymoon",
    icon: "💑",
    color: "from-pink-300 to-rose-300",
    description: "ทริปสำหรับคู่รักใหม่ บรรยากาศโรแมนติก",
    suggestedDuration: { min: 5, max: 14 },
    budgetLevel: "luxury",
    activities: ["ดินเนอร์", "สปาคู่", "ชมพระอาทิตย์ตก", "ล่องเรือ", "ถ่ายรูป"],
    destinations: ["beach", "island", "romantic", "resort"],
    bestFor: ["คู่รัก", "แต่งงานใหม่", "โรแมนติก"],
  },
  {
    id: "theme-002",
    name: "ครอบครัว",
    nameEn: "Family",
    slug: "family",
    icon: "👨‍👩‍👧‍👦",
    color: "from-green-200 to-emerald-200",
    description: "ทริปครอบครัว กิจกรรมสนุกทุกวัย",
    suggestedDuration: { min: 3, max: 10 },
    budgetLevel: "mid-range",
    activities: ["สวนสัตว์", "สวนน้ำ", "พิพิธภัณฑ์", "ปิกนิก"],
    destinations: ["family-friendly", "beach", "city", "theme-park"],
    bestFor: ["ครอบครัว", "เด็ก", "กลุ่ม"],
  },
  {
    id: "theme-003",
    name: "เดินทางคนเดียว",
    nameEn: "Solo",
    slug: "solo",
    icon: "🎒",
    color: "from-sky-200 to-cyan-200",
    description: "ผจญภัยคนเดียว ค้นพบตัวเอง",
    suggestedDuration: { min: 3, max: 30 },
    budgetLevel: "budget",
    activities: ["เดินชมเมือง", "พบเพื่อน", "ถ่ายรูป", "อาหาร"],
    destinations: ["backpacker", "hostel", "city", "culture"],
    bestFor: ["เดี่ยว", "ค้นหาตัวเอง", "ประหยัด"],
  },
  // Add 7 more themes...
];

export default TRIP_THEMES;

export const getTripThemeById = (id: string) => TRIP_THEMES.find(t => t.id === id);
export const getTripThemeBySlug = (slug: string) => TRIP_THEMES.find(t => t.slug === slug);
