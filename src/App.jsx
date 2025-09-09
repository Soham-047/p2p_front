

import { Routes, Route, Navigate } from "react-router-dom";
import AuthForm from "./pages/authForm";
import Dashboard from "./pages/DashBoard";
import CommunityPage from "./pages/CommunityPage";
import Sidebar from "@/components/Sidebar";
import ProfilePage from "./pages/ProfilPage";
import ChatLayout from "./pages/chat";

// Helper to read cookie by name
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}

export default function App() {
  const isLoggedIn = !!getCookie("token"); // true if token cookie exists

  return (
    <Routes>
      {/* Default route */}
      <Route
        path="/"
        element={
          isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/login" />
        }
      />

      {/* Auth */}
      <Route path="/login" element={<AuthForm />} />
      <Route path="/signup" element={<AuthForm />} />

      {/* Dashboard layout */}
      <Route
        path="/home"
        element={
          isLoggedIn ? (
            <div className="flex min-h-screen bg-gray-50">
              <Sidebar />
              <div className="flex-1 p-2 md:p-6 pt-20 md:pt-6 ">
                <Dashboard />
              </div>
            </div>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Community Page layout */}
      <Route
        path="/community"
        element={
          isLoggedIn ? (
            <div className="flex min-h-screen bg-gray-50">
              <Sidebar />
              <div className="flex-1 p-2 md:p-6 pt-20 md:pt-6">
                <CommunityPage />
              </div>
            </div>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* message page */}
      <Route
        path="/message"
        element={
          isLoggedIn ? (
            <div className="flex h-screen bg-gray-50">
              <Sidebar />
              <ChatLayout />
            </div>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Profile Page layout */}
      <Route
        path="/profile"
        element={
          isLoggedIn ? (
            <div className="flex min-h-screen bg-gray-50">
              <Sidebar />
              <div className="flex-1 p-2 md:p-6 pt-10 md:pt-6">
                <ProfilePage />
              </div>
            </div>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
}
