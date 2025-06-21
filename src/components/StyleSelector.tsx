
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Palette, Crown, Settings } from "lucide-react";

interface StyleSelectorProps {
  isPremium: boolean;
}

const StyleSelector = ({ isPremium }: StyleSelectorProps) => {
  return (
    <Card className="bg-white/95 backdrop-blur-sm border-orange-100 shadow-lg">
      <CardHeader>
        <CardTitle className="font-quicksand flex items-center gap-2">
          <Settings className="h-5 w-5 text-orange-500" />
          Advanced Settings
          {isPremium && (
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
              <Crown className="h-3 w-3 mr-1" />
              Premium
            </Badge>
          )}
        </CardTitle>
        <CardDescription>
          Fine-tune your handwriting generation
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">
              Font Size
            </label>
            <Button
              variant="outline"
              className="w-full border-orange-200 text-gray-600 hover:bg-orange-50"
              disabled={!isPremium}
            >
              {isPremium ? "24px" : "Auto"}
              {!isPremium && <Crown className="h-3 w-3 ml-2 text-orange-500" />}
            </Button>
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">
              Line Spacing
            </label>
            <Button
              variant="outline"
              className="w-full border-orange-200 text-gray-600 hover:bg-orange-50"
              disabled={!isPremium}
            >
              {isPremium ? "1.5x" : "Auto"}
              {!isPremium && <Crown className="h-3 w-3 ml-2 text-orange-500" />}
            </Button>
          </div>
        </div>
        
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-2">
            Writing Style Variation
          </label>
          <div className="grid grid-cols-3 gap-2">
            {['Neat', 'Natural', 'Messy'].map((style) => (
              <Button
                key={style}
                variant="outline"
                size="sm"
                className="border-orange-200 text-gray-600 hover:bg-orange-50"
                disabled={!isPremium}
              >
                {style}
                {!isPremium && <Crown className="h-3 w-3 ml-1 text-orange-500" />}
              </Button>
            ))}
          </div>
        </div>
        
        {!isPremium && (
          <div className="p-3 bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-lg">
            <div className="flex items-center gap-2">
              <Crown className="h-4 w-4 text-orange-500" />
              <span className="text-sm text-orange-700">
                Upgrade to Premium to access advanced customization options!
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StyleSelector;
