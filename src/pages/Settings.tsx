
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import Navbar from "@/components/Navbar";
import { User, Palette, PenTool, LogOut, Crown } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const Settings = () => {
  const { user, signOut } = useAuth();
  const [theme, setTheme] = useState("light");
  const [slantLevel, setSlantLevel] = useState([5]);
  const [pressureLevel, setPressureLevel] = useState([7]);
  const [randomnessLevel, setRandomnessLevel] = useState([3]);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Signed out successfully");
    } catch (error) {
      toast.error("Error signing out");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="font-quicksand text-4xl font-bold text-gray-900 mb-2">
            Settings
          </h1>
          <p className="text-gray-600">
            Customize your LazyWrite experience
          </p>
        </div>

        <div className="space-y-6">
          {/* Profile Section */}
          <Card className="bg-white/90 backdrop-blur-sm border-orange-100">
            <CardHeader>
              <CardTitle className="font-quicksand flex items-center gap-2">
                <User className="h-5 w-5 text-orange-500" />
                Profile
              </CardTitle>
              <CardDescription>
                Manage your account information and subscription
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg border border-orange-200">
                <div>
                  <p className="font-medium text-gray-900">{user?.email || "Not signed in"}</p>
                  <p className="text-sm text-gray-600">Free Plan • 3 generations left today</p>
                </div>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                  <Crown className="h-4 w-4 mr-2" />
                  Upgrade
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Appearance Section */}
          <Card className="bg-white/90 backdrop-blur-sm border-orange-100">
            <CardHeader>
              <CardTitle className="font-quicksand flex items-center gap-2">
                <Palette className="h-5 w-5 text-orange-500" />
                Appearance
              </CardTitle>
              <CardDescription>
                Customize the look and feel of LazyWrite
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700">Theme</label>
                  <p className="text-sm text-gray-500">Choose your preferred color scheme</p>
                </div>
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger className="w-40 bg-orange-50/50 border-orange-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="comfort">Comfort Orange</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Handwriting Preferences */}
          <Card className="bg-white/90 backdrop-blur-sm border-orange-100">
            <CardHeader>
              <CardTitle className="font-quicksand flex items-center gap-2">
                <PenTool className="h-5 w-5 text-orange-500" />
                Handwriting Preferences
              </CardTitle>
              <CardDescription>
                Fine-tune your default handwriting characteristics
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">Slant Level</label>
                  <span className="text-sm text-gray-500">{slantLevel[0]}/10</span>
                </div>
                <Slider
                  value={slantLevel}
                  onValueChange={setSlantLevel}
                  max={10}
                  step={1}
                  className="w-full"
                />
                <p className="text-xs text-gray-500">
                  Controls how much your handwriting leans (0 = straight, 10 = very slanted)
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">Pressure</label>
                  <span className="text-sm text-gray-500">{pressureLevel[0]}/10</span>
                </div>
                <Slider
                  value={pressureLevel}
                  onValueChange={setPressureLevel}
                  max={10}
                  step={1}
                  className="w-full"
                />
                <p className="text-xs text-gray-500">
                  Controls line thickness and darkness (1 = light, 10 = heavy)
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">Randomness</label>
                  <span className="text-sm text-gray-500">{randomnessLevel[0]}/10</span>
                </div>
                <Slider
                  value={randomnessLevel}
                  onValueChange={setRandomnessLevel}
                  max={10}
                  step={1}
                  className="w-full"
                />
                <p className="text-xs text-gray-500">
                  Controls natural variations in your handwriting (0 = perfect, 10 = very messy)
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Account Actions */}
          <Card className="bg-white/90 backdrop-blur-sm border-orange-100">
            <CardHeader>
              <CardTitle className="font-quicksand text-gray-900">Account Actions</CardTitle>
              <CardDescription>
                Manage your account and data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={handleSignOut}
                variant="outline" 
                className="w-full border-red-200 text-red-600 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
