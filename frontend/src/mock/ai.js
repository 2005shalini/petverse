// ─────────────────────────────────────────────────────────────
// PetVerse AI Mock Data — Single Source of Truth
// ─────────────────────────────────────────────────────────────

// ── SUGGESTED PROMPTS ────────────────────────────────────────
export const suggestedPrompts = {
  general: [
    "Give me a full health summary for my pet",
    "Are my vaccinations up to date?",
    "What should I feed my pet today?",
    "Analyze my pet's weight trend",
    "What are common health risks for my pet's breed?",
    "Suggest the best supplements for my pet"
  ],
  health: [
    "Explain my pet's last diagnosis",
    "Is my pet's heart rate normal?",
    "What does body condition score 5 mean?",
    "When is my next vet appointment?",
    "Should I be worried about the weight gain?",
    "What are signs of ear infection in dogs?"
  ],
  nutrition: [
    "How many calories should my pet eat daily?",
    "Can my dog eat raw salmon?",
    "What treats are safe for my cat?",
    "Suggest a meal schedule for my pet",
    "What foods should I avoid giving my dog?",
    "Is my pet's portion size correct?"
  ],
  breed: [
    "What are common Golden Retriever health issues?",
    "How much exercise does a German Shepherd need?",
    "What is the life expectancy of a Persian cat?",
    "What's the ideal weight for my breed?",
    "Are there breed-specific vaccination needs?",
    "How do I groom a Persian cat properly?"
  ]
};

