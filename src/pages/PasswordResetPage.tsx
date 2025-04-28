import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";

const PasswordResetPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const [resetToken, setResetToken] = useState<string | null>(null);
  const { resetPassword, loading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if there's a reset token in the URL
    const hash = location.hash;
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get("code");

    if (hash && hash.includes("type=recovery")) {
      // This is a password recovery flow from Supabase
      setResetToken("recovery");

      // Extract access token if available
      const accessToken = hash.match(/access_token=([^&]*)/)?.[1];
      if (accessToken) {
        localStorage.setItem("sb-recovery-token", accessToken);
      }
    } else if (code) {
      // Handle the code parameter from email link
      setResetToken("recovery");

      // Exchange the code for a session
      const exchangeCodeForSession = async () => {
        try {
          const { data, error } =
            await supabase.auth.exchangeCodeForSession(code);
          if (error) throw error;
          if (data && data.session) {
            // Session established, now user can reset password
            toast({
              title: "Authentication successful",
              description: "You can now reset your password",
            });
          }
        } catch (error) {
          console.error("Error exchanging code for session:", error);
          toast({
            title: "Error",
            description: "Invalid or expired reset link",
            variant: "destructive",
          });
        }
      };

      exchangeCodeForSession();
    }
  }, [location, toast]);

  const handleSendResetEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      await resetPassword(email);
      setResetSent(true);
    } catch (error) {
      console.error("Error sending reset email:", error);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || password !== confirmPassword) return;

    try {
      // Use the updateUser method directly with the access token from localStorage
      const { data, error } = await supabase.auth.updateUser({ password });

      if (error) throw error;

      // Clear the recovery token
      localStorage.removeItem("sb-recovery-token");

      toast({
        title: "Success",
        description: "Your password has been reset successfully.",
      });

      navigate("/sign-in");
    } catch (error: any) {
      console.error("Error resetting password:", error);
      toast({
        title: "Error",
        description: "Failed to reset your password. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        {!resetToken ? (
          <form onSubmit={handleSendResetEmail}>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">
                Reset your password
              </CardTitle>
              <CardDescription className="text-center">
                {resetSent
                  ? "Check your email for a password reset link"
                  : "Enter your email to receive a password reset link"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {!resetSent && (
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.mail@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                  />
                </div>
              )}
              {!resetSent && (
                <Button className="w-full" type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send reset link"
                  )}
                </Button>
              )}
              {resetSent && (
                <div className="text-center text-sm text-muted-foreground">
                  <p>A password reset link has been sent to your email.</p>
                  <p className="mt-2">
                    Click the link in the email to reset your password.
                  </p>
                </div>
              )}
            </CardContent>
          </form>
        ) : (
          <form onSubmit={handleResetPassword}>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">
                Create new password
              </CardTitle>
              <CardDescription className="text-center">
                Enter your new password below
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={loading}
                />
              </div>
              <Button
                className="w-full"
                type="submit"
                disabled={loading || password !== confirmPassword}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Resetting...
                  </>
                ) : (
                  "Reset Password"
                )}
              </Button>
            </CardContent>
          </form>
        )}
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-center text-muted-foreground">
            <Link to="/sign-in" className="text-primary hover:underline">
              Back to sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PasswordResetPage;
