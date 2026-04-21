// Shipping zones radiating from the Gulf South (ship-from origin).
// Adjust state assignments or prices to match your actual location + carrier rates.

export interface ShippingZone {
  name: string;
  displayName: string;
  amountCents: number;
  minDays: number;
  maxDays: number;
}

// State → zone key
const STATE_ZONE: Record<string, string> = {
  // Zone 1 — Gulf South (home region)
  AL: "z1", AR: "z1", FL: "z1", GA: "z1",
  LA: "z1", MS: "z1", SC: "z1", TN: "z1",

  // Zone 2 — Southeast + Mid-Atlantic
  DC: "z2", DE: "z2", IN: "z2", KY: "z2",
  MD: "z2", NC: "z2", NJ: "z2", OH: "z2",
  PA: "z2", VA: "z2", WV: "z2",

  // Zone 3 — Northeast + Great Lakes
  CT: "z3", IL: "z3", MA: "z3", ME: "z3",
  MI: "z3", MN: "z3", MO: "z3", NH: "z3",
  NY: "z3", RI: "z3", VT: "z3", WI: "z3",

  // Zone 4 — South Central + Plains
  CO: "z4", IA: "z4", KS: "z4", ND: "z4",
  NE: "z4", NM: "z4", OK: "z4", SD: "z4",
  TX: "z4", WY: "z4",

  // Zone 5 — Mountain + West Coast
  AZ: "z5", CA: "z5", ID: "z5", MT: "z5",
  NV: "z5", OR: "z5", UT: "z5", WA: "z5",

  // Zone 6 — Non-contiguous + territories
  AK: "z6", HI: "z6", PR: "z6", GU: "z6",
  VI: "z6", AS: "z6", MP: "z6",
};

const ZONES: Record<string, ShippingZone> = {
  z1: { name: "z1", displayName: "Gulf South",         amountCents: 599,  minDays: 3, maxDays: 5  },
  z2: { name: "z2", displayName: "Southeast / Mid-Atlantic", amountCents: 699,  minDays: 4, maxDays: 6  },
  z3: { name: "z3", displayName: "Northeast / Great Lakes",  amountCents: 799,  minDays: 5, maxDays: 8  },
  z4: { name: "z4", displayName: "South Central / Plains",   amountCents: 899,  minDays: 5, maxDays: 8  },
  z5: { name: "z5", displayName: "Mountain / West Coast",    amountCents: 1099, minDays: 6, maxDays: 10 },
  z6: { name: "z6", displayName: "Alaska / Hawaii / Territories", amountCents: 1699, minDays: 8, maxDays: 14 },
};

const DEFAULT_ZONE = ZONES.z3; // mid-range fallback if state unknown

export function getZoneForState(stateCode: string | null | undefined): ShippingZone {
  if (!stateCode) return DEFAULT_ZONE;
  return ZONES[STATE_ZONE[stateCode.toUpperCase()]] ?? DEFAULT_ZONE;
}

export function buildShippingOptions(zone: ShippingZone) {
  return [
    {
      shipping_rate_data: {
        type: "fixed_amount" as const,
        fixed_amount: { amount: zone.amountCents, currency: "usd" },
        display_name: "Standard Shipping",
        tax_behavior: "exclusive" as const,  // Georgia tax applies to shipping
        delivery_estimate: {
          minimum: { unit: "business_day" as const, value: zone.minDays },
          maximum: { unit: "business_day" as const, value: zone.maxDays },
        },
      },
    },
    {
      shipping_rate_data: {
        type: "fixed_amount" as const,
        fixed_amount: { amount: zone.amountCents + 600, currency: "usd" },
        display_name: "Priority Shipping",
        tax_behavior: "exclusive" as const,
        delivery_estimate: {
          minimum: { unit: "business_day" as const, value: Math.max(1, zone.minDays - 2) },
          maximum: { unit: "business_day" as const, value: Math.max(2, zone.maxDays - 3) },
        },
      },
    },
  ];
}
