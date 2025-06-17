
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PenTool, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useHandwritingData } from "@/hooks/useHandwritingData";
import { handwritingService } from "@/services/handwritingService";
import { toast } from "sonner";

import TextInput from "@/components/TextInput";
import StyleSelector from "@/components/StyleSelector";
import HandwritingPreview from "@/components/HandwritingPreview";
import GenerationStatus from "@/components/GenerationStatus";
import AdBanner from "@/components/AdBanner";

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const { 
    generationsLeft, 
    bonusGenerations, 
    saveSample, 
    addBonusGenerations 
  } = useHandwritingData();
  
  const [text, setText] = useState("");
  const [style, setStyle] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [showAdBanner, setShowAdBanner] = useState(true);

  const maxLines = 15;
  const totalGenerations = generationsLeft + bonusGenerations;

  const handleGenerate = async () => {
    if (!text.trim() || !style || totalGenerations === 0) return;

    setIsGenerating(true);
    try {
      const result = await handwritingService.generateHandwriting({
        text: text.trim(),
        style: style,
        background: 'lined'
      });

      if (result.success && result.imageUrl) {
        setGeneratedImage(result.imageUrl);
        // Save to database
        await saveSample(text.trim(), style, result.imageUrl);
        toast.success(`Generated in ${(result.processingTime / 1000).toFixed(1)}s!`);
      } else {
        toast.error('Failed to generate handwriting. Please try again.');
      }
    } catch (error) {
      console.error('Generation error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleWatchAd = () => {
    addBonusGenerations(2);
    setShowAdBanner(false);
  };

  const handleSignOut = async () => {
    await signOut();
    toast.success('Signed out successfully');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-orange-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <PenTool className="h-8 w-8 text-orange-500" />
              <span className="font-quicksand font-bold text-xl text-gray-900">LazyWrite</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Welcome, {user?.user_metadata?.full_name || user?.email}!
              </span>
              <Button
                onClick={handleSignOut}
                variant="outline"
                size="sm"
                className="border-orange-200 text-gray-600 hover:bg-orange-50"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Input & Settings */}
          <div className="lg:col-span-1 space-y-6">
            <GenerationStatus
              generationsLeft={generationsLeft}
              maxGenerations={5}
              bonusGenerations={bonusGenerations}
              isPremium={false}
            />
            
            {showAdBanner && totalGenerations < 3 && (
              <AdBanner
                onWatchAd={handleWatchAd}
                onClose={() => setShowAdBanner(false)}
              />
            )}
            
            <TextInput
              value={text}
              onChange={setText}
              maxLines={maxLines}
            />
            
            <StyleSelector
              value={style}
              onChange={setStyle}
            />
          </div>
          
          {/* Right Column - Preview */}
          <div className="lg:col-span-2">
            <HandwritingPreview
              text={text}
              style={style}
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
              generatedImage={generatedImage}
              onImageChange={setGeneratedImage}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
