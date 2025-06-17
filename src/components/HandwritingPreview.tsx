
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Download, RotateCcw } from "lucide-react";

interface HandwritingPreviewProps {
  text: string;
  style: string;
  onGenerate: () => void;
  isGenerating: boolean;
  generatedImage?: string | null;
  onImageChange?: (image: string | null) => void;
}

const HandwritingPreview = ({ 
  text, 
  style, 
  onGenerate, 
  isGenerating, 
  generatedImage,
  onImageChange 
}: HandwritingPreviewProps) => {
  const handleDownload = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = 'handwriting.png';
      link.click();
    }
  };

  const handleReset = () => {
    onImageChange?.(null);
  };

  const getStyleFont = (style: string) => {
    switch (style) {
      case 'cursive': return 'font-handwriting text-lg';
      case 'print': return 'font-mono text-base';
      case 'messy': return 'font-handwriting text-lg transform -rotate-1';
      case 'neat': return 'font-serif text-base';
      case 'vintage': return 'font-handwriting text-xl';
      default: return 'font-handwriting text-lg';
    }
  };

  return (
    <Card className="bg-white/95 backdrop-blur-sm border-orange-100 shadow-xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-quicksand text-xl">Handwriting Preview</CardTitle>
            <CardDescription>Your AI-generated handwriting will appear here</CardDescription>
          </div>
          {style && (
            <Badge variant="outline" className="border-orange-300 text-orange-700 bg-orange-50">
              {style.charAt(0).toUpperCase() + style.slice(1)} Style
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Paper Background */}
          <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 rounded-xl p-8 border-2 border-blue-100 min-h-[400px] paper-texture relative overflow-hidden">
            {/* Notebook lines */}
            <div className="absolute inset-0 opacity-20">
              {Array.from({ length: 15 }, (_, i) => (
                <div key={i} className="border-b border-blue-200" style={{ top: `${(i + 1) * 24}px`, position: 'absolute', left: '32px', right: '32px' }} />
              ))}
            </div>
            
            {/* Generated or Preview Content */}
            {generatedImage ? (
              <div className="relative z-10">
                <img src={generatedImage} alt="Generated handwriting" className="w-full h-auto rounded-lg shadow-sm" />
              </div>
            ) : text ? (
              <div className="relative z-10 space-y-3 pl-8">
                {text.split('\n').slice(0, 10).map((line, index) => (
                  <div 
                    key={index} 
                    className={`${getStyleFont(style)} text-gray-800 leading-relaxed`}
                    style={{ 
                      transform: `rotate(${Math.random() * 0.5 - 0.25}deg)`,
                      marginLeft: `${Math.random() * 4}px`
                    }}
                  >
                    {line || '\u00A0'}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-center text-gray-400">
                <div>
                  <Sparkles className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium">Enter text to see preview</p>
                  <p className="text-sm">Your handwriting will appear here</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-3 mt-6">
            <Button 
              onClick={onGenerate}
              disabled={isGenerating || !text.trim() || !style}
              className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate Handwriting
                </>
              )}
            </Button>
            
            {generatedImage && (
              <>
                <Button 
                  onClick={handleDownload}
                  variant="outline" 
                  className="border-orange-200 text-orange-600 hover:bg-orange-50"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button 
                  onClick={handleReset}
                  variant="outline" 
                  className="border-gray-200 text-gray-600 hover:bg-gray-50"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HandwritingPreview;
