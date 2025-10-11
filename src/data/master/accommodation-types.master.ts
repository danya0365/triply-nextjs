/**
 * Master Data: Accommodation Types
 * Types of properties available for booking
 */

export interface AccommodationType {
  id: string;
  name: string;
  nameEn: string;
  slug: string;
  icon: string;
  description: string;
  features: string[];
  priceRange: "budget" | "mid-range" | "luxury" | "ultra-luxury";
  typicalCapacity: {
    min: number;
    max: number;
  };
  bestFor: string[];
}

export const ACCOMMODATION_TYPES: AccommodationType[] = [
  {
    id: "type-001",
    name: "โรงแรม",
    nameEn: "Hotel",
    slug: "hotel",
    icon: "🏨",
    description: "ที่พักแบบโรงแรมมาตรฐาน มีบริการรับส่ง ร้านอาหาร และสิ่งอำนวยความสะดวกครบครัน",
    features: [
      "แผนกต้อนรับ 24 ชม.",
      "บริการรูมเซอร์วิส",
      "ทำความสะอาดทุกวัน",
      "ร้านอาหาร",
      "สิ่งอำนวยความสะดวกครบครัน",
    ],
    priceRange: "mid-range",
    typicalCapacity: { min: 1, max: 4 },
    bestFor: ["ธุรกิจ", "ครอบครัว", "ท่องเที่ยว", "สะดวกสบาย"],
  },
  {
    id: "type-002",
    name: "รีสอร์ท",
    nameEn: "Resort",
    slug: "resort",
    icon: "🏝️",
    description: "ที่พักหรูหราในบรรยากาศธรรมชาติ เหมาะสำหรับพักผ่อนและฮันนีมูน",
    features: [
      "บรรยากาศธรรมชาติ",
      "สระว่ายน้ำส่วนตัว",
      "สปาและนวด",
      "ชายหาดส่วนตัว",
      "กิจกรรมนันทนาการ",
    ],
    priceRange: "luxury",
    typicalCapacity: { min: 2, max: 6 },
    bestFor: ["ฮันนีมูน", "พักผ่อน", "หรูหรา", "ครอบครัว"],
  },
  {
    id: "type-003",
    name: "วิลล่า",
    nameEn: "Villa",
    slug: "villa",
    icon: "🏡",
    description: "บ้านพักส่วนตัวหรูหรา มีสระว่ายน้ำ สวน และความเป็นส่วนตัวสูง",
    features: [
      "พื้นที่ส่วนตัว",
      "สระว่ายน้ำส่วนตัว",
      "ครัวครบครัน",
      "สวนและพื้นที่กลางแจ้ง",
      "เหมาะสำหรับกลุ่ม",
    ],
    priceRange: "luxury",
    typicalCapacity: { min: 4, max: 12 },
    bestFor: ["กลุ่มเพื่อน", "ครอบครัวใหญ่", "ปาร์ตี้", "ความเป็นส่วนตัว"],
  },
  {
    id: "type-004",
    name: "อพาร์ทเมนท์",
    nameEn: "Apartment",
    slug: "apartment",
    icon: "🏢",
    description: "ที่พักแบบห้องพักรายเดือนหรือรายวัน มีครัว เหมาะกับการพักระยะยาว",
    features: [
      "ครัวในห้อง",
      "พื้นที่นั่งเล่น",
      "เครื่องซักผ้า",
      "ราคาประหยัด",
      "เหมาะพักนาน",
    ],
    priceRange: "budget",
    typicalCapacity: { min: 1, max: 6 },
    bestFor: ["Digital Nomad", "พักยาว", "ครอบครัว", "ประหยัด"],
  },
  {
    id: "type-005",
    name: "โฮสเทล",
    nameEn: "Hostel",
    slug: "hostel",
    icon: "🛏️",
    description: "ที่พักราคาประหยัด มีห้องแบบหอนอนรวมและห้องส่วนตัว เหมาะกับนักเดินทางเดี่ยว",
    features: [
      "ราคาถูก",
      "ห้องนอนรวม/ส่วนตัว",
      "พบปะนักท่องเที่ยว",
      "สิ่งอำนวยความสะดวกพื้นฐาน",
      "บรรยากาศสังคม",
    ],
    priceRange: "budget",
    typicalCapacity: { min: 1, max: 8 },
    bestFor: ["Backpacker", "เดี่ยว", "ประหยัด", "พบเพื่อนใหม่"],
  },
  {
    id: "type-006",
    name: "เกสต์เฮาส์",
    nameEn: "Guesthouse",
    slug: "guesthouse",
    icon: "🏠",
    description: "บ้านพักเล็กๆ บริหารโดยเจ้าของ บรรยากาศอบอุ่นเหมือนอยู่บ้าน",
    features: [
      "บรรยากาศอบอุ่น",
      "เจ้าของดูแลเอง",
      "อาหารเช้าโฮมเมด",
      "ราคาสมเหตุสมผล",
      "พูดคุยกับเจ้าของ",
    ],
    priceRange: "budget",
    typicalCapacity: { min: 1, max: 4 },
    bestFor: ["ท่องเที่ยวแบบ Local", "ประหยัด", "วัฒนธรรม", "เดี่ยว"],
  },
  {
    id: "type-007",
    name: "บูติกโฮเทล",
    nameEn: "Boutique Hotel",
    slug: "boutique-hotel",
    icon: "✨",
    description: "โรงแรมขนาดเล็กที่มีสไตล์เป็นเอกลักษณ์ การออกแบบพิเศษ และบริการส่วนตัว",
    features: [
      "ดีไซน์เฉพาะตัว",
      "บริการส่วนบุคคล",
      "ขนาดเล็ก exclusive",
      "ตกแต่งสวยงาม",
      "ประสบการณ์พิเศษ",
    ],
    priceRange: "luxury",
    typicalCapacity: { min: 2, max: 4 },
    bestFor: ["ฮันนีมูน", "พิเศษ", "หรูหรา", "Instagram"],
  },
  {
    id: "type-008",
    name: "โฮมสเตย์",
    nameEn: "Homestay",
    slug: "homestay",
    icon: "🏘️",
    description: "พักกับครอบครัวท้องถิ่น เรียนรู้วัฒนธรรมและวิถีชีวิต",
    features: [
      "อยู่กับครอบครัวท้องถิ่น",
      "เรียนรู้วัฒนธรรม",
      "อาหารพื้นบ้าน",
      "ราคาประหยัด",
      "ประสบการณ์แท้จริง",
    ],
    priceRange: "budget",
    typicalCapacity: { min: 1, max: 6 },
    bestFor: ["วัฒนธรรม", "ภาษา", "ประสบการณ์ท้องถิ่น", "ครอบครัว"],
  },
  {
    id: "type-009",
    name: "ที่พักพิเศษ",
    nameEn: "Unique Stays",
    slug: "unique-stays",
    icon: "🎪",
    description: "ที่พักแปลกใหม่ เช่น บ้านต้นไม้ กระท่อมแคมป์ปิ้ง หรือเรือนแพ",
    features: [
      "ประสบการณ์ไม่เหมือนใคร",
      "สถาปัตยกรรมพิเศษ",
      "ใกล้ชิดธรรมชาติ",
      "Instagrammable",
      "ผจญภัย",
    ],
    priceRange: "mid-range",
    typicalCapacity: { min: 2, max: 6 },
    bestFor: ["ผจญภัย", "ถ่ายรูป", "แปลกใหม่", "ธรรมชาติ"],
  },
  {
    id: "type-010",
    name: "คอนโดมิเนียม",
    nameEn: "Condominium",
    slug: "condominium",
    icon: "🏙️",
    description: "ห้องชุดในอาคารสูง มีสิ่งอำนวยความสะดวก เหมาะกับการพักใจกลางเมือง",
    features: [
      "ใจกลางเมือง",
      "สระว่ายน้ำ ฟิตเนส",
      "ครัวและพื้นที่นั่งเล่น",
      "ปลอดภัย",
      "วิวเมือง",
    ],
    priceRange: "mid-range",
    typicalCapacity: { min: 2, max: 6 },
    bestFor: ["เมือง", "ช้อปปิ้ง", "ครอบครัว", "สะดวกสบาย"],
  },
];

export default ACCOMMODATION_TYPES;

// Helper functions
export const getAccommodationTypeById = (id: string): AccommodationType | undefined => {
  return ACCOMMODATION_TYPES.find(type => type.id === id);
};

export const getAccommodationTypeBySlug = (slug: string): AccommodationType | undefined => {
  return ACCOMMODATION_TYPES.find(type => type.slug === slug);
};

export const getAccommodationTypesByPriceRange = (
  priceRange: "budget" | "mid-range" | "luxury" | "ultra-luxury"
): AccommodationType[] => {
  return ACCOMMODATION_TYPES.filter(type => type.priceRange === priceRange);
};

export const searchAccommodationTypes = (query: string): AccommodationType[] => {
  const lowerQuery = query.toLowerCase();
  return ACCOMMODATION_TYPES.filter(type =>
    type.name.toLowerCase().includes(lowerQuery) ||
    type.nameEn.toLowerCase().includes(lowerQuery) ||
    type.description.toLowerCase().includes(lowerQuery)
  );
};
