/**
 * Mock Data: Accommodations
 * 100+ accommodation listings for testing and UI development
 */

import { DESTINATIONS } from "../master/destinations.master";
import { AMENITIES } from "../master/amenities.master";
import { ACCOMMODATION_TYPES } from "../master/accommodation-types.master";

export interface Accommodation {
  id: string;
  slug: string;
  name: string;
  typeId: string; // Reference to ACCOMMODATION_TYPES
  destinationId: string; // Reference to DESTINATIONS
  hostId: string;
  
  // Description
  description: string;
  highlights: string[];
  
  // Location
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  distanceFromCenter: number; // km
  
  // Images
  coverImage: string;
  images: string[];
  
  // Pricing
  basePricePerNight: number;
  currency: string;
  cleaningFee: number;
  serviceFeePercentage: number;
  
  // Capacity
  maxGuests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  
  // Amenities
  amenityIds: string[]; // Reference to AMENITIES
  
  // Status
  status: "active" | "inactive" | "suspended";
  isInstantBook: boolean;
  isVerified: boolean;
  isFeatured: boolean;
  
  // Stats
  averageRating: number;
  reviewCount: number;
  totalBookings: number;
  
  // Policies
  checkInTime: string;
  checkOutTime: string;
  minimumNights: number;
  cancellationPolicy: string;
  houseRules: string[];
}

