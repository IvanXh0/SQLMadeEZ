import { NextResponse } from "next/server";
import {
  lemonSqueezySetup,
  createCheckout,
} from "@lemonsqueezy/lemonsqueezy.js";
import { SUBSCRIPTION_PLAN } from "@/consts/subscription";

export interface LemonSqueezyCheckout {
  type: string;
  id: string;
  attributes: {
    store_id: number;
    variant_id: number;
    custom_price: number | null;
    product_options: {
      name: string;
      description: string | null;
      media: unknown[];
      redirect_url: string | null;
      receipt_button_text: string | null;
      receipt_link_url: string | null;
      receipt_thank_you_note: string | null;
      enabled_variants: number[];
    };
    expires_at: string | null;
    created_at: string;
    updated_at: string;
    test_mode: boolean;
    url: string;
    status: string;
  };
}

export interface LemonSqueezyResponse {
  data: LemonSqueezyCheckout;
}

lemonSqueezySetup({
  apiKey: process.env.LEMON_SQUEEZY_API_KEY ?? "",
  onError: (error: Error) => {
    console.error("Lemon Squeezy Setup Error:", error);
  },
});

export async function POST(req: Request) {
  try {
    const { userId, userEmail } = (await req.json()) as {
      userId: string;
      userEmail: string;
    };

    const checkout = await createCheckout(
      SUBSCRIPTION_PLAN.storeId,
      parseInt(SUBSCRIPTION_PLAN.variantId),
      {
        checkoutData: {
          email: userEmail,
          custom: {
            user_id: userId,
            user_email: userEmail,
          },
        },
        productOptions: {
          redirectUrl: `http://localhost:4200/checkout-success`,
          receiptThankYouNote: "Thanks for subscribing!",
        },
      },
    );

    if (!checkout?.data?.data.attributes?.url) {
      throw new Error("No checkout URL in response");
    }

    return NextResponse.json({ url: checkout.data.data.attributes.url });
  } catch (error) {
    console.error("Detailed checkout error:", {
      error,
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    });

    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to create checkout",
        details: process.env.NODE_ENV === "development" ? error : undefined,
      },
      { status: 500 },
    );
  }
}