// ── BREED KNOWLEDGE BASE ──────────────────────────────────────
export const breedKnowledge = {
  "Golden Retriever": {
    origin: "Scotland, 19th century",
    lifeExpectancy: "10–12 years",
    size: "Large (25–34 kg)",
    temperament: ["Friendly", "Reliable", "Trustworthy", "Kindly", "Confident"],
    commonDiseases: [
      { name: "Hip Dysplasia", risk: "High", description: "Malformation of the hip joint — common in large breeds. Regular X-rays from age 2 recommended." },
      { name: "Cancer", risk: "High", description: "Golden Retrievers have a 60% lifetime cancer rate — one of the highest of all breeds. Regular screening is essential." },
      { name: "Skin Allergies", risk: "Medium", description: "Prone to environmental and food allergies. Omega-3 supplementation helps." },
      { name: "Ear Infections", risk: "High", description: "Floppy ears trap moisture. Clean weekly and dry after swimming." },
      { name: "Hypothyroidism", risk: "Medium", description: "Thyroid issues can cause weight gain and lethargy. Annual blood tests recommended." }
    ],
    exercise: {
      daily: "60–90 minutes",
      type: ["Running", "Swimming", "Fetch", "Agility Training"],
      notes: "High energy breed — insufficient exercise leads to destructive behavior. Mental stimulation is equally important."
    },
    diet: {
      calorieRange: "1,300–1,700 kcal/day (adult)",
      proteinMin: "22%",
      fatMin: "8%",
      avoidFoods: ["Chocolate", "Grapes", "Raisins", "Onions", "Xylitol", "Macadamia nuts"],
      recommendedFoods: ["Lean chicken", "Brown rice", "Sweet potato", "Broccoli", "Blueberries"],
      supplements: ["Omega-3 Fish Oil", "Glucosamine", "Chondroitin", "Probiotics"]
    },
    grooming: {
      brushingFrequency: "3–4 times per week",
      bathingFrequency: "Every 6–8 weeks",
      shedding: "Heavy — especially spring and fall",
      notes: "Double coat requires consistent grooming. Professional grooming every 6–8 weeks recommended."
    },
    training: "Highly trainable and eager to please. Responds best to positive reinforcement. Excels in obedience, agility, and therapy work.",
    socialNeeds: "Very social — needs consistent human interaction. Not suited for isolation. Great with children and other pets."
  },
  "German Shepherd": {
    origin: "Germany, 1899",
    lifeExpectancy: "9–13 years",
    size: "Large (22–40 kg)",
    temperament: ["Intelligent", "Loyal", "Protective", "Confident", "Courageous"],
    commonDiseases: [
      { name: "Hip & Elbow Dysplasia", risk: "Very High", description: "Primary health concern. OFA screening before breeding. Keep weight optimal." },
      { name: "Degenerative Myelopathy", risk: "High", description: "Progressive spinal cord disease. Genetic test available." },
      { name: "Bloat (GDV)", risk: "High", description: "Life-threatening stomach twisting. Slow feeder bowls and rest after meals mandatory." },
      { name: "Exocrine Pancreatic Insufficiency", risk: "Medium", description: "Digestive enzyme deficiency. Treatable with enzyme supplements." },
      { name: "Panosteitis", risk: "Medium", description: "Bone inflammation in growing puppies — causes limping." }
    ],
    exercise: {
      daily: "90–120 minutes",
      type: ["Running", "Tracking", "Schutzhund", "Obedience", "Agility"],
      notes: "Working breed requiring intense daily exercise and mental stimulation. Under-stimulation leads to anxiety and destructive behavior."
    },
    diet: {
      calorieRange: "1,700–2,100 kcal/day (active adult)",
      proteinMin: "25%",
      fatMin: "10%",
      avoidFoods: ["Chocolate", "Onions", "Garlic", "Avocado", "Raw yeast dough"],
      recommendedFoods: ["Beef", "Chicken", "Fish", "Brown rice", "Carrots", "Kale"],
      supplements: ["Omega-3", "Glucosamine", "Probiotics", "Joint support"]
    },
    grooming: {
      brushingFrequency: "Daily",
      bathingFrequency: "Every 4–6 weeks",
      shedding: "Year-round — very heavy shedder",
      notes: "Dense double coat requires daily brushing. De-shedding tools recommended."
    },
    training: "Among the most trainable breeds. Used in military and police roles. Requires experienced handling and consistent leadership.",
    socialNeeds: "Loyal to family but reserved with strangers. Needs early socialization. Strong prey drive."
  },
  "Persian": {
    origin: "Persia (Iran), 17th century",
    lifeExpectancy: "12–17 years",
    size: "Medium (3.5–6 kg)",
    temperament: ["Calm", "Gentle", "Quiet", "Affectionate", "Docile"],
    commonDiseases: [
      { name: "Polycystic Kidney Disease (PKD)", risk: "Very High", description: "Genetic cysts on kidneys. DNA test available — responsible breeders test all breeding cats." },
      { name: "Brachycephalic Syndrome", risk: "High", description: "Flat face causes breathing difficulties, eye problems, and dental crowding." },
      { name: "Hypertrophic Cardiomyopathy (HCM)", risk: "High", description: "Heart muscle thickening. Annual echocardiogram recommended after age 5." },
      { name: "Dental Malocclusion", risk: "Medium", description: "Flat face causes misaligned teeth. Regular dental scaling needed." },
      { name: "Dermatophytosis (Ringworm)", risk: "Medium", description: "Fungal skin infection. Long coat provides shelter for fungi." }
    ],
    exercise: {
      daily: "20–30 minutes",
      type: ["Indoor play", "Feather toys", "Laser pointer", "Gentle fetch"],
      notes: "Low-energy breed. Short play sessions sufficient. Not suited for outdoor unsupervised activity."
    },
    diet: {
      calorieRange: "200–300 kcal/day (adult)",
      proteinMin: "26%",
      fatMin: "9%",
      avoidFoods: ["Onions", "Garlic", "Grapes", "Raisins", "Chocolate", "Caffeine"],
      recommendedFoods: ["Tuna", "Chicken", "Turkey", "Pumpkin", "Sardines"],
      supplements: ["Omega-3 for coat", "Hairball control", "Taurine"]
    },
    grooming: {
      brushingFrequency: "Daily",
      bathingFrequency: "Every 4–6 weeks",
      shedding: "Heavy year-round",
      notes: "Long silky coat mats easily. Daily brushing non-negotiable. Professional grooming monthly. Eye cleaning daily to prevent staining."
    },
    training: "Intelligent but independent. Responds to gentle training. Not easily motivated by food. Routine is very important.",
    socialNeeds: "Prefers calm environments. Bonds closely with one person. Does not tolerate loud noise or rough handling."
  }
};

