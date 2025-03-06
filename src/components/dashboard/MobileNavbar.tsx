import React, { useState } from "react";
import { Menu, X, FileText, Mail, User, LogOut, Save } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";

interface MobileNavbarProps {
  userName?: string;
  userAvatar?: string;
  onNavigate?: (destination: string) => void;
  onLogout?: () => void;
}

const MobileNavbar = ({
  userName = "John Doe",
  userAvatar = "",
  onNavigate = () => {},
  onLogout = () => {},
}: MobileNavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigation = (destination: string) => {
    onNavigate(destination);
    setIsOpen(false);
  };

  return (
    <div className="h-16 w-full bg-background border-b flex items-center justify-between px-4 md:hidden">
      <div className="flex items-center">
        <h1 className="text-xl font-bold">CV Assistant</h1>
      </div>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[280px] p-0">
          <div className="flex flex-col h-full bg-background">
            <div className="p-4 flex justify-between items-center">
              <h2 className="text-xl font-bold">CV Assistant</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <Separator />

            <div className="p-4">
              <div className="flex items-center space-x-3 mb-6">
                <Avatar>
                  <AvatarImage src={userAvatar} alt={userName} />
                  <AvatarFallback>
                    {userName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{userName}</p>
                  <p className="text-sm text-muted-foreground">Free Plan</p>
                </div>
              </div>

              <nav className="space-y-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => handleNavigation("cv")}
                >
                  <FileText className="mr-2 h-5 w-5" />
                  Curriculum Vitae
                </Button>

                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => handleNavigation("saved-cvs")}
                >
                  <Save className="mr-2 h-5 w-5" />
                  Saved CVs
                </Button>

                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => handleNavigation("cover-letter")}
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Cover Letter
                </Button>

                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => handleNavigation("profile")}
                >
                  <User className="mr-2 h-5 w-5" />
                  Profile
                </Button>
              </nav>
            </div>

            <div className="mt-auto p-4">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={onLogout}
              >
                <LogOut className="mr-2 h-5 w-5" />
                Log out
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavbar;
