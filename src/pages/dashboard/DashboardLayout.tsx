import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../../components/navigation/Sidebar";
import ContentArea from "../../components/dashboard/ContentArea";
import MobileNavbar from "../../components/dashboard/MobileNavbar";

interface DashboardLayoutProps {
  userName?: string;
  userEmail?: string;
  userAvatar?: string;
}

const DashboardLayout = ({
  userName = "John Doe",
  userEmail = "john.doe@example.com",
  userAvatar = "",
}: DashboardLayoutProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [contentTitle, setContentTitle] = useState("Dashboard");
  const [contentDescription, setContentDescription] = useState(
    "Manage your CV and Cover Letter content",
  );

  const navigate = useNavigate();
  const location = useLocation();

  // Handle sidebar toggle
  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Handle mobile navigation
  const handleMobileNavigation = (destination: string) => {
    navigate(`/dashboard/${destination}`);
  };

  // Handle logout
  const handleLogout = () => {
    // In a real app, this would handle the logout process
    navigate("/signin");
  };

  // Update content title and description based on current route
  useEffect(() => {
    const path = location.pathname;

    if (path.includes("/cv")) {
      setContentTitle("Curriculum Vitae");
      setContentDescription("Create and edit your professional CV");
    } else if (path.includes("/cover-letter")) {
      setContentTitle("Cover Letter");
      setContentDescription("Create custom cover letters for job applications");
    } else if (path.includes("/profile")) {
      setContentTitle("User Profile");
      setContentDescription(
        "Manage your personal information and account settings",
      );
    } else if (path.includes("/settings")) {
      setContentTitle("Settings");
      setContentDescription("Configure your application preferences");
    } else {
      setContentTitle("Dashboard");
      setContentDescription("Manage your CV and Cover Letter content");
    }
  }, [location.pathname]);

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Mobile Navigation - only visible on small screens */}
      <MobileNavbar
        userName={userName}
        userAvatar={userAvatar}
        onNavigate={handleMobileNavigation}
        onLogout={handleLogout}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - hidden on mobile, visible on larger screens */}
        <div className="hidden md:block relative">
          <Sidebar
            collapsed={sidebarCollapsed}
            onToggle={handleSidebarToggle}
            userName={userName}
            userEmail={userEmail}
            userAvatar={userAvatar}
          />
        </div>

        {/* Main Content Area */}
        <ContentArea title={contentTitle} description={contentDescription}>
          <Outlet />
        </ContentArea>
      </div>
    </div>
  );
};

export default DashboardLayout;
