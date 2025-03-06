import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Separator } from "../ui/separator";
import {
  FileText,
  FileEdit,
  User,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Home,
  Save,
} from "lucide-react";

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
  userName?: string;
  userEmail?: string;
  userAvatar?: string;
}

const Sidebar = ({
  collapsed = false,
  onToggle = () => {},
  userName = "John Doe",
  userEmail = "john.doe@example.com",
  userAvatar = "",
}: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(collapsed);

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
    onToggle();
  };

  return (
    <div
      className={`h-full bg-background border-r flex flex-col transition-all duration-300 ${isCollapsed ? "w-20" : "w-[280px]"}`}
    >
      {/* Toggle button */}
      <div className="absolute right-[-12px] top-6 z-10">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full h-6 w-6 bg-background shadow-md"
          onClick={handleToggle}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* User profile section */}
      <div className={`p-4 ${isCollapsed ? "items-center" : ""} flex flex-col`}>
        <div
          className={`flex ${isCollapsed ? "justify-center" : "items-center gap-3"}`}
        >
          <Avatar className="h-10 w-10">
            <AvatarImage src={userAvatar} alt={userName} />
            <AvatarFallback>
              {userName
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="font-medium text-sm">{userName}</span>
              <span className="text-xs text-muted-foreground truncate">
                {userEmail}
              </span>
            </div>
          )}
        </div>
      </div>

      <Separator />

      {/* Navigation links */}
      <div className="flex-1 overflow-auto py-4">
        <nav className="flex flex-col gap-2 px-2">
          <TooltipProvider delayDuration={0}>
            <NavItem
              to="/dashboard"
              icon={<Home className="h-5 w-5" />}
              label="Dashboard"
              isCollapsed={isCollapsed}
            />
            <NavItem
              to="/dashboard/cv"
              icon={<FileText className="h-5 w-5" />}
              label="Curriculum Vitae"
              isCollapsed={isCollapsed}
            />
            <NavItem
              to="/dashboard/saved-cvs"
              icon={<Save className="h-5 w-5" />}
              label="Saved CVs"
              isCollapsed={isCollapsed}
            />
            <NavItem
              to="/dashboard/cover-letter"
              icon={<FileEdit className="h-5 w-5" />}
              label="Cover Letter"
              isCollapsed={isCollapsed}
            />
            <NavItem
              to="/dashboard/profile"
              icon={<User className="h-5 w-5" />}
              label="Profile"
              isCollapsed={isCollapsed}
            />
          </TooltipProvider>
        </nav>
      </div>

      {/* Footer actions */}
      <div className="p-4 mt-auto">
        <Separator className="mb-4" />
        <TooltipProvider delayDuration={0}>
          <NavItem
            to="/dashboard/settings"
            icon={<Settings className="h-5 w-5" />}
            label="Settings"
            isCollapsed={isCollapsed}
          />
          <NavItem
            to="/signout"
            icon={<LogOut className="h-5 w-5" />}
            label="Sign Out"
            isCollapsed={isCollapsed}
          />
        </TooltipProvider>
      </div>
    </div>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isCollapsed: boolean;
}

const NavItem = ({ to, icon, label, isCollapsed }: NavItemProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          to={to}
          className={`flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors ${isCollapsed ? "justify-center" : "gap-3"}`}
        >
          {icon}
          {!isCollapsed && <span>{label}</span>}
        </Link>
      </TooltipTrigger>
      {isCollapsed && <TooltipContent side="right">{label}</TooltipContent>}
    </Tooltip>
  );
};

export default Sidebar;
