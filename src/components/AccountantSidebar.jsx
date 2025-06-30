import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  LayoutDashboard, 
  Wallet, 
  CreditCard, 
  FileBarChart, 
  Settings,
  LogOut,
  Coins,
  DollarSign,
  Menu,
  Package,  // Added for inventory
} from 'lucide-react';
import { Button } from './ui/button';
import { toast } from "sonner";
import { Badge } from './ui/badge';

const AccountantSidebar = ({ isOpen, setIsOpen }) => {
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [openSubmenu, setOpenSubmenu] = useState(null);
  
  // Menu items for accountant
  const menuItems = [
    { 
      title: 'Dashboard', 
      icon: <LayoutDashboard size={20} />, 
      path: '/accountant',
      badge: 'New' 
    },
    { 
      title: 'Payments', 
      icon: <CreditCard size={20} />, 
      path: '/accountant/payments',
      submenu: [
        { title: 'Class Payment List', path: '/accountant/payments/class-list' },
        { title: 'Payment Management', path: '/accountant/payments/management' },
        { title: 'Payment Methods', path: '/accountant/payments/methods' },
        { title: 'Payment Purpose', path: '/accountant/payments/purpose' },
        { title: 'Payment Records', path: '/accountant/payments/records' },
      ]
    },
    { 
      title: 'Fee Collection', 
      icon: <DollarSign size={20} />, 
      path: '/accountant/fee-collection',
      submenu: [
        { title: 'Collect Fee', path: '/accountant/fee-collection/collect' },
        { title: 'Fee Due', path: '/accountant/fee-collection/due' },
        { title: 'Due Reports', path: '/accountant/fee-collection/reports' },
      ]
    },
    { 
      title: 'Expenses', 
      icon: <Wallet size={20} />, 
      path: '/accountant/expenses',
      submenu: [
        { title: 'Petty Cash', path: '/accountant/expenses/petty-cash' },
        { title: 'Expense Management', path: '/accountant/expenses/management' },
      ] 
    },
    { 
      title: 'Salary Management', 
      icon: <Coins size={20} />, 
      path: '/accountant/salary',
      submenu: [
        { title: 'Pending Salaries', path: '/accountant/salary/pending' },
        { title: 'Salary History', path: '/accountant/salary/history' },
      ]
    },
    { 
      title: 'Reports', 
      icon: <FileBarChart size={20} />, 
      path: '/accountant/reports',
      submenu: [
        { title: 'Collection Report', path: '/accountant/reports/collection' },
        { title: 'Expense Report', path: '/accountant/reports/expense' },
        { title: 'Balance Sheet', path: '/accountant/reports/balance-sheet' },
        { title: 'Revenue Analysis', path: '/accountant/reports/revenue' },
      ]
    },
    { 
      title: 'Inventory', 
      icon: <Package size={20} />, 
      path: '/accountant/inventory',
      submenu: [
        { title: 'Stationary Inventory', path: '/accountant/inventory/stationary' },
        { title: 'Game Equipment', path: '/accountant/inventory/game-equipment' },
        { title: 'Medical Equipment', path: '/accountant/inventory/medical-equipment' },
        { title: 'Books & Research Papers', path: '/accountant/inventory/books' },
      ]
    },
    { 
      title: 'Settings', 
      icon: <Settings size={20} />, 
      path: '/accountant/settings' 
    },
  ];
  
  const handleSubmenuToggle = (title) => {
    if (openSubmenu === title) {
      setOpenSubmenu(null);
    } else {
      setOpenSubmenu(title);
    }
  };
  
  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate('/login');
  };
  
  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Mobile overlay */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-20 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
          
          {/* Sidebar */}
          <motion.div
            className="h-screen max-w-[280px] w-[85%] md:w-[280px] bg-white border-r border-gray-200 flex flex-col fixed md:relative z-30 shadow-lg"
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Sidebar header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <Link to="/accountant" className="flex items-center">
                <h2 className="font-bold text-xl bg-gradient-to-r from-eduos-primary to-eduos-secondary bg-clip-text text-transparent">
                  EDUOS
                </h2>
                <span className="ml-2 text-sm text-gray-500">Accountant</span>
              </Link>
              
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsOpen(false)}
                className="text-gray-500"
              >
                <ChevronLeft size={18} />
              </Button>
            </div>
            
            {/* Menu items */}
            <div className="flex-1 overflow-y-auto py-4">
              <nav className="px-2 space-y-1">
                {menuItems.map((item) => (
                  <div key={item.title}>
                    {item.submenu ? (
                      <div className="mb-1">
                        <Button
                          variant={isActive(item.path) ? "secondary" : "ghost"}
                          className={`w-full justify-start text-left group transition-all duration-200 ${
                            isActive(item.path)
                              ? "bg-blue-50 text-blue-600 hover:bg-blue-100"
                              : "text-gray-700 hover:bg-gray-100"
                          } mb-1`}
                          onClick={() => handleSubmenuToggle(item.title)}
                        >
                          <span className="flex items-center justify-between w-full">
                            <span className="flex items-center">
                              <motion.span 
                                className="mr-3" 
                                whileHover={{ scale: 1.1 }}
                              >
                                {item.icon}
                              </motion.span>
                              <span>{item.title}</span>
                            </span>
                            {item.badge && (
                              <Badge variant="outline" className="ml-2 bg-blue-100 text-blue-800 border-blue-200">
                                {item.badge}
                              </Badge>
                            )}
                            <motion.svg
                              className={`w-4 h-4 transition-transform`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              animate={{ rotate: openSubmenu === item.title ? 90 : 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 5l7 7-7 7"
                              />
                            </motion.svg>
                          </span>
                        </Button>
                        
                        <AnimatePresence>
                          {openSubmenu === item.title && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="ml-6 space-y-1"
                            >
                              {item.submenu.map((subItem) => (
                                <Link
                                  key={subItem.title}
                                  to={subItem.path}
                                  className={`
                                    block pl-4 pr-2 py-2 rounded-md text-sm transition-all duration-200
                                    ${isActive(subItem.path)
                                      ? "bg-blue-50 text-blue-600 font-medium"
                                      : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"}
                                  `}
                                >
                                  {subItem.title}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        to={item.path}
                        className={`
                          flex items-center justify-between px-3 py-2 rounded-md mb-1 transition-all duration-200 group
                          ${isActive(item.path)
                            ? "bg-blue-50 text-blue-600 font-medium"
                            : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"}
                        `}
                      >
                        <span className="flex items-center">
                          <motion.span 
                            className="mr-3" 
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {item.icon}
                          </motion.span>
                          <span>{item.title}</span>
                        </span>
                        {item.badge && (
                          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                            {item.badge}
                          </Badge>
                        )}
                      </Link>
                    )}
                  </div>
                ))}
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
        </>
      )}
      {!isOpen && (
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-4 right-4 z-50 rounded-full shadow-lg bg-white md:hidden"
          onClick={() => setIsOpen(true)}
        >
          <Menu size={20} />
        </Button>
      )}
    </AnimatePresence>
  );
};

export default AccountantSidebar;
