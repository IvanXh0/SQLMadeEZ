"use client";

import { useState } from "react";
import { SUBSCRIPTION_PLAN } from "@/consts/subscription";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import api from "@/utils/api";
import { Me } from "@/utils/types";

interface CheckoutResponse {
  url?: string;
  error?: string;
}

export function SubscribeButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();

  const { data: me } = useQuery({
    queryKey: ["user", user?.primaryEmailAddress?.emailAddress],
    queryFn: async () => {
      const { data } = await api.get<Me>(
        `/user/${user?.primaryEmailAddress?.emailAddress}`,
      );
      console.log(data);
      return data;
    },
  });

  const handleSubscribe = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: me?.userId,
          userEmail: me?.email,
        }),
      });

      const data = (await response.json()) as CheckoutResponse;

      if (!response.ok || data.error) {
        throw new Error(data.error ?? "Failed to create checkout");
      }

      if (!data.url) {
        throw new Error("No checkout URL received");
      }

      window.location.href = data.url;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to start checkout";
      setError(message);
      console.error("Checkout error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <Button onClick={handleSubscribe} disabled={loading}>
        {loading
          ? "Loading..."
          : `Subscribe Now - ${SUBSCRIPTION_PLAN.price} ${SUBSCRIPTION_PLAN.currency}/month`}
      </Button>

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
