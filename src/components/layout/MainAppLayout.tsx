import React, { useState, useCallback } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { cn } from '@/lib/utils';

interface MainAppLayoutProps {
  children: React.ReactNode;
}

/**
 * MainAppLayout defines the primary structure for the application,
 * incorporating a sidebar, header, and main content area.
 * It implements the HLSB (Header, Left Sidebar, Body) pattern using Tailwind CSS Grid.
 * Handles responsive behavior for the sidebar on mobile devices.
 */
const MainAppLayout: React.FC<MainAppLayoutProps> = ({ children }) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  const toggleMobileSidebar = useCallback(() => {
    setIsMobileSidebarOpen(prev => !prev);
  }, []);

  // Layout Requirements:
  // - Overall type: Grid, definition: "grid-cols-[auto_1fr] grid-rows-[auto_1fr]"
  // - Sidebar sizing: "w-64" (implicitly defines 'auto' column width)
  // - Header sizing: "h-16" (implicitly defines 'auto' row height)
  // This grid structure is applied for medium screens (md) and up.
  // On smaller screens, the layout adapts: header and main content take full width,
  // and the sidebar becomes an overlay.

  return (
    <div className="grid grid-rows-[auto_1fr] md:grid-cols-[auto_1fr] h-screen w-full overflow-hidden bg-background">
      {/* Desktop Sidebar: Part of the CSS Grid */}
      {/* This div acts as the container for the sidebar in the grid. */}
      {/* `md:block` ensures it's only visible on medium screens and up. */}
      {/* `row-span-2` makes it span both the header and main content rows. */}
      {/* `bg-sidebar` and `border-r` match the SidebarNav's typical styling for consistency. */}
      <div className="row-span-2 hidden md:block border-r border-border bg-sidebar">
        <Sidebar className="h-full" /> {/* Renders SidebarNav, which should fill height */}
      </div>

      {/* Mobile Sidebar: Overlay, positioned fixed */}
      {/* This container slides in from the left on mobile. */}
      <div 
        className={cn(
          "fixed inset-y-0 left-0 z-50 transform transition-transform ease-in-out duration-300 md:hidden",
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full",
          "w-64 bg-sidebar border-r border-border" // Styles for the sliding container itself
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-sidebar-title" // Assuming SidebarNav might have a title element
      >
        {/* Render Sidebar only when it's meant to be part of the visual tree for mobile */}
        {/* This helps with performance and accessibility. */}
        {isMobileSidebarOpen && <Sidebar className="h-full" />}
      </div>

      {/* Backdrop for Mobile Sidebar */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={toggleMobileSidebar}
          aria-hidden="true"
        />
      )}

      {/* Header Area */}
      {/* On mobile (default, single column grid): takes full width (col-start-1 implicit) */}
      {/* On desktop (md:grid-cols-[auto_1fr]): starts in the second column (md:col-start-2) */}
      {/* `row-start-1` places it in the first row. */}
      <div className="col-start-1 md:col-start-2 row-start-1">
        <Header 
          onMenuToggle={toggleMobileSidebar} 
          className="border-b border-border" // Ensure header has a bottom border
        />
      </div>

      {/* Main Content Area */}
      {/* On mobile: takes full width. */}
      {/* On desktop: starts in the second column. */}
      {/* `row-start-2` places it in the second row. */}
      {/* `overflow-y-auto` enables scrolling for content that exceeds viewport height. */}
      <main className="col-start-1 md:col-start-2 row-start-2 overflow-y-auto p-4 sm:p-6">
        {children}
      </main>
    </div>
  );
};

export default MainAppLayout;
