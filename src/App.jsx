// import { Routes, Route, Navigate } from "react-router-dom";
// import { useState} from "react";
// import AuthForm from "./pages/authForm";
// import Dashboard from "./pages/DashBoard";
// import CommunityPage from "./pages/CommunityPage";
// import Sidebar from "@/components/Sidebar";
// import ProfilePage from "./pages/ProfilPage";
// import ChatLayout from "./pages/chat";

// // Helper to read cookie by name
// function getCookie(name) {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop().split(";").shift();
//   return null;
// }

// export default function App() {
//   const isLoggedIn = !!getCookie("token");
//   const [pendingChatUser, setPendingChatUser] = useState(null);

//   // Handle message click from Dashboard search
//   const handleMessageFromDashboard = (userInfo) => {
//     setPendingChatUser(userInfo);
//   };

//   // Clear pending chat user when it's been used
//   const clearPendingChatUser = () => {
//     setPendingChatUser(null);
//   };

//   return (
//     <Routes>
//       {/* Default route */}
//       <Route
//         path="/"
//         element={
//           isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/login" />
//         }
//       />

//       {/* Auth */}
//       <Route path="/login" element={<AuthForm />} />
//       <Route path="/signup" element={<AuthForm />} />

//       {/* Dashboard layout */}
//       <Route
//         path="/home"
//         element={
//           isLoggedIn ? (
//             <div className="flex min-h-screen bg-gray-50">
//               <Sidebar />
//               <div className="flex-1 p-2 md:p-6 pt-20 md:pt-6 ">
//                 <Dashboard onMessageClick={handleMessageFromDashboard} />
//               </div>
//             </div>
//           ) : (
//             <Navigate to="/login" replace />
//           )
//         }
//       />

//       {/* Community Page layout */}
//       <Route
//         path="/community"
//         element={
//           isLoggedIn ? (
//             <div className="flex min-h-screen bg-gray-50">
//               <Sidebar />
//               <div className="flex-1 p-2 md:p-6 pt-20 md:pt-6">
//                 <CommunityPage />
//               </div>
//             </div>
//           ) : (
//             <Navigate to="/login" replace />
//           )
//         }
//       />

//       {/* message page */}
//       <Route
//         path="/message"
//         element={
//           isLoggedIn ? (
//             <div className="flex h-screen bg-gray-50">
//               <Sidebar />
//               <ChatLayout 
//                 pendingChatUser={pendingChatUser} 
//                 onChatUserUsed={clearPendingChatUser}
//               />
//             </div>
//           ) : (
//             <Navigate to="/login" replace />
//           )
//         }
//       />

//       {/* Profile Page layout */}
//       <Route
//         path="/profile"
//         element={
//           isLoggedIn ? (
//             <div className="flex min-h-screen bg-gray-50">
//               <Sidebar />
//               <div className="flex-1 p-2 md:p-6 pt-10 md:pt-6">
//                 <ProfilePage />
//               </div>
//             </div>
//           ) : (
//             <Navigate to="/login" replace />
//           )
//         }
//       />
//     </Routes>
//   );
// }



import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
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

function Layout({ children }) {
  return (
    <div className="flex bg-gray-50">
      {/* Fixed Sidebar only visible on md+ */}
      <Sidebar />
      {/* Page content */}
      <div className="flex-1 md:ml-[350px] min-h-screen">{children}</div>
    </div>
  );
}


export default function App() {
  const isLoggedIn = !!getCookie("token");
  const [pendingChatUser, setPendingChatUser] = useState(null);

  const handleMessageFromDashboard = (userInfo) => {
    setPendingChatUser(userInfo);
  };

  const clearPendingChatUser = () => {
    setPendingChatUser(null);
  };

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

      {/* Dashboard */}
      <Route
        path="/home"
        element={
          isLoggedIn ? (
            <Layout>
              <div className="p-2 md:p-6 pt-20 md:pt-6">
                <Dashboard onMessageClick={handleMessageFromDashboard} />
              </div>
            </Layout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Community */}
      <Route
        path="/community"
        element={
          isLoggedIn ? (
            <Layout>
              <div className="p-2 md:p-6 pt-20 md:pt-6">
                <CommunityPage />
              </div>
            </Layout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Messages */}
      <Route
        path="/message"
        element={
          isLoggedIn ? (
            <Layout>
              <ChatLayout
                pendingChatUser={pendingChatUser}
                onChatUserUsed={clearPendingChatUser}
              />
            </Layout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Profile */}
      <Route
        path="/profile"
        element={
          isLoggedIn ? (
            <Layout>
              <div className="p-2 md:p-6 pt-10 md:pt-6">
                <ProfilePage />
              </div>
            </Layout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
}
