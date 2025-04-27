import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { FileText, FileEdit, User, Settings, LogOut, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

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
  const location = useLocation();
  const { signOut, user } = useAuth();

  const handleSignOut = (e: React.MouseEvent) => {
    e.preventDefault();
    signOut();
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 border-r bg-card p-4 hidden md:block">
        <div className="mb-8">
          <Link to="/dashboard" className="flex items-center">
            <span className="flex my-1 px-1 py-1.5 justify-center items-end via-[0%] via-inherit from-[67%] from-[#353ec8] font-extrabold text-2xl leading-10 text-right tracking-wide font-sans container bg-[#NaNNaNNaN] bg-[#NaNNaNNaN] opacity-100 bg-inherit text-[#26cef3]">
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
                active={
                  location.pathname.includes("/dashboard/cv") &&
                  !location.pathname.includes("/dashboard/saved-cvs")
                }
              />
              <SidebarItem
                icon={<Save className="h-5 w-5" />}
                label="Saved CVs"
                to="/dashboard/saved-cvs"
                active={location.pathname.includes("/dashboard/saved-cvs")}
              />
              <SidebarItem
                icon={<FileEdit className="h-5 w-5" />}
                label="Cover Letter"
                to="/dashboard/cover-letter"
                active={
                  location.pathname.includes("/dashboard/cover-letter") &&
                  !location.pathname.includes("/dashboard/saved-cover-letters")
                }
              />
              <SidebarItem
                icon={<Save className="h-5 w-5" />}
                label="Saved Cover Letters"
                to="/dashboard/saved-cover-letters"
                active={location.pathname.includes(
                  "/dashboard/saved-cover-letters",
                )}
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
                active={location.pathname === "/dashboard/profile"}
              />
            </div>
          </div>
        </div>

        <div className="absolute bottom-4 w-52">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={handleSignOut}
          >
            <LogOut className="h-5 w-5 mr-2" />
            Sign Out
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
          <button
            onClick={handleSignOut}
            className="flex flex-col items-center p-2"
          >
            <LogOut className="h-5 w-5" />
            <span className="text-xs">Sign Out</span>
          </button>
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
