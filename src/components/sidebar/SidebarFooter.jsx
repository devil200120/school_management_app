import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { Button } from '../ui/button';
import { useAuth } from '../../context/AuthContext';
import { toast } from "sonner";

const SidebarFooter = ({ collapsed }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate('/login');
  };

  return (
    <div className="p-4 border-t border-gray-200">
      <Button
        variant="ghost"
        className={`text-gray-700 hover:bg-gray-100 ${collapsed ? 'w-full justify-center' : 'w-full justify-start'}`}
        onClick={handleLogout}
      >
        <LogOut size={18} className={collapsed ? '' : 'mr-2'} />
        {!collapsed && <span>Logout</span>}
      </Button>
    </div>
  );
};

export default SidebarFooter;
