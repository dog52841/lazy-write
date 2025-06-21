
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Crown, FileImage, FileText } from "lucide-react";
import { toast } from "sonner";
import { handwritingService } from "@/services/handwritingService";

interface ExportOptionsProps {
  imageUrl: string | null;
  isPremium: boolean;
}

const ExportOptions = ({ imageUrl, isPremium }: ExportOptionsProps) => {
  const handleExport = async (format: 'png' | 'jpg' | 'pdf') => {
    if (!imageUrl) {
      toast.error('Please generate handwriting first');
      return;
    }

    try {
      await handwritingService.exportImage(imageUrl, format, isPremium);
      toast.success(`Exported as ${format.toUpperCase()}`);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Export failed');
      }
    }
  };

  return (
    <Card className="bg-white/95 backdrop-blur-sm border-orange-100 shadow-lg">
      <CardHeader>
        <CardTitle className="font-quicksand flex items-center gap-2">
          <Download className="h-5 w-5 text-orange-500" />
          Export Options
        </CardTitle>
        <CardDescription>
          Download your handwriting in different formats
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex gap-2">
          <Button
            onClick={() => handleExport('png')}
            disabled={!imageUrl}
            variant="outline"
            className="flex-1 border-orange-200 text-orange-600 hover:bg-orange-50"
          >
            <FileImage className="h-4 w-4 mr-2" />
            PNG
          </Button>
          <Button
            onClick={() => handleExport('jpg')}
            disabled={!imageUrl}
            variant="outline"
            className="flex-1 border-orange-200 text-orange-600 hover:bg-orange-50"
          >
            <FileImage className="h-4 w-4 mr-2" />
            JPG
          </Button>
        </div>
        
        <Button
          onClick={() => handleExport('pdf')}
          disabled={!imageUrl || !isPremium}
          className={`w-full ${
            isPremium 
              ? "bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white" 
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          <FileText className="h-4 w-4 mr-2" />
          Export as PDF
          {isPremium ? (
            <Crown className="h-4 w-4 ml-2" />
          ) : (
            <Badge variant="secondary" className="ml-2 text-xs">
              Premium
            </Badge>
          )}
        </Button>
        
        {!isPremium && (
          <div className="p-3 bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-lg">
            <div className="flex items-center gap-2">
              <Crown className="h-4 w-4 text-orange-500" />
              <span className="text-sm text-orange-700">
                Upgrade to Premium to export as PDF!
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExportOptions;
