import ProductCard from "./ProductCard";
import type { Product } from "@/types";

const products: Product[] = [
  {
    id: "1",
    name: "Pink Holiday Tree with Ribbon Bow",
    price: 30,
    image: "/images/product-pink-tree.jpg",
    alt: "Solid pink crochet Christmas tree with silver ribbon bow and bead ornaments",
    category: "tree",
  },
  {
    id: "2",
    name: "Pink Holiday Tree with Fairy Lights",
    price: 30,
    image: "/images/product-green-tree.jpg",
    alt: "Pink crochet Christmas tree with warm fairy lights and bow",
    category: "tree",
  },
  {
    id: "3",
    name: "Green Holiday Tree with Lights",
    price: 30,
    image: "/images/product-baubles-1.jpg",
    alt: "Green-teal crochet Christmas tree with star topper and bead garland",
    category: "tree",
  },
  {
    id: "4",
    name: "Pink/Gray Holiday Tree with Lights",
    price: 30,
    image: "/images/product-santa-belly.jpg",
    alt: "Pastel pink and gray crochet Christmas tree with fairy lights and star topper",
    category: "tree",
  },
  {
    id: "5",
    name: "Pink/Gray Holiday Tree with Beads",
    price: 30,
    image: "/images/product-baubles-2.jpg",
    alt: "Pink and gray crochet Christmas tree with bead garland and star topper",
    category: "tree",
  },
  {
    id: "6",
    name: "Pink Holiday Tree with Lights",
    price: 30,
    image: "/images/product-pink-gray-tree.jpg",
    alt: "Pink crochet Christmas tree with fairy lights and beads",
    category: "tree",
  },
  {
    id: "7",
    name: "Candy Cane Spiral Ornament",
    price: 15,
    image: "/images/product-reindeer.jpg",
    alt: "Twisted candy cane spiral crochet tree ornament in red, green, and white",
    category: "ornament",
  },
  {
    id: "8",
    name: "Candy Cane Spiral Ornament",
    price: 15,
    image: "/images/product-polar-bear.jpg",
    alt: "Spiral candy cane crochet tree ornament",
    category: "ornament",
  },
  {
    id: "9",
    name: "Colorful Spiral Tree Ornament",
    price: 15,
    image: "/images/product-santa-belly-2.jpg",
    alt: "Red spiral crochet tree ornament with colorful yarn bead accents",
    category: "ornament",
  },
  {
    id: "10",
    name: "Santa Belly Ornament (with Belt)",
    price: 25,
    image: "/images/product-mitten.jpg",
    alt: "Round red crochet Santa belly ornament with black belt and gold buckle",
    category: "ornament",
  },
  {
    id: "11",
    name: "Santa Belly Ornament (Small)",
    price: 15,
    image: "/images/product-mouse.jpg",
    alt: "Small red crochet ball ornament with black stripe",
    category: "ornament",
  },
  {
    id: "12",
    name: "Custom Order",
    price: 15,
    image: "/images/product-extra-4.jpg",
    alt: "Custom crochet creation — contact for details",
    category: "amigurumi",
  },
];

export default function ShopSection() {
  return (
    <section
      id="shop"
      className="relative pt-8 pb-8 lg:pt-10 lg:pb-10 px-6 overflow-hidden"
    >
      {/* Soft background */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(180deg, white 0%, oklch(0.97 0.02 350 / 0.3) 50%, white 100%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-14">
          <p
            className="text-xs font-700 tracking-[0.3em] text-primary uppercase mb-3"
            style={{ fontFamily: "var(--font-nunito), Nunito, sans-serif" }}
          >
            Handmade with love
          </p>
          <h2 className="font-heading text-3xl md:text-5xl font-800 text-foreground mb-4">
            Shop What&apos;s Available
          </h2>
          <div className="w-16 h-0.5 bg-primary mx-auto rounded-full" />
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Custom order CTA */}
        <div className="text-center mt-6">
          <p className="text-foreground/60 text-sm mb-4">
            Don&apos;t see what you&apos;re looking for?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 border-2 border-primary text-primary font-700 tracking-wider text-sm px-8 py-3 rounded-full hover:bg-primary hover:text-white transition-all duration-200"
            style={{ fontFamily: "var(--font-nunito), Nunito, sans-serif" }}
          >
            REQUEST A CUSTOM ORDER
          </a>
        </div>
      </div>
    </section>
  );
}
