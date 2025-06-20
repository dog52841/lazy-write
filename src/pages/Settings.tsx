
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import { User, Palette, LogOut, Crown, CheckCircle, CreditCard } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useStripe } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const Settings = () => {
  const { user, signOut } = useAuth();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const stripe = useStripe();
  const [isLoading, setIsLoading] = useState(false);
  const [subscriptionData, setSubscriptionData] = useState<any>(null);
  const [loadingSubscription, setLoadingSubscription] = useState(true);
  
  const premiumPriceId = "price_1R4MxTSDoDaxuZtEXJ4OxFGE";

  useEffect(() => {
    const fetchSubscriptionData = async () => {
      if (!user) return;

      try {
        // Check for subscription data in profiles or a subscriptions table
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error fetching subscription data:', error);
        } else {
          setSubscriptionData(data);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoadingSubscription(false);
      }
    };

    fetchSubscriptionData();
  }, [user]);

  // Check if user has premium - this would be based on real subscription data
  const isPremium = subscriptionData?.subscription_status === 'active' || false;

  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out successfully!");
    navigate("/");
  };

  const handleCheckout = async () => {
    if (!user) {
      toast.error("You must be logged in to upgrade.");
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

  const handleManageSubscription = async () => {
    try {
      const VITE_API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
      
      const res = await fetch(`${VITE_API_URL}/api/create-portal-session`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: user?.id }),
      });

      if (!res.ok) {
        throw new Error("Failed to create portal session");
      }

      const { url } = await res.json();
      window.open(url, '_blank');
    } catch (err: any) {
      toast.error("Unable to access billing portal. Please contact support.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-10">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Account Settings</h1>
            <p className="mt-2 text-sm text-gray-600">Manage your account and preferences</p>
          </div>

          <div className="space-y-6">
            {/* Profile Section */}
            <Card className="bg-white shadow-sm">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <div className="rounded-lg bg-blue-100 p-2">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  Profile Information
                </CardTitle>
                <CardDescription>Your account details and information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium text-gray-900">Email</label>
                    <p className="mt-1 text-sm text-gray-600">{user?.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-900">Full Name</label>
                    <p className="mt-1 text-sm text-gray-600">
                      {user?.user_metadata?.full_name || 'Not provided'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Subscription Section */}
            <Card className="bg-white shadow-sm">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <div className="rounded-lg bg-orange-100 p-2">
                    <Crown className="h-5 w-5 text-orange-600" />
                  </div>
                  Subscription
                </CardTitle>
                <CardDescription>Manage your billing and subscription plan</CardDescription>
              </CardHeader>
              <CardContent>
                {loadingSubscription ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-orange-600 border-t-transparent"></div>
                  </div>
                ) : (
                  <div className="rounded-lg border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {isPremium ? "Premium Plan" : "Free Plan"}
                        </h3>
                        <p className="mt-1 text-sm text-gray-600">
                          {isPremium 
                            ? "You have unlimited access to all features" 
                            : "Upgrade to unlock premium features"
                          }
                        </p>
                        {isPremium && (
                          <div className="mt-2 flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-sm text-green-600">Active subscription</span>
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2">
                        {isPremium ? (
                          <Button 
                            variant="outline" 
                            onClick={handleManageSubscription}
                            className="border-orange-200 text-orange-600 hover:bg-orange-50"
                          >
                            <CreditCard className="mr-2 h-4 w-4" />
                            Manage Billing
                          </Button>
                        ) : (
                          <Button 
                            onClick={handleCheckout} 
                            disabled={isLoading}
                            className="bg-orange-600 hover:bg-orange-700"
                          >
                            {isLoading ? "Processing..." : "Upgrade to Premium"}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Appearance Section */}
            <Card className="bg-white shadow-sm">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <div className="rounded-lg bg-purple-100 p-2">
                    <Palette className="h-5 w-5 text-purple-600" />
                  </div>
                  Appearance
                </CardTitle>
                <CardDescription>Customize how the app looks and feels</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {[
                    { name: "Light", value: "light" },
                    { name: "Dark", value: "dark" },
                    { name: "System", value: "system" }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setTheme(option.value)}
                      className={`relative rounded-lg border p-4 text-left transition-all hover:bg-gray-50 ${
                        theme === option.value 
                          ? 'border-orange-600 bg-orange-50' 
                          : 'border-gray-200'
                      }`}
                    >
                      {theme === option.value && (
                        <CheckCircle className="absolute right-3 top-3 h-5 w-5 text-orange-600" />
                      )}
                      <div className="font-medium text-gray-900">{option.name}</div>
                      <div className="mt-1 text-sm text-gray-500">
                        {option.value === 'system' ? 'Use system preference' : `${option.name} mode`}
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="border-red-200 bg-white shadow-sm">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center gap-3 text-lg text-red-600">
                  <div className="rounded-lg bg-red-100 p-2">
                    <LogOut className="h-5 w-5 text-red-600" />
                  </div>
                  Account Actions
                </CardTitle>
                <CardDescription>Irreversible and destructive actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-red-800">Sign out</h3>
                      <p className="mt-1 text-sm text-red-600">
                        Sign out of your account on this device
                      </p>
                    </div>
                    <Button 
                      variant="destructive" 
                      onClick={handleSignOut}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Sign Out
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Settings;
