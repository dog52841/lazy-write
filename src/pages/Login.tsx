
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { PenTool, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Welcome back, scribbler! 🎉");
    // Add actual auth logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2">
            <PenTool className="h-8 w-8 text-orange-500" />
            <span className="font-quicksand font-bold text-2xl text-gray-900">LazyWrite</span>
          </Link>
        </div>

        <Card className="bg-white/90 backdrop-blur-sm border-orange-100 shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="font-quicksand text-2xl text-gray-900">
              Welcome back, scribbler! ✍️
            </CardTitle>
            <CardDescription className="text-gray-600">
              Sign in to continue your handwriting journey
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <Button 
              className="w-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
              variant="outline"
            >
              <Mail className="h-4 w-4 mr-2" />
              Continue with Google
            </Button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or continue with</span>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-orange-50/50 border-orange-200 focus:border-orange-400"
                  required
                />
              </div>
              
              <div>
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-orange-50/50 border-orange-200 focus:border-orange-400"
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-orange-500 hover:bg-orange-600 text-white"
              >
                Sign In
              </Button>
            </form>

            <div className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <button className="text-orange-600 hover:text-orange-700 font-medium">
                Sign up
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