// Helper function to generate accommodations
const generateAccommodations = (): Accommodation[] => {
  const accommodations: Accommodation[] = [];
  let id = 1;

  // Phuket Accommodations (20 properties)
  const phuketDest = DESTINATIONS[0]; // Phuket
  const resortType = ACCOMMODATION_TYPES[1]; // Resort
  const villaType = ACCOMMODATION_TYPES[2]; // Villa

  // Phuket - Luxury Resorts
  accommodations.push({
    id: `acc-${String(id++).padStart(3, "0")}`,
    slug: "phuket-luxury-beach-resort-spa",
    name: "Phuket Luxury Beach Resort & Spa",
    typeId: resortType.id,
    destinationId: phuketDest.id,
    hostId: "host-001",
    description: "รีสอร์ทหรูระดับ 5 ดาวริมชายหาดป่าตอง มีสระว่ายน้ำ infinity pool วิวทะเล สปา และร้านอาหารริมชายหาด บริการระดับพรีเมี่ยม",
    highlights: [
      "วิวทะเลอันดามันสวยงาม",
      "สระว่ายน้ำ Infinity Pool",
      "สปาและนวดไทย",
      "ร้านอาหารริมชายหาด",
      "บริการรูมเซอร์วิส 24 ชม.",
    ],
    address: "100 ถนนทวีวงศ์ ตำบลป่าตอง อำเภอกะทู้ ภูเก็ต 83150",
    coordinates: { lat: 7.9007, lng: 98.3000 },
    distanceFromCenter: 2.5,
    coverImage: "/images/accommodations/phuket-luxury-resort/cover.jpg",
    images: [
      "/images/accommodations/phuket-luxury-resort/pool.jpg",
      "/images/accommodations/phuket-luxury-resort/room.jpg",
      "/images/accommodations/phuket-luxury-resort/beach.jpg",
    ],
    basePricePerNight: 3500,
    currency: "THB",
    cleaningFee: 500,
    serviceFeePercentage: 10,
    maxGuests: 2,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    amenityIds: ["amen-001", "amen-002", "amen-003", "amen-010", "amen-014", "amen-030", "amen-032", "amen-050", "amen-051", "amen-070"],
    status: "active",
    isInstantBook: true,
    isVerified: true,
    isFeatured: true,
    averageRating: 9.2,
    reviewCount: 1234,
    totalBookings: 450,
    checkInTime: "14:00",
    checkOutTime: "12:00",
    minimumNights: 2,
    cancellationPolicy: "ยกเลิกฟรีภายใน 48 ชั่วโมงก่อนเช็คอิน",
    houseRules: ["ห้ามสูบบุหรี่", "ห้ามนำสัตว์เลี้ยง", "เงียบหลัง 22:00 น."],
  });

  accommodations.push({
    id: `acc-${String(id++).padStart(3, "0")}`,
    slug: "phuket-beachfront-villa-private-pool",
    name: "Phuket Beachfront Villa with Private Pool",
    typeId: villaType.id,
    destinationId: phuketDest.id,
    hostId: "host-002",
    description: "วิลล่าหรู 3 ห้องนอนริมชายหาดในย่านบางเทา สระว่ายน้ำส่วนตัว ครัวครบครัน และสวนส่วนตัว เหมาะสำหรับครอบครัวหรือกลุ่มเพื่อน",
    highlights: [
      "สระว่ายน้ำส่วนตัวขนาดใหญ่",
      "ชายหาดส่วนตัว",
      "ครัวยุโรปครบครัน",
      "3 ห้องนอนพร้อม en-suite",
      "สวนส่วนตัว",
    ],
    address: "45/2 หมู่ 3 ตำบลเชิงทะเล อำเภอถลาง ภูเก็ต 83110",
    coordinates: { lat: 8.0248, lng: 98.2960 },
    distanceFromCenter: 8.5,
    coverImage: "/images/accommodations/phuket-villa/cover.jpg",
    images: [],
    basePricePerNight: 8500,
    currency: "THB",
    cleaningFee: 1500,
    serviceFeePercentage: 12,
    maxGuests: 8,
    bedrooms: 3,
    beds: 4,
    bathrooms: 3,
    amenityIds: ["amen-001", "amen-002", "amen-003", "amen-005", "amen-010", "amen-013", "amen-014", "amen-030", "amen-040", "amen-043", "amen-060", "amen-061", "amen-062"],
    status: "active",
    isInstantBook: false,
    isVerified: true,
    isFeatured: true,
    averageRating: 9.5,
    reviewCount: 856,
    totalBookings: 320,
    checkInTime: "15:00",
    checkOutTime: "11:00",
    minimumNights: 3,
    cancellationPolicy: "ยกเลิกฟรีภายใน 7 วันก่อนเช็คอิน คืนเงิน 50% ภายใน 3 วัน",
    houseRules: ["ห้ามจัดปาร์ตี้", "ห้ามสูบบุหรี่ในอาคาร", "เด็กต้องมีผู้ปกครองดูแล"],
  });

  // Chiang Mai Accommodations (15 properties)
  const chiangMaiDest = DESTINATIONS[1];
  
  accommodations.push({
    id: `acc-${String(id++).padStart(3, "0")}`,
    slug: "chiangmai-mountain-view-villa",
    name: "Chiang Mai Mountain View Villa",
    typeId: villaType.id,
    destinationId: chiangMaiDest.id,
    hostId: "host-003",
    description: "วิลล่าสไตล์ล้านนาท่ามกลางธรรมชาติ วิวดอยสุเทพ สระว่ายน้ำ สวนส่วนตัว และบรรยากาศที่เงียบสงบ",
    highlights: [
      "วิวดอยสุเทพสวยงาม",
      "สไตล์ล้านนาผสมผสานโมเดิร์น",
      "สระว่ายน้ำพร้อมวิวดอย",
      "สวนกาแฟและสมุนไพร",
      "ใกล้ตัวเมือง 15 นาที",
    ],
    address: "88/5 หมู่บ้านดอยสุเทพ ตำบลสุเทพ อำเภอเมืองเชียงใหม่ 50200",
    coordinates: { lat: 18.8041, lng: 98.9219 },
    distanceFromCenter: 6.0,
    coverImage: "/images/accommodations/chiangmai-villa/cover.jpg",
    images: [],
    basePricePerNight: 2800,
    currency: "THB",
    cleaningFee: 800,
    serviceFeePercentage: 10,
    maxGuests: 6,
    bedrooms: 2,
    beds: 3,
    bathrooms: 2,
    amenityIds: ["amen-001", "amen-002", "amen-003", "amen-010", "amen-013", "amen-030", "amen-040", "amen-043", "amen-060"],
    status: "active",
    isInstantBook: true,
    isVerified: true,
    isFeatured: false,
    averageRating: 9.0,
    reviewCount: 445,
    totalBookings: 280,
    checkInTime: "14:00",
    checkOutTime: "12:00",
    minimumNights: 2,
    cancellationPolicy: "ยกเลิกฟรีภายใน 24 ชั่วโมงก่อนเช็คอิน",
    houseRules: ["ห้ามสูบบุหรี่", "เด็กต้องมีผู้ดูแล", "เงียบหลัง 22:00 น."],
  });

  // Bangkok Accommodations (20 properties)
  const bangkokDest = DESTINATIONS[2];
  
  accommodations.push({
    id: `acc-${String(id++).padStart(3, "0")}`,
    slug: "bangkok-modern-condo-sukhumvit",
    name: "Bangkok Modern Condo @ Sukhumvit",
    typeId: "type-010", // Condominium
    destinationId: bangkokDest.id,
    hostId: "host-004",
    description: "คอนโดหรูใจกลางสุขุมวิท ใกล้ BTS อโศก สระว่ายน้ำบนดาดฟ้า ฟิตเนส และวิวเมืองสวยงาม",
    highlights: [
      "ใกล้ BTS อโศก 3 นาที",
      "สระว่ายน้ำบนดาดฟ้า",
      "ฟิตเนสและซาวน่า",
      "ใกล้ Terminal 21",
      "วิวเมืองกรุงเทพฯ",
    ],
    address: "123/45 ถนนสุขุมวิท 21 แขวงคลองเตยเหนือ เขตวัฒนา กรุงเทพฯ 10110",
    coordinates: { lat: 13.7390, lng: 100.5607 },
    distanceFromCenter: 4.5,
    coverImage: "/images/accommodations/bangkok-condo/cover.jpg",
    images: [],
    basePricePerNight: 1800,
    currency: "THB",
    cleaningFee: 500,
    serviceFeePercentage: 10,
    maxGuests: 4,
    bedrooms: 2,
    beds: 2,
    bathrooms: 2,
    amenityIds: ["amen-001", "amen-002", "amen-003", "amen-004", "amen-005", "amen-030", "amen-031", "amen-040", "amen-041", "amen-043"],
    status: "active",
    isInstantBook: true,
    isVerified: true,
    isFeatured: false,
    averageRating: 8.8,
    reviewCount: 567,
    totalBookings: 420,
    checkInTime: "15:00",
    checkOutTime: "11:00",
    minimumNights: 1,
    cancellationPolicy: "ยกเลิกฟรีภายใน 24 ชั่วโมงก่อนเช็คอิน",
    houseRules: ["ห้ามสูบบุหรี่", "ห้ามนำสัตว์เลี้ยง", "ห้ามจัดปาร์ตี้"],
  });

  // Hat Yai Accommodations (10 properties)
  const hatYaiDest = DESTINATIONS[7]; // Hat Yai
  const hotelType = ACCOMMODATION_TYPES[0]; // Hotel
  
  accommodations.push({
    id: `acc-${String(id++).padStart(3, "0")}`,
    slug: "hatyai-centara-hotel",
    name: "Centara Hotel Hat Yai",
    typeId: hotelType.id,
    destinationId: hatYaiDest.id,
    hostId: "host-005",
    description: "โรงแรม 4 ดาวใจกลางเมืองหาดใหญ่ ใกล้ตลาดกิมหยง ห้องพักสะดวกสบาย มีสระว่ายน้ำและฟิตเนส",
    highlights: [
      "ใจกลางเมืองหาดใหญ่",
      "ใกล้ตลาดกิมหยง 5 นาที",
      "สระว่ายน้ำบนดาดฟ้า",
      "ห้องอาหารนานาชาติ",
      "ฟิตเนสและสปา",
    ],
    address: "3 ถนนสนามบิน 3 ตำบลหาดใหญ่ อำเภอหาดใหญ่ สงขลา 90110",
    coordinates: { lat: 7.0067, lng: 100.4768 },
    distanceFromCenter: 0.5,
    coverImage: "/images/accommodations/hatyai-centara/cover.jpg",
    images: [
      "/images/accommodations/hatyai-centara/pool.jpg",
      "/images/accommodations/hatyai-centara/room.jpg",
      "/images/accommodations/hatyai-centara/restaurant.jpg",
    ],
    basePricePerNight: 1200,
    currency: "THB",
    cleaningFee: 300,
    serviceFeePercentage: 10,
    maxGuests: 2,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    amenityIds: ["amen-001", "amen-002", "amen-003", "amen-010", "amen-014", "amen-030", "amen-031", "amen-040", "amen-050"],
    status: "active",
    isInstantBook: true,
    isVerified: true,
    isFeatured: true,
    averageRating: 8.5,
    reviewCount: 892,
    totalBookings: 650,
    checkInTime: "14:00",
    checkOutTime: "12:00",
    minimumNights: 1,
    cancellationPolicy: "ยกเลิกฟรีภายใน 24 ชั่วโมงก่อนเช็คอิน",
    houseRules: ["ห้ามสูบบุหรี่", "ห้ามนำสัตว์เลี้ยง", "เงียบหลัง 22:00 น."],
  });

  accommodations.push({
    id: `acc-${String(id++).padStart(3, "0")}`,
    slug: "hatyai-budget-hostel",
    name: "Hat Yai Backpacker Hostel",
    typeId: "type-005", // Hostel
    destinationId: hatYaiDest.id,
    hostId: "host-006",
    description: "โฮสเทลสะอาด ราคาประหยัด ใกล้ตลาดสันติชล เหมาะสำหรับนักเดินทางงบน้อย มีบรรยากาศเป็นกันเอง",
    highlights: [
      "ราคาประหยัด",
      "ใกล้ตลาดสันติชล",
      "Wi-Fi ความเร็วสูง",
      "พื้นที่ส่วนกลางสบายๆ",
      "เจ้าของใจดีให้คำแนะนำ",
    ],
    address: "88/12 ถนนนิพัทธ์อุทิศ 2 ตำบลหาดใหญ่ อำเภอหาดใหญ่ สงขลา 90110",
    coordinates: { lat: 7.0102, lng: 100.4721 },
    distanceFromCenter: 1.2,
    coverImage: "/images/accommodations/hatyai-hostel/cover.jpg",
    images: [],
    basePricePerNight: 350,
    currency: "THB",
    cleaningFee: 100,
    serviceFeePercentage: 8,
    maxGuests: 1,
    bedrooms: 0, // Dorm bed
    beds: 1,
    bathrooms: 0, // Shared bathroom
    amenityIds: ["amen-001", "amen-002", "amen-030", "amen-040"],
    status: "active",
    isInstantBook: true,
    isVerified: true,
    isFeatured: false,
    averageRating: 8.2,
    reviewCount: 234,
    totalBookings: 180,
    checkInTime: "14:00",
    checkOutTime: "11:00",
    minimumNights: 1,
    cancellationPolicy: "ยกเลิกฟรีภายใน 24 ชั่วโมงก่อนเช็คอิน",
    houseRules: ["ห้ามสูบบุหรี่", "เงียบหลัง 23:00 น.", "ห้ามนำอาหารมีกลิ่นแรงเข้าห้อง"],
  });

  accommodations.push({
    id: `acc-${String(id++).padStart(3, "0")}`,
    slug: "hatyai-boutique-hotel",
    name: "Hat Yai Boutique Hotel & Cafe",
    typeId: "type-003", // Boutique Hotel
    destinationId: hatYaiDest.id,
    hostId: "host-007",
    description: "โรงแรมบูติกสไตล์โมเดิร์น มีคาเฟ่น่ารัก ห้องพักตะกแต่งสวยงาม ใกล้ถนนนิพัทธ์อุทิศ",
    highlights: [
      "ดีไซน์โมเดิร์นสวยงาม",
      "คาเฟ่ในโรงแรม",
      "ใกล้ถนนช้อปปิ้ง",
      "ห้องพักสะอาดน่าอยู่",
      "บริการเป็นกันเอง",
    ],
    address: "45/8 ถนนนิพัทธ์อุทิศ 1 ตำบลหาดใหญ่ อำเภอหาดใหญ่ สงขลา 90110",
    coordinates: { lat: 7.0078, lng: 100.4755 },
    distanceFromCenter: 0.8,
    coverImage: "/images/accommodations/hatyai-boutique/cover.jpg",
    images: [],
    basePricePerNight: 950,
    currency: "THB",
    cleaningFee: 250,
    serviceFeePercentage: 10,
    maxGuests: 2,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    amenityIds: ["amen-001", "amen-002", "amen-003", "amen-030", "amen-040", "amen-043"],
    status: "active",
    isInstantBook: false,
    isVerified: true,
    isFeatured: true,
    averageRating: 9.1,
    reviewCount: 456,
    totalBookings: 380,
    checkInTime: "14:00",
    checkOutTime: "12:00",
    minimumNights: 1,
    cancellationPolicy: "ยกเลิกฟรีภายใน 48 ชั่วโมงก่อนเช็คอิน",
    houseRules: ["ห้ามสูบบุหรี่", "ห้ามนำสัตว์เลี้ยง", "เงียบหลัง 22:00 น."],
  });

  // Betong Accommodations (8 properties)
  const betongDest = DESTINATIONS[8]; // Betong
  
  accommodations.push({
    id: `acc-${String(id++).padStart(3, "0")}`,
    slug: "betong-mountain-resort",
    name: "Betong Mountain View Resort",
    typeId: resortType.id,
    destinationId: betongDest.id,
    hostId: "host-008",
    description: "รีสอร์ทบนเขา วิวทะเลหมอกสวยงาม อากาศเย็นสบาย ใกล้สวนดอกซากุระ เหมาะพักผ่อน",
    highlights: ["วิวทะเลหมอก", "อากาศเย็น", "ใกล้สวนซากุระ", "ร้านอาหารท้องถิ่น", "บรรยากาศสงบ"],
    address: "99 หมู่ 5 ตำบลเบตง อำเภอเบตง สงขลา 95110",
    coordinates: { lat: 5.7850, lng: 101.0820 },
    distanceFromCenter: 3.5,
    coverImage: "/images/accommodations/betong-resort/cover.jpg",
    images: [],
    basePricePerNight: 1500,
    currency: "THB",
    cleaningFee: 400,
    serviceFeePercentage: 10,
    maxGuests: 4,
    bedrooms: 2,
    beds: 2,
    bathrooms: 2,
    amenityIds: ["amen-001", "amen-002", "amen-003", "amen-010", "amen-030", "amen-040", "amen-043"],
    status: "active",
    isInstantBook: true,
    isVerified: true,
    isFeatured: true,
    averageRating: 8.9,
    reviewCount: 567,
    totalBookings: 420,
    checkInTime: "14:00",
    checkOutTime: "12:00",
    minimumNights: 2,
    cancellationPolicy: "ยกเลิกฟรีภายใน 48 ชั่วโมงก่อนเช็คอิน",
    houseRules: ["ห้ามสูบบุหรี่", "ห้ามนำสัตว์เลี้ยง", "เงียบหลัง 22:00 น."],
  });

  accommodations.push({
    id: `acc-${String(id++).padStart(3, "0")}`,
    slug: "betong-guesthouse",
    name: "Betong Cozy Guesthouse",
    typeId: "type-004", // Guesthouse
    destinationId: betongDest.id,
    hostId: "host-009",
    description: "เกสต์เฮ้าส์อบอุ่น ใจกลางเมืองเบตง ใกล้ตลาดโต้รุ่ง ราคาประหยัด บรรยากาศเป็นกันเอง",
    highlights: ["ราคาประหยัด", "ใจกลางเมือง", "ใกล้ตลาดโต้รุ่ง", "เจ้าของใจดี", "สะอาด"],
    address: "23/7 ถนนเบตง ตำบลเบตง อำเภอเบตง สงขลา 95110",
    coordinates: { lat: 5.7720, lng: 101.0730 },
    distanceFromCenter: 0.5,
    coverImage: "/images/accommodations/betong-guesthouse/cover.jpg",
    images: [],
    basePricePerNight: 600,
    currency: "THB",
    cleaningFee: 150,
    serviceFeePercentage: 8,
    maxGuests: 2,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    amenityIds: ["amen-001", "amen-002", "amen-030", "amen-040"],
    status: "active",
    isInstantBook: true,
    isVerified: true,
    isFeatured: false,
    averageRating: 8.3,
    reviewCount: 234,
    totalBookings: 180,
    checkInTime: "14:00",
    checkOutTime: "11:00",
    minimumNights: 1,
    cancellationPolicy: "ยกเลิกฟรีภายใน 24 ชั่วโมงก่อนเช็คอิน",
    houseRules: ["ห้ามสูบบุหรี่", "เงียบหลัง 23:00 น."],
  });

  // Yala Accommodations (6 properties)
  const yalaDest = DESTINATIONS[9]; // Yala
  
  accommodations.push({
    id: `acc-${String(id++).padStart(3, "0")}`,
    slug: "yala-nature-hotel",
    name: "Yala Nature Hotel",
    typeId: hotelType.id,
    destinationId: yalaDest.id,
    hostId: "host-010",
    description: "โรงแรมท่ามกลางธรรมชาติ ใกล้ถ้ำนาคา น้ำตกธารโตน บรรยากาศสงบ เหมาะพักผ่อน",
    highlights: ["ใกล้ถ้ำนาคา", "วิวธรรมชาติ", "ห้องพักสะอาด", "ร้านอาหารท้องถิ่น", "ที่จอดรถกว้าง"],
    address: "88 ถนนสิริรัตน์ ตำบลสะเตง อำเภอเมืองยะลา ยะลา 95000",
    coordinates: { lat: 6.5450, lng: 101.2850 },
    distanceFromCenter: 2.0,
    coverImage: "/images/accommodations/yala-hotel/cover.jpg",
    images: [],
    basePricePerNight: 900,
    currency: "THB",
    cleaningFee: 250,
    serviceFeePercentage: 10,
    maxGuests: 3,
    bedrooms: 1,
    beds: 2,
    bathrooms: 1,
    amenityIds: ["amen-001", "amen-002", "amen-003", "amen-030", "amen-040", "amen-043"],
    status: "active",
    isInstantBook: true,
    isVerified: true,
    isFeatured: true,
    averageRating: 8.4,
    reviewCount: 456,
    totalBookings: 320,
    checkInTime: "14:00",
    checkOutTime: "12:00",
    minimumNights: 1,
    cancellationPolicy: "ยกเลิกฟรีภายใน 24 ชั่วโมงก่อนเช็คอิน",
    houseRules: ["ห้ามสูบบุหรี่", "ห้ามนำสัตว์เลี้ยง", "เงียบหลัง 22:00 น."],
  });

  accommodations.push({
    id: `acc-${String(id++).padStart(3, "0")}`,
    slug: "yala-budget-inn",
    name: "Yala Budget Inn",
    typeId: "type-004", // Guesthouse
    destinationId: yalaDest.id,
    hostId: "host-011",
    description: "ที่พักราคาประหยัด ใจกลางเมืองยะลา ใกล้ตลาดกลางเมือง สะดวกสบาย",
    highlights: ["ราคาถูก", "ใจกลางเมือง", "ใกล้ตลาด", "Wi-Fi ฟรี", "สะอาด"],
    address: "45/12 ถนนสุขสันต์ ตำบลสะเตง อำเภอเมืองยะลา ยะลา 95000",
    coordinates: { lat: 6.5380, lng: 101.2780 },
    distanceFromCenter: 0.8,
    coverImage: "/images/accommodations/yala-inn/cover.jpg",
    images: [],
    basePricePerNight: 450,
    currency: "THB",
    cleaningFee: 100,
    serviceFeePercentage: 8,
    maxGuests: 2,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    amenityIds: ["amen-001", "amen-002", "amen-030", "amen-040"],
    status: "active",
    isInstantBook: true,
    isVerified: true,
    isFeatured: false,
    averageRating: 7.9,
    reviewCount: 178,
    totalBookings: 145,
    checkInTime: "14:00",
    checkOutTime: "11:00",
    minimumNights: 1,
    cancellationPolicy: "ยกเลิกฟรีภายใน 24 ชั่วโมงก่อนเช็คอิน",
    houseRules: ["ห้ามสูบบุหรี่", "เงียบหลัง 23:00 น."],
  });

  // Generate more accommodations for other destinations
  // Total target: 100+ properties

  // Quick generation for remaining properties (simplified)
  for (let i = id; i <= 100; i++) {
    const destIndex = i % DESTINATIONS.length;
    const typeIndex = i % ACCOMMODATION_TYPES.length;
    const destination = DESTINATIONS[destIndex];
    const type = ACCOMMODATION_TYPES[typeIndex];

    accommodations.push({
      id: `acc-${String(i).padStart(3, "0")}`,
      slug: `${destination.slug}-property-${i}`,
      name: `${destination.nameEn} ${type.nameEn} #${i}`,
      typeId: type.id,
      destinationId: destination.id,
      hostId: `host-${String((i % 50) + 1).padStart(3, "0")}`,
      description: `Beautiful ${type.nameEn.toLowerCase()} in ${destination.nameEn} with amazing facilities and great location.`,
      highlights: [
        `Great location in ${destination.nameEn}`,
        "Clean and comfortable",
        "Friendly host",
        "Good value for money",
      ],
      address: `${i} Main Street, ${destination.nameEn}`,
      coordinates: {
        lat: destination.coordinates.lat + (Math.random() - 0.5) * 0.1,
        lng: destination.coordinates.lng + (Math.random() - 0.5) * 0.1,
      },
      distanceFromCenter: Math.random() * 10,
      coverImage: `/images/accommodations/${destination.slug}/property-${i}.jpg`,
      images: [],
      basePricePerNight: Math.floor(500 + Math.random() * 5000),
      currency: "THB",
      cleaningFee: Math.floor(200 + Math.random() * 1000),
      serviceFeePercentage: 10,
      maxGuests: Math.floor(2 + Math.random() * 10),
      bedrooms: Math.floor(1 + Math.random() * 5),
      beds: Math.floor(1 + Math.random() * 6),
      bathrooms: Math.floor(1 + Math.random() * 4),
      amenityIds: AMENITIES.slice(0, Math.floor(5 + Math.random() * 10)).map(a => a.id),
      status: "active",
      isInstantBook: Math.random() > 0.5,
      isVerified: Math.random() > 0.3,
      isFeatured: Math.random() > 0.8,
      averageRating: 7 + Math.random() * 3, // 7.0 - 10.0
      reviewCount: Math.floor(Math.random() * 1000),
      totalBookings: Math.floor(Math.random() * 500),
      checkInTime: "14:00",
      checkOutTime: "12:00",
      minimumNights: Math.floor(1 + Math.random() * 3),
      cancellationPolicy: "ยกเลิกฟรีภายใน 24-48 ชั่วโมงก่อนเช็คอิน",
      houseRules: ["ห้ามสูบบุหรี่", "ห้ามนำสัตว์เลี้ยง"],
    });
  }

  return accommodations;
};

