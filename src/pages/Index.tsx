import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PenTool, Sparkles, Download, Star, MoveRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";

const Index = () => {
  const playClickSound = () => {
    // Ensure this path matches the file location in your `public` folder
    const audio = new Audio('/sounds/paper-click.m4a');
    audio.play().catch(error => {
      // Autoplay was prevented.
      console.error("Audio play failed:", error);
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex justify-center mb-8"
          >
            <div className="bg-primary/10 rounded-full p-4 shadow-lg border border-primary/20">
              <PenTool className="h-16 w-16 text-primary" />
            </div>
          </motion.div>
          
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="font-quicksand text-5xl md:text-7xl font-bold mb-6"
          >
            LazyWrite
          </motion.h1>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="text-2xl md:text-3xl text-foreground/80 mb-4 font-medium"
          >
            Handwriting so real, even your teacher can't tell.
          </motion.p>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
            className="text-lg text-foreground/60 mb-12 max-w-2xl mx-auto"
          >
            Generate beautiful, human-like handwriting with AI. Perfect for notes, letters, 
            and assignments that need that authentic handwritten touch.
          </motion.p>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link to="/app" onClick={playClickSound}>
              <Button size="lg" className="px-8 py-4 text-lg font-semibold group">
                Try Free Now
                <MoveRight className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button size="lg" variant="outline" className="px-8 py-4 text-lg">
                View Pricing
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Demo Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-secondary/50 rounded-2xl shadow-xl border border-border p-8 md:p-12">
          <h2 className="font-quicksand text-3xl md:text-4xl font-bold text-center mb-10">
            See the Magic in Action
          </h2>
          
          <div className="bg-white rounded-lg p-6 md:p-8 shadow-inner border border-gray-200 notebook-lines">
            <div className="space-y-6 text-xl md:text-2xl text-gray-800 font-handwriting leading-relaxed">
              <div>Dear Teacher,</div>
              <div className="pl-8">
                I hope this letter finds you well. I wanted to thank you for 
                all the interesting lessons this semester. Your passion for 
                teaching really shows in every class.
              </div>
              <div className="pl-8">
                I'm looking forward to learning more in the coming weeks.
              </div>
              <div>
                Best regards,<br />
                <span className="ml-4">Alex</span>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-6">
            <p className="text-sm text-foreground/50">✨ Generated with LazyWrite AI</p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h2 className="font-quicksand text-4xl font-bold text-center mb-16">
          Why Choose LazyWrite?
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Sparkles, title: "AI-Powered", description: "Advanced AI creates handwriting that's indistinguishable from human writing." },
            { icon: Download, title: "Print Ready", description: "Download high-quality images ready to print on any paper or background." },
            { icon: Star, title: "Multiple Styles", description: "Choose from cursive, print, messy, and more handwriting styles." }
          ].map((feature, i) => (
            <motion.div 
              key={feature.title}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              viewport={{ once: true }}
              className="bg-card rounded-xl p-8 shadow-lg border border-border text-center"
            >
              <div className="bg-primary/10 rounded-full p-4 w-fit mx-auto mb-6">
                <feature.icon className="h-10 w-10 text-primary" />
              </div>
              <h3 className="font-quicksand text-2xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-foreground/60">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-secondary/30 border-t border-border py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-foreground/60">
            © 2024 LazyWrite. Made with ❤️ for creative minds.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
