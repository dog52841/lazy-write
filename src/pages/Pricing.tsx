import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import { Check, Crown, Sparkles, Star, Zap } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import { toast } from "sonner";

const Pricing = () => {
  const { user } = useAuth();
  const stripe = useStripe();
  const [isLoading, setIsLoading] = useState(false);

  // Your Stripe Price ID
  const premiumPriceId = "price_1R4MxTSDoDaxuZtEXJ4OxFGE";

  const handleCheckout = async () => {
    if (!user) {
      toast.error("You must be logged in to upgrade.");
      return;
    }
    if (!stripe) {
      toast.error("Payment system is not ready. Please try again in a moment.");
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
        throw new Error("Failed to create checkout session.");
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-quicksand text-5xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Start free and upgrade when you need more. No hidden fees, no surprises.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <Card className="bg-white/90 backdrop-blur-sm border-orange-100 shadow-lg">
            <CardHeader className="text-center">
              <div className="bg-gray-100 rounded-full p-3 w-fit mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-gray-600" />
              </div>
              <CardTitle className="font-quicksand text-2xl text-gray-900">Free</CardTitle>
              <CardDescription className="text-gray-600">
                Perfect for trying out LazyWrite
              </CardDescription>
              <div className="py-4">
                <span className="text-4xl font-bold text-gray-900">$0</span>
                <span className="text-gray-600">/month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">3 generations per day</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">5 handwriting styles</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Basic paper backgrounds</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">PNG downloads</span>
                </div>
                <div className="flex items-center gap-3 opacity-60">
                  <span className="text-gray-400">• Includes ads</span>
                </div>
              </div>
              
              <Button variant="outline" className="w-full border-orange-200 text-orange-600 hover:bg-orange-50 mt-6">
                Current Plan
              </Button>
            </CardContent>
          </Card>

          {/* Premium Plan */}
          <Card className="bg-white/90 backdrop-blur-sm border-orange-300 shadow-xl relative">
            <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white">
              Most Popular
            </Badge>
            
            <CardHeader className="text-center">
              <div className="bg-orange-100 rounded-full p-3 w-fit mx-auto mb-4">
                <Crown className="h-8 w-8 text-orange-600" />
              </div>
              <CardTitle className="font-quicksand text-2xl text-gray-900">Premium</CardTitle>
              <CardDescription className="text-gray-600">
                For serious handwriting enthusiasts
              </CardDescription>
              <div className="py-4">
                <span className="text-4xl font-bold text-gray-900">$4.99</span>
                <span className="text-gray-600">/month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">25 generations per day</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">All handwriting styles</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Custom paper upload</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">High-quality PNG & PDF</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Priority generation</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">No ads</span>
                </div>
                <div className="flex items-center gap-3">
                  <Star className="h-5 w-5 text-orange-500" />
                  <span className="text-gray-700">Advanced customization</span>
                </div>
              </div>
              
              <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white mt-6" onClick={handleCheckout} disabled={isLoading}>
                {isLoading ? "Redirecting..." : "Upgrade to Premium"}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="font-quicksand text-3xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-orange-100">
              <h3 className="font-quicksand text-lg font-semibold text-gray-900 mb-2">
                Can I cancel anytime?
              </h3>
              <p className="text-gray-600">
                Yes! You can cancel your subscription at any time. You'll continue to have access 
                to premium features until the end of your billing period.
              </p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-orange-100">
              <h3 className="font-quicksand text-lg font-semibold text-gray-900 mb-2">
                What happens to my generations?
              </h3>
              <p className="text-gray-600">
                Your daily generation count resets every 24 hours. Unused generations don't 
                roll over to the next day.
              </p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-orange-100">
              <h3 className="font-quicksand text-lg font-semibold text-gray-900 mb-2">
                How realistic is the handwriting?
              </h3>
              <p className="text-gray-600">
                Our AI creates incredibly realistic handwriting that's virtually indistinguishable 
                from human writing, with natural variations and imperfections.
              </p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-orange-100">
              <h3 className="font-quicksand text-lg font-semibold text-gray-900 mb-2">
                Can I use my own paper?
              </h3>
              <p className="text-gray-600">
                Yes! Premium users can upload their own paper backgrounds, including notebook 
                paper, letterhead, or any custom background.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
