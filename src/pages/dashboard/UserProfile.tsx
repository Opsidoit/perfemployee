import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const UserProfile = () => {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
    });
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <input
                  id="firstName"
                  type="text"
                  className="w-full p-2 border rounded-md mt-1"
                  defaultValue="John"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <input
                  id="lastName"
                  type="text"
                  className="w-full p-2 border rounded-md mt-1"
                  defaultValue="Doe"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <input
                id="email"
                type="email"
                className="w-full p-2 border rounded-md mt-1"
                defaultValue="john.doe@example.com"
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone</Label>
              <input
                id="phone"
                type="tel"
                className="w-full p-2 border rounded-md mt-1"
                defaultValue="+1 (555) 123-4567"
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
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
