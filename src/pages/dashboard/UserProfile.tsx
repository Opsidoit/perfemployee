import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";

const UserProfile = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({
    full_name: "",
    email: "",
  });

  useEffect(() => {
    if (user) {
      // Immediately set profile with user data from auth context
      setProfile({
        full_name: user?.user_metadata?.full_name || "",
        email: user?.email || "",
      });
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      console.log("Fetching profile for user ID:", user.id);
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error && error.code !== "PGRST116") {
        // PGRST116 is the error code for no rows returned
        console.error("Supabase error:", error);
        throw error;
      }

      console.log("Profile data from Supabase:", data);

      if (data) {
        setProfile({
          full_name: data.full_name || user?.user_metadata?.full_name || "",
          email: user.email || "",
        });
      } else {
        // If no profile exists, create one with the user metadata
        console.log("No profile found, creating one with user metadata");
        const { error: insertError } = await supabase.from("profiles").insert({
          id: user.id,
          full_name: user.user_metadata?.full_name || "",
          email: user.email,
        });

        if (insertError) {
          console.error("Error creating profile:", insertError);
        }
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast({
        title: "Error",
        description: "Failed to load profile data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      // Update user metadata as well to ensure consistency
      const { error: metadataError } = await supabase.auth.updateUser({
        data: { full_name: profile.full_name },
      });

      if (metadataError) {
        console.error("Error updating user metadata:", metadataError);
      }

      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: profile.full_name,
          phone: profile.phone,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (error) throw error;

      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <input
                id="fullName"
                type="text"
                className="w-full p-2 border rounded-md mt-1"
                value={profile.full_name}
                onChange={(e) =>
                  setProfile({ ...profile, full_name: e.target.value })
                }
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <input
                id="email"
                type="email"
                className="w-full p-2 border rounded-md mt-1"
                value={profile.email}
                disabled
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="currentPassword">Current Password</Label>
              <input
                id="currentPassword"
                type="password"
                className="w-full p-2 border rounded-md mt-1"
                placeholder="Enter your current password"
              />
            </div>

            <div>
              <Label htmlFor="newPassword">New Password</Label>
              <input
                id="newPassword"
                type="password"
                className="w-full p-2 border rounded-md mt-1"
                placeholder="Enter new password"
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <input
                id="confirmPassword"
                type="password"
                className="w-full p-2 border rounded-md mt-1"
                placeholder="Confirm new password"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="emailNotifications" defaultChecked />
              <Label htmlFor="emailNotifications">Email notifications</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="marketingEmails" />
              <Label htmlFor="marketingEmails">Marketing emails</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="productUpdates" defaultChecked />
              <Label htmlFor="productUpdates">Product updates</Label>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-2">
          <Button variant="outline">Cancel</Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
