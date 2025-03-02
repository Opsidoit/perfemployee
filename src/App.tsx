import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import LandingPage from "./pages/LandingPage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import CVEditor from "./pages/dashboard/CVEditor";
import CoverLetterEditor from "./pages/dashboard/CoverLetterEditor";
import UserProfile from "./pages/dashboard/UserProfile";
import routes from "tempo-routes";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/sign-in" element={<SignInPage />} />

          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="cv" element={<CVEditor />} />
            <Route path="cv/:id" element={<CVEditor />} />
            <Route path="cover-letter" element={<CoverLetterEditor />} />
            <Route path="cover-letter/:id" element={<CoverLetterEditor />} />
            <Route path="profile" element={<UserProfile />} />
          </Route>
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        <Toaster />
      </>
    </Suspense>
  );
}

export default App;
