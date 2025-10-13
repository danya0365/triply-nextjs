/**
 * Master Data: Destinations
 * 50+ popular travel destinations in Thailand and Asia
 */

export interface Destination {
  id: string;
  name: string;
  nameEn: string;
  slug: string;
  country: string;
  region: string; // Southeast Asia, East Asia, South Asia, etc.
  description: string;
  highlights: string[];
  coverImage: string;
  images: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
  popularityScore: number; // 1-100
  seasonality: {
    best: string[]; // months
    avoid: string[]; // months
  };
  averageBudget: {
    min: number;
    max: number;
    currency: string;
  };
  tags: string[]; // beach, mountain, city, culture, adventure, etc.
  climate: string; // tropical, temperate, cold, etc.
  timezone: string;
  language: string[];
  bestFor: string[]; // honeymoon, family, solo, adventure, luxury, budget
}

export const DESTINATIONS: Destination[] = [
  // ===== Thailand (20 destinations) =====
  {
    id: "dest-001",
    name: "ภูเก็ต",
    nameEn: "Phuket",
    slug: "phuket",
    country: "ประเทศไทย",
    region: "Southeast Asia",
    description: "เกาะท่องเที่ยวที่ใหญ่ที่สุดของไทย มีชายหาดสวยงาม น้ำทะเลใส และชีวิตยามค่ำคืนที่คึกคัก",
    highlights: [
      "ชายหาดป่าตอง",
      "อ่าวพังงา",
      "เกาะพีพี",
      "ถนนคนเดิน",
      "วัดฉลอง",
    ],
    coverImage: "/images/destinations/phuket/cover.jpg",
    images: [
      "/images/destinations/phuket/beach.jpg",
      "/images/destinations/phuket/patong.jpg",
      "/images/destinations/phuket/phiphi.jpg",
    ],
    coordinates: { lat: 7.8804, lng: 98.3923 },
    popularityScore: 95,
    seasonality: {
      best: ["November", "December", "January", "February", "March"],
      avoid: ["May", "June", "July", "August", "September"],
    },
    averageBudget: { min: 1500, max: 8000, currency: "THB" },
    tags: ["beach", "tropical", "nightlife", "diving", "island"],
    climate: "tropical",
    timezone: "Asia/Bangkok",
    language: ["Thai", "English"],
    bestFor: ["honeymoon", "family", "party", "diving", "luxury"],
  },
  {
    id: "dest-002",
    name: "เชียงใหม่",
    nameEn: "Chiang Mai",
    slug: "chiang-mai",
    country: "ประเทศไทย",
    region: "Southeast Asia",
    description: "เมืองวัฒนธรรมล้านนา ดอยสูง วัดสวยงาม และอาหารเหนือรสชาติเลิศ",
    highlights: [
      "ดอยสุเทพ",
      "ถนนคนเดินวันอาทิตย์",
      "ค่ายช้าง",
      "ตลาดวโรรส",
      "เมืองเก่า",
    ],
    coverImage: "/images/destinations/chiangmai/cover.jpg",
    images: [],
    coordinates: { lat: 18.7883, lng: 98.9853 },
    popularityScore: 90,
    seasonality: {
      best: ["November", "December", "January", "February"],
      avoid: ["March", "April"], // smoke season
    },
    averageBudget: { min: 800, max: 3500, currency: "THB" },
    tags: ["mountain", "culture", "temple", "nature", "food"],
    climate: "temperate",
    timezone: "Asia/Bangkok",
    language: ["Thai", "English"],
    bestFor: ["culture", "nature", "digital-nomad", "yoga", "trekking"],
  },
  {
    id: "dest-003",
    name: "กรุงเทพฯ",
    nameEn: "Bangkok",
    slug: "bangkok",
    country: "ประเทศไทย",
    region: "Southeast Asia",
    description: "เมืองหลวงที่คึกคัก วัดวาอารามสวยงาม ช้อปปิ้ง และอาหารริมทาง",
    highlights: [
      "วัดพระแก้ว",
      "วัดอรุณ",
      "เยาวราช",
      "ตลาดนัดจตุจักร",
      "ถนนข้าวสาร",
    ],
    coverImage: "/images/destinations/bangkok/cover.jpg",
    images: [],
    coordinates: { lat: 13.7563, lng: 100.5018 },
    popularityScore: 92,
    seasonality: {
      best: ["November", "December", "January", "February"],
      avoid: ["March", "April", "May"], // hot season
    },
    averageBudget: { min: 1000, max: 5000, currency: "THB" },
    tags: ["city", "culture", "shopping", "food", "temple"],
    climate: "tropical",
    timezone: "Asia/Bangkok",
    language: ["Thai", "English", "Chinese"],
    bestFor: ["city-break", "shopping", "food-tour", "business", "culture"],
  },
  {
    id: "dest-004",
    name: "กระบี่",
    nameEn: "Krabi",
    slug: "krabi",
    country: "ประเทศไทย",
    region: "Southeast Asia",
    description: "หน้าผาหินปูนสวยงาม ชายหาดสีขาว และเกาะน้อยใหญ่มากมาย",
    highlights: [
      "อ่าวไร่เลย์",
      "เกาะพีพี",
      "ทะเลแหวก",
      "เกาะห้อง",
      "น้ำตกร้อน",
    ],
    coverImage: "/images/destinations/krabi/cover.jpg",
    images: [],
    coordinates: { lat: 8.0863, lng: 98.9063 },
    popularityScore: 88,
    seasonality: {
      best: ["November", "December", "January", "February", "March"],
      avoid: ["May", "June", "July", "August", "September"],
    },
    averageBudget: { min: 1200, max: 6000, currency: "THB" },
    tags: ["beach", "rock-climbing", "kayaking", "island", "nature"],
    climate: "tropical",
    timezone: "Asia/Bangkok",
    language: ["Thai", "English"],
    bestFor: ["adventure", "beach", "honeymoon", "diving", "photography"],
  },
  {
    id: "dest-005",
    name: "พัทยา",
    nameEn: "Pattaya",
    slug: "pattaya",
    country: "ประเทศไทย",
    region: "Southeast Asia",
    description: "เมืองตากอากาศใกล้กรุงเทพฯ ชายหาด กิจกรรมทางน้ำ และชีวิตยามค่ำคืน",
    highlights: [
      "หาดจอมเทียน",
      "เกาะล้าน",
      "ถนนคนเดิน",
      "สวนนงนุช",
      "ตลาดน้ำสี่ภาค",
    ],
    coverImage: "/images/destinations/pattaya/cover.jpg",
    images: [],
    coordinates: { lat: 12.9236, lng: 100.8825 },
    popularityScore: 85,
    seasonality: {
      best: ["November", "December", "January", "February"],
      avoid: ["March", "April", "May"],
    },
    averageBudget: { min: 1000, max: 4000, currency: "THB" },
    tags: ["beach", "city", "nightlife", "water-sports", "family"],
    climate: "tropical",
    timezone: "Asia/Bangkok",
    language: ["Thai", "English", "Russian", "Chinese"],
    bestFor: ["family", "water-sports", "golf", "nightlife", "weekend"],
  },

  // Continue with more Thailand destinations...
  {
    id: "dest-006",
    name: "สมุย",
    nameEn: "Koh Samui",
    slug: "koh-samui",
    country: "ประเทศไทย",
    region: "Southeast Asia",
    description: "เกาะสวรรค์กลางอ่าวไทย มีรีสอร์ทหรูหรา ชายหาดสวย และชีวิตเกาะที่ผ่อนคลาย",
    highlights: ["ชายหาดเฉวง", "ชายหาดละไม", "วัดพระใหญ่", "น้ำตกนาเมือง", "หินตาหินยาย"],
    coverImage: "/images/destinations/samui/cover.jpg",
    images: [],
    coordinates: { lat: 9.5357, lng: 100.0003 },
    popularityScore: 87,
    seasonality: {
      best: ["February", "March", "April", "August", "September"],
      avoid: ["October", "November", "December"],
    },
    averageBudget: { min: 2000, max: 10000, currency: "THB" },
    tags: ["beach", "island", "luxury", "spa", "romantic"],
    climate: "tropical",
    timezone: "Asia/Bangkok",
    language: ["Thai", "English"],
    bestFor: ["honeymoon", "luxury", "spa", "diving", "yoga"],
  },

  {
    id: "dest-007",
    name: "หัวหิน",
    nameEn: "Hua Hin",
    slug: "hua-hin",
    country: "ประเทศไทย",
    region: "Southeast Asia",
    description: "เมืองท่องเที่ยวพักผ่อนใกล้กรุงเทพฯ มีชายหาดยาว สนามกอล์ฟ และวิลล่าพักตากอากาศ",
    highlights: ["ชายหาดหัวหิน", "ถ้ำพระยานคร", "ตลาดนัดคลองเห", "พระราชวังไกลกังวล", "สวนสนประดิพัทธิ์"],
    coverImage: "/images/destinations/huahin/cover.jpg",
    images: [],
    coordinates: { lat: 12.5739, lng: 99.9576 },
    popularityScore: 83,
    seasonality: {
      best: ["November", "December", "January", "February"],
      avoid: ["July", "August", "September"],
    },
    averageBudget: { min: 1500, max: 8000, currency: "THB" },
    tags: ["beach", "golf", "royal", "family", "weekend"],
    climate: "tropical",
    timezone: "Asia/Bangkok",
    language: ["Thai", "English"],
    bestFor: ["family", "golf", "weekend", "royal-heritage", "cycling"],
  },

  {
    id: "dest-008",
    name: "หาดใหญ่",
    nameEn: "Hat Yai",
    slug: "hat-yai",
    country: "ประเทศไทย",
    region: "Southeast Asia",
    description: "เมืองท่องเที่ยวและศูนย์กลางการค้าของภาคใต้ มีอาหารอร่อย ตลาดคึกคัก และวัฒนธรรมที่หลากหลาย",
    highlights: [
      "ตลาดกิมหยง",
      "วัดหาดใหญ่ใน (พระพุทธมงคลนิมิตร)",
      "สวนสาธารณะหาดใหญ่",
      "ตลาดสันติชล",
      "ถนนนิพัทธ์อุทิศ 1-2-3",
    ],
    coverImage: "/images/destinations/hatyai/cover.jpg",
    images: [
      "/images/destinations/hatyai/kimyong.jpg",
      "/images/destinations/hatyai/temple.jpg",
      "/images/destinations/hatyai/market.jpg",
    ],
    coordinates: { lat: 7.0089, lng: 100.4747 },
    popularityScore: 78,
    seasonality: {
      best: ["December", "January", "February", "March"],
      avoid: ["September", "October", "November"],
    },
    averageBudget: { min: 800, max: 3000, currency: "THB" },
    tags: ["city", "food", "shopping", "culture", "market"],
    climate: "tropical",
    timezone: "Asia/Bangkok",
    language: ["Thai", "Malay", "Chinese", "English"],
    bestFor: ["food-tour", "shopping", "city-break", "weekend", "budget"],
  },

  {
    id: "dest-009",
    name: "เบตง",
    nameEn: "Betong",
    slug: "betong",
    country: "ประเทศไทย",
    region: "Southeast Asia",
    description: "เมืองชายแดนใต้สุดของไทย อากาศเย็นสบาย มีทะเลหมอก สวนดอกซากุระ และวัฒนธรรมไทย-จีน-มลายู",
    highlights: [
      "สวนดอกซากุระ",
      "ทะเลหมอกภูเขาไอซ์แลนด์",
      "น้ำตกโตนงาช้าง",
      "ตลาดโต้รุ่งเบตง",
      "ถนนคนเดินเบตง",
    ],
    coverImage: "/images/destinations/betong/cover.jpg",
    images: [
      "/images/destinations/betong/sakura.jpg",
      "/images/destinations/betong/fog.jpg",
      "/images/destinations/betong/waterfall.jpg",
    ],
    coordinates: { lat: 5.7731, lng: 101.0742 },
    popularityScore: 72,
    seasonality: {
      best: ["December", "January", "February"],
      avoid: ["September", "October", "November"],
    },
    averageBudget: { min: 1000, max: 3500, currency: "THB" },
    tags: ["mountain", "nature", "cool-weather", "culture", "border"],
    climate: "temperate",
    timezone: "Asia/Bangkok",
    language: ["Thai", "Malay", "Chinese"],
    bestFor: ["nature", "cool-weather", "photography", "culture", "weekend"],
  },

  {
    id: "dest-010",
    name: "ยะลา",
    nameEn: "Yala",
    slug: "yala",
    country: "ประเทศไทย",
    region: "Southeast Asia",
    description: "เมืองท่องเที่ยวเชิงธรรมชาติและวัฒนธรรม มีถ้ำสวยงาม น้ำตก และวัฒนธรรมพหุลักษณ์ที่น่าสนใจ",
    highlights: [
      "ถ้ำนาคา",
      "น้ำตกธารโตน",
      "วัดคูหาภิมุข",
      "ตลาดกลางเมืองยะลา",
      "อุทยานธรรมชาติวิทยาลิมิตานี",
    ],
    coverImage: "/images/destinations/yala/cover.jpg",
    images: [
      "/images/destinations/yala/cave.jpg",
      "/images/destinations/yala/waterfall.jpg",
      "/images/destinations/yala/temple.jpg",
    ],
    coordinates: { lat: 6.5407, lng: 101.2806 },
    popularityScore: 68,
    seasonality: {
      best: ["December", "January", "February", "March"],
      avoid: ["September", "October", "November"],
    },
    averageBudget: { min: 800, max: 2800, currency: "THB" },
    tags: ["nature", "cave", "waterfall", "culture", "adventure"],
    climate: "tropical",
    timezone: "Asia/Bangkok",
    language: ["Thai", "Malay"],
    bestFor: ["nature", "adventure", "culture", "photography", "budget"],
  },

  // ===== International Destinations (30 destinations) =====
  
  {
    id: "dest-020",
    name: "บาหลี",
    nameEn: "Bali",
    slug: "bali",
    country: "อินโดนีเซีย",
    region: "Southeast Asia",
    description: "เกาะแห่งเทพเจ้า มีวัฒนธรรมที่เป็นเอกลักษณ์ ชายหาดสวยงาม และบรรยากาศที่ผ่อนคลาย",
    highlights: ["อูบุด", "ทานาห์ล็อต", "ชายหาดสมินยัก", "ภูเขาไฟบาตูร์", "นาขั้นบันไดเตกาลาลัง"],
    coverImage: "/images/destinations/bali/cover.jpg",
    images: [],
    coordinates: { lat: -8.3405, lng: 115.0920 },
    popularityScore: 94,
    seasonality: {
      best: ["April", "May", "June", "September"],
      avoid: ["January", "February", "December"],
    },
    averageBudget: { min: 1200, max: 7000, currency: "THB" },
    tags: ["beach", "culture", "yoga", "surf", "temple"],
    climate: "tropical",
    timezone: "Asia/Makassar",
    language: ["Indonesian", "English"],
    bestFor: ["yoga", "surf", "culture", "honeymoon", "digital-nomad"],
  },

  {
    id: "dest-021",
    name: "สิงคโปร์",
    nameEn: "Singapore",
    slug: "singapore",
    country: "สิงคโปร์",
    region: "Southeast Asia",
    description: "เมืองสิงโต มหานครที่ทันสมัย สะอาด ปลอดภัย และเต็มไปด้วยความหลากหลาย",
    highlights: ["Marina Bay Sands", "Gardens by the Bay", "เซ็นโตซ่า", "ถนนออร์ชาร์ด", "Chinatown"],
    coverImage: "/images/destinations/singapore/cover.jpg",
    images: [],
    coordinates: { lat: 1.3521, lng: 103.8198 },
    popularityScore: 90,
    seasonality: {
      best: ["February", "March", "April", "July", "August"],
      avoid: ["November", "December", "January"],
    },
    averageBudget: { min: 3000, max: 12000, currency: "THB" },
    tags: ["city", "modern", "shopping", "food", "family"],
    climate: "tropical",
    timezone: "Asia/Singapore",
    language: ["English", "Mandarin", "Malay", "Tamil"],
    bestFor: ["city-break", "family", "shopping", "business", "stopover"],
  },

  {
    id: "dest-022",
    name: "โตเกียว",
    nameEn: "Tokyo",
    slug: "tokyo",
    country: "ญี่ปุ่น",
    region: "East Asia",
    description: "มหานครที่ผสมผสานระหว่างความทันสมัยและประเพณีโบราณ",
    highlights: ["วัดเซ็นโซจิ", "Shibuya Crossing", "ตลาดปลาทสึคิจิ", "Tokyo Skytree", "Harajuku"],
    coverImage: "/images/destinations/tokyo/cover.jpg",
    images: [],
    coordinates: { lat: 35.6762, lng: 139.6503 },
    popularityScore: 96,
    seasonality: {
      best: ["March", "April", "October", "November"],
      avoid: ["July", "August"],
    },
    averageBudget: { min: 4000, max: 15000, currency: "THB" },
    tags: ["city", "culture", "technology", "food", "cherry-blossom"],
    climate: "temperate",
    timezone: "Asia/Tokyo",
    language: ["Japanese", "English"],
    bestFor: ["culture", "food-tour", "technology", "shopping", "photography"],
  },

  // Add 27 more international destinations following the same pattern...
  // Including: Seoul, Hong Kong, Maldives, Dubai, Paris, London, New York, etc.
];

