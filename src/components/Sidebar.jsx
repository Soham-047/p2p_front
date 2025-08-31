// import {
//   FaHome,
//   FaUsers,
//   FaCommentDots,
//   FaUser,
//   FaCog,
//   FaQuestionCircle,
//   FaSignOutAlt,
//   FaBars,
// } from "react-icons/fa";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
// } from "@/components/ui/sheet";

// export default function Sidebar() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [logoutOpen, setLogoutOpen] = useState(false);
//   const [sheetOpen, setSheetOpen] = useState(false);

//   const menu = [
//     { name: "Dashboard", icon: <FaHome />, href: "/home" },
//     { name: "Community", icon: <FaUsers />, href: "/community" },
//     { name: "Messaging", icon: <FaCommentDots />, href: "/message" },
//     { name: "Profile", icon: <FaUser />, href: "/profile" },
//   ];

//   const general = [
//     { name: "Settings", icon: <FaCog />, href: "/settings" },
//     { name: "Help", icon: <FaQuestionCircle />, href: "/help" },
//     { name: "Logout", icon: <FaSignOutAlt />, action: "logout" },
//   ];

//   const handleLogout = () => {
//     document.cookie = "token=; path=/; max-age=0; Secure; SameSite=Strict";
//     navigate("/login");
//   };

//   const renderLink = (item, showText = true) => {
//     const isActive = location.pathname === item.href;

//     const baseClasses =
//       "flex items-center gap-3 px-4 py-2 rounded-full transition-all";
//     const activeClasses =
//       "bg-purple-600 text-white font-semibold shadow-sm";
//     const normalClasses =
//       "text-gray-700 hover:bg-purple-50 hover:text-purple-600";

//     if (item.action === "logout") {
//       return (
//         <button
//           key={item.name}
//           onClick={() => setLogoutOpen(true)}
//           className={`${baseClasses} mt-2 text-red-600 hover:bg-red-50 hover:text-red-700`}
//         >
//           <span className="text-lg">{item.icon}</span>
//           {showText && <span>{item.name}</span>}
//         </button>
//       );
//     }

//     return (
//       <Link
//         key={item.name}
//         to={item.href}
//         onClick={() => setSheetOpen(false)}
//         className={`${baseClasses} ${isActive ? activeClasses : normalClasses}`}
//       >
//         <span className="text-lg">{item.icon}</span>
//         {showText && <span>{item.name}</span>}
//       </Link>
//     );
//   };

//   return (
//     <>
//       {/* ✅ Mobile Top Bar */}
//       <div className="md:hidden w-full flex items-center justify-between px-4 py-3 bg-white shadow">
//         <div className="flex items-center gap-2">
//           <h1 className="text-sm font-bold text-indigo-600">Back Benchers</h1>
//         </div>

//         <button
//           onClick={() => setSheetOpen(true)}
//           className="text-gray-700 hover:text-purple-600"
//         >
//           <FaBars size={20} />
//         </button>
//       </div>

//       {/* ✅ Desktop Sidebar */}
//       <aside className="hidden md:flex w-[280px] bg-white flex-col border-r">
//         <div className="h-16 flex items-center px-6 border-b">
//           <h1 className="text-xl font-bold text-purple-600">Back Benchers</h1>
//         </div>

//         <nav className="mt-6 flex-1 overflow-y-auto px-4">
//           <p className="text-xs font-semibold text-gray-400 uppercase mb-2">
//             Main Menu
//           </p>
//           {menu.map((item) => renderLink(item))}
//           <p className="mt-6 text-xs font-semibold text-gray-400 uppercase mb-2">
//             General
//           </p>
//           {general.map((item) => renderLink(item))}
//         </nav>
//       </aside>

//       {/* ✅ Mobile Sheet Sidebar */}
//       <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
//         <SheetContent side="right" className="p-0 w-72 bg-white flex flex-col">
//           <SheetHeader className="border-b px-6 py-4">
//             <SheetTitle className="text-purple-600 text-xl font-bold">
//               Back Benchers
//             </SheetTitle>
//           </SheetHeader>

//           {/* Links */}
//           <nav className="mt-6 flex-1 overflow-y-auto px-4">
//             <p className="text-xs font-semibold text-gray-400 uppercase mb-2">
//               Main Menu
//             </p>
//             {menu.map((item) => renderLink(item, true))}
//             <p className="mt-6 text-xs font-semibold text-gray-400 uppercase mb-2">
//               General
//             </p>
//             {general.map((item) => renderLink(item, true))}
//           </nav>

//           {/* ✅ Profile at bottom */}
//           <div className="border-t px-4 py-3 flex items-center gap-3">
//             <img
//               src="https://i.pravatar.cc/40"
//               alt="user"
//               className="w-10 h-10 rounded-full"
//             />
//             <div>
//               <p className="text-sm font-semibold">Mahendra Seervi</p>
//               <p className="text-xs text-gray-500">kaluex@gmail.com</p>
//             </div>
//           </div>
//         </SheetContent>
//       </Sheet>

