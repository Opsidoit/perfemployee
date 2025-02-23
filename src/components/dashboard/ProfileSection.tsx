import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Pencil } from "lucide-react";

interface ProfileData {
  name: string;
  email: string;
  avatar: string;
  title: string;
  location: string;
}

interface ProfileSectionProps {
  profile?: ProfileData;
  isOpen?: boolean;
}

const defaultProfile: ProfileData = {
  name: "John Doe",
  email: "john.doe@example.com",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
  title: "Software Engineer",
  location: "San Francisco, CA",
};

const ProfileSection = ({
  profile = defaultProfile,
  isOpen = true,
}: ProfileSectionProps) => {
  return (
    <Card className="w-full h-full bg-white">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Profile</span>
          <Dialog open={isOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <Pencil className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    defaultValue={profile.name}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="title"
                    defaultValue={profile.title}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="location" className="text-right">
                    Location
                  </Label>
                  <Input
                    id="location"
                    defaultValue={profile.location}
                    className="col-span-3"
                  />
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="h-24 w-24">
            <AvatarImage src={profile.avatar} alt={profile.name} />
            <AvatarFallback>
              {profile.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h3 className="text-2xl font-semibold">{profile.name}</h3>
            <p className="text-muted-foreground">{profile.title}</p>
            <p className="text-sm text-muted-foreground">{profile.location}</p>
            <p className="text-sm text-muted-foreground mt-2">
              {profile.email}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileSection;