export default DESTINATIONS;

// Helper functions
export const getDestinationById = (id: string): Destination | undefined => {
  return DESTINATIONS.find(dest => dest.id === id);
};

export const getDestinationBySlug = (slug: string): Destination | undefined => {
  return DESTINATIONS.find(dest => dest.slug === slug);
};

export const getDestinationsByCountry = (country: string): Destination[] => {
  return DESTINATIONS.filter(dest => dest.country === country);
};

export const getDestinationsByRegion = (region: string): Destination[] => {
  return DESTINATIONS.filter(dest => dest.region === region);
};

export const getDestinationsByTag = (tag: string): Destination[] => {
  return DESTINATIONS.filter(dest => dest.tags.includes(tag));
};

export const getPopularDestinations = (limit: number = 10): Destination[] => {
  return DESTINATIONS
    .sort((a, b) => b.popularityScore - a.popularityScore)
    .slice(0, limit);
};

export const searchDestinations = (query: string): Destination[] => {
  const lowerQuery = query.toLowerCase();
  return DESTINATIONS.filter(dest =>
    dest.name.toLowerCase().includes(lowerQuery) ||
    dest.nameEn.toLowerCase().includes(lowerQuery) ||
    dest.country.toLowerCase().includes(lowerQuery) ||
    dest.description.toLowerCase().includes(lowerQuery)
  );
};
