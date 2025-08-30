import {
  FaHome,
  FaUsers,
  FaCommentDots,
  FaUser,
  FaCog,
  FaQuestionCircle,
  FaSignOutAlt,
  FaSearch,
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
  const [search, setSearch] = useState("");
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  const menu = [
    { name: "Dashboard", icon: <FaHome />, href: "/home" },
    { name: "Community", icon: <FaUsers />, href: "/community" },
    { name: "Message", icon: <FaCommentDots />, href: "/message" },
    { name: "Profile", icon: <FaUser />, href: "/profile" },
  ];

  const general = [
    { name: "Settings", icon: <FaCog />, href: "/settings" },
    { name: "Help", icon: <FaQuestionCircle />, href: "/help" },
    { name: "Logout", icon: <FaSignOutAlt />, href: "/logout", action: "logout" },
  ];

  const handleLogout = () => {
    // Delete the cookie by setting it to expire in the past
    document.cookie = "token=; path=/; max-age=0; Secure; SameSite=Strict";
  
    navigate("/login");
  };
  

  const renderLink = (item, showText = true) => {
    const isActive = location.pathname === item.href;
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    if (!matchesSearch) return null;

    const linkClasses = `flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
      isActive
        ? "bg-purple-100 text-purple-700 font-semibold"
        : "text-gray-700 hover:bg-purple-50 hover:text-purple-600"
    }`;

    if (item.action === "logout") {
      return (
        <button
          key={item.name}
          onClick={() => setLogoutOpen(true)}
          className={linkClasses}
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
        className={linkClasses}
      >
        <span className={`text-lg ${isActive ? "text-purple-700" : ""}`}>
          {item.icon}
        </span>
        {showText && <span>{item.name}</span>}
      </Link>
    );
  };

  return (
    <>
      {/* Mobile collapsed icon bar */}
      <div className="md:hidden w-16 bg-white  flex flex-col items-center py-4 gap-6">
        {/* App name inside column */}
        <div className="text-purple-600 font-bold text-xs text-center leading-tight">
          Back<br />Benchers
        </div>

        {/* Menu button */}
        <button
          onClick={() => setSheetOpen(true)}
          className="text-gray-600 hover:text-purple-600"
        >
          <FaBars size={20} />
        </button>

        {/* Icons only */}
        <div className="flex flex-col gap-6 mt-4">
          {menu.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`p-2 rounded-lg hover:bg-purple-50 ${
                location.pathname === item.href
                  ? "bg-purple-100 text-purple-700"
                  : ""
              }`}
            >
              {item.icon}
            </Link>
          ))}
          {general.map((item) => (
            <button
              key={item.name}
              onClick={() =>
                item.action === "logout"
                  ? setLogoutOpen(true)
                  : navigate(item.href)
              }
              className="p-2 rounded-lg hover:bg-purple-50"
            >
              {item.icon}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop full sidebar */}
      <aside className="hidden md:flex w-[280px] bg-white flex-col">
        <div className="h-16 flex items-center px-6 ">
          <h1 className="text-xl font-bold text-purple-600">Back Benchers</h1>
        </div>

        <div className="px-4 mt-4">
          <div className="relative">
            <FaSearch className="absolute left-3 top-3 text-gray-400 text-sm" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        <nav className="mt-4 flex-1 overflow-y-auto px-2">
          <p className="text-xs font-semibold text-gray-400 uppercase px-2">Menu</p>
          {menu.map((item) => renderLink(item))}
          <p className="mt-6 text-xs font-semibold text-gray-400 uppercase px-2">
            General
          </p>
          {general.map((item) => renderLink(item))}
        </nav>
      </aside>

      {/* Mobile sheet for expanded menu */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="left" className="p-0 w-64 bg-white">
          <SheetHeader className="border-b px-6 py-4">
            <SheetTitle className="text-purple-600 text-xl font-bold">
              Back Benchers
            </SheetTitle>
          </SheetHeader>

          <div className="px-4 mt-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-3 text-gray-400 text-sm" />
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <nav className="mt-4 flex-1 overflow-y-auto px-2">
            <p className="text-xs font-semibold text-gray-400 uppercase px-2">Menu</p>
            {menu.map((item) => renderLink(item, true))}
            <p className="mt-6 text-xs font-semibold text-gray-400 uppercase px-2">
              General
            </p>
            {general.map((item) => renderLink(item, true))}
          </nav>
        </SheetContent>
      </Sheet>

      {/* Logout dialog */}
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
            <Button variant="destructive" onClick={handleLogout} className="bg-red-400 hover:bg-red-600 text-white">
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
