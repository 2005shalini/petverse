import { useState, useEffect, useCallback } from "react";
import { getStoredWishlist, saveStoredWishlist } from "@/mock/products";

export function useWishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    setWishlist(getStoredWishlist());
  }, []);

  const toggleWishlist = useCallback((product) => {
    setWishlist(prev => {
      const exists = prev.some(item => item.id === product.id);
      let updated;
      if (exists) {
        updated = prev.filter(item => item.id !== product.id);
      } else {
        updated = [...prev, product];
      }
      saveStoredWishlist(updated);
      return updated;
    });
  }, []);

  const isInWishlist = useCallback((productId) => {
    return wishlist.some(item => item.id === productId);
  }, [wishlist]);

  return {
    wishlist,
    toggleWishlist,
    isInWishlist
  };
}
