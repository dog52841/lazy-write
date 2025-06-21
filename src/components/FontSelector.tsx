
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Crown, Type } from "lucide-react";
import { FONT_COLLECTIONS } from "@/services/handwritingService";

interface FontSelectorProps {
  value: string;
  onChange: (value: string) => void;
  isPremium: boolean;
}

const FontSelector = ({ value, onChange, isPremium }: FontSelectorProps) => {
  const availableFonts = isPremium 
    ? [...FONT_COLLECTIONS.premium.cursive, ...FONT_COLLECTIONS.premium.printed]
    : [...FONT_COLLECTIONS.free.cursive, ...FONT_COLLECTIONS.free.printed];

  const cursiveFonts = availableFonts.filter(font => 
    isPremium 
      ? FONT_COLLECTIONS.premium.cursive.includes(font)
      : FONT_COLLECTIONS.free.cursive.includes(font)
  );

  const printedFonts = availableFonts.filter(font => 
    isPremium 
      ? FONT_COLLECTIONS.premium.printed.includes(font)
      : FONT_COLLECTIONS.free.printed.includes(font)
  );

  return (
    <Card className="bg-white/95 backdrop-blur-sm border-orange-100 shadow-lg">
      <CardHeader>
        <CardTitle className="font-quicksand flex items-center gap-2">
          <Type className="h-5 w-5 text-orange-500" />
          Font Selection
          {isPremium && (
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
              <Crown className="h-3 w-3 mr-1" />
              Premium
            </Badge>
          )}
        </CardTitle>
        <CardDescription>
          Choose from {isPremium ? '25' : '5'} professional handwriting fonts
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Handwriting Style
          </label>
          <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="bg-gradient-to-r from-orange-50/50 to-yellow-50/50 border-orange-200 focus:border-orange-400">
              <SelectValue placeholder="Choose a font..." />
            </SelectTrigger>
            <SelectContent className="bg-white border-orange-100 shadow-xl max-h-80">
              {cursiveFonts.length > 0 && (
                <>
                  <div className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-50">
                    Cursive Fonts ({cursiveFonts.length})
                  </div>
                  {cursiveFonts.map((font) => (
                    <SelectItem key={font.id} value={font.id} className="hover:bg-orange-50">
                      <div className="flex items-center justify-between w-full">
                        <span style={{ fontFamily: font.family }} className="font-medium text-lg">
                          {font.name}
                        </span>
                        {isPremium && !FONT_COLLECTIONS.free.cursive.some(f => f.id === font.id) && (
                          <Crown className="h-3 w-3 text-orange-500 ml-2" />
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </>
              )}
              
              {printedFonts.length > 0 && (
                <>
                  <div className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-50">
                    Printed Fonts ({printedFonts.length})
                  </div>
                  {printedFonts.map((font) => (
                    <SelectItem key={font.id} value={font.id} className="hover:bg-orange-50">
                      <div className="flex items-center justify-between w-full">
                        <span style={{ fontFamily: font.family }} className="font-medium">
                          {font.name}
                        </span>
                        {isPremium && !FONT_COLLECTIONS.free.printed.some(f => f.id === font.id) && (
                          <Crown className="h-3 w-3 text-orange-500 ml-2" />
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </>
              )}
            </SelectContent>
          </Select>
          
          {!isPremium && (
            <div className="mt-2 p-3 bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-lg">
              <div className="flex items-center gap-2">
                <Crown className="h-4 w-4 text-orange-500" />
                <span className="text-sm text-orange-700">
                  Upgrade to Premium to unlock 20 more professional fonts!
                </span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FontSelector;
