
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AccountantSidebar from './AccountantSidebar';
import { Button } from './ui/button';
import { Menu, Search, Bell, User } from 'lucide-react';
import { Input } from './ui/input';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const AccountantLayout = () => {
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    window.location.href = '/school-management/portal';
  };

  const handleSearch = (e) => {
    e.preventDefault();
    toast.info(`Searching for: ${searchQuery}`);
    // In a real implementation, this would trigger an actual search
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AccountantSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <div className="flex-1 flex flex-col">
        <motion.header 
          className="bg-white border-b border-gray-200 p-4 sticky top-0 z-10 shadow-sm"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="text-gray-600 hover:text-blue-600"
                aria-label={isSidebarOpen ? "Hide sidebar" : "Show sidebar"}
              >
                <Menu size={24} />
              </Button>
              
              <form onSubmit={handleSearch} className="hidden md:flex relative">
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-[200px] lg:w-[300px] pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search 
                  size={18} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                />
              </form>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button 
                variant="ghost" 
                size="icon"
                className="text-gray-600 hover:text-blue-600 relative"
              >
                <Bell size={20} />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9">
                      {user?.profilePicture ? (
                        <AvatarImage 
                          src={user.profilePicture} 
                          alt={user.name} 
                          className="object-cover" 
                        />
                      ) : (
                        <AvatarFallback className="bg-eduos-primary text-white">
                          {user?.name ? user.name.charAt(0).toUpperCase() : "A"}
                        </AvatarFallback>
                      )}
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user?.name}</p>
                      <p className="w-[200px] truncate text-sm text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <button 
                      className="cursor-pointer w-full flex items-center" 
                      onClick={() => toast.info("Profile view not implemented yet")}
                    >
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </button>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <button 
                      className="cursor-pointer w-full flex items-center text-red-600" 
                      onClick={handleLogout}
                    >
                      <span>Logout</span>
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          {/* Mobile search bar */}
          <form onSubmit={handleSearch} className="mt-3 md:hidden relative">
            <Input
              type="search"
              placeholder="Search..."
              className="w-full pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search 
              size={18} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
            />
          </form>
        </motion.header>
        
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AccountantLayout;
