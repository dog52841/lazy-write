
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PenTool, RotateCcw, Copy, Paste } from "lucide-react";
import { toast } from "sonner";

interface ImprovedTextInputProps {
  value: string;
  onChange: (value: string) => void;
  maxLines?: number;
}

const ImprovedTextInput = ({ value, onChange, maxLines = 10 }: ImprovedTextInputProps) => {
  const lines = value.split('\n');
  const lineCount = lines.length;
  const charCount = value.length;
  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;

  const handleClear = () => {
    onChange('');
    toast.success('Text cleared');
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      toast.success('Text copied to clipboard');
    } catch (err) {
      toast.error('Failed to copy text');
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      onChange(text);
      toast.success('Text pasted from clipboard');
    } catch (err) {
      toast.error('Failed to paste text');
    }
  };

  const sampleTexts = [
    "Dear Teacher, I apologize for not completing my homework yesterday. I had to help my family with an urgent matter and ran out of time. I will make sure to submit it by tomorrow morning. Thank you for understanding.",
    "The quick brown fox jumps over the lazy dog. This sentence contains every letter of the alphabet and is perfect for testing handwriting fonts and styles.",
    "Today I learned that persistence is key to success. Every challenge we face makes us stronger and more capable of handling future obstacles.",
    "Happy Birthday! I hope your special day is filled with joy, laughter, and all your favorite things. May this new year bring you countless blessings and adventures.",
  ];

  const loadSampleText = (text: string) => {
    onChange(text);
    toast.success('Sample text loaded');
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <PenTool className="h-5 w-5 text-orange-500" />
            Your Text
          </CardTitle>
          <div className="flex gap-2">
            <Badge variant="outline" className={lineCount > maxLines ? "border-red-300 text-red-600" : "border-gray-300"}>
              {lineCount}/{maxLines} lines
            </Badge>
            <Badge variant="outline" className="border-gray-300">
              {wordCount} words
            </Badge>
            <Badge variant="outline" className="border-gray-300">
              {charCount} chars
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Textarea
            placeholder="Enter the text you want to convert to handwriting...

Tips:
• Keep it under 10 lines for best results
• Use simple punctuation 
• Avoid special characters
• Each line will be written naturally with slight variations"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="min-h-[200px] text-base leading-relaxed resize-none"
            rows={8}
          />
          
          {/* Action Buttons */}
          <div className="flex gap-2 mt-3">
            <Button onClick={handleCopy} variant="outline" size="sm" disabled={!value.trim()}>
              <Copy className="h-3 w-3 mr-1" />
              Copy
            </Button>
            <Button onClick={handlePaste} variant="outline" size="sm">
              <Paste className="h-3 w-3 mr-1" />
              Paste
            </Button>
            <Button onClick={handleClear} variant="outline" size="sm" disabled={!value.trim()}>
              <RotateCcw className="h-3 w-3 mr-1" />
              Clear
            </Button>
          </div>
        </div>

        {/* Sample Texts */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700">Quick Start - Sample Texts:</label>
          <div className="grid gap-2">
            {sampleTexts.map((text, index) => (
              <Button
                key={index}
                onClick={() => loadSampleText(text)}
                variant="outline"
                size="sm"
                className="text-left h-auto p-3 whitespace-normal text-wrap"
              >
                <div className="text-xs text-gray-600 line-clamp-2">
                  {text.substring(0, 100)}...
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Validation Messages */}
        {lineCount > maxLines && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-sm text-red-600">
              ⚠️ Your text has {lineCount} lines. Please reduce to {maxLines} lines or fewer for optimal results.
            </p>
          </div>
        )}

        {charCount > 1000 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-sm text-yellow-600">
              💡 Long text detected ({charCount} characters). Consider breaking it into smaller chunks for better handwriting quality.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ImprovedTextInput;
