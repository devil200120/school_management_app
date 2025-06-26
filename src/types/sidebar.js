// menuTypes.jsx

import React from 'react';

/**
 * @typedef {Object} MenuItem
 * @property {string} title
 * @property {React.ComponentType} [icon] - A Lucide React icon component
 * @property {string} path
 * @property {{ title: string, path: string }[]} [submenu]
 */

/**
 * @typedef {Object} SidebarItemProps
 * @property {MenuItem} item
 * @property {boolean} isOpen
 * @property {boolean} collapsed
 * @property {(item: MenuItem) => void} onItemClick
 */

// Example usage (you can use this structure in a component):

const SidebarItem = ({ item, isOpen, collapsed, onItemClick }) => {
  return (
    <div onClick={() => onItemClick(item)} className="sidebar-item">
      {item.icon && <item.icon className="icon" />}
      {isOpen && <span>{item.title}</span>}
    </div>
  );
};

export default SidebarItem;