export const ACCOMMODATIONS = generateAccommodations();

export default ACCOMMODATIONS;

// Helper functions
export const getAccommodationById = (id: string): Accommodation | undefined => {
  return ACCOMMODATIONS.find(acc => acc.id === id);
};

export const getAccommodationBySlug = (slug: string): Accommodation | undefined => {
  return ACCOMMODATIONS.find(acc => acc.slug === slug);
};

export const getAccommodationsByDestination = (destinationId: string): Accommodation[] => {
  return ACCOMMODATIONS.filter(acc => acc.destinationId === destinationId);
};

export const getAccommodationsByType = (typeId: string): Accommodation[] => {
  return ACCOMMODATIONS.filter(acc => acc.typeId === typeId);
};

export const getFeaturedAccommodations = (limit: number = 10): Accommodation[] => {
  return ACCOMMODATIONS
    .filter(acc => acc.isFeatured)
    .sort((a, b) => b.averageRating - a.averageRating)
    .slice(0, limit);
};

export const searchAccommodations = (query: string): Accommodation[] => {
  const lowerQuery = query.toLowerCase();
  return ACCOMMODATIONS.filter(acc =>
    acc.name.toLowerCase().includes(lowerQuery) ||
    acc.description.toLowerCase().includes(lowerQuery)
  );
};

export const filterAccommodations = (filters: {
  destinationId?: string;
  typeId?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  amenityIds?: string[];
}): Accommodation[] => {
  return ACCOMMODATIONS.filter(acc => {
    if (filters.destinationId && acc.destinationId !== filters.destinationId) return false;
    if (filters.typeId && acc.typeId !== filters.typeId) return false;
    if (filters.minPrice && acc.basePricePerNight < filters.minPrice) return false;
    if (filters.maxPrice && acc.basePricePerNight > filters.maxPrice) return false;
    if (filters.minRating && acc.averageRating < filters.minRating) return false;
    if (filters.amenityIds && !filters.amenityIds.every(id => acc.amenityIds.includes(id))) return false;
    return true;
  });
};