// ── NUTRITION TABLES ──────────────────────────────────────────
export const nutritionData = {
  "Golden Retriever": {
    ageGroups: [
      { age: "Puppy (0–1 yr)", calories: "1,600–2,200 kcal", protein: "28%", fat: "17%", meals: 3, portionKg: "Active 2 cups / Calm 1.5 cups" },
      { age: "Adult (1–7 yr)", calories: "1,300–1,700 kcal", protein: "22%", fat: "12%", meals: 2, portionKg: "Active 3 cups / Calm 2 cups" },
      { age: "Senior (7+ yr)", calories: "1,100–1,400 kcal", protein: "20%", fat: "10%", meals: 2, portionKg: "Active 2 cups / Calm 1.5 cups" }
    ],
    waterIntake: "1–1.5 L/day minimum",
    treatCalorieLimit: "10% of daily intake",
    idealFoods: ["Royal Canin Golden Retriever", "Hill's Science Diet Large Breed", "Purina Pro Plan Large Breed"],
    mealSchedule: [
      { time: "08:00 AM", meal: "Breakfast", portion: "50% of daily", notes: "Add joint supplement" },
      { time: "07:00 PM", meal: "Dinner", portion: "50% of daily", notes: "No exercise for 1 hr after" }
    ]
  },
  "German Shepherd": {
    ageGroups: [
      { age: "Puppy (0–1 yr)", calories: "1,800–2,400 kcal", protein: "30%", fat: "20%", meals: 3, portionKg: "Active 2.5 cups / Calm 2 cups" },
      { age: "Adult (1–7 yr)", calories: "1,700–2,100 kcal", protein: "25%", fat: "14%", meals: 2, portionKg: "Active 3.5 cups / Calm 2.5 cups" },
      { age: "Senior (7+ yr)", calories: "1,400–1,700 kcal", protein: "22%", fat: "11%", meals: 2, portionKg: "Active 2.5 cups / Calm 2 cups" }
    ],
    waterIntake: "1.5–2 L/day minimum",
    treatCalorieLimit: "10% of daily intake",
    idealFoods: ["Orijen Large Breed", "Royal Canin German Shepherd", "Taste of the Wild Sierra Mountain"],
    mealSchedule: [
      { time: "07:00 AM", meal: "Breakfast", portion: "50% of daily", notes: "Use slow feeder — GDV risk" },
      { time: "06:00 PM", meal: "Dinner", portion: "50% of daily", notes: "Rest 90 min before/after" }
    ]
  },
  "Persian": {
    ageGroups: [
      { age: "Kitten (0–1 yr)", calories: "250–350 kcal", protein: "30%", fat: "18%", meals: 4, portionKg: "3–4 tbsp wet per meal" },
      { age: "Adult (1–10 yr)", calories: "200–280 kcal", protein: "26%", fat: "14%", meals: 3, portionKg: "1 pouch (85g) per meal" },
      { age: "Senior (10+ yr)", calories: "180–240 kcal", protein: "28%", fat: "12%", meals: 3, portionKg: "0.8 pouch per meal" }
    ],
    waterIntake: "200–250 mL/day",
    treatCalorieLimit: "10% of daily intake",
    idealFoods: ["Royal Canin Persian", "Hill's Science Diet Adult Cat", "Purina One Sensitive Skin & Stomach"],
    mealSchedule: [
      { time: "08:00 AM", meal: "Breakfast", portion: "35% of daily", notes: "Room temperature preferred" },
      { time: "01:00 PM", meal: "Midday", portion: "30% of daily", notes: "Fresh food each time" },
      { time: "07:00 PM", meal: "Dinner", portion: "35% of daily", notes: "Water should be refreshed" }
    ]
  }
};

