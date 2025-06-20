
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Sparkles, 
  Download, 
  RotateCcw, 
  Crown, 
  IndianRupee, 
  Loader2,
  Settings,
  Zap,
  Image as ImageIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import FontSelector from "@/components/FontSelector";
import ImprovedTextInput from "@/components/ImprovedTextInput";
import HandwritingPreview from "@/components/HandwritingPreview";
import { toast } from "sonner";
import { useAuth } from '@/contexts/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [text, setText] = useState("");
  const [selectedFont, setSelectedFont] = useState("caveat");
  const [ruledLines, setRuledLines] = useState(true);
  const [paperStyle, setPaperStyle] = useState("lined");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  
  // This should come from your auth context or user data
  const isPremium = false;
  const generationsUsed = 2;
  const generationsLimit = isPremium ? Infinity : 3;
  
  const handleGenerate = async () => {
    if (!text.trim()) {
      toast.error("Please enter some text to generate.");
      return;
    }
    
    if (!user) {
      toast.error("You must be logged in to generate handwriting.");
      return;
    }

    if (!isPremium && generationsUsed >= generationsLimit) {
      toast.error("You've reached your daily limit. Upgrade to Premium for unlimited generations!");
      return;
    }
    
    setIsGenerating(true);
    setGeneratedImage(null);

    const formData = new FormData();
    formData.append("user_id", user.id);
    formData.append('prompt', text);
    formData.append('style', selectedFont);
    formData.append('ruled_lines', String(ruledLines));
    formData.append('paper_style', paperStyle);
    formData.append('is_premium', String(isPremium));

    try {
      const response = await fetch("http://localhost:8000/api/generate", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to generate handwriting.");
      }
      
      const result = await response.json();
      setGeneratedImage(result.imageUrl);
      
      toast.success("Handwriting generated successfully! ✨");

    } catch (error) {
      console.error("Generation error:", error);
      toast.error("An error occurred during generation. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = `handwriting-${Date.now()}.png`;
      link.click();
      toast.success("Image downloaded!");
    }
  };

  const handleReset = () => {
    setGeneratedImage(null);
    toast.info("Preview cleared");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50">
      <Navbar />
      
      {/* Premium Upgrade Banner for Free Users */}
      {!isPremium && (
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-gradient-to-r from-orange-500 to-amber-500 text-white"
        >
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Crown className="h-5 w-5" />
              <span className="font-semibold">Upgrade to Premium</span>
              <Badge className="bg-white/20 text-white border-white/30">
                <IndianRupee className="h-3 w-3 mr-1" />
                432/mo
              </Badge>
              <span className="text-orange-100 text-sm">
                • Unlimited generations • 30+ fonts • Custom backgrounds
              </span>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-white/10 border-white/30 text-white hover:bg-white/20"
            >
              <Zap className="h-4 w-4 mr-2" />
              Upgrade Now
            </Button>
          </div>
        </motion.div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            AI Handwriting Generator
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Transform your text into beautiful, realistic handwriting
          </p>
          
          {/* Usage Stats */}
          <div className="flex items-center justify-center gap-4 text-sm">
            <Badge variant="outline" className="px-3 py-1">
              {isPremium ? "Unlimited" : `${generationsUsed}/${generationsLimit} used today`}
            </Badge>
            <Badge variant="outline" className="px-3 py-1">
              {isPremium ? "Premium" : "Free Plan"}
            </Badge>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel: Controls */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1 space-y-6"
          >
            {/* Text Input */}
            <ImprovedTextInput 
              value={text}
              onChange={setText}
              maxLines={10}
            />

            {/* Font Selection */}
            <FontSelector 
              value={selectedFont}
              onChange={setSelectedFont}
              isPremium={isPremium}
            />

            {/* Paper Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-gray-500" />
                  Paper Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium text-gray-700">Ruled Lines</label>
                    <p className="text-sm text-gray-500">Add notebook-style lines</p>
                  </div>
                  <Switch 
                    checked={ruledLines} 
                    onCheckedChange={setRuledLines}
                  />
                </div>

                <Separator />

                <div>
                  <label className="font-medium text-gray-700 block mb-3">Paper Background</label>
                  <div className="grid grid-cols-2 gap-3">
                    <Button 
                      variant={paperStyle === "lined" ? "default" : "outline"}
                      onClick={() => setPaperStyle("lined")}
                      className="h-16 flex-col gap-2"
                    >
                      <div className="w-6 h-6 bg-gradient-to-br from-blue-100 to-blue-200 rounded border"></div>
                      <span className="text-xs">Lined</span>
                    </Button>
                    
                    <Button 
                      variant={paperStyle === "plain" ? "default" : "outline"}
                      onClick={() => setPaperStyle("plain")}
                      className="h-16 flex-col gap-2"
                    >
                      <div className="w-6 h-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded border"></div>
                      <span className="text-xs">Plain</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Panel: Preview */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <HandwritingPreview 
              text={text}
              style={selectedFont}
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
              generatedImage={generatedImage}
              onImageChange={setGeneratedImage}
            />

            {/* Action Buttons */}
            {!isGenerating && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-6 flex gap-4"
              >
                <Button 
                  onClick={handleGenerate}
                  disabled={!text.trim() || !selectedFont || (!isPremium && generationsUsed >= generationsLimit)}
                  className="flex-1 h-12 text-lg font-semibold bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                >
                  <Sparkles className="h-5 w-5 mr-2" />
                  Generate Handwriting
                </Button>
                
                {generatedImage && (
                  <>
                    <Button 
                      onClick={handleDownload}
                      variant="outline" 
                      className="h-12 px-6 border-orange-200 text-orange-600 hover:bg-orange-50"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button 
                      onClick={handleReset}
                      variant="outline" 
                      className="h-12 px-6"
                    >
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Reset
                    </Button>
                  </>
                )}
              </motion.div>
            )}

            {/* Generation Status */}
            <AnimatePresence>
              {isGenerating && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-6 bg-white rounded-xl p-6 border border-orange-200 text-center"
                >
                  <Loader2 className="h-8 w-8 animate-spin text-orange-500 mx-auto mb-3" />
                  <p className="text-lg font-semibold text-gray-700 mb-1">Creating your handwriting...</p>
                  <p className="text-gray-500">This usually takes 10-15 seconds</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Usage Limit Warning */}
            {!isPremium && generationsUsed >= generationsLimit && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-6 bg-orange-50 border border-orange-200 rounded-xl p-6 text-center"
              >
                <Crown className="h-8 w-8 text-orange-500 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Daily Limit Reached</h3>
                <p className="text-gray-600 mb-4">You've used all {generationsLimit} free generations today.</p>
                <Button className="bg-orange-500 hover:bg-orange-600">
                  <IndianRupee className="h-4 w-4 mr-2" />
                  Upgrade to Premium
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
