// import React, { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { FcGoogle } from "react-icons/fc";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// export default function AuthForm() {
//   const [mode, setMode] = useState("signup");
//   const [loading, setLoading] = useState(false);
//   const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
//   const GOOGLE_REDIRECT_URI = window.location.origin; // Use your frontend URL


//   // Form data states
//   const [collegeEmail, setCollegeEmail] = useState("");
//   const [full_name, setFull_name] = useState("");
//   const [batch, setBatch] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
  
//     try {
//       if (mode === "signup") {
//         const res = await fetch(`${API_BASE_URL}/api/users-app/auth/register/`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             full_name: full_name,
//             college_email: collegeEmail,
//             batch: batch,
//             is_current_student: true,
//           }),
//         });
  
//         const data = await res.json();
//         if (!res.ok) {
//           throw new Error(data.message || "Signup failed");
//         }
  
//         alert("✅ Check your email for username and password");
//         setMode("signin");
  
//       } else {
//         const res = await fetch(`${API_BASE_URL}/api/users-app/auth/login/`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             username,
//             password,
//           }),
//         });
  
//         const data = await res.json();
//         if (!res.ok) {
//           throw new Error(data.message || "Login failed");
//         }
  
//        // Store in cookie for 7 days
// document.cookie = `token=${data.access}; path=/; max-age=${7 * 24 * 60 * 60};  SameSite=Strict`;

//         window.location.href = "/home";
//       }
//     } catch (err) {
//       console.error(err);
//       alert(err.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };
  

//   const handleGoogleLogin = async () => {
//     try {
//       const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(GOOGLE_REDIRECT_URI)}&response_type=token&scope=openid email profile`;
      
//       // Open Google OAuth popup
//       const popup = window.open(authUrl, "googleAuth", "width=500,height=600,scrollbars=yes");
      
//       if (!popup) {
//         alert("Please allow popups for this site");
//         return;
//       }
      
//       // Wait for Google to redirect and capture token
//       const token = await new Promise((resolve, reject) => {
//         let hasResolved = false;
        
//         const interval = setInterval(() => {
//           // Check if popup was closed by user
//           if (!popup || popup.closed) {
//             if (!hasResolved) {
//               clearInterval(interval);
//               reject(new Error("Authentication cancelled"));
//             }
//             return;
//           }
          
//           try {
//             // Try to access popup location (will throw error if cross-origin)
//             const popupUrl = popup.location.href;
            
//             // If we can read the URL, it means we're back on our domain
//             if (popupUrl.includes(GOOGLE_REDIRECT_URI.replace('http://', '').replace('https://', ''))) {
//               // Check for access token in hash
//               if (popup.location.hash) {
//                 const hash = popup.location.hash.substring(1);
//                 const params = new URLSearchParams(hash);
//                 const accessToken = params.get("access_token");
                
//                 if (accessToken) {
//                   hasResolved = true;
//                   clearInterval(interval);
//                   popup.close();
//                   resolve(accessToken);
//                 }
//               }
//             }
//           } catch (err) {
//             // Cross-origin error means popup is still on Google's domain - this is expected
//             // Just continue checking
//           }
//         }, 100); // Check more frequently (every 100ms)
        
//         // Timeout after 3 minutes
//         setTimeout(() => {
//           if (!hasResolved) {
//             clearInterval(interval);
//             if (popup && !popup.closed) {
//               popup.close();
//             }
//             reject(new Error("Authentication timeout"));
//           }
//         }, 180000);
//       });
      
//       console.log("Got access token, sending to backend...");
      
//       // Send Google token to backend
//       const res = await fetch(`${API_BASE_URL}/api/auth/google/`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ access_token: token }),
//       });
      
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || data.detail || "Google login failed");
      
//       console.log("Backend response:", data);
      
//       // Save JWT token & redirect
//       document.cookie = `token=${data.access}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Strict`;
//       window.location.href = "/home";
      
