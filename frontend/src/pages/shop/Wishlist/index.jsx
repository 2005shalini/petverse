import React from "react";
import { Link } from "react-router-dom";
import { Heart, ChevronLeft, ShoppingBag } from "lucide-react";
import DashboardLayout from "@/components/dashboard/layout";
import { useWishlist } from "@/hooks/useWishlist";
import { useCart } from "@/hooks/useCart";
import ProductCard from "@/components/shop/cards/ProductCard";

export default function WishlistView() {
  const { wishlist, toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <DashboardLayout
      pageTitle="Saved Items"
      pageDescription="Manage your wishlist and add items directly to your shopping cart."
    >
      <div className="space-y-6">
        {/* Back Link */}
        <Link to="/shop" className="inline-flex items-center gap-1 text-xs font-black text-slate-500 hover:text-slate-700 transition">
          <ChevronLeft size={16} />
          <span>Back to shop</span>
        </Link>

        {wishlist.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {wishlist.map((prod) => (
              <div key={prod.id}>
                <ProductCard
                  product={prod}
                  isWishlisted={isInWishlist(prod.id)}
                  onWishlistToggle={toggleWishlist}
                  onAddToCart={(p) => addToCart(p, 1)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-[30px] border border-dashed border-slate-200 p-20 text-center bg-white">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-100 mx-auto mb-4">
              <Heart className="text-slate-300" size={28} />
            </div>
            <h3 className="text-lg font-black text-slate-700">Your wishlist is empty</h3>
            <p className="text-sm font-semibold text-slate-400 mt-1">
              Tap the heart icon on any product card to save items here.
            </p>
            <Link
              to="/shop"
              className="mt-6 inline-flex items-center justify-center rounded-2xl bg-slate-900 px-6 py-3 text-xs font-bold text-white hover:bg-slate-800 transition"
            >
              Explore Shop
            </Link>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
