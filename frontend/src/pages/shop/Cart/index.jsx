import React from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, ChevronLeft, Calendar } from "lucide-react";
import DashboardLayout from "@/components/dashboard/layout";
import { useCart } from "@/hooks/useCart";

// Components
import CartItem from "@/components/shop/cart/CartItem";
import OrderSummary from "@/components/shop/cart/OrderSummary";
import CouponBox from "@/components/shop/cart/CouponBox";

export default function CartView() {
  const {
    cart,
    promoCode,
    discountAmount,
    subtotal,
    shipping,
    total,
    removeFromCart,
    updateQuantity,
    applyCoupon
  } = useCart();

  return (
    <DashboardLayout
      pageTitle="Shopping Cart"
      pageDescription="Review chosen products, subscriptions, and apply coupons."
    >
      <div className="space-y-6">
        {/* Back Link */}
        <Link to="/shop" className="inline-flex items-center gap-1 text-xs font-black text-slate-500 hover:text-slate-700 transition">
          <ChevronLeft size={16} />
          <span>Back to shop</span>
        </Link>

        {cart.length > 0 ? (
          <div className="grid gap-6 lg:grid-cols-12">
            {/* Left panel: List items */}
            <div className="lg:col-span-8 space-y-4">
              <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <h3 className="text-lg font-black text-slate-800 tracking-tight">Shopping Bag Items</h3>
                <div className="space-y-3">
                  {cart.map((item, i) => (
                    <CartItem
                      key={`${item.product.id}-${item.isSubscription}-${i}`}
                      item={item}
                      onUpdateQuantity={updateQuantity}
                      onRemove={removeFromCart}
                    />
                  ))}
                </div>
              </div>

              {/* Promo box */}
              <CouponBox onApply={applyCoupon} currentCode={promoCode} />
            </div>

            {/* Right panel: Summary */}
            <div className="lg:col-span-4 space-y-5">
              <OrderSummary
                subtotal={subtotal}
                discount={discountAmount}
                shipping={shipping}
                total={total}
              />
            </div>
          </div>
        ) : (
          <div className="rounded-[30px] border border-dashed border-slate-200 p-20 text-center bg-white">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-100 mx-auto mb-4">
              <ShoppingBag className="text-slate-300" size={28} />
            </div>
            <h3 className="text-lg font-black text-slate-700">Your cart is empty</h3>
            <p className="text-sm font-semibold text-slate-400 mt-1">
              Add premium food, vitamins, or toys recommended for your pets.
            </p>
            <Link
              to="/shop"
              className="mt-6 inline-flex items-center justify-center rounded-2xl bg-slate-900 px-6 py-3 text-xs font-bold text-white hover:bg-slate-800 transition"
            >
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