// ── AI RESPONSE TEMPLATES (Simulated) ────────────────────────
export const aiResponseTemplates = {
  healthSummary: (pet, latestRecord) => {
    const score = pet.healthScore || latestRecord?.healthScore || 90;
    const level = score >= 85 ? "Excellent" : score >= 70 ? "Good" : score >= 50 ? "Fair" : "Needs Attention";
    return `## Health Summary for ${pet.name}

**Overall Health Index: ${score}/100 — ${level}**

Based on the latest clinical records dated ${latestRecord?.visitDate ? new Date(latestRecord.visitDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "on file"}, here is my analysis:

### Vital Signs Assessment
- **Body Temperature**: ${latestRecord?.temperature || "38.4"} °C — *Normal range*
- **Heart Rate**: ${latestRecord?.heartRate || "92"} bpm — *Normal for breed*
- **Respiratory Rate**: ${latestRecord?.respiratoryRate || "18"} rpm — *Normal*
- **Body Condition Score**: ${latestRecord?.bodyCondition || "5"}/9 — *Ideal*

### Current Status
${score >= 85
  ? `✅ ${pet.name} is in **excellent health condition**. All vital parameters are within normal range. Continue current diet and exercise routine.`
  : `⚠️ ${pet.name} has some areas that need attention. I recommend scheduling a follow-up consultation with your veterinarian.`
}

### Primary Concern
${latestRecord?.diagnosis || "No acute conditions identified"}

---
*This analysis is based on ${pet.name}'s health records. Always consult your veterinarian for medical decisions.*`;
  },

  vaccinationStatus: (pet, vaccinations) => {
    const overdue = vaccinations.filter(v => v.status === "Overdue" || v.status === "Vaccination Due");
    const completed = vaccinations.filter(v => v.status === "Completed");
    return `## Vaccination Status for ${pet.name}

**Compliance Score: ${vaccinations.length > 0 ? Math.round((completed.length / vaccinations.length) * 100) : 100}%**

### Summary
- ✅ **Completed**: ${completed.length} vaccine${completed.length !== 1 ? "s" : ""}
- ${overdue.length > 0 ? "⚠️" : "✅"} **Overdue/Due**: ${overdue.length} vaccine${overdue.length !== 1 ? "s" : ""}

${overdue.length > 0 ? `### Action Required
The following vaccines need attention:
${overdue.map(v => `- **${v.name}** — Due ${v.dateDue ? new Date(v.dateDue).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "soon"}`).join("\n")}

I recommend booking an appointment within the next 2 weeks.` : `### All Vaccines Current
${pet.name}'s immunization schedule is fully up to date. Next review in 12 months.`}

---
*Vaccination reminders with PetVerse Pro will alert you 30 days before each due date.*`;
  },

  nutritionAdvice: (pet, nutritionInfo) => {
    if (!nutritionInfo) return `I don't have specific nutrition data for ${pet.breed} yet. Please consult your veterinarian for a personalized diet plan.`;
    const adultGroup = nutritionInfo.ageGroups[1];
    return `## Nutrition Plan for ${pet.name}

**Breed**: ${pet.breed} | **Current Weight**: ${pet.weight} kg

### Daily Calorie Target
**${adultGroup.calories}** — based on breed standard and activity level

### Macronutrient Targets
- **Protein (min)**: ${adultGroup.protein}
- **Fat (min)**: ${adultGroup.fat}

### Recommended Meal Schedule
${nutritionInfo.mealSchedule.map(m => `**${m.time} — ${m.meal}** (${m.portion})\n*${m.notes}*`).join("\n\n")}

### Water Intake
Minimum **${nutritionInfo.waterIntake}** per day. Always ensure fresh water is available.

### Recommended Brands
${nutritionInfo.idealFoods.map(f => `- ${f}`).join("\n")}

### Foods to Avoid
See the Breed Expert section for a comprehensive avoid list.

---
*Adjust portions based on activity level and veterinarian guidance.*`;
  },

  weightAnalysis: (pet, weightHistory) => {
    if (!weightHistory || weightHistory.length < 2) {
      return `## Weight Analysis for ${pet.name}\n\nCurrent weight: **${pet.weight} kg**\n\nNot enough historical data for trend analysis. Log weekly weights for AI insights.\n\n*Tip: Use the Weight Tracker to build a complete growth curve.*`;
    }
    const current = weightHistory[weightHistory.length - 1];
    const previous = weightHistory[weightHistory.length - 2];
    const delta = (current.weight - previous.weight).toFixed(1);
    const trend = delta > 0 ? "increased" : delta < 0 ? "decreased" : "stable";
    return `## Weight Analysis for ${pet.name}

**Current Weight: ${current.weight} kg**

### Trend Analysis
Weight has **${trend}** by **${Math.abs(delta)} kg** since the last measurement.

${Math.abs(delta) > 2 ? `⚠️ **Notable change detected.** A ${Math.abs(delta)} kg shift is significant. Consider reviewing diet and exercise.` : `✅ Weight is within normal fluctuation range.`}

### Historical Data
${weightHistory.slice(-4).map((w, i) => `- **${new Date(w.date).toLocaleDateString("en-US", { month: "short", year: "2-digit" })}**: ${w.weight} kg`).join("\n")}

### Recommendation
${delta > 1.5 ? "Consider reducing portion size by 10-15% and increasing daily exercise by 15 minutes." : delta < -1.5 ? "Consider increasing portion size slightly. Consult vet if weight loss persists." : "Current weight management is optimal. Maintain current routine."}

---
*AI Growth Prediction with breed-specific curves available in PetVerse Pro.*`;
  },

  generic: (question, petName) => {
    return `## Response for "${question}"

I've analyzed ${petName}'s profile to answer your question.

Based on the health records, vaccination history, and current medications on file, here's my assessment:

This query relates to **${petName}'s** overall wellness profile. For the most accurate personalized guidance, I recommend:

1. **Review the Health Dashboard** — Complete clinical overview
2. **Check the Vaccination Center** — Immunization compliance
3. **Visit the Nutrition Advisor** — Personalized meal planning
4. **Schedule a vet consultation** — Professional medical advice

### General Guidance
For any health concern, the rule of thumb is: *when in doubt, consult your veterinarian.* PetVerse AI provides intelligent guidance but does not replace professional veterinary care.

---
*Full conversational AI with real-time analysis unlocks with PetVerse Pro.*`;
  }
};

