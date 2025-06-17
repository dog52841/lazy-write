
import { useState, useCallback } from "react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import TextInput from "@/components/TextInput";
import StyleSelector from "@/components/StyleSelector";
import HandwritingPreview from "@/components/HandwritingPreview";
import GenerationStatus from "@/components/GenerationStatus";
import AdBanner from "@/components/AdBanner";
import { handwritingService } from "@/services/handwritingService";

const Dashboard = () => {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationsLeft, setGenerationsLeft] = useState(2);
  const [bonusGenerations, setBonusGenerations] = useState(0);
  const [showAd, setShowAd] = useState(true);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  
  const maxGenerations = 3;
  const totalGenerations = generationsLeft + bonusGenerations;

  const handleWatchAd = useCallback(() => {
    toast.info("Opening ad...");
    
    // Simulate ad watching
    setTimeout(() => {
      setBonusGenerations(prev => prev + 2);
      setShowAd(false);
      toast.success("Great! You earned 2 bonus generations! 🎉");
    }, 3000);
  }, []);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter some text to generate handwriting!");
      return;
    }
    
    if (!style) {
      toast.error("Please select a handwriting style!");
      return;
    }

    if (totalGenerations <= 0) {
      toast.error("You've reached your daily generation limit. Watch an ad for bonus generations or upgrade to Premium!");
      setShowAd(true);
      return;
    }

    setIsGenerating(true);
    
    try {
      // Use the new handwriting service following the AI setup
      toast.info("🤖 Analyzing your text with AI...");
      
      const result = await handwritingService.generateHandwriting({
        text: prompt,
        style: style,
        background: 'lined'
      });
      
      if (result.success) {
        setGeneratedImage(result.imageUrl);
        
        // Deduct from bonus first, then regular generations
        if (bonusGenerations > 0) {
          setBonusGenerations(prev => Math.max(0, prev - 1));
        } else {
          setGenerationsLeft(prev => Math.max(0, prev - 1));
        }
        
        toast.success(`Handwriting generated successfully in ${(result.processingTime / 1000).toFixed(1)}s! ✍️`);
        
        // Show ad after every 2nd generation for free users
        if ((maxGenerations - generationsLeft + 1) % 2 === 0 && totalGenerations > 1) {
          setTimeout(() => setShowAd(true), 2000);
        }
      } else {
        toast.error("Failed to generate handwriting. Please try again.");
      }
    } catch (error) {
      console.error('Generation error:', error);
      toast.error("Failed to generate handwriting. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-quicksand text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-3">
            Create Beautiful Handwriting
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Transform your text into authentic-looking handwritten notes with our AI-powered handwriting generator
          </p>
        </div>

        {/* Ad Banner for Free Users */}
        {showAd && totalGenerations <= 1 && (
          <AdBanner 
            onWatchAd={handleWatchAd}
            onClose={() => setShowAd(false)}
          />
        )}

        {/* Generation Status */}
        <div className="mb-8">
          <GenerationStatus 
            generationsLeft={totalGenerations}
            maxGenerations={maxGenerations}
            bonusGenerations={bonusGenerations}
          />
        </div>

        <div className="grid xl:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <TextInput
              value={prompt}
              onChange={setPrompt}
              maxLines={10}
            />
            
            <StyleSelector
              value={style}
              onChange={setStyle}
            />
          </div>

          {/* Preview Section */}
          <div>
            <HandwritingPreview
              text={prompt}
              style={style}
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
              generatedImage={generatedImage}
              onImageChange={setGeneratedImage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
