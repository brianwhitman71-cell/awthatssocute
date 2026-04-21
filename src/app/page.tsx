import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import HeroSection from "@/components/HeroSection";
import ShopSection from "@/components/ShopSection";
import InfoSection from "@/components/InfoSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import Cart from "@/components/Cart";
import { CartProvider } from "@/context/CartContext";
import ScrollToTop from "@/components/ScrollToTop";

export default function HomePage() {
  return (
    <CartProvider>
      <ScrollToTop />
      <Header />
      <HeroBanner />
      <main>
        <HeroSection />
        <ShopSection />
        <InfoSection />
        <ContactSection />
      </main>
      <Footer />
      <Cart />
    </CartProvider>
  );
}
