import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import { User, Palette, PenTool, LogOut, Crown, CheckCircle } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";

const Settings = () => {
  const { user, signOut } = useAuth();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const stripe = useStripe();
  const [isLoading, setIsLoading] = useState(false);
  
  // Placeholder for subscription status - we will replace this with real data later
  const isPremium = false;
  const premiumPriceId = "price_1R4MxTSDoDaxuZtEXJ4OxFGE";

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
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <h1 className="font-quicksand text-4xl font-bold mb-2">Settings</h1>
            <p className="text-muted-foreground">Manage your account and preferences</p>
          </div>

          <div className="space-y-8">
            {/* Profile Section */}
            <Card className="shadow-sm border-border">
              <CardHeader>
                <CardTitle className="font-quicksand flex items-center gap-3">
                  <User className="h-6 w-6" /> Profile
                </CardTitle>
                <CardDescription>This is your public-facing information.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="font-medium">Email</div>
                  <div className="text-muted-foreground">{user?.email}</div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="font-medium">Full Name</div>
                  <div className="text-muted-foreground">{user?.user_metadata?.full_name || 'Not provided'}</div>
                </div>
              </CardContent>
            </Card>

            {/* Subscription Section */}
            <Card className="shadow-sm border-border">
              <CardHeader>
                <CardTitle className="font-quicksand flex items-center gap-3">
                  <Crown className="h-6 w-6" /> Subscription
                </CardTitle>
                <CardDescription>Manage your billing and subscription plan.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg border">
                  <div>
                    <p className="font-medium text-lg">
                      {isPremium ? "Premium Plan" : "Free Plan"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {isPremium ? "You have unlimited access to all features." : "Upgrade to unlock premium features."}
                    </p>
                  </div>
                  <Button onClick={handleCheckout} disabled={isPremium || isLoading}>
                    {isLoading ? "Redirecting..." : isPremium ? "Manage Subscription" : "Upgrade"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Appearance Section */}
            <Card className="shadow-sm border-border">
              <CardHeader>
                <CardTitle className="font-quicksand flex items-center gap-3">
                  <Palette className="h-6 w-6" /> Appearance
                </CardTitle>
                <CardDescription>Customize the look and feel of the app.</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { name: "Light", value: "light" },
                  { name: "Dark", value: "dark" },
                  { name: "Comfort", value: "system" } // "system" often defaults to a user's preference
                ].map((item) => (
                  <Button
                    key={item.value}
                    variant={theme === item.value ? "default" : "outline"}
                    onClick={() => setTheme(item.value)}
                    className="flex items-center justify-center gap-2 py-8 text-lg"
                  >
                    {theme === item.value && <CheckCircle className="h-5 w-5" />}
                    {item.name}
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Account Actions */}
            <Card className="shadow-sm border-border border-destructive/50">
               <CardHeader>
                <CardTitle className="font-quicksand flex items-center gap-3 text-destructive">
                  <LogOut className="h-6 w-6" /> Danger Zone
                </CardTitle>
              </CardHeader>
              <CardContent className="flex justify-between items-center">
                <p className="text-muted-foreground">Sign out of your account on this device.</p>
                <Button variant="destructive" onClick={handleSignOut}>
                  Sign Out
                </Button>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Settings;
