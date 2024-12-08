import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SUBSCRIPTION_PLAN } from "@/consts/subscription";

export default async function CheckoutConfirmation() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md overflow-hidden rounded-lg shadow-lg">
        <div className="p-6 sm:p-8">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 rounded-full bg-green-100 p-3">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="mb-2 text-2xl font-bold text-gray-800 sm:text-3xl">
              Thank You for Subscribing!
            </h1>
            <p className="mb-6 text-gray-600">
              Your subscription has been confirmed. We&#39;re thrilled to have
              you on board!
            </p>
          </div>

          <div className="mb-6 rounded-lg bg-gray-50 p-4">
            <h2 className="mb-2 font-semibold text-gray-800">Order Summary</h2>
            <div className="mb-1 flex justify-between text-sm text-gray-600">
              <span>Plan:</span>
              <span>{SUBSCRIPTION_PLAN.name}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Amount:</span>
              <span>${SUBSCRIPTION_PLAN.price}/month</span>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="mb-2 font-semibold text-gray-800">
              What&#39;s Next?
            </h2>
            <ul className="list-inside list-disc space-y-1 text-sm text-gray-600">
              <li>Check your email for a detailed receipt</li>
              <li>Explore our premium features</li>
              <li>Set up your profile for a personalized experience</li>
            </ul>
          </div>

          <div className="text-center">
            <Link href="/">
              <Button className="w-full">Return to Homepage</Button>
            </Link>
          </div>
        </div>

        <div className="bg-gray-50 px-6 py-4 text-center text-sm text-gray-600">
          Questions? Contact our support at {SUBSCRIPTION_PLAN.email}
        </div>
      </div>
    </div>
  );
}
