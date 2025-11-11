import React, { useState, useEffect, useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import ParentSidebar from "./ParentSidebar.jsx";
import { useAuth } from "../context/AuthContext";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Bell, Search, Menu } from "lucide-react";
import { Input } from "./ui/input";
import { parentMenuItems } from "../config/parentMenuItems";
import { toast } from "sonner";

const ParentLayout = () => {
  const { user, logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const sidebarRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/school-management/portal");
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (!searchTerm.trim()) {
      toast.error("Please enter a search term");
      return;
    }

    const allMenuItems = parentMenuItems.flatMap((item) =>
      item.submenu
        ? [{ title: item.title, path: item.path }, ...item.submenu]
        : [{ title: item.title, path: item.path }]
    );

    const foundItem = allMenuItems.find((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (foundItem) {
      toast.success(`Found: ${foundItem.title}`);
      navigate(foundItem.path);
      setSearchTerm("");
      setIsMobileMenuOpen(false);
    } else {
      toast.error("No matching page found");
    }
  };

  const handleNotificationClick = () => {
    toast.info("You have 2 new notifications", {
      description: "Check your child's progress reports and payment reminders",
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMobileMenuOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !event.target
          .closest("button")
          ?.classList.contains("mobile-menu-trigger")
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div
        ref={sidebarRef}
        className={`
          fixed md:relative z-20 transition-all duration-300 ease-in-out h-screen
          ${isMobileMenuOpen ? "left-0" : "-left-full md:left-0"}
          w-[65%] max-w-[230px] md:w-auto md:max-w-none md:block
        `}
      >
        <ParentSidebar />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden w-full">
        <header className="bg-white shadow-sm z-10">
          <div className="py-2 sm:py-3 md:py-4 px-3 md:px-6 flex justify-between items-center">
            <div className="flex items-center gap-2 flex-1">
              <button
                className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 md:hidden mobile-menu-trigger"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                <Menu size={22} className="text-eduos-primary" />
              </button>
              <div className="w-full max-w-xl">
                <form onSubmit={handleSearch} className="relative w-full">
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                    size={16}
                  />
                  <input
                    type="text"
                    placeholder="Search parent portal..."
                    className="w-full pl-10 pr-3 py-2 text-sm rounded-md focus:outline-none"
                    value={searchTerm}
                    style={{ borderWidth: 1 }}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </form>
              </div>
            </div>

            <div className="flex items-center gap-2 md:gap-6">
              <button
                className="relative p-1.5 sm:p-2 rounded-full hover:bg-gray-100 focus:outline-none"
                onClick={handleNotificationClick}
              >
                <Bell size={18} className="text-gray-600" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              <div className="hidden md:flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={user?.profilePicture} />
                    <AvatarFallback>
                      {user?.name?.charAt(0) || "P"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-sm">
                    <p
                      style={{ marginTop: "0.5rem", marginBottom: "0.1rem" }}
                      className="font-medium text-gray-700"
                    >
                      {user?.name || "Parent"}
                    </p>
                    <p
                      className="text-gray-500 text-xs"
                      style={{ marginBottom: 6 }}
                    >
                      Parent
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </div>

              <div className="md:hidden">
                <Avatar onClick={() => toast.info("Profile options")}>
                  <AvatarImage src={user?.profilePicture} />
                  <AvatarFallback>
                    {user?.name?.charAt(0) || "P"}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ParentLayout;
