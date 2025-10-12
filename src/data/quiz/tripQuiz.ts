/**
 * Trip Inspiration Quiz Data
 * Helps users find their perfect destination through 5 questions
 */

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
}

export interface QuizOption {
  id: string;
  label: string;
  value: string | number;
  icon: string;
  description?: string;
  tags?: string[]; // For matching with destinations
}

export interface QuizAnswers {
  budget: number;
  types: string[]; // beach, mountain, city, culture
  travelWith: string; // honeymoon, family, friends, solo
  activities: string[]; // relax, adventure, food, photo
  duration: number; // days
}

export const TRIP_QUIZ_QUESTIONS: QuizQuestion[] = [
  // Question 1: Budget
  {
    id: "budget",
    question: "งบประมาณของคุณเท่าไหร่? (ต่อคน)",
    options: [
      {
        id: "budget-low",
        label: "ไม่เกิน 5,000 บาท",
        value: 5000,
        icon: "💵",
        description: "งบประหยัด เที่ยวคุ้มค่า",
        tags: ["budget", "local"],
      },
      {
        id: "budget-mid",
        label: "5,000 - 15,000 บาท",
        value: 15000,
        icon: "💰",
        description: "งบปานกลาง เที่ยวสบาย",
        tags: ["moderate", "domestic"],
      },
      {
        id: "budget-high",
        label: "15,000 - 30,000 บาท",
        value: 30000,
        icon: "💎",
        description: "งบดี เที่ยวมีระดับ",
        tags: ["premium", "international"],
      },
      {
        id: "budget-luxury",
        label: "มากกว่า 30,000 บาท",
        value: 50000,
        icon: "👑",
        description: "งบหรู เที่ยวแบบ VIP",
        tags: ["luxury", "international"],
      },
    ],
  },

  // Question 2: Destination Type
  {
    id: "type",
    question: "คุณชอบบรรยากาศแบบไหน? (เลือกได้หลายข้อ)",
    options: [
      {
        id: "type-beach",
        label: "ทะเล ชายหาด เกาะ",
        value: "beach",
        icon: "🏖️",
        description: "ผ่อนคลายริมทะเล",
        tags: ["beach", "island", "diving", "spa"],
      },
      {
        id: "type-mountain",
        label: "ภูเขา ธรรมชาติ ป่า",
        value: "mountain",
        icon: "⛰️",
        description: "สูดอากาศบริสุทธิ์",
        tags: ["mountain", "nature", "trekking", "adventure"],
      },
      {
        id: "type-city",
        label: "เมือง ช้อปปิ้ง กินเดิน",
        value: "city",
        icon: "🏙️",
        description: "ชีวิตเมือง ความสะดวกสบาย",
        tags: ["city", "shopping", "food", "nightlife"],
      },
      {
        id: "type-culture",
        label: "วัฒนธรรม ประวัติศาสตร์ วัด",
        value: "culture",
        icon: "🏛️",
        description: "เรียนรู้ ชื่นชม วัฒนธรรม",
        tags: ["culture", "temple", "heritage", "history"],
      },
    ],
  },

  // Question 3: Travel Companion
  {
    id: "companion",
    question: "คุณจะไปกับใคร?",
    options: [
      {
        id: "companion-honeymoon",
        label: "คู่รัก Honeymoon",
        value: "honeymoon",
        icon: "💑",
        description: "บรรยากาศโรแมนติก",
        tags: ["romantic", "luxury", "spa", "private"],
      },
      {
        id: "companion-family",
        label: "ครอบครัว",
        value: "family",
        icon: "👨‍👩‍👧‍👦",
        description: "เหมาะกับทุกวัย ปลอดภัย",
        tags: ["family", "safe", "activities", "accommodation"],
      },
      {
        id: "companion-friends",
        label: "เพื่อนๆ กลุ่ม",
        value: "friends",
        icon: "👯",
        description: "สนุก ผจญภัย",
        tags: ["adventure", "nightlife", "activities", "party"],
      },
      {
        id: "companion-solo",
        label: "คนเดียว Solo Travel",
        value: "solo",
        icon: "🧘",
        description: "เที่ยวตามใจ หาประสบการณ์",
        tags: ["solo", "safe", "adventure", "culture"],
      },
    ],
  },

  // Question 4: Activities
  {
    id: "activities",
    question: "ชอบทำกิจกรรมแบบไหน? (เลือกได้หลายข้อ)",
    options: [
      {
        id: "activity-relax",
        label: "ผ่อนคลาย พักผ่อน นวดสปา",
        value: "relax",
        icon: "😎",
        description: "Slow life ชิลๆ",
        tags: ["spa", "beach", "luxury", "resort"],
      },
      {
        id: "activity-adventure",
        label: "ผจญภัย กีฬา ท้าทาย",
        value: "adventure",
        icon: "🤿",
        description: "ปั่น ปีน ดำน้ำ",
        tags: ["diving", "trekking", "adventure", "sports"],
      },
      {
        id: "activity-food",
        label: "กินเดิน ฟู้ดทริป",
        value: "food",
        icon: "🍜",
        description: "ลิ้มลองอาหารท้องถิ่น",
        tags: ["food", "market", "street-food", "restaurant"],
      },
      {
        id: "activity-photo",
        label: "ถ่ายรูป ชิลๆ Cafe",
        value: "photo",
        icon: "📸",
        description: "มุมถ่ายรูปสวยๆ",
        tags: ["scenic", "cafe", "instagram", "photography"],
      },
    ],
  },

  // Question 5: Duration
  {
    id: "duration",
    question: "จะไปกี่วัน?",
    options: [
      {
        id: "duration-short",
        label: "1-2 วัน",
        value: 2,
        icon: "🏃",
        description: "ทริปสั้น ใกล้ๆ",
        tags: ["weekend", "nearby"],
      },
      {
        id: "duration-medium",
        label: "3-4 วัน",
        value: 4,
        icon: "🚗",
        description: "พักผ่อนได้เต็มที่",
        tags: ["standard", "comfortable"],
      },
      {
        id: "duration-long",
        label: "5-7 วัน",
        value: 7,
        icon: "✈️",
        description: "เที่ยวอย่างเต็มอิ่ม",
        tags: ["extended", "thorough"],
      },
      {
        id: "duration-extended",
        label: "มากกว่า 7 วัน",
        value: 10,
        icon: "🌏",
        description: "ท่องเที่ยวแบบจุใจ",
        tags: ["vacation", "international"],
      },
    ],
  },
];

/**
 * Get all tags from quiz options for matching
 */
export function getAllQuizTags(): string[] {
  const tags = new Set<string>();
  TRIP_QUIZ_QUESTIONS.forEach((question) => {
    question.options.forEach((option) => {
      option.tags?.forEach((tag) => tags.add(tag));
    });
  });
  return Array.from(tags);
}

/**
 * Validate quiz answers
 */
export function validateQuizAnswers(answers: Partial<QuizAnswers>): boolean {
  return !!(
    answers.budget &&
    answers.types &&
    answers.types.length > 0 &&
    answers.travelWith &&
    answers.activities &&
    answers.activities.length > 0 &&
    answers.duration
  );
}
