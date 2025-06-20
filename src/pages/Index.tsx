
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PenTool, Sparkles, Download, Star, MoveRight, CheckCircle, Users, Zap, Shield, ArrowRight } from "lucide-react";
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
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white">
        <div className="absolute inset-0 bg-grid-gray-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-orange-100"
            >
              <PenTool className="h-10 w-10 text-orange-600" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-gray-900 sm:text-7xl"
            >
              Transform text into
              <span className="relative whitespace-nowrap text-orange-600">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 418 42"
                  className="absolute left-0 top-2/3 h-[0.58em] w-full fill-orange-300/70"
                  preserveAspectRatio="none"
                >
                  <path d="m203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
                </svg>
                <span className="relative">handwriting</span>
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto mt-6 max-w-2xl text-lg text-gray-600"
            >
              Create authentic handwriting from any text with AI. Perfect for assignments, notes, and personal projects.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex items-center justify-center gap-x-6"
            >
              <Link to="/app" onClick={playClickSound}>
                <Button size="lg" className="bg-orange-600 px-8 py-3 text-white hover:bg-orange-700">
                  Start for free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/pricing">
                <Button variant="outline" size="lg" className="px-8 py-3">
                  View pricing
                </Button>
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 flex items-center justify-center gap-x-8 text-sm text-gray-600"
            >
              <div className="flex items-center gap-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>No signup required</span>
              </div>
              <div className="flex items-center gap-x-2">
                <Shield className="h-4 w-4 text-blue-500" />
                <span>100% secure</span>
              </div>
              <div className="flex items-center gap-x-2">
                <Users className="h-4 w-4 text-purple-500" />
                <span>10,000+ users</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              See the magic in action
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Watch as our AI transforms typed text into realistic handwriting
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-16 overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-gray-200"
          >
            <div className="bg-gray-50 px-6 py-4">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                <span className="ml-4 text-sm text-gray-500">Generated Handwriting</span>
              </div>
            </div>
            <div className="bg-white p-8 sm:p-12">
              <div className="font-handwriting text-xl leading-8 text-gray-900 sm:text-2xl">
                <div className="mb-6">Dear Teacher,</div>
                <div className="mb-6 ml-8">
                  I hope this letter finds you well. I wanted to thank you for all the interesting 
                  lessons this semester. Your passion for teaching really shows in every class.
                </div>
                <div className="mb-6 ml-8">
                  I&apos;m looking forward to continuing this journey of learning with your guidance.
                </div>
                <div>
                  Best regards,<br />
                  <span className="ml-8">Alex Johnson</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Powerful features to create perfect handwriting every time
            </p>
          </div>
          
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {[
                {
                  name: 'Lightning Fast',
                  description: 'Generate handwriting in seconds with our advanced AI technology.',
                  icon: Zap,
                  color: 'text-yellow-600 bg-yellow-100'
                },
                {
                  name: 'Multiple Styles',
                  description: 'Choose from various handwriting styles including cursive, print, and custom.',
                  icon: Star,
                  color: 'text-blue-600 bg-blue-100'
                },
                {
                  name: 'Print Ready',
                  description: 'Download high-resolution images perfect for any paper size.',
                  icon: Download,
                  color: 'text-green-600 bg-green-100'
                }
              ].map((feature) => (
                <motion.div
                  key={feature.name}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="flex flex-col"
                >
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${feature.color}`}>
                      <feature.icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-orange-600">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to start creating?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-orange-100">
              Join thousands of users who trust LazyWrite for their handwriting needs.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link to="/app" onClick={playClickSound}>
                <Button size="lg" className="bg-white px-8 py-3 text-orange-600 hover:bg-gray-50">
                  Start creating now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            <Link to="/pricing" className="text-gray-400 hover:text-gray-500">
              Pricing
            </Link>
          </div>
          <div className="mt-8 md:order-1 md:mt-0">
            <div className="flex items-center justify-center md:justify-start">
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-600">
                  <PenTool className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">LazyWrite</span>
              </div>
            </div>
            <p className="mt-2 text-center text-xs leading-5 text-gray-500 md:text-left">
              &copy; 2024 LazyWrite. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
