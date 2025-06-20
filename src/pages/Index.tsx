
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PenTool, Sparkles, Download, Star } from "lucide-react";
import Navbar from "@/components/Navbar";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <div className="flex justify-center mb-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-full p-4 shadow-lg border border-orange-100">
              <PenTool className="h-16 w-16 text-orange-500" />
            </div>
          </div>
          
          <h1 className="font-quicksand text-6xl md:text-7xl font-bold text-gray-900 mb-6">
            LazyWrite
          </h1>
          
          <p className="text-2xl md:text-3xl text-gray-700 mb-4 font-medium">
            Handwriting so real, even your teacher can't tell.
          </p>
          
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            Generate beautiful, human-like handwriting with AI. Perfect for notes, letters, 
            and assignments that need that authentic handwritten touch.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/app">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold">
                <Sparkles className="h-5 w-5 mr-2" />
                Try Free Now
              </Button>
            </Link>
            <Link to="/pricing">
              <Button size="lg" variant="outline" className="border-orange-200 text-orange-600 hover:bg-orange-50 px-8 py-4 text-lg">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Demo Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-orange-100 p-8">
          <h2 className="font-quicksand text-3xl font-bold text-center text-gray-900 mb-8">
            See the Magic in Action
          </h2>
          
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-100">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="space-y-4">
                <div className="text-lg text-gray-700 font-handwriting leading-relaxed">
                  Dear Teacher,
                </div>
                <div className="text-lg text-gray-700 font-handwriting leading-relaxed pl-8">
                  I hope this letter finds you well. I wanted to thank you for 
                  all the interesting lessons this semester. Your passion for 
                  teaching really shows in every class.
                </div>
                <div className="text-lg text-gray-700 font-handwriting leading-relaxed pl-8">
                  I'm looking forward to learning more in the coming weeks.
                </div>
                <div className="text-lg text-gray-700 font-handwriting leading-relaxed">
                  Best regards,<br />
                  Alex
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-6">
            <p className="text-sm text-gray-500">✨ Generated with LazyWrite AI</p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="font-quicksand text-4xl font-bold text-center text-gray-900 mb-12">
          Why Choose LazyWrite?
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-orange-100 text-center">
            <div className="bg-orange-100 rounded-full p-3 w-fit mx-auto mb-4">
              <Sparkles className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="font-quicksand text-xl font-semibold text-gray-900 mb-3">AI-Powered</h3>
            <p className="text-gray-600">
              Advanced AI creates handwriting that's indistinguishable from human writing.
            </p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-orange-100 text-center">
            <div className="bg-orange-100 rounded-full p-3 w-fit mx-auto mb-4">
              <Download className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="font-quicksand text-xl font-semibold text-gray-900 mb-3">Print Ready</h3>
            <p className="text-gray-600">
              Download high-quality images ready to print on any paper or background.
            </p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-orange-100 text-center">
            <div className="bg-orange-100 rounded-full p-3 w-fit mx-auto mb-4">
              <Star className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="font-quicksand text-xl font-semibold text-gray-900 mb-3">Multiple Styles</h3>
            <p className="text-gray-600">
              Choose from cursive, print, messy, and more handwriting styles.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white/60 backdrop-blur-sm border-t border-orange-100 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600">
            © 2024 LazyWrite. Made with ❤️ for creative minds.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
