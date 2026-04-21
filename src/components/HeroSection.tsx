import Image from "next/image";

const galleryImages = [
  { src: "/images/product-pink-tree.jpg", alt: "Pink crochet Christmas tree with ribbon bow" },
  { src: "/images/product-baubles-1.jpg", alt: "Green crochet Christmas tree" },
  { src: "/images/product-santa-belly.jpg", alt: "Pastel pink holiday tree with fairy lights" },
  { src: "/images/product-baubles-2.jpg", alt: "Pink and gray holiday tree with bead garland" },
];

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex flex-col items-center overflow-hidden pt-8"
    >
      {/* Watercolor blob background */}
      <div
        className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="absolute top-[-10%] left-[-15%] w-[60vw] h-[60vw] rounded-full opacity-40"
          style={{
            background:
              "radial-gradient(ellipse, oklch(0.82 0.07 260 / 0.5) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-[10%] right-[-20%] w-[55vw] h-[55vw] rounded-full opacity-50"
          style={{
            background:
              "radial-gradient(ellipse, oklch(0.85 0.06 258 / 0.6) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-[-5%] left-[20%] w-[40vw] h-[40vw] rounded-full opacity-30"
          style={{
            background:
              "radial-gradient(ellipse, oklch(0.88 0.06 350 / 0.4) 0%, transparent 70%)",
          }}
        />
      </div>



      {/* Main hero text */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-800 text-foreground leading-tight mb-4 whitespace-nowrap">
          Creations by{" "}
          <span className="text-primary italic">Alexis Whitman</span>
        </h1>
        <p
          className="text-base md:text-lg text-foreground/60 tracking-widest uppercase font-600 mb-10"
          style={{ fontFamily: "var(--font-nunito), Nunito, sans-serif" }}
        >
          Handmade Crochet Amigurumi Creations
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#shop"
            className="inline-flex items-center gap-2 bg-primary text-white font-700 tracking-wider text-sm px-8 py-3.5 rounded-full hover:opacity-90 transition-all duration-200 hover:-translate-y-0.5 shadow-sm hover:shadow-md"
            style={{ fontFamily: "var(--font-nunito), Nunito, sans-serif" }}
          >
            SHOP NOW
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 border-2 border-primary text-primary font-700 tracking-wider text-sm px-8 py-3.5 rounded-full hover:bg-primary hover:text-white transition-all duration-200 hover:-translate-y-0.5"
            style={{ fontFamily: "var(--font-nunito), Nunito, sans-serif" }}
          >
            CUSTOM ORDER
          </a>
        </div>
      </div>

      {/* Decorative circular images */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 mt-16 mb-0">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
          <div className="flex flex-col items-center gap-3 group">
            <div className="w-44 h-44 md:w-52 md:h-52 rounded-full overflow-hidden shadow-lg border-4 border-white group-hover:scale-105 transition-transform duration-300">
              <Image
                src="/images/decorative-1.png"
                alt="Colorful yarn collection"
                width={208}
                height={208}
                className="object-cover w-full h-full"
              />
            </div>
            <p className="text-sm font-600 text-foreground/60 text-center">
              Colorful Yarns
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 group">
            <div className="w-44 h-44 md:w-52 md:h-52 rounded-full overflow-hidden shadow-lg border-4 border-white group-hover:scale-105 transition-transform duration-300">
              <Image
                src="/images/decorative-5.png"
                alt="Crochet vegetable amigurumi"
                width={208}
                height={208}
                className="object-cover w-full h-full"
              />
            </div>
            <p className="text-sm font-600 text-foreground/60 text-center">
              Veggie Friends
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 group">
            <div className="w-44 h-44 md:w-52 md:h-52 rounded-full overflow-hidden shadow-lg border-4 border-white group-hover:scale-105 transition-transform duration-300">
              <Image
                src="/images/decorative-2.png"
                alt="Emotional Support Dumpster Fire amigurumi"
                width={208}
                height={208}
                className="object-cover w-full h-full"
              />
            </div>
            <p className="text-sm font-600 text-foreground/60 text-center">
              Emotional Support
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
