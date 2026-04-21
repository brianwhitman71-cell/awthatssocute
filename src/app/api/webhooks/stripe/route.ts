import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getZoneForState, buildShippingOptions } from "@/lib/shipping-zones";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    return NextResponse.json({ error: "Missing signature or webhook secret" }, { status: 400 });
  }

  let event: ReturnType<typeof getStripe().webhooks.constructEvent>;
  try {
    event = getStripe().webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Webhook signature verification failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((event as any).type === "checkout.session.shipping_option_list_refresh") {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const session = (event as any).data.object as {
      id: string;
      shipping_address: { state?: string | null } | null;
    };

    const state = session.shipping_address?.state ?? null;
    const zone = getZoneForState(state);
    const shippingOptions = buildShippingOptions(zone);

    await getStripe().checkout.sessions.update(session.id, {
      shipping_options: shippingOptions,
    });
  }

  return NextResponse.json({ received: true });
}
