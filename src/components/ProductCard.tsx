"use client";

import Image from "next/image";
import { useState } from "react";
import { ShoppingCartIcon } from "./icons";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  function handleAdd() {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-border">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-[oklch(0.93_0.02_258)]">
        <Image
          src={product.image}
          alt={product.alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        {product.sold && (
          <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
            <span className="bg-foreground/80 text-white text-xs font-700 tracking-wider px-3 py-1.5 rounded-full">
              SOLD OUT
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 p-4">
        <h3
          className="font-heading text-base font-600 text-foreground leading-snug mb-1 line-clamp-2"
        >
          {product.name}
        </h3>
        <p className="text-primary font-700 text-base mt-auto pt-2">
          ${product.price.toFixed(2)}
        </p>

        <button
          onClick={handleAdd}
          disabled={product.sold}
          className={cn(
            "mt-3 flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-full text-xs font-700 tracking-wider transition-all duration-200",
            product.sold
              ? "bg-muted text-muted-foreground cursor-not-allowed"
              : added
              ? "bg-green-500 text-white"
              : "bg-primary text-white hover:opacity-90 hover:-translate-y-0.5"
          )}
          style={{ fontFamily: "var(--font-nunito), Nunito, sans-serif" }}
        >
          <ShoppingCartIcon className="w-3.5 h-3.5" />
          {added ? "ADDED!" : "ADD TO CART"}
        </button>
      </div>
    </div>
  );
}
