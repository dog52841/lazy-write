
import { useState } from "react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import TextInput from "@/components/TextInput";
import StyleSelector from "@/components/StyleSelector";
import HandwritingPreview from "@/components/HandwritingPreview";
import GenerationStatus from "@/components/GenerationStatus";

const Dashboard = () => {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationsLeft, setGenerationsLeft] = useState(2);
  const maxGenerations = 3;

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter some text to generate handwriting!");
      return;
    }
    
    if (!style) {
      toast.error("Please select a handwriting style!");
      return;
    }

    if (generationsLeft <= 0) {
      toast.error("You've reached your daily generation limit. Upgrade to Premium for unlimited generations!");
      return;
    }

    setIsGenerating(true);
    
    try {
      // Simulate AI generation process
      toast.info("Analyzing your text...");
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.info("Generating handwriting style...");
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.info("Rendering final image...");
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update generations count
      setGenerationsLeft(prev => Math.max(0, prev - 1));
      
      toast.success("Handwriting generated successfully! ✍️");
    } catch (error) {
      toast.error("Failed to generate handwriting. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const lineCount = prompt.split('\n').length;
  const isOverLimit = lineCount > 10;

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

        {/* Generation Status */}
        <div className="mb-8">
          <GenerationStatus 
            generationsLeft={generationsLeft}
            maxGenerations={maxGenerations}
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
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
