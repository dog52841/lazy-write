
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PenTool, LogOut, Sparkles, Crown, Settings } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Enhanced Header */}
      <header className="glass-effect sticky top-0 z-50 border-b">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <PenTool className="h-10 w-10 text-blue-600 group-hover:text-blue-700 transition-colors animate-float" />
                <div className="absolute -inset-1 bg-blue-200 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
              </div>
              <div>
                <span className="font-display text-2xl font-bold gradient-text">LazyWrite</span>
                <div className="text-xs text-gray-500 font-medium">AI Handwriting Generator</div>
              </div>
            </Link>
            
            <div className="flex items-center space-x-6">
              {isPremium && (
                <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-indigo-100 px-4 py-2 rounded-full border border-blue-200">
                  <Crown className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-semibold text-blue-800">Premium</span>
                </div>
              )}
              
              <div className="hidden sm:block text-right">
                <div className="text-sm font-medium text-gray-900">
                  {user?.user_metadata?.full_name || 'Welcome'}
                </div>
                <div className="text-xs text-gray-500">{user?.email}</div>
              </div>
              
              <div className="flex space-x-2">
                <Link to="/settings">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                </Link>
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  size="sm"
                  className="border-gray-200 text-gray-600 hover:bg-gray-50"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-4">
            Transform Your Text Into
            <span className="gradient-text block">Beautiful Handwriting</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Generate realistic handwriting with AI. Choose from professional fonts and paper styles.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Left Sidebar - Controls */}
          <div className="xl:col-span-4 space-y-6">
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
          
          {/* Right Main Area - Preview */}
          <div className="xl:col-span-8">
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
