import { InstagramIcon } from "./icons";

export default function Footer() {
  return (
    <footer className="relative py-10 px-6 border-t border-border mt-auto overflow-hidden">
      {/* Subtle pink tint */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background:
            "linear-gradient(to right, oklch(0.97 0.02 350) 0%, white 50%, oklch(0.97 0.03 258) 100%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="font-heading text-lg font-700 text-foreground">
            <span className="text-primary">AW</span> That&apos;s So Cute
          </span>
          <p
            className="text-xs text-foreground/50"
            style={{ fontFamily: "var(--font-nunito), Nunito, sans-serif" }}
          >
            Handmade Crochet Amigurumi · Atlanta, GA
          </p>
        </div>

        {/* Nav links */}
        <nav className="flex items-center gap-6">
          {["HOME", "SHOP", "CREATIONS", "CONTACT"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-xs font-700 tracking-widest text-foreground/50 hover:text-primary transition-colors"
              style={{ fontFamily: "var(--font-nunito), Nunito, sans-serif" }}
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Social */}
        <div className="flex items-center gap-3">
          <a
            href="https://www.instagram.com/aw.thatssocute/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-200"
            aria-label="Instagram"
          >
            <InstagramIcon className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="relative z-10 text-center mt-6">
        <p
          className="text-xs text-foreground/40"
          style={{ fontFamily: "var(--font-nunito), Nunito, sans-serif" }}
        >
          ©2024 by AW That&apos;s So Cute
        </p>
      </div>
    </footer>
  );
}
