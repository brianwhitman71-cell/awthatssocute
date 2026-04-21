"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { InstagramIcon, MenuIcon, XIcon, ShoppingCartIcon } from "./icons";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

const navItems = [
  { label: "HOME", href: "#home" },
  { label: "SHOP", href: "#shop" },
  { label: "CREATIONS", href: "#creations" },
  { label: "CONTACT", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { count, openCart } = useCart();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-pink-100"
          : "bg-white/80 backdrop-blur-sm"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-center h-16 lg:h-20 relative">
          {/* Desktop nav — centered */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-xs font-700 tracking-widest text-foreground/70 hover:text-primary transition-colors duration-200"
                style={{ fontFamily: "var(--font-nunito), Nunito, sans-serif" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Cart + Instagram + mobile toggle — pinned right */}
          <div className="absolute right-0 flex items-center gap-4">
            {/* Cart button */}
            <button
              onClick={openCart}
              className="relative text-foreground/60 hover:text-primary transition-colors duration-200"
              aria-label={`Open cart, ${count} items`}
            >
              <ShoppingCartIcon className="w-5 h-5" />
              {count > 0 && (
                <span className="absolute -top-2 -right-2 w-4.5 h-4.5 min-w-[1.1rem] bg-primary text-white text-[10px] font-700 rounded-full flex items-center justify-center leading-none px-1">
                  {count}
                </span>
              )}
            </button>

            <a
              href="https://www.instagram.com/aw.thatssocute/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/60 hover:text-primary transition-colors duration-200"
              aria-label="Instagram"
            >
              <InstagramIcon className="w-5 h-5" />
            </a>
            <button
              className="md:hidden text-foreground/70 hover:text-primary transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <XIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white/98 border-t border-pink-100 px-6 py-4">
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-700 tracking-widest text-foreground/70 hover:text-primary transition-colors"
                onClick={() => setMobileOpen(false)}
                style={{ fontFamily: "var(--font-nunito), Nunito, sans-serif" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
