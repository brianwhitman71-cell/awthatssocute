# AW That's So Cute — Site Reference

## Overview

A single-page e-commerce website for **Alexis Whitman's** handmade crochet amigurumi business, based in Atlanta, GA. The site is built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, and deployed to Netlify. It replaces the original Wix-hosted site at **awthatssocute.com**.

---

## Site Sections (top to bottom)

### 1. Banner
An animated yarn-texture banner that slowly crossfades between three yarn texture images while cycling through pastel color tints (lavender → mauve → periwinkle). "Aw 🧶 That's So Cute" is displayed in Dancing Script font. Locks to the top of the page on scroll along with the navigation.

### 2. Navigation (Header)
Sticky navigation with links to each section: Home, Shop, Creations, Contact. Includes an Instagram link and a shopping cart icon with a live item count badge. On mobile, collapses to a hamburger menu.

### 3. Hero Section
Introduces Alexis with "Creations by Alexis Whitman" heading and two CTA buttons: Shop Now and Custom Order. Below the text, three decorative circular images showcase colorful yarns, veggie amigurumi friends, and an Emotional Support Dumpster Fire creation.

### 4. Shop Section
A product grid showing 12 available items — holiday crochet trees ($30) and ornaments ($15–$25). Each product card has an image, name, price, and Add to Cart button. Sold-out items are marked with a SOLD OUT overlay. A "Request a Custom Order" link at the bottom scrolls to the Contact section.

### 5. Things to Know (Info Section)
Three informational cards explaining: What is Amigurumi, 100% Homemade, and Custom Orders Welcome. Displayed alongside decorative circular product images.

### 6. Contact Section
A contact form where customers can submit their name, email, message, and an optional reference photo for custom order requests. On submit, two emails are sent (see API integrations below). Also shows Alexis's email address, location (Atlanta, GA), and Instagram handle.

### 7. Footer
Brand name, section links, Instagram icon, and copyright.

---

## User Flows

### Shopping Flow
1. Customer browses products in the Shop section
2. Clicks **Add to Cart** — item is added to cart state and the cart drawer slides open automatically
3. Cart drawer shows item image, name, price, quantity, and subtotal
4. Customer clicks **Checkout** → POST request to `/api/checkout`
5. Server creates a Stripe Checkout session and returns a redirect URL
6. Customer is sent to Stripe's hosted checkout page where they:
   - Enter shipping address (US only)
   - Choose Standard ($5.99, 5–10 days) or Priority ($12.99, 2–4 days) shipping
   - Enter payment details
7. On success → redirected to `/success` page ("Order Confirmed")
8. On cancel → redirected to `/cancel` page ("Order Cancelled")

### Custom Order / Contact Flow
1. Customer scrolls to Contact section or clicks "Custom Order" / "Request a Custom Order"
2. Fills in first name, last name, email, message
3. Optionally uploads a reference photo (JPG, PNG, GIF up to 10MB) — a preview is shown in the form
4. Clicks **Send** → POST request to `/api/contact`
5. Two emails are sent via Resend:
   - **To Alexis** (`awthatssocutecrafts@gmail.com`): customer name, email (as reply-to), message, and reference photo attached
   - **To the customer**: confirmation email with their message text and reference photo attached
6. Form shows "Message Sent!" confirmation

---

## External APIs & Services

### Stripe
- **Purpose:** Payment processing
- **Integration:** Server-side via `stripe` npm package
- **API Route:** `POST /api/checkout`
- **Flow:** Creates a Stripe Checkout session with line items, shipping options, and a US shipping address collection form. Customer is redirected to Stripe's hosted payment page.
- **Keys:** `STRIPE_SECRET_KEY` (server-side), `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (client-side) — stored in `.env.local`
- **Dashboard:** dashboard.stripe.com (currently in Sandbox/test mode)
- **Test card:** 4242 4242 4242 4242, any future expiry, any CVC

### Resend
- **Purpose:** Transactional email (contact form submissions)
- **Integration:** Server-side via `resend` npm package
- **API Route:** `POST /api/contact`
- **Flow:** Sends two emails on every contact form submission — one to Alexis with customer details and reference photo, one to the customer as a confirmation
- **Key:** `RESEND_API_KEY` — stored in `.env.local`
- **Dashboard:** resend.com
- **Current limitation:** Free tier only sends to verified addresses until a domain is verified. In production, a domain (`awthatssocute.com`) must be verified in Resend for emails to reach real customers.

---

## Environment Variables

Stored in `.env.local` (never committed to git):

| Variable | Purpose |
|---|---|
| `STRIPE_SECRET_KEY` | Stripe server-side API key |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe client-side key |
| `RESEND_API_KEY` | Resend email API key |
| `CONTACT_EMAIL` | Override email recipient (used for testing) |

When deploying to Netlify, these must be added under **Site Settings → Environment Variables**.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, React 19) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v4 with oklch design tokens |
| UI Primitives | shadcn/ui (Radix) |
| Payments | Stripe Checkout |
| Email | Resend |
| Hosting | Netlify |
| Domain | awthatssocute.com (currently registered via Wix) |

---

## Deployment

- **Platform:** Netlify
- **Deploy command:** `npm run deploy` (or `netlify deploy --prod --dir=.next`)
- **Domain:** awthatssocute.com — DNS needs to be pointed from Wix to Netlify nameservers
- **Production steps before going live:**
  1. Add all environment variables in Netlify dashboard
  2. Verify `awthatssocute.com` domain in Resend for email sending
  3. Switch `.env.local` to live Stripe keys
  4. Enable Stripe Tax in Stripe dashboard
  5. Point DNS from Wix to Netlify

---

## Key Files

```
src/
  app/
    page.tsx                  # Main page, CartProvider wraps everything
    api/
      checkout/route.ts       # Stripe Checkout session creation
      contact/route.ts        # Contact form email handler
    success/page.tsx          # Post-payment success page
    cancel/page.tsx           # Post-payment cancel page
  components/
    HeroBanner.tsx            # Animated yarn texture banner
    Header.tsx                # Sticky nav with cart icon
    HeroSection.tsx           # Hero text + decorative images
    ShopSection.tsx           # Product grid (hardcoded products)
    ProductCard.tsx           # Individual product card with Add to Cart
    Cart.tsx                  # Cart drawer with checkout button
    InfoSection.tsx           # Things to Know cards
    ContactSection.tsx        # Contact form with image upload
    Footer.tsx                # Footer
  context/
    CartContext.tsx            # Cart state (add/remove/clear, open/close drawer)
  lib/
    stripe.ts                 # Stripe client instance
```

---

## Contact & Social

- **Email:** awthatssocutecrafts@gmail.com
- **Instagram:** @aw.thatssocute (instagram.com/aw.thatssocute)
- **Location:** Atlanta, GA
