export const wellnessCategories = [
  {
    "id": "energy",
    "en": "Energy & Performance",
    "ar": "الطاقة والأداء",
    "tr": "Enerji ve Performans"
  },
  {
    "id": "bones",
    "en": "Bones, Joint & Mobility",
    "ar": "العظام والمفاصل والحركة",
    "tr": "Kemik, Eklem ve Hareket"
  },
  {
    "id": "vitamins",
    "en": "Vitamins & Minerals",
    "ar": "الفيتامينات والمعادن",
    "tr": "Vitaminler ve Mineraller"
  },
  {
    "id": "beauty",
    "en": "Skin, Hair & Beauty",
    "ar": "البشرة والشعر والجمال",
    "tr": "Cilt, Saç ve Güzellik"
  },
  {
    "id": "immunity",
    "en": "Immunity",
    "ar": "المناعة",
    "tr": "Bağışıklık"
  },
  {
    "id": "gut",
    "en": "Gut Health & Digestion",
    "ar": "الهضم وصحة الأمعاء",
    "tr": "Sindirim ve Bağırsak Sağlığı"
  },
  {
    "id": "brain",
    "en": "Brain, Mood & Sleep",
    "ar": "الدماغ والمزاج والنوم",
    "tr": "Beyin, Ruh Hali ve Uyku"
  },
  {
    "id": "heart",
    "en": "Heart Health",
    "ar": "صحة القلب",
    "tr": "Kalp Sağlığı"
  },
  {
    "id": "sport",
    "en": "Sport & Exercise Nutrition",
    "ar": "التغذية الرياضية",
    "tr": "Spor ve Egzersiz Beslenmesi"
  },
  {
    "id": "women",
    "en": "Womens Health",
    "ar": "صحة المرأة",
    "tr": "Kadın Sağlığı"
  },
  {
    "id": "men",
    "en": "Mens Health",
    "ar": "صحة الرجل",
    "tr": "Erkek Sağlığı"
  },
  {
    "id": "herbal",
    "en": "Herbal & Natural Remedies",
    "ar": "المنتجات العشبية والطبيعية",
    "tr": "Bitkisel ve Doğal Ürünler"
  }
]

// Provisional catalog/navigation groupings, not medical claims.
// Review category assignment against official product documentation before publishing.
const productsByCategory = {
  "herbal": [
    1,
    2,
    3,
    7,
    8,
    9,
    11,
    12,
    32,
    34,
    35,
    36,
    37,
    38
  ],
  "gut": [
    4,
    30
  ],
  "vitamins": [
    5,
    6,
    13,
    14,
    15,
    16,
    17,
    19,
    20,
    21,
    25,
    29
  ],
  "bones": [
    18,
    27
  ],
  "beauty": [
    24,
    26,
    28,
    31,
    33,
    42,
    45,
    48,
    49,
    50
  ],
  "brain": [
    10
  ],
  "energy": [
    23,
    44,
    46
  ],
  "sport": [
    22,
    43,
    52,
    53
  ],
  "women": [
    40
  ],
  "men": [
    39,
    41,
    47
  ],
  "immunity": [
    51
  ],
  "heart": []
}
export const categoryById = Object.fromEntries(Object.entries(productsByCategory).flatMap(([category, ids]) => ids.map(id => [id,category])))
export const needsReview = new Set([5, 6, 7, 8, 9, 10, 11, 12, 23, 29, 30, 34, 35, 36, 39, 40, 41, 44, 46, 47, 48, 49, 50, 51])
export const labelForCategory = (id,lang='en') => wellnessCategories.find(c=>c.id===id)?.[lang] || wellnessCategories.find(c=>c.id===id)?.en || id
export const groupForProduct = (product) => categoryById[product.id] || 'vitamins'
export const slugForProduct = product => product.slug
