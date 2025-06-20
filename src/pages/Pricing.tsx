
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import { Check, Crown, Sparkles, IndianRupee, ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import { toast } from "sonner";

const Pricing = () => {
  const { user } = useAuth();
  const stripe = useStripe();
  const [isLoading, setIsLoading] = useState(false);

  // Real Stripe Price ID from your secrets
  const premiumPriceId = "price_1R4MxTSDoDaxuZtEXJ4OxFGE";

  const handleCheckout = async () => {
    if (!user) {
      toast.error("Please sign in to upgrade to Premium.");
      return;
    }
    if (!stripe) {
      toast.error("Payment system is not ready. Please try again.");
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("user_id", user.id);
      formData.append("price_id", premiumPriceId);
      
      const VITE_API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
      
      const res = await fetch(`${VITE_API_URL}/api/create-checkout-session`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to create checkout session");
      }

      const { sessionId } = await res.json();
      
      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        toast.error(error.message);
      }
    } catch (err: any) {
      toast.error(err.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Header */}
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-base font-semibold leading-7 text-orange-600">Pricing</h2>
            <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Choose the right plan for you
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Start for free or unlock unlimited potential with Premium
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            {/* Free Plan */}
            <div className="rounded-3xl p-8 ring-1 ring-gray-200 xl:p-10">
              <div className="flex items-center justify-between gap-x-4">
                <h3 className="text-lg font-semibold leading-8 text-gray-900">Free</h3>
                <div className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold leading-5 text-gray-600">
                  Most popular
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-gray-600">
                Perfect for trying out LazyWrite
              </p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight text-gray-900">₹0</span>
                <span className="text-sm font-semibold leading-6 text-gray-600">/month</span>
              </p>
              
              <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                <li className="flex gap-x-3">
                  <Check className="h-6 w-5 flex-none text-orange-600" aria-hidden="true" />
                  3 generations per day
                </li>
                <li className="flex gap-x-3">
                  <Check className="h-6 w-5 flex-none text-orange-600" aria-hidden="true" />
                  5 handwriting styles
                </li>
                <li className="flex gap-x-3">
                  <Check className="h-6 w-5 flex-none text-orange-600" aria-hidden="true" />
                  Basic paper backgrounds
                </li>
                <li className="flex gap-x-3">
                  <Check className="h-6 w-5 flex-none text-orange-600" aria-hidden="true" />
                  PNG downloads
                </li>
              </ul>
              
              <Button
                variant="outline"
                className="mt-8 w-full"
                disabled
              >
                Current plan
              </Button>
            </div>

            {/* Premium Plan */}
            <div className="rounded-3xl p-8 ring-2 ring-orange-600 xl:p-10">
              <div className="flex items-center justify-between gap-x-4">
                <h3 className="text-lg font-semibold leading-8 text-orange-600">Premium</h3>
                <div className="rounded-full bg-orange-600/10 px-2.5 py-1 text-xs font-semibold leading-5 text-orange-600">
                  Recommended
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-gray-600">
                For professionals and power users
              </p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight text-gray-900">₹432</span>
                <span className="text-sm font-semibold leading-6 text-gray-600">/month</span>
              </p>
              
              <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                <li className="flex gap-x-3">
                  <Check className="h-6 w-5 flex-none text-orange-600" aria-hidden="true" />
                  Unlimited generations
                </li>
                <li className="flex gap-x-3">
                  <Check className="h-6 w-5 flex-none text-orange-600" aria-hidden="true" />
                  All handwriting styles
                </li>
                <li className="flex gap-x-3">
                  <Check className="h-6 w-5 flex-none text-orange-600" aria-hidden="true" />
                  Custom paper upload
                </li>
                <li className="flex gap-x-3">
                  <Check className="h-6 w-5 flex-none text-orange-600" aria-hidden="true" />
                  High-quality PNG & PDF
                </li>
                <li className="flex gap-x-3">
                  <Check className="h-6 w-5 flex-none text-orange-600" aria-hidden="true" />
                  Priority generation
                </li>
                <li className="flex gap-x-3">
                  <Check className="h-6 w-5 flex-none text-orange-600" aria-hidden="true" />
                  No ads
                </li>
                <li className="flex gap-x-3">
                  <Check className="h-6 w-5 flex-none text-orange-600" aria-hidden="true" />
                  24/7 Priority support
                </li>
              </ul>
              
              <Button
                onClick={handleCheckout}
                disabled={isLoading}
                className="mt-8 w-full bg-orange-600 hover:bg-orange-700"
              >
                {isLoading ? "Processing..." : "Upgrade to Premium"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mx-auto mt-24 max-w-2xl sm:mt-32 lg:max-w-4xl">
            <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">
              Frequently asked questions
            </h2>
            <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
              {[
                {
                  question: "Can I cancel anytime?",
                  answer: "Yes, you can cancel your subscription at any time. You'll continue to have access to premium features until the end of your billing period."
                },
                {
                  question: "What payment methods do you accept?",
                  answer: "We accept all major credit cards, debit cards, UPI, and net banking through Stripe."
                },
                {
                  question: "How realistic is the handwriting?",
                  answer: "Our AI creates incredibly realistic handwriting that's virtually indistinguishable from human writing."
                }
              ].map((faq) => (
                <div key={faq.question} className="pt-6">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    {faq.question}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">
                    {faq.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
