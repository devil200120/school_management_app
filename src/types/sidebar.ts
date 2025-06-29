
import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

export interface MenuItem {
  title;
  icon?: LucideIcon;
  path;
  submenu?: { title; path }[];
}

export interface SidebarItemProps {
  item: MenuItem;
  isOpen: boolean;
  collapsed: boolean;
  onItemClick: (item: MenuItem) => void;
}
