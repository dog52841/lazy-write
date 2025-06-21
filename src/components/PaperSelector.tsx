
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Crown, FileText, Sparkles } from "lucide-react";
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
    <Card className="glass-effect border-0 shadow-lg card-hover">
      <CardHeader className="bg-gradient-to-r from-green-50 to-teal-50 border-b">
        <CardTitle className="font-display flex items-center gap-3">
          <div className="relative">
            <FileText className="h-6 w-6 text-green-600" />
            <Sparkles className="h-3 w-3 text-teal-500 absolute -bottom-1 -right-1" />
          </div>
          Paper Background
          {isPremium && (
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold px-3 py-1">
              <Crown className="h-3 w-3 mr-1" />
              Premium
            </Badge>
          )}
        </CardTitle>
        <CardDescription className="text-gray-600">
          Choose from {isPremium ? '8' : '3'} realistic paper styles
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          {availableBackgrounds.map((bg) => (
            <Button
              key={bg.id}
              variant={value === bg.id ? "default" : "outline"}
              className={`h-24 flex-col gap-3 relative p-4 rounded-xl transition-all duration-300 ${
                value === bg.id 
                  ? "bg-gradient-to-br from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white border-green-500 shadow-lg animate-pulse-glow" 
                  : "border-green-200 text-gray-700 hover:bg-green-50 hover:border-green-300 card-hover"
              }`}
              onClick={() => onChange(bg.id)}
            >
              <div className={`w-12 h-12 rounded-lg border-2 ${bg.preview} ${
                value === bg.id ? "border-white shadow-inner" : "border-gray-300"
              } relative overflow-hidden`}>
                {bg.id === 'lined' && (
                  <div className="w-full h-full relative">
                    <div className="absolute inset-0 flex flex-col justify-evenly">
                      <div className="w-full h-px bg-blue-400 opacity-70"></div>
                      <div className="w-full h-px bg-blue-400 opacity-70"></div>
                      <div className="w-full h-px bg-blue-400 opacity-70"></div>
                      <div className="w-full h-px bg-blue-400 opacity-70"></div>
                    </div>
                    <div className="absolute left-2 top-0 bottom-0 w-px bg-red-300 opacity-60"></div>
                  </div>
                )}
                {bg.id === 'grid' && (
                  <div className="w-full h-full relative">
                    <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-0">
                      {Array.from({ length: 16 }).map((_, i) => (
                        <div key={i} className="border-r border-b border-gray-400 opacity-50 last:border-r-0"></div>
                      ))}
                    </div>
                  </div>
                )}
                {bg.id === 'notebook' && (
                  <div className="w-full h-full relative bg-blue-50">
                    <div className="absolute left-1 top-1 w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                    <div className="absolute left-1 bottom-1 w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                    <div className="absolute inset-2 border-l-2 border-red-200 opacity-60"></div>
                  </div>
                )}
                {bg.id === 'vintage' && (
                  <div className="w-full h-full bg-gradient-to-br from-amber-100 to-yellow-200 relative">
                    <div className="absolute inset-0 opacity-30">
                      {Array.from({ length: 8 }).map((_, i) => (
                        <div 
                          key={i} 
                          className="absolute w-1 h-1 bg-amber-600 rounded-full" 
                          style={{
                            left: `${Math.random() * 80}%`,
                            top: `${Math.random() * 80}%`
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <span className="text-sm font-semibold">{bg.name}</span>
              
              {isPremium && !PAPER_BACKGROUNDS.free.some(f => f.id === bg.id) && (
                <Crown className="h-3 w-3 text-amber-400 absolute top-2 right-2" />
              )}
            </Button>
          ))}
        </div>
        
        {!isPremium && (
          <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl">
            <div className="flex items-center gap-3">
              <Crown className="h-5 w-5 text-amber-600" />
              <div>
                <div className="font-semibold text-amber-800">Premium Paper Collection</div>
                <div className="text-sm text-amber-700">
                  Unlock 5 more professional paper backgrounds including vintage parchment!
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PaperSelector;
