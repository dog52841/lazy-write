
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Crown, Zap, Sparkles, Gift } from "lucide-react";
import { Link } from "react-router-dom";

interface GenerationStatusProps {
  generationsLeft: number;
  maxGenerations: number;
  bonusGenerations?: number;
  isPremium?: boolean;
}

const GenerationStatus = ({ 
  generationsLeft, 
  maxGenerations, 
  bonusGenerations = 0,
  isPremium = false 
}: GenerationStatusProps) => {
  const totalGenerations = generationsLeft + bonusGenerations;
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
                {generationsLeft} regular + {bonusGenerations} bonus = {totalGenerations} total remaining
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
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Daily Usage</span>
            <div className="flex gap-2">
              <Badge 
                variant={generationsLeft > 0 ? "outline" : "destructive"}
                className={generationsLeft > 0 ? "border-orange-300 text-orange-700 bg-orange-50" : ""}
              >
                {generationsLeft} regular
              </Badge>
              {bonusGenerations > 0 && (
                <Badge 
                  variant="outline"
                  className="border-blue-300 text-blue-700 bg-blue-50"
                >
                  <Gift className="h-3 w-3 mr-1" />
                  {bonusGenerations} bonus
                </Badge>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-gray-500">
              <span>Regular generations</span>
              <span>{generationsLeft}/{maxGenerations}</span>
            </div>
            <Progress value={percentage} className="h-2" />
          </div>
          
          {bonusGenerations > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-blue-600">
                <span>Bonus generations (from ads)</span>
                <span>{bonusGenerations}</span>
              </div>
              <Progress value={100} className="h-1 bg-blue-100" />
            </div>
          )}
          
          {totalGenerations === 0 && !isPremium && (
            <div className="flex items-center gap-2 mt-3 p-3 bg-orange-100 rounded-lg">
              <Sparkles className="h-4 w-4 text-orange-600" />
              <span className="text-sm text-orange-800">
                Watch ads for bonus generations or upgrade to Premium for unlimited!
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GenerationStatus;
