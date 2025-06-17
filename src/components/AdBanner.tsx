
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Zap, Crown, ExternalLink } from "lucide-react";
import { useState } from "react";

interface AdBannerProps {
  onWatchAd?: () => void;
  onClose?: () => void;
  showCloseButton?: boolean;
}

const AdBanner = ({ onWatchAd, onClose, showCloseButton = true }: AdBannerProps) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  const handleWatchAd = () => {
    // Simulate watching an ad
    console.log("Opening ad...");
    // In a real app, this would open an ad network
    setTimeout(() => {
      onWatchAd?.();
    }, 3000); // Simulate 3-second ad
  };

  if (!isVisible) return null;

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 shadow-lg mb-6">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-full">
              <Zap className="h-4 w-4 text-blue-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold text-gray-900">Get Extra Generations!</h4>
                <Badge variant="outline" className="border-blue-300 text-blue-700 bg-blue-50">
                  Free
                </Badge>
              </div>
              <p className="text-sm text-gray-600">
                Watch a quick ad to get 2 bonus generations today
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              onClick={handleWatchAd}
              size="sm" 
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              Watch Ad (+2)
            </Button>
            
            {showCloseButton && (
              <Button 
                onClick={handleClose}
                variant="ghost" 
                size="sm"
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
        
        <div className="mt-3 pt-3 border-t border-blue-100">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Or upgrade to Premium for unlimited generations</span>
            <Button variant="link" size="sm" className="h-auto p-0 text-xs text-blue-600">
              <Crown className="h-3 w-3 mr-1" />
              Upgrade Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdBanner;
