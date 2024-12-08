import { NextResponse } from "next/server";
import { type listAllSubscriptions } from "lemonsqueezy.ts";
import crypto from "crypto";
import api from "@/utils/api";
import { Subscription } from "@/utils/types";

type LemonsqueezySubscription = Awaited<
  ReturnType<typeof listAllSubscriptions>
>["data"][number];

type EventName =
  | "order_created"
  | "order_refunded"
  | "subscription_created"
  | "subscription_updated"
  | "subscription_cancelled"
  | "subscription_resumed"
  | "subscription_expired"
  | "subscription_paused"
  | "subscription_unpaused"
  | "subscription_payment_failed"
  | "subscription_payment_success"
  | "subscription_payment_recovered";

type Payload = {
  meta: {
    test_mode: boolean;
    event_name: EventName;
    custom_data: {
      user_id: string;
      user_email: string;
    };
  };
  data: LemonsqueezySubscription;
};

export async function POST(request: Request) {
  try {
    const text = await request.text();
    const hmac = crypto.createHmac(
      "sha256",
      process.env.LEMON_SQUEEZY_WEBHOOK_SECRET ?? "",
    );
    const digest = Buffer.from(hmac.update(text).digest("hex"), "utf8");
    const signature = Buffer.from(request.headers.get("x-signature")!, "utf8");

    if (!crypto.timingSafeEqual(digest, signature)) {
      return new Response("Invalid signature.", {
        status: 400,
      });
    }

    const payload = JSON.parse(text) as Payload;

    console.log(payload);

    const {
      meta: {
        event_name: eventName,
        custom_data: { user_id: userId, user_email: userEmail },
      },
      data: subscription,
    } = payload;

    switch (eventName) {
      case "subscription_created": {
        await api.post("/subscriptions", <Subscription>{
          userId: userId,
          status: subscription.attributes.status,
          planId: subscription.attributes.product_id.toString(),
          currentPeriodEnd: new Date(subscription.attributes.renews_at),
          cancelAtPeriodEnd: false,
        });
        break;
      }

      case "subscription_updated":
      case "subscription_resumed":
      case "subscription_paused": {
        await api.patch(`/subscriptions/${userEmail}`, {
          status: subscription.attributes.status,
          currentPeriodEnd: new Date(
            subscription.attributes.renews_at ??
              subscription.attributes.ends_at,
          ),
        });
        break;
      }
      case "subscription_cancelled": {
        await api.post(`/subscriptions/${userEmail}/cancel`);
        break;
      }
      case "subscription_expired": {
        await api.patch(`/subscriptions/${userEmail}`, {
          status: "expired",
          currentPeriodEnd: new Date(subscription.attributes.ends_at ?? ""),
        });
        break;
      }
    }

    return NextResponse.json({ success: true, message: "Webhook received" });
  } catch (error) {
    console.error("Webhook error:", error);
    return new NextResponse("Webhook handler failed", { status: 500 });
  }
}
