import { useState, useEffect, useCallback } from "react";
import { getStoredCart, saveStoredCart, getStoredOrders, saveStoredOrders } from "@/mock/products";
import { publishEvent } from "@/utils/events";

export function useCart() {
  const [cart, setCart] = useState([]);
  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);

  useEffect(() => {
    setCart(getStoredCart());
  }, []);

  const addToCart = useCallback((product, quantity = 1, isSubscription = false) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id && item.isSubscription === isSubscription);
      let updated;
      if (existing) {
        updated = prev.map(item =>
          item.product.id === product.id && item.isSubscription === isSubscription
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        updated = [...prev, { product, quantity, isSubscription }];
      }
      saveStoredCart(updated);
      return updated;
    });
  }, []);

  const removeFromCart = useCallback((productId, isSubscription) => {
    setCart(prev => {
      const updated = prev.filter(item => !(item.product.id === productId && item.isSubscription === isSubscription));
      saveStoredCart(updated);
      return updated;
    });
  }, []);

  const updateQuantity = useCallback((productId, isSubscription, delta) => {
    setCart(prev => {
      const updated = prev.map(item => {
        if (item.product.id === productId && item.isSubscription === isSubscription) {
          const nextQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: nextQty };
        }
        return item;
      });
      saveStoredCart(updated);
      return updated;
    });
  }, []);

  const applyCoupon = useCallback((code) => {
    setPromoCode(code);
    if (code.toLowerCase() === "petverse10") {
      setDiscountPercent(10);
      return true;
    }
    if (code.toLowerCase() === "proactive20") {
      setDiscountPercent(20);
      return true;
    }
    setDiscountPercent(0);
    return false;
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    saveStoredCart([]);
    setPromoCode("");
    setDiscountPercent(0);
  }, []);

  const subtotal = cart.reduce((acc, item) => {
    const price = item.product.price;
    const finalPrice = item.product.discount
      ? price * (1 - item.product.discount / 100)
      : price;
    return acc + finalPrice * item.quantity;
  }, 0);

  const discountAmount = (subtotal * discountPercent) / 100;
  const shipping = subtotal > 49 ? 0 : 5.99;
  const total = subtotal - discountAmount + shipping;

  const checkoutOrder = useCallback((shippingDetails, paymentDetails) => {
    const orders = getStoredOrders();
    const newOrder = {
      id: `ord-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      items: cart,
      subtotal,
      discount: discountAmount,
      shipping,
      total,
      shippingDetails,
      paymentDetails,
      status: "Processing"
    };

    const updated = [newOrder, ...orders];
    saveStoredOrders(updated);

    publishEvent({
      type: "ORDER_SHIPPED",
      category: "shop",
      title: "Order Placed Successfully",
      description: `Your order #${newOrder.id} has been received and is now processing! Total: $${newOrder.total.toFixed(2)}.`,
      priority: "medium",
      action: "/shop/orders"
    });

    clearCart();
    return newOrder;
  }, [cart, subtotal, discountAmount, shipping, total, clearCart]);

  return {
    cart,
    promoCode,
    discountPercent,
    discountAmount,
    subtotal,
    shipping,
    total,
    addToCart,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    clearCart,
    checkoutOrder
  };
}
