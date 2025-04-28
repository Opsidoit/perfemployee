import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User, Mail, Phone, MapPin, Briefcase, Calendar } from "lucide-react";

const UserProfile = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto bg-background">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Profile sidebar */}
        <div className="w-full md:w-1/3">
          <Card className="overflow-hidden">
            <div className="bg-primary h-24"></div>
            <div className="flex justify-center -mt-12">
              <Avatar className="h-24 w-24 border-4 border-background">
                <AvatarImage
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
                  alt="User"
                />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
            <CardContent className="pt-4 text-center">
              <h3 className="text-2xl font-bold">John Doe</h3>
              <p className="text-muted-foreground">Senior UX Designer</p>
              <div className="flex justify-center gap-2 mt-4">
                <Button variant="outline" size="sm">
                  Edit Profile
                </Button>
                <Button variant="outline" size="sm">
                  Settings
                </Button>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>john.doe@example.com</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>San Francisco, CA</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <span>TechCorp Inc.</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Joined January 2022</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile content */}
        <div className="w-full md:w-2/3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>About Me</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Experienced UX designer with over 8 years of creating
                user-centered digital experiences. Passionate about solving
                complex problems through intuitive and accessible design
                solutions. Specialized in product design, user research, and
                design systems.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {[
                  "UI Design",
                  "UX Research",
                  "Figma",
                  "Prototyping",
                  "User Testing",
                  "Design Systems",
                  "Accessibility",
                  "Adobe Creative Suite",
                ].map((skill) => (
                  <div
                    key={skill}
                    className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: "Updated CV template", time: "2 hours ago" },
                  { action: "Created new cover letter", time: "Yesterday" },
                  { action: "Edited personal information", time: "3 days ago" },
                  { action: "Added new work experience", time: "1 week ago" },
                ].map((activity, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center pb-2 border-b last:border-0"
                  >
                    <span>{activity.action}</span>
                    <span className="text-sm text-muted-foreground">
                      {activity.time}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
