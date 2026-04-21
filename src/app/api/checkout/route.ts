import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getZoneForState, buildShippingOptions } from "@/lib/shipping-zones";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

// Stripe tax code for general handmade/physical goods.
// See https://stripe.com/docs/tax/tax-codes for alternatives.
const PHYSICAL_GOODS_TAX_CODE = "txcd_99999999";

export async function POST(req: NextRequest) {
  const { items, stateCode }: { items: CartItem[]; stateCode?: string | null } = await req.json();

  if (!items || items.length === 0) {
    return NextResponse.json({ error: "No items in cart" }, { status: 400 });
  }

  const origin =
    req.headers.get("origin") ??
    req.headers.get("referer")?.replace(/\/$/, "").split("/").slice(0, 3).join("/") ??
    "http://localhost:3000";

  const zone = getZoneForState(stateCode);
  const shippingOptions = buildShippingOptions(zone);

  const session = await getStripe().checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [`${origin}${item.image}`],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    })),
    mode: "payment",
    success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/cancel`,
    shipping_address_collection: {
      allowed_countries: ["US"],
    },
    shipping_options: shippingOptions,
  });

  return NextResponse.json({ url: session.url });
}
