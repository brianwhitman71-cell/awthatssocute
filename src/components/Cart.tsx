"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { getZoneForState } from "@/lib/shipping-zones";

const US_STATES = [
  ["AL","Alabama"],["AK","Alaska"],["AZ","Arizona"],["AR","Arkansas"],
  ["CA","California"],["CO","Colorado"],["CT","Connecticut"],["DE","Delaware"],
  ["DC","D.C."],["FL","Florida"],["GA","Georgia"],["HI","Hawaii"],
  ["ID","Idaho"],["IL","Illinois"],["IN","Indiana"],["IA","Iowa"],
  ["KS","Kansas"],["KY","Kentucky"],["LA","Louisiana"],["ME","Maine"],
  ["MD","Maryland"],["MA","Massachusetts"],["MI","Michigan"],["MN","Minnesota"],
  ["MS","Mississippi"],["MO","Missouri"],["MT","Montana"],["NE","Nebraska"],
  ["NV","Nevada"],["NH","New Hampshire"],["NJ","New Jersey"],["NM","New Mexico"],
  ["NY","New York"],["NC","North Carolina"],["ND","North Dakota"],["OH","Ohio"],
  ["OK","Oklahoma"],["OR","Oregon"],["PA","Pennsylvania"],["RI","Rhode Island"],
  ["SC","South Carolina"],["SD","South Dakota"],["TN","Tennessee"],["TX","Texas"],
  ["UT","Utah"],["VT","Vermont"],["VA","Virginia"],["WA","Washington"],
  ["WV","West Virginia"],["WI","Wisconsin"],["WY","Wyoming"],
  ["PR","Puerto Rico"],["GU","Guam"],["VI","U.S. Virgin Islands"],
];

export default function Cart() {
  const { items, count, removeItem, clearCart, isOpen, closeCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedState, setSelectedState] = useState("");

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const zone = selectedState ? getZoneForState(selectedState) : null;
  const shippingCost = zone ? zone.amountCents / 100 : null;
  const grandTotal = subtotal + (shippingCost ?? 0);

  async function handleCheckout() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            id: i.id,
            name: i.name,
            price: i.price,
            quantity: i.quantity,
            image: i.image,
          })),
          stateCode: selectedState || null,
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError("Something went wrong. Please try again.");
        setLoading(false);
      }
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 z-[60] backdrop-blur-sm"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-sm bg-white z-[70] shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <h2 className="font-heading text-xl font-700 text-foreground">
            Your Cart {count > 0 && <span className="text-primary">({count})</span>}
          </h2>
          <button
            onClick={closeCart}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-muted transition-colors text-foreground/60 hover:text-foreground"
            aria-label="Close cart"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-3 text-foreground/50">
              <span className="text-4xl">🧶</span>
              <p className="text-sm" style={{ fontFamily: "var(--font-nunito), Nunito, sans-serif" }}>
                Your cart is empty
              </p>
            </div>
          ) : (
            <ul className="flex flex-col gap-4">
              {items.map((item) => (
                <li key={item.id} className="flex gap-4 items-start">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-muted flex-shrink-0 relative">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-600 text-foreground leading-snug line-clamp-2 font-heading">
                      {item.name}
                    </p>
                    <p className="text-primary font-700 text-sm mt-1">
                      ${(item.price * item.quantity).toFixed(2)}
                      {item.quantity > 1 && (
                        <span className="text-foreground/40 font-400 ml-1">×{item.quantity}</span>
                      )}
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-foreground/30 hover:text-foreground/60 transition-colors mt-0.5 flex-shrink-0"
                    aria-label={`Remove ${item.name}`}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-border space-y-3">

            {/* State picker */}
            <div className="flex items-center justify-between gap-3">
              <label
                htmlFor="ship-state"
                className="text-sm text-foreground/60 shrink-0"
                style={{ fontFamily: "var(--font-nunito), Nunito, sans-serif" }}
              >
                Ship to
              </label>
              <select
                id="ship-state"
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="flex-1 text-sm text-foreground border border-border rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                style={{ fontFamily: "var(--font-nunito), Nunito, sans-serif" }}
              >
                <option value="">Select state…</option>
                {US_STATES.map(([code, name]) => (
                  <option key={code} value={code}>{name}</option>
                ))}
              </select>
            </div>

            {/* Subtotal */}
            <div className="flex items-center justify-between">
              <span
                className="text-sm text-foreground/60"
                style={{ fontFamily: "var(--font-nunito), Nunito, sans-serif" }}
              >
                Subtotal
              </span>
              <span className="font-heading font-700 text-foreground">
                ${subtotal.toFixed(2)}
              </span>
            </div>

            {/* Shipping */}
            <div className="flex items-center justify-between">
              <span
                className="text-sm text-foreground/60"
                style={{ fontFamily: "var(--font-nunito), Nunito, sans-serif" }}
              >
                Shipping
                {zone && (
                  <span className="text-foreground/40 ml-1 text-xs">
                    ({zone.minDays}–{zone.maxDays} bus. days)
                  </span>
                )}
              </span>
              <span
                className="text-sm font-600"
                style={{ fontFamily: "var(--font-nunito), Nunito, sans-serif" }}
              >
                {shippingCost !== null
                  ? <span className="text-foreground">${shippingCost.toFixed(2)}</span>
                  : <span className="text-foreground/40 text-xs">select state</span>
                }
              </span>
            </div>

            {/* Georgia tax notice */}
            {selectedState === "GA" && (
              <div className="flex items-center justify-between">
                <span
                  className="text-sm text-foreground/60"
                  style={{ fontFamily: "var(--font-nunito), Nunito, sans-serif" }}
                >
                  Sales tax
                </span>
                <span
                  className="text-xs text-foreground/40"
                  style={{ fontFamily: "var(--font-nunito), Nunito, sans-serif" }}
                >
                  calculated at checkout
                </span>
              </div>
            )}

            {/* Divider + Grand total */}
            {shippingCost !== null && (
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <span
                  className="text-sm font-700 text-foreground"
                  style={{ fontFamily: "var(--font-nunito), Nunito, sans-serif" }}
                >
                  {selectedState === "GA" ? "Total (before tax)" : "Total"}
                </span>
                <span className="font-heading font-700 text-foreground text-lg">
                  ${grandTotal.toFixed(2)}
                </span>
              </div>
            )}

            {error && (
              <p className="text-red-500 text-xs text-center" style={{ fontFamily: "var(--font-nunito), Nunito, sans-serif" }}>
                {error}
              </p>
            )}

            <button
              onClick={handleCheckout}
              disabled={loading || !selectedState}
              className="w-full bg-primary text-white font-700 tracking-widest text-sm py-3.5 rounded-full hover:opacity-90 transition-all duration-200 hover:-translate-y-0.5 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0"
              style={{ fontFamily: "var(--font-nunito), Nunito, sans-serif" }}
            >
              {loading ? "REDIRECTING..." : !selectedState ? "SELECT STATE TO CHECKOUT" : "CHECKOUT"}
            </button>

            <button
              onClick={clearCart}
              className="w-full text-xs text-foreground/40 hover:text-foreground/60 transition-colors"
              style={{ fontFamily: "var(--font-nunito), Nunito, sans-serif" }}
            >
              Clear cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}
