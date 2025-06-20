
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Crown, Palette } from "lucide-react";

interface FontSelectorProps {
  value: string;
  onChange: (value: string) => void;
  isPremium: boolean;
}

const FontSelector = ({ value, onChange, isPremium }: FontSelectorProps) => {
  // Free plan fonts (5 total: 2 cursive + 3 print)
  const freeFonts = [
    { id: 'caveat', name: 'Caveat', type: 'cursive', className: 'font-caveat' },
    { id: 'dancing-script', name: 'Dancing Script', type: 'cursive', className: 'font-dancing-script' },
    { id: 'inter', name: 'Inter', type: 'print', className: 'font-sans' },
    { id: 'comic-neue', name: 'Comic Neue', type: 'print', className: 'font-comic-neue' },
    { id: 'kalam', name: 'Kalam', type: 'print', className: 'font-kalam' },
  ];

  // Premium fonts (30+ total with 10+ cursive)
  const premiumFonts = [
    ...freeFonts,
    // Additional cursive fonts
    { id: 'architects-daughter', name: 'Architects Daughter', type: 'cursive', className: 'font-architects-daughter' },
    { id: 'indie-flower', name: 'Indie Flower', type: 'cursive', className: 'font-indie-flower' },
    { id: 'shadows-into-light', name: 'Shadows Into Light', type: 'cursive', className: 'font-shadows-into-light' },
    { id: 'permanent-marker', name: 'Permanent Marker', type: 'cursive', className: 'font-permanent-marker' },
    { id: 'covered-by-your-grace', name: 'Covered By Your Grace', type: 'cursive', className: 'font-covered-by-your-grace' },
    { id: 'handlee', name: 'Handlee', type: 'cursive', className: 'font-handlee' },
    { id: 'schoolbell', name: 'Schoolbell', type: 'cursive', className: 'font-schoolbell' },
    { id: 'satisfy', name: 'Satisfy', type: 'cursive', className: 'font-satisfy' },
    { id: 'great-vibes', name: 'Great Vibes', type: 'cursive', className: 'font-great-vibes' },
    { id: 'allura', name: 'Allura', type: 'cursive', className: 'font-allura' },
    { id: 'alex-brush', name: 'Alex Brush', type: 'cursive', className: 'font-alex-brush' },
    { id: 'pinyon-script', name: 'Pinyon Script', type: 'cursive', className: 'font-pinyon-script' },
    { id: 'sacramento', name: 'Sacramento', type: 'cursive', className: 'font-sacramento' },
    { id: 'tangerine', name: 'Tangerine', type: 'cursive', className: 'font-tangerine' },
    { id: 'kaushan-script', name: 'Kaushan Script', type: 'cursive', className: 'font-kaushan-script' },
    { id: 'marck-script', name: 'Marck Script', type: 'cursive', className: 'font-marck-script' },
    { id: 'mr-dafoe', name: 'Mr Dafoe', type: 'cursive', className: 'font-mr-dafoe' },
    { id: 'yellowtail', name: 'Yellowtail', type: 'cursive', className: 'font-yellowtail' },
    // Additional print fonts
    { id: 'amatic-sc', name: 'Amatic SC', type: 'print', className: 'font-amatic-sc' },
    { id: 'pacifico', name: 'Pacifico', type: 'print', className: 'font-pacifico' },
    { id: 'lobster', name: 'Lobster', type: 'print', className: 'font-lobster' },
    { id: 'courgette', name: 'Courgette', type: 'print', className: 'font-courgette' },
    { id: 'righteous', name: 'Righteous', type: 'print', className: 'font-righteous' },
    { id: 'fredoka-one', name: 'Fredoka One', type: 'print', className: 'font-fredoka-one' },
    { id: 'bungee', name: 'Bungee', type: 'print', className: 'font-bungee' },
    { id: 'orbitron', name: 'Orbitron', type: 'print', className: 'font-orbitron' },
    { id: 'rajdhani', name: 'Rajdhani', type: 'print', className: 'font-rajdhani' },
    { id: 'exo-2', name: 'Exo 2', type: 'print', className: 'font-exo-2' },
    { id: 'playfair-display', name: 'Playfair Display', type: 'print', className: 'font-display' },
  ];

  const availableFonts = isPremium ? premiumFonts : freeFonts;
  const cursiveFonts = availableFonts.filter(font => font.type === 'cursive');
  const printFonts = availableFonts.filter(font => font.type === 'print');

  const getPreviewText = (type: string) => {
    return type === 'cursive' ? 'The quick brown fox jumps over the lazy dog' : 'The quick brown fox jumps over the lazy dog';
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-5 w-5 text-orange-500" />
          Font Selection
          {!isPremium && (
            <Badge variant="outline" className="ml-auto border-orange-300 text-orange-600">
              Free Plan: {freeFonts.length} fonts
            </Badge>
          )}
          {isPremium && (
            <Badge className="ml-auto bg-orange-500 text-white">
              Premium: {premiumFonts.length}+ fonts
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-3 block">
            Choose Your Font
          </label>
          <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a font..." />
            </SelectTrigger>
            <SelectContent className="max-h-80 overflow-y-auto">
              {/* Cursive Fonts Section */}
              <div className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-50">
                ✒️ Cursive Fonts ({cursiveFonts.length})
              </div>
              {cursiveFonts.map((font) => (
                <SelectItem key={font.id} value={font.id}>
                  <div className="flex flex-col w-full">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{font.name}</span>
                      {!isPremium && premiumFonts.some(pf => pf.id === font.id && !freeFonts.some(ff => ff.id === font.id)) && (
                        <Crown className="h-3 w-3 text-orange-500 ml-2" />
                      )}
                    </div>
                    <div className={`text-sm text-gray-600 mt-1 ${font.className}`}>
                      {getPreviewText(font.type)}
                    </div>
                  </div>
                </SelectItem>
              ))}
              
              {/* Print Fonts Section */}
              <div className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-50 mt-2">
                🖊️ Print Fonts ({printFonts.length})
              </div>
              {printFonts.map((font) => (
                <SelectItem key={font.id} value={font.id}>
                  <div className="flex flex-col w-full">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{font.name}</span>
                      {!isPremium && premiumFonts.some(pf => pf.id === font.id && !freeFonts.some(ff => ff.id === font.id)) && (
                        <Crown className="h-3 w-3 text-orange-500 ml-2" />
                      )}
                    </div>
                    <div className={`text-sm text-gray-600 mt-1 ${font.className}`}>
                      {getPreviewText(font.type)}
                    </div>
                  </div>
                </SelectItem>
              ))}

              {/* Premium Upgrade Prompt for Free Users */}
              {!isPremium && (
                <div className="px-2 py-3 mt-2 bg-orange-50 border-t">
                  <div className="text-center">
                    <Crown className="h-4 w-4 text-orange-500 mx-auto mb-1" />
                    <p className="text-xs text-orange-600 font-medium">
                      Upgrade to Premium for {premiumFonts.length - freeFonts.length}+ more fonts
                    </p>
                  </div>
                </div>
              )}
            </SelectContent>
          </Select>
          
          {/* Font Preview */}
          {value && (
            <div className="mt-4 p-4 border rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50">
              <label className="text-xs font-medium text-gray-500 mb-2 block">Preview:</label>
              <div className={`text-lg ${availableFonts.find(f => f.id === value)?.className || ''}`}>
                The quick brown fox jumps over the lazy dog. 
                This is how your handwriting will look!
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FontSelector;
