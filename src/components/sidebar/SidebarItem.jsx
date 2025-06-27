import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

const SidebarItem = ({ item, isOpen, collapsed, onItemClick }) => {
  const location = useLocation();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const checkActive = () => {
      const currentPath = location.pathname;

      if (currentPath === item.path) {
        setIsActive(true);
        return;
      }

      if (item.submenu) {
        const hasActiveChild = item.submenu.some(subItem =>
          currentPath === subItem.path || currentPath.startsWith(`${subItem.path}/`)
        );

        if (hasActiveChild) {
          setIsActive(true);
          return;
        }
      }

      if (currentPath.startsWith(`${item.path}/`)) {
        setIsActive(true);
        return;
      }

      setIsActive(false);
    };

    checkActive();
  }, [location.pathname, item]);

  const buttonClasses = `
    w-full text-left text-decoration flex items-center px-3 py-2.5 rounded-lg transition-all duration-300
    ${isActive
      ? 'bg-gradient-to-r text-decoration from-blue-600 to-indigo-600 text-white shadow-md'
      : 'text-gray-700 text-decoration hover:bg-gray-100 hover:text-blue-700'}
  `;

  const renderMenuItem = () => {
    const IconComponent = item.icon;

    if (collapsed && !item.submenu) {
      return (
        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.div whileHover={{ x: 2 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to={item.path}
                  className={`${buttonClasses} justify-center`}
                >
                  {IconComponent && (
                    <motion.span
                      className="transition-transform duration-300 group-hover:scale-110"
                      whileHover={{ scale: 1.1 }}
                    >
                      <IconComponent size={20} />
                    </motion.span>
                  )}
                </Link>
              </motion.div>
            </TooltipTrigger>
            <TooltipContent side="right">{item.title}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    if (item.submenu) {
      return (
        <>
          <button
            className={buttonClasses}
            onClick={() => onItemClick(item)}
            aria-expanded={isOpen}
          >
            {IconComponent && (
              <motion.span
                className="mr-3 text-decoration transition-transform duration-300 group-hover:scale-110 min-w-[20px]"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <IconComponent size={20} />
              </motion.span>
            )}
            {!collapsed && (
              <>
                <span className="transition-all text-decoration duration-300 flex-1 text-left text-sm sm:text-base whitespace-nowrap overflow-hidden text-ellipsis">
                  {item.title}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 90 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="ml-auto"
                >
                  <ChevronDown size={16} className={isOpen ? 'transform rotate-180' : ''} />
                </motion.span>
              </>
            )}
          </button>

          <AnimatePresence>
            {isOpen && !collapsed && (
              <motion.ul
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="pl-6 sm:pl-8 mt-1 text-decoration space-y-1 overflow-hidden list-none"
              >
                {item.submenu.map((subItem) => (
                  <motion.li
                    key={subItem.title}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className="list-none"
                  >
                    <Link
                      to={subItem.path}
                      className={`
                        px-3 py-2 text-decoration rounded-md block transition-all duration-300 text-xs sm:text-sm
                        ${location.pathname === subItem.path || location.pathname.startsWith(`${subItem.path}/`)
                          ? 'text-blue-700 font-medium bg-blue-50'
                          : 'text-gray-600 hover:text-blue-700 hover:bg-blue-50/50'}
                      `}
                    >
                      {subItem.title}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </>
      );
    }

    return (
      <motion.div whileHover={{ x: 2 }} whileTap={{ scale: 0.98 }}>
        <Link
          to={item.path}
          className={buttonClasses}
        >
          {IconComponent && (
            <motion.span
              className="mr-3 text-decoration transition-transform duration-300 group-hover:scale-110 min-w-[20px]"
              whileHover={{ scale: 1.1 }}
            >
              <IconComponent size={20} />
            </motion.span>
          )}
          {!collapsed && (
            <span className="transition-all text-decoration duration-300 flex-1 text-sm sm:text-base">
              {item.title}
            </span>
          )}
        </Link>
      </motion.div>
    );
  };

  return (
    <li className="group list-none">
      {renderMenuItem()}
    </li>
  );
};

export default SidebarItem;
