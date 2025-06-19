import React from 'react';
import { cn } from '@/lib/utils';
import TopHeader from '../Dashboard/TopHeader'; // Organism component for the top header bar

interface HeaderProps {
  className?: string;
  onMenuToggle?: () => void; // Callback to toggle mobile sidebar, passed to TopHeader
  theme?: 'light' | 'dark';
  toggleTheme?: () => void;
}

/**
 * Layout component for the main application header.
 * This component wraps a header organism like TopHeader.
 * It standardizes header integration, passing necessary props like menu toggles and theme controls.
 */
const Header: React.FC<HeaderProps> = ({ className, onMenuToggle, theme, toggleTheme }) => {
  return (
    <TopHeader 
      className={cn(className)} 
      onMenuToggle={onMenuToggle} 
      theme={theme}
      toggleTheme={toggleTheme}
    />
  );
};

export default Header;