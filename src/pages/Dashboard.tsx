
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import { Sparkles, Download, Upload, Zap, Crown } from "lucide-react";
import { toast } from "sonner";

const Dashboard = () => {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationsLeft] = useState(2);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter some text to generate handwriting!");
      return;
    }
    
    if (!style) {
      toast.error("Please select a handwriting style!");
      return;
    }

    setIsGenerating(true);
    
    // Simulate generation
    setTimeout(() => {
      setIsGenerating(false);
      toast.success("Handwriting generated! ✍️");
    }, 3000);
  };

  const lineCount = prompt.split('\n').length;
  const isOverLimit = lineCount > 10;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-quicksand text-4xl font-bold text-gray-900 mb-2">
            Create Beautiful Handwriting
          </h1>
          <p className="text-gray-600 mb-4">
            Transform your text into authentic-looking handwritten notes
          </p>
          
          <div className="flex items-center justify-center gap-4">
            <Badge variant="outline" className="border-orange-200 text-orange-600">
              Free Plan: {generationsLeft} generations left today
            </Badge>
            <Button variant="outline" size="sm" className="border-orange-200 text-orange-600 hover:bg-orange-50">
              <Crown className="h-4 w-4 mr-1" />
              Upgrade to Premium
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <Card className="bg-white/90 backdrop-blur-sm border-orange-100">
              <CardHeader>
                <CardTitle className="font-quicksand flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-orange-500" />
                  Your Text
                </CardTitle>
                <CardDescription>
                  Enter the text you want to convert to handwriting (max 10 lines)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Dear Teacher,&#10;&#10;I hope this letter finds you well..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className={`min-h-[200px] bg-orange-50/50 border-orange-200 focus:border-orange-400 resize-none ${
                    isOverLimit ? 'border-red-300 focus:border-red-400' : ''
                  }`}
                />
                <div className="flex justify-between items-center mt-2">
                  <span className={`text-sm ${isOverLimit ? 'text-red-500' : 'text-gray-500'}`}>
                    {lineCount}/10 lines
                  </span>
                  {isOverLimit && (
                    <span className="text-sm text-red-500">Too many lines!</span>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border-orange-100">
              <CardHeader>
                <CardTitle className="font-quicksand">Style & Settings</CardTitle>
                <CardDescription>
                  Customize your handwriting appearance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Handwriting Style
                  </label>
                  <Select value={style} onValueChange={setStyle}>
                    <SelectTrigger className="bg-orange-50/50 border-orange-200">
                      <SelectValue placeholder="Choose a style..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cursive">Elegant Cursive</SelectItem>
                      <SelectItem value="print">Clean Print</SelectItem>
                      <SelectItem value="messy">Casual Messy</SelectItem>
                      <SelectItem value="neat">Perfect Neat</SelectItem>
                      <SelectItem value="vintage">Vintage Script</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Paper Background
                  </label>
                  <Button variant="outline" className="w-full border-orange-200 text-gray-600 hover:bg-orange-50">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Paper Background (Premium)
                  </Button>
                  <p className="text-xs text-gray-500 mt-1">
                    Upload notebook paper, lined paper, or any background
                  </p>
                </div>
              </CardContent>
            </Card>

            <Button 
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim() || !style || isOverLimit}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-6 text-lg font-semibold"
            >
              {isGenerating ? (
                <>
                  <Zap className="h-5 w-5 mr-2 animate-spin" />
                  Generating Magic...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5 mr-2" />
                  Generate Handwriting
                </>
              )}
            </Button>
          </div>

          {/* Preview Section */}
          <div>
            <Card className="bg-white/90 backdrop-blur-sm border-orange-100 h-fit">
              <CardHeader>
                <CardTitle className="font-quicksand">Live Preview</CardTitle>
                <CardDescription>
                  Your handwritten text will appear here
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-100 min-h-[400px] flex items-center justify-center">
                  {prompt ? (
                    <div className="bg-white rounded-lg p-6 shadow-sm w-full">
                      <div className="space-y-3">
                        {prompt.split('\n').slice(0, 10).map((line, index) => (
                          <div key={index} className="text-lg text-gray-700 font-handwriting leading-relaxed">
                            {line || '\u00A0'}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-gray-400">
                      <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Enter text to see preview</p>
                    </div>
                  )}
                </div>
                
                {prompt && (
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" className="flex-1 border-orange-200 text-orange-600 hover:bg-orange-50">
                      <Download className="h-4 w-4 mr-2" />
                      Download PNG
                    </Button>
                    <Button variant="outline" className="flex-1 border-orange-200 text-orange-600 hover:bg-orange-50">
                      <Download className="h-4 w-4 mr-2" />
                      Print
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
