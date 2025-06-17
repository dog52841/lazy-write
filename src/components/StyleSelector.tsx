
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Palette, Upload, Crown } from "lucide-react";

interface StyleSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const StyleSelector = ({ value, onChange }: StyleSelectorProps) => {
  const styles = [
    { id: 'cursive', name: 'Elegant Cursive', description: 'Flowing, connected letters', premium: false },
    { id: 'print', name: 'Clean Print', description: 'Clear, separated letters', premium: false },
    { id: 'messy', name: 'Casual Messy', description: 'Natural, slightly chaotic', premium: false },
    { id: 'neat', name: 'Perfect Neat', description: 'Precise and orderly', premium: true },
    { id: 'vintage', name: 'Vintage Script', description: 'Old-fashioned elegance', premium: true },
  ];

  return (
    <Card className="bg-white/95 backdrop-blur-sm border-orange-100 shadow-lg">
      <CardHeader>
        <CardTitle className="font-quicksand flex items-center gap-2">
          <Palette className="h-5 w-5 text-orange-500" />
          Style & Settings
        </CardTitle>
        <CardDescription>
          Customize your handwriting appearance
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-3 block">
            Handwriting Style
          </label>
          <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="bg-gradient-to-r from-orange-50/50 to-yellow-50/50 border-orange-200 focus:border-orange-400">
              <SelectValue placeholder="Choose a style..." />
            </SelectTrigger>
            <SelectContent className="bg-white border-orange-100 shadow-xl">
              {styles.map((style) => (
                <SelectItem key={style.id} value={style.id} className="hover:bg-orange-50">
                  <div className="flex items-center justify-between w-full">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{style.name}</span>
                        {style.premium && (
                          <Crown className="h-3 w-3 text-orange-500" />
                        )}
                      </div>
                      <span className="text-xs text-gray-500">{style.description}</span>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {value && styles.find(s => s.id === value)?.premium && (
            <div className="mt-2">
              <Badge variant="outline" className="border-orange-300 text-orange-700 bg-orange-50">
                <Crown className="h-3 w-3 mr-1" />
                Premium Style
              </Badge>
            </div>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-3 block">
            Paper Background
          </label>
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              className="h-20 flex-col gap-2 border-orange-200 text-gray-600 hover:bg-orange-50 hover:border-orange-300"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded border"></div>
              <span className="text-xs">Lined Paper</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-20 flex-col gap-2 border-orange-200 text-gray-600 hover:bg-orange-50 hover:border-orange-300"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded border"></div>
              <span className="text-xs">Plain Paper</span>
            </Button>
          </div>
          
          <Button 
            variant="outline" 
            className="w-full mt-3 border-orange-200 text-gray-600 hover:bg-orange-50"
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload Custom Background
            <Crown className="h-3 w-3 ml-2 text-orange-500" />
          </Button>
          <p className="text-xs text-gray-500 mt-1 text-center">
            Upload notebook paper, letterhead, or any background (Premium)
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default StyleSelector;
