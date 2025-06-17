import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Upload, Sparkles, PenTool, Image as ImageIcon, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";
import { useAuth } from '@/contexts/AuthContext';

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
  const isPremium = false;
  
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
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 max-w-screen-2xl mx-auto w-full">
        {/* Left Column: Controls */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Card className="h-full shadow-lg border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-quicksand text-2xl">
                <PenTool className="h-6 w-6" />
                Create Your Handwriting
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="prompt">Prompt (Max 10 lines)</Label>
                <Textarea
                  id="prompt"
                  placeholder="Dear Teacher, I'm writing to you in my... 'natural' handwriting."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[150px] text-base"
                  rows={6}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="style">Writing Style</Label>
                  <Select value={style} onValueChange={setStyle}>
                    <SelectTrigger id="style">
                      <SelectValue placeholder="Select a style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cursive">Cursive</SelectItem>
                      <SelectItem value="print">Print</SelectItem>
                      <SelectItem value="messy">Messy</SelectItem>
                      <SelectItem value="formal">Formal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                 <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label htmlFor="ruled-lines" className="text-base">Ruled Lines</Label>
                    <p className="text-sm text-muted-foreground">Toggle ruled lines on the paper.</p>
                  </div>
                  <Switch id="ruled-lines" checked={ruledLines} onCheckedChange={setRuledLines} />
                </div>
              </div>

              <div>
                <Label htmlFor="upload-bg" className="w-full">
                  <Button asChild variant="outline" className="w-full cursor-pointer">
                    <div>
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Background
                      <input id="upload-bg" type="file" className="sr-only" accept="image/*" onChange={handleImageUpload} />
                    </div>
                  </Button>
                </Label>
              </div>

              <Button size="lg" className="w-full font-bold text-lg" onClick={handleGenerate} disabled={isGenerating}>
                {isGenerating ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-5 w-5" />
                )}
                Generate
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Right Column: Preview */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="bg-secondary/50 rounded-lg border-2 border-dashed border-border flex items-center justify-center p-4 h-[70vh] relative"
          style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <AnimatePresence>
            {generatedImage ? (
              <GeneratedImagePreview src={generatedImage} onClear={() => setGeneratedImage(null)} />
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center text-muted-foreground"
              >
                <ImageIcon className="mx-auto h-16 w-16" />
                <h3 className="mt-4 text-lg font-medium">Your handwriting will appear here</h3>
                <p className="mt-1 text-sm">Fill out the details on the left and click "Generate".</p>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {isGenerating && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-background/80 flex flex-col items-center justify-center backdrop-blur-sm z-10"
              >
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="mt-4 text-lg font-semibold">Generating your masterpiece...</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