//     } catch (error) {
//       console.error("Google login error:", error);
//       alert(error.message || "Google login failed. Please try again.");
//     }
//   };
  
  
  

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col">
//     {/* Header */}
//     <header className="w-full flex flex-col md:flex-row justify-between items-center px-4 md:px-20 py-6 md:py-10">
//       <h1 className="flex items-center gap-2 text-3xl md:text-5xl font-bold text-indigo-600 mb-4 md:mb-0">
//         <img
//           src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/64px-User-avatar.svg.png"
//           alt="logo"
//           className="w-8 h-8"
//         />
//         P2P
//       </h1>
//       <div className="hidden md:block text-2xl text-gray-700">
//     {mode === "signup" ? (
//       <>
//         Already have an account?{" "}
//         <button
//           onClick={() => setMode("signin")}
//           className="text-indigo-600 font-medium hover:underline"
//         >
//           Sign In
//         </button>
//       </>
//     ) : (
//       <>
//         Don't have an account?{" "}
//         <button
//           onClick={() => setMode("signup")}
//           className="text-indigo-600 font-medium hover:underline"
//         >
//           Sign Up
//         </button>
//       </>
//     )}
//   </div>
//     </header>
  
//     {/* Main Content */}
//     <main className="flex flex-1 items-center justify-center w-full">
//       <div className="flex flex-col md:flex-row justify-around items-center w-full max-w-screen rounded-lg overflow-hidden">
//         {/* Left Illustration (hidden on small, visible on md+) */}
//         <div className="hidden md:flex items-center justify-center p-2 h-[300px] md:h-[500px] lg:h-[600px] w-0 md:w-5/12 lg:w-4/12">
//           <img
//             // src="https://illustrations.popsy.co/white/student-graduation.svg"
//             src="https://res.cloudinary.com/dlcsttupm/image/upload/v1757312980/Graduation_4_bk5skb.png"
//             alt="Graduation Illustration"
//             className="w-full h-full object-contain"
//           />
//         </div>
  
//         {/* Form Section */}
//         <div className="flex flex-col items-center  w-full md:max-w-xl min-h-[600px] gap-5 md:gap-8 px-4 md:px-2 lg:px-1">
//           <h2 className="text-2xl md:text-3xl lg:text-[43px] font-bold text-gray-900 mb-6">
//             {/* {mode === "signup" */}
//             Bridging Today's Students with Yesterday's Graduates.
//               {/* : "Bridging Today's Students with Yesterday's Graduates." */}
//               {/* } */}
//           </h2>
  
//           <form
//             className="w-full  space-y-4 md:space-y-6"
//             onSubmit={handleSubmit}
//           >
//             {mode === "signup" ? (
//               <>

//                <Input
//                   className="w-full rounded-4xl h-12 md:h-15 focus-visible:ring-1 focus-visible:ring-purple-500"
//                   type="text"
//                   placeholder="Enter your Name"
//                   value={full_name}
//                   onChange={(e) => setFull_name(e.target.value)}
//                   required
//                 />
//                 <Input
//                   className="w-full rounded-4xl h-12 md:h-15 focus-visible:ring-1 focus-visible:ring-purple-500"
//                   type="email"
//                   placeholder="Enter your college email"
//                   value={collegeEmail}
//                   onChange={(e) => setCollegeEmail(e.target.value)}
//                   required
//                 />

// <select
//   className="w-full rounded-4xl h-12 md:h-15 focus-visible:ring-1 focus-visible:ring-purple-500 border px-3 pr-10 appearance-none"
//   value={batch}
//   onChange={(e) => setBatch(e.target.value)}
//   required
// >
//   <option value="" disabled>
//     Select your batch
//   </option>

//   {Array.from({ length: 2025 - 2017 + 1 }, (_, i) => {
//     const start = 2017 + i;
//     const end = start + 4;
//     return (
//       <option key={start} value={`${start}-${end}`}>
//         {start}-{end}
//       </option>
//     );
//   })}
// </select>

