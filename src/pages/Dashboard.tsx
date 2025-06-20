
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Upload, Sparkles, PenTool, Image as ImageIcon, Loader2, Crown, IndianRupee } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from "@/components/ui/badge";

// Placeholder for a generated image component
const GeneratedImagePreview = ({ src, onClear }: { src: string; onClear: () => void }) => (
  <motion.div
    initial={{ scale: 0.9, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 0.9, opacity: 0 }}
    className="relative w-full h-full"
  >
    <img src={src} alt="Generated Handwriting" className="w-full h-full object-cover rounded-lg" />
    <Button variant="destructive" size="sm" className="absolute top-2 right-2" onClick={onClear}>
      Clear
    </Button>
  </motion.div>
);

const Dashboard = () => {
  const { user } = useAuth();
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("cursive");
  const [ruledLines, setRuledLines] = useState(true);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const isPremium = false; // This should come from your auth context or user data
  
  const playSound = (sound: 'click' | 'save') => {
    const audio = new Audio(`/sounds/paper-${sound}.m4a`);
    audio.play().catch(e => console.error("Failed to play sound", e));
  };
  
  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter some text to generate.");
      return;
    }
    
    if (!user) {
      toast.error("You must be logged in to generate handwriting.");
      return;
    }
    
    playSound('click');
    setIsGenerating(true);
    setGeneratedImage(null); // Clear previous image

    // --- REAL AI GENERATION API CALL ---
    const formData = new FormData();
    formData.append("user_id", user.id);
    formData.append('prompt', prompt);
    formData.append('style', style);
    formData.append('is_premium', String(isPremium));
    // In the future, we can add background and handwriting samples here
    // formData.append('backgroundImage', uploadedBackgroundImageFile);

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
      
      playSound('save');
      toast.success("Handwriting generated successfully! ✨");

    } catch (error) {
      console.error("Generation error:", error);
      toast.error("An error occurred during generation. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setBackgroundImage(reader.result as string);
        toast.info("Background image updated.");
      };
      reader.readAsDataURL(file);
      playSound('click');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50">
      <Navbar />
      
      {/* Premium Upgrade Banner for Free Users */}
      {!isPremium && (
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white p-4">
          <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Crown className="h-5 w-5" />
              <span className="font-semibold">Upgrade to Premium for unlimited generations</span>
              <Badge className="bg-white/20 text-white">
                <IndianRupee className="h-3 w-3 mr-1" />
                432/mo
              </Badge>
            </div>
            <Button variant="outline" size="sm" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
              Upgrade Now
            </Button>
          </div>
        </div>
      )}

      <main className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 max-w-screen-2xl mx-auto w-full">
        {/* Left Column: Controls */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Card className="h-full shadow-xl border-2 border-orange-200 bg-white/90 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-3 font-quicksand text-2xl">
                <PenTool className="h-6 w-6" />
                Create Your Handwriting
              </CardTitle>
              <p className="text-orange-100">Transform your text into beautiful handwriting</p>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="space-y-3">
                <Label htmlFor="prompt" className="text-base font-semibold text-gray-700">
                  Your Text (Max 10 lines)
                </Label>
                <Textarea
                  id="prompt"
                  placeholder="Dear Teacher, I'm writing to you in my... 'natural' handwriting. Please excuse the beautiful penmanship as this is definitely my own work..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[150px] text-base border-2 border-orange-200 focus:border-orange-400 rounded-lg"
                  rows={6}
                />
                <div className="text-sm text-gray-500">
                  {prompt.split('\n').length}/10 lines
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="style" className="text-base font-semibold text-gray-700">
                    Writing Style
                  </Label>
                  <Select value={style} onValueChange={setStyle}>
                    <SelectTrigger id="style" className="border-2 border-orange-200 focus:border-orange-400">
                      <SelectValue placeholder="Select a style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cursive">✒️ Cursive</SelectItem>
                      <SelectItem value="print">🖊️ Print</SelectItem>
                      <SelectItem value="messy">📝 Messy</SelectItem>
                      <SelectItem value="formal">📋 Formal</SelectItem>
                      {!isPremium && (
                        <SelectItem value="premium" disabled>
                          <div className="flex items-center gap-2">
                            <Crown className="h-4 w-4" />
                            Premium Styles
                          </div>
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between rounded-lg border-2 border-orange-200 p-4 bg-orange-50/50">
                  <div className="space-y-1">
                    <Label htmlFor="ruled-lines" className="text-base font-semibold text-gray-700">
                      Ruled Lines
                    </Label>
                    <p className="text-sm text-gray-600">Add notebook lines to paper</p>
                  </div>
                  <Switch id="ruled-lines" checked={ruledLines} onCheckedChange={setRuledLines} />
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-base font-semibold text-gray-700">
                  Custom Background {!isPremium && "(Premium)"}
                </Label>
                <Label htmlFor="upload-bg" className="w-full">
                  <Button 
                    asChild 
                    variant="outline" 
                    className="w-full cursor-pointer border-2 border-orange-200 hover:border-orange-400 hover:bg-orange-50"
                    disabled={!isPremium}
                  >
                    <div>
                      <Upload className="h-4 w-4 mr-2" />
                      {isPremium ? "Upload Background" : "Upgrade for Custom Backgrounds"}
                      <input 
                        id="upload-bg" 
                        type="file" 
                        className="sr-only" 
                        accept="image/*" 
                        onChange={handleImageUpload}
                        disabled={!isPremium}
                      />
                    </div>
                  </Button>
                </Label>
              </div>

              <Button 
                size="lg" 
                className="w-full font-bold text-lg bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg hover:shadow-xl transition-all duration-300" 
                onClick={handleGenerate} 
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Creating Magic...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" />
                    Generate Handwriting
                  </>
                )}
              </Button>

              {!isPremium && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Free Plan:</strong> 3 generations per day
                  </p>
                  <Button size="sm" variant="outline" className="border-orange-300 text-orange-600 hover:bg-orange-100">
                    Upgrade for Unlimited
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Right Column: Preview */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="bg-white/90 backdrop-blur-sm rounded-lg border-2 border-orange-200 shadow-xl flex items-center justify-center p-4 h-[70vh] relative overflow-hidden"
          style={{ 
            backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none', 
            backgroundSize: 'cover', 
            backgroundPosition: 'center' 
          }}
        >
          {/* Paper texture overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
          
          <AnimatePresence>
            {generatedImage ? (
              <GeneratedImagePreview src={generatedImage} onClear={() => setGeneratedImage(null)} />
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center text-gray-500 z-10"
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 border border-orange-200">
                  <ImageIcon className="mx-auto h-16 w-16 text-orange-400 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    Your handwriting will appear here
                  </h3>
                  <p className="text-gray-600">
                    Fill out the details on the left and click "Generate" to see the magic happen.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <AnimatePresence>
            {isGenerating && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center z-20"
              >
                <div className="bg-white rounded-xl p-8 shadow-xl border border-orange-200 text-center">
                  <Loader2 className="h-12 w-12 animate-spin text-orange-500 mx-auto mb-4" />
                  <p className="text-xl font-semibold text-gray-700 mb-2">Creating your masterpiece...</p>
                  <p className="text-gray-500">This usually takes 10-15 seconds</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
