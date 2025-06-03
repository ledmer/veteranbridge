
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { api, setAuthToken } from "@/lib/api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus, LogIn } from "lucide-react";
import { toast } from "sonner";

interface AuthButtonsProps {
  onUserCreated: () => void;
}

const AuthButtons = ({ onUserCreated }: AuthButtonsProps) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({ 
    email: "", 
    password: "", 
    confirmPassword: "",
    fullName: ""
  });

const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const { data } = await api.post("/api/token/", {
      username: loginData.email,       
      password: loginData.password,
    });
    localStorage.setItem("access", data.access);
    localStorage.setItem("refresh", data.refresh);
    setAuthToken(data.access);
    toast.success("Login successful!");
    setIsLoginOpen(false);
    setLoginData({ email: "", password: "" });
  } catch (err: any) {
    toast.error(err.response?.data?.detail ?? "Login failed");
  }
};


const handleSignup = async (e: React.FormEvent) => {
  e.preventDefault();
  if (signupData.password !== signupData.confirmPassword) {
    toast.error("Passwords don't match!");
    return;
  }
  try {
    console.log("Signup success:");
    const res = await api.post("/api/v1/register/", {
      email: signupData.email,
      password: signupData.password,
      full_name: signupData.fullName,
    });
    console.log("Signup success:", res.data);
    toast.success("Account created successfully!");
    setIsSignupOpen(false);
    setSignupData({ email: "", password: "", confirmPassword: "", fullName: "" });
    onUserCreated();                    
  } catch (err: any) {
  console.error("signup 400 detail 👉", err?.response?.data);
  toast.error(
    err?.response?.data?.email?.[0] ||
    err?.response?.data?.password?.[0] ||
    err?.response?.data?.full_name?.[0] ||
    err?.response?.data?.detail ||
    "Signup failed"
  );
}
};

  return (
    <div className="flex gap-4">
      {/* Login Dialog */}
      <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <LogIn className="mr-2 h-4 w-4" />
            Login
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Welcome Back</DialogTitle>
            <DialogDescription>
              Sign in to your account to access your personalized resources.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="login-email">Email</Label>
              <Input
                id="login-email"
                type="email"
                value={loginData.email}
                onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="login-password">Password</Label>
              <Input
                id="login-password"
                type="password"
                value={loginData.password}
                onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                placeholder="Enter your password"
                required
              />
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              Sign In
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Signup Dialog */}
      <Dialog open={isSignupOpen} onOpenChange={setIsSignupOpen}>
        <DialogTrigger asChild>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            <UserPlus className="mr-2 h-4 w-4" />
            Create Account
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Join Our Community</DialogTitle>
            <DialogDescription>
              Create an account to access personalized veteran support resources.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="signup-name">Full Name</Label>
              <Input
                id="signup-name"
                type="text"
                value={signupData.fullName}
                onChange={(e) => setSignupData({...signupData, fullName: e.target.value})}
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-email">Email</Label>
              <Input
                id="signup-email"
                type="email"
                value={signupData.email}
                onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-password">Password</Label>
              <Input
                id="signup-password"
                type="password"
                value={signupData.password}
                onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                placeholder="Create a password"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                value={signupData.confirmPassword}
                onChange={(e) => setSignupData({...signupData, confirmPassword: e.target.value})}
                placeholder="Confirm your password"
                required
              />
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              Create Account
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AuthButtons;