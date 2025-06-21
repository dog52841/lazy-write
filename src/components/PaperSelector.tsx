
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Crown, FileText } from "lucide-react";
import { PAPER_BACKGROUNDS } from "@/services/handwritingService";

interface PaperSelectorProps {
  value: string;
  onChange: (value: string) => void;
  isPremium: boolean;
}

const PaperSelector = ({ value, onChange, isPremium }: PaperSelectorProps) => {
  const availableBackgrounds = isPremium 
    ? PAPER_BACKGROUNDS.premium 
    : PAPER_BACKGROUNDS.free;

  return (
    <Card className="bg-white/95 backdrop-blur-sm border-orange-100 shadow-lg">
      <CardHeader>
        <CardTitle className="font-quicksand flex items-center gap-2">
          <FileText className="h-5 w-5 text-orange-500" />
          Paper Background
          {isPremium && (
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
              <Crown className="h-3 w-3 mr-1" />
              Premium
            </Badge>
          )}
        </CardTitle>
        <CardDescription>
          Choose from {isPremium ? '8' : '3'} paper styles
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {availableBackgrounds.map((bg) => (
            <Button
              key={bg.id}
              variant={value === bg.id ? "default" : "outline"}
              className={`h-20 flex-col gap-2 relative ${
                value === bg.id 
                  ? "bg-orange-500 hover:bg-orange-600 text-white border-orange-500" 
                  : "border-orange-200 text-gray-600 hover:bg-orange-50 hover:border-orange-300"
              }`}
              onClick={() => onChange(bg.id)}
            >
              <div className={`w-8 h-8 rounded border-2 ${bg.preview} ${
                value === bg.id ? "border-white" : "border-gray-300"
              }`}>
                {bg.id === 'lined' && (
                  <div className="w-full h-full relative">
                    <div className="absolute inset-0 flex flex-col justify-evenly">
                      <div className="w-full h-px bg-blue-300 opacity-60"></div>
                      <div className="w-full h-px bg-blue-300 opacity-60"></div>
                      <div className="w-full h-px bg-blue-300 opacity-60"></div>
                    </div>
                  </div>
                )}
                {bg.id === 'grid' && (
                  <div className="w-full h-full relative">
                    <div className="absolute inset-0 grid grid-cols-4 grid-rows-4">
                      {Array.from({ length: 16 }).map((_, i) => (
                        <div key={i} className="border-r border-b border-gray-300 opacity-40 last:border-r-0"></div>
                      ))}
                    </div>
                  </div>
                )}
                {bg.id === 'notebook' && (
                  <div className="w-full h-full relative bg-blue-50">
                    <div className="absolute left-1 top-1 w-1 h-1 bg-gray-400 rounded-full"></div>
                    <div className="absolute left-1 bottom-1 w-1 h-1 bg-gray-400 rounded-full"></div>
                  </div>
                )}
              </div>
              <span className="text-xs font-medium">{bg.name}</span>
              {isPremium && !PAPER_BACKGROUNDS.free.some(f => f.id === bg.id) && (
                <Crown className="h-3 w-3 text-orange-400 absolute top-1 right-1" />
              )}
            </Button>
          ))}
        </div>
        
        {!isPremium && (
          <div className="mt-4 p-3 bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-lg">
            <div className="flex items-center gap-2">
              <Crown className="h-4 w-4 text-orange-500" />
              <span className="text-sm text-orange-700">
                Upgrade to Premium to unlock 5 more paper backgrounds!
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PaperSelector;