//       {/* ✅ Logout Dialog */}
//       <Dialog open={logoutOpen} onOpenChange={setLogoutOpen}>
//         <DialogContent className="bg-white">
//           <DialogHeader>
//             <DialogTitle>Confirm Logout</DialogTitle>
//             <DialogDescription>
//               Are you sure you want to log out?
//             </DialogDescription>
//           </DialogHeader>
//           <DialogFooter>
//             <Button variant="outline" onClick={() => setLogoutOpen(false)}>
//               Cancel
//             </Button>
//             <Button
//               variant="destructive"
//               onClick={handleLogout}
//               className="bg-red-500 hover:bg-red-600 text-white"
//             >
//               Logout
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// }


import {
  FaHome,
  FaUsers,
  FaCommentDots,
  FaUser,
  FaCog,
  FaQuestionCircle,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  const menu = [
    { name: "Dashboard", icon: <FaHome />, href: "/home" },
    { name: "Community", icon: <FaUsers />, href: "/community" },
    { name: "Messaging", icon: <FaCommentDots />, href: "/message" },
    { name: "Profile", icon: <FaUser />, href: "/profile" },
  ];

  const general = [
    { name: "Settings", icon: <FaCog />, href: "/settings" },
    { name: "Help", icon: <FaQuestionCircle />, href: "/help" },
    { name: "Logout", icon: <FaSignOutAlt />, action: "logout" },
  ];

  const handleLogout = () => {
    document.cookie = "token=; path=/; max-age=0; Secure; SameSite=Strict";
    navigate("/login");
  };

  const renderLink = (item, showText = true) => {
    const isActive = location.pathname === item.href;

    const baseClasses =
      "flex items-center gap-3 px-4 py-2 rounded-full transition-all";
    const activeClasses =
      "bg-purple-600 text-white font-semibold shadow-sm";
    const normalClasses =
      "text-gray-700 hover:bg-purple-50 hover:text-purple-600";

    if (item.action === "logout") {
      return (
        <button
          key={item.name}
          onClick={() => setLogoutOpen(true)}
          className={`${baseClasses} mt-2 text-red-600 hover:bg-red-50 hover:text-red-700`}
        >
          <span className="text-lg">{item.icon}</span>
          {showText && <span>{item.name}</span>}
        </button>
      );
    }

    return (
      <Link
        key={item.name}
        to={item.href}
        onClick={() => setSheetOpen(false)}
        className={`${baseClasses} ${isActive ? activeClasses : normalClasses}`}
      >
        <span className="text-lg">{item.icon}</span>
        {showText && <span>{item.name}</span>}
      </Link>
    );
  };

  return (
    <>
      {/* ✅ Mobile Top Bar - Fixed positioning */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 w-full flex items-center justify-between px-4 py-4 bg-white  border-b">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">BB</span>
          </div>
          <h1 className="text-lg font-bold text-purple-600">Back Benchers</h1>
        </div>

        <button
          onClick={() => setSheetOpen(true)}
          className="text-gray-700 hover:text-purple-600 p-1 rounded-md hover:bg-gray-100 transition-colors"
        >
          <FaBars size={20} />
        </button>
      </div>

      {/* Mobile content spacer */}
      <div className="md:hidden h-16"></div>

      {/* ✅ Desktop Sidebar */}
      <aside className="hidden md:flex w-[280px] bg-white flex-col border-r shadow-sm">
        <div className="h-16 flex items-center px-6 border-b">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">BB</span>
            </div>
            <h1 className="text-xl font-bold text-purple-600">Back Benchers</h1>
          </div>
        </div>

        <nav className="mt-6 flex-1 overflow-y-auto px-4">
          <p className="text-xs font-semibold text-gray-400 uppercase mb-2">
            Main Menu
          </p>
          {menu.map((item) => renderLink(item))}
          <p className="mt-6 text-xs font-semibold text-gray-400 uppercase mb-2">
            General
          </p>
          {general.map((item) => renderLink(item))}
        </nav>
      </aside>

      {/* ✅ Mobile Sheet Sidebar */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
  <SheetContent
    side="right"
    className="p-0 w-72 bg-white flex flex-col rounded-2xl shadow-lg 
               h-[90vh]  overflow-hidden"
  >
    <SheetHeader className="border-b px-6">
      <SheetTitle className="text-purple-600 text-xl font-bold">
        Back Benchers
      </SheetTitle>
    </SheetHeader>

    {/* Links */}
    <nav className="mt-2 flex-1 overflow-y-auto px-4">
      <p className="text-xs font-semibold text-gray-400 uppercase mb-2">
        Main Menu
      </p>
      {menu.map((item) => renderLink(item, true))}
      <p className="mt-6 text-xs font-semibold text-gray-400 uppercase mb-2">
        General
      </p>
      {general.map((item) => renderLink(item, true))}
    </nav>

    {/* Profile at bottom */}
    <div className="border-t px-4 py-3 flex items-center gap-3">
      <img
        src="https://i.pravatar.cc/40"
        alt="user"
        className="w-10 h-10 rounded-full"
      />
      <div>
        <p className="text-sm font-semibold">Mahendra Seervi</p>
        <p className="text-xs text-gray-500">kaluex@gmail.com</p>
      </div>
    </div>
  </SheetContent>
</Sheet>


      {/* ✅ Logout Dialog */}
      <Dialog open={logoutOpen} onOpenChange={setLogoutOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
            <DialogDescription>
              Are you sure you want to log out?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setLogoutOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}