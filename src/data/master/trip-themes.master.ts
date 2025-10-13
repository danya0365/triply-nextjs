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
  {
    id: "theme-004",
    name: "ทัวร์อาหาร",
    nameEn: "Food Tour",
    slug: "food-tour",
    icon: "🍜",
    color: "from-orange-200 to-amber-200",
    description: "ชิมอาหารท้องถิ่น ตามรอยรสชาติ",
    suggestedDuration: { min: 2, max: 7 },
    budgetLevel: "mid-range",
    activities: ["ชิมอาหาร", "ตลาดนัด", "ร้านอาหาร", "ทำอาหาร", "ถนนคนเดิน"],
    destinations: ["city", "food", "market", "street-food"],
    bestFor: ["คนรักอาหาร", "ชิมของ", "ถ่ายรูปอาหาร"],
  },
  {
    id: "theme-005",
    name: "วัฒนธรรม",
    nameEn: "Culture",
    slug: "culture",
    icon: "🏛️",
    color: "from-purple-200 to-violet-200",
    description: "ท่องเที่ยวเชิงวัฒนธรรม เรียนรู้ประวัติศาสตร์",
    suggestedDuration: { min: 3, max: 10 },
    budgetLevel: "mid-range",
    activities: ["เที่ยววัด", "พิพิธภัณฑ์", "โบราณสถาน", "งานประเพณี", "ศิลปะ"],
    destinations: ["temple", "culture", "heritage", "museum"],
    bestFor: ["ชอบประวัติศาสตร์", "เรียนรู้", "ถ่ายรูป"],
  },
  {
    id: "theme-006",
    name: "ผจญภัย",
    nameEn: "Adventure",
    slug: "adventure",
    icon: "⛰️",
    color: "from-teal-200 to-green-300",
    description: "ท้าทายตัวเอง กิจกรรมเสี่ยงภัย",
    suggestedDuration: { min: 3, max: 14 },
    budgetLevel: "mid-range",
    activities: ["ปีนเขา", "ดำน้ำ", "เดินป่า", "กระโดดร่ม", "ล่องแก่ง"],
    destinations: ["mountain", "nature", "adventure", "extreme"],
    bestFor: ["ชอบผจญภัย", "กีฬา", "ธรรมชาติ"],
  },
  {
    id: "theme-007",
    name: "ช้อปปิ้ง",
    nameEn: "Shopping",
    slug: "shopping",
    icon: "🛍️",
    color: "from-fuchsia-200 to-pink-200",
    description: "ช้อปจนหมดตัว ตลาดและห้างสรรพสินค้า",
    suggestedDuration: { min: 2, max: 7 },
    budgetLevel: "mid-range",
    activities: ["ห้างสรรพสินค้า", "ตลาดนัด", "ของฝาก", "แฟชั่น", "เซลล์"],
    destinations: ["city", "shopping", "market", "mall"],
    bestFor: ["ช้อปปิ้ง", "แฟชั่น", "ของฝาก"],
  },
  {
    id: "theme-008",
    name: "พักผ่อน",
    nameEn: "Relaxation",
    slug: "relaxation",
    icon: "🧘",
    color: "from-blue-200 to-indigo-200",
    description: "พักผ่อนสบายใจ ชาร์จพลังงาน",
    suggestedDuration: { min: 3, max: 14 },
    budgetLevel: "luxury",
    activities: ["สปา", "นวด", "โยคะ", "สมาธิ", "อ่านหนังสือ"],
    destinations: ["resort", "spa", "beach", "wellness"],
    bestFor: ["พักผ่อน", "สปา", "เติมพลัง"],
  },
  {
    id: "theme-009",
    name: "ธรรมชาติ",
    nameEn: "Nature",
    slug: "nature",
    icon: "🌿",
    color: "from-lime-200 to-green-200",
    description: "ใกล้ชิดธรรมชาติ สัมผัสสิ่งแวดล้อม",
    suggestedDuration: { min: 3, max: 10 },
    budgetLevel: "budget",
    activities: ["เดินป่า", "ดูนก", "แคมป์ปิ้ง", "น้ำตก", "ถ่ายรูป"],
    destinations: ["nature", "forest", "mountain", "waterfall"],
    bestFor: ["รักธรรมชาติ", "ถ่ายรูป", "ผ่อนคลาย"],
  },
  {
    id: "theme-010",
    name: "หรูหรา",
    nameEn: "Luxury",
    slug: "luxury",
    icon: "💎",
    color: "from-yellow-200 to-amber-300",
    description: "ทริปหรูหรา บริการระดับพรีเมี่ยม",
    suggestedDuration: { min: 5, max: 21 },
    budgetLevel: "ultra-luxury",
    activities: [
      "รีสอร์ทหรู",
      "ไพรเวทเจ็ท",
      "ไฟน์ไดนิ่ง",
      "ช้อปปิ้งแบรนด์เนม",
      "สปาหรู",
    ],
    destinations: ["luxury", "resort", "5-star", "exclusive"],
    bestFor: ["หรูหรา", "พรีเมี่ยม", "VIP"],
  },
];

export default TRIP_THEMES;

export const getTripThemeById = (id: string) =>
  TRIP_THEMES.find((t) => t.id === id);
export const getTripThemeBySlug = (slug: string) =>
  TRIP_THEMES.find((t) => t.slug === slug);
