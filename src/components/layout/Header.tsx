import React from 'react';
import { cn } from '@/lib/utils';
import TopHeader from '../Dashboard/TopHeader'; // Organism component for the top header bar

interface HeaderProps {
  className?: string;
  onMenuToggle?: () => void; // Callback to toggle mobile sidebar, passed to TopHeader
}

/**
 * Layout component for the main application header.
 * This component wraps a header organism like TopHeader.
 * It standardizes header integration, passing necessary props like menu toggles.
 */
const Header: React.FC<HeaderProps> = ({ className, onMenuToggle }) => {
  // TopHeader is expected to define its own height (e.g., h-16), stickiness, background, and padding.
  // This wrapper passes through className and onMenuToggle to the underlying TopHeader component.
  return (
    <TopHeader 
      className={cn(className)} 
      onMenuToggle={onMenuToggle} 
    />
  );
};

export default Header;
