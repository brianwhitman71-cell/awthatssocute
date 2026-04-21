import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-white">
      <div className="max-w-sm">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">🧶</span>
        </div>
        <h1 className="font-heading text-3xl font-800 text-foreground mb-3">
          Order Confirmed!
        </h1>
        <p
          className="text-foreground/60 text-sm leading-relaxed mb-8"
          style={{ fontFamily: "var(--font-nunito), Nunito, sans-serif" }}
        >
          Thank you for your purchase! Alexis will be in touch soon about your
          handmade creation. Check your email for a confirmation.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-primary text-white font-700 tracking-wider text-sm px-8 py-3.5 rounded-full hover:opacity-90 transition-all duration-200 hover:-translate-y-0.5 shadow-sm"
          style={{ fontFamily: "var(--font-nunito), Nunito, sans-serif" }}
        >
          BACK TO SHOP
        </Link>
      </div>
    </div>
  );
}
