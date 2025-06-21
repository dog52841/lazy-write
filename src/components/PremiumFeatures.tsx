
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Crown, Check, Zap, Infinity, Palette, FileText } from "lucide-react";
import { Link } from "react-router-dom";

interface PremiumFeaturesProps {
  isPremium: boolean;
}

const PremiumFeatures = ({ isPremium }: PremiumFeaturesProps) => {
  if (isPremium) {
    return (
      <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-300 shadow-xl">
        <CardHeader>
          <CardTitle className="font-quicksand flex items-center gap-2 text-orange-800">
            <Crown className="h-6 w-6 text-yellow-500" />
            Premium Active
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
              PRO
            </Badge>
          </CardTitle>
          <CardDescription className="text-orange-700">
            You have access to all premium features!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              <span className="text-sm text-gray-700">Unlimited generations</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              <span className="text-sm text-gray-700">25 premium fonts</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              <span className="text-sm text-gray-700">8 paper backgrounds</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              <span className="text-sm text-gray-700">PDF export</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200 shadow-xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-quicksand flex items-center gap-2 text-orange-800">
              <Crown className="h-6 w-6 text-orange-500" />
              Upgrade to Premium
            </CardTitle>
            <CardDescription className="text-orange-700">
              Unlock powerful features for professional handwriting
            </CardDescription>
          </div>
          <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-lg px-3 py-1">
            $7.99/mo
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-3">
          <div className="flex items-center gap-3 p-3 bg-white/70 rounded-lg">
            <Infinity className="h-5 w-5 text-orange-500" />
            <div>
              <div className="font-medium text-gray-800">Unlimited Generations</div>
              <div className="text-sm text-gray-600">No daily limits, generate as much as you need</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-white/70 rounded-lg">
            <Palette className="h-5 w-5 text-orange-500" />
            <div>
              <div className="font-medium text-gray-800">25 Premium Fonts</div>
              <div className="text-sm text-gray-600">15 cursive + 10 printed professional fonts</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-white/70 rounded-lg">
            <FileText className="h-5 w-5 text-orange-500" />
            <div>
              <div className="font-medium text-gray-800">Advanced Export</div>
              <div className="text-sm text-gray-600">PDF export + more paper backgrounds</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-white/70 rounded-lg">
            <Zap className="h-5 w-5 text-orange-500" />
            <div>
              <div className="font-medium text-gray-800">Priority Processing</div>
              <div className="text-sm text-gray-600">Faster generation with premium servers</div>
            </div>
          </div>
        </div>
        
        <Link to="/pricing">
          <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 text-lg shadow-lg">
            <Crown className="h-5 w-5 mr-2" />
            Upgrade Now - Start Free Trial
          </Button>
        </Link>
        
        <div className="text-center text-sm text-gray-600">
          7-day free trial • Cancel anytime • No hidden fees
        </div>
      </CardContent>
    </Card>
  );
};

export default PremiumFeatures;
