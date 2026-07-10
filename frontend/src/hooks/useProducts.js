import { useMemo, useState } from "react";
import { getStoredProducts } from "@/mock/products";
import { useAIContext } from "./useAIContext";

export function useProducts() {
  const { activePet, feeding, preferences } = useAIContext();
  const [products] = useState(() => getStoredProducts());

  // Filters state
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [maxPrice, setMaxPrice] = useState(150);
  const [minRating, setMinRating] = useState(0);

  // Compute AI Match Score for a product
  const getAIMatchScore = (product) => {
    if (!activePet) return 50;

    let score = 70; // Baseline score

    // 1. Species compatibility
    const speciesMatch = product.petTypes?.some(
      t => t.toLowerCase() === activePet.species?.toLowerCase()
    );
    if (!speciesMatch) return 0; // Not suitable for this species

    // 2. Breed compatibility
    const breedMatch = product.breedCompatibility?.some(
      b => b.toLowerCase() === activePet.breed?.toLowerCase() || b.toLowerCase() === "all" || b.toLowerCase().includes("all")
    );
    if (breedMatch) score += 15;

    // 3. Age compatibility
    // Check activePet's birthDate to compute age bracket
    const today = new Date();
    const birth = new Date(activePet.birthDate || today);
    const ageYears = today.getFullYear() - birth.getFullYear();

    const isPuppyKitten = ageYears < 1;
    const isSenior = ageYears >= 7;

    const ageBracket = isPuppyKitten
      ? (activePet.species === "Cat" ? "Kitten (0-1 yr)" : "Puppy (0-1 yr)")
      : isSenior
        ? (activePet.species === "Cat" ? "Senior (10+ yr)" : "Senior (7+ yr)")
        : (activePet.species === "Cat" ? "Adult (1-10 yr)" : "Adult (1-7 yr)");

    const ageMatch = product.ageCompatibility?.some(
      a => a.toLowerCase() === ageBracket.toLowerCase()
    );
    if (ageMatch) score += 10;

    // 4. Allergy safety checks
    const petAllergies = feeding?.allergies || "None";
    if (petAllergies !== "None") {
      const allergyKeywords = petAllergies.toLowerCase().split(/[,\s]+/);
      const containsAllergen = product.ingredients?.some(ing =>
        allergyKeywords.some(keyword => ing.toLowerCase().includes(keyword))
      );
      if (containsAllergen) {
        score -= 50; // Heavily penalize allergen products
      }
    }

    // Cap at 99
    return Math.max(0, Math.min(99, score));
  };

  // Filtered and AI Ranked products list
  const filteredProducts = useMemo(() => {
    return products
      .map(p => ({
        ...p,
        aiMatchScore: getAIMatchScore(p)
      }))
      .filter(p => {
        // Search filter
        if (searchTerm) {
          const lower = searchTerm.toLowerCase();
          const matchesText =
            p.name.toLowerCase().includes(lower) ||
            p.brand.toLowerCase().includes(lower) ||
            p.description.toLowerCase().includes(lower);
          if (!matchesText) return false;
        }

        // Category filter
        if (selectedCategory !== "all" && p.category !== selectedCategory) {
          return false;
        }

        // Price filter
        const finalPrice = p.discount ? p.price * (1 - p.discount / 100) : p.price;
        if (finalPrice > maxPrice) return false;

        // Rating filter
        if (p.rating < minRating) return false;

        return true;
      });
  }, [products, searchTerm, selectedCategory, maxPrice, minRating, activePet, feeding]);

  // AI Recommendations sorted highest score first
  const aiRecommendations = useMemo(() => {
    if (!activePet) return [];
    return products
      .map(p => ({
        ...p,
        aiMatchScore: getAIMatchScore(p)
      }))
      .filter(p => p.aiMatchScore >= 80) // High confidence matches only
      .sort((a, b) => b.aiMatchScore - a.aiMatchScore);
  }, [products, activePet, feeding]);

  return {
    products,
    filteredProducts,
    aiRecommendations,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    maxPrice,
    setMaxPrice,
    minRating,
    setMinRating,
    getAIMatchScore
  };
}
