import { BellIcon, MenuIcon, Moon, Sun, User, LogOut, Settings, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlowingButton } from "@/components/ui/glowing-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useTheme } from "@/context/ThemeContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

// ⚠️ Replace these with your actual Supabase environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface NavbarProps {
  toggleSidebar: () => void;
}

export default function Navbar({ toggleSidebar }: NavbarProps) {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();
  }, []);

  // Handle logout functionality
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth"); // Redirect to login page after logout
  };

  // Get user initials from email
  const getUserInitials = () => {
    if (!user?.email) return 'U';
    const [first, last] = user.email.split('@')[0].split(/[._-]/);
    return `${first[0]}${last ? last[0] : ''}`.toUpperCase();
  };

  return (
    <header className="border-b bg-card/50 backdrop-blur-md sticky top-0 z-50">
      <div className="flex h-16 items-center px-4 md:px-10">
        {/* Toggle Sidebar Button */}
        <GlowingButton
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={toggleSidebar}
          aria-label="Toggle menu"
          glowColor="rgba(156, 163, 175, 0.5)"
        >
          <MenuIcon className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </GlowingButton>

        {/* User Profile Dropdown */}
        <div className="ml-auto flex items-center space-x-4">
          {/* Theme Toggle Button */}
          <GlowingButton
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="relative h-8 w-8 rounded-full border border-border/50 hover:border-border transition-colors duration-200"
            aria-label="Toggle theme"
            glowColor={theme === 'dark' ? 'rgba(251, 191, 36, 0.5)' : 'rgba(59, 130, 246, 0.5)'}
            hoverGlowColor={theme === 'dark' ? 'rgba(251, 191, 36, 0.8)' : 'rgba(59, 130, 246, 0.8)'}
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </GlowingButton>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="relative h-8 w-8 rounded-full p-0 focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <Avatar className="h-8 w-8 border-2 border-border/50">
                  <AvatarFallback className="text-white bg-primary/80 hover:bg-primary/90 transition-colors duration-200">
                    {getUserInitials()}
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end" 
              className="w-56 bg-card/95 backdrop-blur-sm border-border/50 z-50"
              sideOffset={5}
              forceMount
            >
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.email?.split('@')[0] || 'User'}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email || 'No email found'}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-border/50" />
              <DropdownMenuItem 
                onClick={() => navigate("/profile")}
                className="flex items-center gap-2 cursor-pointer hover:bg-accent/50"
              >
                <User className="h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => navigate("/settings")}
                className="flex items-center gap-2 cursor-pointer hover:bg-accent/50"
              >
                <Settings className="h-4 w-4" />
                <span>Dashboard</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => navigate("/help")}
                className="flex items-center gap-2 cursor-pointer hover:bg-accent/50"
              >
                <HelpCircle className="h-4 w-4" />
                <span>Help</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-border/50" />
              <DropdownMenuItem 
                onClick={handleLogout}
                className="flex items-center gap-2 cursor-pointer text-red-500 hover:bg-red-500/10 focus:text-red-500 focus:bg-red-500/10"
              >
                <LogOut className="h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
