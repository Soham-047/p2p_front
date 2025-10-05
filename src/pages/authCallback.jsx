import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthCallback() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const handleGoogleCallback = async () => {
      try {
        console.log("AuthCallback mounted");

        // Read from URL fragment (after #)
        const hash = window.location.hash.substring(1); // remove #
        const params = new URLSearchParams(hash);
        const access_token = params.get("access_token"); // <-- access token from Google
        const state = params.get("state");

        console.log("Google access_token:", access_token);
        console.log("State:", state);

        if (!access_token) {
          setError("No access token found in the URL.");
          setLoading(false);
          return;
        }

        // Send access_token to backend
        const res = await fetch(`${API_BASE_URL}/api/auth/google/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ access_token }),
          credentials: "include",
        });

        const data = await res.json();
        console.log("Backend response:", data);

        if (!res.ok) {
          setError(data.message || "Login failed on server.");
          setLoading(false);
          return;
        }

        // Optionally store token in cookie/localStorage
        if (data.access) {
          document.cookie = `token=${data.access}; path=/; max-age=${7*24*60*60}; SameSite=Strict`;
        }

        // Redirect based on state
        let next = "/home";
        if (state) {
          try {
            const parsed = JSON.parse(decodeURIComponent(state));
            if (parsed.next) next = parsed.next;
          } catch (err) {
            console.warn("Invalid state:", err);
          }
        }

        navigate(next);
      } catch (err) {
        console.error("Google login error:", err);
        setError("An unexpected error occurred during login.");
      } finally {
        setLoading(false);
      }
    };

    handleGoogleCallback();
  }, [navigate, API_BASE_URL]);

  if (loading) return <div className="flex justify-center items-center min-h-screen text-gray-600 text-lg">Processing Google login...</div>;
  if (error) return <div className="flex justify-center items-center min-h-screen text-red-600 text-lg">{error}</div>;

  return null;
}