//               </>
//             ) : (
//               <>
//                 <Input
//                   className="w-full rounded-4xl h-12 md:h-15 focus-visible:ring-1 focus-visible:ring-purple-500"
//                   type="text"
//                   placeholder="Enter your username"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                   required
//                 />
//                 <Input
//                   className="w-full rounded-4xl h-12 md:h-15 focus-visible:ring-1 focus-visible:ring-purple-500"
//                   type="password"
//                   placeholder="Enter your password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//               </>
//             )}
  
//             <Button
//               className="w-full bg-blue-500 h-12 md:h-15 rounded-4xl hover:bg-blue-600 text-white font-semibold"
//               disabled={loading}
//             >
//               {loading
//                 ? mode === "signup"
//                   ? "Signing up..."
//                   : "Signing in..."
//                 : mode === "signup"
//                 ? "Sign Up"
//                 : "Sign In"}
//             </Button>
//           </form>
//           {/* Show only on mobile */}
// <div className="block md:hidden text-base text-gray-700 mt-4">
//   {mode === "signup" ? (
//     <>
//       Already have an account?{" "}
//       <button
//         onClick={() => setMode("signin")}
//         className="text-indigo-600 font-medium hover:underline"
//       >
//         Sign In
//       </button>
//     </>
//   ) : (
//     <>
//       Don't have an account?{" "}
//       <button
//         onClick={() => setMode("signup")}
//         className="text-indigo-600 font-medium hover:underline"
//       >
//         Sign Up
//       </button>
//     </>
//   )}
// </div>

  
// <div className="w-full flex flex-col items-center mt-4 md:mt-6 gap-3">
//   <div className="flex items-center w-full gap-2">
//     <div className="flex-1 h-px bg-gray-300"></div>
//     <span className="text-gray-500 text-sm">or</span>
//     <div className="flex-1 h-px bg-gray-300"></div>
//   </div>

//   <button
//   type="button"
//   onClick={handleGoogleLogin}
//   className="flex items-center justify-center w-full h-12 rounded-3xl border border-gray-300 hover:bg-gray-50 transition"
// >
//   <FcGoogle className="mr-2 text-2xl" />
//   <span className="text-gray-700 font-medium">
//     {mode === "signup" ? "Sign up with Google" : "Login with Google"}
//   </span>
// </button>

// </div>

//         </div>
  
//         {/* Right Illustration (hidden on <lg) */}
//         <div className="hidden lg:flex items-center justify-center p-2 h-[300px] md:h-[500px] lg:h-[600px] w-0 lg:w-4/12">
//           <img
//             // src="https://illustrations.popsy.co/white/studying.svg"
//             src="https://res.cloudinary.com/dlcsttupm/image/upload/v1757312998/Student_Exhausted_1_loi8wh.png"
//             alt="Studying Illustration"
//             className="w-full h-full object-contain"
//           />
//         </div>
//       </div>
//     </main>
//   </div>
  
//   );
// }

import React, { useState } from "react";
// Removed: import { FcGoogle } from "react-icons/fc"; // Replaced with inline SVG

// Mock implementation for external components and environment variables
// In a real environment, these would be imported/defined externally
const Button = ({ children, onClick, className, disabled, type }) => (
  <button
    type={type || 'button'}
    onClick={onClick}
    className={`p-3 text-center transition duration-200 ease-in-out ${className}`}
    disabled={disabled}
  >
    {children}
  </button>
);
const Input = ({ type, placeholder, value, onChange, className, required }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className={`border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${className}`}
    required={required}
  />
);

// --- Environment Variables Mock (Replace with your actual values) ---
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
// -------------------------------------------------------------------

// Inline Google SVG Component
const GoogleIcon = ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.5 12.043c0-.814-.07-1.558-.2-2.3H12v4.39h5.81c-.24 1.258-.93 2.37-1.99 3.16V19.7h3.33c1.94-1.78 3.06-4.4 3.06-7.66v-.007z" fill="#4285F4"/>
        <path d="M12 24c3.27 0 6.02-1.08 8.03-2.93l-3.33-2.58c-.92.62-2.09 1-3.69 1-2.82 0-5.22-1.89-6.09-4.5H2.63V17.9c1.69 3.32 5.17 5.76 9.37 5.76z" fill="#34A853"/>
        <path d="M5.91 14.77C5.58 13.82 5.4 12.87 5.4 12c0-.87.18-1.72.5-2.67V6.63H2.63c-.09.34-.17.68-.17 1.05 0 2.22.61 4.29 1.69 6.09l1.76-1.07z" fill="#FBBC04"/>
        <path d="M12 5.75c1.8 0 3.3.61 4.54 1.76L19.2 4.1C17.18 2.25 14.43 1 11.16 1c-4.2 0-7.68 2.44-9.37 5.76l3.28 2.59c.87-2.61 3.27-4.5 6.09-4.5z" fill="#EA4335"/>
    </svg>
);


