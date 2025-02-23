import React from "react";
import DashboardHeader from "./DashboardHeader";
import DashboardGrid from "./dashboard/DashboardGrid";
// Since AuthModal is currently a dummy component, we'll handle the auth UI inline
// until the AuthModal component is properly implemented

interface HomeProps {
  isAuthenticated?: boolean;
  onLogin?: () => void;
  onSignup?: () => void;
  onLogout?: () => void;
}

const Home = ({
  isAuthenticated = false,
  onLogin = () => console.log("Login clicked"),
  onSignup = () => console.log("Signup clicked"),
  onLogout = () => console.log("Logout clicked"),
}: HomeProps) => {
  const handleCVCreate = () => {
    console.log("Creating new CV");
  };

  const handleCVEdit = (id: string) => {
    console.log("Editing CV:", id);
  };

  const handleCVDownload = (id: string) => {
    console.log("Downloading CV:", id);
  };

  const handleLetterGenerate = (url: string) => {
    console.log("Generating cover letter for:", url);
  };

  const handleLetterExport = (format: "pdf" | "docx") => {
    console.log("Exporting cover letter as:", format);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {isAuthenticated ? (
        <>
          <DashboardHeader
            onLogout={onLogout}
            onSettings={() => console.log("Settings clicked")}
            onProfile={() => console.log("Profile clicked")}
          />
          <main className="pt-6">
            <DashboardGrid
              onCVCreate={handleCVCreate}
              onCVEdit={handleCVEdit}
              onCVDownload={handleCVDownload}
              onLetterGenerate={handleLetterGenerate}
              onLetterExport={handleLetterExport}
              isGeneratingLetter={false}
              isProfileEditOpen={false}
            />
          </main>
        </>
      ) : (
        <div className="flex items-center justify-center min-h-screen">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Welcome to CV Builder</h2>
            <div className="space-y-4">
              <button
                onClick={onLogin}
                className="w-full px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
              >
                Login
              </button>
              <button
                onClick={onSignup}
                className="w-full px-4 py-2 border border-primary text-primary rounded hover:bg-primary/10"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
