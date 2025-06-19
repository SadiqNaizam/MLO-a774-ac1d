import React, { useState, useCallback, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { cn } from '@/lib/utils';

interface MainAppLayoutProps {
  children: React.ReactNode;
}

type Theme = 'light' | 'dark';

/**
 * MainAppLayout defines the primary structure for the application,
 * incorporating a sidebar, header, and main content area.
 * It implements the HLSB (Header, Left Sidebar, Body) pattern using Tailwind CSS Grid.
 * Handles responsive behavior for the sidebar on mobile devices.
 * Manages application theme (light/dark).
 */
const MainAppLayout: React.FC<MainAppLayoutProps> = ({ children }) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
      return localStorage.getItem('theme') as Theme;
    }
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []);

  const toggleMobileSidebar = useCallback(() => {
    setIsMobileSidebarOpen(prev => !prev);
  }, []);

  return (
    <div className="grid grid-rows-[auto_1fr] md:grid-cols-[auto_1fr] h-screen w-full overflow-hidden bg-background">
      {/* Desktop Sidebar */}
      <div className="row-span-2 hidden md:block border-r border-border bg-sidebar backdrop-blur-lg">
        <Sidebar className="h-full" />
      </div>

      {/* Mobile Sidebar */}
      <div 
        className={cn(
          "fixed inset-y-0 left-0 z-50 transform transition-transform ease-in-out duration-300 md:hidden",
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full",
          "w-64 bg-sidebar border-r border-border backdrop-blur-lg" // Added backdrop-blur-lg
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-sidebar-title"
      >
        {isMobileSidebarOpen && <Sidebar className="h-full" />}
      </div>

      {/* Backdrop for Mobile Sidebar */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden" // Slightly blurred backdrop
          onClick={toggleMobileSidebar}
          aria-hidden="true"
        />
      )}

      {/* Header Area */}
      <div className="col-start-1 md:col-start-2 row-start-1">
        <Header 
          onMenuToggle={toggleMobileSidebar} 
          className="border-b border-border" // backdrop-blur will be added in Header component
          theme={theme}
          toggleTheme={toggleTheme}
        />
      </div>

      {/* Main Content Area */}
      <main className="col-start-1 md:col-start-2 row-start-2 overflow-y-auto p-4 sm:p-6">
        {children}
      </main>
    </div>
  );
};

export default MainAppLayout;