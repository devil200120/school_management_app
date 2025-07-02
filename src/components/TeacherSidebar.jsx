
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useIsMobile } from '../hooks/use-mobile';
import SidebarItem from './sidebar/SidebarItem';
import SidebarHeader from './sidebar/SidebarHeader';
import SidebarFooter from './sidebar/SidebarFooter';
import { teacherMenuItems } from '../config/teacherSidebarConfig';



const TeacherSidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [collapsed, setCollapsed] = useState(false);
  const isMobile = useIsMobile();
  
  // Auto-set initial open submenu based on current path
  useEffect(() => {
    const currentPath = location.pathname;
    
    // Find which menu item corresponds to the current path
    for (const item of teacherMenuItems) {
      if (item.submenu) {
        // Check if current path is part of this submenu
        const matchingSubmenuItem = item.submenu.find(subItem => 
          currentPath === subItem.path || currentPath.startsWith(`${subItem.path}/`)
        );
        
        if (matchingSubmenuItem || currentPath === item.path || currentPath.startsWith(`${item.path}/`)) {
          setOpenSubmenu(item.title);
          break;
        }
      }
    }
  }, [location.pathname]);
  
  // Close sidebar when navigating on mobile
  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    }
  }, [location.pathname, setIsOpen, isMobile]);
  
  const handleItemClick = (item) => {
    if (item.submenu) {
      setOpenSubmenu(openSubmenu === item.title ? null : item.title);
    } else {
      // If on mobile, close sidebar when clicking a non-submenu item
      if (isMobile) {
        setIsOpen(false);
      }
    }
  };

  // Toggle sidebar collapse state
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <motion.div
      initial={false}
      animate={{ 
        width: isMobile ? (isOpen ? 280 : 0) : 
               collapsed ? 80 : 280 
      }}
      transition={{ duration: 0.2 }}
      className={`h-full bg-white border-r border-gray-200 overflow-hidden flex flex-col z-30 shadow-md ${isMobile ? 'fixed' : 'relative'}`}
    >
      {/* Sidebar header with logo and toggle button */}
      <SidebarHeader 
        collapsed={collapsed} 
        isMobile={isMobile} 
        toggleCollapsed={toggleCollapsed} 
        setIsOpen={setIsOpen} 
      />
      
      {/* Menu items */}
      <div className="flex-1 overflow-y-auto py-3">
        <nav className="px-2 space-y-1">
          <ul className="list-none m-0 p-0">  {/* Added explicit styling to remove bullets */}
            {teacherMenuItems.map((item) => (
              <SidebarItem
                key={item.title}
                item={item}
                isOpen={openSubmenu === item.title}
                collapsed={collapsed}
                onItemClick={handleItemClick}
              />
            ))}
          </ul>
        </nav>
      </div>
      
      {/* Logout button */}
      <SidebarFooter collapsed={collapsed} />
    </motion.div>
  );
};

export default TeacherSidebar;
