import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  User,
  LogOut,
  CreditCard,
  FileText,
  Download,
  Bell,
  Search,
  Settings,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { toast } from "sonner";

const StaffLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Left side - Logo and Title */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-gray-500 hover:text-gray-700 md:hidden"
            >
              <Menu size={20} />
            </Button>

            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-eduos-primary to-eduos-secondary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-eduos-primary">EDUOS</h1>
                <p className="text-xs text-gray-500">Staff Portal</p>
              </div>
            </div>
          </div>

          {/* Center - Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <Input
                type="text"
                placeholder="Search payslips..."
                className="pl-10 w-full"
              />
            </div>
          </div>

          {/* Right side - User info and actions */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-500 hover:text-gray-700"
            >
              <Bell size={20} />
            </Button>

            <div className="flex items-center space-x-3 border-l pl-4">
              <div className="w-8 h-8 bg-eduos-primary rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-gray-700">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-500">Staff Member</p>
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-gray-500 hover:text-red-600"
            >
              <LogOut size={18} className="mr-2" />
              <span className="hidden md:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed left-0 top-0 h-full w-70 bg-white shadow-lg z-50 md:hidden"
          >
            <div className="p-6 border-b">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-eduos-primary to-eduos-secondary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">E</span>
                </div>
                <div>
                  <h2 className="font-bold text-lg text-eduos-primary">
                    EDUOS
                  </h2>
                  <p className="text-sm text-gray-500">Staff Portal</p>
                </div>
              </div>
            </div>

            <nav className="p-4 space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {
                  navigate("/staff");
                  setIsSidebarOpen(false);
                }}
              >
                <CreditCard className="mr-3 h-5 w-5" />
                My Payslips
              </Button>

              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => setIsSidebarOpen(false)}
              >
                <FileText className="mr-3 h-5 w-5" />
                Download History
              </Button>

              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => setIsSidebarOpen(false)}
              >
                <Settings className="mr-3 h-5 w-5" />
                Settings
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Quick Stats Bar */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Current Month</p>
                <p className="text-lg font-semibold text-green-600">₦103,000</p>
              </div>
              <CreditCard className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Last Payslip</p>
                <p className="text-lg font-semibold text-blue-600">
                  November 2024
                </p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Downloads</p>
                <p className="text-lg font-semibold text-orange-600">
                  4 Available
                </p>
              </div>
              <Download className="h-8 w-8 text-orange-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Employee ID</p>
                <p className="text-lg font-semibold text-gray-700">
                  {user?.id || "TCH001"}
                </p>
              </div>
              <Badge
                variant="outline"
                className="text-eduos-primary border-eduos-primary"
              >
                Active
              </Badge>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="bg-white rounded-lg shadow-sm border min-h-[600px]">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t py-4 mt-8">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          <p>© 2025 EDUOS Staff Portal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default StaffLayout;
