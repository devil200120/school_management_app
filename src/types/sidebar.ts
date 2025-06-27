
import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

export interface MenuItem {
  title: string;
  icon?: LucideIcon;
  path: string;
  submenu?: { title: string; path: string }[];
}

export interface SidebarItemProps {
  item: MenuItem;
  isOpen: boolean;
  collapsed: boolean;
  onItemClick: (item: MenuItem) => void;
}
