import { Suspense } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home";
import LandingPage from "./pages/LandingPage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import PasswordResetPage from "./pages/PasswordResetPage";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import CVEditor from "./pages/dashboard/CVEditor";
import SavedCVs from "./pages/dashboard/SavedCVs";
import CoverLetterEditor from "./pages/dashboard/CoverLetterEditor";
import SavedCoverLetters from "./pages/dashboard/SavedCoverLetters";
import UserProfile from "./pages/dashboard/UserProfile";
import routes from "tempo-routes";
import { Toaster } from "./components/ui/toaster";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { CVProvider } from "@/contexts/CVContext";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/sign-in" replace />;

  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/reset-password" element={<PasswordResetPage />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardHome />} />
        <Route path="cv" element={<CVEditor />} />
        <Route path="cv/:id" element={<CVEditor />} />
        <Route path="saved-cvs" element={<SavedCVs />} />
        <Route path="cover-letter" element={<CoverLetterEditor />} />
        <Route path="cover-letter/:id" element={<CoverLetterEditor />} />
        <Route path="saved-cover-letters" element={<SavedCoverLetters />} />
        <Route path="profile" element={<UserProfile />} />
      </Route>

      {/* For the tempo routes */}
      {import.meta.env.VITE_TEMPO === "true" && <Route path="/tempobook/*" />}
    </Routes>
  );
}

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <AuthProvider>
        <CVProvider>
          <AppRoutes />
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
          <Toaster />
        </CVProvider>
      </AuthProvider>
    </Suspense>
  );
}

export default App;
