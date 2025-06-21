
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PenTool, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useHandwritingData } from "@/hooks/useHandwritingData";
import { handwritingService } from "@/services/handwritingService";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

import TextInput from "@/components/TextInput";
import FontSelector from "@/components/FontSelector";
import PaperSelector from "@/components/PaperSelector";
import HandwritingPreview from "@/components/HandwritingPreview";
import GenerationStatus from "@/components/GenerationStatus";
import ExportOptions from "@/components/ExportOptions";
import PremiumFeatures from "@/components/PremiumFeatures";

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const { 
    generationsLeft, 
    bonusGenerations, 
    saveSample, 
    addBonusGenerations 
  } = useHandwritingData();
  
  const [text, setText] = useState("");
  const [selectedFont, setSelectedFont] = useState("");
  const [selectedPaper, setSelectedPaper] = useState("lined");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isPremium, setIsPremium] = useState(false);

  const maxLines = 15;
  const totalGenerations = generationsLeft + bonusGenerations;

  // Check subscription status
  useEffect(() => {
    const checkSubscription = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase.functions.invoke('check-subscription');
        if (error) throw error;
        setIsPremium(data?.subscribed || false);
      } catch (error) {
        console.error('Failed to check subscription:', error);
        setIsPremium(false);
      }
    };

    checkSubscription();
  }, [user]);

  const handleGenerate = async () => {
    if (!text.trim() || !selectedFont) {
      toast.error('Please enter text and select a font');
      return;
    }

    if (!isPremium && totalGenerations === 0) {
      toast.error('No generations left. Upgrade to Premium for unlimited generations!');
      return;
    }

    setIsGenerating(true);
    try {
      const result = await handwritingService.generateHandwriting({
        text: text.trim(),
        style: selectedFont,
        background: selectedPaper
      });

      if (result.success && result.imageUrl) {
        setGeneratedImage(result.imageUrl);
        
        // Save to database and decrease generation count (only for free users)
        if (!isPremium) {
          await saveSample(text.trim(), selectedFont, result.imageUrl);
        }
        
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

  const handleSignOut = async () => {
    await signOut();
    toast.success('Signed out successfully');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
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
            {!isPremium && (
              <GenerationStatus
                generationsLeft={generationsLeft}
                maxGenerations={5}
                bonusGenerations={bonusGenerations}
                isPremium={isPremium}
              />
            )}
            
            <PremiumFeatures isPremium={isPremium} />
            
            <TextInput
              value={text}
              onChange={setText}
              maxLines={maxLines}
            />
            
            <FontSelector
              value={selectedFont}
              onChange={setSelectedFont}
              isPremium={isPremium}
            />
            
            <PaperSelector
              value={selectedPaper}
              onChange={setSelectedPaper}
              isPremium={isPremium}
            />
            
            <ExportOptions
              imageUrl={generatedImage}
              isPremium={isPremium}
            />
          </div>
          
          {/* Right Column - Preview */}
          <div className="lg:col-span-2">
            <HandwritingPreview
              text={text}
              style={selectedFont}
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