// ── INITIAL CONVERSATIONS ─────────────────────────────────────
export const initialConversations = [
  {
    id: "conv-1",
    title: "Luna's Health Summary",
    petId: "pet-1",
    petName: "Luna",
    lastMessage: "Luna is in excellent health condition with a score of 94/100...",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    messages: []
  },
  {
    id: "conv-2",
    title: "Milo's Vaccination Status",
    petId: "pet-2",
    petName: "Milo",
    lastMessage: "Milo has 2 overdue vaccinations that need attention...",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    messages: []
  },
  {
    id: "conv-3",
    title: "Rocky's Nutrition Plan",
    petId: "pet-3",
    petName: "Rocky",
    lastMessage: "Based on Rocky's weight and activity level, I recommend...",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    messages: []
  }
];

// ── AI QUICK ACTIONS ──────────────────────────────────────────
export const aiQuickActions = [
  { id: "health-summary", label: "Health Summary", icon: "HeartPulse", color: "emerald", description: "Full clinical overview" },
  { id: "vaccinations", label: "Vaccination Status", icon: "Shield", color: "teal", description: "Compliance & due dates" },
  { id: "nutrition", label: "Nutrition Plan", icon: "UtensilsCrossed", color: "amber", description: "Calories & meal schedule" },
  { id: "weight-analysis", label: "Weight Analysis", icon: "TrendingUp", color: "cyan", description: "Trend & recommendation" },
  { id: "breed-info", label: "Breed Expert", icon: "PawPrint", color: "violet", description: "Breed-specific guidance" },
  { id: "next-steps", label: "Next Best Actions", icon: "Sparkles", color: "indigo", description: "AI-powered care plan" }
];

// Storage helpers
export function getStoredConversations() {
  if (typeof window === "undefined") return initialConversations;
  const data = localStorage.getItem("petverse_ai_conversations");
  if (!data) {
    localStorage.setItem("petverse_ai_conversations", JSON.stringify(initialConversations));
    return initialConversations;
  }
  return JSON.parse(data);
}

export function saveStoredConversations(conversations) {
  if (typeof window !== "undefined") {
    localStorage.setItem("petverse_ai_conversations", JSON.stringify(conversations));
  }
}
