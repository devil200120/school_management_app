import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../../components/ui/button';

const SidebarHeader = ({
  collapsed,
  isMobile,
  toggleCollapsed,
  setIsOpen
}) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200">
      {(!collapsed || isMobile) && (
        <Link to="/teacher" className="flex items-center">
          <h2 className="font-bold text-xl bg-gradient-to-r from-eduos-primary to-eduos-secondary bg-clip-text text-transparent">
            EDUOS
          </h2>
          <span className="ml-2 text-sm text-gray-500">Teacher</span>
        </Link>
      )}

      {isMobile ? (
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsOpen(false)}
        >
          <ChevronLeft size={18} />
        </Button>
      ) : (
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleCollapsed}
          className="transition-all duration-200"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      )}
    </div>
  );
};

export default SidebarHeader;
