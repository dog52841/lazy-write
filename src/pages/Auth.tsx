
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useNavigate } from "react-router-dom";
import { PenTool, Mail, User } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      navigate("/app");
    }
  }, [user, navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await signIn(email, password);
    
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Welcome back! 🎉");
      navigate("/app");
    }
    
    setLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await signUp(email, password, fullName);
    
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Account created! Please check your email to verify your account.");
    }
    
    setLoading(false);
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
              Join the handwriting revolution! ✍️
            </CardTitle>
            <CardDescription className="text-gray-600">
              Sign in to your account or create a new one
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="signin" className="space-y-4">
                <form onSubmit={handleSignIn} className="space-y-4">
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
                    disabled={loading}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    {loading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="signup" className="space-y-4">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div>
                    <Input
                      type="text"
                      placeholder="Full Name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="bg-orange-50/50 border-orange-200 focus:border-orange-400"
                      required
                    />
                  </div>
                  
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
                      placeholder="Password (min 6 characters)"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-orange-50/50 border-orange-200 focus:border-orange-400"
                      minLength={6}
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit"
                    disabled={loading}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    {loading ? "Creating account..." : "Create Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
