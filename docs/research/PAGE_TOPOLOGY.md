# Page Topology — awthatssocute.com

## Stack
- Platform: Wix (original), rebuilt as Next.js 16 / App Router

## Section Order (top to bottom)

| # | Section | Component | Interaction |
|---|---------|-----------|-------------|
| 0 | Sticky nav | `Header.tsx` | Scroll-driven (bg appears at 40px) |
| 1 | Hero | `HeroSection.tsx` | Static |
| 2 | Shop | `ShopSection.tsx` | Click (add to cart) |
| 3 | Things to Know | `InfoSection.tsx` | Static |
| 4 | Contact | `ContactSection.tsx` | Click (form submit) |
| 5 | Footer | `Footer.tsx` | Static |

## Key Visual Properties
- **Background**: White with soft blue/periwinkle radial gradient blobs (matching background.jpg)
- **Crochet textures**: hero-1.jpg (pink), hero-2.jpg (blue), hero-3.jpg (purple/pink) used as decorative strips
- **Circular images**: decorative-1, 2, 5 shown as circular-cropped photos
- **Scribble circle**: decorative-4.png used as frame/highlight
- **Crochet hook**: decorative-3.png used as decorative illustration

## Colors (computed)
- Primary/pink: oklch(0.73 0.13 350) ≈ #e886aa
- Blue background blob: oklch(0.82 0.07 260) ≈ #a0b8e8
- Pink blob: oklch(0.88 0.06 350) ≈ #f5c5d5
- Text: oklch(0.20 0.01 15) ≈ #2a2826

## Fonts
- Headings: Playfair Display (Google Fonts)
- Body/UI: Nunito (Google Fonts)
