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
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem("access"));
  const [loginUsername, setLoginUsername] = useState("");

const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const { data } = await api.post("/api/token/", {
      username: loginUsername, // Use username, not email
      password: loginData.password,
    });
    localStorage.setItem("access", data.access);
    localStorage.setItem("refresh", data.refresh);
    setAuthToken(data.access);
    toast.success("Login successful!");
    setIsLoginOpen(false);
    setLoginData({ email: "", password: "" });
    setLoginUsername("");
    setIsAuthenticated(true);
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
  let baseUsername = signupData.fullName.trim().toLowerCase().replace(/\s+/g, "_");
  let username = baseUsername;
  let suffix = 1;
  let isUnique = false;
  let finalUsername = username;
  try {
    while (!isUnique) {
      try {
        await api.post("/api/v1/register/", {
          username,
          email: signupData.email,
          password: signupData.password,
        });
        isUnique = true;
        finalUsername = username;
      } catch (err: any) {
        if (err?.response?.data?.username?.[0]?.includes("already exists")) {
          username = `${baseUsername}_${suffix++}`;
        } else {
          toast.error(
            err?.response?.data?.email?.[0] ||
            err?.response?.data?.password?.[0] ||
            err?.response?.data?.username?.[0] ||
            err?.response?.data?.detail ||
            "Signup failed"
          );
          return;
        }
      }
    }
    toast.success(`Account created successfully! Your username is: ${finalUsername}`);
    setIsSignupOpen(false);
    setSignupData({ email: "", password: "", confirmPassword: "", fullName: "" });
    setIsAuthenticated(true);
    onUserCreated();
  } catch (err: any) {
    console.error("signup 400 detail 👉", err?.response?.data);
    toast.error(
      err?.response?.data?.email?.[0] ||
      err?.response?.data?.password?.[0] ||
      err?.response?.data?.username?.[0] ||
      err?.response?.data?.detail ||
      "Signup failed"
    );
  }
};

const handleLogout = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  setAuthToken();
  setIsAuthenticated(false);
  toast.success("Signed out successfully.");
};

  return (
    <div className="flex gap-4">
      {!isAuthenticated && (
        <>
          {/* Login Dialog */}
          <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <LogIn className="w-4 h-4 mr-2" />
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
                  <Label htmlFor="login-username">Username</Label>
                  <Input
                    id="login-username"
                    type="text"
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    placeholder="Enter your username"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    type="password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
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
                <UserPlus className="w-4 h-4 mr-2" />
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
                    onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
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
                    onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
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
                    onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
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
                    onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
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
        </>
      )}
      {isAuthenticated && (
        <Button variant="outline" size="sm" onClick={handleLogout}>
          Sign Out
        </Button>
      )}
    </div>
  );
};

export default AuthButtons;