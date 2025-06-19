
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PenTool, Sparkles, Download, Star, MoveRight, CheckCircle, Users, Zap, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";

const Index = () => {
  const playClickSound = () => {
    const audio = new Audio('/sounds/paper-click.m4a');
    audio.play().catch(error => {
      console.error("Audio play failed:", error);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Navbar />
      
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20">
        <div className="text-center relative">
          {/* Floating decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-float"></div>
            <div className="absolute top-40 right-20 w-32 h-32 bg-secondary/20 rounded-full blur-2xl animate-float" style={{animationDelay: '1s'}}></div>
            <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-accent/10 rounded-full blur-xl animate-float" style={{animationDelay: '2s'}}></div>
          </div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex justify-center mb-8 relative z-10"
          >
            <div className="bg-gradient-to-r from-primary/20 to-accent/20 rounded-full p-6 shadow-2xl border border-primary/30 backdrop-blur-sm">
              <PenTool className="h-20 w-20 text-primary" />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative z-10"
          >
            <h1 className="font-quicksand text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
              LazyWrite
            </h1>
            <div className="inline-block bg-primary/10 px-4 py-2 rounded-full text-sm font-semibold text-primary mb-6 border border-primary/20">
              ✨ AI-Powered Handwriting Generator
            </div>
          </motion.div>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="text-3xl md:text-4xl text-foreground/90 mb-4 font-medium relative z-10"
          >
            Handwriting so real, even your teacher can&apos;t tell.
          </motion.p>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
            className="text-xl text-foreground/70 mb-12 max-w-3xl mx-auto leading-relaxed relative z-10"
          >
            Transform any text into beautiful, authentic handwriting with our advanced AI. 
            Perfect for assignments, letters, notes, and creative projects.
          </motion.p>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center relative z-10"
          >
            <Link to="/app" onClick={playClickSound}>
              <Button size="lg" className="px-10 py-5 text-xl font-semibold group bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-xl hover:shadow-2xl transition-all duration-300">
                Start Creating Free
                <MoveRight className="h-6 w-6 ml-3 transition-transform duration-300 group-hover:translate-x-2" />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button size="lg" variant="outline" className="px-10 py-5 text-xl border-2 border-primary/30 hover:border-primary/50 hover:bg-primary/5">
                View Pricing
              </Button>
            </Link>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1, ease: "easeOut" }}
            className="flex flex-wrap justify-center items-center gap-8 mt-16 text-sm text-foreground/60 relative z-10"
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>No signup required to try</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-500" />
              <span>Trusted by 10,000+ users</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-purple-500" />
              <span>100% secure & private</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Demo Section - Enhanced */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-card via-card to-secondary/30 rounded-3xl shadow-2xl border border-border/50 p-8 md:p-12 backdrop-blur-sm"
        >
          <div className="text-center mb-12">
            <h2 className="font-quicksand text-4xl md:text-5xl font-bold mb-4">
              See the Magic in Action
            </h2>
            <p className="text-xl text-foreground/70">
              Watch as our AI transforms typed text into authentic handwriting
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-inner border border-gray-200 notebook-lines relative overflow-hidden">
            {/* Paper texture overlay */}
            <div className="absolute inset-0 opacity-5" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
            
            <div className="space-y-8 text-2xl md:text-3xl text-gray-800 font-handwriting leading-relaxed relative z-10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Dear Teacher,
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="pl-8"
              >
                I hope this letter finds you well. I wanted to thank you for 
                all the interesting lessons this semester. Your passion for 
                teaching really shows in every class, and it has inspired me 
                to work harder and learn more.
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                className="pl-8"
              >
                I&apos;m looking forward to continuing this journey of learning 
                with your guidance in the coming weeks.
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
              >
                Best regards,<br />
                <span className="ml-8">Alex Johnson</span>
              </motion.div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-sm font-semibold text-primary border border-primary/20">
              <Sparkles className="h-4 w-4" />
              Generated with LazyWrite AI in 3 seconds
            </div>
          </div>
        </motion.div>
      </div>

      {/* Features Section - Enhanced */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="font-quicksand text-5xl font-bold mb-6">
            Why Choose LazyWrite?
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Experience the most advanced AI handwriting technology with features designed for perfection
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { 
              icon: Zap, 
              title: "Lightning Fast", 
              description: "Generate handwriting in seconds, not hours. Our AI processes text instantly.",
              color: "text-yellow-500",
              bgColor: "bg-yellow-500/10"
            },
            { 
              icon: Sparkles, 
              title: "AI-Powered", 
              description: "Advanced machine learning creates handwriting indistinguishable from human writing.",
              color: "text-purple-500",
              bgColor: "bg-purple-500/10"
            },
            { 
              icon: Download, 
              title: "Print Ready", 
              description: "Download high-resolution images perfect for printing on any paper.",
              color: "text-green-500",
              bgColor: "bg-green-500/10"
            },
            { 
              icon: Star, 
              title: "Multiple Styles", 
              description: "Choose from cursive, print, messy, neat, and custom handwriting styles.",
              color: "text-blue-500",
              bgColor: "bg-blue-500/10"
            }
          ].map((feature, i) => (
            <motion.div 
              key={feature.title}
              initial={{ y: 60, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
              viewport={{ once: true }}
              className="group bg-card/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-border hover:shadow-2xl transition-all duration-300 hover:scale-105 text-center"
            >
              <div className={`${feature.bgColor} rounded-2xl p-4 w-fit mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className={`h-12 w-12 ${feature.color}`} />
              </div>
              <h3 className="font-quicksand text-2xl font-semibold mb-4 group-hover:text-primary transition-colors">{feature.title}</h3>
              <p className="text-foreground/70 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-3xl p-12 text-center border border-primary/20 shadow-xl"
        >
          <h2 className="font-quicksand text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Writing?
          </h2>
          <p className="text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
            Join thousands of students, professionals, and creatives who trust LazyWrite for their handwriting needs.
          </p>
          <Link to="/app" onClick={playClickSound}>
            <Button size="lg" className="px-12 py-6 text-xl font-semibold group bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-xl hover:shadow-2xl transition-all duration-300">
              Start Creating Now - It&apos;s Free!
              <MoveRight className="h-6 w-6 ml-3 transition-transform duration-300 group-hover:translate-x-2" />
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="bg-secondary/30 border-t border-border/50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="bg-primary/10 rounded-full p-3">
                <PenTool className="h-8 w-8 text-primary" />
              </div>
              <span className="font-quicksand font-bold text-3xl">LazyWrite</span>
            </div>
            <p className="text-foreground/60 text-center">
              © 2024 LazyWrite. Made with ❤️ for creative minds everywhere.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
