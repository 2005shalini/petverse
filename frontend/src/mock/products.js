// ─────────────────────────────────────────────────────────────
// PetVerse Product Catalog — Single Source of Truth
// ─────────────────────────────────────────────────────────────

export const mockProducts = [
  // ── FOOD & NUTRITION ────────────────────────────────────────
  {
    id: "prod-1",
    name: "Royal Canin Golden Retriever Adult Dry Food",
    brand: "Royal Canin",
    category: "Food & Nutrition",
    description: "Tailor-made nutrition for purebred Golden Retrievers. Supports healthy skin, coat, and heart functions.",
    price: 64.99,
    discount: 10, // 10% off
    rating: 4.8,
    reviews: [
      { author: "Sarah W.", rating: 5, comment: "Ideal for my Golden retriever, her coat looks amazing!", date: "2026-06-15" },
      { author: "John D.", rating: 4, comment: "A bit expensive but high quality nutrition.", date: "2026-05-10" }
    ],
    stock: 25,
    images: ["https://images.unsplash.com/photo-1589924691106-07a2c7555675?w=500&auto=format&fit=crop&q=80"],
    nutrition: { protein: "25%", fat: "13%", fiber: "3.7%" },
    ingredients: ["Chicken by-product meal", "Brown rice", "Oat groats", "Chicken fat"],
    petTypes: ["Dog"],
    breedCompatibility: ["Golden Retriever"],
    ageCompatibility: ["Adult (1-7 yr)", "Senior (7+ yr)"],
    subscriptionSupported: true
  },
  {
    id: "prod-2",
    name: "Royal Canin Persian Breed Adult Dry Cat Food",
    brand: "Royal Canin",
    category: "Food & Nutrition",
    description: "Formulated to support the Persian breed's long coat, hairball control, and digestive health.",
    price: 38.99,
    discount: 0,
    rating: 4.7,
    reviews: [
      { author: "Emily R.", rating: 5, comment: "Milo loves this kibble, easier for his flat face to pick up.", date: "2026-06-01" }
    ],
    stock: 18,
    images: ["https://images.unsplash.com/photo-1608454509000-19cef87b3794?w=500&auto=format&fit=crop&q=80"],
    nutrition: { protein: "30%", fat: "22%", fiber: "4.7%" },
    ingredients: ["Chicken meal", "Chicken fat", "Brewers rice", "Corn gluten meal"],
    petTypes: ["Cat"],
    breedCompatibility: ["Persian"],
    ageCompatibility: ["Adult (1-10 yr)", "Senior (10+ yr)"],
    subscriptionSupported: true
  },
  {
    id: "prod-3",
    name: "Orijen Fit & Trim Grain-Free Dog Food",
    brand: "Orijen",
    category: "Food & Nutrition",
    description: "High-protein, grain-free formula optimized for weight management and active lean muscle mass.",
    price: 74.99,
    discount: 15,
    rating: 4.9,
    reviews: [],
    stock: 12,
    images: ["https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=500&auto=format&fit=crop&q=80"],
    nutrition: { protein: "42%", fat: "13%", fiber: "8%" },
    ingredients: ["Fresh chicken meat", "Fresh whole eggs", "Fresh wild-caught herring"],
    petTypes: ["Dog"],
    breedCompatibility: ["German Shepherd", "Golden Retriever"],
    ageCompatibility: ["Adult (1-7 yr)"],
    subscriptionSupported: true
  },
  {
    id: "prod-4",
    name: "Taste of the Wild High Prairie Grain-Free Dry Cat Food",
    brand: "Taste of the Wild",
    category: "Food & Nutrition",
    description: "Real roasted venison and salmon recipe, providing highly digestible protein for active cats.",
    price: 34.99,
    discount: 5,
    rating: 4.6,
    reviews: [],
    stock: 30,
    images: ["https://images.unsplash.com/photo-1569591159212-b02ea8a9f239?w=500&auto=format&fit=crop&q=80"],
    nutrition: { protein: "42%", fat: "18%", fiber: "3%" },
    ingredients: ["Chicken meal", "Peas", "Sweet potatoes", "Roasted venison", "Smoked salmon"],
    petTypes: ["Cat"],
    breedCompatibility: ["Persian", "Siamese", "All Cats"],
    ageCompatibility: ["Kitten (0-1 yr)", "Adult (1-10 yr)"],
    subscriptionSupported: true
  },

  // ── SUPPLEMENTS ─────────────────────────────────────────────
  {
    id: "prod-5",
    name: "Zesty Paws Glucosamine Joint Supplements for Dogs",
    brand: "Zesty Paws",
    category: "Supplements",
    description: "Mobility bites with OptiMSM, Glucosamine, and Chondroitin to support joint structural integrity in large dogs.",
    price: 29.99,
    discount: 0,
    rating: 4.8,
    reviews: [
      { author: "Arthur M.", rating: 5, comment: "Helps my senior retriever stand up much easier.", date: "2026-06-20" }
    ],
    stock: 45,
    images: ["https://images.unsplash.com/photo-1628136191836-c672b1b98241?w=500&auto=format&fit=crop&q=80"],
    nutrition: { glucosamine: "500mg", chondroitin: "400mg" },
    ingredients: ["Glucosamine HCl", "Chondroitin Sulfate", "Organic Turmeric"],
    petTypes: ["Dog"],
    breedCompatibility: ["Golden Retriever", "German Shepherd"],
    ageCompatibility: ["Adult (1-7 yr)", "Senior (7+ yr)"],
    subscriptionSupported: true
  },
  {
    id: "prod-6",
    name: "Nordic Naturals Omega-3 Fish Oil for Pets",
    brand: "Nordic Naturals",
    category: "Supplements",
    description: "Pure wild-caught anchovy and sardine oil. Promotes healthy skin, soft coat, joint health, and cellular wellness.",
    price: 24.99,
    discount: 5,
    rating: 4.9,
    reviews: [],
    stock: 50,
    images: ["https://images.unsplash.com/photo-1611070973770-b1a6726b0c6a?w=500&auto=format&fit=crop&q=80"],
    nutrition: { omega3: "1200mg" },
    ingredients: ["Anchovy oil", "Sardine oil", "d-alpha tocopherol"],
    petTypes: ["Dog", "Cat"],
    breedCompatibility: ["Golden Retriever", "Persian", "German Shepherd"],
    ageCompatibility: ["Puppy (0-1 yr)", "Kitten (0-1 yr)", "Adult (1-7 yr)", "Senior (7+ yr)"],
    subscriptionSupported: false
  },

  // ── TOYS & ACCESSORIES ──────────────────────────────────────
  {
    id: "prod-7",
    name: "KONG Extreme Durable Rubber Dog Toy",
    brand: "KONG",
    category: "Toys & Accessories",
    description: "Ultra-durable black rubber formula for determined chewers. Great for stuffing treats.",
    price: 15.99,
    discount: 0,
    rating: 4.9,
    reviews: [],
    stock: 40,
    images: ["https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=500&auto=format&fit=crop&q=80"],
    nutrition: {},
    ingredients: ["Natural vulcanized rubber"],
    petTypes: ["Dog"],
    breedCompatibility: ["German Shepherd", "Golden Retriever"],
    ageCompatibility: ["Adult (1-7 yr)", "Senior (7+ yr)"],
    subscriptionSupported: false
  },
  {
    id: "prod-8",
    name: "Interactive Cat Feather Duster Toy",
    brand: "PetVerse",
    category: "Toys & Accessories",
    description: "Motion-activated feather wand to stimulate feline hunting instincts and active indoor play.",
    price: 12.49,
    discount: 10,
    rating: 4.5,
    reviews: [],
    stock: 15,
    images: ["https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=500&auto=format&fit=crop&q=80"],
    nutrition: {},
    ingredients: ["BPA-free plastic", "Natural bird feathers"],
    petTypes: ["Cat"],
    breedCompatibility: ["Persian", "All Cats"],
    ageCompatibility: ["Kitten (0-1 yr)", "Adult (1-10 yr)"],
    subscriptionSupported: false
  },

  // ── MEDICINE & CLINICAL ─────────────────────────────────────
  {
    id: "prod-9",
    name: "Heartgard Plus Chewables for Large Dogs (51-100 lbs)",
    brand: "Boehringer Ingelheim",
    category: "Medicine",
    description: "Monthly beef chewable to prevent heartworm disease and treat/control roundworms and hookworms.",
    price: 48.00,
    discount: 0,
    rating: 4.8,
    reviews: [],
    stock: 22,
    images: ["https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=80"],
    nutrition: {},
    ingredients: ["Ivermectin", "Pyrantel"],
    petTypes: ["Dog"],
    breedCompatibility: ["German Shepherd", "Golden Retriever"],
    ageCompatibility: ["Adult (1-7 yr)", "Senior (7+ yr)"],
    subscriptionSupported: true
  },
  {
    id: "prod-10",
    name: "Anotix Antibiotic Topical Ear Drops",
    brand: "VetCare Clinical",
    category: "Medicine",
    description: "Antibacterial and anti-fungal formula to treat Otitis Externa (ear canal infections). Prescription required.",
    price: 18.50,
    discount: 0,
    rating: 4.7,
    reviews: [],
    stock: 10,
    images: ["https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=500&auto=format&fit=crop&q=80"],
    nutrition: {},
    ingredients: ["Gentamicin", "Miconazole nitrate"],
    petTypes: ["Dog"],
    breedCompatibility: ["Golden Retriever", "All Dogs"],
    ageCompatibility: ["Adult (1-7 yr)", "Senior (7+ yr)"],
    subscriptionSupported: false
  }
];

// Storage helpers
export function getStoredProducts() {
  if (typeof window === "undefined") return mockProducts;
  const data = localStorage.getItem("petverse_shop_products");
  if (!data) {
    localStorage.setItem("petverse_shop_products", JSON.stringify(mockProducts));
    return mockProducts;
  }
  return JSON.parse(data);
}

export function getStoredCart() {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem("petverse_shop_cart");
  return data ? JSON.parse(data) : [];
}

export function saveStoredCart(cart) {
  if (typeof window !== "undefined") {
    localStorage.setItem("petverse_shop_cart", JSON.stringify(cart));
  }
}

export function getStoredWishlist() {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem("petverse_shop_wishlist");
  return data ? JSON.parse(data) : [];
}

export function saveStoredWishlist(wishlist) {
  if (typeof window !== "undefined") {
    localStorage.setItem("petverse_shop_wishlist", JSON.stringify(wishlist));
  }
}

export function getStoredOrders() {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem("petverse_shop_orders");
  return data ? JSON.parse(data) : [];
}

export function saveStoredOrders(orders) {
  if (typeof window !== "undefined") {
    localStorage.setItem("petverse_shop_orders", JSON.stringify(orders));
  }
}
