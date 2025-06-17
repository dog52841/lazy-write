
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PenTool, Upload, Sparkles } from "lucide-react";

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  maxLines: number;
}

const TextInput = ({ value, onChange, maxLines }: TextInputProps) => {
  const lineCount = value.split('\n').length;
  const isOverLimit = lineCount > maxLines;

  const handleSampleText = () => {
    const samples = [
      "Dear Teacher,\n\nI hope this letter finds you well. I wanted to thank you for all your help this semester.",
      "The quick brown fox jumps over the lazy dog. This sentence contains every letter of the alphabet.",
      "To be or not to be, that is the question. Whether 'tis nobler in the mind to suffer...",
      "In a hole in the ground there lived a hobbit. Not a nasty, dirty, wet hole filled with worms..."
    ];
    const randomSample = samples[Math.floor(Math.random() * samples.length)];
    onChange(randomSample);
  };

  return (
    <Card className="bg-white/95 backdrop-blur-sm border-orange-100 shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-quicksand flex items-center gap-2">
              <PenTool className="h-5 w-5 text-orange-500" />
              Your Text
            </CardTitle>
            <CardDescription>
              Enter the text you want to convert to handwriting (max {maxLines} lines)
            </CardDescription>
          </div>
          <Button
            onClick={handleSampleText}
            variant="outline"
            size="sm"
            className="border-orange-200 text-orange-600 hover:bg-orange-50"
          >
            <Sparkles className="h-4 w-4 mr-1" />
            Sample
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Textarea
            placeholder="Dear Teacher,&#10;&#10;I hope this letter finds you well..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`min-h-[200px] bg-gradient-to-br from-orange-50/50 to-yellow-50/50 border-orange-200 focus:border-orange-400 resize-none transition-all duration-200 ${
              isOverLimit ? 'border-red-300 focus:border-red-400 bg-red-50/50' : ''
            }`}
          />
          {isOverLimit && (
            <div className="absolute top-2 right-2">
              <Badge variant="destructive" className="text-xs">
                Too many lines!
              </Badge>
            </div>
          )}
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className={`text-sm ${isOverLimit ? 'text-red-500 font-medium' : 'text-gray-500'}`}>
              {lineCount}/{maxLines} lines
            </span>
            {!isOverLimit && lineCount > maxLines * 0.8 && (
              <Badge variant="outline" className="text-xs border-orange-200 text-orange-600">
                Almost at limit
              </Badge>
            )}
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-500 hover:text-gray-700"
          >
            <Upload className="h-4 w-4 mr-1" />
            Upload Text File
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TextInput;
