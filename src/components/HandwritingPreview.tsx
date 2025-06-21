
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Download, RotateCcw, Wand2 } from "lucide-react";

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
      case 'dancing-script': return 'font-handwriting text-2xl';
      case 'great-vibes': return 'font-handwriting text-2xl';
      case 'caveat': return 'font-casual text-xl';
      case 'roboto': return 'font-sans text-lg';
      case 'open-sans': return 'font-sans text-lg';
      case 'lato': return 'font-sans text-lg';
      default: return 'font-handwriting text-xl';
    }
  };

  return (
    <Card className="glass-effect border-0 shadow-2xl card-hover overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-display text-gray-900 flex items-center gap-3">
              <Wand2 className="h-6 w-6 text-blue-600" />
              Handwriting Preview
            </CardTitle>
            <CardDescription className="text-gray-600 mt-1">
              Your AI-generated handwriting will appear here
            </CardDescription>
          </div>
          {style && (
            <Badge 
              variant="outline" 
              className="border-blue-300 text-blue-700 bg-blue-50 px-3 py-1 font-medium"
            >
              {style.charAt(0).toUpperCase() + style.slice(1).replace('-', ' ')}
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="p-8">
        <div className="relative">
          {/* Enhanced Paper Background */}
          <div className="bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/30 rounded-2xl p-8 border-2 border-blue-100 min-h-[500px] paper-texture relative overflow-hidden shadow-inner">
            {/* Decorative elements */}
            <div className="absolute top-4 left-4 w-8 h-8 bg-red-100 rounded-full opacity-60"></div>
            <div className="absolute top-4 left-16 w-8 h-8 bg-red-100 rounded-full opacity-60"></div>
            <div className="absolute top-4 left-28 w-8 h-8 bg-red-100 rounded-full opacity-60"></div>
            
            {/* Red margin line */}
            <div className="absolute left-16 top-0 bottom-0 w-px bg-red-200 opacity-60"></div>
            
            {/* Notebook lines */}
            <div className="absolute inset-0 opacity-20 notebook-lines"></div>
            
            {/* Content */}
            {generatedImage ? (
              <div className="relative z-10 flex justify-center">
                <img 
                  src={generatedImage} 
                  alt="Generated handwriting" 
                  className="max-w-full h-auto rounded-xl shadow-lg border border-gray-200" 
                />
              </div>
            ) : text ? (
              <div className="relative z-10 space-y-4 pl-8 pt-4">
                {text.split('\n').slice(0, 12).map((line, index) => (
                  <div 
                    key={index} 
                    className={`${getStyleFont(style)} text-gray-800 leading-relaxed transition-all duration-300`}
                    style={{ 
                      transform: `rotate(${Math.random() * 0.8 - 0.4}deg)`,
                      marginLeft: `${Math.random() * 6}px`,
                      animationDelay: `${index * 0.1}s`
                    }}
                  >
                    {line || '\u00A0'}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-center text-gray-400 relative z-10">
                <div className="animate-float">
                  <Sparkles className="h-20 w-20 mx-auto mb-6 opacity-50 text-blue-400" />
                  <h3 className="text-2xl font-display font-semibold mb-2 text-gray-600">
                    Ready to Create Magic?
                  </h3>
                  <p className="text-lg text-gray-500">
                    Enter your text and watch it transform into beautiful handwriting
                  </p>
                </div>
              </div>
            )}
          </div>
          
          {/* Enhanced Action Buttons */}
          <div className="flex flex-wrap gap-4 mt-8">
            <Button 
              onClick={onGenerate}
              disabled={isGenerating || !text.trim() || !style}
              className="flex-1 min-w-[200px] bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-xl button-glow text-lg py-6 rounded-xl font-semibold"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="h-5 w-5 mr-3 animate-spin" />
                  Generating Magic...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5 mr-3" />
                  Generate Handwriting
                </>
              )}
            </Button>
            
            {generatedImage && (
              <div className="flex gap-3">
                <Button 
                  onClick={handleDownload}
                  variant="outline" 
                  className="border-blue-200 text-blue-600 hover:bg-blue-50 px-6 py-6 rounded-xl font-medium"
                >
                  <Download className="h-5 w-5 mr-2" />
                  Download
                </Button>
                <Button 
                  onClick={handleReset}
                  variant="outline" 
                  className="border-gray-200 text-gray-600 hover:bg-gray-50 px-6 py-6 rounded-xl font-medium"
                >
                  <RotateCcw className="h-5 w-5 mr-2" />
                  Reset
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HandwritingPreview;