export default function AuthForm() {
  const [mode, setMode] = useState("signup");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null); // { type: 'success' | 'error', text: string }

  // 🚨 IMPORTANT: The Redirect URI MUST now match the backend's callback endpoint.
  // We infer the backend's callback path from your console screenshot:
  const GOOGLE_REDIRECT_URI = `${API_BASE_URL}/api/auth/google/callback/`;

  // Form data states
  const [collegeEmail, setCollegeEmail] = useState("");
  const [full_name, setFull_name] = useState("");
  const [batch, setBatch] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Helper to display messages
  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (mode === "signup") {
        const res = await fetch(`${API_BASE_URL}/api/users-app/auth/register/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            full_name: full_name,
            college_email: collegeEmail,
            batch: batch,
            is_current_student: true,
          }),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.detail || data.message || "Signup failed");
        }

        showMessage("success", "✅ Check your email for username and password to sign in.");
        setMode("signin");

      } else { // Sign In
        const res = await fetch(`${API_BASE_URL}/api/users-app/auth/login/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username,
            password,
          }),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.detail || data.message || "Login failed. Check credentials.");
        }

        // Store in cookie for 7 days
        document.cookie = `token=${data.access}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Strict`;
        window.location.href = "/home";
      }
    } catch (err) {
      console.error("Authentication Error:", err);
      showMessage("error", err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    console.log("Starting Google login...");
    setLoading(true);
    setMessage(null);
  
    if (!GOOGLE_CLIENT_ID || GOOGLE_CLIENT_ID === "YOUR_GOOGLE_CLIENT_ID") {
      showMessage(
        "error",
        "🛑 Missing Google Client ID. Please set VITE_GOOGLE_CLIENT_ID in your .env file."
      );
      setLoading(false);
      return;
    }
  
    const GOOGLE_REDIRECT_URI = `${window.location.origin}/accounts/google/login/callback/`;
    const state = JSON.stringify({ next: "/home" });
  
    const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
    authUrl.searchParams.set("client_id", GOOGLE_CLIENT_ID);
    authUrl.searchParams.set("redirect_uri", GOOGLE_REDIRECT_URI);
    authUrl.searchParams.set("response_type", "token"); // <-- Directly get access_token
    authUrl.searchParams.set("scope", "openid email profile");
    authUrl.searchParams.set("state", state);
  
    console.log("Redirecting to Google OAuth:", authUrl.toString());
    window.location.href = authUrl.toString();
  };
  


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="w-full flex flex-col md:flex-row justify-between items-center px-4 md:px-20 py-6 md:py-10">
        <h1 className="flex items-center gap-2 text-3xl md:text-5xl font-bold text-indigo-600 mb-4 md:mb-0">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/64px-User-avatar.svg.png"
            alt="logo"
            className="w-8 h-8"
            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/64x64/4f46e5/ffffff?text=P2P"; }}
          />
          P2P
        </h1>
        <div className="hidden md:block text-2xl text-gray-700">
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
      <main className="flex flex-1 items-center justify-center w-full">
        <div className="flex flex-col md:flex-row justify-around items-center w-full max-w-screen-xl rounded-lg overflow-hidden">
          {/* Left Illustration */}
          <div className="hidden md:flex items-center justify-center p-2 h-[300px] md:h-[500px] lg:h-[600px] w-0 md:w-5/12 lg:w-4/12">
            <img
              src="https://res.cloudinary.com/dlcsttupm/image/upload/v1757312980/Graduation_4_bk5skb.png"
              alt="Graduation Illustration"
              className="w-full h-full object-contain"
              onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/500x500/10b981/ffffff?text=Graduation"; }}
            />
          </div>

          {/* Form Section */}
          <div className="flex flex-col items-center w-full md:max-w-md lg:max-w-xl min-h-[600px] gap-5 md:gap-8 px-4 md:px-2 lg:px-1">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 text-center">
              Bridging Today’s Students with Yesterday’s Graduates.
            </h2>
            
            {/* Message Display */}
            {message && (
                <div 
                    className={`w-full p-3 rounded-lg font-medium text-sm transition-opacity duration-300 ${
                        message.type === 'error' 
                            ? 'bg-red-100 text-red-700 border border-red-300' 
                            : 'bg-green-100 text-green-700 border border-green-300'
                    }`}
                >
                    {message.text}
                </div>
            )}

            <form
              className="w-full space-y-4 md:space-y-6"
              onSubmit={handleSubmit}
            >
              {mode === "signup" ? (
                <>
                  <Input
                    className="w-full h-12 md:h-15"
                    type="text"
                    placeholder="Enter your Name"
                    value={full_name}
                    onChange={(e) => setFull_name(e.target.value)}
                    required
                  />
                  <Input
                    className="w-full h-12 md:h-15"
                    type="email"
                    placeholder="Enter your email"
                    value={collegeEmail}
                    onChange={(e) => setCollegeEmail(e.target.value)}
                    required
                  />

                  <select
                    className="w-full h-12 md:h-15 border border-gray-300 rounded-lg px-3 pr-10 appearance-none bg-white"
                    value={batch}
                    onChange={(e) => setBatch(e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Select your batch
                    </option>
                    {/* Generates batches from 2017-2021 up to 2025-2029 (assuming 4-year batch) */}
                    {Array.from({ length: 2025 - 2017 + 1 }, (_, i) => {
                      const start = 2017 + i;
                      const end = start + 4;
                      return (
                        <option key={start} value={`${start}-${end}`}>
                          {start}-{end}
                        </option>
                      );
                    })}
                  </select>
                </>
              ) : (
                <>
                  <Input
                    className="w-full h-12 md:h-15"
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                  <Input
                    className="w-full h-12 md:h-15"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </>
              )}

              <Button
                type="submit"
                className="w-full bg-indigo-600 h-12 md:h-15 rounded-lg hover:bg-indigo-700 text-white font-semibold transition duration-150"
                disabled={loading}
              >
                {loading
                  ? mode === "signup"
                    ? "Processing..."
                    : "Logging in..."
                  : mode === "signup"
                  ? "Sign Up"
                  : "Sign In"}
              </Button>
            </form>
            
            {/* Mobile Switch */}
            <div className="block md:hidden text-base text-gray-700 mt-4">
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

            <div className="w-full flex flex-col items-center mt-4 md:mt-6 gap-3">
              <div className="flex items-center w-full gap-2">
                <div className="flex-1 h-px bg-gray-300"></div>
                <span className="text-gray-500 text-sm">or</span>
                <div className="flex-1 h-px bg-gray-300"></div>
              </div>

              <Button
                type="button"
                onClick={handleGoogleLogin}
                className="flex items-center justify-center w-full h-12 rounded-lg border border-gray-300 hover:bg-gray-100 transition duration-150 bg-white"
                disabled={loading}
              >
                <GoogleIcon className="mr-2 w-5 h-5"/>
                <span className="text-gray-700 font-medium">
                  {mode === "signup" ? "Sign up with Google" : "Login with Google"}
                </span>
              </Button>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="hidden lg:flex items-center justify-center p-2 h-[300px] md:h-[500px] lg:h-[600px] w-0 lg:w-4/12">
            <img
              src="https://res.cloudinary.com/dlcsttupm/image/upload/v1757312998/Student_Exhausted_1_loi8wh.png"
              alt="Studying Illustration"
              className="w-full h-full object-contain"
              onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/500x500/22c55e/ffffff?text=Studying"; }}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
