
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import { Check, Crown, Sparkles, Star, IndianRupee } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import { toast } from "sonner";

const Pricing = () => {
  const { user } = useAuth();
  const stripe = useStripe();
  const [isLoading, setIsLoading] = useState(false);

  // Your Stripe Price ID - you'll need to update this with the actual price ID for ₹432
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-quicksand text-5xl font-bold text-gray-900 mb-4">
            Choose Your Perfect Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Start creating beautiful handwriting for free, or unlock unlimited potential with Premium.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <Card className="bg-white/90 backdrop-blur-sm border-2 border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="text-center pb-8">
              <div className="bg-gray-100 rounded-full p-4 w-fit mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-gray-600" />
              </div>
              <CardTitle className="font-quicksand text-3xl text-gray-900">Free</CardTitle>
              <CardDescription className="text-gray-600 text-lg">
                Perfect for trying out LazyWrite
              </CardDescription>
              <div className="py-6">
                <span className="text-5xl font-bold text-gray-900">₹0</span>
                <span className="text-gray-600 ml-2">/month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">3 generations per day</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">5 handwriting styles</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">Basic paper backgrounds</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">PNG downloads</span>
                </div>
                <div className="flex items-center gap-3 opacity-60">
                  <span className="text-gray-400">• Includes ads</span>
                </div>
              </div>
              
              <Button variant="outline" className="w-full border-2 border-gray-300 text-gray-600 hover:bg-gray-50 mt-8 py-3 text-base font-semibold">
                Current Plan
              </Button>
            </CardContent>
          </Card>

          {/* Premium Plan */}
          <Card className="bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-2xl relative transform hover:scale-105 transition-all duration-300 border-0">
            <Badge className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-white text-orange-600 px-4 py-2 text-sm font-bold">
              🎉 Most Popular
            </Badge>
            
            <CardHeader className="text-center pb-8">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 w-fit mx-auto mb-4">
                <Crown className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="font-quicksand text-3xl text-white">Premium</CardTitle>
              <CardDescription className="text-orange-100 text-lg">
                For serious handwriting enthusiasts
              </CardDescription>
              <div className="py-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <IndianRupee className="h-8 w-8 text-white" />
                  <span className="text-5xl font-bold text-white">432</span>
                  <span className="text-orange-100 ml-2">/month</span>
                </div>
                <p className="text-orange-100 text-sm">≈ $5.00 USD/month</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-white flex-shrink-0" />
                  <span className="text-white">Unlimited generations</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-white flex-shrink-0" />
                  <span className="text-white">All handwriting styles</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-white flex-shrink-0" />
                  <span className="text-white">Custom paper upload</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-white flex-shrink-0" />
                  <span className="text-white">High-quality PNG & PDF</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-white flex-shrink-0" />
                  <span className="text-white">Priority generation</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-white flex-shrink-0" />
                  <span className="text-white">No ads</span>
                </div>
                <div className="flex items-center gap-3">
                  <Star className="h-5 w-5 text-yellow-300 flex-shrink-0" />
                  <span className="text-white">Advanced customization</span>
                </div>
                <div className="flex items-center gap-3">
                  <Star className="h-5 w-5 text-yellow-300 flex-shrink-0" />
                  <span className="text-white">24/7 Priority support</span>
                </div>
              </div>
              
              <Button className="w-full bg-white text-orange-600 hover:bg-orange-50 mt-8 py-3 text-base font-bold shadow-lg hover:shadow-xl transition-all duration-300" onClick={handleCheckout} disabled={isLoading}>
                {isLoading ? "Processing..." : "🚀 Upgrade to Premium"}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Value Proposition */}
        <div className="mt-16 text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto border border-orange-200">
            <h3 className="font-quicksand text-2xl font-bold text-gray-900 mb-4">
              Why Choose Premium?
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="bg-orange-100 rounded-full p-3 w-fit mx-auto mb-3">
                  <Sparkles className="h-6 w-6 text-orange-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Unlimited Creation</h4>
                <p className="text-gray-600 text-sm">Generate as much handwriting as you need, whenever you need it</p>
              </div>
              <div>
                <div className="bg-orange-100 rounded-full p-3 w-fit mx-auto mb-3">
                  <Crown className="h-6 w-6 text-orange-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Premium Quality</h4>
                <p className="text-gray-600 text-sm">Access to the highest quality output formats and advanced features</p>
              </div>
              <div>
                <div className="bg-orange-100 rounded-full p-3 w-fit mx-auto mb-3">
                  <Star className="h-6 w-6 text-orange-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Priority Support</h4>
                <p className="text-gray-600 text-sm">Get help when you need it with our dedicated premium support</p>
              </div>
            </div>
          </div>
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
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600">
                We accept all major credit cards, debit cards, UPI, and net banking through 
                our secure payment partner Stripe.
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
