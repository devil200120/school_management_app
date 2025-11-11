import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LogOut, Menu } from "lucide-react";
import { parentMenuItems } from "../config/parentMenuItems";
import SidebarItem from "./sidebar/SidebarItem";
import { motion } from "framer-motion";
import { useIsMobile } from "../hooks/use-mobile";
import { useAuth } from "../context/AuthContext";
import { Button } from "./ui/button";
import { toast } from "sonner";

const ParentSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [openMenus, setOpenMenus] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/school-management/portal");
  };

  useEffect(() => {
    parentMenuItems.forEach((item) => {
      if (item.submenu) {
        const hasActiveChild = item.submenu.some(
          (subItem) =>
            location.pathname === subItem.path ||
            location.pathname.startsWith(`${subItem.path}/`)
        );

        if (hasActiveChild) {
          setOpenMenus((prev) => ({ ...prev, [item.title]: true }));
        }
      }
    });
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (isMobile && collapsed) {
        setCollapsed(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [collapsed, isMobile]);

  const handleItemClick = (item) => {
    if (collapsed) {
      setCollapsed(false);
    }

    if (item.submenu) {
      setOpenMenus((prev) => {
        const newOpenMenus = { ...prev };
        Object.keys(newOpenMenus).forEach((key) => {
          if (key !== item.title) {
            newOpenMenus[key] = false;
          }
        });
        newOpenMenus[item.title] = !prev[item.title];
        return newOpenMenus;
      });
    } else {
      navigate(item.path);
    }
  };

  return (
    <motion.div
      initial={{ x: isMobile ? -280 : 0, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      style={{ marginLeft: -15 }}
      className={`
        bg-gradient-to-b from-white to-gray-50 shadow-lg h-full 
        transition-all duration-300 flex flex-col border-r border-gray-200
        ${collapsed ? "w-14" : "w-70"}
      `}
    >
      <div
        style={{ paddingTop: 14, paddingBottom: 9, paddingLeft: 30 }}
        className="flex justify-between items-center border-b border-gray-200 bg-white"
      >
        {!collapsed && (
          <h2 className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            PARENT PORTAL
          </h2>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-md hover:bg-green-100 text-green-600 transition-colors duration-200 hover:shadow-md md:block hidden"
        >
          <Menu size={20} />
        </button>
      </div>

      <div className="overflow-y-auto flex-1 px-2 scrollbar-thin">
        <nav className="py-4">
          <ul
            className="space-y-1"
            style={{
              marginLeft: "-16px",
              marginTop: "-3",
              marginBottom: "1rem",
              paddingLeft: "0.8rem;",
            }}
          >
            {parentMenuItems.map((item) => (
              <SidebarItem
                key={item.title}
                item={item}
                isOpen={openMenus[item.title]}
                collapsed={collapsed}
                onItemClick={handleItemClick}
              />
            ))}
          </ul>
        </nav>
      </div>

      {/* Logout button */}
      <div className="p-4 border-t border-gray-200">
        <Button
          variant="ghost"
          className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700"
          onClick={handleLogout}
        >
          <LogOut size={18} className="mr-2" />
          <span>Logout</span>
        </Button>
      </div>
    </motion.div>
  );
};

export default ParentSidebar;
