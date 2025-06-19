import React from 'react';
import { cn } from '@/lib/utils';
import SidebarNav from '../Dashboard/SidebarNav'; // Organism component for navigation

interface SidebarProps {
  className?: string;
  // isMobileOpen and onDismiss could be added if Sidebar needs to manage its own state for mobile view,
  // but current MainAppLayout handles visibility/animation externally.
}

/**
 * Layout component for the sidebar.
 * This component typically wraps a more complex navigation organism like SidebarNav.
 * It ensures consistency in how sidebars are integrated into layouts.
 */
const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  // SidebarNav is expected to define its own width (e.g., w-64), background, padding, and be h-full.
  // This wrapper primarily serves a structural role within the /layout directory
  // and passes through className for any additional styling needs from the parent layout.
  return (
    <SidebarNav className={cn(
      "h-full", // Ensures the navigation fills the sidebar container's height
      className
    )} />
  );
};

export default Sidebar;
