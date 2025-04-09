
import { 
  Sidebar, 
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader
} from "@/components/ui/sidebar";
import { 
  LayoutDashboard, 
  Package, 
  Robot, 
  Layers3, 
  Bell, 
  Settings, 
  ChevronLeft, 
  ChevronRight 
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface AppSidebarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

export default function AppSidebar({ isCollapsed, toggleSidebar }: AppSidebarProps) {
  const navItems = [
    {
      title: "Dashboard",
      path: "/",
      icon: LayoutDashboard,
    },
    {
      title: "Packages",
      path: "/packages",
      icon: Package,
    },
    {
      title: "Robots",
      path: "/robots",
      icon: Robot,
    },
    {
      title: "Shelves",
      path: "/shelves",
      icon: Layers3,
    },
    {
      title: "Notifications",
      path: "/notifications",
      icon: Bell,
    },
    {
      title: "Settings",
      path: "/settings",
      icon: Settings,
    },
  ];

  return (
    <Sidebar className={`bg-sidebar ${isCollapsed ? 'w-16' : 'w-64'} transition-all duration-300`}>
      <SidebarHeader className="flex items-center justify-between px-4 py-4">
        {!isCollapsed && (
          <div className="flex items-center">
            <Package className="h-6 w-6 text-sidebar-foreground" />
            <span className="ml-2 text-lg font-semibold text-sidebar-foreground">Warehouse</span>
          </div>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar} 
          className="text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.path} 
                      className={({ isActive }) => `flex items-center ${isActive ? 'text-primary' : 'text-sidebar-foreground'}`}
                    >
                      <item.icon className="h-5 w-5" />
                      {!isCollapsed && <span className="ml-2">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
