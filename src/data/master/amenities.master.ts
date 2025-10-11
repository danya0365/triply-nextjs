/**
 * Master Data: Amenities
 * 50+ accommodation amenities organized by category
 */

export interface Amenity {
  id: string;
  name: string;
  nameEn: string;
  category: AmenityCategory;
  icon: string; // emoji or icon name
  description: string;
  isPremium: boolean; // true for luxury amenities
  isCommon: boolean; // true for standard amenities
}

export enum AmenityCategory {
  ESSENTIALS = "essentials",
  COMFORT = "comfort",
  SAFETY = "safety",
  ENTERTAINMENT = "entertainment",
  FACILITIES = "facilities",
  SERVICES = "services",
  OUTDOOR = "outdoor",
  FOOD = "food",
  BUSINESS = "business",
  WELLNESS = "wellness",
}

export const AMENITIES: Amenity[] = [
  // ===== ESSENTIALS (ของจำเป็น) =====
  {
    id: "amen-001",
    name: "Wi-Fi ฟรี",
    nameEn: "Free Wi-Fi",
    category: AmenityCategory.ESSENTIALS,
    icon: "📶",
    description: "อินเทอร์เน็ตไร้สายความเร็วสูงฟรีทุกพื้นที่",
    isPremium: false,
    isCommon: true,
  },
  {
    id: "amen-002",
    name: "เครื่องปรับอากาศ",
    nameEn: "Air Conditioning",
    category: AmenityCategory.ESSENTIALS,
    icon: "❄️",
    description: "เครื่องปรับอากาศในห้องพัก",
    isPremium: false,
    isCommon: true,
  },
  {
    id: "amen-003",
    name: "น้ำร้อน",
    nameEn: "Hot Water",
    category: AmenityCategory.ESSENTIALS,
    icon: "🚿",
    description: "เครื่องทำน้ำร้อนในห้องน้ำ",
    isPremium: false,
    isCommon: true,
  },
  {
    id: "amen-004",
    name: "โทรทัศน์",
    nameEn: "Television",
    category: AmenityCategory.ESSENTIALS,
    icon: "📺",
    description: "ทีวีจอแบนพร้อมช่องรายการ",
    isPremium: false,
    isCommon: true,
  },
  {
    id: "amen-005",
    name: "ตู้เย็น",
    nameEn: "Refrigerator",
    category: AmenityCategory.ESSENTIALS,
    icon: "🧊",
    description: "ตู้เย็นขนาดเล็กในห้องพัก",
    isPremium: false,
    isCommon: true,
  },

  // ===== COMFORT (ความสบาย) =====
  {
    id: "amen-010",
    name: "เตียงคิงไซส์",
    nameEn: "King Size Bed",
    category: AmenityCategory.COMFORT,
    icon: "🛏️",
    description: "เตียงขนาดใหญ่พิเศษ นอนสบาย",
    isPremium: true,
    isCommon: false,
  },
  {
    id: "amen-011",
    name: "ผ้าปูที่นอนระดับพรีเมี่ยม",
    nameEn: "Premium Bedding",
    category: AmenityCategory.COMFORT,
    icon: "🌟",
    description: "ผ้าปูเตียงคุณภาพสูง นุ่มสบาย",
    isPremium: true,
    isCommon: false,
  },
  {
    id: "amen-012",
    name: "โซฟา",
    nameEn: "Sofa",
    category: AmenityCategory.COMFORT,
    icon: "🛋️",
    description: "โซฟานั่งพักผ่อนในห้อง",
    isPremium: false,
    isCommon: true,
  },
  {
    id: "amen-013",
    name: "ระเบียง/ลาน",
    nameEn: "Balcony/Terrace",
    category: AmenityCategory.COMFORT,
    icon: "🏡",
    description: "พื้นที่กลางแจ้งส่วนตัว",
    isPremium: true,
    isCommon: false,
  },
  {
    id: "amen-014",
    name: "วิวทะเล",
    nameEn: "Sea View",
    category: AmenityCategory.COMFORT,
    icon: "🌊",
    description: "ห้องพักวิวทะเลสวยงาม",
    isPremium: true,
    isCommon: false,
  },

  // ===== SAFETY (ความปลอดภัย) =====
  {
    id: "amen-020",
    name: "ตู้เซฟ",
    nameEn: "Safe Box",
    category: AmenityCategory.SAFETY,
    icon: "🔒",
    description: "ตู้นิรภัยในห้องเก็บของมีค่า",
    isPremium: false,
    isCommon: true,
  },
  {
    id: "amen-021",
    name: "กล้องวงจรปิด",
    nameEn: "CCTV",
    category: AmenityCategory.SAFETY,
    icon: "📹",
    description: "ระบบกล้องวงจรปิดตลอด 24 ชั่วโมง",
    isPremium: false,
    isCommon: true,
  },
  {
    id: "amen-022",
    name: "ระบบดับเพลิง",
    nameEn: "Fire Safety System",
    category: AmenityCategory.SAFETY,
    icon: "🧯",
    description: "ระบบดับเพลิงและเครื่องตรวจจับควัน",
    isPremium: false,
    isCommon: true,
  },
  {
    id: "amen-023",
    name: "รักษาความปลอดภัย 24 ชม.",
    nameEn: "24/7 Security",
    category: AmenityCategory.SAFETY,
    icon: "👮",
    description: "เจ้าหน้าที่รักษาความปลอดภัยตลอดเวลา",
    isPremium: false,
    isCommon: true,
  },

  // ===== ENTERTAINMENT (ความบันเทิง) =====
  {
    id: "amen-030",
    name: "สระว่ายน้ำ",
    nameEn: "Swimming Pool",
    category: AmenityCategory.ENTERTAINMENT,
    icon: "🏊",
    description: "สระว่ายน้ำสำหรับผู้เข้าพัก",
    isPremium: true,
    isCommon: true,
  },
  {
    id: "amen-031",
    name: "ฟิตเนส",
    nameEn: "Fitness Center",
    category: AmenityCategory.ENTERTAINMENT,
    icon: "💪",
    description: "ห้องออกกำลังกายพร้อมอุปกรณ์",
    isPremium: true,
    isCommon: true,
  },
  {
    id: "amen-032",
    name: "สปา",
    nameEn: "Spa",
    category: AmenityCategory.ENTERTAINMENT,
    icon: "💆",
    description: "บริการนวดและสปา",
    isPremium: true,
    isCommon: false,
  },
  {
    id: "amen-033",
    name: "คาราโอเกะ",
    nameEn: "Karaoke",
    category: AmenityCategory.ENTERTAINMENT,
    icon: "🎤",
    description: "ห้องคาราโอเกะส่วนตัว",
    isPremium: true,
    isCommon: false,
  },

  // ===== FACILITIES (สิ่งอำนวยความสะดวก) =====
  {
    id: "amen-040",
    name: "ที่จอดรถฟรี",
    nameEn: "Free Parking",
    category: AmenityCategory.FACILITIES,
    icon: "🅿️",
    description: "ที่จอดรถฟรีสำหรับผู้เข้าพัก",
    isPremium: false,
    isCommon: true,
  },
  {
    id: "amen-041",
    name: "ลิฟต์",
    nameEn: "Elevator",
    category: AmenityCategory.FACILITIES,
    icon: "🛗",
    description: "ลิฟต์โดยสารขึ้น-ลง",
    isPremium: false,
    isCommon: true,
  },
  {
    id: "amen-042",
    name: "เครื่องซักผ้า",
    nameEn: "Washing Machine",
    category: AmenityCategory.FACILITIES,
    icon: "🧺",
    description: "เครื่องซักผ้าหยอดเหรียญหรือฟรี",
    isPremium: false,
    isCommon: true,
  },
  {
    id: "amen-043",
    name: "ครัว",
    nameEn: "Kitchen",
    category: AmenityCategory.FACILITIES,
    icon: "🍳",
    description: "ครัวพร้อมอุปกรณ์ทำอาหาร",
    isPremium: true,
    isCommon: false,
  },

  // ===== SERVICES (บริการ) =====
  {
    id: "amen-050",
    name: "แผนกต้อนรับ 24 ชม.",
    nameEn: "24-hour Front Desk",
    category: AmenityCategory.SERVICES,
    icon: "🏨",
    description: "พนักงานต้อนรับพร้อมให้บริการตลอด 24 ชั่วโมง",
    isPremium: false,
    isCommon: true,
  },
  {
    id: "amen-051",
    name: "บริการรับส่งสนามบิน",
    nameEn: "Airport Shuttle",
    category: AmenityCategory.SERVICES,
    icon: "🚐",
    description: "บริการรถรับส่งสนามบิน (อาจมีค่าใช้จ่าย)",
    isPremium: true,
    isCommon: true,
  },
  {
    id: "amen-052",
    name: "บริการซักรีด",
    nameEn: "Laundry Service",
    category: AmenityCategory.SERVICES,
    icon: "👕",
    description: "บริการซักรีด ค่าบริการแยกต่างหาก",
    isPremium: false,
    isCommon: true,
  },
  {
    id: "amen-053",
    name: "รูมเซอร์วิส",
    nameEn: "Room Service",
    category: AmenityCategory.SERVICES,
    icon: "🍽️",
    description: "สั่งอาหารส่งถึงห้อง",
    isPremium: true,
    isCommon: true,
  },

  // ===== OUTDOOR (กลางแจ้ง) =====
  {
    id: "amen-060",
    name: "สวน",
    nameEn: "Garden",
    category: AmenityCategory.OUTDOOR,
    icon: "🌳",
    description: "พื้นที่สวนสวยงาม",
    isPremium: true,
    isCommon: false,
  },
  {
    id: "amen-061",
    name: "ชายหาดส่วนตัว",
    nameEn: "Private Beach",
    category: AmenityCategory.OUTDOOR,
    icon: "🏖️",
    description: "ชายหาดส่วนตัวสำหรับผู้เข้าพัก",
    isPremium: true,
    isCommon: false,
  },
  {
    id: "amen-062",
    name: "BBQ",
    nameEn: "BBQ Facilities",
    category: AmenityCategory.OUTDOOR,
    icon: "🍖",
    description: "พื้นที่ปิ้งย่างกลางแจ้ง",
    isPremium: true,
    isCommon: false,
  },

  // ===== FOOD & DINING (อาหารและเครื่องดื่ม) =====
  {
    id: "amen-070",
    name: "อาหารเช้าฟรี",
    nameEn: "Free Breakfast",
    category: AmenityCategory.FOOD,
    icon: "🥐",
    description: "อาหารเช้าบุฟเฟต์หรือตามสั่งฟรี",
    isPremium: true,
    isCommon: true,
  },
  {
    id: "amen-071",
    name: "ร้านอาหาร",
    nameEn: "Restaurant",
    category: AmenityCategory.FOOD,
    icon: "🍴",
    description: "ร้านอาหารในที่พัก",
    isPremium: false,
    isCommon: true,
  },
  {
    id: "amen-072",
    name: "บาร์",
    nameEn: "Bar",
    category: AmenityCategory.FOOD,
    icon: "🍹",
    description: "บาร์และเครื่องดื่ม",
    isPremium: true,
    isCommon: true,
  },
  {
    id: "amen-073",
    name: "มินิบาร์",
    nameEn: "Minibar",
    category: AmenityCategory.FOOD,
    icon: "🥤",
    description: "มินิบาร์ในห้องพัก",
    isPremium: true,
    isCommon: true,
  },

  // ===== BUSINESS (ธุรกิจ) =====
  {
    id: "amen-080",
    name: "ห้องประชุม",
    nameEn: "Meeting Room",
    category: AmenityCategory.BUSINESS,
    icon: "👔",
    description: "ห้องประชุมพร้อมอุปกรณ์",
    isPremium: true,
    isCommon: false,
  },
  {
    id: "amen-081",
    name: "ที่ทำงาน",
    nameEn: "Work Desk",
    category: AmenityCategory.BUSINESS,
    icon: "💼",
    description: "โต๊ะทำงานในห้องพัก",
    isPremium: false,
    isCommon: true,
  },
  {
    id: "amen-082",
    name: "เครื่องพิมพ์",
    nameEn: "Printer",
    category: AmenityCategory.BUSINESS,
    icon: "🖨️",
    description: "บริการพิมพ์เอกสาร",
    isPremium: false,
    isCommon: false,
  },

  // ===== WELLNESS (สุขภาพ) =====
  {
    id: "amen-090",
    name: "ยิม",
    nameEn: "Gym",
    category: AmenityCategory.WELLNESS,
    icon: "🏋️",
    description: "ห้องออกกำลังกายพร้อมอุปกรณ์ครบ",
    isPremium: true,
    isCommon: true,
  },
  {
    id: "amen-091",
    name: "ห้องโยคะ",
    nameEn: "Yoga Room",
    category: AmenityCategory.WELLNESS,
    icon: "🧘",
    description: "ห้องฝึกโยคะและสมาธิ",
    isPremium: true,
    isCommon: false,
  },
  {
    id: "amen-092",
    name: "อ่างจากุซซี่",
    nameEn: "Jacuzzi",
    category: AmenityCategory.WELLNESS,
    icon: "🛁",
    description: "อ่างน้ำร้อนจากุซซี่",
    isPremium: true,
    isCommon: false,
  },
];

export default AMENITIES;

// Helper functions
export const getAmenityById = (id: string): Amenity | undefined => {
  return AMENITIES.find(amenity => amenity.id === id);
};

export const getAmenitiesByCategory = (category: AmenityCategory): Amenity[] => {
  return AMENITIES.filter(amenity => amenity.category === category);
};

export const getPremiumAmenities = (): Amenity[] => {
  return AMENITIES.filter(amenity => amenity.isPremium);
};

export const getCommonAmenities = (): Amenity[] => {
  return AMENITIES.filter(amenity => amenity.isCommon);
};

export const searchAmenities = (query: string): Amenity[] => {
  const lowerQuery = query.toLowerCase();
  return AMENITIES.filter(amenity =>
    amenity.name.toLowerCase().includes(lowerQuery) ||
    amenity.nameEn.toLowerCase().includes(lowerQuery) ||
    amenity.description.toLowerCase().includes(lowerQuery)
  );
};

// Get amenities by IDs (for accommodation amenities)
export const getAmenitiesByIds = (ids: string[]): Amenity[] => {
  return AMENITIES.filter(amenity => ids.includes(amenity.id));
};
