import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FcGoogle } from "react-icons/fc";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;// change to your API

export default function AuthForm() {
  const [mode, setMode] = useState("signup");
  const [loading, setLoading] = useState(false);

  // Form data states
  const [collegeEmail, setCollegeEmail] = useState("");
  const [batch, setBatch] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      if (mode === "signup") {
        const res = await fetch(`${API_BASE_URL}/api/auth/register/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            college_email: collegeEmail,
            batch: batch,
          }),
        });
  
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || "Signup failed");
        }
  
        alert("✅ Check your email for username and password");
        setMode("signin");
  
      } else {
        const res = await fetch(`${API_BASE_URL}/api/auth/login/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username,
            password,
          }),
        });
  
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || "Login failed");
        }
  
       // Store in cookie for 7 days
document.cookie = `token=${data.access}; path=/; max-age=${7 * 24 * 60 * 60};  SameSite=Strict`;

        window.location.href = "/home";
      }
    } catch (err) {
      console.error(err);
      alert(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="w-full flex justify-between items-center px-2 md:px-4 py-10">
        <h1 className="flex items-center gap-2 text-5xl font-bold text-indigo-600">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/64px-User-avatar.svg.png"
            alt="logo"
            className="w-8 h-8"
          />
          Back Benchers
        </h1>
        <div className="text-2xl md:pr-10 text-gray-700">
          {mode === "signup" ? (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setMode("signin")}
                className="text-indigo-600 font-medium hover:underline"
              >
                Sign In
              </button>
            </>
          ) : (
            <>
              Don’t have an account?{" "}
              <button
                onClick={() => setMode("signup")}
                className="text-indigo-600 font-medium hover:underline"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 items-center justify-center md:w-full px-4">
        <div className="flex justify-around rounded-lg overflow-hidden w-full items-center ">
          {/* Left Illustration */}
          <div className="hidden md:flex items-center  p-1 h-[600px] w-4/12">
            <img
              src="https://illustrations.popsy.co/white/student-graduation.svg"
              alt="Graduation Illustration"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Form Section */}
          <div className="flex flex-col items-center text-center md:max-w-2xl min-h-[600px]  gap-10">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              {mode === "signup"
                ? "Bridging Today’s Students with Yesterday’s Graduates."
                : "Welcome Back! Please Sign In."}
            </h2>

            <form
              className="w-full max-w-[500px] space-y-6"
              onSubmit={handleSubmit}
            >
              {mode === "signup" ? (
                <>
                  <Input
                    className="w-full rounded-4xl h-15 focus-visible:ring-1 focus-visible:ring-purple-500"
                    type="email"
                    placeholder="Enter your college email"
                    value={collegeEmail}
                    onChange={(e) => setCollegeEmail(e.target.value)}
                    required
                  />
                  <Input
                    className="w-full rounded-4xl h-15 focus-visible:ring-1 focus-visible:ring-purple-500"
                    type="text"
                    placeholder="Enter your batch"
                    value={batch}
                    onChange={(e) => setBatch(e.target.value)}
                    required
                  />
                </>
              ) : (
                <>
                  <Input
                    className="w-full rounded-4xl h-15 focus-visible:ring-1 focus-visible:ring-purple-500"
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                  <Input
                    className="w-full rounded-4xl h-15 focus-visible:ring-1 focus-visible:ring-purple-500"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </>
              )}

              <Button
                className="w-full bg-blue-500 h-15 rounded-4xl hover:bg-blue-600 text-white font-semibold"
                disabled={loading}
              >
                {loading
                  ? mode === "signup"
                    ? "Signing up..."
                    : "Signing in..."
                  : mode === "signup"
                  ? "Sign Up"
                  : "Sign In"}
              </Button>
            </form>

            
            
            {/* Footer */}
            <p className="text-xs text-gray-500 mt-6">
              By continuing, you agree with our{" "}
              <a href="#" className="text-indigo-600 hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>

          {/* Right Illustration */}
          <div className="hidden md:flex items-center justify-center bg-gray-50 p-1 h-[500px] w-4/12">
            <img
              src="https://illustrations.popsy.co/white/studying.svg"
              alt="Studying Illustration"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
