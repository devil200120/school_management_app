
import React, { useState, useEffect, useRef } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import TeacherSidebar from './TeacherSidebar';
import { Button } from './ui/button';
import { Menu, Search, Bell, X, User, Settings, LogOut } from 'lucide-react';
import { Input } from './ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { teacherMenuItems } from '../config/teacherSidebarConfig';

const TeacherLayout = () => {
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: "New assignment submission", message: "Student John Doe has submitted the Math assignment", time: "2 hours ago" },
    { id: 2, title: "Staff meeting reminder", message: "Staff meeting tomorrow at 10:00 AM", time: "5 hours ago" },
    { id: 3, title: "New school policy", message: "Check the updated school policy for the upcoming term", time: "1 day ago" }
  ]);
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate('/school-management/portal');
  };

  const toggleSearch = () => {
    setIsSearchExpanded(!isSearchExpanded);
    if (!isSearchExpanded) {
      // Focus the input after the state has updated and the component has re-rendered
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    // Search through menuItems for matching pages
    const allMenuItems = teacherMenuItems.flatMap(item => 
      item.submenu ? 
        [{title: item.title, path: item.path}, ...item.submenu] : 
        [{title: item.title, path: item.path}]
    );
    
    const foundItem = allMenuItems.find(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    if (foundItem) {
      toast.success(`Found: ${foundItem.title}`);
      navigate(foundItem.path);
      setSearchQuery('');
      setIsSearchExpanded(false);
    } else {
      toast.error("No matching page found");
    }
  };

  // Close expanded search on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isSearchExpanded && 
          searchInputRef.current && 
          !searchInputRef.current.contains(event.target) &&
          !(event.target).closest('button')?.classList.contains('search-toggle')) {
        setIsSearchExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearchExpanded]);

  const markNotificationAsRead = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
    toast.info("Notification marked as read");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <TeacherSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <div className="flex-1 flex flex-col">
        <motion.header 
          className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-4 flex items-center justify-between">
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
              
              {/* Large screen search */}
              <AnimatePresence>
                {isSearchExpanded ? (
                  <motion.form 
                    onSubmit={handleSearchSubmit}
                    className="relative max-w-md w-full hidden md:block"
                    initial={{ width: 48, opacity: 0 }}
                    animate={{ width: "100%", opacity: 1 }}
                    exit={{ width: 48, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search pages..."
                      className="pl-10 pr-10 py-2"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
                      onClick={toggleSearch}
                    >
                      <X size={18} className="text-gray-400" />
                    </Button>
                  </motion.form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="hidden md:block"
                  >
                    <Button 
                      variant="outline" 
                      className="search-toggle pl-3 pr-3 text-muted-foreground flex items-center gap-2"
                      onClick={toggleSearch}
                    >
                      <Search size={16} />
                      <span>Search...</span>
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Mobile title */}
              <div className="md:hidden">
                <h1 className="font-semibold text-gray-800">Teacher Dashboard</h1>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Mobile search button */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden"
                onClick={() => {
                  // Open a fullscreen search modal for mobile
                  toast.info("Search functionality");
                }}
              >
                <Search size={20} />
              </Button>
              
              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="relative"
                  >
                    <Bell size={20} />
                    {notifications.length > 0 && (
                      <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {notifications.length > 0 ? (
                    <>
                      {notifications.map(notification => (
                        <DropdownMenuItem 
                          key={notification.id} 
                          className="cursor-pointer focus:bg-gray-100 p-0"
                          onSelect={(e) => {
                            e.preventDefault();
                            markNotificationAsRead(notification.id);
                          }}
                        >
                          <div className="p-3 hover:bg-gray-50 w-full">
                            <div className="font-medium">{notification.title}</div>
                            <p className="text-sm text-gray-500">{notification.message}</p>
                            <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                          </div>
                        </DropdownMenuItem>
                      ))}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-center cursor-pointer py-2">
                        View all notifications
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <div className="text-center py-4 text-muted-foreground">
                      No new notifications
                    </div>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
              
              {/* User profile */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.profilePicture} />
                      <AvatarFallback>
                        {user?.name?.charAt(0).toUpperCase() || 'T'}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-gray-700 hidden md:inline">
                      {user?.name || 'Teacher'}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user?.profilePicture} />
                      <AvatarFallback>
                        {user?.name?.charAt(0).toUpperCase() || 'T'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col space-y-0.5 leading-none">
                      <p className="font-medium text-sm">{user?.name || 'Teacher'}</p>
                      <p className="w-[200px] truncate text-xs text-muted-foreground">
                        {user?.email || 'teacher@example.com'}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>My Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer text-red-600" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          {/* Mobile search bar */}
          <AnimatePresence>
            {isSearchExpanded && (
              <motion.div 
                className="p-2 border-t border-gray-200 md:hidden"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <form onSubmit={handleSearchSubmit} className="relative">
                  <Input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 pr-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon" 
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
                    onClick={() => setIsSearchExpanded(false)}
                  >
                    <X size={18} className="text-gray-400" />
                  </Button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>
        
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default TeacherLayout;
