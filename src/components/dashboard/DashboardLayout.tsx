import React from "react";
import { Link, Outlet } from "react-router-dom";
import { FileText, FileEdit, User, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  active?: boolean;
}

const SidebarItem = ({ icon, label, to, active = false }: SidebarItemProps) => {
  return (
    <Link to={to}>
      <Button
        variant={active ? "default" : "ghost"}
        className={`w-full justify-start mb-1 ${active ? "bg-primary text-primary-foreground" : ""}`}
      >
        {icon}
        <span className="ml-2">{label}</span>
      </Button>
    </Link>
  );
};

const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 border-r bg-card p-4 hidden md:block">
        <div className="mb-8">
          <Link to="/" className="flex items-center">
            <span className="font-extrabold text-2xl text-primary">
              Perfemployee
            </span>
          </Link>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="mb-2 text-sm font-medium text-muted-foreground">
              Documents
            </h3>
            <div className="space-y-1">
              <SidebarItem
                icon={<FileText className="h-5 w-5" />}
                label="Curriculum Vitae"
                to="/dashboard/cv"
              />
              <SidebarItem
                icon={<FileEdit className="h-5 w-5" />}
                label="Cover Letter"
                to="/dashboard/cover-letter"
              />
            </div>
          </div>

          <div>
            <h3 className="mb-2 text-sm font-medium text-muted-foreground">
              Account
            </h3>
            <div className="space-y-1">
              <SidebarItem
                icon={<User className="h-5 w-5" />}
                label="Profile"
                to="/dashboard/profile"
              />
              <SidebarItem
                icon={<Settings className="h-5 w-5" />}
                label="Settings"
                to="/dashboard/settings"
              />
            </div>
          </div>
        </div>

        <div className="absolute bottom-4 w-52">
          <Button variant="outline" className="w-full justify-start" asChild>
            <Link to="/">
              <LogOut className="h-5 w-5 mr-2" />
              Sign Out
            </Link>
          </Button>
        </div>
      </div>

      {/* Mobile sidebar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-10 bg-background border-t">
        <div className="flex justify-around p-2">
          <Link to="/dashboard/cv" className="flex flex-col items-center p-2">
            <FileText className="h-5 w-5" />
            <span className="text-xs">CV</span>
          </Link>
          <Link
            to="/dashboard/cover-letter"
            className="flex flex-col items-center p-2"
          >
            <FileEdit className="h-5 w-5" />
            <span className="text-xs">Cover Letter</span>
          </Link>
          <Link
            to="/dashboard/profile"
            className="flex flex-col items-center p-2"
          >
            <User className="h-5 w-5" />
            <span className="text-xs">Profile</span>
          </Link>
          <Link
            to="/dashboard/settings"
            className="flex flex-col items-center p-2"
          >
            <Settings className="h-5 w-5" />
            <span className="text-xs">Settings</span>
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
