import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Upload, FileText, ArrowRight, Check, Type, Hash, AtSign } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

const steps = [
  {
    title: 'Step 1: The Alphabet',
    description: 'Write the following pangram (a sentence using every letter) to help us learn your style. Make sure to include both upper and lower case letters.',
    prompt: 'The quick brown fox jumps over the lazy dog. A JUBILANT, QUICK-WITTED FROG AND A LAZY, VEXING DOG.',
    icon: Type
  },
  {
    title: 'Step 2: Numbers',
    description: 'Write the following numbers so we can understand how you form digits.',
    prompt: '0 1 2 3 4 5 6 7 8 9',
    icon: Hash
  },
  {
    title: 'Step 3: Symbols & Punctuation',
    description: 'Finally, write these common symbols and punctuation marks.',
    prompt: '! @ # $ % ^ & * ( ) _ - + = { } [ ] | \\ : ; " \' < > , . ? / ~',
    icon: AtSign
  },
];

const HandwritingSubmission = () => {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState<(File | null)[]>([null, null, null]);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (e.target.files && e.target.files[0]) {
      const newFiles = [...uploadedFiles];
      newFiles[index] = e.target.files[0];
      setUploadedFiles(newFiles);
    }
  };
  
  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSubmit = async () => {
    const [alphabetSample, numbersSample, symbolsSample] = uploadedFiles;

    if (!alphabetSample || !numbersSample || !symbolsSample) {
      toast.error("Please upload an image for each step.");
      return;
    }
    
    if (!user) {
      toast.error("You must be logged in to submit handwriting.");
      return;
    }
    
    setIsUploading(true);
    toast.info("Analyzing your handwriting... This may take a moment.");
    
    const formData = new FormData();
    formData.append("user_id", user.id);
    formData.append("alphabet_sample", alphabetSample);
    formData.append("numbers_sample", numbersSample);
    formData.append("symbols_sample", symbolsSample);

    try {
      const response = await fetch("http://localhost:8000/api/submit-handwriting", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to analyze handwriting.");
      }
      
      const result = await response.json();
      console.log(result.message);
      toast.success("Your handwriting style has been saved!");
      // navigate('/app'); // Optional: redirect to dashboard after completion
      
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("An error occurred during analysis. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;
  const CurrentIcon = steps[currentStep].icon;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <div className="text-center">
            <h1 className="font-quicksand text-4xl font-bold">Train Your Handwriting AI</h1>
            <p className="text-muted-foreground text-lg mt-2">
              Help us learn your unique style in 3 easy steps.
            </p>
          </div>
          
          <Progress value={progress} className="w-full" />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="shadow-lg border-border">
                <CardHeader>
                  <CardTitle className="font-quicksand flex items-center gap-3 text-2xl">
                    <CurrentIcon className="h-8 w-8 text-primary" />
                    {steps[currentStep].title}
                  </CardTitle>
                  <CardDescription>
                    {steps[currentStep].description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-4 bg-secondary/50 rounded-lg border">
                    <p className="text-lg font-mono whitespace-pre-wrap">{steps[currentStep].prompt}</p>
                  </div>
                  
                  <div className="p-6 border-2 border-dashed rounded-lg text-center">
                    <label htmlFor={`upload-${currentStep}`} className="cursor-pointer space-y-2">
                      <div className="mx-auto bg-primary/10 rounded-full p-3 w-fit">
                        <Upload className="h-8 w-8 text-primary" />
                      </div>
                      <h4 className="font-semibold">{uploadedFiles[currentStep] ? "Change File" : "Upload Image"}</h4>
                      <p className="text-xs text-muted-foreground">
                        {uploadedFiles[currentStep] ? uploadedFiles[currentStep]?.name : "PNG, JPG, or WEBP"}
                      </p>
                      <input id={`upload-${currentStep}`} type="file" className="sr-only" accept="image/*" onChange={(e) => handleFileChange(e, currentStep)} />
                    </label>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-end items-center">
            {currentStep < steps.length - 1 ? (
              <Button onClick={handleNextStep} disabled={!uploadedFiles[currentStep]}>
                Next Step <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button size="lg" onClick={handleSubmit} disabled={isUploading || uploadedFiles.some(f => f === null)}>
                {isUploading ? "Analyzing..." : "Finish & Save Style"}
                <Check className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default HandwritingSubmission; 