import Image from "next/image";
import { HeartIcon, SparkleIcon } from "./icons";


const infoItems = [
  {
    icon: <SparkleIcon className="w-6 h-6 text-primary" />,
    title: "What is Amigurumi?",
    description:
      "Amigurumi is the Japanese art of crocheting or knitting small, stuffed yarn creatures. The word is a combination of the Japanese words ami, meaning crocheted or knitted, and nuigurumi, meaning stuffed doll.",
  },
  {
    icon: <HeartIcon className="w-6 h-6 text-primary" />,
    title: "100% Homemade",
    description:
      "Every creation is 100% homemade, often using recycled and repurposed materials. Each piece is made with care and love — no two are exactly alike.",
  },
  {
    icon: (
      <Image
        src="/images/decorative-3.png"
        alt="Crochet hook"
        width={24}
        height={32}
        className="opacity-70"
      />
    ),
    title: "Custom Orders Welcome",
    description:
      "Have something specific in mind? Head over to the Creations page for inspiration, then fill out a contact form. Custom orders are welcome!",
  },
];

export default function InfoSection() {
  return (
    <section
      id="creations"
      className="relative pt-0 pb-0"
    >
      {/* Section header with full-width banner background */}
      <div
        className="text-center mb-14 overflow-hidden"
        style={{ paddingTop: "2.5rem", paddingBottom: "2.5rem", background: "oklch(0.94 0.03 258 / 0.4)" }}
      >
        <p
          className="text-xs font-700 tracking-[0.3em] text-primary uppercase mb-3"
          style={{ fontFamily: "var(--font-nunito), Nunito, sans-serif" }}
        >
          Good to know
        </p>
        <h2 className="font-heading text-3xl md:text-5xl font-800 text-foreground mb-4">
          Things to Know
        </h2>
        <div className="w-16 h-0.5 bg-primary mx-auto rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Two-column layout: info cards + decorative image */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Info cards */}
          <div className="flex flex-col gap-6">
            {infoItems.map((item, i) => (
              <div
                key={i}
                className="flex gap-5 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-heading text-lg font-700 text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p
                    className="text-sm text-foreground/65 leading-relaxed"
                    style={{
                      fontFamily: "var(--font-nunito), Nunito, sans-serif",
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Decorative image stack */}
          <div className="relative flex items-center justify-center">
            {/* Scribble circle decoration */}
            <div className="absolute w-80 h-80 opacity-15 pointer-events-none">
              <Image
                src="/images/decorative-4.png"
                alt=""
                fill
                className="object-contain"
              />
            </div>

            {/* Main circular image */}
            <div className="relative w-72 h-72 md:w-80 md:h-80">
              <div className="w-full h-full rounded-full overflow-hidden shadow-xl border-8 border-white">
                <Image
                  src="/images/decorative-1.png"
                  alt="Colorful yarn collection"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Floating product image */}
              <div className="absolute -bottom-4 -right-4 w-36 h-36 rounded-full overflow-hidden shadow-lg border-4 border-white">
                <Image
                  src="/images/decorative-2.png"
                  alt="Emotional Support Dumpster Fire amigurumi"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
