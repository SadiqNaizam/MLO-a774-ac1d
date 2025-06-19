import React from 'react';
import { cn } from '@/lib/utils';
import { Menu, Search, Bell, ChevronDown, Box, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link } from 'react-router-dom'; 

interface TopHeaderProps {
  className?: string;
  onMenuToggle?: () => void;
  theme?: 'light' | 'dark';
  toggleTheme?: () => void;
}

const TopHeader: React.FC<TopHeaderProps> = ({ className, onMenuToggle, theme, toggleTheme }) => {
  return (
    <header
      className={cn(
        'sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-card px-4 md:px-6 backdrop-blur-lg', // Added backdrop-blur-lg. bg-card will be semi-transparent due to index.css
        className
      )}
    >
      <div className="flex items-center">
        <Button variant="ghost" size="icon" className="md:hidden mr-2" onClick={onMenuToggle}>
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
        {/* Brand Logo visible on larger screens, sidebar has it for smaller screens */}
        <div className="hidden md:flex items-center space-x-2 mr-6">
            <Box className="h-8 w-8 text-primary" /> 
            <span className="font-bold text-xl text-foreground">DO</span> {/* Ensuring text uses foreground */}
        </div>
        <div className="relative w-full max-w-xs hidden sm:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input type="search" placeholder="Search..." className="pl-9 bg-background/50" /> {/* Input with slight transparency */}
        </div>
      </div>

      <div className="flex items-center space-x-3 md:space-x-4">
        {toggleTheme && (
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}\
          </Button>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="default" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Create
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="backdrop-blur-md"> {/* Added backdrop-blur to content */}
            <DropdownMenuItem>New Lead</DropdownMenuItem>
            <DropdownMenuItem>New Task</DropdownMenuItem>
            <DropdownMenuItem>New Contact</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" size="icon">\
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>\
            <Avatar className="h-9 w-9 cursor-pointer">\
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="backdrop-blur-md"> {/* Added backdrop-blur to content */}
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/profile" className="cursor-pointer w-full">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default TopHeader;