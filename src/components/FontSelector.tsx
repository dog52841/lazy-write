
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Crown, Type, Palette } from "lucide-react";
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
    <Card className="glass-effect border-0 shadow-lg card-hover">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b">
        <CardTitle className="font-display flex items-center gap-3">
          <div className="relative">
            <Type className="h-6 w-6 text-purple-600" />
            <Palette className="h-3 w-3 text-pink-500 absolute -bottom-1 -right-1" />
          </div>
          Font Selection
          {isPremium && (
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold px-3 py-1">
              <Crown className="h-3 w-3 mr-1" />
              Premium
            </Badge>
          )}
        </CardTitle>
        <CardDescription className="text-gray-600">
          Choose from {isPremium ? '25' : '5'} professional handwriting fonts
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-6 space-y-6">
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-3 block">
            Handwriting Style
          </label>
          <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="bg-gradient-to-r from-purple-50/50 to-pink-50/50 border-purple-200 focus:border-purple-400 h-12 text-lg rounded-xl">
              <SelectValue placeholder="Choose your perfect font..." />
            </SelectTrigger>
            <SelectContent className="bg-white border-purple-100 shadow-2xl max-h-80 rounded-xl">
              {cursiveFonts.length > 0 && (
                <>
                  <div className="px-3 py-2 text-sm font-bold text-purple-700 bg-purple-50 rounded-t-lg">
                    ✨ Cursive Fonts ({cursiveFonts.length})
                  </div>
                  {cursiveFonts.map((font) => (
                    <SelectItem 
                      key={font.id} 
                      value={font.id} 
                      className="hover:bg-purple-50 py-3 px-4 cursor-pointer"
                    >
                      <div className="flex items-center justify-between w-full">
                        <span 
                          style={{ fontFamily: font.family }} 
                          className="font-medium text-xl text-gray-800"
                        >
                          {font.name}
                        </span>
                        {isPremium && !FONT_COLLECTIONS.free.cursive.some(f => f.id === font.id) && (
                          <Crown className="h-4 w-4 text-amber-500 ml-2" />
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </>
              )}
              
              {printedFonts.length > 0 && (
                <>
                  <div className="px-3 py-2 text-sm font-bold text-blue-700 bg-blue-50 mt-2">
                    📝 Printed Fonts ({printedFonts.length})
                  </div>
                  {printedFonts.map((font) => (
                    <SelectItem 
                      key={font.id} 
                      value={font.id} 
                      className="hover:bg-blue-50 py-3 px-4 cursor-pointer"
                    >
                      <div className="flex items-center justify-between w-full">
                        <span 
                          style={{ fontFamily: font.family }} 
                          className="font-medium text-lg text-gray-800"
                        >
                          {font.name}
                        </span>
                        {isPremium && !FONT_COLLECTIONS.free.printed.some(f => f.id === font.id) && (
                          <Crown className="h-4 w-4 text-amber-500 ml-2" />
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </>
              )}
            </SelectContent>
          </Select>
          
          {!isPremium && (
            <div className="mt-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl">
              <div className="flex items-center gap-3">
                <Crown className="h-5 w-5 text-amber-600" />
                <div>
                  <div className="font-semibold text-amber-800">Unlock Premium Fonts</div>
                  <div className="text-sm text-amber-700">
                    Get access to 20 more professional fonts with premium!
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FontSelector;
