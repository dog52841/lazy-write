
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Crown, Zap, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

interface GenerationStatusProps {
  generationsLeft: number;
  maxGenerations: number;
  isPremium?: boolean;
}

const GenerationStatus = ({ generationsLeft, maxGenerations, isPremium = false }: GenerationStatusProps) => {
  const percentage = (generationsLeft / maxGenerations) * 100;
  
  return (
    <Card className="bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200 shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-full">
              <Zap className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <h3 className="font-quicksand font-semibold text-gray-900">
                {isPremium ? 'Premium Plan' : 'Free Plan'}
              </h3>
              <p className="text-sm text-gray-600">
                {generationsLeft} of {maxGenerations} generations remaining today
              </p>
            </div>
          </div>
          
          {!isPremium && (
            <Link to="/pricing">
              <Button size="sm" className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white">
                <Crown className="h-4 w-4 mr-1" />
                Upgrade
              </Button>
            </Link>
          )}
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Daily Usage</span>
            <Badge 
              variant={generationsLeft > 0 ? "outline" : "destructive"}
              className={generationsLeft > 0 ? "border-orange-300 text-orange-700 bg-orange-50" : ""}
            >
              {generationsLeft > 0 ? `${generationsLeft} left` : 'Limit reached'}
            </Badge>
          </div>
          
          <Progress 
            value={percentage} 
            className="h-2"
          />
          
          {generationsLeft === 0 && !isPremium && (
            <div className="flex items-center gap-2 mt-3 p-3 bg-orange-100 rounded-lg">
              <Sparkles className="h-4 w-4 text-orange-600" />
              <span className="text-sm text-orange-800">
                Upgrade to Premium for unlimited daily generations!
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GenerationStatus;
